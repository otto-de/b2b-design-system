# Module: react_components

## Module Ownership
- **Primary Responsibility:** Provide React-compatible wrapper components (proxy layer) for every Web Component exported by `@otto-de/b2b-core-components`. This module owns the proxy mechanism (`createReactComponent`, `createOverlayComponent`, `attachProps`, utilities) and the auto-generated index that registers all 70+ component proxies. It does **not** own any component logic, props, events, or rendering — all of that remains in `core-components`.
- **Explicit Non-Responsibilities:** Does not own component business logic, SCSS, or events (owned by core-components modules); does not own design tokens (owned by `tokens`); does not own Stencil build configuration (owned by `build_and_release_pipeline`).
- **Integration Boundaries:**
  - `consumes ← core-components` (runtime + compile-time): All proxy components wrap `@otto-de/b2b-core-components` Web Component tags. Imports `JSX` namespace types and `defineCustomElements` loader from the core package. The package lists `@otto-de/b2b-core-components: 1.38.1` as its sole runtime dependency.
  - `consumes ← @stencil/react-output-target` (build-time, indirect): The auto-generated `stencil-generated/index.ts` and `react-component-lib/` files are produced by the Stencil React output target configured in `stencil.config.ts` (owned by `build_and_release_pipeline`). These files are committed into the source tree and compiled by `tsc`.
  - `produces → consumers` (npm publish): The compiled `dist/` output is published as `@otto-de/b2b-react-components` for React application teams to import.

---

## Entry Points

| File | Role |
|------|------|
| `src/components/stencil-generated/index.ts` | Auto-generated barrel — exports one `PascalCase` React component constant for each Web Component tag. Calls `defineCustomElements()` at module load to register all custom elements in the browser. |
| `src/components/stencil-generated/react-component-lib/createComponent.tsx` | Core proxy factory — `createReactComponent<PropType, ElementType>(tagName)` creates a `React.Component` class that bridges React props/events to the underlying Web Component DOM element. |
| `src/components/stencil-generated/react-component-lib/createOverlayComponent.tsx` | Overlay proxy factory (unused by current index) — `createOverlayComponent(tagName, controller)` wraps imperative `present()`/`dismiss()` overlay elements (Ionic-pattern). Available for future use. |
| `src/components/stencil-generated/react-component-lib/index.ts` | Re-exports both factory helpers. |
| `src/components/stencil-generated/react-component-lib/utils/` | `attachProps`, `camelToDashCase`, `dashToPascalCase`, `isCoveredByReact`, `mergeRefs`, `createForwardRef` — DOM property/event attachment utilities used by the proxy `componentDidMount`/`componentDidUpdate` lifecycle. |

---

## Component Export Map (stencil-generated/index.ts)

All 70 exports follow the pattern:
```ts
export const B2b{ComponentName} = createReactComponent<JSX.B2b{ComponentName}, HTMLB2b{ComponentName}Element>('b2b-{component-name}');
```

