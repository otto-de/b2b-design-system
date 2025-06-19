import {
  Component,
  h,
  Prop,
  Host,
  Event,
  EventEmitter,
  Element,
} from '@stencil/core';
import { InputChangeEvent } from '../../utils/interfaces/form.interface';

/** Text Area Component
 * Initial story: https://otto-eg.atlassian.net/browse/B2BDS-96
 */

@Component({
  tag: 'b2b-textarea',
  styleUrl: 'textarea.scss',
  shadow: true,
})
export class B2BTextareaComponent {
  @Element() hostElement: HTMLB2bTextareaElement;

  /** The textarea label. This is optional. */
  @Prop() label: string;

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop({ reflect: true }) required: boolean = false;

  /** The textarea placeholder. It is optional and undefined by default. */
  @Prop({ reflect: true }) placeholder?: string;

  /** Whether or not the textarea is disabled. Per default it is false.  */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether or not the textarea should be displayed with error styles. Per default it is false. */
  @Prop({ reflect: true }) invalid: boolean = false;

  /** Whether or not the textarea should be automatically focused on page load. Per default it is false. */
  @Prop({ reflect: true }) focusOnLoad: boolean = false;

  /** If and how the textarea is resizable. Per default it is resizable in both directions. */
  @Prop({ reflect: true }) resize?:
    | 'unset'
    | 'none'
    | 'vertical'
    | 'horizontal';

  /** An optional hint for the textarea. Per default it is undefined. */
  @Prop() hint?: string;

  /** An optional error message that is displayed when the textarea is invalid. Per default it is undefined. */
  @Prop() error?: string;

  /** The value of the textarea. Per default it is null. */
  @Prop({ mutable: true, reflect: true }) value: string = null;

  /** The name of the textarea. This is used to programmatically group it into a form. */
  @Prop({ reflect: true }) name?: string;

  /** The maximum input length. Characters entered after that will not be appended to the input value. */
  @Prop({ reflect: true }) maxLength?: number;

  /** The height of the text area */
  @Prop() height?: string = '';

  /** Emits whenever the textarea receives focus. */
  @Event({ eventName: 'b2b-focus' })
  b2bFocus: EventEmitter<FocusEvent>;

  /** Emits whenever the textarea loses focus. */
  @Event({ eventName: 'b2b-blur' })
  b2bBlur: EventEmitter<FocusEvent>;

  /** Emits whenever the textarea's input changes. */
  @Event({ eventName: 'b2b-input' })
  b2bInput: EventEmitter<InputChangeEvent>;

  connectedCallback() {
    const form = this.hostElement.closest('form');
    if (form != null) {
      form.addEventListener('formdata', this.handleFormData);
    }
  }
  // TODO: find a way to test it maybe when migrating to new testing framework
  private handleFormData = (event: FormDataEvent) => {
    if (this.name != undefined) {
      const value = this.value || '';
      event.formData.append(this.name, value);
    }
  };

  private onFocus = (ev: FocusEvent) => {
    this.b2bFocus.emit(ev);
  };

  private onBlur = (ev: FocusEvent) => {
    this.b2bBlur.emit(ev);
  };

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input !== (undefined || null)) {
      this.value = input.value || '';
    }
    this.b2bInput.emit(input);
  };

  render() {
    return (
      <Host
        class={{
          'b2b-textarea': true,
          'b2b-textarea--error': this.invalid && !this.disabled,
        }}>
        {this.label && (
          <b2b-input-label id={this.name} required={this.required}>
            {this.label}
          </b2b-input-label>
        )}
        <textarea
          class="textarea-input"
          aria-labelledby={this.name}
          style={{
            height: this.height,
            ...(Boolean(this.resize) && { resize: this.resize }),
          }}
          value={this.value}
          name={this.name}
          placeholder={this.placeholder}
          disabled={this.disabled}
          autoFocus={this.focusOnLoad}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onInput={this.onInput}
          maxLength={this.maxLength}></textarea>
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
