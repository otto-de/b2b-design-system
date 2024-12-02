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

  /** Whether or not the paragraph has a bottom margin. Defaults to true. */
  @Prop() margin: boolean = true;

  /** The color of the paragraph. Defaults to black. */
  @Prop() variant: 'black-100' | 'grey-400' = 'black-100';

  /** The positioning of the paragraph in the page flow. Defaults to native block behavior. */
  @Prop() display: 'inline' | 'inline-block' | 'block' = 'block';

  render() {
    return (
      <p
        style={{
          display: this.display,
        }}
        class={{
          'b2b-paragraph': true,
          ['b2b-paragraph--size-' + this.size]: true,
          ['b2b-paragraph--weight-' + this.weight]: true,
          ['b2b-paragraph--align-' + this.align]: true,
          ['b2b-paragraph--no-margin']: !this.margin,
          ['b2b-paragraph--variant-' + this.variant]: true,
        }}>
        <slot></slot>
      </p>
    );
  }
}
