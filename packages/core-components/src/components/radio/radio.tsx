import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
} from '@stencil/core';
import { RadioEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-radio-button',
  styleUrl: 'radio.scss',
  shadow: true,
})
export class B2bRadioButtonComponent {
  @Element() host: HTMLB2bRadioButtonElement;

  /** The label of the radio button. This is required */
  @Prop() label!: string;

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop({ reflect: true }) required: boolean = false;

  /** The name of the radio button. Use it to group radio buttons together and assign the label to the input element for better accessibility. This is required. */
  @Prop({ reflect: true }) name!: string;

  /** Whether or not the radio button is currently checked. Per default it is false. */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Whether or not the radio button is currently disabled. Per default it is false. */
  @Prop({ reflect: true }) disabled = false;

  /** Whether or not the radio button should be rendered with error styles. Per default it is false. */
  @Prop() invalid = false;

  /** The value of the radio button. This will be emitted when the radio button is clicked. */
  @Prop({ reflect: true }) value?: string;

  /** A hint to give additional information on the radio button. */
  @Prop() hint?: string;

  /** An error text. It will only show if invalid is set to true.  */
  @Prop() error?: string;

  /** Emits whenever the radio button receives focus. */
  @Event({ eventName: 'b2b-focus' })
  b2bFocus: EventEmitter<FocusEvent>;

  /** Emits whenever the radio button loses focus. */
  @Event({ eventName: 'b2b-blur' })
  b2bBlur: EventEmitter<FocusEvent>;

  /** Emitted whenever the radio button is clicked.  */
  @Event({ eventName: 'b2b-change' })
  b2bChange: EventEmitter<RadioEventDetail>;

  connectedCallback() {
    const form = this.host.closest('form');
    if (form != null) {
      form.addEventListener('formdata', this.handleFormData);
    }
  }

  private handleFormData = (event: FormDataEvent) => {
    if (this.name != undefined && this.checked) {
      const value = this.value || '';
      event.formData.append(this.name, value);
    }
  };

  private onClick = () => {
    if (this.disabled || this.checked) {
      return;
    }
    this.checked = true;
    this.uncheckSiblings();
    this.b2bChange.emit({
      checked: this.checked,
      value: this.value,
    });
    // Dispatches the native change event because it is not propagated beyond the shadow boundary
    // globalThis to target the lib.dom Event and not Stencil Event
    const changeEvent = new globalThis.Event('change');
    this.host.dispatchEvent(changeEvent);
  };

  private uncheckSiblings = () => {
    this.getSiblingRadios().forEach((radio: HTMLB2bRadioButtonElement) => {
      radio.checked = false;
    });
  };

  private getSiblingRadios(): HTMLElement[] {
    return Array.from(
      document.querySelectorAll(`b2b-radio-button[name="${this.name}"]`),
    ).filter(
      (radio: HTMLB2bRadioButtonElement) => radio.value !== this.value,
    ) as HTMLB2bRadioButtonElement[];
  }

  private onBlur = () => {
    this.b2bBlur.emit();
  };

  private onFocus = () => {
    this.b2bFocus.emit();
  };

  render() {
    return (
      <Host onClick={this.onClick}>
        <div
          class={{
            'b2b-radio': true,
            'b2b-radio--error': this.invalid && !this.disabled,
            'b2b-radio--disabled': this.disabled,
          }}>
          <div class="b2b-radio-items">
            <input
              class="b2b-radio-input"
              aria-labelledby={this.name}
              type="radio"
              checked={this.checked}
              disabled={this.disabled}
              name={this.name}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              value={this.value}
            />
            <b2b-input-label
              id={this.name}
              required={this.required}
              disabled={this.disabled}>
              {this.label}
            </b2b-input-label>
          </div>
          {(this.hint !== undefined && !this.invalid) ||
          (this.hint !== undefined && this.disabled) ? (
            <span>{this.hint}</span>
          ) : (
            ''
          )}
          {this.error !== undefined && this.invalid && !this.disabled ? (
            <span>{this.error}</span>
          ) : (
            ''
          )}
        </div>
      </Host>
    );
  }
}
