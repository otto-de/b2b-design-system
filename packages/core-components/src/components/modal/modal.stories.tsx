import { Meta, Story } from '@storybook/web-components';
import { screen } from '@storybook/testing-library';
import { getArgTypes } from '../../docs/config/utils';
import { useArgs } from '@storybook/preview-api';
import { html } from 'lit-html';
import modalDocs from './modal.docs.mdx';

const Template: Story = ({
  opened,
  variant,
  heading,
  backdropDismiss,
  escDismiss,
  content,
}) => {
  const [_, updateArgs] = useArgs();
  const openModal = () => {
    updateArgs({ opened: true, variant, heading, backdropDismiss, escDismiss });
  };
  const closeModal = () => {
    updateArgs({
      opened: false,
      variant,
      heading,
      backdropDismiss,
      escDismiss,
    });
  };
  return html`
    <b2b-button variant="primary" @click=${openModal}>Open Modal</b2b-button>

    <b2b-modal
      @b2b-close=${closeModal}
      id="modal"
      opened="${opened}"
      variant="${variant}"
      heading="${heading}"
      backdrop-dismiss="${backdropDismiss}"
      esc-dismiss="${escDismiss}">
      <div>${content}</div>
      <b2b-paragraph slot="footer-left">* Left Slot</b2b-paragraph>
      <b2b-button @click=${closeModal} slot="footer-right">Close</b2b-button>
      <b2b-button slot="footer-right" variant="primary">Save</b2b-button>
    </b2b-modal>
  `;
};

const defaultArgs = {
  heading: 'Modal Title',
  opened: false,
  escDismiss: false,
  backdropDismiss: false,
  variant: 'default',
  content: 'This is a test modal*',
};

const largeContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum*.';

// This play function is implemented for visual regression tests, so we can test modals opened
const openModal = async () => {
  const openModalButton = screen.getByText('Open Modal');
  await openModalButton.click();
};

export const story010BackdropDismiss = Template.bind({});
story010BackdropDismiss.args = {
  ...defaultArgs,
  backdropDismiss: true,
  heading: 'Modal with Backdrop Dismiss',
};
story010BackdropDismiss.storyName = 'Backdrop Dismiss';

export const story020EscDismiss = Template.bind({});
story020EscDismiss.args = {
  ...defaultArgs,
  escDismiss: true,
  heading: 'Modal with Escape Dismiss',
};
story020EscDismiss.storyName = 'Escape Dismiss';

export const story030Default = Template.bind({});
story030Default.args = { ...defaultArgs, heading: 'Default Modal Title' };
story030Default.storyName = 'Default (small)';
story030Default.play = async () => {
  await openModal();
};

export const story040Large = Template.bind({});
story040Large.args = {
  ...defaultArgs,
  variant: 'large',
  heading: 'Large Modal Title',
  content: largeContent,
};
story040Large.storyName = 'Large';
story040Large.play = async () => {
  await openModal();
};

const controls = {};
const modalArgs = getArgTypes('b2b-modal', controls);

export default {
  title: 'Components/Status & Feedback/Modal',
  argTypes: modalArgs,
  viewmode: 'docs',
  parameters: {
    docs: {
      page: modalDocs,
    },
  },
} as Meta;
