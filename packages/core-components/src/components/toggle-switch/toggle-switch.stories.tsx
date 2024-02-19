import { Meta, StoryObj } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Components/Interaction/Toggle Switch',
  component: 'b2b-toggle-switch',
  args: {
    label: 'Label',
    disabled: 'false',
    labelPosition: 'left',
    state: true,
  },
  argTypes: getArgTypes('b2b-toggle-switch'),
  render: ({ ...args }) => html`<b2b-toggle-switch
    label="${args.label}"
    disabled="${args.disabled}"
    label-position="${args.labelPosition}"
    state="${args.state}" />`,
};

export default meta;

type Story = StoryObj;

export const story021Default: Story = {
  name: 'Switch On',
  args: {
    ...meta.args,
  },
};

export const story022Disabled: Story = {
  name: 'Switch Off',
  args: {
    ...meta.args,
    disabled: false,
    state: false,
  },
};

export const story023Disabled: Story = {
  name: 'Switch On - Disabled',
  args: {
    ...meta.args,
    state: true,
    disabled: true,
  },
};

export const story024Disabled: Story = {
  name: 'Switch Off - Disabled',
  args: {
    ...meta.args,
    state: false,
    disabled: true,
  },
};
