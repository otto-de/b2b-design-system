import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
//import { getArgTypes } from '../../docs/config/utils';
import { B2BToggleChipComponent } from './toggle-chip';

const meta: Meta<B2BToggleChipComponent> = {
  title: 'Components/Interaction/Toggle Chip',
  component: 'b2b-toggle-chip',
  args: {
    label: 'B2B Design System',
    name: 'Toggle Chip',
    active: false,
    disabled: false,
  },
  argTypes: {
    label: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  render: ({ ...args }) => html` <b2b-toggle-chip
      label="${args.label}"
      name="${args.name}"
      active="${args.active}""
      disabled="${args.disabled}">
    </b2b-toggle-chip>`,
};

export default meta;

type Story = StoryObj<B2BToggleChipComponent>;

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
