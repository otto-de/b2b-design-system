import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import {
  EscapePressed,
  YearSelectedEventDetail,
} from '../../utils/interfaces/form.interface';

const keys = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  ENTER: 'Enter',
  ESC: 'Escape',
};

@Component({
  tag: 'b2b-date-picker-years',
  styleUrl: 'date-picker-years.scss',
  shadow: true,
})
export class B2bDatePickerYears implements ComponentInterface {
  @Element() host: HTMLB2bDatePickerYearsElement;
  /** Internal selected year */
  @Prop() selectedYear: number;

  @State() private yearsRange = Array.from({ length: 201 }, (_, i) => i + 1900); // 1900 - 2100

  /** Event emitted on selecting year**/
  @Event({ eventName: 'b2b-date-picker-year-selected' })
  b2bDatePickerYearSelected: EventEmitter<YearSelectedEventDetail>;

  /** Event emitted on escape press**/
  @Event({ eventName: 'b2b-date-picker-escape' })
  b2bDatePickerEscape: EventEmitter<EscapePressed>;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    const years = this.getAllYears();
    let currentYear = this.getCurrentYear();
    let index = years.indexOf(currentYear);
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
        this.b2bDatePickerYearSelected.emit({
          value: this.yearsRange[index],
        });
        return;
      case keys.ESC:
        this.b2bDatePickerEscape.emit();
        return;
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

  componentDidLoad() {
    if (this.selectedYear > 0) {
      this.scrollToYear(this.selectedYear);
      this.getCurrentYear().focus();
    }
  }

  private getAllYears = (): HTMLDivElement[] => {
    return Array.from(
      this.host.shadowRoot.querySelectorAll('.b2b-date-picker-year'),
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

  private scrollToYear = (year: number) => {
    const grid = this.host.shadowRoot.querySelector(
      '.b2b-date-picker-years',
    ) as HTMLDivElement;
    if (grid !== null) {
      const yearElements = grid.children;
      const startYear = this.yearsRange[0];
      const index = year - startYear;

      if (index >= 0 && index < yearElements.length) {
        const rowGap = 10;
        const rowHeight =
          (yearElements[0] as HTMLDivElement).offsetHeight + rowGap;
        const rowIndex = Math.floor(index / 3);
        // Show two rows of years above the row with the selected year
        grid.scrollTop = rowIndex * rowHeight - rowHeight * 2;
      }
    }
  };

  private renderDatePickerYears = () => {
    let years = [];
    for (const year of this.yearsRange) {
      years.push(
        <div
          class={{
            'b2b-date-picker-year': true,
            'b2b-date-picker-year--selected': this.selectedYear === year,
          }}
          onClick={() =>
            this.b2bDatePickerYearSelected.emit({
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
        <div class="b2b-date-picker-years">{this.renderDatePickerYears()}</div>
      </Host>
    );
  }
}
