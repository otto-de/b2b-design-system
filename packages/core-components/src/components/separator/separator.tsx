import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'b2b-separator',
  styleUrl: 'separator.scss',
  shadow: true,
})
export class B2bSeparatorComponent {
  /** The alignment of the separator. Per default it is horizontal. */
  @Prop() alignment: 'vertical' | 'horizontal' = 'horizontal';

  render() {
    return (
      <Host>
        <div
          class={{
            [`b2b-separator--${this.alignment}`]: true,
          }}></div>
      </Host>
    );
  }
}
