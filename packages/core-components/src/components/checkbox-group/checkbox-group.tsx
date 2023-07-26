import {
  Component,
  Prop,
  h,
  Host,
  Listen,
  Event,
  EventEmitter,
  Watch,
  Element,
  State,
} from '@stencil/core';
import { CheckboxEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-checkbox-group',
  styleUrl: 'checkbox-group.scss',
  shadow: true,
})
export class CheckboxGroupComponent {
  @Element() host: HTMLB2bCheckboxGroupElement;

  /** The label for the checkbox group. This is optional. */
  @Prop() label: string;

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop() required: boolean = false;

  /** Whether or not the checkbox group as a whole is disabled. Default state is false. */
  @Prop() disabled = false;

  /** Whether or not the checkbox group as a whole is invalid. Set to true to display a group error. */
  @Prop() invalid = false;

  /** The alignment of the checkbox group. Per default it is vertical */
  @Prop() alignment: 'vertical' | 'horizontal' = 'vertical';

  /** The checkbox group hint text. */
  @Prop() hint?: string;

  /** The checkbox group error message. Is displayed when invalid is set to true. */
  @Prop() error?: string;

  /** Emits whenever a checkbox within the group is checked or unchecked. */
  @Event({ eventName: 'b2b-group-change' })
  b2bGroupChange!: EventEmitter<CheckboxEventDetail>;

  /** We keep track of the initial disabled state in case individual children are disabled, group is disabled and re-enabled. */
  @State() initialDisabled = [];

  @Listen('b2b-change')
  handleCheckboxChange(ev: CustomEvent<CheckboxEventDetail>) {
    this.b2bGroupChange.emit({
      value: ev.detail.value,
      checked: ev.detail.checked,
    });
  }

  @Watch('disabled')
  protected disabledChanged() {
    this.toggleAllDisabled();
  }

  @Watch('invalid')
  protected invalidChanged() {
    this.toggleAllError();
  }

  private getChildNodes = () => {
    return Array.from(this.host.querySelectorAll('b2b-checkbox'));
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

  private getInitialState = () => {
    const nodes = this.getChildNodes();

    nodes.forEach(node => {
      this.initialDisabled.push(node.disabled);
    });
  };

  private removeChildText = () => {
    let nodes = this.getChildNodes();

    nodes.forEach(node => {
      node.error = undefined;
      node.hint = undefined;
    });
  };

  componentWillLoad() {
    if (!this.disabled) {
      this.getInitialState();
    }
  }

  componentDidLoad() {
    this.toggleAllError();
    this.removeChildText();
    if (this.disabled) {
      this.toggleAllDisabled();
    }
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-checkbox-group': true,
            'b2b-checkbox-group--error': this.invalid && !this.disabled,
            [`b2b-checkbox-group--${this.alignment}`]: true,
          }}>
          {this.label && (
            <b2b-input-label required={this.required}>
              {this.label}
            </b2b-input-label>
          )}
          <fieldset>
            <div class="b2b-checkbox-group-options">
              <slot></slot>
            </div>
          </fieldset>
          {(this.hint !== undefined && !this.invalid) ||
          (this.hint !== undefined && this.disabled) ? (
            <span>{this.hint}</span>
          ) : (
            ''
          )}
          {this.error !== undefined && this.invalid && !this.disabled ? (
            <span>{this.error}</span>
          ) : (
            ''
          )}
        </div>
      </Host>
    );
  }
}
