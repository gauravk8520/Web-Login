# Lepidus Design System — AI Design Contract

_design.md · generated 2026-10-15 from the sources that build https://lepide-design-system.vercel.app (component manifest, docs content, snippets, tokens.css). Regenerated on every site build — never edit by hand. 44 components · 32 with plain CSS · 535 tokens · 110 canonical HTML examples._

**Purpose.** This file teaches an AI assistant — or a developer — to produce Lepide product UI that *is* the documented Lepidus implementation, not a lookalike: the exact `lp-` classes, the exact DOM anatomy, the `data-lp-*` hooks, the ARIA, the tokens. Every component-level fact below is generated from the design system itself; the rules around them are the contract Lepide applies in review.

**How to use it.**

- **Knowledge base (best):** upload to a Claude Project, a custom GPT, NotebookLM, or your editor's indexed context (Cursor `@design.md`, Claude Code `CLAUDE.md` reference). Every conversation can then look up the exact anatomy.
- **Single chat:** this file is large (~182k tokens). For one conversation paste https://lepide-design-system.vercel.app/llms-full.txt instead (rules + every HTML example, ~33k tokens) or https://lepide-design-system.vercel.app/llms.txt (rules + class inventory, ~2k tokens).
- **Humans:** search one file instead of forty pages; Section 5 is the complete per-component contract.

**Contents**

0. [Final instruction block — paste at the top of any prompt](#0-final-instruction-block)
1. [Non-negotiable contract](#1-non-negotiable-contract)
2. [Page shell, theming, `lepidus.js`](#2-page-shell-theming-lepidusjs)
3. [Token model](#3-token-model)
4. [Component inventory](#4-component-inventory)
5. [Component contracts](#5-component-contracts) — purpose, classes, hooks, canonical anatomy, React, accessibility, hard-fail checks
6. [Page archetypes and patterns](#6-page-archetypes-and-patterns)
7. [Layout rules for custom composition](#7-layout-rules-for-custom-composition)
8. [AI generation workflow and output format](#8-ai-generation-workflow-and-output-format)
9. [Review gates and automated validation](#9-review-gates-and-automated-validation)
10. [QA model and enterprise copy](#10-qa-model-and-enterprise-copy)
11. [Token reference (all themes)](#11-token-reference)
12. [Machine-readable sources](#12-machine-readable-sources)

## 0. Final instruction block

Paste this at the top of a prompt when this file (or llms-full.txt) is attached:

```markdown
You are generating UI with the Lepidus Design System. Follow design.md exactly.
Default to plain HTML using documented lp- classes only; React only if I ask for React.
For every component, start from its canonical HTML anatomy in design.md §5 and change
only content, data, ids and labels — never class names, nesting, modifiers, ARIA or
data-lp-* hooks. Never hardcode colors, spacing, radii or font sizes: use
var(--component-*) first, then semantic var(--color-*|--space-*|--radius-*) tokens.
Link https://lepide-design-system.vercel.app/v1/lepidus.css in <head> and https://lepide-design-system.vercel.app/v1/lepidus.js (defer) before </body>.
Set data-theme="light" | "dark" | "hc" on <html>. Use lepidus.js hooks for interaction.
Before answering, run the §8 self-check and the §5 hard-fail list for each component used.
If a needed pattern has no Lepidus component, write a system gap note (§8) instead of
inventing one.
```

## 1. Non-negotiable contract

```yaml
lepidus_ai_contract:
  design_system: Lepidus
  owner_context: Lepide enterprise products
  preferred_output: plain HTML + documented lp- classes
  secondary_output: React only if the target project already uses React
  css_distribution: '@ramsarjal-404/css'
  react_distribution: '@ramsarjal-404/react'
  token_source: Figma DTCG -> Style Dictionary -> CSS variables
  class_prefix: lp-
  theme_attribute: data-theme
  allowed_themes: [light, dark, hc]
  default_theme: light
  font_family: var(--font-family-primary)   # Open Sans
  accessibility_target: WCAG 2.1 AA
  components: 44
  plain_css_components: 32
  react_only_components: [BarChart, BubbleChart, Calendar, ColumnChart, DonutChart, Filter, FolderTree, GaugeChart, LineChart, SettingsPanel, TimePicker, ToastProvider]
  lepidus_js_hooks: [data-lp-accordion, data-lp-autofocus, data-lp-dropdown, data-lp-modal-close, data-lp-modal-open, data-lp-stepper, data-lp-tabs, data-lp-tooltip]
  lepidus_js_api: [Lepidus.init, Lepidus.initTabs, Lepidus.initAccordion, Lepidus.initDropdown, Lepidus.initStepper, Lepidus.openModal, Lepidus.closeModal, Lepidus.toast]
  required_quality_gates:
    - no raw hex colors in product UI (a hex *fallback* inside var(--…, #hex) is allowed)
    - no hardcoded spacing, radius, font-size or component color values
    - component tokens first, semantic tokens second, primitives last
    - only documented lp- classes (the inventories in §5 are the complete legal sets)
    - documented DOM anatomy, native elements, ARIA and data-lp-* hooks preserved
    - light, dark and high-contrast all checked
    - keyboard path checked; focus-visible never removed
```

### Source precedence

When anything is ambiguous, this order wins:

1. **Canonical HTML anatomy** (§5, "Plain HTML (canonical)") — the markup the Code pages render live.
2. **Class inventory and props** (§5) — generated from the component manifest; the complete legal set.
3. **Accessibility contract** (§5) — required semantics, focus and keyboard behavior.
4. **Storybook live story** — visual and state verification.
5. **Token reference** (§11) — exact names and per-theme values.
6. **The prose in this file** — orchestration rules and guardrails.

If this file ever conflicts with a current component page on https://lepide-design-system.vercel.app, the live page wins — and this file is stale, so regenerate it.

### Component fidelity rule

When a Lepidus component exists, **instantiate the documented component**; never recreate its appearance.

Allowed changes to canonical anatomy: labels, option values, row data, ids, business copy, layout wrappers *around* the component.

Not allowed without a design-system update: `lp-*` class names, documented element hierarchy, modifiers, ARIA roles/states, `data-lp-*` hooks, internal spacing, radii, colors, hover/focus behavior, open/close behavior.

**"Looks similar" substitutions are implementation failures:** a `div` styled like a button · a native `<select>` styled like Dropdown · Headless UI / Radix / MUI replacing a Lepidus component · a custom modal instead of `lp-modal` · a custom grid instead of `lp-table` · custom tabs instead of `lp-tabs` · local CSS imitating component geometry · hand-rolled open/close logic on top of `lepidus.js`.

### Absolute rules

1. Default to plain HTML with `lp-` classes. React only when the project is React.
2. Never invent classes. Every `lp-*` class must appear in the §5 inventory of its component.
3. Never hardcode visual values. Tokens only; `data-theme` for themes; never per-theme custom CSS.
4. Do not rebuild existing components. Button → `lp-button`, Modal → `lp-modal`, Table → `lp-table`, …
5. Interaction comes from `lepidus.js` (data-lp-accordion, data-lp-autofocus, data-lp-dropdown, data-lp-modal-close, data-lp-modal-open, data-lp-stepper, data-lp-tabs, data-lp-tooltip; `Lepidus.init`, `Lepidus.initTabs`, `Lepidus.initAccordion`, `Lepidus.initDropdown`, `Lepidus.initStepper`, `Lepidus.openModal`, `Lepidus.closeModal`, `Lepidus.toast`). Do not hand-roll tabs, modal focus trapping, accordions, dropdowns, tooltips, steppers or toasts.
6. Accessibility is not optional: copy the semantics, ARIA, focus and keyboard behavior from the canonical anatomy.
7. Cover states: default, hover, focus, disabled, loading, empty, error, success; light, dark, hc; LTR/RTL where layout direction matters.
8. Missing pattern → **system gap note** (§8). Use the closest existing components; never invent a new system.
9. Enterprise copy: direct, calm, specific; verb-first button labels; status never by color alone.

## 2. Page shell, theming, lepidus.js

### Required page shell (plain HTML)

```html
<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Lepidus UI</title>
  <link rel="stylesheet" href="https://lepide-design-system.vercel.app/v1/lepidus.css" />
</head>
<body>
  <!-- product screen: documented lp- components + token-only layout wrappers -->
  <script src="https://lepide-design-system.vercel.app/v1/lepidus.js" defer></script>
</body>
</html>
```

The `/v1/` URLs are versioned and stable. To vendor instead: build from the repo (`npm run tokens:css && npm run css`) and copy `packages/css/dist/lepidus.css` + `lepidus.js`; `lepidus.components.css` (components only) and `components/<name>.css` (one component) are also produced — link `tokens.css` first if you use those.

### Theming

```html
<html data-theme="light">   <!-- "light" (default) | "dark" | "hc" -->
```

One attribute; every component follows. Themes override only the semantic layer (183 variables for dark, 183 for high contrast) and component tokens re-resolve through live `var()` chains. Never write `[data-theme="dark"] .thing { … }` — if a custom layout wrapper needs a color, use a semantic token and it themes itself.

### `lepidus.js` — behavior for the interactive components

Bootstrap-style: write the documented markup with its data attribute, include the script once; components initialize on `DOMContentLoaded`. `Lepidus.init(container)` for markup injected later.

| Component | Markup hook | Behavior / JS API |
|---|---|---|
| Tabs | `lp-tabs` + `data-lp-tabs`; `role="tab"` buttons with `aria-controls` → `role="tabpanel"` | arrow keys / Home / End, roving tabindex, RTL-aware |
| Modal | `lp-modal` with `hidden`; `data-lp-modal-open="<id>"`, `data-lp-modal-close`, `data-lp-autofocus` | `Lepidus.openModal(id)`, `Lepidus.closeModal()` — focus trap, inert background, Escape / backdrop close, focus restore |
| Accordion | `data-lp-accordion`; triggers with `aria-expanded` + `aria-controls` | toggles `lp-accordion__panel--open` |
| Dropdown | `data-lp-dropdown="single"` or `"multi"` | open/close, outside-click + Escape dismissal, `aria-checked` sync, fires `lp-dropdown-change` on the wrapper |
| Stepper | `data-lp-stepper` | up/down controls respect `min` / `max` / `step`, fires `change` |
| Toast | — | `Lepidus.toast({ title, message, variant: info\|success\|warning\|error, duration })` → returns dismiss fn |
| Tooltip | `data-lp-tooltip="text"` on any focusable element | hover + focus, flips below when no room, `aria-describedby` wired, Escape hides |

## 3. Token model

```text
primitive (--blue-600)  →  semantic (--color-brand-primary, themed)  →  component (--component-button-primary-fill)  →  UI
```

**Priority for generated UI:** `var(--component-*)` for anything component-specific → `var(--color-*)`, `var(--space-*)`, `var(--radius-*)`, `var(--typography-*)`, `var(--shadow-*)` for layout and composition → primitives only when no semantic token exists.

**Groups (535 variables on `:root`):** `--component-*` (193) · `--color-*` (76) · `--typography-*` (54) · `--radius-*` (30) · `--shadow-*` (30) · `--space-*` (25) · `--layout-*` (24) · `--font-*` (23) · `--blue-*` (12) · `--gray-*` (12) · `--z-*` (7) · `--lightblue-*` (5) · `--red-*` (5) · `--orange-*` (5) · `--breakpoint-*` (4) · `--green-*` (4) · `--opacity-*` (4) · `--duration-*` (3) · `--easing-*` (3) · `--yellow-*` (3) · `--chart-*` (3) · `--border-*` (3) · `--cyan-*` (2) · `--blur-*` (2) · `--white-*` (1) · `--black-*` (1) · `--surface-*` (1). Full per-theme table in §11.

### Semantic tokens to reach for first

```css
/* brand */        var(--color-brand-primary)  var(--color-brand-primary-hover)  var(--color-brand-secondary)  var(--color-brand-accent)
/* surfaces */     var(--color-background-page)  var(--color-background-surface)  var(--color-background-raised)  var(--color-background-subtle)  var(--color-background-cards)
/* text */         var(--color-text-primary)  var(--color-text-secondary)  var(--color-text-disabled)  var(--color-text-brand)  var(--color-text-danger)  var(--color-text-inverse)
/* borders */      var(--color-border-default)  var(--color-border-strong)  var(--color-border-brand)  var(--color-border-danger)
/* status pairs */ var(--color-status-{success|warning|error|na}-bg)  var(--color-status-{success|warning|error|na}-text)
/* focus */        var(--color-focus-ring)
/* type */         var(--font-family-primary)  var(--typography-{body-sm|body-md|body-lg|label-md|heading-*}-{fontSize|lineHeight|letterSpacing})
/* layout */       var(--space-1 … --space-18)  var(--radius-*)  var(--shadow-*)  var(--z-*)  var(--breakpoint-*)  var(--duration-*)  var(--easing-*)
```

### Component tokens by component

What each component consumes internally — reference these, never their raw values. Classes already apply them; application code should not restyle component internals.

- **alert** (3): `--component-alert-info-bg`, `--component-alert-info-text`, `--component-alert-info-border`
- **alertpanel** (1): `--component-alertpanel-headline-font-size`
- **badge** (9): `--component-badge-padding-x`, `--component-badge-padding-y`, `--component-badge-gap`, `--component-badge-bg`, `--component-badge-text`, `--component-badge-radius`, `--component-badge-fontSize`, `--component-badge-paddingX`, `--component-badge-paddingY`
- **breadcrumb** (3): `--component-breadcrumb-text`, `--component-breadcrumb-active-text`, `--component-breadcrumb-separator`
- **button** (25): `--component-button-padding-x`, `--component-button-padding-y`, `--component-button-gap`, `--component-button-min-width`, `--component-button-focus-ring`, `--component-button-radius`, `--component-button-fontSize`, `--component-button-lineHeight`, `--component-button-paddingX`, `--component-button-paddingY`, `--component-button-primary-fill`, `--component-button-primary-text`, `--component-button-primary-hover-fill`, `--component-button-primary-stroke`, `--component-button-secondary-fill`, `--component-button-secondary-text`, `--component-button-secondary-stroke`, `--component-button-disabled-fill`, `--component-button-disabled-text`, `--component-button-danger-fill`, `--component-button-danger-text`, `--component-button-danger-stroke`, `--component-button-white-fill`, `--component-button-white-text`, `--component-button-white-stroke`
- **calendar** (6): `--component-calendar-bg`, `--component-calendar-selected-bg`, `--component-calendar-selected-text`, `--component-calendar-today-border`, `--component-calendar-day-text`, `--component-calendar-disabled-text`
- **card** (7): `--component-card-padding`, `--component-card-gap`, `--component-card-bg`, `--component-card-border`, `--component-card-radius`, `--component-card-title-text`, `--component-card-body-text`
- **checkbox** (4): `--component-checkbox-checked-bg`, `--component-checkbox-unchecked-border`, `--component-checkbox-disabled-bg`, `--component-checkbox-check-mark`
- **chip** (3): `--component-chip-bg`, `--component-chip-text`, `--component-chip-radius`
- **dropdown** (12): `--component-dropdown-bg`, `--component-dropdown-border`, `--component-dropdown-item-text`, `--component-dropdown-item-hover`, `--component-dropdown-radius`, `--component-dropdown-trigger-text`, `--component-dropdown-header-bg`, `--component-dropdown-option-text`, `--component-dropdown-checkbox-border`, `--component-dropdown-checkbox-fill`, `--component-dropdown-disabled-bg`, `--component-dropdown-disabled-text`
- **filter** (1): `--component-filter-footer-gap`
- **icon** (5): `--component-icon-size-sm`, `--component-icon-size-md`, `--component-icon-button-bg`, `--component-icon-button-icon`, `--component-icon-button-hover-bg`
- **input** (15): `--component-input-padding-x`, `--component-input-padding-y`, `--component-input-border`, `--component-input-border-focus`, `--component-input-bg`, `--component-input-bg-focus`, `--component-input-bg-disabled`, `--component-input-text`, `--component-input-placeholder`, `--component-input-label`, `--component-input-radius`, `--component-input-fontSize`, `--component-input-lineHeight`, `--component-input-paddingX`, `--component-input-paddingY`
- **modal** (12): `--component-modal-padding`, `--component-modal-header-padding-y`, `--component-modal-footer-padding-x`, `--component-modal-footer-padding-y`, `--component-modal-footer-gap`, `--component-modal-bg`, `--component-modal-overlay`, `--component-modal-title-text`, `--component-modal-body-text`, `--component-modal-border`, `--component-modal-radius`, `--component-modal-title-fontSize`
- **nav** (11): `--component-nav-sidebar-bg`, `--component-nav-icon-color`, `--component-nav-item-bg`, `--component-nav-item-text`, `--component-nav-item-active-bg`, `--component-nav-item-active-text`, `--component-nav-fontSize`, `--component-nav-lineHeight`, `--component-nav-rounded-selected-bg`, `--component-nav-rounded-selected-border`, `--component-nav-rounded-border`
- **pagination** (5): `--component-pagination-bg`, `--component-pagination-text`, `--component-pagination-active-bg`, `--component-pagination-active-text`, `--component-pagination-border`
- **progress** (8): `--component-progress-track`, `--component-progress-fill`, `--component-progress-text`, `--component-progress-complete-fill`, `--component-progress-complete-text`, `--component-progress-pending-fill`, `--component-progress-pending-text`, `--component-progress-pending-icon`
- **scrollbar** (2): `--component-scrollbar-track`, `--component-scrollbar-thumb`
- **status** (8): `--component-status-success-bg`, `--component-status-success-text`, `--component-status-error-bg`, `--component-status-error-text`, `--component-status-warning-bg`, `--component-status-warning-text`, `--component-status-na-bg`, `--component-status-na-text`
- **stepper** (6): `--component-stepper-bg`, `--component-stepper-text`, `--component-stepper-border`, `--component-stepper-control`, `--component-stepper-disabled-bg`, `--component-stepper-disabled-text`
- **table** (12): `--component-table-cell-padding-x`, `--component-table-cell-padding-y`, `--component-table-header-bg`, `--component-table-header-text`, `--component-table-cell-bg`, `--component-table-cell-text`, `--component-table-border`, `--component-table-row-hover`, `--component-table-header-fontSize`, `--component-table-cell-fontSize`, `--component-table-cellPaddingX`, `--component-table-cellPaddingY`
- **tabs** (4): `--component-tabs-text`, `--component-tabs-active-text`, `--component-tabs-active-indicator`, `--component-tabs-border`
- **textarea** (10): `--component-textarea-bg`, `--component-textarea-text`, `--component-textarea-placeholder`, `--component-textarea-border`, `--component-textarea-active-bg`, `--component-textarea-active-text`, `--component-textarea-active-border`, `--component-textarea-disabled-bg`, `--component-textarea-disabled-text`, `--component-textarea-disabled-border`
- **textfield** (9): `--component-textfield-bg`, `--component-textfield-text`, `--component-textfield-placeholder`, `--component-textfield-border`, `--component-textfield-active-bg`, `--component-textfield-active-text`, `--component-textfield-active-border`, `--component-textfield-disabled-bg`, `--component-textfield-disabled-text`
- **toast** (8): `--component-toast-bg-from`, `--component-toast-bg-to`, `--component-toast-border`, `--component-toast-badge-bg`, `--component-toast-badge-text`, `--component-toast-title-text`, `--component-toast-body-text`, `--component-toast-close`
- **toggle** (4): `--component-toggle-on-bg`, `--component-toggle-off-bg`, `--component-toggle-handle`, `--component-toggle-disabled-bg`

## 4. Component inventory

| Component | Category | Plain CSS block | Hooks / API | React | Docs |
|---|---|---|---|---|---|
| [ActionItem](#action-item) | Actions | `lp-action-item` | — | `ActionItem` | [action-item](https://lepide-design-system.vercel.app/components/action-item/) |
| [Button](#button) | Actions | `lp-button` | — | `Button` | [button](https://lepide-design-system.vercel.app/components/button/) |
| [Link](#link) | Actions | `lp-link` | — | `Link` | [link](https://lepide-design-system.vercel.app/components/link/) |
| [Calendar](#calendar) | Forms | — React-only | — | `Calendar` | [calendar](https://lepide-design-system.vercel.app/components/calendar/) |
| [Checkbox](#checkbox) | Forms | `lp-checkbox` | — | `Checkbox` | [checkbox](https://lepide-design-system.vercel.app/components/checkbox/) |
| [Dropdown](#dropdown) | Forms | `lp-dropdown` | `data-lp-dropdown` | `Dropdown` | [dropdown](https://lepide-design-system.vercel.app/components/dropdown/) |
| [Filter](#filter) | Forms | — React-only | — | `Filter` | [filter](https://lepide-design-system.vercel.app/components/filter/) |
| [Input](#input) | Forms | `lp-input` | — | `Input` | [input](https://lepide-design-system.vercel.app/components/input/) |
| [Radio](#radio) | Forms | `lp-radio` | — | `Radio` | [radio](https://lepide-design-system.vercel.app/components/radio/) |
| [Stepper](#stepper) | Forms | `lp-stepper` | `data-lp-stepper` | `Stepper` | [stepper](https://lepide-design-system.vercel.app/components/stepper/) |
| [Textarea](#textarea) | Forms | `lp-textarea` | — | `Textarea` | [textarea](https://lepide-design-system.vercel.app/components/textarea/) |
| [TextField](#text-field) | Forms | `lp-text-field` | — | `TextField` | [text-field](https://lepide-design-system.vercel.app/components/text-field/) |
| [TimePicker](#time-picker) | Forms | — React-only | — | `TimePicker` | [time-picker](https://lepide-design-system.vercel.app/components/time-picker/) |
| [Toggle](#toggle) | Forms | `lp-toggle` | — | `Toggle` | [toggle](https://lepide-design-system.vercel.app/components/toggle/) |
| [Accordion](#accordion) | Data Display | `lp-accordion` | `data-lp-accordion` | `Accordion` | [accordion](https://lepide-design-system.vercel.app/components/accordion/) |
| [Avatar](#avatar) | Data Display | `lp-avatar` | — | `Avatar` | [avatar](https://lepide-design-system.vercel.app/components/avatar/) |
| [Badge](#badge) | Data Display | `lp-badge` | — | `Badge` | [badge](https://lepide-design-system.vercel.app/components/badge/) |
| [Card](#card) | Data Display | `lp-card` | — | `Card` | [card](https://lepide-design-system.vercel.app/components/card/) |
| [Pagination](#pagination) | Data Display | `lp-pagination` | — | `Pagination` | [pagination](https://lepide-design-system.vercel.app/components/pagination/) |
| [Progress](#progress) | Data Display | `lp-progress` | — | `Progress` | [progress](https://lepide-design-system.vercel.app/components/progress/) |
| [Scrollbar](#scrollbar) | Data Display | `lp-scrollbar` | — | `Scrollbar` | [scrollbar](https://lepide-design-system.vercel.app/components/scrollbar/) |
| [Table](#table) | Data Display | `lp-table` | — | `Table` | [table](https://lepide-design-system.vercel.app/components/table/) |
| [Tag](#tag) | Data Display | `lp-tag` | — | `Tag` | [tag](https://lepide-design-system.vercel.app/components/tag/) |
| [AlertPanel](#alert-panel) | Feedback | `lp-alert-panel` | — | `AlertPanel` | [alert-panel](https://lepide-design-system.vercel.app/components/alert-panel/) |
| [EmptyState](#empty-state) | Feedback | `lp-empty-state` | — | `EmptyState` | [empty-state](https://lepide-design-system.vercel.app/components/empty-state/) |
| [Message](#message) | Feedback | `lp-message` | — | `Message` | [message](https://lepide-design-system.vercel.app/components/message/) |
| [Modal](#modal) | Feedback | `lp-modal` | `data-lp-autofocus` `data-lp-modal-close` `data-lp-modal-open` | `Modal` | [modal](https://lepide-design-system.vercel.app/components/modal/) |
| [Skeleton](#skeleton) | Feedback | `lp-skeleton` | — | `Skeleton` | [skeleton](https://lepide-design-system.vercel.app/components/skeleton/) |
| [Spinner](#spinner) | Feedback | `lp-spinner` | — | `Spinner` | [spinner](https://lepide-design-system.vercel.app/components/spinner/) |
| [Toast](#toast) | Feedback | `lp-toast` | `Lepidus.toast` | `Toast` | [toast](https://lepide-design-system.vercel.app/components/toast/) |
| [ToastProvider](#toast-provider) | Feedback | — React-only | — | `ToastProvider` | [toast-provider](https://lepide-design-system.vercel.app/components/toast-provider/) |
| [Breadcrumb](#breadcrumb) | Navigation | `lp-breadcrumb` | — | `Breadcrumb` | [breadcrumb](https://lepide-design-system.vercel.app/components/breadcrumb/) |
| [FolderTree](#folder-tree) | Navigation | — React-only | — | `FolderTree` | [folder-tree](https://lepide-design-system.vercel.app/components/folder-tree/) |
| [SettingsPanel](#settings-panel) | Navigation | — React-only | — | `SettingsPanel` | [settings-panel](https://lepide-design-system.vercel.app/components/settings-panel/) |
| [Sidebar](#sidebar) | Navigation | `lp-sidebar` | — | `Sidebar` | [sidebar](https://lepide-design-system.vercel.app/components/sidebar/) |
| [Steps](#steps) | Navigation | `lp-steps` | — | `Steps` | [steps](https://lepide-design-system.vercel.app/components/steps/) |
| [Tabs](#tabs) | Navigation | `lp-tabs` | `data-lp-tabs` | `Tabs` | [tabs](https://lepide-design-system.vercel.app/components/tabs/) |
| [Tooltip](#tooltip) | Overlays | `lp-tooltip` | `data-lp-tooltip` | `Tooltip` | [tooltip](https://lepide-design-system.vercel.app/components/tooltip/) |
| [BarChart](#bar-chart) | Charts | — React-only | — | `BarChart` | [bar-chart](https://lepide-design-system.vercel.app/components/bar-chart/) |
| [BubbleChart](#bubble-chart) | Charts | — React-only | — | `BubbleChart` | [bubble-chart](https://lepide-design-system.vercel.app/components/bubble-chart/) |
| [ColumnChart](#column-chart) | Charts | — React-only | — | `ColumnChart` | [column-chart](https://lepide-design-system.vercel.app/components/column-chart/) |
| [DonutChart](#donut-chart) | Charts | — React-only | — | `DonutChart` | [donut-chart](https://lepide-design-system.vercel.app/components/donut-chart/) |
| [GaugeChart](#gauge-chart) | Charts | — React-only | — | `GaugeChart` | [gauge-chart](https://lepide-design-system.vercel.app/components/gauge-chart/) |
| [LineChart](#line-chart) | Charts | — React-only | — | `LineChart` | [line-chart](https://lepide-design-system.vercel.app/components/line-chart/) |

**React-only today (12):** BarChart, BubbleChart, Calendar, ColumnChart, DonutChart, Filter, FolderTree, GaugeChart, LineChart, SettingsPanel, TimePicker, ToastProvider. In plain HTML: use the closest documented plain-CSS component if safe, never invent `lp-*` classes for them, add a system gap note (§8), and suggest React if the project supports it.

## 5. Component contracts

Each contract is complete on its own: purpose and usage rules, the legal class set, the hooks and semantics the canonical markup relies on, every documented example (plain HTML first, React second), the React API, the accessibility contract, and the hard-fail checks a reviewer applies.

### Actions

<a id="action-item"></a>

### ActionItem

Floating white toolbar of 24px icon actions — delete, upload, edit, share by default — for contextual per-item operations.

- **Availability:** plain CSS (block `lp-action-item`) + React
- **React:** `import { ActionItem } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/action-item/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-actionitem--default), [Interactive](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-actionitem--interactive), [With Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-actionitem--with-disabled), [Custom Subset](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-actionitem--custom-subset), [Showcase](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-actionitem--showcase)
- **Related:** [button](#button), [tooltip](#tooltip), [table](#table), [dropdown](#dropdown)

#### Legal class set (complete — do not invent others)

`lp-action-item` · `lp-action-item__action` · `lp-action-item__action--brand` · `lp-action-item__action--danger`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`
- **Roles:** `role="toolbar"`
- **ARIA attributes:** `aria-hidden`, `aria-label`

#### Purpose and usage rules

##### Overview

ActionItem is a compact white toolbar that floats over or beside a row, card, or canvas item
and exposes its quick actions as 24px icon buttons — by default the Figma set of delete
(danger tone), upload, edit, and share. The surface is `role="toolbar"` with `--shadow-low`
elevation and shrinks to fit its actions. Each glyph has exactly two tones: `brand` (default,
blue) and `danger` (red) for destructive actions.

##### Best practices

- Give every action a clear, **verb-first `label`** — it is both the accessible name and the
  native tooltip (`title`).
- Reserve `tone: 'danger'` for destructive operations (delete, remove) and keep it first or
  last in the row, not mixed mid-row.
- Pass a custom `actions` subset when an item supports fewer operations — the surface shrinks
  to fit.
- Set a specific `aria-label` ("Report actions") when more than one toolbar can be on screen.

##### When not to use

- **A page's primary actions** — use [Button](https://lepide-design-system.vercel.app/components/button/); ActionItem actions are
  icon-only and carry less weight than a labelled CTA.
- **More than about five actions** — overflow into a [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/) menu
  instead of widening the toolbar.
- **Status display** — a toolbar invites clicks; use [Badge](https://lepide-design-system.vercel.app/components/badge/) or
  [Tag](https://lepide-design-system.vercel.app/components/tag/) for read-only state.

##### Variants

**Default set**

The exact Figma set — delete (danger tone) followed by upload, edit, and share in the brand
tone, on the white `shadow/low` surface.

▶ Live: [Default Figma set](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-actionitem--default)

**Custom subset**

`actions` accepts any ordered list; the surface shrinks to fit while keeping the 30px gap.

▶ Live: [Two-action subset](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-actionitem--custom-subset)

**Disabled action**

Per-action `disabled`: the button dims to 40% opacity, loses its hover fill, and is removed
from the tab order via the native attribute.

▶ Live: [Disabled delete action](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-actionitem--with-disabled)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Surface | White `role="toolbar"` container — `--radius-s` 6px corners, `--shadow-low` elevation, 3px/4px padding, `width: fit-content` |
| 2 | Icon buttons | One native `<button type="button">` per action — 24px glyph, `aria-label` + `title` from the action's `label`, 30px apart |
| 3 | Tone | `brand` glyphs in `--color-text-brand` blue; `danger` glyphs in `--color-text-danger` red |
| 4 | Focus ring | 2px brand outline with 2px offset on `:focus-visible` |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Hover | Brand actions fill with `--color-brand-secondary` (light blue); danger actions with `--color-status-error-bg` (light red) |
| Focus | 2px brand outline per button on `:focus-visible` only |
| Tooltip | Each action's `label` doubles as a native `title` tooltip |
| Disabled | Native `disabled` per action — 40% opacity, no hover fill, removed from the tab order |
| Click | Each action fires its own `onClick`; the toolbar itself has no handler |
| Theming | Surface, glyph, and hover-fill tokens re-resolve automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Give every action a verb-first label (“Delete”, “Share”) — it is the accessible name and the tooltip.
- ✕ **Don't** — Pack more than about five actions into the toolbar — overflow into a Dropdown menu instead.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) renders the same markup from an `actions`
array. Both resolve to the same tokens, so they are pixel-identical in every theme.

##### Default set

`lp-action-item` is the floating surface (`role="toolbar"` + `aria-label`); each
`lp-action-item__action` is a native button holding a 24px `currentColor` SVG, with
`aria-label` + `title` for the name. The tone modifier picks the glyph color and hover fill:
`--brand` (default) or `--danger`. The Figma set is delete (danger) · upload · edit · share —
in React, omitting `actions` renders exactly this; the exported `defaultActions` array is the
same list, ready to extend.

**Example — Default Figma set**

Plain HTML (canonical):

```html
<!-- The Figma set: delete (danger) · upload · edit · share.
     Each button needs aria-label + title; icons are 24px currentColor SVGs. -->
<div class="lp-action-item" role="toolbar" aria-label="Report actions">
  <button type="button" class="lp-action-item__action lp-action-item__action--danger"
          aria-label="Delete" title="Delete">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 7h16M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7m3 0-.7 11.1A2 2 0 0 1 14.8 20H9.2a2 2 0 0 1-2-1.9L6.5 7"
            stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10 10.5v5M14 10.5v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  </button>
  <button type="button" class="lp-action-item__action lp-action-item__action--brand"
          aria-label="Upload" title="Upload">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M12 15V4m0 0L8 8m4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M4 14v3.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5V14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
  <button type="button" class="lp-action-item__action lp-action-item__action--brand"
          aria-label="Edit" title="Edit">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 16.5 15 5.5a2.12 2.12 0 0 1 3 3L7 19.5l-4 1 1-4Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="m13 7.5 3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
  <button type="button" class="lp-action-item__action lp-action-item__action--brand"
          aria-label="Share" title="Share">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="6" cy="12" r="2.4" stroke="currentColor" stroke-width="1.6" />
      <circle cx="17.5" cy="6" r="2.4" stroke="currentColor" stroke-width="1.6" />
      <circle cx="17.5" cy="18" r="2.4" stroke="currentColor" stroke-width="1.6" />
      <path d="m8.1 10.9 7.3-3.8M8.1 13.1l7.3 3.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  </button>
</div>
```

React:

```jsx
import { ActionItem } from '@ramsarjal-404/react';

// Renders the default Figma set: delete (danger) · upload · edit · share
<ActionItem aria-label="Report actions" />
```

##### Custom actions

Any ordered subset — in plain HTML wire each button's click yourself; in React each action is
`{ id, label, icon, tone?, onClick?, disabled? }`. Icons must be 24px SVGs using
`currentColor` so the tone controls the fill; the four default glyphs are exported from
`@ramsarjal-404/react`.

**Example — Two-action subset with handlers**

Plain HTML (canonical):

```html
<!-- Any ordered subset — wire each button's click to your handler. -->
<div class="lp-action-item" role="toolbar" aria-label="Item actions">
  <button type="button" class="lp-action-item__action lp-action-item__action--brand"
          aria-label="Edit" title="Edit" onclick="openEditor()">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 16.5 15 5.5a2.12 2.12 0 0 1 3 3L7 19.5l-4 1 1-4Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="m13 7.5 3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
  <button type="button" class="lp-action-item__action lp-action-item__action--brand"
          aria-label="Share" title="Share" onclick="share()">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="6" cy="12" r="2.4" stroke="currentColor" stroke-width="1.6" />
      <circle cx="17.5" cy="6" r="2.4" stroke="currentColor" stroke-width="1.6" />
      <circle cx="17.5" cy="18" r="2.4" stroke="currentColor" stroke-width="1.6" />
      <path d="m8.1 10.9 7.3-3.8M8.1 13.1l7.3 3.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  </button>
</div>
```

React:

```jsx
import { ActionItem, EditIcon, ShareIcon } from '@ramsarjal-404/react';

<ActionItem
  aria-label="Item actions"
  actions={[
    { id: 'edit', label: 'Edit', icon: <EditIcon />, onClick: () => openEditor() },
    { id: 'share', label: 'Share', icon: <ShareIcon />, onClick: () => share() },
  ]}
/>
```

##### Disabled action

The native `disabled` attribute on an individual button removes it from the tab order and
dims it to 40%.

**Example — Disabling the destructive action**

Plain HTML (canonical):

```html
<!-- Native disabled on a single action — it dims to 40% and leaves the tab order. -->
<div class="lp-action-item" role="toolbar" aria-label="Item actions">
  <button type="button" class="lp-action-item__action lp-action-item__action--danger"
          aria-label="Delete" title="Delete" disabled>
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 7h16M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7m3 0-.7 11.1A2 2 0 0 1 14.8 20H9.2a2 2 0 0 1-2-1.9L6.5 7"
            stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10 10.5v5M14 10.5v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  </button>
  <button type="button" class="lp-action-item__action lp-action-item__action--brand"
          aria-label="Upload" title="Upload">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M12 15V4m0 0L8 8m4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M4 14v3.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5V14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
  <button type="button" class="lp-action-item__action lp-action-item__action--brand"
          aria-label="Edit" title="Edit">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 16.5 15 5.5a2.12 2.12 0 0 1 3 3L7 19.5l-4 1 1-4Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="m13 7.5 3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
  <button type="button" class="lp-action-item__action lp-action-item__action--brand"
          aria-label="Share" title="Share">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <circle cx="6" cy="12" r="2.4" stroke="currentColor" stroke-width="1.6" />
      <circle cx="17.5" cy="6" r="2.4" stroke="currentColor" stroke-width="1.6" />
      <circle cx="17.5" cy="18" r="2.4" stroke="currentColor" stroke-width="1.6" />
      <path d="m8.1 10.9 7.3-3.8M8.1 13.1l7.3 3.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
  </button>
</div>
```

React:

```jsx
import { ActionItem, defaultActions } from '@ramsarjal-404/react';

// Disable a single action — it dims to 40% and leaves the tab order.
<ActionItem
  actions={defaultActions.map((action) =>
    action.id === 'delete' ? { ...action, disabled: true } : action
  )}
/>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). ActionItem is pure CSS and needs no `lepidus.js`; the buttons are native, so click handlers are yours.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `actions` | `ActionItemAction[]` | `[   { id: 'delete', label: 'Delete', icon: `<DeleteIcon />`, tone: 'danger' },   { id: 'upload', label: 'Upload', icon: `<UploadIcon />` },   { id: 'edit', label: 'Edit', icon: `<EditIcon />` },   { id: 'share', label: 'Share', icon: `<ShareIcon />` }, ]` | Ordered list of icon actions. Defaults to delete / upload / edit / share (the Figma "Action Item" set). |
| `aria-label` | `string` | `Item actions` | Accessible label for the toolbar group |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Each 24px glyph sits in a rounded hit target; hovering fills it with the tone's light color
  (blue for `brand`, red for `danger`) without moving anything.
- Hovering also reveals the native `title` tooltip with the action's label.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus through each action button in order (native tab order — no roving-tabindex arrow-key pattern) |
| `Enter` | Activates the focused action |
| `Space` | Activates the focused action (native button behavior) |

Every action is a separate tab stop. Focus draws a 2px brand outline with a 2px offset around
the individual action. Disabled actions use the native `disabled` attribute and are removed
from the tab order.

**Screen readers**

- The root is `role="toolbar"` with a configurable `aria-label` (default "Item actions"), so
  the group is announced as a named toolbar.
- Each action is a native `<button type="button">` whose accessible name is its `aria-label`
  (from the action's `label`); the 24px glyphs are purely visual.
- Disabled actions are announced as "dimmed"/"unavailable" automatically by the native
  attribute.

##### Development considerations

- The `label` is **required** for the accessible name — every action is icon-only, so an action
  without a meaningful label is invisible to assistive technology.
- Give the toolbar a contextual `aria-label` ("Report actions", "Agent actions") when several
  ActionItems can be on screen — "Item actions" twice is ambiguous.
- Pass icons that draw with `currentColor`; the tone classes only set the color, they cannot
  recolor hardcoded fills.
- Tone is a visual signal only — destructive actions still need a destructive verb in their
  `label` ("Delete"), never just a red glyph.
- If the toolbar floats over content on hover, make sure the actions are also reachable without
  a pointer (e.g. the row itself is focusable and reveals the toolbar on focus).

#### Hard-fail checks — ActionItem

- [ ] Every `lp-action-item*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] Roles present where the anatomy has them: `role="toolbar"`.
- [ ] ARIA state kept and updated: `aria-hidden`, `aria-label`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="button"></a>

### Button

Pill-shaped action button for triggering actions — forms, dialogs, and flows. Four variants, three sizes, fully token-driven.

- **Availability:** plain CSS (block `lp-button`) + React
- **React:** `import { Button } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/button/ · **Storybook:** [Primary](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--primary), [Primary Hover](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--primary-hover), [Primary Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--primary-disabled), [Primary With Icons](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--primary-with-icons), [Secondary](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--secondary), [Secondary Hover](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--secondary-hover), [Secondary Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--secondary-disabled), [Secondary With Icons](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--secondary-with-icons), [Danger](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--danger), [Danger Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--danger-disabled), [Danger With Icons](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--danger-with-icons), [White](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--white), [White Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--white-disabled), [All Variants](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--all-variants)
- **Related:** [action-item](#action-item), [link](#link), [badge](#badge)

#### Legal class set (complete — do not invent others)

`lp-button` · `lp-button--danger` · `lp-button--full-width` · `lp-button--lg` · `lp-button--md` · `lp-button--primary` · `lp-button--secondary` · `lp-button--sm` · `lp-button--white` · `lp-button__icon-left` · `lp-button__icon-right`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`
- **ARIA attributes:** `aria-hidden`

#### Purpose and usage rules

##### Overview

Button is the primary interactive control for triggering actions — submitting forms, confirming
dialogs, and starting flows. It renders a native `<button>`, is pill-shaped by token
(`--component-button-radius` → 50px), and every visual property resolves through the three-tier
token chain **component → semantic → primitive**, so the dark and high-contrast themes restyle it
with no extra code.

##### Best practices

- Use **one `primary` button per view** — it marks the single most important action.
- Pair `primary` with `secondary` for the alternative action (e.g. *Done / Cancel*), in that order.
- Write concise, **verb-first labels**: "Save changes", "Add credentials" — never "Click here".
- Use `danger` only for destructive confirmations (Delete, Remove), typically in a Card footer or
  Modal.
- Reserve `white` for dark or brand-colored surfaces (hero bars, brand panels).

##### When not to use

- **Navigation that looks like a link** — use [Link](https://lepide-design-system.vercel.app/components/link/) (an anchor) instead; it
  keeps the page semantics and open-in-new-tab behavior users expect.
- **Compact icon-only actions** in table rows or toolbars — use
  [ActionItem](https://lepide-design-system.vercel.app/components/action-item/); Button's accessible name must come from its text label.
- **Status display** — a Button invites a click; use [Badge](https://lepide-design-system.vercel.app/components/badge/) or
  [Tag](https://lepide-design-system.vercel.app/components/tag/) for read-only state.

##### Types

**Primary**

The brand-blue filled button (`#1c4599` in light theme). **Use for** the single most important
action on the screen — Save, Submit, Confirm. **Avoid** more than one per view; competing
primaries dilute the call to action.

▶ Live: [Primary](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--primary)

**Secondary**

Light brand-tinted fill with a brand border and text. **Use for** supporting actions next to a
primary (Cancel, Back, Export). It is the workhorse variant for toolbars and card actions.

▶ Live: [Secondary](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--secondary)

**Danger**

Red-tinted fill with red text and border. **Use for** destructive operations the user must
notice — Delete workspace, Remove agent. Confirm irreversible operations in a
[Modal](https://lepide-design-system.vercel.app/components/modal/) whose confirming button is `danger`.

▶ Live: [Danger](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--danger)

**White**

White fill with neutral text. **Use on** dark or brand-colored surfaces where primary/secondary
would not have enough contrast. **Don't use** on light page backgrounds — it disappears.

▶ Live: [White (shown on dark surface)](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-button--white)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | Pill-shaped `<button>` — 50px radius, 1px border, 41px min-height (`md`/`lg`), 29px (`sm`) |
| 2 | Label | Required text — Open Sans 14px bold; the accessible name |
| 3 | Icon left *(optional)* | 16px in `md`, 24px in `lg`; SVG must use `currentColor` |
| 4 | Icon right *(optional)* | 16px slot |
| 5 | Focus ring | 3px brand-tinted ring on `:focus-visible` only |

##### Sizes

| Size | Padding | Min-height | Use for |
| --- | --- | --- | --- |
| `sm` | 5 / 16 | 29px | Dense UI — table rows, card headers, inline actions |
| `md` *(default)* | 12 / 20 | 41px | Forms, dialogs, page-level actions |
| `lg` | 10 / 24 | 41px | With-icon buttons; the left icon slot grows to 24px |

- ✓ **Do** — Keep button text short and verb-first: “Save changes”, “Export report”.
- ✕ **Don't** — Write long sentences or vague labels: “Click here to save the changes you made”.

##### Behaviors

| Behavior | Description |
| --- | --- |
| Hover | Fill darkens via `--component-button-{variant}-hover-fill`; no size change |
| Focus | 3px brand-tinted ring on `:focus-visible`; mouse clicks show no ring |
| Disabled | Native `disabled` attribute — gray fill/text tokens, removed from tab order, `cursor: not-allowed` |
| Full width | `fullWidth` / `lp-button--full-width` stretches to the container — sign-in forms, mobile layouts |
| Theming | All variants re-resolve automatically under `data-theme="dark"` and `"hc"` |

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the
same tokens, so they are pixel-identical in every theme.

##### Variants

Block `lp-button` + one variant modifier + one size modifier. Variant and size are independent
axes — every combination is valid.

**Example — All four variants**

Plain HTML (canonical):

```html
<button class="lp-button lp-button--primary lp-button--md">Save changes</button>
<button class="lp-button lp-button--secondary lp-button--md">Cancel</button>
<button class="lp-button lp-button--danger lp-button--md">Delete</button>
<button class="lp-button lp-button--white lp-button--md">White</button>
```

React:

```jsx
import { Button } from '@ramsarjal-404/react';

<>
  <Button variant="primary">Save changes</Button>
  <Button variant="secondary">Cancel</Button>
  <Button variant="danger">Delete</Button>
  <Button variant="white">White</Button>
</>
```

##### Sizes

**Example — sm / md / lg**

Plain HTML (canonical):

```html
<button class="lp-button lp-button--primary lp-button--sm">Small — dense UI</button>
<button class="lp-button lp-button--primary lp-button--md">Medium — default</button>
<button class="lp-button lp-button--primary lp-button--lg">Large — with-icon</button>
```

React:

```jsx
import { Button } from '@ramsarjal-404/react';

<>
  <Button size="sm">Small — dense UI</Button>
  <Button size="md">Medium — default</Button>
  <Button size="lg">Large — with-icon</Button>
</>
```

##### With icons

Icon slots are presentational (`aria-hidden` on the SVG) — the label remains the accessible
name. Pass SVGs that stroke/fill with `currentColor` so theme switches recolor them.

**Example — Icon left (lg, 24px) and icon right (md, 16px)**

Plain HTML (canonical):

```html
<button class="lp-button lp-button--primary lp-button--lg">
  <span class="lp-button__icon-left">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  </span>
  Add credentials
</button>
<button class="lp-button lp-button--secondary lp-button--md">
  Next
  <span class="lp-button__icon-right">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M6 4l4 4-4 4" />
    </svg>
  </span>
</button>
```

React:

```jsx
import { Button, PlusIcon } from '@ramsarjal-404/react';

const ChevronRight = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 4l4 4-4 4" />
  </svg>
);

<>
  {/* icons render at 16px (md) or 24px (lg) and must use currentColor */}
  <Button variant="primary" size="lg" iconLeft={<PlusIcon />}>
    Add credentials
  </Button>
  <Button variant="secondary" iconRight={<ChevronRight />}>
    Next
  </Button>
</>
```

##### Disabled

Always the native `disabled` attribute — never a class alone. It removes the control from the
tab order and screen readers announce it as dimmed.

**Example — Disabled**

Plain HTML (canonical):

```html
<!-- native disabled: removed from tab order, announced as dimmed -->
<button class="lp-button lp-button--primary lp-button--md" disabled>Save changes</button>
<button class="lp-button lp-button--secondary lp-button--md" disabled>Cancel</button>
```

React:

```jsx
import { Button } from '@ramsarjal-404/react';

<>
  {/* native disabled attribute — removed from tab order, announced as dimmed */}
  <Button disabled>Save changes</Button>
  <Button variant="secondary" disabled>Cancel</Button>
</>
```

##### Full width

**Example — Full width inside a constrained container**

Plain HTML (canonical):

```html
<div style="max-width: 360px">
  <button class="lp-button lp-button--primary lp-button--md lp-button--full-width">
    Sign in
  </button>
</div>
```

React:

```jsx
import { Button } from '@ramsarjal-404/react';

<div style={{ maxWidth: 360 }}>
  <Button fullWidth>Sign in</Button>
</div>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Button is pure CSS and needs no `lepidus.js`.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` * | `ReactNode` | — | Button label |
| `disabled` | `boolean` | `false` | Disabled state — uses component/button/disabled tokens |
| `fullWidth` | `boolean` | `false` | Full-width button |
| `iconLeft` | `ReactNode` | — | Left icon slot |
| `iconRight` | `ReactNode` | — | Right icon slot |
| `size` | `enum` | `md` | Size — sm (compact, dense UI like table rows), md (regular) or lg (with-icon) |
| `variant` | `enum` | `primary` | Visual variant — maps 1:1 to Figma component tokens |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The entire pill surface is the click target — minimum 29px (`sm`) / 41px (`md`, `lg`) tall.
- Hover feedback is a fill change only; the button never moves or resizes, so the target stays
  stable mid-click.
- Clicking with the mouse does **not** show the focus ring (`:focus-visible` semantics).

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the button (native tab order) |
| `Enter` | Activates the button |
| `Space` | Activates the button (on key-up, native behavior) |

Focus shows a 3px brand-tinted ring (`rgba(28, 69, 153, 0.35)`) with no layout shift. Disabled
buttons use the native `disabled` attribute and are **removed from the tab order** — keyboard
users never land on an inert control.

**Screen readers**

- Renders a native `<button>` — implicit `role="button"`, no ARIA required for the base case.
- The accessible name is the text label. Icon slots are presentational (`aria-hidden="true"` on
  the SVG) and never contribute to the name — which is why icon-only Buttons are not allowed
  (use [ActionItem](https://lepide-design-system.vercel.app/components/action-item/) which requires `aria-label`).
- `disabled` is announced as "dimmed"/"unavailable" automatically by the native attribute.

##### Development considerations

- Inside a `<form>`, remember the default is `type="submit"` — set `type="button"` on
  non-submitting buttons to avoid accidental form submission.
- For toggle-style buttons (pressed/unpressed) add `aria-pressed`; for buttons that open menus
  or dialogs add `aria-haspopup` and `aria-expanded` — see
  [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/) and [Modal](https://lepide-design-system.vercel.app/components/modal/), which wire these for you.
- Never replicate "disabled" with CSS alone; only the native attribute conveys the state to
  assistive technology.
- Color is never the only signal: danger buttons must carry a destructive verb in the label
  ("Delete report", not just a red "OK").

##### Content

- Labels are the accessible name — make them self-sufficient out of context: "Delete report"
  rather than "Delete", when the surrounding context might be ambiguous to a screen-reader user
  jumping by control.
- Use sentence case ("Save changes"), keep to 1–3 words where possible.

#### Hard-fail checks — Button

- [ ] **Page CSS never targets `.lp-*` selectors — no `.lp-dropdown { width: 100% }`, no `.lp-stepper { max-width }`, no `.footer-actions .lp-button { flex: 1 }`, no media-query overrides of `.lp-input__row--label-left`. The width you want already exists as a modifier: `lp-dropdown--full-width`, `lp-stepper--full-width`, `lp-input--full-width`, `lp-textarea--full-width`, `lp-text-field--full-width`, `lp-button--full-width`. For narrow containers choose `lp-input__row--label-top` instead of overriding `--label-left`.** _(observed drift: a composed form shipped 8 such rules; they bypass the token geometry and drift from Storybook in every theme.)_
- [ ] **Only use token names that exist: surfaces are `--color-background-{page|surface|raised|subtle|cards}`, borders `--color-border-{default|strong|brand|danger}`. Never guess a name and add a hex fallback — `var(--color-border-primary, #dce3ed)` is a hardcoded color with extra steps.** _(observed drift: three invented tokens with hex fallbacks rendered off-system colors that do not re-theme in dark or hc.)_
- [ ] Every `lp-button*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] ARIA state kept and updated: `aria-hidden`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="link"></a>

### Link

Token-bound navigation anchor — an underlined inline variant for running text and a standalone variant with an optional trailing icon.

- **Availability:** plain CSS (block `lp-link`) + React
- **React:** `import { Link } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/link/ · **Storybook:** [Inline](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-link--inline), [Standalone](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-link--standalone), [External](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-link--external), [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-link--disabled), [As Router Link](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-link--as-router-link), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-link--all-states)
- **Related:** [button](#button), [breadcrumb](#breadcrumb), [action-item](#action-item)

#### Legal class set (complete — do not invent others)

`lp-link` · `lp-link--disabled` · `lp-link--inline` · `lp-link--standalone` · `lp-link__external-icon` · `lp-link__icon` · `lp-link__visually-hidden`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<a>`
- **ARIA attributes:** `aria-disabled`, `aria-hidden`

#### Purpose and usage rules

##### Overview

Link navigates to another page or resource. It renders a native `<a>` (or any component you pass
via `as`, such as a router link) in brand-blue text that darkens on hover — `--color-text-brand`
→ `--color-brand-primary-hover`, all resolved through semantic tokens so the dark and
high-contrast themes restyle it with no extra code. Two variants: `inline` is underlined for use
inside running text; `standalone` is semibold without an underline for links that sit on their
own.

##### Best practices

- Write link text that **names the destination** — "Billing settings", "Migration guide" —
  never "click here".
- Use `inline` inside paragraphs and keep its underline; it is what makes the link identifiable
  without relying on color.
- Use `standalone` for links that stand alone (card footers, "View all" rows), where placement
  carries the affordance and a trailing icon can reinforce direction.
- Mark any link that leaves the product with `external` so the new tab is announced and
  signposted.
- Pass your router's link component via `as` for client-side navigation without losing the
  system styling.

##### When not to use

- **Actions** — if activating the element performs an action (submit, delete, toggle), use
  [Button](https://lepide-design-system.vercel.app/components/button/), even if it should look like a link. `onClick` with no `href`
  is a button, not a link.
- **Compact icon-only actions** — use [ActionItem](https://lepide-design-system.vercel.app/components/action-item/); a Link's
  accessible name must come from its text.
- **Showing where the user is** in a page hierarchy — use
  [Breadcrumb](https://lepide-design-system.vercel.app/components/breadcrumb/), which composes links with the correct trail semantics.

##### Variants

**Inline**

Underlined, inherits the surrounding type scale. **Use for** links inside running text — the
underline (3px offset, thickening on hover) keeps it identifiable without color alone.

▶ Live: [Inline, inside a paragraph](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-link--inline)

**Standalone**

Body MD Semibold without an underline (it gains one on hover), with an optional trailing `icon`
slot. **Use for** links that sit on their own — "View all projects", card footers.

▶ Live: [Standalone with trailing icon](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-link--standalone)

**External**

Adds `target="_blank"` + `rel="noreferrer"`, a visually-hidden "(opens in new tab)" suffix for
screen readers, and a small decorative new-tab glyph.

▶ Live: [External link](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-link--external)

**Disabled**

Per WAI guidance a disabled link is not a link: it renders a non-focusable
`<span aria-disabled="true">` with no `href`, styled with the disabled text color.

▶ Live: [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/actions-link--disabled)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Anchor | `<a>`, the `as` component, or a `<span aria-disabled="true">` when disabled |
| 2 | Label | Required text — inherits the paragraph type scale (`inline`) or Body MD Semibold 14/19 (`standalone`) |
| 3 | Trailing icon *(optional, standalone)* | 14px `aria-hidden` slot; SVG must use `currentColor` |
| 4 | External suffix *(optional)* | Visually-hidden "(opens in new tab)" + 12px decorative glyph |
| 5 | Focus outline | 2px `--color-focus-ring` outline with 2px offset on `:focus-visible` only |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Hover | Text darkens to `--color-brand-primary-hover`; `inline` thickens its underline 1px → 2px, `standalone` gains one |
| Focus | 2px brand-tinted outline on `:focus-visible`; mouse clicks show no ring |
| External | `target="_blank"` + `rel="noreferrer"`, screen-reader suffix, decorative glyph |
| Disabled | `<span aria-disabled="true">` with no `href` — removed from the tab order, `cursor: not-allowed` |
| Reduced motion | The 120ms color transition is suppressed under `prefers-reduced-motion: reduce` |
| Theming | Brand, hover, and disabled text tokens re-resolve automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Write link text that names the destination: “Billing settings”, “Migration guide”.
- ✕ **Don't** — Write “click here”, or wire actions to a Link — actions belong to Button.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the
same tokens, so they are pixel-identical in every theme.

##### Inline

Block `lp-link` + `lp-link--inline` on a normal anchor inside running text.

**Example — Inline link in a paragraph**

Plain HTML (canonical):

```html
<p style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19px; max-width: 420px; margin: 0">
  Your subscription renews on June 30. Review your
  <a class="lp-link lp-link--inline" href="#billing">billing settings</a>
  to change the plan before the renewal date.
</p>
```

React:

```jsx
import { Link } from '@ramsarjal-404/react';

<p>
  Your subscription renews on June 30. Review your{' '}
  <Link href="#billing">billing settings</Link> to change the plan before the
  renewal date.
</p>
```

##### Standalone with icon

`lp-link--standalone` drops the underline; the trailing icon goes in `lp-link__icon` and must
use `currentColor` so hover and theme switches recolor it. In React, pass the SVG via the
`icon` prop.

**Example — Standalone with trailing icon**

Plain HTML (canonical):

```html
<a class="lp-link lp-link--standalone" href="#all-projects">
  View all projects
  <span class="lp-link__icon" aria-hidden="true">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M2.5 8h11" />
      <path d="M9 3.5 13.5 8 9 12.5" />
    </svg>
  </span>
</a>
```

React:

```jsx
import { Link } from '@ramsarjal-404/react';

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 8h11" />
    <path d="M9 3.5 13.5 8 9 12.5" />
  </svg>
);

<Link variant="standalone" href="#all-projects" icon={<ArrowIcon />}>
  View all projects
</Link>
```

##### External

External links add `target="_blank"` + `rel="noreferrer"`, a `lp-link__visually-hidden`
"(opens in new tab)" span for screen readers, and the `lp-link__external-icon` glyph. The React
`external` prop renders all of this for you.

**Example — External link**

Plain HTML (canonical):

```html
<a class="lp-link lp-link--inline" href="https://www.w3.org/WAI/ARIA/apg/"
   target="_blank" rel="noreferrer">
  ARIA Authoring Practices
  <span class="lp-link__visually-hidden">(opens in new tab)</span>
  <svg class="lp-link__external-icon" viewBox="0 0 16 16" aria-hidden="true"
       fill="none" stroke="currentColor" stroke-width="1.5"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M6.75 3.75H4.25c-.83 0-1.5.67-1.5 1.5v6.5c0 .83.67 1.5 1.5 1.5h6.5c.83 0 1.5-.67 1.5-1.5V9.25" />
    <path d="M9.75 2.75h3.5v3.5" />
    <path d="M13 3 7.25 8.75" />
  </svg>
</a>
```

React:

```jsx
import { Link } from '@ramsarjal-404/react';

<Link href="https://www.w3.org/WAI/ARIA/apg/" external>
  ARIA Authoring Practices
</Link>
```

##### Disabled

A disabled link is not a link: render a `<span aria-disabled="true">` with no `href` (the React
component does this automatically when `disabled` is set).

**Example — Disabled**

Plain HTML (canonical):

```html
<span class="lp-link lp-link--standalone lp-link--disabled" aria-disabled="true">
  Unavailable report
</span>
```

React:

```jsx
import { Link } from '@ramsarjal-404/react';

<Link variant="standalone" disabled>
  Unavailable report
</Link>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Link is pure CSS and needs no `lepidus.js`.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `ElementType` | — | Polymorphic escape hatch: `'a'` (default) or a component such as a router link. The component receives all anchor props (`href`, `className`, …). |
| `children` * | `ReactNode` | — | Link text (required — never rely on the icon alone). |
| `disabled` | `boolean` | `false` | Disabled per WAI guidance: renders a non-focusable `<span aria-disabled="true">` with no `href`, styled with the disabled text color. |
| `external` | `boolean` | `false` | Marks the destination as external: adds `target="_blank"` + `rel="noreferrer"`, a visually-hidden "(opens in new tab)" suffix for screen readers, and a small decorative new-tab glyph. |
| `icon` | `ReactNode` | — | Trailing icon slot for the `standalone` variant — pass an SVG using `currentColor`. Rendered `aria-hidden`; ignored by the `inline` variant. |
| `variant` | `enum` | `inline` | Visual variant — `inline` (default) is underlined for use inside running text; `standalone` drops the underline and supports a trailing `icon` slot. |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The whole text run is the click target; `standalone` links include their trailing icon in the
  target.
- Hover gives two cues — darker text and a thicker (or appearing) underline — so feedback never
  relies on color alone.
- Clicking with the mouse does **not** show the focus outline (`:focus-visible` semantics).

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the link (native tab order) |
| `Enter` | Follows the link |

Links activate with `Enter` only — `Space` scrolls the page, which is native anchor behavior
and another reason not to use a Link where a [Button](https://lepide-design-system.vercel.app/components/button/) belongs. Focus shows
a 2px brand-tinted outline with a 2px offset and no layout shift.

**Screen readers**

- Renders a native `<a href>` — implicit `role="link"`, announced from the link text.
- `external` appends a visually-hidden "(opens in new tab)" to the accessible name, so the
  context change is announced; the new-tab glyph itself is `aria-hidden`.
- Disabled links follow WAI guidance: a `<span aria-disabled="true">` with no `href` — removed
  from the tab order rather than left as a focusable dead anchor.
- Inline links keep their underline, so they are distinguishable from body text without relying
  on color (WCAG 1.4.1).

##### Development considerations

- Keep the `href`; a link without one is not keyboard-reachable. For client-side routing pass
  the router's link component via `as` — anchor props are forwarded and router props (`to`)
  pass through.
- In plain HTML, build disabled links as the component does: swap the `<a>` for a
  `<span class="lp-link lp-link--standalone lp-link--disabled" aria-disabled="true">` — never a
  click-blocked anchor.
- Always pair `target="_blank"` with `rel="noreferrer"` and the visually-hidden suffix (the
  React `external` prop does all three).
- The hover color transition is suppressed under `prefers-reduced-motion: reduce` — don't add
  extra motion on top.

##### Content

- Link text must describe the destination out of context — screen-reader users jump from link
  to link, so "Billing settings" works where "here" does not.
- Make the meaningful phrase the link, not the words around it: "Review your *billing
  settings*", not "*Click here* to review billing settings".
- Keep standalone links short (1–4 words); they read as labels, not sentences.

#### Hard-fail checks — Link

- [ ] Every `lp-link*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<a>` — no `div` stand-ins.
- [ ] ARIA state kept and updated: `aria-disabled`, `aria-hidden`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

### Forms

<a id="calendar"></a>

### Calendar

Titled scheduling card with a month grid, H/M/S time row, and optional weekday and date recurrence selectors — composes a full daily, weekly, or monthly schedule.

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { Calendar } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/calendar/ · **Storybook:** [Daily](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-calendar--daily), [Weekly](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-calendar--weekly), [Monthly](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-calendar--monthly), [All Variants](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-calendar--all-variants)
- **Related:** [time-picker](#time-picker), [dropdown](#dropdown), [modal](#modal)

#### Purpose and usage rules

##### Overview

Calendar is a titled scheduling card: a **Start On** month/year picker, an interactive month
grid, a **Start At** H/M/S time row and — depending on the `variant` frequency — weekday and
date multi-selects, closed by a Cancel / Done footer. Use it inside scheduling flows (configuring
a recurring job, report, or scan) where the user composes a full schedule in one card. It is a
composite scheduler, not a generic date input: all selection state is internal (uncontrolled),
seeded by the `default*` props and reported in one piece through `onDone`.

##### Best practices

- Pick the **lightest variant** that fits the schedule: `daily` unless weekday or date recurrence
  is genuinely needed.
- Read the final selection **only from `onDone`** — intermediate time, weekday, and date changes
  are intentionally not surfaced.
- Pass `markedDates` to flag days that already have scheduled events, so users avoid collisions.
- Seed sensible defaults (`defaultMonth`, `defaultYear`, `defaultSelectedDate`) when editing an
  existing schedule, and widen `yearRange` only if schedules genuinely span beyond ±5 years.

##### When not to use

- **Picking just a clock time** — use [TimePicker](https://lepide-design-system.vercel.app/components/time-picker/); Calendar embeds its
  own H/M/S dropdowns inside the larger schedule.
- **Date of birth, ranges, or generic date fields** — Calendar models a *recurring schedule*; a
  plain [Input](https://lepide-design-system.vercel.app/components/input/) or a dedicated date field fits one-off dates better.
- **Selecting list values** — use [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/).

##### Types

**Daily**

The base card: Start On month/year picker, the day grid, the Start At H/M/S row, and the footer —
no recurrence selectors.

▶ Live: [Daily schedule](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-calendar--daily)

**Weekly**

Adds the **Select Month** weekday chip multi-select — chosen weekdays render as removable blue
chips. This story also demonstrates `markedDates` event dots.

▶ Live: [Weekly schedule with weekday chips and event dots](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-calendar--weekly)

**Monthly**

Adds both the weekday chips and the **Select Date** round-chip grid (1–31) for date-of-month
recurrence.

▶ Live: [Monthly schedule with weekday and date chips](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-calendar--monthly)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Header | White bar with the bold title — defaults to "`<Variant>` Schedule" |
| 2 | Start On row | Two brand-filled Month and Year dropdowns with leading calendar glyphs |
| 3 | Month grid | 7-column grid of circular day cells; today is ring-outlined, the selection tinted, event days dotted |
| 4 | Start At row | Three white bordered H / M / S dropdown pills |
| 5 | Select Month / Select Date rows | Chip multi-select fields (`weekly` / `monthly` only); selected values are removable blue chips (round chips for dates) |
| 6 | Footer | Cancel (secondary) and Done (primary) system [Button](https://lepide-design-system.vercel.app/components/button/)s |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Month / year | The dropdowns re-render the grid for the chosen month; the year list spans `yearRange` offsets around the current year (default ±5) |
| Day selection | Clicking a day selects it (single selection) and fires `onSelectDate`; days in `markedDates` carry an event dot |
| Dismissal | All dropdowns and chip popovers close on outside click; the dropdowns also close on `Escape` |
| Chips | Clicking a popover option or a chip itself adds/removes the value; selections stay sorted |
| Time | H/M/S selections are internal state, reported only through `onDone` |
| Commit | Done fires `onDone` with the entire `CalendarValue` (year, month, day, time, weekdays, dates); Cancel fires `onCancel` — neither clears internal state |
| Theming | Card, grid, and chips resolve through `component/calendar/*` and semantic tokens in all three themes |

- ✓ **Do** — Use the daily variant by default and read the whole schedule once from onDone.
- ✕ **Don't** — Use Calendar as a general date-of-birth or range picker — it models a recurring schedule, not a date field.

#### Canonical anatomy and examples

> **React-only** — This component has no `@ramsarjal-404/css` distribution yet — use `@ramsarjal-404/react`.

Calendar is uncontrolled — seed it with the `default*` props and read the composed schedule from
`onDone`.

##### Daily schedule

The base card. `onDone` receives the full `CalendarValue`; `onSelectDate` fires on every day
click if you need it live.

**Example — Daily schedule with a Done handler**

React:

```jsx
import { Calendar } from '@ramsarjal-404/react';

<Calendar
  variant="daily"
  defaultMonth={0}        // January (0–11)
  defaultYear={2026}
  defaultSelectedDate={15}
  onSelectDate={({ year, month, day }) => console.log(year, month, day)}
  onDone={(value) => saveSchedule(value)} // { year, month, day, time, weekdays, dates }
  onCancel={() => close()}
/>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live: month grid + H/M/S time row](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-calendar--daily)

##### Weekly with marked dates

`variant="weekly"` adds the weekday chip multi-select; `markedDates` dots days that already have
events in the shown month.

**Example — Weekly schedule with event dots**

React:

```jsx
import { Calendar } from '@ramsarjal-404/react';

<Calendar
  variant="weekly"
  title="Weekly Backup"
  defaultMonth={0}
  defaultYear={2026}
  defaultSelectedDate={15}
  markedDates={[8, 14, 19, 30]} // days of the shown month with an event dot
  onDone={(value) => saveSchedule(value)} // value.weekdays: selected indices, 0=Sun…6=Sat
  onCancel={() => close()}
/>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live: weekday chips and event dots](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-calendar--weekly)

##### Monthly recurrence

`variant="monthly"` adds the Select Date round-chip grid (1–31) on top of the weekday chips —
`onDone` reports both as `weekdays` (0=Sun…6=Sat) and `dates` arrays.

**Example — Monthly schedule reading the full value**

React:

```jsx
import { Calendar } from '@ramsarjal-404/react';

<Calendar
  variant="monthly"
  defaultMonth={0}
  defaultYear={2026}
  defaultSelectedDate={15}
  yearRange={[-2, 10]} // year dropdown offsets relative to today (default [-5, 5])
  onDone={({ weekdays, dates, time }) => {
    // weekdays: 0=Sun…6=Sat; dates: selected days of month (1–31)
    saveSchedule({ weekdays, dates, time });
  }}
  onCancel={() => close()}
/>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live: weekday + date-of-month chips](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-calendar--monthly)

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultMonth` | `number` | — | Initial month shown (0–11). Defaults to the current month. |
| `defaultSelectedDate` | `number` | — | Initially selected day of month (1–31). |
| `defaultYear` | `number` | — | Initial year shown. Defaults to the current year. |
| `markedDates` | `number[]` | — | Days of the shown month (1–31) to mark with an event dot. |
| `onCancel` | `(() => void)` | — | Footer — Cancel. |
| `onDone` | `((value: CalendarValue) => void)` | — | Footer — Done. Receives the full current selection. |
| `onSelectDate` | `((date: { year: number; month: number; day: number; }) => void)` | — | Fired when the user picks a day. |
| `title` | `string` | — | Heading text. Defaults to "`<Variant>` Schedule". |
| `variant` | `enum` | `daily` | Schedule type. Default `daily`. |
| `yearRange` | `[number, number]` | `[-5, 5]` | First/last year offered in the year dropdown, relative to today. Default ±5. |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Month, Year, and H/M/S pickers open as listbox panels under their triggers; clicking an option
  selects it and closes the panel.
- Clicking a day cell selects it (single selection); clicking a chip-field popover option or an
  existing chip adds/removes that weekday or date.
- Outside clicks close any open dropdown or chip popover.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves through triggers, day cells, chip fields, and footer buttons in document order |
| `Enter` / `Space` | Activates the focused control — opens a dropdown, selects a day (they are native buttons), toggles a chip field (`role="button"`, `tabIndex={0}`) |
| `Escape` | Closes the open Month/Year/H/M/S dropdown or chip popover |
| Arrow keys | Not handled — there is no roving focus across the grid; day cells are individual tab stops |

Day cells and footer buttons show visible brand `:focus-visible` outlines.

**Screen readers**

- The card is `role="dialog"` labelled by the heading text — don't wrap it in another dialog
  role.
- Month/Year/H/M/S triggers expose `aria-haspopup="listbox"` + `aria-expanded`; their panels are
  `role="listbox"` with `role="option"` + `aria-selected` items.
- The month grid is a `role="group"` labelled "`<Month> <Year>`" — a flat set of day **toggle
  buttons**, not an ARIA grid of rows. Day buttons use `aria-pressed` for selection, and event
  dots carry `aria-label="has event"`.
- Chip fields are `role="button"` with Enter/Space toggling, and each chip's remove control is
  labelled "Remove `<label>`".
- Empty leading grid cells are `aria-hidden` spacers.

##### Development considerations

- Treat `onDone` as the single source of truth: it delivers the whole `CalendarValue` (`year`,
  `month`, `day`, `time {h,m,s}`, `weekdays`, `dates`). `onCancel` does **not** reset internal
  state — unmount/remount the card (or key it) to start fresh.
- `month` is zero-based (0–11) everywhere — in `defaultMonth`, `onSelectDate`, and `onDone`.
- `weekdays` use 0=Sunday … 6=Saturday; `dates` are days of month 1–31. Validate impossible
  combinations (e.g. date 31 in February) in your scheduler, not in the card.
- The card announces itself as a dialog but does not trap focus; if you present it in an overlay,
  manage focus entry/exit in the host.

##### Content

- The default title is "`<Variant>` Schedule" — override `title` with the actual job name
  ("Weekly Backup") when the context isn't obvious.
- Keep titles to a few words; the header is a single bold line.

#### Hard-fail checks — Calendar

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="checkbox"></a>

### Checkbox

Binary form control built on a native checkbox — collects a yes/no choice submitted with a form, with indeterminate, error, and disabled states.

- **Availability:** plain CSS (block `lp-checkbox`) + React
- **React:** `import { Checkbox } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/checkbox/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--default), [Checked](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--checked), [Indeterminate](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--indeterminate), [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--disabled), [With Error](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--with-error), [Group](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--group), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--all-states)
- **Related:** [radio](#radio), [toggle](#toggle), [dropdown](#dropdown), [input](#input)

#### Legal class set (complete — do not invent others)

`lp-checkbox` · `lp-checkbox--disabled` · `lp-checkbox__box` · `lp-checkbox__box--error` · `lp-checkbox__check` · `lp-checkbox__control` · `lp-checkbox__dash` · `lp-checkbox__input` · `lp-checkbox__label`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<input>`, `<label>`
- **ARIA attributes:** `aria-describedby`, `aria-hidden`, `aria-invalid`

#### Purpose and usage rules

##### Overview

Checkbox collects a yes/no choice that is submitted with a form — accept terms, include an
option, select rows. It is a native `<input type="checkbox">` visually hidden over a 16px
styled box, so click, Space, focus, and form submission are all native behavior. The box reuses
the dropdown checkbox token pair (`--component-dropdown-checkbox-border/-fill`) so standalone
checkboxes and the multi-select [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/) never drift, and every theme
restyles it with no extra code.

##### Best practices

- Use a checkbox when the value is **collected and submitted** — not applied instantly.
- Always give it a name: pass `label` (rendered in a real `<label>` wrapper, so clicking the
  text toggles the box) or `aria-label` when the surrounding context labels it visually.
- Use `indeterminate` on a "select all" parent over a partially-selected list — it clears on
  the next user toggle.
- Phrase labels positively ("Enable audit trail"), never as a negation ("Don't disable…").
- Pair the `error` state with visible error text near the control — the red border alone is
  not sufficient feedback.

##### When not to use

- **The change applies instantly** (no Save button) — use [Toggle](https://lepide-design-system.vercel.app/components/toggle/), which
  announces itself as a switch.
- **One-of-many choices** — use [Radio](https://lepide-design-system.vercel.app/components/radio/) for 2–5 visible options, or
  [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/) beyond that.
- **A labeled text value** — that's [Input](https://lepide-design-system.vercel.app/components/input/); Checkbox is strictly binary.

##### Variants

**Default and checked**

Unchecked is a white box with a 1px brand border; checking fills it brand blue with a white
check glyph. **Use for** any independent yes/no option in a form.

▶ Live: [Default (click to toggle)](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--default)

▶ Live: [Checked — brand fill, white check](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--checked)

**Indeterminate**

The "mixed" state — a dash glyph instead of a check, exposed to assistive tech as
`aria-checked="mixed"`. **Use on** a parent checkbox that tracks a partially-selected group;
it is set by your code, never directly by the user.

▶ Live: [Indeterminate (mixed)](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--indeterminate)

**Error**

The box border switches to the status-error token and `aria-invalid` is set. **Use for** an
invalid required choice — e.g. unaccepted terms on submit.

▶ Live: [Error — pair with visible error text](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--with-error)

**Disabled**

Native `disabled` attribute — gray box and label, removed from the tab order. Both the checked
and unchecked positions have disabled styling.

▶ Live: [Disabled pair](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--disabled)

**Group with select-all**

A `<fieldset>` of checkboxes under a parent that is checked when all are selected and
indeterminate while only some are.

▶ Live: [Select-all parent goes indeterminate while the list is partially selected](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-checkbox--group)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Label wrapper | Real `<label>` root — clicking anywhere (box or text) toggles |
| 2 | Input | Native checkbox, visually hidden over the box; the click/focus/a11y target |
| 3 | Box | 16px square, `--radius-3xs` (3px) corners, 1px brand border; brand fill when checked or indeterminate |
| 4 | Check / dash glyph | White inline SVG, `aria-hidden`; check when checked, dash when indeterminate |
| 5 | Label text *(optional)* | Open Sans 14px in `--color-text-primary` |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Toggle | Click (box or label text) and Space flip the state — native checkbox behavior |
| Focus | 3px brand-tinted ring (`--color-focus-ring`) on `:focus-visible` only |
| Indeterminate | DOM property + `aria-checked="mixed"`; dash glyph; clears on the next toggle |
| Error | Border uses `--color-status-error-text`; `aria-invalid` is set |
| Disabled | Native `disabled` — subtle gray box, gray label, removed from tab order, `cursor: not-allowed` |
| Motion | Glyph scales in over 120ms; transitions collapse under `prefers-reduced-motion` |
| Theming | All tokens re-resolve automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Use indeterminate on a “select all” parent while its list is partially selected.
- ✕ **Don't** — Use a checkbox for an instant on/off setting — that's Toggle, which announces itself as a switch.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the
same tokens, so they are pixel-identical in every theme.

##### Basic

The root is a real `<label class="lp-checkbox">` wrapping the hidden native input and the
styled box — clicking the text toggles the box. `:checked` on the input drives the fill and
glyph; no JavaScript needed.

**Example — Unchecked and checked**

Plain HTML (canonical):

```html
<div style="display: flex; gap: 24px; align-items: center">
  <label class="lp-checkbox">
    <span class="lp-checkbox__control">
      <input class="lp-checkbox__input" type="checkbox" />
      <span class="lp-checkbox__box" aria-hidden="true">
        <svg class="lp-checkbox__check" viewBox="0 0 10 8" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4.2 3.8 7 9 1"/></svg>
        <svg class="lp-checkbox__dash" viewBox="0 0 10 2" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round"><path d="M1 1h8"/></svg>
      </span>
    </span>
    <span class="lp-checkbox__label">Enable audit trail</span>
  </label>
  <label class="lp-checkbox">
    <span class="lp-checkbox__control">
      <input class="lp-checkbox__input" type="checkbox" checked />
      <span class="lp-checkbox__box" aria-hidden="true">
        <svg class="lp-checkbox__check" viewBox="0 0 10 8" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4.2 3.8 7 9 1"/></svg>
        <svg class="lp-checkbox__dash" viewBox="0 0 10 2" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round"><path d="M1 1h8"/></svg>
      </span>
    </span>
    <span class="lp-checkbox__label">Include subfolders</span>
  </label>
</div>
```

React:

```jsx
import { Checkbox } from '@ramsarjal-404/react';

<>
  <Checkbox label="Enable audit trail" />
  <Checkbox label="Include subfolders" defaultChecked />
</>
```

##### Indeterminate

The mixed state only exists as a DOM property — set `input.indeterminate = true` from script
(React does this for you via the `indeterminate` prop, which also sets
`aria-checked="mixed"`). It clears natively on the next user toggle.

**Example — Indeterminate (select-all parent)**

Plain HTML (canonical):

```html
<label class="lp-checkbox">
  <span class="lp-checkbox__control">
    <input class="lp-checkbox__input" type="checkbox" data-indeterminate />
    <span class="lp-checkbox__box" aria-hidden="true">
      <svg class="lp-checkbox__check" viewBox="0 0 10 8" fill="none" stroke="currentColor"
           stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4.2 3.8 7 9 1"/></svg>
      <svg class="lp-checkbox__dash" viewBox="0 0 10 2" fill="none" stroke="currentColor"
           stroke-width="1.8" stroke-linecap="round"><path d="M1 1h8"/></svg>
    </span>
  </span>
  <span class="lp-checkbox__label">Select all permissions</span>
</label>

<script>
  // indeterminate only exists as a DOM property — set it from script
  document.querySelectorAll('[data-indeterminate]').forEach((el) => {
    el.indeterminate = true;
  });
</script>
```

React:

```jsx
import { Checkbox } from '@ramsarjal-404/react';

// `indeterminate` sets the DOM property and aria-checked="mixed".
// Drive it from the group state — it clears on the next user toggle.
<Checkbox
  label="Select all permissions"
  indeterminate={selected.length > 0 && selected.length < options.length}
  checked={selected.length === options.length}
  onChange={(next) => setSelected(next ? [...options] : [])}
/>
```

##### Error

Add `lp-checkbox__box--error` to the box and `aria-invalid="true"` to the input, and point
`aria-describedby` at visible error text — the red border alone is not enough.

**Example — Error with linked message**

Plain HTML (canonical):

```html
<div style="display: flex; flex-direction: column; gap: 6px">
  <label class="lp-checkbox">
    <span class="lp-checkbox__control">
      <input class="lp-checkbox__input" type="checkbox" aria-invalid="true" aria-describedby="terms-err" />
      <span class="lp-checkbox__box lp-checkbox__box--error" aria-hidden="true">
        <svg class="lp-checkbox__check" viewBox="0 0 10 8" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4.2 3.8 7 9 1"/></svg>
        <svg class="lp-checkbox__dash" viewBox="0 0 10 2" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round"><path d="M1 1h8"/></svg>
      </span>
    </span>
    <span class="lp-checkbox__label">I accept the terms</span>
  </label>
  <span id="terms-err" style="font: 12px/16px 'Open Sans', sans-serif; color: var(--color-status-error-text)">
    You must accept the terms to continue.
  </span>
</div>
```

React:

```jsx
import { Checkbox } from '@ramsarjal-404/react';

{/* error paints the status-error border and sets aria-invalid —
    always pair it with visible error text near the control */}
<Checkbox label="I accept the terms" error aria-describedby="terms-err" />
```

##### Disabled

Always the native `disabled` attribute plus the `lp-checkbox--disabled` root modifier (it
grays the label and switches the cursor) — never a class alone.

**Example — Disabled pair**

Plain HTML (canonical):

```html
<div style="display: flex; gap: 24px; align-items: center">
  <!-- native disabled + the root modifier: gray label, not-allowed cursor -->
  <label class="lp-checkbox lp-checkbox--disabled">
    <span class="lp-checkbox__control">
      <input class="lp-checkbox__input" type="checkbox" disabled />
      <span class="lp-checkbox__box" aria-hidden="true"></span>
    </span>
    <span class="lp-checkbox__label">Disabled</span>
  </label>
  <label class="lp-checkbox lp-checkbox--disabled">
    <span class="lp-checkbox__control">
      <input class="lp-checkbox__input" type="checkbox" disabled checked />
      <span class="lp-checkbox__box" aria-hidden="true">
        <svg class="lp-checkbox__check" viewBox="0 0 10 8" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4.2 3.8 7 9 1"/></svg>
      </span>
    </span>
    <span class="lp-checkbox__label">Disabled checked</span>
  </label>
</div>
```

React:

```jsx
import { Checkbox } from '@ramsarjal-404/react';

<>
  <Checkbox label="Disabled" disabled />
  <Checkbox label="Disabled checked" disabled defaultChecked />
</>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Checkbox is pure CSS; only the indeterminate state needs the one-line script shown above.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled checked state. Pair with `onChange`. |
| `className` | `string` | — | Extra class on the root `<label>` wrapper. |
| `defaultChecked` | `boolean` | — | Uncontrolled initial state (default false). |
| `disabled` | `boolean` | `false` | Disabled state — gray box and label, interaction blocked. |
| `error` | `boolean` | `false` | Error state — the box border uses the status-error token. |
| `indeterminate` | `boolean` | `false` | Indeterminate ("mixed") state — shown as a dash glyph and exposed to assistive tech as `aria-checked="mixed"`. Set from a parent that tracks a partially-selected group; clears on the next user toggle. |
| `label` | `ReactNode` | — | Visible label rendered inside a real `<label>` wrapper, so clicking the text toggles the box. Without it, name the control with `aria-label`. |
| `onChange` | `((checked: boolean, event: ChangeEvent`<HTMLInputElement>`) => void)` | — | Called with the next checked state when the user toggles the box. The raw change event is passed as the second argument. |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The whole component is a real `<label>` wrapper — clicking the box **or the label text**
  toggles, giving a much larger target than the 16px box alone.
- The native input is visually hidden but stretched over the box, so it stays the actual
  click target; hit-testing is native.
- Clicking does not show the focus ring (`:focus-visible` semantics).

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the checkbox (native tab order) |
| `Space` | Toggles checked / unchecked (native behavior) |

Focus shows a 3px brand-tinted ring (`--color-focus-ring`) around the box on `:focus-visible`
only. Disabled checkboxes use the native `disabled` attribute and are removed from the tab
order.

**Screen readers**

- Renders a native `<input type="checkbox">` — implicit `role="checkbox"`, state announced
  natively as checked / not checked.
- The accessible name comes from the wrapping `<label>` when you pass `label`; without one
  you must supply `aria-label`. The box and its SVG glyphs are `aria-hidden="true"`
  decoration.
- `indeterminate` sets both the DOM property **and** `aria-checked="mixed"` — announced as
  "mixed" / "partially checked".
- `error` sets `aria-invalid` on the input.

##### Development considerations

- **Label association is structural** — the input sits inside the `<label>`, so no `for`/`id`
  pair is needed in the React component. In plain HTML keep the input inside
  `<label class="lp-checkbox">` (or wire `for`/`id` if you must separate them).
- For the error state, place the message in the DOM and link it with `aria-describedby` on
  the input — `aria-invalid` alone tells the user *that* something is wrong, not *what*.
- `indeterminate` is presentation for a parent control; the underlying submitted value is
  still only checked/unchecked. Compute group state in your code (see the
  [Group story](https://lepide-design-system.vercel.app/components/checkbox/)).
- Group related checkboxes in a `<fieldset>` with a `<legend>` so screen readers announce the
  group context.
- Never replicate "disabled" with CSS alone; only the native attribute conveys the state to
  assistive technology.

##### Content

- Labels state the positive outcome of checking: "Enable audit trail", "Include subfolders" —
  never negations the user must mentally invert ("Don't send notifications").
- Keep labels short and self-sufficient out of context; a screen-reader user jumping by form
  control hears only the label.
- Error text says how to fix the problem ("You must accept the terms to continue"), not just
  "Invalid".

#### Hard-fail checks — Checkbox

- [ ] Every `lp-checkbox*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<input>`, `<label>` — no `div` stand-ins.
- [ ] ARIA state kept and updated: `aria-describedby`, `aria-hidden`, `aria-invalid`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="dropdown"></a>

### Dropdown

Pill-shaped select for choosing one or many values from a fixed list — single-select, multi-select with checkboxes, and a draft-then-Apply mode.

- **Availability:** plain CSS (block `lp-dropdown`) + React
- **React:** `import { Dropdown } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/dropdown/ · **Storybook:** [Select](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-dropdown--select), [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-dropdown--disabled), [Multi With Buttons](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-dropdown--multi-with-buttons), [Multi Without Buttons](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-dropdown--multi-without-buttons), [Without Checkbox](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-dropdown--without-checkbox), [All Variants](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-dropdown--all-variants)
- **Related:** [filter](#filter), [input](#input), [checkbox](#checkbox), [button](#button)

#### Legal class set (complete — do not invent others)

`lp-dropdown` · `lp-dropdown--full-width` · `lp-dropdown__checkbox` · `lp-dropdown__chevron` · `lp-dropdown__chevron--open` · `lp-dropdown__footer` · `lp-dropdown__header` · `lp-dropdown__header-label` · `lp-dropdown__list` · `lp-dropdown__option` · `lp-dropdown__option-label` · `lp-dropdown__panel` · `lp-dropdown__trigger` · `lp-dropdown__trigger--disabled` · `lp-dropdown__trigger--hidden` · `lp-dropdown__trigger-label`

#### Hooks and semantics the canonical markup relies on

- **lepidus.js hooks:** `data-lp-dropdown="multi"`, `data-lp-dropdown="single"`
- **Native elements (keep them native):** `<button>`
- **Roles:** `role="listbox"`, `role="option"`
- **ARIA attributes:** `aria-checked`, `aria-expanded`, `aria-haspopup`, `aria-hidden`, `aria-label`, `aria-multiselectable`

#### Purpose and usage rules

##### Overview

Dropdown is the system's pill-shaped select for choosing one or many values from a fixed list —
filters, form selects, and table controls where the option set is known and short enough to scan.
The trigger is a rounded (`--radius-6xl` → 30px) bordered pill; when open, a panel with a blue
header replaces the trigger in place and lists 40px option rows. Every color resolves through the
`component/dropdown/*` tokens, so dark and high-contrast themes restyle it with no extra code.

##### Best practices

- Keep the option set **short and scannable** — roughly 3–10 items; the panel does not search or
  filter.
- Use `multiple` + `showButtons` (Cancel / Apply) when the selection drives an **expensive
  operation** — e.g. refetching a filtered table — so users commit once via Apply.
- Keep option labels short: the trigger joins selected labels with commas and truncates with an
  ellipsis.
- Give every option a stable, unique `value` — it is the selection identity (and the React key).
- Set a `placeholder` that names the choice ("Select servers", not just "Select") — it also titles
  the blue header while the panel is open.

##### When not to use

- **Free-text entry** — use [Input](https://lepide-design-system.vercel.app/components/input/); Dropdown only picks from the list you
  give it.
- **Long or searchable lists** — this component does not filter; build the criteria flow with
  [Filter](https://lepide-design-system.vercel.app/components/filter/) instead, which pairs a Dropdown with a search field and value
  checkboxes.
- **Two-state settings** — a [Toggle](https://lepide-design-system.vercel.app/components/toggle/) or [Checkbox](https://lepide-design-system.vercel.app/components/checkbox/)
  is faster than opening a panel for on/off.
- **Rows-per-page selection** — [Pagination](https://lepide-design-system.vercel.app/components/pagination/) already ships that popover;
  don't rebuild it.

##### Variants

**Single select**

The default. Clicking an option commits it immediately and closes the panel; the trigger shows
the chosen label. Option rows render plain labels with no leading checkbox (the Figma "Without
checkbox" variant is this same rendering).

▶ Live: [Single select — click to open](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-dropdown--select)

**Multi-select**

`multiple` adds a leading brand-blue checkbox to every row. Each click toggles the option and
commits instantly through `onChange`; the panel stays open so users can pick several values in
one visit.

▶ Live: [Multi-select — every toggle commits instantly](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-dropdown--multi-without-buttons)

**Multi-select with buttons**

`multiple` + `showButtons` adds a Cancel / Apply footer and switches the panel to a
**draft-then-Apply** model: checkbox clicks edit a draft, Apply commits it (firing `onChange` and
`onApply`) and closes, Cancel discards it. The draft re-syncs to the committed selection each
time the panel opens.

▶ Live: [Cancel / Apply footer — nothing commits until Apply](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-dropdown--multi-with-buttons)

**Disabled**

`disabled` greys the whole control via the `component/dropdown/disabled-*` tokens; the panel can
never open. Individual options can also be disabled via `options[].disabled`.

▶ Live: [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-dropdown--disabled)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Trigger pill | Rounded (30px) bordered `<button>` with the selection (or placeholder) and a chevron; `aria-haspopup="listbox"` + `aria-expanded` |
| 2 | Panel | Absolutely positioned overlay that replaces the trigger in place while open |
| 3 | Blue header | `header-bg` bar repeating the placeholder text with an inverted chevron; clicking it closes the panel |
| 4 | Option rows | 40px rows (`role="option"`); with `multiple`, each leads with an outlined brand-blue checkbox |
| 5 | Cancel / Apply footer *(optional)* | `showButtons` mode — reuses the system [Button](https://lepide-design-system.vercel.app/components/button/) (secondary + primary) |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Open / close | Trigger click toggles the panel; the trigger is visually hidden (layout preserved) while open so the blue header sits exactly in its slot |
| Dismiss | Outside click and `Escape` close the panel; clicking the blue header also closes it |
| Single select | Clicking an option commits it and closes the panel immediately |
| Multi-select | Toggles commit instantly (`onChange`) and the panel stays open; with `showButtons`, toggles edit a draft until Apply |
| Disabled | Whole-control `disabled` (grey pill, panel never opens) or per-option `disabled` (native button state) |
| State model | Works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`); trigger text joins selected labels with commas and ellipsizes |
| Theming | All parts re-resolve automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Use showButtons when a multi-select drives an expensive operation, so users review the draft and commit once with Apply.
- ✕ **Don't** — Use Dropdown for long lists that need search or async loading — it renders a fixed, unfiltered option list.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical form.
The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the same
tokens, so they are pixel-identical in every theme.

> **Requires lepidus.js** — Dropdown is interactive: `lepidus.js` binds `[data-lp-dropdown]` wrappers — the trigger opens the panel, outside click and Escape close it, and `aria-expanded` is kept in sync. Use `data-lp-dropdown="single"` for select-and-close or `"multi"` for checkbox toggling; every change fires an `lp-dropdown-change` CustomEvent on the wrapper. See [Get Started](https://lepide-design-system.vercel.app/get-started/) for the script tag.

##### Single select

`data-lp-dropdown="single"` — clicking an option copies its label into the trigger and closes the
panel. The panel starts `hidden`; `lepidus.js` toggles it.

**Example — Single select**

Plain HTML (canonical):

```html
<div class="lp-dropdown" data-lp-dropdown="single">
  <button class="lp-dropdown__trigger" aria-expanded="false" aria-haspopup="listbox">
    <span class="lp-dropdown__trigger-label">Select data source</span>
    <svg class="lp-dropdown__chevron" viewBox="0 0 12 6" fill="none" stroke="currentColor"
         stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4 5-4"/></svg>
  </button>
  <div class="lp-dropdown__panel" hidden>
    <div class="lp-dropdown__header">
      <span class="lp-dropdown__header-label">Select data source</span>
      <svg class="lp-dropdown__chevron lp-dropdown__chevron--open" viewBox="0 0 12 6" fill="none"
           stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4 5-4"/></svg>
    </div>
    <div class="lp-dropdown__list" role="listbox" aria-label="Select data source">
      <button class="lp-dropdown__option" role="option">
        <span class="lp-dropdown__option-label">Active Directory</span>
      </button>
      <button class="lp-dropdown__option" role="option">
        <span class="lp-dropdown__option-label">Exchange Server</span>
      </button>
      <button class="lp-dropdown__option" role="option">
        <span class="lp-dropdown__option-label">SharePoint</span>
      </button>
    </div>
  </div>
</div>
```

React:

```jsx
import { Dropdown } from '@ramsarjal-404/react';

<Dropdown
  placeholder="Select data source"
  options={[
    { value: 'ad', label: 'Active Directory' },
    { value: 'exchange', label: 'Exchange Server' },
    { value: 'sharepoint', label: 'SharePoint' },
  ]}
  onChange={(value) => console.log(value)}
/>
```

##### Multi-select

`data-lp-dropdown="multi"` — option clicks toggle `aria-checked` and the checkmark glyph
visibility while the panel stays open. The checkmark `<svg>` inside `lp-dropdown__checkbox` is
shown for checked rows and `style="visibility:hidden"` for unchecked ones.

**Example — Multi-select with checkboxes**

Plain HTML (canonical):

```html
<div class="lp-dropdown" data-lp-dropdown="multi">
  <button class="lp-dropdown__trigger" aria-expanded="false" aria-haspopup="listbox">
    <span class="lp-dropdown__trigger-label">Select servers</span>
    <svg class="lp-dropdown__chevron" viewBox="0 0 12 6" fill="none" stroke="currentColor"
         stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4 5-4"/></svg>
  </button>
  <div class="lp-dropdown__panel" hidden>
    <div class="lp-dropdown__header">
      <span class="lp-dropdown__header-label">Select servers</span>
      <svg class="lp-dropdown__chevron lp-dropdown__chevron--open" viewBox="0 0 12 6" fill="none"
           stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4 5-4"/></svg>
    </div>
    <div class="lp-dropdown__list" role="listbox" aria-multiselectable="true" aria-label="Select servers">
      <button class="lp-dropdown__option" role="option" aria-checked="true">
        <span class="lp-dropdown__checkbox"><svg viewBox="0 0 11 11" fill="none" stroke="currentColor"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 6 4.3 8.8 9.5 2"/></svg></span>
        <span class="lp-dropdown__option-label">LDSP-FS-01</span>
      </button>
      <button class="lp-dropdown__option" role="option" aria-checked="false">
        <span class="lp-dropdown__checkbox"><svg style="visibility:hidden" viewBox="0 0 11 11" fill="none" stroke="currentColor"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 6 4.3 8.8 9.5 2"/></svg></span>
        <span class="lp-dropdown__option-label">LDSP-FS-02</span>
      </button>
      <button class="lp-dropdown__option" role="option" aria-checked="false">
        <span class="lp-dropdown__checkbox"><svg style="visibility:hidden" viewBox="0 0 11 11" fill="none" stroke="currentColor"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 6 4.3 8.8 9.5 2"/></svg></span>
        <span class="lp-dropdown__option-label">LDSP-FS-03</span>
      </button>
    </div>
  </div>
</div>
```

React:

```jsx
import { Dropdown } from '@ramsarjal-404/react';

<Dropdown
  multiple
  placeholder="Select servers"
  defaultValue={['fs-01']}
  options={[
    { value: 'fs-01', label: 'LDSP-FS-01' },
    { value: 'fs-02', label: 'LDSP-FS-02' },
    { value: 'fs-03', label: 'LDSP-FS-03' },
  ]}
  onChange={(values) => console.log(values)} // string[] in multiple mode
/>
```

##### With Cancel / Apply footer

Add an `lp-dropdown__footer` with system [Button](https://lepide-design-system.vercel.app/components/button/) classes. In plain HTML the
footer buttons are yours to wire — listen for clicks and read the `aria-checked` rows (the React
version manages the draft for you).

**Example — Multi-select with footer**

Plain HTML (canonical):

```html
<div class="lp-dropdown" data-lp-dropdown="multi">
  <button class="lp-dropdown__trigger" aria-expanded="false" aria-haspopup="listbox">
    <span class="lp-dropdown__trigger-label">Select servers</span>
    <svg class="lp-dropdown__chevron" viewBox="0 0 12 6" fill="none" stroke="currentColor"
         stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4 5-4"/></svg>
  </button>
  <div class="lp-dropdown__panel" hidden>
    <div class="lp-dropdown__header">
      <span class="lp-dropdown__header-label">Select servers</span>
      <svg class="lp-dropdown__chevron lp-dropdown__chevron--open" viewBox="0 0 12 6" fill="none"
           stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4 5-4"/></svg>
    </div>
    <div class="lp-dropdown__list" role="listbox" aria-multiselectable="true" aria-label="Select servers">
      <button class="lp-dropdown__option" role="option" aria-checked="true">
        <span class="lp-dropdown__checkbox"><svg viewBox="0 0 11 11" fill="none" stroke="currentColor"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 6 4.3 8.8 9.5 2"/></svg></span>
        <span class="lp-dropdown__option-label">LDSP-FS-01</span>
      </button>
      <button class="lp-dropdown__option" role="option" aria-checked="false">
        <span class="lp-dropdown__checkbox"><svg style="visibility:hidden" viewBox="0 0 11 11" fill="none" stroke="currentColor"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 6 4.3 8.8 9.5 2"/></svg></span>
        <span class="lp-dropdown__option-label">LDSP-FS-02</span>
      </button>
      <button class="lp-dropdown__option" role="option" aria-checked="false">
        <span class="lp-dropdown__checkbox"><svg style="visibility:hidden" viewBox="0 0 11 11" fill="none" stroke="currentColor"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 6 4.3 8.8 9.5 2"/></svg></span>
        <span class="lp-dropdown__option-label">LDSP-FS-03</span>
      </button>
    </div>
    <div class="lp-dropdown__footer">
      <button class="lp-button lp-button--secondary lp-button--sm">Cancel</button>
      <button class="lp-button lp-button--primary lp-button--sm">Apply</button>
    </div>
  </div>
</div>
```

React:

```jsx
import { Dropdown } from '@ramsarjal-404/react';

// Draft-then-Apply: checkbox clicks edit a draft; onChange/onApply
// fire only when Apply is pressed, Cancel discards the draft.
<Dropdown
  multiple
  showButtons
  placeholder="Select servers"
  defaultValue={['fs-01', 'fs-02']}
  options={[
    { value: 'fs-01', label: 'LDSP-FS-01' },
    { value: 'fs-02', label: 'LDSP-FS-02' },
    { value: 'fs-03', label: 'LDSP-FS-03' },
  ]}
  onApply={(values) => refetchTable(values)}
  onCancel={() => console.log('draft discarded')}
/>
```

##### Full width

`lp-dropdown--full-width` (React: `fullWidth`) stretches the pill to its container instead of the
fixed 320px Figma width — use it in form grids. Never set `width` on `lp-dropdown` or its trigger from
page CSS.

**Example — Full width in a form column**

Plain HTML (canonical):

```html
<!-- --full-width stretches the pill to its container (default is the fixed 320px Figma width).
     Use this in form grids instead of setting width on lp-dropdown from page CSS. -->
<div style="max-width: 640px">
  <div class="lp-dropdown lp-dropdown--full-width" data-lp-dropdown="single">
    <button class="lp-dropdown__trigger" aria-expanded="false" aria-haspopup="listbox">
      <span class="lp-dropdown__trigger-label">Select data source</span>
      <svg class="lp-dropdown__chevron" viewBox="0 0 12 6" fill="none" stroke="currentColor"
           stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4 5-4"/></svg>
    </button>
    <div class="lp-dropdown__panel" hidden>
      <div class="lp-dropdown__header">
        <span class="lp-dropdown__header-label">Select data source</span>
        <svg class="lp-dropdown__chevron lp-dropdown__chevron--open" viewBox="0 0 12 6" fill="none"
             stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4 5-4"/></svg>
      </div>
      <div class="lp-dropdown__list" role="listbox" aria-label="Select data source">
        <button class="lp-dropdown__option" role="option">
          <span class="lp-dropdown__option-label">Active Directory</span>
        </button>
        <button class="lp-dropdown__option" role="option">
          <span class="lp-dropdown__option-label">File Server</span>
        </button>
        <button class="lp-dropdown__option" role="option">
          <span class="lp-dropdown__option-label">Microsoft 365</span>
        </button>
      </div>
    </div>
  </div>
</div>
```

React:

```jsx
import { Dropdown } from '@ramsarjal-404/react';

{/* fullWidth stretches the pill to its container instead of the fixed 320px */}
<div style={{ maxWidth: 640 }}>
  <Dropdown
    fullWidth
    placeholder="Select data source"
    options={[
      { value: 'ad', label: 'Active Directory' },
      { value: 'fs', label: 'File Server' },
      { value: 'm365', label: 'Microsoft 365' },
    ]}
  />
</div>
```

##### Disabled

Combine the `lp-dropdown__trigger--disabled` modifier with the native `disabled` attribute —
`lepidus.js` refuses to open a trigger carrying the modifier, and the attribute removes it from
the tab order.

**Example — Disabled**

Plain HTML (canonical):

```html
<div class="lp-dropdown" data-lp-dropdown="single">
  <button class="lp-dropdown__trigger lp-dropdown__trigger--disabled" disabled
          aria-expanded="false" aria-haspopup="listbox">
    <span class="lp-dropdown__trigger-label">Select data source</span>
    <svg class="lp-dropdown__chevron" viewBox="0 0 12 6" fill="none" stroke="currentColor"
         stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4 5-4"/></svg>
  </button>
  <div class="lp-dropdown__panel" hidden>
    <div class="lp-dropdown__list" role="listbox" aria-label="Select data source">
      <button class="lp-dropdown__option" role="option">
        <span class="lp-dropdown__option-label">Active Directory</span>
      </button>
    </div>
  </div>
</div>
```

React:

```jsx
import { Dropdown } from '@ramsarjal-404/react';

<Dropdown
  disabled
  placeholder="Select data source"
  options={[
    { value: 'ad', label: 'Active Directory' },
    { value: 'exchange', label: 'Exchange Server' },
  ]}
/>
```

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Class applied to the outer wrapper |
| `defaultValue` | `string \| string[]` | — | Initial selection (uncontrolled) |
| `disabled` | `boolean` | `false` | Disabled state — uses component/dropdown/disabled-* tokens |
| `fullWidth` | `boolean` | `false` | Stretch to fill the container (default fixed 320px from Figma) |
| `multiple` | `boolean` | `false` | Multi-select with leading checkboxes (Figma "with buttons" / "Without checkbox" toggles this) |
| `onApply` | `((value: string[]) => void)` | — | Fired when Apply is pressed (showButtons mode) |
| `onCancel` | `(() => void)` | — | Fired when Cancel is pressed (showButtons mode) |
| `onChange` | `((value: string \| string[]) => void)` | — | Fired whenever the selection changes (on click, or on Apply when showButtons) |
| `options` * | `DropdownOption[]` | — | Selectable options |
| `placeholder` | `string` | `Select` | Trigger placeholder when nothing is selected |
| `showButtons` | `boolean` | `false` | Show the Cancel / Apply footer (only meaningful with `multiple`) |
| `value` | `string \| string[]` | — | Selected value(s). Array in `multiple` mode, string otherwise (controlled) |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Clicking the trigger pill toggles the panel; clicking the blue header (or anywhere outside the
  component) closes it.
- Single select: clicking an option commits it and closes the panel immediately. Multi-select:
  each click toggles the row's checkbox while the panel stays open.
- The trigger is visually hidden (layout preserved) while the panel is open, so the blue header
  occupies exactly the trigger's slot — the click target never jumps.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to the trigger; while open, moves through the option buttons (and footer buttons) in document order |
| `Enter` / `Space` | On the trigger: opens or closes the panel. On an option: selects it (single) or toggles its checkbox (multi) — native button activation |
| `Escape` | Closes the panel (document-level listener, attached only while open) |
| Arrow keys | Not handled — there is no roving focus between options; keyboard users move with `Tab` |

The trigger shows a 2px brand focus ring via `:focus-visible`. In the plain-CSS build,
`lepidus.js` returns focus to the trigger when the panel closes while focus is inside it.

**Screen readers**

- The trigger is a native `<button>` with `aria-haspopup="listbox"` and `aria-expanded`, kept in
  sync on every open/close (by React or by `lepidus.js`).
- The panel list is `role="listbox"`, with `aria-multiselectable="true"` in `multiple` mode.
- Each row is a native `<button>` with `role="option"`. The React component exposes selection via
  `aria-selected`; the plain-HTML pattern uses `aria-checked`, which `lepidus.js` toggles in
  multi mode.
- Per-option `disabled` uses the native button disabled state — announced as dimmed and removed
  from the tab order.
- The chevron and the checkmark glyphs are `aria-hidden` decoration; selection state comes from
  ARIA, never from the icon alone.

##### Development considerations

- In plain HTML give the `lp-dropdown__list` an `aria-label` (e.g. the placeholder text) so the
  listbox is named — the React component names it through the trigger relationship.
- Disable the control with **both** the `lp-dropdown__trigger--disabled` modifier and the native
  `disabled` attribute: the class stops `lepidus.js` from opening the panel, the attribute conveys
  the state to assistive technology and removes the tab stop.
- The options are buttons, not form fields — if the committed value must submit with a form,
  mirror it into a hidden input on `lp-dropdown-change` (plain HTML) or `onChange` (React).
- Don't nest the panel in a container with `overflow: hidden` — it is absolutely positioned and
  will be clipped.

##### Content

- The `placeholder` doubles as the open panel's header text — name the choice ("Select servers"),
  keep it under ~3 words.
- Keep option labels short and parallel; the trigger joins all selected labels with commas and
  truncates with an ellipsis, so long labels become unreadable in multi-select.

#### Hard-fail checks — Dropdown

- [ ] **The list element is `lp-dropdown__list` — never `lp-dropdown__options` or any other name.** _(observed drift: an invented class is unstyled; the listbox collapsed into bare buttons.)_
- [ ] **Every option wraps its text in `<span class="lp-dropdown__option-label">`; the open-panel header contains `lp-dropdown__header-label` and the `--open` chevron.** _(observed drift: `lepidus.js` copies the option label into the trigger — without the span the trigger never updates after a pick.)_
- [ ] **No native `<select>` anywhere on the page — a theme switcher, a page-size control or a filter are all `lp-dropdown` (`data-lp-dropdown="single"`). Adding `class="lp-input"` to a `<select>` does not make it on-system.** _(observed drift: three consecutive runs shipped a `<select>` for the theme control.)_
- [ ] **Do not write click/keyboard handlers for `.lp-dropdown__trigger`, `.lp-dropdown__option`, `.lp-accordion__trigger`, `.lp-stepper__control`, `.lp-tabs__tab` or `[data-lp-modal-open]` — `lepidus.js` already owns open/close, selection, ARIA sync and Escape. Listen to `lp-dropdown-change` on the wrapper (or `change` on the stepper input) to read values.** _(observed drift: a composed form added its own dropdown controller; both handlers fired per click and the panel toggled closed again — the dropdown never opened.)_
- [ ] **Page CSS never targets `.lp-*` selectors — no `.lp-dropdown { width: 100% }`, no `.lp-stepper { max-width }`, no `.footer-actions .lp-button { flex: 1 }`, no media-query overrides of `.lp-input__row--label-left`. The width you want already exists as a modifier: `lp-dropdown--full-width`, `lp-stepper--full-width`, `lp-input--full-width`, `lp-textarea--full-width`, `lp-text-field--full-width`, `lp-button--full-width`. For narrow containers choose `lp-input__row--label-top` instead of overriding `--label-left`.** _(observed drift: a composed form shipped 8 such rules; they bypass the token geometry and drift from Storybook in every theme.)_
- [ ] Every `lp-dropdown*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] Hooks present: `data-lp-dropdown` — and `lepidus.js` is included on the page.
- [ ] Roles present where the anatomy has them: `role="listbox"`, `role="option"`.
- [ ] ARIA state kept and updated: `aria-checked`, `aria-expanded`, `aria-haspopup`, `aria-hidden`, `aria-label`, `aria-multiselectable`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="filter"></a>

### Filter

Right-hand "Modify Filters" drawer for building field conditions — pick a field, choose criteria and values, and commit the whole draft with Apply.

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { Filter } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/filter/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-filter--default), [Filtering A List](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-filter--filtering-a-list), [RTL](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-filter--rtl)
- **Related:** [dropdown](#dropdown), [table](#table), [checkbox](#checkbox), [button](#button)

#### Purpose and usage rules

##### Overview

Filter is the "Modify Filters" drawer: a right-hand panel (`role="dialog"`, default 420px) with a
brand header, a field [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/), a **Condition** button that opens a
criteria card (criteria dropdown, value search, checkbox list), applied conditions as editable
cards, and a Cancel / Apply footer. Use it wherever users narrow a [Table](https://lepide-design-system.vercel.app/components/table/) or
list by multiple field conditions — audit logs, reports, object listings.

Everything is **drafted**: nothing reaches the page until the footer Apply fires
`onApply(conditions)`; Cancel (or `Escape`) discards the draft. Pair it with the exported
`applyFilterConditions(items, conditions, getValue)` helper to filter your rows — a condition
with `values: ['All']` matches everything.

##### Best practices

- Derive each field's `values` from **real data** so the checkboxes are always honest — never
  hardcode a list that can drift from the table.
- Keep the committed conditions in page state and **re-filter rows only on `onApply`** — the
  draft model exists so users can back out with Cancel.
- Keep field labels and the drawer `title` short; the header is a single brand-blue line.
- Use the default criteria (`Equals`, `Not Equals`, `Contains`) unless the domain genuinely needs
  more — every extra criterion multiplies the combinations users must reason about.

##### When not to use

- **A single quick choice** — one [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/) in the toolbar is lighter
  than a drawer for one field.
- **Free-text search** — use an [Input](https://lepide-design-system.vercel.app/components/input/) search field; Filter builds
  structured field/criteria/value conditions.
- **Confirmations or focused tasks** — use [Modal](https://lepide-design-system.vercel.app/components/modal/); the Filter drawer is a
  side panel that leaves the page visible behind it.

##### Variants

**Default drawer**

The full flow: pick a field, open **Condition** (disabled until a field is chosen), check values
— the card's Apply enables only once at least one value is checked — apply the card, then commit
everything with the footer Apply. Each applied condition renders as a secondary-blue card with an
edit pencil that reopens its criteria.

▶ Live: [The complete pick → condition → apply flow](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-filter--default)

**Filtering a list (live)**

The drawer paired with `applyFilterConditions` — the visible rows update only when the footer
Apply commits the draft.

▶ Live: [Conditions driving a live list](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-filter--filtering-a-list)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Drawer | Right-hand `role="dialog"` panel, brand-blue header bar with the `title` (default "Modify Filters") |
| 2 | Field selector | System [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/) listing `fields`; each field carries its candidate `values` |
| 3 | Condition button | Full-width primary [Button](https://lepide-design-system.vercel.app/components/button/), disabled until a field is chosen |
| 4 | Criteria card | "Filter by `{field}`" header strip, criteria Dropdown, search field narrowing the value checkboxes, Cancel / Apply (Apply disabled until a value is checked) |
| 5 | Applied condition cards | One per field — secondary-blue card with the value list and an edit pencil that reopens the criteria |
| 6 | Footer | Cancel (secondary) and Apply (primary) — the only place the draft is committed |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Open / close | Controlled by the required `open` prop; the component renders nothing while closed |
| Draft model | Opening re-seeds the draft from `conditions`; card applies edit the draft; only the footer Apply fires `onApply(conditions)` |
| Escape | Fires `onCancel` — same as the footer Cancel; the draft is discarded |
| Search | The criteria card's search field narrows the value checkboxes (case-insensitive contains); an empty result shows "No values match" |
| Editing | The pencil on an applied card reopens its criteria with the existing selection pre-checked |
| Guard rails | Condition is disabled with no field; the card Apply is disabled with no values checked |
| Theming | Header, cards, and fields resolve through brand/semantic tokens and re-theme automatically |

- ✓ **Do** — Commit conditions only in onApply and keep them in page state — users expect Cancel to undo everything since the drawer opened.
- ✕ **Don't** — Mutate the visible rows while the drawer is open; live-updating mid-draft defeats the Cancel / Apply contract.

#### Canonical anatomy and examples

> **React-only** — This component has no `@ramsarjal-404/css` distribution yet — use `@ramsarjal-404/react`.

Filter is controlled by the required `open` prop and reports only through `onApply` /
`onCancel` — keep the committed conditions in your page state.

##### Basic drawer

Fields carry their candidate `values`; the committed `conditions` re-seed the draft every time
the drawer opens.

**Example — Open the drawer and commit on Apply**

React:

```jsx
import { useState } from 'react';
import { Filter, Button } from '@ramsarjal-404/react';

const FIELDS = [
  { id: 'serverName', label: 'Server Name', values: ['DE10016.LDSP1.com', 'DE10016.LDSP2.com'] },
  { id: 'operation', label: 'Operation', values: ['Modified', 'Created', 'Deleted', 'Renamed'] },
];

function AuditFilters() {
  const [open, setOpen] = useState(false);
  const [conditions, setConditions] = useState([
    { field: 'serverName', criteria: 'Equals', values: ['All'] },
  ]);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Filters</Button>
      <Filter
        open={open}
        fields={FIELDS}
        conditions={conditions}
        onApply={(next) => { setConditions(next); setOpen(false); }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live: pick a field, build a condition, Apply](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-filter--default)

##### Filtering a list

Use the exported `applyFilterConditions` helper to apply committed conditions to your rows —
`values: ['All']` matches everything, `Not Equals` excludes, `Contains` substring-matches.

**Example — applyFilterConditions over page data**

React:

```jsx
import { useState } from 'react';
import { Filter, applyFilterConditions } from '@ramsarjal-404/react';

const FIELDS = [
  { id: 'objectClass', label: 'Object Class', values: ['user', 'group', 'account'] },
  { id: 'operation', label: 'Operation', values: ['Modified', 'Created', 'Deleted'] },
];

const ITEMS = [
  { name: 'Object-01', objectClass: 'user', operation: 'Modified' },
  { name: 'Object-02', objectClass: 'group', operation: 'Created' },
  { name: 'Object-03', objectClass: 'user', operation: 'Deleted' },
];

function FilteredList() {
  const [open, setOpen] = useState(false);
  const [conditions, setConditions] = useState([]);

  // Re-filters only when Apply commits a new condition list.
  const visible = applyFilterConditions(ITEMS, conditions, (item, fieldId) =>
    String(item[fieldId])
  );

  return (
    <>
      <ul>{visible.map((item) => <li key={item.name}>{item.name}</li>)}</ul>
      <Filter
        open={open}
        fields={FIELDS}
        conditions={conditions}
        onApply={(next) => { setConditions(next); setOpen(false); }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live: conditions filtering rows on Apply](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-filter--filtering-a-list)

##### Custom criteria and title

`criteriaOptions` replaces the default Equals / Not Equals / Contains set, and `title` / `width`
restyle the drawer shell. Note that `applyFilterConditions` implements exactly those three
criteria — any other string falls back to Equals semantics, so custom criteria need your own
filtering logic.

**Example — Custom criteria, title, and width**

React:

```jsx
import { Filter } from '@ramsarjal-404/react';

<Filter
  open={open}
  title="Refine results"
  width={480}
  criteriaOptions={['Equals', 'Contains']} // subset of the helper-supported criteria
  fields={[
    { id: 'whoModified', label: 'Who Modified', values: ['LPDE\\administrator', 'LPDE\\d.murphy'] },
  ]}
  onApply={(conditions) => commit(conditions)}
  onCancel={() => setOpen(false)}
/>
```

_React-only example — no plain-CSS rendition exists for this component yet._

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — |  |
| `conditions` | `FilterCondition[]` | `[]` | Conditions shown when the drawer opens (the committed state) |
| `criteriaOptions` | `string[]` | `['Equals', 'Not Equals', 'Contains']` | Criteria offered per condition |
| `fields` * | `FilterField[]` | — | Filterable fields with their candidate values |
| `onApply` | `((conditions: FilterCondition[]) => void)` | — | Footer Apply — receives the full drafted condition list |
| `onCancel` | `(() => void)` | — | Footer Cancel / Escape — discard the draft and close |
| `open` * | `boolean` | — | Show the drawer |
| `title` | `ReactNode` | `Modify Filters` | Drawer heading (default "Modify Filters") |
| `width` | `number` | `420` | Drawer width in px (default 420) |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Everything in the drawer is a standard control: the field selector and criteria selector are
  system [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/)s, values are native labeled checkboxes, and the
  Condition / Cancel / Apply buttons are system [Button](https://lepide-design-system.vercel.app/components/button/)s.
- The **Condition** button stays disabled until a field is chosen, and the criteria card's Apply
  stays disabled until at least one value is checked — dead clicks are impossible.
- The pencil button on an applied-condition card reopens that condition's criteria with the
  existing selection pre-checked.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves through the drawer's controls in document order — dropdowns, Condition, search field, value checkboxes, card buttons, footer |
| `Enter` / `Space` | Activates buttons and toggles checkboxes (native semantics throughout) |
| `Escape` | Fires `onCancel` — closes the drawer and discards the draft (document-level listener, active only while open) |

There is no focus trap: the drawer relies on the embedded native controls' tab order.

**Screen readers**

- The drawer is `role="dialog"`, named by its `title` (`aria-label`, falling back to "Filters"
  when the title is a non-string node).
- Value rows are **native `<input type="checkbox">` inside `<label>`** elements — checked state
  and label are announced for free.
- The criteria card's search input carries `aria-label="Search {field} values"`; each edit pencil
  carries `aria-label="Edit {field} filter"`.
- Disabled states (Condition without a field, card Apply without values) use the Button
  component's real `disabled` attribute, announced as dimmed.
- The embedded Dropdowns expose `aria-haspopup="listbox"` / `aria-expanded` and
  `role="listbox"` / `role="option"` panels.

##### Development considerations

- **Move focus into the drawer on open and restore it on close** — the component renders and
  unmounts on `open` but does not manage focus itself; in product code, focus the first control
  on open and return focus to the launching button on close.
- Always wire `onCancel`: it backs both the footer Cancel and `Escape`. Leaving it undefined
  strands keyboard users in an undismissable drawer.
- Don't wrap Filter in another `role="dialog"` container — it already announces itself.
- The drawer is positioned by its own styles at the right edge; ensure the page behind it remains
  scrollable/inert per your app's overlay conventions.

##### Content

- Keep the `title` short and task-shaped — the default "Modify Filters" is the Figma-canonical
  wording.
- Field labels should match the column headers users see in the table they are filtering, so the
  condition cards read as "Server Name — DE10016.LDSP1.com" without translation.

#### Hard-fail checks — Filter

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="input"></a>

### Input

Labeled single-line form field — a 25px-radius pill with an inline-left or stacked label, helper/error messaging, and icon slots, bound to the component/input tokens.

- **Availability:** plain CSS (block `lp-input`) + React
- **React:** `import { Input } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/input/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--default), [With Placeholder](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--with-placeholder), [With Value](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--with-value), [Label Top](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--label-top), [Error](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--error), [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--disabled), [Add Credentials Form](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--add-credentials-form), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--all-states)
- **Related:** [text-field](#text-field), [textarea](#textarea), [stepper](#stepper), [dropdown](#dropdown)

#### Legal class set (complete — do not invent others)

`lp-input` · `lp-input--full-width` · `lp-input__field` · `lp-input__field--disabled` · `lp-input__field--error` · `lp-input__icon-left` · `lp-input__icon-right` · `lp-input__input` · `lp-input__label` · `lp-input__message` · `lp-input__message--error` · `lp-input__message--indent` · `lp-input__row` · `lp-input__row--label-left` · `lp-input__row--label-top`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<input>`, `<label>`
- **ARIA attributes:** `aria-describedby`, `aria-hidden`, `aria-invalid`

#### Purpose and usage rules

##### Overview

Input is the labeled form-field primitive of the Lepidus design system — a native `<input>`
inside a 25px-radius pill shell (`--component-input-radius`), with an inline-left label (the
Figma form default, 171px column) or a stacked-top label, optional helper/error text, and
icon adornment slots. The label is a real `<label for>` association, focus swaps the fill to
light blue and the border to brand blue via `:focus-within`, and every visual property
resolves through the `component/input/*` token chain — so dark and high-contrast themes
restyle it with no extra code.

##### Best practices

- **Keep labels short (1–3 words)** so the 171px inline label column stays aligned across a
  form.
- Provide an `errorMessage` whenever you set `status="error"` — the red border alone is not
  sufficient feedback, and the message is announced via `aria-describedby`.
- Use `fullWidth` inside modal/form layouts so fields align to the container grid.
- Use `labelPosition="top"` in narrow containers where the inline label column would crowd
  the field.
- Treat placeholders as hints only — they disappear on entry and are never a substitute for
  the label.

##### When not to use

- **Label-less quick entry** (search bars, filter inputs, toolbar fields) — use
  [TextField](https://lepide-design-system.vercel.app/components/text-field/), the standalone 44px pill.
- **Multi-line content** (descriptions, comments) — use [Textarea](https://lepide-design-system.vercel.app/components/textarea/).
- **Numeric values with increment/decrement** — use [Stepper](https://lepide-design-system.vercel.app/components/stepper/).
- **Choosing from a known set** — use [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/).

##### Variants

**Label left (default)**

The Figma form default: the label sits in a fixed 171px column beside the field, so stacked
fields in a form share one aligned label column.

▶ Live: [Inline-left label — click into the field to see the focus fill](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--default)

**Label top**

`labelPosition="top"` stacks the label above the field — for narrow containers.

▶ Live: [Stacked label](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--label-top)

**Error**

`status="error"` paints the border with the danger token, sets `aria-invalid`, and shows
`errorMessage` (linked via `aria-describedby`) in danger red below the field.

▶ Live: [Error with message](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--error)

**Disabled**

The native `disabled` attribute plus the `component/input/bg-disabled` gray fill; text color
is preserved for readability.

▶ Live: [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--disabled)

**In a form**

Pixel-parity recreation of the Figma "Add Credentials for Lepide AI" modal — four `fullWidth`
inline-label inputs sharing the 171px label column.

▶ Live: [Add Credentials form (Figma parity)](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-input--add-credentials-form)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Wrapper | Vertical flex column holding the row and the message line |
| 2 | Label | Semibold 14/19 in `--component-input-label` (#555766); fixed 171px column when inline-left; real `<label for>` |
| 3 | Field shell | 25px-radius pill with the background, 1px border, 12/20 padding; owns focus/error/disabled styling via `:focus-within` |
| 4 | Input element | Transparent native `<input>`, 14/19 Open Sans, text `--component-input-text` |
| 5 | Icon slots *(optional)* | `iconLeft` / `iconRight` adornments, 18×18 SVG in placeholder gray |
| 6 | Message *(optional)* | 12/16 helper text below the field; swaps to `errorMessage` in danger red on error |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Focus | `:focus-within` swaps the fill to `--component-input-bg-focus` (#E1EAFD) and the border to brand blue — no ring, no layout shift |
| Error | Danger border; on focus the fill stays white so the error state remains distinct |
| Helper → error | `errorMessage` replaces `helperText` when `status="error"`; both are linked via `aria-describedby` |
| Disabled | Native `disabled` — gray fill, removed from tab order, `cursor: not-allowed` |
| Full width | `fullWidth` / `lp-input--full-width` stretches wrapper and field to the container |
| Label width | `labelWidth` overrides the 171px column (sets `--component-input-label-width`) |
| Theming | All `component/input/*` tokens re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Show errors as a message below the field — “Please enter a valid Site collection URL.”
- ✕ **Don't** — Convey errors with placeholder text or border color alone; placeholders disappear on entry.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the
same tokens, so they are pixel-identical in every theme.

##### Label left (default)

The row carries `lp-input__row--label-left`; the `<label>` and `<input>` are linked with
`for`/`id`. Click into the field — `:focus-within` on the shell drives the focus fill and
brand border with no JavaScript.

**Example — Inline-left label (Figma form default)**

Plain HTML (canonical):

```html
<div class="lp-input lp-input--full-width">
  <div class="lp-input__row lp-input__row--label-left">
    <label class="lp-input__label" for="comp-name">Component Name</label>
    <div class="lp-input__field">
      <input class="lp-input__input" id="comp-name" />
    </div>
  </div>
</div>
```

React:

```jsx
import { Input } from '@ramsarjal-404/react';

{/* labelPosition="left" is the default — fixed 171px label column */}
<Input label="Component Name" fullWidth />
```

##### Label top

Swap the row modifier to `lp-input__row--label-top` (React: `labelPosition="top"`). Helper
text goes in `lp-input__message` and is linked to the input via `aria-describedby`.

**Example — Stacked label with helper text**

Plain HTML (canonical):

```html
<div class="lp-input" style="max-width: 360px">
  <div class="lp-input__row lp-input__row--label-top">
    <label class="lp-input__label" for="server-name">Server name</label>
    <div class="lp-input__field">
      <input class="lp-input__input" id="server-name" placeholder="e.g. LDSP-FS-01"
             aria-describedby="server-name-hint" />
    </div>
  </div>
  <div class="lp-input__message" id="server-name-hint">The display name shown in reports.</div>
</div>
```

React:

```jsx
import { Input } from '@ramsarjal-404/react';

<Input
  label="Server name"
  labelPosition="top"
  placeholder="e.g. LDSP-FS-01"
  helperText="The display name shown in reports."
/>
```

##### Error

Add `lp-input__field--error` to the shell, `aria-invalid="true"` + `aria-describedby` on the
input, and render the message with `lp-input__message--error` (plus
`lp-input__message--indent` to align it under the field when the label is inline-left).

**Example — Error with linked message**

Plain HTML (canonical):

```html
<div class="lp-input lp-input--full-width">
  <div class="lp-input__row lp-input__row--label-left">
    <label class="lp-input__label" for="endpoint">API End Point URL</label>
    <div class="lp-input__field lp-input__field--error">
      <input class="lp-input__input" id="endpoint" value="not-a-url"
             aria-invalid="true" aria-describedby="endpoint-err" />
    </div>
  </div>
  <div class="lp-input__message lp-input__message--error lp-input__message--indent" id="endpoint-err">
    Please enter a valid Site collection URL.
  </div>
</div>
```

React:

```jsx
import { Input } from '@ramsarjal-404/react';

{/* status="error" sets aria-invalid and links the message via aria-describedby */}
<Input
  label="API End Point URL"
  defaultValue="not-a-url"
  status="error"
  errorMessage="Please enter a valid Site collection URL."
  fullWidth
/>
```

##### Disabled

The native `disabled` attribute plus `lp-input__field--disabled` on the shell.

**Example — Disabled**

Plain HTML (canonical):

```html
<div class="lp-input lp-input--full-width">
  <div class="lp-input__row lp-input__row--label-left">
    <label class="lp-input__label" for="license">License key</label>
    <div class="lp-input__field lp-input__field--disabled">
      <input class="lp-input__input" id="license" value="XXXX-XXXX-XXXX" disabled />
    </div>
  </div>
</div>
```

React:

```jsx
import { Input } from '@ramsarjal-404/react';

<Input label="License key" defaultValue="XXXX-XXXX-XXXX" disabled fullWidth />
```

##### With icons

Icon slots sit inside the pill before/after the input (`lp-input__icon-left` /
`lp-input__icon-right`, 18×18 SVG). They are presentational — keep `aria-hidden` on the SVG
and use `currentColor` so themes recolor them.

**Example — Left and right adornments**

Plain HTML (canonical):

```html
<div class="lp-input" style="max-width: 360px">
  <div class="lp-input__row lp-input__row--label-top">
    <label class="lp-input__label" for="find-server">Find server</label>
    <div class="lp-input__field">
      <span class="lp-input__icon-left">
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" aria-hidden="true">
          <circle cx="8" cy="8" r="5.5" /><path d="M12.5 12.5 16 16" />
        </svg>
      </span>
      <input class="lp-input__input" id="find-server" placeholder="Search by name" />
      <span class="lp-input__icon-right">
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" aria-hidden="true">
          <path d="M5 7.5 9 11.5 13 7.5" />
        </svg>
      </span>
    </div>
  </div>
</div>
```

React:

```jsx
import { Input, SearchIcon, DropDownIcon } from '@ramsarjal-404/react';

{/* icon slots render 18×18 SVGs in placeholder gray; keep them aria-hidden */}
<Input
  label="Find server"
  labelPosition="top"
  placeholder="Search by name"
  iconLeft={<SearchIcon />}
  iconRight={<DropDownIcon />}
/>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Input is pure CSS and needs no `lepidus.js`.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Class applied to the outer wrapper |
| `disabled` | `boolean` | `false` | Disabled state — uses component/input/bg-disabled token |
| `errorMessage` | `ReactNode` | — | Error message — shown below the field when status="error" |
| `fullWidth` | `boolean` | `false` | Full-width field |
| `helperText` | `ReactNode` | — | Helper / hint text below the field (replaced by errorMessage when status="error") |
| `iconLeft` | `ReactNode` | — | Left adornment slot (icon) |
| `iconRight` | `ReactNode` | — | Right adornment slot (icon) |
| `inputClassName` | `string` | — | Class applied to the `<input>` element itself |
| `label` | `ReactNode` | — | Field label. Uses component/input/label token (text-secondary). |
| `labelPosition` | `enum` | `left` | Label placement — 'left' (inline, Figma form default) or 'top' (stacked) |
| `labelWidth` | `string \| number` | — | Fixed label column width for labelPosition="left" (default 171px, from Figma) |
| `status` | `enum` | `default` | Validation status — 'error' uses the system danger tokens |
| `style` | `CSSProperties` | — | Style applied to the outer wrapper |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The entire pill shell is the click target (`cursor: text`) — clicking the padding focuses
  the input.
- Clicking the label focuses the field too, via the native `for`/`id` association.
- Focus feedback is a fill + border color change on `:focus-within`; the field never moves or
  resizes.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the input (native tab order) |
| Typing keys | Native text editing — caret movement, selection, clipboard all standard |

There is no separate focus ring — the focus state is the strong fill swap to light blue
(#E1EAFD) plus the brand border, mirroring the Figma focus variant. Disabled fields use the
native `disabled` attribute and are removed from the tab order.

**Screen readers**

- Renders a native `<input>` with a real `<label htmlFor>` association — the id is
  auto-generated via `useId()` when you don't supply one, so the label is always announced
  with the field.
- `status="error"` sets `aria-invalid` on the input.
- The helper/error message is linked through `aria-describedby`, so screen readers announce
  it when the field receives focus.
- All native input attributes (`type`, `name`, `autocomplete`, `aria-*`) pass through to the
  `<input>`.

##### Development considerations

- **In plain HTML, wire `for`/`id` yourself** — every `lp-input__label` must point at its
  `lp-input__input`, and error messages need an `id` referenced by the input's
  `aria-describedby`.
- Always pair `status="error"` with an `errorMessage`; `aria-invalid` alone tells the user
  *that* something is wrong, not *what*. Set both at the same time, typically on
  validation-on-blur or submit.
- Use the right native `type` (`email`, `url`, `password`) and `autocomplete` tokens — they
  drive mobile keyboards and password managers; the styling is type-agnostic.
- Icon slots are decoration: keep `aria-hidden="true"` on the SVGs; if an adornment is
  interactive (clear button), it must be a real `<button>` with its own accessible name.
- The disabled fill (#C6C6C6) intentionally preserves the text color for readability — don't
  override it with lighter gray text.

##### Content

- Labels name the data, in 1–3 words: "API Key", "Server name" — not instructions ("Enter
  your API key here").
- Helper text states format expectations up front ("e.g. LDSP-FS-01"); error text says how to
  fix the problem ("Please enter a valid Site collection URL.").
- Don't repeat the label in the placeholder; use the placeholder for an example value or
  leave it empty.

#### Hard-fail checks — Input

- [ ] **No native `<select>` anywhere on the page — a theme switcher, a page-size control or a filter are all `lp-dropdown` (`data-lp-dropdown="single"`). Adding `class="lp-input"` to a `<select>` does not make it on-system.** _(observed drift: three consecutive runs shipped a `<select>` for the theme control.)_
- [ ] **Exactly one label per field: `lp-input__label` inside `lp-input__row--label-left|top`. No external `<label for>` next to the component.** _(observed drift: two runs rendered two captions ("Configuration name" and "Name") for one field.)_
- [ ] **Do not wrap the component in a custom `.field` block that re-implements the label, help and error rows — Input already has `lp-input__message` (+ `--error`, `--indent`) for helper and error text.** _(observed drift: custom wrappers drift from token spacing and skip `aria-describedby` wiring.)_
- [ ] **Page CSS never targets `.lp-*` selectors — no `.lp-dropdown { width: 100% }`, no `.lp-stepper { max-width }`, no `.footer-actions .lp-button { flex: 1 }`, no media-query overrides of `.lp-input__row--label-left`. The width you want already exists as a modifier: `lp-dropdown--full-width`, `lp-stepper--full-width`, `lp-input--full-width`, `lp-textarea--full-width`, `lp-text-field--full-width`, `lp-button--full-width`. For narrow containers choose `lp-input__row--label-top` instead of overriding `--label-left`.** _(observed drift: a composed form shipped 8 such rules; they bypass the token geometry and drift from Storybook in every theme.)_
- [ ] **Only use token names that exist: surfaces are `--color-background-{page|surface|raised|subtle|cards}`, borders `--color-border-{default|strong|brand|danger}`. Never guess a name and add a hex fallback — `var(--color-border-primary, #dce3ed)` is a hardcoded color with extra steps.** _(observed drift: three invented tokens with hex fallbacks rendered off-system colors that do not re-theme in dark or hc.)_
- [ ] Every `lp-input*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<input>`, `<label>` — no `div` stand-ins.
- [ ] ARIA state kept and updated: `aria-describedby`, `aria-hidden`, `aria-invalid`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="radio"></a>

### Radio

One-of-many form control built on native radio inputs — pick exactly one option from a small visible set, with a RadioGroup wrapper for labeling and wiring.

- **Availability:** plain CSS (block `lp-radio`) + React
- **React:** `import { Radio } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/radio/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-radio--default), [Group](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-radio--group), [Horizontal](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-radio--horizontal), [Disabled Option](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-radio--disabled-option), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-radio--all-states)
- **Related:** [checkbox](#checkbox), [toggle](#toggle), [dropdown](#dropdown)

#### Legal class set (complete — do not invent others)

`lp-radio` · `lp-radio--disabled` · `lp-radio-group` · `lp-radio-group__label` · `lp-radio-group__options` · `lp-radio-group__options--horizontal` · `lp-radio__circle` · `lp-radio__circle--error` · `lp-radio__control` · `lp-radio__dot` · `lp-radio__input` · `lp-radio__label`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<input>`, `<label>`
- **Roles:** `role="radiogroup"`
- **ARIA attributes:** `aria-hidden`, `aria-invalid`, `aria-labelledby`

#### Purpose and usage rules

##### Overview

Radio picks exactly one option from a small visible set — scan scope, severity level, export
format. Each option is a native `<input type="radio">` visually hidden over a 16px round
control with a brand-blue inner dot, so selection, arrow-key movement, and form submission are
all native behavior. Wrap options in **`RadioGroup`** to get `role="radiogroup"`, a shared
`name`, and controlled (`value` + `onChange`) or uncontrolled (`defaultValue`) selection
without manual wiring. The circle reuses the dropdown checkbox border token
(`--component-dropdown-checkbox-border`) so selection controls stay consistent across themes.

##### Best practices

- **Preselect a sensible default** — radio groups should rarely start empty.
- Keep groups to **2–5 options**; beyond that, reach for [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/).
- Give the group a label (`RadioGroup label`, wired via `aria-labelledby`) and every option a
  `label` — clicking the text selects, and screen readers need both names.
- Stack options vertically by default; use `orientation="horizontal"` only for short labels
  (Low / Medium / High).
- When a single option is disabled, explain why nearby ("requires Enterprise plan").

##### When not to use

- **Multi-select** — independent yes/no choices are [Checkbox](https://lepide-design-system.vercel.app/components/checkbox/)es.
- **An instant on/off setting** — use [Toggle](https://lepide-design-system.vercel.app/components/toggle/).
- **5+ options or constrained space** — use [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/); a long radio
  list dominates the layout.

##### Variants

**Group (vertical)**

The default arrangement — a labeled `role="radiogroup"` with stacked options. **Use for**
nearly every radio set; vertical lists scan fastest.

▶ Live: [Controlled group — exactly one option stays selected](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-radio--group)

**Horizontal**

`orientation="horizontal"` lays the options in a row. **Use for** 2–3 short labels where
vertical space is tight; avoid with long labels that wrap.

▶ Live: [Horizontal group](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-radio--horizontal)

**Disabled option**

A single option can be disabled inside an otherwise interactive group (the whole group can
also be disabled via `RadioGroup disabled`).

▶ Live: [One disabled option — explain why nearby](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-radio--disabled-option)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Group wrapper | `role="radiogroup"`, labelled via `aria-labelledby`; vertical by default |
| 2 | Group label *(optional)* | Semibold 14px in `--color-text-secondary` |
| 3 | Option label wrapper | Real `<label>` root per option — clicking the text selects |
| 4 | Input | Native radio, visually hidden over the circle; shares the group `name` |
| 5 | Circle | 16px round outline, 1px brand border, white fill |
| 6 | Dot | 8px `--color-brand-primary` inner circle, scales in when selected |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Select | Click (circle or label text) selects; exactly one option per `name` stays checked |
| Arrow keys | Move selection between options — native browser behavior via the shared `name` |
| Focus | The group is one Tab stop; 3px brand-tinted ring on `:focus-visible` |
| Error | `error` switches the circle border to the status-error token and sets `aria-invalid` |
| Disabled | Native `disabled` per option or whole group — gray circle/dot/label, removed from tab order |
| Motion | Dot scales in over 120ms; transitions collapse under `prefers-reduced-motion` |
| Theming | All tokens re-resolve automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Preselect the safest or most common option — “Changed files only” for a scan scope.
- ✕ **Don't** — Use radios for independent yes/no choices; users expect selecting one to deselect the others.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the
same tokens, so they are pixel-identical in every theme.

##### Group

In plain HTML the group is a `role="radiogroup"` wrapper whose label is linked via
`aria-labelledby`; native radios sharing a `name` give you one-of-many selection and arrow-key
movement for free. In React, `RadioGroup` renders all of that and manages the value.

**Example — Labeled vertical group**

Plain HTML (canonical):

```html
<div class="lp-radio-group" role="radiogroup" aria-labelledby="scope-label">
  <span class="lp-radio-group__label" id="scope-label">Scan scope</span>
  <div class="lp-radio-group__options">
    <label class="lp-radio">
      <span class="lp-radio__control">
        <input class="lp-radio__input" type="radio" name="scope" value="full" />
        <span class="lp-radio__circle" aria-hidden="true"><span class="lp-radio__dot"></span></span>
      </span>
      <span class="lp-radio__label">Full scan</span>
    </label>
    <label class="lp-radio">
      <span class="lp-radio__control">
        <input class="lp-radio__input" type="radio" name="scope" value="changed" checked />
        <span class="lp-radio__circle" aria-hidden="true"><span class="lp-radio__dot"></span></span>
      </span>
      <span class="lp-radio__label">Changed files only</span>
    </label>
    <label class="lp-radio">
      <span class="lp-radio__control">
        <input class="lp-radio__input" type="radio" name="scope" value="custom" />
        <span class="lp-radio__circle" aria-hidden="true"><span class="lp-radio__dot"></span></span>
      </span>
      <span class="lp-radio__label">Custom paths</span>
    </label>
  </div>
</div>
```

React:

```jsx
import { Radio, RadioGroup } from '@ramsarjal-404/react';

{/* RadioGroup shares the name, renders role="radiogroup" labelled
    "Scan scope", and reports the selected value via onChange */}
<RadioGroup name="scan-scope" label="Scan scope" value={scope} onChange={setScope}>
  <Radio value="full" label="Full scan" />
  <Radio value="changed" label="Changed files only" />
  <Radio value="custom" label="Custom paths" />
</RadioGroup>
```

##### Horizontal

Add `lp-radio-group__options--horizontal` to the options row (React:
`orientation="horizontal"`).

**Example — Horizontal group**

Plain HTML (canonical):

```html
<div class="lp-radio-group" role="radiogroup" aria-labelledby="sev-label">
  <span class="lp-radio-group__label" id="sev-label">Severity</span>
  <div class="lp-radio-group__options lp-radio-group__options--horizontal">
    <label class="lp-radio">
      <span class="lp-radio__control">
        <input class="lp-radio__input" type="radio" name="severity" value="low" />
        <span class="lp-radio__circle" aria-hidden="true"><span class="lp-radio__dot"></span></span>
      </span>
      <span class="lp-radio__label">Low</span>
    </label>
    <label class="lp-radio">
      <span class="lp-radio__control">
        <input class="lp-radio__input" type="radio" name="severity" value="medium" checked />
        <span class="lp-radio__circle" aria-hidden="true"><span class="lp-radio__dot"></span></span>
      </span>
      <span class="lp-radio__label">Medium</span>
    </label>
    <label class="lp-radio">
      <span class="lp-radio__control">
        <input class="lp-radio__input" type="radio" name="severity" value="high" />
        <span class="lp-radio__circle" aria-hidden="true"><span class="lp-radio__dot"></span></span>
      </span>
      <span class="lp-radio__label">High</span>
    </label>
  </div>
</div>
```

React:

```jsx
import { Radio, RadioGroup } from '@ramsarjal-404/react';

<RadioGroup name="severity" label="Severity" defaultValue="medium" orientation="horizontal">
  <Radio value="low" label="Low" />
  <Radio value="medium" label="Medium" />
  <Radio value="high" label="High" />
</RadioGroup>
```

##### Error and disabled

`lp-radio__circle--error` paints the status-error border — set `aria-invalid="true"` on the
input too. Disabled options use the native `disabled` attribute plus the `lp-radio--disabled`
root modifier.

**Example — Error and disabled options**

Plain HTML (canonical):

```html
<div style="display: flex; flex-direction: column; gap: 8px">
  <!-- error: circle modifier + aria-invalid on the input -->
  <label class="lp-radio">
    <span class="lp-radio__control">
      <input class="lp-radio__input" type="radio" name="plan" value="basic" aria-invalid="true" />
      <span class="lp-radio__circle lp-radio__circle--error" aria-hidden="true"><span class="lp-radio__dot"></span></span>
    </span>
    <span class="lp-radio__label">Error</span>
  </label>
  <!-- disabled: native attribute + root modifier -->
  <label class="lp-radio lp-radio--disabled">
    <span class="lp-radio__control">
      <input class="lp-radio__input" type="radio" name="plan" value="xml" disabled />
      <span class="lp-radio__circle" aria-hidden="true"><span class="lp-radio__dot"></span></span>
    </span>
    <span class="lp-radio__label">XML (requires Enterprise plan)</span>
  </label>
</div>
```

React:

```jsx
import { Radio, RadioGroup } from '@ramsarjal-404/react';

<RadioGroup name="export" label="Export format" defaultValue="csv">
  <Radio value="csv" label="CSV" />
  <Radio value="json" label="JSON" error />
  <Radio value="xml" label="XML (requires Enterprise plan)" disabled />
</RadioGroup>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Radio is pure CSS and needs no `lepidus.js` — selection is native browser behavior.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled selected state. Inside a `RadioGroup` this is wired for you. |
| `className` | `string` | — | Extra class on the root `<label>` wrapper. |
| `defaultChecked` | `boolean` | — | Uncontrolled initial state (default false). |
| `disabled` | `boolean` | `false` | Disabled state — gray circle and label, interaction blocked. |
| `error` | `boolean` | `false` | Error state — the circle border uses the status-error token. |
| `label` | `ReactNode` | — | Visible label rendered inside a real `<label>` wrapper, so clicking the text selects the option. Without it, name the control with `aria-label`. |
| `name` | `string` | — | Radio group name — shared by every option in the group. `RadioGroup` sets it. |
| `onChange` | `((value: string, event: ChangeEvent`<HTMLInputElement>`) => void)` | — | Called when the user selects this option. Receives the option's `value` and the raw change event. |
| `value` | `string` | — | The value this option submits / reports when selected. |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Each option is a real `<label>` wrapper — clicking the circle **or the label text**
  selects, giving a much larger target than the 16px circle alone.
- The native input is visually hidden but stretched over the circle, so hit-testing stays
  native.
- Selecting one option natively deselects the previous one — exactly one radio per `name` is
  ever checked.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Enters / leaves the group as **one stop** (the selected option takes focus) |
| `↓` / `→` | Moves to and selects the next option (native, wraps around) |
| `↑` / `←` | Moves to and selects the previous option (native, wraps around) |
| `Space` | Selects the focused option when none is selected yet |

Arrow-key movement is native browser behavior via the shared `name` — no script involved.
Focus shows a 3px brand-tinted ring (`--color-focus-ring`) around the circle on
`:focus-visible` only.

**Screen readers**

- Each option is a native `<input type="radio">` — implicit `role="radio"`, announced as
  "selected, x of y" within the group.
- `RadioGroup` renders `role="radiogroup"` and wires its visible label through
  `aria-labelledby`, so the group context ("Scan scope") is announced on entry.
- Option names come from the wrapping `<label>`; without a `label` prop you must supply
  `aria-label`. The circle and dot are `aria-hidden="true"` decoration.
- `error` sets `aria-invalid` on the input.

##### Development considerations

- **Share one `name` across the group** — that is what makes arrow keys and
  exactly-one-selection work. `RadioGroup` sets it for you; in plain HTML set it on every
  input.
- Keep the `role="radiogroup"` wrapper and `aria-labelledby` link in plain HTML — a bare list
  of radios loses the announced group context.
- A disabled option is skipped by arrow-key movement automatically (native behavior); only
  the native `disabled` attribute does this, never CSS alone.
- For an invalid group, set `aria-invalid` on the inputs and link visible error text with
  `aria-describedby` — color alone is not a signal.
- Avoid starting a group with nothing selected where possible: keyboard users who Tab in and
  arrow will immediately change the form value.

##### Content

- Group labels name the question ("Scan scope", "Export format"); option labels name the
  answers ("Full scan", "CSV") — short, parallel, mutually exclusive.
- If a disabled option needs justification, put it in the visible label
  ("XML (requires Enterprise plan)") so every user hears it.

#### Hard-fail checks — Radio

- [ ] **Page CSS never targets `.lp-*` selectors — no `.lp-dropdown { width: 100% }`, no `.lp-stepper { max-width }`, no `.footer-actions .lp-button { flex: 1 }`, no media-query overrides of `.lp-input__row--label-left`. The width you want already exists as a modifier: `lp-dropdown--full-width`, `lp-stepper--full-width`, `lp-input--full-width`, `lp-textarea--full-width`, `lp-text-field--full-width`, `lp-button--full-width`. For narrow containers choose `lp-input__row--label-top` instead of overriding `--label-left`.** _(observed drift: a composed form shipped 8 such rules; they bypass the token geometry and drift from Storybook in every theme.)_
- [ ] Every `lp-radio*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<input>`, `<label>` — no `div` stand-ins.
- [ ] Roles present where the anatomy has them: `role="radiogroup"`.
- [ ] ARIA state kept and updated: `aria-hidden`, `aria-invalid`, `aria-labelledby`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="stepper"></a>

### Stepper

Pill-shaped numeric stepper with stacked up / down chevrons — bounded counts, thresholds, and retention-day settings with min/max clamping.

- **Availability:** plain CSS (block `lp-stepper`) + React
- **React:** `import { Stepper } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/stepper/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-stepper--default), [With Range](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-stepper--with-range), [No Controls](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-stepper--no-controls), [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-stepper--disabled), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-stepper--all-states)
- **Related:** [input](#input), [dropdown](#dropdown), [text-field](#text-field)

#### Legal class set (complete — do not invent others)

`lp-stepper` · `lp-stepper--disabled` · `lp-stepper--full-width` · `lp-stepper__control` · `lp-stepper__controls` · `lp-stepper__input`

#### Hooks and semantics the canonical markup relies on

- **lepidus.js hooks:** `data-lp-stepper`
- **Native elements (keep them native):** `<button>`, `<input>`
- **ARIA attributes:** `aria-hidden`, `aria-label`

#### Purpose and usage rules

##### Overview

Stepper is the numeric entry control of the system: a 230px pill (`--radius-6xl` → 30px) showing
a brand-blue value with stacked chevron up / down controls. Use it for **bounded numeric
settings** — counts, thresholds, retention days — where small adjustments are common. The field
is a native `<input type="number">`, so values can also be typed or nudged with the arrow keys,
and everything is clamped to `min`/`max`. All colors resolve through the `component/stepper/*`
tokens, so dark and high-contrast themes restyle it automatically.

##### Best practices

- Set **finite `min` and `max`** — the chevrons disable at the bounds and the range is exposed to
  assistive technology via `aria-valuemin` / `aria-valuemax`.
- Give every Stepper an **accessible name** (`aria-label="Retention days"` or an external label)
  — it has no built-in label.
- Use a controlled pattern (`value` + `onChange`) when the value drives other UI.
- Pick a `step` that matches the granularity users actually need — stepping by 1 through a range
  of thousands is hostile.

##### When not to use

- **Large or arbitrary numbers** (ports, IDs, phone numbers) — typing into an
  [Input](https://lepide-design-system.vercel.app/components/input/) is faster than stepping, and IDs aren't really numbers.
- **Labeled form fields with validation states** — use [Input](https://lepide-design-system.vercel.app/components/input/) or
  [TextField](https://lepide-design-system.vercel.app/components/text-field/), which carry the label/error anatomy.
- **Choosing from a short fixed set** of values — a [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/) shows the
  options; a stepper hides them.

##### Types

**Default**

Uncontrolled with an unbounded range — adjust via the chevrons, Arrow Up / Down, or by typing
directly. **Use for** quick counts where any value is valid.

▶ Live: [Default — unbounded](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-stepper--default)

**With min / max**

The recommended form. Values are clamped to the range, `aria-valuemin` / `aria-valuemax` are
exposed, and each chevron disables individually at its bound — typing `999` into a 0–20 range
snaps to 20 on blur.

▶ Live: [Bounded 0–20 — chevrons disable at the bounds](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-stepper--with-range)

**No controls**

`showControls={false}` hides the chevrons; the value remains editable by typing or with
Arrow Up / Down. **Use only** when an adjacent control provides the same affordance.

▶ Live: [Controls hidden](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-stepper--no-controls)

**Disabled**

Gray fill, transparent border, dimmed value; the input and both controls are inert and removed
from the tab order.

▶ Live: [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-stepper--disabled)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Pill wrapper | 30px-radius shell (230px × 40px, or `fullWidth`), surface fill, 1px border |
| 2 | Number input | Native `<input type="number" inputMode="numeric">` with the browser spinner hidden; brand-blue 16/22 value |
| 3 | Controls | Stacked chevron-up / chevron-down buttons that step by `step` and disable at the `max`/`min` bounds; hidden via `showControls={false}` |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Step | Chevrons (and Arrow Up / Down) adjust by `step` (default 1), clamped to `min`/`max` |
| Typing | Free-typed drafts are allowed (the field can be cleared mid-edit); the value clamps into range on blur |
| At bound | The up or down chevron disables individually once the value reaches `max` or `min` |
| Disabled | `disabled` / `lp-stepper--disabled` — gray tokens, input and controls inert, no tab stop |
| Full width | `fullWidth` / `lp-stepper--full-width` stretches the pill to its container (default fixed 230px) |
| Theming | All parts re-resolve automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Set finite min and max so the chevrons disable at the bounds and the range is announced to screen readers.
- ✕ **Don't** — Use Stepper for large arbitrary numbers — stepping from 0 to 8080 one click at a time is not an input method.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical form.
The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the same
tokens, so they are pixel-identical in every theme.

> **Requires lepidus.js** — Stepper is interactive: `lepidus.js` binds `[data-lp-stepper]` — the first `lp-stepper__control` increments, the second decrements, stepping by the input's `step` and clamping to its `min`/`max`; every change dispatches a bubbling `change` event on the input. Typing and Arrow Up / Down work natively without the script. See [Get Started](https://lepide-design-system.vercel.app/get-started/) for the script tag.

##### Basic with range

The native `min`, `max`, and `step` attributes drive both the script and the browser's own
arrow-key stepping. Always provide an `aria-label` (or external label).

**Example — Bounded stepper (0–365)**

Plain HTML (canonical):

```html
<div class="lp-stepper" data-lp-stepper>
  <input class="lp-stepper__input" type="number" value="30" min="0" max="365" step="1"
         aria-label="Retention days" />
  <span class="lp-stepper__controls">
    <button class="lp-stepper__control" aria-label="Increase"><svg viewBox="0 0 12 7" fill="none"
      stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 6l5-4.5L11 6"/></svg></button>
    <button class="lp-stepper__control" aria-label="Decrease"><svg viewBox="0 0 12 7" fill="none"
      stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4.5L11 1"/></svg></button>
  </span>
</div>
```

React:

```jsx
import { Stepper } from '@ramsarjal-404/react';

<Stepper
  defaultValue={30}
  min={0}
  max={365}
  step={1}
  aria-label="Retention days"
  onChange={(value) => console.log(value)}
/>
```

##### No controls

Omit the `lp-stepper__controls` block (React: `showControls={false}`) — the value remains
editable by typing and Arrow Up / Down.

**Example — Input only, no chevrons**

Plain HTML (canonical):

```html
<div class="lp-stepper">
  <input class="lp-stepper__input" type="number" value="10" min="0" max="100"
         aria-label="Threshold" />
</div>
```

React:

```jsx
import { Stepper } from '@ramsarjal-404/react';

<Stepper defaultValue={10} min={0} max={100} showControls={false} aria-label="Threshold" />
```

##### Full width

`lp-stepper--full-width` stretches the pill to its container instead of the fixed 230px.

**Example — Full width inside a constrained container**

Plain HTML (canonical):

```html
<div style="max-width: 360px">
  <div class="lp-stepper lp-stepper--full-width" data-lp-stepper>
    <input class="lp-stepper__input" type="number" value="5" min="1" max="50"
           aria-label="Concurrent scans" />
    <span class="lp-stepper__controls">
      <button class="lp-stepper__control" aria-label="Increase"><svg viewBox="0 0 12 7" fill="none"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 6l5-4.5L11 6"/></svg></button>
      <button class="lp-stepper__control" aria-label="Decrease"><svg viewBox="0 0 12 7" fill="none"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4.5L11 1"/></svg></button>
    </span>
  </div>
</div>
```

React:

```jsx
import { Stepper } from '@ramsarjal-404/react';

<div style={{ maxWidth: 360 }}>
  <Stepper fullWidth defaultValue={5} min={1} max={50} aria-label="Concurrent scans" />
</div>
```

##### Disabled

Combine the `lp-stepper--disabled` modifier with native `disabled` attributes on the input and
both control buttons — the class restyles, the attributes convey the state and remove the tab
stops.

**Example — Disabled**

Plain HTML (canonical):

```html
<div class="lp-stepper lp-stepper--disabled">
  <input class="lp-stepper__input" type="number" value="30" disabled aria-label="Retention days" />
  <span class="lp-stepper__controls">
    <button class="lp-stepper__control" disabled aria-label="Increase"><svg viewBox="0 0 12 7" fill="none"
      stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 6l5-4.5L11 6"/></svg></button>
    <button class="lp-stepper__control" disabled aria-label="Decrease"><svg viewBox="0 0 12 7" fill="none"
      stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4.5L11 1"/></svg></button>
  </span>
</div>
```

React:

```jsx
import { Stepper } from '@ramsarjal-404/react';

<Stepper disabled defaultValue={30} aria-label="Retention days" />
```

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Class applied to the outer pill wrapper |
| `defaultValue` | `number` | `0` | Initial value (uncontrolled) |
| `disabled` | `boolean` | `false` | Disabled state — uses component/stepper/disabled-* tokens |
| `fullWidth` | `boolean` | `false` | Stretch to fill the container (default fixed 230px from Figma) |
| `max` | `number` | — | Maximum allowed value |
| `min` | `number` | — | Minimum allowed value |
| `onChange` | `((value: number) => void)` | — | Fired when the value changes (buttons, typing, or arrow keys) |
| `showControls` | `boolean` | `true` | Hide the up / down controls |
| `step` | `number` | `1` | Increment / decrement amount |
| `value` | `number` | — | Current value (controlled) |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The chevron buttons increment / decrement by `step`; each disables individually once the value
  reaches its bound, so a dead click is impossible.
- Clicking into the pill places the caret in the number field for direct typing; the browser's
  built-in spinner is hidden so the chevrons are the only stepping affordance.
- Out-of-range drafts (typed values) clamp back into `min`/`max` when the field blurs.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the number field — in React it is the **only** tab stop (the chevrons have `tabIndex={-1}`) |
| `Arrow Up` / `Arrow Down` | Adjust the value by `step` (native number-input behavior), clamped to the range |
| Digits / `-` | Type a value directly; drafts may be temporarily out of range and clamp on blur |

The chevron buttons keep a visible brand `:focus-visible` ring, and a disabled Stepper uses the
native `disabled` attribute, removing it from the tab order entirely.

**Screen readers**

- The field is a native `<input type="number" inputMode="numeric">` — announced as a spinbutton,
  with platform numeric keyboards on touch devices.
- `aria-valuenow` is always exposed; `aria-valuemin` / `aria-valuemax` appear whenever finite
  `min` / `max` are set.
- The chevrons carry `aria-label="Increment"` / `"Decrement"` (the plain-CSS demo uses
  "Increase" / "Decrease") and are skipped in the React tab order so keyboard users interact
  through the one field.
- There is **no built-in label** — the React component defaults to `aria-label="Value"`; always
  override it with something meaningful.

##### Development considerations

- Always supply an accessible name: `aria-label="Retention days"`, or an external `<label>` /
  `aria-labelledby` pointing at the input.
- Set finite `min` / `max` wherever the domain allows — it drives chevron disabling, blur
  clamping, and the ARIA range attributes in one move.
- In plain HTML, control order matters: `lepidus.js` wires the **first**
  `lp-stepper__control` as increment and the **second** as decrement, and dispatches a bubbling
  `change` event on the input after every step.
- For the disabled state, pair the `lp-stepper--disabled` class with native `disabled` attributes
  on the input **and** both buttons — the class alone is only paint.
- React's `onChange` receives the already-clamped number for chevrons, typing, and arrow keys
  alike; don't re-clamp downstream.

##### Content

- Label the quantity and its unit ("Retention days", "Concurrent scans") — the pill shows only a
  bare number, so the name carries all the context.

#### Hard-fail checks — Stepper

- [ ] **Do not write click/keyboard handlers for `.lp-dropdown__trigger`, `.lp-dropdown__option`, `.lp-accordion__trigger`, `.lp-stepper__control`, `.lp-tabs__tab` or `[data-lp-modal-open]` — `lepidus.js` already owns open/close, selection, ARIA sync and Escape. Listen to `lp-dropdown-change` on the wrapper (or `change` on the stepper input) to read values.** _(observed drift: a composed form added its own dropdown controller; both handlers fired per click and the panel toggled closed again — the dropdown never opened.)_
- [ ] **Page CSS never targets `.lp-*` selectors — no `.lp-dropdown { width: 100% }`, no `.lp-stepper { max-width }`, no `.footer-actions .lp-button { flex: 1 }`, no media-query overrides of `.lp-input__row--label-left`. The width you want already exists as a modifier: `lp-dropdown--full-width`, `lp-stepper--full-width`, `lp-input--full-width`, `lp-textarea--full-width`, `lp-text-field--full-width`, `lp-button--full-width`. For narrow containers choose `lp-input__row--label-top` instead of overriding `--label-left`.** _(observed drift: a composed form shipped 8 such rules; they bypass the token geometry and drift from Storybook in every theme.)_
- [ ] Every `lp-stepper*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>`, `<input>` — no `div` stand-ins.
- [ ] Hooks present: `data-lp-stepper` — and `lepidus.js` is included on the page.
- [ ] ARIA state kept and updated: `aria-hidden`, `aria-label`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="textarea"></a>

### Textarea

Multi-line free-text box — a 15px-radius card whose border and text turn brand blue while typing; for descriptions, comments, and notes.

- **Availability:** plain CSS (block `lp-textarea`) + React
- **React:** `import { Textarea } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/textarea/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textarea--default), [Typing](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textarea--typing), [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textarea--disabled), [Full Width](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textarea--full-width), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textarea--all-states)
- **Related:** [input](#input), [text-field](#text-field)

#### Legal class set (complete — do not invent others)

`lp-textarea` · `lp-textarea--disabled` · `lp-textarea--full-width` · `lp-textarea__textarea`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<textarea>`
- **ARIA attributes:** `aria-label`

#### Purpose and usage rules

##### Overview

Textarea is the multi-line free-text entry of the Lepidus design system — a native
`<textarea>` inside a 481px, 15px-radius card-style box (`--radius-card`) with 20px padding,
matching the Figma "Type Field Box" component. While the user types, `:focus-within` swaps
the border and entered text to brand blue (`component/textarea/active-*` tokens). Use it for
descriptions, comments, notes — any content expected to span several lines. It ships both as
plain `lp-textarea` classes in `@ramsarjal-404/css` and as a React component.

##### Best practices

- **Size the box to the expected content** with `rows` (default 6) — a too-small box hides
  context, a too-large one dominates the form.
- Pair the box with a visible external label or an `aria-label` describing the expected
  content — the placeholder is not an accessible name.
- Use `fullWidth` in form layouts so the box aligns to the container grid instead of the
  fixed 481px Figma width.
- Leave vertical resize alone — users rely on it for longer content (it is disabled
  automatically when the field is disabled).

##### When not to use

- **Single-line values inside forms** — use [Input](https://lepide-design-system.vercel.app/components/input/), which adds a label,
  helper text, and error messaging.
- **Label-less quick entry** like search — use [TextField](https://lepide-design-system.vercel.app/components/text-field/).
- **Structured values** (dates, numbers, options) — picking beats typing; see
  [Calendar](https://lepide-design-system.vercel.app/components/calendar/), [Stepper](https://lepide-design-system.vercel.app/components/stepper/), or
  [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/).

##### Variants

**Default**

The resting state — white fill with the light-blue brand border (`--color-brand-light`).

▶ Live: [Default — click in and type to see the typing state](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textarea--default)

**Typing**

`:focus-within` mirrors the Figma "Typing state" variant: the fill stays white while the
border and entered text turn brand blue.

▶ Live: [Focus the box to trigger the typing state](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textarea--typing)

**Disabled**

Subtle gray fill, gray text, vertical resize disabled, removed from the tab order via the
native `disabled` attribute.

▶ Live: [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textarea--disabled)

**Full width**

`fullWidth` overrides the fixed 481px width so the box tracks its container.

▶ Live: [Full width](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textarea--full-width)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Box wrapper | 15px-radius card shell with the surface fill, 1px light-blue border, 20px padding; owns typing/disabled styling via `:focus-within` |
| 2 | Textarea element | Transparent native `<textarea>`, 16/22 Open Sans regular, vertically resizable |
| 3 | Placeholder | `"Type Description here"` by default, in the disabled-gray text token |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Typing | `:focus-within` turns border and entered text brand blue; the fill stays white |
| Resize | Vertical resize is native and enabled; disabled fields can't be resized |
| Rows | `rows` (default 6) sets the initial visible line count |
| Disabled | Native `disabled` — subtle gray fill, gray text, `cursor: not-allowed`, removed from tab order |
| Full width | `fullWidth` stretches past the fixed 481px Figma width to fill the container |
| Theming | All `component/textarea/*` tokens re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Match rows to the expected content — 3 for a short note, 6+ for a description.
- ✕ **Don't** — Use Textarea for single-line values — that's Input (labeled) or TextField (standalone).

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) renders the same markup. Both resolve to the
same `component/textarea/*` tokens, so they are pixel-identical in every theme.

##### Basic

A native `<textarea>` (`rows="6"`) in a 15px-radius card box: `lp-textarea` is the box,
`lp-textarea__textarea` the field. Pair it with a visible label or `aria-label` — there is no
built-in label. Click in and type — `:focus-within` swaps the border and text to brand blue
with no JavaScript.

**Example — Description box**

Plain HTML (canonical):

```html
<!-- no visible label — aria-label is required for the accessible name -->
<div class="lp-textarea">
  <textarea class="lp-textarea__textarea" rows="6"
            aria-label="Description" placeholder="Type Description here"></textarea>
</div>
```

React:

```jsx
import { Textarea } from '@ramsarjal-404/react';

{/* no visible label — aria-label is required for the accessible name */}
<Textarea aria-label="Description" placeholder="Type Description here" />
```

##### Sized and full width

`rows` sets the initial height; `lp-textarea--full-width` (React: `fullWidth`) makes the box
track its container instead of the fixed 481px Figma width.

**Example — Three rows, full width**

Plain HTML (canonical):

```html
<!-- rows sizes the box; --full-width tracks the container instead of the fixed 481px -->
<div style="max-width: 640px">
  <div class="lp-textarea lp-textarea--full-width">
    <textarea class="lp-textarea__textarea" rows="3" aria-label="Remediation notes"></textarea>
  </div>
</div>
```

React:

```jsx
import { Textarea } from '@ramsarjal-404/react';

{/* rows sizes the box; fullWidth tracks the container instead of the fixed 481px */}
<div style={{ maxWidth: 640 }}>
  <Textarea aria-label="Remediation notes" rows={3} fullWidth />
</div>
```

##### Disabled

The native `disabled` attribute on the textarea plus `lp-textarea--disabled` on the box —
subtle gray fill, resize disabled, removed from the tab order.

**Example — Disabled**

Plain HTML (canonical):

```html
<!-- native disabled on the textarea + --disabled on the box for the gray fill -->
<div class="lp-textarea lp-textarea--disabled">
  <textarea class="lp-textarea__textarea" rows="6" aria-label="Description" disabled>Type Description here</textarea>
</div>
```

React:

```jsx
import { Textarea } from '@ramsarjal-404/react';

<Textarea aria-label="Description" defaultValue="Type Description here" disabled />
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Textarea is pure CSS and needs no `lepidus.js`. Need a visible label, helper text or validation? Use [Input](https://lepide-design-system.vercel.app/components/input/) instead.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Class applied to the outer box wrapper |
| `disabled` | `boolean` | `false` | Disabled state — uses component/textarea/disabled-* tokens |
| `fullWidth` | `boolean` | `false` | Stretch to fill the container width (default fixed 481px from Figma) |
| `textareaClassName` | `string` | — | Class applied to the inner `<textarea>` element |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The whole padded box focuses the native textarea inside.
- The resize grip in the bottom corner is native — users can drag the box taller for longer
  content (disabled fields can't be resized).
- Focus feedback is the brand border + brand text color change; the box never shifts layout.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the box — Tab moves focus rather than inserting a tab character |
| `Enter` | Inserts a newline (native multi-line behavior) |
| Typing keys | Native text editing — caret movement, selection, clipboard all standard |

The typing state renders via `:focus-within` for both keyboard and mouse focus. Disabled
boxes use the native `disabled` attribute and are removed from the tab order.

**Screen readers**

- Renders a native `<textarea>` — implicit `role="textbox"` with `aria-multiline`; all
  standard textarea attributes (`name`, `maxLength`, `aria-*`) pass through.
- **There is no built-in label.** The placeholder is not an accessible name — supply
  `aria-label` or pair the box with an external `<label>` / `aria-labelledby`.
- `disabled` is announced as "dimmed"/"unavailable" automatically by the native attribute.

##### Development considerations

- Treat the missing label as a hard requirement to fill: every Textarea needs `aria-label` or
  a wired external `<label>` — this is the component's only a11y gap and it is yours to
  close.
- Textarea has no error state of its own; for validated multi-line fields set `aria-invalid`
  and `aria-describedby` yourself and render visible error text near the box.
- If you enforce a `maxLength`, show a visible character count — silent truncation is
  confusing, especially for screen-reader users.
- Don't disable vertical resize via custom CSS; users rely on it for longer content.
- Remember `Enter` inserts a newline — don't hijack it to submit the form; users expect
  multi-line editing semantics.

##### Content

- The label names the expected content: "Description", "Remediation notes" — and helper text
  near the box can state length or format expectations.
- Placeholders show a short prompt ("Type Description here"); they disappear on entry, so
  never put required instructions in them.

#### Hard-fail checks — Textarea

- [ ] **Do not wrap the component in a custom `.field` block that re-implements the label, help and error rows — Input already has `lp-input__message` (+ `--error`, `--indent`) for helper and error text.** _(observed drift: custom wrappers drift from token spacing and skip `aria-describedby` wiring.)_
- [ ] **Page CSS never targets `.lp-*` selectors — no `.lp-dropdown { width: 100% }`, no `.lp-stepper { max-width }`, no `.footer-actions .lp-button { flex: 1 }`, no media-query overrides of `.lp-input__row--label-left`. The width you want already exists as a modifier: `lp-dropdown--full-width`, `lp-stepper--full-width`, `lp-input--full-width`, `lp-textarea--full-width`, `lp-text-field--full-width`, `lp-button--full-width`. For narrow containers choose `lp-input__row--label-top` instead of overriding `--label-left`.** _(observed drift: a composed form shipped 8 such rules; they bypass the token geometry and drift from Storybook in every theme.)_
- [ ] Every `lp-textarea*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<textarea>` — no `div` stand-ins.
- [ ] ARIA state kept and updated: `aria-label`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="text-field"></a>

### TextField

Label-less standalone pill text field (44px radius) for quick inline entry — search bars, filter inputs, toolbar fields.

- **Availability:** plain CSS (block `lp-text-field`) + React
- **React:** `import { TextField } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/text-field/ · **Storybook:** [Normal](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textfield--normal), [Filled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textfield--filled), [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textfield--disabled), [Full Width](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textfield--full-width), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textfield--all-states)
- **Related:** [input](#input), [textarea](#textarea), [filter](#filter)

#### Legal class set (complete — do not invent others)

`lp-text-field` · `lp-text-field--disabled` · `lp-text-field--full-width` · `lp-text-field__input`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<input>`
- **ARIA attributes:** `aria-label`

#### Purpose and usage rules

##### Overview

TextField is the label-less, standalone single-line entry of the Lepidus design system — a
490px-max, 41px-tall pill with a 44px radius (`--radius-xxl`) wrapping a native `<input>`.
Use it for inline quick entry — search bars, filter inputs, toolbar fields — where a separate
label, helper text, or validation messaging is not needed. Its fill, border, and text all
swap on focus via the `component/textfield/*` tokens, matching the Figma "Type Text Field"
component, so dark and high-contrast themes restyle it with no extra code. It ships both as
plain `lp-text-field` classes in `@ramsarjal-404/css` and as a React component.

##### Best practices

- **Provide an `aria-label`** (e.g. "Search") on every TextField — it has no visible label,
  and the placeholder is not an accessible name.
- Use `fullWidth` when the field should track its container instead of the fixed 490px Figma
  width — toolbars, page headers.
- Keep the default placeholder pattern — a short example or verb ("Type text", "Search
  servers"), not instructions.

##### When not to use

- **Form fields that need labels or validation** — use [Input](https://lepide-design-system.vercel.app/components/input/), which
  provides a real `<label>`, helper text, and error status/messaging.
- **Multi-line content** — use [Textarea](https://lepide-design-system.vercel.app/components/textarea/).
- **A field that drives a result list with operators/chips** — see
  [Filter](https://lepide-design-system.vercel.app/components/filter/).
- **Stacked as a form** — multiple label-less fields hurt scannability and accessibility.

##### Variants

**Normal**

The resting state — white fill, gray border, placeholder in the disabled-gray token.

▶ Live: [Normal — type into it to see the active state](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textfield--normal)

**Active**

`:focus-within` mirrors the Figma "active state" variant: light-blue fill
(`--component-textfield-active-bg`), brand border, and the entered text turns brand blue.

▶ Live: [Click into the field to trigger the active state](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textfield--filled)

**Disabled**

Gray fill and text from the `component/textfield/disabled-*` tokens; removed from the tab
order via the native `disabled` attribute.

▶ Live: [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textfield--disabled)

**Full width**

`fullWidth` overrides the fixed 490px width so the pill tracks its container.

▶ Live: [Full width](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-textfield--full-width)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Pill wrapper | 44px-radius shell with the surface fill, 1px border, 14px padding; owns active/disabled styling via `:focus-within` |
| 2 | Input element | Transparent native `<input>`, 16/22 Open Sans regular, primary text color |
| 3 | Placeholder | `"Type text"` by default, in the disabled-gray text token |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Active | `:focus-within` swaps fill to `#C6D8FF`, border and text to brand blue — the strongest focus treatment in the system |
| Disabled | Native `disabled` — gray fill, gray text, light-blue border, `cursor: not-allowed`, removed from tab order |
| Full width | `fullWidth` stretches past the fixed 490px Figma width to fill the container |
| Pass-through | All native input attributes (`type`, `name`, `aria-*`) flow to the `<input>` |
| Theming | All `component/textfield/*` tokens re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Give every TextField an aria-label — “Search”, “Filter by server name”.
- ✕ **Don't** — Stack TextFields as a form; fields that need labels and validation are Input's job.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) renders the same markup. Both resolve to the
same `component/textfield/*` tokens, so they are pixel-identical in every theme.

##### Basic

A native `<input>` in a 44px pill: `lp-text-field` is the shell, `lp-text-field__input` the
field. Always pass an `aria-label` — the field has no visible label. Click into it —
`:focus-within` on the shell drives the active fill and brand border with no JavaScript.

**Example — Search field**

Plain HTML (canonical):

```html
<!-- no visible label — aria-label is required for the accessible name -->
<div class="lp-text-field">
  <input class="lp-text-field__input" type="text" aria-label="Search" placeholder="Type text" />
</div>
```

React:

```jsx
import { TextField } from '@ramsarjal-404/react';

{/* no visible label — aria-label is required for the accessible name */}
<TextField aria-label="Search" placeholder="Type text" />
```

##### Full width

`lp-text-field--full-width` (React: `fullWidth`) overrides the fixed 490px Figma width so the
pill tracks its container.

**Example — Full width in a toolbar**

Plain HTML (canonical):

```html
<!-- --full-width overrides the fixed 490px Figma width -->
<div style="max-width: 640px">
  <div class="lp-text-field lp-text-field--full-width">
    <input class="lp-text-field__input" type="text"
           aria-label="Filter by server name" placeholder="Filter by server name" />
  </div>
</div>
```

React:

```jsx
import { TextField } from '@ramsarjal-404/react';

{/* fullWidth overrides the fixed 490px Figma width */}
<div style={{ maxWidth: 640 }}>
  <TextField aria-label="Filter by server name" placeholder="Filter by server name" fullWidth />
</div>
```

##### Disabled

The native `disabled` attribute on the input plus `lp-text-field--disabled` on the shell —
gray fill and text, removed from the tab order.

**Example — Disabled**

Plain HTML (canonical):

```html
<!-- native disabled on the input + --disabled on the pill for the gray fill -->
<div class="lp-text-field lp-text-field--disabled">
  <input class="lp-text-field__input" type="text" aria-label="Search" value="Type text" disabled />
</div>
```

React:

```jsx
import { TextField } from '@ramsarjal-404/react';

<TextField aria-label="Search" defaultValue="Type text" disabled />
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). TextField is pure CSS and needs no `lepidus.js`. Need a visible label, helper text or validation? Use [Input](https://lepide-design-system.vercel.app/components/input/) instead.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Class applied to the outer pill wrapper |
| `disabled` | `boolean` | `false` | Disabled state — uses component/textfield/disabled-* tokens |
| `fullWidth` | `boolean` | `false` | Stretch to fill the container width (default fixed 490px max from Figma) |
| `inputClassName` | `string` | — | Class applied to the inner `<input>` element |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The entire pill is the click target — clicking the padding focuses the native input inside.
- Focus feedback is the strongest in the system: fill, border, **and** text color all change,
  so the active field is unmistakable; the field never moves or resizes.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the field (native tab order) |
| Typing keys | Native text editing — caret movement, selection, clipboard all standard |

The active state renders via `:focus-within` for both keyboard and mouse focus. Disabled
fields use the native `disabled` attribute and are removed from the tab order.

**Screen readers**

- Renders a native `<input>` — implicit `role="textbox"`; all standard input attributes
  (`type`, `name`, `aria-*`) pass through.
- **There is no built-in label.** The placeholder is not an accessible name — supply
  `aria-label` ("Search") or pair the field with an external `<label>` /
  `aria-labelledby`. Without one, the field is announced with no name at all.
- `disabled` is announced as "dimmed"/"unavailable" automatically by the native attribute.

##### Development considerations

- Treat the missing label as a hard requirement to fill: every TextField needs `aria-label`
  or `aria-labelledby` — this is the component's only a11y gap and it is yours to close.
- TextField has no error state; if the value can fail validation, you have outgrown it — move
  to [Input](https://lepide-design-system.vercel.app/components/input/) rather than bolting on custom error styling.
- Use the right native `type` (`search`, `email`) and `autocomplete` so mobile keyboards and
  browser autofill behave; the styling is type-agnostic.
- For search fields, wire `Enter` submission via a wrapping `<form>` or an `onKeyDown`
  handler — the component deliberately ships no behavior of its own.

##### Content

- The accessible name describes the purpose: "Search", "Filter by server name" — verb-first
  and specific to the data set.
- Placeholders show an example value or a short prompt ("Type text"); they disappear on entry,
  so never put required information in them.

#### Hard-fail checks — TextField

- [ ] **No native `<select>` anywhere on the page — a theme switcher, a page-size control or a filter are all `lp-dropdown` (`data-lp-dropdown="single"`). Adding `class="lp-input"` to a `<select>` does not make it on-system.** _(observed drift: three consecutive runs shipped a `<select>` for the theme control.)_
- [ ] **Do not wrap the component in a custom `.field` block that re-implements the label, help and error rows — Input already has `lp-input__message` (+ `--error`, `--indent`) for helper and error text.** _(observed drift: custom wrappers drift from token spacing and skip `aria-describedby` wiring.)_
- [ ] **Page CSS never targets `.lp-*` selectors — no `.lp-dropdown { width: 100% }`, no `.lp-stepper { max-width }`, no `.footer-actions .lp-button { flex: 1 }`, no media-query overrides of `.lp-input__row--label-left`. The width you want already exists as a modifier: `lp-dropdown--full-width`, `lp-stepper--full-width`, `lp-input--full-width`, `lp-textarea--full-width`, `lp-text-field--full-width`, `lp-button--full-width`. For narrow containers choose `lp-input__row--label-top` instead of overriding `--label-left`.** _(observed drift: a composed form shipped 8 such rules; they bypass the token geometry and drift from Storybook in every theme.)_
- [ ] Every `lp-text-field*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<input>` — no `div` stand-ins.
- [ ] ARIA state kept and updated: `aria-label`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="time-picker"></a>

### TimePicker

Compact "Enter Time" card with large hour and minute boxes, an AM/PM toggle in 12-hour mode, and a Cancel/OK footer for capturing a single clock time.

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { TimePicker } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/time-picker/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-timepicker--default), [PM](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-timepicker--pm), [Twenty Four Hour](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-timepicker--twenty-four-hour)
- **Related:** [calendar](#calendar), [dropdown](#dropdown), [stepper](#stepper)

#### Purpose and usage rules

##### Overview

TimePicker is a compact card for typing a clock time: large editable hour and minute boxes split
by a colon, an AM/PM toggle in 12-hour mode, and a Cancel / OK footer. Use it when a flow needs a
**single standalone time entry** — alarms, reminders, deadlines. State is internal
(uncontrolled), seeded by the `default*` props; the result is reported once through
`onConfirm({ hour, minute, period })`.

##### Best practices

- Read the result **only from `onConfirm`** — intermediate keystrokes are draft state that clamps
  and re-pads on blur.
- Match `defaultHour` to the mode: 1–12 in 12-hour mode, 0–23 when `use24Hour` is set.
- Branch on `period === null` when persisting — that is how 24-hour values identify themselves.
- Keep the `label` task-shaped ("Enter Time", "Remind me at") — it is the card's accessible name.

##### When not to use

- **Composing a full recurring schedule** — date, time, and recurrence together — use
  [Calendar](https://lepide-design-system.vercel.app/components/calendar/), which embeds its own H/M/S dropdowns.
- **Durations or time ranges** — TimePicker captures one clock time; model durations with a
  [Stepper](https://lepide-design-system.vercel.app/components/stepper/) (e.g. "minutes") or two separate pickers.
- **Choosing from a short fixed list of times** (e.g. only on the hour) — a
  [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/) shows the valid options directly.

##### Types

**12-hour (default)**

The AM/PM toggle is visible and hours clamp to 1–12. This is the Figma-canonical frame (07:00
AM).

▶ Live: [12-hour mode, AM active](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-timepicker--default)

**PM selection**

Same mode with the PM segment active — the selected segment takes the tinted fill and brand text
via `aria-pressed`.

▶ Live: [09:30 PM](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-timepicker--pm)

**24-hour**

`use24Hour` hides the AM/PM toggle, clamps hours to 0–23, and reports `period: null` in
`onConfirm`.

▶ Live: [24-hour clock — no AM/PM toggle](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-timepicker--twenty-four-hour)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Overline label | Uppercase letter-spaced caption — defaults to "Enter Time"; also the card's accessible name |
| 2 | Hour and minute boxes | 80×64px tinted numeric inputs with "Hour" / "Minute" captions below |
| 3 | Colon | Two stacked dots separating the boxes (`aria-hidden`) |
| 4 | AM/PM toggle | Vertical bordered two-segment switch — 12-hour mode only |
| 5 | Footer | Brand clock glyph on the left; Cancel and OK text buttons on the right |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Typing | Hour/minute inputs accept digits only, capped at 2 characters; non-digits are stripped as you type |
| Blur clamp | Each box clamps into range (hour 1–12 or 0–23, minute 0–59) and re-pads to two digits |
| AM/PM | Simple toggle — clicking a segment selects it; hidden entirely in 24-hour mode |
| Commit | OK clamps the current values and fires `onConfirm({ hour, minute, period })`; Cancel fires `onCancel` |
| State | Internal (uncontrolled), seeded by `defaultHour` / `defaultMinute` / `defaultPeriod` |
| Theming | Card, boxes, and toggle resolve through component/semantic tokens in all three themes |

- ✓ **Do** — Read the chosen time once from onConfirm and branch on period === null for 24-hour values.
- ✕ **Don't** — Pair defaultPeriod with use24Hour — the toggle is hidden and the value ignored.

#### Canonical anatomy and examples

> **React-only** — This component has no `@ramsarjal-404/css` distribution yet — use `@ramsarjal-404/react`.

TimePicker is uncontrolled — seed it with the `default*` props and read the chosen time from
`onConfirm`.

##### Basic 12-hour

The default mode. `onConfirm` receives `{ hour, minute, period }` with `period` as `'AM'` or
`'PM'`.

**Example — 12-hour picker with handlers**

React:

```jsx
import { TimePicker } from '@ramsarjal-404/react';

<TimePicker
  defaultHour={7}
  defaultMinute={0}
  defaultPeriod="AM"
  onConfirm={({ hour, minute, period }) => setReminder(hour, minute, period)}
  onCancel={() => close()}
/>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live: hour/minute boxes + AM/PM toggle](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-timepicker--default)

##### 24-hour clock

`use24Hour` hides the AM/PM toggle, clamps hours to 0–23, and reports `period: null`.

**Example — 24-hour mode**

React:

```jsx
import { TimePicker } from '@ramsarjal-404/react';

<TimePicker
  use24Hour
  defaultHour={18}
  defaultMinute={45}
  onConfirm={({ hour, minute, period }) => {
    // period is null in 24-hour mode
    schedule(hour, minute);
  }}
/>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live: 24-hour mode](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-timepicker--twenty-four-hour)

##### Custom label

`label` renders as the uppercase overline and names the card for assistive technology.

**Example — Custom overline label**

React:

```jsx
import { TimePicker } from '@ramsarjal-404/react';

<TimePicker
  label="Remind me at"
  defaultHour={9}
  defaultMinute={30}
  defaultPeriod="PM"
  onConfirm={(value) => saveReminder(value)}
/>
```

_React-only example — no plain-CSS rendition exists for this component yet._

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultHour` | `number` | — | Initial hour (1–12 in 12h mode, 0–23 in 24h). |
| `defaultMinute` | `number` | `0` | Initial minute (0–59). |
| `defaultPeriod` | `enum` | `AM` | Initial AM/PM (12h mode only). Default "AM". |
| `label` | `string` | `Enter Time` | Overline label. Default "Enter Time". |
| `onCancel` | `(() => void)` | — | Footer — Cancel. |
| `onConfirm` | `((value: TimePickerValue) => void)` | — | Footer — OK. Receives the chosen time. |
| `use24Hour` | `boolean` | `false` | Use 24-hour clock (hides the AM/PM toggle). Default false. |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Clicking the hour or minute box places the caret for direct typing; a focused box gains a brand
  border plus a soft brand glow.
- Clicking an AM or PM segment selects it — the active segment takes the tinted fill and brand
  text.
- Cancel and OK are text buttons in the footer; OK clamps whatever is currently typed before
  reporting it.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves through hour box → minute box → AM/PM segments → Cancel → OK |
| Digits | Type the value directly — non-digits are stripped, input caps at 2 characters |
| `Enter` / `Space` | Activates the focused AM/PM segment or footer button (native buttons) |

On blur each box clamps into range (hour 1–12, or 0–23 in 24-hour mode; minute 0–59) and re-pads
to two digits — a half-typed "7" becomes "07". Footer buttons show visible `:focus-visible` brand
outlines.

**Screen readers**

- The card is `role="group"` labelled by the `label` text ("Enter Time" by default).
- The hour and minute fields carry explicit `aria-label="Hour"` / `"Minute"` and
  `inputMode="numeric"`, so touch devices raise numeric keyboards.
- The AM/PM toggle is a nested `role="group"` labelled "AM or PM"; its segments are native
  buttons exposing state via `aria-pressed`.
- The colon dots and the footer clock glyph are `aria-hidden` decoration.

##### Development considerations

- State is uncontrolled — there is no `value` prop. To programmatically reset the picker, remount
  it (e.g. change its `key`).
- `onConfirm` delivers already-clamped values; `period` is `null` only in 24-hour mode — branch
  on that when persisting.
- Don't pass `defaultPeriod` together with `use24Hour`; the toggle is hidden and the value
  ignored.
- The card is a group, not a dialog — if you present it in a popover or modal, the host owns
  focus management and dismissal.

##### Content

- Keep the `label` short and imperative ("Enter Time", "Remind me at") — it renders as the
  uppercase overline and is announced as the card's name.

#### Hard-fail checks — TimePicker

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="toggle"></a>

### Toggle

On/off switch — a 56×20 pill track with a sliding white thumb that applies a setting immediately. Renders a native button with role="switch".

- **Availability:** plain CSS (block `lp-toggle`) + React
- **React:** `import { Toggle } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/toggle/ · **Storybook:** [On](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-toggle--on), [Off](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-toggle--off), [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-toggle--disabled), [With Label](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-toggle--with-label), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-toggle--all-states)
- **Related:** [checkbox](#checkbox), [radio](#radio), [settings-panel](#settings-panel)

#### Legal class set (complete — do not invent others)

`lp-toggle` · `lp-toggle--on` · `lp-toggle__thumb`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`
- **Roles:** `role="switch"`
- **ARIA attributes:** `aria-checked`, `aria-label`, `aria-labelledby`

#### Purpose and usage rules

##### Overview

Toggle flips a single setting on or off with **immediate effect** — agent enabled,
notifications on, dark mode. It renders a native `<button role="switch" aria-checked>` styled
as a 56×20 pill track (`--radius-4xl`) with a 15px white thumb that slides between ends in
180ms. The track is brand blue when on (`--component-toggle-on-bg`), light blue when off
(`--component-toggle-off-bg`), and gray in both disabled positions — all token-driven, so the
dark and high-contrast themes restyle it with no extra code.

##### Best practices

- **Apply the change immediately** when the switch flips — no Save button.
- The switch is text-free: always name it with `aria-label` ("Enable notifications") or pair
  it with a visible label via `aria-labelledby`.
- Phrase the label as the thing being switched ("Auto-backup"), not the state ("On") — the
  switch itself communicates on/off.
- Don't disable a toggle without explaining why nearby.

##### When not to use

- **The value is collected and submitted with a form** — use
  [Checkbox](https://lepide-design-system.vercel.app/components/checkbox/); a switch implies instant effect.
- **One-of-many choices** — use [Radio](https://lepide-design-system.vercel.app/components/radio/) or
  [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/).
- **Triggering an action** (Run scan, Export) — that's a [Button](https://lepide-design-system.vercel.app/components/button/);
  switches represent state, not commands.

##### Variants

The four Figma variants map to checked × disabled.

**On**

Brand-blue track with a darker brand border, thumb at the right end.

▶ Live: [On — brand blue track](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-toggle--on)

**Off**

Light-blue track with a brand border, thumb at the left end.

▶ Live: [Off — light blue track](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-toggle--off)

**Disabled**

Gray track in both positions, interaction blocked via the native `disabled` attribute.

▶ Live: [The disabled pair](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-toggle--disabled)

**With a visible label**

The canonical settings-row pattern — controlled Toggle next to text describing the setting.

▶ Live: [Controlled toggle with a visible label](https://lepide-design-system.vercel.app/storybook/?path=/story/forms-toggle--with-label)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Track | 56×20 pill `<button role="switch">`, `--radius-4xl` (24px), 1px border one shade deeper than the fill |
| 2 | Thumb | 15px white circle (`--component-toggle-handle`) with a soft drop shadow; slides 3px → 36px |
| 3 | Focus ring | 2px brand outline, 2px offset, on `:focus-visible` |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Flip | Click, `Space`, or `Enter` toggles; `aria-checked` flips with the visual state |
| State signal | Conveyed by thumb position **and** track color — never color alone |
| Focus | 2px brand outline with 2px offset on `:focus-visible` |
| Disabled | Native `disabled` attribute — gray track in either position, removed from tab order, `cursor: not-allowed` |
| Motion | Thumb slides in 180ms; transitions collapse under `prefers-reduced-motion` |
| Theming | All `component/toggle/*` tokens re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Apply the setting the instant the switch flips — “Auto-backup” starts backing up right away.
- ✕ **Don't** — Put a Toggle inside a form that needs a Save/Submit step — that expectation belongs to Checkbox.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the
same tokens, so they are pixel-identical in every theme.

##### Basic

In plain HTML the switch is a `<button class="lp-toggle" role="switch">`; the on state is
`lp-toggle--on` **plus** `aria-checked="true"` — flip both in your click handler (Toggle is
not bound by `lepidus.js`; the two-line handler below is all it takes). In React the `Toggle`
component manages this for you.

**Example — Off and on (click to flip)**

Plain HTML (canonical):

```html
<div style="display: flex; gap: 16px; align-items: center">
  <button class="lp-toggle" role="switch" aria-checked="false" aria-label="Email notifications">
    <span class="lp-toggle__thumb"></span>
  </button>
  <button class="lp-toggle lp-toggle--on" role="switch" aria-checked="true" aria-label="Audit trail">
    <span class="lp-toggle__thumb"></span>
  </button>
</div>

<script>
  // flip the class and aria-checked together — that's the whole behavior
  document.querySelectorAll('.lp-toggle:not([disabled])').forEach((el) => {
    el.addEventListener('click', () => {
      const on = el.classList.toggle('lp-toggle--on');
      el.setAttribute('aria-checked', String(on));
    });
  });
</script>
```

React:

```jsx
import { Toggle } from '@ramsarjal-404/react';

<>
  <Toggle aria-label="Email notifications" />
  <Toggle defaultChecked aria-label="Audit trail" />
</>
```

##### With a visible label

The switch is text-free — pair it with visible text and link them with `aria-labelledby`
(plain HTML) or pass `aria-label` (React) so the switch always has an accessible name.

**Example — Settings-row pattern**

Plain HTML (canonical):

```html
<div style="display: flex; align-items: center; gap: 12px;
            font: 14px 'Open Sans', sans-serif; color: var(--color-text-primary)">
  <button class="lp-toggle lp-toggle--on" role="switch" aria-checked="true" aria-labelledby="backup-label">
    <span class="lp-toggle__thumb"></span>
  </button>
  <span id="backup-label">Auto-backup</span>
</div>

<script>
  document.querySelectorAll('.lp-toggle:not([disabled])').forEach((el) => {
    el.addEventListener('click', () => {
      const on = el.classList.toggle('lp-toggle--on');
      el.setAttribute('aria-checked', String(on));
    });
  });
</script>
```

React:

```jsx
import { Toggle } from '@ramsarjal-404/react';

{/* controlled usage paired with a visible label — the settings-row pattern */}
<label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
  <Toggle checked={on} onChange={setOn} aria-label="Auto-backup" />
  Auto-backup {on ? 'enabled' : 'disabled'}
</label>
```

##### Disabled

Always the native `disabled` attribute — it grays the track in either position and removes
the switch from the tab order.

**Example — Disabled in both positions**

Plain HTML (canonical):

```html
<div style="display: flex; gap: 16px; align-items: center">
  <!-- native disabled: gray track, removed from tab order -->
  <button class="lp-toggle" role="switch" aria-checked="false" aria-label="Archived setting" disabled>
    <span class="lp-toggle__thumb"></span>
  </button>
  <button class="lp-toggle lp-toggle--on" role="switch" aria-checked="true" aria-label="Locked setting" disabled>
    <span class="lp-toggle__thumb"></span>
  </button>
</div>
```

React:

```jsx
import { Toggle } from '@ramsarjal-404/react';

<>
  <Toggle disabled aria-label="Archived setting" />
  <Toggle disabled defaultChecked aria-label="Locked setting" />
</>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Toggle's styling is pure CSS; you wire the click handler that flips `lp-toggle--on` and `aria-checked` together.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled on/off state |
| `defaultChecked` | `boolean` | `false` | Uncontrolled initial state (default false) |
| `disabled` | `boolean` | `false` | Disabled state — Figma "Disabled on" / "Disabled Off" variants |
| `onChange` | `((checked: boolean) => void)` | — | Called with the next state when the user flips the switch |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The whole 56×20 track is the click target; the thumb is decoration.
- Hover gives no separate state — the switch is either on or off; the thumb slides and the
  track recolors only on flip.
- Clicking does not show the focus outline (`:focus-visible` semantics).

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the switch (native button tab order) |
| `Space` | Flips the switch (native button activation) |
| `Enter` | Flips the switch (native button activation) |

Focus shows a 2px brand outline offset 2px from the track. Disabled switches use the native
`disabled` attribute and are removed from the tab order.

**Screen readers**

- Renders a native `<button type="button" role="switch" aria-checked>` — announced as a
  switch that is "on" or "off", and `aria-checked` is kept in sync with the visual state on
  every flip.
- The switch is text-free, so the accessible name **must** come from `aria-label` or
  `aria-labelledby` pointing at a visible label — the component renders no name of its own.
- `disabled` is announced as "dimmed"/"unavailable" automatically by the native attribute.

##### Development considerations

- In plain HTML, flip `lp-toggle--on` and `aria-checked` **together** in your click handler —
  if they drift, sighted users and screen-reader users see different states.
- State is conveyed by thumb position *and* track color (light blue off / brand blue on), so
  color is never the only signal; the high-contrast theme strengthens both.
- Because the switch applies its effect immediately, never pair it with a Save button — users
  who hear "switch, on" expect the setting to already be active.
- The React component is a controlled/uncontrolled hybrid: pass `defaultChecked` for
  uncontrolled use, or `checked` + `onChange` to own the state.
- Thumb motion respects `prefers-reduced-motion` — do not re-add transitions for those users.

##### Content

- Name the setting, not the state: "Auto-backup", "Email notifications" — the switch role
  already announces on/off.
- Keep labels short noun phrases; if the setting needs explanation, put helper text nearby
  rather than lengthening the label.
- If a switch must be disabled, say why in visible text near it ("Archived settings can't be
  changed").

#### Hard-fail checks — Toggle

- [ ] Every `lp-toggle*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] Roles present where the anatomy has them: `role="switch"`.
- [ ] ARIA state kept and updated: `aria-checked`, `aria-label`, `aria-labelledby`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

### Data Display

<a id="accordion"></a>

### Accordion

Vertically stacked disclosure list — headed triggers that expand one panel at a time (or many), following the WAI-ARIA accordion pattern.

- **Availability:** plain CSS (block `lp-accordion`) + React
- **React:** `import { Accordion } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/accordion/ · **Storybook:** [Single](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-accordion--single), [Multiple](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-accordion--multiple), [Default Open](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-accordion--default-open), [Controlled](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-accordion--controlled), [FAQ Example](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-accordion--faq-example), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-accordion--all-states), [Keyboard And Toggle](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-accordion--keyboard-and-toggle)
- **Related:** [tabs](#tabs), [steps](#steps), [card](#card), [folder-tree](#folder-tree)

#### Legal class set (complete — do not invent others)

`lp-accordion` · `lp-accordion__chevron` · `lp-accordion__heading` · `lp-accordion__item` · `lp-accordion__panel` · `lp-accordion__panel--open` · `lp-accordion__panel-content` · `lp-accordion__panel-inner` · `lp-accordion__title` · `lp-accordion__trigger`

#### Hooks and semantics the canonical markup relies on

- **lepidus.js hooks:** `data-lp-accordion`
- **Native elements (keep them native):** `<button>`
- **ARIA attributes:** `aria-controls`, `aria-expanded`, `aria-hidden`

#### Purpose and usage rules

##### Overview

Accordion stacks sections of content behind headed triggers so users can scan titles and expand
only what they need — FAQs, settings groups, long-form detail on dense pages. Each trigger is a
real `<button>` inside a heading (`headingLevel`, default `h3`) carrying `aria-expanded`, and each
panel is a labelled `role="region"` landmark, per the WAI-ARIA accordion pattern. Panel height
animates via the `grid-template-rows` 0fr→1fr trick and collapses instantly under
`prefers-reduced-motion`.

##### Best practices

- Write trigger titles as **short noun phrases** users can scan: "Returns & exchanges", not
  "Click to read about our returns policy".
- Keep `single` mode (the default) for FAQs — opening an item closes the previous one, like a
  spotlight. Switch to `multiple` when users compare sections (specs, pricing tiers).
- Set `headingLevel` to one below the surrounding section's heading so the accordion slots into
  the page outline.
- Give each accordion on a page a unique `idPrefix` — the generated trigger/panel ids must not
  collide.

##### When not to use

- **Mutually exclusive *views* of the same thing** — use [Tabs](https://lepide-design-system.vercel.app/components/tabs/); an accordion
  is for stacked, independently readable sections.
- **A sequential flow** the user must complete in order — use [Steps](https://lepide-design-system.vercel.app/components/steps/).
- **Short content** — hiding two lines of text behind a click is friction, not focus; show it in
  a plain section or a [Card](https://lepide-design-system.vercel.app/components/card/).

##### Variants

**Single mode**

The default. Opening an item closes the previously open one, and clicking an open trigger
collapses it — zero items open is allowed.

▶ Live: [Single mode — at most one item open](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-accordion--single)

**Multiple mode**

Every item toggles independently, so several panels can stay open at once for comparison.

▶ Live: [Multiple mode — two items start open via defaultValue](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-accordion--multiple)

**Default open**

Uncontrolled with `defaultValue` — chosen items start expanded and the component manages state
internally from there. For external control (URL sync, "collapse all" buttons) use
`value` + `onValueChange` instead.

▶ Live: [defaultValue opens the first item on mount](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-accordion--default-open)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Root | `<div>` list; items divided by 1px `--color-border-default` borders |
| 2 | Heading | `<h2>`–`<h6>` via `headingLevel` (default `<h3>`), style-neutral wrapper |
| 3 | Trigger | Full-width native `<button>` with `aria-expanded` + `aria-controls` |
| 4 | Title | 14px semibold label inside the trigger; the accessible name |
| 5 | Chevron | 16px glyph, rotates 180° when expanded; `aria-hidden` |
| 6 | Panel | `role="region"` labelled by its trigger; height animates 0fr→1fr |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Expand modes | `single` (default) auto-closes the previous item; `multiple` toggles items independently |
| Keyboard | Enter/Space toggle the focused trigger; ArrowDown/ArrowUp rove focus between triggers (wrapping); Home/End jump to first/last |
| Hover | Trigger background tints to `--color-background-subtle` |
| Disabled item | `disabled: true` renders a non-interactive trigger at `--opacity-disabled`, skipped by Tab and arrow keys |
| Motion | Panel height and chevron animate over `--duration-base`; instant under `prefers-reduced-motion: reduce` |
| Theming | All colors re-resolve automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Use multiple mode when users compare sections, and set headingLevel to match the page outline.
- ✕ **Don't** — Nest accordions or hide critical-path content (errors, primary actions) inside a collapsed panel.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical form.
The React rendition (`@ramsarjal-404/react`) adds `single` mode and roving arrow-key focus on top of the
same markup and tokens.

> **Requires lepidus.js** — The plain-HTML accordion is interactive via `lepidus.js`: add `data-lp-accordion` to the root and it toggles `aria-expanded` on each trigger and `lp-accordion__panel--open` on the panel named by `aria-controls`. Items toggle independently (multiple mode) — single-open mode and arrow-key focus movement are React-only. Include the script once: ``.

##### Basic accordion

Each item is a heading-wrapped trigger plus a panel; the trigger's `aria-controls` must match the
panel's `id`.

**Example — Two collapsed items**

Plain HTML (canonical):

```html
<div class="lp-accordion" data-lp-accordion style="max-width: 560px">
  <div class="lp-accordion__item">
    <h3 class="lp-accordion__heading">
      <button class="lp-accordion__trigger" aria-expanded="false" aria-controls="acc-basic-1">
        <span class="lp-accordion__title">What does Lepide audit?</span>
        <svg class="lp-accordion__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6l5 5 5-5"/></svg>
      </button>
    </h3>
    <div class="lp-accordion__panel" id="acc-basic-1">
      <div class="lp-accordion__panel-inner">
        <div class="lp-accordion__panel-content">File servers, Active Directory, Exchange, SharePoint and Microsoft 365 activity.</div>
      </div>
    </div>
  </div>
  <div class="lp-accordion__item">
    <h3 class="lp-accordion__heading">
      <button class="lp-accordion__trigger" aria-expanded="false" aria-controls="acc-basic-2">
        <span class="lp-accordion__title">How long is data retained?</span>
        <svg class="lp-accordion__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6l5 5 5-5"/></svg>
      </button>
    </h3>
    <div class="lp-accordion__panel" id="acc-basic-2">
      <div class="lp-accordion__panel-inner">
        <div class="lp-accordion__panel-content">Retention is configurable per data source; the default policy keeps 12 months.</div>
      </div>
    </div>
  </div>
</div>
```

React:

```jsx
import { Accordion } from '@ramsarjal-404/react';

<Accordion
  idPrefix="faq"
  items={[
    {
      id: 'audit',
      title: 'What does Lepide audit?',
      content:
        'File servers, Active Directory, Exchange, SharePoint and Microsoft 365 activity.',
    },
    {
      id: 'retention',
      title: 'How long is data retained?',
      content:
        'Retention is configurable per data source; the default policy keeps 12 months.',
    },
  ]}
/>
```

##### Default open

Start an item expanded by setting `aria-expanded="true"` on the trigger **and**
`lp-accordion__panel--open` on its panel (in React, pass `defaultValue`).

**Example — First item open on load**

Plain HTML (canonical):

```html
<div class="lp-accordion" data-lp-accordion style="max-width: 560px">
  <div class="lp-accordion__item">
    <h3 class="lp-accordion__heading">
      <button class="lp-accordion__trigger" aria-expanded="true" aria-controls="acc-open-1">
        <span class="lp-accordion__title">Shipping details</span>
        <svg class="lp-accordion__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6l5 5 5-5"/></svg>
      </button>
    </h3>
    <div class="lp-accordion__panel lp-accordion__panel--open" id="acc-open-1">
      <div class="lp-accordion__panel-inner">
        <div class="lp-accordion__panel-content">Orders placed before 2pm ship the same business day.</div>
      </div>
    </div>
  </div>
  <div class="lp-accordion__item">
    <h3 class="lp-accordion__heading">
      <button class="lp-accordion__trigger" aria-expanded="false" aria-controls="acc-open-2">
        <span class="lp-accordion__title">Returns &amp; exchanges</span>
        <svg class="lp-accordion__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6l5 5 5-5"/></svg>
      </button>
    </h3>
    <div class="lp-accordion__panel" id="acc-open-2">
      <div class="lp-accordion__panel-inner">
        <div class="lp-accordion__panel-content">Items can be returned within 30 days of delivery in their original packaging.</div>
      </div>
    </div>
  </div>
</div>
```

React:

```jsx
import { Accordion } from '@ramsarjal-404/react';

<Accordion
  idPrefix="orders"
  defaultValue={['shipping']}
  items={[
    {
      id: 'shipping',
      title: 'Shipping details',
      content: 'Orders placed before 2pm ship the same business day.',
    },
    {
      id: 'returns',
      title: 'Returns & exchanges',
      content: 'Items can be returned within 30 days of delivery in their original packaging.',
    },
  ]}
/>
```

##### Disabled item

A disabled trigger uses the native `disabled` attribute — it can't be toggled and is removed from
the tab order.

**Example — Disabled item in the list**

Plain HTML (canonical):

```html
<div class="lp-accordion" data-lp-accordion style="max-width: 560px">
  <div class="lp-accordion__item">
    <h3 class="lp-accordion__heading">
      <button class="lp-accordion__trigger" aria-expanded="false" aria-controls="acc-dis-1">
        <span class="lp-accordion__title">Is there a free trial?</span>
        <svg class="lp-accordion__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6l5 5 5-5"/></svg>
      </button>
    </h3>
    <div class="lp-accordion__panel" id="acc-dis-1">
      <div class="lp-accordion__panel-inner">
        <div class="lp-accordion__panel-content">Every new workspace starts with a 14-day trial of the full feature set.</div>
      </div>
    </div>
  </div>
  <div class="lp-accordion__item">
    <h3 class="lp-accordion__heading">
      <button class="lp-accordion__trigger" aria-expanded="false" aria-controls="acc-dis-2" disabled>
        <span class="lp-accordion__title">Enterprise SLA (contact sales)</span>
        <svg class="lp-accordion__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6l5 5 5-5"/></svg>
      </button>
    </h3>
    <div class="lp-accordion__panel" id="acc-dis-2">
      <div class="lp-accordion__panel-inner">
        <div class="lp-accordion__panel-content">SLA details are shared during procurement.</div>
      </div>
    </div>
  </div>
</div>
```

React:

```jsx
import { Accordion } from '@ramsarjal-404/react';

<Accordion
  idPrefix="plans"
  items={[
    {
      id: 'trial',
      title: 'Is there a free trial?',
      content: 'Every new workspace starts with a 14-day trial of the full feature set.',
    },
    {
      id: 'sla',
      title: 'Enterprise SLA (contact sales)',
      content: 'SLA details are shared during procurement.',
      disabled: true,
    },
  ]}
/>
```

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultValue` | `string[]` | — | Uncontrolled initial open item ids. |
| `headingLevel` | `enum` | `3` | Heading level (2–6) wrapping each trigger button, so the accordion slots into the page outline. Defaults to 3. |
| `idPrefix` | `string` | `lds-accordion` | Prefix for the generated trigger/panel ids (must be unique per page). |
| `items` * | `AccordionItem[]` | — | Items to render, in order. |
| `mode` | `enum` | `single` | Expand mode — `single` (default) keeps at most one item open and closes the previous one; `multiple` lets any number of items stay open independently. |
| `onValueChange` | `((value: string[]) => void)` | — | Called with the next open-id array whenever a trigger is toggled. |
| `value` | `string[]` | — | Controlled list of open item ids. Pair with `onValueChange`; in `single` mode the array holds at most one id. |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The full-width trigger row is the click target — title text, chevron and the empty space
  between them all toggle the item.
- Hover tints the trigger background only; nothing moves or resizes.
- Disabled triggers ignore clicks (native `disabled` attribute).

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus between enabled triggers and any focusable content in open panels |
| `Enter` / `Space` | Toggles the focused trigger (native button activation) |
| `ArrowDown` | Moves focus to the next enabled trigger, wrapping to the first |
| `ArrowUp` | Moves focus to the previous enabled trigger, wrapping to the last |
| `Home` | Moves focus to the first enabled trigger |
| `End` | Moves focus to the last enabled trigger |

Focus shows a 3px inset brand-tinted ring on `:focus-visible` only. Arrow/Home/End roving focus
is implemented by the React component; the plain-HTML layer (`lepidus.js`) binds click and the
native Enter/Space only — Tab still reaches every trigger.

**Screen readers**

- Each trigger is a real `<button>` inside a heading (`headingLevel`, default `h3`), so users
  browsing by headings or by form controls both find every section.
- `aria-expanded` on the trigger announces the collapsed/expanded state; `aria-controls` points
  at the panel.
- Each panel is `role="region"` with `aria-labelledby` referencing its trigger — open panels are
  announced as named landmarks.
- Collapsed panels are `visibility: hidden`, removing their content from the accessibility tree
  and the tab order.

##### Development considerations

- Set `headingLevel` to one below the surrounding section's heading so the accordion fits the
  document outline; in plain HTML, choose the heading tag (`<h2>`–`<h6>`) yourself.
- Use a unique `idPrefix` (React) or unique panel `id`s (HTML) when several accordions share a
  page — duplicated ids break the `aria-controls` wiring.
- Never auto-collapse on blur or hover; expansion must only change on explicit toggle.
- The height and chevron animations are disabled under `prefers-reduced-motion: reduce` —
  don't reintroduce motion with custom CSS.
- Don't replicate a disabled item with CSS alone; only the native `disabled` attribute conveys
  the state to assistive technology.

##### Content

- Trigger titles are the accessible names of both the button and the panel region — keep them
  short, specific noun phrases ("Warranty", "Returns & exchanges").
- Don't put the only path to a critical action or an error message inside a collapsed panel.

#### Hard-fail checks — Accordion

- [ ] **Do not write click/keyboard handlers for `.lp-dropdown__trigger`, `.lp-dropdown__option`, `.lp-accordion__trigger`, `.lp-stepper__control`, `.lp-tabs__tab` or `[data-lp-modal-open]` — `lepidus.js` already owns open/close, selection, ARIA sync and Escape. Listen to `lp-dropdown-change` on the wrapper (or `change` on the stepper input) to read values.** _(observed drift: a composed form added its own dropdown controller; both handlers fired per click and the panel toggled closed again — the dropdown never opened.)_
- [ ] Every `lp-accordion*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] Hooks present: `data-lp-accordion` — and `lepidus.js` is included on the page.
- [ ] ARIA state kept and updated: `aria-controls`, `aria-expanded`, `aria-hidden`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="avatar"></a>

### Avatar

Identity thumbnail with an automatic initials fallback, deterministic background colors, presence dots, and group stacking.

- **Availability:** plain CSS (block `lp-avatar`) + React
- **React:** `import { Avatar } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/avatar/ · **Storybook:** [Image](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--image), [Initials](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--initials), [Sizes](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--sizes), [With Status](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--with-status), [Group](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--group), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--all-states), [Fallback Behavior](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--fallback-behavior)
- **Related:** [badge](#badge), [link](#link), [button](#button)

#### Legal class set (complete — do not invent others)

`lp-avatar` · `lp-avatar--circle` · `lp-avatar--lg` · `lp-avatar--md` · `lp-avatar--overflow` · `lp-avatar--series1` · `lp-avatar--series2` · `lp-avatar--series3` · `lp-avatar--series4` · `lp-avatar--series5` · `lp-avatar--series6` · `lp-avatar--sm` · `lp-avatar--square` · `lp-avatar--xl` · `lp-avatar-group` · `lp-avatar-group__item` · `lp-avatar__fallback` · `lp-avatar__image` · `lp-avatar__status` · `lp-avatar__status--away` · `lp-avatar__status--offline` · `lp-avatar__status--online`

#### Hooks and semantics the canonical markup relies on

- **Roles:** `role="group"`, `role="img"`
- **ARIA attributes:** `aria-hidden`, `aria-label`

#### Purpose and usage rules

##### Overview

Avatar represents a person (or entity) as an image with a guaranteed graceful fallback: when the
image is missing or fails to load, it renders up to two initials derived from the name on a
background deterministically hashed from the name onto the six chart-series tokens — the same
person always gets the same color, everywhere in the product. An optional presence dot pins to
the bottom-right corner, and **AvatarGroup** stacks collaborators with an overlap and a "+N"
overflow chip.

Avatar is non-interactive. To make it clickable, wrap it in a [Button](https://lepide-design-system.vercel.app/components/button/) or a
[Link](https://lepide-design-system.vercel.app/components/link/) — don't attach click handlers directly.

##### Best practices

- **Always pass `name`**, even with an image — it powers the initials fallback and the
  accessible name.
- Keep **one size per context**: `sm` (24px) in tables, `md` (32px) in lists, `lg` (40px) in
  page headers, `xl` (56px) for profiles.
- Let the hash pick the fallback color — it keeps colors **stable and consistent** across the
  product.
- In groups, set `max` and let the "+N" chip summarize — don't stack more than ~5 visible
  avatars.

##### When not to use

- **Status text next to a name** ("Online") — prefer a [Badge](https://lepide-design-system.vercel.app/components/badge/) with a dot;
  the Avatar `status` dot is for compact presence on the thumbnail itself.
- **Clickable profile entry points** — wrap the Avatar in a [Button](https://lepide-design-system.vercel.app/components/button/) or
  [Link](https://lepide-design-system.vercel.app/components/link/); the Avatar itself has no interactive semantics.
- **Decorative imagery** that isn't an identity — use a plain image.

##### Variants

**Image**

The image covers the container (`object-fit: cover`) and inherits its radius. `alt` provides
the accessible name.

▶ Live: [Image avatar](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--image)

**Initials fallback**

No image (or a failed load) renders 1–2 initials — first word + last word of the name — on the
chart-series background the name hashes to. The same name always yields the same color.

▶ Live: [Initials fallback](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--initials)

**Sizes and shapes**

Four sizes (`sm` 24px, `md` 32px, `lg` 40px, `xl` 56px) and two shapes (`circle`, `square`).
Initials scale with the container.

▶ Live: [sm / md / lg / xl, circle and square](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--sizes)

**With status**

A presence dot pinned bottom-right with a 2px surface ring: `online` is success green, `away`
is chart yellow, `offline` is disabled gray — each announced via an `aria-label`.

▶ Live: [Online presence dot](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--with-status)

**Group**

AvatarGroup stacks avatars with a −8px overlap and a 2px surface ring per item; `max` collapses
the remainder into a "+N" chip labelled "N more".

▶ Live: [Group of five, max 3 visible](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-avatar--group)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | Inline `<span>`, 24/32/40/56px square; circle (full radius) or square (9px radius) |
| 2 | Image | `<img>` with `object-fit: cover`, inherits the container radius |
| 3 | Initials fallback | `role="img"` with the person's name as `aria-label`; the 1–2 characters themselves are `aria-hidden` |
| 4 | Status dot *(optional)* | Bottom-right circle with a 2px surface ring and an `aria-label` |
| 5 | Group | `role="group"` flex row, −8px overlap, 2px surface ring per item, "+N" overflow chip |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Image fallback | A missing or failed `src` automatically swaps to initials — layout never jumps |
| Deterministic color | The name hashes onto `--color-chart-series-1…6`; the same name always gets the same background |
| Initials | First word + last word, max 2 characters, uppercased ("Ada Lovelace" → "AL") |
| Group overflow | Children beyond `max` collapse into a "+N" chip; `size`/`shape` push down onto every child |
| Theming | Series, ring, and status colors re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Always pass name, even with an image — it powers the fallback and the accessible name.
- ✕ **Don't** — Hand-pick fallback colors or rely on the status dot color as the only carrier of presence information.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the
same tokens, so they are pixel-identical in every theme. In plain HTML you pick the size,
shape, series color, and initials yourself; the React component derives them from `name`.

##### Initials

Root `lp-avatar` + size + shape + one `lp-avatar--series1`…`--series6` background. The wrapper
carries `role="img"` and the person's name as `aria-label`; the `lp-avatar__fallback` initials
are `aria-hidden` decoration.

**Example — Initials on a series background**

Plain HTML (canonical):

```html
<!-- the wrapper carries the name; the initials are aria-hidden decoration -->
<span class="lp-avatar lp-avatar--lg lp-avatar--circle lp-avatar--series3"
      role="img" aria-label="Grace Hopper">
  <span class="lp-avatar__fallback" aria-hidden="true">GH</span>
</span>
```

React:

```jsx
import { Avatar } from '@ramsarjal-404/react';

// no src → initials fallback; the name drives the initials,
// the deterministic series color, and the accessible name
<Avatar name="Grace Hopper" size="lg" />
```

##### Image

An `lp-avatar__image` inside the container — it covers the avatar and inherits the radius. In
React, a failed load automatically falls back to initials.

**Example — Image avatar**

Plain HTML (canonical):

```html
<span class="lp-avatar lp-avatar--lg lp-avatar--circle">
  <img class="lp-avatar__image" alt="Ada Lovelace"
       src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 56'><rect width='56' height='56' fill='%231c4599'/><circle cx='28' cy='22' r='9' fill='%23e4edff'/><path d='M10 50c2-10 9-15 18-15s16 5 18 15z' fill='%23e4edff'/></svg>" />
</span>
```

React:

```jsx
import { Avatar } from '@ramsarjal-404/react';

// keep name alongside src — it powers the fallback if the image fails
<Avatar src="/portraits/ada.jpg" alt="Ada Lovelace" name="Ada Lovelace" size="lg" />
```

##### Sizes and shapes

Sizes `lp-avatar--sm|--md|--lg|--xl` (24/32/40/56px); shapes `lp-avatar--circle|--square`.

**Example — All four sizes, both shapes**

Plain HTML (canonical):

```html
<div style="display: flex; gap: 16px; align-items: center">
  <span class="lp-avatar lp-avatar--sm lp-avatar--circle lp-avatar--series4"
        role="img" aria-label="Ada Lovelace">
    <span class="lp-avatar__fallback" aria-hidden="true">AL</span>
  </span>
  <span class="lp-avatar lp-avatar--md lp-avatar--circle lp-avatar--series4"
        role="img" aria-label="Ada Lovelace">
    <span class="lp-avatar__fallback" aria-hidden="true">AL</span>
  </span>
  <span class="lp-avatar lp-avatar--lg lp-avatar--circle lp-avatar--series4"
        role="img" aria-label="Ada Lovelace">
    <span class="lp-avatar__fallback" aria-hidden="true">AL</span>
  </span>
  <span class="lp-avatar lp-avatar--xl lp-avatar--circle lp-avatar--series4"
        role="img" aria-label="Ada Lovelace">
    <span class="lp-avatar__fallback" aria-hidden="true">AL</span>
  </span>
  <span class="lp-avatar lp-avatar--xl lp-avatar--square lp-avatar--series4"
        role="img" aria-label="Ada Lovelace">
    <span class="lp-avatar__fallback" aria-hidden="true">AL</span>
  </span>
</div>
```

React:

```jsx
import { Avatar } from '@ramsarjal-404/react';

<>
  <Avatar name="Ada Lovelace" size="sm" />
  <Avatar name="Ada Lovelace" size="md" />
  <Avatar name="Ada Lovelace" size="lg" />
  <Avatar name="Ada Lovelace" size="xl" />
  <Avatar name="Ada Lovelace" size="xl" shape="square" />
</>
```

##### Status

Append an `lp-avatar__status` dot with `--online`, `--away`, or `--offline`. In plain HTML the
dot is `aria-hidden` and the presence goes into the wrapper's `aria-label`; in React the dot
carries its own `aria-label` ("Online" / "Away" / "Offline").

**Example — Presence dots**

Plain HTML (canonical):

```html
<!-- in plain HTML, bake presence into the wrapper label; the dot is decoration -->
<div style="display: flex; gap: 16px; align-items: center">
  <span class="lp-avatar lp-avatar--lg lp-avatar--circle lp-avatar--series3"
        role="img" aria-label="Jane Kim (online)">
    <span class="lp-avatar__fallback" aria-hidden="true">JK</span>
    <span class="lp-avatar__status lp-avatar__status--online" aria-hidden="true"></span>
  </span>
  <span class="lp-avatar lp-avatar--lg lp-avatar--circle lp-avatar--series1"
        role="img" aria-label="Marc Torres (away)">
    <span class="lp-avatar__fallback" aria-hidden="true">MT</span>
    <span class="lp-avatar__status lp-avatar__status--away" aria-hidden="true"></span>
  </span>
  <span class="lp-avatar lp-avatar--lg lp-avatar--circle lp-avatar--series5"
        role="img" aria-label="Chen Du (offline)">
    <span class="lp-avatar__fallback" aria-hidden="true">CD</span>
    <span class="lp-avatar__status lp-avatar__status--offline" aria-hidden="true"></span>
  </span>
</div>
```

React:

```jsx
import { Avatar } from '@ramsarjal-404/react';

<>
  <Avatar name="Jane Kim" size="lg" status="online" />
  <Avatar name="Marc Torres" size="lg" status="away" />
  <Avatar name="Chen Du" size="lg" status="offline" />
</>
```

##### Group

Wrap avatars in `lp-avatar-group`, add `lp-avatar-group__item` to each, and use
`lp-avatar--overflow` for the "+N" chip. In React, `AvatarGroup max={3}` does the collapsing
for you.

**Example — Stack with overflow chip**

Plain HTML (canonical):

```html
<span class="lp-avatar-group" role="group" aria-label="Contributors">
  <span class="lp-avatar lp-avatar--md lp-avatar--circle lp-avatar--series2 lp-avatar-group__item"
        role="img" aria-label="Ana Brown">
    <span class="lp-avatar__fallback" aria-hidden="true">AB</span>
  </span>
  <span class="lp-avatar lp-avatar--md lp-avatar--circle lp-avatar--series5 lp-avatar-group__item"
        role="img" aria-label="Chen Du">
    <span class="lp-avatar__fallback" aria-hidden="true">CD</span>
  </span>
  <span class="lp-avatar lp-avatar--md lp-avatar--circle lp-avatar--series4 lp-avatar-group__item"
        role="img" aria-label="Mary Jackson">
    <span class="lp-avatar__fallback" aria-hidden="true">MJ</span>
  </span>
  <span class="lp-avatar lp-avatar--md lp-avatar--circle lp-avatar--overflow lp-avatar-group__item"
        role="img" aria-label="2 more">
    <span class="lp-avatar__fallback" aria-hidden="true">+2</span>
  </span>
</span>
```

React:

```jsx
import { Avatar, AvatarGroup } from '@ramsarjal-404/react';

// children beyond max collapse into the "+N" chip, labelled "N more"
<AvatarGroup max={3} size="md" aria-label="Contributors">
  <Avatar name="Ana Brown" />
  <Avatar name="Chen Du" />
  <Avatar name="Mary Jackson" />
  <Avatar name="Katherine Johnson" />
  <Avatar name="Dorothy Vaughan" />
</AvatarGroup>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Avatar is pure CSS and needs no `lepidus.js`.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `alt` | `string` | — | Image alt text — becomes the accessible name when the image renders. Falls back to `name`. |
| `name` | `string` | — | Person's display name. Drives the initials fallback (max 2 characters) and the deterministic background color (hashed onto `--color-chart-series-1…6`). Also used as the accessible name when no `alt` is provided. |
| `shape` | `enum` | `circle` | Container shape — `circle` (default, `--radius-avatar`) or `square` (`--radius-ms`). |
| `size` | `enum` | `md` | Avatar size — sm 24px, md 32px, lg 40px, xl 56px. |
| `src` | `string` | — | Image source. When it fails to load the avatar gracefully falls back to initials. |
| `status` | `enum` | — | Optional presence dot pinned to the bottom-right corner. Maps to online → `--color-status-success-text`, away → `--chart-yellow`, offline → `--color-text-disabled`. Announced via an `aria-label` ("Online" …). |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Avatar is **not interactive** — no hover, no pointer cursor, no click behavior. For clickable
  avatars, wrap the Avatar in a [Button](https://lepide-design-system.vercel.app/components/button/) or [Link](https://lepide-design-system.vercel.app/components/link/) and
  let the wrapper own the interaction.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` | Skips the Avatar — it is not focusable and has no keyboard behavior |

When wrapped in a Button or Link, the wrapper receives focus and activation; the Avatar inside
stays decorative.

**Screen readers**

- **Image avatars**: the `<img>` carries the accessible name via `alt` (React falls back to
  `name` when `alt` is omitted). Pass `alt=""` only for purely decorative avatars duplicated by
  adjacent text.
- **Initials fallback**: exposes `role="img"` with the person's name as `aria-label`, so the
  person is announced either way. The initials characters themselves are `aria-hidden` — the
  label is "Ada Lovelace", never "AL".
- **Status dot**: announced via an explicit `aria-label` ("Online" / "Away" / "Offline") in
  React. In plain HTML, bake the presence into the wrapper's label
  (`aria-label="Jane Kim (online)"`) and keep the dot `aria-hidden`.
- **AvatarGroup**: renders `role="group"` — give it an `aria-label` (e.g. "Contributors") when
  the context isn't obvious. The "+N" overflow chip is labelled "N more".

##### Development considerations

- **Documented contrast exemption**: white initials on the red, yellow, and light-blue
  chart-series backgrounds fall below the 4.5:1 AA text threshold. Because the initials are
  `aria-hidden` decoration and the accessible name comes from the `aria-label`, the
  `.lp-avatar__fallback` element is excluded from the axe `color-contrast` rule in the design
  system's own checks — the same exemption the Avatar stories use. Revisit when dedicated
  `component/avatar` tokens land.
- Always provide `name` even when `src` is set — it covers the fallback path and the accessible
  name in one move.
- Never rely on the status dot color alone in surrounding copy; pair presence with text (a
  [Badge](https://lepide-design-system.vercel.app/components/badge/) with a dot reads better next to a name).
- Don't attach click handlers directly to the Avatar — it exposes no role or focus for
  interaction.

##### Content

- The accessible name is the person's name as written in the product ("Jane Kim"), not the
  initials.
- Group labels describe the collection: "Contributors", "Assigned analysts".

#### Hard-fail checks — Avatar

- [ ] Every `lp-avatar*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Roles present where the anatomy has them: `role="group"`, `role="img"`.
- [ ] ARIA state kept and updated: `aria-hidden`, `aria-label`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="badge"></a>

### Badge

Read-only status pill that labels the state or category of an object inline — bound to the shared status tokens so colors never drift.

- **Availability:** plain CSS (block `lp-badge`) + React
- **React:** `import { Badge } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/badge/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--default), [Success](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--success), [Warning](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--warning), [Error](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--error), [Neutral](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--neutral), [With Dot](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--with-dot), [With Icon](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--with-icon), [All Variants](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--all-variants)
- **Related:** [tag](#tag), [button](#button), [message](#message)

#### Legal class set (complete — do not invent others)

`lp-badge` · `lp-badge--default` · `lp-badge--error` · `lp-badge--neutral` · `lp-badge--success` · `lp-badge--warning` · `lp-badge__dot` · `lp-badge__icon`

#### Hooks and semantics the canonical markup relies on

- **ARIA attributes:** `aria-hidden`

#### Purpose and usage rules

##### Overview

Badge labels the state or category of an object inline — "Active", "Pending", "Failed" — next to
table rows, card titles, and list items. It renders a plain inline `<span>` pill: purely
presentational and non-interactive by design. The `default` variant is the brand pill
(`component/badge` tokens); `success` / `warning` / `error` / `neutral` reuse the shared
`component/status` palette, so badge colors always match status colors elsewhere in the system
and re-resolve automatically in the dark and high-contrast themes.

##### Best practices

- Keep labels to **one or two words** ("Active", "Sync failed") — the pill never wraps.
- Pick the variant **by meaning, not color preference**: `success` = healthy/complete,
  `warning` = needs attention, `error` = failed, `neutral` = not applicable/unknown.
- Use the **leading dot** for live presence and health indicators (Online / Away / Offline).
- Let the **text state the status** — color and the dot are reinforcement, never the only signal.
- Compose Badges into [Card](https://lepide-design-system.vercel.app/components/card/) `actions` slots and [Table](https://lepide-design-system.vercel.app/components/table/)
  cells for at-a-glance status columns.

##### When not to use

- **Removable, user-applied items** (filters, selections) — use [Tag](https://lepide-design-system.vercel.app/components/tag/); it has a
  real dismiss button. Badge is what the *system* says, Tag is what the *user* put there.
- **Clickable actions** — a Badge has no button semantics; use [Button](https://lepide-design-system.vercel.app/components/button/) or
  ActionItem instead.
- **Transient feedback after an action** — use [Toast](https://lepide-design-system.vercel.app/components/toast/) or
  [Message](https://lepide-design-system.vercel.app/components/message/); a Badge is persistent state, not a notification.

##### Variants

**Default**

The brand pill — lightblue background with brand-blue text via the `component/badge` token pair.
**Use for** categories and counts that carry no good/bad judgement ("Beta", "New", "3 reports").

▶ Live: [Default (brand)](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--default)

**Success**

Green pair from `component/status/success`. **Use for** healthy, complete, or enabled states.

▶ Live: [Success](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--success)

**Warning**

Orange pair from `component/status/warning`. **Use for** pending or attention-needed states.

▶ Live: [Warning](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--warning)

**Error**

Red pair from `component/status/error`. **Use for** failed or blocking states.

▶ Live: [Error](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--error)

**Neutral**

Gray "not applicable" pair from `component/status/na`. **Use for** unknown, inactive, or
inapplicable states.

▶ Live: [Neutral](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--neutral)

**With status dot**

A 6px leading dot filled with `currentColor`, so it always matches the variant text color. The
dot is `aria-hidden` decoration — keep the meaning in the label.

▶ Live: [Success badge with status dot](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--with-dot)

**With icon**

A 12px leading icon slot. Pass an SVG that uses `currentColor` so it inherits the variant text
color; the icon replaces the dot when both are set.

▶ Live: [Success badge with check icon](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-badge--with-icon)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | Inline `<span>` pill — 28px radius, 5px/15px padding, 1px transparent border |
| 2 | Leading dot *(optional)* | 6px circle filled with the variant text color, `aria-hidden` |
| 3 | Leading icon *(optional)* | 12px slot, replaces the dot when both are set |
| 4 | Label | Required — Open Sans 12px Semibold, single line; the badge's meaning |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Non-interactive | No hover, focus, or click behavior — Badge is read-only by design |
| Dot vs icon | `icon` wins when both are provided; both inherit the variant text color via `currentColor` |
| No wrapping | The pill stays on one line — keep labels to 1–2 words |
| Theming | All variant pairs re-resolve under `data-theme="dark"` and `"hc"` with no extra code |

- ✓ **Do** — Pick the variant by meaning and let the text state the status: a success Badge labelled “Active”.
- ✕ **Don't** — Attach click handlers to a Badge or encode the status in color alone — it is a plain span with no button semantics.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the
same tokens, so they are pixel-identical in every theme.

##### Variants

Block `lp-badge` + exactly one variant modifier. `lp-badge--default` is the brand pill; the four
status modifiers bind to the shared `component/status/*` tokens.

**Example — All five variants**

Plain HTML (canonical):

```html
<span class="lp-badge lp-badge--default">Brand</span>
<span class="lp-badge lp-badge--success">Active</span>
<span class="lp-badge lp-badge--warning">Pending</span>
<span class="lp-badge lp-badge--error">Failed</span>
<span class="lp-badge lp-badge--neutral">N/A</span>
```

React:

```jsx
import { Badge } from '@ramsarjal-404/react';

<>
  <Badge variant="default">Brand</Badge>
  <Badge variant="success">Active</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="error">Failed</Badge>
  <Badge variant="neutral">N/A</Badge>
</>
```

##### With status dot

An empty `lp-badge__dot` span before the label — it fills with the variant text color via
`currentColor` and carries no text of its own.

**Example — Status dots for presence and health**

Plain HTML (canonical):

```html
<!-- the dot is empty decoration; the label carries the meaning -->
<span class="lp-badge lp-badge--success"><span class="lp-badge__dot"></span>Online</span>
<span class="lp-badge lp-badge--warning"><span class="lp-badge__dot"></span>Away</span>
<span class="lp-badge lp-badge--error"><span class="lp-badge__dot"></span>Offline</span>
<span class="lp-badge lp-badge--neutral"><span class="lp-badge__dot"></span>Unknown</span>
```

React:

```jsx
import { Badge } from '@ramsarjal-404/react';

<>
  <Badge variant="success" dot>Online</Badge>
  <Badge variant="warning" dot>Away</Badge>
  <Badge variant="error" dot>Offline</Badge>
  <Badge variant="neutral" dot>Unknown</Badge>
</>
```

##### With icon

A 12px `lp-badge__icon` slot before the label. Pass an SVG that strokes/fills with
`currentColor` and mark it `aria-hidden` — the label remains the accessible text.

**Example — Leading check icon**

Plain HTML (canonical):

```html
<span class="lp-badge lp-badge--success">
  <span class="lp-badge__icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  </span>
  Verified
</span>
```

React:

```jsx
import { Badge } from '@ramsarjal-404/react';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

<Badge variant="success" icon={<CheckIcon />}>Verified</Badge>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Badge is pure CSS and needs no `lepidus.js`.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` * | `ReactNode` | — | Badge label |
| `dot` | `boolean` | `false` | Show a leading status dot (uses the variant text color) |
| `icon` | `ReactNode` | — | Leading icon slot (replaces the dot if both are set) |
| `variant` | `enum` | `default` | Visual variant — default (brand) uses component/badge tokens; the rest use component/status tokens |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Badge is **not interactive** — no hover effect, no pointer cursor, no click behavior. If a
  Badge appears to invite a click, the design is wrong: wrap the action in a
  [Button](https://lepide-design-system.vercel.app/components/button/) instead.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` | Skips the Badge — it is not focusable and adds nothing to the tab order |

There is no keyboard behavior to document because there is no interaction: Badge is a plain
inline `<span>`.

**Screen readers**

- Renders a plain `<span>` with **no implicit role** — the label is read as regular text in
  document flow ("Active", "Failed"), exactly where it sits next to the object it describes.
- The status dot is `aria-hidden="true"` and is never announced — the text label must carry the
  full meaning on its own.
- Icons passed into the icon slot should be decorative (`aria-hidden="true"` on the SVG); the
  label already provides the accessible text.

##### Development considerations

- Never attach click handlers expecting button semantics — Badge exposes no role, no focus, and
  no keyboard activation. Use [Button](https://lepide-design-system.vercel.app/components/button/) or [Tag](https://lepide-design-system.vercel.app/components/tag/) (which has
  a real dismiss `<button>`) for anything interactive.
- Color is never the only signal: all four status variants pair a distinct label with the color,
  and the dot is reinforcement only.
- The variant pairs (status text on light status background) come from the token palette designed
  for legible contrast; the `hc` theme swaps in higher-contrast values automatically — don't
  override the colors per-instance.

##### Content

- One or two words: "Active", "Pending", "Sync failed". The pill never wraps, so long labels
  overflow their context.
- Make the label state the status explicitly — "Failed", not a red "Status".
- Use sentence case and avoid punctuation.

#### Hard-fail checks — Badge

- [ ] Every `lp-badge*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] ARIA state kept and updated: `aria-hidden`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="card"></a>

### Card

Surface container that groups related content with optional header, title actions, body, and footer slots.

- **Availability:** plain CSS (block `lp-card`) + React
- **React:** `import { Card } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/card/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-card--default), [Elevated](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-card--elevated), [With Actions](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-card--with-actions), [With Footer](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-card--with-footer), [Credentials Card](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-card--credentials-card)
- **Related:** [modal](#modal), [badge](#badge), [button](#button)

#### Legal class set (complete — do not invent others)

`lp-card` · `lp-card--borderless` · `lp-card--elevated` · `lp-card__actions` · `lp-card__body` · `lp-card__footer` · `lp-card__header` · `lp-card__title`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`

#### Purpose and usage rules

##### Overview

Card groups related content — settings panels, status summaries, and form shells — on the
light-blue card surface that distinguishes it from the page background. It composes an optional
header (title + actions), a body, and a footer in a vertical 24px-gap stack, and is the standard
shell for in-page forms and confirmations. Every visual property resolves through the
`component/card/*` tokens (with `shadow-card/*` for the elevated variant), so the dark and
high-contrast themes restyle it with no extra code.

Card is a static layout surface: it has no behavior of its own, and its interactive children
(Buttons, Inputs) keep their own focus order and styles.

##### Best practices

- Use `elevated` + `borderless` **together** for floating/raised cards (e.g. dialog-like form
  shells on the page surface).
- Put the **primary action last** in the footer (Cancel then Confirm), and status pills in the
  header `actions` slot.
- Keep **titles short and descriptive** — they label the whole card.
- Use a [Badge](https://lepide-design-system.vercel.app/components/badge/) in the `actions` slot for one-line status next to the title,
  rather than a nested card.

##### When not to use

- **Blocking flows** that need a backdrop and focus trapping — use [Modal](https://lepide-design-system.vercel.app/components/modal/);
  Card is in-page and never traps focus.
- **Transient notifications** — use [Toast](https://lepide-design-system.vercel.app/components/toast/) or
  [Message](https://lepide-design-system.vercel.app/components/message/); a Card is persistent page structure.
- **Form-heavy settings screens** with their own navigation — see
  [SettingsPanel](https://lepide-design-system.vercel.app/components/settings-panel/).

##### Variants

**Default**

The baseline surface: card background, 1px border, 15px radius, 20px padding, with the title and
body text tokens. **Use for** most grouped content sitting directly on the page.

▶ Live: [Default card with title and body](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-card--default)

**Elevated**

`elevated` raises the card with the `shadow-card` tokens; pair it with `borderless` to drop the
1px border. **Use for** surfaces that should float above the page — form shells, prominent
summaries.

▶ Live: [Elevated + borderless](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-card--elevated)

**With title actions**

The header row uses space-between: the title stays left and the `actions` slot pins right —
typically a Badge or a small Button.

▶ Live: [Success Badge in the actions slot](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-card--with-actions)

**With footer**

The `footer` slot carries the card's actions — here the destructive confirmation pattern with a
secondary Cancel and a danger Delete.

▶ Live: [Footer with Cancel / Delete](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-card--with-footer)

**Composed form shell**

The full "Add Credentials" composition: an elevated borderless Card as the form shell, stacked
Inputs in the body, and Cancel/Done Buttons centered in the footer.

▶ Live: [Card as a form shell](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-card--credentials-card)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | `<div>` surface — 15px radius, 20px padding, 24px vertical gap, 1px border |
| 2 | Header *(optional)* | Flex row with space-between: title left, actions right |
| 3 | Title | 16px Semibold via the `component/card/title-text` token — a styled `<div>`, not a heading element |
| 4 | Actions *(optional)* | Right side of the title row — typically a Badge or a small Button |
| 5 | Body | Main content area, secondary text color (`component/card/body-text`) |
| 6 | Footer *(optional)* | Flex row for actions such as Cancel / Confirm Buttons |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Elevated | `elevated` / `lp-card--elevated` adds the soft `shadow-card` drop shadow (0 2px 9px) |
| Borderless | `borderless` / `lp-card--borderless` hides the 1px border — usually combined with `elevated` |
| Static surface | The card itself is not focusable and has no hover or click behavior |
| Children | Interactive children keep their own focus order and focus-visible styles |
| Theming | Surface, border, and text tokens re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Compose one level of Card: title, a status Badge in actions, content, and footer buttons.
- ✕ **Don't** — Nest cards inside cards, or make the entire card clickable while it contains interactive children.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the
same tokens, so they are pixel-identical in every theme.

##### Basic

Block `lp-card` with the optional `lp-card__header` (holding `lp-card__title`) and the
`lp-card__body`. Header, footer, and actions are all optional — body-only cards are valid.

**Example — Title and body**

Plain HTML (canonical):

```html
<div style="max-width: 380px">
  <div class="lp-card">
    <div class="lp-card__header">
      <div class="lp-card__title">Lepide AI</div>
    </div>
    <div class="lp-card__body">
      Connect your workspace to Lepide AI to start analysing activity
      across your environment.
    </div>
  </div>
</div>
```

React:

```jsx
import { Card } from '@ramsarjal-404/react';

<Card title="Lepide AI">
  Connect your workspace to Lepide AI to start analysing activity across
  your environment.
</Card>
```

##### Elevated

`lp-card--elevated` adds the `shadow-card` drop shadow; `lp-card--borderless` drops the 1px
border. They are usually combined.

**Example — Elevated + borderless**

Plain HTML (canonical):

```html
<div style="max-width: 380px">
  <div class="lp-card lp-card--elevated lp-card--borderless">
    <div class="lp-card__header">
      <div class="lp-card__title">Elevated card</div>
    </div>
    <div class="lp-card__body">
      This card is raised with the shadow-card tokens and has no border.
    </div>
  </div>
</div>
```

React:

```jsx
import { Card } from '@ramsarjal-404/react';

<Card elevated borderless title="Elevated card">
  This card is raised with the shadow-card tokens and has no border.
</Card>
```

##### Title actions

`lp-card__actions` sits on the right of the header row — the title stays left, actions pin
right.

**Example — Badge in the actions slot**

Plain HTML (canonical):

```html
<div style="max-width: 420px">
  <div class="lp-card">
    <div class="lp-card__header">
      <div class="lp-card__title">Connection status</div>
      <div class="lp-card__actions">
        <span class="lp-badge lp-badge--success"><span class="lp-badge__dot"></span>Active</span>
      </div>
    </div>
    <div class="lp-card__body">
      Your API credentials are valid and syncing every 5 minutes.
    </div>
  </div>
</div>
```

React:

```jsx
import { Card, Badge } from '@ramsarjal-404/react';

<Card
  title="Connection status"
  actions={<Badge variant="success" dot>Active</Badge>}
>
  Your API credentials are valid and syncing every 5 minutes.
</Card>
```

##### Footer

`lp-card__footer` is a flex row for the card's actions — here the destructive confirmation
pattern.

**Example — Footer with Cancel / Delete**

Plain HTML (canonical):

```html
<div style="max-width: 460px">
  <div class="lp-card">
    <div class="lp-card__header">
      <div class="lp-card__title">Delete workspace</div>
    </div>
    <div class="lp-card__body">
      This permanently removes the workspace and all associated credentials.
      This cannot be undone.
    </div>
    <div class="lp-card__footer">
      <div style="display: flex; gap: 12px; margin-left: auto">
        <button class="lp-button lp-button--secondary lp-button--md">Cancel</button>
        <button class="lp-button lp-button--danger lp-button--md">Delete</button>
      </div>
    </div>
  </div>
</div>
```

React:

```jsx
import { Card, Button } from '@ramsarjal-404/react';

<Card
  title="Delete workspace"
  footer={
    <div style={{ display: 'flex', gap: 12, marginLeft: 'auto' }}>
      <Button variant="secondary">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </div>
  }
>
  This permanently removes the workspace and all associated credentials.
  This cannot be undone.
</Card>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Card is pure CSS and needs no `lepidus.js`.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `actions` | `ReactNode` | — | Optional actions shown on the right of the title row (e.g. a Button or Badge) |
| `borderless` | `boolean` | `false` | Hide the 1px border (useful when elevated) |
| `children` | `ReactNode` | — | Card body |
| `elevated` | `boolean` | `false` | Raise the card with the shadow-card tokens |
| `footer` | `ReactNode` | — | Optional footer row |
| `title` | `ReactNode` | — | Optional title rendered with the component/card/title-text token |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The card itself is a static surface — no hover, no pointer cursor, no click behavior.
- Interactive children (Buttons, Inputs, Links) keep their own targets and hover states; the
  card never intercepts their events.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves through the card's interactive children in DOM order — the card adds nothing of its own |

The card is not focusable. Order the markup so the visual order matches the tab order: header
actions, then body controls, then footer buttons.

**Screen readers**

- Renders a generic `<div>` with **no implicit role** — it is a visual grouping, not a landmark.
  Add `role="region"` + `aria-labelledby` yourself only when a navigable region is semantically
  required.
- The title is a **styled `<div>`, not a heading element**, so it does not affect the page
  outline. When document structure matters, pass your own `<h2>`/`<h3>` as the `title` (React)
  or put a heading element inside `lp-card__title` (HTML).
- Body and title colors come from the semantic text tokens tuned for contrast on the card
  surface — they pass AA in all three themes.

##### Development considerations

- Don't make the entire card clickable while it contains interactive children — nested
  interactive elements produce broken click targets and confusing screen-reader output. Wrap a
  single action instead.
- Keep one primary action per card footer, placed last (Cancel then Confirm) — the same rule as
  [Button](https://lepide-design-system.vercel.app/components/button/).
- For destructive confirmations inside a card footer, use a `danger` Button with a destructive
  verb in the label; for irreversible operations prefer a [Modal](https://lepide-design-system.vercel.app/components/modal/)
  confirmation.

##### Content

- Card titles label the whole card — short noun phrases ("Connection status", "Delete
  workspace"), sentence case.
- Body text uses the secondary text color; keep it to a few lines and move detail behind
  actions.

#### Hard-fail checks — Card

- [ ] **Only use token names that exist: surfaces are `--color-background-{page|surface|raised|subtle|cards}`, borders `--color-border-{default|strong|brand|danger}`. Never guess a name and add a hex fallback — `var(--color-border-primary, #dce3ed)` is a hardcoded color with extra steps.** _(observed drift: three invented tokens with hex fallbacks rendered off-system colors that do not re-theme in dark or hc.)_
- [ ] Every `lp-card*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="pagination"></a>

### Pagination

Table pagination bar — record count, First/Previous/Next/Last buttons, an editable page input and a rows-per-page selector, fully controlled.

- **Availability:** plain CSS (block `lp-pagination`) + React
- **React:** `import { Pagination } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/pagination/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-pagination--default), [First Page](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-pagination--first-page), [Last Page](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-pagination--last-page), [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-pagination--disabled), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-pagination--all-states), [RTL](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-pagination--rtl)
- **Related:** [table](#table), [dropdown](#dropdown), [steps](#steps)

#### Legal class set (complete — do not invent others)

`lp-pagination` · `lp-pagination__button` · `lp-pagination__label` · `lp-pagination__page-input` · `lp-pagination__page-size` · `lp-pagination__page-size-chevron` · `lp-pagination__page-size-option` · `lp-pagination__page-size-option--selected` · `lp-pagination__page-size-panel` · `lp-pagination__page-size-trigger`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`, `<input>`
- **Roles:** `role="listbox"`, `role="navigation"`, `role="option"`
- **ARIA attributes:** `aria-expanded`, `aria-haspopup`, `aria-hidden`, `aria-label`, `aria-selected`

#### Purpose and usage rules

##### Overview

Pagination is the navigation bar placed under data tables: a "Total Records - N" count,
First/Previous/Next/Last buttons, an editable current-page input ("3 /5") and an "N/Page"
rows-per-page selector. It renders a `role="navigation"` landmark labelled "Pagination" and is
fully controlled — you own `currentPage` / `pageSize` and respond to `onPageChange` /
`onPageSizeChange`. Navigation is clamped to `1…totalPages`, and the boundary buttons disable
themselves automatically.

##### Best practices

- **Reset to page 1 when the page size changes** — `totalPages` shrinks and the old page may no
  longer exist.
- Derive `totalPages` from `totalRecords / pageSize` in one place so the count, "/N" label and
  clamping all stay consistent.
- Keep the bar directly adjacent to the [Table](https://lepide-design-system.vercel.app/components/table/) it controls so the record
  count reads in context.
- Offer only `pageSizeOptions` your API can actually serve (default `[10, 25, 50, 100]`).

##### When not to use

- **Step-by-step wizards** — use [Steps](https://lepide-design-system.vercel.app/components/steps/); pagination implies interchangeable
  pages of the same data, not a sequence with dependencies.
- **Infinite-scroll feeds** where no page model exists — a pagination bar promising "page 3 of
  120" must be honest.
- **Tiny datasets** that fit on one page — render the table without a bar rather than a bar
  where everything is disabled.

##### Types

**Middle page**

All four nav buttons enabled; the page input commits on Enter or blur.

▶ Live: [Interactive bar on a middle page](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-pagination--default)

**First page**

First and Previous auto-disable on page 1 while Next and Last remain active (the Figma "right
enabled" state).

▶ Live: [First page — left buttons disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-pagination--first-page)

**Last page**

Next and Last auto-disable on the final page while First and Previous remain active (the Figma
"left enabled" state).

▶ Live: [Last page — right buttons disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-pagination--last-page)

**Disabled**

The `disabled` prop grays every control — buttons, page input and page-size selector — regardless
of page position, e.g. while the table is loading.

▶ Live: [Whole-control disabled state](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-pagination--disabled)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Record count | "Total Records - N" plain text label |
| 2 | Nav buttons | First, Previous, Next, Last — brand-filled 16px-radius pills |
| 3 | Page input | Bordered numeric field showing the current page, `aria-label="Current page"` |
| 4 | Total label | "/N" text after the input |
| 5 | Page-size selector | "N/Page" trigger with chevron, opening a listbox popover of `pageSizeOptions` |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Navigation | Buttons call `onPageChange` with the target page, clamped to `1…totalPages`; no event fires if the page wouldn't change |
| Auto-disable | First/Previous disable on page 1; Next/Last disable on the last page — never disable them yourself |
| Page input | Accepts digits only; the draft commits (clamped) on Enter or blur, and re-syncs when `currentPage` changes externally |
| Page-size popover | Trigger toggles a listbox; picking an option fires `onPageSizeChange` and closes it; closes on outside click and Escape |
| Disabled | The `disabled` prop grays all controls via the native attribute |
| RTL | Segments flow right-to-left under `dir="rtl"`; the popover hangs off the trigger's inline-end edge |

- ✓ **Do** — Reset currentPage to 1 from onPageSizeChange — the old page may not exist at the new size.
- ✕ **Don't** — Disable individual nav buttons yourself; boundary disabling is automatic from currentPage and totalPages.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical form.
The React rendition (`@ramsarjal-404/react`) is fully controlled and adds the clamped page input and the
page-size popover behavior.

> **Bring your own navigation logic** — `lepidus.js` has no pagination behavior — the bar is pure CSS. Wire the button clicks, page-input commit and disabled states to your own data layer. The `lp-pagination__page-size-*` classes style a popover for the rows-per-page selector if you build one; otherwise render the current size as a plain label as below.

##### Basic bar

A middle page — all four nav buttons enabled. Disable First/Previous on page 1 and Next/Last on
the final page with the native `disabled` attribute.

**Example — Middle page**

Plain HTML (canonical):

```html
<div class="lp-pagination" role="navigation" aria-label="Pagination">
  <span class="lp-pagination__label">Total Records - 248</span>
  <button class="lp-pagination__button">First</button>
  <button class="lp-pagination__button">Previous</button>
  <input class="lp-pagination__page-input" type="number" value="3" aria-label="Current page" />
  <span class="lp-pagination__label">/25</span>
  <button class="lp-pagination__button">Next</button>
  <button class="lp-pagination__button">Last</button>
  <span class="lp-pagination__label">10/Page</span>
</div>
```

React:

```jsx
import { useState } from 'react';
import { Pagination } from '@ramsarjal-404/react';

function TablePagination() {
  const [page, setPage] = useState(3);
  const [pageSize, setPageSize] = useState(10);
  const totalRecords = 248;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  return (
    <Pagination
      totalRecords={totalRecords}
      currentPage={page}
      totalPages={totalPages}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={(size) => {
        setPageSize(size);
        setPage(1);
      }}
    />
  );
}
```

##### Disabled

Gray the whole bar while the table is loading: `disabled` on every button and the input (React:
the `disabled` prop).

**Example — Whole bar disabled**

Plain HTML (canonical):

```html
<div class="lp-pagination" role="navigation" aria-label="Pagination">
  <span class="lp-pagination__label">Total Records - 248</span>
  <button class="lp-pagination__button" disabled>First</button>
  <button class="lp-pagination__button" disabled>Previous</button>
  <input class="lp-pagination__page-input" type="number" value="1" aria-label="Current page" disabled />
  <span class="lp-pagination__label">/25</span>
  <button class="lp-pagination__button" disabled>Next</button>
  <button class="lp-pagination__button" disabled>Last</button>
  <span class="lp-pagination__label">10/Page</span>
</div>
```

React:

```jsx
import { Pagination } from '@ramsarjal-404/react';

<Pagination
  totalRecords={248}
  currentPage={1}
  totalPages={25}
  pageSize={10}
  disabled
/>
```

##### Custom page sizes

`pageSizeOptions` controls what the popover offers; reset to page 1 whenever the size changes.

**Example — Controlled with custom page sizes**

Plain HTML (canonical):

```html
<div class="lp-pagination" role="navigation" aria-label="Pagination">
  <span class="lp-pagination__label">Total Records - 248</span>
  <button class="lp-pagination__button">First</button>
  <button class="lp-pagination__button">Previous</button>
  <input class="lp-pagination__page-input" type="number" value="2" aria-label="Current page" />
  <span class="lp-pagination__label">/5</span>
  <button class="lp-pagination__button">Next</button>
  <button class="lp-pagination__button">Last</button>
  <span class="lp-pagination__page-size">
    <button class="lp-pagination__page-size-trigger" aria-label="Rows per page" aria-haspopup="listbox" aria-expanded="false">
      50/Page
      <svg class="lp-pagination__page-size-chevron" viewBox="0 0 14 7" fill="none" aria-hidden="true"><path d="M1 1 7 6 13 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <!-- toggle hidden + aria-expanded from your own script -->
    <span class="lp-pagination__page-size-panel" role="listbox" aria-label="Rows per page" hidden>
      <button class="lp-pagination__page-size-option" role="option" aria-selected="false">25/Page</button>
      <button class="lp-pagination__page-size-option lp-pagination__page-size-option--selected" role="option" aria-selected="true">50/Page</button>
      <button class="lp-pagination__page-size-option" role="option" aria-selected="false">100/Page</button>
    </span>
  </span>
</div>
```

React:

```jsx
import { useState } from 'react';
import { Pagination } from '@ramsarjal-404/react';

function ScanResultsPagination() {
  const [page, setPage] = useState(2);
  const [pageSize, setPageSize] = useState(50);
  const totalRecords = 248;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  return (
    <Pagination
      totalRecords={totalRecords}
      currentPage={page}
      totalPages={totalPages}
      pageSize={pageSize}
      pageSizeOptions={[25, 50, 100]}
      onPageChange={setPage}
      onPageSizeChange={(size) => {
        setPageSize(size);
        setPage(1);
      }}
    />
  );
}
```

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `currentPage` * | `number` | — | Current page, 1-based |
| `disabled` | `boolean` | `false` | Disable the whole control |
| `onPageChange` | `((page: number) => void)` | — | Fired when the user navigates (First / Previous / Next / Last / page input) |
| `onPageSizeChange` | `((pageSize: number) => void)` | — | Fired when the user picks a new page size |
| `pageSize` * | `number` | — | Rows shown per page (drives the "N/Page" selector) |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Options offered in the page-size selector |
| `totalPages` * | `number` | — | Total number of pages |
| `totalRecords` * | `number` | — | Total number of records in the dataset (shown as "Total Records - N") |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Each nav button is a separate pill-shaped click target; disabled boundary buttons
  (First/Previous on page 1, Next/Last on the last page) ignore clicks via the native attribute.
- Clicking the "N/Page" trigger toggles the page-size popover; clicking outside it closes the
  popover without changing the selection.
- The page input is a normal text field — click to place the caret and type a page number.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves through the enabled controls in order: First, Previous, page input, Next, Last, page-size trigger |
| `Enter` (in page input) | Commits the typed page, clamped to `1…totalPages` |
| `Enter` / `Space` (on buttons) | Activates the button (native behavior) |
| `Escape` | Closes the page-size popover |

The page input also commits on blur, so tabbing away never loses a typed page. Disabled controls
use the native `disabled` attribute and are removed from the tab order. All controls show a
brand-tinted `:focus-visible` outline.

**Screen readers**

- The root is `role="navigation"` with `aria-label="Pagination"` — a discoverable landmark. When
  several pagination bars share a page, give each a unique label (e.g.
  `aria-label="Pagination (alerts table)"`).
- The page input has `aria-label="Current page"` and `inputMode="numeric"`, raising the numeric
  keyboard on touch devices.
- The page-size trigger exposes `aria-label="Rows per page"`, `aria-haspopup="listbox"` and
  `aria-expanded`; the popover is `role="listbox"` with `role="option"` + `aria-selected` items.
- Button names are real text ("First", "Previous", "Next", "Last") — no icon-only controls.

##### Development considerations

- The component is fully controlled — update `currentPage` from `onPageChange` or the bar will
  appear frozen to every user.
- Reset to page 1 in `onPageSizeChange`; a stale `currentPage` beyond the new `totalPages` gets
  clamped on the next interaction but reads wrong until then.
- In plain HTML, keep the native `disabled` attribute as the only disabling mechanism, and keep
  the `role="navigation"` + `aria-label` wrapper from the snippet.
- Announce table refreshes separately (e.g. a `role="status"` region with "Page 3 of 5 loaded")
  if the page change isn't otherwise perceivable to screen-reader users.

##### Content

- Keep the canonical labels — "Total Records - N", "First/Previous/Next/Last", "N/Page" — so the
  bar reads identically across Lepide products.
- The record count is plain text, not a control; don't make it a link.

#### Hard-fail checks — Pagination

- [ ] Every `lp-pagination*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>`, `<input>` — no `div` stand-ins.
- [ ] Roles present where the anatomy has them: `role="listbox"`, `role="navigation"`, `role="option"`.
- [ ] ARIA state kept and updated: `aria-expanded`, `aria-haspopup`, `aria-hidden`, `aria-label`, `aria-selected`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="progress"></a>

### Progress

Labeled progress bar for long-running tasks — pending, in-progress and completed states with a percentage readout, auto-flipping to green at 100%.

- **Availability:** plain CSS (block `lp-progress`) + React
- **React:** `import { Progress } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/progress/ · **Storybook:** [In Progress](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-progress--in-progress), [Completed](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-progress--completed), [Pending](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-progress--pending), [Animated](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-progress--animated), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-progress--all-states)
- **Related:** [spinner](#spinner), [skeleton](#skeleton), [toast](#toast), [steps](#steps)

#### Legal class set (complete — do not invent others)

`lp-progress` · `lp-progress--completed` · `lp-progress--full-width` · `lp-progress--pending` · `lp-progress__clock` · `lp-progress__fill` · `lp-progress__label` · `lp-progress__row` · `lp-progress__track` · `lp-progress__value`

#### Hooks and semantics the canonical markup relies on

- **Roles:** `role="progressbar"`
- **ARIA attributes:** `aria-hidden`, `aria-label`, `aria-valuemax`, `aria-valuemin`, `aria-valuenow`, `aria-valuetext`

#### Purpose and usage rules

##### Overview

Progress reports the completion of a long-running task — restores, scans, imports — as a status
label above a 9px rounded track with a percentage readout. It covers the full task lifecycle in
one component: queued (`pending`), running (`in-progress`) and finished (`completed`), and by
default (`status="auto"`) flips to the green completed treatment the moment `value` reaches 100.
The track renders `role="progressbar"` with real `aria-valuenow` / `aria-valuetext` semantics.

##### Best practices

- Update `value` from **real task telemetry** and leave `status="auto"` so completion flips by
  itself.
- Keep labels short and stateful: "Restore in Progress", "Scan complete", "Queued".
- Keep the percentage readout visible — the number is the primary progress signal; only set
  `showValue={false}` when space is truly critical.
- Use `pending` for queued tasks that have not started; the clock icon replaces the percentage.

##### When not to use

- **Indeterminate "busy" feedback** with no measurable completion — use
  [Spinner](https://lepide-design-system.vercel.app/components/spinner/); Progress always renders a quantified bar.
- **Page or layout loading** — use [Skeleton](https://lepide-design-system.vercel.app/components/skeleton/) placeholders.
- **Announcing that a task finished** — pair the bar with [Toast](https://lepide-design-system.vercel.app/components/toast/) for the
  completion event; don't leave a 100% bar as the only notification.

##### Types

**In progress**

Cyan label and fill sized by `value`, with the percentage readout.

▶ Live: [In progress — 75%](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-progress--in-progress)

**Completed**

Green label, full green bar and "100%". Forced with `status="completed"`, or derived
automatically when `value` reaches 100 under `status="auto"`.

▶ Live: [Completed](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-progress--completed)

**Pending**

For queued tasks — gray label, full disabled-gray bar, and a clock icon instead of the
percentage. `value` is ignored.

▶ Live: [Pending — clock replaces the readout](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-progress--pending)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Label | 12px semibold status line above the bar, tinted by state |
| 2 | Track | 9px tall, 12px-radius gray rail (`role="progressbar"`) |
| 3 | Fill | Rounded bar sized by `value` (30px minimum so tiny values stay visible), animated on change |
| 4 | Readout | 12px percentage right of the bar; an 18px clock icon replaces it when pending |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Auto status | `status="auto"` (default) shows in-progress below 100 and flips to completed at `value >= 100` |
| Clamping | `value` is clamped to 0–100; `NaN` becomes 0 |
| Pending | Renders a full gray bar and the clock; `aria-valuenow` is omitted and `aria-valuetext` reads "Pending" |
| Width | Fixed 274px by default (from Figma); `fullWidth` / `lp-progress--full-width` stretches to the container |
| Motion | The fill width animates on change; the percentage is the source of truth for assistive tech |
| Theming | All state colors re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Drive value from real task telemetry and let status=auto flip to completed at 100%.
- ✕ **Don't** — Use pending for failures — surface errors with Message or Toast, not a gray bar.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical form.
The React rendition (`@ramsarjal-404/react`) adds value clamping, the auto status flip and the ARIA
wiring for you. Progress is pure CSS — no `lepidus.js` needed; in plain HTML you update the fill
width and `aria-valuenow` from your own task code.

##### Basic bar

The fill width is inline (`style="width:62%"`) and must match `aria-valuenow`.

**Example — In progress**

Plain HTML (canonical):

```html
<div class="lp-progress">
  <span class="lp-progress__label">Scanning LDSP-FS-01</span>
  <div class="lp-progress__row">
    <div class="lp-progress__track" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" aria-label="Scanning LDSP-FS-01">
      <div class="lp-progress__fill" style="width:62%"></div>
    </div>
    <span class="lp-progress__value">62%</span>
  </div>
</div>
```

React:

```jsx
import { Progress } from '@ramsarjal-404/react';

<Progress label="Scanning LDSP-FS-01" value={62} />
```

##### All three states

`lp-progress--completed` and `lp-progress--pending` retint the label and fill; pending swaps the
percentage readout for the clock icon and renders a full-width gray bar.

**Example — In progress, completed, pending**

Plain HTML (canonical):

```html
<div style="display:flex; flex-direction:column; gap:16px">
  <div class="lp-progress">
    <span class="lp-progress__label">Scanning LDSP-FS-01</span>
    <div class="lp-progress__row">
      <div class="lp-progress__track" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" aria-label="Scanning LDSP-FS-01">
        <div class="lp-progress__fill" style="width:62%"></div>
      </div>
      <span class="lp-progress__value">62%</span>
    </div>
  </div>

  <div class="lp-progress lp-progress--completed">
    <span class="lp-progress__label">Scan complete</span>
    <div class="lp-progress__row">
      <div class="lp-progress__track" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" aria-label="Scan complete">
        <div class="lp-progress__fill" style="width:100%"></div>
      </div>
      <span class="lp-progress__value">100%</span>
    </div>
  </div>

  <div class="lp-progress lp-progress--pending">
    <span class="lp-progress__label">Queued</span>
    <div class="lp-progress__row">
      <div class="lp-progress__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuetext="Pending" aria-label="Queued">
        <div class="lp-progress__fill" style="width:100%"></div>
      </div>
      <span class="lp-progress__clock"><svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="9" cy="9" r="7.5"/><path d="M9 5v4l3 2" stroke-linecap="round"/></svg></span>
    </div>
  </div>
</div>
```

React:

```jsx
import { Progress } from '@ramsarjal-404/react';

<>
  <Progress label="Scanning LDSP-FS-01" value={62} />
  <Progress label="Scan complete" value={100} />
  <Progress label="Queued" status="pending" />
</>
```

##### Full width

The bar is a fixed 274px by default (from Figma). Add `lp-progress--full-width` (React:
`fullWidth`) to stretch it to the container — table cells, cards, modals.

**Example — Stretched to a constrained container**

Plain HTML (canonical):

```html
<div style="max-width: 420px">
  <div class="lp-progress lp-progress--full-width">
    <span class="lp-progress__label">Restore in Progress</span>
    <div class="lp-progress__row">
      <div class="lp-progress__track" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" aria-label="Restore in Progress">
        <div class="lp-progress__fill" style="width:45%"></div>
      </div>
      <span class="lp-progress__value">45%</span>
    </div>
  </div>
</div>
```

React:

```jsx
import { Progress } from '@ramsarjal-404/react';

<div style={{ maxWidth: 420 }}>
  <Progress label="Restore in Progress" value={45} fullWidth />
</div>
```

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `fullWidth` | `boolean` | `false` | Stretch to fill the container width (default fixed 274px from Figma) |
| `label` * | `ReactNode` | — | Status label above the bar (e.g. "Restore in Progress") |
| `showValue` | `boolean` | `true` | Show the percentage readout next to the bar (clock icon replaces it when pending) |
| `status` | `enum` | `auto` | Visual status — defaults to `auto` (derived from value) |
| `value` | `number` | `0` | Completion 0–100. Ignored for `pending` (full track) and `completed` (100). |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

Progress is a read-only indicator — it has no click, hover or drag behavior. The pending clock
icon carries `title="Pending"` as a courtesy tooltip.

**Keyboard**

The component is not focusable and adds nothing to the tab order; there is nothing to operate.
Keep it that way — wrapping the bar in a button or link confuses the progressbar semantics.

**Screen readers**

- The track renders `role="progressbar"` with `aria-valuemin={0}`, `aria-valuemax={100}` and
  `aria-valuenow` set to the current value.
- `aria-valuetext` provides the human-readable form — "75%", or "Pending" for the queued state,
  where `aria-valuenow` is omitted so the bar reads as indeterminate.
- The visible label is associated via `aria-labelledby` in React; in plain HTML give the track an
  `aria-label` matching the visible label text (as in the snippets).
- State is conveyed by text — the label copy plus the percentage or clock — never by color alone.

##### Development considerations

- Keep the inline fill width and `aria-valuenow` in sync when driving the plain-HTML bar from
  script; the React component does this for you.
- For task progress that updates live, consider wrapping the region in `aria-live="polite"` with
  throttled announcements (e.g. every 25%) — announcing every percent is noise.
- Don't repurpose `pending` for error states; an all-gray bar reads as "queued" to every user.
  Surface failures with [Message](https://lepide-design-system.vercel.app/components/message/) or [Toast](https://lepide-design-system.vercel.app/components/toast/).
- When several bars stack in one region (multi-server scan), each label must be unique so the
  progressbars are distinguishable in the accessibility tree.

##### Content

- Labels are short status lines that pair with the readout: "Restore in Progress" + "75%",
  "Queued" + clock.
- Update the label text when the state changes ("Scan complete"), not just the colors — the copy
  is the accessible state signal.

#### Hard-fail checks — Progress

- [ ] Every `lp-progress*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Roles present where the anatomy has them: `role="progressbar"`.
- [ ] ARIA state kept and updated: `aria-hidden`, `aria-label`, `aria-valuemax`, `aria-valuemin`, `aria-valuenow`, `aria-valuetext`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="scrollbar"></a>

### Scrollbar

Presentational scrollbar track and thumb — a fully-rounded pill whose thumb size, position and state are driven by props; the host owns the scroll math.

- **Availability:** plain CSS (block `lp-scrollbar`) + React
- **React:** `import { Scrollbar } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/scrollbar/ · **Storybook:** [Active](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-scrollbar--active), [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-scrollbar--default), [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-scrollbar--disabled), [Horizontal](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-scrollbar--horizontal), [All Variants](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-scrollbar--all-variants)
- **Related:** [table](#table), [pagination](#pagination), [sidebar](#sidebar)

#### Legal class set (complete — do not invent others)

`lp-scrollbar` · `lp-scrollbar--active` · `lp-scrollbar--default` · `lp-scrollbar--disabled` · `lp-scrollbar--horizontal` · `lp-scrollbar--vertical` · `lp-scrollbar__thumb`

#### Hooks and semantics the canonical markup relies on

- **Roles:** `role="scrollbar"`
- **ARIA attributes:** `aria-disabled`, `aria-orientation`, `aria-valuemax`, `aria-valuemin`, `aria-valuenow`

#### Purpose and usage rules

##### Overview

Scrollbar renders the Lepidus scrollbar visuals: a 10px fully-rounded pill track holding a
state-colored thumb whose length (`thumbSize`, %) and position (`thumbOffset`, %) are driven by
props. Use it to skin custom scroll containers, virtualized lists or progress-along-content
indicators so they match the design language.

It is **purely presentational** — it does not listen to wheel or drag events and scrolls nothing
itself; the host component owns the scroll math and feeds the geometry props. It exposes
`role="scrollbar"` with `aria-orientation` and `aria-valuenow` so the visuals stay honest to
assistive technology.

##### Best practices

- Keep the thumb proportional: `thumbSize` ≈ (viewport ÷ content) × 100, clamped to a usable
  minimum.
- Pair `variant="active"` with the actual drag/scroll interaction state in your container;
  rest on `default` otherwise.
- Forward real scroll position into `thumbOffset` on every scroll frame — a stale thumb is worse
  than no thumb.
- Size the track with `length` (px number or any CSS length) to match the scrollport.

##### When not to use

- **Native overflow scrolling** where custom visuals aren't required — just use the browser
  scrollbar; it is free, accessible and platform-correct.
- **Quantified task progress** — use [Progress](https://lepide-design-system.vercel.app/components/progress/); a scrollbar communicates
  position, not completion.
- **Paged datasets** — use [Pagination](https://lepide-design-system.vercel.app/components/pagination/) under a
  [Table](https://lepide-design-system.vercel.app/components/table/) instead of simulating an endless scroll.

##### Variants

**Active**

The Figma default property — engaged/dragging thumb in `--color-button-secondary-bg`
(brand blue-200) at the ~26% Figma ratio.

▶ Live: [Active thumb (default variant)](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-scrollbar--active)

**Default**

Neutral resting state — the thumb uses `--component-scrollbar-thumb` gray.

▶ Live: [Default (resting) thumb](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-scrollbar--default)

**Disabled**

Non-interactive state — `--color-button-disabled-bg` thumb plus `aria-disabled` on the root.

▶ Live: [Disabled thumb](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-scrollbar--disabled)

**Horizontal**

Identical tokens with the axis flipped and `aria-orientation="horizontal"`.

▶ Live: [Horizontal orientation](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-scrollbar--horizontal)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Track | Fully-rounded pill (`--radius-xxl`), 10px thick (`--space-5`), subtle background tint; length set by `length` (default 451px) |
| 2 | Thumb | Fully-rounded bar riding the track; color from `variant`, length from `thumbSize` (%), position from `thumbOffset` (%) |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Geometry | `thumbSize`, `thumbOffset` and `length` are forwarded as CSS custom properties (`--thumb-size`, `--thumb-offset`, `--track-length`) |
| Variants | `default` (resting gray), `active` *(default)* (brand blue-200), `disabled` (gray + `aria-disabled`) |
| Orientation | `vertical` *(default)* or `horizontal`; sets `aria-orientation` and flips the axis |
| Position semantics | `thumbOffset` is rounded and exposed as `aria-valuenow` (0–100) |
| Interaction | None built in — the host wires pointer/keyboard handling and updates the props |
| Theming | Track and thumb tokens re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Compute thumbSize from viewport ÷ content and update thumbOffset from the real scroll position.
- ✕ **Don't** — Ship it as the only scrolling affordance without wiring keyboard and pointer handling in the host.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) renders the same markup from its geometry
props. Both resolve to the same `component/scrollbar/*` tokens.

Scrollbar is presentational: the track is `lp-scrollbar` + an orientation modifier
(`--vertical` | `--horizontal`) + a state modifier (`--default` | `--active` | `--disabled`),
holding one `lp-scrollbar__thumb`. Geometry comes from three custom properties your scroll
handler updates — `--track-length` (any CSS length), `--thumb-size` and `--thumb-offset` (both
percentages). React maps `length`, `thumbSize`, `thumbOffset` to the same variables.

##### Basic vertical scrollbar

**Example — Active vertical scrollbar**

Plain HTML (canonical):

```html
<!-- Geometry comes from three custom properties your scroll handler updates:
     --track-length (any CSS length), --thumb-size and --thumb-offset (percent). -->
<div class="lp-scrollbar lp-scrollbar--vertical lp-scrollbar--active"
     role="scrollbar" aria-orientation="vertical"
     aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
     style="--track-length: 300px; --thumb-size: 26%; --thumb-offset: 0%">
  <div class="lp-scrollbar__thumb"></div>
</div>
```

React:

```jsx
import { Scrollbar } from '@ramsarjal-404/react';

<Scrollbar variant="active" length={300} thumbSize={26} thumbOffset={0} />
```

##### Horizontal

`--horizontal` flips the axis: `--thumb-size` becomes the width and `--thumb-offset` measures
from the left edge.

**Example — Horizontal orientation**

Plain HTML (canonical):

```html
<div class="lp-scrollbar lp-scrollbar--horizontal lp-scrollbar--active"
     role="scrollbar" aria-orientation="horizontal"
     aria-valuemin="0" aria-valuemax="100" aria-valuenow="10"
     style="--track-length: 360px; --thumb-size: 30%; --thumb-offset: 10%">
  <div class="lp-scrollbar__thumb"></div>
</div>
```

React:

```jsx
import { Scrollbar } from '@ramsarjal-404/react';

<Scrollbar
  orientation="horizontal"
  variant="active"
  length={360}
  thumbSize={30}
  thumbOffset={10}
/>
```

##### All variants

The three thumb states — add `aria-disabled="true"` alongside `--disabled`.

**Example — Default, active, disabled**

Plain HTML (canonical):

```html
<div style="display: flex; gap: 56px; align-items: flex-start">
  <div class="lp-scrollbar lp-scrollbar--vertical lp-scrollbar--default"
       role="scrollbar" aria-orientation="vertical"
       aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"
       style="--track-length: 300px; --thumb-offset: 20%">
    <div class="lp-scrollbar__thumb"></div>
  </div>
  <div class="lp-scrollbar lp-scrollbar--vertical lp-scrollbar--active"
       role="scrollbar" aria-orientation="vertical"
       aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
       style="--track-length: 300px; --thumb-offset: 0%">
    <div class="lp-scrollbar__thumb"></div>
  </div>
  <div class="lp-scrollbar lp-scrollbar--vertical lp-scrollbar--disabled"
       role="scrollbar" aria-orientation="vertical" aria-disabled="true"
       aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"
       style="--track-length: 300px; --thumb-offset: 20%">
    <div class="lp-scrollbar__thumb"></div>
  </div>
</div>
```

React:

```jsx
import { Scrollbar } from '@ramsarjal-404/react';

<div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
  <Scrollbar variant="default" length={300} thumbOffset={20} />
  <Scrollbar variant="active" length={300} thumbOffset={0} />
  <Scrollbar variant="disabled" length={300} thumbOffset={20} />
</div>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Scrollbar is pure CSS and needs no `lepidus.js`; your container supplies the scroll behavior and updates the custom properties plus `aria-valuenow`.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `length` | `string \| number` | `451px` | Track length along its axis (px or any CSS length). Default 451px (Figma). |
| `orientation` | `enum` | `vertical` | Track direction — defaults to `vertical`. |
| `thumbOffset` | `number` | `0` | Thumb offset from the track start as a percentage (0–100). Default 0. |
| `thumbSize` | `number` | `26` | Thumb length as a percentage of the track (0–100). Default 26 (≈117/451 from Figma). |
| `variant` | `enum` | `active` | Thumb state — defaults to `active` (the Figma default property). |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

The component renders no pointer behavior of its own — it does not capture wheel, click or drag
events. If your container lets users drag the thumb or click the track, you implement those
handlers in the host and feed the resulting position back into `thumbOffset`.

**Keyboard**

Scrollbar is not focusable and handles no keys. The WAI-ARIA scrollbar pattern expects the host
integration to provide keyboard scrolling on the scrollable region itself:

| Key | Expected host behavior |
| --- | --- |
| `ArrowUp` / `ArrowDown` (vertical) | Scroll the controlled region by a line |
| `ArrowLeft` / `ArrowRight` (horizontal) | Scroll the controlled region by a line |
| `PageUp` / `PageDown` | Scroll by a viewport |
| `Home` / `End` | Scroll to start / end |

After any of these, update `thumbOffset` so the visual matches the new scroll position.

**Screen readers**

- The root renders `role="scrollbar"` with `aria-orientation` matching the `orientation` prop.
- Position is exposed via `aria-valuenow` (rounded `thumbOffset`) with `aria-valuemin={0}` /
  `aria-valuemax={100}`.
- `aria-disabled` is set automatically when `variant="disabled"`.
- The ARIA pattern also requires `aria-controls` referencing the scrolled element — pass it
  through as a prop on the root, since only the host knows the target id.

##### Development considerations

- This component is presentation-only by design: never ship it as the sole scrolling affordance.
  The underlying region must remain scrollable by native means (keyboard, wheel, touch).
- Keep `thumbSize` honest — viewport ÷ content × 100 — so the thumb communicates how much
  content exists; a decorative fixed-size thumb misleads users.
- Don't restyle the thumb with ad-hoc colors; the three variants (`default`, `active`,
  `disabled`) cover the sanctioned states and re-theme automatically.
- If the custom scrollbar is purely decorative duplication of a native scrollbar, consider
  hiding it from assistive tech instead (`aria-hidden`) to avoid announcing two scrollbars.

#### Hard-fail checks — Scrollbar

- [ ] Every `lp-scrollbar*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Roles present where the anatomy has them: `role="scrollbar"`.
- [ ] ARIA state kept and updated: `aria-disabled`, `aria-orientation`, `aria-valuemax`, `aria-valuemin`, `aria-valuenow`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="table"></a>

### Table

Data table with sortable headers, a per-column search row, and checkbox row selection — client-side by default, controllable for server-driven data.

- **Availability:** plain CSS (block `lp-table`) + React
- **React:** `import { Table } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/table/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-table--default), [Plain Table](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-table--plain-table), [Controlled Selection](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-table--controlled-selection), [Custom Cells](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-table--custom-cells), [Empty](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-table--empty), [RTL](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-table--rtl)
- **Related:** [pagination](#pagination), [checkbox](#checkbox), [badge](#badge)

#### Legal class set (complete — do not invent others)

`lp-table` · `lp-table__cell-inner` · `lp-table__cell-text` · `lp-table__checkbox` · `lp-table__empty-cell` · `lp-table__filter-cell` · `lp-table__filter-field` · `lp-table__filter-input` · `lp-table__header-inner` · `lp-table__header-label` · `lp-table__row--selected` · `lp-table__search-icon` · `lp-table__sort-arrow` · `lp-table__sort-arrow--active` · `lp-table__sort-arrow--desc` · `lp-table__sort-button` · `lp-table__table` · `lp-table__td` · `lp-table__th`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`, `<input>`, `<table>`
- **ARIA attributes:** `aria-hidden`, `aria-label`, `aria-sort`

#### Purpose and usage rules

##### Overview

Table renders tabular data with the three header behaviors from the design built in: **sorting**
(every column header is a button with an arrow indicator), **per-column search** (the magnifier
row under the header), and **row selection** (brand-bordered checkboxes inside the first column,
with a select-all checkbox in the header). All three work client-side out of the box on the data
you pass; `sort`, `filters`, and `selectedKeys` can each be controlled instead for server-driven
tables.

Cells render the row's value by default; use a custom `render` for content like Badges and
Buttons, and keep `value` alongside it so the column stays sortable and filterable. For paging,
compose with [Pagination](https://lepide-design-system.vercel.app/components/pagination/).

##### Best practices

- Provide a stable `rowKey` whenever rows can **reorder or page** — index identity breaks
  selection.
- Pass `value` next to `render` so custom-cell columns **keep sorting and filtering**.
- Use [Badge](https://lepide-design-system.vercel.app/components/badge/) in status columns — variant by meaning, label stating the
  status.
- Switch `sortable: false` / `filterable: false` per column for action columns that have no
  meaningful order.
- Compose with [Pagination](https://lepide-design-system.vercel.app/components/pagination/) for long datasets.

##### When not to use

- **Large server-paged datasets with client-side sort/filter** — control `sort`/`filters` and
  feed them to your query layer instead; sorting only the visible page misleads users.
- **Hierarchical data** — use [FolderTree](https://lepide-design-system.vercel.app/components/folder-tree/) for parent/child
  structures.
- **No data at all** — render an [EmptyState](https://lepide-design-system.vercel.app/components/empty-state/) for first-run screens;
  the table's built-in empty message is for "no rows survived filtering".

##### Variants

**Default**

The full-featured table: checkbox selection in the first column, the per-column search row, and
an actively sorted column (blue arrow). Type in a search field or click a header to see
filtering and sorting work.

▶ Live: [Selection, search row, and active sort](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-table--default)

**Plain**

Headers stay sortable; selection and the search row are opt-in. Columns flex evenly without
explicit widths.

▶ Live: [No selection, no filter row](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-table--plain-table)

**Controlled selection**

Selection driven from outside via `selectedKeys` + `onSelectionChange`. The header checkbox
shows the indeterminate dash while only some rows are selected.

▶ Live: [Controlled selection with external state](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-table--controlled-selection)

**Custom cells**

Compose other components into cells with `render` — a Badge for status and a secondary Button
action column with sorting/filtering switched off.

▶ Live: [Badges and Buttons inside cells](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-table--custom-cells)

**Empty**

With no surviving rows the body collapses to a single full-width message cell
(`emptyMessage`, default "No matching records").

▶ Live: [Empty message cell](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-table--empty)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Wrapper | `lp-table` div around a semantic `<table>` (`lp-table__table`) |
| 2 | Header row | 43px strip on the header background with 15px rounded top corners; bold 14px labels |
| 3 | Sort button | Real `<button>` wrapping the label, with a 9×14 arrow — brand blue when active, gray otherwise, flipped for descending |
| 4 | Filter row | One search field per column: borderless input + magnifier icon, filtering as you type |
| 5 | Checkbox *(optional)* | 16px, 3px radius, brand border; solid brand fill with a white check/dash when checked/indeterminate |
| 6 | Data rows | 43px, regular 14px text, hover tint; empty values render as "-" |
| 7 | Empty cell | Single full-width cell shown when no rows survive filtering |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Sorting | Clicking a header toggles asc/desc; the sorted column exposes `aria-sort` and the blue arrow |
| Filtering | Each search field filters its column as you type (case-insensitive substring) |
| Selection | Row checkboxes plus a select-all in the header; partial selection shows the indeterminate dash |
| Row hover | Rows tint on hover; selected rows hold the same tint via `lp-table__row--selected` |
| Controlled modes | `sort`, `filters`, and `selectedKeys` can each be controlled for server-driven tables |
| Empty state | No surviving rows collapse the body to the `emptyMessage` cell |
| RTL | Under `dir="rtl"` columns, corners, sort arrows, and the search row mirror automatically |

- ✓ **Do** — Provide rowKey and keep value alongside render so selection, sorting, and filtering stay correct.
- ✕ **Don't** — Put a second interactive element inside the first column's cells — the selection checkbox owns it.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the
same tokens, so they are pixel-identical in every theme. One important difference: the `lp-`
classes are **styling only** — sorting, filtering, and selection logic in plain HTML is yours to
wire, while the React component ships all three working client-side.

##### Basic

Wrapper `lp-table` around a semantic `<table class="lp-table__table">`. Headers are
`lp-table__th` with `scope="col"`; cells nest `lp-table__cell-inner` → `lp-table__cell-text`.

**Example — Plain table**

Plain HTML (canonical):

```html
<div class="lp-table">
  <table class="lp-table__table">
    <caption style="position: absolute; clip: rect(0 0 0 0)">Monitored servers</caption>
    <thead>
      <tr>
        <th class="lp-table__th" scope="col">
          <div class="lp-table__header-inner"><span class="lp-table__header-label">Server</span></div>
        </th>
        <th class="lp-table__th" scope="col">
          <div class="lp-table__header-inner"><span class="lp-table__header-label">IP Address</span></div>
        </th>
        <th class="lp-table__th" scope="col">
          <div class="lp-table__header-inner"><span class="lp-table__header-label">Last scan</span></div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">LDSP-FS-01</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">192.168.30.180</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">2 hours ago</span></div></td>
      </tr>
      <tr>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">LDSP-FS-02</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">192.168.30.92</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">5 hours ago</span></div></td>
      </tr>
      <tr>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">LDSP-FS-03</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">192.168.30.41</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">2 days ago</span></div></td>
      </tr>
    </tbody>
  </table>
</div>
```

React:

```jsx
import { Table } from '@ramsarjal-404/react';

const columns = [
  { key: 'name', header: 'Server' },
  { key: 'ip', header: 'IP Address' },
  { key: 'lastScan', header: 'Last scan' },
];

const data = [
  { id: 'fs1', name: 'LDSP-FS-01', ip: '192.168.30.180', lastScan: '2 hours ago' },
  { id: 'fs2', name: 'LDSP-FS-02', ip: '192.168.30.92', lastScan: '5 hours ago' },
  { id: 'fs3', name: 'LDSP-FS-03', ip: '192.168.30.41', lastScan: '2 days ago' },
];

<Table columns={columns} data={data} rowKey={(row) => row.id} filterRow={false} />
```

##### Sortable headers and the search row

Sortable headers wrap the label in an `lp-table__sort-button` with an `lp-table__sort-arrow`
(add `--active` on the sorted column and `--desc` for descending, and set `aria-sort` on the
`th`). The filter row lives in the `thead`: `lp-table__filter-cell` → `lp-table__filter-field` →
`lp-table__filter-input` plus the `lp-table__search-icon`.

**Example — Sort buttons + filter row**

Plain HTML (canonical):

```html
<!-- the classes style the table; sort/filter logic is your script's job -->
<div class="lp-table">
  <table class="lp-table__table">
    <thead>
      <tr>
        <th class="lp-table__th" scope="col" aria-sort="ascending">
          <div class="lp-table__header-inner">
            <button type="button" class="lp-table__sort-button">
              <span class="lp-table__header-label">Server</span>
              <span class="lp-table__sort-arrow lp-table__sort-arrow--active">
                <svg viewBox="0 0 10 15" fill="none" stroke="currentColor" stroke-width="1.3"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 1.5v12M1 5.5l4-4 4 4" />
                </svg>
              </span>
            </button>
          </div>
        </th>
        <th class="lp-table__th" scope="col">
          <div class="lp-table__header-inner">
            <button type="button" class="lp-table__sort-button">
              <span class="lp-table__header-label">IP Address</span>
              <span class="lp-table__sort-arrow">
                <svg viewBox="0 0 10 15" fill="none" stroke="currentColor" stroke-width="1.3"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 1.5v12M1 5.5l4-4 4 4" />
                </svg>
              </span>
            </button>
          </div>
        </th>
      </tr>
      <tr>
        <td class="lp-table__filter-cell">
          <div class="lp-table__filter-field">
            <input type="text" class="lp-table__filter-input" aria-label="Search Server" />
            <span class="lp-table__search-icon">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="6" cy="6" r="5.25" /><path d="M13.25 13.25 9.7 9.7" />
              </svg>
            </span>
          </div>
        </td>
        <td class="lp-table__filter-cell">
          <div class="lp-table__filter-field">
            <input type="text" class="lp-table__filter-input" aria-label="Search IP Address" />
            <span class="lp-table__search-icon">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="6" cy="6" r="5.25" /><path d="M13.25 13.25 9.7 9.7" />
              </svg>
            </span>
          </div>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">LDSP-FS-01</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">192.168.30.180</span></div></td>
      </tr>
      <tr>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">LDSP-FS-02</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">192.168.30.92</span></div></td>
      </tr>
    </tbody>
  </table>
</div>
```

React:

```jsx
import { Table } from '@ramsarjal-404/react';

const columns = [
  { key: 'name', header: 'Server' },
  { key: 'ip', header: 'IP Address' },
];

const data = [
  { id: 'fs1', name: 'LDSP-FS-01', ip: '192.168.30.180' },
  { id: 'fs2', name: 'LDSP-FS-02', ip: '192.168.30.92' },
];

// sorting and the search row work client-side out of the box;
// pass sort/filters + onSortChange/onFiltersChange to control them instead
<Table
  columns={columns}
  data={data}
  rowKey={(row) => row.id}
  defaultSort={{ columnKey: 'name', direction: 'asc' }}
/>
```

##### Row selection

Selection checkboxes are `lp-table__checkbox` inputs inside the first column's cells, with a
select-all in the header. Mark selected rows with `lp-table__row--selected`.

**Example — Checkbox selection**

Plain HTML (canonical):

```html
<div class="lp-table">
  <table class="lp-table__table">
    <thead>
      <tr>
        <th class="lp-table__th" scope="col">
          <div class="lp-table__header-inner">
            <input type="checkbox" class="lp-table__checkbox" aria-label="Select all rows" />
            <span class="lp-table__header-label">Server</span>
          </div>
        </th>
        <th class="lp-table__th" scope="col">
          <div class="lp-table__header-inner"><span class="lp-table__header-label">IP Address</span></div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="lp-table__td">
          <div class="lp-table__cell-inner">
            <input type="checkbox" class="lp-table__checkbox" aria-label="Select row 1" />
            <span class="lp-table__cell-text">LDSP-FS-01</span>
          </div>
        </td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">192.168.30.180</span></div></td>
      </tr>
      <tr class="lp-table__row--selected">
        <td class="lp-table__td">
          <div class="lp-table__cell-inner">
            <input type="checkbox" class="lp-table__checkbox" aria-label="Select row 2" checked />
            <span class="lp-table__cell-text">LDSP-FS-02</span>
          </div>
        </td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">192.168.30.92</span></div></td>
      </tr>
    </tbody>
  </table>
</div>
```

React:

```jsx
import { useState } from 'react';
import { Table } from '@ramsarjal-404/react';

const columns = [
  { key: 'name', header: 'Server' },
  { key: 'ip', header: 'IP Address' },
];

const data = [
  { id: 'fs1', name: 'LDSP-FS-01', ip: '192.168.30.180' },
  { id: 'fs2', name: 'LDSP-FS-02', ip: '192.168.30.92' },
];

function SelectableServers() {
  const [keys, setKeys] = useState(['fs2']);

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => row.id}
      selectable
      selectedKeys={keys}
      onSelectionChange={setKeys}
    />
  );
}
```

##### Custom cells

Any component can live in a cell — here a status [Badge](https://lepide-design-system.vercel.app/components/badge/) and a secondary
Button action column. In React, use the column's `render` and keep `value` alongside it so
sorting and filtering still work.

**Example — Badges and Buttons in cells**

Plain HTML (canonical):

```html
<div class="lp-table">
  <table class="lp-table__table">
    <thead>
      <tr>
        <th class="lp-table__th" scope="col">
          <div class="lp-table__header-inner"><span class="lp-table__header-label">Server</span></div>
        </th>
        <th class="lp-table__th" scope="col">
          <div class="lp-table__header-inner"><span class="lp-table__header-label">Status</span></div>
        </th>
        <th class="lp-table__th" scope="col">
          <div class="lp-table__header-inner"><span class="lp-table__header-label">Actions</span></div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">LDSP-FS-01</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-badge lp-badge--success"><span class="lp-badge__dot"></span>Healthy</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><button class="lp-button lp-button--secondary lp-button--sm">View</button></div></td>
      </tr>
      <tr>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">LDSP-FS-02</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-badge lp-badge--warning"><span class="lp-badge__dot"></span>Degraded</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><button class="lp-button lp-button--secondary lp-button--sm">View</button></div></td>
      </tr>
      <tr>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">LDSP-FS-03</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-badge lp-badge--error"><span class="lp-badge__dot"></span>Offline</span></div></td>
        <td class="lp-table__td"><div class="lp-table__cell-inner"><button class="lp-button lp-button--secondary lp-button--sm">View</button></div></td>
      </tr>
    </tbody>
  </table>
</div>
```

React:

```jsx
import { Table, Badge, Button } from '@ramsarjal-404/react';

const data = [
  { id: 'fs1', name: 'LDSP-FS-01', status: 'Healthy' },
  { id: 'fs2', name: 'LDSP-FS-02', status: 'Degraded' },
  { id: 'fs3', name: 'LDSP-FS-03', status: 'Offline' },
];

const columns = [
  { key: 'name', header: 'Server' },
  {
    key: 'status',
    header: 'Status',
    // keep value implicit (row.status) so sorting/filtering still work
    render: (row) => (
      <Badge variant={row.status === 'Healthy' ? 'success' : 'warning'}>
        {row.status}
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    sortable: false,
    filterable: false,
    render: () => <Button variant="secondary" size="sm">View</Button>,
  },
];

<Table columns={columns} data={data} rowKey={(row) => row.id} />
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Table is pure CSS and needs no `lepidus.js`; sort/filter/selection behavior in plain HTML is wired by your own script (the React component implements it for you).

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` * | `TableColumn`<T>`[]` | — | Column definitions, in display order |
| `data` * | `T[]` | — | Row data. Sorting/filtering happen internally unless `sort`/`filters` are controlled. |
| `defaultSelectedKeys` | `(string \| number)[]` | `[]` | Uncontrolled initial selection |
| `defaultSort` | `TableSort \| null` | — | Uncontrolled initial sort |
| `emptyMessage` | `ReactNode` | `No matching records` | Shown in a single full-width cell when no rows survive filtering |
| `filterRow` | `boolean` | `true` | Show the per-column search row under the header (default true, as in Figma) |
| `filters` | `Record<string, string>` | — | Controlled filter text per column key |
| `onFiltersChange` | `((filters: Record<string, string>) => void)` | — |  |
| `onSelectionChange` | `((keys: (string \| number)[]) => void)` | — |  |
| `onSortChange` | `((sort: TableSort) => void)` | — |  |
| `rowKey` | `((row: T, index: number) => string \| number)` | — | Stable row identity for selection (defaults to the row index) |
| `selectable` | `boolean` | `false` | Render selection checkboxes inside the first column (header checkbox selects all) |
| `selectedKeys` | `(string \| number)[]` | — | Controlled selection |
| `sort` | `TableSort \| null` | — | Controlled sort state (null = unsorted) |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Sorting: the whole header label is a real `<button>` — clicking toggles ascending/descending;
  the arrow flips for descending and turns brand blue when active.
- Filtering: each search field filters its column as you type; the magnifier icon is decorative.
- Selection: 16px checkboxes in the first column; the header checkbox selects/deselects all
  visible rows and shows the indeterminate dash for partial selection.
- Rows tint on hover; hover never moves or resizes content.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves through the interactive parts in column order: sort buttons, filter inputs, checkboxes |
| `Enter` / `Space` | On a sort button: toggles the sort direction (native `<button>` behavior) |
| `Space` | On a checkbox: toggles row / select-all selection (native checkbox behavior) |
| Typing | In a filter input: filters the column as you type |

All interactive parts are native elements — buttons, text inputs, checkboxes — so focus order,
activation, and focus-visible styling come for free.

**Screen readers**

- Semantic `<table>` / `<th scope="col">` markup — cells announce with their column headers.
- The sorted column exposes `aria-sort="ascending"` / `"descending"` on the `th`, so the sort
  state is announced when navigating the header.
- Filter inputs carry per-column `aria-label`s ("Search IP Address"); checkboxes are labelled
  "Select all rows" and "Select row N".
- Selection and sort state are visible beyond color: the check mark / indeterminate dash and the
  arrow direction carry the state, not just the blue tint.
- The React component does not render a `<caption>` — name the table for screen-reader users by
  wrapping it with a labelled region or adding `aria-label` to the table element in plain HTML
  (add a `<caption>` element when hand-writing the markup).

##### Development considerations

- Provide a stable `rowKey` whenever rows can reorder or page — index-based identity silently
  attaches selection to the wrong rows after a sort.
- In plain HTML, keep `aria-sort` in sync with the arrow classes (`--active`, `--desc`) when
  your script re-sorts — the visual and announced state must match.
- Keep the first column's cells to **one interactive element**: the selection checkbox. Put row
  actions in their own column.
- For server-driven tables, control `sort` and `filters` rather than letting the component sort
  a single page client-side — a "sorted" page of unsorted data misleads everyone, including
  screen-reader users.

##### Content

- Column headers are short nouns ("Server", "IP Address", "Last scan") — they are read with
  every cell.
- Empty values render as "-"; provide a meaningful `emptyMessage` ("No servers found") instead
  of the generic default when context allows.

#### Hard-fail checks — Table

- [ ] Every `lp-table*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>`, `<input>`, `<table>` — no `div` stand-ins.
- [ ] ARIA state kept and updated: `aria-hidden`, `aria-label`, `aria-sort`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="tag"></a>

### Tag

Dismissible chip for objects the user put there — applied filters, selected items — with an accessible remove button.

- **Availability:** plain CSS (block `lp-tag`) + React
- **React:** `import { Tag } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/tag/ · **Storybook:** [Error](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-tag--error), [Dismissible](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-tag--dismissible), [Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-tag--disabled), [Filter Bar](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-tag--filter-bar), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-tag--all-states)
- **Related:** [badge](#badge), [filter](#filter), [button](#button)

#### Legal class set (complete — do not invent others)

`lp-tag` · `lp-tag--disabled` · `lp-tag--error` · `lp-tag--neutral` · `lp-tag--success` · `lp-tag--warning` · `lp-tag__label` · `lp-tag__remove`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`
- **ARIA attributes:** `aria-hidden`, `aria-label`

#### Purpose and usage rules

##### Overview

Tag is a bordered pill for objects the **user put there** — applied filters, selected servers,
chosen recipients — optionally dismissible via the "×" button. It is the interactive counterpart
to [Badge](https://lepide-design-system.vercel.app/components/badge/): the two share the same pill shape and the same
`component/status/*` colors, but Badge is what the *system* says about an object and is inert by
design, while Tag is owned by the user and can be removed. The dismiss "×" is a real `<button>`
with a focus ring and an accessible label, and `disabled` exists because interaction exists.

Reach for Tag when "can the user take this off?" is a sensible question.

##### Best practices

- Use Tag for **removable user input**: applied table filters, multi-select values, chosen
  recipients.
- Name the dismiss button **per item** — `removeLabel="Remove filter: Errors"`, not the generic
  default "Remove".
- After a tag is removed, **move focus somewhere sensible** (the next tag or the input that
  created them) in your handler.
- Pair `disabled` with a reason (tooltip or help text) — a chip you can't remove is a question.
- Pick the variant by meaning — the same `success` / `warning` / `error` / `neutral` semantics
  as Badge.

##### When not to use

- **Read-only status labels** — that's [Badge](https://lepide-design-system.vercel.app/components/badge/); it deliberately has no focus
  or interaction.
- **Triggering actions** — the "×" is the only action a Tag carries; for anything else use
  [Button](https://lepide-design-system.vercel.app/components/button/).
- **Building the filter UI itself** — use [Filter](https://lepide-design-system.vercel.app/components/filter/) for choosing criteria;
  Tags then display what was applied.

##### Variants

**Status colors**

`error`, `success`, `warning`, and `neutral` (the default) bind to the same `component/status/*`
tokens as Badge, so the two palettes can never drift apart.

▶ Live: [Error variant](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-tag--error)

**Dismissible**

Pass `onRemove` (React) or append the `lp-tag__remove` button (HTML) and the "×" appears. Any
variant becomes dismissible.

▶ Live: [Dismissible error tag](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-tag--dismissible)

**Disabled**

Grays the pill with the shared disabled tokens and disables the dismiss button — dismissal is
blocked, and the button leaves the tab order.

▶ Live: [Disabled tag](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-tag--disabled)

**Filter bar**

The canonical Tag use case — applied filters the user can take off one by one.

▶ Live: [Applied filters, each removable](https://lepide-design-system.vercel.app/storybook/?path=/story/data-display-tag--filter-bar)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Pill | 28px radius, 15px/5px padding, 1px border in the status color (`currentColor`) |
| 2 | Label | Semibold 14/19, tinted by variant — the tag's meaning |
| 3 | Dismiss button *(optional)* | 16px circular hit area with an 8px "×", hover tint, brand focus ring; a real `<button>` with `aria-label` |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Dismiss | The "×" button calls `onRemove`; removal itself (and focus management) is your handler's job |
| Disabled | Gray fill/text via the shared disabled tokens; the dismiss button gets the native `disabled` attribute |
| Hover | The dismiss button shows a hover tint; the pill itself has no hover state |
| Focus | The dismiss button shows the brand focus ring on `:focus-visible` |
| Theming | Status and disabled tokens re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Label each dismiss button per item: removeLabel=&quot;Remove filter: Errors&quot;.
- ✕ **Don't** — Make the whole tag clickable — the “×” is the only action; a clickable pill is a Button.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) is shown for React projects. Both resolve to the
same tokens, so they are pixel-identical in every theme.

##### Variants

Block `lp-tag` + one status modifier, with the label wrapped in `lp-tag__label`. The four status
modifiers bind to the same `component/status/*` tokens as Badge.

**Example — Status variants**

Plain HTML (canonical):

```html
<span class="lp-tag lp-tag--error"><span class="lp-tag__label">Critical</span></span>
<span class="lp-tag lp-tag--success"><span class="lp-tag__label">Enabled</span></span>
<span class="lp-tag lp-tag--warning"><span class="lp-tag__label">Pending</span></span>
<span class="lp-tag lp-tag--neutral"><span class="lp-tag__label">Archived</span></span>
```

React:

```jsx
import { Tag } from '@ramsarjal-404/react';

<>
  <Tag variant="error">Critical</Tag>
  <Tag variant="success">Enabled</Tag>
  <Tag variant="warning">Pending</Tag>
  <Tag variant="neutral">Archived</Tag>
</>
```

##### Dismissible

Append an `lp-tag__remove` button with a per-item `aria-label`. The Tag styling is pure CSS —
wire the button's click handler yourself (in React, `onRemove` renders and wires it for you).

**Example — Dismissible tag**

Plain HTML (canonical):

```html
<span class="lp-tag lp-tag--error">
  <span class="lp-tag__label">Critical</span>
  <button type="button" class="lp-tag__remove" aria-label="Remove Critical">
    <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.5"
         aria-hidden="true"><path d="M1 1l6 6M7 1L1 7" /></svg>
  </button>
</span>

<script>
  // Tag is pure CSS — removal is your handler's job
  document.querySelectorAll('.lp-tag__remove').forEach((btn) =>
    btn.addEventListener('click', () => btn.closest('.lp-tag').remove())
  );
</script>
```

React:

```jsx
import { Tag } from '@ramsarjal-404/react';

<Tag
  variant="error"
  removeLabel="Remove Critical"
  onRemove={() => console.log('removed')}
>
  Critical
</Tag>
```

##### Disabled

`lp-tag--disabled` replaces the status modifier, and the dismiss button takes the native
`disabled` attribute so dismissal is blocked and the button leaves the tab order.

**Example — Disabled tag**

Plain HTML (canonical):

```html
<span class="lp-tag lp-tag--disabled">
  <span class="lp-tag__label">Info</span>
  <button type="button" class="lp-tag__remove" aria-label="Remove Info" disabled>
    <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.5"
         aria-hidden="true"><path d="M1 1l6 6M7 1L1 7" /></svg>
  </button>
</span>
```

React:

```jsx
import { Tag } from '@ramsarjal-404/react';

<Tag disabled onRemove={() => {}}>Info</Tag>
```

##### Filter bar

The canonical pattern — a row of applied filters the user can take off one by one. In React,
remove the item from state in `onRemove`.

**Example — Applied filters**

Plain HTML (canonical):

```html
<div style="display: flex; gap: 8px; align-items: center">
  <span class="lp-tag lp-tag--neutral">
    <span class="lp-tag__label">Errors only</span>
    <button type="button" class="lp-tag__remove" aria-label="Remove filter: Errors only">
      <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.5"
           aria-hidden="true"><path d="M1 1l6 6M7 1L1 7" /></svg>
    </button>
  </span>
  <span class="lp-tag lp-tag--neutral">
    <span class="lp-tag__label">Last 24 hours</span>
    <button type="button" class="lp-tag__remove" aria-label="Remove filter: Last 24 hours">
      <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.5"
           aria-hidden="true"><path d="M1 1l6 6M7 1L1 7" /></svg>
    </button>
  </span>
  <span class="lp-tag lp-tag--neutral">
    <span class="lp-tag__label">AD-Primary</span>
    <button type="button" class="lp-tag__remove" aria-label="Remove filter: AD-Primary">
      <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.5"
           aria-hidden="true"><path d="M1 1l6 6M7 1L1 7" /></svg>
    </button>
  </span>
</div>

<script>
  document.querySelectorAll('.lp-tag__remove').forEach((btn) =>
    btn.addEventListener('click', () => btn.closest('.lp-tag').remove())
  );
</script>
```

React:

```jsx
import { useState } from 'react';
import { Tag } from '@ramsarjal-404/react';

function FilterBar() {
  const [filters, setFilters] = useState(['Errors only', 'Last 24 hours', 'AD-Primary']);

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {filters.map((f) => (
        <Tag
          key={f}
          variant="neutral"
          removeLabel={`Remove filter: ${f}`}
          onRemove={() => setFilters((prev) => prev.filter((x) => x !== f))}
        >
          {f}
        </Tag>
      ))}
      {filters.length === 0 && <span>No filters applied</span>}
    </div>
  );
}
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Tag is pure CSS and needs no `lepidus.js`; only the dismiss click handler is yours to wire.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` * | `ReactNode` | — | Tag label |
| `disabled` | `boolean` | `false` | Gray out the tag and block dismissal |
| `onRemove` | `(() => void)` | — | Render the dismiss "×" button and call back when it's activated |
| `removeLabel` | `string` | `Remove` | Accessible label for the dismiss button (default "Remove") |
| `variant` | `enum` | `neutral` | Status color set — binds to the shared component/status tokens |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The pill itself is not clickable — the only target is the dismiss "×", a 16px circular hit
  area with a hover tint.
- Disabled tags block dismissal: the button takes the native `disabled` attribute and shows no
  hover feedback.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the dismiss button (the only focusable part) |
| `Enter` / `Space` | Activates the dismiss button (native `<button>` behavior) |

The dismiss button shows the brand focus ring on `:focus-visible`. A tag without `onRemove` (or
without the `lp-tag__remove` button) contributes nothing to the tab order. Disabled dismiss
buttons are removed from the tab order by the native attribute.

**Screen readers**

- The pill is a plain `<span>` — the label is read as regular text in document flow.
- The dismiss control is a native `<button>` whose accessible name comes from `aria-label`
  (`removeLabel` in React, default "Remove"). **Name it per item** —
  `removeLabel="Remove filter: Errors"` — so users jumping by control know which tag each "×"
  belongs to.
- The "×" icon inside the button is `aria-hidden`; only the label is announced.
- Status is conveyed by the label text, not color alone.

##### Development considerations

- When a tag is removed, the focused button disappears — **move focus somewhere sensible** in
  your handler (the next tag, or the input that created the tags), otherwise focus drops to the
  document body.
- Use the native `disabled` attribute on the dismiss button (React does this for you); never
  fake it with CSS — only the attribute conveys the state to assistive technology.
- Don't make the whole tag clickable; one accessible control per pill keeps the interaction
  model predictable. For clickable pills, use a [Button](https://lepide-design-system.vercel.app/components/button/).

##### Content

- Tag labels name the item, not the action: "Errors only", "Last 24 hours".
- Dismiss labels follow the pattern "Remove" + what: "Remove filter: Errors".
- Keep labels short — the pill does not wrap.

#### Hard-fail checks — Tag

- [ ] Every `lp-tag*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] ARIA state kept and updated: `aria-hidden`, `aria-label`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

### Feedback

<a id="alert-panel"></a>

### AlertPanel

Page-level alert announcement — severity triangle, big headline, summary, optional evidence and a call to action on a soft-shadow card.

- **Availability:** plain CSS (block `lp-alert-panel`) + React
- **React:** `import { AlertPanel } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/alert-panel/ · **Storybook:** [With Details](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-alert-panel--with-details), [Success](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-alert-panel--success), [All Severities](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-alert-panel--all-severities)
- **Related:** [message](#message), [toast](#toast), [modal](#modal), [button](#button)

#### Legal class set (complete — do not invent others)

`lp-alert-panel` · `lp-alert-panel__action` · `lp-alert-panel__details` · `lp-alert-panel__footnote` · `lp-alert-panel__headline` · `lp-alert-panel__icon` · `lp-alert-panel__summary` · `lp-alert-panel__title`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`, `<table>`
- **Roles:** `role="alert"`
- **ARIA attributes:** `aria-hidden`

#### Purpose and usage rules

##### Overview

AlertPanel is the **heaviest of the three feedback weights** — Toast (transient) → Message
(inline strip) → AlertPanel (standing announcement). Use it when an alert deserves the full
stage: an alert detail view, a notification landing page, or the web rendering of an alert
notification. A severity triangle sits over the big "Attention!" headline, followed by the
alert name, a rich summary, an optional evidence slot, a call to action and a footnote — all
centered on a soft-shadow card. It announces itself to assistive tech via `role="alert"`.

##### Best practices

- **Bold the variable facts** in the summary ("**5 change(s)**", "**File Server**") so the
  payload of the alert is scannable.
- Keep the `details` slot to a handful of evidence rows (a small table or key/value grid);
  link to the full report via the `action` slot.
- Use the standard **primary Button** as the call to action — the Figma frame's one-off cyan
  is not a system color.
- Use the footnote for the "what now" line ("Now you can check the report directly on LDSP
  web - console").

##### When not to use

- **Inline form or operation feedback** — use [Message](https://lepide-design-system.vercel.app/components/message/), the inline
  alert strip with title, body and Ok/Cancel actions.
- **Fleeting confirmations** ("saved", "scan started") — use [Toast](https://lepide-design-system.vercel.app/components/toast/),
  the transient notification pill.
- **Tasks that need input before continuing** — use [Modal](https://lepide-design-system.vercel.app/components/modal/); AlertPanel
  is an announcement, not a dialog.
- **A feed of many alerts** — AlertPanel is one announcement per viewport; lists belong in a
  [Table](https://lepide-design-system.vercel.app/components/table/).

##### Types

**Warning (default)**

Yellow triangle — the default severity and the Figma frame. For detected threats and
suspicious activity that needs review.

▶ Live: [Warning with an evidence table, CTA and footnote (the Figma frame)](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-alert-panel--with-details)

**Success**

Green triangle (`--color-status-success-text`) — a completed operation worth a standing
announcement, e.g. the web rendering of a "completed" alert notification.

▶ Live: [Success — green triangle, no evidence table](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-alert-panel--success)

**All severities**

`warning` (illustrative yellow), `success`, `error` and `info` (brand blue). Only the
triangle color changes; layout and type stay constant.

▶ Live: [warning / success / error / info](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-alert-panel--all-severities)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Card | Soft-shadow surface, `--radius-m` corners, max-width 801px (Figma frame), centered content |
| 2 | Severity triangle | 92×85px `aria-hidden` SVG — yellow / green / red / brand-blue fill per `severity` |
| 3 | Headline | 64px bold "Attention!" by default (`headline` prop) |
| 4 | Title | The alert name, body-lg in `--color-text-dark` — required |
| 5 | Summary *(optional)* | Rich body copy (`children`) — bold the inline facts |
| 6 | Details *(optional)* | Evidence slot between summary and action, e.g. a small table |
| 7 | Action *(optional)* | Call to action — pass a primary Button |
| 8 | Footnote *(optional)* | Small body-md line under the action |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Announcement | The root renders `role="alert"` — announced immediately and assertively when it mounts |
| Severity | `severity` colors the triangle only: warning #FFCA28 (illustrative, tokenless), success/error → status tokens, info → brand |
| Dismissal | None — AlertPanel is a standing announcement with no close button or timer |
| Slots | `details`, `action` and `footnote` render only when provided |
| Theming | Card surface, text and status colors re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Bold the variable facts in the summary and route to the full report via a primary Button in the action slot.
- ✕ **Don't** — Stack several AlertPanels in one viewport or use one for inline form feedback — it's an announcement, not a feed item.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. In plain HTML the severity color is set with an inline `color` on the icon span (the
SVG draws with `currentColor`); in React the `severity` prop does it for you.

##### Basic panel

**Example — Title, summary, action and footnote**

Plain HTML (canonical):

```html
<div class="lp-alert-panel" role="alert">
  <span class="lp-alert-panel__icon" style="color: var(--color-status-success-text, #1caa52);">
    <svg viewBox="0 0 92 85" fill="none" aria-hidden="true">
      <path d="M46 6 L88 79 H4 Z" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>
      <path d="M46 32v24" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
      <circle cx="46" cy="66" r="3.5" fill="currentColor"/>
    </svg>
  </span>
  <h3 class="lp-alert-panel__headline">Attention!</h3>
  <p class="lp-alert-panel__title">Mass files copied</p>
  <p class="lp-alert-panel__summary">
    You have received this alert because <strong>5 change(s)</strong> have been made in your
    <strong>File Server</strong>.
  </p>
  <div class="lp-alert-panel__action">
    <button class="lp-button lp-button--primary lp-button--md">View Report</button>
  </div>
  <p class="lp-alert-panel__footnote">Now you can check the report directly on LDSP web - console</p>
</div>
```

React:

```jsx
import { AlertPanel, Button } from '@ramsarjal-404/react';

<AlertPanel
  severity="success"
  title="Mass files copied"
  action={<Button variant="primary">View Report</Button>}
  footnote="Now you can check the report directly on LDSP web - console"
>
  You have received this alert because <strong>5 change(s)</strong> have been made in your{' '}
  <strong>File Server</strong>.
</AlertPanel>
```

##### Severities

Warning is the default. The triangle is the only part that changes color — warning uses the
icon set's illustrative yellow (#FFCA28, tokenless), the others bind to status and brand
tokens.

**Example — warning / success / error / info**

Plain HTML (canonical):

```html
<!-- The triangle SVG draws with currentColor — set the severity color on the icon span.
     warning: status warning token · success/error: status tokens · info: brand. -->
<div class="lp-alert-panel" role="alert">
  <span class="lp-alert-panel__icon" style="color: var(--color-status-warning-text);">
    <svg viewBox="0 0 92 85" fill="none" aria-hidden="true">
      <path d="M46 6 L88 79 H4 Z" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>
      <path d="M46 32v24" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
      <circle cx="46" cy="66" r="3.5" fill="currentColor"/>
    </svg>
  </span>
  <h3 class="lp-alert-panel__headline">Attention!</h3>
  <p class="lp-alert-panel__title">Severity: warning</p>
</div>

<div class="lp-alert-panel" role="alert">
  <span class="lp-alert-panel__icon" style="color: var(--color-status-error-text, #f72b2b);">
    <svg viewBox="0 0 92 85" fill="none" aria-hidden="true">
      <path d="M46 6 L88 79 H4 Z" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>
      <path d="M46 32v24" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
      <circle cx="46" cy="66" r="3.5" fill="currentColor"/>
    </svg>
  </span>
  <h3 class="lp-alert-panel__headline">Attention!</h3>
  <p class="lp-alert-panel__title">Severity: error</p>
</div>
```

React:

```jsx
import { AlertPanel } from '@ramsarjal-404/react';

<>
  {['warning', 'success', 'error', 'info'].map((severity) => (
    <AlertPanel key={severity} severity={severity} title="Mass files copied">
      Severity: <strong>{severity}</strong>
    </AlertPanel>
  ))}
</>
```

##### With evidence details

The `details` slot sits between the summary and the action — keep it to a handful of rows
and link to the full report via the CTA.

**Example — Evidence table between summary and action**

Plain HTML (canonical):

```html
<div class="lp-alert-panel" role="alert">
  <span class="lp-alert-panel__icon" style="color: var(--color-status-warning-text);">
    <svg viewBox="0 0 92 85" fill="none" aria-hidden="true">
      <path d="M46 6 L88 79 H4 Z" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>
      <path d="M46 32v24" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
      <circle cx="46" cy="66" r="3.5" fill="currentColor"/>
    </svg>
  </span>
  <h3 class="lp-alert-panel__headline">Attention!</h3>
  <p class="lp-alert-panel__title">Mass files copied</p>
  <p class="lp-alert-panel__summary">
    You have received this alert because <strong>5 change(s)</strong> have been made in your
    <strong>File Server</strong> and <strong>Script execution</strong> was initiated.
  </p>
  <div class="lp-alert-panel__details">
    <table style="border-collapse: collapse; font-size: 12px; color: var(--color-text-primary, #364765);">
      <thead>
        <tr>
          <th style="border: 1px solid currentColor; padding: 5px 6px; font-weight: 400;">Account Name</th>
          <th style="border: 1px solid currentColor; padding: 5px 6px; font-weight: 400;">Script Name</th>
          <th style="border: 1px solid currentColor; padding: 5px 6px; font-weight: 400;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid currentColor; padding: 5px 6px;">Administrator</td>
          <td style="border: 1px solid currentColor; padding: 5px 6px;">\\192.168.30.206\share206\Ram Srjal</td>
          <td style="border: 1px solid currentColor; padding: 5px 6px;">Success</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="lp-alert-panel__action">
    <button class="lp-button lp-button--primary lp-button--md">View Report</button>
  </div>
  <p class="lp-alert-panel__footnote">Now you can check the report directly on LDSP web - console</p>
</div>
```

React:

```jsx
import { AlertPanel, Button } from '@ramsarjal-404/react';

<AlertPanel
  severity="warning"
  title="Mass files copied"
  details={<EvidenceTable rows={scriptExecutions} />} // any node: a small table, key/value grid…
  action={<Button variant="primary">View Report</Button>}
  footnote="Now you can check the report directly on LDSP web - console"
>
  You have received this alert because <strong>5 change(s)</strong> have been made in your{' '}
  <strong>File Server</strong> and <strong>Script execution</strong> was initiated.
</AlertPanel>
```

> **Pure CSS — no lepidus.js needed** — AlertPanel is a static surface: one `` is enough — see [Get Started](https://lepide-design-system.vercel.app/get-started/). The `role="alert"` on the root is part of the markup contract, not the script.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `action` | `ReactNode` | — | Call to action (e.g. a primary Button "View Report") |
| `children` | `ReactNode` | — | Rich summary — use `<strong>` for the inline facts ("5 change(s)", "File Server") |
| `details` | `ReactNode` | — | Evidence area between summary and action (e.g. a small details table) |
| `footnote` | `ReactNode` | — | Small line under the action ("Now you can check the report directly…") |
| `headline` | `ReactNode` | `Attention!` | Big headline under the triangle (default "Attention!") |
| `severity` | `enum` | `warning` | Colors the triangle: warning (yellow), success (green), error (red), info (brand) |
| `title` * | `ReactNode` | — | The alert name (e.g. "Mass files copied") |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The panel itself is not interactive — only the optional Button in the `action` slot takes
  clicks (full Button hover/active behavior applies).
- The evidence `details` slot renders whatever you pass; keep embedded tables read-only.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the action Button (the only focusable part by default) |
| `Enter` / `Space` | Activates the action Button (native button behavior) |

The panel adds no focus traps and no keyboard handling of its own — there is nothing to
dismiss.

**Screen readers**

- The root renders `role="alert"` — an assertive live region. When the panel mounts, its
  full content is announced immediately, interrupting the current task. Only mount it for
  genuinely important announcements.
- The severity triangle is an `aria-hidden` SVG — severity must also be carried by the
  title/summary text, never by the triangle color alone.
- The headline is a semantic `<h2>` — keep the surrounding heading hierarchy in mind when
  placing the panel in a page.

##### Development considerations

- Render the panel into the page when the alert arrives (so `role="alert"` fires), not
  hidden-then-revealed with CSS — visibility toggles are not reliably announced.
- Don't put the only path to the report behind hover or color: the `action` Button label
  should say where it goes ("View Report").
- If the panel replaces async content (e.g. an alert detail loading in), it still announces
  itself — avoid double-announcing with a separate live region.
- One AlertPanel per viewport: multiple simultaneous `role="alert"` regions race each other
  in the screen-reader queue.

##### Content

- The `title` is the alert name, not a sentence — "Mass files copied", "Mass file deletion
  detected".
- Put the facts in the summary and bold them with `<strong>` ("**5 change(s)**" on
  "**File Server**") — bolding is also announced as emphasis by most screen readers.
- Keep the headline short; "Attention!" is the default and rarely needs changing.
- The footnote is for the follow-up hint ("Now you can check the report directly on LDSP
  web - console"), not for additional warnings.

#### Hard-fail checks — AlertPanel

- [ ] Every `lp-alert-panel*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>`, `<table>` — no `div` stand-ins.
- [ ] Roles present where the anatomy has them: `role="alert"`.
- [ ] ARIA state kept and updated: `aria-hidden`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="empty-state"></a>

### EmptyState

Empty page statement with illustration — centered line art above a brand-blue message, with an optional call to action.

- **Availability:** plain CSS (block `lp-empty-state`) + React
- **React:** `import { EmptyState } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/empty-state/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-empty-state--default), [With Action](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-empty-state--with-action), [Upload File](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-empty-state--upload-file), [As Dropzone](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-empty-state--as-dropzone), [Drag And Drop](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-empty-state--drag-and-drop), [Gallery](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-empty-state--gallery), [In Table](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-empty-state--in-table)
- **Related:** [table](#table), [skeleton](#skeleton), [message](#message), [button](#button)

#### Legal class set (complete — do not invent others)

`lp-empty-state` · `lp-empty-state__action` · `lp-empty-state__illustration` · `lp-empty-state__message`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`
- **ARIA attributes:** `aria-hidden`

#### Purpose and usage rules

##### Overview

EmptyState fills a region that has nothing to show — an empty table, no search results,
nothing to download — with centered line art and a brand-blue statement underneath. The
default art is the sleeping-server illustration from the Figma frame, shipped as a single
SVG (221×221 by default) so it scales crisply with no asset hosting; swap it via the
`illustration` slot when the situation calls for different art. Pass `action` when there is
an obvious next step.

##### Best practices

- **Say why it's empty and what to do next** — "Sorry, No exported file to download!" beats
  "No data".
- Pair with `action` when a next step exists: a primary Button to create, import, or clear
  filters.
- Pick **one illustration per situation, never per page**: sleeping server for "nothing
  here", open folder for upload prompts, hand-and-target for drag targets, server-and-
  magnifier for "no results".
- Scale the illustration down (`illustrationSize`) in inline contexts like a table body.

##### When not to use

- **Loading** — the region will have content soon; use [Skeleton](https://lepide-design-system.vercel.app/components/skeleton/)
  (known shape) or [Spinner](https://lepide-design-system.vercel.app/components/spinner/) (indeterminate), or
  [Progress](https://lepide-design-system.vercel.app/components/progress/) for measurable progress.
- **Errors and failed operations** — use [Message](https://lepide-design-system.vercel.app/components/message/) (blocking, with
  actions) or [Toast](https://lepide-design-system.vercel.app/components/toast/) (passive).
- **Decorative filler** — if the region is intentionally blank, leave it blank; EmptyState
  asserts "you expected content here".

##### Variants

**Default**

The Figma frame verbatim: sleeping-server illustration above the brand-blue statement.

▶ Live: [Nothing to show — the default sleeping-server art](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-empty-state--default)

**With action**

When there is an obvious next step, surface it as a Button in the `action` slot.

▶ Live: [Statement plus a primary call to action](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-empty-state--with-action)

**Custom illustration**

The `illustration` slot swaps the art — here the open-folder upload prompt. New situations
should get a frame in the Lepidus Figma file first (same line style), then be exported the
same way.

▶ Live: [UploadFileIllustration — awaiting user input](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-empty-state--upload-file)

**Inside Table**

Composed into Table via its `emptyMessage` slot — a smaller illustration suits the inline
context.

▶ Live: [Filtered-to-nothing results inside a Table](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-empty-state--in-table)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | Centered flex column, 15px gap, 20px padding |
| 2 | Illustration | Decorative (`aria-hidden`) SVG, 221px by default — swappable via `illustration` |
| 3 | Message | Required — body-lg (16/22) in `--color-text-brand`, centered, max-width 455px |
| 4 | Action *(optional)* | Slot below the message, typically a primary Button |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Static surface | No hover, focus or dismiss behavior of its own — only an action Button is interactive |
| Illustration sizing | `illustrationSize` scales the default art; custom art controls its own size |
| Announcement | None built in — wrap in an `aria-live="polite"` region when it replaces async content |
| Theming | Message and illustration colors re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Say why the region is empty and offer the next step: “No reports have been generated yet” + a Generate Report button.
- ✕ **Don't** — Show a generic “No data” for every empty region, or use EmptyState as a loading placeholder.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. In React the sleeping-server art renders by default; in plain HTML you place your own
SVG or image inside the `lp-empty-state__illustration` slot.

##### Basic

**Example — Illustration and statement**

Plain HTML (canonical):

```html
<div class="lp-empty-state">
  <span class="lp-empty-state__illustration">
    <svg width="120" height="70" viewBox="0 0 120 70" fill="none"
         stroke="var(--color-border-strong, #555766)" stroke-width="2" aria-hidden="true">
      <rect x="20" y="10" width="80" height="22" rx="4"/>
      <rect x="20" y="38" width="80" height="22" rx="4"/>
      <circle cx="32" cy="21" r="3"/>
      <circle cx="32" cy="49" r="3"/>
      <path d="M44 21h32M44 49h20"/>
    </svg>
  </span>
  <p class="lp-empty-state__message">Sorry, No exported file to download!</p>
</div>
```

React:

```jsx
import { EmptyState } from '@ramsarjal-404/react';

<EmptyState message="Sorry, No exported file to download!" />
```

##### With action

**Example — Statement plus a call to action**

Plain HTML (canonical):

```html
<div class="lp-empty-state">
  <span class="lp-empty-state__illustration">
    <svg width="120" height="70" viewBox="0 0 120 70" fill="none"
         stroke="var(--color-border-strong, #555766)" stroke-width="2" aria-hidden="true">
      <rect x="20" y="10" width="80" height="22" rx="4"/>
      <rect x="20" y="38" width="80" height="22" rx="4"/>
      <circle cx="32" cy="21" r="3"/>
      <circle cx="32" cy="49" r="3"/>
      <path d="M44 21h32M44 49h20"/>
    </svg>
  </span>
  <p class="lp-empty-state__message">No reports have been generated yet.</p>
  <div class="lp-empty-state__action">
    <button class="lp-button lp-button--primary lp-button--md">Generate Report</button>
  </div>
</div>
```

React:

```jsx
import { EmptyState, Button } from '@ramsarjal-404/react';

<EmptyState
  message="No reports have been generated yet."
  action={<Button variant="primary">Generate Report</Button>}
/>
```

##### Custom illustration

In React, swap the art via the `illustration` prop — the package exports
`EmptyStateIllustration`, `UploadFileIllustration`, `DragDropIllustration` and
`NoRecordsIllustration`. In HTML, put any `aria-hidden` SVG or `img` in the illustration
slot.

**Example — Upload prompt with the open-folder art**

Plain HTML (canonical):

```html
<!-- Any aria-hidden SVG or <img> works in the illustration slot. -->
<div class="lp-empty-state">
  <span class="lp-empty-state__illustration">
    <svg width="110" height="80" viewBox="0 0 110 80" fill="none"
         stroke="var(--color-text-brand, #1c4599)" stroke-width="2" aria-hidden="true">
      <path d="M10 25 L10 70 L100 70 L100 32 L52 32 L44 25 Z" stroke-linejoin="round"/>
      <path d="M55 60 V40 M47 47l8-8 8 8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <p class="lp-empty-state__message">Click here to upload your file!</p>
</div>
```

React:

```jsx
import { EmptyState, UploadFileIllustration } from '@ramsarjal-404/react';

<EmptyState
  message="Click here to upload your file!"
  illustration={<UploadFileIllustration size={168} />}
/>
```

> **Pure CSS — no lepidus.js needed** — EmptyState is a static surface: one `` is enough — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Keep the illustration `aria-hidden="true"`; the meaning lives in the message text.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `action` | `ReactNode` | — | Optional call-to-action under the message (e.g. a Button) |
| `illustration` | `ReactNode` | — | Replace the default sleeping-server illustration |
| `illustrationSize` | `number` | `221` | Illustration width/height in px when using the default art (default 221) |
| `message` * | `ReactNode` | — | The statement under the illustration (e.g. "Sorry, No exported file to download!") |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The surface itself is not interactive — only the optional Button in the `action` slot
  takes clicks.
- For upload dropzones, wrap the whole EmptyState in a real `<button>` styled as a dashed
  target (see the "As upload dropzone" story) so the entire area is one click target.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the action Button (the only focusable part by default) |
| `Enter` / `Space` | Activates the action Button (native button behavior) |

EmptyState adds no keyboard handling of its own.

**Screen readers**

- The meaning lives entirely in the **message text**; the illustration is an `aria-hidden`
  decorative SVG and exposes nothing to assistive tech.
- The component sets no role or live region itself. When the empty state replaces async
  content (a search that returned nothing), render it inside an `aria-live="polite"` region
  so the outcome is announced.
- An action Button in the `action` slot is a normal focusable Button with its label as the
  accessible name.

##### Development considerations

- When wrapping the EmptyState in a button to make a dropzone, give the wrapper an
  `aria-label` ("Upload a file") — the message text alone may be too verbose as a control
  name.
- Don't convey the situation only through the illustration; the four illustrations look
  similar to low-vision users and don't exist for screen-reader users.
- Inside [Table](https://lepide-design-system.vercel.app/components/table/), pass the EmptyState through `emptyMessage` so it lands
  in the table's own empty slot rather than overlapping the grid semantics.

##### Content

- Be specific about **what** is empty and **why**: "No records found for this period.
  Adjust the filters or run a new scan."
- Keep it to one or two short sentences — the message column maxes at 455px.
- Action labels are verb-first and concrete: "Generate Report", "Run scan" — not "OK" or
  "Click here".
- Avoid blamey or cutesy copy; state the fact and the way forward.

#### Hard-fail checks — EmptyState

- [ ] Every `lp-empty-state*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] ARIA state kept and updated: `aria-hidden`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="message"></a>

### Message

Large alert surface with a status icon, title, multi-line body and optional Ok/Cancel-style actions — for blocking or decision-requiring feedback.

- **Availability:** plain CSS (block `lp-message`) + React
- **React:** `import { Message } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/message/ · **Storybook:** [Error](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-message--error), [Success](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-message--success), [Warning](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-message--warning), [Info](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-message--info), [Text Only](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-message--text-only), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-message--all-states)
- **Related:** [toast](#toast), [alert-panel](#alert-panel), [modal](#modal)

#### Legal class set (complete — do not invent others)

`lp-message` · `lp-message--error` · `lp-message--info` · `lp-message--success` · `lp-message--warning` · `lp-message__actions` · `lp-message__body` · `lp-message__close` · `lp-message__content` · `lp-message__icon` · `lp-message__text` · `lp-message__title`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`
- **Roles:** `role="alert"`, `role="status"`
- **ARIA attributes:** `aria-hidden`, `aria-label`

#### Purpose and usage rules

##### Overview

Message is the Lepidus alert surface for **important, blocking or decision-requiring
feedback**: failed operations with remediation steps, expiring licenses, confirmations of
long-running jobs. It is a full card — status icon, heading, multi-line body, optional
Ok/Cancel-style Buttons and a close button — meant to sit inline in the page or inside a
dialog flow until the user acts on it. It announces itself assertively via `role="alert"`.

The middle of the three feedback weights: [Toast](https://lepide-design-system.vercel.app/components/toast/) (transient) →
**Message** (inline strip) → [AlertPanel](https://lepide-design-system.vercel.app/components/alert-panel/) (standing announcement).
Rule of thumb: **if the user must read and act, use Message; if you are just notifying, use
Toast.**

##### Best practices

- **Lead with a clear, specific title** ("The network path was not found") and put
  remediation steps in the body.
- Order actions secondary-then-primary; the primary action is the safe or expected
  resolution.
- Body copy honors `\n` line breaks (`white-space: pre-line`) — use them for stepwise
  remediation lists.
- Provide `onClose` when the user may dismiss without deciding; omit it when a decision is
  required.

##### When not to use

- **Transient "saved!"-style feedback** — that is [Toast](https://lepide-design-system.vercel.app/components/toast/)'s job: a
  compact, self-expiring pill with no action buttons.
- **A standing, page-level announcement** (alert detail view, notification landing page) —
  use [AlertPanel](https://lepide-design-system.vercel.app/components/alert-panel/).
- **Collecting input before continuing** — use [Modal](https://lepide-design-system.vercel.app/components/modal/); Message presents
  information and a decision, not a form.
- **Low-importance persistent content** — `role="alert"` interrupts screen-reader users;
  don't mount one for routine copy.

##### Types

**Error (default)**

Red triangle-exclamation badge. The default variant and the Figma instance — failed
operations with remediation steps.

▶ Live: [Error with multi-line remediation copy, Ok/Cancel actions and close](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-message--error)

**Warning**

Orange triangle badge — time-sensitive notices that warrant a decision, like an expiring
license.

▶ Live: [Warning with a primary call to action and a deferral secondary](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-message--warning)

**Success**

Green check badge — confirmation of a completed operation, often with a single primary
action.

▶ Live: [Success with a single Done action](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-message--success)

**Info**

Brand-blue "i" badge — neutral announcements that still warrant a decision.

▶ Live: [Info with View report / Dismiss actions](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-message--info)

**Text only**

No actions and no close button — a passive inline composition. Omitting `onClose` hides the
× entirely.

▶ Live: [Minimal composition: icon, title and body](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-message--text-only)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Card | White surface (`--component-modal-bg`), 15px radius, 1px border |
| 2 | Status icon | 45px rounded-square badge in the variant accent, white glyph — hide with `icon={false}` or pass a custom node |
| 3 | Title | Semantic `<h3>` in heading/h3 (24/36 bold) |
| 4 | Body | Multi-line copy — `white-space: pre-line`, so `\n` makes line breaks |
| 5 | Actions row *(optional)* | Secondary (outline) then primary (filled) Lepidus Buttons |
| 6 | Close button *(optional)* | × in the top-right, rendered only when `onClose` is set |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Announcement | `role="alert"` — announced immediately and assertively when it mounts |
| Dismissible | Only when `onClose` is provided — a real `<button>` with `aria-label="Close"`; no auto-dismiss timer |
| Variants | `info` / `success` / `warning` / `error` swap only the icon glyph and its accent color |
| Actions | `primaryAction` / `secondaryAction` take `{ label, onClick }` and render real Lepidus Buttons |
| Theming | Surface, text and status accents re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Pair a specific title with remediation steps in the body: “The network path was not found” + how to fix it.
- ✕ **Don't** — Use Message for fleeting confirmations or stack more than two actions — notify with Toast, and move extra options behind the primary action.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. Block `lp-message` + one variant modifier; the icon, actions and close button are
optional elements.

##### Error with actions

The full composition: status icon, title, body, Ok/Cancel actions and a close button.

**Example — Error with actions and close**

Plain HTML (canonical):

```html
<div class="lp-message lp-message--error" role="alert" style="max-width: 560px;">
  <span class="lp-message__icon">
    <svg viewBox="0 0 45 45" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="41" height="41" rx="10" stroke="currentColor" stroke-width="3"/>
      <path d="M22.5 12 33 31.5H12L22.5 12Z" stroke="currentColor" stroke-width="2.4"
            stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22.5 20v5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="22.5" cy="28.5" r="1.2" fill="currentColor"/>
    </svg>
  </span>
  <div class="lp-message__content">
    <div class="lp-message__text">
      <h3 class="lp-message__title">The network path was not found</h3>
      <p class="lp-message__body">Possible Solution :
If you have not provided full username (username@domainame) then try with full user name.
Make sure you are entering correct password.</p>
    </div>
    <div class="lp-message__actions">
      <button class="lp-button lp-button--secondary lp-button--sm">Cancel</button>
      <button class="lp-button lp-button--primary lp-button--sm">Ok</button>
    </div>
  </div>
  <button class="lp-message__close" aria-label="Close message">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
         stroke-width="1.8" stroke-linecap="round"><path d="M2 2l10 10M12 2 2 12"/></svg>
  </button>
</div>
```

React:

```jsx
import { Message } from '@ramsarjal-404/react';

<Message
  variant="error"
  title="The network path was not found"
  primaryAction={{ label: 'Ok', onClick: retry }}
  secondaryAction={{ label: 'Cancel', onClick: cancel }}
  onClose={dismiss}
>
  {'Possible Solution :\nIf you have not provided full username (username@domainame) then try with full user name.\nMake sure you are entering correct password.'}
</Message>
```

##### Success with a single action

**Example — Success confirmation**

Plain HTML (canonical):

```html
<div class="lp-message lp-message--success" role="status" style="max-width: 560px;">
  <span class="lp-message__icon">
    <svg viewBox="0 0 45 45" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="41" height="41" rx="10" stroke="currentColor" stroke-width="3"/>
      <path d="M14 23.5 20 29.5 31 17" stroke="currentColor" stroke-width="3"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <div class="lp-message__content">
    <div class="lp-message__text">
      <h3 class="lp-message__title">Backup completed</h3>
      <p class="lp-message__body">All 1,248 objects were backed up successfully. The next scheduled run is tonight at 2:00 AM.</p>
    </div>
    <div class="lp-message__actions">
      <button class="lp-button lp-button--primary lp-button--sm">Done</button>
    </div>
  </div>
  <button class="lp-message__close" aria-label="Close message">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor"
         stroke-width="1.8" stroke-linecap="round"><path d="M2 2l10 10M12 2 2 12"/></svg>
  </button>
</div>
```

React:

```jsx
import { Message } from '@ramsarjal-404/react';

<Message
  variant="success"
  title="Backup completed"
  primaryAction={{ label: 'Done', onClick: acknowledge }}
  onClose={dismiss}
>
  All 1,248 objects were backed up successfully. The next scheduled run is tonight at 2:00 AM.
</Message>
```

##### Text only

Drop the actions row and the close button for a passive inline message.

**Example — Icon, title and body only**

Plain HTML (canonical):

```html
<div class="lp-message lp-message--info" role="status" style="max-width: 560px;">
  <span class="lp-message__icon">
    <svg viewBox="0 0 45 45" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="41" height="41" rx="10" stroke="currentColor" stroke-width="3"/>
      <path d="M22.5 20v11" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="22.5" cy="14.5" r="1.4" fill="currentColor"/>
    </svg>
  </span>
  <div class="lp-message__content">
    <div class="lp-message__text">
      <h3 class="lp-message__title">Heads up</h3>
      <p class="lp-message__body">This is an informational message with no actions.</p>
    </div>
  </div>
</div>
```

React:

```jsx
import { Message } from '@ramsarjal-404/react';

{/* No actions and no onClose — the actions row and the × are omitted entirely. */}
<Message variant="info" title="Heads up">
  This is an informational message with no actions.
</Message>
```

> **Pure CSS — no lepidus.js needed** — Message is a static surface; wire the action and close buttons yourself. One `` is enough — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Use `role="alert"` for urgent errors/warnings and `role="status"` for polite confirmations.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Body copy (typography/nav). Pass strings with `\n` or React nodes. |
| `icon` | `ReactNode` | `true` | Show the leading status icon. Pass a node to override the default glyph. Default true. |
| `onClose` | `(() => void)` | — | When provided, renders a close (×) button wired to this handler. |
| `primaryAction` | `MessageAction` | — | Primary (filled) action — rendered with the brand Button. |
| `secondaryAction` | `MessageAction` | — | Secondary (outline) action. |
| `title` | `ReactNode` | — | Bold heading (typography/heading/h3). |
| `variant` | `enum` | `error` | Status variant — defaults to `error` (the Figma instance). |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The action Buttons and the close × are the only interactive parts; the card itself takes
  no clicks.
- The close control is a real button with its own hover/focus styling — not a decorative
  icon.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves through the action Buttons and the close button in DOM order |
| `Enter` / `Space` | Activates the focused Button or the close control (native behavior) |

All controls show the brand `:focus-visible` outline; Message adds no focus trapping —
users can tab past it freely.

**Screen readers**

- The React root renders `role="alert"` — an assertive live region announced immediately
  when it mounts, interrupting the current task. Only use it for genuinely important
  content. In plain HTML, choose the role per urgency: `role="alert"` for errors and
  warnings, `role="status"` for polite confirmations.
- Status glyphs are `aria-hidden` SVGs; meaning must also be conveyed by the title/body
  text, never by color alone.
- The close control is a real `<button type="button">` with `aria-label="Close"`.
- Actions reuse the Lepidus Button, so they are natively focusable and operable with
  Enter/Space.
- The title is a semantic `<h3>` — keep the surrounding heading hierarchy in mind.

##### Development considerations

- Don't mount low-importance persistent content with this component — `role="alert"` will
  interrupt screen-reader users every time it appears.
- Render the Message when the event happens rather than toggling visibility with CSS;
  hidden-then-shown alerts are not reliably announced.
- If the user must decide, omit `onClose` so the only ways out are the explicit actions.
- Color is never the only signal: an error Message must say it failed in the title, not
  rely on the red badge.

##### Content

- Titles state the fact, specifically: "The network path was not found", "License expiring
  soon" — not "Error!".
- Put remediation steps in the body, one per line (`\n` breaks render as lines).
- Action labels match the decision: "Renew" / "Remind me later", not "Yes" / "No".
- Severity-appropriate tone: errors explain how to fix, warnings state the deadline,
  successes confirm the result and what happens next.

#### Hard-fail checks — Message

- [ ] **Anatomy is `__icon` + `__content` > `__text` > `__title` / `__body` (+ `__actions`, `__close`) — never bare text directly inside `lp-message__content`.** _(observed drift: bare text loses the title/body typography and the icon column.)_
- [ ] Every `lp-message*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] Roles present where the anatomy has them: `role="alert"`, `role="status"`.
- [ ] ARIA state kept and updated: `aria-hidden`, `aria-label`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="modal"></a>

### Modal

Popup dialog for focused, short data-entry tasks — brand-titled header, declarative input rows and a centered action footer over a dimmed backdrop.

- **Availability:** plain CSS (block `lp-modal`) + React
- **React:** `import { Modal } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/modal/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-modal--default), [Multiple Inputs](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-modal--multiple-inputs), [With Validation](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-modal--with-validation), [Left Header](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-modal--left-header), [Sizes](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-modal--sizes), [With Overlay](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-modal--with-overlay)
- **Related:** [message](#message), [input](#input), [button](#button), [toast](#toast)

#### Legal class set (complete — do not invent others)

`lp-modal` · `lp-modal__body` · `lp-modal__custom` · `lp-modal__field-label` · `lp-modal__field-label--empty` · `lp-modal__fields` · `lp-modal__footer` · `lp-modal__header` · `lp-modal__header--center` · `lp-modal__header--left` · `lp-modal__shell` · `lp-modal__shell--inline` · `lp-modal__shell--lg` · `lp-modal__shell--md` · `lp-modal__shell--sm` · `lp-modal__title`

#### Hooks and semantics the canonical markup relies on

- **lepidus.js hooks:** `data-lp-autofocus`, `data-lp-modal-close`, `data-lp-modal-open="add-server-modal"`, `data-lp-modal-open="credentials-modal"`, `data-lp-modal-open="url-modal"`
- **Native elements (keep them native):** `<button>`, `<input>`, `<label>`
- **Roles:** `role="dialog"`
- **ARIA attributes:** `aria-labelledby`, `aria-modal`

#### Purpose and usage rules

##### Overview

Modal is the Lepidus dialog for **focused, short data-entry tasks**: entering a URL,
renaming an item, supplying credentials. It composes the Lepidus
[Input](https://lepide-design-system.vercel.app/components/input/) (via the `fields` array) and [Button](https://lepide-design-system.vercel.app/components/button/) (via
`primaryAction` / `secondaryAction`) on a tinted shell with a white, brand-titled header
bar, and traps the user's attention behind a dimmed backdrop. In overlay mode the shell
renders `role="dialog"` with `aria-modal="true"`, and focus is trapped inside until it
closes.

##### Best practices

- **Keep modals to one short task**; prefer the `fields` array over hand-rolled inputs so
  labels and spacing stay aligned (the label column auto-sizes to the widest label).
- Give the primary action a verb label ("Done", "Save", "Rename"), with Cancel as the
  secondary — the secondary defaults to firing `onClose`, so "Cancel" works without extra
  wiring.
- Render the Modal conditionally (`open`) so focus restore can find the trigger that opened
  it.
- Always leave an obvious way out: don't disable both `closeOnEsc` and
  `closeOnOverlayClick` unless data loss is at stake.

##### When not to use

- **Pure status or alerts** — use [Message](https://lepide-design-system.vercel.app/components/message/) for blocking feedback
  with actions, or [Toast](https://lepide-design-system.vercel.app/components/toast/) for passive notifications. A Modal collects
  input; it doesn't just announce.
- **Long or multi-step tasks** — prefer an inline form or a dedicated page; modals are for
  tasks finished in seconds.
- **Standing announcements** — use [AlertPanel](https://lepide-design-system.vercel.app/components/alert-panel/).

##### Variants

**Default**

The Figma "URL Popup": lg shell, one labeled field with helper text, Done/Cancel footer
(rendered inline here so the docs canvas can show it).

▶ Live: [One field, helper text, Done/Cancel](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-modal--default)

**Multiple inputs**

A credentials form built declaratively from the `fields` array — all inputs stay aligned.

▶ Live: [Add Credentials — four field rows from one array](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-modal--multiple-inputs)

**With validation**

Each `fields` row supports the full Input API, including `status="error"` plus
`errorMessage`.

▶ Live: [Field-level validation via the Input error state](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-modal--with-validation)

**Left-aligned header**

`headerAlign="left"` on the medium shell — for utility dialogs like renames.

▶ Live: [Left header, md width](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-modal--left-header)

**Sizes**

Three width presets: sm (520px), md (680px, default) and lg (743px — the Figma frame
width).

▶ Live: [sm / md / lg stacked](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-modal--sizes)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Backdrop | Fixed, 50% `--component-modal-overlay` dim; click-to-close (configurable); omitted with `overlay={false}` |
| 2 | Shell | Tinted (`--color-background-page`) rounded card, 25px radius, card shadow; width from `size` |
| 3 | Header bar | White strip with the brand-blue title, center- or left-aligned; omitted when `title` is absent |
| 4 | Body — fields | Auto-sized label column + full-width Inputs, one row per `fields` entry |
| 5 | Body — custom | `children`, rendered after any fields |
| 6 | Footer | Centered secondary (outline) then primary (filled) Buttons |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Open/close | `open` controls visibility — when false the modal renders nothing |
| Escape | Closes via `onClose` (`closeOnEsc`, overlay mode only) |
| Backdrop click | Closes via `onClose` (`closeOnOverlayClick`, overlay mode only) |
| Focus trap | Overlay mode: focus moves to the first focusable element on open, Tab/Shift+Tab cycle inside, and focus returns to the opener on close |
| Secondary action | With no `onClick` of its own it falls back to firing `onClose` — instant Cancel |
| Inline mode | `overlay={false}` embeds the shell in the page flow — no backdrop, no trap, no `aria-modal` |
| Theming | Shell, header and field tokens re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Keep the modal to one short task with a verb-labeled primary action — “Save”, “Rename”, “Done”.
- ✕ **Don't** — Use a Modal to display status text or a long multi-step form — announce with Message/Toast, and give long forms a page.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. In plain HTML the open/close behavior comes from `lepidus.js`: a trigger with
`data-lp-modal-open="id"` opens the matching `<div class="lp-modal" id="…" hidden>`, any
element with `data-lp-modal-close` closes it, and Escape, backdrop clicks, the focus trap
and focus restore are wired automatically.

##### Open modal

The full overlay markup, production-safe: the modal keeps `hidden` and the trigger opens it
through `lepidus.js`. Click **Open modal** in the preview to see the dialog over the backdrop.
Never ship an `lp-modal` without `hidden` — it is a fixed overlay and would cover the page on
load.

**Example — Open dialog over the backdrop**

Plain HTML (canonical):

```html
<!-- Production-safe: the modal keeps `hidden`; the trigger opens it through
     lepidus.js. Click "Open modal" in the preview to see the dialog. -->
<button class="lp-button lp-button--primary lp-button--md" data-lp-modal-open="url-modal">
  Open modal
</button>

<div class="lp-modal" id="url-modal" hidden>
  <div class="lp-modal__shell lp-modal__shell--lg" role="dialog" aria-modal="true"
       aria-labelledby="url-modal-title">
    <div class="lp-modal__header lp-modal__header--center">
      <h2 class="lp-modal__title" id="url-modal-title">Please Enter Site Collection URL</h2>
    </div>
    <div class="lp-modal__body">
      <div class="lp-modal__fields">
        <label class="lp-modal__field-label" for="url-input">Site Collection:</label>
        <div class="lp-input lp-input--full-width">
          <div class="lp-input__field">
            <input class="lp-input__input" id="url-input" value="\\192.14.35.335" data-lp-autofocus />
          </div>
        </div>
      </div>
    </div>
    <div class="lp-modal__footer">
      <button class="lp-button lp-button--secondary lp-button--md" data-lp-modal-close>Cancel</button>
      <button class="lp-button lp-button--primary lp-button--md" data-lp-modal-close>Done</button>
    </div>
  </div>
</div>
```

React:

```jsx
import { Modal } from '@ramsarjal-404/react';

{/* open defaults to true — render conditionally in production (see the trigger example) */}
<Modal
  size="lg"
  title="Please Enter Site Collection URL"
  fields={[
    {
      label: 'Site Collection:',
      defaultValue: '\\\\192.14.35.335',
      helperText: 'Please enter Site collection URL',
    },
  ]}
  primaryAction={{ label: 'Done', onClick: submit }}
  secondaryAction={{ label: 'Cancel' }}
  onClose={close}
/>
```

##### Trigger and wiring

The production pattern: a button opens the hidden modal; Save/Cancel close it. Mark the
field that should receive focus with `data-lp-autofocus` (otherwise the first focusable
element is used).

**Example — data-lp-modal-open / data-lp-modal-close wiring**

Plain HTML (canonical):

```html
<!-- Requires lepidus.js: the trigger opens the modal by id; Escape, backdrop
     clicks and [data-lp-modal-close] close it; focus is trapped and restored. -->
<button class="lp-button lp-button--primary lp-button--md" data-lp-modal-open="add-server-modal">
  Open modal
</button>

<div class="lp-modal" id="add-server-modal" hidden>
  <div class="lp-modal__shell lp-modal__shell--sm" role="dialog" aria-modal="true"
       aria-labelledby="add-server-title">
    <div class="lp-modal__header lp-modal__header--center">
      <h2 class="lp-modal__title" id="add-server-title">Add file server</h2>
    </div>
    <div class="lp-modal__body">
      <div class="lp-modal__fields">
        <label class="lp-modal__field-label" for="server-name">Name</label>
        <div class="lp-input lp-input--full-width">
          <div class="lp-input__field">
            <input class="lp-input__input" id="server-name" placeholder="e.g. LDSP-FS-04" data-lp-autofocus />
          </div>
        </div>
        <label class="lp-modal__field-label" for="server-host">Host</label>
        <div class="lp-input lp-input--full-width">
          <div class="lp-input__field">
            <input class="lp-input__input" id="server-host" placeholder="10.0.0.12" />
          </div>
        </div>
      </div>
    </div>
    <div class="lp-modal__footer">
      <button class="lp-button lp-button--secondary lp-button--md" data-lp-modal-close>Cancel</button>
      <button class="lp-button lp-button--primary lp-button--md" data-lp-modal-close>Save</button>
    </div>
  </div>
</div>
```

React:

```jsx
import { useState } from 'react';
import { Modal, Button } from '@ramsarjal-404/react';

function AddServer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={open}
        size="lg"
        title="Please Enter Site Collection URL"
        fields={[
          {
            label: 'Site Collection:',
            defaultValue: '\\\\192.14.35.335',
            helperText: 'Please enter Site collection URL',
          },
        ]}
        onClose={() => setOpen(false)}
        primaryAction={{ label: 'Done', onClick: () => setOpen(false) }}
        secondaryAction={{ label: 'Cancel' }} // no onClick → falls back to onClose
      />
    </>
  );
}
```

> **Requires lepidus.js** — The trigger wiring, Escape handling, backdrop click, focus trap and focus restore live in `lepidus.js` — include it once before ``: ``. It also exposes `Lepidus.openModal(id)` and `Lepidus.closeModal()` for programmatic control. See [Get Started](https://lepide-design-system.vercel.app/get-started/).

##### Multiple fields

**Example — A credentials form from field rows**

Plain HTML (canonical):

```html
<!-- The label column auto-sizes to the widest label; every input stays aligned.
     The modal keeps `hidden`; click "Add credentials" in the preview to open it. -->
<button class="lp-button lp-button--primary lp-button--md" data-lp-modal-open="credentials-modal">
  Add credentials
</button>

<div class="lp-modal" id="credentials-modal" hidden>
  <div class="lp-modal__shell lp-modal__shell--lg" role="dialog" aria-modal="true"
       aria-labelledby="credentials-title">
    <div class="lp-modal__header lp-modal__header--center">
      <h2 class="lp-modal__title" id="credentials-title">Add Credentials</h2>
    </div>
    <div class="lp-modal__body">
      <div class="lp-modal__fields">
        <label class="lp-modal__field-label" for="cred-domain">Domain:</label>
        <div class="lp-input lp-input--full-width">
          <div class="lp-input__field">
            <input class="lp-input__input" id="cred-domain" placeholder="mycompany.local" data-lp-autofocus />
          </div>
        </div>
        <label class="lp-modal__field-label" for="cred-user">Username:</label>
        <div class="lp-input lp-input--full-width">
          <div class="lp-input__field">
            <input class="lp-input__input" id="cred-user" placeholder="username@domainname" />
          </div>
        </div>
        <label class="lp-modal__field-label" for="cred-pass">Password:</label>
        <div class="lp-input lp-input--full-width">
          <div class="lp-input__field">
            <input class="lp-input__input" id="cred-pass" type="password" placeholder="••••••••" />
          </div>
        </div>
      </div>
    </div>
    <div class="lp-modal__footer">
      <button class="lp-button lp-button--secondary lp-button--md" data-lp-modal-close>Cancel</button>
      <button class="lp-button lp-button--primary lp-button--md" data-lp-modal-close>Save</button>
    </div>
  </div>
</div>
```

React:

```jsx
import { Modal } from '@ramsarjal-404/react';

{/* Each row supports the full Input API — type, placeholder, status, errorMessage, helperText… */}
<Modal
  size="lg"
  title="Add Credentials"
  fields={[
    { label: 'Domain:', placeholder: 'mycompany.local' },
    { label: 'Username:', placeholder: 'username@domainname' },
    { label: 'Password:', type: 'password', placeholder: '••••••••' },
    { label: 'Confirm:', type: 'password', placeholder: '••••••••' },
  ]}
  primaryAction={{ label: 'Save', onClick: save }}
  secondaryAction={{ label: 'Cancel' }}
  onClose={close}
/>
```

##### Inline (no overlay)

`lp-modal__shell--inline` / `overlay={false}` embeds the shell in the page flow — no
backdrop, no focus trap. Useful for docs canvases and wizard-style embedded panels.

**Example — Embedded shell without a backdrop**

Plain HTML (canonical):

```html
<!-- No backdrop: the shell sits in the page flow. No aria-modal, no focus trap. -->
<div class="lp-modal__shell lp-modal__shell--md lp-modal__shell--inline" role="dialog"
     aria-labelledby="rename-title">
  <div class="lp-modal__header lp-modal__header--left">
    <h2 class="lp-modal__title" id="rename-title">Rename Item</h2>
  </div>
  <div class="lp-modal__body">
    <div class="lp-modal__fields">
      <label class="lp-modal__field-label" for="rename-input">Name:</label>
      <div class="lp-input lp-input--full-width">
        <div class="lp-input__field">
          <input class="lp-input__input" id="rename-input" value="Q3 Permission Report" />
        </div>
      </div>
    </div>
  </div>
  <div class="lp-modal__footer">
    <button class="lp-button lp-button--secondary lp-button--md">Cancel</button>
    <button class="lp-button lp-button--primary lp-button--md">Rename</button>
  </div>
</div>
```

React:

```jsx
import { Modal } from '@ramsarjal-404/react';

{/* overlay={false} embeds the shell inline — no backdrop, no focus trap, no aria-modal */}
<Modal
  overlay={false}
  size="md"
  headerAlign="left"
  title="Rename Item"
  fields={[{ label: 'Name:', defaultValue: 'Q3 Permission Report' }]}
  primaryAction={{ label: 'Rename', onClick: rename }}
  secondaryAction={{ label: 'Cancel', onClick: cancel }}
/>
```

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Custom body content — rendered after any `fields`. |
| `closeOnEsc` | `boolean` | `true` | Close on the Escape key. Default true. |
| `closeOnOverlayClick` | `boolean` | `true` | Close when the backdrop is clicked. Default true. |
| `fields` | `ModalField[]` | — | Declarative list of inputs rendered in the body (supports multiple). |
| `headerAlign` | `enum` | `center` | Title alignment — `center` (Figma default) or `left`. |
| `onClose` | `(() => void)` | — | Close handler — fired by the backdrop, Esc and the secondary/Cancel action. |
| `open` | `boolean` | `true` | Visibility — when false the modal renders nothing. Default true. |
| `overlay` | `boolean` | `true` | Render the dimmed backdrop + center on screen. Set false to embed inline. Default true. |
| `primaryAction` | `ModalAction` | — | Primary (filled) footer action. |
| `secondaryAction` | `ModalAction` | — | Secondary (outline) footer action — defaults to firing `onClose`. |
| `size` | `enum` | `md` | Width preset — sm (520) · md (680) · lg (743, Figma). Default md. |
| `title` | `ReactNode` | — | Header title (brand-colored bar). Omit to hide the header. |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Clicking the dimmed backdrop (the area outside the shell) fires `onClose`
  (`closeOnOverlayClick`, default on). Clicks inside the shell never close the dialog.
- The footer Buttons are standard Lepidus Buttons with full hover/active behavior.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Escape` | Closes the dialog via `onClose` (`closeOnEsc`, overlay mode only) |
| `Tab` / `Shift+Tab` | Cycle through focusable elements **inside** the dialog — the trap wraps from last to first and back |
| `Enter` / `Space` | Activate the focused Button (native behavior) |

Focus management in overlay mode (React `FocusTrap` primitive / `lepidus.js`):

- **On open** — focus moves to the first focusable element in the dialog (plain HTML: the
  element marked `data-lp-autofocus`, else the first focusable; React: the first focusable,
  else the shell itself).
- **While open** — Tab and Shift+Tab cycle within the dialog; focus cannot leave.
- **On close** — focus returns to the element that opened the dialog.

Inline mode (`overlay={false}` / `lp-modal__shell--inline`) has no trap and no Escape
handling — it is ordinary page content.

**Screen readers**

- The shell renders `role="dialog"` with `aria-modal="true"` while the overlay is shown,
  and `aria-labelledby` pointing at the title (React generates the id with `useId`; in
  plain HTML give the title an `id` and reference it).
- `aria-modal` is omitted in inline mode — an embedded shell is not modal.
- Every `fields` row renders a real `<label htmlFor>` bound to its Input id, so each field
  announces its label.
- In plain HTML, `lepidus.js` additionally sets `inert` on the page content behind the
  dialog, so screen-reader virtual cursors cannot wander out (keyboard focus is trapped
  either way).

##### Development considerations

- Always provide a `title` in overlay mode — without it the dialog has no accessible name.
- Keep an obvious exit: if you disable Escape and backdrop close, the Cancel action is the
  only way out — never remove all three.
- Render the Modal conditionally (`open`) rather than permanently mounted and hidden, so
  focus restore targets the real trigger.
- In plain HTML, put the dialog markup directly under `<body>` (as in the demo) so the
  `inert` treatment of sibling content works cleanly.

##### Content

- Title the dialog with the task: "Please Enter Site Collection URL", "Add Credentials",
  "Rename Item".
- Primary action labels are verbs that finish the task ("Done", "Save", "Rename"); the
  secondary is "Cancel".
- Use field `helperText` for format hints and `errorMessage` for what to fix — not the
  dialog title.

#### Hard-fail checks — Modal

- [ ] **Every `lp-modal` on a real page carries `hidden` and is opened by `data-lp-modal-open="<id>"` or `Lepidus.openModal(id)`. Never place an un-hidden modal in a page.** _(observed drift: a copied example without `hidden` is a fixed overlay that covers the whole screen on load.)_
- [ ] **Do not write click/keyboard handlers for `.lp-dropdown__trigger`, `.lp-dropdown__option`, `.lp-accordion__trigger`, `.lp-stepper__control`, `.lp-tabs__tab` or `[data-lp-modal-open]` — `lepidus.js` already owns open/close, selection, ARIA sync and Escape. Listen to `lp-dropdown-change` on the wrapper (or `change` on the stepper input) to read values.** _(observed drift: a composed form added its own dropdown controller; both handlers fired per click and the panel toggled closed again — the dropdown never opened.)_
- [ ] **Page CSS never targets `.lp-*` selectors — no `.lp-dropdown { width: 100% }`, no `.lp-stepper { max-width }`, no `.footer-actions .lp-button { flex: 1 }`, no media-query overrides of `.lp-input__row--label-left`. The width you want already exists as a modifier: `lp-dropdown--full-width`, `lp-stepper--full-width`, `lp-input--full-width`, `lp-textarea--full-width`, `lp-text-field--full-width`, `lp-button--full-width`. For narrow containers choose `lp-input__row--label-top` instead of overriding `--label-left`.** _(observed drift: a composed form shipped 8 such rules; they bypass the token geometry and drift from Storybook in every theme.)_
- [ ] Every `lp-modal*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>`, `<input>`, `<label>` — no `div` stand-ins.
- [ ] Hooks present: `data-lp-autofocus`, `data-lp-modal-close`, `data-lp-modal-open` — and `lepidus.js` is included on the page.
- [ ] Roles present where the anatomy has them: `role="dialog"`.
- [ ] ARIA state kept and updated: `aria-labelledby`, `aria-modal`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="skeleton"></a>

### Skeleton

Loading placeholder that mirrors the shape of incoming content — shimmering text lines, circles and rects that hold the layout steady.

- **Availability:** plain CSS (block `lp-skeleton`) + React
- **React:** `import { Skeleton } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/skeleton/ · **Storybook:** [Text](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-skeleton--text), [Paragraph](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-skeleton--paragraph), [Circle](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-skeleton--circle), [Rect](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-skeleton--rect), [Card Skeleton](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-skeleton--card-skeleton), [All Variants](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-skeleton--all-variants)
- **Related:** [spinner](#spinner), [progress](#progress), [card](#card), [table](#table)

#### Legal class set (complete — do not invent others)

`lp-skeleton` · `lp-skeleton--circle` · `lp-skeleton--rect` · `lp-skeleton--text` · `lp-skeleton-paragraph` · `lp-skeleton-paragraph__last-line`

#### Hooks and semantics the canonical markup relies on

- **ARIA attributes:** `aria-busy`, `aria-hidden`

#### Purpose and usage rules

##### Overview

Skeleton holds the layout steady while data loads, replacing layout shifts with
shape-matched gray blocks: `text` lines, a `circle` for avatars and icons, a `rect` for
images and cards. A subtle shimmer sweeps across each block; under
`prefers-reduced-motion` it degrades to a static fill. Compose several skeletons to sketch
the real layout. Skeletons are pure decoration — each renders `aria-hidden="true"`; the
loading state belongs on the container (`aria-busy="true"`).

##### Best practices

- **Match shapes and sizes to the real content** so nothing jumps when it arrives.
- Swap skeletons for content **all at once per region** — partial swaps look broken.
- Use Skeleton when you know the shape of what's coming and it takes more than ~300ms.
- Set `aria-busy="true"` on the loading container and clear it when content arrives.

##### When not to use

- **Sub-300ms loads** — the flash is worse than the wait; show nothing.
- **Action feedback** (saving, submitting, refreshing) — use
  [Spinner](https://lepide-design-system.vercel.app/components/spinner/); the incoming "content" has no shape.
- **Measurable progress** — use [Progress](https://lepide-design-system.vercel.app/components/progress/).
- **Permanently empty regions** — use [EmptyState](https://lepide-design-system.vercel.app/components/empty-state/); Skeleton
  promises content is coming.

##### Variants

**Text**

A rounded line matching body text. With `lines` greater than 1 it stacks into a paragraph,
the last line cut to 60% width.

▶ Live: [Single text line](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-skeleton--text)

▶ Live: [lines={3} — the last line reads as a paragraph end](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-skeleton--paragraph)

**Circle**

Avatar/icon placeholder — `height` defaults to `width`.

▶ Live: [40px circle](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-skeleton--circle)

**Rect**

Image/card-media placeholder with `--radius-sm` corners.

▶ Live: [320×160 rect](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-skeleton--rect)

**Composition**

Sketch the real layout — here a Card while it loads: avatar, title pair, media block, body
lines. Note `aria-busy="true"` on the container.

▶ Live: [CardSkeleton composition](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-skeleton--card-skeleton)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Block | Base fill `--color-background-subtle` with a `--color-background-surface` shimmer sweeping left to right |
| 2 | Text variant | Rounded 14px line, `--radius-xs` corners |
| 3 | Circle variant | `--radius-circle`, 40px default, height = width |
| 4 | Rect variant | `--radius-sm` corners, free-size |
| 5 | Paragraph wrapper | `lines > 1` stacks text lines with an 8px gap; last line at 60% width |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Shimmer | Gradient sweep, ~1.9s per cycle (`--duration-slow` × 8, `--easing-standard`) |
| Reduced motion | Under `prefers-reduced-motion` the shimmer is replaced by a static fill |
| Sizing | `width`/`height` — numbers are px, strings pass through (`'100%'`, `'12rem'`) |
| Accessibility | Every block renders `aria-hidden="true"` — loading is conveyed by the container's `aria-busy` |
| Theming | Base and highlight fills re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Mirror the incoming layout — a circle for the avatar, a rect for the chart, text lines for the copy — and swap it out in one go.
- ✕ **Don't** — Show a skeleton for a 100ms fetch, or leave half a region skeletal while the other half has loaded.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. Block `lp-skeleton` + one shape modifier; size with inline `width`/`height` (React:
the `width`/`height` props, numbers as px).

##### Shapes

**Example — text / circle / rect**

Plain HTML (canonical):

```html
<div style="display: flex; flex-direction: column; gap: 24px; width: 320px;" aria-busy="true">
  <span class="lp-skeleton lp-skeleton--text" aria-hidden="true"></span>
  <span class="lp-skeleton lp-skeleton--circle" aria-hidden="true"></span>
  <span class="lp-skeleton lp-skeleton--rect" style="height: 96px;" aria-hidden="true"></span>
</div>
```

React:

```jsx
import { Skeleton } from '@ramsarjal-404/react';

<div aria-busy="true" style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
  <Skeleton variant="text" />
  <Skeleton variant="circle" width={40} />
  <Skeleton variant="rect" height={96} />
</div>
```

##### Paragraph

Stack `--text` bars in a `lp-skeleton-paragraph` wrapper, adding
`lp-skeleton-paragraph__last-line` to the final one (React: `lines={3}`).

**Example — Multi-line text block**

Plain HTML (canonical):

```html
<div class="lp-skeleton-paragraph" style="width: 320px;" aria-hidden="true">
  <span class="lp-skeleton lp-skeleton--text"></span>
  <span class="lp-skeleton lp-skeleton--text"></span>
  <span class="lp-skeleton lp-skeleton--text lp-skeleton-paragraph__last-line"></span>
</div>
```

React:

```jsx
import { Skeleton } from '@ramsarjal-404/react';

{/* lines={3} stacks text lines; the last is cut to 60% so it reads as a paragraph */}
<Skeleton variant="text" lines={3} width={320} />
```

##### Card composition

Sketch the layout of the real content. The skeletons are `aria-hidden`; the container
carries `aria-busy="true"`.

**Example — Card while it loads**

Plain HTML (canonical):

```html
<div aria-busy="true"
     style="width: 320px; padding: 16px; border: 1px solid var(--color-border-default, #c7c7c7);
            border-radius: var(--radius-md, 10px); background: var(--color-background-surface, #fff);
            display: flex; flex-direction: column; gap: 12px;">
  <div style="display: flex; align-items: center; gap: 12px;">
    <span class="lp-skeleton lp-skeleton--circle"></span>
    <div class="lp-skeleton-paragraph" style="flex: 1;">
      <span class="lp-skeleton lp-skeleton--text" style="width: 70%;"></span>
      <span class="lp-skeleton lp-skeleton--text" style="width: 40%; height: 10px;"></span>
    </div>
  </div>
  <span class="lp-skeleton lp-skeleton--rect" style="height: 140px;"></span>
  <div class="lp-skeleton-paragraph">
    <span class="lp-skeleton lp-skeleton--text"></span>
    <span class="lp-skeleton lp-skeleton--text lp-skeleton-paragraph__last-line"></span>
  </div>
</div>
```

React:

```jsx
import { Skeleton } from '@ramsarjal-404/react';

{/* aria-busy on the container — the skeletons themselves are aria-hidden */}
<div
  aria-busy="true"
  style={{
    width: 320,
    padding: 'var(--space-8)',
    border: '1px solid var(--color-border-default)',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-background-surface)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-6)',
  }}
>
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
    <Skeleton variant="circle" width={40} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="40%" height={10} />
    </div>
  </div>
  <Skeleton variant="rect" height={140} />
  <Skeleton variant="text" lines={2} />
</div>
```

> **Pure CSS — no lepidus.js needed** — The shimmer is a CSS animation; one `` is enough — see [Get Started](https://lepide-design-system.vercel.app/get-started/). It respects `prefers-reduced-motion` automatically.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Extra class on the root element. |
| `height` | `string \| number` | — | Height — a number is treated as px, a string passes through. Circles default to `width`. |
| `lines` | `number` | `1` | For `variant="text"`: render this many stacked lines, the last one cut to 60% width so the block reads as a paragraph. Default 1. |
| `variant` | `enum` | `text` | Shape of the placeholder — `text` (rounded line matching body text), `circle` (avatar/icon) or `rect` (image/card block). Default `text`. |
| `width` | `string \| number` | — | Width — a number is treated as px, a string passes through (`'100%'`, `'12rem'`). |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Skeletons are inert decoration — no hover, click or focus behavior. The cursor stays
  default over them.

**Keyboard**

- Nothing to interact with: skeletons are never focusable and never appear in the tab
  order. Keyboard users tab straight past a loading region.

**Screen readers**

- Each skeleton renders `aria-hidden="true"` and exposes **nothing** to assistive tech —
  no role, no announcement.
- Communicate loading on the **container** instead: set `aria-busy="true"` while skeletons
  show, and clear it when content arrives.
- For long loads, announce status with a polite live region — or place a
  [Spinner](https://lepide-design-system.vercel.app/components/spinner/) (`role="status"`) alongside, which announces its hidden
  label automatically.

##### Development considerations

- Don't put critical information inside a skeleton region without an announcement path —
  a screen-reader user who tabs through during loading hears nothing at all.
- Keep `aria-busy` accurate: stale `aria-busy="true"` after content arrives tells assistive
  tech the region is still pending.
- Don't stack a Spinner on top of skeleton placeholders — pick one loading signal per
  region.
- The shimmer respects `prefers-reduced-motion: reduce` out of the box (static fill); don't
  re-add motion with custom CSS.

##### Content

- Skeletons carry no text — there is nothing to localize or announce in the blocks
  themselves.
- If you add a visible loading caption near the region, mirror it in the live-region
  announcement ("Loading reports…"), and keep it specific to the region.

#### Hard-fail checks — Skeleton

- [ ] Every `lp-skeleton*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] ARIA state kept and updated: `aria-busy`, `aria-hidden`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="spinner"></a>

### Spinner

Indeterminate loading indicator — a brand-blue arc rotating over a subtle track, announced to screen readers via a hidden label.

- **Availability:** plain CSS (block `lp-spinner`) + React
- **React:** `import { Spinner } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/spinner/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-spinner--default), [Sizes](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-spinner--sizes), [In Button](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-spinner--in-button), [Inline](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-spinner--inline)
- **Related:** [skeleton](#skeleton), [progress](#progress), [button](#button)

#### Legal class set (complete — do not invent others)

`lp-spinner` · `lp-spinner--lg` · `lp-spinner--md` · `lp-spinner--sm` · `lp-spinner__arc` · `lp-spinner__svg` · `lp-spinner__track` · `lp-spinner__visually-hidden`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`
- **Roles:** `role="status"`
- **ARIA attributes:** `aria-hidden`

#### Purpose and usage rules

##### Overview

Spinner signals an **indeterminate wait with no known shape**: submitting a form,
refreshing a table, a button working. A brand-blue SVG arc rotates over a subtle gray
track; the root renders `role="status"` with a visually hidden label ("Loading…" by
default), so screen readers announce the wait with no extra wiring. Under
`prefers-reduced-motion` the rotation is replaced by a slow opacity pulse — the indicator
never goes fully static while loading.

##### Best practices

- Use `size="sm"` (16px) inside Buttons and inline with text; `md` (24px) is the default;
  reserve `lg` (32px) for empty page regions.
- Keep the spinner visible until the action **genuinely completes** — don't hide it
  optimistically.
- Make the hidden `label` specific when context helps: `label="Saving changes…"`.
- One announced spinner per region is enough.

##### When not to use

- **Known content shape** — if you know what's coming (a card, a table, a paragraph), use
  [Skeleton](https://lepide-design-system.vercel.app/components/skeleton/); it holds the layout steady.
- **Measurable progress** — use [Progress](https://lepide-design-system.vercel.app/components/progress/) when you can show a
  percentage.
- **Permanently empty regions** — use [EmptyState](https://lepide-design-system.vercel.app/components/empty-state/).

##### Variants

**Sizes**

Three diameters: sm 16px, md 24px (default), lg 32px.

▶ Live: [sm / md / lg](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-spinner--sizes)

**In a Button**

Composed with a disabled Button via its `iconLeft` slot — the canonical "working"
affordance while a submit is in flight.

▶ Live: [Saving… with a sm spinner in the icon slot](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-spinner--in-button)

**Inline with text**

`size="sm"` next to body copy; the visible text mirrors the hidden label.

▶ Live: [Refreshing results…](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-spinner--inline)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Track | Full circle, `--color-background-subtle`, 3px stroke |
| 2 | Arc | ~28% of the circumference, `--color-brand-primary`, round caps, rotating |
| 3 | Hidden label | Visually hidden span (clip-rect) inside the `role="status"` root — the announcement |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Rotation | Continuous, ~1s per turn (`--duration-slow` × 4, linear) |
| Reduced motion | Rotation stops; the arc pulses opacity slowly instead (`--opacity-disabled`) |
| Announcement | `role="status"` is an implicit polite live region — the hidden label is announced when the spinner appears |
| Sizing | `sm` 16px / `md` 24px / `lg` 32px — fixed diameters, no free sizing |
| Theming | Arc and track colors re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Give the spinner a specific hidden label — “Saving changes…” — and keep it visible until the work is done.
- ✕ **Don't** — Render several labelled spinners side by side, or use a spinner when the incoming layout is known — that's Skeleton.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The markup carries its own accessibility: `role="status"` on the root, `aria-hidden`
on the SVG, and a visually hidden label span.

##### Basic

**Example — Default (md, 24px)**

Plain HTML (canonical):

```html
<span class="lp-spinner lp-spinner--md" role="status">
  <svg class="lp-spinner__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle class="lp-spinner__track" cx="12" cy="12" r="10" stroke-width="3"/>
    <circle class="lp-spinner__arc" cx="12" cy="12" r="10" stroke-width="3"
            stroke-linecap="round" path-length="100" stroke-dasharray="28 72"/>
  </svg>
  <span class="lp-spinner__visually-hidden">Loading…</span>
</span>
```

React:

```jsx
import { Spinner } from '@ramsarjal-404/react';

<Spinner />
```

##### Sizes

**Example — sm / md / lg**

Plain HTML (canonical):

```html
<div style="display: flex; align-items: center; gap: 24px;">
  <span class="lp-spinner lp-spinner--sm" role="status">
    <svg class="lp-spinner__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle class="lp-spinner__track" cx="12" cy="12" r="10" stroke-width="3"/>
      <circle class="lp-spinner__arc" cx="12" cy="12" r="10" stroke-width="3"
              stroke-linecap="round" path-length="100" stroke-dasharray="28 72"/>
    </svg>
    <span class="lp-spinner__visually-hidden">Loading (small)</span>
  </span>
  <span class="lp-spinner lp-spinner--md" role="status">
    <svg class="lp-spinner__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle class="lp-spinner__track" cx="12" cy="12" r="10" stroke-width="3"/>
      <circle class="lp-spinner__arc" cx="12" cy="12" r="10" stroke-width="3"
              stroke-linecap="round" path-length="100" stroke-dasharray="28 72"/>
    </svg>
    <span class="lp-spinner__visually-hidden">Loading (medium)</span>
  </span>
  <span class="lp-spinner lp-spinner--lg" role="status">
    <svg class="lp-spinner__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle class="lp-spinner__track" cx="12" cy="12" r="10" stroke-width="3"/>
      <circle class="lp-spinner__arc" cx="12" cy="12" r="10" stroke-width="3"
              stroke-linecap="round" path-length="100" stroke-dasharray="28 72"/>
    </svg>
    <span class="lp-spinner__visually-hidden">Loading (large)</span>
  </span>
</div>
```

React:

```jsx
import { Spinner } from '@ramsarjal-404/react';

<>
  <Spinner size="sm" label="Loading (small)" />
  <Spinner size="md" label="Loading (medium)" />
  <Spinner size="lg" label="Loading (large)" />
</>
```

##### In a Button

A `sm` spinner in the Button's icon slot while the action is in flight — disable the
button so it can't be re-submitted.

**Example — Working button**

Plain HTML (canonical):

```html
<button class="lp-button lp-button--primary lp-button--md" disabled>
  <span class="lp-button__icon-left">
    <span class="lp-spinner lp-spinner--sm" role="status">
      <svg class="lp-spinner__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle class="lp-spinner__track" cx="12" cy="12" r="10" stroke-width="3"/>
        <circle class="lp-spinner__arc" cx="12" cy="12" r="10" stroke-width="3"
                stroke-linecap="round" path-length="100" stroke-dasharray="28 72"/>
      </svg>
      <span class="lp-spinner__visually-hidden">Saving</span>
    </span>
  </span>
  Saving…
</button>
```

React:

```jsx
import { Button, Spinner } from '@ramsarjal-404/react';

<Button variant="primary" disabled iconLeft={<Spinner size="sm" label="Saving" />}>
  Saving…
</Button>
```

> **Pure CSS — no lepidus.js needed** — The rotation is a CSS animation; one `` is enough — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Under `prefers-reduced-motion` it falls back to a slow opacity pulse automatically.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Extra class on the root element. |
| `label` | `string` | `Loading…` | Accessible label announced by screen readers via a visually hidden span inside the `role="status"` root. Default "Loading…". |
| `size` | `enum` | `md` | Diameter — sm (16px, inline/buttons), md (24px, default) or lg (32px, page regions). |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Spinner is inert — no hover, click or focus behavior of its own. Inside a Button, the
  Button (usually disabled while working) owns the interaction.

**Keyboard**

- Nothing to operate: the spinner is never focusable and never appears in the tab order.
- When a spinner replaces a Button's idle state, disable the Button so keyboard users can't
  double-submit — the native `disabled` attribute also removes it from the tab order.

**Screen readers**

- The root renders `role="status"` — an implicit **polite** live region. When the spinner
  appears, its visually hidden label ("Loading…" by default) is announced without
  interrupting the current task.
- The SVG itself is `aria-hidden="true"`; only the hidden text is exposed.
- Customize the label per context: `label="Saving changes…"` (React) or edit the
  `lp-spinner__visually-hidden` span (HTML).

##### Development considerations

- One announcement per region: don't render several labelled spinners side by side — pick
  one, or give the extras an empty label.
- Don't stack a Spinner on top of [Skeleton](https://lepide-design-system.vercel.app/components/skeleton/) placeholders; choose
  one loading signal per region.
- Keep the spinner mounted until the work completes — removing and re-adding it re-fires
  the announcement.
- Pair an inline spinner with visible text that mirrors the hidden label, so sighted users
  and screen-reader users get the same information.

##### Content

- Labels name the work, not the control: "Loading…", "Saving changes…", "Refreshing
  results" — never "spinner" or "please wait" alone.
- Keep labels short; they are announced verbatim each time the spinner mounts.

#### Hard-fail checks — Spinner

- [ ] Every `lp-spinner*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] Roles present where the anatomy has them: `role="status"`.
- [ ] ARIA state kept and updated: `aria-hidden`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="toast"></a>

### Toast

Compact transient notification pill — circular status badge, bold title, one-line message and close button on a white-to-accent gradient.

- **Availability:** plain CSS (block `lp-toast`) + React
- **React:** `import { Toast } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/toast/ · **Storybook:** [Info](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast--info), [Success](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast--success), [Warning](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast--warning), [Error](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast--error), [All Variants](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast--all-variants)
- **Related:** [toast-provider](#toast-provider), [message](#message), [alert-panel](#alert-panel)

#### Legal class set (complete — do not invent others)

`lp-toast` · `lp-toast--error` · `lp-toast--success` · `lp-toast--warning` · `lp-toast__badge` · `lp-toast__body` · `lp-toast__close` · `lp-toast__content` · `lp-toast__title`

#### Hooks and semantics the canonical markup relies on

- **JS API:** `Lepidus.toast`
- **Native elements (keep them native):** `<button>`
- **Roles:** `role="status"`
- **ARIA attributes:** `aria-hidden`, `aria-label`, `aria-live`

#### Purpose and usage rules

##### Overview

Toast is the Lepidus surface for **lightweight, passive notifications**: "saved", "session
expiring", "credentials failed". It is a self-contained pill — circular status badge, bold
title, one-line message and close button on a white-to-accent gradient — that typically
appears in a corner, lives for a few seconds and never blocks the user. The pill itself
renders `role="status"` with `aria-live="polite"`.

Toast is the lightest of the three feedback weights: **Toast** (transient) →
[Message](https://lepide-design-system.vercel.app/components/message/) (inline strip) → [AlertPanel](https://lepide-design-system.vercel.app/components/alert-panel/)
(standing announcement). Rule of thumb: **notify with Toast, interrupt with Message.**

The stacking, auto-dismiss timing and queueing live one level up: in React use
[ToastProvider](https://lepide-design-system.vercel.app/components/toast-provider/) and its `toast()` API; in plain HTML use
`Lepidus.toast(...)` from `lepidus.js`.

##### Best practices

- Keep copy to **one short sentence** — the pill is single-line by design.
- Provide `onClose` so keyboard users can dismiss the toast before any auto-timeout.
- Fire toasts through the provider/`Lepidus.toast` rather than hand-stacking pills, so
  queueing and live-region semantics stay intact.
- Allow enough reading time before auto-dismissing (the provider default is 6s).

##### When not to use

- **The user must read details or decide** — use [Message](https://lepide-design-system.vercel.app/components/message/): heading,
  multi-line body and primary/secondary actions.
- **Blocking errors** — polite live regions are easy to miss; failures that stop the
  workflow belong in a [Message](https://lepide-design-system.vercel.app/components/message/) or [Modal](https://lepide-design-system.vercel.app/components/modal/) flow.
- **Standing announcements** that should persist on the page — use
  [AlertPanel](https://lepide-design-system.vercel.app/components/alert-panel/).
- **Actions or links** — don't put them inside a Toast; if the user must act, it isn't a
  toast.

##### Types

**Info (default)**

Brand-blue accents with an "i" glyph — the Figma instance.

▶ Live: [Info — brand badge, border and gradient tail](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast--info)

**Success**

Green status accent with a check glyph — confirmations like saves.

▶ Live: [Success](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast--success)

**Warning**

Orange status accent with a "!" glyph — time-sensitive but non-blocking notices.

▶ Live: [Warning](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast--warning)

**Error**

Red status accent with a "!" glyph. For blocking failures that need user action, prefer
Message.

▶ Live: [Error](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast--error)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Pill | 69px-radius capsule, 1px accent border, white→accent gradient, drop shadow |
| 2 | Badge | 52px circle in the variant accent with a white glyph (check / "i" / "!") — hide with `icon={false}` or pass a custom node |
| 3 | Title | Bold 20px accent-colored heading (e.g. "Success !") |
| 4 | Message | 14px supporting line in the body color |
| 5 | Close button *(optional)* | × on the trailing edge, rendered only when `onClose` is set |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Announcement | `role="status"` + `aria-live="polite"` — announced without interrupting the current task |
| Auto-dismiss | Not built into the pill — owned by [ToastProvider](https://lepide-design-system.vercel.app/components/toast-provider/) (6s default, hover pauses) or `Lepidus.toast` (5s default, `duration: 0` persists) |
| Dismissible | Close button renders only when `onClose` is provided |
| Variants | `info` / `success` / `warning` / `error` swap the badge, border, gradient tail and title accent |
| Theming | All accents re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Notify with one short sentence and a close button: “Success ! your changes have been saved.”
- ✕ **Don't** — Put actions or links in a toast, or announce workflow-blocking errors there — polite live regions are easy to miss.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The pill is static markup; for stacking and auto-dismiss use `Lepidus.toast(...)`
(plain HTML) or [ToastProvider](https://lepide-design-system.vercel.app/components/toast-provider/) (React).

##### Basic pill

`lp-toast` defaults to the info accents — no modifier needed.

**Example — Info pill with badge, message and close**

Plain HTML (canonical):

```html
<div class="lp-toast" role="status" aria-live="polite">
  <span class="lp-toast__badge">
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="2" fill="currentColor"/>
      <rect x="12.5" y="11" width="3" height="11" rx="1.5" fill="currentColor"
            transform="rotate(180 14 16.5)"/>
    </svg>
  </span>
  <div class="lp-toast__content">
    <p class="lp-toast__title">Info !</p>
    <p class="lp-toast__body">provided credentials failed to authenticate.</p>
  </div>
  <button class="lp-toast__close" aria-label="Close notification">
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" aria-hidden="true"><path d="M3 3l12 12M15 3 3 15"/></svg>
  </button>
</div>
```

React:

```jsx
import { Toast } from '@ramsarjal-404/react';

<Toast variant="info" title="Info !" onClose={dismiss}>
  provided credentials failed to authenticate.
</Toast>
```

##### Variants

`lp-toast--success`, `lp-toast--warning`, `lp-toast--error` swap the accents.

**Example — success / warning / error**

Plain HTML (canonical):

```html
<div style="display: flex; flex-direction: column; gap: 16px; max-width: 460px;">
  <div class="lp-toast lp-toast--success" role="status" aria-live="polite">
    <span class="lp-toast__badge">
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M7 14.5 12 19.5 21 9" stroke="currentColor" stroke-width="3"
              stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    </span>
    <div class="lp-toast__content">
      <p class="lp-toast__title">Success !</p>
      <p class="lp-toast__body">your changes have been saved.</p>
    </div>
    <button class="lp-toast__close" aria-label="Close notification">
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" aria-hidden="true"><path d="M3 3l12 12M15 3 3 15"/></svg>
    </button>
  </div>

  <div class="lp-toast lp-toast--warning" role="status" aria-live="polite">
    <span class="lp-toast__badge">
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <rect x="12.5" y="5" width="3" height="12" rx="1.5" fill="currentColor"/>
        <circle cx="14" cy="21.5" r="2" fill="currentColor"/>
      </svg>
    </span>
    <div class="lp-toast__content">
      <p class="lp-toast__title">Warning !</p>
      <p class="lp-toast__body">your session is about to expire.</p>
    </div>
    <button class="lp-toast__close" aria-label="Close notification">
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" aria-hidden="true"><path d="M3 3l12 12M15 3 3 15"/></svg>
    </button>
  </div>

  <div class="lp-toast lp-toast--error" role="status" aria-live="polite">
    <span class="lp-toast__badge">
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <rect x="12.5" y="5" width="3" height="12" rx="1.5" fill="currentColor"/>
        <circle cx="14" cy="21.5" r="2" fill="currentColor"/>
      </svg>
    </span>
    <div class="lp-toast__content">
      <p class="lp-toast__title">Error !</p>
      <p class="lp-toast__body">provided credentials failed to authenticate.</p>
    </div>
    <button class="lp-toast__close" aria-label="Close notification">
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" aria-hidden="true"><path d="M3 3l12 12M15 3 3 15"/></svg>
    </button>
  </div>
</div>
```

React:

```jsx
import { Toast } from '@ramsarjal-404/react';

<>
  <Toast variant="success" title="Success !" onClose={dismiss}>
    your changes have been saved.
  </Toast>
  <Toast variant="warning" title="Warning !" onClose={dismiss}>
    your session is about to expire.
  </Toast>
  <Toast variant="error" title="Error !" onClose={dismiss}>
    provided credentials failed to authenticate.
  </Toast>
</>
```

##### Fired at runtime

`Lepidus.toast({ title, message, variant, duration })` builds the pill, stacks it in a
fixed top-right polite live region and auto-dismisses after 5s (`duration` overrides;
`0` persists until closed). It returns a function that dismisses the toast.

**Example — Lepidus.toast / useToast**

Plain HTML (canonical):

```html
<!-- Requires lepidus.js. Toasts stack top-right in one polite live region and
     auto-dismiss after 5s (duration overrides; 0 persists until closed). -->
<button class="lp-button lp-button--primary lp-button--md"
        onclick="Lepidus.toast({ title: 'Scan started', message: 'LDSP-FS-01 is being scanned.', variant: 'info' })">
  Show toast
</button>
<button class="lp-button lp-button--secondary lp-button--md"
        onclick="Lepidus.toast({ title: 'Scan complete', message: 'No violations found.', variant: 'success' })">
  Success toast
</button>
<button class="lp-button lp-button--secondary lp-button--md"
        onclick="Lepidus.toast({ title: 'Error !', message: 'Provided credentials failed to authenticate.', variant: 'error', duration: 0 })">
  Persistent error
</button>
```

React:

```jsx
import { Button, useToast } from '@ramsarjal-404/react';

{/* Inside a <ToastProvider> subtree — see /components/toast-provider/ */}
function ScanButton() {
  const { toast } = useToast();
  return (
    <Button
      variant="primary"
      onClick={() =>
        toast({ variant: 'info', title: 'Scan started', message: 'LDSP-FS-01 is being scanned.' })
      }
    >
      Show toast
    </Button>
  );
}
```

> **Requires lepidus.js** — Only the runtime API needs the script — include `` once before ``; static pills are pure CSS. See [Get Started](https://lepide-design-system.vercel.app/get-started/).

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Supporting message line. |
| `icon` | `ReactNode` | `true` | Show the leading circular badge icon. Pass a node to override the glyph. Default true. |
| `onClose` | `(() => void)` | — | When provided, renders a close (×) button wired to this handler. |
| `title` | `ReactNode` | — | Bold heading (e.g. "Info !"). |
| `variant` | `enum` | `info` | Status variant — defaults to `info`. |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The close × is the only interactive part of the pill; it's a real button with hover and
  focus styling.
- Inside [ToastProvider](https://lepide-design-system.vercel.app/components/toast-provider/), hovering a toast **pauses its
  auto-dismiss countdown** — slow readers don't lose the message mid-read.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus to / away from the close button (the pill's only focusable part) |
| `Enter` / `Space` | Activates the close button (native behavior) |

The pill adds no other keyboard handling. Always provide a close button on auto-dismissing
toasts so keyboard users can dismiss on their own schedule.

**Screen readers**

- The pill renders `role="status"` with `aria-live="polite"` — announced without
  interrupting the current task (unlike Message's assertive `role="alert"`).
- The badge and close glyphs are `aria-hidden` SVGs; the meaning must be carried by the
  title and message text, never by color alone.
- The close control is a real `<button type="button">` with `aria-label="Close"`
  (`"Close notification"` in the `lepidus.js` API) and a visible `:focus-visible` outline.
- `Lepidus.toast` and ToastProvider stack all pills inside **one** polite live region, so
  announcements queue cleanly.

##### Development considerations

- **Never put critical actions only in an auto-dismissing toast** — the user may miss it
  entirely; anything requiring a decision belongs in [Message](https://lepide-design-system.vercel.app/components/message/) or
  [Modal](https://lepide-design-system.vercel.app/components/modal/).
- Don't auto-dismiss faster than a user can read; keep the 5–6s defaults unless copy is
  very short, and use `duration: 0` for toasts the user must acknowledge.
- Polite announcements can be skipped when the screen reader is busy — pair an error toast
  with persistent inline state if the failure matters later.
- Don't stack many toasts manually; go through the provider/`Lepidus.toast` so queueing
  (max 5 visible in ToastProvider, FIFO) stays intact.

##### Content

- One short sentence, severity-appropriate: "your changes have been saved." (success),
  "your session is about to expire." (warning).
- The title carries the severity word ("Success !", "Warning !") — the message carries the
  fact.
- Don't bury instructions in a toast; it disappears. If the user must do something, say it
  somewhere persistent.

#### Hard-fail checks — Toast

- [ ] Every `lp-toast*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] Uses `Lepidus.toast` instead of a custom implementation.
- [ ] Roles present where the anatomy has them: `role="status"`.
- [ ] ARIA state kept and updated: `aria-hidden`, `aria-label`, `aria-live`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="toast-provider"></a>

### ToastProvider

React-only app-level manager for Toast — wrap your app once, then fire stacked, auto-dismissing notifications imperatively via useToast().

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { ToastProvider } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/toast-provider/ · **Storybook:** [Live Demo](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast-provider--live-demo), [Auto Dismiss](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast-provider--auto-dismiss)
- **Related:** [toast](#toast), [message](#message)

#### Purpose and usage rules

##### Overview

ToastProvider is the **React-only** host for the imperative `toast()` API. Wrap your
application once, then fire notifications from any descendant with the `useToast()` hook —
the provider owns the stacking, timing and queueing that the
[Toast](https://lepide-design-system.vercel.app/components/toast/) pill itself delegates to the host app. For the pill's visual
guidance (variants, anatomy, copy), see [Toast](https://lepide-design-system.vercel.app/components/toast/). In plain HTML the
equivalent is `Lepidus.toast(...)` from `lepidus.js`.

▶ Live: [Fire toasts imperatively — they stack top-right and queue beyond 5](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast-provider--live-demo)

##### Best practices

- Mount **exactly one** ToastProvider near the app root; `useToast()` throws outside the
  provider.
- Go through `toast(...)` rather than rendering your own `<Toast>` into the stack, so
  queueing and live-region semantics stay intact.
- Keep the default 6000ms unless copy is unusually long; use `duration: 0` for toasts the
  user must acknowledge.
- Don't fire a toast per keystroke-level event; batch or debounce noisy sources.

##### When not to use

- **Blocking feedback with actions** — use [Message](https://lepide-design-system.vercel.app/components/message/).
- **A single static inline status** — render [Toast](https://lepide-design-system.vercel.app/components/toast/) directly.
- **Plain HTML/JS products** — there is no `lp-` class for the provider; use
  `Lepidus.toast(...)` (see [Toast](https://lepide-design-system.vercel.app/components/toast/)).

##### Behaviors

| Behavior | Description |
| --- | --- |
| Stacking | Fixed top-right viewport (`--z-toast` layer) through the Portal primitive — one polite live region labelled "Notifications" |
| Auto-dismiss | 6000ms default; per-toast override via `toast({ duration })`; `0` persists until dismissed |
| Hover pause | The countdown pauses while a toast is hovered and resumes with the remaining time |
| Queueing | At most `max` (5) visible; further toasts queue FIFO and surface as earlier ones leave |
| Dismissal | Every toast gets a close button; `dismiss(id)` removes one programmatically |
| Motion | 180ms enter/exit using motion tokens; skipped under `prefers-reduced-motion` |

▶ Live: [Auto-dismiss with hover-pause](https://lepide-design-system.vercel.app/storybook/?path=/story/feedback-toast-provider--auto-dismiss)

- ✓ **Do** — Wrap the app once and fire everything through toast() — it returns an id you can pass to dismiss().
- ✕ **Don't** — Mount multiple providers or render <Toast> elements into the stack by hand.

#### Canonical anatomy and examples

ToastProvider is **React-only** — there is no `lp-` class; plain-HTML products use
`Lepidus.toast(...)` instead (see [Toast](https://lepide-design-system.vercel.app/components/toast/)). Wrap the app once, then
call `toast()` from anywhere.

##### Setup

**Example — Wrap the app once**

React:

```jsx
import { ToastProvider } from '@ramsarjal-404/react';

{/* Once, near the app root. duration: default auto-dismiss ms (6000);
    max: visible toasts before queueing (5). */}
<ToastProvider duration={6000} max={5}>
  <App />
</ToastProvider>
```

_React-only example — no plain-CSS rendition exists for this component yet._

##### Firing toasts

`toast(...)` accepts `variant`, `title`, `message`, `icon` and `duration`, and returns an
id for `dismiss(id)`.

**Example — useToast() from any descendant**

React:

```jsx
import { Button, useToast } from '@ramsarjal-404/react';

function ExportButton() {
  const { toast } = useToast();
  return (
    <Button
      variant="primary"
      onClick={() =>
        toast({ variant: 'success', title: 'Success !', message: 'Report exported to PDF.' })
      }
    >
      Export
    </Button>
  );
}
```

_React-only example — no plain-CSS rendition exists for this component yet._

##### Persistent and programmatic dismissal

`duration: 0` keeps a toast until it is dismissed — by its close button or by `dismiss(id)`
when the related work finishes.

**Example — duration: 0 + dismiss(id)**

React:

```jsx
import { useToast } from '@ramsarjal-404/react';

function useScanNotifications() {
  const { toast, dismiss } = useToast();

  async function runScan() {
    // duration: 0 → persists until dismissed (close button or dismiss(id))
    const id = toast({ variant: 'info', title: 'Scanning…', message: 'LDSP-FS-01', duration: 0 });
    try {
      await scan();
      toast({ variant: 'success', title: 'Success !', message: 'Scan complete.' });
    } finally {
      dismiss(id); // runs the exit animation, then removes the toast
    }
  }

  return runScan;
}
```

_React-only example — no plain-CSS rendition exists for this component yet._

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Application subtree that gains access to `useToast()`. |
| `duration` | `number` | `6000` | Default auto-dismiss timeout in ms (overridable per toast via `toast({ duration })`; `0` persists). Default 6000. |
| `max` | `number` | `5` | Maximum number of toasts visible at once; further toasts queue and surface as earlier ones leave. Default 5. |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Hovering any toast in the stack **pauses its auto-dismiss countdown**; moving away
  resumes it with the remaining time — slow readers don't lose the message mid-read.
- Each toast's close × dismisses it immediately.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Reaches each visible toast's close button in stacking order |
| `Enter` / `Space` | Activates the focused close button |

Every toast gets a close button wired to `dismiss`, so keyboard users can dismiss before
the timeout. The provider adds no focus stealing — firing a toast never moves focus.

**Screen readers**

- All toasts render inside **one polite live region**: the viewport is `role="region"`
  with `aria-live="polite"` and `aria-label="Notifications"` — announcements never
  interrupt the current task, and the region is a navigable landmark.
- Each pill keeps its own `role="status"` semantics (see
  [Toast](https://lepide-design-system.vercel.app/components/toast/)).
- Enter/exit animations are disabled under `prefers-reduced-motion: reduce`; removal is
  then immediate.

##### Development considerations

- **Don't put critical actions only in auto-dismissing toasts** — route decisions through
  [Message](https://lepide-design-system.vercel.app/components/message/) or [Modal](https://lepide-design-system.vercel.app/components/modal/), and use
  `duration: 0` when a toast must be acknowledged.
- Never auto-dismiss faster than a user can read; 6000ms is the floor for a full sentence.
- Keep messages self-contained text — actions and links belong in Message, not in the
  stack.
- One provider per app: nested providers create competing live regions and split queues.

##### Content

- Same rules as [Toast](https://lepide-design-system.vercel.app/components/toast/): one short, severity-appropriate sentence;
  title carries the severity ("Success !"), message carries the fact.
- Queued toasts announce when they surface — write each message to stand alone, in any
  order.

#### Hard-fail checks — ToastProvider

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

### Navigation

<a id="breadcrumb"></a>

### Breadcrumb

Trail navigation — brand-blue ancestor links separated by a bold slash, ending in a non-interactive current page marked aria-current.

- **Availability:** plain CSS (block `lp-breadcrumb`) + React
- **React:** `import { Breadcrumb } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/breadcrumb/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-breadcrumb--default), [Two Levels](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-breadcrumb--two-levels), [Button Crumbs](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-breadcrumb--button-crumbs), [RTL](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-breadcrumb--rtl)
- **Related:** [tabs](#tabs), [sidebar](#sidebar), [link](#link)

#### Legal class set (complete — do not invent others)

`lp-breadcrumb` · `lp-breadcrumb__current` · `lp-breadcrumb__item` · `lp-breadcrumb__link` · `lp-breadcrumb__list` · `lp-breadcrumb__separator`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<a>`, `<button>`, `<nav>`, `<ol>`
- **ARIA attributes:** `aria-current`, `aria-hidden`, `aria-label`

#### Purpose and usage rules

##### Overview

Breadcrumb shows where the user is and lets them jump back up the trail. Pass `items` in order:
every item except the last renders as a 14px semibold brand-blue link (an anchor with `href`, or
a button with `onClick` for router navigation) followed by a bold "/" separator in the same blue;
the last item is the current page — regular weight, `--color-text-primary`, not interactive, and
marked `aria-current="page"`. The whole trail is a semantic `<nav aria-label="Breadcrumb">`
wrapping an `<ol>`.

##### Best practices

- Keep the trail to what the user **actually descended** — typically 3–5 levels.
- Use `href` wherever a routable URL exists, so middle-click and copy-link work; reserve
  `onClick`-only crumbs for wizards and client-side routers.
- Place the breadcrumb at the top of the content area, above the page title, where users expect
  orientation.
- Shorten long labels in the text itself rather than truncating with CSS.

##### When not to use

- **Peer views of the same context** — use [Tabs](https://lepide-design-system.vercel.app/components/tabs/); a breadcrumb is strictly
  hierarchical ancestry.
- **Primary navigation** — use [Sidebar](https://lepide-design-system.vercel.app/components/sidebar/); breadcrumbs complement, never
  replace, the main nav.
- **Flat sites** one level deep — a single [Link](https://lepide-design-system.vercel.app/components/link/) back is clearer than a
  two-item trail.

##### Variants

**Default**

A four-level trail — three ancestor links and the current page.

▶ Live: [Default trail](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-breadcrumb--default)

**Two levels**

The minimum useful breadcrumb — one parent link and the current page.

▶ Live: [Two levels](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-breadcrumb--two-levels)

**Button crumbs**

Without `href`, crumbs render as buttons — for client-side router navigation or wizard steps.

▶ Live: [Button crumbs (router navigation)](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-breadcrumb--button-crumbs)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Nav landmark | `<nav aria-label="Breadcrumb">` wrapping the trail |
| 2 | List | `<ol>` — order conveys the hierarchy |
| 3 | Crumb link | 14px semibold brand-blue anchor (`href`) or button (`onClick`) |
| 4 | Separator | Bold "/" in the link blue, `aria-hidden` (customizable via `separator`) |
| 5 | Current page | Regular-weight `--color-text-primary` text with `aria-current="page"` — never a link |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Link rendering | `href` renders a real `<a>` (middle-click, copy-link work); `onClick` alone renders a `<button>` |
| Current page | The last item is always plain text with `aria-current="page"` — not clickable |
| Separator | Defaults to "/"; the `separator` prop accepts any `ReactNode` |
| RTL | Crumbs flow right-to-left under `dir="rtl"`; the 10px crumb gap uses logical margins |
| Theming | Link and current-page colors re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Use href for every crumb that has a routable URL — real anchors keep browser behaviors.
- ✕ **Don't** — Make the current page a link to itself, or pad the trail with levels the user never visited.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical form.
The React rendition (`@ramsarjal-404/react`) generates the same `<nav>` + `<ol>` markup from an `items`
array. Breadcrumb is pure CSS — no `lepidus.js` needed.

##### Basic trail

Each ancestor crumb is an `<li>` holding a link plus an `aria-hidden` separator; the last item is
a `<span aria-current="page">`.

**Example — Three-level trail**

Plain HTML (canonical):

```html
<nav class="lp-breadcrumb" aria-label="Breadcrumb">
  <ol class="lp-breadcrumb__list">
    <li class="lp-breadcrumb__item">
      <a class="lp-breadcrumb__link" href="#">Auditor</a>
      <span class="lp-breadcrumb__separator" aria-hidden="true">/</span>
    </li>
    <li class="lp-breadcrumb__item">
      <a class="lp-breadcrumb__link" href="#">Reports</a>
      <span class="lp-breadcrumb__separator" aria-hidden="true">/</span>
    </li>
    <li class="lp-breadcrumb__item">
      <span class="lp-breadcrumb__current" aria-current="page">Permission Changes</span>
    </li>
  </ol>
</nav>
```

React:

```jsx
import { Breadcrumb } from '@ramsarjal-404/react';

<Breadcrumb
  items={[
    { label: 'Auditor', href: '/auditor' },
    { label: 'Reports', href: '/auditor/reports' },
    { label: 'Permission Changes' },
  ]}
/>
```

##### Button crumbs

When there is no routable URL — client-side routers, wizard steps — render the crumb as a
`<button>` with the same `lp-breadcrumb__link` class (React: items with `onClick` and no `href`).

**Example — Router-driven crumbs**

Plain HTML (canonical):

```html
<nav class="lp-breadcrumb" aria-label="Breadcrumb">
  <ol class="lp-breadcrumb__list">
    <li class="lp-breadcrumb__item">
      <button class="lp-breadcrumb__link" type="button">Setup</button>
      <span class="lp-breadcrumb__separator" aria-hidden="true">/</span>
    </li>
    <li class="lp-breadcrumb__item">
      <button class="lp-breadcrumb__link" type="button">Data Sources</button>
      <span class="lp-breadcrumb__separator" aria-hidden="true">/</span>
    </li>
    <li class="lp-breadcrumb__item">
      <span class="lp-breadcrumb__current" aria-current="page">Add Data Source</span>
    </li>
  </ol>
</nav>
```

React:

```jsx
import { Breadcrumb } from '@ramsarjal-404/react';

<Breadcrumb
  items={[
    { label: 'Setup', onClick: () => router.push('/setup') },
    { label: 'Data Sources', onClick: () => router.push('/setup/sources') },
    { label: 'Add Data Source' },
  ]}
/>
```

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` * | `BreadcrumbItem[]` | — | Trail in order — the last item is the current page (not a link) |
| `separator` | `ReactNode` | `/` | Separator between crumbs (default "/", bold, in the crumb color) |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Each ancestor crumb is an independent click target; with `href` it is a real anchor, so
  middle-click (new tab) and right-click → copy link work as users expect.
- The current page is plain text — no hover affordance, nothing to click.
- Hovering a crumb link underlines it; nothing moves or resizes.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus through the ancestor crumbs in trail order (native tab order); the current page is skipped — it is not interactive |
| `Enter` | Follows the focused crumb (anchor navigation or button `onClick`) |
| `Space` | Activates button crumbs (native button behavior; anchors ignore Space) |

Focused crumbs show the standard brand-tinted `:focus-visible` ring.

**Screen readers**

- The trail is a `<nav aria-label="Breadcrumb">` landmark — discoverable via landmark navigation
  and announced as "Breadcrumb navigation".
- The `<ol>` conveys both the count and the order of levels ("list, 4 items").
- The last crumb carries `aria-current="page"`, announced as the current page — it is plain
  text, never a dead link.
- Separators are `aria-hidden="true"` decoration; screen readers hear only the labels.

##### Development considerations

- Prefer `href` over `onClick` wherever a URL exists — anchors keep the full set of native
  browser behaviors for every user.
- Keep `aria-label="Breadcrumb"` unique on the page; if you render a second trail (e.g. in a
  modal), give it a distinct label.
- The current page must come last in `items` and have neither `href` nor `onClick`; the
  component renders it non-interactive automatically.
- In plain HTML, replicate the full pattern from the snippet: `<nav>` + `<ol>` + `aria-hidden`
  separators + `aria-current="page"` — not a div of slash-separated links.

##### Content

- Crumb labels should match the title of the page they lead to — users build a mental map from
  the correspondence.
- Keep labels short; shorten the text itself rather than CSS-truncating ("AD Reports", not
  "Active Directory Audit & Compliance Reports…").

#### Hard-fail checks — Breadcrumb

- [ ] Every `lp-breadcrumb*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<a>`, `<button>`, `<nav>`, `<ol>` — no `div` stand-ins.
- [ ] ARIA state kept and updated: `aria-current`, `aria-hidden`, `aria-label`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="folder-tree"></a>

### FolderTree

Expandable report folders — plus/minus rows reveal selectable reports underneath, with an optional filter that auto-expands matching folders.

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { FolderTree } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/folder-tree/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-folder-tree--default), [Expanded](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-folder-tree--expanded), [Report Sidebar](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-folder-tree--report-sidebar)
- **Related:** [settings-panel](#settings-panel), [sidebar](#sidebar), [accordion](#accordion)

#### Purpose and usage rules

##### Overview

FolderTree lists report folders, matching the Figma "Report Sidebar" frame: each row is a
brand-blue plus, a yellow folder, and a label. Clicking the row (or its plus) flips the plus to
a minus and reveals the folder's reports underneath, each with a scroll/file icon. Reports are
selectable (`onItemSelect` + `selectedItemId`), expansion works uncontrolled
(`defaultExpandedIds`) or controlled (`expandedIds` + `onExpandedChange`), and `filter` wires a
search field above the tree — non-matching folders and reports are hidden, and folders with
matching reports auto-expand.

##### Best practices

- Keep folder labels short and one line each — "Active Directory", "File Server".
- Use `onItemSelect` to load the report and mark it via `selectedItemId` so the brand-light
  highlight follows the open report.
- Start with the most relevant folder in `defaultExpandedIds` rather than everything collapsed.
- When wiring `filter`, drive it from a visible search input directly above the tree (the
  Report sidebar pattern below).

##### When not to use

- **Flat category menus** — use [SettingsPanel](https://lepide-design-system.vercel.app/components/settings-panel/); FolderTree's
  affordances (plus/minus, nesting) are noise for a single-level list.
- **App-level navigation** — use [Sidebar](https://lepide-design-system.vercel.app/components/sidebar/) for the product's primary
  rail.
- **Collapsible content sections** — use [Accordion](https://lepide-design-system.vercel.app/components/accordion/); FolderTree
  reveals selectable items, not arbitrary content.
- **Deeper hierarchies** — the design is a two-level tree (folders → reports); it does not
  support folders inside folders.

##### Variants

**Default**

All folders collapsed — click any row (or its plus) to reveal the reports underneath; click
again to collapse.

▶ Live: [Default, collapsed](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-folder-tree--default)

**Expanded with selection**

A folder pre-expanded via `defaultExpandedIds` with one report selected — brand-light
background and brand text.

▶ Live: [Expanded with a selected report](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-folder-tree--expanded)

**Report sidebar**

The full Figma composition: heading, a rounded search field driving `filter` (folders with
matching reports auto-expand), and selectable reports.

▶ Live: [Report sidebar pattern](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-folder-tree--report-sidebar)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Folder row | One `<button aria-expanded>` per folder — the whole row toggles, not just the plus |
| 2 | Toggle glyph | 24px brand-blue plus, flipping to a minus when expanded |
| 3 | Folder glyph | 40px yellow folder illustration |
| 4 | Folder label | Body-lg text |
| 5 | Report rows | `<button>`s revealed underneath, indented, each with a scroll/file icon (replaceable per item via `icon`) |
| 6 | Selected report | Brand-light background, brand text, `aria-current` |
| 7 | Empty state | "No reports in this folder" when an empty folder expands; a no-match line when `filter` finds nothing |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Expand / collapse | Clicking the folder row toggles it; the plus flips to a minus and the report list appears below |
| Controlled / uncontrolled | `defaultExpandedIds` for internal state, or `expandedIds` + `onExpandedChange` to own it |
| Selection | `onItemSelect(itemId, folderId)` fires on report click; `selectedItemId` paints the highlight and sets `aria-current` |
| Filter | Hides non-matching folders/reports; folders with matching reports are force-expanded; an empty result shows a no-match message |
| Empty folder | Expanding a folder with no items shows a quiet "No reports in this folder" line |
| Theming | Row, highlight, and text tokens re-resolve automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Keep folder labels to one short line — “Active Directory”, “File Server”.
- ✕ **Don't** — Nest folders inside folders — the design is a two-level tree: folders containing reports.

#### Canonical anatomy and examples

> **React-only** — This component has no `@ramsarjal-404/css` distribution yet — use `@ramsarjal-404/react`.

##### Basic

`folders` is an array of `{ id, label, items }`, each item a `{ id, label, icon? }` report.
`defaultExpandedIds` opens folders on first render; expansion state is managed internally.

**Example — Folders with reports**

React:

```jsx
import { FolderTree } from '@ramsarjal-404/react';

const folders = [
  {
    id: 'ad',
    label: 'Active Directory',
    items: [
      { id: 'ad-1', label: 'User Modifications' },
      { id: 'ad-2', label: 'Group Membership Changes' },
    ],
  },
  {
    id: 'fs',
    label: 'File Server',
    items: [{ id: 'fs-1', label: 'File Read Events' }],
  },
];

<FolderTree folders={folders} defaultExpandedIds={['ad']} />
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Folder tree, live](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-folder-tree--default)

##### Controlled selection

`onItemSelect` receives both the report id and its folder id; feed the selection back through
`selectedItemId` to paint the brand-light highlight.

**Example — Selecting a report**

React:

```jsx
import { useState } from 'react';
import { FolderTree } from '@ramsarjal-404/react';

function ReportPicker({ folders }) {
  const [selected, setSelected] = useState();
  return (
    <FolderTree
      folders={folders}
      defaultExpandedIds={['ad']}
      selectedItemId={selected}
      onItemSelect={(itemId, folderId) => {
        setSelected(itemId);
        loadReport(folderId, itemId);
      }}
    />
  );
}
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Selection, live](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-folder-tree--expanded)

##### Filtering

Pass the search text as `filter` — non-matching folders and reports are hidden, folders with
matching reports auto-expand, and an empty result renders a no-match message.

**Example — Search field driving the filter**

React:

```jsx
import { useState } from 'react';
import { FolderTree } from '@ramsarjal-404/react';

function SearchableTree({ folders }) {
  const [search, setSearch] = useState('');
  return (
    <>
      <input
        type="search"
        aria-label="Search reports"
        placeholder="Search reports"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Folders with matching reports auto-expand */}
      <FolderTree folders={folders} filter={search} />
    </>
  );
}
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Report sidebar, live](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-folder-tree--report-sidebar)

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultExpandedIds` | `string[]` | `[]` | Uncontrolled initial expanded folder ids |
| `expandedIds` | `string[]` | — | Controlled expanded folder ids |
| `filter` | `string` | — | Filter text — hides non-matching folders/items and auto-expands folders with matching reports |
| `folders` * | `FolderTreeFolder[]` | — |  |
| `onExpandedChange` | `((ids: string[]) => void)` | — |  |
| `onItemSelect` | `((itemId: string, folderId: string) => void)` | — |  |
| `selectedItemId` | `string` | — | Highlight one item as active |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The **whole folder row** toggles expansion — not just the 24px plus — keeping the hit target
  large.
- Report rows are full-width buttons; the selected one keeps its brand-light highlight.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus through folder rows and visible report rows in DOM order |
| `Enter` | Expands/collapses the focused folder, or selects the focused report |
| `Space` | Same as `Enter` (native button behavior) |

FolderTree uses native buttons in document order — it does **not** implement the ARIA
`tree`/`treeitem` roving-tabindex pattern, so there is no arrow-key navigation; every visible
row is a regular tab stop. Folder rows show the brand focus ring on `:focus-visible`.

**Screen readers**

- Folder rows are real `<button>`s carrying `aria-expanded`, so the open/closed state is
  announced; the plus/minus glyphs are decorative.
- Report rows are buttons inside nested lists; the selected report carries `aria-current`.
- Filtering announces nothing by itself — pair the search input with `aria-controls` and a
  visible/live results count in product code so screen-reader users know the tree changed.

##### Development considerations

- Choose one expansion mode: `defaultExpandedIds` (uncontrolled) or `expandedIds` +
  `onExpandedChange` (controlled) — passing `expandedIds` switches the component to controlled
  behavior.
- Collapsed reports are unmounted, not visually hidden — they are neither focusable nor
  announced until their folder expands.
- `filter` matching is case-insensitive on folder and report labels; folders whose reports
  match are force-expanded even if not in the expanded ids.
- Keep `id`s stable — they key React rendering, expansion state, and selection.
- Custom per-item `icon`s should use `currentColor` so the selected-state tinting applies.

##### Content

- Folder and report labels should be short noun phrases that fit on one line — the rows do not
  wrap gracefully.

#### Hard-fail checks — FolderTree

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="settings-panel"></a>

### SettingsPanel

Settings category menu — a bordered surface with a “Categories” heading and icon-led rows; the active category gets the brand-light highlight.

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { SettingsPanel } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/settings-panel/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-settings-panel--default), [With Selection](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-settings-panel--with-selection), [Settings Layout](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-settings-panel--settings-layout)
- **Related:** [folder-tree](#folder-tree), [sidebar](#sidebar), [tabs](#tabs)

#### Purpose and usage rules

##### Overview

SettingsPanel lists the categories of a settings area, matching the Figma "side bar pannel"
frame: a bordered surface with a 20px rounded top-left corner, a bold heading (default
"Categories") on a divider, and one row per category — an optional 30px icon from the Lepidus
icon set plus a body-lg label. Selection works uncontrolled (`defaultSelectedId`) or controlled
(`selectedId` + `onSelect`); the active row gets the brand-light background and brand text,
consistent with [FolderTree](https://lepide-design-system.vercel.app/components/folder-tree/).

##### Best practices

- Keep category labels to **1–3 words** — the 30px icon carries recognition.
- Compose it as the left column of a settings layout and drive the right-hand form from
  `onSelect` + `selectedId` (the Settings layout pattern below).
- Use icons from the Lepidus icon set — they inherit `currentColor`, so the selected-state
  brand tinting is automatic.
- Keep one row selected at all times once the user is inside settings; the highlight is the
  user's "you are here".

##### When not to use

- **Two-level hierarchies** — categories never nest; use
  [FolderTree](https://lepide-design-system.vercel.app/components/folder-tree/) for folders containing items.
- **App-level navigation** — use [Sidebar](https://lepide-design-system.vercel.app/components/sidebar/) for the product's primary
  rail.
- **Switching content within one page section** — use [Tabs](https://lepide-design-system.vercel.app/components/tabs/); SettingsPanel
  is a persistent menu for a whole settings area.

##### Variants

**Default**

The full Figma frame — sixteen categories with their 30px icons, no selection yet.

▶ Live: [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-settings-panel--default)

**With selection**

`defaultSelectedId` highlights a category with the brand-light background and brand text.

▶ Live: [Role management selected](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-settings-panel--with-selection)

**Settings layout**

The intended composition: the panel as the left column, driving the settings form on the right.

▶ Live: [Panel + form layout](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-settings-panel--settings-layout)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Panel | Bordered white surface with a 20px rounded top-left corner (`--radius-xl`) |
| 2 | Heading | Bold h5-scale title (default "Categories") sitting on a divider |
| 3 | Category rows | One `<button>` per category in a `<ul>` list — optional 30px icon + body-lg label |
| 4 | Selected row | `--color-brand-light` background + `--color-text-brand` text, `aria-current` |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Selection | Clicking a row selects it — uncontrolled via `defaultSelectedId` or controlled via `selectedId` + `onSelect` |
| Hover | Rows show a hover tint; the selected row keeps the brand-light treatment |
| Icon tinting | Icons inherit `currentColor`, so the selected row's brand color tints the icon automatically |
| Current semantics | The active row carries `aria-current` |
| Theming | Surface, border, highlight, and text tokens re-resolve automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Keep category labels to 1–3 words — “Logs”, “Backup & Restore” — and let the icon carry recognition.
- ✕ **Don't** — Nest categories — the panel is a flat menu; use FolderTree for a two-level tree.

#### Canonical anatomy and examples

> **React-only** — This component has no `@ramsarjal-404/css` distribution yet — use `@ramsarjal-404/react`.

##### Basic

`items` is an array of `{ id, label, icon? }`. Icons are 30px Lepidus icon-set components —
they inherit `currentColor`, so selected-state tinting is automatic. `defaultSelectedId` keeps
the selection internal.

**Example — Category menu**

React:

```jsx
import {
  SettingsPanel,
  GeneralSettingsIcon,
  LogsIcon,
  BackupRestoreIcon,
} from '@ramsarjal-404/react';

<SettingsPanel
  defaultSelectedId="general"
  items={[
    { id: 'general', label: 'General Settings', icon: <GeneralSettingsIcon size={30} /> },
    { id: 'logs', label: 'Logs', icon: <LogsIcon size={30} /> },
    { id: 'backup', label: 'Backup & Restore', icon: <BackupRestoreIcon size={30} /> },
  ]}
/>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Settings panel, live](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-settings-panel--with-selection)

##### Controlled layout

Own the selection with `selectedId` + `onSelect` and render the matching form beside the panel
— the intended settings-page composition.

**Example — Panel driving the settings form**

React:

```jsx
import { useState } from 'react';
import { SettingsPanel } from '@ramsarjal-404/react';

function SettingsLayout({ items }) {
  const [selected, setSelected] = useState('general');
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <SettingsPanel items={items} selectedId={selected} onSelect={setSelected} />
      <section style={{ flex: 1 }}>
        {/* render the form for `selected` here */}
      </section>
    </div>
  );
}
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Settings layout, live](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-settings-panel--settings-layout)

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultSelectedId` | `string` | — | Uncontrolled initial category |
| `items` * | `SettingsPanelItem[]` | — |  |
| `onSelect` | `((id: string) => void)` | — |  |
| `selectedId` | `string` | — | Controlled active category |
| `title` | `ReactNode` | `Categories` | Panel heading (default "Categories") |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The whole row — icon and label — is one click target.
- Hover shows a tint; selecting a row moves the brand-light highlight without any layout shift.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus through the category rows in list order (each row is a regular tab stop) |
| `Enter` | Selects the focused category |
| `Space` | Selects the focused category (native button behavior) |

Rows are native buttons in DOM order — there is no arrow-key menu pattern; every category is
reachable with `Tab`.

**Screen readers**

- The panel heading renders as an `<h3>`, so the menu is discoverable by heading navigation.
- Rows are real `<button>`s inside a semantic `<ul>`/`<li>` list — announced with the list
  context ("3 of 16").
- The active row carries `aria-current`, announced as the current item.
- Icons inherit `currentColor` and sit next to visible labels — the label is the accessible
  name; selection is conveyed by background *and* text color, not color alone.

##### Development considerations

- Choose one selection mode: `defaultSelectedId` (uncontrolled) or `selectedId` + `onSelect`
  (controlled) — passing `selectedId` switches the component to controlled behavior.
- When the panel drives a content pane, move the user's context clearly on selection — update
  the pane's heading so screen-reader users hear where they landed.
- `title` accepts any `ReactNode`; keep it a short text heading — it is the menu's label.
- Keep `id`s stable; they key rendering and selection.

##### Content

- Category labels are 1–3 word noun phrases ("Logs", "Manage Domains"); the icon, not the
  text, carries the visual differentiation.

#### Hard-fail checks — SettingsPanel

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="sidebar"></a>

### Sidebar

Brand-blue vertical icon-rail navigation with header and footer slots — the Lepide app-level nav, driven end-to-end by component/nav tokens.

- **Availability:** plain CSS (block `lp-sidebar`) + React
- **React:** `import { Sidebar } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/sidebar/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-sidebar--default), [Rounded](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-sidebar--rounded), [Interactive](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-sidebar--interactive), [RTL](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-sidebar--rtl)
- **Related:** [settings-panel](#settings-panel), [folder-tree](#folder-tree), [breadcrumb](#breadcrumb), [tabs](#tabs)

#### Legal class set (complete — do not invent others)

`lp-sidebar` · `lp-sidebar--rounded` · `lp-sidebar__footer` · `lp-sidebar__header` · `lp-sidebar__icon-box` · `lp-sidebar__item` · `lp-sidebar__item--active` · `lp-sidebar__item--disabled` · `lp-sidebar__items` · `lp-sidebar__label`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<a>`, `<button>`, `<nav>`, `<ul>`
- **Roles:** `role="img"`
- **ARIA attributes:** `aria-current`, `aria-disabled`, `aria-hidden`, `aria-label`

#### Purpose and usage rules

##### Overview

Sidebar is the app-level primary navigation rail — a fixed-width brand-blue `<nav>` column of
icon + label items with optional header (logo) and footer (settings/avatar) slots, driven
end-to-end by `component/nav/*` tokens. Use it as the single navigation landmark for top-level
product areas (Auditor, Trust, Detect, …) with exactly one item marked `active`. Items render
as an `<a>` when given `href`, or an `onClick` `<button>` otherwise. A second `rounded` variant
turns the rail into a capsule with a circular active indicator.

##### Best practices

- Keep **exactly one** `active` item — it sets `aria-current="page"` and the white-square
  indicator.
- Prefer `href` items for real routes, so browser history, middle-click, and open-in-new-tab
  all work.
- Keep labels to one or two short words; they render at 14px under a 49px icon square.
- Give each item a stable `key` — the list re-renders on selection changes.
- Anything focusable in `header`/`footer` needs its own accessible name (e.g. `aria-label` on
  an icon-only settings button).

##### When not to use

- **In-page or sectional navigation** — use [Tabs](https://lepide-design-system.vercel.app/components/tabs/); the rail is for
  top-level product areas only.
- **Settings categories** — use [SettingsPanel](https://lepide-design-system.vercel.app/components/settings-panel/).
- **Hierarchical content** (folders, reports) — use [FolderTree](https://lepide-design-system.vercel.app/components/folder-tree/).
- **Showing the current location** in a hierarchy — use
  [Breadcrumb](https://lepide-design-system.vercel.app/components/breadcrumb/); don't nest rails.

##### Variants

**Default**

The full Lepide AI rail: logo header, eight nav items with one active (white square + cyan
icon), and a settings + avatar footer pinned to the bottom.

▶ Live: [Default rail](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-sidebar--default)

**Rounded**

The capsule rail — 85px wide with a subtle border stroke; the active item becomes a 50px
dark-blue circle inside a dashed ring, with 12px semibold labels.

▶ Live: [Rounded (capsule) rail](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-sidebar--rounded)

**Interactive**

Stateful selection: items are `onClick` buttons and the active indicator (with
`aria-current="page"`) follows the clicked item.

▶ Live: [Click items to move the selection](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-sidebar--interactive)

**RTL**

Under `dir="rtl"` the rail docks on the right edge; labels, the active square, and the focus
ring render identically to LTR.

▶ Live: [Right-to-left](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-sidebar--rtl)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Rail | `<nav>` column on `--component-nav-sidebar-bg` — 100px wide by default, 85px for `rounded` (override with `width`) |
| 2 | Header slot *(optional)* | Centered top area, typically the product logo |
| 3 | Item list | `<ul>` of items — 49px icon square (`--radius-ms`) above a 14px label; scrolls with hidden scrollbars on overflow |
| 4 | Active indicator | Default: white square with the icon tinted cyan. Rounded: 50px dark-blue circle inside a dashed ring |
| 5 | Footer slot *(optional)* | Pinned to the rail end — settings button, account avatar |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Active | `item.active` paints the indicator and sets `aria-current="page"` |
| Hover | Non-active items show a faint translucent square; no movement |
| Link vs button | `item.href` renders an `<a>`; otherwise an `onClick` `<button>` |
| Disabled | 45% opacity + `cursor: not-allowed`; buttons get native `disabled`, links drop their `href` and set `aria-disabled` |
| Width | Any CSS length via `width` (default 100px; the rounded variant defaults to 85px) |
| Overflow | The item list scrolls with hidden scrollbars when it exceeds the rail height |
| Theming | All `component/nav/*` tokens re-resolve automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Mark exactly one item active and prefer href items for real routes — history and middle-click work for free.
- ✕ **Don't** — Exceed roughly nine top-level items — the rail has no grouping or overflow affordance.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) renders the same markup from an `items`
array. Both resolve to the same `component/nav/*` tokens, so they are pixel-identical in every
theme.

##### Basic rail

`lp-sidebar` is a `<nav>` landmark (give it an `aria-label`) that stretches to its container —
set the rail width inline (100px matches the Figma frame). Inside: an optional
`lp-sidebar__header` for the product logo, a `lp-sidebar__items` list where each `<li>` holds
one `lp-sidebar__item` (a `<button>` or `<a>`) made of `lp-sidebar__icon-box` + `lp-sidebar__label`,
and an optional `lp-sidebar__footer` pinned to the bottom. Exactly one item carries
`lp-sidebar__item--active` + `aria-current="page"`. Use `currentColor` SVGs so the active tint
applies; in React every `SidebarItem` needs a stable `key`, a `label` and an `icon`.

**Example — Rail with header, items, and active state**

Plain HTML (canonical):

```html
<!-- The rail stretches to its container — give the parent a height.
     Exactly one item carries --active + aria-current="page". -->
<div style="display: flex; height: 420px">
  <nav class="lp-sidebar" aria-label="Primary" style="width: 100px">
    <div class="lp-sidebar__header">
      <svg width="40" height="26" viewBox="0 0 40 26" fill="#5C8AD6" aria-label="Lepide" role="img">
        <path d="M10 2h6l-10 22h-6Z" /><path d="M20 2h6l-10 22h-6Z" /><path d="M30 2h6l-10 22h-6Z" />
      </svg>
    </div>
    <ul class="lp-sidebar__items">
      <li>
        <button type="button" class="lp-sidebar__item lp-sidebar__item--active" aria-current="page">
          <span class="lp-sidebar__icon-box">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M4 4H10V12H4V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4 16H10V20H4V16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14 12H20V20H14V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14 4H20V8H14V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="lp-sidebar__label">Dashboard</span>
        </button>
      </li>
      <li>
        <button type="button" class="lp-sidebar__item">
          <span class="lp-sidebar__icon-box">
            <svg viewBox="0 0 30 30" fill="none" aria-hidden="true" focusable="false">
              <path d="M5 15H5.0125M5 7.5H5.0125M5 22.5H5.0125M10 22.5H12.5M10 15H12.5M10 7.5H12.5M17.5 7.5H25M17.5 15H25M17.5 22.5H25"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="lp-sidebar__label">Logs</span>
        </button>
      </li>
      <li>
        <button type="button" class="lp-sidebar__item">
          <span class="lp-sidebar__icon-box">
            <svg viewBox="0 0 30 30" fill="none" aria-hidden="true" focusable="false">
              <path d="M5.71429 2H24.2857C26.3434 2 28 3.65657 28 5.71429V24.2857C28 26.3434 26.3434 28 24.2857 28H5.71429C3.65657 28 2 26.3434 2 24.2857V5.71429C2 3.65657 3.65657 2 5.71429 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7.57269 7.57159H9.42983M13.141 7.57162L22.4267 7.57159M22.4298 15H20.5727M16.8584 15L7.57269 15M7.57269 22.4284H9.42983M13.141 22.4284L22.4267 22.4284" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="11.2838" cy="7.5719" r="1.857" stroke="currentColor" stroke-width="1.5" />
              <circle cx="18.7162" cy="15.0003" r="1.857" stroke="currentColor" stroke-width="1.5" />
              <circle cx="11.2838" cy="22.4287" r="1.857" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </span>
          <span class="lp-sidebar__label">Settings</span>
        </button>
      </li>
    </ul>
  </nav>
</div>
```

React:

```jsx
import { Sidebar, DashboardIcon, LogsIcon, GeneralSettingsIcon } from '@ramsarjal-404/react';

<Sidebar
  ariaLabel="Primary"
  header={<img src="/logo.svg" alt="Lepide" width={48} height={48} />}
  items={[
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, active: true },
    { key: 'logs', label: 'Logs', icon: <LogsIcon /> },
    { key: 'settings', label: 'Settings', icon: <GeneralSettingsIcon /> },
  ]}
/>
```

##### Rounded variant

`lp-sidebar--rounded` (React: `variant="rounded"`) switches to the 85px capsule rail with the
circular active indicator. Selection is yours to manage in plain HTML — move the `--active`
class and `aria-current` on click; the React example does the same with `onClick` + state.

**Example — Capsule rail with stateful selection**

Plain HTML (canonical):

```html
<!-- --rounded: 85px capsule rail with the circular active indicator.
     Selection is yours to manage: on click, move --active and aria-current. -->
<div style="display: flex; height: 420px">
  <nav class="lp-sidebar lp-sidebar--rounded" aria-label="Primary" style="width: 85px">
    <ul class="lp-sidebar__items">
      <li>
        <button type="button" class="lp-sidebar__item lp-sidebar__item--active" aria-current="page">
          <span class="lp-sidebar__icon-box">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M4 4H10V12H4V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4 16H10V20H4V16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14 12H20V20H14V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14 4H20V8H14V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="lp-sidebar__label">Dashboard</span>
        </button>
      </li>
      <li>
        <button type="button" class="lp-sidebar__item">
          <span class="lp-sidebar__icon-box">
            <svg viewBox="0 0 30 30" fill="none" aria-hidden="true" focusable="false">
              <path d="M5 15H5.0125M5 7.5H5.0125M5 22.5H5.0125M10 22.5H12.5M10 15H12.5M10 7.5H12.5M17.5 7.5H25M17.5 15H25M17.5 22.5H25"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="lp-sidebar__label">Logs</span>
        </button>
      </li>
      <li>
        <button type="button" class="lp-sidebar__item">
          <span class="lp-sidebar__icon-box">
            <svg viewBox="0 0 30 30" fill="none" aria-hidden="true" focusable="false">
              <path d="M5.71429 2H24.2857C26.3434 2 28 3.65657 28 5.71429V24.2857C28 26.3434 26.3434 28 24.2857 28H5.71429C3.65657 28 2 26.3434 2 24.2857V5.71429C2 3.65657 3.65657 2 5.71429 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7.57269 7.57159H9.42983M13.141 7.57162L22.4267 7.57159M22.4298 15H20.5727M16.8584 15L7.57269 15M7.57269 22.4284H9.42983M13.141 22.4284L22.4267 22.4284" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="11.2838" cy="7.5719" r="1.857" stroke="currentColor" stroke-width="1.5" />
              <circle cx="18.7162" cy="15.0003" r="1.857" stroke="currentColor" stroke-width="1.5" />
              <circle cx="11.2838" cy="22.4287" r="1.857" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </span>
          <span class="lp-sidebar__label">Settings</span>
        </button>
      </li>
    </ul>
  </nav>
</div>
```

React:

```jsx
import { useState } from 'react';
import { Sidebar, DashboardIcon, LogsIcon, GeneralSettingsIcon } from '@ramsarjal-404/react';

function RoundedRail() {
  const [active, setActive] = useState('dashboard');
  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { key: 'logs', label: 'Logs', icon: <LogsIcon /> },
    { key: 'settings', label: 'Settings', icon: <GeneralSettingsIcon /> },
  ];
  return (
    <Sidebar
      variant="rounded"
      items={items.map((item) => ({
        ...item,
        active: item.key === active,
        onClick: () => setActive(item.key),
      }))}
    />
  );
}
```

▶ Live: [Rounded rail with live selection (React)](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-sidebar--rounded)

##### Links as items

Make items real anchors (React: give them an `href`) — browser history and middle-click work,
and the active item still sets `aria-current="page"`. A disabled link drops its `href`, sets
`aria-disabled="true"` and takes `lp-sidebar__item--disabled`.

**Example — Anchor items with a disabled entry**

Plain HTML (canonical):

```html
<!-- Anchor items: history and middle-click work for free. A disabled link
     drops its href and sets aria-disabled so it is skipped by the keyboard. -->
<div style="display: flex; height: 420px">
  <nav class="lp-sidebar" aria-label="Primary" style="width: 100px">
    <ul class="lp-sidebar__items">
      <li>
        <a href="/dashboard" class="lp-sidebar__item lp-sidebar__item--active" aria-current="page">
          <span class="lp-sidebar__icon-box">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M4 4H10V12H4V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4 16H10V20H4V16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14 12H20V20H14V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14 4H20V8H14V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="lp-sidebar__label">Dashboard</span>
        </a>
      </li>
      <li>
        <a href="/logs" class="lp-sidebar__item">
          <span class="lp-sidebar__icon-box">
            <svg viewBox="0 0 30 30" fill="none" aria-hidden="true" focusable="false">
              <path d="M5 15H5.0125M5 7.5H5.0125M5 22.5H5.0125M10 22.5H12.5M10 15H12.5M10 7.5H12.5M17.5 7.5H25M17.5 15H25M17.5 22.5H25"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="lp-sidebar__label">Logs</span>
        </a>
      </li>
      <li>
        <a class="lp-sidebar__item lp-sidebar__item--disabled" aria-disabled="true">
          <span class="lp-sidebar__icon-box">
            <svg viewBox="0 0 30 30" fill="none" aria-hidden="true" focusable="false">
              <path d="M5.71429 2H24.2857C26.3434 2 28 3.65657 28 5.71429V24.2857C28 26.3434 26.3434 28 24.2857 28H5.71429C3.65657 28 2 26.3434 2 24.2857V5.71429C2 3.65657 3.65657 2 5.71429 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7.57269 7.57159H9.42983M13.141 7.57162L22.4267 7.57159M22.4298 15H20.5727M16.8584 15L7.57269 15M7.57269 22.4284H9.42983M13.141 22.4284L22.4267 22.4284" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="11.2838" cy="7.5719" r="1.857" stroke="currentColor" stroke-width="1.5" />
              <circle cx="18.7162" cy="15.0003" r="1.857" stroke="currentColor" stroke-width="1.5" />
              <circle cx="11.2838" cy="22.4287" r="1.857" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </span>
          <span class="lp-sidebar__label">Admin</span>
        </a>
      </li>
    </ul>
  </nav>
</div>
```

React:

```jsx
import { Sidebar, DashboardIcon, LogsIcon, GeneralSettingsIcon } from '@ramsarjal-404/react';

// href items render real <a> elements — history and middle-click work.
// Disabled link items drop their href and set aria-disabled.
<Sidebar
  ariaLabel="Primary"
  items={[
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard', active: true },
    { key: 'logs', label: 'Logs', icon: <LogsIcon />, href: '/logs' },
    { key: 'admin', label: 'Admin', icon: <GeneralSettingsIcon />, href: '/admin', disabled: true },
  ]}
/>
```

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Sidebar is pure CSS and needs no `lepidus.js`; items are native links or buttons, so navigation and selection are yours.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `ariaLabel` | `string` | `Primary` | Accessible label for the nav landmark |
| `footer` | `ReactNode` | — | Bottom slot (e.g. settings + avatar), pinned to the bottom |
| `header` | `ReactNode` | — | Top slot (e.g. product logo) |
| `items` * | `SidebarItem[]` | — | Navigation items |
| `variant` | `enum` | `default` | Rail shape — 'default' (square rail) or 'rounded' (capsule rail, Figma node 557:382) |
| `width` | `string \| number` | — | Rail width (default 100px; the rounded variant defaults to 85px, matching Figma) |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The whole item — 49px icon square plus label — is one click target.
- Hover shows a faint translucent square behind non-active items; nothing moves or resizes.
- Disabled items show `cursor: not-allowed` and ignore clicks.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus through header content, each nav item, then footer content in DOM order |
| `Enter` | Follows a link item or activates a button item |
| `Space` | Activates button items (native behavior; links do not respond to `Space`) |

Each item is a native `<a>` or `<button>`, so keyboard operability comes for free.
`:focus-visible` draws a white ring around the icon square, keeping focus visible on the dark
rail. Disabled buttons leave the tab order; disabled links lose their `href` and are skipped
too.

**Screen readers**

- The root is a `<nav>` landmark named by `ariaLabel` (default "Primary") — name it uniquely
  if the page has other navigation landmarks.
- Items live in a semantic `<ul>`/`<li>` list, so the item count is announced.
- The selected item exposes `aria-current="page"`.
- Disabled link items set `aria-disabled` (and drop the `href`); disabled buttons use the
  native attribute.
- Icons should be decorative (`aria-hidden`) — every item carries a visible text label, which
  is the accessible name.

##### Development considerations

- Render Sidebar once per page as the primary navigation; if a secondary nav exists, give each
  a distinct `ariaLabel` ("Primary", "Admin").
- Prefer `href` items for real routes; reserve `onClick` buttons for in-app view switching
  that has no URL.
- Focusable header/footer content needs its own accessible name — an icon-only settings button
  requires `aria-label="Settings"`.
- The rail works under `dir="rtl"` with no extra code — verify it docks on the correct edge in
  your layout.
- Don't convey the active state by icon tint alone in custom icons — keep `currentColor` so the
  white-square indicator and `aria-current` stay in sync with the visual.

##### Content

- Labels are one or two short words ("Auditor", "My Lepide") — they must fit under a 49px icon
  in a 100px rail without wrapping awkwardly.

#### Hard-fail checks — Sidebar

- [ ] Every `lp-sidebar*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<a>`, `<button>`, `<nav>`, `<ul>` — no `div` stand-ins.
- [ ] Roles present where the anatomy has them: `role="img"`.
- [ ] ARIA state kept and updated: `aria-current`, `aria-disabled`, `aria-hidden`, `aria-label`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="steps"></a>

### Steps

Wizard progress indicator — solid green check discs for completed steps, a ringed dot for the current one, and a trailing “N of M” label.

- **Availability:** plain CSS (block `lp-steps`) + React
- **React:** `import { Steps } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/steps/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-steps--default), [All States](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-steps--all-states), [Wizard](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-steps--wizard)
- **Related:** [stepper](#stepper), [progress](#progress), [modal](#modal), [button](#button)

#### Legal class set (complete — do not invent others)

`lp-steps` · `lp-steps__circle` · `lp-steps__circle--current` · `lp-steps__circle--done` · `lp-steps__circle--upcoming` · `lp-steps__connector` · `lp-steps__connector--done` · `lp-steps__dot` · `lp-steps__item` · `lp-steps__label` · `lp-steps__step-button`

#### Hooks and semantics the canonical markup relies on

- **Native elements (keep them native):** `<button>`
- **Roles:** `role="progressbar"`
- **ARIA attributes:** `aria-hidden`, `aria-label`, `aria-valuemax`, `aria-valuemin`, `aria-valuenow`, `aria-valuetext`

#### Purpose and usage rules

##### Overview

Steps shows where the user is in a multi-step flow, matching the Figma "Steps" component set:
completed steps are solid success-green discs with a white check, the current step is a green
ring with a green dot, upcoming steps are gray rings, and the 52px connectors turn green once
crossed. A "N of M" label trails the dots (hide it with `showLabel`). The root carries
`role="progressbar"` with "Step n of m" `aria-valuetext` — the dots themselves are decorative.

##### Best practices

- Drive `current` from the **same state** as your wizard content and footer (Back/Next
  [Button](https://lepide-design-system.vercel.app/components/button/)s) so the dots never disagree with the page.
- Pass `onStepClick` only when revisiting completed steps is safe (saved drafts) — it turns
  completed discs into "Go to step N" back-navigation buttons.
- Keep the "N of M" label visible; it is the textual statement of progress and the primary cue
  for screen readers.
- Place Steps at the top of the wizard surface — typically a [Modal](https://lepide-design-system.vercel.app/components/modal/) or a
  full-page flow.

##### When not to use

- **Numeric input** — [Stepper](https://lepide-design-system.vercel.app/components/stepper/) is the increment/decrement number field;
  Steps is read-only progress.
- **Task or loading completion** — use [Progress](https://lepide-design-system.vercel.app/components/progress/) for percentage-style
  feedback; Steps counts discrete stages.
- **Unordered sections** the user can visit in any order — that is
  [Tabs](https://lepide-design-system.vercel.app/components/tabs/), not a wizard.

##### Variants

**Default**

A seven-step flow with step 3 current — two green check discs, the ringed dot, four upcoming
gray rings, and the "3 of 7" label.

▶ Live: [Default (3 of 7)](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-steps--default)

**All states**

Every position of the Figma set, Step-1 through Step-7 — how the discs, connectors, and label
advance together.

▶ Live: [All seven positions](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-steps--all-states)

**Wizard**

Wired to Back/Next buttons; completed dots are clickable back-navigation via `onStepClick`.

▶ Live: [Live wizard](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-steps--wizard)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | `role="progressbar"` row with `aria-valuenow/min/max` and "Step n of m" `aria-valuetext` |
| 2 | Circle | 24px, `--radius-m` — solid success-green disc (done), 2px green ring (current), 2px gray ring (upcoming) |
| 3 | Check | White 12×10 check glyph inside completed discs |
| 4 | Dot | 9px green dot inside the current ring |
| 5 | Connector | 52px × 2px line between circles; success-green once crossed |
| 6 | Label *(optional)* | "N of M" — 18px semibold brand text, hidden with `showLabel={false}` |
| 7 | Step button *(optional)* | Wraps completed circles when `onStepClick` is set; labelled "Go to step N" |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Current-step semantics | `aria-valuenow` and `aria-valuetext` ("Step 2 of 5") update with `current`; the dots are decorative |
| Back-navigation | With `onStepClick`, completed circles become buttons; the current and upcoming dots are never interactive |
| Clamping | `current` is clamped into the `1..total` range — out-of-range values never break the row |
| Label | "N of M" trails the dots; `showLabel={false}` removes it |
| Focus | Clickable steps draw a 2px brand outline with 2px offset on `:focus-visible` |
| Theming | The success-green, border, and label tokens re-resolve automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Drive current from the same state as the wizard content and its Back/Next buttons.
- ✕ **Don't** — Use Steps for unordered sections (that's Tabs) or as a numeric input (that's Stepper).

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical
form. The React rendition (`@ramsarjal-404/react`) renders the same markup from `total` + `current`.

##### Basic

One `lp-steps__item` per step: the circle takes `--done`, `--current`, or `--upcoming`, the
connector between circles takes `--done` once crossed, and the `lp-steps__label` trails the
dots. In plain HTML you render the state classes yourself — add the `progressbar` attributes so
the row reads as progress, and update them together with the classes when the step changes.

**Example — Three steps, step 2 current**

Plain HTML (canonical):

```html
<div class="lp-steps" role="progressbar" aria-label="Steps"
     aria-valuemin="1" aria-valuemax="3" aria-valuenow="2" aria-valuetext="Step 2 of 3">
  <span class="lp-steps__item">
    <span class="lp-steps__circle lp-steps__circle--done">
      <svg viewBox="0 0 12 10" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m1 5 3.5 3.5L11 1.5" />
      </svg>
    </span>
    <span class="lp-steps__connector lp-steps__connector--done"></span>
  </span>
  <span class="lp-steps__item">
    <span class="lp-steps__circle lp-steps__circle--current"><span class="lp-steps__dot"></span></span>
    <span class="lp-steps__connector"></span>
  </span>
  <span class="lp-steps__item">
    <span class="lp-steps__circle lp-steps__circle--upcoming"></span>
  </span>
  <span class="lp-steps__label">2 of 3</span>
</div>
```

React:

```jsx
import { Steps } from '@ramsarjal-404/react';

<Steps total={3} current={2} />
```

##### Without the label

Omit `lp-steps__label` (React: `showLabel={false}`) when the surrounding heading already states
the progress — keep `aria-valuetext` either way.

**Example — Dots only**

Plain HTML (canonical):

```html
<div class="lp-steps" role="progressbar" aria-label="Steps"
     aria-valuemin="1" aria-valuemax="3" aria-valuenow="1" aria-valuetext="Step 1 of 3">
  <span class="lp-steps__item">
    <span class="lp-steps__circle lp-steps__circle--current"><span class="lp-steps__dot"></span></span>
    <span class="lp-steps__connector"></span>
  </span>
  <span class="lp-steps__item">
    <span class="lp-steps__circle lp-steps__circle--upcoming"></span>
    <span class="lp-steps__connector"></span>
  </span>
  <span class="lp-steps__item">
    <span class="lp-steps__circle lp-steps__circle--upcoming"></span>
  </span>
</div>
```

React:

```jsx
import { Steps } from '@ramsarjal-404/react';

<Steps total={3} current={1} showLabel={false} />
```

##### Clickable wizard

Wrap each completed circle in a `lp-steps__step-button` with a "Go to step N" `aria-label`
(React: `onStepClick` renders them for you) — back-navigation for wizards where revisiting is
safe. In plain HTML your click handler moves the current step and re-renders the state
classes, `aria-valuenow` and the label together.

**Example — Wizard with back-navigation**

Plain HTML (canonical):

```html
<!-- Completed circles are wrapped in "Go to step N" buttons. Your script
     handles the click: set the new current step, then re-render the state
     classes, aria-valuenow / aria-valuetext and the label together. -->
<div class="lp-steps" role="progressbar" aria-label="Steps"
     aria-valuemin="1" aria-valuemax="5" aria-valuenow="3" aria-valuetext="Step 3 of 5">
  <span class="lp-steps__item">
    <button type="button" class="lp-steps__step-button" aria-label="Go to step 1">
      <span class="lp-steps__circle lp-steps__circle--done">
        <svg viewBox="0 0 12 10" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m1 5 3.5 3.5L11 1.5" />
        </svg>
      </span>
    </button>
    <span class="lp-steps__connector lp-steps__connector--done"></span>
  </span>
  <span class="lp-steps__item">
    <button type="button" class="lp-steps__step-button" aria-label="Go to step 2">
      <span class="lp-steps__circle lp-steps__circle--done">
        <svg viewBox="0 0 12 10" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m1 5 3.5 3.5L11 1.5" />
        </svg>
      </span>
    </button>
    <span class="lp-steps__connector lp-steps__connector--done"></span>
  </span>
  <span class="lp-steps__item">
    <span class="lp-steps__circle lp-steps__circle--current"><span class="lp-steps__dot"></span></span>
    <span class="lp-steps__connector"></span>
  </span>
  <span class="lp-steps__item">
    <span class="lp-steps__circle lp-steps__circle--upcoming"></span>
    <span class="lp-steps__connector"></span>
  </span>
  <span class="lp-steps__item">
    <span class="lp-steps__circle lp-steps__circle--upcoming"></span>
  </span>
  <span class="lp-steps__label">3 of 5</span>
</div>

<!-- …step content… -->

<div style="display: flex; gap: 12px; margin-top: 20px">
  <button class="lp-button lp-button--secondary lp-button--md">Back</button>
  <button class="lp-button lp-button--primary lp-button--md">Next</button>
</div>
```

React:

```jsx
import { useState } from 'react';
import { Button, Steps } from '@ramsarjal-404/react';

function Wizard() {
  const [step, setStep] = useState(1);
  return (
    <>
      <Steps total={5} current={step} onStepClick={setStep} />
      {/* …step content… */}
      <Button variant="secondary" disabled={step === 1} onClick={() => setStep(step - 1)}>
        Back
      </Button>
      <Button variant="primary" disabled={step === 5} onClick={() => setStep(step + 1)}>
        Next
      </Button>
    </>
  );
}
```

▶ Live: [Wizard, live](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-steps--wizard)

> **Getting the stylesheet** — One link tag, no build step: `` from `@ramsarjal-404/css` — see [Get Started](https://lepide-design-system.vercel.app/get-started/). Steps is pure CSS and needs no `lepidus.js`; your code renders the state classes per step.

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `current` * | `number` | — | Current step, 1-based |
| `onStepClick` | `((step: number) => void)` | — | Make completed steps clickable for navigation |
| `showLabel` | `boolean` | `true` | Show the "N of M" label after the dots (default true) |
| `total` * | `number` | — | Total number of steps |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- By default nothing is clickable — Steps is a read-only progress indicator.
- With `onStepClick`, only **completed** circles become click targets (24px circles inside a
  borderless button); the current and upcoming dots stay inert, so users can never "jump ahead".

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` / `Shift+Tab` | Moves focus between the completed-step buttons (only when `onStepClick` is set) |
| `Enter` | Activates the focused step button — navigates back to that step |
| `Space` | Activates the focused step button (native button behavior) |

Without `onStepClick` the component contains nothing focusable. Focused step buttons show a 2px
brand outline with a 2px offset.

**Screen readers**

- The root is `role="progressbar"` with `aria-valuemin={1}`, `aria-valuemax={total}`,
  `aria-valuenow={current}`, and `aria-valuetext` of "Step n of m" — announced as a single
  progress value, not a list of dots.
- The circles, checks, and connectors are decorative `<span>`s; state lives in the
  `aria-valuetext` and the visible "N of M" label.
- Clickable completed steps are native buttons labelled "Go to step N".
- State is conveyed by shape *and* text — check vs. dot vs. empty ring, plus the label — never
  color alone.

##### Development considerations

- `current` is 1-based and clamped into `1..total`; still, keep it in range so the label and
  `aria-valuenow` stay truthful.
- In plain HTML, mirror the React semantics: put `role="progressbar"`,
  `aria-valuemin/max/now`, and `aria-valuetext` on the `lp-steps` root and update them together
  with the `--done` / `--current` / `--upcoming` classes on every step change.
- Only make steps clickable (`onStepClick` / `lp-steps__step-button`) when revisiting is safe —
  back-navigation must not silently discard the user's work.
- Pair Steps with explicit Back/Next [Button](https://lepide-design-system.vercel.app/components/button/)s; the dots alone are not a
  navigation control.

##### Content

- Keep the trailing label as digits ("3 of 7") — the component renders it from
  `current`/`total`; put step names in the wizard's heading, not in the indicator.

#### Hard-fail checks — Steps

- [ ] Every `lp-steps*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] Roles present where the anatomy has them: `role="progressbar"`.
- [ ] ARIA state kept and updated: `aria-hidden`, `aria-label`, `aria-valuemax`, `aria-valuemin`, `aria-valuenow`, `aria-valuetext`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="tabs"></a>

### Tabs

Pill tabs for switching between peer views in place — brand-filled active pill, ARIA tabs pattern with roving tabindex and arrow-key navigation.

- **Availability:** plain CSS (block `lp-tabs`) + React
- **React:** `import { Tabs } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/tabs/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-tabs--default), [With Disabled](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-tabs--with-disabled), [With Panels](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-tabs--with-panels)
- **Related:** [accordion](#accordion), [steps](#steps), [sidebar](#sidebar), [breadcrumb](#breadcrumb)

#### Legal class set (complete — do not invent others)

`lp-tabs` · `lp-tabs__tab` · `lp-tabs__tab--active`

#### Hooks and semantics the canonical markup relies on

- **lepidus.js hooks:** `data-lp-tabs`
- **Native elements (keep them native):** `<button>`
- **Roles:** `role="tab"`, `role="tablist"`, `role="tabpanel"`
- **ARIA attributes:** `aria-controls`, `aria-label`, `aria-labelledby`, `aria-selected`

#### Purpose and usage rules

##### Overview

Tabs switch between views in place: the active tab is a brand pill
(`--component-tabs-active-indicator`, 50px radius, white label) and the rest are semibold
brand-blue labels with a 20px rhythm. It implements the ARIA tabs pattern — `role="tablist"` /
`role="tab"`, `aria-selected`, roving tabindex and Arrow/Home/End keyboard navigation. The React
component works uncontrolled (`defaultValue`, first enabled tab by default) or controlled
(`value` + `onChange`); individual tabs can be `disabled`.

##### Best practices

- Use Tabs for **peer views of the same context** — Overview / Permissions / Activity of one
  report, not navigation to different places.
- Keep labels to one or two words; the active pill has an 80px minimum width and labels should
  not wrap.
- Render the matching `role="tabpanel"` elements and set `hasPanels` so each tab's
  `aria-controls` points at its panel.
- Put the most likely starting view first — it is the default active tab.

##### When not to use

- **Sequential flows** the user completes in order — use [Steps](https://lepide-design-system.vercel.app/components/steps/).
- **Stacked sections users may want open simultaneously** — use
  [Accordion](https://lepide-design-system.vercel.app/components/accordion/); tabs show exactly one view at a time.
- **Navigating away** to another page or area — use [Sidebar](https://lepide-design-system.vercel.app/components/sidebar/) or
  [Breadcrumb](https://lepide-design-system.vercel.app/components/breadcrumb/); a tab change must never feel like leaving the page.

##### Variants

**Default**

The base tablist — first enabled tab active, brand pill indicator.

▶ Live: [Default — first tab active](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-tabs--default)

**With disabled tab**

`disabled: true` renders a gray, non-interactive tab that arrow-key navigation skips.

▶ Live: [Disabled tab at the end](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-tabs--with-disabled)

**With panels**

The full ARIA contract: controlled tabs wired to real `tabpanel` elements via the generated ids
(`{idPrefix}-tab-{id}` / `{idPrefix}-panel-{id}`).

▶ Live: [Controlled tabs with tabpanels](https://lepide-design-system.vercel.app/storybook/?path=/story/navigation-tabs--with-panels)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Tablist | `role="tablist"` container with a 20px gap between tabs |
| 2 | Tab | Native `<button role="tab">` — 14px semibold brand-blue label |
| 3 | Active pill | The selected tab fills with `--component-tabs-active-indicator` (brand blue, 50px radius, white text, 80px min-width) |
| 4 | Tab panel *(yours)* | `role="tabpanel"` element you render below, shown/hidden by selection |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Selection | Click or arrow keys select a tab; selection follows focus (panels render instantly) |
| Keyboard | Tab lands on the active tab only (roving tabindex); ArrowLeft/ArrowRight cycle with wrap; Home/End jump to first/last enabled tab |
| Controlled / uncontrolled | `value` + `onChange` for controlled; `defaultValue` (or first enabled tab) for uncontrolled |
| Disabled tab | Native `disabled` — unclickable, unfocusable, skipped by arrow keys |
| RTL | The plain-HTML layer flips ArrowLeft/ArrowRight under `direction: rtl` |
| Theming | Pill, labels and disabled colors re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Use tabs for parallel views of one context, with short one-word labels: Overview, Activity.
- ✕ **Don't** — Use tabs as a wizard — if step 2 depends on step 1, that is Steps, not Tabs.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — the **HTML + `lp-` classes** tab is the canonical form.
The React rendition (`@ramsarjal-404/react`) generates the same markup and ARIA wiring from a `tabs`
array.

> **Requires lepidus.js** — The plain-HTML tablist is interactive via `lepidus.js`: add `data-lp-tabs` to the `role="tablist"` element and it wires click activation, ArrowLeft/ArrowRight/Home/End with roving tabindex (RTL-aware), toggles `aria-selected` + `lp-tabs__tab--active`, and shows/hides the panel each tab names in `aria-controls`. Include the script once: ``.

##### Basic tabs

A `role="tablist"` of `role="tab"` buttons. Mark the initially active tab with
`lp-tabs__tab--active` + `aria-selected="true"`; every other tab gets `tabindex="-1"` so Tab
lands on the active one only.

**Example — Three tabs, no panels**

Plain HTML (canonical):

```html
<div class="lp-tabs" role="tablist" aria-label="Report sections" data-lp-tabs>
  <button class="lp-tabs__tab lp-tabs__tab--active" role="tab" aria-selected="true" id="tabs-basic-1">Overview</button>
  <button class="lp-tabs__tab" role="tab" aria-selected="false" id="tabs-basic-2" tabindex="-1">Permissions</button>
  <button class="lp-tabs__tab" role="tab" aria-selected="false" id="tabs-basic-3" tabindex="-1">History</button>
</div>
```

React:

```jsx
import { Tabs } from '@ramsarjal-404/react';

<Tabs
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'history', label: 'History' },
  ]}
/>
```

##### With panels

Give each tab `aria-controls` pointing at a `role="tabpanel"` element labelled back via
`aria-labelledby` — `lepidus.js` (or the React `hasPanels` wiring) hides every panel except the
selected one.

**Example — Tabs wired to tabpanels**

Plain HTML (canonical):

```html
<div class="lp-tabs" role="tablist" aria-label="Report sections" data-lp-tabs>
  <button class="lp-tabs__tab lp-tabs__tab--active" role="tab" aria-selected="true" aria-controls="tp-panel-1" id="tp-tab-1">Overview</button>
  <button class="lp-tabs__tab" role="tab" aria-selected="false" aria-controls="tp-panel-2" id="tp-tab-2" tabindex="-1">Permissions</button>
  <button class="lp-tabs__tab" role="tab" aria-selected="false" aria-controls="tp-panel-3" id="tp-tab-3" tabindex="-1">History</button>
</div>

<div id="tp-panel-1" role="tabpanel" aria-labelledby="tp-tab-1" style="padding: 12px 10px">
  Overview panel — summary of the latest scan.
</div>
<div id="tp-panel-2" role="tabpanel" aria-labelledby="tp-tab-2" style="padding: 12px 10px" hidden>
  Permissions panel — effective access by trustee.
</div>
<div id="tp-panel-3" role="tabpanel" aria-labelledby="tp-tab-3" style="padding: 12px 10px" hidden>
  History panel — change events over time.
</div>
```

React:

```jsx
import { useState } from 'react';
import { Tabs } from '@ramsarjal-404/react';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'permissions', label: 'Permissions' },
  { id: 'history', label: 'History' },
];

function ReportTabs() {
  const [tab, setTab] = useState('overview');
  return (
    <>
      <Tabs tabs={TABS} value={tab} onChange={setTab} idPrefix="report" hasPanels />
      {TABS.map(({ id, label }) => (
        <div
          key={id}
          role="tabpanel"
          id={`report-panel-${id}`}
          aria-labelledby={`report-tab-${id}`}
          hidden={tab !== id}
        >
          {label} content goes here.
        </div>
      ))}
    </>
  );
}
```

##### Disabled tab

Use the native `disabled` attribute — the tab grays out, can't be clicked or focused, and
arrow-key navigation skips it.

**Example — Disabled tab**

Plain HTML (canonical):

```html
<div class="lp-tabs" role="tablist" aria-label="Workspace sections" data-lp-tabs>
  <button class="lp-tabs__tab lp-tabs__tab--active" role="tab" aria-selected="true" id="tabs-dis-1">Overview</button>
  <button class="lp-tabs__tab" role="tab" aria-selected="false" id="tabs-dis-2" tabindex="-1">Permissions</button>
  <button class="lp-tabs__tab" role="tab" aria-selected="false" id="tabs-dis-3" tabindex="-1" disabled>Admin</button>
</div>
```

React:

```jsx
import { Tabs } from '@ramsarjal-404/react';

<Tabs
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'admin', label: 'Admin', disabled: true },
  ]}
/>
```

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultValue` | `string` | — | Uncontrolled initial tab id (defaults to the first enabled tab) |
| `hasPanels` | `boolean` | `false` | Set true when you render matching `role="tabpanel"` elements — wires each tab's aria-controls to its panel id |
| `idPrefix` | `string` | `lds-tabs` | Prefix for the generated tab/panel ids — pair panels with id={`${idPrefix}-panel-${tab.id}`} |
| `onChange` | `((id: string) => void)` | — |  |
| `tabs` * | `TabItem[]` | — |  |
| `value` | `string` | — | Controlled active tab id |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The whole pill/label area of each tab is the click target; clicking selects it immediately.
- Disabled tabs ignore clicks (native `disabled` attribute).
- Selection never scrolls or navigates the page — only the associated panel changes.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` | Moves focus **onto the active tab only** (roving tabindex — inactive tabs are `tabindex="-1"`), then out of the tablist into the visible panel |
| `ArrowRight` | Selects and focuses the next enabled tab, wrapping to the first |
| `ArrowLeft` | Selects and focuses the previous enabled tab, wrapping to the last |
| `Home` | Selects and focuses the first enabled tab |
| `End` | Selects and focuses the last enabled tab |

Selection follows focus on arrow keys — the standard for tabs whose panels render instantly.
Disabled tabs are skipped. In plain HTML, `lepidus.js` flips ArrowLeft/ArrowRight automatically
under `direction: rtl`.

**Screen readers**

- The container is `role="tablist"`; each tab is a native `<button role="tab">` with
  `aria-selected` announcing the current choice.
- With panels rendered (`hasPanels` in React, `aria-controls` in HTML), each tab references its
  `role="tabpanel"`, and the panel points back with `aria-labelledby` — so the panel is announced
  by its tab's name.
- Unselected panels carry the `hidden` attribute, removing them from the accessibility tree.
- The active state is conveyed by `aria-selected` and the filled pill, not color alone.

##### Development considerations

- Always render panels with `role="tabpanel"`, `id="{idPrefix}-panel-{id}"` and
  `aria-labelledby="{idPrefix}-tab-{id}"` so the ids match what the component generates; set
  `hasPanels` in React to switch on the `aria-controls` wiring.
- Give the plain-HTML tablist an `aria-label` (e.g. `aria-label="Report sections"`) when the
  surrounding context doesn't name it.
- Use a unique `idPrefix` per tabs instance on the page.
- Don't use tabs for page navigation — screen-reader users expect a tab change to swap content
  in place, not move them elsewhere. Use [Sidebar](https://lepide-design-system.vercel.app/components/sidebar/) for navigation.
- If a panel contains focusable content, it is reached with a single Tab press from the tablist —
  avoid wrapping panels in extra focus traps.

##### Content

- Tab labels are accessible names — keep them short, parallel nouns ("Overview", "Permissions",
  "Activity"), never sentences.
- Don't badge tabs with critical information that only appears when the tab is selected;
  surface alerts outside the tablist.

#### Hard-fail checks — Tabs

- [ ] **Do not write click/keyboard handlers for `.lp-dropdown__trigger`, `.lp-dropdown__option`, `.lp-accordion__trigger`, `.lp-stepper__control`, `.lp-tabs__tab` or `[data-lp-modal-open]` — `lepidus.js` already owns open/close, selection, ARIA sync and Escape. Listen to `lp-dropdown-change` on the wrapper (or `change` on the stepper input) to read values.** _(observed drift: a composed form added its own dropdown controller; both handlers fired per click and the panel toggled closed again — the dropdown never opened.)_
- [ ] Every `lp-tabs*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] Hooks present: `data-lp-tabs` — and `lepidus.js` is included on the page.
- [ ] Roles present where the anatomy has them: `role="tab"`, `role="tablist"`, `role="tabpanel"`.
- [ ] ARIA state kept and updated: `aria-controls`, `aria-label`, `aria-labelledby`, `aria-selected`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

### Overlays

<a id="tooltip"></a>

### Tooltip

Short descriptive bubble shown on hover and keyboard focus after a 300ms delay — viewport-aware, theme-inverted, and never interactive.

- **Availability:** plain CSS (block `lp-tooltip`) + React
- **React:** `import { Tooltip } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/tooltip/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/overlays-tooltip--default), [Placements](https://lepide-design-system.vercel.app/storybook/?path=/story/overlays-tooltip--placements), [On Icon Button](https://lepide-design-system.vercel.app/storybook/?path=/story/overlays-tooltip--on-icon-button), [Long Content](https://lepide-design-system.vercel.app/storybook/?path=/story/overlays-tooltip--long-content)
- **Related:** [action-item](#action-item), [dropdown](#dropdown), [toast](#toast)

#### Legal class set (complete — do not invent others)

`lp-tooltip`

#### Hooks and semantics the canonical markup relies on

- **lepidus.js hooks:** `data-lp-tooltip="Duplicate report"`, `data-lp-tooltip="Exports the current report as PDF"`, `data-lp-tooltip="Runs a full permissions scan"`, `data-lp-tooltip="Saves the current filters as a view"`, `data-lp-tooltip="Sends the report to the selected recipients"`
- **Native elements (keep them native):** `<button>`
- **ARIA attributes:** `aria-hidden`, `aria-label`

#### Purpose and usage rules

##### Overview

Tooltip attaches a small dark text bubble to a single trigger element, appearing 300ms after
hover **and** keyboard focus, and disappearing on leave, blur, or `Escape`. The bubble renders
on an inverted surface — `--color-text-primary` background with `--color-text-inverse` text —
so it adapts per theme. In React it is built on the shared Popover primitive: it renders
through a portal, tracks the trigger on scroll/resize, and flips vertically when it would leave
the viewport. The trigger is cloned, not wrapped — Tooltip attaches its handlers and
`aria-describedby` to your own element.

##### Best practices

- Use Tooltip for **supplementary** description of a control — keyboard shortcuts, the name of
  an icon-only button, one clarifying sentence.
- Keep content to a short phrase; the bubble caps at 280px wide and wraps.
- Pair it with `aria-label` on icon-only triggers — the tooltip *describes* for sighted users,
  the label *names* for the accessibility tree.
- Make sure the trigger is focusable and hoverable (button, link, input) so keyboard users get
  the same information.

##### When not to use

- **Required information** — validation rules, errors, anything needed to complete the task
  belongs in visible text (Input helper text, inline copy), not in a bubble that disappears.
- **Interactive or rich content** — links and buttons inside a tooltip are unreachable (the
  bubble is `pointer-events: none` and vanishes on blur). Use
  [Dropdown](https://lepide-design-system.vercel.app/components/dropdown/) for anchored menus or [Modal](https://lepide-design-system.vercel.app/components/modal/) for
  rich surfaces.
- **Passive notifications** — use [Toast](https://lepide-design-system.vercel.app/components/toast/); a tooltip only exists while its
  trigger is hovered or focused.
- **Disabled controls** — they fire no hover/focus events, so the tooltip never shows.

##### Variants

**Default**

A Button trigger: the bubble appears 300ms after hover or focus, and the trigger gains
`aria-describedby` pointing at it.

▶ Live: [Default (bottom-start)](https://lepide-design-system.vercel.app/storybook/?path=/story/overlays-tooltip--default)

**Placements**

Four placements — `top-start`, `top-end`, `bottom-start`, `bottom-end` — each flipping to the
opposite vertical side automatically when the preferred side would overflow the viewport.

▶ Live: [All four placements](https://lepide-design-system.vercel.app/storybook/?path=/story/overlays-tooltip--placements)

**On an icon button**

The canonical use: naming an icon-only control for sighted users while `aria-label` still names
it for assistive technology.

▶ Live: [Icon-only trigger](https://lepide-design-system.vercel.app/storybook/?path=/story/overlays-tooltip--on-icon-button)

**Long content**

Longer copy wraps inside the 280px max width — if you are writing this much, consider visible
helper text instead.

▶ Live: [Wrapping content](https://lepide-design-system.vercel.app/storybook/?path=/story/overlays-tooltip--long-content)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Trigger | Your own element — cloned to receive hover/focus handlers, ref, and `aria-describedby`; no wrapper element is added |
| 2 | Bubble | `role="tooltip"` surface — `--color-text-primary` background, `--color-text-inverse` 12px text, `--radius-tooltip` corners, `--shadow-flyout` elevation, 280px max width |
| 3 | Offset | 4px gap between trigger and bubble (`offset` prop) |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Hover / focus reveal | Shows 300ms (`delay`) after pointer enter **or** keyboard focus; cancelled if the pointer leaves first |
| Dismiss | Hides on pointer leave, blur, or `Escape` — without activating the trigger |
| Flip | Flips to the opposite vertical side when out of viewport space; tracks the trigger on scroll and resize |
| Non-interactive | The bubble is `pointer-events: none` — it never traps the pointer or receives clicks |
| Motion | Opacity + 4px slide on enter (120ms), suppressed under `prefers-reduced-motion: reduce` |
| Theming | The inverted surface re-resolves automatically under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Keep tooltip copy to one short phrase, and pair it with aria-label on icon-only triggers.
- ✕ **Don't** — Put links, buttons, or required information inside a tooltip — it vanishes on blur and can't be reached.

#### Canonical anatomy and examples

Lepide products ship plain HTML/CSS/JS — in plain HTML a tooltip is a single
`data-lp-tooltip` attribute on the trigger; the React rendition (`@ramsarjal-404/react`) wraps the
trigger in `<Tooltip>`. Both render the same `lp-tooltip` bubble.

> **Requires lepidus.js** — The plain-HTML tooltip is bound by `lepidus.js`: it shows the bubble on hover and keyboard focus, positions it above the trigger (flipping below when there's no room), wires `aria-describedby`, and hides on leave, blur, or Escape. Include `` once per page — see [Get Started](https://lepide-design-system.vercel.app/get-started/).

##### Basic

Put the text in `data-lp-tooltip` on any focusable element — `lepidus.js` does the rest. In
React, pass the text as `content` and the trigger as the single child.

**Example — Tooltip on a button**

Plain HTML (canonical):

```html
<button class="lp-button lp-button--secondary lp-button--md"
        data-lp-tooltip="Exports the current report as PDF">
  Export
</button>
```

React:

```jsx
import { Button, Tooltip } from '@ramsarjal-404/react';

<Tooltip content="Exports the current report as PDF">
  <Button variant="secondary">Export</Button>
</Tooltip>
```

##### Placements

The React component accepts a preferred `placement` (default `bottom-start`) and flips
vertically when out of viewport space. The plain-HTML binding always positions above the
trigger, flipping below when there is no room — it has no placement option.

**Example — All four placements**

Plain HTML (canonical):

```html
<!-- The plain-HTML binding has no placement option: lepidus.js always
     centers the bubble above the trigger and flips it below when there is
     no room at the top. Every trigger below behaves the same way. -->
<div style="display: flex; flex-wrap: wrap; gap: 12px">
  <button class="lp-button lp-button--secondary lp-button--md"
          data-lp-tooltip="Runs a full permissions scan">Scan</button>
  <button class="lp-button lp-button--secondary lp-button--md"
          data-lp-tooltip="Exports the current report as PDF">Export</button>
  <button class="lp-button lp-button--secondary lp-button--md"
          data-lp-tooltip="Sends the report to the selected recipients">Share</button>
  <button class="lp-button lp-button--secondary lp-button--md"
          data-lp-tooltip="Saves the current filters as a view">Save view</button>
</div>
```

React:

```jsx
import { Button, Tooltip } from '@ramsarjal-404/react';

<>
  {['top-start', 'top-end', 'bottom-start', 'bottom-end'].map((placement) => (
    <Tooltip key={placement} placement={placement} content={`placement="${placement}"`}>
      <Button variant="secondary">{placement}</Button>
    </Tooltip>
  ))}
</>
```

▶ Live: [Placements, live](https://lepide-design-system.vercel.app/storybook/?path=/story/overlays-tooltip--placements)

##### Icon-only trigger

The tooltip shows the name for sighted users; `aria-label` still provides the accessible name —
never rely on the tooltip alone.

**Example — Naming an icon-only button**

Plain HTML (canonical):

```html
<!-- The tooltip *describes* for sighted users; aria-label still *names*
     the control for the accessibility tree. -->
<button class="lp-button lp-button--secondary lp-button--sm"
        aria-label="Duplicate report"
        data-lp-tooltip="Duplicate report">
  <svg width="18" height="18" viewBox="0 0 30 30" fill="none" aria-hidden="true" focusable="false">
    <path d="M5.015 20.9212C4.63168 20.7027 4.31284 20.3869 4.09072 20.0056C3.8686 19.6244 3.75106 19.1912 3.75 18.75V6.25C3.75 4.875 4.875 3.75 6.25 3.75H18.75C19.6875 3.75 20.1975 4.23125 20.625 5M13.75 17.5L16.25 20L21.25 15M8.75 12.0837C8.75 11.1996 9.10123 10.3516 9.72643 9.72643C10.3516 9.10123 11.1996 8.75 12.0837 8.75H22.9163C23.354 8.75 23.7876 8.83623 24.192 9.00377C24.5965 9.1713 24.964 9.41687 25.2736 9.72643C25.5831 10.036 25.8287 10.4035 25.9962 10.808C26.1638 11.2124 26.25 11.646 26.25 12.0837V22.9163C26.25 23.354 26.1638 23.7876 25.9962 24.192C25.8287 24.5965 25.5831 24.964 25.2736 25.2736C24.964 25.5831 24.5965 25.8287 24.192 25.9962C23.7876 26.1638 23.354 26.25 22.9163 26.25H12.0837C11.646 26.25 11.2124 26.1638 10.808 25.9962C10.4035 25.8287 10.036 25.5831 9.72643 25.2736C9.41687 24.964 9.1713 24.5965 9.00377 24.192C8.83623 23.7876 8.75 23.354 8.75 22.9163V12.0837Z"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</button>
```

React:

```jsx
import { Button, CloneIcon, Tooltip } from '@ramsarjal-404/react';

// The tooltip *describes* for sighted users; aria-label still *names*
// the control for the accessibility tree.
<Tooltip content="Duplicate report">
  <Button variant="secondary" size="sm" aria-label="Duplicate report">
    <CloneIcon size={18} />
  </Button>
</Tooltip>
```

▶ Live: [Icon-only trigger, live](https://lepide-design-system.vercel.app/storybook/?path=/story/overlays-tooltip--on-icon-button)

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` * | `ReactElement<any, string \| JSXElementConstructor`<any>`>` | — | A single focusable/hoverable trigger element. Tooltip clones it (`cloneElement`) to attach hover/focus handlers and `aria-describedby`, merging with any handlers, ref and describedby the child already has — no wrapper element is added. |
| `className` | `string` | — | Extra class on the bubble element. |
| `content` * | `ReactNode` | — | The tooltip text. Keep it short and **never interactive** — a tooltip disappears on blur/leave, so links or buttons inside it are unreachable by keyboard and screen readers. Plain text (or text-level markup) only. |
| `delay` | `number` | `300` | Delay in ms before the bubble shows on hover/focus. Default 300. |
| `id` | `string` | — | id of the bubble (defaults to a generated id) — wired to `aria-describedby`. |
| `offset` | `number` | `4` | Gap in px between the trigger and the bubble. Default 4. |
| `placement` | `enum` | `bottom-start` | Preferred placement; flips to the opposite vertical side automatically when there is not enough viewport space. Default `'bottom-start'`. |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- The bubble appears 300ms (`delay`) after the pointer enters the trigger; leaving before the
  delay elapses cancels it.
- Leaving the trigger hides the bubble immediately.
- The bubble itself is `pointer-events: none` — it can never trap the pointer, occlude a click,
  or be hovered to keep it open.

**Keyboard**

| Key | Behavior |
| --- | --- |
| `Tab` (focus lands on the trigger) | Shows the tooltip after the same 300ms delay as hover |
| `Escape` | Dismisses the tooltip without activating the trigger; focus stays on the trigger |
| `Tab` / `Shift+Tab` away (blur) | Hides the tooltip |

Keyboard users get exactly the same information as mouse users — the tooltip is focus-triggered,
not hover-only. The same applies to the plain-HTML `data-lp-tooltip` binding (`focusin` shows,
`focusout` and `Escape` hide).

**Screen readers**

- The bubble renders `role="tooltip"`.
- While open, the trigger carries `aria-describedby` pointing at the bubble (merged with any
  `aria-describedby` the trigger already had), so the content is announced as the control's
  **description**.
- A tooltip is a *description*, not a *name*: icon-only triggers still need their own
  `aria-label` — the accessible name must never live only in the tooltip.

##### Development considerations

- The React component takes a **single focusable/hoverable child** and clones it — no wrapper
  element is added, so layout is unaffected; existing handlers, ref, and `aria-describedby` on
  the child are preserved.
- Never put interactive content (links, buttons) in `content` — the bubble disappears on blur
  and ignores pointer events, so it would be unreachable. Plain text or text-level markup only.
- Don't attach tooltips to disabled elements — they fire no hover/focus events and the tooltip
  never shows. Use visible helper text instead.
- In plain HTML, `lepidus.js` generates the bubble, the `lp-tooltip` class, the `role`, and the
  `aria-describedby` wiring from the `data-lp-tooltip` attribute — don't hand-build bubbles.
- The enter transition is suppressed under `prefers-reduced-motion: reduce`.

##### Content

- One short phrase or sentence; the bubble caps at 280px and wraps.
- Never put **required** information (validation rules, errors, instructions) only in a
  tooltip — if users must read it to proceed, it belongs in visible text.
- Don't repeat the trigger's visible label verbatim — add information ("Exports the current
  report as PDF"), or omit the tooltip.

#### Hard-fail checks — Tooltip

- [ ] Every `lp-tooltip*` class used appears in the legal class set above.
- [ ] DOM anatomy, modifiers and element order match a canonical example; only content/ids/labels changed.
- [ ] Native elements preserved: `<button>` — no `div` stand-ins.
- [ ] Hooks present: `data-lp-tooltip` — and `lepidus.js` is included on the page.
- [ ] ARIA state kept and updated: `aria-hidden`, `aria-label`.
- [ ] No local CSS on component internals; no raw hex; no per-theme overrides.
- [ ] Not replaced by a native/third-party/custom lookalike.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

### Charts

<a id="bar-chart"></a>

### BarChart

Horizontal bar chart for comparing one or more series across categories — grouped by default, stacked when the total matters.

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { BarChart } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/bar-chart/ · **Storybook:** [In Chart Card](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bar-chart--in-chart-card), [Compact](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bar-chart--compact), [Stacked](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bar-chart--stacked), [Single Series](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bar-chart--single-series)
- **Related:** [column-chart](#column-chart), [donut-chart](#donut-chart), [card](#card)

#### Purpose and usage rules

##### Overview

BarChart compares one or more data series across named categories, drawn horizontally: category
labels down the left, a group of thin rounded bars per category, dashed vertical gridlines, and a
numeric axis along the bottom. It answers "which category has more?" — failed audits per file
server, alerts per department. Bar lengths scale to a "nice" ceiling of the data maximum
(override with `max`), and series take the shared chart palette
(`--color-chart-series-1…6`), so the dark and high-contrast themes recolor every bar with no
extra code.

##### Best practices

- **Horizontal is for names** — bars leave room for long category labels (server names,
  departments) that would collide under columns. Widen the label gutter with `labelWidth`.
- Keep to **2–3 series per group**; more than that and groups blur together — split into
  multiple charts instead.
- Use `stacked` when the **category total** is the headline and the breakdown is secondary.
- Wrap every chart in `ChartCard` and name series with `ChartLegend` — color alone is the only
  thing separating series.
- Take series colors from `CHART_COLORS` (the `--color-chart-series-*` tokens) — never hardcoded
  hex, which would break in dark and high-contrast themes.

##### When not to use

- **Time buckets** (per month, per day) — use [ColumnChart](https://lepide-design-system.vercel.app/components/column-chart/); vertical
  columns read naturally left-to-right as time.
- **Trends over ordered points** — use [LineChart](https://lepide-design-system.vercel.app/components/line-chart/); bars hide the shape
  of a trend.
- **Part-to-whole with few parts** (≤5) — use [DonutChart](https://lepide-design-system.vercel.app/components/donut-chart/) when the
  composition, not the comparison, is the message.
- **A single number against a scale** — use [GaugeChart](https://lepide-design-system.vercel.app/components/gauge-chart/).

##### Configurations

**Grouped (default)**

One group of bars per category, series i = bar i in every group. The full Figma composition sits
on a `ChartCard` with a `ChartLegend` underneath.

▶ Live: [Grouped bars in a ChartCard with legend](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bar-chart--in-chart-card)

**Stacked**

`stacked` joins each group into one segmented bar sized by the category total. **Use when** the
sum matters more than series-to-series comparison — total alerts per server, with the breakdown
as texture.

▶ Live: [Stacked — one segmented bar per category](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bar-chart--stacked)

**Single series**

One series with a per-series `color` override and a wider `labelWidth` for long server names.

▶ Live: [Single series, brand-blue override, 90px labels](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bar-chart--single-series)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | `role="img"` div with a generated `aria-label` |
| 2 | Category labels | Down the left, 10px text; gutter width set by `labelWidth` (default 40px) |
| 3 | Bars | 6px bars with rounded right ends, grouped per category; one segmented bar when `stacked` |
| 4 | Gridlines | Dashed vertical lines at every tick — `--color-chart-grid` |
| 5 | Axis | Numeric ticks along the bottom (default 6 divisions via `ticks`) |
| 6 | Legend *(composed)* | `ChartLegend` placed below the chart inside the `ChartCard` |
| 7 | Tooltip | Native browser tooltip per bar: "FS1 — Failed: 312" |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Hover tooltip | Every bar/segment carries a native `title` — "category — series: value", formatted by `formatValue` |
| Axis scaling | Axis max defaults to a nice ceiling of the data (stacked: of category totals); `max` and `ticks` override |
| Legend | `ChartLegend` is a static key — it names series but does not toggle or filter them |
| Responsive sizing | Bars are percentage-width, so the chart fills its container; only `labelWidth` is fixed |
| Theming | Series resolve through `--color-chart-series-1…6` and gridlines through `--color-chart-grid` — both re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Pass series colors from CHART_COLORS or per-series color overrides that reference --color-chart-series-* tokens.
- ✕ **Don't** — Hardcode hex colors per series — they stay fixed when the dark and high-contrast themes re-resolve the palette.

#### Canonical anatomy and examples

> **React-only** — Charts have no @ramsarjal-404/css distribution — use `@ramsarjal-404/react`.

##### Grouped in a ChartCard

The standard composition: `ChartCard` supplies the surface (brand-blue title, "Last Updated"
stamp, actions slot), `BarChart` plots the data, `ChartLegend` names the series.

**Example — Grouped bars in a ChartCard**

React:

```jsx
import { BarChart, ChartCard, ChartLegend, CHART_COLORS } from '@ramsarjal-404/react';

const CATEGORIES = ['FS1', 'FS2', 'FS3', 'FS4', 'FS5'];
const SERIES = [
  { name: 'Failed', values: [312, 261, 27, 162, 150] },
  { name: 'Warning', values: [583, 42, 64, 583, 246] },
  { name: 'Healthy', values: [477, 105, 137, 447, 308] },
];

<ChartCard
  title="Audit Status by File Server"
  lastUpdated="Last Updated on 12/06/2026 09:40 AM"
>
  <BarChart categories={CATEGORIES} series={SERIES} />
  <ChartLegend
    items={SERIES.map((s, i) => ({ label: s.name, color: CHART_COLORS[i] }))}
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bar-chart--in-chart-card)

##### Stacked

`stacked` turns each group into one segmented bar sized by the category total.

**Example — Stacked bars**

React:

```jsx
import { BarChart, ChartCard, ChartLegend, CHART_COLORS } from '@ramsarjal-404/react';

const CATEGORIES = ['AD-Primary', 'Exchange-01', 'SQL-Cluster', 'SharePoint'];
const SERIES = [
  { name: 'Critical', values: [42, 18, 65, 12] },
  { name: 'Warning', values: [120, 74, 96, 38] },
  { name: 'Info', values: [310, 220, 180, 95] },
];

// stacked: one segmented bar per category, sized by the total
<ChartCard title="Alert Composition by System">
  <BarChart categories={CATEGORIES} series={SERIES} stacked labelWidth={90} />
  <ChartLegend
    items={SERIES.map((s, i) => ({ label: s.name, color: CHART_COLORS[i] }))}
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bar-chart--stacked)

##### Single series

A per-series `color` from the palette tokens, a wider `labelWidth` for long server names, and
`formatValue` for unit formatting.

**Example — Single series with overrides**

React:

```jsx
import { BarChart, ChartCard, CHART_COLORS } from '@ramsarjal-404/react';

<ChartCard title="Permission Changes by Server">
  <BarChart
    categories={['AD-Primary', 'Exchange-01', 'SQL-Cluster', 'FileServer-East']}
    series={[
      // per-series color must reference a --color-chart-series-* token
      { name: 'Permission changes', values: [42, 28, 65, 12], color: CHART_COLORS[3] },
    ]}
    ticks={4}
    labelWidth={90}
    formatValue={(v) => v.toLocaleString()}
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bar-chart--single-series)

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `categories` * | `string[]` | — | Row labels down the left (e.g. server names) |
| `formatValue` | `((value: number) => string)` | — | Format axis ticks and tooltip values |
| `labelWidth` | `number` | `40` | Width reserved for category labels, px (default 40) |
| `max` | `number` | — | Axis maximum — defaults to a "nice" ceiling of the data max |
| `series` * | `ChartSeries[]` | — | One group of bars per category; series i = bar i in every group |
| `stacked` | `boolean` | `false` | One segmented bar per category instead of a group of bars |
| `ticks` | `number` | `6` | Number of axis divisions (default 6) |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Hovering a bar or stacked segment shows a native browser tooltip — "FS1 — Failed: 312" —
  via the element's `title` attribute. There is no custom hover state; bars do not change color
  or size.
- Nothing in the chart is clickable.

**Keyboard**

The chart contains **no focusable elements**. Bars, gridlines, and axis labels are plain
`div`/`span` elements — keyboard users cannot tab into the chart or reach the per-bar tooltips.
The values must therefore be available somewhere keyboard-reachable: a data table or a text
summary alongside the chart.

**Screen readers**

- The chart root is a single `role="img"` with a generated `aria-label` — for example
  "Bar chart of Failed, Warning, Healthy by 8 categories". Override `aria-label` with the actual
  insight ("Failed audits highest on FS1 and FS4"), not just the series names.
- Everything inside is presentation: gridlines and the numeric axis are `aria-hidden="true"`,
  and per-bar `title` tooltips are not reliably announced.
- The chart is effectively **visual-only beyond its label**. Pair it with a
  [Table](https://lepide-design-system.vercel.app/components/table/) of the same data, or a text summary, so the values themselves are
  accessible.

##### Development considerations

- Always pass a meaningful `aria-label` — the generated one names the series but carries no
  values or conclusion.
- Don't encode meaning in color alone: series are separated only by palette color, so keep the
  `ChartLegend` visible, and remember the `--color-chart-series-*` tokens shift per theme — a
  "red means failed" assumption breaks if you hardcode or reorder colors.
- Provide the underlying data as a table or downloadable report for both keyboard and
  screen-reader users.
- Use `formatValue` so the tooltip and axis agree on units — raw numbers in one place and
  formatted in another reads as two different datasets.

##### Content

- Keep category labels short (server names, codes); widen `labelWidth` rather than truncating.
- Put units in the card title or legend ("Alerts per server"), and format axis ticks with
  `formatValue` — e.g. `(v) => v + 'k'` — so magnitude is never ambiguous.
- Name series with nouns users filter by elsewhere in the product: "Failed", "Warning",
  "Healthy".

#### Hard-fail checks — BarChart

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="bubble-chart"></a>

### BubbleChart

Scatter chart with magnitude — translucent rimmed bubbles plot x, y, and size over a light grid for three-dimensional comparisons.

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { BubbleChart } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/bubble-chart/ · **Storybook:** [In Chart Card](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bubble-chart--in-chart-card), [Bare](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bubble-chart--bare)
- **Related:** [line-chart](#line-chart), [column-chart](#column-chart), [card](#card)

#### Purpose and usage rules

##### Overview

BubbleChart plots points that carry **three dimensions**: an `x`/`y` position plus a pixel
radius `r` for magnitude. Each point is drawn as a translucent palette bubble with a solid rim
floating over a light grid — the style of the "Security Group Changes" card in the Lepide
dashboard. It answers "where do these cluster, and which are big?" — change events positioned
by time and scope, sized by volume. Series take the shared chart palette
(`--color-chart-series-1…6`), the grid uses `--color-chart-grid`, and the SVG is drawn in real
pixels via a ResizeObserver, so rims and gridlines stay crisp at any width.

##### Best practices

- Use only when **all three dimensions carry meaning** — position and size. If `r` would be
  constant, you have a scatter that a simpler chart usually serves better.
- Keep to **2–3 series** and a modest number of points; overlapping translucent bubbles get
  unreadable fast.
- Choose radii in a **legible range** (~8–24px) — `r` is literal pixels, not a data scale, so
  map your magnitude onto sensible pixel values yourself.
- Give important points a `label` — it appears in the tooltip ("Product 1 — FS1: (12, 30)").
- Wrap in `ChartCard`, name series with `ChartLegend`, and take colors from `CHART_COLORS`
  (the `--color-chart-series-*` tokens) — never hardcoded hex.

##### When not to use

- **Plain comparison across categories** — use [BarChart](https://lepide-design-system.vercel.app/components/bar-chart/) or
  [ColumnChart](https://lepide-design-system.vercel.app/components/column-chart/); two dimensions don't need a bubble.
- **Trends over ordered points** — use [LineChart](https://lepide-design-system.vercel.app/components/line-chart/); bubbles don't
  imply order.
- **Part-to-whole composition** — use [DonutChart](https://lepide-design-system.vercel.app/components/donut-chart/).

##### Configurations

**In a ChartCard (default)**

Three series over the light grid, with a `ChartLegend` naming them.

▶ Live: [Three series of rimmed bubbles over the grid](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bubble-chart--in-chart-card)

**Bare**

Fewer series and a shorter plot — `height` and `showGrid` tune the footprint.

▶ Live: [Two series, 200px plot](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bubble-chart--bare)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | `role="img"` div with a generated `aria-label`, wrapping one responsive SVG |
| 2 | Grid | Light 13×7 line grid in `--color-chart-grid` (`showGrid`, default on) |
| 3 | Plot area | Height set by `height` (default 240px); width tracks the container; axes scale to a nice ceiling or `xMax`/`yMax` |
| 4 | Bubbles | Translucent fill with a solid rim, both in the series color; radius is the point's `r` in px |
| 5 | Legend *(composed)* | `ChartLegend` placed below the chart inside the `ChartCard` |
| 6 | Tooltip | Native SVG `title` per bubble: "Product 1 — FS1: (12, 30)" |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Hover tooltip | Each bubble carries an SVG `title` — "series — label: (x, y)"; the radius is not stated, only drawn |
| Axis scaling | x and y scale to a nice ceiling of the data; `xMax`/`yMax` override. There are no tick labels — the grid is purely visual |
| Legend | `ChartLegend` is a static key — it names series but does not toggle or filter them |
| Responsive sizing | A ResizeObserver re-measures the container and redraws in real pixels — rims and grid never stretch; bubble radii stay literal |
| Theming | Bubbles resolve through `--color-chart-series-1…6` and the grid through `--color-chart-grid` — re-resolved under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Reserve BubbleChart for data where position and size all mean something, and label the notable points.
- ✕ **Don't** — Use bubbles for a two-variable comparison — constant radii add noise; a Column or Bar chart says it cleaner.

#### Canonical anatomy and examples

> **React-only** — Charts have no @ramsarjal-404/css distribution — use `@ramsarjal-404/react`.

##### In a ChartCard

Each series carries `points` of `{ x, y, r }` — `r` is a literal pixel radius. `ChartLegend`
names the series.

**Example — Security group changes by server**

React:

```jsx
import { BubbleChart, ChartCard, ChartLegend, CHART_COLORS } from '@ramsarjal-404/react';

// each point: x/y position plus a literal pixel radius r; label feeds the tooltip
const SERIES = [
  {
    name: 'File servers',
    points: [
      { x: 12, y: 30, r: 24, label: 'FS1' },
      { x: 28, y: 55, r: 14, label: 'FS2' },
      { x: 44, y: 38, r: 10, label: 'FS3' },
    ],
  },
  {
    name: 'Domain controllers',
    points: [
      { x: 35, y: 72, r: 12, label: 'DC1' },
      { x: 58, y: 48, r: 23, label: 'DC2' },
    ],
  },
  {
    name: 'SQL servers',
    points: [
      { x: 82, y: 35, r: 21, label: 'SQL1' },
      { x: 64, y: 22, r: 10, label: 'SQL2' },
    ],
  },
];

<ChartCard
  title="Security Group Changes"
  lastUpdated="Last Updated on 12/06/2026 09:40 AM"
>
  <BubbleChart
    series={SERIES}
    aria-label="Security group changes by server type, bubble size shows change volume; largest cluster on DC2"
  />
  <ChartLegend
    items={SERIES.map((s, i) => ({ label: s.name, color: CHART_COLORS[i] }))}
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bubble-chart--in-chart-card)

##### Bare with fixed axes

`xMax`/`yMax` pin the scales (useful when several charts must share axes), `height` shortens
the plot, and `showGrid` can drop the background grid.

**Example — Two series, pinned 0–100 axes**

React:

```jsx
import { BubbleChart, ChartCard } from '@ramsarjal-404/react';

// xMax/yMax pin the scales so several charts can share axes
<ChartCard title="Risk vs Exposure">
  <BubbleChart
    series={[
      {
        name: 'Open shares',
        points: [
          { x: 20, y: 65, r: 18, label: 'Finance' },
          { x: 45, y: 40, r: 12, label: 'HR' },
        ],
      },
      {
        name: 'Stale accounts',
        points: [
          { x: 70, y: 80, r: 22, label: 'Contractors' },
          { x: 55, y: 25, r: 9, label: 'Service accounts' },
        ],
      },
    ]}
    xMax={100}
    yMax={100}
    height={200}
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-bubble-chart--bare)

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `height` | `number` | `240` | Plot height in px (default 240); width tracks the container |
| `series` * | `BubbleSeries[]` | — |  |
| `showGrid` | `boolean` | `true` | Light background grid (default true) |
| `xMax` | `number` | — | Axis maxima — default to a "nice" ceiling of the data |
| `yMax` | `number` | — |  |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Hovering a bubble shows a native tooltip — "Product 1 — FS1: (12, 30)" — from an SVG
  `<title>` element. The tooltip states the coordinates and optional point `label`, but not the
  radius; magnitude is conveyed visually only.
- Nothing in the chart is clickable.

**Keyboard**

The chart contains **no focusable elements** — it is a single inline SVG. Keyboard users cannot
reach the per-bubble tooltips, and unlike DonutChart or GaugeChart there is no text rendering of
the values at all. A data table or text summary alongside the chart is **required**, not
optional, for this component.

**Screen readers**

- The chart root is a single `role="img"` with a generated `aria-label` — for example
  "Bubble chart of Product 1, Product 2, Product 3" — which names the series and nothing else.
  Override `aria-label` with the actual finding ("Security group changes cluster on FS1, the
  largest at 24 events").
- The grid is `aria-hidden="true"`; bubbles and their SVG `<title>` tooltips are not reliably
  announced.
- This is the **most visual-only chart in the kit**: no axis labels, no rendered values. Always
  accompany it with a [Table](https://lepide-design-system.vercel.app/components/table/) of the underlying data or a text summary.

##### Development considerations

- Always pass a meaningful `aria-label` — the generated one carries no data whatsoever.
- Don't encode meaning in color alone: series differ only by bubble color, so keep the
  `ChartLegend` adjacent, and remember the `--color-chart-series-*` tokens shift per theme —
  never hardcode hex per series.
- The axes have no tick labels — if readers need to know what x and y mean (they do), state the
  dimensions in the card title or a caption: "Changes by hour (x) and scope (y), sized by
  volume".
- Map magnitudes to the `r` pixel radius deliberately — by area, not radius, if honest size
  comparison matters (a 2× radius reads as 4× the quantity).

##### Content

- Name the x, y, and size dimensions explicitly in the `ChartCard` title or adjacent text —
  the chart itself never will.
- Give notable points a `label` so their tooltips identify them ("FS1"), not just coordinates.
- Use the same series names as the rest of the product so the legend and report tables line up.

#### Hard-fail checks — BubbleChart

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="column-chart"></a>

### ColumnChart

Vertical bar chart for comparing series across time buckets or short-named categories — grouped, stacked, or single-series.

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { ColumnChart } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/column-chart/ · **Storybook:** [Grouped](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-column-chart--grouped), [Stacked](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-column-chart--stacked), [Single Series](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-column-chart--single-series)
- **Related:** [bar-chart](#bar-chart), [line-chart](#line-chart), [card](#card)

#### Purpose and usage rules

##### Overview

ColumnChart is the vertical counterpart of [BarChart](https://lepide-design-system.vercel.app/components/bar-chart/) in the same visual
grammar: thin columns (10px by default) with rounded tops, dashed horizontal gridlines, and a
y-axis on the left. Reading left-to-right makes it the natural shape for **time buckets** —
alerts per month, backups per day — answering "how does each bucket compare?". Columns scale to
a "nice" ceiling of the data maximum (override with `max`), and series take the shared chart
palette (`--color-chart-series-1…6`), so dark and high-contrast themes recolor everything
automatically.

##### Best practices

- Use for **time-bucketed comparisons** (per month, per day) and other short category labels
  that fit under a column.
- Keep to **2–3 series per group**; grouped columns get noisy fast. Widen segmented columns —
  `columnWidth` of 18px reads better when `stacked`.
- Use `stacked` when the **bucket total** is the headline (total alert volume per month) and the
  breakdown is secondary.
- With a **single series**, `colorByCategory` colors each column from the palette — use it only
  when categories are distinct things, not points in time.
- Wrap in `ChartCard`, name series with `ChartLegend`, and take colors from `CHART_COLORS`
  (the `--color-chart-series-*` tokens) — never hardcoded hex.

##### When not to use

- **Long category names or many categories** — use [BarChart](https://lepide-design-system.vercel.app/components/bar-chart/);
  horizontal bars give labels room.
- **Continuous trends** where the shape of the line is the message — use
  [LineChart](https://lepide-design-system.vercel.app/components/line-chart/).
- **Part-to-whole composition** (≤5 parts) — use [DonutChart](https://lepide-design-system.vercel.app/components/donut-chart/).

##### Configurations

**Grouped (default)**

One group of columns per category, series i = column i in every group.

▶ Live: [Grouped columns in a ChartCard with legend](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-column-chart--grouped)

**Stacked**

`stacked` joins each group into one segmented column sized by the category total. Pair with a
wider `columnWidth` so segments stay legible.

▶ Live: [Stacked, 18px columns](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-column-chart--stacked)

**Single series**

One column per category with a per-series `color` override from the palette.

▶ Live: [Single series, brand-blue override](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-column-chart--single-series)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | `role="img"` div with a generated `aria-label` |
| 2 | Y-axis | Numeric ticks on the left (default 4 divisions via `ticks`), 10px text |
| 3 | Plot area | Height set by `height` (default 220px); width tracks the container |
| 4 | Gridlines | Dashed horizontal lines at every tick — `--color-chart-grid` |
| 5 | Columns | Rounded-top columns, `columnWidth` px wide (default 10); one segmented column when `stacked` |
| 6 | Category labels | Centered under each group along the bottom |
| 7 | Legend *(composed)* | `ChartLegend` placed below the chart inside the `ChartCard` |
| 8 | Tooltip | Native browser tooltip per column: "Jan — Failed: 12" |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Hover tooltip | Every column/segment carries a native `title` — "category — series: value", formatted by `formatValue` |
| Axis scaling | Y-axis max defaults to a nice ceiling of the data (stacked: of category totals); `max` and `ticks` override |
| Legend | `ChartLegend` is a static key — it names series but does not toggle or filter them |
| Responsive sizing | The plot stretches to the container width; column groups distribute evenly, column width stays fixed |
| Theming | Series resolve through `--color-chart-series-1…6` and gridlines through `--color-chart-grid` — both re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Use ColumnChart for time buckets with short labels — months, days, hours — read left to right.
- ✕ **Don't** — Cram long server or department names under columns; switch to BarChart so labels get a full row.

#### Canonical anatomy and examples

> **React-only** — Charts have no @ramsarjal-404/css distribution — use `@ramsarjal-404/react`.

##### Grouped in a ChartCard

`ChartCard` supplies the surface, `ColumnChart` plots the data, `ChartLegend` names the series.

**Example — Grouped columns in a ChartCard**

React:

```jsx
import { ColumnChart, ChartCard, ChartLegend, CHART_COLORS } from '@ramsarjal-404/react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const SERIES = [
  { name: 'Failed', values: [12, 18, 9, 24, 32, 22] },
  { name: 'Warning', values: [22, 14, 26, 18, 24, 35] },
  { name: 'Healthy', values: [45, 52, 40, 58, 49, 66] },
];

<ChartCard
  title="Alerts Per Month"
  lastUpdated="Last Updated on 12/06/2026 09:40 AM"
>
  <ColumnChart categories={MONTHS} series={SERIES} />
  <ChartLegend
    items={SERIES.map((s, i) => ({ label: s.name, color: CHART_COLORS[i] }))}
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-column-chart--grouped)

##### Stacked

`stacked` joins each group into one segmented column sized by the bucket total; widen
`columnWidth` so segments stay legible.

**Example — Stacked columns**

React:

```jsx
import { ColumnChart, ChartCard, ChartLegend, CHART_COLORS } from '@ramsarjal-404/react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const SERIES = [
  { name: 'Critical', values: [12, 18, 9, 24, 32, 22] },
  { name: 'Warning', values: [22, 14, 26, 18, 24, 35] },
  { name: 'Info', values: [45, 52, 40, 58, 49, 66] },
];

// stacked columns size by the bucket total — widen them so segments stay legible
<ChartCard title="Alert Volume Per Month">
  <ColumnChart categories={MONTHS} series={SERIES} stacked columnWidth={18} />
  <ChartLegend
    items={SERIES.map((s, i) => ({ label: s.name, color: CHART_COLORS[i] }))}
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-column-chart--stacked)

##### Single series

One series with a per-series `color` from the palette tokens. With a single series you can also
set `colorByCategory` to color each column from the palette instead.

**Example — Single series**

React:

```jsx
import { ColumnChart, ChartCard, CHART_COLORS } from '@ramsarjal-404/react';

<ChartCard title="Backups Per Month">
  <ColumnChart
    categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
    series={[
      // per-series color must reference a --color-chart-series-* token
      { name: 'Backups', values: [42, 28, 65, 12, 38, 51], color: CHART_COLORS[3] },
    ]}
    columnWidth={14}
    ticks={4}
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-column-chart--single-series)

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `categories` * | `string[]` | — | Labels under the columns |
| `colorByCategory` | `boolean` | `false` | With a single series, color each category's column from the palette |
| `columnWidth` | `number` | `10` | Column width in px (default 10) |
| `formatValue` | `((value: number) => string)` | — |  |
| `height` | `number` | `220` | Plot height in px (default 220) |
| `max` | `number` | — | Axis maximum — defaults to a "nice" ceiling of the data max |
| `series` * | `ChartSeries[]` | — | One group of columns per category; series i = column i in every group |
| `stacked` | `boolean` | `false` | One segmented column per category instead of a group |
| `ticks` | `number` | `4` | Number of y-axis divisions (default 4) |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Hovering a column or stacked segment shows a native browser tooltip — "Jan — Failed: 12" —
  via the element's `title` attribute. Columns do not change color or size on hover.
- Nothing in the chart is clickable.

**Keyboard**

The chart contains **no focusable elements**. Columns, gridlines, and labels are plain
`div`/`span` elements — keyboard users cannot tab into the chart or reach the per-column
tooltips. Provide the values in a keyboard-reachable form: a data table or a text summary next
to the chart.

**Screen readers**

- The chart root is a single `role="img"` with a generated `aria-label` — for example
  "Column chart of Failed, Warning, Healthy by 6 categories". Override `aria-label` with the
  real insight ("Alert volume peaked in June at 123"), not just the series names.
- The y-axis, gridlines, and x-axis labels are `aria-hidden="true"`; per-column `title`
  tooltips are not reliably announced.
- The chart is effectively **visual-only beyond its label**. Pair it with a
  [Table](https://lepide-design-system.vercel.app/components/table/) of the same data, or a text summary, so the values themselves are
  accessible.

##### Development considerations

- Always pass a meaningful `aria-label` — the generated one names the series but carries no
  values or conclusion.
- Don't encode meaning in color alone: keep the `ChartLegend` adjacent, and remember the
  `--color-chart-series-*` tokens shift per theme, so never hardcode hex per series.
- Provide the underlying data as a table or report download for keyboard and screen-reader
  users.
- Use `formatValue` consistently so y-axis ticks and tooltips agree on units.

##### Content

- Keep x-axis labels short — month or day abbreviations ("Jan", "Mon"); long names belong on a
  [BarChart](https://lepide-design-system.vercel.app/components/bar-chart/).
- State the unit in the card title ("Alerts per month") rather than repeating it on every tick.
- Name series with the same status words used elsewhere in the product: "Failed", "Warning",
  "Healthy".

#### Hard-fail checks — ColumnChart

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="donut-chart"></a>

### DonutChart

Part-to-whole ring with a center stat and a built-in value legend — for compositions of five or fewer segments.

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { DonutChart } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/donut-chart/ · **Storybook:** [In Chart Card](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-donut-chart--in-chart-card), [With Legend](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-donut-chart--with-legend), [Thin Ring](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-donut-chart--thin-ring)
- **Related:** [bar-chart](#bar-chart), [gauge-chart](#gauge-chart), [card](#card)

#### Purpose and usage rules

##### Overview

DonutChart shows part-to-whole composition — how a total breaks down into a handful of named
parts. Segments are drawn as a proportional ring on a subtle track, with a center stat (the sum
of values by default — override with `centerValue` and `centerLabel`) and a built-in legend on
the right that prints the **exact value** of every segment. It answers "what is this made of?":
alert status breakdown, license distribution. Segments take the shared chart palette
(`--color-chart-series-1…6`) in data order, so themes recolor the ring automatically.

##### Best practices

- Keep to **~5 segments or fewer** — donut slices below roughly 10% become hard to compare.
  Beyond that, a horizontal [BarChart](https://lepide-design-system.vercel.app/components/bar-chart/) compares parts more honestly.
- **Keep the legend** (it's on by default): it carries the exact values, so the ring never has
  to be read by eye alone. Use `hideLegend` only when an external `ChartLegend` or table sits
  next to the chart.
- Use the **center stat** for the headline number — the total by default, or a derived figure
  ("96% compliant") via `centerValue` + `centerLabel`.
- Order segments meaningfully (severity, size) — palette colors are assigned by index, so order
  is also color assignment.
- Take per-segment `color` overrides from `CHART_COLORS` (the `--color-chart-series-*` tokens) —
  never hardcoded hex.

##### When not to use

- **More than ~5 parts** or parts of similar size — use [BarChart](https://lepide-design-system.vercel.app/components/bar-chart/);
  humans compare lengths far better than arc angles.
- **Trends over time** — use [LineChart](https://lepide-design-system.vercel.app/components/line-chart/); a donut is a single snapshot.
- **One number judged against a scale** — use [GaugeChart](https://lepide-design-system.vercel.app/components/gauge-chart/); a
  one-segment donut is a gauge in disguise.
- **Cross-category comparison** of independent values — use
  [ColumnChart](https://lepide-design-system.vercel.app/components/column-chart/).

##### Configurations

**Default (with legend)**

Ring, center total, and the built-in value legend on the right, inside a `ChartCard`.

▶ Live: [Alert status breakdown with center total and value legend](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-donut-chart--in-chart-card)

**Thin ring, no legend**

`thickness`, `size`, and `hideLegend` tune it down to a compact dashboard stat — pair with an
external `ChartLegend` or table.

▶ Live: [12px ring at 140px, legend hidden](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-donut-chart--thin-ring)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | `role="img"` div with a generated `aria-label` listing every segment and value |
| 2 | Track | Full circle in `--color-chart-grid-subtle` behind the segments |
| 3 | Segments | Proportional ring arcs, `thickness` px (default 22), palette colors in data order |
| 4 | Center value | Big number in the hole — sum of values by default, `centerValue` overrides |
| 5 | Center label *(optional)* | Caption under the value via `centerLabel` |
| 6 | Legend *(default on)* | Built-in list on the right: swatch, label, exact value; `hideLegend` removes it |
| 7 | Tooltip | Native SVG `title` per segment: "Failed: 32" |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Hover tooltip | Each segment carries an SVG `title` — "label: value", formatted by `formatValue` |
| Center stat | Defaults to the formatted sum of all values; `centerValue` accepts any node |
| Legend | Built-in and static — it prints exact values but does not toggle or filter segments |
| Sizing | Fixed-diameter ring (`size`, default 180px); the legend wraps beside it as space allows |
| Theming | Segments resolve through `--color-chart-series-1…6` and the track through `--color-chart-grid-subtle` — re-resolved under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Show one composition with up to ~5 segments, largest or most severe first, with the legend visible.
- ✕ **Don't** — Pack 8+ near-equal segments into the ring — switch to a BarChart where lengths do the comparing.

#### Canonical anatomy and examples

> **React-only** — Charts have no @ramsarjal-404/css distribution — use `@ramsarjal-404/react`.

##### Default with legend

`data` is an array of `{ label, value }` segments; the center shows the sum and the built-in
legend prints exact values.

**Example — Alert status breakdown**

React:

```jsx
import { DonutChart, ChartCard } from '@ramsarjal-404/react';

const DATA = [
  { label: 'Failed', value: 32 },
  { label: 'Warning', value: 58 },
  { label: 'Healthy', value: 210 },
];

// center shows the sum (300) by default; the built-in legend prints exact values
<ChartCard title="Alert Status Breakdown" lastUpdated="Last Updated on 12/06/2026 09:40 AM">
  <DonutChart data={DATA} centerLabel="Total Alerts" />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-donut-chart--with-legend)

##### Custom center stat

`centerValue` and `centerLabel` replace the default sum — here a derived compliance figure with
`formatValue` keeping the legend consistent.

**Example — Derived center value**

React:

```jsx
import { DonutChart, ChartCard } from '@ramsarjal-404/react';

const DATA = [
  { label: 'Compliant', value: 1184 },
  { label: 'At risk', value: 37 },
  { label: 'Non-compliant', value: 12 },
];

<ChartCard title="Data Classification Coverage">
  <DonutChart
    data={DATA}
    centerValue="96%"
    centerLabel="Compliant"
    formatValue={(v) => v.toLocaleString()}
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render (default center: sum of values)](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-donut-chart--in-chart-card)

##### Thin ring, no legend

A compact dashboard stat: thinner ring, smaller diameter, `hideLegend` — pair with an external
legend or table.

**Example — Compact ring**

React:

```jsx
import { DonutChart, ChartCard } from '@ramsarjal-404/react';

// compact dashboard stat — pair with an external ChartLegend or data table
<ChartCard title="Alerts">
  <DonutChart
    data={[
      { label: 'Failed', value: 32 },
      { label: 'Warning', value: 58 },
      { label: 'Healthy', value: 210 },
    ]}
    size={140}
    thickness={12}
    hideLegend
    centerLabel="Alerts"
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-donut-chart--thin-ring)

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `centerLabel` | `ReactNode` | — | Caption under the center value (e.g. "Total Alerts") |
| `centerValue` | `ReactNode` | — | Big number in the hole — defaults to the sum of values |
| `data` * | `DonutDatum[]` | — |  |
| `formatValue` | `((value: number) => string)` | — |  |
| `hideLegend` | `boolean` | `false` | Hide the built-in legend (values + labels on the right) |
| `size` | `number` | `180` | Outer diameter, px (default 180) |
| `thickness` | `number` | `22` | Ring thickness, px (default 22) |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Hovering a ring segment shows a native tooltip — "Failed: 32" — from an SVG `<title>`
  element. Segments do not grow, pop, or change color on hover.
- Nothing in the chart is clickable.

**Keyboard**

The chart contains **no focusable elements** — the ring is an SVG and the legend is a static
list. Keyboard users cannot reach the per-segment tooltips, but unlike the other charts the
built-in legend renders every label and exact value as plain text, so the data is at least
readable in page flow.

**Screen readers**

- The chart root is a single `role="img"` whose generated `aria-label` lists **every segment
  with its value** — "Donut chart: Failed 32, Warning 58, Healthy 210" — making DonutChart the
  most self-describing chart in the kit. Override `aria-label` when a conclusion reads better
  than the list.
- The center value and built-in legend are real text inside the `role="img"` container, so they
  are subsumed by the label rather than read separately — keep the label complete.
- SVG `<title>` tooltips are not reliably announced; don't rely on them.

##### Development considerations

- Don't encode meaning in color alone: segment colors come from `--color-chart-series-*` tokens
  that shift per theme. The built-in value legend is the mitigation — think twice before
  `hideLegend`, and if you do hide it, place an external `ChartLegend` or data table adjacent.
- Negative values are clamped to 0 when computing proportions — sanitize data upstream rather
  than relying on that.
- Use `formatValue` so the center stat, legend values, and tooltips agree on formatting.

##### Content

- Segment labels should be the same status words used elsewhere in the product: "Failed",
  "Warning", "Healthy".
- Give the center stat a `centerLabel` that names the unit ("Total Alerts") — a bare number in
  a hole is ambiguous.
- State the scope and period in the `ChartCard` title ("Alert Status Breakdown — last 30 days").

#### Hard-fail checks — DonutChart

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="gauge-chart"></a>

### GaugeChart

Semi-circular KPI dial for one reading against a scale — fixed color or threshold bands that follow the value.

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { GaugeChart } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/gauge-chart/ · **Storybook:** [Default](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-gauge-chart--default), [Thresholds](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-gauge-chart--thresholds)
- **Related:** [donut-chart](#donut-chart), [bar-chart](#bar-chart), [card](#card)

#### Purpose and usage rules

##### Overview

GaugeChart reports **one number judged against a scale** — health score, risk level, capacity —
as a rounded arc sweeping a semi-circular track, with the reading rendered as text in the
center and 0/max bounds under the ends. Values are clamped to `0…max` (default max 100). The
arc is brand blue (`--color-chart-series-4`) by default, takes a fixed `color`, or bands by
reading with `thresholds`: the first entry whose `upTo` is at or above the value wins — green
up to 60, yellow up to 85, red beyond.

##### Best practices

- Use for a **single KPI that needs instant judgment** — is this number fine, worrying, or
  critical? The scale and bands do the judging for the reader.
- Use `thresholds` with the chart palette (`CHART_COLORS` green/yellow/red — the
  `--color-chart-series-3/2/1` tokens) so the band colors re-theme with everything else; never
  hardcoded hex.
- Always pass a `label` naming the metric ("Health Score", "Risk Score") — a bare number under
  an arc is ambiguous.
- Keep `max` honest: a gauge implies the value can fill the arc. If there's no natural maximum,
  a gauge is the wrong chart.
- Wrap in `ChartCard` like the other charts; one gauge per card.

##### When not to use

- **Several readings side by side** — a row of gauges is hard to compare; use
  [BarChart](https://lepide-design-system.vercel.app/components/bar-chart/) so lengths line up.
- **Part-to-whole composition** — use [DonutChart](https://lepide-design-system.vercel.app/components/donut-chart/); a gauge shows one
  fraction, not a breakdown.
- **A value changing over time** — use [LineChart](https://lepide-design-system.vercel.app/components/line-chart/); the gauge is a
  snapshot.

##### Configurations

**Default**

Brand-blue arc with the reading centered and the metric named by `label`.

▶ Live: [Health score, default brand-blue arc](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-gauge-chart--default)

**Threshold bands**

`thresholds` colors the arc by the reading — the same gauge turns green, yellow, or red as the
value climbs through the bands.

▶ Live: [42 / 74 / 93 across green, yellow, and red bands](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-gauge-chart--thresholds)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | `role="img"` div with a generated `aria-label` ("Gauge: 72 of 100") |
| 2 | Track | Semi-circular arc in `--color-chart-grid-subtle`, `thickness` px (default 18) |
| 3 | Value arc | Rounded-cap arc from 0 to the reading; fixed `color` or threshold band |
| 4 | Center value | The reading as text, formatted by `formatValue` |
| 5 | Label *(optional)* | Caption under the value naming the metric |
| 6 | Bounds | "0" and the formatted `max` under the arc ends |
| 7 | Tooltip | Native SVG `title` on the arc: "72 / 100" |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Hover tooltip | The value arc carries an SVG `title` — "value / max" |
| Clamping | Readings below 0 or above `max` are clamped before drawing and display |
| Threshold coloring | First `thresholds` entry whose `upTo` ≥ value sets the arc color; `color` is ignored when `thresholds` is set |
| Sizing | Fixed footprint — `size` sets the overall width (default 200px), `thickness` the arc weight |
| Theming | Default arc is `--color-chart-series-4`, track is `--color-chart-grid-subtle` — re-resolved under `data-theme="dark"` and `"hc"`; pass token-based threshold colors to keep bands themable |

- ✓ **Do** — Show one reading with a real maximum, named by label, with threshold bands from the chart palette tokens.
- ✕ **Don't** — Line up four gauges to compare servers — arcs at different angles defeat comparison; use a BarChart.

#### Canonical anatomy and examples

> **React-only** — Charts have no @ramsarjal-404/css distribution — use `@ramsarjal-404/react`.

##### Default

One required prop — `value` — judged against `max` (default 100). `label` names the metric.

**Example — Health score**

React:

```jsx
import { GaugeChart, ChartCard } from '@ramsarjal-404/react';

<ChartCard title="System Health">
  <GaugeChart
    value={72}
    label="Health Score"
    aria-label="Health score: 72 of 100"
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-gauge-chart--default)

##### Threshold bands

`thresholds` colors the arc by reading: the first entry whose `upTo` is at or above the value
wins. Take band colors from `CHART_COLORS` so they re-theme.

**Example — Risk score with green/yellow/red bands**

React:

```jsx
import { GaugeChart, ChartCard, CHART_COLORS } from '@ramsarjal-404/react';

// first entry whose upTo >= value wins; CHART_COLORS keeps bands themable
// (CHART_COLORS[2] green, [1] yellow, [0] red — the --color-chart-series-* tokens)
<ChartCard title="Risk Levels">
  <GaugeChart
    value={74}
    label="Risk Score"
    thresholds={[
      { upTo: 60, color: CHART_COLORS[2] },
      { upTo: 85, color: CHART_COLORS[1] },
      { upTo: 100, color: CHART_COLORS[0] },
    ]}
    aria-label="Risk score: 74 of 100"
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-gauge-chart--thresholds)

##### Custom scale and formatting

`max`, `size`, `thickness`, and `formatValue` tune the gauge to non-percentage scales.

**Example — Storage capacity in TB**

React:

```jsx
import { GaugeChart, ChartCard } from '@ramsarjal-404/react';

// non-percentage scale: formatValue keeps the value, max bound, and tooltip in TB
<ChartCard title="Archive Storage">
  <GaugeChart
    value={6.4}
    max={8}
    label="Capacity Used"
    size={170}
    thickness={14}
    formatValue={(v) => v + ' TB'}
    aria-label="Archive storage: 6.4 of 8 terabytes used"
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `string` | — | Arc color (default brand blue). Ignored when `thresholds` is set. |
| `formatValue` | `((value: number) => string)` | — |  |
| `label` | `ReactNode` | — | Caption under the center value (e.g. "Health Score") |
| `max` | `number` | `100` | Gauge maximum (default 100) |
| `size` | `number` | `200` | Overall width in px (default 200) |
| `thickness` | `number` | `18` | Arc thickness in px (default 18) |
| `thresholds` | `{ upTo: number; color: string; }[]` | — | Color by reading: first entry whose `upTo` ≥ value wins (e.g. green/yellow/red bands) |
| `value` * | `number` | — | Current reading |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Hovering the value arc shows a native tooltip — "72 / 100" — from an SVG `<title>` element.
  The track, value text, and bounds have no hover behavior.
- Nothing in the chart is clickable.

**Keyboard**

The gauge contains **no focusable elements**. That said, it is the least keyboard-hostile chart
in the kit: the reading is rendered as real text in the center, so the essential value is
readable in page flow without any pointer interaction.

**Screen readers**

- The root is a single `role="img"` labeled "Gauge: 72 of 100" by default. **Always override
  `aria-label` with the metric name** — "Risk score: 72 of 100" — since the generated label
  doesn't know what is being measured.
- The center value, `label`, and 0/max bounds are inside the `role="img"` container, so they are
  subsumed by the label rather than read separately — keep the label complete.
- The arc's SVG `<title>` tooltip is not reliably announced; don't rely on it.

##### Development considerations

- Don't encode meaning in color alone: a threshold-banded arc that turns red carries no signal
  for color-blind users or screen readers — the centered value plus a named `label` (and the
  `aria-label`) are the real message. If the band itself matters ("critical"), say so in
  adjacent text or a [Badge](https://lepide-design-system.vercel.app/components/badge/).
- Threshold colors are arbitrary strings — pass `CHART_COLORS` entries (the
  `--color-chart-series-*` tokens) rather than hex so bands re-resolve in dark and
  high-contrast themes.
- Values are clamped to `0…max` for display — surface out-of-range data upstream instead of
  letting the clamp hide it.
- Use `formatValue` so the center value, max bound, and tooltip agree (e.g. "1.2k").

##### Content

- `label` should name the metric in 1–3 words: "Health Score", "Risk Score", "Capacity Used".
- Include the unit when the scale isn't 0–100: `formatValue={(v) => v + ' TB'}` keeps the
  value, bounds, and tooltip consistent.
- Put context (system, period) in the `ChartCard` title — "System Health", not in the gauge
  label.

#### Hard-fail checks — GaugeChart

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

<a id="line-chart"></a>

### LineChart

Multi-series line chart for trends over ordered points — optional soft area fill and point markers with native tooltips.

- **Availability:** **React-only** — no `@ramsarjal-404/css` distribution yet
- **React:** `import { LineChart } from '@ramsarjal-404/react'`
- **Docs:** https://lepide-design-system.vercel.app/components/line-chart/ · **Storybook:** [In Chart Card](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-line-chart--in-chart-card), [Area](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-line-chart--area), [Minimal](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-line-chart--minimal)
- **Related:** [column-chart](#column-chart), [bar-chart](#bar-chart), [card](#card)

#### Purpose and usage rules

##### Overview

LineChart plots one or more series over an ordered set of labels — permission changes per month,
failed logins per day. It answers "which way is this heading?": the shape of the line is the
message. The chart shares the system's chart grammar — dashed vertical gridlines at every x
label, 10px axis text, series in the `--color-chart-series-1…6` palette — and draws its SVG in
real pixels (the container width is measured with a ResizeObserver), so lines, dots, and text
stay crisp at any size. Optional `area` adds a soft 12%-opacity fill under each line; `dots`
(on by default) marks every data point with a tooltip-bearing marker.

##### Best practices

- Use for **ordered data** — time above all. Every series should have exactly one value per
  label.
- Keep to **2–3 series**; lines that cross repeatedly become spaghetti. If the comparison is
  subtle, give each series its own chart.
- Use `area` for **volume-feel trends** (total traffic, cumulative counts) — and prefer a single
  series with it, since overlapping fills obscure each other.
- Keep `dots` on when readers need exact values (each dot carries the tooltip); turn them off
  only for dense, many-point series where the trend is the point.
- Wrap in `ChartCard`, name series with `ChartLegend`, and take series colors from
  `CHART_COLORS` (the `--color-chart-series-*` tokens) — never hardcoded hex.

##### When not to use

- **Unordered categories** (servers, departments) — a line implies continuity that isn't there;
  use [ColumnChart](https://lepide-design-system.vercel.app/components/column-chart/) or [BarChart](https://lepide-design-system.vercel.app/components/bar-chart/).
- **Part-to-whole composition** — use [DonutChart](https://lepide-design-system.vercel.app/components/donut-chart/).
- **A single current reading** against a scale — use [GaugeChart](https://lepide-design-system.vercel.app/components/gauge-chart/);
  a one-point line says nothing.

##### Configurations

**Multi-series (default)**

Series in the shared palette with dots at every point, on a `ChartCard` with a `ChartLegend`.

▶ Live: [Three series over eight months](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-line-chart--in-chart-card)

**Area fill**

`area` adds a soft fill under the line — best with a single series for volume-style trends.

▶ Live: [Single series with area fill](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-line-chart--area)

**Minimal**

A compact configuration: no dots, fewer ticks, shorter `height`.

▶ Live: [Dotless, 180px plot, 3 ticks](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-line-chart--minimal)

##### Anatomy

| # | Part | Notes |
| --- | --- | --- |
| 1 | Container | `role="img"` div with a generated `aria-label`, wrapping one responsive SVG |
| 2 | Y-axis | Numeric tick labels on the left (default 4 divisions via `ticks`), 10px text |
| 3 | Gridlines | Dashed vertical line at every x label — `--color-chart-grid` |
| 4 | Lines | One `polyline` per series, stroked from the chart palette |
| 5 | Area fill *(optional)* | 12%-opacity polygon under each line when `area` |
| 6 | Dots *(default on)* | White-filled, series-stroked markers at every point |
| 7 | X-axis labels | Centered under each gridline along the bottom |
| 8 | Legend *(composed)* | `ChartLegend` placed below the chart inside the `ChartCard` |
| 9 | Tooltip | Native SVG `title` per dot: "Jan — Failed: 12" |

##### Behaviors

| Behavior | Description |
| --- | --- |
| Hover tooltip | Each dot carries an SVG `title` — "label — series: value", formatted by `formatValue`; with `dots` off there are no tooltips |
| Axis scaling | Y-axis max defaults to a nice ceiling of the data max; `max` and `ticks` override |
| Legend | `ChartLegend` is a static key — it names series but does not toggle or filter them |
| Responsive sizing | A ResizeObserver re-measures the container and redraws in real pixels — strokes, dots, and text never stretch |
| Theming | Series resolve through `--color-chart-series-1…6` and gridlines through `--color-chart-grid` — both re-resolve under `data-theme="dark"` and `"hc"` |

- ✓ **Do** — Plot trends over ordered, evenly meaningful labels — months, days, scan runs.
- ✕ **Don't** — Connect unordered categories with a line; the slope between two servers means nothing.

#### Canonical anatomy and examples

> **React-only** — Charts have no @ramsarjal-404/css distribution — use `@ramsarjal-404/react`.

##### Multi-series in a ChartCard

`labels` are the ordered x positions; every series carries one value per label.

**Example — Trend with three series**

React:

```jsx
import { LineChart, ChartCard, ChartLegend, CHART_COLORS } from '@ramsarjal-404/react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const SERIES = [
  { name: 'Failed', values: [12, 18, 9, 24, 32, 22, 38, 30] },
  { name: 'Warning', values: [22, 14, 26, 18, 24, 35, 28, 41] },
  { name: 'Healthy', values: [45, 52, 40, 58, 49, 66, 60, 72] },
];

<ChartCard
  title="Permission Changes Over Time"
  lastUpdated="Last Updated on 12/06/2026 09:40 AM"
>
  <LineChart
    labels={MONTHS}
    series={SERIES}
    aria-label="Permission changes per month: failed changes trending up since March"
  />
  <ChartLegend
    items={SERIES.map((s, i) => ({ label: s.name, color: CHART_COLORS[i] }))}
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-line-chart--in-chart-card)

##### Area fill

`area` adds the soft fill — best with a single series.

**Example — Single series with area fill**

React:

```jsx
import { LineChart, ChartCard, CHART_COLORS } from '@ramsarjal-404/react';

// area adds a soft 12%-opacity fill under the line — best with one series
<ChartCard title="Healthy Objects Trend">
  <LineChart
    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
    series={[
      { name: 'Healthy', values: [45, 52, 40, 58, 49, 66, 60, 72], color: CHART_COLORS[2] },
    ]}
    area
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-line-chart--area)

##### Minimal

A compact trend: no dots, three ticks, 180px plot.

**Example — Compact, dotless trend**

React:

```jsx
import { LineChart, ChartCard } from '@ramsarjal-404/react';

// compact configuration: no dots (also removes tooltips), 3 ticks, shorter plot
<ChartCard title="Failed Logins">
  <LineChart
    labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
    series={[{ name: 'Failed logins', values: [12, 18, 9, 24, 32, 22] }]}
    dots={false}
    ticks={3}
    height={180}
  />
</ChartCard>
```

_React-only example — no plain-CSS rendition exists for this component yet._

▶ Live: [Live render](https://lepide-design-system.vercel.app/storybook/?path=/story/charts-line-chart--minimal)

#### React API

| Prop | Type | Default | Description |
|---|---|---|---|
| `area` | `boolean` | `false` | Soft fill under each line |
| `dots` | `boolean` | `true` | Markers on data points (default true) |
| `formatValue` | `((value: number) => string)` | — |  |
| `height` | `number` | `240` | Plot height in px (default 240); width tracks the container |
| `labels` * | `string[]` | — | X-axis labels — every series should have one value per label |
| `max` | `number` | — | Axis maximum — defaults to a "nice" ceiling of the data max |
| `series` * | `ChartSeries[]` | — |  |
| `ticks` | `number` | `4` | Number of y-axis divisions (default 4) |

_\* required_

#### Accessibility contract

##### Interactions

**Mouse**

- Hovering a data-point dot shows a native tooltip — "Jan — Failed: 12" — from an SVG
  `<title>` element. Dots are the only tooltip targets; the line itself has none, and turning
  `dots` off removes tooltips entirely.
- Nothing in the chart is clickable.

**Keyboard**

The chart contains **no focusable elements** — it is a single inline SVG with no tabbable
content. Keyboard users cannot reach the per-point tooltips, so the values must be available in
a keyboard-reachable form: a data table or a text summary alongside the chart.

**Screen readers**

- The chart root is a single `role="img"` with a generated `aria-label` — for example
  "Line chart of Failed, Warning, Healthy over 8 points". Override `aria-label` with the actual
  insight ("Failed logins trending up since March, peaking at 38 in July").
- The SVG internals — axis text, gridlines, lines, dots — are not exposed as structured
  content, and SVG `<title>` tooltips are not reliably announced.
- The chart is effectively **visual-only beyond its label**. Pair it with a
  [Table](https://lepide-design-system.vercel.app/components/table/) of the same data, or a text summary of the trend.

##### Development considerations

- Always pass a meaningful `aria-label` describing the trend, not just the series names.
- Don't encode meaning in color alone: series differ only by stroke color, so keep the
  `ChartLegend` adjacent — and consider one series per chart when the comparison is subtle.
  The `--color-chart-series-*` tokens shift per theme, so never hardcode hex per series.
- Provide the underlying data as a table or report download.
- Keep `dots` on when exact values matter — they are the only per-point affordance the chart
  has.

##### Content

- X-axis labels should be short and evenly meaningful — "Jan", "Feb", not full dates.
- Put the unit and period in the card title ("Permission changes per month"); format y-ticks
  with `formatValue` when raw numbers are ambiguous.
- Name series consistently with product status vocabulary: "Failed", "Warning", "Healthy".

#### Hard-fail checks — LineChart

- [ ] Plain-HTML output does **not** invent `lp-*` classes for this component; it uses `@ramsarjal-404/react` or carries a system gap note (§8).
- [ ] React usage matches the API table; icons use `currentColor`.
- [ ] Checked in light, dark and hc; keyboard path verified.

---

## 6. Page archetypes and patterns

Classify the screen first, then compose from the mapped components. Each repo pattern below has a live Storybook story.

### Repo patterns (live)

**App Shell** — The frame every Lepide screen sits in — sidebar nav, top bar, content region.

The App Shell is the outermost frame of a Lepide product: a collapsible sidebar for primary navigation, a top bar for context and account actions, and the scrollable content region every other pattern drops into. Start here — get the shell right and every screen inherits consistent navigation and spacing.

Built from: [Sidebar](#sidebar), [Card](#card), [Button](#button), [Toast](#toast) · https://lepide-design-system.vercel.app/patterns/app-shell/

**Dashboard** — An at-a-glance overview — charts, KPIs, and recent activity inside the shell.

A landing surface that answers "what needs my attention?" at a glance: trend charts, headline numbers, and recent activity, arranged in a responsive card grid inside the App Shell. Keep it scannable — lead with the few metrics that drive a decision, link out for the detail.

Built from: [Sidebar](#sidebar), [Breadcrumb](#breadcrumb), [Charts](#charts), [Dropdown](#dropdown) · https://lepide-design-system.vercel.app/patterns/dashboard/

**Audit Report** — The security alert workflow — a severity panel over the evidence and actions.

Lepide's signature surface: a severity Alert Panel that states the finding in plain language, over the supporting evidence — a folder tree, the change table, and the actions to investigate or resolve. Lead with the verdict and the "what happened," then let the user drill into the evidence.

Built from: [Sidebar](#sidebar), [Table](#table), [FolderTree](#folder-tree), [ActionItem](#action-item), [Toggle](#toggle), [Pagination](#pagination), [Button](#button) · https://lepide-design-system.vercel.app/patterns/audit-report/

**Data Table** — A dense records view — status badges, inline progress, and pagination.

The workhorse of any monitoring product: a scannable table of records with status badges, inline progress, and pagination, framed in a card with a clear title and primary action. Keep rows dense but legible, put the most decision-relevant column first, and never paginate away the row count.

Built from: [Card](#card), [Badge](#badge), [Progress](#progress), [Pagination](#pagination), [Button](#button) · https://lepide-design-system.vercel.app/patterns/data-table/

**Settings Form** — A configuration page — labeled fields, validation, and grouped sections.

A configuration surface: labeled fields grouped into sections inside a card, with inline validation and a single primary "Save". Group related settings, write verb-first field labels, and keep the save action visible — never make the user hunt for how to commit a change.

Built from: [Card](#card), [Input](#input), [Textarea](#textarea), [Dropdown](#dropdown), [Stepper](#stepper), [Button](#button) · https://lepide-design-system.vercel.app/patterns/settings-form/

**Report View** — A read-only report — filters, a date range, the table, and an empty state.

A read-only reporting surface: a filter bar and date range above the results table, with a considered empty state for when a query returns nothing. The empty state matters most — tell the user why there are no results and what to change, never just "No data".

Built from: [Sidebar](#sidebar), [Breadcrumb](#breadcrumb), [Filter](#filter), [Calendar](#calendar), [Table](#table), [EmptyState](#empty-state), [Pagination](#pagination), [Button](#button) · https://lepide-design-system.vercel.app/patterns/report-view/

**Team Management** — Users and roles — a table with inline role assignment.

Administering people and access: a table of users with inline role dropdowns, so an admin can reassign permissions without leaving the row. Make the current role obvious, confirm destructive changes (removing access), and keep the table sortable by role.

Built from: [Table](#table), [Dropdown](#dropdown) · https://lepide-design-system.vercel.app/patterns/team-management/

**Guided Workflow** — A multi-step task in a modal — stepper, fields, and a review.

A focused, multi-step task captured in a modal: a Steps indicator across the top, one decision per step, and a final review before commit. Use it for self-contained workflows (configuring a scan, adding a data source) — show progress, allow back, and summarize before the user confirms.

Built from: [Breadcrumb](#breadcrumb), [Steps](#steps), [Input](#input), [Table](#table), [Tag](#tag), [Button](#button) · https://lepide-design-system.vercel.app/patterns/ddc-modal/

### Archetypes

| Archetype | Use for | Composition | Rules |
|---|---|---|---|
| **A. Report library / data table** | Auditor reports, audit logs, scan results | Sidebar · Breadcrumb · page title · toolbar (TextField/Input search, secondary Import/Export, one primary Add) · Table · Pagination · Modal for create/edit · Toast on success · Message for blocking errors · EmptyState when no data | One primary button on the right of the toolbar. Badge for status columns. Table empty cell for filtered-out results, EmptyState for no data at all. |
| **B. Credentials / setup form** | adding credentials, connector, server or tenant setup | Card or Modal · Input rows (label-left on desktop, label-top when narrow) · Dropdown for a known source type · Checkbox for optional scope · footer Cancel + primary Save · Message for a validation summary | Helper text on risky inputs; field-level error text; primary label is specific ("Save credentials", "Connect server"). |
| **C. Alert detail / incident review** | security events, risk alerts, unusual activity | Breadcrumb · AlertPanel · Card with evidence · Table of affected objects · Badge/Tag for severity and source · primary recommended action · secondary export/share | AlertPanel carries urgency; evidence stays structured; danger Button only for destructive irreversible actions. |
| **D. Dashboard / analytics** | overview, health monitoring, activity analytics | Sidebar · title + time filter · Cards with Donut/Gauge/Line/Bar/Column charts (React) · Table for detail · Badge for health · Skeleton while loading | Charts are React-only — provide a text summary for key metrics; never rely on chart color alone. |
| **E. Empty / first-run** | no reports, scans, exports or connected servers | EmptyState illustration · one-line what-is-empty · what happens next · one primary action · optional docs Link | State what is empty, explain what happens next, one clear action, never blame the user. |
| **F. Settings** | preferences, notifications, scan options | SettingsPanel (React) or Sidebar · Cards per setting group · Input / Dropdown / Toggle / Checkbox / Radio · footer actions · Toast after save | Group by task, not backend. Toggle only for immediate on/off; Radio when exactly one; Dropdown for short fixed lists. |

### Need → component

```text
main action            → Button primary          support action         → Button secondary
destructive action     → Button danger + Modal   navigation             → Link (never Button)
read-only status       → Badge (Tag = category)  data rows              → Table (+ Pagination)
no data                → EmptyState              loading, known layout  → Skeleton
loading, short/unknown → Spinner                 inline error           → Message / Input error
passive success        → Toast                   blocking error         → Message or Modal
short fixed options    → Dropdown                long/searchable        → Filter (React)
on/off setting         → Toggle                  independent choices    → Checkbox
exactly one choice     → Radio                   hierarchy              → FolderTree (React) / Breadcrumb
same-context views     → Tabs                    multi-step progress    → Steps
numeric +/-            → Stepper                 label-less quick entry → TextField
multi-line text        → Textarea                icon action row        → ActionItem
scheduling             → Calendar / TimePicker (React)   app navigation → Sidebar
```

## 7. Layout rules for custom composition

Components come from the system; a product screen still needs layout CSS. Layout CSS is allowed **only** for wrappers around components and **only** with tokens.

```css
/* allowed — layout only, tokens only */
.product-shell { min-height: 100vh; background: var(--color-background-page); color: var(--color-text-primary); font-family: var(--font-family-primary); }
.page-header   { display: flex; align-items: center; justify-content: space-between; gap: var(--space-8); padding: var(--space-9); }
.content-grid  { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: var(--space-9); }

/* forbidden — recreates lp-button and will drift from tokens, themes, hover, focus, disabled */
.my-blue-button { background: #1c4599; border-radius: 50px; color: white; padding: 12px 20px; }
```

Use token spacing, surfaces and text colors; responsive grids, not fixed-width hacks; CSS logical properties for RTL safety; never style component internals unless the design-system owner approved a new variant.

## 8. AI generation workflow and output format

**Step 1 — classify the screen:** report/data table · form/setup · alert/incident · settings · analytics/dashboard · empty state · navigation shell · modal/dialog (§6).

**Step 2 — map every need to a component** with the §6 table. If a need maps to a React-only component and the project is plain HTML, write a system gap note.

**Step 3 — generate markup** starting from each component's canonical anatomy (§5). Change only content, data, ids, labels. Add the page shell (§2).

**Step 4 — interaction only through system hooks:** `data-lp-accordion`, `data-lp-autofocus`, `data-lp-dropdown`, `data-lp-modal-close`, `data-lp-modal-open`, `data-lp-stepper`, `data-lp-tabs`, `data-lp-tooltip`, `Lepidus.init(…)`, `Lepidus.initTabs(…)`, `Lepidus.initAccordion(…)`, `Lepidus.initDropdown(…)`, `Lepidus.initStepper(…)`, `Lepidus.openModal(…)`, `Lepidus.closeModal(…)`, `Lepidus.toast(…)`.

**Step 5 — self-check before answering:**

### Observed AI drift — check these first

These are the exact mistakes real assistants made when building a form from this contract while copying the gallery examples correctly. They happen in markup the assistant *composes* rather than copies; each is also repeated inside the affected component's hard-fail list in §5, and the validator (§9) fails every one:

1. **The list element is `lp-dropdown__list` — never `lp-dropdown__options` or any other name.** — observed: an invented class is unstyled; the listbox collapsed into bare buttons.
2. **Every option wraps its text in `<span class="lp-dropdown__option-label">`; the open-panel header contains `lp-dropdown__header-label` and the `--open` chevron.** — observed: `lepidus.js` copies the option label into the trigger — without the span the trigger never updates after a pick.
3. **No native `<select>` anywhere on the page — a theme switcher, a page-size control or a filter are all `lp-dropdown` (`data-lp-dropdown="single"`). Adding `class="lp-input"` to a `<select>` does not make it on-system.** — observed: three consecutive runs shipped a `<select>` for the theme control.
4. **Every `lp-modal` on a real page carries `hidden` and is opened by `data-lp-modal-open="<id>"` or `Lepidus.openModal(id)`. Never place an un-hidden modal in a page.** — observed: a copied example without `hidden` is a fixed overlay that covers the whole screen on load.
5. **Exactly one label per field: `lp-input__label` inside `lp-input__row--label-left|top`. No external `<label for>` next to the component.** — observed: two runs rendered two captions ("Configuration name" and "Name") for one field.
6. **Do not wrap the component in a custom `.field` block that re-implements the label, help and error rows — Input already has `lp-input__message` (+ `--error`, `--indent`) for helper and error text.** — observed: custom wrappers drift from token spacing and skip `aria-describedby` wiring.
7. **Do not write click/keyboard handlers for `.lp-dropdown__trigger`, `.lp-dropdown__option`, `.lp-accordion__trigger`, `.lp-stepper__control`, `.lp-tabs__tab` or `[data-lp-modal-open]` — `lepidus.js` already owns open/close, selection, ARIA sync and Escape. Listen to `lp-dropdown-change` on the wrapper (or `change` on the stepper input) to read values.** — observed: a composed form added its own dropdown controller; both handlers fired per click and the panel toggled closed again — the dropdown never opened.
8. **Page CSS never targets `.lp-*` selectors — no `.lp-dropdown { width: 100% }`, no `.lp-stepper { max-width }`, no `.footer-actions .lp-button { flex: 1 }`, no media-query overrides of `.lp-input__row--label-left`. The width you want already exists as a modifier: `lp-dropdown--full-width`, `lp-stepper--full-width`, `lp-input--full-width`, `lp-textarea--full-width`, `lp-text-field--full-width`, `lp-button--full-width`. For narrow containers choose `lp-input__row--label-top` instead of overriding `--label-left`.** — observed: a composed form shipped 8 such rules; they bypass the token geometry and drift from Storybook in every theme.
9. **Only use token names that exist: surfaces are `--color-background-{page|surface|raised|subtle|cards}`, borders `--color-border-{default|strong|brand|danger}`. Never guess a name and add a hex fallback — `var(--color-border-primary, #dce3ed)` is a hardcoded color with extra steps.** — observed: three invented tokens with hex fallbacks rendered off-system colors that do not re-theme in dark or hc.
10. **Anatomy is `__icon` + `__content` > `__text` > `__title` / `__body` (+ `__actions`, `__close`) — never bare text directly inside `lp-message__content`.** — observed: bare text loses the title/body typography and the icon column.

Rule of thumb: if you are typing a class name from memory rather than copying it from §5, stop and copy.

```text
1. Every component-level need uses an existing Lepidus component (no lookalikes)?
2. No raw hex, no hardcoded spacing/radius/font-size/color?
3. data-theme set; only token variables used in layout CSS?
4. Every lp-* class is in its component's legal set (§5)?
5. Anatomy, native elements, ARIA and data-lp-* hooks match the canonical example?
6. lepidus.css and lepidus.js included; interactions use hooks, not custom JS?
7. Empty / loading / error / disabled states provided where relevant?
8. Light, dark, hc and keyboard path considered?
9. Copy is concise, verb-first, enterprise-calm?
10. Any missing pattern documented as a system gap note, not invented?
```

### Output format

~~~markdown
## Design-system interpretation
- Screen type: …   - Components used: …   - States covered: …
- Accessibility notes: …   - Theme notes: …

## HTML
```html … ```

## Optional layout CSS   (token-only wrappers; nothing on component internals)
```css … ```

## Interaction notes
- Uses lepidus.js for: …

## QA checklist
- [ ] Light · [ ] Dark · [ ] High contrast · [ ] Keyboard path
- [ ] No raw hex · [ ] No invented lp-* classes · [ ] States: empty / loading / error / disabled
~~~

### Worked examples (complete screens, validated)

Full pages assembled only from canonical anatomy plus token-only layout wrappers. Both pass `scripts/validate-lp-html.mjs` and were exercised in a browser (modal focus trap / Escape / restore, toast, multi-select dropdown, dark theme). Use them as the shape of a correct answer.

**report table screen**

```html
<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8" />
  <title>File server reports — Lepidus UI</title>
  <link rel="stylesheet" href="https://lepide-design-system.vercel.app/v1/lepidus.css" />
  <style>
    .product-shell { min-height: 100vh; background: var(--color-background-page); color: var(--color-text-primary); font-family: var(--font-family-primary); }
    .page-body { padding: var(--space-9); display: grid; gap: var(--space-8); }
    .toolbar { display: flex; align-items: center; gap: var(--space-5); }
    .toolbar__spacer { flex: 1; }
  </style>
</head>
<body>
<div class="product-shell">
  <main class="page-body">
    <nav class="lp-breadcrumb" aria-label="Breadcrumb">
      <ol class="lp-breadcrumb__list">
        <li class="lp-breadcrumb__item"><a class="lp-breadcrumb__link" href="/">Home</a><span class="lp-breadcrumb__separator" aria-hidden="true">/</span></li>
        <li class="lp-breadcrumb__item"><a class="lp-breadcrumb__link" href="/reports">Reports</a><span class="lp-breadcrumb__separator" aria-hidden="true">/</span></li>
        <li class="lp-breadcrumb__item"><span class="lp-breadcrumb__current" aria-current="page">File servers</span></li>
      </ol>
    </nav>

    <div class="toolbar">
      <div class="lp-dropdown" data-lp-dropdown="multi">
        <button class="lp-dropdown__trigger" aria-expanded="false" aria-haspopup="listbox">
          <span class="lp-dropdown__trigger-label">Select servers</span>
          <svg class="lp-dropdown__chevron" viewBox="0 0 12 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4 5-4"/></svg>
        </button>
        <div class="lp-dropdown__panel" hidden>
          <div class="lp-dropdown__header">
            <span class="lp-dropdown__header-label">Select servers</span>
            <svg class="lp-dropdown__chevron lp-dropdown__chevron--open" viewBox="0 0 12 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M1 1l5 4 5-4"/></svg>
          </div>
          <div class="lp-dropdown__list" role="listbox" aria-multiselectable="true" aria-label="Select servers">
            <button class="lp-dropdown__option" role="option" aria-checked="true">
              <span class="lp-dropdown__checkbox"><svg viewBox="0 0 11 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 6 4.3 8.8 9.5 2"/></svg></span>
              <span class="lp-dropdown__option-label">LDSP-FS-01</span>
            </button>
            <button class="lp-dropdown__option" role="option" aria-checked="false">
              <span class="lp-dropdown__checkbox"><svg style="visibility:hidden" viewBox="0 0 11 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 6 4.3 8.8 9.5 2"/></svg></span>
              <span class="lp-dropdown__option-label">LDSP-FS-02</span>
            </button>
          </div>
        </div>
      </div>
      <span class="toolbar__spacer"></span>
      <button class="lp-button lp-button--secondary lp-button--md">Export report</button>
      <button class="lp-button lp-button--primary lp-button--md">Add report</button>
    </div>

    <div class="lp-table">
      <table class="lp-table__table">
        <caption style="position: absolute; clip: rect(0 0 0 0)">Monitored servers</caption>
        <thead>
          <tr>
            <th class="lp-table__th" scope="col"><div class="lp-table__header-inner"><span class="lp-table__header-label">Server</span></div></th>
            <th class="lp-table__th" scope="col"><div class="lp-table__header-inner"><span class="lp-table__header-label">Status</span></div></th>
            <th class="lp-table__th" scope="col"><div class="lp-table__header-inner"><span class="lp-table__header-label">Last scan</span></div></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">LDSP-FS-01</span></div></td>
            <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-badge lp-badge--success"><span class="lp-badge__dot"></span>Healthy</span></div></td>
            <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">2 hours ago</span></div></td>
          </tr>
          <tr>
            <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">LDSP-FS-02</span></div></td>
            <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-badge lp-badge--warning"><span class="lp-badge__dot"></span>Degraded</span></div></td>
            <td class="lp-table__td"><div class="lp-table__cell-inner"><span class="lp-table__cell-text">5 hours ago</span></div></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="lp-pagination" role="navigation" aria-label="Pagination">
      <span class="lp-pagination__label">Total Records - 248</span>
      <button class="lp-pagination__button">First</button>
      <button class="lp-pagination__button">Previous</button>
      <input class="lp-pagination__page-input" type="number" value="1" aria-label="Current page" />
      <span class="lp-pagination__label">/25</span>
      <button class="lp-pagination__button">Next</button>
      <button class="lp-pagination__button">Last</button>
      <span class="lp-pagination__label">10/Page</span>
    </div>
  </main>
</div>
<script src="https://lepide-design-system.vercel.app/v1/lepidus.js" defer></script>
</body>
</html>
```

**settings screen**

```html
<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Server settings — Lepidus UI</title>
  <link rel="stylesheet" href="https://lepide-design-system.vercel.app/v1/lepidus.css" />
  <style>
    /* token-only layout wrappers */
    .product-shell { min-height: 100vh; background: var(--color-background-page); color: var(--color-text-primary); font-family: var(--font-family-primary); }
    .page-header { display: flex; align-items: center; justify-content: space-between; gap: var(--space-8); padding: var(--space-9); }
    .page-body { padding: 0 var(--space-9) var(--space-9); max-width: 720px; display: grid; gap: var(--space-9); }
    .form-stack { display: grid; gap: var(--space-8); }
    .footer-actions { display: flex; gap: var(--space-5); justify-content: flex-end; }
  </style>
</head>
<body>
<div class="product-shell">
  <header class="page-header">
    <h1 style="margin:0;font-size:var(--typography-heading-h2-fontSize)">Server settings</h1>
    <span class="lp-badge lp-badge--success"><span class="lp-badge__dot"></span>Connected</span>
  </header>

  <main class="page-body">
    <section class="lp-card lp-card--elevated">
      <div class="lp-card__header"><div class="lp-card__title">General</div></div>
      <div class="lp-card__body form-stack">
        <div class="lp-input lp-input--full-width">
          <div class="lp-input__row lp-input__row--label-left">
            <label class="lp-input__label" for="server-name">Server name</label>
            <div class="lp-input__field">
              <input class="lp-input__input" id="server-name" placeholder="e.g. LDSP-FS-04" />
            </div>
          </div>
        </div>

        <div class="lp-radio-group" role="radiogroup" aria-labelledby="schedule-label">
          <span class="lp-radio-group__label" id="schedule-label">Scan schedule</span>
          <div class="lp-radio-group__options">
            <label class="lp-radio">
              <span class="lp-radio__control">
                <input class="lp-radio__input" type="radio" name="schedule" value="hourly" />
                <span class="lp-radio__circle" aria-hidden="true"><span class="lp-radio__dot"></span></span>
              </span>
              <span class="lp-radio__label">Hourly</span>
            </label>
            <label class="lp-radio">
              <span class="lp-radio__control">
                <input class="lp-radio__input" type="radio" name="schedule" value="daily" checked />
                <span class="lp-radio__circle" aria-hidden="true"><span class="lp-radio__dot"></span></span>
              </span>
              <span class="lp-radio__label">Daily</span>
            </label>
            <label class="lp-radio">
              <span class="lp-radio__control">
                <input class="lp-radio__input" type="radio" name="schedule" value="weekly" />
                <span class="lp-radio__circle" aria-hidden="true"><span class="lp-radio__dot"></span></span>
              </span>
              <span class="lp-radio__label">Weekly</span>
            </label>
          </div>
        </div>
      </div>
      <div class="lp-card__footer footer-actions">
        <button class="lp-button lp-button--secondary lp-button--md">Cancel</button>
        <button class="lp-button lp-button--primary lp-button--md"
                onclick="Lepidus.toast({ title: 'Settings saved', message: 'LDSP-FS-04 will scan daily.', variant: 'success' })">Save changes</button>
      </div>
    </section>

    <section class="lp-card">
      <div class="lp-card__header"><div class="lp-card__title">Danger zone</div></div>
      <div class="lp-card__body">
        <p style="margin:0 0 var(--space-5)">Removing the server stops monitoring and deletes its scan history.</p>
        <button class="lp-button lp-button--danger lp-button--md" data-lp-modal-open="confirm-delete">Delete server</button>
      </div>
    </section>
  </main>
</div>

<div class="lp-modal" id="confirm-delete" hidden>
  <div class="lp-modal__shell lp-modal__shell--sm" role="dialog" aria-modal="true" aria-labelledby="confirm-delete-title">
    <div class="lp-modal__header lp-modal__header--center">
      <h2 class="lp-modal__title" id="confirm-delete-title">Delete server?</h2>
    </div>
    <div class="lp-modal__body">
      <p style="margin:0">LDSP-FS-04 and its scan history will be removed. This cannot be undone.</p>
    </div>
    <div class="lp-modal__footer">
      <button class="lp-button lp-button--secondary lp-button--md" data-lp-modal-close data-lp-autofocus>Cancel</button>
      <button class="lp-button lp-button--danger lp-button--md" data-lp-modal-close>Delete server</button>
    </div>
  </div>
</div>

<script src="https://lepide-design-system.vercel.app/v1/lepidus.js" defer></script>
</body>
</html>
```

### System gap note (when a pattern has no Lepidus component)

```markdown
### System gap note
Required pattern: Searchable async combobox
Closest available Lepidus component: Dropdown / Filter
Risk if we invent locally: keyboard behavior, async state, ARIA and theme tokens drift from Lepidus.
Recommended action: add the component/variant to Storybook and the manifest before production use.
Temporary safe approach: Filter (React) or Input + Table filtering with documented components.
```

## 9. Review gates and automated validation

**Hard fail** — raw hex in component UI · custom CSS recreating a component · invented `lp-*` class · missing `data-theme` support · broken focus visibility · Modal without focus trap/restore · Input error without visible message · status by color only · Table without semantic `<table>` · Dropdown without listbox semantics or `data-lp-dropdown`, or replaced by `<select>`/third-party · disabled states without the native `disabled` attribute · local CSS on component internals.

**Automated check** — the repo ships a validator that applies the mechanical gates to any HTML file (classes against the manifest, hooks against `lepidus.js`, raw hex outside `var()` fallbacks, Modal / Dropdown / Tabs / Table structure, shell includes):

```bash
node scripts/validate-lp-html.mjs path/to/screen.html      # exit 1 on any failure
```

```bash
# raw hex outside a var() fallback
grep -rnE '#[0-9a-fA-F]{3,8}\b' src/ --include='*.html' --include='*.css' --include='*.tsx' | grep -vE 'var\(--[a-z0-9-]+,\s*#'
# every lp-* class in use — compare with §5
grep -rhoE 'lp-[a-zA-Z0-9_-]+' src/ | sort -u
```

## 10. QA model and enterprise copy

**Storybook is the visual contract.** QA compares component style, spacing, states (default/hover/focus/disabled/loading/error), themes, keyboard and ARIA against it. QA still owns product verification: data correctness, permissions, API errors, workflow, browser/device, regression, security, performance.

```text
Storybook correct, product differs  → implementation bug
Storybook lacks the needed state    → design-system gap
Storybook state is wrong            → system bug
Data / permission / API wrong       → product bug
```

**Copy.** Voice: direct, calm, specific, non-marketing. Buttons are verbs (Save changes · Add credentials · Run scan · Export report · Apply filters · Acknowledge alert · View details). Empty states: *what is empty* → *what happens next* → *action* ("No reports found. Create a report or adjust your filters to see results."). Errors: *what failed. how to fix it* ("Connection failed. Check the credentials and try again."). Success: short past tense ("Credentials saved." "Scan started.").

## 11. Token reference

All 535 variables on `:root` with light values; dark and high-contrast columns show overrides where the theme redefines the token (— means inherited).

### `--component-*` (193)

| Variable | Light | Dark | High contrast |
|---|---|---|---|
| `--component-alertpanel-headline-font-size` | `64px` | — | — |
| `--component-filter-footer-gap` | `25px` | — | — |
| `--component-button-padding-x` | `var(--space-9)` | `var(--space-9)` | `var(--space-9)` |
| `--component-button-padding-y` | `var(--space-6)` | `var(--space-6)` | `var(--space-6)` |
| `--component-button-gap` | `var(--space-5)` | `var(--space-5)` | `var(--space-5)` |
| `--component-button-min-width` | `var(--space-12)` | `var(--space-12)` | `var(--space-12)` |
| `--component-input-padding-x` | `var(--space-9)` | `var(--space-9)` | `var(--space-9)` |
| `--component-input-padding-y` | `var(--space-6)` | `var(--space-6)` | `var(--space-6)` |
| `--component-badge-padding-x` | `var(--space-7)` | `var(--space-7)` | `var(--space-7)` |
| `--component-badge-padding-y` | `var(--space-3)` | `var(--space-3)` | `var(--space-3)` |
| `--component-badge-gap` | `var(--space-3)` | `var(--space-3)` | `var(--space-3)` |
| `--component-card-padding` | `var(--space-9)` | `var(--space-9)` | `var(--space-9)` |
| `--component-card-gap` | `var(--space-10)` | `var(--space-10)` | `var(--space-10)` |
| `--component-table-cell-padding-x` | `var(--space-5)` | `var(--space-5)` | `var(--space-5)` |
| `--component-table-cell-padding-y` | `var(--space-5)` | `var(--space-5)` | `var(--space-5)` |
| `--component-modal-padding` | `var(--space-9)` | `var(--space-9)` | `var(--space-9)` |
| `--component-modal-header-padding-y` | `var(--space-8)` | `var(--space-8)` | `var(--space-8)` |
| `--component-modal-footer-padding-x` | `var(--space-9)` | `var(--space-9)` | `var(--space-9)` |
| `--component-modal-footer-padding-y` | `var(--space-6)` | `var(--space-6)` | `var(--space-6)` |
| `--component-modal-footer-gap` | `var(--space-5)` | `var(--space-5)` | `var(--space-5)` |
| `--component-icon-size-sm` | `var(--space-11)` | `var(--space-11)` | `var(--space-11)` |
| `--component-icon-size-md` | `var(--space-12)` | `var(--space-12)` | `var(--space-12)` |
| `--component-button-focus-ring` | `var(--color-focus-ring)` | — | — |
| `--component-button-radius` | `var(--radius-button)` | — | — |
| `--component-button-fontSize` | `var(--typography-button-fontSize)` | — | — |
| `--component-button-lineHeight` | `var(--typography-button-lineHeight)` | — | — |
| `--component-button-paddingX` | `var(--component-button-padding-x)` | — | — |
| `--component-button-paddingY` | `var(--component-button-padding-y)` | — | — |
| `--component-button-primary-fill` | `var(--color-button-primary-bg)` | — | — |
| `--component-button-primary-text` | `var(--color-button-primary-text)` | — | — |
| `--component-button-primary-hover-fill` | `var(--color-button-primary-hover)` | — | — |
| `--component-button-primary-stroke` | `var(--color-button-primary-bg)` | — | — |
| `--component-button-secondary-fill` | `var(--color-button-secondary-bg)` | — | — |
| `--component-button-secondary-text` | `var(--color-button-secondary-text)` | — | — |
| `--component-button-secondary-stroke` | `var(--color-border-brand)` | — | — |
| `--component-button-disabled-fill` | `var(--color-button-disabled-bg)` | — | — |
| `--component-button-disabled-text` | `var(--color-button-disabled-text)` | — | — |
| `--component-button-danger-fill` | `var(--color-button-danger-bg)` | — | — |
| `--component-button-danger-text` | `var(--color-button-danger-text)` | — | — |
| `--component-button-danger-stroke` | `var(--color-border-danger)` | — | — |
| `--component-button-white-fill` | `var(--color-background-surface)` | — | — |
| `--component-button-white-text` | `var(--color-text-brand)` | — | — |
| `--component-button-white-stroke` | `var(--color-border-brand)` | — | — |
| `--component-input-border` | `var(--color-input-border)` | — | — |
| `--component-input-border-focus` | `var(--color-input-border-focus)` | — | — |
| `--component-input-bg` | `var(--color-background-surface)` | — | — |
| `--component-input-bg-focus` | `var(--color-input-bg-focus)` | — | — |
| `--component-input-bg-disabled` | `var(--color-input-bg-disabled)` | — | — |
| `--component-input-text` | `var(--color-text-primary)` | — | — |
| `--component-input-placeholder` | `var(--color-text-disabled)` | — | — |
| `--component-input-label` | `var(--color-text-secondary)` | — | — |
| `--component-input-radius` | `var(--radius-input)` | — | — |
| `--component-input-fontSize` | `var(--typography-input-fontSize)` | — | — |
| `--component-input-lineHeight` | `var(--typography-input-lineHeight)` | — | — |
| `--component-input-paddingX` | `var(--component-input-padding-x)` | — | — |
| `--component-input-paddingY` | `var(--component-input-padding-y)` | — | — |
| `--component-table-header-bg` | `var(--color-table-header-bg)` | — | — |
| `--component-table-header-text` | `var(--color-table-header-text)` | — | — |
| `--component-table-cell-bg` | `var(--color-background-surface)` | — | — |
| `--component-table-cell-text` | `var(--color-table-cell-text)` | — | — |
| `--component-table-border` | `var(--color-table-border)` | — | — |
| `--component-table-row-hover` | `var(--color-table-row-hover)` | — | — |
| `--component-table-header-fontSize` | `var(--typography-table-header-fontSize)` | — | — |
| `--component-table-cell-fontSize` | `var(--typography-table-cell-fontSize)` | — | — |
| `--component-table-cellPaddingX` | `var(--component-table-cell-padding-x)` | — | — |
| `--component-table-cellPaddingY` | `var(--component-table-cell-padding-y)` | — | — |
| `--component-card-bg` | `var(--color-background-cards)` | — | — |
| `--component-card-border` | `var(--color-border-default)` | — | — |
| `--component-card-radius` | `var(--radius-card)` | — | — |
| `--component-card-title-text` | `var(--color-text-primary)` | — | — |
| `--component-card-body-text` | `var(--color-text-secondary)` | — | — |
| `--component-modal-bg` | `var(--color-background-surface)` | — | — |
| `--component-modal-overlay` | `var(--color-text-dark)` | — | — |
| `--component-modal-title-text` | `var(--color-text-primary)` | — | — |
| `--component-modal-body-text` | `var(--color-text-secondary)` | — | — |
| `--component-modal-border` | `var(--color-border-default)` | — | — |
| `--component-modal-radius` | `var(--radius-card)` | — | — |
| `--component-modal-title-fontSize` | `var(--typography-modal-title-fontSize)` | — | — |
| `--component-nav-sidebar-bg` | `var(--color-nav-icon-sidebar-bg)` | — | — |
| `--component-nav-icon-color` | `var(--color-nav-icon-color)` | — | — |
| `--component-nav-item-bg` | `var(--color-background-surface)` | — | — |
| `--component-nav-item-text` | `var(--color-nav-item-text)` | — | — |
| `--component-nav-item-active-bg` | `var(--color-nav-item-active-bg)` | — | — |
| `--component-nav-item-active-text` | `var(--color-nav-item-active-text)` | — | — |
| `--component-nav-fontSize` | `var(--typography-nav-fontSize)` | — | — |
| `--component-nav-lineHeight` | `var(--typography-nav-lineHeight)` | — | — |
| `--component-nav-rounded-selected-bg` | `var(--color-nav-item-selected-rounded)` | — | — |
| `--component-nav-rounded-selected-border` | `var(--color-background-subtle)` | — | — |
| `--component-nav-rounded-border` | `var(--color-border-strong)` | — | — |
| `--component-badge-bg` | `var(--color-brand-light)` | — | — |
| `--component-badge-text` | `var(--color-text-brand)` | — | — |
| `--component-badge-radius` | `var(--radius-badge)` | — | — |
| `--component-badge-fontSize` | `var(--typography-badge-fontSize)` | — | — |
| `--component-badge-paddingX` | `var(--component-badge-padding-x)` | — | — |
| `--component-badge-paddingY` | `var(--component-badge-padding-y)` | — | — |
| `--component-status-success-bg` | `var(--color-status-success-bg)` | — | — |
| `--component-status-success-text` | `var(--color-status-success-text)` | — | — |
| `--component-status-error-bg` | `var(--color-status-error-bg)` | — | — |
| `--component-status-error-text` | `var(--color-status-error-text)` | — | — |
| `--component-status-warning-bg` | `var(--color-status-warning-bg)` | — | — |
| `--component-status-warning-text` | `var(--color-status-warning-text)` | — | — |
| `--component-status-na-bg` | `var(--color-status-na-bg)` | — | — |
| `--component-status-na-text` | `var(--color-status-na-text)` | — | — |
| `--component-toggle-on-bg` | `var(--color-brand-primary)` | — | — |
| `--component-toggle-off-bg` | `var(--color-brand-secondary)` | — | — |
| `--component-toggle-handle` | `var(--color-background-surface)` | — | — |
| `--component-toggle-disabled-bg` | `var(--color-button-disabled-bg)` | — | — |
| `--component-pagination-bg` | `var(--color-background-surface)` | — | — |
| `--component-pagination-text` | `var(--color-text-primary)` | — | — |
| `--component-pagination-active-bg` | `var(--color-brand-primary)` | — | — |
| `--component-pagination-active-text` | `var(--color-text-inverse)` | — | — |
| `--component-pagination-border` | `var(--color-border-default)` | — | — |
| `--component-dropdown-bg` | `var(--color-background-surface)` | — | — |
| `--component-dropdown-border` | `var(--color-border-default)` | — | — |
| `--component-dropdown-item-text` | `var(--color-text-primary)` | — | — |
| `--component-dropdown-item-hover` | `var(--color-background-subtle)` | — | — |
| `--component-dropdown-radius` | `var(--radius-panel)` | — | — |
| `--component-dropdown-trigger-text` | `var(--color-text-brand)` | — | — |
| `--component-dropdown-header-bg` | `var(--color-button-secondary-bg)` | — | — |
| `--component-dropdown-option-text` | `var(--color-text-brand)` | — | — |
| `--component-dropdown-checkbox-border` | `var(--color-border-brand)` | — | — |
| `--component-dropdown-checkbox-fill` | `var(--color-brand-primary)` | — | — |
| `--component-dropdown-disabled-bg` | `var(--color-button-disabled-bg)` | — | — |
| `--component-dropdown-disabled-text` | `var(--color-text-disabled)` | — | — |
| `--component-checkbox-checked-bg` | `var(--color-brand-primary)` | — | — |
| `--component-checkbox-unchecked-border` | `var(--color-border-default)` | — | — |
| `--component-checkbox-disabled-bg` | `var(--color-button-disabled-bg)` | — | — |
| `--component-checkbox-check-mark` | `var(--color-icon-on-brand)` | — | — |
| `--component-alert-info-bg` | `var(--color-brand-light)` | — | — |
| `--component-alert-info-text` | `var(--color-text-brand)` | — | — |
| `--component-alert-info-border` | `var(--color-border-brand)` | — | — |
| `--component-progress-track` | `var(--color-background-subtle)` | — | — |
| `--component-progress-fill` | `var(--color-brand-primary)` | — | — |
| `--component-progress-text` | `var(--color-progress-text)` | — | — |
| `--component-progress-complete-fill` | `var(--color-status-success-text)` | — | — |
| `--component-progress-complete-text` | `var(--color-status-success-text)` | — | — |
| `--component-progress-pending-fill` | `var(--color-button-disabled-bg)` | — | — |
| `--component-progress-pending-text` | `var(--color-text-secondary)` | — | — |
| `--component-progress-pending-icon` | `var(--color-progress-pending-icon)` | — | — |
| `--component-chip-bg` | `var(--color-pill-active-bg)` | — | — |
| `--component-chip-text` | `var(--color-text-brand)` | — | — |
| `--component-chip-radius` | `var(--radius-button)` | — | — |
| `--component-breadcrumb-text` | `var(--color-text-secondary)` | — | — |
| `--component-breadcrumb-active-text` | `var(--color-text-brand)` | — | — |
| `--component-breadcrumb-separator` | `var(--color-text-disabled)` | — | — |
| `--component-scrollbar-track` | `var(--color-background-subtle)` | — | — |
| `--component-scrollbar-thumb` | `var(--color-border-default)` | — | — |
| `--component-calendar-bg` | `var(--color-background-surface)` | — | — |
| `--component-calendar-selected-bg` | `var(--color-brand-primary)` | — | — |
| `--component-calendar-selected-text` | `var(--color-text-inverse)` | — | — |
| `--component-calendar-today-border` | `var(--color-border-brand)` | — | — |
| `--component-calendar-day-text` | `var(--color-text-primary)` | — | — |
| `--component-calendar-disabled-text` | `var(--color-text-disabled)` | — | — |
| `--component-tabs-text` | `var(--color-text-secondary)` | — | — |
| `--component-tabs-active-text` | `var(--color-text-brand)` | — | — |
| `--component-tabs-active-indicator` | `var(--color-brand-primary)` | — | — |
| `--component-tabs-border` | `var(--color-border-default)` | — | — |
| `--component-icon-button-bg` | `var(--color-background-surface)` | — | — |
| `--component-icon-button-icon` | `var(--color-icon-default)` | — | — |
| `--component-icon-button-hover-bg` | `var(--color-background-subtle)` | — | — |
| `--component-textfield-bg` | `var(--color-background-surface)` | — | — |
| `--component-textfield-text` | `var(--color-text-primary)` | — | — |
| `--component-textfield-placeholder` | `var(--color-text-disabled)` | — | — |
| `--component-textfield-border` | `var(--color-border-default)` | — | — |
| `--component-textfield-active-bg` | `var(--color-button-secondary-bg)` | — | — |
| `--component-textfield-active-text` | `var(--color-text-brand)` | — | — |
| `--component-textfield-active-border` | `var(--color-border-brand)` | — | — |
| `--component-textfield-disabled-bg` | `var(--color-button-disabled-bg)` | — | — |
| `--component-textfield-disabled-text` | `var(--color-text-disabled)` | — | — |
| `--component-textarea-bg` | `var(--color-background-surface)` | — | — |
| `--component-textarea-text` | `var(--color-text-primary)` | — | — |
| `--component-textarea-placeholder` | `var(--color-text-disabled)` | — | — |
| `--component-textarea-border` | `var(--color-brand-light)` | — | — |
| `--component-textarea-active-bg` | `var(--color-background-surface)` | — | — |
| `--component-textarea-active-text` | `var(--color-text-brand)` | — | — |
| `--component-textarea-active-border` | `var(--color-border-brand)` | — | — |
| `--component-textarea-disabled-bg` | `var(--color-background-subtle)` | — | — |
| `--component-textarea-disabled-text` | `var(--color-text-disabled)` | — | — |
| `--component-textarea-disabled-border` | `var(--color-brand-light)` | — | — |
| `--component-stepper-bg` | `var(--color-background-surface)` | — | — |
| `--component-stepper-text` | `var(--color-text-brand)` | — | — |
| `--component-stepper-border` | `var(--color-border-default)` | — | — |
| `--component-stepper-control` | `var(--color-text-brand)` | — | — |
| `--component-stepper-disabled-bg` | `var(--color-button-disabled-bg)` | — | — |
| `--component-stepper-disabled-text` | `var(--color-text-disabled)` | — | — |
| `--component-toast-bg-from` | `var(--color-background-surface)` | — | — |
| `--component-toast-bg-to` | `var(--color-brand-secondary)` | — | — |
| `--component-toast-border` | `var(--color-border-brand)` | — | — |
| `--component-toast-badge-bg` | `var(--color-brand-primary)` | — | — |
| `--component-toast-badge-text` | `var(--color-text-inverse)` | — | — |
| `--component-toast-title-text` | `var(--color-text-brand)` | — | — |
| `--component-toast-body-text` | `var(--color-text-primary)` | — | — |
| `--component-toast-close` | `var(--color-text-primary)` | — | — |

### `--color-*` (76)

| Variable | Light | Dark | High contrast |
|---|---|---|---|
| `--color-focus-ring` | `rgba(28, 69, 153, 0.35)` | `rgba(112, 150, 209, 0.45)` | `rgba(28, 69, 153, 0.6)` |
| `--color-brand-primary` | `var(--blue-600)` | `var(--blue-400)` | `var(--blue-800)` |
| `--color-brand-primary-hover` | `var(--blue-700)` | `var(--blue-300)` | `var(--blue-900)` |
| `--color-brand-secondary` | `var(--blue-200)` | `var(--blue-800)` | `var(--blue-200)` |
| `--color-brand-light` | `var(--lightblue-100)` | `var(--blue-900)` | `var(--lightblue-100)` |
| `--color-brand-accent` | `var(--lightblue-400)` | `var(--lightblue-400)` | `var(--lightblue-400)` |
| `--color-background-page` | `var(--lightblue-50)` | `var(--gray-900)` | `var(--white)` |
| `--color-background-surface` | `var(--white)` | `var(--gray-800)` | `var(--white)` |
| `--color-background-raised` | `var(--white)` | `var(--gray-700)` | `var(--white)` |
| `--color-background-subtle` | `var(--gray-100)` | `var(--gray-800)` | `var(--gray-50)` |
| `--color-background-inverse` | `var(--blue-600)` | `var(--blue-600)` | `var(--black)` |
| `--color-background-cards` | `var(--surface-cards)` | `var(--gray-800)` | `var(--white)` |
| `--color-background-dash` | `var(--lightblue-50)` | `var(--white)` | `var(--white)` |
| `--color-background-tertiary` | `var(--blue-150)` | `var(--white)` | `var(--white)` |
| `--color-text-primary` | `var(--gray-700)` | `var(--gray-50)` | `var(--black)` |
| `--color-text-secondary` | `var(--gray-600)` | `var(--gray-400)` | `var(--gray-800)` |
| `--color-text-disabled` | `var(--gray-500)` | `var(--gray-600)` | `var(--gray-500)` |
| `--color-text-brand` | `var(--blue-600)` | `var(--blue-300)` | `var(--blue-800)` |
| `--color-text-inverse` | `var(--white)` | `var(--gray-900)` | `var(--white)` |
| `--color-text-danger` | `var(--red-400)` | `var(--red-400)` | `var(--red-600)` |
| `--color-text-dark` | `var(--black)` | `var(--white)` | `var(--white)` |
| `--color-border-default` | `var(--gray-200)` | `var(--gray-700)` | `var(--gray-800)` |
| `--color-border-strong` | `var(--gray-300)` | `var(--gray-600)` | `var(--black)` |
| `--color-border-brand` | `var(--blue-600)` | `var(--blue-400)` | `var(--blue-800)` |
| `--color-border-danger` | `var(--red-400)` | `var(--red-400)` | `var(--red-600)` |
| `--color-button-primary-bg` | `var(--blue-600)` | `var(--blue-500)` | `var(--blue-800)` |
| `--color-button-primary-text` | `var(--white)` | `var(--white)` | `var(--white)` |
| `--color-button-primary-hover` | `var(--blue-700)` | `var(--blue-400)` | `var(--blue-900)` |
| `--color-button-secondary-bg` | `var(--blue-200)` | `var(--blue-800)` | `var(--lightblue-100)` |
| `--color-button-secondary-text` | `var(--blue-600)` | `var(--blue-200)` | `var(--blue-800)` |
| `--color-button-disabled-bg` | `var(--gray-400)` | `var(--gray-700)` | `var(--gray-400)` |
| `--color-button-disabled-text` | `var(--gray-500)` | `var(--gray-600)` | `var(--gray-500)` |
| `--color-button-danger-bg` | `var(--red-100)` | `var(--red-800)` | `var(--red-100)` |
| `--color-button-danger-text` | `var(--red-600)` | `var(--red-100)` | `var(--red-600)` |
| `--color-input-border` | `var(--gray-200)` | `var(--gray-600)` | `var(--gray-800)` |
| `--color-input-border-focus` | `var(--blue-600)` | `var(--blue-400)` | `var(--blue-800)` |
| `--color-input-bg-focus` | `var(--blue-150)` | `var(--blue-800)` | `var(--lightblue-100)` |
| `--color-input-bg-disabled` | `var(--gray-400)` | `var(--gray-700)` | `var(--gray-400)` |
| `--color-input-border-form-field` | `var(--gray-200)` | `var(--gray-600)` | `var(--gray-700)` |
| `--color-input-bg-text-focus` | `var(--blue-150)` | `var(--blue-800)` | `var(--lightblue-100)` |
| `--color-table-header-bg` | `var(--gray-100)` | `var(--gray-800)` | `var(--gray-50)` |
| `--color-table-header-text` | `var(--blue-600)` | `var(--blue-300)` | `var(--blue-800)` |
| `--color-table-cell-text` | `var(--gray-700)` | `var(--gray-200)` | `var(--black)` |
| `--color-table-border` | `var(--gray-300)` | `var(--gray-700)` | `var(--gray-800)` |
| `--color-table-row-hover` | `var(--lightblue-100)` | `var(--blue-900)` | `var(--lightblue-200)` |
| `--color-nav-icon-sidebar-bg` | `var(--blue-600)` | `var(--blue-900)` | `var(--black)` |
| `--color-nav-icon-color` | `var(--white)` | `var(--gray-200)` | `var(--white)` |
| `--color-nav-item-active-bg` | `var(--lightblue-300)` | `var(--blue-800)` | `var(--lightblue-200)` |
| `--color-nav-item-text` | `var(--gray-700)` | `var(--gray-200)` | `var(--black)` |
| `--color-nav-item-active-text` | `var(--lightblue-400)` | `var(--lightblue-400)` | `var(--blue-800)` |
| `--color-nav-item-selected-rounded` | `var(--blue-650)` | `var(--blue-800)` | `var(--blue-800)` |
| `--color-status-success-bg` | `var(--green-100)` | `var(--green-800)` | `var(--green-100)` |
| `--color-status-success-text` | `var(--green-600)` | `var(--green-100)` | `var(--green-800)` |
| `--color-status-error-bg` | `var(--red-100)` | `var(--red-800)` | `var(--red-100)` |
| `--color-status-error-text` | `var(--red-600)` | `var(--red-100)` | `var(--red-800)` |
| `--color-status-warning-bg` | `var(--orange-100)` | `var(--orange-900)` | `var(--orange-100)` |
| `--color-status-warning-text` | `var(--orange-900)` | `var(--orange-100)` | `var(--orange-900)` |
| `--color-status-na-bg` | `var(--gray-50)` | `var(--gray-800)` | `var(--gray-100)` |
| `--color-status-na-text` | `var(--gray-600)` | `var(--gray-400)` | `var(--gray-700)` |
| `--color-icon-default` | `var(--blue-800)` | `var(--blue-200)` | `var(--black)` |
| `--color-icon-on-brand` | `var(--white)` | `var(--white)` | `var(--white)` |
| `--color-pill-active-bg` | `var(--lightblue-200)` | `var(--blue-800)` | `var(--lightblue-200)` |
| `--color-progress-track` | `var(--gray-150)` | `var(--gray-700)` | `var(--gray-400)` |
| `--color-progress-fill` | `var(--cyan-500)` | `var(--cyan-500)` | `var(--cyan-600)` |
| `--color-progress-text` | `var(--cyan-600)` | `var(--lightblue-300)` | `var(--cyan-600)` |
| `--color-progress-pending-icon` | `var(--gray-450)` | `var(--gray-400)` | `var(--gray-800)` |
| `--color-chart-series-1` | `var(--chart-red)` | `var(--chart-red)` | `var(--chart-red)` |
| `--color-chart-series-2` | `var(--chart-yellow)` | `var(--chart-yellow)` | `var(--chart-yellow)` |
| `--color-chart-series-3` | `var(--chart-green)` | `var(--chart-green)` | `var(--chart-green)` |
| `--color-chart-series-4` | `var(--blue-600)` | `var(--blue-400)` | `var(--blue-600)` |
| `--color-chart-series-5` | `var(--cyan-500)` | `var(--cyan-500)` | `var(--cyan-600)` |
| `--color-chart-series-6` | `var(--blue-400)` | `var(--blue-300)` | `var(--blue-700)` |
| `--color-chart-grid` | `var(--gray-150)` | `var(--gray-700)` | `var(--gray-600)` |
| `--color-chart-grid-subtle` | `var(--gray-100)` | `var(--gray-800)` | `var(--gray-300)` |
| `--color-tag-disabled-bg` | `var(--gray-150)` | `var(--gray-700)` | `var(--gray-150)` |
| `--color-tag-disabled-text` | `var(--gray-600)` | `var(--gray-400)` | `var(--gray-600)` |

### `--typography-*` (54)

| Variable | Light | Dark | High contrast |
|---|---|---|---|
| `--typography-heading-h1-fontSize` | `var(--font-size-32)` | `var(--font-size-32)` | `var(--font-size-32)` |
| `--typography-heading-h1-lineHeight` | `var(--font-line-height-heading)` | `var(--font-line-height-heading)` | `var(--font-line-height-heading)` |
| `--typography-heading-h1-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-heading-h2-fontSize` | `var(--font-size-28)` | `var(--font-size-28)` | `var(--font-size-28)` |
| `--typography-heading-h2-lineHeight` | `var(--font-line-height-heading)` | `var(--font-line-height-heading)` | `var(--font-line-height-heading)` |
| `--typography-heading-h2-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-heading-h3-fontSize` | `var(--font-size-24)` | `var(--font-size-24)` | `var(--font-size-24)` |
| `--typography-heading-h3-lineHeight` | `var(--font-line-height-heading)` | `var(--font-line-height-heading)` | `var(--font-line-height-heading)` |
| `--typography-heading-h3-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-heading-h4-fontSize` | `var(--font-size-22)` | `var(--font-size-22)` | `var(--font-size-22)` |
| `--typography-heading-h4-lineHeight` | `var(--font-line-height-loose)` | `var(--font-line-height-loose)` | `var(--font-line-height-loose)` |
| `--typography-heading-h4-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-heading-h5-fontSize` | `var(--font-size-20)` | `var(--font-size-20)` | `var(--font-size-20)` |
| `--typography-heading-h5-lineHeight` | `var(--font-line-height-loose)` | `var(--font-line-height-loose)` | `var(--font-line-height-loose)` |
| `--typography-heading-h5-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-heading-h6-fontSize` | `var(--font-size-18)` | `var(--font-size-18)` | `var(--font-size-18)` |
| `--typography-heading-h6-lineHeight` | `var(--font-line-height-loose)` | `var(--font-line-height-loose)` | `var(--font-line-height-loose)` |
| `--typography-heading-h6-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-body-lg-fontSize` | `var(--font-size-16)` | `var(--font-size-16)` | `var(--font-size-16)` |
| `--typography-body-lg-lineHeight` | `var(--font-line-height-relaxed)` | `var(--font-line-height-relaxed)` | `var(--font-line-height-relaxed)` |
| `--typography-body-lg-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-body-md-fontSize` | `var(--font-size-14)` | `var(--font-size-14)` | `var(--font-size-14)` |
| `--typography-body-md-lineHeight` | `var(--font-line-height-default)` | `var(--font-line-height-default)` | `var(--font-line-height-default)` |
| `--typography-body-md-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-body-sm-fontSize` | `var(--font-size-12)` | `var(--font-size-12)` | `var(--font-size-12)` |
| `--typography-body-sm-lineHeight` | `var(--font-line-height-tight)` | `var(--font-line-height-tight)` | `var(--font-line-height-tight)` |
| `--typography-body-sm-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-label-md-fontSize` | `var(--font-size-12)` | `var(--font-size-12)` | `var(--font-size-12)` |
| `--typography-label-md-lineHeight` | `var(--font-line-height-tight)` | `var(--font-line-height-tight)` | `var(--font-line-height-tight)` |
| `--typography-label-md-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-label-sm-fontSize` | `var(--font-size-11)` | `var(--font-size-11)` | `var(--font-size-11)` |
| `--typography-label-sm-lineHeight` | `var(--font-line-height-tight)` | `var(--font-line-height-tight)` | `var(--font-line-height-tight)` |
| `--typography-label-sm-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-button-fontSize` | `var(--font-size-14)` | `var(--font-size-14)` | `var(--font-size-14)` |
| `--typography-button-lineHeight` | `var(--font-line-height-default)` | `var(--font-line-height-default)` | `var(--font-line-height-default)` |
| `--typography-button-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-nav-fontSize` | `var(--font-size-14)` | `var(--font-size-14)` | `var(--font-size-14)` |
| `--typography-nav-lineHeight` | `var(--font-line-height-default)` | `var(--font-line-height-default)` | `var(--font-line-height-default)` |
| `--typography-nav-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-table-header-fontSize` | `var(--font-size-14)` | `var(--font-size-14)` | `var(--font-size-14)` |
| `--typography-table-header-lineHeight` | `var(--font-line-height-default)` | `var(--font-line-height-default)` | `var(--font-line-height-default)` |
| `--typography-table-header-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-table-cell-fontSize` | `var(--font-size-14)` | `var(--font-size-14)` | `var(--font-size-14)` |
| `--typography-table-cell-lineHeight` | `var(--font-line-height-default)` | `var(--font-line-height-default)` | `var(--font-line-height-default)` |
| `--typography-table-cell-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-modal-title-fontSize` | `var(--font-size-20)` | `var(--font-size-20)` | `var(--font-size-20)` |
| `--typography-modal-title-lineHeight` | `var(--font-line-height-loose)` | `var(--font-line-height-loose)` | `var(--font-line-height-loose)` |
| `--typography-modal-title-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-badge-fontSize` | `var(--font-size-12)` | `var(--font-size-12)` | `var(--font-size-12)` |
| `--typography-badge-lineHeight` | `var(--font-line-height-tight)` | `var(--font-line-height-tight)` | `var(--font-line-height-tight)` |
| `--typography-badge-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |
| `--typography-input-fontSize` | `var(--font-size-14)` | `var(--font-size-14)` | `var(--font-size-14)` |
| `--typography-input-lineHeight` | `var(--font-line-height-default)` | `var(--font-line-height-default)` | `var(--font-line-height-default)` |
| `--typography-input-letterSpacing` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` | `var(--font-letter-spacing-default)` |

### `--radius-*` (30)

| Variable | Light | Dark | High contrast |
|---|---|---|---|
| `--radius-0` | `0px` | — | — |
| `--radius-xs` | `4px` | — | — |
| `--radius-sm` | `8px` | — | — |
| `--radius-md` | `10px` | — | — |
| `--radius-lg` | `15px` | — | — |
| `--radius-xl` | `20px` | — | — |
| `--radius-2xl` | `25px` | — | — |
| `--radius-3xl` | `28px` | — | — |
| `--radius-4xl` | `24px` | — | — |
| `--radius-6xl` | `30px` | — | — |
| `--radius-full` | `50px` | — | — |
| `--radius-circle` | `9999px` | — | — |
| `--radius-2xs` | `2px` | — | — |
| `--radius-3xs` | `3px` | — | — |
| `--radius-xxs` | `5px` | — | — |
| `--radius-s` | `6px` | — | — |
| `--radius-ms` | `9px` | — | — |
| `--radius-m` | `12px` | — | — |
| `--radius-mxl` | `16px` | — | — |
| `--radius-xlg` | `26px` | — | — |
| `--radius-xxl` | `44px` | — | — |
| `--radius-button` | `var(--radius-full)` | `var(--radius-full)` | `var(--radius-full)` |
| `--radius-input` | `var(--radius-2xl)` | `var(--radius-2xl)` | `var(--radius-2xl)` |
| `--radius-textarea` | `var(--radius-sm)` | `var(--radius-sm)` | `var(--radius-sm)` |
| `--radius-badge` | `var(--radius-3xl)` | `var(--radius-3xl)` | `var(--radius-3xl)` |
| `--radius-card` | `var(--radius-lg)` | `var(--radius-lg)` | `var(--radius-lg)` |
| `--radius-panel` | `var(--radius-md)` | `var(--radius-md)` | `var(--radius-md)` |
| `--radius-tooltip` | `var(--radius-xs)` | `var(--radius-xs)` | `var(--radius-xs)` |
| `--radius-avatar` | `var(--radius-circle)` | `var(--radius-circle)` | `var(--radius-circle)` |
| `--radius-icon-circle` | `var(--radius-circle)` | `var(--radius-circle)` | `var(--radius-circle)` |

### `--shadow-*` (30)

| Variable | Value |
|---|---|
| `--shadow-card-offset-x` | `0px` |
| `--shadow-card-offset-y` | `2px` |
| `--shadow-card-blur` | `9px` |
| `--shadow-card-spread` | `0px` |
| `--shadow-card-opacity` | `0.10000000149011612` |
| `--shadow-low-offset-x` | `0px` |
| `--shadow-low-offset-y` | `4px` |
| `--shadow-low-blur` | `4px` |
| `--shadow-low-spread` | `0px` |
| `--shadow-low-opacity` | `0.25` |
| `--shadow-icon-offset-x` | `1px` |
| `--shadow-icon-offset-y` | `2px` |
| `--shadow-icon-blur` | `8px` |
| `--shadow-icon-spread` | `0px` |
| `--shadow-icon-opacity` | `0.25` |
| `--shadow-modal-offset-x` | `0px` |
| `--shadow-modal-offset-y` | `8px` |
| `--shadow-modal-blur` | `24px` |
| `--shadow-modal-spread` | `0px` |
| `--shadow-modal-opacity` | `0.15000000596046448` |
| `--shadow-flyout-offset-x` | `0px` |
| `--shadow-flyout-offset-y` | `4px` |
| `--shadow-flyout-blur` | `12px` |
| `--shadow-flyout-spread` | `0px` |
| `--shadow-flyout-opacity` | `0.12` |
| `--shadow-drawer-offset-x` | `-6px` |
| `--shadow-drawer-offset-y` | `0px` |
| `--shadow-drawer-blur` | `24px` |
| `--shadow-drawer-spread` | `0px` |
| `--shadow-drawer-opacity` | `0.18` |

### `--space-*` (25)

| Variable | Value |
|---|---|
| `--space-0` | `0px` |
| `--space-1` | `2px` |
| `--space-2` | `4px` |
| `--space-3` | `5px` |
| `--space-4` | `8px` |
| `--space-5` | `10px` |
| `--space-6` | `12px` |
| `--space-7` | `15px` |
| `--space-8` | `16px` |
| `--space-9` | `20px` |
| `--space-10` | `24px` |
| `--space-11` | `30px` |
| `--space-12` | `40px` |
| `--space-13` | `48px` |
| `--space-14` | `64px` |
| `--space-16` | `7px` |
| `--space-17` | `3px` |
| `--space-18` | `14px` |
| `--space-19` | `11px` |
| `--space-20` | `1px` |
| `--space-21` | `17px` |
| `--space-22` | `18px` |
| `--space-23` | `6px` |
| `--space-24` | `9px` |
| `--space-25` | `13px` |

### `--layout-*` (24)

| Variable | Light | Dark | High contrast |
|---|---|---|---|
| `--layout-page-header-padding-x` | `var(--space-9)` | `var(--space-9)` | `var(--space-9)` |
| `--layout-page-header-padding-y` | `var(--space-8)` | `var(--space-8)` | `var(--space-8)` |
| `--layout-page-header-action-gap` | `var(--space-5)` | `var(--space-5)` | `var(--space-5)` |
| `--layout-sidebar-icon-width` | `var(--space-14)` | `var(--space-14)` | `var(--space-14)` |
| `--layout-sidebar-padding-y` | `var(--space-6)` | `var(--space-6)` | `var(--space-6)` |
| `--layout-sidebar-item-padding-y` | `var(--space-5)` | `var(--space-5)` | `var(--space-5)` |
| `--layout-sidebar-item-gap` | `var(--space-2)` | `var(--space-2)` | `var(--space-2)` |
| `--layout-settings-padding` | `var(--space-9)` | `var(--space-9)` | `var(--space-9)` |
| `--layout-settings-sidebar-item-x` | `var(--space-7)` | `var(--space-7)` | `var(--space-7)` |
| `--layout-settings-sidebar-item-y` | `var(--space-5)` | `var(--space-5)` | `var(--space-5)` |
| `--layout-settings-sidebar-gap` | `var(--space-5)` | `var(--space-5)` | `var(--space-5)` |
| `--layout-settings-content-padding` | `var(--space-9)` | `var(--space-9)` | `var(--space-9)` |
| `--layout-split-left-panel-padding` | `var(--space-6)` | `var(--space-6)` | `var(--space-6)` |
| `--layout-split-tree-item-x` | `var(--space-4)` | `var(--space-4)` | `var(--space-4)` |
| `--layout-split-tree-item-y` | `var(--space-4)` | `var(--space-4)` | `var(--space-4)` |
| `--layout-split-subtree-indent` | `var(--space-10)` | `var(--space-10)` | `var(--space-10)` |
| `--layout-wizard-content-padding` | `var(--space-10)` | `var(--space-10)` | `var(--space-10)` |
| `--layout-wizard-step-padding-y` | `var(--space-7)` | `var(--space-7)` | `var(--space-7)` |
| `--layout-wizard-step-gap` | `var(--space-3)` | `var(--space-3)` | `var(--space-3)` |
| `--layout-wizard-footer-padding-x` | `var(--space-9)` | `var(--space-9)` | `var(--space-9)` |
| `--layout-wizard-footer-gap` | `var(--space-6)` | `var(--space-6)` | `var(--space-6)` |
| `--layout-empty-padding` | `var(--space-13)` | `var(--space-13)` | `var(--space-13)` |
| `--layout-empty-gap` | `var(--space-8)` | `var(--space-8)` | `var(--space-8)` |
| `--layout-dashboard-card-gap` | `var(--space-10)` | `var(--space-10)` | `var(--space-10)` |

### `--font-*` (23)

| Variable | Value |
|---|---|
| `--font-family-primary` | `'Open Sans', system-ui, sans-serif` |
| `--font-size-11` | `11px` |
| `--font-size-12` | `12px` |
| `--font-size-14` | `14px` |
| `--font-size-16` | `16px` |
| `--font-size-18` | `18px` |
| `--font-size-20` | `20px` |
| `--font-size-22` | `22px` |
| `--font-size-24` | `24px` |
| `--font-size-28` | `28px` |
| `--font-size-32` | `32px` |
| `--font-line-height-tight` | `16px` |
| `--font-line-height-default` | `19px` |
| `--font-line-height-relaxed` | `22px` |
| `--font-line-height-loose` | `28px` |
| `--font-line-height-heading` | `36px` |
| `--font-letter-spacing-default` | `0px` |
| `--font-letter-spacing-wide` | `0.5px` |
| `--font-letter-spacing-wider` | `1px` |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-semibold` | `600` |
| `--font-weight-bold` | `700` |

### `--blue-*` (12)

| Variable | Value |
|---|---|
| `--blue-50` | `#eef2fa` |
| `--blue-100` | `#d4e0f5` |
| `--blue-150` | `#e1eafd` |
| `--blue-200` | `#c6d8ff` |
| `--blue-300` | `#abbfc7` |
| `--blue-400` | `#7096d1` |
| `--blue-500` | `#3d69b5` |
| `--blue-600` | `#1c4599` |
| `--blue-650` | `#11337a` |
| `--blue-700` | `#183a81` |
| `--blue-800` | `#0a1959` |
| `--blue-900` | `#07103d` |

### `--gray-*` (12)

| Variable | Value |
|---|---|
| `--gray-50` | `#f5f7fd` |
| `--gray-100` | `#f6f6f6` |
| `--gray-150` | `#e0e0e0` |
| `--gray-200` | `#c7c7c7` |
| `--gray-300` | `#e2dbdb` |
| `--gray-400` | `#c6c6c6` |
| `--gray-450` | `#8d8d8d` |
| `--gray-500` | `#727171` |
| `--gray-600` | `#555766` |
| `--gray-700` | `#364765` |
| `--gray-800` | `#2d3748` |
| `--gray-900` | `#1a202c` |

### `--z-*` (7)

| Variable | Value |
|---|---|
| `--z-base` | `0` |
| `--z-sticky` | `100` |
| `--z-dropdown` | `1000` |
| `--z-overlay` | `1300` |
| `--z-modal` | `1400` |
| `--z-toast` | `1600` |
| `--z-tooltip` | `1700` |

### `--lightblue-*` (5)

| Variable | Value |
|---|---|
| `--lightblue-50` | `#f5f7fd` |
| `--lightblue-100` | `#e4edff` |
| `--lightblue-200` | `#ddf3ff` |
| `--lightblue-300` | `#bfeaff` |
| `--lightblue-400` | `#2e98d4` |

### `--red-*` (5)

| Variable | Value |
|---|---|
| `--red-100` | `#ffebee` |
| `--red-200` | `#ff9696` |
| `--red-400` | `#f72b2b` |
| `--red-600` | `#c62828` |
| `--red-800` | `#b71c1c` |

### `--orange-*` (5)

| Variable | Value |
|---|---|
| `--orange-100` | `#fff8e1` |
| `--orange-400` | `#ffa726` |
| `--orange-600` | `#f57f17` |
| `--orange-800` | `#e65100` |
| `--orange-900` | `#bf360c` |

### `--breakpoint-*` (4)

| Variable | Value |
|---|---|
| `--breakpoint-sm` | `640px` |
| `--breakpoint-md` | `768px` |
| `--breakpoint-lg` | `1024px` |
| `--breakpoint-xl` | `1280px` |

### `--green-*` (4)

| Variable | Value |
|---|---|
| `--green-100` | `#e8f5e9` |
| `--green-400` | `#1caa52` |
| `--green-600` | `#2e7d32` |
| `--green-800` | `#1b5e20` |

### `--opacity-*` (4)

| Variable | Value |
|---|---|
| `--opacity-disabled` | `0.5` |
| `--opacity-overlay` | `0.4000000059604645` |
| `--opacity-hover` | `0.8799999952316284` |
| `--opacity-icon-muted` | `0.75` |

### `--duration-*` (3)

| Variable | Value |
|---|---|
| `--duration-fast` | `120ms` |
| `--duration-base` | `180ms` |
| `--duration-slow` | `240ms` |

### `--easing-*` (3)

| Variable | Value |
|---|---|
| `--easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--easing-decelerate` | `cubic-bezier(0, 0, 0, 1)` |
| `--easing-accelerate` | `cubic-bezier(0.3, 0, 1, 1)` |

### `--yellow-*` (3)

| Variable | Value |
|---|---|
| `--yellow-100` | `#fffde7` |
| `--yellow-400` | `#ffee58` |
| `--yellow-600` | `#f9a825` |

### `--chart-*` (3)

| Variable | Value |
|---|---|
| `--chart-red` | `#f94144` |
| `--chart-yellow` | `#f9c74f` |
| `--chart-green` | `#1aa367` |

### `--border-*` (3)

| Variable | Value |
|---|---|
| `--border-width-default` | `1px` |
| `--border-width-active` | `3px` |
| `--border-width-accent` | `8px` |

### `--cyan-*` (2)

| Variable | Value |
|---|---|
| `--cyan-500` | `#2391dc` |
| `--cyan-600` | `#0069b5` |

### `--blur-*` (2)

| Variable | Value |
|---|---|
| `--blur-overlay` | `22px` |
| `--blur-subtle` | `8px` |

### `--white-*` (1)

| Variable | Value |
|---|---|
| `--white` | `#ffffff` |

### `--black-*` (1)

| Variable | Value |
|---|---|
| `--black` | `#000000` |

### `--surface-*` (1)

| Variable | Value |
|---|---|
| `--surface-cards` | `#edf3fc` |

## 12. Machine-readable sources

- **This file:** https://lepide-design-system.vercel.app/design.md — regenerated on every build.
- **llms-full.txt:** https://lepide-design-system.vercel.app/llms-full.txt — rules + every HTML example, one paste (~33k tokens).
- **llms.txt:** https://lepide-design-system.vercel.app/llms.txt — rules + class inventory (~2k tokens).
- **Component manifest (JSON):** https://lepide-design-system.vercel.app/component-manifest.json — props and classes; the Specifications tabs visualized.
- **MCP server** (repo checkout): `packages/mcp/server.mjs` via `.mcp.json` — `list_components`, `get_component`, `search_tokens`, `get_usage_rules`.
- **Live previews:** https://lepide-design-system.vercel.app/storybook/
