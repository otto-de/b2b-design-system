import { Meta, StoryObj } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Components/Status & Feedback/Progress Bar',
  component: 'b2b-progress-bar',
  args: {
    progress: 50,
    label: '',
    labelType: 'below',
    labelPosition: 'left',
  },
  argTypes: getArgTypes('b2b-progress-bar'),
  render: ({ ...args }) =>
    html`<b2b-progress-bar
      progress="${args.progress}"
      label="${args.label}"
      label-type="${args.labelType}"
      label-position="${args.labelPosition}" />`,
};

export default meta;

type Story = StoryObj;

export const story010Default: Story = {
  name: 'Default',
  args: {
    ...meta.args,
  },
};

export const story020LabelOnBottomLeft: Story = {
  name: 'Label on Bottom Left',
  args: {
    ...meta.args,
    progress: 70,
    label: 'Label on Bottom Left',
  },
};

export const story030LabelOnBottomRight: Story = {
  name: 'Label on Bottom Right',
  args: {
    ...meta.args,
    progress: 70,
    labelPosition: 'right',
    label: 'Label on Bottom Right',
  },
};

export const story040LabelOnLeftSide: Story = {
  name: 'Label on Left Side',
  args: {
    ...meta.args,
    progress: 90,
    labelType: 'side',
    label: 'Label on Left Side',
  },
};

export const story050LabelOnRightSide: Story = {
  name: 'Label on Right Side',
  args: {
    ...meta.args,
    progress: 90,
    labelType: 'side',
    labelPosition: 'right',
    label: 'Label on Right Side',
  },
};
