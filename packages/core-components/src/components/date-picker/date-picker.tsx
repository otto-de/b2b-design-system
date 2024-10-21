import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { DatePickerEventDetail } from '../../utils/interfaces/form.interface';
import { DatePickerView } from './date-picker.types';
import {
  DatePickerViewChangedEventDetail,
  MonthSelectedEventDetail,
  YearSelectedEventDetail,
} from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-date-picker',
  styleUrl: 'date-picker.scss',
  shadow: true,
})
export class B2bDatePicker {
  @Element() host: HTMLB2bDatePickerElement;

  /** Whether the previous dates from the current date are disabled. By default, this is true. */
  @Prop() disablePastDates: boolean;

  /** Whether the dates after the current date are disabled. By default, this is false. */
  @Prop() disableFutureDates: boolean;

  /** Whether the dates that fall on the weekend are disabled. By default, this is false. */
  @Prop() disableWeekends: boolean;

  /** Label for the date picker component. */
  @Prop() label: string = 'Zeitraum auswählen';

  /** Default date picker date*/
  @Prop() defaultDate: string = undefined;

  /** Emits the selected date as Date type. */
  @Event({ eventName: 'b2b-selected' })
  b2bSelected: EventEmitter<DatePickerEventDetail>;

  @State() private showDatePicker: boolean = false;
  @State() private datePickerView: DatePickerView = DatePickerView.Days;
  @State() selectedMonth: number = new Date().getMonth();
  @State() selectedYear: number = new Date().getFullYear();
  @State() selectedDay: number;
  @State() selectedDate: string = undefined;
  @State() userInputDate: string = '';
  @State() invalid: boolean = false;

