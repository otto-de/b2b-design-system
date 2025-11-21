import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'b2b-shimmer',
  styleUrl: 'shimmer.scss',
  shadow: true,
})
export class ShimmerComponent {
  /** Whether the shimmer effect is shown or not. */
  @Prop() loading: boolean;

  /** The width of the shimmer effect in px. */
  @Prop() width: number;

  /** The height of the shimmer effect in px. */
  @Prop() height: number;

  render() {
    const shimmerStyle = {
      width: `${this.width}px`,
      height: `${this.height}px`,
    };

    return (
      <Host>
        {this.loading ? (
          <div class="b2b-shimmer" style={shimmerStyle} />
        ) : (
          <slot />
        )}
      </Host>
    );
  }
}
