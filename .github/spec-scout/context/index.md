# SDD Context Index

## Context Baseline
- **Branch:** main
- **Baseline Commit:** `93fc4feaaf3a17bd3b153b9a1b3900dcde875885`
- **Generated On:** 2026-03-18
- **Status:** Fully generated from `main` at the above commit. Use this hash to detect new changes via `@update-context`.

---

## 🛠️ Repo Tech Specification

| Property | Value |
|----------|-------|
| **Monorepo name** | `@otto-de/b2b-design-system` |
| **Organisation** | Otto GmbH |
| **License** | Apache-2.0 |
| **Node.js** | 22.11.0 |
| **npm workspaces** | 3 packages under `packages/` |
| **Package 1** | `@otto-de/b2b-tokens` v1.38.1 — Style Dictionary 4.3.3 design token pipeline |
| **Package 2** | `@otto-de/b2b-core-components` v1.38.1 — Stencil.js 4.13.0 Web Components (52 components) |
| **Package 3** | `@otto-de/b2b-react-components` v1.38.1 — auto-generated React proxy wrappers |
| **TypeScript** | 4.9.x |
| **CSS toolchain** | SCSS → PostCSS → `postcss-import` → PurgeCSS (per-component) |
| **Test framework** | Jest 29 + Stencil spec/e2e + Puppeteer (Chromium, headless-new) |
| **Visual snapshots** | 264 PNG baselines in `packages/core-components/__snapshots__/` |
| **Docs / showcase** | Storybook 8.6.15, hosted at `https://b2b-design-system.otto.market` |
| **Visual regression CI** | Chromatic (`@chromatic-com/storybook`) |
| **Release** | `semantic-release` 25 + Conventional Commits + `commitlint` |
| **Build orchestration** | `npm-run-all` (tokens → core-components → react-components) |

---

## Drift State

| Module | Last Verified Commit | Drift Level |
|--------|---------------------|-------------|
| tokens | 93fc4feaaf3a17bd3b153b9a1b3900dcde875885 | D0 |
| icon_system | 93fc4feaaf3a17bd3b153b9a1b3900dcde875885 | D0 |
| form_components | 93fc4feaaf3a17bd3b153b9a1b3900dcde875885 | D0 |
| feedback_and_overlay_components | 93fc4feaaf3a17bd3b153b9a1b3900dcde875885 | D0 |
| navigation_components | 93fc4feaaf3a17bd3b153b9a1b3900dcde875885 | D0 |
| layout_and_content_components | 93fc4feaaf3a17bd3b153b9a1b3900dcde875885 | D0 |
| data_display_components | 93fc4feaaf3a17bd3b153b9a1b3900dcde875885 | D0 |
| shared_utilities | 93fc4feaaf3a17bd3b153b9a1b3900dcde875885 | D0 |
| react_components | 93fc4feaaf3a17bd3b153b9a1b3900dcde875885 | D0 |
| build_and_release_pipeline | 93fc4feaaf3a17bd3b153b9a1b3900dcde875885 | D0 |

---

## Global Responsibility Index

