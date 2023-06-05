import {
  Component,
  h,
  Host,
  Prop,
  Event,
  EventEmitter,
  State,
} from '@stencil/core';
import { TableRowTypes, TableColourOptions } from '../types';

@Component({
  tag: 'b2b-table-row',
  styleUrl: 'table-row.scss',
  shadow: true,
})
export class TableRowComponent {
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

  render() {
    return (
      <Host
        class={{
          'b2b-table-row': true,
          'b2b-table-row--accordion-parent': this.type === TableRowTypes.PARENT,
          ['b2b-table-row-highlight']: this.highlight,
          [`b2b-table-row-color-${this.color}`]: true,
        }}
        role="row">
        {this.type === TableRowTypes.PARENT && (
          <b2b-table-cell>
            <button
              onClick={this.toggleOpen}
              class={{
                'b2b-table-row--accordion-icon': true,
                'b2b-table-row--accordion-icon-open': this.isOpen,
              }}>
              <b2b-icon icon="b2b_icon-arrow-right" clickable={true}></b2b-icon>
            </button>
          </b2b-table-cell>
        )}
        {this.type === TableRowTypes.CHILD && <b2b-table-cell></b2b-table-cell>}
        {this.type === TableRowTypes.HEADER && (
          <b2b-table-header></b2b-table-header>
        )}
        <slot></slot>
      </Host>
    );
  }
}
