import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

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
};

export const DisablePastDates: Story = {
  args: { ...meta.args, disablePastDates: true },
};

export const DisableFutureDates: Story = {
  args: { ...meta.args, disableFutureDates: true },
};

export const DisableWeekends: Story = {
  args: { ...meta.args, disableWeekends: true },
};
