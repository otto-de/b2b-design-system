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

  /** An optional label for the toggle switch. */
  @Prop() label?: string;

  /**The toggle name. Use this if the toggle switch is used in a form group. */
  @Prop() name?: string;

  /** The alignment of the toggle switch label. */
  @Prop() labelPosition: 'left' | 'right' = 'left';

  /** Whether or not the toggle button is currently disabled. Per default it is false. */
  @Prop() disabled = false;

  /** Whether or not the toggle button is currently on or off. Per default it is off. */
  @Prop({ mutable: true }) state = false;

  /** Emits the toggle switch value when it's state changes. */
  @Event({ eventName: 'b2b-change' })
  b2bChange: EventEmitter<ToggleSwitchEventDetail>;

  private emitDetail = () => {
    console.log(this.state);
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

  private onKeyDown = (ev: KeyboardEvent) => {
    if (ev.key != 'Enter' || this.disabled) {
      return;
    } else {
      this.state = !this.state;
    }
    this.emitDetail();
  };

  render() {
    // workaround for purgecss as safelist doesn't work
    const isLeft = this.labelPosition === 'left';
    return (
      <Host>
        <div
          class={{
            'b2b-toggle': true,
            'b2b-toggle--disabled': this.disabled,
            'b2b-toggle--checked': this.state,
          }}>
          <div
            class={{
              'b2b-toggle__label': true,
              'b2b-toggle__label--left': isLeft,
            }}>
            <span
              class="b2b-toggle__switch"
              role="switch"
              tabIndex={0}
              onKeyDown={this.onKeyDown}
              onClick={this.onClick}>
              <svg
                class={{
                  'b2b-toggle__icon': true,
                  'b2b-toggle__icon--show': this.state,
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30">
                <path d="M11.798 25.082c-.341 0-.681-.13-.942-.389l-7.132-7.115a1.334 1.334 0 0 1 1.884-1.888l6.19 6.175L26.391 7.307a1.334 1.334 0 0 1 1.884 1.888L12.74 24.693c-.26.259-.601.389-.942.389z" />
              </svg>
            </span>
            {this.label && (
              <span
                class={{
                  'b2b-toggle__text': true,
                  'b2b-toggle__text--left': isLeft,
                }}>
                {this.label}
              </span>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
