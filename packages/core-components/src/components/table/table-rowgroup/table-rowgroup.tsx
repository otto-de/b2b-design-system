import { Component, h, Element, Host, Prop } from '@stencil/core';
import { TableRowgroupTypes } from '../types';

@Component({
  tag: 'b2b-table-rowgroup',
  styleUrl: 'table-rowgroup.scss',
  shadow: true,
})
export class TableRowgroupComponent {
  @Element() host: HTMLB2bTableRowgroupElement;
  /** Rowgroup allows grouping rows by context: header, body or footer.
   * Header rows are by default not highlightable on mouse over.
   **/
  @Prop() type: TableRowgroupTypes = TableRowgroupTypes.HEADER;

  private makeHeaderRowNotSelectable() {
    const firstRow = this.host.querySelector('b2b-table-row');
    if (firstRow != null && this.type === TableRowgroupTypes.HEADER) {
      firstRow.setAttribute('highlight', 'false');
    }
  }

  componentDidRender() {
    this.makeHeaderRowNotSelectable();
  }

  render() {
    return (
      <Host
        class={{
          ['b2b-table-rowgroup--' + this.type]: true,
        }}
        role="rowgroup">
        <slot></slot>
      </Host>
    );
  }
}
