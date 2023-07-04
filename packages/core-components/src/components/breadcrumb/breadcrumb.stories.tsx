import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import breadcrumbDocs from './breadcrumb.docs.mdx';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({}) => {
  return html` <b2b-breadcrumb>
    <b2b-breadcrumb-item href="https://www.otto.de">Start</b2b-breadcrumb-item>
    <b2b-breadcrumb-item>Weiter</b2b-breadcrumb-item>
    <b2b-breadcrumb-item>Ende</b2b-breadcrumb-item>
  </b2b-breadcrumb>`;
};

export const story010Default = Template.bind({});
story010Default.storyName = 'Default Breadcrumb';

const anchorArgs = getArgTypes('b2b-breadcrumb');

export default {
  title: 'Components/Interaction/Breadcrumb',
  argTypes: anchorArgs,
  viewMode: 'docs',
  parameters: {
    docs: {
      page: breadcrumbDocs,
    },
  },
} as Meta;
