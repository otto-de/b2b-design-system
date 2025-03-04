import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'b2b-background-box',
  styleUrl: 'background-box.scss',
  shadow: true,
})
export class BackgroundBoxComponent {
  @Element() host: HTMLB2bBackgroundBoxElement;
  /** Sets max width to 1212px. Per default, it is false */
  @Prop() maxWidth: boolean = false;
  /** Whether the box should have a padding. Per default, padding is enabled */
  @Prop() noPadding: boolean = false;
  /** Whether the box should have a top border. Per default, the border is enabled */
  @Prop() borderTop: 'default' | 'none' = 'default';
  /** Whether the box should have a right border. Per default, the border is enabled */
  @Prop() borderRight: 'default' | 'none' = 'default';
  /** Whether the box should have a bottom border. Per default, the border is enabled */
  @Prop() borderBottom: 'default' | 'none' = 'default';
  /** Whether the box should have a left border. Per default, the border is enabled */
  @Prop() borderLeft: 'default' | 'none' = 'default';

  render() {
    return (
      <Host
        class={{
          'b2b-background-box': true,
          'b2b-background-box--max-width': this.maxWidth,
          'b2b-background-box--no-padding': this.noPadding,
          'b2b-background-box--hide-border-top': this.borderTop === 'none',
          'b2b-background-box--hide-border-right': this.borderRight === 'none',
          'b2b-background-box--hide-border-bottom':
            this.borderBottom === 'none',
          'b2b-background-box--hide-border-left': this.borderLeft === 'none',
        }}>
        <slot></slot>
      </Host>
    );
  }
}
