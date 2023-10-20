import { Meta, StoryObj } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { userEvent } from '@storybook/testing-library';
import { html } from 'lit-html';
import { repeat } from 'lit/directives/repeat.js';
import {
  sampleData,
  smallSampleData,
  longSampleData,
  userSampleData,
} from './stories.data';
import { useArgs } from '@storybook/preview-api';

type Story = StoryObj;

const tableArgs = getArgTypes('b2b-table');
const cellArgs = getArgTypes('b2b-table-cell');
const rowArgs = getArgTypes('b2b-table-row');
const headerArgs = getArgTypes('b2b-table-header');

const meta: Meta = {
  title: 'Components/Content/Table',
  component: 'b2b-table',
  parameters: {
    backgrounds: {
      default: 'docsBackground',
      values: [{ name: 'docsBackground', value: '#ffffff' }],
    },
  },
  args: {
    size: 'expand',
    textWrap: false,
    align: 'left',
    highlight: true,
    withDividers: false,
    color: 'default',
    data: sampleData,
    parentWidth: '600px',
    firstColumnWidth: 'auto',
    firstRowHeight: 'auto',
    contentAlign: 'left',
  },
  argTypes: {
    ...tableArgs,
    ...cellArgs,
    ...rowArgs,
    ...headerArgs,
    data: { table: { disable: true } },
    parentWidth: { table: { disable: true } },
    firstColumnWidth: { table: { disable: true } },
    firstRowHeight: { table: { disable: true } },
  },
  render: ({ ...args }) => html`<div style="width: ${
    args.parentWidth
  }"><b2b-table size="${args.size}">
        <b2b-table-rowgroup type="header">
          <b2b-table-row>
            ${args.data.columns.map((columnName, index) => {
              return html`<b2b-table-header
                ?divider=${args.withDividers &&
                index !== args.data.columns.length - 1}
                style=${index === 0 ? `width: ${args.firstColumnWidth}` : ''}
                >${columnName}</b2b-table-header
              >`;
            })}
    </b2b-table-rowgroup>
    <b2b-table-rowgroup type="body">
      ${repeat(
        args.data.rows,
        (row, index) => html`
          <b2b-table-row
            highlight="${args.highlight}"
            color=${index === 0 ? args.color : 'default'}>
            ${repeat(
              // @ts-ignore
              row,
              (cell, index) => html`<b2b-table-cell
                ?divider=${args.withDividers && index === 0}
                align="${args.align}"
                text-wrap="${args.textWrap}"
                >${cell}</b2b-table-cell
              >`,
            )}<b2b-table-cell
              ><b2b-button size="50">Action</b2b-button></b2b-table-cell
            >
          </b2b-table-row>
        `,
      )}
    </b2b-table-rowgroup>
  </b2b-table></div>`,
};
export default meta;

export const SizeExpand: Story = {
  args: {
    ...meta.args,
  },
};

export const SizeEqual: Story = {
  args: {
    ...meta.args,
    size: 'equal',
  },
};

export const SizeExpandFullWidth: Story = {
  args: {
    ...meta.args,
    parentWidth: '100%',
  },
};

export const SmallTableExpand: Story = {
  args: {
    ...meta.args,
    data: smallSampleData,
    parentWidth: '450px',
  },
};

export const SmallTableEqual: Story = {
  args: {
    ...meta.args,
    data: smallSampleData,
    size: 'equal',
    parentWidth: '450px',
  },
};

export const FixedCellSize: Story = {
  args: {
    ...meta.args,
    data: smallSampleData,
    size: 'equal',
    firstColumnWidth: '50%',
    withDividers: true,
  },
};

export const FixedRowHeight: Story = {
  args: {
    ...meta.args,
    data: smallSampleData,
    size: 'expand',
    firstRowHeight: '120px',
  },
};

export const WithDividers: Story = {
  args: {
    ...meta.args,
    withDividers: true,
  },
};

export const ColoredRow: Story = {
  args: {
    ...meta.args,
    data: smallSampleData,
    color: 'group',
  },
};

