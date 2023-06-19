import { Component, Element, h, Host, Prop } from '@stencil/core';
import { WizardStatus, WizardSteps } from '../../utils/types/wizard.types';

@Component({
  tag: 'b2b-wizard',
  styleUrl: 'wizard.scss',
  shadow: true,
})
export class WizardComponent {
  @Element() host: HTMLB2bWizardElement;

  /** The current active step */
  @Prop() activeStep: WizardSteps | '0' = '1';

  /** By default, is false, where the wizard will handle steps states.
   * If set to true, steps state must be handled manually.  */
  @Prop() custom: boolean = false;

  /** Defaults to true. It will show a checkmark icon when a step is completed.
   * Set as false to show the step number */
  @Prop() checkIcon: boolean = true;

  private MAX_STEP_AMOUNT = 6;

  componentWillLoad() {
    const steps = this.getChildSteps();
    if (Number(this.activeStep) > steps.length) {
      console.error('B2B WIZARD: Active step is higher than total steps.');
    }
    if (steps.length > this.MAX_STEP_AMOUNT) {
      console.warn(
        `B2B WIZARD: Please don't use more than ${this.MAX_STEP_AMOUNT} steps. If more needed get in touch with the B2B design team`,
      );
    }
  }

  componentWillRender() {
    if (!this.custom) this.setStepsState();
  }

  private getChildSteps = () => {
    return Array.from(this.host.querySelectorAll('b2b-wizard-step'));
  };

  private setStepsState = () => {
    const steps = this.getChildSteps();
    steps.map((step: HTMLB2bWizardStepElement, index) => {
      step.state = this.getStepState(index + 1);
      step.step = (index + 1).toString() as WizardSteps;
      step.checkIcon = this.checkIcon;
    });
  };

  private getStepState = (step: number) => {
    const currentStep = Number(this.activeStep);
    if (currentStep == step) {
      return WizardStatus.ACTIVE;
    } else if (step < currentStep || currentStep === 0) {
      return WizardStatus.COMPLETE;
    } else {
      return WizardStatus.DEFAULT;
    }
  };

  render() {
    return (
      <Host>
        <div class="b2b_wizard">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
