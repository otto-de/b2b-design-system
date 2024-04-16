import { Component, h, Host, Element, Prop, State } from '@stencil/core';

@Component({
  tag: 'b2b-calender-days',
  styleUrl: 'calender-days.scss',
  shadow: true,
})
export class B2bCalenderDays {
  @Element() host: HTMLB2bCalenderDaysElement;
  @Prop() selectedMonth: number;
  @Prop() selectedYear: number;
  @Prop() selectedDay: number;
  @Prop() setCurrentDay: (day: number) => void;
  @Prop() setShowDatePicker: (show: boolean) => void;
  @Prop() showDatePicker: boolean;
  @Prop() disablePastDates: boolean = false;
  @Prop() disableFutureDates: boolean = false;
  @Prop() disableWeekends: boolean = false;
  @State() disabled: boolean = false;
  @State() focusDay: number;

  private today = new Date();
  private todayWithoutTime = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate(),
  );

  private isDisabledDate = (givenDate: Date) => {
    if (this.disablePastDates) {
      if (givenDate < this.todayWithoutTime) return true;
    } else if (this.disableFutureDates) {
      if (givenDate > this.todayWithoutTime) return true;
    } else if (this.disableWeekends) {
      if (givenDate.getDay() == 0 || givenDate.getDay() == 6) return true;
    } else {
      return false;
    }
  };
  private handleKeydown = (day: number, event: KeyboardEvent) => {
    event.preventDefault();
    switch (event.key) {
      case 'Esc':
      case 'Escape':
        this.setShowDatePicker(false);
        break;
      case 'Enter':
        this.setCurrentDay(day);
        break;

      case 'Right':
      case 'ArrowRight':
        this.focusDay = day + 1;
        break;

      case 'Left':
      case 'ArrowLeft':
        this.focusDay = day - 1;
        break;

      case 'Down':
      case 'ArrowDown':
        this.focusDay = day + 7;
        break;

      case 'Up':
      case 'ArrowUp':
        this.focusDay = day - 7;
        break;

      default:
        return;
    }
  };

  private renderCalenderDays = () => {
    let daysInMonth = new Date(
      this.selectedYear,
      this.selectedMonth + 1,
      0,
    ).getDate(); // Get total days in the current month
    let actualFirstDayOfMonth = new Date(
      this.selectedYear,
      this.selectedMonth,
      1,
    ).getDay(); // Get the day of the week (0-6) of the first day of the month

    let firstDayOfMonth =
      actualFirstDayOfMonth == 0 ? 6 : actualFirstDayOfMonth - 1;
    let days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div></div>);
    }
    // Populate days array with day numbers
    for (let i = 1; i <= daysInMonth; i++) {
      let givenDate = new Date(this.selectedYear, this.selectedMonth, i);
      this.focusDay =
        this.focusDay === undefined ? this.selectedDay : this.focusDay;

      let focusDate = new Date(
        this.selectedYear,
        this.selectedMonth,
        this.focusDay,
      );
      let disabled = this.isDisabledDate(givenDate);
      days.push(
        <div
          class={{
            'b2b-calender-day': true,
            'b2b-calender-day--disabled': disabled,
            'b2b-calender-day--today':
              givenDate.toDateString() === this.todayWithoutTime.toDateString(),
            'b2b-calender-day--selected':
              new Date(
                this.selectedYear,
                this.selectedMonth,
                this.selectedDay,
              ).toDateString() === givenDate.toDateString(),
            'b2b-calender-day--focussed':
              givenDate.toDateString() === focusDate.toDateString() &&
              !disabled &&
              !(
                new Date(
                  this.selectedYear,
                  this.selectedMonth,
                  this.selectedDay,
                ).toDateString() === givenDate.toDateString()
              ),
          }}
          tabindex={
            givenDate.toDateString() === focusDate.toDateString() ? 0 : -1
          }
          // aria-selected={givenDate.toDateString() === focusDate.toDateString()}
          onClick={() => {
            this.setCurrentDay(i);
          }}
          onKeyDown={event => {
            this.handleKeydown(this.focusDay, event);
          }}
          role="cell"
          aria-label={i}>
          {i}
        </div>,
      );
    }

    return days;
  };

  render() {
    return (
      <Host>
        <div class="b2b-calender-days-grid" role="row">
          {this.renderCalenderDays()}
        </div>
      </Host>
    );
  }
}
