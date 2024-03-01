import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';
import { iconTypes } from './types';
import './icon.stories.scss';

const Template: Story = ({ icon, color, variant }) => {
  return html`<b2b-icon
    icon="${icon}"
    color="${color}"
    variant="${variant}" />`;
};

const defaultArgs = {
  icon: 'b2b_icon-edit',
  color: 'primary',
  variant: '100',
};

export const story010Primary = Template.bind({});
story010Primary.args = defaultArgs;
story010Primary.storyName = 'Primary';

export const story020Secondary = Template.bind({});
story020Secondary.args = { ...defaultArgs, color: 'secondary' };
story020Secondary.storyName = 'Secondary';

export const story030Inverse = Template.bind({});
story030Inverse.args = { ...defaultArgs, color: 'inverse' };
story030Inverse.storyName = 'Inverse';
story030Inverse.parameters = {
  backgrounds: {
    default: 'inverse-bg',
  },
};

export const story035Inherit: Story = ({ icon, color, variant }) => {
  return html` <div style="color: red;">
    <b2b-icon icon="${icon}" color="${color}" variant="${variant}" />
  </div>`;
};
story035Inherit.args = { ...defaultArgs, color: 'inherit' };
story035Inherit.storyName = 'Inherit';

export const story040Size50 = Template.bind({});
story040Size50.args = {
  ...defaultArgs,
  variant: '50',
  icon: 'b2b_icon-info-50',
};
story040Size50.storyName = 'Variant 50';

export const story050Size100 = Template.bind({});
story050Size100.args = defaultArgs;
story050Size100.storyName = 'Variant 100';

export const story070AllIcons: Story = ({ color, variant }) => {
  // not using a self-closing tag as that messes up with the display order of the icon and paragraph
  const icons = iconTypes.map(icon => {
    return html`
      <div class="icon-container">
        <b2b-icon
          icon="${icon}"
          color="${color || defaultArgs.color}"
          variant="${variant || 100}"></b2b-icon>
        <p>${icon}</p>
      </div>
    `;
  });
  return html`<div class="icons-grid-container">${icons}</div>`;
};
story070AllIcons.args = { color: 'primary', variant: '100' };
story070AllIcons.storyName = 'All Icons';

const controls = {
  variant: 'radio',
  color: 'radio',
  icon: 'select',
};

const iconArgs = getArgTypes('b2b-icon', controls);

export default {
  title: 'Components/Assets/Icon',
  argTypes: { ...iconArgs, size: { controls: false } },
  viewMode: 'docs',
} as Meta;
