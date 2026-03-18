# Module: shared_utilities

## Module Ownership
- **Primary Responsibility:** Provide all cross-cutting runtime helpers, compile-time TypeScript contracts (interfaces and type constants), and shared configuration values consumed by every other module in `@otto-de/b2b-core-components`. This module owns no renderable components — it is purely a utility, type, and interface layer.
- **Explicit Non-Responsibilities:** Does not own any Web Component or its rendering logic; does not own design tokens (owned by `tokens`); does not own component-specific business logic that lives inside a component file (even if it uses shared types).
- **Integration Boundaries:**
  - `produces → form_components` (runtime + compile-time): `parsePropToArray` (JSON/CSV prop normalisation), `DateUtils` (date arithmetic), `HTMLB2bFormElement` interface (cascading form state), all `form.interface.d.ts` event detail types.
  - `produces → feedback_and_overlay_components` (runtime + compile-time): `queryShadowRoot`, `isHidden`, `isDisabled`, `isFocusable` (focus-trap for `b2b-modal`); `BeforeCloseEventDetail`, `CloseEventTrigger`, `CssClassMap`.
  - `produces → icon_system` (runtime): `ICON_PATH` CDN base URL constant.
  - `produces → navigation_components` (compile-time): `PageChangeEventDetail`, `TabChangeEventDetail`, `BreadCrumbChangeEventDetail`, `ToggleChipEventDetail`, `WizardStatus`, `WizardSteps`.
  - `produces → data_display_components` (compile-time): `TableSizes`, `TableRowgroupTypes`, `TableSortDirections`, `ContentAlignment`, `SortIconAlignment`, `TableColourOptions`, `TableCheckboxTypes`, `ColumnSortChangeEventDetail`, `TableAccordionSelectedEventDetail`.
  - `produces → layout_and_content_components` (compile-time): `ChipComponentEventDetail`, `ToggleSwitchEventDetail`, `CssClassMap`.
  - `produces → all modules` (compile-time): `getClassList`, `getClassMap`, `isClickOutside`, `CssClassMap` are used broadly across most component files for CSS class binding and outside-click detection.

---

## Entry Points

| File | Exports |
|------|---------|
| `src/utils/utils.ts` | `format()`, `isClickOutside()` |
| `src/utils/theme.ts` | `getClassList()`, `getClassMap()` |
| `src/utils/resources.ts` | `ICON_PATH` |
| `src/utils/focus-trap.ts` | `queryShadowRoot()`, `isHidden()`, `isDisabled()`, `isFocusable()` |
| `src/utils/json-property-binding-util.ts` | `parsePropToArray()` |
| `src/utils/datepicker/date-picker-util.ts` | `DateUtils` (static class) |
| `src/utils/interfaces/interface.d.ts` | Core form/input/toggle event details; `HTMLB2bFormElement`; date picker event details |
| `src/utils/interfaces/form.interface.d.ts` | `HTMLB2bFormElement` (aliased reference) |
| `src/utils/interfaces/interaction.interface.d.ts` | Pagination, tab, column-sort, breadcrumb, toggle-chip, toggle-switch event details |
| `src/utils/interfaces/content.interface.d.ts` | `TableAccordionSelectedEventDetail` |
| `src/utils/interfaces/status.interface.d.ts` | `CssClassMap`, `CloseEventTrigger`, `BeforeCloseEventDetail` |
| `src/utils/types/table.types.ts` | All table const-enum types |
| `src/utils/types/wizard.types.ts` | `WizardSteps`, `WizardStatus` |

---

## FLOW 1: Outside-Click Detection

- **Trigger:** Any component (dropdown, flyout, date-picker) calls `isClickOutside(event, host)` from a `document`-level `mousedown` or `click` listener.
- **Steps:**
  1. `isClickOutside(event: MouseEvent, host: HTMLElement)` checks whether the event target has a `shadowRoot` (custom element clicked).
  2. **If shadow root present:** uses `event.composedPath()` to traverse the composed path (crosses shadow boundaries) checking whether any node matches `host`.
  3. **If no shadow root:** walks `target.parentNode` chain up the light DOM tree checking for `host`.
  4. Returns `true` if `host` was never encountered → click is outside; `false` otherwise.
- **Exit Point:** Boolean returned to the calling component to conditionally close/hide.
- **Impacted Areas:** `src/utils/utils.ts`.

