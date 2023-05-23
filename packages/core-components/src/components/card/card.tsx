import {
  Component,
  Prop,
  h,
  Host,
  Element,
  Event,
  EventEmitter,
  Listen,
} from '@stencil/core';

@Component({
  tag: 'b2b-card',
  styleUrl: 'card.scss',
  shadow: true,
})
export class CardComponent {
  @Element() host: HTMLB2bCardElement;
  /** Disables the card. Per default, it is false */
  @Prop() disabled: boolean = false;

  /** An optional href in case the card is used to redirect on click. */
  @Prop() href?: string = '';

  /** The target of the card if used with an href. Blank per default. */
  @Prop() target?: 'blank' | 'self' = 'blank';

  /** Emits whenever the card is clicked on or enter is pressed while the card has focus. */
  @Event({ eventName: 'b2b-selected' })
  b2bChange: EventEmitter<void>;

  @Listen('click')
  onClick() {
    this.b2bChange.emit();
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.b2bChange.emit();
    }
  }

  private getTabIndex() {
    // not focusable
    if (this.disabled) return -1;
    // <a> element has native focus so using 0 makes it focusable twice
    // returning an empty string lets user agent decide if is focusable
    else if (this.href != '') return '';
    // makes card focusable without <a> element
    else return 0;
  }

  render() {
    return (
      <Host
        tabIndex={this.getTabIndex()}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'b2b-card': true,
          'b2b-card--disabled': this.disabled,
        }}>
        {this.href != '' && <a href={this.href} target={`_${this.target}`}></a>}
        {this.disabled && <div class="b2b-card--disabled-overlay"></div>}
        <slot></slot>
      </Host>
    );
  }
}
