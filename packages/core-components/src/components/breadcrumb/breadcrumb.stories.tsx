import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({ href, active, paddingTop, paddingBottom }) => {
  return html`
    <b2b-breadcrumb
      padding-top="${paddingTop}"
      padding-bottom="${paddingBottom}">
      <b2b-breadcrumb-item href="${href}">Start</b2b-breadcrumb-item>
      <b2b-breadcrumb-item>Weiter</b2b-breadcrumb-item>
      <b2b-breadcrumb-item active="${active}">Ende</b2b-breadcrumb-item>
    </b2b-breadcrumb>
  `;
};

const defaultArgs = {
  href: 'https://www.otto.de',
  active: true,
  paddingTop: 0, // Default padding top in px
  paddingBottom: 0, // Default padding bottom in px
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs };
story010Default.storyName = 'Default Breadcrumb';

export const story020PaddingTopBottom = Template.bind({});
story020PaddingTopBottom.args = {
  ...defaultArgs,
  paddingTop: 10, // Example with custom padding top
  paddingBottom: 15, // Example with custom padding bottom
};
story020PaddingTopBottom.storyName = 'Custom Padding';

const breadcrumbArgs = getArgTypes('b2b-breadcrumb');

export default {
  title: 'Components/Interaction/Breadcrumb',
  argTypes: breadcrumbArgs,
  viewMode: 'docs',
} as Meta;
