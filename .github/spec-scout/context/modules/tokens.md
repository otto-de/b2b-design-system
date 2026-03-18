# Module: tokens

## Module Ownership
- **Primary Responsibility:** Define all raw and semantic design tokens (colour, typography, spacing) as JSON source files and compile them into CSS custom-property stylesheets and JSON documentation artefacts for `default` and `dark` themes via the Style Dictionary 4 build pipeline.
- **Explicit Non-Responsibilities:** Does not own component HTML structure or behaviour; does not own icon SVG assets; does not own SCSS mixins or component-level style rules; does not own theming logic inside components (i.e. does not decide when a theme is applied — that is the host application's responsibility via `data-theme` attribute).
- **Integration Boundaries:**
  - `produces → shared_utilities / core-components (one-way)`: The compiled `build/css/default.css` and `build/css/dark.css` are consumed by `@otto-de/b2b-core-components` as the source of CSS custom properties. The `build/js/default.json` and `build/js/dark.json` artefacts are consumed by Storybook documentation stories.
  - No module calls _into_ tokens at runtime — this is a purely upstream, build-time dependency.

---

## Entry Points

- **Entry Point:** `packages/tokens/build.mjs` (invoked via `npm run build` in `packages/tokens`)
  **Responsibilities:** Registers custom Style Dictionary formatters, iterates over the `['default', 'dark']` theme array, constructs per-theme Style Dictionary configurations, and triggers the `buildPlatform('web')` call for each theme.

---

## FLOW 1: Default Theme Token Compilation

- **Trigger:** `npm run build` → `node ./build.mjs` processes theme `'default'`.
- **Steps:**
  1. Style Dictionary ingests source files matching `src/**/*base.json` and `src/**/*default.json` — covering `colors/base.json`, `colors/semantic.default.json`, `size/base.json`, `size/semantic.default.json`, and `font/base.json`.
  2. Applies the `web` platform transform pipeline: `attribute/cti` (assigns `category`, `type`, `item` attributes), `name/kebab` (produces `b2b`-prefixed kebab-case variable names), `color/css` (converts colour values to CSS hex/rgba), `size/rem` (converts numeric size values to `rem` units).
  3. The custom `css/variables-themed` formatter generates a CSS block wrapped in `:root, :host` (the default theme selector) with all token references resolved via `outputReferences: true`.
  4. The custom `javascript/docs` formatter generates a JSON object grouped by `color → type`, `size → type`, and `font → type` for documentation consumption.
  5. Outputs are written to `build/css/default.css` and `build/js/default.json`.
- **Exit Point:** `packages/tokens/build/css/default.css` (CSS custom properties under `:root, :host`), `packages/tokens/build/js/default.json` (documentation JSON).
- **Impacted Areas:** `packages/tokens/src/colors/base.json`, `packages/tokens/src/colors/semantic.default.json`, `packages/tokens/src/size/base.json`, `packages/tokens/src/size/semantic.default.json`, `packages/tokens/src/font/base.json`, `packages/tokens/build.mjs`.

---

## FLOW 2: Dark Theme Token Compilation

- **Trigger:** Same `build.mjs` run, processing theme `'dark'` in the iteration loop.
- **Steps:**
  1. Style Dictionary ingests `src/**/*base.json` and `src/**/*dark.json` — covering `colors/base.json` and `colors/semantic.dark.json` (no dark-specific size or font overrides exist; base values are reused).
  2. Same transform pipeline as Flow 1 (`attribute/cti`, `name/kebab`, `color/css`, `size/rem`).
  3. The `css/variables-themed` formatter generates a CSS block wrapped in `:root [data-theme="dark"]` — overriding only the semantic colour tokens that differ from the default theme (background, border, copy, headline, icon colours).
  4. The `javascript/docs` formatter generates `build/js/dark.json` grouped documentation.
  5. Outputs are written to `build/css/dark.css` and `build/js/dark.json`.
- **Exit Point:** `packages/tokens/build/css/dark.css` (CSS custom properties under `:root [data-theme="dark"]`), `packages/tokens/build/js/dark.json`.
- **Impacted Areas:** `packages/tokens/src/colors/base.json`, `packages/tokens/src/colors/semantic.dark.json`, `packages/tokens/build.mjs`.

---

## FLOW 3: Token Consumption by Core Components (Build-time Dependency)

- **Trigger:** `npm run build` in `packages/core-components` — Stencil build processes SCSS files that import token CSS.
- **Steps:**
  1. `@otto-de/b2b-tokens` is declared as a direct dependency of `@otto-de/b2b-core-components` at the same version (e.g. `1.38.1`).
  2. Component SCSS files consume the compiled CSS custom properties (e.g. `var(--b2b-color-background-page)`) which are defined in `build/css/default.css` and `build/css/dark.css`.
  3. The global style entry (`src/global/b2b-styles.scss` in `core-components`) references token variables to establish the base visual layer.
  4. No runtime JS import of token files occurs within components — consumption is purely CSS-variable-based.
- **Exit Point:** CSS custom properties are resolved in browser at paint time by whichever theme stylesheet is loaded.
- **Impacted Areas:** `packages/tokens/build/css/default.css`, `packages/tokens/build/css/dark.css`, `packages/core-components/src/global/b2b-styles.scss`.

---

## Token Source Structure

| Category | Base File | Semantic File(s) | Notes |
|----------|-----------|-----------------|-------|
| Colour | `src/colors/base.json` | `src/colors/semantic.default.json`, `src/colors/semantic.dark.json` | Base defines raw palette (black, white, grey, red, blue, primary, error, warning); semantic files define usage-intent aliases |
| Size | `src/size/base.json` | `src/size/semantic.default.json` | Base defines a numerical scale (1–200 in rem steps); semantic defines icon, space, padding, border, and copy sizes |
| Font | `src/font/base.json` | _(none)_ | Defines `font-family` (OttoSans stack) and three `font-weight` values |