  private today = new Date();
  private todayWithoutTime = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate(),
  );

  componentWillLoad() {
    if (this.defaultDate != undefined) {
      const [day, month, year] = this.defaultDate.split('.').map(Number);
      this.selectedDay = day;
      this.selectedMonth = month - 1;
      this.selectedYear = year;
      this.setSelectedDateForDisplay();
      this.showDatePicker = true;
    }
  }

  @Listen('b2b-date-picker-escape')
  handleEscapePress() {
    this.showDatePicker = false;
  }

  @Listen('b2b-date-selected')
  handleDateSelection(event: CustomEvent) {
    this.selectedDay = event.detail.selectedDate.getDate();
    this.setSelectedDate();
    this.showDatePicker = false;
  }

  @Listen('b2b-date-picker-previous-month')
  getPreviousMonth() {
    if (this.selectedMonth === 0) {
      this.setCurrentMonth(11);
      this.setCurrentYear(this.selectedYear - 1);
    } else {
      this.setCurrentMonth(this.selectedMonth - 1);
    }
  }

  private parseDateInput(dateString: string) {
    if (dateString == '') {
      this.invalid = false;
      return;
    }
    const [day, month, year] = dateString
      .split('.')
      .map(value => Number(value));
    if (this.isValidDate(day, month, year)) {
      this.invalid = true;
      this.selectedDay = day;
      this.selectedMonth = month - 1;
      this.selectedYear = year;
      this.setSelectedDateForDisplay();
      this.showDatePicker = true;
    } else {
      this.showDatePicker = false;
      this.invalid = true;
    }
  }

  private isValidDate(day: number, month: number, year: number): boolean {
    const date = new Date(year, month - 1, day);

    const isValidDay = day > 0 && day <= 31;
    const isValidMonth = month > 0 && month <= 12;
    const isValidYear = year > 0;

    let isValidRange = true;
    if (this.disablePastDates && date < this.todayWithoutTime) {
      isValidRange = false;
    }
    if (this.disableFutureDates && date > this.todayWithoutTime) {
      isValidRange = false;
    }
    if ((this.disableWeekends && date.getDay() == 0) || date.getDay() == 6) {
      isValidRange = false;
    }
    return isValidDay && isValidMonth && isValidYear && isValidRange;
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
    let value = event.target.value;
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    this.userInputDate = value;
    event.target.value = value;

    if (value.length === 10) {
      this.parseDateInput(value);
      this.emitSelectedDate();
    }
  };

  private handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      let value = event.target.value;

      if (value.length === 0) {
        this.selectedDay = undefined;
        this.userInputDate = undefined;
      }

      if (value.length === 10) {
        this.parseDateInput(value);
        this.emitSelectedDate();
      } else {
        this.invalid = true;
      }
    }
  };

  private handleInputBlur = () => {
    if (
      this.selectedDay === undefined ||
      this.selectedMonth === undefined ||
      this.selectedYear === undefined
    ) {
      this.invalid = false;
    }
    if (
      !this.isValidDate(
        this.selectedDay,
        this.selectedMonth + 1,
        this.selectedYear,
      )
    ) {
      this.invalid = true;
    }
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
    this.clearDateInput();
    this.selectedDay = undefined;
  };

  private setCurrentYear = (selectedYear: number) => {
    this.selectedYear = selectedYear;
    this.clearDateInput();
    this.selectedDay = undefined;
  };
  private showHideDatePicker = () => {
    this.showDatePicker = !this.showDatePicker;
    this.datePickerView = DatePickerView.Days;
  };

  private clearDateInput = () => {
    this.selectedDay = undefined;
    this.userInputDate = undefined;
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

  private handleBackdropDismiss = () => {
    this.showDatePicker = false;
  };

  render() {
    return (
      <Host>
        <div class="b2b-date-picker">
          <div class="b2b-date-picker-label">{this.label}</div>
          <div
            class={{
              'b2b-date-picker-input-wrapper': true,
              'b2b-date-picker-input-wrapper--opened': this.showDatePicker,
              'b2b-date-picker-input-wrapper--error': this.invalid,
            }}
            tabindex={0}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                this.invalid = false;
                this.showHideDatePicker();
              }
            }}
            onClick={() => {
              this.invalid = false;
              this.showHideDatePicker();
            }}>
            <input
              type="text"
              class={{
                'b2b-date-picker-input': true,
                'b2b-date-picker-input--error': this.invalid,
              }}
              value={this.userInputDate}
              onInput={this.handleInputChange}
              onKeyDown={this.handleKeyDown}
              onBlur={this.handleInputBlur}
            />
            <div class="b2b-icons">
              {this.userInputDate && (
                <div
                  tabIndex={0}
                  onClick={() => {
                    this.clearDateInput();
                    this.showHideDatePicker();
                  }}
                  class="b2b-close-icon"
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      this.clearDateInput();
                      this.showHideDatePicker();
                    }
                  }}>
                  <b2b-icon
                    icon="b2b_icon-close"
                    aria-label="clear input"
                    clickable={true}></b2b-icon>
                </div>
              )}

              <div tabindex={0} class="b2b-event-icon">
                <b2b-icon
                  aria-label={
                    this.showDatePicker
                      ? 'close date picker'
                      : 'open date picker'
                  }
                  icon="b2b_icon-event"
                  clickable={true}></b2b-icon>
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
                selectedMonth={this.selectedMonth}
                selectedYear={this.selectedYear}></b2b-date-picker-header>
              <b2b-date-picker-days-header></b2b-date-picker-days-header>
              <b2b-date-picker-days
                selectedMonth={this.selectedMonth}
                selectedYear={this.selectedYear}
                selectedDay={this.selectedDay}
                disableWeekends={this.disableWeekends}
                disableFutureDates={this.disableFutureDates}
                disablePastDates={this.disablePastDates}></b2b-date-picker-days>
            </div>
          )}
          {this.datePickerView === DatePickerView.Months && (
            <b2b-date-picker-months
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
        {!this.showDatePicker && (
          <span
            class={{
              'b2b-date-picker-hint': true,
              'b2b-date-picker-hint--error': this.invalid,
            }}>
            {this.invalid
              ? 'Format beachten: TT.MM.JJJJ'
              : 'Format: TT.MM.JJJJ'}
          </span>
        )}
      </Host>
    );
  }
}
