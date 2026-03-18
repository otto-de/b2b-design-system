# Module: form_components

## Module Ownership
- **Primary Responsibility:** Provide all user-input and selection controls — text inputs, textareas, dropdowns, date/time pickers, radio/checkbox groups, toggle controls, search, and form-layout helpers — each as a self-contained Stencil Web Component that manages its own state, validation display, and emits standardised DOM events.
- **Explicit Non-Responsibilities:** Does not own design-token definitions (owned by `tokens`); does not own icon SVG rendering (owned by `icon_system`); does not own overlay/modal/feedback UI (owned by `feedback_and_overlay_components`); does not own focus-trap logic (owned by `shared_utilities`); does not own pagination or navigation tabs (owned by `navigation_components`).
- **Integration Boundaries:**
  - `consumes ← tokens` (build-time): All component SCSS files consume token CSS custom properties (e.g. `--b2b-color-copy-default`, `--b2b-size-space-100`).
  - `consumes ← icon_system` (runtime, slot-based): Components such as `b2b-input` accept `b2b-icon`, `b2b-icon-50`, or `b2b-icon-100` elements in named slots (`start`/`end`).
  - `consumes ← shared_utilities` (compile-time): Uses `parsePropToArray` (`json-property-binding-util.ts`), `isClickOutside` (`utils.ts`), and shared interfaces from `form.interface.d.ts` (`InputChangeEvent`, `CheckboxEventDetail`, `RadioEventDetail`, `OptionSelectedEventDetail`, `DatePickerEventDetail`, `DateRangePickerEventDetail`, `ToggleButtonEventDetail`, etc.).
  - `consumes ← layout_and_content_components` (runtime, slot-based): `b2b-input` renders `<b2b-input-label>` as a child internally; `b2b-search` renders `<b2b-input>` internally; `b2b-input-group` broadcasts `invalid`/`disabled` state to slotted form children.
  - `produces → react_components` (indirect): All form components are included in the Stencil React output-target proxy generation.

---

## Entry Points

| Tag | Component | Primary Action |
|-----|-----------|---------------|
| `<b2b-input>` | `InputComponent` | Single-line text input with label, hint, error, prefix/suffix slots, form participation |
| `<b2b-textarea>` | `TextareaComponent` | Multi-line text input with label, hint, error, character-count option |
| `<b2b-dropdown>` | `DropdownComponent` | Single-select dropdown using native `<option>` children; optional inline search and clear |
| `<b2b-multiselect-dropdown>` | `B2bMultiSelectDropdown` | Multi-select dropdown with chip display; options passed as prop array or JSON string |
| `<b2b-custom-dropdown>` | `B2bCustomDropdownComponent` | Fully custom-content dropdown container; uses slotted `b2b-custom-dropdown-option` children |
| `<b2b-search>` | `SearchComponent` | Search bar with optional typeahead option list; emits search term on button click or Enter |
| `<b2b-checkbox>` | `CheckboxComponent` | Single checkbox with label; emits `b2b-checkbox-change` |
| `<b2b-checkbox-group>` | `CheckboxGroupComponent` | Group label wrapper for multiple `b2b-checkbox` children |
| `<b2b-radio-button>` | `RadioButtonComponent` | Single radio button; participates in `b2b-radio-group` |
| `<b2b-radio-group>` | `RadioGroupComponent` | Manages mutual exclusion and `b2b-change` for slotted `b2b-radio-button` elements |
| `<b2b-date-picker>` | `B2bDatePicker` | Calendar date picker with day/month/year navigation views; disable rules; `b2b-date-selected`, `b2b-clear` events |
| `<b2b-date-range-picker>` | `B2bDateRangePicker` | Two-input date-range picker; emits start+end tuple via `b2b-date-range-selected` |
| `<b2b-time-picker>` | `TimePickerComponent` | Time picker with configurable interval dropdown; emits `b2b-time-selected` |
| `<b2b-toggle-switch>` | `ToggleSwitchComponent` | Boolean on/off toggle; emits `b2b-change` with `ToggleSwitchEventDetail` |
| `<b2b-toggle-button>` | `ToggleButtonComponent` | Single selectable button within a toggle group |
| `<b2b-toggle-group>` | `ToggleGroupComponent` | Manages mutual exclusion for slotted `b2b-toggle-button` children |
| `<b2b-toggle-chip>` | `ToggleChipComponent` | Pill-shaped toggle chip; active/inactive state; emits `b2b-toggle-chip-active-change` |
| `<b2b-input-group>` | `B2BInputGroup` | Group wrapper that broadcasts `invalid`/`disabled` state to all slotted form element children via the `HTMLB2bFormElement` interface |
| `<b2b-input-label>` | `InputLabelComponent` | Standalone accessible label with optional required asterisk |
| `<b2b-input-list>` / `<b2b-input-list-option>` | `InputListComponent` / `InputListOptionComponent` | Typeahead suggestion list rendered beneath an input; each option emits `b2b-option-selected` |
| `<b2b-required-separator>` | `RequiredSeparatorComponent` | Visual separator with configurable "Pflichtfeld" label for forms |