| # | Module | Primary Responsibility | Key Entry Points | Produces → | Consumes ← |
|---|--------|----------------------|-----------------|------------|------------|
| 1 | [tokens](modules/tokens.md) | Style Dictionary pipeline producing CSS custom properties and JSON docs for default and dark themes | `packages/tokens/src/{colors,font,size}/` → `build/css/{default,dark}.css`, `build/js/{default,dark}.json` | `core-components` (build-time CSS vars) | — |
| 2 | [icon_system](modules/icon_system.md) | SVG icon Web Components (`b2b-icon`, `b2b-icon-100`, `b2b-icon-50`) with async CDN fetch + in-memory cache; build-time icon name type generation | `b2b-icon-100`, `b2b-icon-50`, `b2b-icon` (deprecated); `scripts/generate-icon-types.mjs` | `react_components` (indirect) | `tokens`, `shared_utilities/resources` (ICON_PATH) |
| 3 | [form_components](modules/form_components.md) | All 21 user-input and selection Web Components including inputs, dropdowns, date pickers, toggles, checkboxes, radio buttons, and multiselect | `b2b-input`, `b2b-dropdown`, `b2b-date-picker`, `b2b-date-range-picker`, `b2b-checkbox`, `b2b-radio-button`, `b2b-toggle-group`, `b2b-multiselect-dropdown`, `b2b-search`, `b2b-textarea`, `b2b-time-picker`, input-group family | `react_components` (indirect) | `tokens`, `shared_utilities` (parsePropToArray, DateUtils, HTMLB2bFormElement, all form interfaces) |
| 4 | [feedback_and_overlay_components](modules/feedback_and_overlay_components.md) | Status feedback and overlay Web Components — alerts, snackbar, modal (focus trap), tooltip, flyout, progress bar, spinner, shimmer | `b2b-alert`, `b2b-snackbar`, `b2b-modal`, `b2b-tooltip`, `b2b-flyout-menu`, `b2b-progress-bar`, `b2b-spinner`, `b2b-shimmer` | `react_components` (indirect) | `tokens`, `shared_utilities` (queryShadowRoot, isHidden, isFocusable, BeforeCloseEventDetail) |
| 5 | [navigation_components](modules/navigation_components.md) | Navigational Web Components — breadcrumb, pagination, tabs, anchor, wizard | `b2b-breadcrumb`, `b2b-pagination`, `b2b-tab-group`, `b2b-tab`, `b2b-tab-panel`, `b2b-anchor`, `b2b-wizard`, `b2b-wizard-step`, `b2b-wizard-icon` | `react_components` (indirect) | `tokens`, `shared_utilities` (PageChangeEventDetail, TabChangeEventDetail, WizardStatus, ToggleChipEventDetail) |
| 6 | [layout_and_content_components](modules/layout_and_content_components.md) | Layout primitives, typography, general-purpose UI building blocks, and global SCSS bootstrap (`b2b-styles.scss`) | `b2b-grid`, `b2b-card`, `b2b-background-box`, `b2b-scrollable-container`, `b2b-separator`, `b2b-headline`, `b2b-paragraph`, `b2b-label`, `b2b-chip-component`, `b2b-rounded-icon`, `b2b-button`; `src/global/b2b-styles.scss` | `react_components` (indirect) | `tokens`, `shared_utilities` (ChipComponentEventDetail, ToggleSwitchEventDetail, CssClassMap) |
| 7 | [data_display_components](modules/data_display_components.md) | Table compound-component family — sorting, row selection (checkbox), accordion expand/collapse, colspan flex layout, sticky headers | `b2b-table`, `b2b-table-rowgroup`, `b2b-table-row`, `b2b-table-header`, `b2b-table-cell`; `src/components/table/utils.ts` | `react_components` (indirect) | `tokens`, `form_components` (b2b-checkbox), `icon_system` (b2b-icon-100), `layout_and_content_components` (b2b-scrollable-container), `shared_utilities` (table types + interfaces) |
| 8 | [shared_utilities](modules/shared_utilities.md) | All cross-cutting runtime helpers, TypeScript interfaces, and type constants consumed by every other module. No renderable components. | `utils/utils.ts`, `utils/theme.ts`, `utils/resources.ts`, `utils/focus-trap.ts`, `utils/json-property-binding-util.ts`, `utils/datepicker/date-picker-util.ts`, `utils/interfaces/*.d.ts`, `utils/types/*.ts` | All modules (compile-time interfaces + runtime helpers) | — |
| 9 | [react_components](modules/react_components.md) | React proxy wrapper layer for all 70+ core Web Components via `createReactComponent`. Owns proxy mechanism only — zero component logic. | `src/components/stencil-generated/index.ts`; `react-component-lib/createComponent.tsx`; `react-component-lib/utils/` | Consumer React apps (`@otto-de/b2b-react-components` npm package) | `core-components` (all modules, runtime + compile-time); `build_and_release_pipeline` (generates the index at build time) |
| 10 | [build_and_release_pipeline](modules/build_and_release_pipeline.md) | All build orchestration, compilation, CSS post-processing, Storybook docs, visual snapshot testing, semantic-release versioning, and npm publishing | `stencil.config.ts`, `plugins/purgeCssExtensionPlugin.ts`, `scripts/stencil/generate-storybook-args.ts`, `scripts/stencil/generate-vue-web-types.ts`, `release.config.js`, `commitlint.config.js`, `test-runner.js`, `scripts/update-packages-version.mjs`, `scripts/publish.sh`, `.storybook/` | `react_components` (generated proxy index); `tokens` (sequenced build); Storybook at `https://b2b-design-system.otto.market` | All modules (processes every component file at compile time) |

---

## Cross-Module Dependency Graph

```
tokens
  └─produces──► core-components (all modules, build-time CSS vars)

shared_utilities
  └─produces──► form_components, feedback_and_overlay_components,
                navigation_components, layout_and_content_components,
                data_display_components, icon_system (runtime + compile-time)

icon_system
  └─produces──► data_display_components (b2b-icon-100 accordion button)

form_components
  └─produces──► data_display_components (b2b-checkbox selectable rows)

layout_and_content_components
  └─produces──► data_display_components (b2b-scrollable-container sticky headers)

build_and_release_pipeline
  └─produces──► react_components (generates stencil-generated/index.ts)
  └─consumes──► all core-component modules (compiles, purges, docs)

All core-component modules
  └─produces──► react_components (proxy wrappers, indirect)
```

---

## Key Development Rules

> These are critical operational constraints derived from the codebase. All contributors must observe them.

1. **Snapshot discipline:** Any PR that changes the visual output of a component **must** run `npm run update-snapshots` and commit the updated PNGs in `packages/core-components/__snapshots__/`. CI will fail on a snapshot mismatch.
2. **Conventional Commits:** All commits must follow `type(scope): description` format (enforced by `commitlint` + husky locally; drives semantic-release version classification).
3. **Token-first build:** Always run `build-tokens` before `build-core-components`. The CSS custom properties from `@otto-de/b2b-tokens` must be present at Stencil compile time. `npm run build` at root handles this automatically.
4. **React proxy is generated:** Never manually edit `packages/react-components/src/components/stencil-generated/index.ts`. It is overwritten by `stencil build` via `reactOutputTarget`. Edits to React proxy behaviour belong in `react-component-lib/`.
5. **PurgeCSS safelist:** When adding new CSS selectors in a component's SCSS that are applied dynamically (e.g. via a JS variable), add the selector to the `purgeCSSExtensionPlugin` safelist or it will be stripped from production builds.
6. **Storybook ArgTypes are auto-generated:** `src/docs/config/components-args.json` is written by `generateStorybookArgs` during `stencil build`. Do not edit it manually. Prop documentation belongs in the TSDoc comments on `@Prop()` decorators.
7. **Module boundary rule:** Any cross-module communication at runtime must use the shared event interfaces in `src/utils/interfaces/` — do not define new event detail shapes inside a component file.
