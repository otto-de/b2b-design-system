import type { ComponentInterface, EventEmitter } from '@stencil/core';
import {
  Component,
  Element,
  Event,
  h,
  Host,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import type {
  DateSelectedEventDetail,
  EscapePressed,
} from '../../utils/interfaces/form.interface';
import { dateAsNumber, Dateish, splitDate } from './date-range-picker-utils';

const keys = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  ESC: 'Escape',
  ENTER: 'Enter',
};

@Component({
  tag: 'b2b-date-range-picker-days',
  styleUrl: 'date-range-picker-days.scss',
  shadow: true,
})
export class B2bDatePickerDays implements ComponentInterface {
  // #region Properties
  /**
   * The root of this element.
   */
  @Element() host: HTMLB2bDateRangePickerDaysElement;

  /**
   * The currently shown date (year+month).
   */
  @Prop() viewedDate: Dateish = new Date();

  /**
   * The first date of the selection.
   * This may be absent if no dates have been selected yet.
   * This is always smaller/earlier than the second date.
   */
  @Prop() firstDate?: Dateish;
  /**
   * The second date of the selection.
   * This may be absent if none or only one date has been selected yet.
   * This is always bigger/later than the first date.
   */
  @Prop() secondDate?: Dateish;

  /**
   * Function used to determine, whether a day should be disabled e.g. because it is in the past.
   * This is only used for the start and end dates, it is valid to have a disabled day in the range of start and end date.
   *
   * @param day The day of the month to check (1-indexed).
   * @returns True, if the day should be disabled. False otherwise.
   *
   * @default (day) => false
   */
  @Prop() disableDates: (day: number) => boolean = () => false;

  /**
   * Whether the shown values are a preview and not the actual values (force-hover state).
   *
   * @default false
   */
  @Prop() preview: boolean = false;

  // #endregion
  // #region Events

  /**
   * Event emitted on escape press.
   */
  @Event({ eventName: 'b2b-date-picker-escape' })
  private b2bDatePickerEscape: EventEmitter<EscapePressed>;

  /**
   * Event emitted on selecting date.
   */
  @Event({ eventName: 'b2b-date-selected' })
  private b2bDateSelected: EventEmitter<DateSelectedEventDetail>;

  // #endregion
  // #region State

  @State() viewedDay: number = 0;

  // #endregion
  // #region Logic

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    const [year, month] = splitDate(this.viewedDate);
    let day = this.viewedDay;
    switch (event.key) {
      case keys.ARROW_LEFT:
        day -= 1;
        break;
      case keys.ARROW_RIGHT:
        day += 1;
        break;
      case keys.ARROW_UP:
        day -= 7;
        break;
      case keys.ARROW_DOWN:
        day += 7;
        break;
      case keys.ENTER:
        if (!this.disableDates(day)) {
          this.b2bDateSelected.emit({
            selectedDate: new Date(year, month - 1, day),
          });
        }
        return;
      case keys.ESC:
        this.b2bDatePickerEscape.emit();
        return;
      default:
        return;
    }

    const dates = this.getAllDates();
    if (day < 1) {
      day = dates.length;
    }

    if (day > dates.length) {
      day = 1;
    }

    if (this.disableDates(day)) {
      return;
    }

    this.viewedDay = day;

    this.focusCurrentDate(dates[day - 1]);
  }

  private getAllDates = (): HTMLDivElement[] => {
    return Array.from(
      this.host.shadowRoot.querySelectorAll('.b2b-date-range-picker-day'),
    ) as HTMLDivElement[];
  };

  private focusCurrentDate = (date: HTMLDivElement) => {
    const dates = this.getAllDates();
    dates.forEach(element => {
      if (date.className.includes('b2b-date-range-picker-day--disabled')) {
        return;
      }
      element.setAttribute('tabindex', element === date ? '0' : '-1');
    });
    if (!date.className.includes('b2b-date-range-picker-day--disabled')) {
      date.focus();
    }
  };

  private renderDatePickerDays = () => {
    const [year, month] = splitDate(this.viewedDate);
    const day = this.viewedDay;
    const currentNumber = dateAsNumber([year, month, day]);
    const todayNumber = dateAsNumber(new Date());
    const startNumber = dateAsNumber(this.firstDate);
    const endNumber = dateAsNumber(this.secondDate);
    let totalDaysInMonth = new Date(
      year,
      month - 1 + 1, // Next month
      0, // The day before
    ).getDate();

    let days = [];

    /** Populate the days before the first day of the month with empty divs. */
    let dayOfWeekOffset = (new Date(year, month - 1, 1).getDay() + 6) % 7; // +6 to make Monday the first day of the week
    for (let i = 0; i < dayOfWeekOffset; i++) {
      days.push(<div></div>);
    }

    /** Populate days array with day numbers. */
    for (let i = 1; i <= totalDaysInMonth; i++) {
      let givenDate = [year, month, i] as const;
      const givenDateNumber = dateAsNumber(givenDate);
      const disabled = this.disableDates(i);
      days.push(
        <div
          class={{
            'b2b-date-range-picker-day': true,
            'b2b-date-range-picker-day--disabled': disabled,
            'b2b-date-range-picker-day--today': givenDateNumber === todayNumber,
            'b2b-date-range-picker-day--selected':
              givenDateNumber === startNumber || givenDateNumber === endNumber,
            'b2b-date-range-picker-day--start':
              givenDateNumber === startNumber &&
              endNumber != null &&
              startNumber !== endNumber,
            'b2b-date-range-picker-day--end':
              givenDateNumber === endNumber && startNumber !== endNumber,
            'b2b-date-range-picker-day--preview':
              endNumber == null || this.preview,
            'b2b-date-range-picker-day--range':
              startNumber != null &&
              ((startNumber < givenDateNumber &&
                givenDateNumber < (endNumber ?? currentNumber)) ||
                (startNumber > givenDateNumber &&
                  givenDateNumber > (endNumber ?? currentNumber))),
          }}
          onClick={() => {
            if (!disabled) {
              this.b2bDateSelected.emit({
                selectedDate: new Date(year, month - 1, i),
              });
            }
          }}
          onMouseEnter={(event: MouseEvent) => {
            this.viewedDay = i;
            (event.target as HTMLElement).focus();
            event.preventDefault();
          }}
          tabindex={givenDateNumber === currentNumber ? 0 : -1}
          role="gridcell"
          aria-label={`Date ${i} ${month} ${year}`}>
          {i}
        </div>,
      );
    }

    return days;
  };

  private setFocusOnSelectedDayOrFirstDay() {
    const dates = this.getAllDates();
    if (dates.length > 0) {
      const [currentYear, currentMonth] = splitDate(this.viewedDate);
      const [selectedYear, selectedMonth, selectedDay] = splitDate(
        this.firstDate ?? new Date(),
      );

      if (
        currentYear == selectedYear &&
        currentMonth == selectedMonth &&
        this.viewedDay === selectedDay
      ) {
        this.focusCurrentDate(dates[this.viewedDay - 1]);
      } else {
        this.focusCurrentDate(dates[0]);
      }
    }
  }

  // #endregion
  // #region Component-Hooks

  componentWillLoad(): void {
    let [, , day] = splitDate(this.viewedDate);
    this.viewedDay = day;
  }

  componentDidLoad(): void {
    this.setFocusOnSelectedDayOrFirstDay();
  }

  render() {
    return (
      <Host>
        <div class="b2b-date-range-picker-days">
          {this.renderDatePickerDays()}
        </div>
      </Host>
    );
  }

  // #endregion
}
