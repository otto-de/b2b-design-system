import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'b2b-stepper',
  styleUrl: 'stepper.scss',
  shadow: true,
})
export class StepperComponent {
  /** The steps to be shown*/
  @Prop() steps: string[] = ['test', 'test2'];
  /** The current active step */
  @Prop() stepIndex: number = 1;

  render() {
    return (
      <Host>
        <div class="b2b_grid">
          <ul class="b2b_wizard">
            {this.steps.map((step, index) => {
              if (this.stepIndex == index)
                return (
                  <li class="b2b_wizard__step b2b2_my-4 b2b_wizard__step--active">
                    <span>{step}</span>
                  </li>
                );
              else
                return (
                  <li class="b2b_wizard__step b2b2_my-4 b2b_wizard__step--complete">
                    <span>{step}</span>
                  </li>
                );
            })}
          </ul>
        </div>
      </Host>
    );
  }
}
