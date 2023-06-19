import {
  Component,
  h,
  Host,
  Prop,
  Event,
  EventEmitter,
  Method,
  State,
  Element,
} from '@stencil/core';
import {
  TableRowTypes,
  TableColourOptions,
  TableSizes,
} from '../../../utils/types/table.types';

@Component({
  tag: 'b2b-table-row',
  styleUrl: 'table-row.scss',
  shadow: true,
})
export class TableRowComponent {
  @Element() hostElement: HTMLB2bTableRowElement;

  /** Whether the row will be highlighted on mouse over **/
  @Prop() highlight: boolean = true;

  /** Background color of the row. Use it semantically. This color selection have hover states **/
  @Prop() color: TableColourOptions = 'default';

  /** Determined by the parent rowgroup for accordion rowgroups. Do not set manually. */
  @Prop() type: TableRowTypes;

  /** Emits if the parent rowgroup is an accordion and the row is a top-level accordion row. Determines if the child rows will be shown. */
  @Event({ eventName: 'b2b-open' })
  b2bOpen: EventEmitter<boolean>;

  @State() isOpen = false;

  private toggleOpen = () => {
    this.isOpen = !this.isOpen;
    this.b2bOpen.emit(this.isOpen);
  };

  /** Will toggle the accordion opened or closed. */
  @Method()
  async toggleAccordion(isOpen) {
    this.isOpen = isOpen;
    this.b2bOpen.emit(isOpen);
  }

  private getRowColor = () => {
    if (this.type === TableRowTypes.PARENT) return TableColourOptions.GROUP;
    return this.color;
  };

  private getParentTableSize = () => {
    const parentTable = this.hostElement.closest('b2b-table');
    return parentTable.getAttribute('size');
  };

  // This is needed for table size equal, so that control cell size remains as big
  // as the elements it contains. Feel free to improve this
  private getRowWidthForEqualSize = () => {
    const accordionIconSize = '24px';
    if (this.getParentTableSize() === TableSizes.EQUAL) {
      return accordionIconSize;
      // TODO: in B2BDS-166 selectable row - if table is selectable return size of checkbox
      // TODO: in B2BDS-166 selectable row -if cell is selectable and accordion return size of both
    }
  };

  render() {
    return (
      <Host
        class={{
          'b2b-table-row': true,
          ['b2b-table-row--highlight']: this.highlight,
          [`b2b-table-row--color-${this.getRowColor()}`]: true,
        }}
        role="row">
        {this.type === TableRowTypes.PARENT && (
          <b2b-table-cell>
            <button
              onClick={this.toggleOpen}
              class={{
                'b2b-table-row__accordion-icon': true,
                'b2b-table-row__accordion-icon--open': this.isOpen,
              }}>
              <b2b-icon icon="b2b_icon-arrow-right" clickable={true}></b2b-icon>
            </button>
          </b2b-table-cell>
        )}
        {this.type === TableRowTypes.CHILD && <b2b-table-cell></b2b-table-cell>}
        {this.type === TableRowTypes.HEADER && (
          <b2b-table-header
            style={{
              ['width']: this.getRowWidthForEqualSize(),
            }}></b2b-table-header>
        )}
        <slot></slot>
      </Host>
    );
  }
}
