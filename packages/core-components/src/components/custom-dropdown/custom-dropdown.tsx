import type { ComponentInterface } from '@stencil/core';
import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import type { OptionSelectedEventDetail } from '../../utils/interfaces/form.interface';
import { isClickOutside } from '../../utils/utils';

@Component({
  tag: 'b2b-custom-dropdown',
  styleUrl: 'custom-dropdown.scss',
  shadow: true,
})
export class B2bCustomDropdownComponent implements ComponentInterface {
  /** The placeholder shown in the input field. */
  @Prop({ reflect: true }) placeholder: string;

  /** Whether the dropdown is disabled. Default is false. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether the dropdown should have a drop shadow. Default is false. */
  @Prop({ reflect: true }) dropshadow: boolean = false;

  /** Whether the dropdown should have a border. Default is false. */
  @Prop({ reflect: true }) border: boolean = false;

  /** Search is automatically disabled for lists with fewer than six options. */
  @Prop() autoDisableSearch: boolean = true;

  /** Internal: if the dropdown is opened */
  @Prop({ mutable: true }) opened: boolean = false;

  /** The text to show, when no results have been found. */
  @Prop() noResultsText: string =
    'Keine Ergebnisse gefunden, überprüfen Sie die Eingabe.';

  /** The currently selected option */
  @State() selectedOption: string | null = null;

  @State() value = '';

  @State() allOptions: HTMLB2bCustomDropdownOptionElement[] = [];

  @State() hasVisibleOptions = true;

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

    let visibleCount = 0;
    this.allOptions.forEach(option => {
      const optionValue =
        (option as HTMLB2bCustomDropdownOptionElement).option?.toLowerCase() ||
        '';
      const match = optionValue.includes(this.value);
      option.classList.toggle('b2b-custom-dropdown__option--hidden', !match);
      if (match) visibleCount++;
    });
    this.hasVisibleOptions = visibleCount > 0;
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
            'b2b-custom-dropdown--on': this.opened && !this.disabled,
            'b2b-custom-dropdown--drop-shadow': this.dropshadow,
            'b2b-custom-dropdown--border': this.border,
          }}>
          <b2b-background-box
            noPadding={true}
            borderTop="none"
            borderBottom="none"
            borderRight="none"
            borderLeft="none">
            <div
              class={{
                'b2b-custom-dropdown-search': true,
                'b2b-custom-dropdown-search--enabled':
                  this.allOptions.length > 6 && !this.disabled,
              }}>
              <b2b-input
                placeholder={this.placeholder}
                onB2b-input={this.handleInput}>
                <b2b-icon-100 icon="b2b_icon-search" slot="end"></b2b-icon-100>
              </b2b-input>
            </div>
          </b2b-background-box>
          <div
            class={
              this.allOptions.length > 6
                ? 'b2b-custom-dropdown__options-scroll-container'
                : 'b2b-custom-dropdown__options-container'
            }>
            <slot name="option"></slot>
          </div>
          {this.value && !this.hasVisibleOptions && (
            <div class="b2b-custom-dropdown__empty" role="status">
              <slot name="empty">{this.noResultsText}</slot>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
