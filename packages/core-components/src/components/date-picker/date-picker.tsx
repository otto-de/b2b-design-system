import type { ComponentInterface, EventEmitter } from '@stencil/core';
import {
  Component,
  Element,
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
  MonthSelectedEventDetail,
  YearSelectedEventDetail,
} from '../../utils/interfaces/form.interface';
import { DatePickerView } from './date-picker.types';
import { DateUtils } from '../../utils/datepicker/date-picker-util';
import { parsePropToArray } from '../../utils/json-property-binding-util';

@Component({
  tag: 'b2b-date-picker',
  styleUrl: 'date-picker.scss',
  shadow: true,
})
export class B2bDatePicker implements ComponentInterface {
  @Element() host: HTMLB2bDatePickerElement;

  /** Whether the date picker is disabled. By default, this is false. */
  @Prop() disabled: boolean = false;

  /** Whether the previous dates from the current date are disabled. By default, this is true. */
  @Prop() disablePastDates: boolean;

  /** Whether the dates after the current date are disabled. By default, this is false. */
  @Prop() disableFutureDates: boolean;

  /** Whether the dates that fall on the weekend are disabled. By default, this is false. */
  @Prop() disableWeekends: boolean;

  /** The dates that are part of this array are disabled. By default, this is an empty array. */
  @Prop() disableDates: string | string[] = [];

  /** Label for the date picker component. */
  @Prop() label: string = 'Zeitpunkt auswählen';

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop({ reflect: true }) required: boolean = false;

  /** Default date picker date*/
  @Prop() preSelectedDate: string = undefined;

  /** Whether to show hint message or not. */
  @Prop() showHint: boolean = true;

  /** The width of the input field of the date picker in pixel. Minimum is 250, maximum is 600px. */
  @Prop() width: number = 300;

  /** Disable the days of the week specified here. */
  @Prop() disableDays:
    | 'Mo'
    | 'Di'
    | 'Mi'
    | 'Do'
    | 'Fr'
    | 'Sa'
    | 'So'
    | 'Tu'
    | 'We'
    | 'Th'
    | 'Su'
    | string
    | string[] = [];

  /** All the dates until the given specified date will be disabled. */
  @Prop() disableDatesUntil: string;

  /** All the dates until the given specified date will be disabled. */
  @Prop() disableDatesFrom: string;

  /** Hint text that should be displayed when showHint is true */
  @Prop() hint: string = 'Format: TT.MM.JJJJ';

  /** The placeholder shown in the date picker. */
  @Prop({ reflect: true }) placeholder: string = null;

  /** The language for month and the weekdays will be decided based on the given input. By default, this will be de which is german */
  @Prop() language: 'de' | 'en' = 'de';

  /** Emits the selected date as Date type. */
  @Event({ eventName: 'b2b-selected' })
  b2bSelected: EventEmitter<DatePickerEventDetail>;

  /** Emits when the user clicks the clear button. */
  @Event({ eventName: 'b2b-clear' })
  b2bClear: EventEmitter<DateClear>;

  private readonly DISABLED_DATE_ERROR_MESSAGE =
    'Auswahl nicht möglich, bitte gültiges Datum auswählen.';
  private readonly FORMATTING_ERROR_MESSAGE = 'Format beachten: TT.MM.JJJJ.';

  @State() private showDatePicker: boolean = false;
  @State() private focused: boolean = false;
  @State() private datePickerView: DatePickerView = DatePickerView.Days;
  @State() selectedMonth: number = new Date().getMonth();
  @State() selectedYear: number = new Date().getFullYear();
  @State() selectedDay: number;
  @State() selectedDate: string = undefined;
  @State() userInputDate: string = '';
  @State() invalid: boolean = false;
  @State() errorMessage: string = this.FORMATTING_ERROR_MESSAGE;
  @State() datesToBeDisabled: Date[] = [];
  @State() normalizedDisableEvery: string[] = [];
  @State() normalizedDisableDatesUntil: Date;
  @State() normalizedDisableDatesFrom: Date;

