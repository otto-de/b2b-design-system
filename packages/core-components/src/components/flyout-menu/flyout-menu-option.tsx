import {
  Component,
  Event,
  h,
  EventEmitter,
  Prop,
  Host,
  Listen,
} from '@stencil/core';
import { OptionSelectedEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-flyout-menu-option',
  styleUrl: 'flyout-menu.scss',
})
export class FlyoutMenuOptionComponent {
  /** The option name. */
  @Prop() option!: string;

  /** Whether the option is disabled. Per default it is false. If disabled is true, the option cannot be selected. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether the option has a separator at the bottom. Per default it is false. */
  @Prop() separator: boolean = false;

  /** Emits the option as a string whenever an option is selected. */
  @Event({ eventName: 'b2b-option-selected' })
  b2bOptionSelected: EventEmitter<OptionSelectedEventDetail>;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.disabled) {
      this.b2bOptionSelected.emit({ selectedOption: this.option });
    }
  }
  private handleClick = () => {
    if (!this.disabled) {
      this.b2bOptionSelected.emit({ selectedOption: this.option });
    }
  };

  render() {
    return (
      <Host
        class={{
          'b2b-flyout-menu__option': true,
          'b2b-flyout-menu__option--disabled': this.disabled,
          'b2b-flyout-menu__option--separator': this.separator,
        }}
        onClick={this.handleClick}
        disabled={this.disabled}
        aria-disabled={this.disabled}
        role="option">
        {this.option}
      </Host>
    );
  }
}
