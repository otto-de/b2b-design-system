import { Meta, StoryObj } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import { userEvent } from '@storybook/test';

const meta: Meta = {
  title: 'Components/Form/Time Picker',
  component: 'b2b-time-picker',
  args: {
    required: false,
    invalid: false,
    error: '',
    label: 'Uhrzeit auswählen',
    placeholder: 'hh:mm',
    value: '',
    interval: 15,
    hint: 'A hint',
  },
  argTypes: {
    ...getArgTypes('b2b-time-picker'),
    interval: { control: { type: 'range', min: 15, max: 60, step: 5 } },
  },
  render: ({ ...args }) => {
    return html` <div style="margin-left: 2px">
      <b2b-time-picker
        label=${args.label}
        required=${args.required}
        hint=${args.hint}
        placeholder=${args.placeholder}
        error=${args.error}
        interval=${args.interval}
        value=${args.value}
        invalid=${args.invalid}></b2b-time-picker>
    </div>`;
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: { ...meta.args, required: true },
};

export const Focused: Story = {
  args: { ...meta.args },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const timePicker = canvasElement.querySelector('b2b-time-picker');
      const b2bTimePickerWrapper = timePicker.shadowRoot?.querySelector(
        '.b2b-time-picker__wrapper',
      );
      await userEvent.click(b2bTimePickerWrapper);
    }, 500);
  },
};

export const Filled: Story = {
  args: { ...meta.args, value: '10:30' },
};

export const Error: Story = {
  args: { ...meta.args, invalid: true, error: 'This is an error message' },
};

export const FilledWithIncorrectTime: Story = {
  args: {
    ...meta.args,
    invalid: true,
    error: 'This is an error message',
    value: '25:61',
  },
};
