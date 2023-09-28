import { Meta, Story } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';

const Template: Story = ({
  label,
  required,
  name,
  disabled,
  invalid,
  alignment,
  hint,
  error,
}) => {
  return html` <b2b-radio-group
    label="${label}"
    required="${required}"
    name="${name}"
    disabled="${disabled}"
    invalid="${invalid}"
    alignment="${alignment}"
    hint="${hint}"
    error="${error}">
    <b2b-radio-button
      label="Option 1"
      name="${name}"
      value="one"></b2b-radio-button>
    <b2b-radio-button
      label="Option 2"
      name="${name}"
      value="two"></b2b-radio-button>
  </b2b-radio-group>`;
};

const defaultArgs = {
  label: 'Radio Button Group Label',
  required: false,
  disabled: false,
  invalid: false,
  name: 'default-group',
  alignment: 'vertical',
  hint: '',
  error: '',
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs };
story010Default.storyName = 'Default';

export const story020Hint = Template.bind({});
story020Hint.args = { ...defaultArgs, hint: 'This is a group hint' };
story020Hint.storyName = 'Hint';

export const story030Error = Template.bind({});
story030Error.args = {
  ...defaultArgs,
  invalid: true,
  error: 'This is a group error',
};
story030Error.storyName = 'Error';

export const story040Disabled = Template.bind({});
story040Disabled.args = { ...defaultArgs, disabled: true };
story040Disabled.storyName = 'Disabled';

export const story050Horizontal = Template.bind({});
story050Horizontal.args = { ...defaultArgs, alignment: 'horizontal' };
story050Horizontal.storyName = 'Horizontal';

export const story060Required = Template.bind({});
story060Required.args = { ...defaultArgs, required: true };
story060Required.storyName = 'Required';

const controls = {};
const radioGroupArgs = getArgTypes('b2b-radio-group', controls);

export default {
  title: 'Components/Form/Radio Group',
  argTypes: radioGroupArgs,
  viewMode: 'docs',
} as Meta;
