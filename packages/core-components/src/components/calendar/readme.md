# b2b-calendar



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description | Type                    | Default     |
| -------------------- | ---------------------- | ----------- | ----------------------- | ----------- |
| `disableFutureDates` | `disable-future-dates` |             | `boolean`               | `false`     |
| `disablePastDates`   | `disable-past-dates`   |             | `boolean`               | `false`     |
| `disableWeekends`    | `disable-weekends`     |             | `boolean`               | `false`     |
| `selectedDay`        | `selected-day`         |             | `number`                | `undefined` |
| `selectedMonth`      | `selected-month`       |             | `number`                | `undefined` |
| `selectedYear`       | `selected-year`        |             | `number`                | `undefined` |
| `setCurrentDay`      | --                     |             | `(day: number) => void` | `undefined` |


## Events

| Event                 | Description | Type                              |
| --------------------- | ----------- | --------------------------------- |
| `b2b-calender-escape` |             | `CustomEvent<EscapePressed<any>>` |


## Dependencies

### Used by

 - [b2b-calendar](.)

### Graph
```mermaid
graph TD;
  b2b-calendar --> b2b-calender-days
  style b2b-calender-days fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
