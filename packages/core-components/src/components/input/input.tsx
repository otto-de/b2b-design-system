import {
  Component,
  h,
  Prop,
  Host,
  EventEmitter,
  Event,
  Element,
  State,
  Method,
} from '@stencil/core';
import { InputChangeEvent } from '../../utils/interfaces/form.interface';

/** Input component
 * Initial story: https://otto-eg.atlassian.net/browse/B2BDS-53
 */

@Component({
  tag: 'b2b-input',
  styleUrl: 'input.scss',
  shadow: true,
})
export class InputComponent {
  @Element() hostElement: HTMLB2bInputElement;

  /** The input label. */
  @Prop() label: string;

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop({ reflect: true }) required: boolean = false;

  /** The type of the input. All native HTML types except date or month are supported. Default is text. */
  @Prop({ reflect: true }) type:
    | 'text'
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'url' = 'text';

  /** Whether or not the input is disabled. Default is false. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether the input is currently invalid. If true, the input is rendered with error styles. Per default it is false. */
  @Prop({ reflect: true }) invalid = false;

  /** A placeholder for the input field. Per default, it is null. */
  @Prop({ reflect: true }) placeholder: string = null;

  /** The default value of the input field. If defined, it will prefill the input. */
  @Prop({ mutable: true, reflect: true }) value: string = null;

  /** The name of the input. Use it to group label and input together and make it more accessible. */
  @Prop({ reflect: true }) name?: string;

  /** The hint text that appears underneath the input field. */
  @Prop() hint?: string;

  /** The error message that is shown if the input is invalid. */
  @Prop() error?: string;

  /** When setting the autofocus to true, the input element will be focused when the page loads. */
  @Prop() autofocus = false;

  /** @internal Whether the parent input group is disabled. Per default, it is false. */
  @Prop() groupDisabled = false;

  /** Emits whenever the input receives focus. */
  @Event({ eventName: 'b2b-focus' })
  b2bFocus: EventEmitter<FocusEvent>;

  /** Emits whenever the input loses focus. */
  @Event({ eventName: 'b2b-blur' })
  b2bBlur: EventEmitter<FocusEvent>;

  /** Emits whenever the input value changes. */
  @Event({ eventName: 'b2b-input' })
  b2bInput: EventEmitter<InputChangeEvent>;

  @State() hasFocus = false;

  @State() hasTextPrefix = false;
  @State() hasTextSuffix = false;

  private focusableElement: HTMLElement;

  /** Manually set focus to the element */
  @Method()
  async setFocus() {
    this.focusableElement.focus();
  }

  /** Simulate the native behavior of type="search" to emit an empty string when the input is cleared */
  @Method()
  async clearInput() {
    this.value = '';
    this.b2bInput.emit({ value: '' });
  }

  connectedCallback() {
    const form = this.hostElement.closest('form');
    if (form != null) {
      form.addEventListener('formdata', this.handleFormData);
    }
    if (this.autofocus) {
      this.hasFocus = true;
    }
    this.getSlottedText();
  }

  // TODO: find a way to test it maybe when migrating to new testing framework
  private handleFormData = (event: FormDataEvent) => {
    if (this.name != undefined) {
      const value = this.value || '';
      event.formData.append(this.name, value);
    }
  };

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true;
    this.b2bFocus.emit(ev);
  };

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false;
    this.b2bBlur.emit(ev);
  };

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input !== (undefined || null)) {
      this.value = input.value || '';
    }
    this.b2bInput.emit(input);
  };

  private getSlottedText = () => {
    this.hasTextPrefix = this.hasText('start');
    this.hasTextSuffix = this.hasText('end');
  };

  private hasText = (slotName: string): boolean => {
    const slottedChildren = Array.from(this.hostElement.children).filter(
      x => x.getAttribute('slot') === slotName,
    );
    if (slottedChildren.length > 0) {
      // Supports both B2B and legacy icons
      const textNodes = slottedChildren.filter(
        child => child.tagName === 'SPAN',
      );
      return textNodes.length > 0;
    }
    return false;
  };

  render() {
    return (
      <Host
        class={{
          'b2b-input': true,
          'b2b-input--error': this.invalid && !this.disabled,
        }}>
        {this.label && (
          <b2b-input-label id={this.name} required={this.required}>
            {this.label}
          </b2b-input-label>
        )}
        <div
          class={{
            'input-wrapper': true,
            'input-wrapper--focused': this.hasFocus,
            'input-wrapper--disabled': this.disabled || this.groupDisabled,
          }}>
          <slot name="start"></slot>
          {this.hasTextPrefix && <div class="border"></div>}
          <input
            class="native-input"
            aria-labelledby={this.name}
            type={this.type}
            placeholder={this.placeholder}
            value={this.value}
            name={this.name}
            disabled={this.disabled || this.groupDisabled}
            autoFocus={this.autofocus}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onInput={this.onInput}
            ref={el => (this.focusableElement = el)}
          />
          {this.hasTextSuffix && <div class="border"></div>}
          <slot name="end"></slot>
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
      </Host>
    );
  }
}
