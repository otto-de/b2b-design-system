import {
  Component,
  h,
  Prop,
  Host,
  EventEmitter,
  Event,
  Element,
} from '@stencil/core';

@Component({
  tag: 'b2b-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true,
})
export class DropdownComponent {
  @Element() hostElement: HTMLB2bDropdownElement;

  /** The dropdown label. */
  @Prop() label: string;

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop({ reflect: true }) required: boolean = false;

  /** The name of the select. This is used to associate the label to the dropdown element. It is important for accessibility. */
  @Prop({ reflect: true }) name?: string;

  /** Placeholder text for the dropdown. */
  @Prop() placeholder: string = 'Select an option...';

  /** Value for the placeholder. Defaults to an empty string but can be customized. */
  @Prop() placeholderValue: string = '';

  /** Whether the select as a whole is disabled. Per default it is false. */
  @Prop({ reflect: true }) disabled = false;

  /** Whether the select is currently invalid. Per default it is false. */
  @Prop({ reflect: true }) invalid = false;

  /** An optional hint text for the dropdown. */
  @Prop() hint?: string;

  /** An optional error message for the dropdown. This will only appear if invalid is set to true. */
  @Prop() error?: string;

  /** Emits the option whenever a new option is chosen. */
  @Event({ eventName: 'b2b-change' })
  b2bChange: EventEmitter<string>;

  /** Emits whenever the dropdown receives focus. */
  @Event({ eventName: 'b2b-focus' })
  b2bFocus: EventEmitter<FocusEvent>;

  /** Emits whenever the dropdown loses focus. */
  @Event({ eventName: 'b2b-blur' })
  b2bBlur: EventEmitter<FocusEvent>;

  private onSelect = (ev: Event) => {
    const option = ev.target as HTMLOptionElement;
    this.b2bChange.emit(option.value);
  };

  private onFocus = (ev: FocusEvent) => {
    this.b2bFocus.emit(ev);
  };

  private onBlur = (ev: FocusEvent) => {
    this.b2bBlur.emit(ev);
  };

  private getSelectElement = () => {
    return this.hostElement.shadowRoot.querySelector('select');
  };

  connectedCallback() {
    const form = this.hostElement.closest('form');
    if (form != null) {
      form.addEventListener('formdata', this.handleFormData);
    }
  }

  // TODO: find a way to test it maybe when migrating to new testing framework
  private handleFormData = (event: FormDataEvent) => {
    if (this.name != undefined) {
      const selectElement = this.getSelectElement();
      const value = selectElement.value || '';
      event.formData.append(this.name, value);
    }
  };

  // we need to attach the options to the correct element here
  componentDidLoad() {
    let options = this.hostElement.querySelectorAll('option');
    const selectElement = this.getSelectElement();

    selectElement.innerHTML = '';
    const placeholderOption = document.createElement('option');
    placeholderOption.value = this.placeholderValue;
    placeholderOption.textContent = this.placeholder;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    selectElement.append(placeholderOption);
    selectElement.append(...options);
  }

  render() {
    return (
      <Host
        class={{
          'b2b-dropdown': true,
          'b2b-dropdown--error': this.invalid && !this.disabled,
          'b2b-dropdown--disabled': this.disabled,
        }}>
        {this.label && (
          <b2b-input-label id={this.name} required={this.required}>
            {this.label}
          </b2b-input-label>
        )}
        <select
          class="b2b-dropdown__select"
          aria-labelledby={this.name}
          name={this.name}
          disabled={this.disabled}
          onChange={this.onSelect}
          onFocus={this.onFocus}
          onBlur={this.onBlur}></select>
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
