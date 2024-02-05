# b2b-toggle-chip



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute  | Description                                                                                                                                                | Type                | Default     |
| -------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `active`             | `active`   | Whether or not the chip is currently active. Per default, it is false.                                                                                     | `boolean`           | `false`     |
| `disabled`           | `disabled` | Whether or not the chip is currently disabled. Per default it is false.                                                                                    | `boolean`           | `false`     |
| `label` _(required)_ | `label`    | The chip's label. This is required.                                                                                                                        | `string`            | `undefined` |
| `name` _(required)_  | `name`     | The name of the toggle chip. Use it to group toggle buttons together and assign the label to the input element for better accessibility. This is required. | `string`            | `undefined` |
| `value` _(required)_ | `value`    | The value associated with the toggle chip. This is emitted when the chip is interacted with.                                                               | `any`               | `undefined` |
| `variant`            | `variant`  | The color scheme of the toggle button. Use white for grey backgrounds and grey for white backgrounds. Per default, it is grey                              | `"grey" \| "white"` | `'grey'`    |


## Events

| Event          | Description                                           | Type                                         |
| -------------- | ----------------------------------------------------- | -------------------------------------------- |
| `b2b-selected` | Emits the value whenever the toggle chip is selected. | `CustomEvent<ToggleChipEventDetail<string>>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
