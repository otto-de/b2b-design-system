import { Component, Prop, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'b2b-grid-row',
  shadow: true,
})
export class B2bGridRowComponent {
  @Element() hostElement: HTMLB2bGridRowElement;

  /** The spacing in between individual columns in px. The higher the gap, the smaller the columns will be. */
  @Prop() columnGap: number = 24;

  /** The spacing between individual rows in px. */
  @Prop() rowGap: number = 24;

  /** Vertical alignment of columns. This requires the row to have a defined height. */
  @Prop() alignItems: 'stretch' | 'flex-start' | 'center' | 'flex-end' =
    'stretch';

  /** Horizontal alignment of columns. */
  @Prop() justify:
    | 'start'
    | 'end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly' = 'start';

  render() {
    return (
      <Host
        style={{
          ['justify-content']: `${this.justify}`,
          ['gap']: `${this.columnGap}px`,
          ['margin']: `${this.rowGap}px 0`,
          ['align-items']: `${this.alignItems}`,
          ['display']: 'flex',
          ['flex-wrap']: 'wrap',
          ['box-sizing']: 'border-box',
        }}>
        <slot></slot>
      </Host>
    );
  }
}
