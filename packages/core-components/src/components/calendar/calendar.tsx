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

  @State() selectedMonth: number = new Date().getMonth() + 1;
  @State() selectedYear: number = new Date().getFullYear();
  @State() selectedDate: number = new Date().getDate();

  private setCurrentMonth = (selectedMonth: number) => {
    this.selectedMonth = selectedMonth;
  };

  private setCurrentYear = (selectedYear: number) => {
    this.selectedYear = selectedYear;
  };
  private setCurrentDate = (selectedDate: number) => {
    this.selectedDate = selectedDate;
  };

  private showHideCalendar = () => {
    this.showCalendar = !this.showCalendar;
  };

  render() {
    return (
      <Host>
        <div>
          <div>{this.calendarLabel}</div>
          <div
            class="calender-selected-date-wrapper"
            onClick={this.showHideCalendar}>
            <div class="calendar-selected-date">
              {this.selectedDate +
                '.' +
                this.selectedMonth +
                '.' +
                this.selectedYear}
            </div>
            <b2b-icon-100 icon="b2b_icon-event"></b2b-icon-100>
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
              setCurrentDate={this.setCurrentDate}></b2b-calender-days>
          </div>
        )}
      </Host>
    );
  }
}
