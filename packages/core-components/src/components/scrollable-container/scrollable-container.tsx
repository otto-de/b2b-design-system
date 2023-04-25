import { Component, h, Element, Host } from '@stencil/core';

@Component({
  tag: 'b2b-scrollable-container',
  styleUrl: 'scrollable-container.scss',
  shadow: true,
})
export class ScrollableContainerComponent {
  @Element() host: HTMLB2bScrollableContainerElement;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
