import {
  Component,
  h,
  Host,
  Element,
  Prop,
  Event,
  EventEmitter,
  Listen,
} from '@stencil/core';
import { Months } from './date-picker.types';
import { MonthSelectedEventDetail } from '../../utils/interfaces/interaction.interface';

const keys = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  ENTER: 'Enter',
};

@Component({
  tag: 'b2b-date-picker-months',
  styleUrl: 'date-picker-months.scss',
  shadow: true,
})
export class B2bDatePickerMonths {
  @Element() host: HTMLB2bDatePickerMonthsElement;
  /** Internal selected month */
  @Prop() selectedMonth: number;

  /** Event emitted on selecting month**/
  @Event({ eventName: 'b2b-date-picker-month-selected' })
  b2bDatePickerMonthSelected: EventEmitter<MonthSelectedEventDetail>;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    let index = this.selectedMonth;
    const months = this.getAllMonths();
    let currentMonth = this.getCurrentMonth();
    switch (event.key) {
      case keys.ARROW_LEFT:
        index = months.indexOf(currentMonth) - 1;
        break;
      case keys.ARROW_RIGHT:
        index = months.indexOf(currentMonth) + 1;
        break;
      case keys.ARROW_UP:
        index = months.indexOf(currentMonth) - 3;
        break;
      case keys.ARROW_DOWN:
        index = months.indexOf(currentMonth) + 3;
        break;
      case keys.ENTER:
        index = months.indexOf(currentMonth);
        this.b2bDatePickerMonthSelected.emit({
          value: index,
        });
        break;
      default:
        return;
    }

    if (index < 0) {
      index = months.length - 1;
    }

    if (index > months.length - 1) {
      index = 0;
    }

    this.focusCurrentMonth(months[index]);
  }

  private getAllMonths = (): HTMLDivElement[] => {
    return Array.from(
      this.host.shadowRoot.querySelectorAll('.b2b-date-picker-month'),
    ) as HTMLDivElement[];
  };

  private getCurrentMonth = () => {
    const months = this.getAllMonths();
    return months.find(el => el.getAttribute('tabindex') === '0');
  };

  private focusCurrentMonth = (month: HTMLDivElement) => {
    const months = this.getAllMonths();
    months.forEach(el => {
      el.setAttribute('tabindex', el === month ? '0' : '-1');
    });
    month.focus();
  };

  private renderDatePickerMonths = () => {
    let months = [];
    for (let i = 0; i < 12; i++) {
      months.push(
        <div
          class={{
            'b2b-date-picker-month': true,
            'b2b-date-picker-month--selected': this.selectedMonth === i,
          }}
          onClick={() => this.b2bDatePickerMonthSelected.emit({ value: i })}
          tabIndex={this.selectedMonth === i ? 0 : -1}
          aria-label={`Month ${i + 1}`}>
          {Months[i]}
        </div>,
      );
    }
    return months;
  };

  render() {
    return (
      <Host>
        <div class="b2b-date-picker-months">
          {this.renderDatePickerMonths()}
        </div>
      </Host>
    );
  }
}
