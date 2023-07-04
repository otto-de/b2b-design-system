import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'b2b-breadcrumb-item',
  styleUrl: 'breadcrumb.scss',
  shadow: true,
})
export class BreadCrumbItemComponent {
  /** If set to true, the browser will attempt to donwload and save the URL instead of opening it. The name of the created file
   * defaults to the URL string, but can be changed by the user. */
  @Prop() href: string = null;

  /**If set to true, the last symbol in the breadcrumb will be skipped */
  @Prop() isLast: boolean = false;

  render() {
    return (
      <Host>
        <span class="obc_breadcrumb-nav__item">
          {this.href != null ? (
            <a href={this.href}>
              <slot></slot>
            </a>
          ) : (
            <slot></slot>
          )}
          {!this.isLast && <div class="obc_breadcrumb-nav__item-after">»</div>}
        </span>
      </Host>
    );
  }
}
