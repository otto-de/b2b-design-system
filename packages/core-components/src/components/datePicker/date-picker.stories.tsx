import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';
import { userEvent } from '@storybook/testing-library';

const meta: Meta = {
  title: 'Components/Form/DatePicker',
  component: 'b2b-date-picker',
  args: {
    disablePastDates: false,
    disableFutureDates: false,
    disableWeekends: false,
    label: 'Zeitraum auswählen',
    defaultDate: {
      control: 'string',
    },
  },
  argTypes: getArgTypes('b2b-date-picker'),
  render: ({ ...args }) => html` <div style="margin-left: 100px">
    <b2b-date-picker
      label=${args.label}
      disable-past-dates=${args.disablePastDates}
      disable-future-dates=${args.disableFutureDates}
      disable-weekends=${args.disableWeekends}>
      default-date=${args.defaultDate}
    </b2b-date-picker>
  </div>`,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: { ...meta.args },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};

export const DisablePastDates: Story = {
  args: { ...meta.args, disablePastDates: true },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};

export const DisableFutureDates: Story = {
  args: { ...meta.args, disableFutureDates: true },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};

export const DisableWeekends: Story = {
  args: { ...meta.args, disableWeekends: true },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};

export const DefaultDate: Story = {
  args: { ...meta.args, default: '26.11.1996' }, // Pass defaultDate as a string
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};