---

## FLOW 2: CSS Class Map Construction

- **Trigger:** Any component calls `getClassMap(classes)` or `getClassList(classes)` to convert a prop value into a Stencil-compatible `class` binding object.
- **Steps:**
  1. `getClassList(classes)` normalises input: if a string, splits on `' '`; if an array, uses as-is. Filters nulls and empty strings. Returns `string[]`.
  2. `getClassMap(classes)` calls `getClassList` and reduces output into `{ [className: string]: boolean }` (`CssClassMap`) with every entry set to `true`.
  3. The returned `CssClassMap` is spread into a component's `class` object in JSX, allowing Stencil's virtual DOM to diff class additions/removals.
- **Exit Point:** `CssClassMap` object consumed directly in component `class={{ ... }}` expressions.
- **Impacted Areas:** `src/utils/theme.ts`, `src/utils/interfaces/status.interface.d.ts`.

---

## FLOW 3: Shadow DOM Focus-Trap Traversal

- **Trigger:** `b2b-modal` calls `queryShadowRoot(shadowRoot, skipNode, isMatch)` to build the list of focusable elements for focus-trap cycling.
- **Steps:**
  1. `queryShadowRoot(root, skipNode, isMatch, maxDepth=20, depth=0)` recursively iterates `root.children`.
  2. For each child: if `skipNode($child)` is true (e.g. `isHidden` returns true) → skip the entire sub-tree.
  3. If `isMatch($child)` is true (e.g. `isFocusable` returns true) → push to `matches`.
  4. If child has a `.shadowRoot` → recurse into it (crosses shadow boundary).
  5. If child is a `SLOT` → resolve assigned nodes via `$slot.assignedNodes()` filtered to `Node.ELEMENT_NODE`, then recurse into the slot parent.
  6. Otherwise → recurse into the child's children.
  7. Returns `HTMLElement[]` of all matching elements across the entire shadow tree.
- **`isHidden($elem)`:** returns `true` if `hidden` attribute, `aria-hidden` (!= `'false'`), `display:none`, `opacity:0`, or `visibility:hidden/collapse`.
- **`isDisabled($elem)`:** returns `true` if `disabled` attribute or `aria-disabled` (!= `'false'`).
- **`isFocusable($elem)`:** returns `false` if `tabindex="-1"`, hidden, or disabled; returns `true` for `tabindex` attribute, anchor/area with `href`, button, input, textarea, select, or iframe elements.
- **Exit Point:** `HTMLElement[]` returned to `b2b-modal` for first/last element focus cycling on Tab/Shift-Tab.
- **Impacted Areas:** `src/utils/focus-trap.ts`.

---

## FLOW 4: Prop Array Normalisation

- **Trigger:** A component receives an array-valued prop (`selectedOptions`, `disabledOptions`, etc.) that may arrive as a JSON string, a comma-separated string, or a native JS array (when consumed via React/JS).
- **Steps:**
  1. `parsePropToArray(value: string | string[])` is called in the component's `@Watch` or `componentWillLoad`.
  2. If already an array → return as-is.
  3. If a string → attempt `JSON.parse(value)` (handles `'["a","b"]'` form).
  4. If `JSON.parse` throws → fall back to `value.split(',').map(v => v.trim()).filter(Boolean)` (handles `'a, b, c'` form).
  5. Returns `string[]`.
- **Exit Point:** Normalised `string[]` set on the component's reactive state for rendering and comparison.
- **Impacted Areas:** `src/utils/json-property-binding-util.ts`.

---

## FLOW 5: Date Disablement Evaluation

- **Trigger:** A date-picker calendar cell calls `DateUtils.isDisabledDate(givenDate, options)` during render to decide whether a calendar day should be rendered as disabled.
- **Steps:**
  1. Destructures `options`: `disableDates[]`, `disablePastDates`, `disableFutureDates`, `disableWeekends`, `todayWithoutTime`, `disableEvery[]` (day-name strings), `disableDatesUntil`, `disableDatesFrom`.
  2. `isExplicitlyDisabled`: checks `disableDates` array via `DateUtils.isSameDate` (year+month+day equality, no time component).
  3. `isPastDate`: `disablePastDates && givenDate < todayWithoutTime`.
  4. `isFutureDate`: `disableFutureDates && givenDate > todayWithoutTime`.
  5. `isWeekend`: `disableWeekends && (day === 0 || day === 6)`.
  6. `isDayToDisable`: maps German/English day-name abbreviations (`"Mo"`, `"Di"/"Tu"`, etc.) to day-index via `dayNameToIndex` lookup; matches against `getDay()`.
  7. `isBeforeDisableUntil` / `isAfterDisableFrom`: range boundaries (inclusive `<=` / `>=`).
  8. Returns `true` if any rule matches.
