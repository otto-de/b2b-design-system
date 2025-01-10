import { Meta, Story, StoryObj } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';

const Template: Story = ({
  label,
  required,
  name,
  checked,
  disabled,
  invalid,
  value,
  hint,
  error,
}) => {
  return html` <b2b-radio-button
    label="${label}"
    required="${required}"
    name="${name}"
    checked="${checked}"
    value="${value}"
    invalid="${invalid}"
    disabled="${disabled}"
    hint="${hint}"
    error="${error}"></b2b-radio-button>`;
};

const defaultArgs = {
  label: 'Single Radio Button Label',
  required: false,
  checked: false,
  disabled: false,
  invalid: false,
  value: 'default value',
  name: 'default-group',
  hint: '',
  error: '',
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs, label: 'Default Radio Button' };
story010Default.storyName = 'Default';

export const story020Hint = Template.bind({});
story020Hint.args = {
  ...defaultArgs,
  label: 'Radio Button with a hint',
  hint: 'This is a hint',
};
story020Hint.storyName = 'Hint';

export const story030Error = Template.bind({});
story030Error.args = {
  ...defaultArgs,
  label: 'Radio Button with an error',
  invalid: true,
  error: 'This is an error',
};
story030Error.storyName = 'Error';

export const story040Disabled = Template.bind({});
story040Disabled.args = {
  ...defaultArgs,
  label: 'Radio Button that is disabled',
  disabled: true,
};
story040Disabled.storyName = 'Disabled';

export const story050Required = Template.bind({});
story050Required.args = {
  ...defaultArgs,
  label: 'Required Radio Button',
  required: true,
};
story050Required.storyName = 'Required';

export const story060LabelSlot: StoryObj = {
  args: {
    ...defaultArgs,
  },
  render: ({}) =>
    html`<b2b-radio-button name="default-group"
      ><span slot="label">Label Slot</span></b2b-radio-button
    >`,
};
story060LabelSlot.storyName = 'Label slot';

const controls = {};
const radioButtonArgs = getArgTypes('b2b-radio-button', controls);

export default {
  title: 'Components/Form/Radio Button',
  argTypes: radioButtonArgs,
  viewmode: 'docs',
} as Meta;
