import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'b2b-wizard-icon',
  styleUrl: 'wizard-icon.scss',
  shadow: true,
})
export class WizardIconComponent {
  /** The step number */
  @Prop() step: '1' | '2' | '3' | '4' | '5' | '6';

  /** The state of the step */
  @Prop() state: 'completed' | 'pending' | 'disabled' = 'pending';

  render() {
    return (
      <Host>
        <div
          class={{
            'b2b-wizard-icon': true,
          }}>
          {this.state === 'completed' && (
            <b2b-rounded-icon
              color="var(--b2b-color-success-50)"
              content-color="var(--b2b-color-success-100)">
              <b2b-icon slot="icon" icon="b2b_icon-check"></b2b-icon>
            </b2b-rounded-icon>
          )}
          {this.state === 'pending' && (
            <b2b-rounded-icon color="black" content-color="white">
              <span slot="text">{this.step}</span>
            </b2b-rounded-icon>
          )}
          {this.state === 'disabled' && (
            <b2b-rounded-icon
              color="var(--b2b-color-grey-50)"
              content-color="var(--b2b-color-grey-300)">
              <span slot="text">{this.step}</span>
            </b2b-rounded-icon>
          )}
        </div>
      </Host>
    );
  }
}
