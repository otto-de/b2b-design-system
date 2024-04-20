import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
  State,
  Listen,
} from '@stencil/core';
import { CalendarEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-calendar',
  styleUrl: 'calendar.scss',
  shadow: true,
})
export class B2bCalendar {
  @Element() host: HTMLB2bCalendarElement;

  /** Whether the previous dates from the current date are disabled. By default, this is true. */
  @Prop() disablePastDates: boolean = true;

  /** Whether the dates after the current date are disabled. By default, this is false. */
  @Prop() disableFutureDates: boolean = false;

  /** Whether the dates that fall on the weekend are disabled. By default, this is false. */
  @Prop() disableWeekends: boolean = false;

  /** Label for the calendar component. */
  @Prop() calendarLabel: string = 'this is a calender';

  /** Emits the selected date as Date type. */
  @Event({ eventName: 'b2b-selected' })
  b2bSelected: EventEmitter<CalendarEventDetail>;

  @State() private showCalendar: boolean = false;

  @State() selectedMonth: number = new Date().getMonth();
  @State() selectedYear: number = new Date().getFullYear();
  @State() selectedDay: number;
  @State() selectedDate: string = undefined;

  @Listen('b2b-calender-escape')
  handleEscapePress() {
    this.showCalendar = false;
  }

  @Listen('b2b-date-selected')
  handleDateSelection(event: CustomEvent) {
    this.selectedDay = event.detail.selectedDate.getDate();
    this.setSelectedDate();
    this.showCalendar = false;
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
      selectedDate: new Date(this.selectedDate),
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
        <div class="b2b-calender">
          <div>{this.calendarLabel}</div>
          <div
            class="b2b-calender-input-wrapper"
            tabindex={0}
            onClick={this.showHideCalendar}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                this.showHideCalendar();
              }
            }}>
            <div class="calendar-selected-date">{this.selectedDate}</div>
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
                  <b2b-icon-100
                    icon="b2b_icon-close"
                    class="b2b-icon"
                    aria-label="clear input"
                    clickable={true}></b2b-icon-100>
                </div>
              )}

              <div class="b2b-calender-icon" tabindex={0}>
                <b2b-icon-100
                  class="b2b-icon"
                  aria-label={
                    this.showCalendar ? 'close calender' : 'open calender'
                  }
                  icon="b2b_icon-event"
                  clickable={true}></b2b-icon-100>
              </div>
            </div>
          </div>
        </div>
        {this.showCalendar && (
          <div class="b2b-datepicker">
            <b2b-calendar-header
              selectedMonth={this.selectedMonth}
              setCurrentMonth={this.setCurrentMonth}
              setCurrentYear={this.setCurrentYear}
              selectedYear={this.selectedYear}></b2b-calendar-header>
            <b2b-calendar-days-header></b2b-calendar-days-header>
            <b2b-calender-days
              selectedMonth={this.selectedMonth}
              selectedYear={this.selectedYear}
              selectedDay={this.selectedDay}
              disableWeekends={this.disableWeekends}
              disableFutureDates={this.disableFutureDates}
              disablePastDates={this.disablePastDates}></b2b-calender-days>
          </div>
        )}
      </Host>
    );
  }
}
