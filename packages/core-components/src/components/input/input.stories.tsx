import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import inputDocs from './input.docs.mdx';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({
  label,
  required,
  type,
  disabled,
  placeholder,
  value,
  hint,
  error,
  autofocus,
  invalid,
  iconMarkup,
}) => {
  const defaultLabel = label ? label : 'Input Label';
  const defaultType = type ? type : 'text';
  return html`<div style="width: 400px;">
    <b2b-input
      label="${defaultLabel}"
      required="${required}"
      type="${defaultType}"
      disabled="${disabled}"
      placeholder="${placeholder}"
      value="${value}"
      hint="${hint}"
      error="${error}"
      autofocus="${autofocus}"
      invalid=${invalid}
      >${iconMarkup}</b2b-input
    >
  </div>`;
};

const defaultArgs = {
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
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs, label: 'Default Input' };
story010Default.storyName = 'Default';

export const story020Placeholder = Template.bind({});
story020Placeholder.args = {
  ...defaultArgs,
  label: 'Input with Placeholder',
  placeholder: 'This is a placeholder',
};
story020Placeholder.storyName = 'Placeholder';

export const story030Disabled = Template.bind({});
story030Disabled.args = {
  ...defaultArgs,
  label: 'Disabled Input',
  disabled: true,
};
story030Disabled.storyName = 'Disabled';

export const story040Hint = Template.bind({});
story040Hint.args = {
  ...defaultArgs,
  label: 'Input with hint',
  hint: 'This is a hint',
};
story040Hint.storyName = 'Hint';

export const story050Error = Template.bind({});
story050Error.args = {
  ...defaultArgs,
  label: 'Input with an error',
  error: 'This is an error',
  invalid: true,
};
story050Error.storyName = 'Error';

export const story055Required = Template.bind({});
story055Required.args = {
  ...defaultArgs,
  label: 'Required input',
  required: true,
};
story055Required.storyName = 'Required';

export const story060IconEnd = Template.bind({});
const icon = html`<b2b-icon icon="b2b_icon-search" slot="end"></b2b-icon>`;
story060IconEnd.args = { ...defaultArgs, iconMarkup: icon };
story060IconEnd.storyName = 'Input with Icon';

export const story080Prefix = Template.bind({});
const prefix = html`<span slot="start">Registration Number</span>`;
story080Prefix.args = { ...defaultArgs, iconMarkup: prefix };
story080Prefix.storyName = 'Input with Prefix';

export const story090PrefixSuffix = Template.bind({});
const suffix = html`<span slot="start">Registration Number</span
  ><b2b-icon icon="b2b_icon-search" slot="end"></b2b-icon>`;
story090PrefixSuffix.args = { ...defaultArgs, iconMarkup: suffix };
story090PrefixSuffix.storyName = 'Input with Prefix and Icon';

export const story070AllArgs = Template.bind({});
story070AllArgs.args = {
  ...defaultArgs,
  label: 'Input with all arguments',
  required: true,
  placeholder: 'All arguments placeholder',
  value: 'an initial value',
  hint: 'This is a hint for an every argument specified input',
  error: 'This is an error so you will not see the hint',
  disabled: false,
  autofocus: false,
};
story070AllArgs.storyName = 'All arguments specified';

const controls = {
  type: 'radio',
};

const inputArgs = getArgTypes('b2b-input', controls);

export default {
  title: 'Components/Form/Input',
  argTypes: {
    ...inputArgs,
    iconMarkup: {
      control: false,
    },
  },
  viewMode: 'docs',
  parameters: {
    docs: {
      page: inputDocs,
    },
  },
} as Meta;
