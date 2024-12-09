import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';
import { userEvent } from '@storybook/testing-library';

const meta: Meta = {
  title: 'Components/Form/Date Picker',
  component: 'b2b-date-picker',
  args: {
    disablePastDates: false,
    disableFutureDates: false,
    disableWeekends: false,
    label: 'Zeitraum auswählen',
    preSelectedDate: '',
    showHint: true,
  },
  argTypes: {
    ...getArgTypes('b2b-date-picker'),
    preSelectedDate: { control: false },
  },
  render: ({ ...args }) => {
    if (args.preSelectedDate === '') {
      return html` <div style="margin-left: 2px">
        <b2b-date-picker
          label=${args.label}
          disable-past-dates=${args.disablePastDates}
          disable-future-dates=${args.disableFutureDates}
          disable-weekends=${args.disableWeekends}
          .pre-selected-date="${args.preSelectedDate}"
          show-hint=${args.showHint}></b2b-date-picker>
      </div>`;
    } else {
      return html` <div style="margin-left: 2px">
        <b2b-date-picker
          label=${args.label}
          disable-past-dates=${args.disablePastDates}
          disable-future-dates=${args.disableFutureDates}
          disable-weekends=${args.disableWeekends}
          pre-selected-date="${args.preSelectedDate}"
          show-hint=${args.showHint}></b2b-date-picker>
      </div>`;
    }
  },
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

export const preSelectedDate: Story = {
  args: { ...meta.args, preSelectedDate: '26.11.1996' },
};

export const WithoutHintMessage: Story = {
  args: { ...meta.args, showHint: false },
};
