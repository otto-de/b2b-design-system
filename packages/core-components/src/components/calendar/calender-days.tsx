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
import {
  DateSelectedEventDetail,
  EscapePressed,
} from '../../utils/interfaces/form.interface';

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
  tag: 'b2b-calender-days',
  styleUrl: 'calender-days.scss',
  shadow: true,
})
export class B2bCalenderDays {
  @Element() host: HTMLB2bCalenderDaysElement;
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
  @State() disabled: boolean = false;
  private today = new Date();
  private todayWithoutTime = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate(),
  );

  @Event({ eventName: 'b2b-calender-escape' })
  b2bCalenderEscape: EventEmitter<EscapePressed>;

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
        } else {
          index = 0;
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
        if (dates[index].classList.contains('b2b-calender-day--disabled')) {
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
        this.b2bCalenderEscape.emit();
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
      this.host.shadowRoot.querySelectorAll('.b2b-calender-day'),
    ) as HTMLDivElement[];
  };
  private focusCurrentDate = (date: HTMLDivElement) => {
    const dates = this.getAllDates();
    dates.forEach(element => {
      if (date.className.includes('b2b-calender-day--disabled')) {
        return;
      }
      element.setAttribute('tabindex', element === date ? '0' : '-1');
    });
    if (!date.className.includes('b2b-calender-day--disabled')) {
      date.focus();
    }
  };

  private isDisabledDate = (givenDate: Date) => {
    if (this.disablePastDates) {
      if (givenDate < this.todayWithoutTime) return true;
    } else if (this.disableFutureDates) {
      if (givenDate > this.todayWithoutTime) return true;
    } else if (this.disableWeekends) {
      if (givenDate.getDay() == 0 || givenDate.getDay() == 6) return true;
    } else {
      return false;
    }
  };

  private handleClick = (event: MouseEvent) => {
    /** Remove focus from the clicked element */
    (event.target as HTMLDivElement).blur();
  };

  private renderCalenderDays = () => {
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
      let disabled = this.isDisabledDate(givenDate);
      days.push(
        <div
          class={{
            'b2b-calender-day': true,
            'b2b-calender-day--disabled': disabled,
            'b2b-calender-day--today':
              givenDate.toDateString() === this.todayWithoutTime.toDateString(),
            'b2b-calender-day--selected':
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
        <div class="b2b-calender-days">{this.renderCalenderDays()}</div>
      </Host>
    );
  }
}