---

## FLOW 1: Text Input — Value Change & Form Participation

- **Trigger:** User types into a `<b2b-input>` field.
- **Steps:**
  1. Native `<input>` `onInput` fires → `this.value` updated from `ev.target.value`.
  2. `b2bInput` (`InputChangeEvent`) event emitted with the new value.
  3. If a parent `<form>` exists (detected in `connectedCallback`), the `FormDataEvent` listener appends the value under `this.name` to the `FormData` object.
  4. `b2b-focus` / `b2b-blur` events emitted on focus transitions; hasFocus state drives the wrapper's focused CSS class.
  5. If `invalid=true` and not disabled, error message prop is rendered; hint is hidden.
  6. `hint` slot content is sanitised by MutationObserver to allow only `b2b-anchor`, `b`, `strong`, `i`, `em`, `span` children.
- **Exit Point:** Consumer receives `b2b-input` event with `InputChangeEvent`, or `FormData` is populated on form submit.
- **Impacted Areas:** `src/components/input/input.tsx`, `src/utils/interfaces/form.interface.d.ts`.

---

## FLOW 2: Dropdown — Option Selection

- **Trigger:** User clicks a `<b2b-dropdown>` trigger or selects an option.
- **Steps:**
  1. `componentWillLoad`: reads slotted native `<option>` children and builds internal `options` state array (value, label, selected, disabled). `MutationObserver` watches for runtime option changes.
  2. `toggleDropdown()` flips `isOpen` state. On open, `closeOtherDropdowns()` queries all `b2b-dropdown` elements in the document and sets their `isOpen` to `false`.
  3. When an option is clicked, `selectedValue` and `selectedText` state update; the native `<option selected>` attribute is set; `b2b-change` event emitted with the option value.
  4. Optional inline search filters the displayed options list by label text.
  5. Optional clear button calls `clearSelection()` (exposed as a public `@Method`), resets state, emits `b2b-change` with `placeholderValue`.
  6. `document` click listener (`onClickOutside`) closes the dropdown when clicking outside.
  7. `window resize` updates `truncatedText` to prevent overflow.
- **Exit Point:** `b2b-change` event with selected option value string.
- **Impacted Areas:** `src/components/dropdown/dropdown.tsx`.

---

## FLOW 3: Input Group — Cascading State Propagation

- **Trigger:** `invalid` or `disabled` prop changes on a `<b2b-input-group>`.
- **Steps:**
  1. `@Watch('invalid')` / `@Watch('disabled')` fire → `toggleAllError()` / `toggleAllDisabled()` execute.
  2. `getChildNodes()` queries all direct children cast as `HTMLB2bFormElement` (which defines `invalid`, `disabled`, `groupDisabled`, `error`, `hint` properties).
  3. On connection, `removeText()` clears individual `error` and `hint` props from children (group-level error/hint takes precedence).
  4. All children's `invalid` or `groupDisabled` props are set programmatically — driving their error/disabled visual state without requiring consumer to set each child manually.
- **Exit Point:** All slotted form children render in synchronised invalid/disabled state.
- **Impacted Areas:** `src/components/input-group/input-group.tsx`, `src/utils/interfaces/form.interface.d.ts` (`HTMLB2bFormElement`).

---

## FLOW 4: Date Picker — Calendar Navigation & Date Selection

