# b2b-table-rowgroup



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                                                                                                                                 | Type                             | Default                     |
| ------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | --------------------------- |
| `accordion`  | `accordion`  | Renders the rowgroup as an accordion. Both header and body must have accordion set to true. One table can contain multiple rowgroups of type body, each of which represents an accordion row with children. | `boolean`                        | `false`                     |
| `fixed`      | `fixed`      | Sets the header rowgroup position to sticky. Use this in a scrollable container.                                                                                                                            | `boolean`                        | `false`                     |
| `opened`     | `opened`     | Only use when accordion property is true. Will render the accordion opened if set to true. By default, is false.                                                                                            | `boolean`                        | `false`                     |
| `selectable` | `selectable` | If the rows in the rowgroup can be selected via checkmark. Per default, it is false.                                                                                                                        | `boolean`                        | `false`                     |
| `type`       | `type`       | Rowgroup allows grouping rows by context: header, body or footer. Header rows are by default not highlightable on mouse over.                                                                               | `"body" \| "footer" \| "header"` | `TableRowgroupTypes.HEADER` |


## Events

| Event                | Description                                     | Type                                             |
| -------------------- | ----------------------------------------------- | ------------------------------------------------ |
| `b2b-group-selected` | Emits when the rowgroup as a whole is selected. | `CustomEvent<TableAccordionSelectedEventDetail>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
