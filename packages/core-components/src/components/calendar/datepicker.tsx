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
  tag: 'b2b-datepicker',
  styleUrl: 'datepicker.scss',
  shadow: true,
})
export class B2bCalendar {
  @Element() host: HTMLB2bDatepickerElement;

  @Prop() disablePastDates: boolean = true;

  @Prop() disableFutureDates: boolean = false;

  @Prop() disableWeekends: boolean = false;

  @Event({ eventName: 'b2b-selected' })
  b2bSelected: EventEmitter<CalendarEventDetail>;

  @State() selectedMonth: number = new Date().getMonth();
  @State() selectedYear: number = new Date().getFullYear();

  private setCurrentMonth = (selectedMonth: number) => {
    this.selectedMonth = selectedMonth;
  };

  render() {
    return (
      <Host>
        <div class="b2b-datepicker">
          <b2b-calendar-header
            selectedMonth={this.selectedMonth}
            setCurrentMonth={this.setCurrentMonth}
            selectedYear={this.selectedYear}></b2b-calendar-header>
          <b2b-calendar-days-header></b2b-calendar-days-header>
          <b2b-grid>
            <b2b-grid-row></b2b-grid-row>
          </b2b-grid>
          calendar data
        </div>
      </Host>
    );
  }
}
