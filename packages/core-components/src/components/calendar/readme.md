# b2b-calendar



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description | Type      | Default |
| -------------------- | ---------------------- | ----------- | --------- | ------- |
| `disableFutureDates` | `disable-future-dates` |             | `boolean` | `false` |
| `disablePastDates`   | `disable-past-dates`   |             | `boolean` | `true`  |
| `disableWeekends`    | `disable-weekends`     |             | `boolean` | `false` |


## Events

| Event          | Description | Type                                    |
| -------------- | ----------- | --------------------------------------- |
| `b2b-selected` |             | `CustomEvent<CalendarEventDetail<any>>` |


## Dependencies

### Used by

 - [b2b-calendar](.)

### Depends on

- [b2b-calendar-header](.)

### Graph
```mermaid
graph TD;
  b2b-datepicker --> b2b-calendar-header
  b2b-calendar-header --> b2b-icon-100
  b2b-calendar --> b2b-datepicker
  style b2b-datepicker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
