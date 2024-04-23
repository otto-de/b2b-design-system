import { Component, Prop, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'b2b-calendar-header',
  styleUrl: 'calendar-header.scss',
  shadow: true,
})
export class B2bCalendarHeader {
  @Element() host: HTMLB2bCalendarHeaderElement;
  /** Internal selected month */
  @Prop() selectedMonth: number;
  /** Internal selected year */
  @Prop() selectedYear: number;
  /** Internal method to set the current month selected */
  @Prop() setCurrentMonth: (currentMonth: number) => void;
  /** Internal method to set the current year selected */
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
        <div class="b2b-calendar-header">
          <button
            class="b2b-calendar-nav"
            onClick={this.getPreviousMonth}
            aria-label="previous month">
            <b2b-icon icon="b2b_icon-arrow-left" clickable={true}></b2b-icon>
          </button>
          <b2b-headline
            size={'100'}
            align={'center'}
            class="b2b-calendar-month"
            aria-live="polite">
            {' '}
            {this.months[this.selectedMonth]}
          </b2b-headline>
          <b2b-headline
            size={'100'}
            align={'center'}
            class="b2b-calendar-year"
            aria-live="polite">
            {' '}
            {this.selectedYear}
          </b2b-headline>
          <button
            class="b2b-calendar-nav"
            onClick={this.getNextMonth}
            aria-label="next month">
            <b2b-icon icon="b2b_icon-arrow-right" clickable={true}></b2b-icon>
          </button>
        </div>
      </Host>
    );
  }
}
