import { Component, h, Prop } from '@stencil/core';

/**
 * Paragraph component to render text content.
 * Initial story: https://otto-eg.atlassian.net/browse/B2BDS-45
 */
@Component({
  tag: 'b2b-paragraph',
  styleUrl: 'paragraph.scss',
  shadow: true,
})
export class ParagraphComponent {
  /** The weight of the text. */
  @Prop() weight: 'bold' | 'normal' = 'normal';

  /** The size of the text. */
  @Prop() size: '50' | '100' = '100';

  /** The alignment of the text. */
  @Prop() align: 'left' | 'right' | 'center' = 'left';

  render() {
    return (
      <p
        class={{
          'b2b-paragraph': true,
          ['b2b-paragraph--size-' + this.size]: true,
          ['b2b-paragraph--weight-' + this.weight]: true,
          ['b2b-paragraph--align-' + this.align]: true,
        }}>
        <slot></slot>
      </p>
    );
  }
}
