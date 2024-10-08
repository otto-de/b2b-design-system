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
import { CalendarEventDetail } from '../../utils/interfaces/form.interface';
import { CalendarView } from './calendar.types';
import {
  CalendarViewChangedEventDetail,
  MonthSelectedEventDetail,
  YearSelectedEventDetail,
} from '../../utils/interfaces/interaction.interface';

@Component({
  tag: 'b2b-calendar',
  styleUrl: 'calendar.scss',
  shadow: true,
})
export class B2bCalendar {
  @Element() host: HTMLB2bCalendarElement;

  /** Whether the previous dates from the current date are disabled. By default, this is true. */
  @Prop() disablePastDates: boolean;

  /** Whether the dates after the current date are disabled. By default, this is false. */
  @Prop() disableFutureDates: boolean;

  /** Whether the dates that fall on the weekend are disabled. By default, this is false. */
  @Prop() disableWeekends: boolean;

  /** Label for the calendar component. */
  @Prop() label: string = 'Zeitraum auswählen';

  /** Emits the selected date as Date type. */
  @Event({ eventName: 'b2b-selected' })
  b2bSelected: EventEmitter<CalendarEventDetail>;

  @State() private showCalendar: boolean = false;
  @State() private calendarView: CalendarView = CalendarView.Days;

  @State() selectedMonth: number = new Date().getMonth();
  @State() selectedYear: number = new Date().getFullYear();
  @State() selectedDay: number;
  @State() selectedDate: string = undefined;

  @Listen('b2b-calendar-escape')
  handleEscapePress() {
    this.showCalendar = false;
  }

  @Listen('b2b-date-selected')
  handleDateSelection(event: CustomEvent) {
    this.selectedDay = event.detail.selectedDate.getDate();
    this.setSelectedDate();
    this.showCalendar = false;
  }
  @Listen('b2b-calendar-previous-month')
  getPreviousMonth() {
    if (this.selectedMonth === 0) {
      this.setCurrentMonth(11);
      this.setCurrentYear(this.selectedYear - 1);
    } else {
      this.setCurrentMonth(this.selectedMonth - 1);
    }
  }

  @Listen('b2b-calendar-next-month')
  getNextMonth() {
    if (this.selectedMonth === 11) {
      this.setCurrentMonth(0);
      this.setCurrentYear(this.selectedYear + 1);
    } else {
      this.setCurrentMonth(this.selectedMonth + 1);
    }
  }

  @Listen('b2b-calendar-view-changed')
  handleCalendarViewChanged(
    event: CustomEvent<CalendarViewChangedEventDetail>,
  ) {
    this.calendarView = event.detail.value;
  }

  @Listen('b2b-calendar-month-selected')
  handleMonthSelected(event: CustomEvent<MonthSelectedEventDetail>) {
    this.setCurrentMonth(event.detail.value);
    this.calendarView = CalendarView.Days;
  }

  @Listen('b2b-calendar-year-selected')
  handleYearSelected(event: CustomEvent<YearSelectedEventDetail>) {
    this.setCurrentYear(event.detail.value);
    this.calendarView = CalendarView.Days;
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
  private showHideCalendar = () => {
    this.showCalendar = !this.showCalendar;
    this.calendarView = CalendarView.Days;
  };

  private clearDateInput = () => {
    this.selectedDate = undefined;
    this.selectedDay = undefined;
  };

  private setSelectedDate() {
    if (this.selectedDay !== undefined)
      this.selectedDate =
        this.selectedDay +
        '.' +
        (this.selectedMonth + 1) +
        '.' +
        this.selectedYear;
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

  render() {
    return (
      <Host>
        <div class="b2b-calendar">
          <div class="b2b-calendar-label">{this.label}</div>
          <div
            class={{
              'b2b-calendar-input-wrapper': true,
              'b2b-calendar-input-wrapper--opened': this.showCalendar,
            }}
            tabindex={0}
            onClick={this.showHideCalendar}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                this.showHideCalendar();
              }
            }}>
            <div class="b2b-calendar-selected-date">{this.selectedDate}</div>
            <div class="b2b-icons">
              {this.selectedDate && (
                <div
                  tabIndex={0}
                  onClick={() => {
                    this.clearDateInput();
                    this.showHideCalendar();
                  }}
                  class="b2b-close-icon"
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      this.clearDateInput();
                      this.showHideCalendar();
                    }
                  }}>
                  <b2b-icon
                    icon="b2b_icon-close"
                    aria-label="clear input"
                    clickable={true}></b2b-icon>
                </div>
              )}

              <div tabindex={0}>
                <b2b-icon
                  aria-label={
                    this.showCalendar ? 'close calendar' : 'open calendar'
                  }
                  icon="b2b_icon-event"
                  clickable={true}></b2b-icon>
              </div>
            </div>
          </div>
        </div>
        <div
          class={{
            'b2b-calendar-body': true,
            'b2b-calendar-body--hidden': !this.showCalendar,
          }}>
          {this.calendarView === CalendarView.Days && (
            <div>
              <b2b-calendar-header
                selectedMonth={this.selectedMonth}
                selectedYear={this.selectedYear}></b2b-calendar-header>
              <b2b-calendar-days-header></b2b-calendar-days-header>
              <b2b-calendar-days
                selectedMonth={this.selectedMonth}
                selectedYear={this.selectedYear}
                selectedDay={this.selectedDay}
                disableWeekends={this.disableWeekends}
                disableFutureDates={this.disableFutureDates}
                disablePastDates={this.disablePastDates}></b2b-calendar-days>
            </div>
          )}
          {this.calendarView === CalendarView.Months && (
            <b2b-calendar-months
              selectedMonth={this.selectedMonth}></b2b-calendar-months>
          )}
          {this.calendarView === CalendarView.Years && (
            <b2b-calendar-years
              selectedYear={this.selectedYear}></b2b-calendar-years>
          )}
        </div>
      </Host>
    );
  }
}
