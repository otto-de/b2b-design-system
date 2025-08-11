import {
  Component,
  Event,
  h,
  EventEmitter,
  Prop,
  Host,
  Listen,
  State,
} from '@stencil/core';
import { OptionSelectedEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-custom-dropdown-option',
  styleUrl: 'custom-dropdown-option.scss',
  shadow: true,
})
export class CustomDropdownOptionComponent {
  /** The option name. */
  @Prop() option!: string;

  /** Whether the option is disabled. Per default it is false. If disabled is true, the option cannot be selected. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether the option has a separator at the bottom. Per default it is false. */
  @Prop() separator: boolean = false;

  /** Whether the option is currently selected. */
  @Prop({ reflect: true }) selected: boolean = false;

  /** Local state to track hover status for icon display. */
  @State() isHovered: boolean = false;

  /** Emits the option as a string whenever an option is selected. */
  @Event({ eventName: 'b2b-custom-dropdown-option-selected' })
  b2bOptionSelected: EventEmitter<OptionSelectedEventDetail>;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.disabled) {
      this.b2bOptionSelected.emit({ selectedOption: this.option });
    }
  }

  @Listen('mouseenter')
  handleMouseEnter() {
    this.isHovered = true;
  }

  @Listen('mouseleave')
  handleMouseLeave() {
    this.isHovered = false;
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
          'b2b-custom-dropdown__option': true,
          'b2b-custom-dropdown__option--disabled': this.disabled,
          'b2b-custom-dropdown__option--separator': this.separator,
          'b2b-custom-dropdown__option--selected': this.selected,
        }}
        onClick={this.handleClick}
        disabled={this.disabled}
        aria-disabled={this.disabled}
        role="option"
        aria-selected={this.selected.toString()}>
        <div class="b2b-custom-dropdown__text-content">{this.option}</div>
        <div class="b2b-custom-dropdown__icon-container">
          {this.isHovered ? (
            <b2b-icon-100
              icon="b2b_icon-arrow-long-right"
              style={{ color: 'var(--b2b-color-grey-400)' }}></b2b-icon-100>
          ) : this.selected ? (
            <b2b-icon-100
              icon="b2b_icon-success"
              style={{ color: 'var(--b2b-color-success-100)' }}></b2b-icon-100>
          ) : null}
        </div>
      </Host>
    );
  }
}
