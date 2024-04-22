import { Component, h, Prop } from '@stencil/core';

/**
 * Text component to render text content.
 */
@Component({
  tag: 'b2b-text',
  styleUrl: 'text.scss',
  shadow: true,
})
export class TextComponent {
  /** The weight of the text. */
  @Prop() weight: 'bold' | 'normal' = 'normal';

  /** The size of the text. */
  @Prop() size: '50' | '100' = '100';

  /** The alignment of the text. */
  @Prop() align: 'left' | 'right' | 'center' = 'left';

  render() {
    return (
      <span
        class={{
          'b2b-text': true,
          ['b2b-text--size-' + this.size]: true,
          ['b2b-text--weight-' + this.weight]: true,
          ['b2b-text--align-' + this.align]: true,
        }}>
        <slot></slot>
      </span>
    );
  }
}
