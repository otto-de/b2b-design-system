# b2b-toggle-switch



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute        | Description                                                                      | Type                | Default     |
| -------------------- | ---------------- | -------------------------------------------------------------------------------- | ------------------- | ----------- |
| `disabled`           | `disabled`       | Whether or not the toggle button is currently disabled. Per default it is false. | `boolean`           | `false`     |
| `label` _(required)_ | `label`          | The label of the toggle button. This is required                                 | `string`            | `undefined` |
| `labelPosition`      | `label-position` | The alignment of the toggle switch label.                                        | `"left" \| "right"` | `'left'`    |
| `state`              | `state`          | Whether or not the toggle button is currently on or off. Per default it is off.  | `boolean`           | `false`     |


## Events

| Event        | Description                                            | Type                                            |
| ------------ | ------------------------------------------------------ | ----------------------------------------------- |
| `b2b-change` | Emits the toggle switch value when it's state changes. | `CustomEvent<ToggleSwitchEventDetail<boolean>>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
