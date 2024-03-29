import {
  Component,
  h,
  Host,
  Element,
  Prop,
  State,
  Event,
  EventEmitter,
} from '@stencil/core';
import {
  TableSizes,
  TableSortDirections,
  SortIconAlignment,
  ContentAlignment,
} from '../../../utils/types/table.types';
import { setFlexBase } from '../utils';

@Component({
  tag: 'b2b-table-header',
  styleUrl: 'table-header.scss',
  shadow: true,
})
export class TableHeaderComponent {
  @Element() hostElement: HTMLB2bTableHeaderElement;

  /** adds a border to the right of the header. **/
  @Prop() divider: boolean = false;
  /** The size of the cell. Follows table size.
   * When size is equal and textWrap is false, the text will truncate with Ellipsis.
   * Other sizes won't affect cell current implementation.
   **/
  @Prop() size: TableSizes = TableSizes.EXPAND;

  /** @deprecated Use fixed on the rowgroup instead. Sets the header position to sticky. Use it when table is inside a scrollable container. **/
  @Prop() fixed: boolean = false;

  /** The direction in which the column data is sorted. Per default, it is unsorted and no button is visible. If your data comes presorted, you need to adjust this. */
  @Prop({ reflect: true, mutable: true }) sortDirection: TableSortDirections;

  /** Optional string to uniquely represent the header, this id will be emitted by the table b2b-sort-change event. If not provided, the event will emit the header textContent. */
  @Prop() sortId?: string;

  /** The width of the column. Increase it to change the size of the column relative to other columns. */
  @Prop() colspan?: number;

  /** Alignment of the content of the cell, by default is to the left. **/
  @Prop() contentAlign: ContentAlignment = ContentAlignment.LEFT;

  /** @internal number of total columns per row */
  @Prop() totalCols?: number;

  /** Emits whenever the sort direction changes. */
  @Event({ eventName: 'b2b-change' })
  b2bChange: EventEmitter<TableSortDirections>;

  @State() active = false;

  @State() iconAlign: SortIconAlignment;

  private setIconPlacement = () => {
    switch (this.contentAlign) {
      case ContentAlignment.LEFT:
        this.iconAlign = SortIconAlignment.RIGHT;
        break;
      case ContentAlignment.RIGHT:
        this.iconAlign = SortIconAlignment.LEFT;
        break;
      case ContentAlignment.CENTER:
        this.iconAlign = SortIconAlignment.RIGHT;
        break;
    }
  };

  private changeSortDirection = (e: any) => {
    if ((e.type === 'keydown' && e.key === 'Enter') || e.type === 'click') {
      this.unSortSiblings();
      this.setActive();
      switch (this.sortDirection) {
        case 'not-sorted':
          this.sortDirection = TableSortDirections.ASC;
          break;
        case 'descending':
          this.sortDirection = TableSortDirections.ASC;
          break;
        case 'ascending':
          this.sortDirection = TableSortDirections.DESC;
          break;
        default:
          break;
      }
      this.b2bChange.emit(this.sortDirection);
    }
  };

  private unSortSiblings = () => {
    const parent = this.hostElement.closest('b2b-table-row');
    const siblings = Array.from(
      parent.querySelectorAll('b2b-table-header'),
    ).filter(el => el != this.hostElement) as HTMLB2bTableHeaderElement[];

    siblings.forEach(sibling => {
      if (sibling.sortDirection !== undefined) {
        sibling.sortDirection = 'not-sorted';
      }
    });
  };

  private setActive = () => {
    this.active = true;
  };

  private setInactive = () => {
    this.active = false;
  };

  componentWillLoad() {
    if (this.size === TableSizes.COLSPAN) {
      const rowGroup = this.hostElement.closest(
        'b2b-table-rowgroup',
      ) as HTMLB2bTableRowgroupElement;
      setFlexBase(
        this.hostElement,
        this.colspan,
        this.totalCols,
        rowGroup.selectable,
        rowGroup.accordion,
      );
    }
  }

  componentWillRender() {
    this.setIconPlacement();
  }

  render() {
    return (
      <Host
        class={{
          [`b2b-table-header--${this.sortDirection && this.iconAlign}`]: true,
          'b2b-table-header--divider': this.divider,
          [`b2b-table-header--${this.size}`]: true,
        }}
        style={{
          'flex-grow': `${this.colspan}`,
        }}
        role="columnheader"
        aria-sort={
          this.sortDirection === 'not-sorted' ||
          this.sortDirection === undefined
            ? 'other'
            : this.sortDirection
        }>
        {this.sortDirection !== undefined ? (
          <div
            tabIndex={0}
            class={{
              'b2b-table-header__heading': true,
              [`b2b-table-header__heading--${this.contentAlign}`]: true,
              'b2b-table-header__sort--active': this.active,
            }}
            onClick={this.changeSortDirection}
            onKeyDown={this.changeSortDirection}
            onMouseLeave={this.setInactive}
            onBlur={this.setInactive}>
            <slot></slot>
            <svg
              class={{
                'b2b-table-header__sort': true,
                [`b2b-table-header__sort--${this.sortDirection}`]: true,
                [`b2b-table-header__sort--${this.iconAlign}`]: true,
              }}
              viewBox="0 0 24 24"
              height="24px"
              width="24px"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M19.1831 8.47552L12.8541 2.14703C12.8079 2.10065 12.7524 2.06384 12.6909 2.03839C12.5687 1.98785 12.4313 1.98785 12.3091 2.03839C12.2476 2.06384 12.1921 2.10065 12.1459 2.14703L5.81689 8.47552C5.62158 8.67084 5.62158 8.98724 5.81689 9.18256C6.01221 9.37787 6.32861 9.37787 6.52393 9.18256L12 3.70691V21.4999C12 21.7763 12.2236 21.9999 12.5 21.9999C12.7764 21.9999 13 21.7763 13 21.4999V3.70691L18.4761 9.18256C18.5737 9.28021 18.7017 9.32904 18.8296 9.32904C18.9575 9.32904 19.0854 9.28021 19.1831 9.18256C19.3784 8.98724 19.3784 8.67084 19.1831 8.47552Z" />
            </svg>
          </div>
        ) : (
          <slot></slot>
        )}
      </Host>
    );
  }
}
