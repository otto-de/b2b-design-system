import {
  Component,
  h,
  Prop,
  Host,
  EventEmitter,
  Event,
  State,
  Element,
  Watch,
  Listen,
} from '@stencil/core';
import { isFocusable, isHidden, queryShadowRoot } from '../../utils/focus-trap';
import {
  BeforeCloseEventDetail,
  CloseEventTrigger,
} from '../../utils/interfaces/status.interface';

/** Modal component
 * Initial story: https://otto-eg.atlassian.net/browse/B2BDS-53
 */

@Component({
  tag: 'b2b-modal',
  styleUrl: 'modal.scss',
  shadow: true,
})
export class ModalComponent {
  @Element() hostElement: HTMLB2bModalElement;

  /** The title for the modal. This is required. */
  @Prop() heading!: string;

  /** Whether the modal is shown or not. Default is false */
  @Prop({ mutable: true, reflect: true }) opened: boolean = false;

  /** A boolean that indicates whether the modal can be dismissed by clicking
   in the backdrop outside the modal. */
  @Prop() backdropDismiss: boolean = false;

  /** A boolean to indicate whether the modal can be dismissed by pressing
   the escape key on the keyboard */
  @Prop() escDismiss: boolean = true;

  /** The size of the modal. If not specified, will assume the default size */
  @Prop() variant: 'default' | 'large' = 'default';

  /** This even will be triggered when the modal is closed */
  @Event({ eventName: 'b2b-close' })
  b2bClose: EventEmitter<void>;

  /** This even will be triggered before the modal is closed */
  @Event({ eventName: 'b2b-before-close' })
  b2bBeforeClose: EventEmitter<BeforeCloseEventDetail>;

  @State() iconHover: boolean = false;

  @State() isOpen: boolean = this.opened || false;

  private closeButton: HTMLButtonElement;
  private focusableElements: HTMLElement[] = [];

  private toggleIconHover = () => {
    this.iconHover = !this.iconHover;
  };

  private emitBeforeClose = (trigger: CloseEventTrigger) => {
    const customEvent = this.b2bBeforeClose.emit({ trigger });
    const prevented = customEvent.defaultPrevented;
    if (!prevented) {
      this.opened = false;
    }
  };

  @Listen('keydown')
  handleKeypress(event: KeyboardEvent) {
    if (!this.isOpen || !this.escDismiss) {
      return;
    }
    if (event.key === 'Escape') {
      this.emitBeforeClose('ESCAPE_KEY');
      event.stopPropagation();
    }
  }

  private handleBackdropDismiss = () => {
    this.backdropDismiss && this.emitBeforeClose('BACKDROP');
  };

  private handleClickDismiss = () => {
    this.emitBeforeClose('CLOSE_BUTTON');
  };

  @Watch('opened')
  openedChanged(newValue: boolean) {
    if (newValue === true) {
      this.open();
    } else {
      this.close();
    }
  }

  private handleTopFocus = () => {
    this.attemptFocus(this.getLastFocusableElement());
  };

  private handleBottomFocus = () => {
    this.attemptFocus(this.getFirstFocusableElement());
  };

  private attemptFocus(element: HTMLElement | undefined | null) {
    if (element === undefined || element === null) {
      this.closeButton.focus();
      return;
    }
    element.focus();
  }

  private open() {
    this.isOpen = true;
  }

  private close() {
    this.isOpen = false;
    this.b2bClose.emit();
  }

  private getFirstFocusableElement(): HTMLElement | null {
    return this.focusableElements[0];
  }

  private getLastFocusableElement(): HTMLElement | null {
    return this.focusableElements[this.focusableElements.length - 1];
  }

  componentDidLoad() {
    // Query all focusable elements and store them in `focusableElements`.
    // Needed for the "focus trap" functionality.
    this.focusableElements = queryShadowRoot(
      this.hostElement.shadowRoot,
      el => isHidden(el) || el.matches('[data-focus-trap-edge]'),
      isFocusable,
    );
  }

  componentDidRender() {
    this.attemptFocus(this.getFirstFocusableElement());
  }

  render() {
    return (
      <Host>
        <div class={{ 'b2b-modal': true, 'b2b-modal--open': this.opened }}>
          <div
            data-focus-trap-edge
            onFocus={this.handleTopFocus}
            tabIndex={0}></div>
          <div
            class={{
              'b2b-modal__dialog': true,
              [`b2b-modal__dialog--${this.variant}`]: true,
            }}>
            <div class="b2b-modal__dialog__header">
              <b2b-headline align="center" size="200" noMargin={true}>
                {this.heading}
              </b2b-headline>
              <button
                type="button"
                class="b2b-modal__dialog__close"
                onMouseEnter={this.toggleIconHover}
                onMouseLeave={this.toggleIconHover}
                onClick={this.handleClickDismiss}
                ref={el => (this.closeButton = el)}>
                <b2b-icon
                  clickable
                  icon="b2b_icon-close"
                  color={this.iconHover ? 'primary' : 'secondary'}></b2b-icon>
              </button>
            </div>
            <div class="b2b-modal__dialog__body">
              <slot></slot>
            </div>

            <div class="b2b-modal__dialog__footer">
              <div class="b2b-modal__dialog__footer-left">
                <slot name="footer-left"></slot>
              </div>
              <div class="b2b-modal__dialog__footer-right">
                <slot name="footer-right"></slot>
              </div>
            </div>
          </div>
          <div
            data-focus-trap-edge
            onFocus={this.handleBottomFocus}
            tabIndex={0}></div>
          <div
            class="b2b-modal__backdrop"
            onClick={this.handleBackdropDismiss}></div>
        </div>
      </Host>
    );
  }
}
