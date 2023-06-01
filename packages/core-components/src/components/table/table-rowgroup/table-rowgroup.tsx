import { Component, h, Element, Host, Prop, Listen } from '@stencil/core';
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

  /** Renders the rowgroup as an accordion. Both header and body must have accordion set to true.
   * One table can contain multiple rowgroups of type body, each of which represents an accordion row with children.
   */
  @Prop() accordion = false;

  @Listen('b2b-open')
  handleOpenChange(event: any) {
    this.toggleChildRowVisibility(event.detail);
  }

  private getFirstRow = () => {
    const firstRow = this.host.querySelector('b2b-table-row');
    if (firstRow != null) {
      return firstRow as HTMLB2bTableRowElement;
    }
  };

  private getRemainingRows = () => {
    const children = Array.from(this.host.querySelectorAll('b2b-table-row'));
    return Array.from(children.slice(1));
  };

  private makeHeaderRowNotSelectable() {
    const firstRow = this.getFirstRow();
    if (this.type === TableRowgroupTypes.HEADER) {
      firstRow.setAttribute('highlight', 'false');
    }
  }

  private addControlColumn = () => {
    const children = this.getRemainingRows();
    children.forEach(child => {
      child.setAttribute('type', 'child');
    });

    const firstRow = this.getFirstRow();

    if (this.type === 'header') {
      firstRow.setAttribute('type', 'header');
    } else {
      firstRow.setAttribute('type', 'parent');
    }
  };

  private toggleChildRowVisibility = (isOpen: boolean) => {
    const children = this.getRemainingRows();

    if (isOpen) {
      children.forEach(child => {
        child.style.visibility = 'visible';
      });
    } else {
      children.forEach(child => {
        child.style.visibility = 'collapse';
      });
    }
  };

  componentWillLoad() {
    if (this.accordion) {
      this.addControlColumn();
      this.toggleChildRowVisibility(false);
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
