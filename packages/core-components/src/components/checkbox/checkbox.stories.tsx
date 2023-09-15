import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({
  label,
  required,
  checked,
  disabled,
  hint,
  error,
  name,
  value,
  invalid,
}) => {
  return html`<b2b-checkbox
    label="${label}"
    required="${required}"
    checked="${checked}"
    disabled="${disabled}"
    hint="${hint}"
    error="${error}"
    name="${name}"
    value="${value}"
    invalid="${invalid}"></b2b-checkbox>`;
};

const defaultArgs = {
  label: 'Checkbox Label',
  required: false,
  checked: false,
  disabled: false,
  hint: '',
  error: '',
  name: '',
  value: '',
  invalid: false,
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs, label: 'Default Checkbox' };
story010Default.storyName = 'Default';

export const story020Checked = Template.bind({});
story020Checked.args = {
  ...defaultArgs,
  label: 'Checkbox that is checked',
  checked: true,
};
story020Checked.storyName = 'Checked';

export const story030Hint = Template.bind({});
story030Hint.args = {
  ...defaultArgs,
  label: 'Checkbox with a hint',
  hint: 'This is a hint',
};
story030Hint.storyName = 'Hint';

export const story040Error = Template.bind({});
story040Error.args = {
  ...defaultArgs,
  label: 'Checkbox with an error',
  invalid: true,
  error: 'This is an error',
};
story040Error.storyName = 'Error';

export const story050Disabled = Template.bind({});
story050Disabled.args = {
  ...defaultArgs,
  label: 'Checkbox that is disabled',
  disabled: true,
};
story050Disabled.storyName = 'Disabled';

export const story060Required = Template.bind({});
story060Required.args = {
  ...defaultArgs,
  label: 'Required checkbox',
  required: true,
};
story060Required.storyName = 'Required';

const controls = {};
const inputCheckboxArgs = getArgTypes('b2b-checkbox', controls);

export default {
  title: 'Components/Form/Checkbox',
  argTypes: inputCheckboxArgs,
  viewMode: 'docs',
} as Meta;
