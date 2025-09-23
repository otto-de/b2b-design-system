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

import { parsePropToArray } from '../../utils/json-property-binding-util';
type Option = { label: string; value: string };

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
  @Prop() selectedValues: string | string[] | Option[] = [];

  /** The list of options passed into the search dropdown. Can be static or dynamic, i.e. updated when the b2b-search or b2b-input emitters fire. */
  @Prop() optionsList: string | string[] | Option[] = [];

  /** The placeholder shown in the search bar. */
  @Prop() searchPlaceholder: string;

  /** The string displayed as the select all label. */
  @Prop() selectAllLabel: string;

  /** The maximum amount of chips visible. Adjust this depending on available size of the dropdown. */
  @Prop() maxOptionsVisible: number = 8;

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop({ reflect: true }) required: boolean = false;

  /** Whether the multi select dropdown is currently invalid. Per default, it is false. */
  @Prop({ reflect: true }) invalid: boolean = false;

  /** The error message that is shown if the multi select dropdown is invalid. */
  @Prop() errorMessage?: string;

  /** The hint text that appears underneath the multi select dropdown field. */
  @Prop() hint?: string;

  /** Whether or not the field is disabled. Default is false. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** @internal Whether the parent input group is disabled. Per default, it is false. */
  @Prop() groupDisabled = false;

  /** Emits when there is a change to the currently selected values. */
  @Event({ eventName: 'b2b-selected' })
  b2bChange: EventEmitter<string[]>;

  @State() currentSelectedValues: Option[] = [];
  @State() currentList: Option[] = [];
  @State() value = '';
  @State() isElementFocused = false;
  @State() isOpen = false;
  @State() normalizedOptions: Option[] = [];
  @State() normalizedSelected: Option[] = [];
  @State() hasOptionList = this.optionsList.length > 0;

  private parsePropToOptArray(value: string | string[] | Option[]): Option[] {
    if (Array.isArray(value) && typeof value[0] === 'object') {
      return value as Option[];
    }
    return parsePropToArray(value as string | string[]).map(v => ({
      label: v,
      value: v,
    }));
  }

  componentWillLoad() {
    this.normalizedSelected = this.parsePropToOptArray(this.selectedValues);

    this.normalizedOptions = this.parsePropToOptArray(this.optionsList);

    this.currentList = this.normalizedOptions as Option[];
    this.hasOptionList = (this.normalizedOptions as Option[]).length > 0;

    const selectedSet = new Set(
      (this.normalizedSelected as Option[]).map(o => o.value),
    );
    this.currentSelectedValues = (this.normalizedOptions as Option[]).filter(
      opt => selectedSet.has(opt.value),
    );
  }

  /** Needed to trigger a re-render for async data */
  @Watch('optionsList')
  watchPropHandler(newList: string[] | string | Option[]) {
    this.normalizedOptions = this.parsePropToOptArray(newList);
    this.hasOptionList = this.normalizedOptions.length > 0;

    if (this.hasOptionList) {
      this.currentList = this.normalizedOptions as Option[];
      const selectedSet = new Set(
        (this.normalizedSelected as Option[]).map(o => o.value),
      );
      this.currentSelectedValues = (this.normalizedOptions as Option[]).filter(
        opt => selectedSet.has(opt.value),
      );
    }
  }

  /** Needed to trigger a re-render for async data */
  @Watch('selectedValues')
  handleSelectedValuesChangeFromOutside(newVal: string | string[] | Option[]) {
    this.normalizedSelected = this.parsePropToOptArray(newVal);
    const selectedSet = new Set(
      (this.normalizedSelected as Option[]).map(o => o.value),
    );
    this.currentSelectedValues = (this.normalizedOptions as Option[]).filter(
      o => selectedSet.has(o.value),
    );
  }

  @Watch('currentSelectedValues')
  handleSelectedValuesChange(newValues: Option[]) {
    this.b2bChange.emit(newValues.map(o => o.value));
  }

  componentDidUpdate() {
    const options = this.getOptions();
    this.updateAllOptions(options);
    this.updateSelectAll(options);
  }

  private handleInput = (event: InputEvent) => {
    if (this.disabled || this.groupDisabled) return;
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.value = term;

    const list = this.normalizedOptions as Option[];
    this.currentList =
      term === ''
        ? list
        : list.filter(
            o =>
              o.label.toLowerCase().includes(term) ||
              o.value.toLowerCase().includes(term),
          );
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
            label={option.label}
            value={option.value}
            onB2b-close={this.handleChipClose}></b2b-chip-component>
        );
      } else if (index === this.maxOptionsVisible) {
        return (
          <b2b-chip-component
            label="..."
            class="b2b-multiselect-dropdown__option--show-more-button"
            hasCloseButton
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

  private handleSelectedChange = (
    event: CustomEvent<{ selected: boolean; selectedOption: string }>,
  ) => {
    const value = event.detail.selectedOption;
    const opt = (this.normalizedOptions as Option[]).find(
      o => o.value === value,
    );
    if (opt === undefined) return;

    if (event.detail.selected) {
      if (!this.currentSelectedValues.some(o => o.value === value)) {
        this.currentSelectedValues = [...this.currentSelectedValues, opt];
      }
    } else {
      this.currentSelectedValues = this.currentSelectedValues.filter(
        o => o.value !== value,
      );
    }
  };

  private handleChipClose = (event: CustomEvent<{ value: string }>) => {
    const value = event.detail.value;
    this.currentSelectedValues = this.currentSelectedValues.filter(
      o => o.value !== value,
    );
    this.updateOption(value);
    this.isOpen = true;
    this.resetFocus();
  };

  private updateOption = (option: string) => {
    const options = this.getOptions();
    const optionToUpdate = options.find(el => el.option === option);
    optionToUpdate.selected = false;
  };

  private updateAllOptions = (options: HTMLB2bMultiselectOptionElement[]) => {
    options.forEach(option => (option.selected = false));
    const selectedSet = new Set(this.currentSelectedValues.map(o => o.value));
    options
      .filter(option => selectedSet.has(option.option))
      .forEach(option => (option.selected = true));
  };

  private setElementOnFocus = () => {
    if (this.disabled || this.groupDisabled) return;
    this.isElementFocused = true;
  };

  private setElementOnBlur = (event?: FocusEvent) => {
    const nextFocusedElement = event?.relatedTarget;

    if (
      !(nextFocusedElement instanceof Node) ||
      !this.hostElement.contains(nextFocusedElement)
    ) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }

    this.isElementFocused = false;
  };

  private resetFocus = () => {
    if (this.disabled || this.groupDisabled) return;
    const el = this.hostElement.shadowRoot.querySelector(
      '.b2b-multiselect-dropdown',
    ) as HTMLElement;
    el.focus();
  };

  private handleMouseDown = (event: MouseEvent) => {
    /** Keep dropdown open if a tag is removed */
    if (this.disabled || this.groupDisabled) {
      event.preventDefault();
      return;
    }

    if (this.isElementFocused) {
      event.preventDefault();
    } else {
      this.resetFocus();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || this.groupDisabled) return;

    if (event.key === 'Enter') {
      event.preventDefault();
      this.resetFocus();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.setElementOnBlur();
    }
  };

  private handleSelectAll = (event: CustomEvent<{ selected: boolean }>) => {
    const newVal = event.detail.selected;
    const options = this.getOptions();
    const values = options.map(el => el.option);

    options.forEach(el => (el.selected = newVal));

    if (newVal) {
      const toAdd = (this.normalizedOptions as Option[]).filter(o =>
        values.includes(o.value),
      );
      const set = new Set(this.currentSelectedValues.map(o => o.value));
      this.currentSelectedValues = [
        ...this.currentSelectedValues,
        ...toAdd.filter(o => !set.has(o.value)),
      ];
    } else {
      this.currentSelectedValues = this.currentSelectedValues.filter(
        o => !values.includes(o.value),
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
    const disabled = this.disabled || this.groupDisabled;
    const hasError = this.invalid && !disabled;
    const showHint = this.hint && !hasError;
    const showError = this.errorMessage && hasError;

    return (
      <Host
        onFocus={this.setElementOnFocus}
        onBlur={this.setElementOnBlur}
        onClick={this.handleMouseDown}
        onKeyDown={this.handleKeyDown}>
        <b2b-input-label required={this.required}>{this.label}</b2b-input-label>
        <div
          class={{
            'b2b-multiselect-dropdown': true,
            'b2b-multiselect-dropdown--open': this.isOpen,
            'b2b-multiselect-dropdown--error': hasError,
            'b2b-multiselect-dropdown--disabled': disabled,
            'b2b-multiselect-dropdown--focused':
              this.invalid && this.isElementFocused,
          }}
          tabindex={0}
          role="combobox"
          onClick={() => (this.isOpen = !this.isOpen && !disabled)}
          aria-expanded={this.isElementFocused}>
          <div class="b2b-multiselect-dropdown__chip-container">
            {this.currentSelectedValues.length === 0 ? (
              <span class="b2b-multiselect-dropdown__placeholder">
                {this.placeholder}
              </span>
            ) : (
              this.renderChips()
            )}
          </div>
          <b2b-icon-100 icon="b2b_icon-arrow-down"></b2b-icon-100>
        </div>
        <div
          class={{
            'b2b-multiselect-dropdown__options-container': true,
            'b2b-multiselect-dropdown__options-container--visible': this.isOpen,
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
              (this.currentList as Option[]).map(option => (
                <b2b-multiselect-option
                  onB2b-option-selected={this.handleSelectedChange}
                  option={option.value}
                  label={option.label}></b2b-multiselect-option>
              ))}
          </div>
        </div>

        {showHint && (
          <span class="b2b-multiselect-dropdown__hint">{this.hint}</span>
        )}
        {showError && (
          <span class="b2b-multiselect-dropdown__error-message">
            {this.errorMessage}
          </span>
        )}
      </Host>
    );
  }
}
