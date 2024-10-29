import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'b2b-background-box',
  styleUrl: 'background-box.scss',
  shadow: true,
})
export class BackgroundBoxComponent {
  @Element() host: HTMLB2bBackgroundBoxElement;
  /** Fixes width to 1212px. Per default, it is false */
  @Prop() fixedWidth: boolean = false;
  /** Whether the box should have a padding. Per default, padding is enabled */
  @Prop() noPadding: boolean = false;

  render() {
    return (
      <Host
        class={{
          'b2b-background-box': true,
          'b2b-background-box--fixed-width': this.fixedWidth,
          'b2b-background-box--no-padding': this.noPadding,
        }}>
        <slot></slot>
      </Host>
    );
  }
}
