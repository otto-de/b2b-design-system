import { Component, h, Prop } from '@stencil/core';

/**
 * Headline component to render hading tags content.
 * Initial story: https://otto-eg.atlassian.net/browse/B2BDS-46
 */
@Component({
  tag: 'b2b-headline',
  styleUrl: 'headline.scss',
  shadow: true,
})
export class HeadlineComponent {
  /** Each variant has a different hierarchical order, where 1 is the highest level. 400 will render to `<h1>`, 200 to `<h2>` and 100 to `<h3>` */
  @Prop() size: '400' | '200' | '100' = '400';

  /** The alignment of the headline. */
  @Prop() align: 'left' | 'right' | 'center' = 'left';

  /** Whether the headline should have a margin. Per default, margins are enabled. */
  @Prop() noMargin: boolean = false;

  render() {
    let className = `b2b-headline`;
    const classes = {
      [`${className}--${this.size}`]: true,
      [`${className}--${this.align}`]: true,
      [`${className}--no-margin`]: this.noMargin,
    };

    switch (this.size) {
      case '400':
        return (
          <h1 class={classes}>
            <slot></slot>
          </h1>
        );
      case '200':
        return (
          <h2 class={classes}>
            <slot></slot>
          </h2>
        );
      case '100':
        return (
          <h3 class={classes}>
            <slot></slot>
          </h3>
        );
    }
  }
}
