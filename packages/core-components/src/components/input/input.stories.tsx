import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const meta: Meta = {
  title: 'Components/Form/Input',
  component: 'b2b-input',
  args: {
    label: 'Label',
    required: false,
    type: 'text',
    disabled: false,
    placeholder: '',
    value: '',
    hint: '',
    error: '',
    autofocus: false,
    invalid: false,
    inputTextAlign: 'left',
  },
  argTypes: getArgTypes('b2b-input'),
  render: ({ ...args }) =>
    html`<div style="width: 400px;">
      <b2b-input
        label="${args.label}"
        required="${args.required}"
        type="${args.defaultType}"
        disabled="${args.disabled}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        hint="${args.hint}"
        error="${args.error}"
        autofocus="${args.autofocus}"
        invalid=${args.invalid}
        input-text-align="${args.inputTextAlign}"></b2b-input>
    </div>`,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    ...meta.args,
    label: 'Default Input',
  },
};

export const Placeholder: Story = {
  args: {
    ...meta.args,
    label: 'Input with Placeholder',
    placeholder: 'This is a placeholder',
  },
};

export const Disabled: Story = {
  args: {
    ...meta.args,
    label: 'Disabled Input',
    disabled: true,
  },
};

export const Hint: Story = {
  args: {
    ...meta.args,
    label: 'Input with hint',
    hint: 'This is a hint',
  },
};

export const Error: Story = {
  args: {
    ...meta.args,
    label: 'Input with an error',
    error: 'This is an error',
    invalid: true,
  },
};

export const Required: Story = {
  args: {
    ...meta.args,
    label: 'Required input',
    required: true,
  },
};

export const Prefix: Story = {
  args: {
    ...meta.args,
    label: 'Label',
  },
  render: ({ ...args }) =>
    html`<div style="width: 400px;">
      <b2b-input
        label="${args.label}"
        required="${args.required}"
        type="${args.type}"
        disabled="${args.disabled}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        hint="${args.hint}"
        error="${args.error}"
        autofocus="${args.autofocus}"
        invalid=${args.invalid}
        ><span slot="start">Registration Number</span></b2b-input
      >
    </div>`,
};

export const Suffix: Story = {
  args: {
    ...meta.args,
    label: 'Label',
  },
  render: ({ ...args }) => html`<div style="width: 400px;">
    <b2b-input
      label="${args.label}"
      required="${args.required}"
      type="${args.type}"
      disabled="${args.disabled}"
      placeholder="${args.placeholder}"
      value="${args.value}"
      hint="${args.hint}"
      error="${args.error}"
      autofocus="${args.autofocus}"
      invalid=${args.invalid}
      ><b2b-icon-100 icon="b2b_icon-search" slot="end"></b2b-icon-100
    >
  </div>`,
};

export const PrefixAndSuffix: Story = {
  args: {
    ...meta.args,
    label: 'Label',
  },
  render: ({ ...args }) =>
    html`<div style="width: 400px;">
      <b2b-input
        label="${args.label}"
        required="${args.required}"
        type="${args.type}"
        disabled="${args.disabled}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        hint="${args.hint}"
        error="${args.error}"
        autofocus="${args.autofocus}"
        invalid=${args.invalid}>
        <b2b-icon-100 icon="b2b_icon-search" slot="start"></b2b-icon-100
        ><span slot="end">Registration Number</span></b2b-input
      >
    </div>`,
};

export const Label: Story = {
  args: {
    ...meta.args,
  },
  render: ({ ...args }) =>
    html`<div style="width: 400px;">
      <b2b-input
        required="${args.required}"
        type="${args.type}"
        disabled="${args.disabled}"
        placeholder="${args.placeholder}"
        value="${args.value}"
        hint="${args.hint}"
        error="${args.error}"
        autofocus="${args.autofocus}"
        invalid=${args.invalid}
        ><span slot="label">Custom label</span></b2b-input
      >
    </div>`,
};

export const AllPropertiesSpecified: Story = {
  args: {
    ...meta.args,
    label: 'Input with all arguments',
    required: true,
    placeholder: 'All arguments placeholder',
    value: 'an initial value',
    hint: 'This is a hint for an every argument specified input',
    error: 'This is an error so you will not see the hint',
    disabled: false,
    autofocus: false,
  },
};

export const RightAligned: Story = {
  args: {
    ...meta.args,
    value: 'RightAligned Input',
    inputTextAlign: 'right',
  },
};
export const CenterAligned: Story = {
  args: {
    ...meta.args,
    value: 'CenterAligned Input',
    inputTextAlign: 'center',
  },
};
