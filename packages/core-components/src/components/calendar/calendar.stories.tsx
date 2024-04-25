import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';
import { userEvent } from '@storybook/testing-library';

const meta: Meta = {
  title: 'Components/Interaction/Calendar',
  component: 'b2b-calendar',
  args: {
    disablePastDates: false,
    disableFutureDates: false,
    disableWeekends: false,
    label: 'Zeitraum auswählen',
  },
  argTypes: getArgTypes('b2b-calendar'),
  render: ({ ...args }) => html` <div style="margin-left: 100px">
    <b2b-calendar
      label=${args.label}
      disable-past-dates=${args.disablePastDates}
      disable-future-dates=${args.disableFutureDates}
      disable-weekends=${args.disableWeekends}></b2b-calendar>
  </div>`,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: { ...meta.args },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const calendar = canvasElement.querySelector('b2b-calendar');
      const b2bCalendarInputWrapper = calendar.shadowRoot?.querySelector(
        '.b2b-calender-input-wrapper',
      );
      await userEvent.click(b2bCalendarInputWrapper);
    }, 500);
  },
};

export const DisablePastDates: Story = {
  args: { ...meta.args, disablePastDates: true },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const calendar = canvasElement.querySelector('b2b-calendar');
      const b2bCalendarInputWrapper = calendar.shadowRoot?.querySelector(
        '.b2b-calender-input-wrapper',
      );
      await userEvent.click(b2bCalendarInputWrapper);
    }, 500);
  },
};

export const DisableFutureDates: Story = {
  args: { ...meta.args, disableFutureDates: true },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const calendar = canvasElement.querySelector('b2b-calendar');
      const b2bCalendarInputWrapper = calendar.shadowRoot?.querySelector(
        '.b2b-calender-input-wrapper',
      );
      await userEvent.click(b2bCalendarInputWrapper);
    }, 500);
  },
};

export const DisableWeekends: Story = {
  args: { ...meta.args, disableWeekends: true },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const calendar = canvasElement.querySelector('b2b-calendar');
      const b2bCalendarInputWrapper = calendar.shadowRoot?.querySelector(
        '.b2b-calender-input-wrapper',
      );
      await userEvent.click(b2bCalendarInputWrapper);
    }, 500);
  },
};
