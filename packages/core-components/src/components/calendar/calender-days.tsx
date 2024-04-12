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
  @Prop() disablePastDates: boolean = false;
  @Prop() disableFutureDates: boolean = false;
  @Prop() disableWeekends: boolean = false;
  @State() disabled: boolean = false;
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
          }}
          onClick={() => {
            this.setCurrentDay(i);
          }}>
          {i}
        </div>,
      );
    }

    return days;
  };

  render() {
    return (
      <Host>
        <div class="b2b-calender-days-grid">{this.renderCalenderDays()}</div>
      </Host>
    );
  }
}
