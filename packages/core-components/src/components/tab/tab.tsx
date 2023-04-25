import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
  Watch,
} from '@stencil/core';

let i = 0;
@Component({
  tag: 'b2b-tab',
  styleUrl: 'tab.scss',
  shadow: true,
})
export class B2bTabComponent {
  private generatedId: number = i++;
  @Element() hostElement: HTMLB2bTabElement;

  /** Whether or not the tab is currently selected. Per default it is false. */
  @Prop({ reflect: true }) selected: boolean = false;

  /** Whether or not the tab is currently disabled. Per default it is false. */
  @Prop() disabled: boolean = false;

  /** Whether or not the tab has an error. Per default, it is false. */
  @Prop() invalid: boolean = false;

  /** Emits whether the tab is selected whenever there is a change to the tabs selected status. */
  @Event({ eventName: 'b2b-change' })
  b2bChange: EventEmitter<boolean>;

  @Watch('selected')
  propagateChange(newValue: boolean) {
    if (!this.disabled) {
      if (newValue === true) {
        // host element needs focus for screen readers
        this.hostElement.focus();
      }
      this.b2bChange.emit(newValue);
    }
  }

  render() {
    return (
      <Host
        id={`b2b-tab-${this.generatedId}`}
        aria-role="tab"
        aria-selected={this.selected}
        role={this.disabled ? false : 'tab'}
        disabled={this.disabled}
        tabindex={this.disabled ? false : this.selected ? '0' : '-1'}>
        <span
          class={{
            'b2b-tab': true,
            'b2b-tab--selected': this.selected,
            'b2b-tab--disabled': this.disabled,
            'b2b-tab--error': this.invalid,
          }}>
          <slot></slot>
        </span>
      </Host>
    );
  }
}