  private today = new Date();
  private todayWithoutTime = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate(),
  );

  private isWithWithinLimit() {
    return this.width >= 300 && this.width <= 600;
  }

  private normalizeDisableDatesUntilAndFrom(givenDate: string): Date {
    const [day, month, year] = givenDate.split('.').map(Number);
    return new Date(year, month - 1, day);
  }

  componentWillLoad() {
    const disableDatesArray = parsePropToArray(this.disableDates);
    if (disableDatesArray.length > 0) {
      this.datesToBeDisabled = disableDatesArray.map(date => {
        const [day, month, year] = date.split('.').map(Number);
        return new Date(year, month - 1, day);
      });
    }

    const disableDaysArray = parsePropToArray(this.disableDays);
    if (disableDaysArray.length > 0) {
      this.normalizedDisableEvery = disableDaysArray;
    }

    if (this.disableDatesUntil && this.disableDatesUntil !== '') {
      this.normalizedDisableDatesUntil = this.normalizeDisableDatesUntilAndFrom(
        this.disableDatesUntil,
      );
    }

    if (this.disableDatesFrom && this.disableDatesFrom !== '') {
      this.normalizedDisableDatesFrom = this.normalizeDisableDatesUntilAndFrom(
        this.disableDatesFrom,
      );
    }

    if (this.preSelectedDate && this.preSelectedDate !== '') {
      const [day, month, year] = this.preSelectedDate.split('.').map(Number);
      this.selectedDay = day;
      this.selectedMonth = month - 1;
      this.selectedYear = year;
      this.setSelectedDateForDisplay();
      this.showDatePicker = false;
    } else {
      const today = new Date();
      this.selectedDay = undefined;
      this.selectedMonth = today.getMonth();
      this.selectedYear = today.getFullYear();
      this.userInputDate = '';
    }
  }

  @Listen('b2b-date-picker-escape')
  handleEscapePress(event: CustomEvent): void {
    if (this.datePickerView !== DatePickerView.Days) {
      this.datePickerView = DatePickerView.Days;
      event.preventDefault();
      return;
    }
    this.showDatePicker = false;
  }

  @Listen('b2b-date-selected')
  handleDateSelection(event: CustomEvent) {
    this.selectedDay = event.detail.selectedDate.getDate();
    this.setSelectedDate();
    this.showDatePicker = false;
    this.focused = false;
  }

  @Listen('b2b-date-picker-previous-month')
  getPreviousMonth() {
    this.invalid = false;
    if (this.selectedMonth === 0) {
      this.setCurrentMonth(11);
      this.setCurrentYear(this.selectedYear - 1);
    } else {
      this.setCurrentMonth(this.selectedMonth - 1);
    }
  }

  @Watch('disabled')
  handleDisabledChanged(newVal: boolean) {
    if (newVal) {
      this.showDatePicker = false;
      this.focused = false;
      this.invalid = false;
    }
  }

  @Watch('disableDates')
  handleDisableDatesChanged(newVal: string | string[]) {
    const parsed = parsePropToArray(newVal);
    this.datesToBeDisabled = parsed.map(date => {
      const [day, month, year] = date.split('.').map(Number);
      return new Date(year, month - 1, day);
    });
  }

  @Watch('disableDays')
  handleDisableDaysChanged(newVal: string | string[]) {
    this.normalizedDisableEvery = parsePropToArray(newVal);
  }

  @Watch('disableDatesUntil')
  handleDisableDatesUntilChanged(newVal: string) {
    this.normalizedDisableDatesUntil =
      this.normalizeDisableDatesUntilAndFrom(newVal);
  }

  @Watch('disableDatesFrom')
  handleDisableDatesFromChanged(newVal: string) {
    this.normalizedDisableDatesFrom =
      this.normalizeDisableDatesUntilAndFrom(newVal);
  }

  @Watch('disablePastDates')
  handleDisablePastDatesChanged(newVal: boolean) {
    this.disablePastDates = newVal;
  }

  @Watch('disableFutureDates')
  handleDisableFutureDatesChanged(newVal: boolean) {
    this.disableFutureDates = newVal;
  }

  @Watch('disableWeekends')
  handleDisableWeekendsChanged(newVal: boolean) {
    this.disableWeekends = newVal;
  }

  private parseDateInput(dateString: string) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
    if (dateString == '' || dateString === undefined) {
      this.invalid = false;
      return;
    }
    if (!regex.test(dateString)) {
      this.invalid = true;
      this.errorMessage = this.FORMATTING_ERROR_MESSAGE;
      return;
    }

    const [day, month, year] = dateString
      .split('.')
      .map(value => Number(value));

    if (this.isValidDate(day, month, year)) {
      this.invalid = false;
      this.selectedDay = day;
      this.selectedMonth = month - 1;
      this.selectedYear = year;
      this.setSelectedDateForDisplay();
    } else {
      this.invalid = true;
      this.focused = false;
      this.selectedDay = this.todayWithoutTime.getDate();
      this.selectedMonth = this.todayWithoutTime.getMonth();
      this.selectedYear = this.todayWithoutTime.getFullYear();
    }
  }

  private isValidDate(day: number, month: number, year: number): boolean {
    const date = new Date(year, month - 1, day);
    const todayWithoutTime = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate(),
    );

    const isValidDay = date.getDate() === day;
    const isValidMonth = date.getMonth() + 1 === month;
    const isValidYear =
      date.getFullYear() === year && year >= 1900 && year <= 2100;

    if (!isValidDay || !isValidMonth || !isValidYear) {
      this.errorMessage = this.DISABLED_DATE_ERROR_MESSAGE;
      return false;
    }

    let isValidRange = true;
    if (
      DateUtils.isDisabledDate(date, {
        disableDates: this.datesToBeDisabled,
        disablePastDates: this.disablePastDates,
        disableFutureDates: this.disableFutureDates,
        disableWeekends: this.disableWeekends,
        todayWithoutTime: todayWithoutTime,
        disableEvery: this.normalizedDisableEvery,
        disableDatesUntil: this.normalizedDisableDatesUntil,
        disableDatesFrom: this.normalizedDisableDatesFrom,
      })
    ) {
      this.errorMessage = this.DISABLED_DATE_ERROR_MESSAGE;
      isValidRange = false;
    }
    return isValidRange;
  }

  private emitSelectedDate() {
    this.b2bSelected.emit({
      selectedDate: new Date(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDay,
      ),
    });
  }

  private handleInputChange = (event: any) => {
    this.focused = true;
    this.invalid = false;
    let value = event.target.value;
    value = value.replace(/[^0-9.]/g, '');
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    this.userInputDate = value;
    event.target.value = value;

    if (value.length === 10) {
      this.parseDateInput(value);
      if (this.invalid) {
        this.showDatePicker = false;
      }
    }
  };

  private handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      this.showHideDatePicker();
      if (this.invalid) {
        this.invalid = false;
        this.showDatePicker = false;
      }
      let value = event.target.value;
      if (value.length === 0) {
        this.invalid = false;
      }
      if (value.length === 10) {
        this.parseDateInput(value);
        this.emitSelectedDate();
        this.showDatePicker = false;
        this.focused = false;
      } else {
        this.invalid = true;
        this.focused = false;
        this.showDatePicker = false;
      }
    }
    if (event.key === 'Backspace') {
      let value = event.target.value;

      if (value.length === 0) {
        this.clearDateInput();
        this.invalid = false;
      }
    }
  };

  private handleInputFocus = () => {
    this.parseDateInput(this.userInputDate);
    if (this.invalid) {
      this.invalid = false;
    }
    this.focused = true;
  };

  private setSelectedDateForDisplay() {
    if (this.selectedDay !== undefined) {
      this.updateInputWithSelectedDate();
    }
  }

  private updateInputWithSelectedDate() {
    const formattedDay = this.selectedDay.toString().padStart(2, '0');
    const formattedMonth = (this.selectedMonth + 1).toString().padStart(2, '0');
    const formattedYear = this.selectedYear;
    this.userInputDate = `${formattedDay}.${formattedMonth}.${formattedYear}`;
    this.invalid = false;
  }

  @Listen('b2b-date-picker-next-month')
  getNextMonth() {
    this.invalid = false;
    if (this.selectedMonth === 11) {
      this.setCurrentMonth(0);
      this.setCurrentYear(this.selectedYear + 1);
    } else {
      this.setCurrentMonth(this.selectedMonth + 1);
    }
  }

  @Listen('b2b-date-picker-view-changed')
  handleDatePickerViewChanged(
    event: CustomEvent<DatePickerViewChangedEventDetail>,
  ) {
    this.datePickerView = event.detail.value;
  }

  @Listen('b2b-date-picker-month-selected')
  handleMonthSelected(event: CustomEvent<MonthSelectedEventDetail>) {
    this.setCurrentMonth(event.detail.value);
    this.datePickerView = DatePickerView.Days;
    this.invalid = false;
    setTimeout(() => {
      this.setFocusOnCalendarIcon();
    }, 100);
  }

  @Listen('b2b-date-picker-year-selected')
  handleYearSelected(event: CustomEvent<YearSelectedEventDetail>) {
    this.setCurrentYear(event.detail.value);
    this.datePickerView = DatePickerView.Days;
    this.invalid = false;
    setTimeout(() => {
      this.setFocusOnCalendarIcon();
    }, 100);
  }

  private setFocusOnCalendarIcon() {
    let eventIcon = this.host.shadowRoot.querySelector(
      '.b2b-event-icon',
    ) as HTMLDivElement;
    if (eventIcon !== null) {
      eventIcon.focus();
    }
  }

  private setCurrentMonth = (selectedMonth: number) => {
    this.selectedMonth = selectedMonth;
    this.selectedDay = undefined;
  };

  private setCurrentYear = (selectedYear: number) => {
    this.selectedYear = selectedYear;
    this.selectedDay = undefined;
  };
  private showHideDatePicker = () => {
    this.showDatePicker = !this.showDatePicker;
    this.datePickerView = DatePickerView.Days;
  };

  private clearDateInput = () => {
    this.selectedDay = undefined;
    this.userInputDate = undefined;
    this.b2bClear.emit();
  };

  private setSelectedDate() {
    this.setSelectedDateForDisplay();

    this.b2bSelected.emit({
      selectedDate: new Date(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDay,
      ),
    });
    this.invalid = false;
    setTimeout(() => {
      this.setFocusOnCloseIcon();
    }, 100);
  }

  private setFocusOnCloseIcon() {
    let closeIcon = this.host.shadowRoot.querySelector(
      '.b2b-close-icon',
    ) as HTMLDivElement;
    if (closeIcon !== null) {
      closeIcon.focus();
    }
  }

  private handleFocusOut() {
    if (this.userInputDate === '' || this.invalid) {
      return;
    }
    this.parseDateInput(this.userInputDate);
  }

  private handleBackdropDismiss = () => {
    this.showDatePicker = false;
  };

  private moveFocusToInputComponent() {
    if (this.disabled) return;
    const inputElement = this.host.shadowRoot.querySelector(
      'input.b2b-date-picker-input',
    ) as HTMLInputElement;
    if (inputElement !== undefined && !this.invalid) {
      inputElement.focus();
      this.focused = true;
      this.showHideDatePicker();
      return;
    }
    if (this.showDatePicker || this.invalid) {
      inputElement.blur();
      this.invalid = false;
      this.focused = false;
      this.showHideDatePicker();
      return;
    }
  }

  render() {
    if (!this.isWithWithinLimit()) return null;
    return (
      <Host>
        <div class="b2b-date-picker">
          <b2b-input-label id={this.label} required={this.required}>
            {this.label}
          </b2b-input-label>
          <div
            style={{ width: `${this.width}px` }}
            class={{
              'b2b-date-picker-input-wrapper': true,
              'b2b-date-picker-input-wrapper--focused':
                !this.disabled && (this.focused || this.showDatePicker),
              'b2b-date-picker-input-wrapper--error': this.invalid,
              'b2b-date-picker-input-wrapper--disabled': this.disabled,
            }}>
            <div
              class="b2b-date-picker-input-focus-wrapper"
              onClick={
                this.disabled
                  ? undefined
                  : () => {
                      this.moveFocusToInputComponent();
                    }
              }>
              <input
                type="text"
                tabIndex={this.disabled ? -1 : 0}
                class={{
                  'b2b-date-picker-input': true,
                  'b2b-date-picker-input--error': this.invalid,
                  'b2b-date-picker-input--disabled': this.disabled,
                }}
                value={this.userInputDate}
                disabled={this.disabled}
                onInput={this.disabled ? undefined : this.handleInputChange}
                onKeyDown={this.disabled ? undefined : this.handleKeyDown}
                onFocus={this.disabled ? undefined : this.handleInputFocus}
                onBlur={() => {
                  if (!this.disabled) {
                    this.focused = false;
                    this.handleFocusOut();
                  }
                }}
                placeholder={this.placeholder}
              />
            </div>
            <div class="b2b-icons">
              {this.userInputDate && !this.disabled && (
                <div
                  tabIndex={0}
                  onClick={() => {
                    this.invalid = false;
                    this.clearDateInput();
                  }}
                  class="b2b-close-icon"
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      this.invalid = false;
                      this.clearDateInput();
                    }
                  }}>
                  <b2b-icon-100
                    icon="b2b_icon-close"
                    aria-label="clear input"
                    clickable={true}></b2b-icon-100>
                </div>
              )}

              <div
                tabIndex={this.disabled ? -1 : 0}
                onClick={
                  this.disabled
                    ? undefined
                    : () => {
                        this.showHideDatePicker();
                      }
                }
                onKeyDown={event => {
                  if (!this.disabled && event.key === 'Enter') {
                    this.showHideDatePicker();
                  }
                }}
                class={{ 'b2b-event-icon': true }}
                aria-disabled={this.disabled ? 'true' : 'false'}>
                <b2b-icon-100
                  aria-label={
                    this.showDatePicker
                      ? 'close date picker'
                      : 'open date picker'
                  }
                  icon="b2b_icon-event"
                  clickable={!this.disabled}></b2b-icon-100>
              </div>
            </div>
          </div>
        </div>
        <div
          class={{
            'b2b-date-picker-body': true,
            'b2b-date-picker-body--hidden': !this.showDatePicker,
          }}>
          {this.datePickerView === DatePickerView.Days && (
            <div>
              <b2b-date-picker-header
                language={this.language}
                selectedMonth={this.selectedMonth}
                selectedYear={this.selectedYear}></b2b-date-picker-header>
              <b2b-date-picker-days-header
                language={this.language}></b2b-date-picker-days-header>
              <b2b-date-picker-days
                selectedMonth={this.selectedMonth}
                selectedYear={this.selectedYear}
                selectedDay={this.selectedDay}
                disableWeekends={this.disableWeekends}
                disableFutureDates={this.disableFutureDates}
                disablePastDates={this.disablePastDates}
                disableDates={this.datesToBeDisabled}
                disableDatesUntil={this.normalizedDisableDatesUntil}
                disableEvery={this.normalizedDisableEvery}
                disableDatesFrom={
                  this.normalizedDisableDatesFrom
                }></b2b-date-picker-days>
            </div>
          )}
          {this.datePickerView === DatePickerView.Months && (
            <b2b-date-picker-months
              language={this.language}
              selectedMonth={this.selectedMonth}></b2b-date-picker-months>
          )}
          {this.datePickerView === DatePickerView.Years && (
            <b2b-date-picker-years
              selectedYear={this.selectedYear}></b2b-date-picker-years>
          )}
        </div>
        {this.showDatePicker && (
          <div
            class="b2b-date-picker__backdrop"
            onClick={this.handleBackdropDismiss}></div>
        )}
        {
          <span
            class={{
              'b2b-date-picker-hint': true,
              'b2b-date-picker-hint--error': this.invalid,
            }}>
            {!this.showDatePicker && this.invalid
              ? this.errorMessage
              : this.showHint && this.hint}
          </span>
        }
      </Host>
    );
  }
}
