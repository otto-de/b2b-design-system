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
  @Prop() option: string;
  @Prop() disabled: boolean = false;
  @Prop() separator: boolean = false;
  /** Emits the option as a string whenever an option is selected. */
  @Event({ eventName: 'b2b-option-selected' })
  b2bOptionSelected: EventEmitter<OptionSelectedEventDetail>;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.b2bOptionSelected.emit({ selectedOption: this.option });
    }
  }
  private handleClick = () => {
    this.b2bOptionSelected.emit({ selectedOption: this.option });
  };

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-flyout-menu__option': true,
            'b2b-flyout-menu__option--disabled': this.disabled,
            'b2b-flyout-menu__option--separator': this.separator,
          }}
          onClick={this.handleClick}
          role="option">
          {this.option}
        </div>
      </Host>
    );
  }
}
