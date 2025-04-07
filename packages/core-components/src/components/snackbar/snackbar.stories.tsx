import { getArgTypes } from '../../docs/config/utils';
import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { useArgs } from '@storybook/preview-api';
import { screen } from '@storybook/test';
getArgTypes('b2b-snackbar');

type Story = StoryObj;

const meta: Meta = {
  title: 'Components/Status & Feedback/Snackbar',
  component: 'b2b-snackbar',
  args: {
    type: 'info',
    description: `This is a snackbar`,
    opened: false,
    timed: false,
    duration: 5000,
    hasAction: true,
    actionLabel: 'Call to Action',
    width: 'auto',
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

    return html` <b2b-button @click=${showSnackBar} variant="primary"
        >Show Snackbar</b2b-button
      >
      <b2b-button @click=${hideSnackbar}>Hide Snackbar</b2b-button>
      <hr />
      <b2b-snackbar
        @b2b-close=${hideSnackbar}
        description="${args.description}"
        type="${args.type}"
        opened="${args.opened}"
        timed="${args.timed}"
        duration="${args.duration}"
        has-action="${args.hasAction}"
        action-label="${args.actionLabel}"
        width="${args.width}"></b2b-snackbar>`;
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
    description: 'This is an info snackbar',
  },
  play: async () => {
    await showSnackBar();
  },
};

export const SuccessSnackbar: Story = {
  args: {
    ...meta.args,
    type: 'success',
    description: 'This is a success snackbar',
  },
  play: async () => {
    await showSnackBar();
  },
};

export const WarningSnackbar: Story = {
  args: {
    ...meta.args,
    type: 'warning',
    description: 'This is a warning snackbar',
  },
  play: async () => {
    await showSnackBar();
  },
};

export const ErrorSnackbar: Story = {
  args: {
    ...meta.args,
    type: 'error',
    description: 'This is an error snackbar',
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
    description: 'This is timed snackbar',
  },
  play: async () => {
    await showSnackBar();
  },
};

export const WithWidth: Story = {
  args: {
    ...meta.args,
    type: 'info',
    description: 'This is a snackbar with custom width',
    width: '800px',
  },
  play: async () => {
    await showSnackBar();
  },
};
