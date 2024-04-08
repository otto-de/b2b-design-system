import { Component, Prop, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'b2b-calendar-days-header',
  styleUrl: 'calendar-days-header.scss',
  shadow: true,
})
export class B2bCalendarDaysHeader {
  @Element() host: HTMLB2bCalendarDaysHeader;

  private daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  render() {
    <Host></Host>;
  }
}
