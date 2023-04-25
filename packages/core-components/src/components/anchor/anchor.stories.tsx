import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import anchorDocs from './anchor.docs.mdx';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({ href, download, size, target }) => {
  return html` <b2b-anchor
    href="${href}"
    download="${download}"
    size="${size}"
    target="${target}">
    Click me!
  </b2b-anchor>`;
};

const defaultArgs = {
  href: 'https://www.otto.de',
  download: null,
  target: 'blank',
  size: 'inherit',
};

export const story010Default = Template.bind({});
story010Default.args = defaultArgs;
story010Default.storyName = 'Default Anchor';

export const story020Size100 = Template.bind({});
story020Size100.args = { ...defaultArgs, size: '100' };
story020Size100.storyName = 'Size 100';

export const story030TargetBlank = Template.bind({});
story030TargetBlank.args = { ...defaultArgs, target: 'blank' };
story030TargetBlank.storyName = 'Target Blank';

const controls = {
  href: 'string',
  download: 'string',
  size: 'radio',
  target: 'radio',
};

const anchorArgs = getArgTypes('b2b-anchor', controls);

export default {
  title: 'Components/Interaction/Anchor',
  argTypes: anchorArgs,
  viewMode: 'docs',
  parameters: {
    docs: {
      page: anchorDocs,
    },
  },
} as Meta;
