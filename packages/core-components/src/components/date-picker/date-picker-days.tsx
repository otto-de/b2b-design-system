import {
  Component,
  h,
  Host,
  Element,
  Prop,
  State,
  Listen,
  Event,
  EventEmitter,
} from '@stencil/core';
import { DateSelectedEventDetail } from '../../utils/interfaces/form.interface';
import { EscapePressed } from '../../utils/interfaces/form.interface';
import { DateUtils } from '../../utils/datepicker/date-picker-util';

const keys = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  HOME: 'Home',
  END: 'End',
  ESC: 'Escape',
  TAB: 'Tab',
  ENTER: 'Enter',
};

@Component({
  tag: 'b2b-date-picker-days',
  styleUrl: 'date-picker-days.scss',
  shadow: true,
})
export class B2bDatePickerDays {
  @Element() host: HTMLB2bDatePickerDaysElement;
  /** Internal selected month */
  @Prop() selectedMonth: number;
  /** Internal selected year */
  @Prop() selectedYear: number;
  /** Internal selected day */
  @Prop() selectedDay: number;
  /** Internal whether the dates previous to the current date are disabled. By default, this is true. */
  @Prop() disablePastDates: boolean = false;
  /** Internal whether the dates after the current date are disabled. By default, this is false. */
  @Prop() disableFutureDates: boolean = false;
  /** Internal whether the weekends are disabled. By default, this is false.  */
  @Prop() disableWeekends: boolean = false;
  /** Internal the dates that are part of this array are disabled. By default, this is an empty array.  */
  @Prop() disableDates: Date[] = [];
  /** Internal the specific days of the week that need to be disabled */
  @Prop() disableEvery: string[] = [];
  /** Internal all the dates until the given specified date will be disabled. */
  @Prop() disableDatesUntil: Date;
  /** Internal all the dates from the given specified date will be disabled. */
  @Prop() disableDatesFrom: Date;
  @State() disabled: boolean = false;
  private today = new Date();
  private todayWithoutTime = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate(),
  );
  /** Event emitted on escape press**/
  @Event({ eventName: 'b2b-date-picker-escape' })
  b2bDatePickerEscape: EventEmitter<EscapePressed>;
  componentDidLoad() {
    this.setFocusOnSelectedDayOrFirstDay();
  }

  private setFocusOnSelectedDayOrFirstDay() {
    const dates = this.getAllDates();
    if (dates.length > 0) {
      if (this.today.getMonth() !== this.selectedMonth) {
        if (this.selectedDay !== undefined) {
          this.focusCurrentDate(dates[this.selectedDay - 1]);
        } else {
          this.focusCurrentDate(dates[0]);
        }
      }
    }
  }

  componentWillLoad() {
    this.setFocusOnSelectedDayOrFirstDay();
  }

  /** Event emitted on selecting date**/
  @Event({ eventName: 'b2b-date-selected' })
  b2bDateSelected: EventEmitter<DateSelectedEventDetail>;
  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    const dates = this.getAllDates();
    let index = this.today.getDate() - 1;
    switch (event.key) {
      case keys.TAB:
        if (this.today.getMonth() === this.selectedMonth) {
          index = this.today.getDate() - 1;
        }
        break;
      case keys.ARROW_LEFT:
        index = dates.indexOf(this.getCurrentDate()) - 1;
        break;
      case keys.ARROW_RIGHT:
        index = dates.indexOf(this.getCurrentDate()) + 1;
        break;
      case keys.ARROW_UP:
        index = dates.indexOf(this.getCurrentDate()) - 7;
        break;
      case keys.ARROW_DOWN:
        index = dates.indexOf(this.getCurrentDate()) + 7;
        break;
      case keys.ENTER:
        index = dates.indexOf(this.getCurrentDate());
        if (dates[index].classList.contains('b2b-date-picker-day--disabled')) {
          return;
        }
        this.b2bDateSelected.emit({
          selectedDate: new Date(
            this.selectedYear,
            this.selectedMonth + 1,
            index + 1,
          ),
        });
        break;
      case keys.ESC:
        this.resetAllDates();
        this.b2bDatePickerEscape.emit();
        break;
      default:
        return;
    }

    if (index < 0) {
      index = dates.length - 1;
    }

    if (index > dates.length - 1) {
      index = 0;
    }

    this.focusCurrentDate(dates[index]);
  }

  private getCurrentDate = () => {
    const dates = this.getAllDates();
    return dates.find(el => el.getAttribute('tabindex') === '0');
  };

  private resetAllDates() {
    const dates = this.getAllDates();
    dates.forEach(element => {
      element.setAttribute('tabindex', '-1');
    });
  }

  private getAllDates = (): HTMLDivElement[] => {
    return Array.from(
      this.host.shadowRoot.querySelectorAll('.b2b-date-picker-day'),
    ) as HTMLDivElement[];
  };
  private focusCurrentDate = (date: HTMLDivElement) => {
    const dates = this.getAllDates();
    dates.forEach(element => {
      if (date.className.includes('b2b-date-picker-day--disabled')) {
        return;
      }
      element.setAttribute('tabindex', element === date ? '0' : '-1');
    });
    if (!date.className.includes('b2b-date-picker-day--disabled')) {
      date.focus();
    }
  };

  private handleClick = (event: MouseEvent) => {
    /** Remove focus from the clicked element */
    (event.target as HTMLDivElement).blur();
  };

  private renderDatePickerDays = () => {
    let daysInMonth = new Date(
      this.selectedYear,
      this.selectedMonth + 1,
      0,
    ).getDate(); /** Get total number of days in the current month */

    let actualFirstDayOfMonth = new Date(
      this.selectedYear,
      this.selectedMonth,
      1,
    ).getDay(); /** Get the day of the week (0-6) of the first day of the month */

    let firstDayOfMonth =
      actualFirstDayOfMonth == 0 ? 6 : actualFirstDayOfMonth - 1;
    let days = [];

    /** Populate the days before the first day of the month with empty divs. */
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div></div>);
    }

    /** Populate days array with day numbers. */
    for (let i = 1; i <= daysInMonth; i++) {
      let givenDate = new Date(this.selectedYear, this.selectedMonth, i);
      let disabled = DateUtils.isDisabledDate(givenDate, {
        disableDates: this.disableDates,
        disablePastDates: this.disablePastDates,
        disableFutureDates: this.disableFutureDates,
        disableWeekends: this.disableWeekends,
        todayWithoutTime: this.todayWithoutTime,
        disableEvery: this.disableEvery,
        disableDatesUntil: this.disableDatesUntil,
        disableDatesFrom: this.disableDatesFrom,
      });
      days.push(
        <div
          class={{
            'b2b-date-picker-day': true,
            'b2b-date-picker-day--disabled': disabled,
            'b2b-date-picker-day--today':
              givenDate.toDateString() === this.todayWithoutTime.toDateString(),
            'b2b-date-picker-day--selected':
              new Date(
                this.selectedYear,
                this.selectedMonth,
                this.selectedDay,
              ).toDateString() === givenDate.toDateString(),
          }}
          onClick={event => {
            this.b2bDateSelected.emit({
              selectedDate: new Date(this.selectedYear, this.selectedMonth, i),
            });
            this.handleClick(event);
          }}
          tabindex={
            givenDate.toDateString() === this.todayWithoutTime.toDateString()
              ? 0
              : -1
          }
          role="gridcell"
          aria-label={`Date ${i}  ${this.selectedMonth + 1}  ${
            this.selectedYear
          }`}>
          {i}
        </div>,
      );
    }

    return days;
  };

  render() {
    return (
      <Host>
        <div class="b2b-date-picker-days">{this.renderDatePickerDays()}</div>
      </Host>
    );
  }
}
