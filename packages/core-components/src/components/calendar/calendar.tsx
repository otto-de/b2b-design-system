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
  @State() selectedDay: number;
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

  private showHideCalendar = () => {
    this.showCalendar = !this.showCalendar;
  };

  private clearDateInput = () => {
    this.selectedDate = undefined;
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

  render() {
    return (
      <Host>
        <div class="b2b-calender">
          <div>{this.calendarLabel}</div>
          <div
            class="b2b-calender-input-wrapper"
            onClick={this.showHideCalendar}>
            <div class="calendar-selected-date">{this.selectedDate}</div>
            {this.selectedDate && (
              <div class="b2b-close-icon" onClick={this.clearDateInput}>
                <b2b-icon-100
                  icon="b2b_icon-close"
                  clickable={true}></b2b-icon-100>
              </div>
            )}

            <div class="b2b-calender-icon">
              <b2b-icon-100 icon="b2b_icon-event"></b2b-icon-100>
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
              setCurrentDay={this.setCurrentDay}
              disableWeekends={this.disableWeekends}
              disableFutureDates={this.disableFutureDates}
              disablePastDates={this.disablePastDates}></b2b-calender-days>
          </div>
        )}
      </Host>
    );
  }
}
