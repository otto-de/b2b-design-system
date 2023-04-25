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
  tag: 'b2b-input-list-option',
  styleUrl: 'input-list.scss',
})
export class InputListOptionComponent {
  /** The option name. */
  @Prop() option: string;

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
      <Host
        class="b2b-input-list__option"
        onClick={this.handleClick}
        role="option">
        {this.option}
      </Host>
    );
  }
}
