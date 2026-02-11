import { Component, Prop, h, Host, Event, EventEmitter } from '@stencil/core';
import { ToggleChipEventDetail } from '../../utils/interfaces/interaction.interface';

@Component({
  tag: 'b2b-toggle-chip',
  styleUrl: 'toggle-chip.scss',
  shadow: true,
})
export class B2BToggleChipComponent {
  /** The chip's label. This is required. */
  @Prop() label!: string;

  /** The value associated with the toggle chip. This is emitted when the chip is interacted with. */
  @Prop({ reflect: true }) value!: any;

  /** The name of the toggle chip. Use it to group toggle buttons together and assign the label to the input element for better accessibility. This is required. */
  @Prop({ reflect: true }) name!: string;

  /** Whether or not the chip is currently active. Per default, it is false. */
  @Prop({ mutable: true }) active: boolean = false;

  /** Whether or not the chip is currently disabled. Per default it is false. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Emits the value whenever the toggle chip is selected. */
  @Event({ eventName: 'b2b-selected' })
  b2bSelected: EventEmitter<ToggleChipEventDetail>;

  private onClick = () => {
    if (this.disabled) {
      return;
    }
    this.active = !this.active;

    this.b2bSelected.emit({
      value: this.value,
      isActive: this.active,
    });
  };

  private onKeyDown = (ev: KeyboardEvent) => {
    if (this.disabled) {
      return;
    }
    if (ev.key === 'Enter') {
      this.active = !this.active;

      this.b2bSelected.emit({
        value: this.value,
        isActive: this.active,
      });
    }
  };

  render() {
    return (
      <Host>
        <span
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
          class={{
            'b2b-toggle-chip': true,
          }}>
          <input
            aria-labelledby={this.name}
            tabindex={this.disabled ? -1 : 0}
            class={{
              'b2b-toggle-chip__input': true,
            }}
            type="checkbox"
            checked={this.active && !this.disabled}
            disabled={this.disabled}
            name={this.name}
            value={this.value}></input>
          <label
            id={this.name}
            tabIndex={-1}
            class={{
              'b2b-toggle-chip__label': true,
              'b2b-toggle-chip__label--active': this.active && !this.disabled,
              'b2b-toggle-chip__label--disabled': this.disabled,
              'b2b-toggle-chip__label--active-disabled':
                this.active && this.disabled,
            }}>
            {this.label}
          </label>
        </span>
      </Host>
    );
  }
}
