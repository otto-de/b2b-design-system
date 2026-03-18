# Module: data_display_components

## Module Ownership
- **Primary Responsibility:** Provide the full table compound-component family — `b2b-table`, `b2b-table-rowgroup`, `b2b-table-row`, `b2b-table-header`, and `b2b-table-cell` — together with all internal table utilities (`utils.ts`) that manage column sizing, flex-basis calculation, checkbox state synchronisation, and row-group accordion visibility.
- **Explicit Non-Responsibilities:** Does not own checkbox rendering logic (owned by `form_components` — `b2b-checkbox` is consumed as an integration boundary); does not own icon SVG rendering (owned by `icon_system`); does not own design tokens (owned by `tokens`); does not own generic layout containers or the scrollable-container that tables may be placed inside (owned by `layout_and_content_components`).
- **Integration Boundaries:**
  - `consumes ← tokens` (build-time): Component SCSS consumes token CSS custom properties for table colours, spacing, and border styles.
  - `consumes ← form_components` (runtime): `b2b-table-row` renders `<b2b-checkbox>` elements inside selectable rows; it listens for `b2b-change` events from those checkboxes to manage `checked`/`indeterminate` states.
  - `consumes ← icon_system` (runtime): `b2b-table-row` renders `<b2b-icon-100 icon="b2b_icon-arrow-right">` as the accordion expand/collapse toggle button.
  - `consumes ← layout_and_content_components` (runtime, contextual): `b2b-table` detects whether it is placed inside a `<b2b-scrollable-container>` to activate sticky header mode.
  - `consumes ← shared_utilities/table.types` (compile-time): All sub-components import `TableSizes`, `TableRowgroupTypes`, `TableSortDirections`, `ContentAlignment`, `SortIconAlignment`, `TableColourOptions`, `TableCheckboxTypes` from `utils/types/table.types.ts`.
  - `consumes ← shared_utilities/interaction.interface` (compile-time): `b2b-table` and `b2b-table-header` use `ColumnSortChangeEventDetail` from `utils/interfaces/interaction.interface.d.ts`.
  - `consumes ← shared_utilities/content.interface` (compile-time): `b2b-table-rowgroup` uses `TableAccordionSelectedEventDetail` from `utils/interfaces/content.interface.d.ts`.
  - `produces → react_components` (indirect): All table components included in the Stencil React output-target proxy generation.

---

## Entry Points

| Tag | Component | Primary Role |
|-----|-----------|-------------|
| `<b2b-table>` | `TableComponent` | Root table container; propagates `size` to all rows/cells; listens for column sort changes; detects scrollable-container context for sticky headers |
| `<b2b-table-rowgroup>` | `TableRowgroupComponent` | Groups rows into `header`, `body`, or `footer` sections; owns accordion expand/collapse logic and row-level checkbox select-all coordination |
| `<b2b-table-row>` | `TableRowComponent` | Individual table row; handles highlight, colour, selectable-checkbox injection, and accordion toggle button rendering |
| `<b2b-table-header>` | `TableHeaderComponent` | Column header cell with optional sort direction cycling and `b2b-change` event; manages `setFlexBase` for colspan mode |
| `<b2b-table-cell>` | `TableCellComponent` | Data cell with optional text-ellipsis expand-on-hover, divider, colour, alignment, and colspan `setFlexBase` |

---

## FLOW 1: Column Sort — Click / Keyboard

- **Trigger:** User clicks or presses Enter on a `<b2b-table-header>` with a defined `sortDirection` prop.
- **Steps:**
  1. `changeSortDirection` fires on `click` or `keydown` (Enter only).
  2. `unSortSiblings()`: queries all `b2b-table-header` siblings in the same `b2b-table-row` and resets their `sortDirection` to `'not-sorted'` (only one column can be sorted at a time; also enforced by a `componentDidLoad` warning on `b2b-table`).
  3. `setActive()` marks the header as active (drives visual sort-icon prominence).
  4. Direction cycles: `'not-sorted'` → `ascending`; `'ascending'` → `'descending'`; `'descending'` → `'ascending'`.
  5. `b2b-change` event emitted with the new `TableSortDirections` value.
  6. `b2b-table`'s `@Listen('b2b-change')` intercepts only events from `B2B-TABLE-HEADER` targets and re-emits as `b2b-sort-change` with `ColumnSortChangeEventDetail { sortedColumn, sortDirection }` (using `sortId` prop if set, otherwise `textContent`).
- **Exit Point:** `b2b-sort-change` event dispatched from `b2b-table` to consumer to trigger data re-sort.
- **Impacted Areas:** `src/components/table/table-header/table-header.tsx`, `src/components/table/table.tsx`, `src/utils/types/table.types.ts`, `src/utils/interfaces/interaction.interface.d.ts`.

---

## FLOW 2: Selectable Rows — Checkbox State Synchronisation

