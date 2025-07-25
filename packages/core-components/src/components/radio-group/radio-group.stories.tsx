import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';

const Template: StoryFn = ({
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

export const story070LabelSlot: StoryObj = {
  args: {
    ...defaultArgs,
  },
  render: ({}) =>
    html`<b2b-radio-group name="default-group">
      <span slot="label">Label Slot</span>
      <b2b-radio-button
        label="Option 1"
        name="default-group"
        value="one"></b2b-radio-button>
      <b2b-radio-button
        label="Option 2"
        name="default-group"
        value="two"></b2b-radio-button>
    </b2b-radio-group>`,
};
story070LabelSlot.storyName = 'Label slot';

export const story080IndividualDisabled: StoryObj = {
  args: {
    ...defaultArgs,
  },
  render: ({}) =>
    html`<b2b-radio-group
      name="individual-disabled-group"
      label="Group Enabled with Individual Disabled Radio">
      <b2b-radio-button
        label="Option 1 (Enabled)"
        name="individual-disabled-group"
        value="one"></b2b-radio-button>
      <b2b-radio-button
        label="Option 2 (Disabled)"
        name="individual-disabled-group"
        value="two"
        disabled="true"></b2b-radio-button>
      <b2b-radio-button
        label="Option 3 (Enabled)"
        name="individual-disabled-group"
        value="three"></b2b-radio-button>
    </b2b-radio-group>`,
};
story080IndividualDisabled.storyName = 'Individual Radio Disabled';

const controls = {};
const radioGroupArgs = getArgTypes('b2b-radio-group', controls);

export default {
  title: 'Components/Form/Radio Group',
  argTypes: radioGroupArgs,
  viewMode: 'docs',
} as Meta;
