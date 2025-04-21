# b2b-multiselect-dropdown



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                                                                                 | Type                 | Default     |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `disabled`           | `disabled`            | Whether or not the field is disabled. Default is false.                                                                                     | `boolean`            | `false`     |
| `errorMessage`       | `error-message`       | The error message that is shown if the multi select dropdown is invalid.                                                                    | `string`             | `undefined` |
| `hint`               | `hint`                | The hint text that appears underneath the multi select dropdown field.                                                                      | `string`             | `undefined` |
| `invalid`            | `invalid`             | Whether the multi select dropdown is currently invalid. Per default, it is false.                                                           | `boolean`            | `false`     |
| `label` _(required)_ | `label`               | The input label.                                                                                                                            | `string`             | `undefined` |
| `maxOptionsVisible`  | `max-options-visible` | The maximum amount of chips visible. Adjust this depending on available size of the dropdown.                                               | `number`             | `8`         |
| `optionsList`        | `options-list`        | The list of options passed into the search dropdown. Can be static or dynamic, i.e. updated when the b2b-search or b2b-input emitters fire. | `string \| string[]` | `[]`        |
| `placeholder`        | `placeholder`         | The placeholder shown in the input field.                                                                                                   | `string`             | `undefined` |
| `required`           | `required`            | Adds an asterisk at the end of the label to signify that the field is required.                                                             | `boolean`            | `false`     |
| `searchPlaceholder`  | `search-placeholder`  | The placeholder shown in the search bar.                                                                                                    | `string`             | `undefined` |
| `selectAllLabel`     | `select-all-label`    | The string displayed as the select all label.                                                                                               | `string`             | `undefined` |
| `selectedValues`     | `selected-values`     | The initial values to be selected in the dropdown.                                                                                          | `string \| string[]` | `[]`        |


## Events

| Event          | Description                                                    | Type                    |
| -------------- | -------------------------------------------------------------- | ----------------------- |
| `b2b-selected` | Emits when there is a change to the currently selected values. | `CustomEvent<string[]>` |


## Dependencies

### Depends on

- [b2b-chip-component](../chip)
- [b2b-input-label](../input-label)
- [b2b-icon-100](../icon-100)
- [b2b-multiselect-option](multiselect-option)

### Graph
```mermaid
graph TD;
  b2b-multiselect-dropdown --> b2b-chip-component
  b2b-multiselect-dropdown --> b2b-input-label
  b2b-multiselect-dropdown --> b2b-icon-100
  b2b-multiselect-dropdown --> b2b-multiselect-option
  b2b-multiselect-option --> b2b-checkbox
  b2b-checkbox --> b2b-input-label
  style b2b-multiselect-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
