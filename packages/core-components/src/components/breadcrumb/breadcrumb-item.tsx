import { Component, Prop, Host, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'b2b-breadcrumb-item',
  styleUrl: 'breadcrumb.scss',
  shadow: true,
})
export class BreadCrumbItemComponent {
  /** If defined, an anchor tag will be rendered instead of a span, opening the specified link in the same context when clicked. */
  @Prop() href: string = null;

  /** Emits whenever a breadcrumb item is clicked and no href is specified */
  @Event({ eventName: 'b2b-selected' })
  b2bChange: EventEmitter<void>;

  private onClick = () => {
    this.b2bChange.emit();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key != 'enter') {
      return;
    }
    this.b2bChange.emit();
  };

  render() {
    return (
      <Host
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        tabindex={Boolean(this.href) ? null : 0}>
        <span class="b2b-breadcrumb-nav__item">
          {this.href != null ? (
            <a href={this.href}>
              <slot></slot>
            </a>
          ) : (
            <slot></slot>
          )}
        </span>
      </Host>
    );
  }
}