- **Trigger:** User checks or unchecks a `<b2b-checkbox>` within a selectable `<b2b-table-row>`.
- **Steps:**
  1. `b2b-table-rowgroup` sets `selectable=true` on all child rows via `addCheckboxColumn()` in `componentWillLoad`.
  2. Each `b2b-table-row` where `shouldAddCheckbox()` is true (i.e. no pre-existing `b2b-checkbox`) injects a `b2b-checkbox` inside either a `b2b-table-header` (header row) or `b2b-table-cell` (body row).
  3. `b2b-table-row`'s `@Listen('b2b-change')` (from the inner checkbox) fires `toggleSelected()`: sets `this.checked` and emits `b2b-row-selected` with `CheckboxEventDetail { checked, value }`.
  4. `b2b-table-rowgroup`'s `@Listen('b2b-row-selected')` fires `handleSelectedChange()`:
     - **Header row selected**: `toggleSelectAll` propagates `checked` state to all remaining body rows.
     - **Accordion first-row selected**: `toggleSelectAll` propagates to all child rows within the accordion group.
     - **Regular body row**: adds/removes the row's `value` from `selectedValues` state.
  5. `updateCheckboxState(rows, header)` recalculates the header checkbox's `checked` (all selected) and `indeterminate` (some selected) state.
  6. For accordion rowgroups: `b2b-group-selected` emitted with `TableAccordionSelectedEventDetail { group: parentValue, values: selectedValues[] }`.
- **Exit Point:** All row checkboxes reflect cohesive selection state; `b2b-group-selected` event dispatched from rowgroup.
- **Impacted Areas:** `src/components/table/table-rowgroup/table-rowgroup.tsx`, `src/components/table/table-row/table-row.tsx`, `src/components/table/utils.ts`, `src/utils/interfaces/content.interface.d.ts`.

---

## FLOW 3: Accordion Rows — Expand / Collapse

- **Trigger:** User clicks the arrow-icon accordion button in the first row of an `accordion` rowgroup.
- **Steps:**
  1. `b2b-table-rowgroup` has `accordion=true`; first `b2b-table-row` renders a `b2b-table-cell` containing a `<button>` with `<b2b-icon-100 icon="b2b_icon-arrow-right">`. Subsequent rows render empty spacer cells.
  2. Click on the accordion button in the first row → `toggleOpen()` flips `this.isOpen` → `b2b-open` event emitted with `boolean`.
  3. `b2b-table-rowgroup`'s `@Listen('b2b-open')` fires `handleOpenChange(event.detail)` → `toggleChildRowVisibility(isOpen)`:
     - **COLSPAN table**: sets `hidden` attribute and `aria-hidden` on non-first rows.
     - **Other sizes**: sets `style.visibility = 'collapse'` / `'visible'` and `aria-hidden` on non-first rows.
  4. Initial state on load: `toggleInitialVisibility()` calls `firstRow.toggleAccordion(this.opened)` to honour the `opened` prop default.
- **Exit Point:** Child rows hidden or shown; accordion button rotates via CSS class.
- **Impacted Areas:** `src/components/table/table-rowgroup/table-rowgroup.tsx`, `src/components/table/table-row/table-row.tsx`.

---

## FLOW 4: Column Sizing — Colspan Flex-Basis Calculation

- **Trigger:** `b2b-table` has `size="colspan"` and contains rows with `colspan` attributes on cells/headers.
- **Steps:**
  1. `b2b-table-row.componentWillLoad()` calls `setTotalCols()`: sums all children's `colspan` values (defaulting to 1) and broadcasts `totalCols` to every cell/header.
  2. `b2b-table-cell` and `b2b-table-header` each call `setFlexBase(host, colspan, totalCols, selectable, accordion)` from `utils.ts`:
     - Calculates `flexBasis` as `calc((N/total * 100%) - checkboxSpace - accordionSpace - borderSpace)`.
     - Accounts for selectable control column (40px) and accordion control column (48px) when computing proportional widths.
  3. `host.style.flexBasis` is set inline so cells stretch proportionally in a flex-row layout.
- **Exit Point:** All cells width-proportional to their `colspan` within the total column count.
- **Impacted Areas:** `src/components/table/utils.ts`, `src/components/table/table-cell/table-cell.tsx`, `src/components/table/table-header/table-header.tsx`, `src/components/table/table-row/table-row.tsx`.

---

## FLOW 5: Sticky Headers — Scrollable Context Detection

- **Trigger:** `b2b-table` is placed inside a `<b2b-scrollable-container>`.
- **Steps:**
  1. `b2b-table.componentWillLoad()`: `this.isScrollable = this.host.closest('b2b-scrollable-container') !== null`.
  2. `componentDidRender()`: if `isScrollable`, calls `setFixedHeaders()` → queries the first `b2b-table-rowgroup` and sets `rowGroup.fixed = true`.
  3. `b2b-table-rowgroup` with `fixed=true` applies `position: sticky; top: 0` via CSS to keep the header row visible during scroll. (Also exposed as the preferred pattern over the deprecated `fixed` prop on `b2b-table-header`.)
- **Exit Point:** Header row sticks to the top of the scroll viewport.
- **Impacted Areas:** `src/components/table/table.tsx`, `src/components/table/table-rowgroup/table-rowgroup.tsx`.
