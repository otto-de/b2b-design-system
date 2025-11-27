import { Meta, StoryFn } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';

const Template: StoryFn = ({ totalPages, activePage }) => {
  return html`<b2b-pagination
    total-pages="${totalPages}"
    active-page="${activePage}"></b2b-pagination>`;
};

const defaultArgs = {
  totalPages: 10,
  activePage: 1,
};

export const story010Pagination = Template.bind({});
story010Pagination.args = { ...defaultArgs };
story010Pagination.storyName = 'First Item Selected';

export const story020PaginationMiddle = Template.bind({});
story020PaginationMiddle.args = { ...defaultArgs, activePage: 5 };
story020PaginationMiddle.storyName = 'Middle Item Selected';

export const story010PaginationLast = Template.bind({});
story010PaginationLast.args = { ...defaultArgs, activePage: 10 };
story010PaginationLast.storyName = 'Last Item Selected';

const controls = {};
const searchArgs = getArgTypes('b2b-pagination', controls);

export default {
  title: 'Components/Interaction/Pagination',
  argTypes: { ...searchArgs, optionsList: { control: false } },
  viewmode: 'docs',
  parameters: {
    controls: { expanded: true },
  },
} as Meta;
