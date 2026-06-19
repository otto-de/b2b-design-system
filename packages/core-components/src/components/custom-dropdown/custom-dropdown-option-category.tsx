import type { ComponentInterface } from '@stencil/core';
import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'b2b-custom-dropdown-option-category',
  styleUrl: 'custom-dropdown-option-category.scss',
  shadow: true,
})
export class CustomDropdownWithOptionHeadingComponent implements ComponentInterface {
  /** The label/heading text for the option category. */
  @Prop() label: string = '';

  render() {
    return (
      <Host class="b2b-custom-dropdown__option-category">
        {this.label && (
          <div class="b2b-custom-dropdown__option-category-label">
            {this.label}
          </div>
        )}
        <slot></slot>
      </Host>
    );
  }
}
