import type { ComponentInterface, EventEmitter } from '@stencil/core';
import {
  Component,
  Element,
  Event,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';

@Component({
  tag: 'b2b-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true,
})
export class DropdownComponent implements ComponentInterface {
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

  /** @internal Whether the parent input group is disabled. Per default, it is false. */
  @Prop() groupDisabled = false;

  /** Emits the option whenever a new option is chosen. */
  @Event({ eventName: 'b2b-change' })
  b2bChange: EventEmitter<string>;

  /** Emits whenever the dropdown receives focus. */
  @Event({ eventName: 'b2b-focus' })
  b2bFocus: EventEmitter<FocusEvent>;

  /** Emits whenever the dropdown loses focus. */
  @Event({ eventName: 'b2b-blur' })
  b2bBlur: EventEmitter<FocusEvent>;

  private mutationObserver?: MutationObserver;

  /** Method to programmatically clear selection of the dropdown. */
  @Method()
  async clearSelection(): Promise<void> {
    this.selectedValue = this.placeholderValue;
    this.selectedText = '';
    this.options = this.options.map(opt => ({
      ...opt,
      selected: false,
    }));
    this.isOpen = false;
    this.updateTruncatedText();
  }

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

  private selectEl: HTMLDivElement;
  @State() private truncatedText: string = '';

  componentWillLoad(): void {
    this.initializeOptions();

    if (typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver(() => {
        this.initializeOptions();
      });

      this.mutationObserver.observe(this.hostElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['value', 'selected', 'disabled'],
      });
    }
  }

  componentDidLoad(): void {
    this.updateTruncatedText(); // `componentWillLoad()` is unable to truncate it to the proper size

    document.addEventListener('click', this.onClickOutside);
    window.addEventListener('resize', this.updateTruncatedText);
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this.onClickOutside);
    window.removeEventListener('resize', this.updateTruncatedText);
    this.mutationObserver?.disconnect();
  }

  @Watch('isOpen')
  watchDropdownState(): void {
    if (this.isOpen) this.closeOtherDropdowns();
  }

  private initializeOptions() {
    const nativeOptions = Array.from(
      this.hostElement.querySelectorAll('option'),
    );
    this.options = nativeOptions.map(opt => ({
      value: opt.value,
      label: opt.textContent?.trim() || '',
      selected: opt.value === this.selectedValue,
      disabled: opt.disabled || opt.hasAttribute('disabled'),
    }));

    const selected = this.options.find(o => o.selected);

    this.selectedValue = selected?.value ?? this.placeholderValue;
    this.selectedText = selected?.label ?? '';

    this.updateTruncatedText();
  }

  private onClickOutside = (ev: MouseEvent) => {
    if (!this.hostElement.contains(ev.target as Node)) this.isOpen = false;
  };

  private toggleDropdown = () => {
    if (!this.disabled && !this.groupDisabled) this.isOpen = !this.isOpen;
  };

  private onFocus = (ev: FocusEvent) => {
    this.focused = true;
    this.b2bFocus.emit(ev);
  };

  private onBlur = (ev: FocusEvent) => {
    this.focused = false;
    this.b2bBlur.emit(ev);
  };

  private closeOtherDropdowns() {
    const others = document.querySelectorAll('b2b-dropdown');
    others.forEach(el => {
      if (el !== this.hostElement) (el as any).isOpen = false;
    });
  }

  private onSelect = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const value = target.getAttribute('data-value');
    const label = target.textContent?.trim();

    if (value != null) {
      this.selectedValue = value;
      this.selectedText = label || '';
      this.b2bChange.emit(value);

      this.options = this.options.map(opt => ({
        ...opt,
        selected: opt.value === value,
      }));

      this.isOpen = false;
      this.updateTruncatedText();
    }
  };

  private updateTruncatedText = () => {
    const rawText = this.selectedText || this.placeholder;
    if (this.selectEl == null) {
      this.truncatedText = rawText;
      return;
    }
    const style = window.getComputedStyle(this.selectEl);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx == null) return;

    ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

    let baseWidth = this.selectEl.clientWidth;
    if (baseWidth == null) {
      this.truncatedText = rawText;
      return;
    }
    const parentContainer = this.selectEl.parentElement;

    if (parentContainer && parentContainer.clientWidth > baseWidth) {
      baseWidth = parentContainer.clientWidth;
    }

    baseWidth = Math.max(baseWidth, 200);

    const availableWidth =
      baseWidth - parseFloat(style.paddingRight || '0') - 24;

    if (ctx.measureText(rawText).width <= availableWidth) {
      this.truncatedText = rawText;
      return;
    }

    let truncated = '';
    for (let i = 0; i < rawText.length; i++) {
      const test = rawText.slice(0, i + 1) + '…';
      if (ctx.measureText(test).width > availableWidth) break;
      truncated = rawText.slice(0, i + 1);
    }

    this.truncatedText = truncated + '…';
  };

  render() {
    const hasError = this.invalid && !this.disabled && !this.groupDisabled;
    const showHint = this.hint && !hasError;
    const showError = this.error && hasError;

    return (
      <Host
        class={{
          'b2b-dropdown': true,
          'b2b-dropdown--error': hasError,
          'b2b-dropdown--disabled': this.disabled || this.groupDisabled,
        }}>
        {this.label && (
          <b2b-input-label id={this.name} required={this.required}>
            {this.label}
          </b2b-input-label>
        )}

        <div
          class="b2b-dropdown__wrapper"
          onFocus={this.onFocus}
          onBlur={this.onBlur}>
          <div
            class={{
              'b2b-dropdown__select': true,
              'b2b-dropdown__select--open': this.isOpen,
              'b2b-dropdown__select--focused': this.focused,
            }}
            ref={el => (this.selectEl = el as HTMLDivElement)}
            onClick={this.toggleDropdown}
            role="combobox"
            aria-expanded={`${this.isOpen}`}
            aria-labelledby={this.name}>
            {this.truncatedText}
          </div>

          {this.isOpen && (
            <div class="b2b-dropdown__options" role="listbox">
              {this.options.map(option => (
                <div
                  key={option.value}
                  class={{
                    'b2b-dropdown__option': true,
                    'b2b-dropdown__option--selected': option.selected,
                    'b2b-dropdown__option--disabled': option.disabled,
                  }}
                  data-value={option.value}
                  onClick={!option.disabled ? this.onSelect : undefined}
                  role="option"
                  aria-selected={option.selected ? 'true' : 'false'}
                  aria-disabled={option.disabled ? 'true' : 'false'}>
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {showHint && <span>{this.hint}</span>}
        {showError && <span>{this.error}</span>}
      </Host>
    );
  }
}
