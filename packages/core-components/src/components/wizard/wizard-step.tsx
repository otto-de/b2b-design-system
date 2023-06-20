import { Component, h, Host, Prop } from '@stencil/core';
import { WizardSteps, WizardStatus } from '../../utils/types/wizard.types';

@Component({
  tag: 'b2b-wizard-step',
  styleUrl: 'wizard.scss',
  shadow: true,
})
export class WizardStepComponent {
  /** Use when wizard has property custom true. The state of the step */
  @Prop() state: WizardStatus = 'pending';

  /** Use when wizard has property custom true. The step number */
  @Prop() step: WizardSteps = '1';

  /** Defaults to true. It will show a checkmark icon when a step is completed.
   * Set as false to show the step number */
  @Prop() checkIcon: boolean = true;

  render() {
    return (
      <Host>
        <div class="b2b_wizard__step">
          <b2b-wizard-icon
            step={this.step}
            state={this.state}
            checkIcon={this.checkIcon}></b2b-wizard-icon>
          <div
            class={{
              'b2b_wizard__step-label': true,
              'b2b_wizard__step-label--default':
                this.state === WizardStatus.DEFAULT,
            }}>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
