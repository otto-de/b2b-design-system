import { Component, h, Host, Element, Prop } from '@stencil/core';
import { WeekdaysEnglish, WeekdaysGerman } from './date-picker.types';

@Component({
  tag: 'b2b-date-picker-days-header',
  styleUrl: 'date-picker-days-header.scss',
  shadow: true,
})
export class B2bDatePickerDaysHeader {
  @Element() host: HTMLB2bDatePickerDaysHeaderElement;

  /** Internal the language for month and the weekdays will be decided based on the given input. By default, this will be de which is german */
  @Prop() language: 'de' | 'en' = 'de';

  private displayWeekDays = () => {
    let renderWeekDays = [];
    const weekdays = this.language === 'en' ? WeekdaysEnglish : WeekdaysGerman;
    weekdays.forEach(day => {
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
