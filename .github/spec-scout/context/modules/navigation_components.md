# Module: navigation_components

## Module Ownership
- **Primary Responsibility:** Provide all wayfinding and navigation Web Components — `b2b-breadcrumb`, `b2b-pagination`, `b2b-tab` / `b2b-tab-group` / `b2b-tab-panel`, `b2b-anchor`, `b2b-wizard` / `b2b-wizard-step` / `b2b-wizard-icon` — each managing navigation state, keyboard accessibility, and emitting standardised navigation events.
- **Explicit Non-Responsibilities:** Does not own form/input controls (owned by `form_components`); does not own feedback/overlay UI (owned by `feedback_and_overlay_components`); does not own layout primitives or general text components (owned by `layout_and_content_components`); does not own icon SVG rendering (owned by `icon_system`); does not own focus-trap logic (owned by `shared_utilities`).
- **Integration Boundaries:**
  - `consumes ← tokens` (build-time): Component SCSS consumes token CSS custom properties for colour, spacing, and sizing.
  - `consumes ← icon_system` (runtime): `b2b-wizard-icon` renders `<b2b-icon-100 icon="b2b_icon-check">` for completed steps.
  - `consumes ← layout_and_content_components` (runtime): `b2b-tab-group` renders `<b2b-separator>` between tab bar and panel area; `b2b-pagination` renders `<b2b-button>` elements for page items and prev/next controls; `b2b-wizard-icon` renders `<b2b-rounded-icon>` as its circular step indicator.
  - `consumes ← shared_utilities/interaction.interface` (compile-time): Uses `TabChangeEventDetail`, `BreadCrumbChangeEventDetail`, `PageChangeEventDetail` from `utils/interfaces/interaction.interface.d.ts`.
  - `consumes ← shared_utilities/wizard.types` (compile-time): Uses `WizardStatus` and `WizardSteps` types from `utils/types/wizard.types.ts`.
  - `produces → react_components` (indirect): All navigation components included in the Stencil React output-target proxy generation.

---

## Entry Points

| Tag | Component | Primary Role |
|-----|-----------|-------------|
| `<b2b-breadcrumb>` | `B2bBreadCrumbComponent` | Ordered trail of `b2b-breadcrumb-item` children; emits `b2b-selected` on item activation |
| `<b2b-pagination>` | `PaginationComponent` | Page number navigator; renders `b2b-button` items with dots algorithm; emits `b2b-page-change` |
| `<b2b-tab>` | `B2bTabComponent` | Individual selectable tab; reflects `selected`, `disabled`, `invalid` states; emits `b2b-change` |
| `<b2b-tab-group>` | `B2bTabGroupComponent` | Tab container; manages tab selection, panel visibility linking, keyboard navigation; emits `b2b-selected` |
| `<b2b-tab-panel>` | `B2bTabPanelComponent` | Content panel associated with a tab; shown/hidden by `b2b-tab-group` |
| `<b2b-anchor>` | `AnchorComponent` | Styled hyperlink wrapper with `href`, `target`, `download`, `size`, and `hoverColor` props |
| `<b2b-wizard>` | `WizardComponent` | Multi-step progress indicator (1–6 steps); auto-derives step states from `activeStep` prop |
| `<b2b-wizard-step>` | `WizardStepComponent` | Individual step row within a wizard; renders `b2b-wizard-icon` + labelled slot |
| `<b2b-wizard-icon>` | `WizardIconComponent` | Circular step icon; renders state-specific `b2b-rounded-icon` + optional `b2b-icon-100` checkmark |

---

## FLOW 1: Breadcrumb — Item Selection

- **Trigger:** User clicks a `b2b-breadcrumb-item` slotted inside `<b2b-breadcrumb>`.
- **Steps:**
  1. `b2b-breadcrumb-item` emits a `b2b-change` event bubbling up to the host.
  2. `b2b-breadcrumb`'s `@Listen('b2b-change')` handler fires → `updateActiveItem(item)` sets all other breadcrumb items' `active` prop to `false`.
  3. `b2b-selected` event emitted with `BreadCrumbChangeEventDetail { value: item.value }`.
- **Exit Point:** Active item highlighted; `b2b-selected` event with selected value dispatched to consumer.
- **Impacted Areas:** `src/components/breadcrumb/breadcrumb.tsx`, `src/utils/interfaces/interaction.interface.d.ts`.

---

## FLOW 2: Pagination — Page Selection

