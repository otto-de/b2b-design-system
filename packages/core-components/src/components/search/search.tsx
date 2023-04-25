import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
  State,
} from '@stencil/core';
import { SearchClickEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-search',
  shadow: true,
})
export class SearchComponent {
  @Element() hostElement: HTMLB2bSearchElement;

  /** The placeholder shown in the input field. */
  @Prop() placeholder: string;

  /** The list of options passed into the search dropdown. Can be static or dynamic, i.e. updated when the b2b-search or b2b-input emitters fire. */
  @Prop() optionsList: string[] = [];

  /** The default value of the search input field. If defined, it will prefill the input. */
  @Prop({ mutable: true, reflect: true }) value: string = null;

  /** Emits whenever the user clicks the search button. Will emit the search string. */
  @Event({ eventName: 'b2b-search' })
  b2bSearch: EventEmitter<SearchClickEventDetail>;

  @State() closed: false;

  private onSearchClicked = () => {
    this.b2bSearch.emit({ searchTerm: this.value });
  };

  private onInput = event => {
    this.value = event.detail.value;
  };

  private onOptionSelected = event => {
    this.value = event.detail.selectedOption;
  };

  render() {
    return (
      <Host>
        <b2b-input-group>
          <b2b-input-list
            slot="start"
            value={this.value}
            placeholder={this.placeholder}
            optionsList={this.optionsList}
            onb2b-input={this.onInput}
            onb2b-option-selected={this.onOptionSelected}>
            <slot></slot>
          </b2b-input-list>
          <b2b-button
            slot="end"
            variant="primary"
            onClick={this.onSearchClicked}>
            <b2b-icon icon="b2b_icon-search"></b2b-icon>
          </b2b-button>
        </b2b-input-group>
      </Host>
    );
  }
}
