import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from '@stencil/core';

@Component({
  tag: 'b2b-snackbar',
  styleUrl: 'snackbar.scss',
  shadow: true,
})
export class SnackbarComponent {
  /** Text on the snackbar. */
  @Prop() description: string;

  /** The type of snackbar. Default is info. */
  @Prop() type: 'info' | 'success' | 'warning' | 'error' = 'info';

  /** Whether the snackbar is currently visible. Set to true to display the snackbar. */
  @Prop({ mutable: true }) opened: boolean = false;

  /** Whether snackbar is show for limited time. Default is true. Error snackbars cannot be timed. */
  @Prop() timed: boolean = true;

  /** How long is snackbar shown. Default value is 5000 ms. */
  @Prop() duration: number = 5000;

  /** Whether the snackbar has a close button. Per default, it is true.*/
  @Prop() hasCloseButton: boolean = true;

  /** Whether the snackbar has a Call-to-Action. Per default, it is false. */
  @Prop() hasAction: boolean = false;

  /** Text for the Call-to-Action link. */
  @Prop() actionLabel: string;

  /** Function passed that is called when clicking on CTA. */
  @Prop() onActionClick: () => void;

  /** Whether the description is underlined. If false, then it is bold. */
  @Prop() isUnderlined: boolean = false;

  /** Emits whenever the snackbar is closed. */
  @Event({ eventName: 'b2b-close' })
  b2bClose: EventEmitter<void>;

  private timeoutId: number;
  private startTime: number;
  private remainingTime: number;

  @Watch('opened')
  onVisibleChange(newValue: boolean) {
    if (this.timed && this.type !== 'error') {
      if (newValue) {
        this.remainingTime = this.duration;
        this.startTimer();
      } else {
        this.clearTimer();
      }
    }
  }

  private startTimer() {
    if (this.timed && this.type !== 'error') {
      this.clearTimer();

      this.startTime = Date.now();
      this.timeoutId = window.setTimeout(() => {
        this.opened = false;
      }, this.remainingTime);
    }
  }

  private clearTimer() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /** when user hovers over snackbar, the timer is paused. */
  private handleMouseEnter = () => {
    if (this.timeoutId && this.timed && this.type !== 'error') {
      this.remainingTime -= Date.now() - this.startTime;
      this.clearTimer();
    }
  };

  private handleMouseLeave = () => {
    this.startTimer();
  };

  disconnectedCallback() {
    clearTimeout(this.timeoutId);
  }

  private close = () => {
    this.opened = false;
    this.b2bClose.emit();
  };

  private canClose = () => {
    return this.hasCloseButton;
  };

  private isActionPresent = () => {
    return this.hasAction;
  };

  private chooseIcon = () => {
    let iconName;
    switch (this.type) {
      case 'success':
        iconName = 'b2b_icon-check';
        break;
      case 'info':
        iconName = 'b2b_icon-info';
        break;
      case 'error':
        iconName = 'b2b_icon-error';
        break;
      case 'warning':
        iconName = 'b2b_icon-warning';
        break;
      default:
        iconName = 'b2b_icon-info';
    }
    return <b2b-icon-100 icon={iconName} size={28}></b2b-icon-100>;
  };

  private handleActionClick = () => {
    this.onActionClick();
  };

  render() {
    return (
      <Host
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <div
          class={{
            'b2b-snackbar': true,
            [`b2b-snackbar--${this.type}`]: true,
            'b2b-snackbar--opened': this.opened,
          }}>
          <div class="b2b-snackbar__content">
            <span class={{ [`b2b-snackbar--${this.type}__icon`]: true }}>
              {this.chooseIcon()}
            </span>
            <p
              class={{
                'b2b-snackbar__content__description': true,
                'b2b-snackbar__content__description--underlined':
                  this.isUnderlined,
              }}>
              {this.description}
            </p>
          </div>
          {this.isActionPresent() && (
            <div
              class={{
                'b2b-snackbar__action': true,
                [`b2b-snackbar__action--${this.type}`]: true,
              }}
              onClick={this.handleActionClick}>
              <a>{this.actionLabel}</a>
            </div>
          )}
          {this.canClose() && (
            <div
              class={{
                'b2b-snackbar__close-icon': true,
                [`b2b-snackbar__close-icon--${this.type}`]: true,
              }}
              onClick={this.close}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.6974 11.9902L19.0942 5.59343C19.27 5.39513 19.261 5.09417 19.0736 4.90675C18.8862 4.71934 18.5852 4.71032 18.3869 4.88618L11.9902 11.2829L5.59343 4.88618C5.39513 4.71032 5.09417 4.71934 4.90675 4.90675C4.71934 5.09417 4.71032 5.39513 4.88618 5.59343L11.2829 11.9902L4.88618 18.3869C4.71291 18.5854 4.72294 18.8841 4.90912 19.0705C5.09531 19.2569 5.39404 19.2672 5.59268 19.0942L11.9894 12.6974L18.3862 19.0942C18.4798 19.1881 18.6069 19.2408 18.7394 19.2408C18.872 19.2408 18.9991 19.1881 19.0927 19.0942C19.2875 18.8987 19.2875 18.5824 19.0927 18.3869L12.6959 11.9902H12.6974Z"
                />
              </svg>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
