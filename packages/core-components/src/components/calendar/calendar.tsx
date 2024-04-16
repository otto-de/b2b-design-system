import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
  State,
} from '@stencil/core';
import { CalendarEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-calendar',
  styleUrl: 'calendar.scss',
  shadow: true,
})
export class B2bCalendar {
  @Element() host: HTMLB2bCalendarElement;

  @Prop() disablePastDates: boolean = true;

  @Prop() disableFutureDates: boolean = false;

  @Prop() disableWeekends: boolean = false;

  @Prop() calendarLabel: string = 'this is a calender';

  @Event({ eventName: 'b2b-selected' })
  b2bSelected: EventEmitter<CalendarEventDetail>;

  @State() private showCalendar: boolean = false;

  @State() selectedMonth: number = new Date().getMonth();
  @State() selectedYear: number = new Date().getFullYear();
  @State() selectedDay: number = new Date().getDate();
  @State() selectedDate: string = undefined;

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

  private setCurrentDay = (selectedDate: number) => {
    this.selectedDay = selectedDate;
    this.setSelectedDate();
  };

  private showHideCalendar = (showCalendar: boolean) => {
    this.showCalendar = showCalendar;
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
  }

  private handleCancelKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.clearDateInput();
    }
  };
  private handleCalendarKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.showHideCalendar(!this.showCalendar);
    }
  };

  render() {
    return (
      <Host>
        <div class="b2b-calender">
          <div>{this.calendarLabel}</div>
          <div
            class="b2b-calender-input-wrapper"
            onClick={() => this.showHideCalendar(!this.showCalendar)}>
            <div class="calendar-selected-date">{this.selectedDate}</div>
            <div class="b2b-icons">
              {this.selectedDate && (
                <div
                  aria-label="reset date"
                  tabindex={0}
                  onClick={() => {
                    this.clearDateInput();
                  }}
                  onKeyDown={this.handleCancelKeydown}>
                  <b2b-icon-100
                    icon="b2b_icon-close"
                    class="b2b-close-icon"
                    clickable={true}></b2b-icon-100>
                </div>
              )}

              <div
                class="b2b-calender-icon"
                aria-label="open calendar"
                tabindex={0}
                onKeyDown={this.handleCalendarKeydown}>
                <b2b-icon-100
                  icon="b2b_icon-event"
                  clickable={true}></b2b-icon-100>
              </div>
            </div>
          </div>
        </div>
        {this.showCalendar && (
          <div
            class="b2b-datepicker"
            aria-modal="true"
            aria-label="Choose Date">
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
              setCurrentDay={this.setCurrentDay}
              disableWeekends={this.disableWeekends}
              disableFutureDates={this.disableFutureDates}
              disablePastDates={this.disablePastDates}
              showDatePicker={this.showCalendar}
              setShowDatePicker={this.showHideCalendar}></b2b-calender-days>
          </div>
        )}
      </Host>
    );
  }
}
