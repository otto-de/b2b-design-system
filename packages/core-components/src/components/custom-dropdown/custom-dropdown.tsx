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

  /** Name of the agency */
  @Prop() agency: string;

  /** The options for the dropdown. */
  @Prop() optionsList: string[] = [];

  /** Whether or not the field is disabled. Default is false. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether search should be automatically disabled for small lists. */
  @Prop() autoDisableSearch: boolean = true;
  /** The currently selected option */
  @State() selectedOption: string = null;

  @State() value = '';

  @State() currentList = this.optionsList;

  @Prop({ mutable: true }) opened: boolean = false;

  @Listen('b2b-custom-dropdown-option-selected')
  handleOptionSelected(event: CustomEvent<OptionSelectedEventDetail>) {
    event.stopPropagation();
    this.selectedOption = event.detail.selectedOption;
    console.log('Selected option in parent:', this.selectedOption);
  }

  @Element() hostElement: HTMLB2bFlyoutMenuElement;

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
    this.triggerEl.addEventListener('click', this.toggleMenu, true);
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

  private handleInput = event => {
    if (this.disabled) {
      return;
    }
    this.value = event.target.value.toLowerCase();
    if (this.value !== '') {
      const filteredList = (this.optionsList as string[]).filter(
        option => option.toLowerCase().indexOf(this.value) > -1,
      );
      this.currentList = filteredList;
    } else if (this.value === '') {
      this.currentList = this.optionsList;
    }
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
            <div class="b2b-custom-dropdown-search">
              <b2b-input
                placeholder={this.placeholder}
                onB2b-input={this.handleInput}
                disabled={this.optionsList.length < 6}>
                <b2b-icon-100 icon="b2b_icon-search" slot="end"></b2b-icon-100>
              </b2b-input>
            </div>
          </b2b-background-box>
          <div
            class={
              this.optionsList.length >= 6
                ? 'b2b-custom-dropdown__options-scroll-container'
                : 'b2b-custom-dropdown__options-container'
            }>
            <div>
              <div>
                <b2b-custom-dropdown-option
                  option={this.agency}
                  separator={true}></b2b-custom-dropdown-option>
              </div>
              {this.currentList.map(option => (
                <div>
                  <b2b-custom-dropdown-option
                    option={option}
                    separator={false}
                    selected={
                      option === this.selectedOption
                    }></b2b-custom-dropdown-option>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
