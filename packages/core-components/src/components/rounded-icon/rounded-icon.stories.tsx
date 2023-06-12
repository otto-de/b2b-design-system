import { Meta, Story } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import RoundedIconDocs from './rounded-icon.docs.mdx';

const TemplateIcon: Story = ({ color, contentColor, iconName }) => {
  return html`<div>
    <b2b-rounded-icon color="${color}" content-color="${contentColor}">
      <b2b-icon slot="icon" icon="${iconName}"></b2b-icon>
    </b2b-rounded-icon>
  </div>`;
};

export const story010Icon = TemplateIcon.bind({});
story010Icon.args = {
  color: 'var(--b2b-color-success-50)',
  contentColor: 'var(--b2b-color-success-100)',
  iconName: 'b2b_icon-check',
};
story010Icon.storyName = 'Icon Content';

const TemplateText: Story = ({ color, contentColor, textContent }) => {
  return html`<div>
    <b2b-rounded-icon color="${color}" content-color="${contentColor}">
      <span slot="text">${textContent}</span>
    </b2b-rounded-icon>
  </div>`;
};

export const story020Text = TemplateText.bind({});
story020Text.args = {
  color: 'black',
  contentColor: 'white',
  textContent: '1',
};
story020Text.storyName = 'Text Content';

const controls = {};
const searchArgs = getArgTypes('b2b-rounded-icon', controls);

export default {
  title: 'Components/Assets/Rounded Icon',
  argTypes: { ...searchArgs },
  viewmode: 'docs',
  parameters: {
    controls: { expanded: true },
    docs: {
      page: RoundedIconDocs,
    },
  },
} as Meta;
