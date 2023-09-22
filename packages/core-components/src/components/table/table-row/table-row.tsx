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
  Listen,
} from '@stencil/core';
import {
  TableAccordionRowTypes,
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

  /** @internal Determined by the parent rowgroup for accordion rowgroups. */
  @Prop() accordionType: TableAccordionRowTypes;

  /** @internal Whether the parent rowgroup is selectable. */
  @Prop() selectable: boolean;

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

  @Listen('b2b-change')
  toggleSelected(event: B2bCheckboxCustomEvent<CheckboxEventDetail>) {
    if (this.selectable) {
      this.checked = event.detail.checked;
      this.b2bSelected.emit({
        checked: event.detail.checked,
        value: event.detail.value ?? 'header',
      });
    }
  }

  /** Will toggle the accordion opened or closed. */
  @Method()
  async toggleAccordion(isOpen: boolean) {
    this.isOpen = isOpen;
    this.b2bOpen.emit(isOpen);
  }

  componentWillLoad() {
    if (
      this.selectable &&
      !Boolean(this.value) &&
      this.getParentRowGroup().type !== 'header'
    ) {
      console.warn(
        'You need to associate a value with the row as a unique identifier.',
      );
    }
  }

  private toggleOpen = () => {
    this.isOpen = !this.isOpen;
    this.b2bOpen.emit(this.isOpen);
  };

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
    } else if (Boolean(this.selectable)) {
      return checkboxSize;
    } else if (Boolean(this.accordionType && this.selectable)) {
      return accordionIconSize + checkboxSize;
    } else {
      return;
    }
  };

  private shouldAddCheckbox = () => {
    let checkbox = this.hostElement.querySelector('b2b-checkbox');
    return this.selectable && !Boolean(checkbox);
  };

  private getParentRowGroup = () => {
    return this.hostElement.closest('b2b-table-rowgroup');
  };

  private getCheckbox = () => {
    let parent = this.getParentRowGroup();
    if (this.shouldAddCheckbox()) {
      if (parent.type === 'header') {
        return (
          <b2b-table-header
            style={{
              ['width']: this.getRowWidth(),
            }}>
            <b2b-checkbox
              standalone
              checked={this.checked}
              indeterminate={this.indeterminate}
              style={{
                'line-height': '16px',
              }}></b2b-checkbox>
          </b2b-table-header>
        );
      } else {
        return (
          <b2b-table-cell>
            <b2b-checkbox
              standalone
              checked={this.checked}
              value={this.value}
              indeterminate={this.indeterminate}
              style={{
                'line-height': '16px',
              }}></b2b-checkbox>
          </b2b-table-cell>
        );
      }
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
        {this.getCheckbox()}
        <slot></slot>
      </Host>
    );
  }
}
