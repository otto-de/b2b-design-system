# b2b-calendar



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description             | Type     | Default     |
| --------------- | ---------------- | ----------------------- | -------- | ----------- |
| `selectedMonth` | `selected-month` | Internal selected month | `number` | `undefined` |
| `selectedYear`  | `selected-year`  | Internal selected year  | `number` | `undefined` |


## Events

| Event                         | Description                             | Type                              |
| ----------------------------- | --------------------------------------- | --------------------------------- |
| `b2b-calendar-next-month`     | Event emitted for next month click*     | `CustomEvent<NextMonth<any>>`     |
| `b2b-calendar-previous-month` | Event emitted for previous month click* | `CustomEvent<PreviousMonth<any>>` |


## Dependencies

### Used by

 - [b2b-calendar](.)

### Depends on

- [b2b-icon](../icon)
- [b2b-headline](../headline)

### Graph
```mermaid
graph TD;
  b2b-calendar-header --> b2b-icon
  b2b-calendar-header --> b2b-headline
  b2b-calendar --> b2b-calendar-header
  style b2b-calendar-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
