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
  @Prop({ mutable: true, reflect: true }) opened: boolean = false;

  /** Whether snackbar is show for limited time. Default is true. Error snackbars cannot be timed. */
  @Prop() timed: boolean = true;

  /** How long is snackbar shown. Default value is 5000 ms. */
  @Prop() duration: number = 5000;

  /** Whether the snackbar has a Call-to-Action. Per default, it is false. */
  @Prop() hasAction: boolean = false;

  /** Text for the Call-to-Action link. */
  @Prop() actionLabel: string;

  /** Width of the snackbar can be specified in px. If not provided, the default value is auto, which will adjust the width to fit the content. */
  @Prop() width: string;

  /** Emits whenever the snackbar is closed. */
  @Event({ eventName: 'b2b-close' })
  b2bClose: EventEmitter<void>;

  /** Emits whenever the CTA is clicked. */
  @Event({ eventName: 'b2b-action-click' })
  b2bActionClick: EventEmitter<void>;

  private timeoutId: number;
  private startTime: number;
  private remainingTime: number;

  @Watch('opened')
  onVisibleChange(newValue: boolean) {
    if (newValue) {
      this.open();
    }
  }

  componentWillLoad() {
    this.onVisibleChange(this.opened);
  }

  private open() {
    if (this.timed && this.type !== 'error') {
      this.remainingTime = this.duration;
      this.startTimer();
    }
  }

  private startTimer() {
    this.clearTimer();
    if (this.timed && this.type !== 'error') {
      this.startTime = Date.now();
      this.timeoutId = window.setTimeout(() => {
        this.close();
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
    if (this.timed && this.type !== 'error') {
      this.clearTimer();
    }
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
    this.b2bActionClick.emit();
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
          }}
          style={this.width ? { width: this.width } : { width: 'auto' }}>
          <div class="b2b-snackbar__content">
            <span class={{ [`b2b-snackbar--${this.type}__icon`]: true }}>
              {this.chooseIcon()}
            </span>
            <p class="b2b-snackbar__content__description">{this.description}</p>
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
          <div
            class={{
              'b2b-snackbar__close-icon': true,
              [`b2b-snackbar__close-icon--${this.type}`]: true,
            }}
            onClick={this.close}>
            <b2b-icon-100
              clickable={true}
              size={24}
              icon="b2b_icon-close"></b2b-icon-100>
          </div>
        </div>
      </Host>
    );
  }
}
