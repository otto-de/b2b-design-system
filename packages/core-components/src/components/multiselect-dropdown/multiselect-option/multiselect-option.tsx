import {
  Component,
  Element,
  h,
  Host,
  Prop,
  Event,
  EventEmitter,
} from '@stencil/core';
import { MultiSelectOptionEventDetail } from '../../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-multiselect-option',
  styleUrl: 'multiselect-option.scss',
})
export class B2bMultiSelectOption {
  @Element() hostElement: HTMLB2bMultiselectOptionElement;

  /** The label and value of the option. */
  @Prop() option!: string;

  /** Will provide the label instead of option if set */
  @Prop() label?: string;

  /** Emits the option as a string whenever an option is selected. */
  @Event({ eventName: 'b2b-option-selected' })
  b2bOptionSelected: EventEmitter<MultiSelectOptionEventDetail>;

  /** Whether the option is currently selected. */
  @Prop({ mutable: true }) selected: boolean = false;

  /** @internal Whether the checkbox is in indeterminate state. */
  @Prop() indeterminate?: boolean = false;

  private handleCheckboxChange = event => {
    this.selected = event.detail.checked;
    this.b2bOptionSelected.emit({
      selected: this.selected,
      selectedOption: this.option,
    });
  };

  private handleRowClick = (event: MouseEvent) => {
    const checkbox = this.hostElement.querySelector('b2b-checkbox');
    if (!checkbox) return;

    if (checkbox.hasAttribute('disabled')) return;

    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'b2b-checkbox') {
      return;
    }

    checkbox.click();
  };

  render() {
    return (
      <Host
        role="option"
        onClick={this.handleRowClick}
        class={{
          'b2b-multiselect-dropdown__option': true,
        }}>
        <b2b-checkbox
          checked={this.selected}
          onB2b-change={this.handleCheckboxChange}
          label={this.label ?? this.option}
          indeterminate={this.indeterminate}
          value={this.option}></b2b-checkbox>
      </Host>
    );
  }
}
