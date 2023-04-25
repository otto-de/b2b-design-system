import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'b2b-required-separator',
  styleUrl: 'required-separator.scss',
  shadow: true,
})
export class B2BRequiredSeparator {
  /** The required label. Per default it is the german 'Pflichtfeld', but can be altered. */
  @Prop() label = 'Pflichtfeld';
  render() {
    return (
      <Host>
        <div class="b2b-required-separator--label">
          <span class="b2b-required-separator--asterisk">* </span>
          <span>{this.label}</span>
        </div>
        <b2b-separator></b2b-separator>
      </Host>
    );
  }
}
