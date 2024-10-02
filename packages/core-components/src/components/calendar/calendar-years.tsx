import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { YearSelectedEventDetail } from '../../utils/interfaces/interaction.interface';

const keys = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  ENTER: 'Enter',
};

@Component({
  tag: 'b2b-calendar-years',
  styleUrl: 'calendar-years.scss',
  shadow: true,
})
export class B2bCalendarYears {
  @Element() host: HTMLB2bCalendarYearsElement;
  /** Internal selected year */
  @Prop() selectedYear: number;

  @State() private yearsRange: number[] = [];

  /** Event emitted on selecting year**/
  @Event({ eventName: 'b2b-calendar-year-selected' })
  b2bCalendarYearSelected: EventEmitter<YearSelectedEventDetail>;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    let index = this.yearsRange.indexOf(this.selectedYear);
    const years = this.getAllYears();
    let currentYear = this.getCurrentYear();
    switch (event.key) {
      case keys.ARROW_LEFT:
        index = years.indexOf(currentYear) - 1;
        break;
      case keys.ARROW_RIGHT:
        index = years.indexOf(currentYear) + 1;
        break;
      case keys.ARROW_UP:
        index = years.indexOf(currentYear) - 3;
        break;
      case keys.ARROW_DOWN:
        index = years.indexOf(currentYear) + 3;
        break;
      case keys.ENTER:
        index = years.indexOf(currentYear);
        this.b2bCalendarYearSelected.emit({
          value: this.yearsRange[index],
        });
        break;
      default:
        return;
    }

    if (index < 0) {
      index = years.length - 1;
    }

    if (index > years.length - 1) {
      index = 0;
    }

    this.focusCurrentYear(years[index]);
  }

  componentWillLoad() {
    for (let i = 1900; i <= 2100; i++) {
      this.yearsRange.push(i);
    }
  }

  private getAllYears = (): HTMLDivElement[] => {
    return Array.from(
      this.host.shadowRoot.querySelectorAll('.b2b-calendar-year'),
    ) as HTMLDivElement[];
  };

  private getCurrentYear = () => {
    const years = this.getAllYears();
    return years.find(el => el.getAttribute('tabindex') === '0');
  };

  private focusCurrentYear = (year: HTMLDivElement) => {
    const years = this.getAllYears();
    years.forEach(el => {
      el.setAttribute('tabindex', el === year ? '0' : '-1');
    });
    year.focus();
  };

  private renderCalendarYears = () => {
    let years = [];
    for (const year of this.yearsRange) {
      years.push(
        <div
          class={{
            'b2b-calendar-year': true,
            'b2b-calendar-year--selected': this.selectedYear === year,
          }}
          onClick={() =>
            this.b2bCalendarYearSelected.emit({
              value: year,
            })
          }
          tabIndex={this.selectedYear === year ? 0 : -1}
          aria-label={`Year ${year}`}>
          {year}
        </div>,
      );
    }
    return years;
  };

  render() {
    return (
      <Host>
        <div class="b2b-calendar-years">{this.renderCalendarYears()}</div>
      </Host>
    );
  }
}
