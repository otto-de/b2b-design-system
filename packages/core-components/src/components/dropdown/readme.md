# b2b-dropdown



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                             | Type      | Default                 |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------- |
| `disabled`         | `disabled`          | Whether the select as a whole is disabled. Per default it is false.                                                     | `boolean` | `false`                 |
| `error`            | `error`             | An optional error message for the dropdown. This will only appear if invalid is set to true.                            | `string`  | `undefined`             |
| `hint`             | `hint`              | An optional hint text for the dropdown.                                                                                 | `string`  | `undefined`             |
| `invalid`          | `invalid`           | Whether the select is currently invalid. Per default it is false.                                                       | `boolean` | `false`                 |
| `label`            | `label`             | The dropdown label.                                                                                                     | `string`  | `undefined`             |
| `name`             | `name`              | The name of the select. This is used to associate the label to the dropdown element. It is important for accessibility. | `string`  | `undefined`             |
| `placeholder`      | `placeholder`       | Placeholder text for the dropdown.                                                                                      | `string`  | `'Select an option...'` |
| `placeholderValue` | `placeholder-value` | Value for the placeholder. Defaults to an empty string but can be customized.                                           | `string`  | `''`                    |
| `required`         | `required`          | Adds an asterisk at the end of the label to signify that the field is required.                                         | `boolean` | `false`                 |


## Events

| Event        | Description                                       | Type                      |
| ------------ | ------------------------------------------------- | ------------------------- |
| `b2b-blur`   | Emits whenever the dropdown loses focus.          | `CustomEvent<FocusEvent>` |
| `b2b-change` | Emits the option whenever a new option is chosen. | `CustomEvent<string>`     |
| `b2b-focus`  | Emits whenever the dropdown receives focus.       | `CustomEvent<FocusEvent>` |


## Methods

### `clearSelection() => Promise<void>`

Method to programmatically clear selection of the dropdown.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [b2b-input-label](../input-label)
- [b2b-icon-100](../icon-100)

### Graph
```mermaid
graph TD;
  b2b-dropdown --> b2b-input-label
  b2b-dropdown --> b2b-icon-100
  style b2b-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
