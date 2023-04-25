import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import inputCheckboxGroupDocs from './checkbox-group.docs.mdx';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({
  label,
  required,
  disabled,
  invalid,
  hint,
  error,
  alignment,
}) => {
  const firstLabel = 'One';
  const secondLabel = 'Two';
  return html`<b2b-checkbox-group
    label="${label}"
    required="${required}"
    disabled="${disabled}"
    invalid="${invalid}"
    hint="${hint}"
    error="${error}"
    alignment="${alignment}">
    <b2b-checkbox label="${firstLabel}"></b2b-checkbox>
    <b2b-checkbox label="${secondLabel}"></b2b-checkbox>
  </b2b-checkbox-group>`;
};

const defaultArgs = {
  label: 'Checkbox Group Label',
  required: false,
  disabled: false,
  invalid: false,
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

const checkboxGroupArgs = getArgTypes('b2b-checkbox-group', controls);

export default {
  title: 'Components/Form/Checkbox Group',
  argTypes: checkboxGroupArgs,
  viewMode: 'docs',
  parameters: {
    docs: {
      page: inputCheckboxGroupDocs,
    },
  },
} as Meta;
