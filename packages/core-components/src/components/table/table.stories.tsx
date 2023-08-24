import { Meta, Story } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import tableDocs from './table.docs.mdx';
import {
  ContentAlignment,
  TableRowgroupTypes,
  TableSizes,
} from '../../utils/types/table.types';
import {
  sampleData,
  smallSampleData,
  longSampleData,
  userSampleData,
} from './stories.data';
import { useArgs } from '@storybook/preview-api';

const Template: Story = ({
  data,
  parentWidth,
  firstColumnWidth,
  firstRowHeight,
  size,
  textWrap,
  align,
  highlight,
  withDividers,
  color,
}) => {
  return html`
    <div style="width: ${parentWidth}">
      <b2b-table size="${size}">
        <b2b-table-rowgroup type="header">
          <b2b-table-row>
            ${data.columns.map((columnName, index) => {
              return html` <b2b-table-header
                ?divider=${withDividers && index !== data.columns.length - 1}
                style=${index === 0 ? `width: ${firstColumnWidth}` : ''}
                >${columnName}</b2b-table-header
              >`;
            })}
          </b2b-table-row>
        </b2b-table-rowgroup>
        <b2b-table-rowgroup type="body">
          ${data.rows.map((row, index) => {
            return html`<b2b-table-row
              highlight="${highlight}"
              style=${index === 0 ? `height: ${firstRowHeight}` : ''}
              color=${index === 0 ? color : 'default'}>
              ${row.map(
                (data, index) =>
                  html`<b2b-table-cell
                    ?divider=${withDividers && index === 0}
                    align="${align}"
                    text-wrap="${textWrap}"
                    >${data}</b2b-table-cell
                  >`,
              )}
            </b2b-table-row>`;
          })}
        </b2b-table-rowgroup>
      </b2b-table>
    </div>
  `;
};

const defaultArgs = {
  data: sampleData,
  parentWidth: '600px',
  firstColumnWidth: 'auto',
  firstRowHeight: 'auto',
  size: 'expand',
  textWrap: false,
  align: 'left',
  highlight: true,
  withDividers: false,
  color: 'default',
};

export const story010TableExpand = Template.bind({});
story010TableExpand.args = { ...defaultArgs };
story010TableExpand.storyName = 'Size Expand';

export const story020TableEqual = Template.bind({});
story020TableEqual.args = { ...defaultArgs, size: 'equal' };
story020TableEqual.storyName = 'Size Equal';

export const story030TableExpand = Template.bind({});
story030TableExpand.args = { ...defaultArgs, parentWidth: '100%' };
story030TableExpand.storyName = 'Size Expand Full width';

export const story040TableExpand = Template.bind({});
story040TableExpand.args = {
  ...defaultArgs,
  data: smallSampleData,
  parentWidth: '450px',
};
story040TableExpand.storyName = 'Small Table Expand';

export const story050TableEqual = Template.bind({});
story050TableEqual.args = {
  ...defaultArgs,
  data: smallSampleData,
  parentWidth: '450px',
  size: 'equal',
};
story050TableEqual.storyName = 'Small Table Equal';

export const story060TableFixedCellSize = Template.bind({});
story060TableFixedCellSize.args = {
  ...defaultArgs,
  data: smallSampleData,
  size: 'equal',
  firstColumnWidth: '50%',
  withDividers: true,
};
story060TableFixedCellSize.storyName = 'Fixed Cell Width';

export const story070TableFixedRowHeight = Template.bind({});
story070TableFixedRowHeight.args = {
  ...defaultArgs,
  data: smallSampleData,
  size: 'expand',
  firstRowHeight: '120px',
};
story070TableFixedRowHeight.storyName = 'Fixed Row Height';

export const story080TableWithDividers = Template.bind({});
story080TableWithDividers.args = {
  ...defaultArgs,
  withDividers: true,
};
story080TableWithDividers.storyName = 'With dividers';

