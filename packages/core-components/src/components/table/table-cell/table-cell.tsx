import { Component, h, Host, Prop, Element, State } from '@stencil/core';
import {
  ContentAlignment,
  TableSizes,
  TableColourOptions,
} from '../../../utils/types/table.types';

@Component({
  tag: 'b2b-table-cell',
  styleUrl: 'table-cell.scss',
  shadow: true,
})
export class TableCellComponent {
  @Element() host: HTMLB2bTableCellElement;
  /** Whether text should wrap or truncate.
   * It will only truncate when table size is equal
   * **/
  @Prop({ reflect: true }) textWrap: boolean = true;
  /** The size of the cell. Follows table size.
   * When size is equal and textWrap is false, the text will truncate with Ellipsis.
   * Other sizes won't affect cell current implementation.
   **/
  @Prop() size: TableSizes = TableSizes.EXPAND;
  // TODO: test via visual tests - storybook story
  /** Alignment of the content of the cell, by default is to the left. **/
  @Prop() align: ContentAlignment = ContentAlignment.LEFT;

  /** adds a border to the right of the cell. **/
  @Prop() divider: boolean = false;

  /** Background color of the cell. This color selection does not have hover states, as it is handled from the row**/
  @Prop() color: TableColourOptions = 'default';
  @Prop() colspan?: string;

  @State() useTextEllipsis = false;

  private expandTextHoverWaitTime = 600;
  private expandTextHoverTimeoutId;

  componentWillRender() {
    this.useTextEllipsis = !this.textWrap && this.size === TableSizes.EQUAL;
  }

  private addExpandStyles = () => {
    this.expandTextHoverTimeoutId = setTimeout(() => {
      const contentLength = this.host.innerText.length;
      const children = this.host.children.length;
      if (this.useTextEllipsis && contentLength > 25 && children === 0) {
        this.host.style.width = `calc(${this.host.offsetWidth}px - 24px)`;
        this.host.classList.add('b2b-table-cell--expand-text');
      }
    }, this.expandTextHoverWaitTime);
  };

  private removeExpandStyles = () => {
    this.expandTextHoverTimeoutId &&
      clearTimeout(this.expandTextHoverTimeoutId);
    this.host.classList.remove('b2b-table-cell--expand-text');
  };

  render() {
    return (
      <Host
        onMouseEnter={this.addExpandStyles}
        onMouseLeave={this.removeExpandStyles}
        style={{ 'flex-grow': this.colspan }}
        class={{
          'b2b-table-cell': true,
          ['b2b-table-cell--ellipsis']: this.useTextEllipsis,
          ['b2b-table-cell--' + this.align]: true,
          ['b2b-table-cell--divider']: this.divider,
          [`b2b-table-cell-color-${this.color}`]: true,
        }}
        role="cell">
        <slot></slot>
      </Host>
    );
  }
}
