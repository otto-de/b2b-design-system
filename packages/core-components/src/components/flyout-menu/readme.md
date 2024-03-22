# b2b-flyout-menu-option



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute   | Description                                                                                                  | Type      | Default     |
| --------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `disabled`            | `disabled`  | Whether the option is disabled. Per default it is false. If disabled is true, the option cannot be selected. | `boolean` | `false`     |
| `option` _(required)_ | `option`    | The option name.                                                                                             | `string`  | `undefined` |
| `separator`           | `separator` | Whether the option has a separator at the bottom. Per default it is false.                                   | `boolean` | `false`     |


## Events

| Event                 | Description                                                  | Type                                          |
| --------------------- | ------------------------------------------------------------ | --------------------------------------------- |
| `b2b-option-selected` | Emits the option as a string whenever an option is selected. | `CustomEvent<OptionSelectedEventDetail<any>>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
