import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Listen,
  Watch,
  Element,
  State,
} from '@stencil/core';
import { RadioEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-radio-group',
  styleUrl: 'radio-group.scss',
  shadow: true,
})
export class RadioButtonGroupComponent {
  @Element() host: HTMLB2bRadioGroupElement;

  /** The radio group name used to group them together programmatically. This is required. */
  @Prop() name!: string;

  /** The radio group label. This is optional. */
  @Prop() label: string;

  /** Adds an asterisk at the end of the label to signify that the field is required. */
  @Prop() required: boolean = false;

  /** The alignment of the radio group. Can be vertical or horizontal, per default it is vertical. */
  @Prop() alignment: 'vertical' | 'horizontal' = 'vertical';

  /** Whether or not the radio group is disabled as a whole. Per default it is false. */
  @Prop({ reflect: true }) disabled = false;

  /** Whether or not the radio group is invalid and should be rendered with error styles as a whole. Per default it is false. */
  @Prop({ reflect: true }) invalid = false;

  /** A group hint text. */
  @Prop() hint?: string;

  /** A group error text. It will only show if invalid is set to true. */
  @Prop() error?: string;

  /** Emitted whenever a radio button in the group is clicked. Will emit the value of the currently selected radio button. */
  @Event({ eventName: 'b2b-group-change' })
  b2bGroupChange: EventEmitter<RadioEventDetail>;

  @State() currentValue: any;

  @Listen('b2b-change')
  handleRadioButtonChange(ev: CustomEvent<RadioEventDetail>) {
    this.currentValue = ev.detail.value;
    this.b2bGroupChange.emit({
      checked: ev.detail.checked,
      value: ev.detail.value,
    });
  }

  @Watch('invalid')
  protected invalidChanged() {
    this.toggleAllError();
  }

  @Watch('disabled')
  protected disabledChanged() {
    this.toggleAllDisabled();
  }

  private labelSlot: HTMLElement;

  private toggleAllDisabled = () => {
    let nodes = this.getChildNodes();

    nodes.forEach(node => {
      if (this.disabled) {
        node.disabled = true;
      } else {
        node.disabled = node.disabled || false;
      }
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

  private getChildNodes = (): HTMLB2bRadioButtonElement[] => {
    return Array.from(
      this.host.querySelectorAll(`b2b-radio-button`),
    ) as HTMLB2bRadioButtonElement[];
  };

  private removeChildText = () => {
    let nodes = this.getChildNodes();

    nodes.forEach(node => {
      node.error = undefined;
      node.hint = undefined;
    });
  };

  componentWillLoad() {
    this.labelSlot = this.host.querySelector('[slot="label"]');
  }

  componentDidLoad() {
    this.toggleAllError();
    this.toggleAllDisabled();
    this.removeChildText();
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-radio-group': true,
            'b2b-radio-group--error': this.invalid && !this.disabled,
            [`b2b-radio-group--${this.alignment}`]: true,
          }}>
          {(this.label || this.labelSlot) && (
            <b2b-input-label id={this.name} required={this.required}>
              <slot name="label">{this.label}</slot>
            </b2b-input-label>
          )}
          <fieldset>
            <div class="b2b-radio-group-options">
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
