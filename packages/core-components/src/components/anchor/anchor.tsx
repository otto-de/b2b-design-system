import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'b2b-anchor',
  styleUrl: 'anchor.scss',
  shadow: true,
})
export class AnchorComponent {
  /** The URL or URL fragment the anchor points to. This is required. */
  @Prop() href!: string;

  /** If set to true, the browser will attempt to donwload and save the URL instead of opening it. The name of the created file
   * defaults to the URL string, but can be changed by the user. */
  @Prop() download: string = null;

  /** The target the URL will be opened into. The default is self. */
  @Prop() target: 'self' | 'blank' | 'parent' | 'top' = 'self';

  /** The size of the link. Per default, it is inherited from the parent element. If specified to 100, the font size is 14px. */
  @Prop() size: 'inherit' | '100' = 'inherit';

  render() {
    return (
      <a
        href={this.href}
        download={this.download}
        target={`_${this.target}`}
        class={{
          'b2b-anchor': true,
          [`b2b-anchor--${this.size}`]: true,
        }}>
        <slot></slot>
      </a>
    );
  }
}
