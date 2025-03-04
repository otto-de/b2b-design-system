import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const meta: Meta = {
  title: 'Components/Interaction/Flyout Menu',
  component: 'b2b-flyout-menu',
  args: { disabled: false, separator: false },
  argTypes: getArgTypes('b2b-flyout-menu'),
  render: ({ ...args }) =>
    html` <div style="margin-left: 100px">
      <b2b-flyout-menu>
        <b2b-icon-100
          icon="b2b_icon-ellipsis"
          slot="trigger"
          clickable
          focusable></b2b-icon-100>
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
};

export const Disabled: Story = {
  args: { ...meta.args, disabled: true },
};

export const Separator: Story = {
  args: { ...meta.args, separator: true },
};

/** Workaround because testing library (for interactions) does not support web components / shadow DOM for now.
 * See also https://github.com/storybookjs/testing-library/issues/24
 * TBD: migrate to @storybook/test dep
 */
export const AllStates: Story = {
  args: { ...meta.args, disabled: true, separator: true },
  render: ({ ...args }) =>
    html` <div style="margin-left: 100px">
      <b2b-flyout-menu opened="true">
        <b2b-icon-100
          icon="b2b_icon-ellipsis"
          slot="trigger"
          clickable
          focusable></b2b-icon-100>
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
