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
  @Prop() setCurrentYear: (currentYear: number) => void;

  private months = [
    'Jan',
    'Feb',
    'Mär',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dez',
  ];

  private getPreviousMonth = () => {
    if (this.selectedMonth === 0) {
      this.setCurrentMonth(11);
      this.setCurrentYear(this.selectedYear - 1);
    } else {
      this.setCurrentMonth(this.selectedMonth - 1);
    }
  };
  private getNextMonth = () => {
    if (this.selectedMonth === 11) {
      this.setCurrentMonth(0);
      this.setCurrentYear(this.selectedYear + 1);
    } else {
      this.setCurrentMonth(this.selectedMonth + 1);
    }
  };

  render() {
    return (
      <Host>
        <div class="calendar-header">
          <button class="calendar-nav" onClick={this.getPreviousMonth}>
            <b2b-icon-100
              icon="b2b_icon-arrow-left"
              clickable={true}></b2b-icon-100>
          </button>
          <div class="calendar-month"> {this.months[this.selectedMonth]}</div>
          <div class="calendar-year"> {this.selectedYear}</div>
          <button class="calendar-nav" onClick={this.getNextMonth}>
            <b2b-icon-100
              icon="b2b_icon-arrow-right"
              clickable={true}></b2b-icon-100>
          </button>
        </div>
      </Host>
    );
  }
}
