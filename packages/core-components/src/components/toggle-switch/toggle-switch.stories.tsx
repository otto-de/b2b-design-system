import type { Meta, StoryObj } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import type { B2bToggleSwitchComponent } from './toggle-switch';

export default {
  title: 'Components/Interaction/Toggle Switch',
  component: 'b2b-toggle-switch',
  args: {
    label: 'Label',
    disabled: false,
    labelPosition: 'left',
    state: true,
  },
  argTypes: getArgTypes('b2b-toggle-switch'),
  render: ({ ...args }) =>
    html`<b2b-toggle-switch
      label="${args.label}"
      disabled="${args.disabled}"
      label-position="${args.labelPosition}"
      state="${args.state}" />`,
} satisfies Meta<B2bToggleSwitchComponent>;

type Story = StoryObj<B2bToggleSwitchComponent>;

export const SwitchOn: Story = {};

export const SwitchOff: Story = {
  args: {
    disabled: false,
    state: false,
  },
};

export const SwitchOnDisabled: Story = {
  args: {
    state: true,
    disabled: true,
  },
};

export const SwitchOffDisabled: Story = {
  args: {
    state: false,
    disabled: true,
  },
};

export const SwitchBehindDropdown: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => html`
    <div>
      <b2b-dropdown>
        <option>Test</option>
      </b2b-dropdown>
      <b2b-toggle-switch state="true" />
    </div>
  `,
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const dropdown = canvasElement.querySelector(
        'b2b-dropdown',
      ) as HTMLElement;
      const wrapper = dropdown.shadowRoot.querySelector(
        '.b2b-dropdown__select',
      ) as HTMLElement;
      wrapper.click();
    }, 500);
  },
};
