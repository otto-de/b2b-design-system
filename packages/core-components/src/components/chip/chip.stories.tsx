import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Interaction/Chip',
  component: 'b2b-chip-component',
  args: {
    label: 'Chip Label',
    type: undefined,
    labelStyle: undefined,
    disabled: false,
    value: '',
    hasCloseButton: true,
    customMargin: '',
  },
  argTypes: getArgTypes('b2b-chip-component'),
  render: ({ ...args }) =>
    html`<b2b-chip-component
      custom-margin="${args.customMargin}"
      label="${args.label}"
      type="${args.type}"
      label-style="${args.labelStyle}"
      disabled="${args.disabled}"
      value="${args.value}"
      has-close-button="${args.hasCloseButton}" />`,
};

export default meta;

export const story010Default: Story = {
  name: 'Default',
  args: {
    ...meta.args,
    label: 'Default Chip',
  },
};

export const story020Disabled: Story = {
  name: 'Disabled',
  args: {
    ...meta.args,
    label: 'Disabled Chip',
    disabled: true,
  },
};

export const story030WithoutButton: Story = {
  name: 'Without Button',
  args: {
    ...meta.args,
    label: 'Chip without button',
    hasCloseButton: false,
  },
};

export const story040WithTruncatedText: Story = {
  name: 'Truncated Label',
  args: {
    ...meta.args,
    label: 'Chip with truncated label',
  },
  render: ({ ...args }) =>
    html`<div
      style="width: 170px; border: 1px solid grey; border-radius: 3px; padding: 6px;">
      <b2b-chip-component
        label="${args.label}"
        type="${args.type}"
        label-style="${args.labelStyle}"
        disabled="${args.disabled}"
        value="${args.value}"
        has-close-button="${args.hasCloseButton}" />
    </div>`,
};

export const story050SuccessChip: Story = {
  name: 'Success Chip',
  args: {
    ...meta.args,
    type: 'success',
    label: 'Chip with success type',
  },
};

export const story051InfoChip: Story = {
  name: 'Info Chip',
  args: {
    ...meta.args,
    type: 'info',
    label: 'Chip with info type',
  },
};

export const story052WarningChip: Story = {
  name: 'Warning Chip',
  args: {
    ...meta.args,
    type: 'warn',
    label: 'Chip with warning type',
  },
};

export const story053ErrorChip: Story = {
  name: 'Error Chip',
  args: {
    ...meta.args,
    type: 'error',
    label: 'Chip with error type',
  },
};

export const story061ItalicLabel: Story = {
  name: 'Italic Label',
  args: {
    ...meta.args,
    labelStyle: 'italic',
    label: 'Chip with italic style',
  },
};

export const story063StrikethroughLabel: Story = {
  name: 'Strikethrough Label',
  args: {
    ...meta.args,
    labelStyle: 'strikethrough',
    label: 'Chip with strikethrough style',
  },
};

export const story070CustomMargin: Story = {
  name: 'Custom Margin',
  args: {
    ...meta.args,
    label: 'Chip with Custom Margin',
    customMargin: '12px',
  },
};

export const story071NoMargin: Story = {
  name: 'No Margin',
  args: {
    ...meta.args,
    label: 'Chip with No Margin',
    customMargin: '0px',
  },
};