export const story090TableColor = Template.bind({});
story090TableColor.args = {
  ...defaultArgs,
  data: smallSampleData,
  color: 'group',
};
story090TableColor.storyName = 'Colored row';

const TemplateScrollable: Story = ({
  data,
  parentWidth,
  parentHeight,
  columnsWidth,
  size,
  textWrap,
  align,
  withDividers,
}) => {
  return html`
    <b2b-scrollable-container
      style="width: ${parentWidth}; height: ${parentHeight};">
      <b2b-table size="${size}">
        <b2b-table-rowgroup type="header">
          <b2b-table-row>
            ${data.columns.map((columnName, index) => {
              return html` <b2b-table-header
                ?divider=${withDividers && index !== data.columns.length - 1}
                style=${`min-width: ${columnsWidth}`}
                >${columnName}</b2b-table-header
              >`;
            })}
          </b2b-table-row>
        </b2b-table-rowgroup>
        <b2b-table-rowgroup type="body">
          ${data.rows.map(row => {
            return html`<b2b-table-row>
              ${row.map(
                (data, index) =>
                  html`<b2b-table-cell
                    ?divider=${withDividers && index === 0}
                    align="${align}"
                    text-wrap="${textWrap}"
                    >${data}</b2b-table-cell
                  >`,
              )}
            </b2b-table-row>`;
          })}
        </b2b-table-rowgroup>
      </b2b-table>
    </b2b-scrollable-container>
  `;
};

export const story100ScrollableTable = TemplateScrollable.bind({});
story100ScrollableTable.args = {
  parentWidth: '600px',
  parentHeight: '250px',
  columnsWidth: '80px',
  data: longSampleData,
  size: 'expand',
  withDividers: true,
  textWrap: false,
  align: 'left',
};
story100ScrollableTable.storyName = 'Scrollable table';

