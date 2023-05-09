import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { ToggleButtonEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-toggle-group',
  styleUrl: 'toggle-group.scss',
  shadow: true,
})
export class B2BToggleGroup {
  @Element() host: HTMLB2bToggleGroupElement;

  /** The toggle group name used to group them together programmatically. This is required. */
  @Prop() name!: string;

  /** Whether or not the toggle group is disabled as a whole. Per default it is false. */
  @Prop({ reflect: true }) disabled = false;

  /** Emitted whenever a toggle button in the group is clicked. Will emit the value of the currently selected radio button. */
  @Event({ eventName: 'b2b-group-change' })
  b2bGroupChange: EventEmitter<ToggleButtonEventDetail>;

  @State() currentValue: any;

  @Listen('b2b-change')
  handleToggleButtonChange(ev: CustomEvent<ToggleButtonEventDetail>) {
    this.currentValue = ev.detail.value;
    this.b2bGroupChange.emit({
      value: ev.detail.value,
    });
  }

  @Watch('disabled')
  protected disabledChanged() {
    this.toggleAllDisabled();
  }

  private toggleAllDisabled = () => {
    let nodes = this.getChildNodes();

    if (this.disabled) {
      nodes.forEach(node => {
        node.disabled = true;
      });
    } else {
      nodes.forEach(node => {
        node.disabled = false;
      });
    }
  };

  private setFirstActiveOnInit = () => {
    let nodes = this.getChildNodes();
    nodes[0].checked = true;
  };

  private getChildNodes = (): HTMLB2bToggleButtonElement[] => {
    return Array.from(
      this.host.querySelectorAll(`b2b-toggle-button`),
    ) as HTMLB2bToggleButtonElement[];
  };

  componentDidLoad() {
    const toggleButtons = this.getChildNodes();
    const isAnySelected = toggleButtons.some(toggle => toggle.checked);
    if (!isAnySelected) {
      this.setFirstActiveOnInit();
    }
    if (this.disabled) {
      this.toggleAllDisabled();
    }
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-toggle-group': true,
            'b2b-toggle-group-disabled': this.disabled,
          }}>
          <fieldset>
            <slot></slot>
          </fieldset>
        </div>
      </Host>
    );
  }
}
