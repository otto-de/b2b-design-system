import { Component, h, Host, Element, Prop } from '@stencil/core';

@Component({
  tag: 'b2b-calender-days',
  styleUrl: 'calender-days.scss',
  shadow: true,
})
export class B2bCalenderDays {
  @Element() host: HTMLB2bCalenderDaysElement;
  @Prop() selectedMonth: number;
  @Prop() selectedYear: number;
  @Prop() setCurrentDate: (date: number) => void;

  private renderCalenderDays = () => {
    let daysInMonth = new Date(
      this.selectedYear,
      this.selectedMonth + 1,
      0,
    ).getDate(); // Get total days in the current month
    let firstDayOfMonth = new Date(
      this.selectedYear,
      this.selectedMonth,
      1,
    ).getDay(); // Get the day of the week (0-6) of the first day of the month
    let days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div></div>);
    }

    // Populate days array with day numbers
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div class="b2b-calender-day" onClick={() => this.setCurrentDate(i)}>
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
