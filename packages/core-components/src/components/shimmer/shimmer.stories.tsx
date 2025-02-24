import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Status & Feedback/Shimmer',
  component: 'b2b-shimmer',
  args: {
    loading: true,
    width: 400,
    height: 25,
  },
  argTypes: {
    ...getArgTypes('b2b-shimmer'),
  },
  render: ({ ...args }) => html`<b2b-shimmer
    loading="${args.loading}"
    width="${args.width}"
    height="${args.height}">
    This is the mean content which takes a while to load.
  </b2b-shimmer>`,
};

export default meta;

export const story010Default: Story = {
  name: 'Default',
  args: {
    ...meta.args,
  },
};
