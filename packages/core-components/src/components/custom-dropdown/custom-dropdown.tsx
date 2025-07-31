import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { OptionSelectedEventDetail } from '../../utils/interfaces/form.interface';

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
  @Prop() optionsList: string[];

  /** The currently selected option */
  @State() selectedOption: string = null;

  @Listen('b2b-custom-dropdown-option-selected')
  handleOptionSelected(event: CustomEvent<OptionSelectedEventDetail>) {
    event.stopPropagation();
    this.selectedOption = event.detail.selectedOption;
    console.log('Selected option in parent:', this.selectedOption);
  }

  render() {
    return (
      <Host>
        <b2b-background-box
          noPadding={true}
          borderTop="none"
          borderRight="none"
          borderLeft="none">
          <div class="b2b-custom-dropdown">
            <b2b-input placeholder={this.placeholder}>
              <b2b-icon-100 icon="b2b_icon-search" slot="end"></b2b-icon-100>
            </b2b-input>
          </div>
        </b2b-background-box>
        <div>
          <div>
            <b2b-custom-dropdown-option
              option={this.agency}
              separator={true}></b2b-custom-dropdown-option>
          </div>
          {this.optionsList.map(option => (
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
      </Host>
    );
  }
}
