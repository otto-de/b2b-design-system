import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'b2b-breadcrumb',
  styleUrl: 'breadcrumb.scss',
  shadow: true,
})
export class BreadCrumbComponent {
  render() {
    return (
      <Host>
        <div class="b2b-breadcrumb-nav">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
