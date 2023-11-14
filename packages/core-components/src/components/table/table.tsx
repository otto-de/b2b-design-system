import {
  Component,
  h,
  Element,
  Host,
  Prop,
  Listen,
  Event,
  EventEmitter,
} from '@stencil/core';
import { TableSizes, TableSortDirections } from '../../utils/types/table.types';
import { ColumnSortChangeEventDetail } from '../../utils/interfaces/interaction.interface';
import { getFirstRow, getAllRows, getRemainingRows } from './utils';
@Component({
  tag: 'b2b-table',
  styleUrl: 'table.scss',
  shadow: true,
})
export class TableComponent {
  @Element() host: HTMLB2bTableElement;
  /** The size of the table. Both will expand to 100% of parent size.
   * Expand cells will use as much space as content needs and text will wrap.
   * Equal will keep all column sizes proportional to the number of columns.
   **/
  @Prop() size: TableSizes = TableSizes.EXPAND;

  /** Emits whenever the sort direction of any column in the table changes. */
  @Event({ eventName: 'b2b-sort-change' })
  b2bSortChange: EventEmitter<ColumnSortChangeEventDetail>;

  @Listen('b2b-change')
  onColumnSelected(event) {
    if (event.target.nodeName === 'B2B-TABLE-HEADER') {
      this.b2bSortChange.emit({
        sortedColumn: event.target.sortId || event.target.textContent.trim(),
        sortDirection: event.detail,
      });
    }
  }

  private getAllCellsByRow = (
    row: HTMLB2bTableRowElement,
  ): HTMLB2bTableCellElement[] | HTMLB2bTableHeaderElement[] => {
    return Array.from(row.children) as any[];
  };

  private getColumnById = (id: string): Element[] => {
    return Array.from(this.host.querySelectorAll('b2b-table-cell')).filter(
      cell => cell.id === id,
    );
  };

  // TO DO: Get maximum width of a given column so that and set all cells in the column to max width if size is expand

  /** Add column ids to set cell width for a given column */
  private setColumns = () => {
    getAllRows(this.host).forEach(row => {
      this.getAllCellsByRow(row).forEach((cell, id) => {
        cell.column = String(id);
      });
    });
  };

  private setCellSize() {
    getAllRows(this.host).forEach(row => {
      this.getAllCellsByRow(row).forEach(cell => {
        cell.setAttribute('size', this.size);
      });
    });
  }

  /** Set flex-basis to header width in scrollable containers with fixed width.
   * Should probably be a utils function so we can also use it in the header component
   * to mimick expand styles
   */
  private setFixedHeaders() {
    const isScrollable = this.host.closest('b2b-scrollable-container') !== null;
    if (isScrollable) {
      const allHeaders = this.getAllCellsByRow(getFirstRow(this.host));
      const remainingRows = getRemainingRows(this.host);

      allHeaders.forEach(cell => {
        cell.style.flex = `0 0 ${cell.style.width}`;
      });

      remainingRows.forEach(row => {
        this.getAllCellsByRow(row).forEach((cell, id) => {
          cell.style.flex = `0 0 ${allHeaders[id].style.width}`;
        });
      });
    }
  }

  componentWillRender() {
    this.setCellSize();
    this.setColumns();
  }

  componentDidLoad() {
    const tableHeaders = this.host.querySelectorAll('b2b-table-header');
    const sortedHeaders = Array.from(tableHeaders).filter(header => {
      return (
        header.sortDirection !== TableSortDirections.NOT &&
        header.sortDirection !== undefined
      );
    });
    if (sortedHeaders.length > 1) {
      console.warn(
        `<b2b-table> warning: Only one header can be sorted at the time. The others should be defined as 'not-sorted'. This issue was found in this table element:`,
      );
      console.log(this.host);
    }
    this.setFixedHeaders();
  }

  render() {
    return (
      <Host
        class={{
          ['b2b-table--' + this.size]: true,
        }}
        role="table">
        <slot></slot>
      </Host>
    );
  }
}
