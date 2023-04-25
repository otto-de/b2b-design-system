import { h, Component, Element, Prop, Host } from '@stencil/core';

@Component({
  tag: 'b2b-input-label',
  styleUrl: 'input-label.scss',
  shadow: true,
})
export class InputLabelComponent {
  @Element() hostElement: HTMLB2bInputLabelElement;

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop() required: boolean = false;

  /** Will render the label with a disabled style. The default value is false. */
  @Prop() disabled: boolean = false;

  render() {
    return (
      <Host>
        <label
          class={{
            'b2b-input-label': true,
            'b2b-input-label--required': this.required,
            'b2b-input-label--disabled': this.disabled,
          }}>
          <slot></slot>
        </label>
      </Host>
    );
  }
}
