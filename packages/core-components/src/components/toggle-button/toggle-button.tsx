import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
} from '@stencil/core';
import { ToggleButtonEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-toggle-button',
  styleUrl: 'toggle-button.scss',
  shadow: true,
})
export class B2bToggleButtonComponent {
  @Element() host: HTMLB2bToggleButtonElement;

  /** The label of the toggle button. This is required */
  @Prop() label!: string;

  /** The name of the toggle button. Use it to group toggle buttons together and assign the label to the input element for better accessibility. This is required. */
  @Prop({ reflect: true }) name!: string;

  /** Whether or not the toggle button is currently checked. Per default it is false. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Whether or not the toggle button is currently disabled. Per default it is false. */
  @Prop({ reflect: true }) disabled = false;

  /** The value of the toggle button. This will be emitted when the toggle button is clicked. This is required */
  @Prop({ reflect: true }) value!: string;

  /** Emitted whenever the toggle button is clicked.  */
  @Event({ eventName: 'b2b-change' })
  b2bChange: EventEmitter<ToggleButtonEventDetail>;

  private onClick = (ev: Event) => {
    ev.preventDefault();
    if (this.disabled || this.checked) {
      return;
    }
    this.checked = true;
    this.uncheckSiblings();
    this.b2bChange.emit({
      value: this.value,
    });
    // Dispatches the native change event because it is not propagated beyond the shadow boundary
    // globalThis to target the lib.dom Event and not Stencil Event
    const changeEvent = new globalThis.Event('change');
    this.host.dispatchEvent(changeEvent);
  };

  private uncheckSiblings = () => {
    this.getSiblingToggles().forEach((toggle: HTMLB2bToggleButtonElement) => {
      toggle.checked = false;
    });
  };

  private getSiblingToggles(): HTMLElement[] {
    return Array.from(
      document.querySelectorAll(`b2b-toggle-button[name="${this.name}"]`),
    ).filter(
      (toggle: HTMLB2bToggleButtonElement) => toggle.value !== this.value,
    ) as HTMLB2bToggleButtonElement[];
  }

  render() {
    return (
      <Host onClick={this.onClick}>
        <span
          class={{
            'b2b-toggle-button': true,
            'b2b-toggle-button--disabled': this.disabled,
          }}>
          <input
            tabindex={0}
            class={{
              'b2b-toggle-button__input': true,
              'b2b-toggle-button__input--disabled': this.disabled,
            }}
            aria-labelledby={this.name}
            type="radio"
            checked={this.checked && !this.disabled}
            disabled={this.disabled}
            name={this.name}
            value={this.value}
          />
          <label
            id={this.name}
            tabindex={-1}
            class={{
              'b2b-toggle-button__label': true,
              'b2b-toggle-button__label--disabled': this.disabled,
              'b2b-toggle-button__label--checked':
                this.checked && !this.disabled,
            }}>
            {this.label}
          </label>
        </span>
      </Host>
    );
  }
}
