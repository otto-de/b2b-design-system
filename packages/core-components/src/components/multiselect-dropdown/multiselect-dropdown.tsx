import {
  h,
  Component,
  Prop,
  State,
  Host,
  Event,
  EventEmitter,
  Watch,
  Element,
} from '@stencil/core';

@Component({
  tag: 'b2b-multiselect-dropdown',
  styleUrl: 'multiselect-dropdown.scss',
  shadow: true,
})
export class B2bMultiSelectDropdown {
  @Element() hostElement: HTMLB2bMultiselectDropdownElement;

  /** The input label. */
  @Prop() label!: string;

  /** The placeholder shown in the input field. */
  @Prop({ reflect: true }) placeholder: string;

  /** The initial values to be selected in the dropdown. */
  @Prop() selectedValues: string | string[] = [];

  /** The list of options passed into the search dropdown. Can be static or dynamic, i.e. updated when the b2b-search or b2b-input emitters fire. */
  @Prop() optionsList: string | string[] = [];

  /** The placeholder shown in the search bar. */
  @Prop() searchPlaceholder: string;

  /** The string displayed as the select all label. */
  @Prop() selectAllLabel: string;

  /** The maximum amount of chips visible. Adjust this depending on available size of the dropdown. */
  @Prop() maxOptionsVisible: number = 8;

  /** Emits when there is a change to the currently selected values. */
  @Event({ eventName: 'b2b-selected' })
  b2bChange: EventEmitter<string[]>;

  @State() currentSelectedValues = [];
  @State() currentList = this.optionsList;
  @State() value = '';
  @State() isElementFocused = false;
  @State() hasOptionList = this.optionsList.length > 0;

  componentWillLoad() {
    this.parseProps();
    this.currentSelectedValues = (this.selectedValues as string[]).filter(
      value => this.optionsList.includes(value),
    );
  }

  /** Needed to trigger a re-render for async data */
  @Watch('optionsList')
  watchPropHandler(newList: string | string[]) {
    if (typeof newList === 'string') {
      this.optionsList = this.parseStringToArray(newList);
    }
    this.hasOptionList = (this.optionsList as string[]).length > 0;
    if (this.hasOptionList) {
      this.currentList = this.optionsList as string[];
    }
  }

  @Watch('currentSelectedValues')
  handleSelectedValuesChange(newValues: string[]) {
    this.b2bChange.emit(newValues);
  }

  private parseProps() {
    if (typeof this.selectedValues === 'string') {
      this.selectedValues = this.parseStringToArray(this.selectedValues);
    }
    if (typeof this.optionsList === 'string') {
      this.optionsList = this.parseStringToArray(this.optionsList);
    }
  }