export const ScrollableTable: Story = {
  args: {
    ...meta.args,
    parentWidth: '600px',
    parentHeight: '250px',
    columnsWidth: '80px',
    data: longSampleData,
    size: 'expand',
    withDividers: true,
    textWrap: false,
    align: 'left',
  },
  render: ({ ...args }) => html`<b2b-scrollable-container
    style="width: ${args.parentWidth}; height: ${args.parentHeight};">
    <b2b-table size="${args.size}">
      <b2b-table-rowgroup type="header">
        <b2b-table-row>
          ${args.data.columns.map((columnName, index) => {
            return html` <b2b-table-header
              ?divider=${args.withDividers &&
              index !== args.data.columns.length - 1}
              style=${`min-width: ${args.columnsWidth}`}
              >${columnName}</b2b-table-header
            >`;
          })}
        </b2b-table-row>
      </b2b-table-rowgroup>
      <b2b-table-rowgroup type="body">
        ${args.data.rows.map((row, index) => {
          return html`<b2b-table-row
            highlight="${args.highlight}"
            color=${index === 0 ? args.color : 'default'}>
            ${row.map(
              (data, index) =>
                html`<b2b-table-cell
                  ?divider=${args.withDividers && index === 0}
                  align="${args.align}"
                  text-wrap="${args.textWrap}"
                  >${data}</b2b-table-cell
                >`,
            )}
          </b2b-table-row>`;
        })}
      </b2b-table-rowgroup>
    </b2b-table>
  </b2b-scrollable-container>`,
};

const RenderSortableTable = ({ ...args }) => html`
      <b2b-table-rowgroup type="body">
        ${args.data.rows.map((row, index) => {
          return html`<b2b-table-row
            highlight="${args.highlight}"
            color=${index === 0 ? args.color : 'default'}>
            ${row.map(
              data =>
                html`<b2b-table-cell
                  ?divider=${args.withDividers}
                  align="${args.align}"
                  text-wrap="${args.textWrap}"
                  >${data}</b2b-table-cell
                >`,
            )}
          </b2b-table-row>`;
        })}
      </b2b-table-rowgroup>
    </b2b-table>
  </div>`;

const SortableTableMeta: Meta = {
  args: {
    ...meta.args,
  },
  decorators: [
    story => {
      const [args, updateArgs] = useArgs();
      const onSort = (event, index, data) => {
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
      return html`<div>
        <b2b-table size="expand">
          <b2b-table-rowgroup type="header">
            <b2b-table-row>
              ${userSampleData.columns.map(column => {
                return html` <b2b-table-header
                  sort-direction="not-sorted"
                  content-align=${args.contentAlign}
                  @b2b-change=${event =>
                    onSort(event, column.id, userSampleData)}
                  ?divider="false"
                  >${column.name}</b2b-table-header
                >`;
              })}
            </b2b-table-row> </b2b-table-rowgroup
          >${story()}</b2b-table
        >
      </div>`;
    },
  ],
};
export const SortableTable: Story = {
  args: {
    ...SortableTableMeta.args,
    contentAlign: 'left',
    align: 'left',
    data: userSampleData,
  },
  decorators: SortableTableMeta.decorators,
  render: RenderSortableTable,
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const header = await canvasElement.querySelector('b2b-table-header');
      const sortArrow = header.shadowRoot.querySelector('div');
      await userEvent.click(sortArrow);
    }, 2000);
  },
};
export const SortableTableRightAlign: Story = {
  args: {
    ...SortableTableMeta.args,
    contentAlign: 'right',
    align: 'right',
    data: userSampleData,
  },
  decorators: SortableTableMeta.decorators,
  render: RenderSortableTable,
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const header = await canvasElement.querySelector('b2b-table-header');
      const sortArrow = header.shadowRoot.querySelector('div');
      await userEvent.click(sortArrow);
    }, 1000);
  },
};

