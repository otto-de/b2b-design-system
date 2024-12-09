import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  Listen,
} from '@stencil/core';
import { BreadCrumbChangeEventDetail } from '../../utils/interfaces/interaction.interface';

@Component({
  tag: 'b2b-breadcrumb',
  styleUrl: 'breadcrumb.scss',
  shadow: true,
})
export class B2bBreadCrumbComponent {
  @Element() host: HTMLB2bBreadcrumbElement;

  /** Vertical padding for the breadcrumb component */
  @Prop() paddingVertical: number = 0; // Default value is 0px

  /** Emits the value of the currently selected item whenever an item is selected. */
  @Event({ eventName: 'b2b-selected' })
  b2bSelected: EventEmitter<BreadCrumbChangeEventDetail>;

  @Listen('b2b-change')
  onSelectedChange(event) {
    const item = event.target;
    this.updateActiveItem(item);
    this.b2bSelected.emit({ value: item.value });
  }

  private getBreadcrumbItems = () => {
    return Array.from(this.host.querySelectorAll('b2b-breadcrumb-item'));
  };

  private updateActiveItem = (newItem: HTMLB2bBreadcrumbItemElement) => {
    this.getBreadcrumbItems()
      .filter(x => x.value != newItem.value)
      .forEach(x => (x.active = false));
  };

  render() {
    return (
      <Host
        style={{
          '--b2b-breadcrumb-padding-vertical': `${this.paddingVertical}px`,
        }}>
        <div class="b2b-breadcrumb-nav">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