- **Trigger:** User opens `<b2b-date-picker>` and navigates or selects a date.
- **Steps:**
  1. Component renders in `DatePickerView.DAYS` view by default. Navigation triggers (`b2b-previous-month`, `b2b-next-month` events from `date-picker-header`) change the displayed month/year via `@Listen` handlers.
  2. Clicking the month/year header switches to `DatePickerView.MONTHS` or `DatePickerView.YEARS` view (`b2b-view-changed` event).
  3. `disablePastDates`, `disableFutureDates`, `disableWeekends`, `disableDates` props are passed down to `b2b-date-picker-days` to grey out individual day cells. `parsePropToArray` (from `shared_utilities`) normalises the `disableDates` string-or-array prop.
  4. On day click: `b2b-date-selected` event emitted with `DatePickerEventDetail { selectedDate: Date }`.
  5. Clear trigger: `b2b-clear` event (`DateClear`) emitted; component resets internal state.
  6. `DateUtils` (from `utils/datepicker/date-picker-util.ts`) handles date arithmetic: month boundaries, leap-year handling, disabled-date validation.
- **Exit Point:** `b2b-date-selected` event with `selectedDate: Date`.
- **Impacted Areas:** `src/components/date-picker/date-picker.tsx`, `src/components/date-picker/date-picker-days.tsx`, `src/components/date-picker/date-picker-header.tsx`, `src/components/date-picker/date-picker-months.tsx`, `src/components/date-picker/date-picker-years.tsx`, `src/utils/datepicker/date-picker-util.ts`, `src/utils/interfaces/form.interface.d.ts`.

---

## FLOW 5: Date Range Picker — Range Selection

- **Trigger:** User interacts with `<b2b-date-range-picker>` to select a start and end date.
- **Steps:**
  1. Component renders two date-picker-style inputs (start and end). Internally uses `date-range-picker-days.tsx` for the shared calendar panel.
  2. `dateAsNumber`, `toDate`, `splitDate`, `toDateRange`, `toDateRangeString` utilities from `date-range-picker-utils.ts` handle parsing/formatting (format: `DD.MM.YYYY`).
  3. On first click: start date set, end date remains unset; range highlight begins.
  4. On second click: if after start date, end date is set; `b2b-date-range-selected` emitted with `DateRangePickerEventDetail { selected: [Date, Date] }`. If before start date, selection restarts.
  5. `isDateRangeEqual` prevents re-emitting if the user selects the same range.
  6. Clear: `b2b-clear` event resets both dates.
- **Exit Point:** `b2b-date-range-selected` event with `selected: readonly [Date, Date]`.
- **Impacted Areas:** `src/components/date-range-picker/date-range-picker.tsx`, `src/components/date-range-picker/date-range-picker-days.tsx`, `src/components/date-range-picker/date-range-picker-utils.ts`.

---

## FLOW 6: Toggle Group — Mutual Exclusion

- **Trigger:** User clicks a `<b2b-toggle-button>` inside a `<b2b-toggle-group>`.
- **Steps:**
  1. `b2b-toggle-group` listens for `b2b-change` events from slotted `b2b-toggle-button` children.
  2. On change: identifies the clicked button; sets all other buttons' `selected` state to false; sets clicked button to `selected=true`.
  3. Emits group-level `b2b-change` event with `ToggleButtonEventDetail { value }`.
- **Exit Point:** Single `b2b-toggle-button` is active; group emits selection value.
- **Impacted Areas:** `src/components/toggle-group/toggle-group.tsx`, `src/components/toggle-button/toggle-button.tsx`.

---

## FLOW 7: Multiselect Dropdown — Multi-Option Selection

- **Trigger:** User opens `<b2b-multiselect-dropdown>` and selects/deselects options.
- **Steps:**
  1. `optionsList` prop (string JSON or `Option[]`) parsed to array via `parsePropToArray`.
  2. `selectedValues` prop pre-selects initial values.
  3. On each option click: the option's `selected` state toggles; selected values rendered as chips in the input field (up to `maxOptionsVisible` chips, then "+N more").
  4. Optional "Select All" label selects/deselects all options atomically.
  5. `b2b-option-selected` event emits `MultiSelectOptionEventDetail { selected: boolean, selectedOption: string }`.
  6. Disabled when `disabled=true` or `groupDisabled=true` (parent input-group).
- **Exit Point:** `b2b-option-selected` event per toggle; visible chip count updates in UI.
- **Impacted Areas:** `src/components/multiselect-dropdown/multiselect-dropdown.tsx`, `src/utils/json-property-binding-util.ts`.
