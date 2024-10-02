import {
  Component,
  Prop,
  h,
  Host,
  Element,
  Event,
  EventEmitter,
} from '@stencil/core';
import { Months } from './calendar.types';
import {
  NextMonth,
  PreviousMonth,
  SelectMonth,
  SelectYear,
} from '../../utils/interfaces/interaction.interface';

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
  /** Event emitted for previous month click**/
  @Event({ eventName: 'b2b-calendar-previous-month' })
  b2bCalendarPreviousMonth: EventEmitter<PreviousMonth>;
  /** Event emitted for next month click**/
  @Event({ eventName: 'b2b-calendar-next-month' })
  b2bCalendarNextMonth: EventEmitter<NextMonth>;
  /** Event emitted for months view click**/
  @Event({ eventName: 'b2b-calendar-select-month' })
  b2bCalendarSelectMonth: EventEmitter<SelectMonth>;
  /** Event emitted for years view click**/
  @Event({ eventName: 'b2b-calendar-select-year' })
  b2bCalendarSelectYear: EventEmitter<SelectYear>;
  render() {
    return (
      <Host>
        <div class="b2b-calendar-header">
          <button
            class="b2b-calendar-nav--left"
            onClick={this.b2bCalendarPreviousMonth.emit}
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
            aria-live="polite"
            onClick={() => {
              this.b2bCalendarSelectMonth.emit();
            }}>
            {Months[this.selectedMonth]}
          </b2b-headline>
          <b2b-headline
            size={'100'}
            align={'center'}
            class="b2b-calendar-year"
            aria-live="polite"
            onClick={() => {
              this.b2bCalendarSelectYear.emit();
            }}>
            {this.selectedYear}
          </b2b-headline>
          <button
            class="b2b-calendar-nav--right"
            onClick={this.b2bCalendarNextMonth.emit}
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
