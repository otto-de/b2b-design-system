import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const meta: Meta = {
  title: 'Components/Interaction/Toggle Chip',
  component: 'b2b-toggle-chip',
  args: {
    label: 'B2B Design System',
    name: 'Toggle Chip',
    active: false,
    disabled: false,
  },
  argTypes: getArgTypes('b2b-toggle-chip'),
  render: ({ ...args }) => html` <b2b-toggle-chip
      label="${args.label}"
      name="${args.name}"
      active="${args.active}""
      disabled="${args.disabled}">
    </b2b-toggle-chip>`,
};

export default meta;

type Story = StoryObj;

export const story010Default: Story = {
  name: 'Default Toggle Chip',
  args: {
    ...meta.args,
  },
};

export const story020Disabled: Story = {
  name: 'Toggle Chip Disabled',
  args: {
    ...meta.args,
    disabled: true,
  },
};

export const story030Active: Story = {
  name: 'Toggle Chip Active',
  args: {
    ...meta.args,
    active: true,
  },
};

export const story040ActiveDisabled: Story = {
  name: 'Toggle Chip Active Disabled',
  args: {
    ...meta.args,
    active: true,
    disabled: true,
  },
};
