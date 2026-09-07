import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { ifDefined } from 'lit/directives/if-defined.js';
import { getArgTypes } from '../../docs/config/utils';

type Story = StoryObj;

const chipArgTypes = getArgTypes('b2b-chip-component');
const defaultOption = 'Default';

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
    maxWidth: '',
  },
  argTypes: {
    ...chipArgTypes,
    type: {
      ...chipArgTypes.type,
      control: { type: 'radio' },
      options: [defaultOption, 'success', 'info', 'warn', 'error'],
      mapping: {
        [defaultOption]: undefined,
        success: 'success',
        info: 'info',
        warn: 'warn',
        error: 'error',
      },
    },
    labelStyle: {
      ...chipArgTypes.labelStyle,
      control: { type: 'radio' },
      options: [defaultOption, 'italic', 'strikethrough'],
      mapping: {
        [defaultOption]: undefined,
        italic: 'italic',
        strikethrough: 'strikethrough',
      },
    },
  },
  render: ({ ...args }) =>
    html`<b2b-chip-component
      custom-margin=${args.customMargin}
      label=${args.label}
      type=${ifDefined(args.type)}
      label-style=${ifDefined(args.labelStyle)}
      disabled=${args.disabled}
      value=${args.value}
      max-width=${args.maxWidth}
      has-close-button=${args.hasCloseButton} />`,
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

export const story041MaxWidth: Story = {
  name: 'Max Width',
  args: {
    ...meta.args,
    label: 'Chip with a long label constrained by max width',
    maxWidth: '140px',
  },
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
