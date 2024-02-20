import {
  Component,
  Host,
  Element,
  Prop,
  h,
  Event,
  EventEmitter,
} from '@stencil/core';
import { ToggleSwitchEventDetail } from '../../utils/interfaces/interaction.interface';

@Component({
  tag: 'b2b-toggle-switch',
  styleUrl: 'toggle-switch.scss',
  shadow: true,
})
export class B2bToggleSwitchComponent {
  @Element() host: HTMLB2bToggleSwitchElement;

  /** The label of the toggle button. This is required */
  @Prop() label!: string;

  /** The alignment of the toggle switch label. */
  @Prop() labelPosition?: 'left' | 'right' = 'left';

  /** Whether or not the toggle button is currently disabled. Per default it is false. */
  @Prop() disabled = false;

  /** Whether or not the toggle button is currently on or off. Per default it is off. */
  @Prop() state = false;

  /** Emits the toggle switch value when it's state changes. */
  @Event({ eventName: 'b2b-change' })
  b2bChange: EventEmitter<ToggleSwitchEventDetail>;

  private emitDetail = () => {
    this.b2bChange.emit({
      value: this.state,
    });
    // Dispatches the native change event because it is not propagated beyond the shadow boundary
    // globalThis to target the lib.dom Event and not Stencil Event
    const changeEvent = new globalThis.Event('change');
    this.host.dispatchEvent(changeEvent);
  };

  private onClick = (ev: MouseEvent) => {
    ev.preventDefault();
    if (this.disabled) {
      return;
    } else {
      this.state = !this.state;
    }
    this.emitDetail();
  };

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-toggle': true,
            'b2b-toggle--disabled': this.disabled,
          }}>
          <div
            class={{
              [`b2b-toggle__${this.labelPosition}`]: true,
              'b2b-toggle__icon--show': this.state,
            }}>
            <div onClick={this.onClick}>
              <svg
                class={{
                  'b2b-toggle__icon': true,
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30">
                <path d="M11.798 25.082c-.341 0-.681-.13-.942-.389l-7.132-7.115a1.334 1.334 0 0 1 1.884-1.888l6.19 6.175L26.391 7.307a1.334 1.334 0 0 1 1.884 1.888L12.74 24.693c-.26.259-.601.389-.942.389z" />
              </svg>
              <input
                class="b2b-toggle__input"
                id="toggle"
                type="checkbox"
                checked={this.state}
                disabled={this.disabled}
              />
              <label class="b2b-toggle__label" htmlFor="toggle">
                <span class="b2b-toggle__switch" />
              </label>
            </div>
            <div class={{ [`b2b-toggle__text-${this.labelPosition}`]: true }}>
              {this.label}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
