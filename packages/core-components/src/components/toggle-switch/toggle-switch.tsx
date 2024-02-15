import { Component, Host, Element, Prop, h } from '@stencil/core';

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
  @Prop() state: boolean = false;

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
            }}>
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
            <div class={{ [`b2b-toggle__text-${this.labelPosition}`]: true }}>
              {this.label}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
