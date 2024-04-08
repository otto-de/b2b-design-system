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
  private handleDateSelection = () => {
    this.b2bSelected.emit({ selectedDate: new Date() });
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
            <div class="calendar-selected-date" />
            <b2b-icon-100 icon="b2b_icon-event"></b2b-icon-100>
          </div>
        </div>
        {this.showCalendar && (
          <b2b-datepicker
            disablePastDates
            disableFutureDates
            disableWeekends
            onB2b-selected={this.handleDateSelection}></b2b-datepicker>
        )}
      </Host>
    );
  }
}
