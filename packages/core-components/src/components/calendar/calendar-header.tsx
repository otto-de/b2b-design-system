import { Component, Prop, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'b2b-calendar-header',
  styleUrl: 'calendar-header.scss',
  shadow: true,
})
export class B2bCalendarHeader {
  @Element() host: HTMLB2bCalendarHeaderElement;

  @Prop() selectedMonth: number;
  @Prop() selectedYear: number;
  @Prop() setCurrentMonth: (currentMonth: number) => void;

  private months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  private getPreviousMonth = () => {
    if (this.selectedMonth === 0) this.selectedMonth = 12;
    this.selectedMonth = this.selectedMonth - 1;
    this.setCurrentMonth(this.selectedMonth);
  };
  private getNextMonth = () => {
    if (this.selectedMonth === 11) this.selectedMonth = -1;
    this.selectedMonth = this.selectedMonth + 1;
    this.setCurrentMonth(this.selectedMonth);
  };

  render() {
    return (
      <Host>
        <div class="calendar-header">
          <b2b-button onClick={this.getPreviousMonth}>
            <b2b-icon-100 icon="b2b_icon-arrow-left" clickable></b2b-icon-100>
          </b2b-button>
          <div class="calendar-month"> {this.months[this.selectedMonth]}</div>
          <div class="calendar-year"> {this.selectedYear}</div>
          <b2b-button onClick={this.getNextMonth}>
            <b2b-icon-100 icon="b2b_icon-arrow-right" clickable></b2b-icon-100>
          </b2b-button>
        </div>
      </Host>
    );
  }
}
