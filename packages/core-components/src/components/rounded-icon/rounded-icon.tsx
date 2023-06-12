import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'b2b-rounded-icon',
  styleUrl: 'rounded-icon.scss',
  shadow: true,
})
export class RoundedIconComponent {
  /** The color of the circle around the icon or text.
   * Use any type including hex, rgb or css custom properties
   * as long as you pass it as a string */
  @Prop() color: string = 'var(--b2b-color-info-50)';

  /** The color of the text or icon within the circle.
   * Use any type including hex, rgb or css custom properties
   * as long as you pass it as a string */
  @Prop() contentColor: string = 'var(--b2b-color-copy-default)';

  render() {
    return (
      <Host>
        <div
          style={{
            ['background-color']: this.color,
          }}
          class={{
            'b2b-rounded-icon': true,
          }}>
          <div
            style={{
              ['color']: this.contentColor,
            }}>
            <slot name="icon"></slot>
          </div>
          <div
            style={{
              ['color']: this.contentColor,
            }}>
            <slot name="text"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
