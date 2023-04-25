import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';
import gridDocs from './grid.docs.mdx';

const Template: Story = ({
  margin,
  justify,
  textAlign,
  span,
  rowGap,
  columnGap,
  alignItems,
  storyName,
}) => {
  const gridBoxStyles = `border: 1px solid #c4c4c4; padding: 1rem; background-color: #fff; height: 200px;`;
  const gridBoxSmallStyles = `border: 1px solid #c4c4c4; padding: 1rem; background-color: #fff; height: 100px;`;

  switch (storyName) {
    case '010Grid':
      return html` <b2b-grid margin="${margin}">
        <b2b-grid-row
          justify="${justify}"
          row-gap="${rowGap}"
          column-gap="${columnGap}">
          <b2b-grid-col span="6" text-align="${textAlign}"
            ><div style="${gridBoxStyles}">
              <h4>Column 1-6 of ${9 + Number(span)}</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse massa urna, accumsan id viverra et, mollis sit amet
                sem. Cras congue ex ac arcu pellentesque, eu vestibulum sem
                tempor. Curabitur consequat massa sed nulla lacinia, vitae
                scelerisque ante egestas. Praesent et diam quis diam posuere
                egestas. Duis feugiat lorem non nisl consectetur, sed fringilla
                odio semper.
              </p>
            </div></b2b-grid-col
          >
          <b2b-grid-col
            ><div style="${gridBoxStyles}">
              <h4>Column 7 of ${9 + Number(span)}</h4>
              <p>I grow to fill up all available space</p>
            </div></b2b-grid-col
          >
          <b2b-grid-col
            ><div style="${gridBoxStyles}">
              <h4>Column 8 of ${9 + Number(span)}</h4>
              <p>I grow to fill up all available space</p>
            </div></b2b-grid-col
          >
          <b2b-grid-col
            ><div style="${gridBoxStyles}">
              <h4>Column 9 of ${9 + Number(span)}</h4>
              <p>I grow to fill up all available space</p>
            </div></b2b-grid-col
          >
          <b2b-grid-col span="${span}"
            ><div style="${gridBoxStyles}">
              <h4>Column 10-${9 + Number(span)} of ${9 + Number(span)}</h4>
              <p>Resize me by changing the span attribute in the args table.</p>
            </div></b2b-grid-col
          >
        </b2b-grid-row>
      </b2b-grid>`;
    case '020AlignItems':
      return html`<b2b-grid
        ><b2b-grid-row
          align-items="${alignItems}"
          justify="${justify}"
          row-gap="${rowGap}"
          column-gap="${columnGap}">
          <b2b-grid-col
            ><div style="${gridBoxSmallStyles}">
              <h4>Column 1 of 6</h4>
            </div></b2b-grid-col
          >
          <b2b-grid-col
            ><div style="${gridBoxStyles}">
              <h4>Column 2 of 6</h4>
            </div></b2b-grid-col
          >
          <b2b-grid-col
            ><div style="${gridBoxSmallStyles}">
              <h4>Column 3 of 6</h4>
            </div></b2b-grid-col
          >
          <b2b-grid-col
            ><div style="${gridBoxStyles}">
              <h4>Column 4 of 6</h4>
            </div></b2b-grid-col
          >
          <b2b-grid-col
            ><div style="${gridBoxSmallStyles}">
              <h4>Column 5 of 6</h4>
            </div></b2b-grid-col
          >
          <b2b-grid-col
            ><div style="${gridBoxStyles}">
              <h4>Column 6 of 6</h4>
            </div></b2b-grid-col
          >
        </b2b-grid-row></b2b-grid
      >`;
    case '030TextAlign':
      return html`<b2b-grid margin="${margin}">
        <b2b-grid-row
          justify="${justify}"
          row-gap="${rowGap}"
          column-gap="${columnGap}">
          <b2b-grid-col span="6" text-align="${textAlign}"
            ><div style="${gridBoxStyles}">
              <h4>Column 1-6 of 9</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse massa urna, accumsan id viverra et, mollis sit amet
                sem. Cras congue ex ac arcu pellentesque, eu vestibulum sem
                tempor. Curabitur consequat massa sed nulla lacinia, vitae
                scelerisque ante egestas. Praesent et diam quis diam posuere
                egestas. Duis feugiat lorem non nisl consectetur, sed fringilla
                odio semper.
              </p>
            </div></b2b-grid-col
          >
          <b2b-grid-col
            ><div style="${gridBoxStyles}">
              <h4>Column 7 of 9</h4>
            </div></b2b-grid-col
          >
          <b2b-grid-col
            ><div style="${gridBoxStyles}">
              <h4>Column 8 of 9</h4>
            </div></b2b-grid-col
          >
          <b2b-grid-col
            ><div style="${gridBoxStyles}">
              <h4>Column 9 of 9</h4>
            </div></b2b-grid-col
          ></b2b-grid-row
        ></b2b-grid
      >`;
    case '040Justify':
      return html`<b2b-grid margin="${margin}">
        <b2b-grid-row
          justify="${justify}"
          row-gap="${rowGap}"
          column-gap="${columnGap}">
          <b2b-grid-col span="6" text-align="${textAlign}"
            ><div style="${gridBoxStyles}">
              <h4>Column 1-6 of 9</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse massa urna, accumsan id viverra et, mollis sit amet
                sem. Cras congue ex ac arcu pellentesque, eu vestibulum sem
                tempor. Curabitur consequat massa sed nulla lacinia, vitae
                scelerisque ante egestas. Praesent et diam quis diam posuere
                egestas. Duis feugiat lorem non nisl consectetur, sed fringilla
                odio semper.
              </p>
            </div></b2b-grid-col
          >
          <b2b-grid-col span="1"
            ><div style="${gridBoxStyles}">
              <h4>Column 7 of 9</h4>
            </div></b2b-grid-col
          >
          <b2b-grid-col span="1"
            ><div style="${gridBoxStyles}">
              <h4>Column 8 of 9</h4>
            </div></b2b-grid-col
          >
          <b2b-grid-col span="1"
            ><div style="${gridBoxStyles}">
              <h4>Column 9 of 9</h4>
            </div></b2b-grid-col
          ></b2b-grid-row
        ></b2b-grid
      >`;
  }
};