| React Export | Web Component Tag | Owning Core Module |
|---|---|---|
| `B2bAlert` | `b2b-alert` | feedback_and_overlay_components |
| `B2bAnchor` | `b2b-anchor` | navigation_components |
| `B2bBackgroundBox` | `b2b-background-box` | layout_and_content_components |
| `B2bBreadcrumb`, `B2bBreadcrumbItem` | `b2b-breadcrumb`, `b2b-breadcrumb-item` | navigation_components |
| `B2bButton` | `b2b-button` | layout_and_content_components |
| `B2bCard` | `b2b-card` | layout_and_content_components |
| `B2bCheckbox`, `B2bCheckboxGroup` | `b2b-checkbox`, `b2b-checkbox-group` | form_components |
| `B2bChipComponent` | `b2b-chip-component` | layout_and_content_components |
| `B2bCustomDropdown`, `B2bCustomDropdownOption` | `b2b-custom-dropdown`, `b2b-custom-dropdown-option` | form_components |
| `B2bDatePicker`, `B2bDatePickerDays`, `B2bDatePickerDaysHeader`, `B2bDatePickerHeader`, `B2bDatePickerMonths`, `B2bDatePickerYears` | `b2b-date-picker-*` | form_components |
| `B2bDateRangePicker`, `B2bDateRangePickerDays` | `b2b-date-range-picker*` | form_components |
| `B2bDropdown` | `b2b-dropdown` | form_components |
| `B2bFlyoutMenu`, `B2bFlyoutMenuOption` | `b2b-flyout-menu`, `b2b-flyout-menu-option` | feedback_and_overlay_components |
| `B2bGrid`, `B2bGridCol`, `B2bGridRow` | `b2b-grid*` | layout_and_content_components |
| `B2bHeadline` | `b2b-headline` | layout_and_content_components |
| `B2bIcon`, `B2bIcon100`, `B2bIcon50` | `b2b-icon*` | icon_system |
| `B2bInput`, `B2bInputGroup`, `B2bInputLabel`, `B2bInputList`, `B2bInputListOption` | `b2b-input*` | form_components |
| `B2bLabel` | `b2b-label` | layout_and_content_components |
| `B2bModal` | `b2b-modal` | feedback_and_overlay_components |
| `B2bMultiselectDropdown`, `B2bMultiselectOption` | `b2b-multiselect*` | form_components |
| `B2bPagination` | `b2b-pagination` | navigation_components |
| `B2bParagraph` | `b2b-paragraph` | layout_and_content_components |
| `B2bProgressBar` | `b2b-progress-bar` | feedback_and_overlay_components |
| `B2bRadioButton`, `B2bRadioGroup` | `b2b-radio*` | form_components |
| `B2bRequiredSeparator` | `b2b-required-separator` | form_components |
| `B2bRoundedIcon` | `b2b-rounded-icon` | layout_and_content_components |
| `B2bScrollableContainer` | `b2b-scrollable-container` | layout_and_content_components |
| `B2bSearch` | `b2b-search` | form_components |
| `B2bSeparator` | `b2b-separator` | layout_and_content_components |
| `B2bShimmer` | `b2b-shimmer` | feedback_and_overlay_components |
| `B2bSnackbar` | `b2b-snackbar` | feedback_and_overlay_components |
| `B2bSpinner` | `b2b-spinner` | feedback_and_overlay_components |
| `B2bTab`, `B2bTabGroup`, `B2bTabPanel` | `b2b-tab*` | navigation_components |
| `B2bTable`, `B2bTableCell`, `B2bTableHeader`, `B2bTableRow`, `B2bTableRowgroup` | `b2b-table*` | data_display_components |
| `B2bTextarea` | `b2b-textarea` | form_components |
| `B2bTimePicker` | `b2b-time-picker` | form_components |
| `B2bToggleButton`, `B2bToggleChip`, `B2bToggleGroup`, `B2bToggleSwitch` | `b2b-toggle*` | form_components |
| `B2bTooltip` | `b2b-tooltip` | feedback_and_overlay_components |
| `B2bWizard`, `B2bWizardIcon`, `B2bWizardStep` | `b2b-wizard*` | navigation_components |

---

## FLOW 1: Module Load — Custom Element Registration

- **Trigger:** Any React application imports from `@otto-de/b2b-react-components`.
- **Steps:**
  1. `stencil-generated/index.ts` is the package entry point; it imports `defineCustomElements` from `@otto-de/b2b-core-components/dist/loader` and calls it immediately at module evaluation time.
  2. `defineCustomElements()` registers all Stencil Web Components with the browser's `customElements` registry (lazy-loaded per tag on first use via the Stencil loader).
  3. Each `export const B2b*` statement calls `createReactComponent(tagName)` which instantiates the proxy class and wraps it with `createForwardRef` — no DOM side effects at this point.
- **Exit Point:** All `B2b*` React components are exported and all Web Components are scheduled for lazy registration.
- **Impacted Areas:** `src/components/stencil-generated/index.ts`.

---

## FLOW 2: React Prop / Event → Web Component Property Sync

- **Trigger:** React renders a `<B2bButton variant="primary" onB2bClick={handler} />` or updates any prop.
- **Steps:**
  1. `createReactComponent` produces a class component. On `componentDidMount` and `componentDidUpdate`, it calls `attachProps(this.componentEl, this.props, prevProps)`.
  2. `attachProps` iterates every prop key:
     - **Event handlers** (`on` + uppercase second char): extracts `eventName = name.substring(2).toLowerCase()`. If `isCoveredByReact(eventName)` → passes as a React synthetic event attribute. Otherwise → calls `this.componentEl.addEventListener(eventName, value)` and removes the old listener from `prevProps`.
     - **Primitive props** (`string | boolean | number`): passed as HTML attributes via `camelToDashCase(name)` in `render()`.
     - **Complex props** (objects, arrays, functions): set directly as `this.componentEl[propName] = value` via `attachProps` property assignment (bypasses React's attribute serialisation).
  3. `createForwardRef` wraps the class component so consumers can attach a `ref` to the underlying Web Component DOM element.
- **Exit Point:** Web Component DOM element has correct attributes, properties, and event listeners synchronised from React's virtual DOM.
- **Impacted Areas:** `src/components/stencil-generated/react-component-lib/createComponent.tsx`, `src/components/stencil-generated/react-component-lib/utils/`.

---

## Build Details

- **Compile command:** `npm run tsc` (plain TypeScript compiler, no bundler)
- **Output directory:** `dist/` — compiled JS + declaration files
- **tsconfig targets:** `es2015`, `commonjs` modules, `jsx: react`, `declaration: true`
- **Published files:** `dist/` and `src/` (source maps + raw TS for consumers who want it)
- **No test suite** in this package — proxy correctness is verified by core-components integration tests and consumer apps.
