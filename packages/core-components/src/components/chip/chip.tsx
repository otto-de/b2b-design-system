import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
} from '@stencil/core';
import { ChipComponentEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-chip-component',
  styleUrl: 'chip.scss',
  shadow: true,
})
export class B2bChipComponent {
  @Element() host: HTMLB2bChipComponentElement;
  /** The text content of the chip. It is required. */
  @Prop() label!: string;

  /** Whether the chip is disabled. */
  @Prop() disabled: boolean = false;

  /** Whether or not the chip component has a close button. Per default it is true. */
  @Prop() hasCloseButton: boolean = true;

  /** It is only used when the chip component participates in a group */
  @Prop({ reflect: true }) value?: any;

  /** This event will be triggered when the chip element is closed */
  @Event({ eventName: 'b2b-close' })
  b2bClose: EventEmitter<ChipComponentEventDetail>;

  private onClick = () => {
    if (this.disabled) {
      return;
    }
    this.b2bClose.emit({ value: this.value });
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || event.key !== 'Enter') {
      return;
    }
    this.b2bClose.emit({ value: this.value });
  };

  private clearIcon = (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M7.85352 3.14648C7.6582 2.95117 7.3418 2.95117 7.14648 3.14648L5.5 4.79297L3.85352 3.14648C3.6582 2.95117 3.3418 2.95117 3.14648 3.14648C2.95117 3.3418 2.95117 3.6582 3.14648 3.85352L4.79297 5.5L3.14648 7.14648C2.95117 7.3418 2.95117 7.6582 3.14648 7.85352C3.24414 7.95117 3.37207 8 3.5 8C3.62793 8 3.75586 7.95117 3.85352 7.85352L5.5 6.20703L7.14648 7.85352C7.24414 7.95117 7.37207 8 7.5 8C7.62793 8 7.75586 7.95117 7.85352 7.85352C8.04883 7.6582 8.04883 7.3418 7.85352 7.14648L6.20703 5.5L7.85352 3.85352C8.04883 3.6582 8.04883 3.3418 7.85352 3.14648ZM5.5 0C2.46729 0 0 2.46729 0 5.5C0 8.53271 2.46729 11 5.5 11C8.53271 11 11 8.53271 11 5.5C11 2.46729 8.53271 0 5.5 0ZM5.5 10C3.01855 10 1 7.98145 1 5.5C1 3.01855 3.01855 1 5.5 1C7.98145 1 10 3.01855 10 5.5C10 7.98145 7.98145 10 5.5 10Z" />
    </svg>
  );

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-chip': true,
            'b2b-chip--disabled': this.disabled,
          }}>
          <span
            class={{
              'b2b-chip__label': true,
              'b2b-chip__label--close-button': this.hasCloseButton,
            }}>
            {this.label}
          </span>
          {this.hasCloseButton && (
            <button
              class={{
                'b2b-chip__clearIcon': true,
                'b2b-chip--disabled__clearIcon': this.disabled,
              }}
              onClick={this.onClick}
              onKeyDown={this.onKeyDown}>
              {this.clearIcon}
            </button>
          )}
        </div>
      </Host>
    );
  }
}
