import { Component, Prop, Host, h } from '@stencil/core';

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

  /** The hoverColor of the link. Per default, it is set to b2b-color-red-100. If specified as inherit, it is inherited from the parent element. */
  @Prop() hoverColor: 'inherit' | 'default' = 'default';

  /** The underlineText of the link. If set to false, the link text will not be underlined. */
  @Prop() underlineText: boolean = true;

  render() {
    return (
      <Host>
        <a
          href={this.href}
          download={this.download}
          target={`_${this.target}`}
          class={{
            'b2b-anchor': true,
            [`b2b-anchor--${this.size}`]: true,
            [`b2b-anchor-hover--${this.hoverColor}`]: true,
            'b2b-anchor--underline-text': this.underlineText,
          }}>
          <slot></slot>
        </a>
      </Host>
    );
  }
}
