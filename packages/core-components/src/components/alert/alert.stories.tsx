import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { screen } from '@storybook/test';
import { getArgTypes } from '../../docs/config/utils';
import { useArgs } from '@storybook/preview-api';

const Template: StoryFn = ({
  type,
  opened,
  size,
  hasCloseButton,
  customIcon,
}) => {
  const [_, updateArgs] = useArgs();
  const openAlert = () => {
    updateArgs({ opened: true, type, size, hasCloseButton, customIcon });
  };

  const closeAlert = () => {
    updateArgs({ opened: false, type, size, hasCloseButton, customIcon });
  };

  return html`
    <b2b-button variant="primary" @click=${openAlert}>Open Alert</b2b-button>
    <b2b-button @click=${closeAlert}>Close Alert</b2b-button>
    <hr />

    <b2b-alert
      @b2b-close=${closeAlert}
      opened="${opened}"
      type="${type}"
      size="${size}"
      has-close-button="${hasCloseButton}"
      custom-icon="${customIcon}">
      <strong>${type}</strong> This is an alert.
    </b2b-alert>
  `;
};

const defaultArgs = {
  type: 'info',
  opened: false,
  size: 'large',
  hasCloseButton: true,
  customIcon: false,
};

// for snapshot testing
const openAlert = async () => {
  const openAlertButton = screen.getByText('Open Alert');
  await openAlertButton.click();
};

// Stories
export const story010Info = Template.bind({});
story010Info.args = { ...defaultArgs };
story010Info.storyName = 'Info';
story010Info.play = async () => {
  await screen.getByText('Open Alert').click();
};

export const story020Success = Template.bind({});
story020Success.args = { ...defaultArgs, type: 'success' };
story020Success.storyName = 'Success';
story020Success.play = async () => {
  await screen.getByText('Open Alert').click();
};

export const story030Warning = Template.bind({});
story030Warning.args = { ...defaultArgs, type: 'warning' };
story030Warning.storyName = 'Warning';
story030Warning.play = async () => {
  await screen.getByText('Open Alert').click();
};

export const story040Error = Template.bind({});
story040Error.args = { ...defaultArgs, type: 'error' };
story040Error.storyName = 'Error';
story040Error.play = async () => {
  await screen.getByText('Open Alert').click();
};

export const story050Small = Template.bind({});
story050Small.args = { ...defaultArgs, size: 'small' };
story050Small.storyName = 'Small';
story050Small.play = async () => {
  await screen.getByText('Open Alert').click();
};

export default {
  title: 'Components/Status & Feedback/Alert',
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Type of the alert',
    },
    opened: {
      control: 'boolean',
      description: 'Controls whether the alert is open',
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Size of the alert',
    },
    hasCloseButton: {
      control: 'boolean',
      description: 'Shows or hides the close button',
    },
    customIcon: {
      control: 'boolean',
      description: 'Enables or disables custom icons',
    },
  },
  viewMode: 'docs',
} as Meta;