export const AccordionTable: Story = {
  args: {
    ...meta.args,
  },
  render: ({ ...args }) => html`<div>
    <b2b-table size="${args.size}">
      <b2b-table-rowgroup type="header" accordion>
        <b2b-table-row>
          ${args.data.columns.map((columnName, index) => {
            return html` <b2b-table-header
              ?divider=${args.withDividers &&
              index !== args.data.columns.length - 1}
              style=${index === 0 ? `width: ${args.firstColumnWidth}` : ''}
              >${columnName}</b2b-table-header
            >`;
          })}
        </b2b-table-row>
      </b2b-table-rowgroup>
      <b2b-table-rowgroup type="body" accordion>
        ${args.data.rows.map((row, index) => {
          return html`<b2b-table-row
            highlight="${args.highlight}"
            color=${index === 0 ? args.color : 'default'}>
            ${row.map(
              data =>
                html`<b2b-table-cell
                  ?divider=${args.withDividers}
                  align="${args.align}"
                  text-wrap="${args.textWrap}"
                  >${data}</b2b-table-cell
                >`,
            )}
            <b2b-table-cell
              ><b2b-button size="50">Action</b2b-button></b2b-table-cell
            >
          </b2b-table-row>`;
        })}
      </b2b-table-rowgroup>
      <b2b-table-rowgroup type="body" accordion opened>
        ${args.data.rows.map((row, index) => {
          return html`<b2b-table-row
            highlight="${args.highlight}"
            color=${index === 0 ? args.color : 'default'}>
            ${row.map(
              data =>
                html`<b2b-table-cell
                  ?divider=${args.withDividers}
                  align="${args.align}"
                  text-wrap="${args.textWrap}"
                  >${data}</b2b-table-cell
                >`,
            )}
            <b2b-table-cell
              ><b2b-button size="50">Action</b2b-button></b2b-table-cell
            >
          </b2b-table-row>`;
        })}
      </b2b-table-rowgroup>
    </b2b-table>
  </div>`,
};

export const Selectable: Story = {
  args: {
    ...meta.args,
  },
  render: ({ ...args }) => html`<div>
    <b2b-table size="${args.size}">
      <b2b-table-rowgroup type="header" accordion selectable>
        <b2b-table-row>
          ${args.data.columns.map((columnName, index) => {
            return html` <b2b-table-header
              ?divider=${args.withDividers &&
              index !== args.data.columns.length - 1}
              style=${index === 0 ? `width: ${args.firstColumnWidth}` : ''}
              >${columnName}</b2b-table-header
            >`;
          })}
        </b2b-table-row>
      </b2b-table-rowgroup>
      <b2b-table-rowgroup type="body" accordion selectable>
        ${args.data.rows.map((row, index) => {
          return html`<b2b-table-row
            highlight="${args.highlight}"
            color=${index === 0 ? args.color : 'default'}>
            ${row.map(
              data =>
                html`<b2b-table-cell
                  ?divider=${args.withDividers}
                  align="${args.align}"
                  text-wrap="${args.textWrap}"
                  >${data}</b2b-table-cell
                >`,
            )}
            <b2b-table-cell
              ><b2b-button size="50">Action</b2b-button></b2b-table-cell
            >
          </b2b-table-row>`;
        })}
      </b2b-table-rowgroup>
      <b2b-table-rowgroup type="body" accordion opened selectable>
        ${args.data.rows.map((row, index) => {
          return html`<b2b-table-row
            highlight="${args.highlight}"
            color=${index === 0 ? args.color : 'default'}>
            ${row.map(
              data =>
                html`<b2b-table-cell
                  ?divider=${args.withDividers}
                  align="${args.align}"
                  text-wrap="${args.textWrap}"
                  >${data}</b2b-table-cell
                >`,
            )}
            <b2b-table-cell
              ><b2b-button size="50">Action</b2b-button></b2b-table-cell
            >
          </b2b-table-row>`;
        })}
      </b2b-table-rowgroup>
    </b2b-table>
  </div>`,
};
