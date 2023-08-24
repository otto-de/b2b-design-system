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

  private setCellSize() {
    const allCells = this.host.querySelectorAll('b2b-table-cell');
    [...allCells].map(cell => cell.setAttribute('size', this.size));
  }

  private setFixedHeaders() {
    const isScrollable = this.host.closest('b2b-scrollable-container') !== null;
    if (isScrollable) {
      const allHeaders = this.host.querySelectorAll('b2b-table-header');
      [...allHeaders].map(cell => cell.setAttribute('fixed', 'true'));
    }
  }

  componentDidRender() {
    this.setCellSize();
    this.setFixedHeaders();
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
