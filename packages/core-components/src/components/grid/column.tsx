import { Component, Prop, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'b2b-grid-col',
  shadow: true,
})
export class B2bGridColumnComponent {
  @Element() hostElement: HTMLB2bGridColElement;

  /** How many columns the width of the col element should be. If not specified, the col will take up all available space in one row. Up to single 12 columns fit in one row. */
  @Prop({ reflect: true }) span:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12;

  /** The alignment of text placed inside of a column. Note that this will apply to all children. */
  @Prop() textAlign: 'left' | 'center' | 'right' = 'left';

  private calculateGrowDimension = (growth: number | undefined) => {
    const gap = this.hostElement.closest('b2b-grid-row').columnGap;

    // if a span is not specified, we still need to subtract gap width and a growth factor of 1
    let growthFactor: string;
    if (gap > 0 && growth != undefined) {
      growthFactor = `- ${gap - 2 * growth}px`;
    } else if (gap <= 0 && growth != undefined) {
      growthFactor = '';
    } else {
      growthFactor = `- ${gap - 2}px`;
    }
    const flexGrow = growth == undefined ? 1 : 0;
    const width = growth == undefined ? 1 : growth;
    return {
      ['flex']: `${flexGrow} 0 calc(${(width / 12) * 100}% ${growthFactor})`,
    };
  };

  render() {
    return (
      <Host
        style={{
          ...this.calculateGrowDimension(this.span),
          ['text-align']: `${this.textAlign}`,
        }}>
        <slot></slot>
      </Host>
    );
  }
}
