import { getArgTypes } from '../../docs/config/utils';
import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { useArgs } from '@storybook/preview-api';
import { screen } from '@storybook/testing-library';
getArgTypes('b2b-snackbar');

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Status & Feedback/Snackbar',
  component: 'b2b-snackbar',
  args: {
    type: 'info',
    opened: true,
    timed: false,
    duration: 5000,
    hasCloseButton: true,
    hasAction: true,
    actionLabel: 'Call to Action',
    isUnderlined: true,
  },
  argTypes: getArgTypes('b2b-snackbar'),
  render: ({ ...args }) => {
    const [_, updateArgs] = useArgs();
    const showSnackBar = async () => {
      updateArgs({ opened: true });
    };

    const hideSnackbar = async () => {
      updateArgs({ opened: false });
    };

    return html` <b2b-button variant="primary" @click=${showSnackBar}
        >Show Snackbar</b2b-button
      >
      <b2b-button @click=${hideSnackbar}>Hide Snackbar</b2b-button>
      <hr />
      <b2b-snackbar
        type="${args.type}"
        opened="${args.opened}"
        timed="${args.timed}"
        duration="${args.duration}"
        has-close-button="${args.hasCloseButton}"
        has-action="${args.hasAction}"
        action-label="${args.actionLabel}"
        is-underlined="${args.isUnderlined}"
        >This is a ${args.type} snackbar</b2b-snackbar
      >`;
  },
};

export default meta;

const showSnackBar = async () => {
  const showSnackBarButton = screen.getByText('Show Snackbar');
  await showSnackBarButton.click();
};

export const InfoSnackbar: Story = {
  args: {
    ...meta.args,
    type: 'info',
  },
  play: async () => {
    await showSnackBar();
  },
};

export const SuccessSnackbar: Story = {
  args: {
    ...meta.args,
    type: 'success',
  },
  play: async () => {
    await showSnackBar();
  },
};

export const WarningSnackbar: Story = {
  args: {
    ...meta.args,
    type: 'warning',
  },
  play: async () => {
    await showSnackBar();
  },
};

export const ErrorSnackbar: Story = {
  args: {
    ...meta.args,
    type: 'error',
  },
  play: async () => {
    await showSnackBar();
  },
};

export const TimedSnackbar: Story = {
  args: {
    ...meta.args,
    type: 'info',
    timed: true,
    duration: 3000,
  },
  play: async () => {
    await showSnackBar();
  },
};
