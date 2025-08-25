import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';
import { MultiSelectOptionEventDetail } from '../../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-multiselect-option',
  styleUrl: 'multiselect-option.scss',
})
export class B2bMultiSelectOption {
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

  render() {
    return (
      <Host
        role="option"
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
