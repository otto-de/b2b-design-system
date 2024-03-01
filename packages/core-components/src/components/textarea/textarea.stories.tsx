import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({
  label,
  required,
  placeholder,
  disabled,
  value,
  invalid,
  hint,
  error,
  autofocus,
  name,
  resize,
  height,
}) => {
  return html`<b2b-textarea
    label="${label}"
    required="${required}"
    placeholder="${placeholder}"
    disabled="${disabled}"
    value="${value}"
    invalid="${invalid}"
    hint="${hint}"
    error="${error}"
    autofocus="${autofocus}"
    name="${name}"
    height="${height}"
    resize="${resize}"></b2b-textarea>`;
};

const defaultArgs = {
  label: 'Textarea',
  required: false,
  disabled: false,
  placeholder: '',
  value: '',
  hint: '',
  error: '',
  autofocus: false,
  invalid: false,
  name: '',
  resize: '',
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs };
story010Default.storyName = 'Default';

export const story020Placeholder = Template.bind({});
story020Placeholder.args = { ...defaultArgs, placeholder: 'Type something' };
story020Placeholder.storyName = 'Placeholder';

export const story030Disabled = Template.bind({});
story030Disabled.args = { ...defaultArgs, disabled: true };
story030Disabled.storyName = 'Disabled';

export const story040Hint = Template.bind({});
story040Hint.args = { ...defaultArgs, hint: 'A textarea hint' };
story040Hint.storyName = 'Hint';

export const story050Error = Template.bind({});
story050Error.args = {
  ...defaultArgs,
  invalid: true,
  error: 'A textarea error',
};
story050Error.storyName = 'Error';

export const story055Required = Template.bind({});
story055Required.args = {
  ...defaultArgs,
  required: true,
};
story055Required.storyName = 'Required';

export const story060AllArgs = Template.bind({});
story060AllArgs.args = {
  ...defaultArgs,
  label: 'Textarea with all arguments',
  required: true,
  placeholder: 'All arguments placeholder',
  value: 'an initial value',
  hint: 'A textarea hint',
  error: 'A textarea error',
  name: 'textarea-example',
  disabled: false,
  autofocus: false,
};
story060AllArgs.storyName = 'All Arguments';

export const story070Height = Template.bind({});
story070Height.args = { ...defaultArgs, height: '100px' };
story070Height.storyName = 'With Height';

const textareaArgs = getArgTypes('b2b-textarea');

export default {
  title: 'Components/Form/Textarea',
  argTypes: textareaArgs,
  viewMode: 'docs',
} as Meta;
