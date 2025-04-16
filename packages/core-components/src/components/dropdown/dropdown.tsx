import {
  Component,
  h,
  Prop,
  Host,
  EventEmitter,
  Event,
  Element,
  State,
  Watch,
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

  @State() isOpen: boolean = false;
  @State() private focused: boolean = false;
  @State() selectedValue: string = '';
  @State() selectedText: string = '';
  @State() options: {
    value: string;
    label: string;
    selected: boolean;
    disabled: boolean;
  }[] = [];

  private onSelect = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const value = target.getAttribute('data-value');
    const label = target.textContent;
    this.focused = true;

    if (value) {
      this.selectedText = label || '';
      this.selectedValue = value;
      // this.value = value;
      this.b2bChange.emit(value);

      this.options = this.options.map(option => ({
        ...option,
        selected: option.value === value,
      }));

      this.isOpen = false;
    }
  };

  private onFocus = (ev: FocusEvent) => {
    this.b2bFocus.emit(ev);
    this.focused = true;
  };

  private onBlur = (ev: FocusEvent) => {
    this.b2bBlur.emit(ev);
  };

  private toggleDropdown = () => {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  };

  private closeDropdown = () => {
    this.isOpen = false;
  };

  private onClickOutside = (ev: MouseEvent) => {
    if (this.hostElement && !this.hostElement.contains(ev.target as Node)) {
      this.closeDropdown();
      this.focused = false;
    }
  };

  componentDidLoad() {
    document.addEventListener('click', this.onClickOutside);
    const trigger = this.hostElement.querySelector(
      '.b2b-dropdown__select',
    ) as HTMLElement;
    const options = this.hostElement.querySelector(
      '.b2b-dropdown__options',
    ) as HTMLElement;

    if (trigger && options) {
      options.style.width = `${trigger.offsetWidth}px`; // Dynamically match the width of the trigger
    }
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.onClickOutside);
  }

  @Watch('isOpen')
  watchDropdownState() {
    if (this.isOpen) {
      this.closeOtherDropdowns();
    }
  }

  private closeOtherDropdowns() {
    // Close any other dropdowns on the page if they are open
    const otherDropdowns = document.querySelectorAll('b2b-dropdown');
    otherDropdowns.forEach(dropdown => {
      if (dropdown !== this.hostElement) {
        (dropdown as any).isOpen = false;
      }
    });
  }

  componentWillLoad() {
    const options = Array.from(this.hostElement.querySelectorAll('option'));
    this.options = options.map(option => ({
      value: option.value,
      label: option.textContent || '',
      selected: option.hasAttribute('selected'),
      disabled: option.hasAttribute('disabled'),
    }));

    const selectedOption = this.options.find(option => option.selected);
    this.selectedText = selectedOption?.label || this.placeholder;
    this.selectedValue = selectedOption?.value;
  }

  render() {
    const options = Array.from(this.hostElement.children).filter(
      child => child.nodeName.toLowerCase() === 'option',
    ) as HTMLOptionElement[];

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
        <div
          class={{
            'b2b-dropdown__wrapper': true,
            'b2b-dropdown__wrapper--focused': this.focused,
          }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          aria-expanded={this.isOpen ? 'true' : 'false'}>
          <div
            class={{
              'b2b-dropdown__select': true,
              'b2b-dropdown__select--open': this.isOpen,
            }}
            onClick={this.toggleDropdown}
            role="combobox"
            aria-labelledby={this.name}
            onFocus={this.onFocus}
            onBlur={this.onBlur}>
            {this.selectedText || this.placeholder}
          </div>

          {this.isOpen && (
            <div class="b2b-dropdown__options" role="listbox">
              {options.map(option => (
                <div
                  class={`b2b-dropdown__option ${
                    option.selected ? 'b2b-dropdown__option--selected' : ''
                  } ${option.disabled ? 'b2b-dropdown__option--disabled' : ''}`}
                  data-value={option.value}
                  onClick={!option.disabled ? this.onSelect : undefined}
                  role="option"
                  aria-selected={option.selected ? 'true' : 'false'}
                  aria-disabled={option.disabled ? 'true' : 'false'}>
                  {option.textContent}
                </div>
              ))}
            </div>
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
      </Host>
    );
  }
}
