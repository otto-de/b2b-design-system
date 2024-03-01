import { h, Component, Prop, Element, Host } from '@stencil/core';

@Component({
  tag: 'b2b-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true,
})
export class ProgressBarComponent {
  @Element() hostElement: HTMLB2bProgressBarElement;

  /** The percentage of progress from 0 to 100. */
  @Prop() progress: number;

  /** The label of the progress bar. */
  @Prop() label?: string;

  /** Whether the label should be displayed below or on the side of the progress bar. */
  @Prop() labelType?: 'below' | 'side' = 'below';

  /** Whether the label should be displayed on the right or left of the progress bar. */
  @Prop() labelPosition?: 'left' | 'right' = 'left';

  private getProgress = () => {
    if (isNaN(this.progress) || this.progress < 0) {
      return 0;
    } else if (this.progress > 100) {
      return 100;
    }
    return this.progress;
  };

  render() {
    const labelExists = this.label !== undefined && this.label !== '';
    return (
      <Host>
        <div
          class={{
            [`b2b-progress-bar__${this.labelPosition}-${this.labelType}`]: true,
          }}>
          <div class="b2b-progress-bar__wrapper">
            <div
              class="b2b-progress-bar__progress"
              style={{
                width: `${this.getProgress()}%`,
              }}
            />
          </div>
          <div
            class={{
              'b2b-progress-bar__label': labelExists,
              'b2b-progress-bar__label-none': !labelExists,
              [`b2b-progress-bar__label__${this.labelPosition}-${this.labelType}`]:
                labelExists,
            }}>
            {this.label}
          </div>
        </div>
      </Host>
    );
  }
}