  private parseStringToArray(value: string): string[] {
    return JSON.parse(value.replace(/'/g, '"'));
  }

  componentDidUpdate() {
    const options = this.getOptions();
    this.updateAllOptions(options);
    this.updateSelectAll(options);
  }

  private handleInput = event => {
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

  private getOptions = () => {
    return Array.from(
      this.hostElement.shadowRoot.querySelectorAll('b2b-multiselect-option'),
    ).slice(1);
  };

  private renderChips = () => {
    return this.currentSelectedValues.map((option, index) => {
      if (index < this.maxOptionsVisible) {
        return (
          <b2b-chip-component
            label={option}
            value={option}
            onB2b-close={this.handleChipClose}></b2b-chip-component>
        );
      } else if (index === this.maxOptionsVisible) {
        return (
          <b2b-chip-component
            label="..."
            class="b2b-multiselect-dropdown__option--show-more-button"
            has-close-button="false"
            onClick={this.handleOverflowOptionsClick}></b2b-chip-component>
        );
      } else {
        return;
      }
    });
  };

  private handleOverflowOptionsClick = () => {
    if (!this.isElementFocused) {
      this.setElementOnFocus();
    }
  };

  private handleSelectedChange = event => {
    const newOption = event.detail.selectedOption;
    if (event.detail.selected) {
      this.currentSelectedValues = [...this.currentSelectedValues, newOption];
    } else {
      this.currentSelectedValues = this.currentSelectedValues.filter(
        el => el !== newOption,
      );
    }
  };

  private handleChipClose = event => {
    this.currentSelectedValues = this.currentSelectedValues.filter(
      el => el !== event.detail.value,
    );
    this.updateOption(event.detail.value);
    this.resetFocus();
  };

  private updateOption = (option: string) => {
    const options = this.getOptions();
    const optionToUpdate = options.find(el => el.option === option);
    optionToUpdate.selected = false;
  };

  private updateAllOptions = options => {
    // Deselect all to avoid caching issues in Vue
    options.forEach(option => (option.selected = false));
    options
      .filter(option => this.currentSelectedValues.includes(option.option))
      .forEach(option => (option.selected = true));
  };

  private setElementOnFocus = () => {
    this.isElementFocused = true;
  };

  private setElementOnBlur = () => {
    this.isElementFocused = false;
  };

  private resetFocus = () => {
    const el = this.hostElement.shadowRoot.querySelector(
      '.b2b-multiselect-dropdown',
    ) as HTMLElement;
    el.focus();
  };

  private handleMouseDown = (event: MouseEvent) => {
    /** Keep dropdown open if a tag is removed */
    if (this.isElementFocused) {
      event.preventDefault();
    } else {
      this.resetFocus();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.resetFocus();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.setElementOnBlur();
    }
  };

  private handleSelectAll = event => {
    const newVal = event.detail.selected;
    const options = this.getOptions();
    const newVals = options.map(el => el.option);

    for (let i = 0, n = options.length; i < n; i++) {
      options[i].selected = newVal;
    }

    if (newVal) {
      // filter out duplicates
      this.currentSelectedValues = Array.from(
        new Set([...this.currentSelectedValues, ...newVals]),
      );
    } else {
      this.currentSelectedValues = this.currentSelectedValues.filter(
        option => !newVals.includes(option),
      );
    }
  };

  private updateSelectAll = (options: HTMLB2bMultiselectOptionElement[]) => {
    let someSelected = options.some(option => option.selected === true);
    let everySelected = options.every(option => option.selected === true);
    const checkbox = this.hostElement.shadowRoot.querySelector(
      'b2b-multiselect-option',
    ) as HTMLB2bMultiselectOptionElement;
    checkbox.selected = everySelected;
    checkbox.indeterminate = someSelected && !everySelected;
  };

  render() {
    return (
      <Host
        onFocus={this.setElementOnFocus}
        onBlur={this.setElementOnBlur}
        onClick={this.handleMouseDown}
        onKeyDown={this.handleKeyDown}>
        <b2b-input-label>{this.label}</b2b-input-label>
        <div
          class={{
            'b2b-multiselect-dropdown': true,
            'b2b-multiselect-dropdown--open': this.isElementFocused,
          }}
          tabindex={0}
          role="combobox"
          aria-expanded={this.isElementFocused}>
          {this.currentSelectedValues.length === 0 ? (
            <span class="b2b-multiselect-dropdown__placeholder">
              {this.placeholder}
            </span>
          ) : (
            <div class="b2b-multiselect-dropdown__chip-container">
              {this.renderChips()}
            </div>
          )}
          <b2b-icon icon="b2b_icon-arrow-down"></b2b-icon>
        </div>
        <div
          class={{
            'b2b-multiselect-dropdown__options-container': true,
            'b2b-multiselect-dropdown__options-container--visible':
              this.isElementFocused,
          }}>
          <div
            class="b2b-multiselect-dropdown__options"
            role="listbox"
            aria-label={this.label}
            tabIndex={-1}>
            <div class="b2b-multiselect-dropdown__option__search">
              <input
                type="text"
                onInput={this.handleInput}
                class="b2b-multiselect-dropdown__option__search__input"
                placeholder={this.searchPlaceholder}></input>
            </div>
            <b2b-multiselect-option
              class="b2b-multiselect-dropdown__option__select-all"
              option={this.selectAllLabel}
              id="select-all"
              onB2b-option-selected={
                this.handleSelectAll
              }></b2b-multiselect-option>
            {this.hasOptionList &&
              (this.currentList as string[]).map(option => (
                <b2b-multiselect-option
                  onB2b-option-selected={this.handleSelectedChange}
                  option={option}></b2b-multiselect-option>
              ))}
          </div>
        </div>
      </Host>
    );
  }
}
