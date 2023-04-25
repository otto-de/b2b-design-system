# b2b-toggle-button



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute  | Description                                                                                                                                                  | Type      | Default     |
| -------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `checked`            | `checked`  | Whether or not the toggle button is currently checked. Per default it is false.                                                                              | `boolean` | `false`     |
| `disabled`           | `disabled` | Whether or not the toggle button is currently disabled. Per default it is false.                                                                             | `boolean` | `false`     |
| `label` _(required)_ | `label`    | The label of the toggle button. This is required                                                                                                             | `string`  | `undefined` |
| `name` _(required)_  | `name`     | The name of the toggle button. Use it to group toggle buttons together and assign the label to the input element for better accessibility. This is required. | `string`  | `undefined` |
| `value` _(required)_ | `value`    | The value of the toggle button. This will be emitted when the toggle button is clicked. This is required                                                     | `string`  | `undefined` |


## Events

| Event        | Description                                    | Type                                        |
| ------------ | ---------------------------------------------- | ------------------------------------------- |
| `b2b-change` | Emitted whenever the toggle button is clicked. | `CustomEvent<ToggleButtonEventDetail<any>>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
