import { Component, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'b2b-calendar-days-header',
  styleUrl: 'calendar-days-header.scss',
  shadow: true,
})
export class B2bCalendarDaysHeader {
  @Element() host: HTMLB2bCalendarDaysHeaderElement;

  private weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  private displayWeekDays = () => {
    let renderWeekDays = [];
    this.weekdays.forEach(day => {
      renderWeekDays.push(<div class="b2b-calender-day">{day}</div>);
    });
    return renderWeekDays;
  };

  render() {
    return (
      <Host>
        <div class="b2b-calender-days-header">{this.displayWeekDays()}</div>
      </Host>
    );
  }
}
