import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
} from '@stencil/core';
import { ChipComponentEventDetail } from '../../utils/interfaces/form.interface';

@Component({
  tag: 'b2b-chip-component',
  styleUrl: 'chip.scss',
  shadow: true,
})
export class ChipComponent {
  @Element() hostElement: HTMLB2bChipComponentElement;
  /**
   * The text content of the chip.
   */
  @Prop() label: string;
  /**
   * Whether the chip is disabled.
   */
  @Prop() disabled?: boolean = false;

  /** Whether or not the chip component has a close button. Per default it is true. */
  @Prop() hasCloseButton?: boolean = true;

  /** It is only used when the chip component participates in a group */
  @Prop({ reflect: true }) value?: any;

  /**
   * This even will be triggered when the chip element is closed
   */
  @Event({ eventName: 'b2b-close' })
  b2bClose: EventEmitter<ChipComponentEventDetail>;

  private onClick = (ev: MouseEvent) => {
    ev.preventDefault();
    if (this.disabled) {
      return;
    }
    this.b2bClose.emit({ value: this.value });
  };

  private clearIcon = (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height="12px"
      width="12px">
      <path d="M12 2.99951C16.9629 2.99951 21 7.03711 21 12C21 16.9629 16.9629 21.001 12 21.001C7.0376 21.001 3 16.9629 3 12C3 7.03711 7.0376 2.99951 12 2.99951ZM12 3.99951C7.58887 3.99951 4 7.58838 4 12C4 16.4121 7.58887 20.001 12 20.001C16.4111 20.001 20 16.4121 20 12C20 7.58838 16.4111 3.99951 12 3.99951ZM8.14648 8.14648C8.3201 7.97287 8.58939 7.95358 8.78426 8.08861L8.85352 8.14648L12 11.293L15.1465 8.14648C15.3418 7.95117 15.6582 7.95117 15.8535 8.14648C16.0271 8.3201 16.0464 8.58939 15.9114 8.78426L15.8535 8.85352L12.707 12L15.8535 15.1465C16.0488 15.3418 16.0488 15.6582 15.8535 15.8535C15.7559 15.9512 15.6279 16 15.5 16C15.4041 16 15.3081 15.9725 15.2249 15.9176L15.1465 15.8535L12 12.707L8.85352 15.8535C8.75586 15.9512 8.62793 16 8.5 16C8.37207 16 8.24414 15.9512 8.14648 15.8535C7.97287 15.6799 7.95358 15.4106 8.08861 15.2157L8.14648 15.1465L11.293 12L8.14648 8.85352C7.95117 8.6582 7.95117 8.3418 8.14648 8.14648Z" />
    </svg>
  );

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-chip': true,
            'b2b-chip--disabled': this.disabled,
          }}>
          <span class="b2b-chip__label">{this.label}</span>
          {this.hasCloseButton && (
            <span
              class={{
                'b2b-chip__clearIcon': true,
                'b2b-chip--disabled__clearIcon': this.disabled,
              }}
              onClick={this.onClick}>
              {this.clearIcon}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
