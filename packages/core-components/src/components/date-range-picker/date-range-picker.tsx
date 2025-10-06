import type { ComponentInterface, EventEmitter } from '@stencil/core';
import {
  Component,
  Event,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import type {
  DateClear,
  DatePickerEventDetail,
  DatePickerViewChangedEventDetail,
  DateRangePickerEventDetail,
  MonthSelectedEventDetail,
  YearSelectedEventDetail,
} from '../../utils/interfaces/form.interface';
import { DatePickerView } from '../date-picker/date-picker.types';
import type {
  Dateish,
  DateRange,
  DateTuple,
  DatishRange,
} from './date-range-picker-utils';
import {
  dateAsNumber,
  isDateRangeEqual,
  splitDate,
  toDate,
  toDateRange,
  toDateRangeString,
} from './date-range-picker-utils';

@Component({
  tag: 'b2b-date-range-picker',
  styleUrl: 'date-range-picker.scss',
  shadow: true,
})
export class B2bDateRangePicker implements ComponentInterface {
  // #region Properties

  /**
   * Label for the date range picker component.
   *
   * @default 'Zeitraum auswählen'
   */
  @Prop() label: string = 'Zeitraum auswählen';

  /**
   * Adds an asterisk at the end of the label to signify that the field is required.
   *
   * @default false
   */
  @Prop() required: boolean = false;

  /**
   * The start and the end date of the selected date range.
   * Format: `TT.MM.YYYY`
   */
  @Prop() dateRange?: string | DatishRange;

  /**
   * Function used to determine, whether a date should be disabled e.g. because it is in the past.
   * This is only used for the start and end dates, it is valid to have a disabled date in the range of start and end date.
   *
   * @param date The date to check. Format: `TT.MM.YYYY`
   * @returns True, if the date should be disabled. False otherwise.
   *
   * @default (date) => false
   */
  @Prop() disableDates: (date: Date) => boolean = () => false;

  /**
   * A list of presets, that the user can click on to simplify time range selection.
   *
   * @default {}
   */
  @Prop() presets: Record<string, DateRange> = {};

  /**
   * Whether the input is currently invalid. If true, the input is rendered with error styles.
   *
   * @default false
   */
  @Prop() invalid: boolean = false;

  /**
   * The hint text that appears underneath the input field.
   */
  @Prop() hint?: string;

  /**
   * The error message that is shown if the input is invalid.
   */
  @Prop() error?: string;

  /**
   * The language for month and the weekdays will be decided based on the given input.
   * One of `'de'` (German) or `'English'`.
   *
   * @default 'de'
   */
  @Prop() language: 'de' | 'en' = 'de';

  // #endregion
  // #region Events

  /**
   * Emits the selected date range as tuple type.
   */
  @Event({ eventName: 'b2b-selected' })
  b2bSelected: EventEmitter<DateRangePickerEventDetail>;

  /**
   * Emits when the user clicks the clear button.
   */
  @Event({ eventName: 'b2b-clear' })
  b2bClear: EventEmitter<DateClear>;

  // #endregion
  // #region State

  @State() private open: boolean = false;
  @State() private tempDate: DateTuple | undefined = undefined;
  @State() private internalDateRange?: DateRange;
  @State() private highlightDateRange?: DateRange;
  @State() private viewMode: DatePickerView = DatePickerView.Days;
  @State() private viewedYear: number;
  @State() private viewedMonth: number; // 1-based
  @State() private viewedDay: number; // 1-based

  @Watch('dateRange')
  updateDateRange(value: DateRange | undefined): void {
    this.internalDateRange = toDateRange(value);
    this.resetViewedDate();
  }

  // #endregion
  // #region Logic

  @Listen('b2b-date-picker-view-changed')
  handleDatePickerViewChanged(
    event: CustomEvent<DatePickerViewChangedEventDetail>,
  ): void {
    this.viewMode = event.detail.value;
  }

  @Listen('b2b-date-picker-previous-month')
  previousMonth(): void {
    if (this.viewedMonth === 0) {
      this.viewedMonth = 11;
      this.viewedYear -= 1;
    } else {
      this.viewedMonth -= 1;
    }
  }

  @Listen('b2b-date-picker-next-month')
  nextMonth(): void {
    if (this.viewedMonth === 11) {
      this.viewedMonth = 0;
      this.viewedYear += 1;
    } else {
      this.viewedMonth += 1;
    }
  }

  @Listen('b2b-date-picker-month-selected')
  handleMonthSelected(event: CustomEvent<MonthSelectedEventDetail>): void {
    this.viewedMonth = event.detail.value + 1;
    this.viewMode = DatePickerView.Days;
  }

  @Listen('b2b-date-picker-year-selected')
  handleYearSelected(event: CustomEvent<YearSelectedEventDetail>): void {
    this.viewedYear = event.detail.value;
    this.viewMode = DatePickerView.Days;
  }

  @Listen('b2b-date-picker-escape')
  handleEscapePress(): void {
    this.toggleOpen(false);
  }

  @Listen('b2b-date-selected')
  handleDateSelected(event: CustomEvent<DatePickerEventDetail>): void {
    event.preventDefault();
    this.selectDate(event.detail.selectedDate);
  }

  private selectDate(selected: Dateish): void {
    if (this.tempDate == null) {
      this.tempDate = splitDate(selected);
    } else if (dateAsNumber(selected) >= dateAsNumber(this.tempDate)) {
      this.setDate([toDate(this.tempDate), toDate(selected)]);
    } else {
      this.setDate([toDate(selected), toDate(this.tempDate)]);
    }
  }

  private setDate(selected: DateRange | undefined): void {
    this.internalDateRange = selected;
    this.toggleOpen(false);
    if (selected == null) {
      this.b2bClear.emit();
    } else {
      this.b2bSelected.emit({ selected });
    }
  }

  private toggleOpen(open: boolean = !this.open): void {
    this.open = open;
    if (!open) {
      this.tempDate = undefined;
      this.resetViewedDate();
    }
  }

  private resetViewedDate(): void {
    const startDate = this.internalDateRange?.[0];
    if (startDate == null) {
      const now = new Date();
      this.viewedYear = now.getFullYear();
      this.viewedMonth = now.getMonth() + 1;
      this.viewedDay = now.getDate();
    } else {
      const [year, month, day] = splitDate(startDate);
      this.viewedYear = year;
      this.viewedMonth = month;
      this.viewedDay = day;
    }
    this.viewMode = DatePickerView.Days;
  }

  // #endregion
  // #region Component-Hooks

  componentWillLoad() {
    this.internalDateRange = toDateRange(this.dateRange);
    this.resetViewedDate();
  }

  render() {
    return (
      <Host>
        <div class="b2b-date-range-picker">
          <b2b-input-label required={this.required}>
            {this.label}
          </b2b-input-label>
          <div
            class={{
              'b2b-date-range-picker-input-wrapper': true,
              'b2b-date-range-picker-input-wrapper--error': this.invalid,
            }}
            onClick={() => this.toggleOpen()}>
            <b2b-paragraph margin={false}>
              {toDateRangeString(this.internalDateRange, '')}
            </b2b-paragraph>
            <div class="b2b-icons">
              {this.internalDateRange && (
                <div
                  tabIndex={0}
                  onClick={() => this.setDate(undefined)}
                  onKeyDown={(event: KeyboardEvent) => {
                    if (event.key === 'Enter') {
                      this.setDate(undefined);
                    }
                  }}>
                  <b2b-icon-100
                    icon="b2b_icon-close"
                    aria-label="clear input"
                    clickable={true}
                  />
                </div>
              )}

              <div
                tabindex={0}
                onClick={() => this.toggleOpen()}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    this.toggleOpen();
                  }
                }}
                class="b2b-event-icon">
                <b2b-icon-100
                  aria-label={
                    this.open ? 'close date picker' : 'open date picker'
                  }
                  icon="b2b_icon-event"
                  clickable={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class={{
            'b2b-date-range-picker-body': true,
            'b2b-date-range-picker-body--hidden': !this.open,
          }}>
          <div class="b2b-date-range-picker-body--calendar">
            {this.viewMode === DatePickerView.Days && (
              <div>
                <b2b-date-picker-header
                  language={this.language}
                  selectedMonth={this.viewedMonth - 1}
                  selectedYear={this.viewedYear}
                />
                <b2b-date-picker-days-header language={this.language} />
                <b2b-date-range-picker-days
                  viewedDate={
                    [this.viewedYear, this.viewedMonth, this.viewedDay] as const
                  }
                  firstDate={
                    this.highlightDateRange?.[0] ??
                    this.tempDate ??
                    this.internalDateRange?.[0]
                  }
                  secondDate={
                    this.highlightDateRange?.[1] ??
                    (this.tempDate == null
                      ? this.internalDateRange?.[1]
                      : undefined)
                  }
                  disableDates={day =>
                    this.disableDates(
                      toDate([this.viewedYear, this.viewedMonth, day]),
                    )
                  }
                  preview={this.highlightDateRange != null}
                />
              </div>
            )}
            {this.viewMode === DatePickerView.Months && (
              <b2b-date-picker-months
                language={this.language}
                selectedMonth={this.viewedMonth - 1}
              />
            )}
            {this.viewMode === DatePickerView.Years && (
              <b2b-date-picker-years selectedYear={this.viewedYear} />
            )}
          </div>
          {Object.keys(this.presets).length > 0 && (
            <div class="b2b-date-range-picker-body--presets">
              {Object.entries(this.presets).map(([text, value]) => (
                <b2b-paragraph
                  class={{
                    'b2b-date-range-picker-body--presets--selected':
                      isDateRangeEqual(this.internalDateRange, value),
                  }}
                  margin={false}
                  onClick={() => this.setDate(value)}
                  onMouseOver={() => (this.highlightDateRange = value)}
                  onMouseOut={() => (this.highlightDateRange = undefined)}>
                  {text}
                </b2b-paragraph>
              ))}
            </div>
          )}
        </div>
        {this.open && (
          <div
            class="b2b-date-range-picker--backdrop"
            onClick={() => this.toggleOpen(false)}></div>
        )}
        {(this.error != null || this.hint != null) && (
          <span
            class={{
              'b2b-date-range-picker-hint': true,
              'b2b-date-range-picker-hint--error': this.invalid,
            }}>
            {this.invalid ? this.error : this.hint}
          </span>
        )}
      </Host>
    );
  }

  // #endregion
}
