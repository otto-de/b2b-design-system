import {
  Component,
  Prop,
  h,
  Host,
  Element,
  Event,
  EventEmitter,
} from '@stencil/core';
import {
  DatePickerView,
  MonthsGerman,
  MonthsEnglish,
} from './date-picker.types';
import {
  DatePickerViewChangedEventDetail,
  NextMonth,
  PreviousMonth,
} from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-date-picker-header',
  styleUrl: 'date-picker-header.scss',
  shadow: true,
})
export class B2bDatePickerHeader {
  @Element() host: HTMLB2bDatePickerHeaderElement;
  /** Internal selected month */
  @Prop() selectedMonth: number;
  /** Internal selected year */
  @Prop() selectedYear: number;
  /** Event emitted for previous month click**/
  @Event({ eventName: 'b2b-date-picker-previous-month' })
  b2bDatePickerPreviousMonth: EventEmitter<PreviousMonth>;
  /** Event emitted for next month click**/
  @Event({ eventName: 'b2b-date-picker-next-month' })
  b2bDatePickerNextMonth: EventEmitter<NextMonth>;
  /** Event emitted for changing the date picker view **/
  @Event({ eventName: 'b2b-date-picker-view-changed' })
  b2bDatePickerViewChanged: EventEmitter<DatePickerViewChangedEventDetail>;
  /** The language for month and the weekdays will be decided based on the given input. By default, this will be de which is german */
  @Prop() language: 'de' | 'en' = 'de';
  render() {
    const Months = this.language === 'en' ? MonthsEnglish : MonthsGerman;
    return (
      <Host>
        <div class="b2b-date-picker-header">
          <button
            class="b2b-date-picker-nav--left"
            onClick={this.b2bDatePickerPreviousMonth.emit}
            onMouseOut={event => {
              (event.target as HTMLDivElement).blur();
            }}
            aria-label="previous month">
            <b2b-icon-100
              icon="b2b_icon-arrow-left"
              clickable={true}></b2b-icon-100>
          </button>
          <b2b-headline
            size={'100'}
            align={'center'}
            class="b2b-date-picker-month"
            aria-label="select month"
            tabindex={0}
            onClick={() => {
              this.b2bDatePickerViewChanged.emit({
                value: DatePickerView.Months,
              });
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                this.b2bDatePickerViewChanged.emit({
                  value: DatePickerView.Months,
                });
              }
            }}>
            {Months[this.selectedMonth]}
          </b2b-headline>
          <b2b-headline
            size={'100'}
            align={'center'}
            class="b2b-date-picker-year"
            aria-label="select year"
            tabindex={0}
            onClick={() => {
              this.b2bDatePickerViewChanged.emit({
                value: DatePickerView.Years,
              });
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                this.b2bDatePickerViewChanged.emit({
                  value: DatePickerView.Years,
                });
              }
            }}>
            {this.selectedYear}
          </b2b-headline>
          <button
            class="b2b-date-picker-nav--right"
            onClick={this.b2bDatePickerNextMonth.emit}
            onMouseOut={event => {
              (event.target as HTMLDivElement).blur();
            }}
            aria-label="next month">
            <b2b-icon-100
              icon="b2b_icon-arrow-right"
              clickable={true}></b2b-icon-100>
          </button>
        </div>
      </Host>
    );
  }
}
