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
  /** Callback for left arrow click */
  @Prop() onLeftArrowClick: () => void;
  /** Callback for right arrow click*/
  @Prop() onRightArrowClick: () => void;

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

  render() {
    return (
      <Host>
        <div class="b2b-calendar-header">
          <button
            class="b2b-calendar-nav--left"
            onClick={this.onLeftArrowClick}
            onMouseOut={event => {
              (event.target as HTMLDivElement).blur();
            }}
            aria-label="previous month">
            <b2b-icon icon="b2b_icon-arrow-left" clickable={true}></b2b-icon>
          </button>
          <b2b-headline
            size={'100'}
            align={'center'}
            class="b2b-calendar-month"
            aria-live="polite">
            {this.months[this.selectedMonth]}
          </b2b-headline>
          <b2b-headline
            size={'100'}
            align={'center'}
            class="b2b-calendar-year"
            aria-live="polite">
            {this.selectedYear}
          </b2b-headline>
          <button
            class="b2b-calendar-nav--right"
            onClick={this.onRightArrowClick}
            onMouseOut={event => {
              (event.target as HTMLDivElement).blur();
            }}
            aria-label="next month">
            <b2b-icon icon="b2b_icon-arrow-right" clickable={true}></b2b-icon>
          </button>
        </div>
      </Host>
    );
  }
}
