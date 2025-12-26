import { userEvent } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';

function toHtmlAttribute(args: Record<string, unknown>, key: string): string {
  const value = args[key];
  if (value == null || value === '') {
    return '';
  }

  return `${key}=${JSON.stringify(value)}`;
}

const controls = {
  dateRange: false,
  presets: false,
  disableDates: 'function',
  hint: 'text',
  error: 'text',
};

export default {
  title: 'Components/Form/Date Range Picker',
  component: 'b2b-date-range-picker',
  args: {
    label: 'Zeitraum auswählen',
    required: false,
    dateRange: undefined,
    disableDates: undefined,
    presets: {},
    invalid: false,
    hint: undefined,
    error: undefined,
    language: 'de',
  },
  argTypes: {
    ...getArgTypes('b2b-date-range-picker', controls),
  },
  render: ({ ...args }) => `<div style="margin-left: 2px; width: 300px">
      <b2b-date-range-picker
        ${toHtmlAttribute(args, 'label')}
        ${toHtmlAttribute(args, 'required')}
        ${toHtmlAttribute(args, 'dateRange')}
        ${toHtmlAttribute(args, 'disableDates')}
        ${toHtmlAttribute(args, 'presets')}
        ${toHtmlAttribute(args, 'invalid')}
        ${toHtmlAttribute(args, 'hint')}
        ${toHtmlAttribute(args, 'error')}
        ${toHtmlAttribute(args, 'language')} >
      </b2b-date-range-picker>
    </div>`,
} satisfies Meta;

function findDatePicker(
  canvasElement: HTMLElement,
): HTMLB2bDateRangePickerElement {
  return canvasElement.querySelector('b2b-date-range-picker');
}

async function open(datePicker: HTMLB2bDateRangePickerElement): Promise<void> {
  const wrapper = datePicker.shadowRoot?.querySelector(
    '.b2b-date-range-picker-input-wrapper',
  );
  await userEvent.click(wrapper);
}

const LOAD_DELAY = 500;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = findDatePicker(canvasElement);
      datePicker.dateRange = [new Date(2025, 0, 1), new Date(2025, 0, 1)];
      await open(datePicker);
    }, LOAD_DELAY);
  },
};

export const AllProperties: Story = {
  args: {
    label: 'Custom Label',
    required: true,
    invalid: false,
    hint: 'Please Readme',
    error: 'Sorry, but this is a test',
  },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = findDatePicker(canvasElement);
      datePicker.dateRange = [new Date(2025, 0, 1), new Date(2025, 1, 0)];
      datePicker.disableDates = date => date.getDay() == 1;
      datePicker.presets = {
        'Today': [new Date(2025, 8, 1), new Date(2025, 8, 1)],
        'Feature Added': [new Date(2025, 8, 1), new Date(2025, 8, 23)],
      };

      await open(datePicker);
    }, LOAD_DELAY);
  },
};

export const PresetHover: Story = {
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = findDatePicker(canvasElement);
      datePicker.dateRange = [new Date(2025, 8, 1), new Date(2025, 8, 1)];
      datePicker.presets = {
        'Today': [new Date(), new Date()],
        'Feature Added': [new Date(2025, 8, 1), new Date(2025, 8, 23)],
      };

      setTimeout(async () => {
        const presets = datePicker.shadowRoot?.querySelector(
          '.b2b-date-range-picker-body--presets',
        );
        const preset2 = presets?.children[1] as HTMLElement;
        userEvent.hover(preset2);
      }, 500);

      await open(datePicker);
    }, LOAD_DELAY);
  },
};

export const PresetSelected: Story = {
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = findDatePicker(canvasElement);
      datePicker.dateRange = [new Date(2025, 8, 1), new Date(2025, 8, 23)];
      datePicker.presets = {
        'Today': [new Date(2025, 8, 1), new Date(2025, 8, 1)],
        'Feature Added': [new Date(2025, 8, 1), new Date(2025, 8, 23)],
      };

      await open(datePicker);
    }, LOAD_DELAY);
  },
};