export const story010Grid = Template.bind({});
story010Grid.args = {
  margin: 24,
  alignItems: 'stretch',
  columnGap: 24,
  rowGap: 24,
  justify: 'start',
  span: '3',
  textAlign: 'left',
  storyName: '010Grid',
};
story010Grid.storyName = 'Resizable Columns';

export const story020AlignItems = Template.bind({});
story020AlignItems.args = {
  margin: 24,
  alignItems: 'center',
  columnGap: 24,
  rowGap: 24,
  justify: 'center',
  span: '3',
  textAlign: 'left',
  storyName: '020AlignItems',
};
story020AlignItems.storyName = 'Align Items';

export const story030TextAlign = Template.bind({});
story030TextAlign.args = {
  margin: 24,
  alignItems: 'stretch',
  columnGap: 24,
  rowGap: 24,
  justify: 'end',
  span: '2',
  textAlign: 'center',
  storyName: '030TextAlign',
};
story030TextAlign.storyName = 'Text Align';

export const story040Justify = Template.bind({});
story040Justify.args = {
  margin: 24,
  alignItems: 'stretch',
  columnGap: 24,
  rowGap: 24,
  justify: 'space-around',
  span: '2',
  textAlign: 'center',
  storyName: '040Justify',
};
story040Justify.storyName = 'Justify Content';

const rowArgs = getArgTypes('b2b-grid-row');
const colArgs = getArgTypes('b2b-grid-col');
const gridArgs = getArgTypes('b2b-grid');

const gridArgsData = {
  ...rowArgs,
  ...colArgs,
  ...gridArgs,
};

gridArgsData.data = {
  table: { disable: true },
};

export default {
  title: 'Components/Utilities/Grid',
  argTypes: { ...gridArgsData, storyName: { control: false } },
  viewmode: 'docs',
  parameters: {
    controls: { expanded: true },
    docs: {
      page: gridDocs,
    },
  },
} as Meta;
