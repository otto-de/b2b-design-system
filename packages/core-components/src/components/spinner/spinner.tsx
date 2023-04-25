import { Component, h, Prop } from '@stencil/core';

/**
 * Spinner component to display loading indicator.
 * Initial story: https://otto-eg.atlassian.net/browse/B2BDS-70
 */
@Component({
  tag: 'b2b-spinner',
  styleUrl: 'spinner.scss',
  shadow: true,
})
export class SpinnerComponent {
  /** The size of the spinner. */
  @Prop() size: '50' | '100' | '200' = '100';

  /** The color of the spinner. */
  @Prop() color: 'primary' | 'secondary' | 'inverse' = 'primary';

  render() {
    return (
      <div
        class={{
          'b2b-spinner': true,
          ['b2b-spinner--size-' + this.size]: true,
          ['b2b-spinner--color-' + this.color]: true,
        }}></div>
    );
  }
}
