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

  /** The icon to display when the option is hovered and not selected. Defaults to null (no icon). */
  @Prop({ reflect: true }) hoverIcon: any | null = null;

  /** The color of the icon when the option is hovered. Defaults to 'b2b-color-black-100'. */
  @Prop({ reflect: true }) hoverIconColor: string = 'b2b-color-black-100';

  /** The icon to display when the option is selected. Defaults to null (no icon). */
  @Prop({ reflect: true }) selectedIcon: any | null = null;

  /** The color of the icon when the option is selected. Defaults to 'b2b-color-black-100'. */
  @Prop({ reflect: true }) selectedIconColor: string = 'b2b-color-black-100';

  /** Local state to track hover status for icon display. */
  @State() isHovered: boolean = false;

  /** Emits the option as a string whenever an option is selected. */
  @Event({ eventName: 'b2b-custom-dropdown-option-selected' })
  b2bOptionSelected: EventEmitter<OptionSelectedEventDetail>;

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

  private formatColorVariable(color: string): string {
    if (color.startsWith('var(--b2b-color-') && color.endsWith(')')) {
      return color;
    }
    return `var(--${color})`;
  }

  render() {
    return (
      <Host
        class={{
          'b2b-custom-dropdown__option': true,
          'b2b-custom-dropdown__option-hover': this.isHovered && !this.selected,
          'b2b-custom-dropdown__option--disabled': this.disabled,
          'b2b-custom-dropdown__option--separator': this.separator,
          'b2b-custom-dropdown__option--selected': this.selected,
        }}
        onClick={this.handleClick}
        disabled={this.disabled}
        aria-disabled={this.disabled}
        role="option"
        aria-selected={this.selected.toString()}>
        <div class="b2b-option-container">
          <div class="b2b-custom-dropdown__text-content">{this.option}</div>
          <div class="b2b-custom-dropdown__icon-container">
            {this.isHovered && !this.selected && this.hoverIcon ? (
              <b2b-icon-100
                icon={this.hoverIcon}
                style={{
                  color: this.formatColorVariable(this.hoverIconColor),
                }}></b2b-icon-100>
            ) : this.selected && this.selectedIcon ? (
              <b2b-icon-100
                icon={this.selectedIcon}
                style={{
                  color: this.formatColorVariable(this.selectedIconColor),
                }}></b2b-icon-100>
            ) : null}
          </div>
        </div>
      </Host>
    );
  }
}
