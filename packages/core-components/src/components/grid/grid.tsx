import { Component, Prop, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'b2b-grid',
  styleUrl: 'grid.scss',
  shadow: true,
})
export class B2bGridComponent {
  @Element() hostElement: HTMLB2bGridElement;

  /** The inner padding of the grid container measured in px. */
  @Prop() margin: number = 24;
  render() {
    return (
      <Host style={{ ['padding']: `${this.margin}px` }} class="b2b-grid">
        <slot></slot>
      </Host>
    );
  }
}
