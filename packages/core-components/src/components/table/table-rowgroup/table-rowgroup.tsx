import {
  Component,
  h,
  Element,
  Host,
  Prop,
  Listen,
  State,
  Event,
  EventEmitter,
} from '@stencil/core';
import {
  TableRowgroupTypes,
  TableSizes,
} from '../../../utils/types/table.types';
import {
  B2bCheckboxCustomEvent,
  CheckboxEventDetail,
} from '../../../components';
import {
  updateCheckboxState,
  getFirstRow,
  getAllRows,
  getRemainingRows,
  isFirstRow,
} from '../utils';
import { TableAccordionSelectedEventDetail } from '../../../utils/interfaces/content.interface';

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

  /** @internal the table size. */
  @Prop() size: TableSizes;

  /** Renders the rowgroup as an accordion. Both header and body must have accordion set to true.
   * One table can contain multiple rowgroups of type body, each of which represents an accordion row with children.
   */
  @Prop({ reflect: true }) accordion = false;

  /** If the rows in the rowgroup can be selected via checkmark. Per default, it is false. */
  @Prop() selectable = false;

  /** Sets the header rowgroup position to sticky. Use this in a scrollable container. */
  @Prop() fixed: boolean = false;

  /** Only use when accordion property is true.
   * Will render the accordion opened if set to true. By default, is false.
   */
  @Prop({ reflect: true }) opened: boolean = false;

  /** Emits when the rowgroup as a whole is selected. */
  @Event({ eventName: 'b2b-group-selected' })
  b2bSelect: EventEmitter<TableAccordionSelectedEventDetail>;

  @State() selectedValues = [];

  @Listen('b2b-open')
  handleOpenChange(event: any) {
    this.toggleChildRowVisibility(event.detail);
  }

  @Listen('b2b-row-selected')
  handleSelectedChange(event: any) {
    const target = event.target;
    const table = this.host.closest('b2b-table');
    const parentValue = getFirstRow(this.host).value ?? 'header';
    if (this.accordion && isFirstRow(target) && parentValue != 'header') {
      const children = getRemainingRows(this.host);
      this.toggleSelectAll(event, children);
    } else if (this.type === TableRowgroupTypes.HEADER) {
      const children = getRemainingRows(table);
      this.toggleSelectAll(event, children);
    } else {
      if (event.target.checked) {
        this.selectedValues = [event.target.value, ...this.selectedValues];
      } else {
        this.selectedValues = this.selectedValues.filter(
          el => el !== event.target.value,
        );
      }
    }
    if (this.accordion) {
      updateCheckboxState(getRemainingRows(this.host), getFirstRow(this.host));
      this.b2bSelect.emit({
        group: parentValue,
        values: this.selectedValues,
      });
    }
    updateCheckboxState(getRemainingRows(table), getFirstRow(table));
  }

  private toggleSelectAll = (
    event: any,
    children: HTMLB2bTableRowElement[],
  ) => {
    this.toggleList(children, event);
    const rows = children.filter(child => !isFirstRow(child));
    this.selectedValues = [...rows]
      .filter(child => child.checked)
      .map(child => child.value);
  };

  private toggleList = (
    list: HTMLB2bTableRowElement[],
    event: B2bCheckboxCustomEvent<CheckboxEventDetail>,
  ) => {
    list.forEach(
      child => (
        (child.checked = event.detail.checked),
        (child.indeterminate = false)
      ),
    );
  };

  private makeHeaderRowNotSelectable() {
    const firstRow = getFirstRow(this.host);
    if (this.type === TableRowgroupTypes.HEADER) {
      firstRow.setAttribute('highlight', 'false');
    }
  }

  private addCheckboxColumn = () => {
    const children = getAllRows(this.host);
    children.forEach(child => (child.selectable = true));
  };

  private toggleInitialVisibility = () => {
    const firstRow = getFirstRow(this.host);
    (async () => {
      firstRow && (await firstRow.toggleAccordion(this.opened));
    })();
  };

  private toggleChildRowVisibility = (isOpen: boolean) => {
    const children = getRemainingRows(this.host);

    if (this.size === TableSizes.COLSPAN) {
      if (isOpen) {
        children.forEach(child => {
          child.hidden = false;
          child.setAttribute('aria-hidden', 'false');
        });
      } else {
        children.forEach(child => {
          child.hidden = true;
          child.setAttribute('aria-hidden', 'true');
        });
      }
    } else {
      if (isOpen) {
        children.forEach(child => {
          child.style.visibility = 'visible';
          child.setAttribute('aria-hidden', 'false');
        });
      } else {
        children.forEach(child => {
          child.style.visibility = 'collapse';
          child.setAttribute('aria-hidden', 'true');
        });
      }
    }
  };

  componentWillLoad() {
    if (this.accordion) {
      this.toggleInitialVisibility();
    }

    if (this.selectable) {
      this.addCheckboxColumn();
    }
  }

  componentDidRender() {
    this.makeHeaderRowNotSelectable();
  }

  render() {
    return (
      <Host
        class={{
          ['b2b-table-rowgroup__' + this.type]: true,
          'b2b-table-rowgroup--fixed': this.fixed,
          'b2b-table-rowgroup--colspan': this.size === TableSizes.COLSPAN,
        }}
        role="rowgroup">
        <slot></slot>
      </Host>
    );
  }
}
