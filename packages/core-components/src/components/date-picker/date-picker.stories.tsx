import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';
import { userEvent } from '@storybook/test';

const meta: Meta = {
  title: 'Components/Form/Date Picker',
  component: 'b2b-date-picker',
  args: {
    required: false,
    disabled: false,
    disablePastDates: false,
    disableFutureDates: false,
    disableWeekends: false,
    disableDates: [],
    label: 'Zeitraum auswählen',
    preSelectedDate: '',
    showHint: true,
    disableDays: [],
    disableDatesUntil: '',
    disableDatesFrom: '',
    hint: 'Format: TT.MM.JJJJ',
    placeholder: '',
    width: 600,
    language: 'de',
  },
  argTypes: {
    ...getArgTypes('b2b-date-picker'),
    preSelectedDate: { control: false },
    width: { control: { type: 'range', min: 300, max: 600, step: 1 } },
  },
  render: ({ ...args }) => {
    if (args.preSelectedDate === '') {
      return html` <div style="margin-left: 2px">
        <b2b-date-picker
          label=${args.label}
          required=${args.required}
          disabled=${args.disabled}
          disable-past-dates=${args.disablePastDates}
          disable-future-dates=${args.disableFutureDates}
          disable-weekends=${args.disableWeekends}
          disable-dates=${args.disableDates}
          .pre-selected-date=${args.preSelectedDate}
          disable-days=${args.disableDays}
          disable-dates-until=${args.disableDatesUntil}
          disable-dates-from=${args.disableDatesFrom}
          show-hint=${args.showHint}
          hint=${args.hint}
          placeholder=${args.placeholder}
          width=${args.width}
          language=${args.language}></b2b-date-picker>
      </div>`;
    } else {
      return html` <div style="margin-left: 2px">
        <b2b-date-picker
          label=${args.label}
          required=${args.required}
          disabled=${args.disabled}
          disable-past-dates=${args.disablePastDates}
          disable-future-dates=${args.disableFutureDates}
          disable-weekends=${args.disableWeekends}
          disable-dates=${args.disableDates}
          pre-selected-date=${args.preSelectedDate}
          disable-days=${args.disableDays}
          disable-dates-until=${args.disableDatesUntil}
          disable-dates-from=${args.disableDatesFrom}
          show-hint=${args.showHint}
          hint=${args.hint}
          placeholder=${args.placeholder}
          width=${args.width}
          language=${args.language}></b2b-date-picker>
      </div>`;
    }
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: { ...meta.args, preSelectedDate: '01.01.2025' },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const wrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-focus-wrapper',
      ) as HTMLElement;
      const days = datePicker.shadowRoot?.querySelector(
        'b2b-date-picker-days',
      ) as HTMLElement;
      const day = days.shadowRoot?.querySelector(
        '.b2b-date-picker-day--selected',
      ) as HTMLElement;

      await userEvent.click(wrapper);

      setTimeout(async () => {
        day.focus();
        await userEvent.keyboard('{arrowright}{arrowright}');
      }, 500);
    }, 500);
  },
};

export const Disabled: Story = {
  args: { ...meta.args, disabled: true },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-focus-wrapper',
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
        '.b2b-date-picker-input-focus-wrapper',
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
        '.b2b-date-picker-input-focus-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};

export const DisableWeekends: Story = {
  args: { ...meta.args, disableWeekends: true, preSelectedDate: '01.01.2025' },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-focus-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};

export const DisableDates: Story = {
  args: {
    ...meta.args,
    preSelectedDate: '01.01.2025',
    disableDates: '["10.01.2025", "21.01.2025"]',
  },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-focus-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};

export const DisableDays: Story = {
  args: {
    ...meta.args,
    preSelectedDate: '01.01.2025',
    disableDays: '["Mo", "Tu"]',
  },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-focus-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};

export const DisableDatesUntil: Story = {
  args: {
    ...meta.args,
    preSelectedDate: '15.02.2025',
    disableDatesUntil: '10.02.2025',
  },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-focus-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};

export const DisableDatesFrom: Story = {
  args: {
    ...meta.args,
    preSelectedDate: '01.01.2025',
    disableDatesFrom: '10.01.2025',
  },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-focus-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};

export const WithCustomHintMessage: Story = {
  args: {
    ...meta.args,
    showHint: true,
    hint: 'This is a long hint text message which is longer than the normal default hint message',
  },
};

export const WithPlaceholder: Story = {
  args: {
    ...meta.args,
    preSelectedDate: '01.01.2025',
    placeholder: 'this is date picker',
  },
};

export const WithWidth: Story = {
  args: {
    ...meta.args,
    width: 500,
    preSelectedDate: '01.01.2025',
  },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-focus-wrapper',
      );
      await userEvent.click(b2bDatePickerInputWrapper);
    }, 500);
  },
};

export const EnglishDatepicker: Story = {
  args: {
    ...meta.args,
    language: 'en',
    preSelectedDate: '01.01.2025',
  },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-picker');
      const b2bDatePickerInputWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-focus-wrapper',
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
