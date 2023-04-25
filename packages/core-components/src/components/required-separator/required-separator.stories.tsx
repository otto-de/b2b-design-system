import { Meta, Story } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import requiredSeparatorDocs from './required-separator.docs.mdx';

const Template: Story = ({ label }) => {
  return html`<div style="width: 400px">
    <b2b-input required="true" label="Name"></b2b-input
    ><br /><b2b-required-separator label="${label}"></b2b-required-separator>
  </div>`;
};

const defaultArgs = {
  label: 'Pflichtfeld',
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs };
story010Default.storyName = 'Default Separator';

const requiredSeparatorArgs = getArgTypes('b2b-required-separator');

export default {
  title: 'Components/Form/Required Separator',
  args: requiredSeparatorArgs,
  viewMode: 'docs',
  parameters: {
    docs: {
      page: requiredSeparatorDocs,
    },
  },
} as Meta;
