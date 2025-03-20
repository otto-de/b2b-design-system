import { Component, Prop, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'b2b-grid-row',
  shadow: true,
})
export class B2bGridRowComponent {
  @Element() hostElement: HTMLB2bGridRowElement;

  /** The spacing in between individual columns in px. The higher the gap, the smaller the columns will be. */
  @Prop() columnGap: number = 24;

  /** The spacing between individual rows in px. */
  @Prop() rowGap: number = 24;

  /** Vertical alignment of columns. This requires the row to have a defined height. */
  @Prop() alignItems: 'stretch' | 'flex-start' | 'center' | 'flex-end' =
    'stretch';

  /** Horizontal alignment of columns. */
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

  private calculateRowsAndsSpaceForColumnsWithSpan(
    columns: HTMLElement[],
    currentRowTotal: number,
    rows: HTMLElement[][],
    currentRow: HTMLElement[],
  ) {
    columns.forEach(column => {
      let span = parseInt(column.getAttribute('span'), 10);

      if (currentRowTotal + span > 12) {
        rows.push(currentRow);
        currentRow = [];
        currentRowTotal = 0;
      }

      currentRow.push(column);
      currentRowTotal += span;
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
  }

  private adjustColumnFlex() {
    const columns = this.hostElement.querySelectorAll(':scope > b2b-grid-col');
    let totalSpan = 0;
    let columnsWithoutSpan: HTMLElement[] = [];
    let columnsWithSpan: HTMLElement[] = [];

    columns.forEach((column: any) => {
      const span = column.getAttribute('span');
      if (span) {
        totalSpan += parseInt(span, 10);
        columnsWithSpan.push(column);
      } else {
        columnsWithoutSpan.push(column);
      }
    });

    if (totalSpan > 12 && columnsWithoutSpan.length === 0) {
      this.handleOverflowingColumns(columnsWithSpan);
      return;
    }

    if (columnsWithoutSpan.length > 0) {
      this.handleRowsWithColumnsWithoutSpan(
        columnsWithoutSpan,
        columnsWithSpan,
        totalSpan,
      );
      return;
    }

    if (totalSpan < 12 && columnsWithoutSpan.length === 0) {
      this.handleNonOverflowingColumnsWithSpan(columnsWithSpan);
      return;
    }
  }

  private handleNonOverflowingColumnsWithSpan(columnsWithSpan: HTMLElement[]) {
    columnsWithSpan.forEach(column => {
      let span = parseInt(column.getAttribute('span'), 10);
      let widthPercentage = (span / 12) * 100;

      column.style.flex = `0 0 calc(${widthPercentage}% - ${this.columnGap}px)`;
      column.style.maxWidth = `calc(${widthPercentage}% - ${this.columnGap}px)`;
    });
  }

  private handleOverflowingColumns(columns: HTMLElement[]) {
    let rows: HTMLElement[][] = [];
    let currentRow: HTMLElement[] = [];
    let currentRowTotal = 0;
    this.calculateRowsAndsSpaceForColumnsWithSpan(
      columns,
      currentRowTotal,
      rows,
      currentRow,
    );

    rows.forEach(row => {
      row.forEach(column => {
        let span = parseInt(column.getAttribute('span'), 10);
        let widthPercentage = (span / 12) * 100;

        column.style.flex = `0 0 calc(${widthPercentage}% - ${this.columnGap}px)`;
        column.style.maxWidth = `calc(${widthPercentage}% - ${this.columnGap}px)`;
      });
    });
  }

  private handleRowsWithColumnsWithoutSpan(
    columnsWithoutSpan: HTMLElement[],
    columnsWithSpan: HTMLElement[],
    totalSpan: number,
  ) {
    let remainingSpan = 12 - totalSpan <= 0 ? 12 : 12 - totalSpan;
    let rows: HTMLElement[][] = [];
    let currentRow: HTMLElement[] = [];
    let currentRowTotal = 0;

    this.calculateRowsAndsSpaceForColumnsWithSpan(
      columnsWithSpan,
      currentRowTotal,
      rows,
      currentRow,
    );

    columnsWithoutSpan.forEach(column => {
      let spanPerColumn = Math.max(
        1,
        Math.floor(remainingSpan / columnsWithoutSpan.length),
      );

      if (currentRowTotal + spanPerColumn > 12) {
        rows.push(currentRow);
        currentRow = [];
        currentRowTotal = 0;
      }

      column.setAttribute('span', spanPerColumn.toString());
      currentRow.push(column);
      currentRowTotal += spanPerColumn;
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    rows.forEach(row => {
      row.forEach(column => {
        let span = parseInt(column.getAttribute('span'), 10) || 1;
        let widthPercentage = (span / 12) * 100;

        column.style.flex = `0 0 calc(${widthPercentage}% - ${this.columnGap}px)`;
        column.style.maxWidth = `calc(${widthPercentage}% - ${this.columnGap}px)`;
      });
    });
  }

  render() {
    return (
      <Host
        style={{
          ['justify-content']: `${this.justify}`,
          ['gap']: `${this.columnGap}px`,
          ['margin']: `${this.rowGap}px 0`,
          ['align-items']: `${this.alignItems}`,
          ['display']: 'flex',
          ['flex-wrap']: 'wrap',
          ['box-sizing']: 'border-box',
        }}>
        <slot></slot>
      </Host>
    );
  }
}
