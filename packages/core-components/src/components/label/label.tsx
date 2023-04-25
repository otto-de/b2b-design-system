import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'b2b-label',
  styleUrl: 'label.scss',
  shadow: true,
})
export class LabelComponent {
  /** The type of the label. Per default it is neutral. */
  @Prop() type: 'neutral' | 'info' | 'success' | 'warning' | 'error' =
    'neutral';

  render() {
    return (
      <span
        class={{
          'b2b-label': true,
          [`b2b-label--${this.type}`]: true,
        }}>
        <slot></slot>
      </span>
    );
  }
}
