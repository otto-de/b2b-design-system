import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
} from '@stencil/core';
import { CheckboxEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: true,
})
export class CheckboxComponent {
  @Element() hostElement: HTMLB2bCheckboxElement;

  /** The checkbox label. This attribute is required. */
  @Prop() label?: string;

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop({ reflect: true }) required: boolean = false;

  /** Whether or not the checkbox is checked. Default value is false and can be set to true if the checkbox should come pre-checked. */
  @Prop({ reflect: true, mutable: true }) checked = false;

  /** Whether or not the checkbox is disabled. The default value is false. */
  @Prop({ reflect: true }) disabled = false;

  /** If used in combination with other checkboxes, this state indicates that some checkboxes are checked, but not all. Per default, it is false. */
  @Prop({ mutable: true }) indeterminate: boolean;

  /** The error message. It is undefined by default. If a string is passed in, it will render the checkbox with error styles. */
  @Prop() error?: string;

  /** The hint text belonging to the checkbox. It is undefined by default. If an error is specified, it will be shown instead of the hint. */
  @Prop() hint?: string;

  /** The name of the checkbox. Per default it is undefined. Use this to programmatically group checkboxes together by giving them the same name. */
  @Prop({ reflect: true }) name?: string;

  /** The value of the checkbox. This is not the same as the checked property. It is only used when the checkbox participates in a checkbox group */
  @Prop({ reflect: true }) value?: any;

  /** Whether or not the checkbox is rendered with error styles. Defaults to false. */
  @Prop() invalid?: boolean = false;

  /** If true, renders a standalone inline checkbox with no label and hint/error. */
  @Prop() standalone: boolean = false;

  /** @internal whether the parent checkbox-group is disabled. */
  @Prop() groupDisabled = false;

  /** Emits whenever the checkbox receives focus. */
  @Event({ eventName: 'b2b-focus' })
  b2bFocus: EventEmitter<FocusEvent>;

  /** Emits whenever the checkbox loses focus. */
  @Event({ eventName: 'b2b-blur' })
  b2bBlur: EventEmitter<FocusEvent>;

  /** Emits the checkbox value when it's checked status changes. */
  @Event({ eventName: 'b2b-change' })
  b2bChange: EventEmitter<CheckboxEventDetail>;

  connectedCallback() {
    const form = this.hostElement.closest('form');
    if (form != null) {
      form.addEventListener('formdata', this.handleFormData);
    }
  }

  private handleFormData = (event: FormDataEvent) => {
    if (this.name != undefined && this.checked) {
      const value = this.value || 'on';
      event.formData.append(this.name, value);
    }
  };

  private emitDetail = () => {
    this.b2bChange.emit({
      checked: this.checked,
      value: this.value,
    });
    // Dispatches the native change event because it is not propagated beyond the shadow boundary
    // globalThis to target the lib.dom Event and not Stencil Event
    const changeEvent = new globalThis.Event('change');
    this.hostElement.dispatchEvent(changeEvent);
  };

  private onFocus = (ev: FocusEvent) => {
    this.b2bFocus.emit(ev);
  };

  private onBlur = (ev: FocusEvent) => {
    this.b2bBlur.emit(ev);
  };

  private onClick = (ev: MouseEvent) => {
    ev.preventDefault();
    if (this.disabled) {
      return;
    } else if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true;
    } else {
      this.checked = !this.checked;
    }
    this.emitDetail();
  };

  private renderIcon = () => {
    if (this.indeterminate) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          class="b2b-checkbox__icon">
          <path
            d="M8.5 0H0.5C0.223633 0 0 0.223633 0 0.5C0 0.776367 0.223633 1 0.5 1H8.5C8.77637 1 9 0.776367 9 0.5C9 0.223633 8.77637 0 8.5 0Z"
            fill="white"
          />
        </svg>
      );
    }
    if (this.checked) {
      return (
        <svg
          class="b2b-checkbox__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32">
          <path d="M11.798 25.082c-.341 0-.681-.13-.942-.389l-7.132-7.115a1.334 1.334 0 0 1 1.884-1.888l6.19 6.175L26.391 7.307a1.334 1.334 0 0 1 1.884 1.888L12.74 24.693c-.26.259-.601.389-.942.389z" />
        </svg>
      );
    }
  };

  render() {
    return (
      <Host onClick={this.onClick}>
        <div
          class={{
            'b2b-checkbox': true,
            'b2b-checkbox--error': this.invalid && !this.disabled,
            'b2b-checkbox--disabled': this.disabled || this.groupDisabled,
            'b2b-checkbox--checked': this.checked,
            'b2b-checkbox--standalone': this.standalone,
            'b2b-checkbox--indeterminate': this.indeterminate,
          }}>
          <div class="b2b-checkbox__items">
            {this.renderIcon()}
            <input
              class="b2b-checkbox__input"
              aria-labelledby={this.name}
              type="checkbox"
              name={this.name}
              id={this.name}
              value={this.value}
              checked={this.checked}
              disabled={this.disabled || this.groupDisabled}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
            {!this.standalone && (
              <b2b-input-label
                id={this.name}
                required={this.required}
                disabled={this.disabled}>
                <slot name="label">{this.label}</slot>
              </b2b-input-label>
            )}
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
