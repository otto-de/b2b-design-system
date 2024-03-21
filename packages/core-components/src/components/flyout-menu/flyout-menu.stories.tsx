import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const meta: Meta = {
  title: 'Components/Interaction/Flyout Menu',
  component: 'b2b-flyout-menu',
  args: { disabled: false, separator: false },
  argTypes: getArgTypes('b2b-flyout-menu'),
  render: ({ ...args }) => html` <div style="margin-left: 100px">
    <b2b-flyout-menu>
      <b2b-icon icon="b2b_icon-ellipsis" slot="icon"></b2b-icon>
      <b2b-flyout-menu-option
        slot="option"
        option="Delete"
        disabled="${args.disabled}">
      </b2b-flyout-menu-option>
      <b2b-flyout-menu-option
        slot="option"
        option="Pause"
        separator="${args.separator}">
      </b2b-flyout-menu-option>
      <b2b-flyout-menu-option slot="option" option="Copy">
      </b2b-flyout-menu-option>
      <b2b-flyout-menu-option slot="option" option="Share">
      </b2b-flyout-menu-option>
    </b2b-flyout-menu>
  </div>`,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: { ...meta.args },
  play: async ({ canvasElement }) => {
    setTimeout(() => {
      const flyoutMenu = canvasElement.querySelector('b2b-flyout-menu');
      const button = flyoutMenu.shadowRoot?.querySelector('button');
      button.click();
    }, 500);
  },
};

export const Disabled: Story = {
  args: { ...meta.args, disabled: true },
  play: async ({ canvasElement }) => {
    setTimeout(() => {
      const flyoutMenu = canvasElement.querySelector('b2b-flyout-menu');
      const button = flyoutMenu.shadowRoot?.querySelector('button');
      button.click();
    }, 500);
  },
};

export const Separator: Story = {
  args: { ...meta.args, separator: true },
  play: async ({ canvasElement }) => {
    setTimeout(() => {
      const flyoutMenu = canvasElement.querySelector('b2b-flyout-menu');
      const button = flyoutMenu.shadowRoot?.querySelector('button');
      button.click();
    }, 500);
  },
};
