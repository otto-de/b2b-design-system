# b2b-table



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                                                                                                                                                                                                                                                      | Type                               | Default             |
| -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------- |
| `size`   | `size`    | The size of the table. Both will expand to 100% of parent size. Expand cells will use as much space as content needs and text will wrap. Equal will keep all column sizes proportional to the number of columns. Colspan behaves same as equal, but allows you to set a colspan attribute on individual columns or cells to make them span more than one column. | `"colspan" \| "equal" \| "expand"` | `TableSizes.EXPAND` |


## Events

| Event             | Description                                                           | Type                                       |
| ----------------- | --------------------------------------------------------------------- | ------------------------------------------ |
| `b2b-sort-change` | Emits whenever the sort direction of any column in the table changes. | `CustomEvent<ColumnSortChangeEventDetail>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
