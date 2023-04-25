import { Component, h, Host, Prop } from '@stencil/core';

export type B2BTableColourOptions = 'default' | 'selected' | 'group';

@Component({
  tag: 'b2b-table-row',
  styleUrl: 'table-row.scss',
  shadow: true,
})
export class TableRowComponent {
  /** Whether the row will be highlighted on mouse over **/
  @Prop() highlight: boolean = true;

  /** Background color of the row. Use it semantically. This color selection have hover states **/
  @Prop() color: B2BTableColourOptions = 'default';

  render() {
    return (
      <Host
        class={{
          'b2b-table-row': true,
          ['b2b-table-row-highlight']: this.highlight,
          [`b2b-table-row-color-${this.color}`]: true,
        }}
        role="row">
        <slot></slot>
      </Host>
    );
  }
}
