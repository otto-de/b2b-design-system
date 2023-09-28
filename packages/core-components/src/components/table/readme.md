# b2b-table



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                                                                                                      | Type                  | Default             |
| -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------- |
| `resize` | `resize`  | Whether or not the column the header is associated with can be resized by dragging. Per default it is false.                                                                                                     | `boolean`             | `false`             |
| `size`   | `size`    | The size of the table. Both will expand to 100% of parent size. Expand cells will use as much space as content needs and text will wrap. Equal will keep all column sizes proportional to the number of columns. | `"equal" \| "expand"` | `TableSizes.EXPAND` |


## Events

| Event             | Description                                                           | Type                                       |
| ----------------- | --------------------------------------------------------------------- | ------------------------------------------ |
| `b2b-sort-change` | Emits whenever the sort direction of any column in the table changes. | `CustomEvent<ColumnSortChangeEventDetail>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
