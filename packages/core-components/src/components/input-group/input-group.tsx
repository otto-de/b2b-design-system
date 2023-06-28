import { Component, h, Host, Element, Prop, Watch, State } from '@stencil/core';
import { HTMLB2bFormElement } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-input-group',
  styleUrl: 'input-group.scss',
  shadow: true,
})
export class B2BInputGroup {
  @Element() host: HTMLB2bInputGroupElement;

  /** Whether or not the input group is invalid and should be rendered with error styles as a whole. Per default it is false. */
  @Prop() invalid = false;

  /** Whether or not the input group is disabled as a whole. Per default it is false. */
  @Prop() disabled = false;

  /** A group error text. It will only show if invalid is set to true. */
  @Prop() error?: string;

  /** The hint text that appears underneath the input group. */
  @Prop() hint?: string;

  /** We keep track of the initial disabled state in case individual children are disabled, group is disabled and re-enabled. */
  @State() initialDisabled = [];

  @Watch('invalid')
  protected invalidChanged() {
    this.toggleAllError();
  }

  @Watch('disabled')
  protected disabledChanged() {
    this.toggleAllDisabled();
  }

  connectedCallback() {
    this.removeText();
    this.toggleAllError();
    if (this.disabled) {
      this.toggleAllDisabled();
    }
  }

  componentWillLoad() {
    if (!this.disabled) {
      this.getInitialState();
    }
  }

  private getInitialState = () => {
    const nodes = this.getChildNodes();

    nodes.forEach(node => {
      this.initialDisabled.push(node.disabled);
    });
  };

  private removeText = () => {
    const nodes = this.getChildNodes();

    nodes.forEach(node => {
      node.error = undefined;
      node.hint = undefined;
    });
  };

  private toggleAllError = () => {
    let nodes = this.getChildNodes();

    if (this.invalid && !this.disabled) {
      nodes.forEach(node => {
        node.invalid = true;
      });
    } else {
      nodes.forEach(node => {
        node.invalid = false;
      });
    }
  };

  private toggleAllDisabled = () => {
    let nodes = this.getChildNodes();

    if (this.disabled) {
      nodes.forEach(node => {
        node.disabled = true;
      });
    } else {
      nodes.forEach((node, index) => {
        node.disabled = this.initialDisabled[index];
      });
    }
  };

  private getChildNodes = () => {
    return Array.from(this.host.children) as HTMLB2bFormElement[];
  };
  render() {
    return (
      <Host>
        <div class={{ 'b2b-input-wrapper': true }}>
          <slot name="start"></slot>
          <slot></slot>
          <slot name="end"></slot>
        </div>
        {(this.hint || (this.invalid && !this.disabled)) && (
          <span
            class={{
              'b2b-input-wrapper-hint': true,
              'b2b-input-wrapper-hint--error': this.invalid && !this.disabled,
            }}>
            {this.invalid && !this.disabled ? this.error : this.hint}
          </span>
        )}
      </Host>
    );
  }
}
