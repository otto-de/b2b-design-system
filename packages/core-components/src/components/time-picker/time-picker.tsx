import {
  Component,
  type ComponentInterface,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import {
  type DateClear,
  InputChangeEvent,
} from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-time-picker',
  styleUrl: 'time-picker.scss',
  shadow: true,
})
export class TimePickerComponent implements ComponentInterface {
  /** The time picker label. */
  @Prop() label?: string;

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop({ reflect: true }) required: boolean = false;

  /** The placeholder for the time picker input field. */
  @Prop({ reflect: true }) placeholder: string = 'hh:mm';

  /** Whether the time picker is currently invalid. If true, the time picker is rendered with error styles. Per default, it is false. */
  @Prop({ reflect: true }) invalid: boolean = false;

  /** The hint text that appears underneath the time picker field. */
  @Prop() hint?: string;

  /** The interval in minutes for the time options. Default is 15 minutes. */
  @Prop() interval?: number = 15;

  /** The error message that is shown if the input is invalid. */
  @Prop() error?: string;

  /** The value of the time picker. It has to be in the format "hh:mm". */
  @Prop({ mutable: true, reflect: true }) value: string = null;

  /** Emits whenever the time picker receives focus. */
  @Event({ eventName: 'b2b-focus' })
  b2bFocus: EventEmitter<FocusEvent>;

  /** Emits whenever the time picker loses focus. */
  @Event({ eventName: 'b2b-blur' })
  b2bBlur: EventEmitter<FocusEvent>;

  /** Emits whenever the input value changes. */
  @Event({ eventName: 'b2b-input' })
  b2bInput: EventEmitter<InputChangeEvent>;

  /** Emits whenever a time is selected from the dropdown. */
  @Event({ eventName: 'b2b-selected' })
  b2bChange: EventEmitter<string>;

  /** Emits when the user clicks the clear button. */
  @Event({ eventName: 'b2b-clear' })
  b2bClear: EventEmitter<DateClear>;

  @State() hasFocus = false;
  @State() isOpen = false;
  @State() availableTimes: string[] = [];
  @State() internalErrorMessage: string = '';
  @State() internalInvalid: boolean = false;

  private inputRef?: HTMLInputElement;

  componentWillLoad() {
    this.availableTimes = this.getAvailableTimes();
    if (this.value) {
      this.validateInput(this.value);
    }
  }

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true;
    this.isOpen = true;
    this.b2bFocus.emit(ev);
  };

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false;
    this.isOpen = false;
    this.b2bBlur.emit(ev);
  };

  private onInput = (ev: Event) => {
    this.isOpen = false;
    const input = ev.target as HTMLInputElement | null;
    this.value = input.value;
    console.log('onInput isOpen: ' + this.isOpen);
    this.b2bInput.emit({ value: this.value });
  };

  @Watch('interval')
  handleIntervalChange() {
    this.availableTimes = this.getAvailableTimes();
  }

  @Watch('value')
  validateValue(newValue: string) {
    this.value = newValue;
    this.validateInput(newValue);
  }

  private validateInput = (value: string) => {
    const match = value.match(/^(\d{2}):(\d{2})$/);
    let isValid = false;
    if (match) {
      const hour = parseInt(match[1], 10);
      const minute = parseInt(match[2], 10);
      isValid = hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
    }
    if (!isValid && value.length > 0) {
      this.internalErrorMessage = 'Invalid format';
      this.internalInvalid = true;
    } else {
      this.internalErrorMessage = '';
      this.internalInvalid = false;
    }
  };

  private get isInvalid() {
    return this.invalid || this.internalInvalid;
  }

  private get currentErrorMessage() {
    return this.error || this.internalErrorMessage;
  }

  private getAvailableTimes() {
    const times = [];
    const step = this.interval || 15;
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += step) {
        const time = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        times.push(time);
      }
    }
    return times;
  }

  private onSelect = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const selectedValue = target.getAttribute('data-value');
    if (selectedValue !== null) {
      this.value = selectedValue;
      this.b2bChange.emit(selectedValue);
      this.internalInvalid = false;
      this.internalErrorMessage = '';
      this.hasFocus = false;
      this.isOpen = false;
      this.inputRef?.blur();
    }
  };

  private onClear = () => {
    this.value = '';
    this.internalInvalid = false;
    this.internalErrorMessage = '';
    this.hasFocus = false;
    this.b2bClear.emit();
  };

  private toggleDropdown = () => {
    this.isOpen = !this.isOpen;
    console.log('toggleDropdown isOpen: ' + this.isOpen);
    if (this.isOpen) {
      this.inputRef?.focus();
    }
  };

  render() {
    return (
      <Host
        class={{
          'b2b-time-picker': true,
          'b2b-time-picker--error': this.isInvalid,
        }}>
        {this.label && (
          <b2b-input-label id={this.label} required={this.required}>
            {this.label}
          </b2b-input-label>
        )}
        <div
          class={{
            'b2b-time-picker__wrapper': true,
            'b2b-time-picker__wrapper--focused': this.hasFocus,
            'b2b-time-picker__wrapper--filled':
              !this.hasFocus && !this.invalid && this.value !== '',
            'b2b-time-picker__wrapper--error': this.isInvalid,
          }}>
          <input
            ref={el => (this.inputRef = el as HTMLInputElement)}
            class={{
              'b2b-time-picker__native-input': true,
            }}
            type="text"
            placeholder={this.placeholder}
            value={this.value}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onInput={this.onInput}
          />
          <div class="b2b-icons">
            {this.value && (
              <div class="b2b-close-icon" onClick={this.onClear}>
                <b2b-icon-100
                  icon="b2b_icon-close"
                  aria-label="clear input"
                  clickable={true}></b2b-icon-100>
              </div>
            )}
            <div
              class="b2b-duration-icon"
              onMouseDown={e => {
                e.preventDefault();
                this.toggleDropdown();
              }}>
              <b2b-icon-100
                icon="b2b_icon-duration"
                clickable={true}></b2b-icon-100>
            </div>
          </div>
        </div>
        <div
          class={{
            'b2b-time-picker__options-container': true,
            'b2b-time-picker__options-container--visible':
              this.isOpen && this.hasFocus,
          }}
          onMouseDown={e => e.preventDefault()}>
          <div
            class="b2b-time-picker__options"
            role="listbox"
            aria-label={this.label}
            tabIndex={-1}>
            {this.availableTimes.map(time => (
              <div
                key={time}
                class={{
                  'b2b-time-picker__option': true,
                  'b2b-time-picker__option--selected': time === this.value,
                }}
                data-value={time}
                onClick={this.onSelect}
                role="option"
                aria-selected={time === this.value ? 'true' : 'false'}>
                {time}
              </div>
            ))}
          </div>
        </div>
        {
          <span
            class={{
              'b2b-time-picker__hint': true,
              'b2b-time-picker__hint--error': this.isInvalid,
            }}>
            {this.isInvalid ? this.currentErrorMessage : this.hint}
          </span>
        }
      </Host>
    );
  }
}
