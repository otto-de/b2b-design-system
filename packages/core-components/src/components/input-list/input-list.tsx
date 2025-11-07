import {
  h,
  Component,
  Prop,
  State,
  Watch,
  Element,
  Listen,
  Host,
  Event,
  EventEmitter,
} from '@stencil/core';
import { InputClear } from '../../utils/interfaces/form.interface';
import { parsePropToArray } from '../../utils/json-property-binding-util';

const keys = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
  ESC: 'Escape',
};

@Component({
  tag: 'b2b-input-list',
  styleUrl: 'input-list.scss',
  shadow: true,
})
export class InputListComponent {
  @Element() hostElement: HTMLB2bInputListElement;

  /** The input label. */
  @Prop() label: string;

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop({ reflect: true }) required: boolean = false;

  /** The placeholder shown in the input field. */
  @Prop({ reflect: true }) placeholder: string;

  /** The list of options passed into the search dropdown. Can be static or dynamic, i.e. updated when the b2b-search or b2b-input emitters fire. */
  @Prop() optionsList: string | string[] = [];

  /** The default value of the input field. If defined, it will prefill the input. */
  @Prop({ mutable: true, reflect: true }) value: string = null;

  /** Whether or not the input is disabled. Default is false. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** @internal Whether the parent input group is disabled. Per default, it is false. */
  @Prop() groupDisabled = false;

  /** Emits when the user clicks the clear button. */
  @Event({ eventName: 'b2b-clear' })
  b2bClear: EventEmitter<InputClear>;

  // @State() value: string = '';
  @State() hasOptionList = this.optionsList.length > 0;
  @State() currentList: string[] = [];
  @State() isElementFocused = false;
  @State() searchValue = '';

  componentWillLoad() {
    this.currentList = parsePropToArray(this.optionsList);
    this.hasOptionList = this.optionsList.length > 0;
  }

  private onOptionSelected = event => {
    this.setElementOnBlur();
    this.value = event.detail.selectedOption;
    this.resetAllOptions();
  };

  private onEscapePress = () => {
    this.setElementOnBlur();
    this.hostElement.shadowRoot.querySelector('b2b-input').setFocus();
    this.resetAllOptions();
  };

  // needed to trigger re-render
  private handleInput = event => {
    this.value = event.detail.value;
    const term = (event.target as HTMLB2bInputElement).value.toLowerCase();

    const list = parsePropToArray(this.optionsList);
    this.currentList =
      term === '' ? list : list.filter(o => o.toLowerCase().includes(term));

    this.searchValue = term;
    if (this.value === '' || null || undefined) {
      this.setElementOnBlur();
    }
    this.setElementOnFocus();
  };

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    /** we need to be informed when a user changes focus to the clear button
     * without manually blurring the element, browser focus stack and the component's
     * isElementFocused do not align, which causes a value change during rerender
     */
    if (event.key === 'Tab') {
      this.setElementOnBlur();
    } else if (
      this.isElementFocused &&
      this.optionsList &&
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

  @Watch('optionsList')
  watchPropHandler(newList: string[]) {
    this.hasOptionList = newList.length > 0;
    this.currentList = [...newList];
  }

  private setElementOnFocus = () => {
    this.isElementFocused = true;
  };

  private setElementOnBlur = () => {
    this.isElementFocused = false;
  };

  private getGroupOrderClassName = () => {
    const parentNodeName = this.hostElement.parentNode.nodeName;
    if (parentNodeName === 'B2B-INPUT-GROUP') {
      const slotName = this.hostElement.assignedSlot?.name || 'middle';
      return `b2b-group-input__${slotName}`;
    }
  };

  private getAllOptions = () => {
    return Array.from(
      this.hostElement.shadowRoot.querySelectorAll('b2b-input-list-option'),
    );
  };

  private getCurrentOption = () => {
    const options = this.getAllOptions();
    let currentOption = options.find(el => el.getAttribute('tabindex') === '0');
    return currentOption;
  };

  private setCurrentOption = (option: HTMLB2bInputListOptionElement) => {
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

  private resetInput = async (event: any) => {
    const inputElement = this.hostElement.shadowRoot.querySelector(
      'b2b-input',
    ) as HTMLB2bInputElement;
    event.preventDefault();
    event.stopPropagation();
    await inputElement.setFocus();
    if (
      (event.type === 'keydown' && event.key === 'Enter') ||
      event.type === 'mousedown'
    ) {
      this.value = '';
      this.b2bClear.emit();
      // Called to trigger an Input Event
      await inputElement.clearInput();
    }
  };

  /* Notes:
    Needs onFocusin and onFocusout in the Host element so that the click would
    be registered, otherwise, if placed in the input, it looses focus
    on the input element and won't register the selection.
  */
  render() {
    const groupOrderClass = this.getGroupOrderClassName() || '';
    return (
      <Host onBlur={this.setElementOnBlur} onFocus={this.setElementOnFocus}>
        <div
          class={{
            'b2b-input-list': true,
            'b2b-input-list__options-on':
              this.hasOptionList &&
              this.isElementFocused &&
              Boolean(this.value),
            [groupOrderClass]: true,
          }}>
          <b2b-input
            type="text"
            label={this.label}
            value={this.value}
            disabled={this.disabled || this.groupDisabled}
            onb2b-input={this.handleInput}
            placeholder={this.placeholder}
            required={this.required}>
            {!(this.disabled || this.groupDisabled) && Boolean(this.value) && (
              <b2b-icon-100
                icon="b2b_icon-close"
                aria-label="reset"
                slot="end"
                tabIndex={0}
                onMouseDown={this.resetInput}
                onKeyDown={this.resetInput}></b2b-icon-100>
            )}
          </b2b-input>
          {this.isElementFocused && Boolean(this.value) ? (
            <div class="b2b-input-list__options-container">
              {this.hasOptionList ? (
                <div class="b2b-input-list__options" role="listbox">
                  {this.currentList.map(option => (
                    <b2b-input-list-option
                      option={option}
                      tabIndex={-1}
                      onb2b-option-selected={
                        this.onOptionSelected
                      }></b2b-input-list-option>
                  ))}
                </div>
              ) : (
                <slot></slot>
              )}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
