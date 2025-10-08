import {
  Component,
  type ComponentInterface,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from '@stencil/core';
import { InputChangeEvent } from '../../utils/interfaces/form.interface';

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
  @Prop() errorMessage?: string;

  /** Emits whenever the time picker receives focus. */
  @Event({ eventName: 'b2b-focus' })
  b2bFocus: EventEmitter<FocusEvent>;

  /** Emits whenever the time picker loses focus. */
  @Event({ eventName: 'b2b-blur' })
  b2bBlur: EventEmitter<FocusEvent>;

  /** Emits whenever the input value changes. */
  @Event({ eventName: 'b2b-input' })
  b2bInput: EventEmitter<InputChangeEvent>;

  @Event({ eventName: 'b2b-selected' })
  b2bChange: EventEmitter<string>;

  @State() hasFocus = false;
  @State() isOpen = false;
  @State() selectedTime: string = '';
  @State() availableTimes: string[] = [];
  // @State() errorMessage: string = '';
  // @State() invalid: boolean = false;

  componentWillLoad() {
    this.availableTimes = this.getAvailableTimes();
  }

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true;
    this.isOpen = true;
    this.b2bFocus.emit(ev);
  };

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false;
    setTimeout(() => {
      this.isOpen = false;
    }, 100);
    this.b2bBlur.emit(ev);
  };

  private onInput = (ev: Event) => {
    this.isOpen = false;

    const input = ev.target as HTMLInputElement | null;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length > 2) {
      value = value.slice(0, 2) + ':' + value.slice(2, 4);
    }

    if (input) {
      input.value = value;
    }

    const match = value.match(/^(\d{2}):(\d{2})$/);
    let isValid = false;
    if (match) {
      const hour = parseInt(match[1], 10);
      const minute = parseInt(match[2], 10);
      isValid = hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
    }

    this.selectedTime = value;
    if (!isValid && value.length > 0) {
      this.errorMessage = 'Invalid format';
      this.invalid = true;
    } else {
      this.invalid = false;
      this.errorMessage = '';
    }

    this.b2bInput.emit(input);
  };

  private getAvailableTimes() {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += this.interval) {
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
    const value = target.getAttribute('data-value');
    if (value) {
      this.selectedTime = value;
      this.b2bChange.emit(value);
      this.isOpen = false;
      this.invalid = false;
      this.hasFocus = false;
    }
  };

  private onClear = () => {
    this.selectedTime = '';
    this.invalid = false;
    this.errorMessage = '';
    this.b2bChange.emit('');
    this.hasFocus = false;
  };

  render() {
    return (
      <Host
        class={{
          'b2b-time-picker': true,
          'b2b-time-picker--error': this.invalid,
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
              !this.hasFocus && !this.invalid && this.selectedTime !== '',
            'b2b-time-picker__wrapper--error': this.invalid,
          }}>
          <input
            class={{
              'b2b-time-picker__native-input': true,
            }}
            type="text"
            placeholder={this.placeholder}
            value={this.selectedTime}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onInput={this.onInput}
          />
          <div class="b2b-icons">
            {this.selectedTime && (
              <div class="b2b-close-icon" onClick={this.onClear}>
                <b2b-icon-100
                  icon="b2b_icon-close"
                  aria-label="clear input"
                  clickable={true}></b2b-icon-100>
              </div>
            )}
            <div
              class="b2b-duration-icon"
              onClick={() => (this.isOpen = !this.isOpen)}>
              <b2b-icon-100
                icon="b2b_icon-duration"
                clickable={true}></b2b-icon-100>
            </div>
          </div>
        </div>
        <div
          class={{
            'b2b-time-picker__options-container': true,
            'b2b-time-picker__options-container--visible': this.isOpen,
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
                  'b2b-time-picker__option--selected':
                    time === this.selectedTime,
                }}
                data-value={time}
                onClick={this.onSelect}
                role="option"
                aria-selected={time === this.selectedTime ? 'true' : 'false'}>
                {time}
              </div>
            ))}
          </div>
        </div>
        {
          <span
            class={{
              'b2b-time-picker__hint': true,
              'b2b-time-picker__hint--error': this.invalid,
            }}>
            {this.invalid ? this.errorMessage : this.hint}
          </span>
        }
      </Host>
    );
  }
}
