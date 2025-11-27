import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const button: Meta = {
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
    width: 'fit-content',
  },
  argTypes: getArgTypes('b2b-button'),
  render: ({ ...args }) =>
    html`<b2b-button
      variant=${args.variant}
      size=${args.size}
      disabled=${args.disabled}
      loading=${args.loading}
      type=${args.type}>
      ${args.label}
    </b2b-button>`,
};
export default button;

type Story = StoryObj;

export const Primary: Story = {
  args: {
    ...button.args,
    variant: 'primary',
    label: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    ...button.args,
    label: 'Secondary',
  },
};

export const Loading: Story = {
  args: {
    ...button.args,
    loading: true,
    label: 'Loading',
  },
};

export const IconStart: Story = {
  args: {
    ...button.args,
    label: 'Icon Start',
  },
  render: ({ ...args }) =>
    html`<b2b-button
      variant=${args.variant}
      size=${args.size}
      disabled=${args.disabled}
      loading=${args.loading}
      type=${args.type}>
      <b2b-icon-100 slot="start" icon="b2b_icon-check"></b2b-icon-100>
      ${args.label}
    </b2b-button>`,
};

export const IconEnd: Story = {
  args: {
    ...button.args,
    label: 'Icon End',
  },
  render: ({ ...args }) =>
    html`<b2b-button
      variant=${args.variant}
      size=${args.size}
      disabled=${args.disabled}
      loading=${args.loading}
      type=${args.type}>
      ${args.label}
      <b2b-icon-100 slot="end" icon="b2b_icon-check"></b2b-icon-100>
    </b2b-button>`,
};

export const PaliIcon: Story = {
  args: {
    ...button.args,
    label: 'Icon from PaLi',
  },
  render: ({ ...args }) =>
    html`<b2b-button
      variant=${args.variant}
      size=${args.size}
      disabled=${args.disabled}
      loading=${args.loading}
      type=${args.type}>
      <i slot="start" class="obc_icon-info"></i>
      ${args.label}
    </b2b-button>`,
};

export const IconOnly: Story = {
  args: {
    ...button.args,
  },
  render: ({ ...args }) =>
    html`<b2b-button
      variant=${args.variant}
      size=${args.size}
      disabled=${args.disabled}
      loading=${args.loading}
      type=${args.type}>
      <b2b-icon-100 slot="end" icon="b2b_icon-search"></b2b-icon-100>
    </b2b-button>`,
};

export const Disabled: Story = {
  args: {
    ...button.args,
    disabled: true,
    label: 'Disabled',
  },
};

export const Anchor: Story = {
  args: {
    ...button.args,
  },
  render: ({ ...args }) =>
    html`<b2b-button
      variant=${args.variant}
      size=${args.size}
      disabled=${args.disabled}
      loading=${args.loading}
      href="www.otto.de"
      target="blank"
      type=${args.type}>
      Go to otto.de
    </b2b-button>`,
};

export const DisabledAnchor: Story = {
  args: {
    ...button.args,
    disabled: true,
  },
  render: ({ ...args }) =>
    html`<b2b-button
      variant=${args.variant}
      size=${args.size}
      disabled=${args.disabled}
      loading=${args.loading}
      href="www.otto.de"
      target="blank"
      type=${args.type}>
      Go to otto.de
    </b2b-button>`,
};

export const CustomWidth: Story = {
  args: {
    ...button.args,
    width: 'custom',
  },
  render: ({ ...args }) =>
    html` <b2b-button
      class="docs-button-obc-overwrite"
      style="width: 300px"
      variant=${args.variant}
      size=${args.size}
      width=${args.width}
      disabled=${args.disabled}
      loading=${args.loading}
      type=${args.type}>
      300px custom width
    </b2b-button>`,
};
