require('dotenv').config();

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const { createClient } = require('@supabase/supabase-js');

const { SUPABASE_URL, SUPABASE_ANON_KEY, PORT = 3000, NODE_ENV } = process.env;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Set SUPABASE_URL and SUPABASE_ANON_KEY in .env');
}

const SESSION_COOKIE = 'lp_session';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A new client per request keeps one user's session from leaking into another request.
function supabaseClient(accessToken) {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined,
  });
}

function text(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.post('/api/signup', async (req, res) => {
  const fullName = text(req.body.fullName, 120);
  const email = text(req.body.email, 254).toLowerCase();
  const company = text(req.body.company, 120);
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!fullName || !EMAIL_PATTERN.test(email) || password.length < 8 || password.length > 72) {
    return res.status(400).json({ error: 'Enter your full name, a valid email and a password of 8–72 characters.' });
  }

  const { data, error } = await supabaseClient().auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, company } },
  });

  if (error) {
    return res.status(error.status || 400).json({ error: error.message });
  }

  res.status(201).json({ needsConfirmation: !data.session });
});

app.post('/api/login', async (req, res) => {
  const email = text(req.body.email, 254).toLowerCase();
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!EMAIL_PATTERN.test(email) || !password) {
    return res.status(400).json({ error: 'Enter a valid email and your password.' });
  }

  const { data, error } = await supabaseClient().auth.signInWithPassword({ email, password });

  if (error) {
    const message = error.code === 'email_not_confirmed'
      ? 'Confirm your email address using the link we sent, then sign in.'
      : 'The email or password is incorrect.';
    return res.status(401).json({ error: message });
  }

  const { access_token: accessToken, expires_in: expiresIn } = data.session;
  res.cookie(SESSION_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: NODE_ENV === 'production',
    ...(req.body.remember ? { maxAge: expiresIn * 1000 } : {}),
  });

  const { data: profile } = await supabaseClient(accessToken)
    .from('profiles')
    .select('full_name, email, company')
    .eq('id', data.user.id)
    .single();

  res.json({ profile });
});

app.get('/api/me', async (req, res) => {
  const accessToken = req.cookies[SESSION_COOKIE];
  if (!accessToken) {
    return res.status(401).json({ error: 'Not signed in.' });
  }

  const client = supabaseClient(accessToken);
  const { data: userData, error } = await client.auth.getUser(accessToken);
  if (error) {
    res.clearCookie(SESSION_COOKIE);
    return res.status(401).json({ error: 'Session expired. Sign in again.' });
  }

  const { data: profile, error: profileError } = await client
    .from('profiles')
    .select('full_name, email, company, created_at')
    .eq('id', userData.user.id)
    .single();

  if (profileError) {
    return res.status(404).json({ error: 'Profile not found.' });
  }

  res.json({ profile });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie(SESSION_COOKIE);
  res.status(204).end();
});

app.get('/', (req, res) => res.redirect('/login'));
app.use(express.static(path.join(__dirname, 'src', 'pages'), { extensions: ['html'] }));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
