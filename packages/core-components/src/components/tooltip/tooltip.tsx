import { Component, Prop, h, Host, Element, Watch } from '@stencil/core';

/**
 * The tooltip can display additional information, and will be visible based on
 * a specific trigger.
 * @slot (default) - The wrapped element main content.
 * @slot content - Use to pass custom content to the tooltip, like an icon or a link.
 */
@Component({
  tag: 'b2b-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true,
})
export class B2BTooltipComponent {
  @Element() host: HTMLB2bTooltipElement;

  /** Position of the tooltip. */
  @Prop() position: 'left' | 'right' | 'top' | 'bottom' = 'right';

  /** The content of the tooltip. Should be a string. If you need custom content like a b2b-link, use the named slot content. */
  @Prop() content: string;

  /** The trigger for the tooltip. Can be on hover, on focus or custom, i.e. for an onboarding sequence. Per default it is hover. */
  @Prop() trigger: 'hover' | 'focus' | 'custom' = 'hover';

  /** Whether the tooltip is currently opened or not. When the trigger is set to custom, changing this prop will change the tooltip's visibility. */
  @Prop({ reflect: true, mutable: true }) opened: boolean = false;

  private triggerEl: HTMLElement = undefined;

  @Watch('opened')
  handleOpenedChange(newValue: boolean) {
    this.opened = newValue;
  }

  private onFocus = () => {
    if (this.getTrigger('focus')) {
      this.opened = true;
    }
  };

  private onBlur = () => {
    if (this.getTrigger('focus')) {
      this.opened = false;
    }
  };

  private onMouseEnter = () => {
    if (this.getTrigger('hover')) {
      this.opened = true;
    }
  };

  private onMouseLeave = () => {
    if (this.getTrigger('hover')) {
      this.opened = false;
    }
  };

  private getTrigger = (trigger: string) => {
    const triggers = this.trigger.split(' ');
    return triggers.includes(trigger);
  };

  connectedCallback() {
    // Check if there are any HTML elements slotted.
    // and stop registration if there are none
    const children = Array.from(this.host.children).filter(
      x => !x.hasAttribute('slot'),
    );
    if (children.length === 0) {
      return;
    }
    // Manual event handler registration for focus events
    this.triggerEl = children[0] as HTMLElement;
    this.triggerEl.addEventListener('focus', this.onFocus, true);
    this.triggerEl.addEventListener('blur', this.onBlur, true);
  }

  disconnectedCallback() {
    if (Boolean(this.triggerEl)) {
      this.triggerEl.removeEventListener('focus', this.onFocus, true);
      this.triggerEl.removeEventListener('blur', this.onBlur, true);
    }
  }

  render() {
    return (
      <Host onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <span
          class={{
            [`b2b-tooltip--${this.position}`]: true,
            'b2b-tooltip__trigger': true,
          }}>
          <slot></slot>
          <div
            class={{
              'b2b-tooltip__content': true,
              'b2b-tooltip--visible': this.opened,
            }}>
            <slot name="content">{this.content}</slot>
          </div>
        </span>
      </Host>
    );
  }
}
