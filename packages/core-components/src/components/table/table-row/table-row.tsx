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
  TableAccordionRowTypes,
  TableCheckboxTypes,
  TableColourOptions,
} from '../../../utils/types/table.types';
import {
  B2bCheckboxCustomEvent,
  CheckboxEventDetail,
} from '../../../components';

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
  @Prop() accordionType: TableAccordionRowTypes;

  /** Determined by the parent rowgroup for selectable rowgroups. Do not set manually. */
  @Prop() checkboxType: TableCheckboxTypes;

  /** The unique identifier for a selectable row. It is emitted when the row is selected. */
  @Prop() value?: string;

  /** If a selectable row is a parent for an accordion, it becomes indeterminate when some of it's children are checked, but not all. */
  @Prop() indeterminate = false;

  /** If a selectable row is currently checked. Per default, it is false. */
  @Prop({ mutable: true }) checked = false;

  /** Emits if the parent rowgroup is an accordion and the row is a top-level accordion row. Determines if the child rows will be shown. */
  @Event({ eventName: 'b2b-open' })
  b2bOpen: EventEmitter<boolean>;

  /** Emits if the row is selectable and it is selected or unselected. Emits both unique value and the checkbox status. */
  @Event({ eventName: 'b2b-row-selected' })
  b2bSelected: EventEmitter<CheckboxEventDetail>;

  @State() isOpen = false;

  private toggleOpen = () => {
    this.isOpen = !this.isOpen;
    this.b2bOpen.emit(this.isOpen);
  };

  private toggleSelected = (
    event: B2bCheckboxCustomEvent<CheckboxEventDetail>,
  ) => {
    this.checked = event.detail.checked;
    this.b2bSelected.emit({
      checked: event.detail.checked,
      value: event.detail.value,
    });
  };

  /** Will toggle the accordion opened or closed. */
  @Method()
  async toggleAccordion(isOpen: boolean) {
    this.isOpen = isOpen;
    this.b2bOpen.emit(isOpen);
  }

  private getRowColor = () => {
    if (this.accordionType === TableAccordionRowTypes.PARENT)
      return TableColourOptions.GROUP;
    return this.color;
  };

  private getRowWidth = () => {
    const accordionIconSize = '24px';
    const checkboxSize = '16px';
    if (Boolean(this.accordionType)) {
      return accordionIconSize;
    } else if (Boolean(this.checkboxType)) {
      return checkboxSize;
    } else if (Boolean(this.accordionType && this.checkboxType)) {
      return accordionIconSize + checkboxSize;
    } else {
      return;
    }
  };

  private getAccordionColumns = () => {
    if (this.accordionType != undefined) {
      switch (this.accordionType) {
        case TableAccordionRowTypes.HEADER:
          return (
            <b2b-table-header
              style={{
                ['width']: this.getRowWidth(),
              }}></b2b-table-header>
          );
        case TableAccordionRowTypes.PARENT:
          return (
            <b2b-table-cell>
              <button
                onClick={this.toggleOpen}
                class={{
                  'b2b-table-row__accordion-icon': true,
                  'b2b-table-row__accordion-icon--open': this.isOpen,
                }}>
                <b2b-icon
                  icon="b2b_icon-arrow-right"
                  clickable={true}></b2b-icon>
              </button>
            </b2b-table-cell>
          );
        case TableAccordionRowTypes.CHILD:
          return <b2b-table-cell></b2b-table-cell>;
      }
    }
  };

  private getCheckBoxColumns = () => {
    if (this.checkboxType != undefined) {
      switch (this.checkboxType) {
        case TableCheckboxTypes.HEADER:
          return (
            <b2b-table-header
              style={{
                ['width']: this.getRowWidth(),
              }}>
              <b2b-checkbox
                standalone
                checked={this.checked}
                indeterminate={this.indeterminate}
                onB2b-change={event =>
                  this.toggleSelected(event)
                }></b2b-checkbox>
            </b2b-table-header>
          );
        case TableCheckboxTypes.ROW:
          return (
            <b2b-table-cell>
              <b2b-checkbox
                standalone
                checked={this.checked}
                value={this.value}
                indeterminate={this.indeterminate}
                onB2b-change={event =>
                  this.toggleSelected(event)
                }></b2b-checkbox>
            </b2b-table-cell>
          );
      }
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
        {this.getAccordionColumns()}
        {this.getCheckBoxColumns()}
        <slot></slot>
      </Host>
    );
  }
}
