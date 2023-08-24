import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const meta: Meta = {
  title: 'Components/Interaction/Button',
  component: 'b2b-button',
  args: {
    variant: 'secondary',
    type: 'button',
    size: '100',
    disabled: false,
    loading: false,
    active: false,
    target: 'self',
    label: 'B2B Button',
  },
  argTypes: getArgTypes('b2b-button'),
  render: ({ ...args }) => html`<b2b-button
    variant="${args.variant}"
    size="${args.size}"
    disabled="${args.disabled}"
    loading="${args.loading}"
    type="${args.type}">
    ${args.label}
  </b2b-button>`,
};
export default meta;

type Story = StoryObj;

export const Secondary: Story = {
  args: {
    ...meta.args,
    label: 'Secondary',
  },
};

export const Primary: Story = {
  args: {
    ...meta.args,
    variant: 'primary',
    label: 'Primary',
  },
};

export const Loading: Story = {
  args: {
    ...meta.args,
    loading: true,
    label: 'Loading',
  },
};

export const IconStart: Story = {
  args: {
    ...meta.args,
    label: 'Icon Start',
  },
  render: ({ ...args }) => html`<b2b-button
    variant="${args.variant}"
    size="${args.size}"
    disabled="${args.disabled}"
    loading="${args.loading}"
    type="${args.type}">
    <b2b-icon slot="start" icon="b2b_icon-check" size="100"></b2b-icon>
    ${args.label}
  </b2b-button>`,
};

export const IconEnd: Story = {
  args: {
    ...meta.args,
    label: 'Icon End',
  },
  render: ({ ...args }) => html`<b2b-button
    variant="${args.variant}"
    size="${args.size}"
    disabled="${args.disabled}"
    loading="${args.loading}"
    type="${args.type}">
    ${args.label}
    <b2b-icon slot="end" icon="b2b_icon-check" size="100"></b2b-icon>
  </b2b-button>`,
};

export const PaliIcon: Story = {
  args: {
    ...meta.args,
    label: 'Icon from PaLi',
  },
  render: ({ ...args }) => html`<b2b-button
    variant="${args.variant}"
    size="${args.size}"
    disabled="${args.disabled}"
    loading="${args.loading}"
    type="${args.type}">
    <i slot="start" class="obc_icon-info"></i>
    ${args.label}
  </b2b-button>`,
};

export const IconOnly: Story = {
  args: {
    ...meta.args,
  },
  render: ({ ...args }) => html`<b2b-button
    variant="${args.variant}"
    size="${args.size}"
    disabled="${args.disabled}"
    loading="${args.loading}"
    type="${args.type}">
    <b2b-icon slot="end" icon="b2b_icon-search" size="100"></b2b-icon>
  </b2b-button>`,
};

export const Disabled: Story = {
  args: {
    ...meta.args,
    disabled: true,
    label: 'Disabled',
  },
};

export const Anchor: Story = {
  args: {
    ...meta.args,
  },
  render: ({ ...args }) => html`<b2b-button
    variant="${args.variant}"
    size="${args.size}"
    disabled="${args.disabled}"
    loading="${args.loading}"
    href="www.otto.de"
    target="blank"
    type="${args.type}">
    Go to otto.de
  </b2b-button>`,
};
