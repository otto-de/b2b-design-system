import {
  Component,
  Prop,
  h,
  Host,
  Listen,
  Element,
  Method,
} from '@stencil/core';

@Component({
  tag: 'b2b-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class ButtonComponent {
  @Element() hostElement: HTMLB2bButtonElement;

  /** The button variant. If not specified, the button will be the secondary variant. */
  @Prop() variant: 'primary' | 'secondary' = 'secondary';

  /** The button type. Matches native HTML types. The default type is 'button'. */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** The size of the button, 100 is the default state */
  @Prop() size: '100' | '50' = '100';

  /** The width of the button. Per default, it will fit the content */
  @Prop() width: 'fit-content' | 'fit-container' | 'custom' = 'fit-content';

  /** Whether the button is disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Whether the button is currently loading. Set to true to hide text and display loading spinner instead */
  @Prop() loading: boolean = false;

  /** Whether the button is currently active. Set to true when using the button to signify a permanent active state */
  @Prop({ reflect: true }) active: boolean = false;

  /** An optional anchor. If specified, the button will render an anchor element that can be use for navigation or download files  */
  @Prop() href?: string;

  /** The target of the button if it should behave like an anchor. Per default it is self. */
  @Prop() target?: 'self' | 'blank' = 'self';

  /** If set to true, the browser will attempt to donwload and save the URL instead of opening it. The name of the created file
   * defaults to the URL string, but can be changed by the user. */
  @Prop() download?: string;

  /** @internal Whether the parent input group is disabled. Per default, it is false. */
  @Prop() groupDisabled = false;

  private focusableElement: HTMLElement;

  /** Manually set focus to button element */
  @Method()
  async setFocus() {
    this.focusableElement.focus();
  }

  /**
   * Prevent clicks from being emitted from the host
   * when the component is `disabled`. (Taken from Telecom)
   */
  @Listen('click', { capture: true })
  handleHostClick(event: Event) {
    if (this.disabled === true || this.loading === true) {
      event.stopImmediatePropagation();
    }

    // Triggers a submit event on the parent form in the light DOM
    const form = this.hostElement.closest('form');
    if (form != null && this.type === 'submit') {
      const fakeSubmit = document.createElement('button');
      fakeSubmit.type = 'submit';
      fakeSubmit.style.display = 'none';
      form.appendChild(fakeSubmit);
      fakeSubmit.click();
      fakeSubmit.remove();
    }
  }

  private canLoad = () => {
    return this.disabled === false && this.loading;
  };

  private checkIcon = () => {
    const children = Array.from(this.hostElement.children) as HTMLElement[];

    if (children.length === 1) {
      // even no chars or child nodes will return white space, so we need to trim
      if (this.hostElement.textContent.trim().length === 0) {
        if (children[0].tagName.toLowerCase() === 'b2b-icon') {
          return true;
        } else if (children[0].tagName.toLowerCase() === 'i') {
          return true;
        }
      }
    }
    return false;
  };

  protected spinner() {
    const spinnerColor = this.variant === 'primary' ? 'inverse' : 'secondary';
    return (
      <div class="b2b-button__spinner">
        <b2b-spinner color={spinnerColor} size="50"></b2b-spinner>
      </div>
    );
  }

  render() {
    return (
      <Host
        class={{
          [`b2b-button--loading`]: this.canLoad(),
          [`b2b-button--${this.size}`]: true,
          [`b2b-button--active`]: this.active,
          [`b2b-button--icon-only`]: this.checkIcon(),
          [`b2b-button--${this.width}`]: true,
        }}>
        {this.href !== undefined ? (
          <a
            href={this.href}
            target={`_${this.target}`}
            download={this.download}
            class={{
              disabled: this.disabled || this.groupDisabled,
              [`b2b-button--${this.variant}`]: true,
            }}
            ref={el => (this.focusableElement = el)}>
            <span>
              <slot name="start"></slot>
              <slot></slot>
              <slot name="end"></slot>
            </span>
            {this.canLoad() ? this.spinner() : null}
          </a>
        ) : (
          <button
            disabled={this.disabled || this.groupDisabled}
            class={{ [`b2b-button--${this.variant}`]: true }}
            type={this.type}
            ref={el => (this.focusableElement = el)}>
            <span>
              <slot name="start"></slot>
              <slot></slot>
              <slot name="end"></slot>
            </span>
            {this.canLoad() ? this.spinner() : null}
          </button>
        )}
      </Host>
    );
  }
}
