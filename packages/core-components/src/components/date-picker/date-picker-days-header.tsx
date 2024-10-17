import { Component, h, Host, Element } from '@stencil/core';
import { Weekdays } from './date-picker.types';

@Component({
  tag: 'b2b-date-picker-days-header',
  styleUrl: 'date-picker-days-header.scss',
  shadow: true,
})
export class B2bDatePickerDaysHeader {
  @Element() host: HTMLB2bDatePickerDaysHeaderElement;

  private displayWeekDays = () => {
    let renderWeekDays = [];
    Weekdays.forEach(day => {
      renderWeekDays.push(<div class="b2b-date-picker-day">{day}</div>);
    });
    return renderWeekDays;
  };

  render() {
    return (
      <Host>
        <div class="b2b-date-picker-days-header">{this.displayWeekDays()}</div>
      </Host>
    );
  }
}
