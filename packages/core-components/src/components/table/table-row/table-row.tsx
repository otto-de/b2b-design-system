import {
  Component,
  h,
  Host,
  Prop,
  Event,
  EventEmitter,
  State,
} from '@stencil/core';

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

  /** Determined by the parent rowgroup for accordion rowgroups. Do not set manually. */
  @Prop() accordionParent = false;

  /** Determined by the parent rowgroup for accordion rowgroups. Do not set manually. */
  @Prop() accordionChild = false;

  /** Determined by the parent rowgroup for accordion rowgroups. Do not set manually. */
  @Prop() accordionHeader = false;

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
          'b2b-table-row--accordion-parent': this.accordionParent,
          ['b2b-table-row-highlight']: this.highlight,
          [`b2b-table-row-color-${this.color}`]: true,
        }}
        role="row">
        {this.accordionParent && (
          <b2b-table-cell onClick={this.toggleOpen}>
            <div
              class={{
                'b2b-table-row--accordion-icon': true,
                'b2b-table-row--accordion-icon-closed': !this.isOpen,
                'b2b-table-row--accordion-icon-open': this.isOpen,
              }}>
              <b2b-icon icon="b2b_icon-arrow-right"></b2b-icon>
            </div>
          </b2b-table-cell>
        )}
        {this.accordionChild && <b2b-table-cell></b2b-table-cell>}
        {this.accordionHeader && <b2b-table-header></b2b-table-header>}
        <slot></slot>
      </Host>
    );
  }
}