- **Supporting utility:** `DateUtils.parseStringToDateArray(value)` parses `"dd.mm.yyyy,dd.mm.yyyy"` comma-separated strings into `Date[]` (used to hydrate `disabledDates` prop from an HTML attribute string).
- **Exit Point:** Boolean consumed by date-picker cell render logic to apply disabled styling and `disabled` attribute.
- **Impacted Areas:** `src/utils/datepicker/date-picker-util.ts`.

---

## Interface Catalogue

### `src/utils/interfaces/interface.d.ts` — Form & Input Event Details
| Interface | Used By |
|-----------|---------|
| `InputChangeEvent { value }` | `b2b-input`, `b2b-textarea` |
| `RadioEventDetail<T> { value, checked }` | `b2b-radio-button` |
| `CheckboxEventDetail<T> { value, checked }` | `b2b-checkbox`, `b2b-table-row` |
| `SearchClickEventDetail<T> { searchTerm }` | `b2b-search-input` |
| `OptionSelectedEventDetail<T> { selectedOption }` | `b2b-dropdown` |
| `DateSelectedEventDetail { selectedDate }` | `b2b-date-picker` |
| `MultiSelectOptionEventDetail { selected, selectedOption }` | `b2b-multiselect-dropdown` |
| `HTMLB2bFormElement { error?, invalid?, disabled?, hint?, groupDisabled? }` | All input-group components |
| `ToggleButtonEventDetail<T>` | `b2b-toggle-button` |
| `ChipComponentEventDetail<T>` | `b2b-chip-component` |
| `DatePickerEventDetail { selectedDate }` | `b2b-date-picker` |
| `DateRangePickerEventDetail { selected: readonly [Date, Date] }` | `b2b-date-range-picker` |
| `DatePickerViewChangedEventDetail<T>` | Date picker view navigation |
| `MonthSelectedEventDetail<T>` | Month-year picker |
| `YearSelectedEventDetail<T>` | Month-year picker |

### `src/utils/interfaces/interaction.interface.d.ts` — Navigation & Sort Events
| Interface | Used By |
|-----------|---------|
| `PageChangeEventDetail { lastSelectedPage, currentPage, direction? }` | `b2b-pagination` |
| `TabChangeEventDetail { previousTab, nextTab }` | `b2b-tab-group` |
| `ColumnSortChangeEventDetail { sortedColumn, sortDirection }` | `b2b-table` |
| `BreadCrumbChangeEventDetail<T>` | `b2b-breadcrumb` |
| `ToggleChipEventDetail<T extends string> { value, isActive }` | `b2b-toggle-chip` |
| `ToggleSwitchEventDetail<T extends boolean>` | `b2b-toggle-switch` |

### `src/utils/interfaces/content.interface.d.ts`
| Interface | Used By |
|-----------|---------|
| `TableAccordionSelectedEventDetail { group, values[] }` | `b2b-table-rowgroup` |

### `src/utils/interfaces/status.interface.d.ts`
| Interface | Used By |
|-----------|---------|
| `CssClassMap { [className: string]: boolean }` | All components via `getClassMap` |
| `CloseEventTrigger` (`'CLOSE_BUTTON' \| 'ESCAPE_KEY' \| 'BACKDROP'`) | `b2b-modal` |
| `BeforeCloseEventDetail { trigger: CloseEventTrigger }` | `b2b-modal` |

### `src/utils/types/table.types.ts`
`TableSizes`, `TableRowgroupTypes`, `ContentAlignment`, `SortIconAlignment`, `TableSortDirections`, `TableCheckboxTypes`, `TableColourOptions` — all const-enum pattern (`as const` object + derived union type).

### `src/utils/types/wizard.types.ts`
`WizardSteps` (string union `'1'–'6'`), `WizardStatus` (`default | completed | pending | disabled`).
