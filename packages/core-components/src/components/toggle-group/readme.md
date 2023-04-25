# b2b-toggle-group



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute  | Description                                                                           | Type      | Default     |
| ------------------- | ---------- | ------------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled`          | `disabled` | Whether or not the toggle group is disabled as a whole. Per default it is false.      | `boolean` | `false`     |
| `name` _(required)_ | `name`     | The toggle group name used to group them together programmatically. This is required. | `string`  | `undefined` |


## Events

| Event              | Description                                                                                                           | Type                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `b2b-group-change` | Emitted whenever a toggle button in the group is clicked. Will emit the value of the currently selected radio button. | `CustomEvent<ToggleButtonEventDetail<any>>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