const TemplateSorting: Story = ({
  data,
  firstColumnWidth,
  size,
  textWrap,
  align,
  highlight,
  withDividers,
  color,
}) => {
  const [_, updateArgs] = useArgs();
  const onSort = (event, index) => {
    switch (event.detail) {
      case 'ascending':
        data.rows.sort((a, b) => {
          if (a[index] < b[index]) {
            return -1;
          } else if (a[index] > b[index]) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'descending':
        data.rows.sort((a, b) => {
          if (a[index] < b[index]) {
            return 1;
          } else if (a[index] > b[index]) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
    }
    updateArgs({ data: data });
  };
  return html`
    <div>
      <b2b-table size="${size}">
        <b2b-table-rowgroup type="header">
          <b2b-table-row>
            ${data.columns.map(column => {
              return html` <b2b-table-header
                sort-direction="not-sorted"
                @b2b-change=${event => onSort(event, column.id)}
                ?divider=${withDividers}
                style=${column.id === 0 ? `width: ${firstColumnWidth}` : ''}
                >${column.name}</b2b-table-header
              >`;
            })}
          </b2b-table-row>
        </b2b-table-rowgroup>
        <b2b-table-rowgroup type="body">
          ${data.rows.map((row, index) => {
            return html`<b2b-table-row
              highlight="${highlight}"
              color=${index === 0 ? color : 'default'}>
              ${row.map(
                data =>
                  html`<b2b-table-cell
                    ?divider=${withDividers}
                    align="${align}"
                    text-wrap="${textWrap}"
                    >${data}</b2b-table-cell
                  >`,
              )}
            </b2b-table-row>`;
          })}
        </b2b-table-rowgroup>
      </b2b-table>
    </div>
  `;
};

export const story110Sorting = TemplateSorting.bind({});
story110Sorting.args = {
  ...defaultArgs,
  withDividers: true,
  size: 'expand',
  data: userSampleData,
};
story110Sorting.storyName = 'Table with Sorting';

const TemplateAccordion: Story = ({
  data,
  firstColumnWidth,
  size,
  textWrap,
  align,
  highlight,
  withDividers,
  color,
}) => {
  return html`
    <div>
      <b2b-table size="${size}">
        <b2b-table-rowgroup type="header" accordion>
          <b2b-table-row>
            ${data.columns.map((columnName, index) => {
              return html` <b2b-table-header
                ?divider=${withDividers && index !== data.columns.length - 1}
                style=${index === 0 ? `width: ${firstColumnWidth}` : ''}
                >${columnName}</b2b-table-header
              >`;
            })}
          </b2b-table-row>
        </b2b-table-rowgroup>
        <b2b-table-rowgroup type="body" accordion>
          ${data.rows.map((row, index) => {
            return html`<b2b-table-row
              highlight="${highlight}"
              color=${index === 0 ? color : 'default'}>
              ${row.map(
                data =>
                  html`<b2b-table-cell
                    ?divider=${withDividers}
                    align="${align}"
                    text-wrap="${textWrap}"
                    >${data}</b2b-table-cell
                  >`,
              )}
            </b2b-table-row>`;
          })}
        </b2b-table-rowgroup>
        <b2b-table-rowgroup type="body" accordion opened>
          ${data.rows.map((row, index) => {
            return html`<b2b-table-row
              highlight="${highlight}"
              color=${index === 0 ? color : 'default'}>
              ${row.map(
                data =>
                  html`<b2b-table-cell
                    ?divider=${withDividers}
                    align="${align}"
                    text-wrap="${textWrap}"
                    >${data}</b2b-table-cell
                  >`,
              )}
            </b2b-table-row>`;
          })}
        </b2b-table-rowgroup>
      </b2b-table>
    </div>
  `;
};

export const story120Accordion = TemplateAccordion.bind({});
story120Accordion.args = { ...defaultArgs, data: sampleData };
story120Accordion.storyName = 'Accordion Table';

const tableArgs = getArgTypes('b2b-table');
const rowGroupArgs = getArgTypes('b2b-table-rowgroup');
const rowArgs = getArgTypes('b2b-table-row');
const headerArgs = getArgTypes('b2b-table-header');
const cellArgs = getArgTypes('b2b-table-cell');

// Override defaults
tableArgs.size = { ...tableArgs.size, name: 'size (b2b-table)' };
tableArgs.size.table.defaultValue = { summary: TableSizes.EXPAND };
rowGroupArgs.type = {
  ...rowGroupArgs.type,
  name: 'type (b2b-table-rowgroup)',
  options: [],
};
rowGroupArgs.type.table.defaultValue = { summary: TableRowgroupTypes.HEADER };
rowArgs.highlight = { ...rowArgs.highlight, name: 'highlight (b2b-table-row)' };
cellArgs.align = { ...cellArgs.align, name: 'align (b2b-table-cell)' };
cellArgs.align = { ...cellArgs.align, name: 'align (b2b-table-cell)' };
cellArgs.align.table.defaultValue = { summary: ContentAlignment.LEFT };
cellArgs.textWrap = { ...cellArgs.textWrap, name: 'textWrap (b2b-table-cell)' };

const argsTableData = {
  ...rowGroupArgs,
  ...rowArgs,
  ...headerArgs,
  ...cellArgs,
  ...tableArgs,
};

argsTableData.parentWidth = {
  description:
    'This is not a component prop. It is the width of the container the table in this example.',
};

argsTableData.parentHeight = {
  description:
    'This is not a component prop. It is the height of the container the table in this example.',
};

argsTableData.columnsWidth = {
  description:
    'This is not a component prop. It is an example of a way to handle fixed width for table columns.',
};

argsTableData.firstColumnWidth = {
  description:
    'This is not a component prop. It is an example of a way to handle fixed width for a table column.',
};

argsTableData.data = {
  table: { disable: true },
};

export default {
  title: 'Components/Content/Table',
  argTypes: { ...argsTableData, sortDirection: false, type: false },
  viewmode: 'docs',
  parameters: {
    controls: { expanded: true },
    docs: {
      page: tableDocs,
    },
    backgrounds: {
      default: 'docsBackground',
      values: [{ name: 'docsBackground', value: '#fff' }],
    },
  },
} as Meta;
