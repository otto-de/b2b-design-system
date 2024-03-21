import { Component, Element, h, Host, Listen, State } from '@stencil/core';

/** Modal component
 * Initial story: https://otto-eg.atlassian.net/browse/B2BDS-53
 */

const keys = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
  ESC: 'Escape',
};

@Component({
  tag: 'b2b-flyout-menu',
  styleUrl: 'flyout-menu.scss',
  shadow: true,
})
export class FlyoutMenuComponent {
  @Element() hostElement: HTMLB2bFlyoutMenuElement;

  @State() isElementFocused: boolean = false;

  private getCurrentOption = () => {
    const options = this.getAllOptions();
    return options.find(el => el.getAttribute('tabindex') === '0');
  };
  private getAllOptions = () => {
    return Array.from(
      this.hostElement.shadowRoot.querySelectorAll('b2b-flyout-menu-option'),
    );
  };

  private setCurrentOption = (option: HTMLB2bFlyoutMenuOptionElement) => {
    const options = this.getAllOptions();
    options.forEach(element => {
      element.setAttribute('tabindex', element === option ? '0' : '-1');
    });
  };

  private onEscapePress = () => {
    this.setElementOutOfFocus();
  };
  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    /** we need to be informed when a user changes focus to the clear button
     * without manually blurring the element, browser focus stack and the component's
     * isElementFocused do not align, which causes a value change during rerender
     */
    if (event.key === 'Tab') {
      this.setElementOutOfFocus();
    } else if (
      this.isElementFocused &&
      Object.values(keys).includes(event.key)
    ) {
      const options = this.getAllOptions();
      const activeOption = this.getCurrentOption();
      let index = options.indexOf(activeOption);
      event.preventDefault();

      switch (event.key) {
        case keys.ARROW_UP:
          index--;
          break;
        case keys.ARROW_DOWN:
          index++;
          break;
        case keys.HOME:
          index = 0;
          break;
        case keys.END:
          index = options.length - 1;
          break;
        case keys.ESC:
          this.onEscapePress();
          return;
        default:
          return;
      }

      if (index < 0) {
        index = options.length - 1;
      }

      if (index > options.length - 1) {
        index = 0;
      }

      this.setCurrentOption(options[index]);
      options[index].focus();
    }
  }
  private setElementClicked = () => {
    this.isElementFocused = true;
  };

  private setElementOutOfFocus = () => {
    this.isElementFocused = false;
  };

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-flyout-menu': true,
            'b2b-flyout-menu__options-on': this.isElementFocused,
          }}>
          <button
            class="b2b-flyout-menu__icon"
            role="button"
            onClick={this.setElementClicked}
            onBlur={this.setElementOutOfFocus}>
            <slot name="icon"></slot>
          </button>

          {this.isElementFocused ? (
            <div class="b2b-flyout-menu__options-container">
              <div class="b2b-flyout-menu__arrow"></div>
              <slot name="option"></slot>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
