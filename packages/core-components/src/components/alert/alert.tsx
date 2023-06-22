import {
  Component,
  Prop,
  h,
  Host,
  Watch,
  EventEmitter,
  Event,
} from '@stencil/core';
import { IconName } from '../icon/types';

@Component({
  tag: 'b2b-alert',
  styleUrl: 'alert.scss',
  shadow: true,
})
export class AlertComponent {
  /** The type of alert. Per default it is info. */
  @Prop() type: 'info' | 'success' | 'warning' | 'error' = 'info';

  /** The size of the alert. Per default it is large. If set to small, the alert will only have an icon. */
  @Prop() size: 'large' | 'small' = 'small';

  /** Whether the alert is currently open. Set to true to display the alert. */
  @Prop({ mutable: true }) opened: boolean = false;

  /** Whether or not the alert has a close button. Per default it is true. Note that errors and small alerts cannot be closed. */
  @Prop() hasCloseButton: boolean = true;

  /** Whether or not you want to use a custom icon. Per default, it is false. */
  @Prop() customIcon: boolean = false;

  /** Emits whenever the alert is closed. */
  @Event({ eventName: 'b2b-close' })
  b2bClose: EventEmitter<void>;

  @Watch('opened')
  openedChanged(newValue: boolean) {
    this.opened = newValue;
  }

  private chooseIcon = () => {
    const iconName: IconName = `b2b_icon-${this.type}`;
    return <b2b-icon icon={iconName}></b2b-icon>;
  };

  private close = () => {
    this.opened = false;
    this.b2bClose.emit();
  };

  private canClose = () => {
    return (
      this.hasCloseButton && this.size === 'large' && this.type !== 'error'
    );
  };

  private canCustomizeIcon = () => {
    return this.size === 'small' && this.customIcon;
  };

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-alert': true,
            [`b2b-alert--${this.type}`]: true,
            [`b2b-alert--${this.size}`]: true,
            'b2b-alert--open': this.opened,
          }}>
          <div class="b2b-alert__content">
            <span class={{ [`b2b-alert--${this.type}__icon`]: true }}>
              {this.canCustomizeIcon() ? <slot></slot> : this.chooseIcon()}
            </span>
            {this.size === 'large' && (
              <p>
                <slot></slot>
              </p>
            )}
          </div>
          {this.canClose() && (
            //using a custom icon as this component needs an icon size that is not supported in the icon component
            <div class="b2b-alert__close-icon" onClick={this.close}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M17.886 16l8.057-8.057a1.333 1.333 0 1 0-1.885-1.886l-8.057 8.057-8.057-8.057a1.333 1.333 0 1 0-1.886 1.886L14.115 16l-8.057 8.057a1.332 1.332 0 1 0 1.886 1.885l8.057-8.057 8.057 8.057a1.331 1.331 0 0 0 1.886 0 1.332 1.332 0 0 0 0-1.885L17.887 16z" />
              </svg>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
