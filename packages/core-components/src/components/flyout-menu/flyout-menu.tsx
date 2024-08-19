import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';
import { isClickOutside } from '../../utils/utils';

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

  /** @internal if the menu is opened. */
  @Prop({ mutable: true }) opened: boolean = false;

  private triggerEl: HTMLElement;

  connectedCallback() {
    // Check if there are any HTML elements slotted.
    // and stop registration if there are none
    const children = Array.from(this.hostElement.children).filter(
      x => !x.hasAttribute('option'),
    );
    if (children.length === 0) {
      return;
    }
    // Manual event handler registration for focus events
    this.triggerEl = children[0] as HTMLElement;
    this.triggerEl.addEventListener('click', this.openMenu, true);
    this.triggerEl.addEventListener('blur', this.blurMenu, true);
  }

  disconnectedCallback() {
    if (Boolean(this.triggerEl)) {
      this.triggerEl.removeEventListener('click', this.openMenu, true);
      this.triggerEl.removeEventListener('blur', this.blurMenu, true);
    }
  }

  private getCurrentOption = () => {
    const options = this.getAllOptions();
    return options.find(el => el.getAttribute('tabindex') === '0');
  };

  private getAllOptions = () => {
    return Array.from(
      this.hostElement.querySelectorAll('b2b-flyout-menu-option'),
    );
  };

  private setCurrentOption = (option: HTMLB2bFlyoutMenuOptionElement) => {
    const options = this.getAllOptions();
    options.forEach(element => {
      element.setAttribute('tabindex', element === option ? '0' : '-1');
    });
  };

  private resetAllOptions = () => {
    const options = this.getAllOptions();
    options.forEach(element => {
      element.setAttribute('tabindex', '-1');
    });
  };

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      this.closeMenu();
      return;
    } else if (
      //@ts-ignore
      event.target.tagName.toLowerCase() ===
        this.triggerEl.tagName.toLowerCase() &&
      event.key === 'Enter'
    ) {
      this.openMenu();
    } else if (Object.values(keys).includes(event.key)) {
      this.navigateMenu(event);
    }
  }

  @Listen('b2b-option-selected')
  handleSelected() {
    this.closeMenu();
  }

  @Listen('click', { target: 'document' })
  handleClickOutside(event) {
    if (isClickOutside(event, this.hostElement)) {
      this.closeMenu();
    }
  }

  private onEscapePress = () => {
    this.closeMenu();
  };

  private openMenu = () => {
    this.opened = true;
  };

  private navigateMenu(event: KeyboardEvent) {
    event.preventDefault();
    const options = this.getAllOptions();
    const activeOption = this.getCurrentOption();
    let index = options.indexOf(activeOption);

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

  private closeMenu = () => {
    this.opened = false;
    this.resetAllOptions();
  };

  /** We need to keep the menu open when the focus changes from the trigger
   * to the options. We only close the menu if the next element receiving focus
   * (relatedTarget) is not a menu option.
   */
  private blurMenu = event => {
    event.preventDefault();
    let target = event.relatedTarget
      ? event.relatedTarget.nodeName.toLowerCase()
      : '';
    if (target === 'b2b-flyout-menu-option') {
      return;
    } else {
      this.closeMenu();
    }
  };

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-flyout-menu': true,
          }}>
          <div class="b2b-flyout-menu__trigger">
            <slot name="trigger"></slot>
          </div>
          <div
            onFocusout={this.blurMenu}
            class={{
              'b2b-flyout-menu__options__container': true,
              'b2b-flyout-menu__options__container--on': this.opened,
            }}>
            <div class="b2b-flyout-menu__arrow"></div>
            <slot name="option"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
