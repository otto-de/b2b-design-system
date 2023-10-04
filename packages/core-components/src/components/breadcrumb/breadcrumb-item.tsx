import { Component, Prop, Host, h, Event, EventEmitter } from '@stencil/core';
import { BreadCrumbChangeEventDetail } from '../../utils/interfaces/interaction.interface';

@Component({
  tag: 'b2b-breadcrumb-item',
  styleUrl: 'breadcrumb.scss',
  shadow: true,
})
export class BreadCrumbItemComponent {
  /** If defined, an anchor tag will be rendered instead of a span, opening the specified link in the same context when clicked. */
  @Prop() href: string = null;

  /** The value associated with the current page. It is required, must be unique and can be a page title, an id or something similar. */
  @Prop() value!: any;

  /** If the item is currently selected. If true, it will not emit an event when clicked and does not have a hover state.*/
  @Prop({ mutable: true }) active = false;

  /** @internal Emits whenever a breadcrumb item is clicked and no href is specified */
  @Event({ eventName: 'b2b-change' })
  b2bChange: EventEmitter<BreadCrumbChangeEventDetail>;

  private onClick = () => {
    if (this.active || this.href != null) {
      return;
    }
    this.b2bChange.emit(this.value);
    this.active = true;
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key != 'enter' || this.active) {
      return;
    }
    this.b2bChange.emit();
    this.active = true;
  };

  render() {
    return (
      <Host
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        tabindex={Boolean(this.href) ? null : 0}>
        <span
          class={{
            'b2b-breadcrumb-nav__item': true,
            'b2b-breadcrumb-nav__item--active': this.active,
          }}>
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
