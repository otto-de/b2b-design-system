import { Component, Prop, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'b2b-grid-col',
  shadow: true,
})
export class B2bGridColumnComponent {
  @Element() hostElement: HTMLB2bGridColElement;

  /** How many columns the width of the col element should be. If not specified, the col will take up all available space in one row. We recommend explicitly defining the span in scenarios where the distribution of 12 spans across columns is clear. Up to single 12 columns fit in one row. */
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

  private calculateGrowDimension = (span: number | undefined) => {
    if (span !== undefined) {
      const flex = (span / 12) * 100;
      return {
        ['flex']: `${flex}`,
      };
    }
  };

  render() {
    return (
      <Host
        style={{
          ...this.calculateGrowDimension(this.span),
          ['text-align']: `${this.textAlign}`,
          ['min-width']: '1px',
        }}>
        <slot></slot>
      </Host>
    );
  }
}
