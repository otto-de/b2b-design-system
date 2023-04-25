import { Component, h, Host, Prop } from '@stencil/core';
import { ContentAlignment, TableSizes } from '../types';
import { B2BTableColourOptions } from '../table-row/table-row';

@Component({
  tag: 'b2b-table-cell',
  styleUrl: 'table-cell.scss',
  shadow: true,
})
export class TableCellComponent {
  /** Weather text should wrap or truncate.
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
  @Prop() color: B2BTableColourOptions = 'default';

  render() {
    // TODO: test
    const useTextEllipsis = !this.textWrap && this.size === TableSizes.EQUAL;
    return (
      <Host
        class={{
          'b2b-table-cell': true,
          ['b2b-table-cell--ellipsis']: useTextEllipsis,
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