- **Trigger:** User clicks a page number button, the Prev (`←`) button, or the Next (`→`) button in `<b2b-pagination>`.
- **Steps:**
  1. `getNavItems()` computes the visible navigation array using a dot-ellipsis algorithm:
     - ≤5 pages: all pages shown.
     - >5 pages: always shows first and last; shows left/right dots based on `activePage` siblings (`leftSiblingIndex`, `rightSiblingIndex`). Dots items navigate by ±2 pages when clicked.
  2. On page click: `setSelectedPage(navItem, index)` resolves actual page number (dots → activePage ±2); calls `updateState(nextActivePage)`.
  3. On Prev/Next: `selectPreviousPage()` / `selectNextPage()` call `updateState` with direction `'PREVIOUS'`/`'NEXT'`.
  4. `updateState`: updates `activePage`, recalculates `navItems`, emits `b2b-page-change` with `PageChangeEventDetail { lastSelectedPage, currentPage, direction? }`.
  5. `@Watch('totalPages')` and `@Watch('activePage')` keep `navItems` and `activePage` in sync if changed externally.
- **Exit Point:** Active page updated in UI; `b2b-page-change` event dispatched.
- **Impacted Areas:** `src/components/pagination/pagination.tsx`, `src/components/pagination/pagination.constants.ts`, `src/utils/interfaces/interaction.interface.d.ts`.

---

## FLOW 3: Tab Group — Tab Selection & Panel Linking

- **Trigger:** User clicks a `<b2b-tab>` or uses keyboard navigation within `<b2b-tab-group>`.
- **Steps:**
  1. `componentDidRender`: waits for `b2b-tab` and `b2b-tab-panel` custom elements to be defined, then calls `linkPanels()`.
  2. `linkPanels()`: pairs each enabled tab to its immediately following sibling `b2b-tab-panel` via `aria-controls` / `aria-labelledby` attributes. Selects the initially `selected` tab (or the first tab if none is pre-selected).
  3. `selectTab(nextTab)`: calls `reset()` (hides all panels, deselects all tabs), then sets `nextPanel.hidden=false` and `nextTab.selected=true`. Emits `b2b-selected` with `TabChangeEventDetail { previousTab, nextTab }`.
  4. **Keyboard navigation** (`@Listen('keydown')`): ArrowLeft/ArrowRight cycle through enabled tabs; Home/End jump to first/last. `event.preventDefault()` prevents default scroll behaviour.
  5. **Router mode** (`useRouter=true`): click and keydown handlers are bypassed entirely — consumer manages selection via an external router.
- **Exit Point:** Selected tab highlighted; corresponding panel visible; `b2b-selected` event dispatched.
- **Impacted Areas:** `src/components/tab-group/tab-group.tsx`, `src/components/tab/tab.tsx`, `src/components/tab-panel/tab-panel.tsx`, `src/utils/interfaces/interaction.interface.d.ts`.

---

## FLOW 4: Wizard — Automatic Step State Management

- **Trigger:** Consumer sets or changes the `activeStep` prop on `<b2b-wizard>`.
- **Steps:**
  1. `componentWillLoad`: validates `activeStep` is not greater than the total number of `b2b-wizard-step` children; warns if more than 6 steps are used.
  2. `componentWillRender` (when `custom=false`): calls `setStepsState()` → iterates all `b2b-wizard-step` children and assigns each a `state` derived from `getStepState(index+1)`:
     - `step === activeStep` → `WizardStatus.PENDING` (current step, in progress)
     - `step < activeStep` OR `activeStep === 0` → `WizardStatus.COMPLETED` (past steps)
     - `step > activeStep` → `WizardStatus.DEFAULT` (future steps)
  3. Each `b2b-wizard-step` renders its `state` by passing it to `<b2b-wizard-icon>`, which renders a `b2b-rounded-icon` variant appropriate for that state. Completed steps show a `b2b-icon-100` checkmark (if `checkIcon=true`) or the step number.
  4. **Manual mode** (`custom=true`): step states must be set explicitly by the consumer on each `b2b-wizard-step`; the automatic derivation is skipped.
- **Exit Point:** All wizard steps visually reflect their states; no events emitted (state is driven entirely by props).
- **Impacted Areas:** `src/components/wizard/wizard.tsx`, `src/components/wizard/wizard-step.tsx`, `src/components/wizard-icon/wizard-icon.tsx`, `src/utils/types/wizard.types.ts`.

---

## FLOW 5: Anchor — Link Rendering

- **Trigger:** Consumer declares `<b2b-anchor href="...">` anywhere content requires a styled hyperlink.
- **Steps:**
  1. Props resolved: `href` (required), `target` (mapped to `_self`/`_blank`/`_parent`/`_top`), `download` (activates browser save behaviour), `size` (`inherit` or fixed `100` = 14px), `hoverColor` and `underlineText` control visual modifiers.
  2. Renders a native `<a>` element with the resolved attributes inside Shadow DOM. CSS custom properties from `tokens` drive hover colour and text-decoration.
- **Exit Point:** Native anchor element rendered; browser handles navigation.
- **Impacted Areas:** `src/components/anchor/anchor.tsx`.
