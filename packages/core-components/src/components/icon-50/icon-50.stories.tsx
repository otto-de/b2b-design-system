import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';
import { iconTypes } from './types';
import './../../global/icon.stories.scss';

const controls = {
  color: 'radio',
  icon: 'select',
};

const iconControls = getArgTypes('b2b-icon-50', controls);

const meta: Meta = {
  title: 'Components/Assets/Icon-50',
  component: 'b2b-icon-50',
  args: {
    icon: 'b2b_icon-arrow-down',
    color: 'primary',
    clickable: false,
    focusable: false,
  },
  argTypes: {
    ...iconControls,
  },
  render: ({ ...args }) =>
    html`<b2b-icon-50
      icon=${args.icon}
      color=${args.color}
      clickable=${args.clickable}
      focusable=${args.focusable}></b2b-icon-50>`,
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: { ...meta.args },
};

export const Secondary: Story = {
  args: { ...meta.args, color: 'secondary' },
};

export const Inverse: Story = {
  args: { ...meta.args, color: 'inverse' },
  parameters: {
    backgrounds: {
      default: 'inverse-bg',
    },
  },
};

export const Inherit: Story = {
  render: ({ icon, color, clickable, focusable }) => {
    return html` <div style="color: red;">
      <b2b-icon-50
        icon=${icon}
        color=${color}
        clickable=${clickable}
        focusable=${focusable}>
      </b2b-icon-50>
    </div>`;
  },
  args: { ...meta.args, color: 'inherit' },
};

const renderAllIcons = () => {
  const icons = iconTypes.map(icon => {
    return html` <div class="icon-container">
      <b2b-icon-50 icon=${icon}></b2b-icon-50>
      <p>${icon}</p>
    </div>`;
  });
  return html`<div class="icons-grid-container">${icons}</div>`;
};
export const AllIcons: Story = {
  render: renderAllIcons,
};
