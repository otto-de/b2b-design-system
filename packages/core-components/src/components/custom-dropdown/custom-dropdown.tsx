import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { OptionSelectedEventDetail } from '../../utils/interfaces/form.interface';
import { isClickOutside } from '../../utils/utils';

@Component({
  tag: 'b2b-custom-dropdown',
  styleUrl: 'custom-dropdown.scss',
  shadow: true,
})
export class B2bCustomDropdownComponent {
  /** The placeholder shown in the input field. */
  @Prop({ reflect: true }) placeholder: string;

  /** Whether the field is disabled. Default is false. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether search should be automatically disabled for small lists. */
  @Prop() autoDisableSearch: boolean = true;

  /** The currently selected option */
  @State() selectedOption: string | null = null;

  @State() value = '';

  @State() allOptions: HTMLB2bCustomDropdownOptionElement[] = [];

  @Prop({ mutable: true }) opened: boolean = false;

  @Listen('b2b-custom-dropdown-option-selected')
  handleOptionSelected(event: CustomEvent<OptionSelectedEventDetail>) {
    event.stopPropagation();
    const selectedValue = event.detail.selectedOption;
    this.selectedOption = selectedValue;

    this.allOptions.forEach(option => {
      if (option.option === selectedValue) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    });
  }

  @Element() hostElement: HTMLB2bCustomDropdownElement;

  private triggerEl: HTMLElement;

  connectedCallback() {
    this.initializeSlottedOptions();

    const children = Array.from(this.hostElement.children).filter(
      x => !x.hasAttribute('option'),
    );
    if (children.length === 0) {
      return;
    }
    this.triggerEl = children[0] as HTMLElement;
    this.triggerEl.addEventListener('click', this.toggleMenu, true);
  }

  private initializeSlottedOptions() {
    this.allOptions = Array.from(
      this.hostElement.querySelectorAll('[slot="option"]'),
    );
  }

  private toggleMenu = () => {
    this.opened = !this.opened;
  };

  @Listen('click', { target: 'document' })
  handleClickOutside(event) {
    if (isClickOutside(event, this.hostElement)) {
      this.closeMenu();
    }
  }

  private closeMenu = () => {
    this.opened = false;
  };

  private handleInput = (event: CustomEvent) => {
    if (this.disabled) {
      return;
    }
    this.value = (event.target as HTMLInputElement).value.toLowerCase();

    this.allOptions.forEach(option => {
      const optionValue =
        (option as HTMLB2bCustomDropdownOptionElement).option?.toLowerCase() ||
        '';
      if (optionValue.includes(this.value)) {
        option.classList.remove('b2b-custom-dropdown__option--hidden');
      } else {
        option.classList.add('b2b-custom-dropdown__option--hidden');
      }
    });
  };

  render() {
    return (
      <Host>
        <div class="b2b-custom-dropdown__trigger">
          <slot name="trigger"></slot>
        </div>
        <div
          class={{
            'b2b-custom-dropdown': true,
            'b2b-custom-dropdown--on': this.opened,
          }}>
          <b2b-background-box
            noPadding={true}
            borderTop="none"
            borderRight="none"
            borderLeft="none">
            <div
              class={{
                'b2b-custom-dropdown-search': true,
                'b2b-custom-dropdown-search--enabled':
                  this.allOptions.length >= 6,
              }}>
              <b2b-input
                placeholder={this.placeholder}
                onB2b-input={this.handleInput}
                disabled={this.allOptions.length < 6}>
                <b2b-icon-100 icon="b2b_icon-search" slot="end"></b2b-icon-100>
              </b2b-input>
            </div>
          </b2b-background-box>
          <div
            class={
              this.allOptions.length >= 6
                ? 'b2b-custom-dropdown__options-scroll-container'
                : 'b2b-custom-dropdown__options-container'
            }>
            <slot name="option"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
