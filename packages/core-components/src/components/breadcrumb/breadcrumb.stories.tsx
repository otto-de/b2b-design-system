import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({ href, active, paddingVertical }) => {
  return html`
    <b2b-breadcrumb padding-vertical="${paddingVertical}">
      <b2b-breadcrumb-item href="${href}">Start</b2b-breadcrumb-item>
      <b2b-breadcrumb-item>Weiter</b2b-breadcrumb-item>
      <b2b-breadcrumb-item active="${active}">Ende</b2b-breadcrumb-item>
    </b2b-breadcrumb>
  `;
};

const defaultArgs = {
  href: 'https://www.otto.de',
  active: true,
  paddingVertical: 0, // Default padding in px
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs };
story010Default.storyName = 'Default Breadcrumb';

export const story020PaddingVertical = Template.bind({});
story020PaddingVertical.args = {
  ...defaultArgs,
  paddingVertical: 20, // Example with custom paddingVertical
};
story020PaddingVertical.storyName = 'Breadcrumb with Custom Vertical Padding';

const breadcrumbArgs = getArgTypes('b2b-breadcrumb');

export default {
  title: 'Components/Interaction/Breadcrumb',
  argTypes: breadcrumbArgs,
  viewMode: 'docs',
} as Meta;
