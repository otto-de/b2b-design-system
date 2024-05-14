import { Component, h, Host, Element } from '@stencil/core';
import { Weekdays } from './calendar.types';

@Component({
  tag: 'b2b-calendar-days-header',
  styleUrl: 'calendar-days-header.scss',
  shadow: true,
})
export class B2bCalendarDaysHeader {
  @Element() host: HTMLB2bCalendarDaysHeaderElement;

  private displayWeekDays = () => {
    let renderWeekDays = [];
    Weekdays.forEach(day => {
      renderWeekDays.push(<div class="b2b-calendar-day">{day}</div>);
    });
    return renderWeekDays;
  };

  render() {
    return (
      <Host>
        <div class="b2b-calendar-days-header">{this.displayWeekDays()}</div>
      </Host>
    );
  }
}
