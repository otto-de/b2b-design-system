import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const gridBoxStyles = `border: 1px solid #c4c4c4; padding: 1rem; background-color: #fff; height: 200px;`;
const gridBoxSmallStyles = `border: 1px solid #c4c4c4; padding: 1rem; background-color: #fff; height: 100px;`;

const meta: Meta = {
  title: 'Components/Utilities/Grid',
  component: 'b2b-grid',
  args: {},
  argTypes: getArgTypes('b2b-grid'),
};

export default meta;

type Story = StoryObj;

export const story010Grid: Story = {
  name: 'Resizable Columns',
  args: {
    margin: 24,
    alignItems: 'stretch',
    columnGap: 24,
    rowGap: 24,
    justify: 'start',
    textAlign: 'left',
  },
  render: ({ ...args }) => html` <b2b-grid margin="${args.margin}">
    <b2b-grid-row
      justify="${args.justify}"
      row-gap="${args.rowGap}"
      column-gap="${args.columnGap}">
      <b2b-grid-col span="6" text-align="${args.textAlign}"
        ><div style="${gridBoxStyles}">
          <h4>Column 1-6 of 12</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            massa urna, accumsan id viverra et, mollis sit amet sem. Cras congue
            ex ac arcu pellentesque, eu vestibulum sem tempor. Curabitur
            consequat massa sed nulla lacinia, vitae scelerisque ante egestas.
            Praesent et diam quis diam posuere egestas. Duis feugiat lorem non
            nisl consectetur, sed fringilla odio semper.
          </p>
        </div></b2b-grid-col
      >
      <b2b-grid-col
        ><div style="${gridBoxStyles}">
          <h4>Column 7 of 12</h4>
          <p>I grow to fill up all available space</p>
        </div></b2b-grid-col
      >
      <b2b-grid-col
        ><div style="${gridBoxStyles}">
          <h4>Column 8 of 12</h4>
          <p>I grow to fill up all available space</p>
        </div></b2b-grid-col
      >
      <b2b-grid-col
        ><div style="${gridBoxStyles}">
          <h4>Column 9 of 12</h4>
          <p>I grow to fill up all available space</p>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="3"
        ><div style="${gridBoxStyles}">
          <h4>Column 10-12 of 12</h4>
          <p>Resize me by changing the span attribute in the args table.</p>
        </div></b2b-grid-col
      >
    </b2b-grid-row>
  </b2b-grid>`,
};

export const story020AlignItems: Story = {
  name: 'Align Items',
  args: {
    margin: 24,
    alignItems: 'center',
    columnGap: 24,
    rowGap: 24,
    justify: 'center',
    textAlign: 'left',
  },
  render: ({ ...args }) => html`<b2b-grid
    ><b2b-grid-row
      align-items="${args.alignItems}"
      justify="${args.justify}"
      row-gap="${args.rowGap}"
      column-gap="${args.columnGap}">
      <b2b-grid-col span="2"
        ><div style="${gridBoxSmallStyles}">
          <h4>Column 1-2 of 12</h4>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="2"
        ><div style="${gridBoxStyles}">
          <h4>Column 3-4 of 12</h4>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="2"
        ><div style="${gridBoxSmallStyles}">
          <h4>Column 5-6 of 12</h4>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="2"
        ><div style="${gridBoxStyles}">
          <h4>Column 7-8 of 12</h4>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="2"
        ><div style="${gridBoxSmallStyles}">
          <h4>Column 9-10 of 12</h4>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="2"
        ><div style="${gridBoxStyles}">
          <h4>Column 11-12 of 12</h4>
        </div></b2b-grid-col
      >
    </b2b-grid-row></b2b-grid
  >`,
};

export const story030TextAlign: Story = {
  name: 'Text Align',
  args: {
    margin: 24,
    alignItems: 'stretch',
    columnGap: 24,
    rowGap: 24,
    justify: 'end',
    textAlign: 'left',
  },
  render: ({ ...args }) => html`<b2b-grid margin="${args.margin}">
    <b2b-grid-row
      justify="${args.justify}"
      row-gap="${args.rowGap}"
      column-gap="${args.columnGap}">
      <b2b-grid-col span="6" text-align="${args.textAlign}"
        ><div style="${gridBoxStyles}">
          <h4>Column 1-6 of 12</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            massa urna, accumsan id viverra et, mollis sit amet sem. Cras congue
            ex ac arcu pellentesque, eu vestibulum sem tempor. Curabitur
            consequat massa sed nulla lacinia, vitae scelerisque ante egestas.
            Praesent et diam quis diam posuere egestas. Duis feugiat lorem non
            nisl consectetur, sed fringilla odio semper.
          </p>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="2"
        ><div style="${gridBoxStyles}">
          <h4>Column 7-8 of 12</h4>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="2"
        ><div style="${gridBoxStyles}">
          <h4>Column 9-10 of 12</h4>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="2"
        ><div style="${gridBoxStyles}">
          <h4>Column 11-12 of 12</h4>
        </div></b2b-grid-col
      ></b2b-grid-row
    ></b2b-grid
  >`,
};

export const story040Justify: Story = {
  name: 'Justify Content',
  args: {
    margin: 24,
    alignItems: 'stretch',
    columnGap: 24,
    rowGap: 24,
    justify: 'space-around',
    textAlign: 'center',
  },
  render: ({ ...args }) => html`<b2b-grid margin="${args.margin}">
    <b2b-grid-row
      justify="${args.justify}"
      row-gap="${args.rowGap}"
      column-gap="${args.columnGap}">
      <b2b-grid-col span="6" text-align="${args.textAlign}"
        ><div style="${gridBoxStyles}">
          <h4>Column 1-6 of 12</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            massa urna, accumsan id viverra et, mollis sit amet sem. Cras congue
            ex ac arcu pellentesque, eu vestibulum sem tempor. Curabitur
            consequat massa sed nulla lacinia, vitae scelerisque ante egestas.
            Praesent et diam quis diam posuere egestas. Duis feugiat lorem non
            nisl consectetur, sed fringilla odio semper.
          </p>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="2"
        ><div style="${gridBoxStyles}">
          <h4>Column 7-8 of 12</h4>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="2"
        ><div style="${gridBoxStyles}">
          <h4>Column 9-10 of 12</h4>
        </div></b2b-grid-col
      >
      <b2b-grid-col span="2"
        ><div style="${gridBoxStyles}">
          <h4>Column 11-12 of 12</h4>
        </div></b2b-grid-col
      ></b2b-grid-row
    ></b2b-grid
  >`,
};
