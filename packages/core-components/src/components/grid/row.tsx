import { Component, Prop, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'b2b-grid-row',
  shadow: true,
})
export class B2bGridRowComponent {
  @Element() hostElement: HTMLB2bGridRowElement;

  @Prop() columnGap: number = 24;
  @Prop() rowGap: number = 24;
  @Prop() alignItems: 'stretch' | 'flex-start' | 'center' | 'flex-end' =
    'stretch';
  @Prop() justify:
    | 'start'
    | 'end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly' = 'start';

  componentDidLoad() {
    this.adjustColumnFlex();
  }

  private adjustColumnFlex() {
    const columns = Array.from(
      this.hostElement.querySelectorAll(':scope > b2b-grid-col'),
    ) as HTMLElement[];

    let rows: HTMLElement[][] = [];
    let currentRow: HTMLElement[] = [];
    let currentRowSpan = 0;

    columns.forEach(column => {
      const span = column.hasAttribute('span')
        ? parseInt(column.getAttribute('span'), 10)
        : null;

      if (span !== null) {
        if (currentRowSpan + span > 12 && currentRow.length > 0) {
          rows.push(currentRow);
          currentRow = [];
          currentRowSpan = 0;
        }
        currentRow.push(column);
        currentRowSpan += span;
      } else {
        if (currentRowSpan > 0) {
          const remainingSpan = 12 - currentRowSpan;
          if (remainingSpan <= 0) {
            rows.push(currentRow);
            currentRow = [];
            currentRowSpan = 0;
          }
        }
        currentRow.push(column);
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    rows.forEach(row => {
      const totalSpan = row.reduce((sum, col) => {
        return (
          sum +
          (col.hasAttribute('span')
            ? parseInt(col.getAttribute('span'), 10)
            : 0)
        );
      }, 0);

      const remainingSpan = 12 - totalSpan;
      const unspannedColumns = row.filter(col => !col.hasAttribute('span'));

      if (unspannedColumns.length > 0 && remainingSpan > 0) {
        const spanPerColumn = Math.max(
          1,
          Math.floor(remainingSpan / unspannedColumns.length),
        );
        unspannedColumns.forEach(col => {
          col.setAttribute('span', spanPerColumn.toString());
        });
      }

      const columnCount = row.length;

      row.forEach(column => {
        const span = parseInt(column.getAttribute('span'), 10) || 1;
        const widthPercentage = (span / 12) * 100;

        column.style.flex = `0 0 calc(${widthPercentage}% - ${
          this.columnGap * (1 - 1 / columnCount)
        }px)`;
        column.style.maxWidth = `calc(${widthPercentage}% - ${
          this.columnGap * (1 - 1 / columnCount)
        }px)`;
      });
    });
  }

  render() {
    return (
      <Host
        style={{
          'justify-content': this.justify,
          'gap': `${this.columnGap}px`,
          'margin': `${this.rowGap}px 0`,
          'align-items': this.alignItems,
          'display': 'flex',
          'flex-wrap': 'wrap',
          'box-sizing': 'border-box',
        }}>
        <slot></slot>
      </Host>
    );
  }
}
