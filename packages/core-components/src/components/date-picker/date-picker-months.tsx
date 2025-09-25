import type { ComponentInterface, EventEmitter } from '@stencil/core';
import {
  Component,
  Element,
  Event,
  h,
  Host,
  Listen,
  Prop,
} from '@stencil/core';
import type {
  EscapePressed,
  MonthSelectedEventDetail,
} from '../../utils/interfaces/form.interface';
import { MonthsEnglish, MonthsGerman } from './date-picker.types';

const keys = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  ENTER: 'Enter',
  ESC: 'Escape',
};

@Component({
  tag: 'b2b-date-picker-months',
  styleUrl: 'date-picker-months.scss',
  shadow: true,
})
export class B2bDatePickerMonths implements ComponentInterface {
  @Element() host: HTMLB2bDatePickerMonthsElement;
  /** Internal selected month */
  @Prop() selectedMonth: number;

  /** Internal The language for month and the weekdays will be decided based on the given input. By default, this will be de which is german */
  @Prop() language: 'de' | 'en' = 'de';

  /** Event emitted on selecting month */
  @Event({ eventName: 'b2b-date-picker-month-selected' })
  b2bDatePickerMonthSelected: EventEmitter<MonthSelectedEventDetail>;

  /** Event emitted on escape press */
  @Event({ eventName: 'b2b-date-picker-escape' })
  b2bDatePickerEscape: EventEmitter<EscapePressed>;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    const months = this.getAllMonths();
    let currentMonth = this.getCurrentMonth();
    let index = months.indexOf(currentMonth);
    switch (event.key) {
      case keys.ARROW_LEFT:
        index -= 1;
        break;
      case keys.ARROW_RIGHT:
        index += 1;
        break;
      case keys.ARROW_UP:
        index -= 3;
        break;
      case keys.ARROW_DOWN:
        index += 3;
        break;
      case keys.ENTER:
        this.b2bDatePickerMonthSelected.emit({
          value: index,
        });
        return;
      case keys.ESC:
        this.b2bDatePickerEscape.emit();
        return;
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
    const Months = this.language === 'en' ? MonthsEnglish : MonthsGerman;
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

  componentDidRender(): void {
    this.getCurrentMonth()?.focus();
  }

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
