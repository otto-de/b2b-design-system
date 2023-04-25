import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import docs from './paragraph.docs.mdx';
import { getArgTypes } from '../../docs/config/utils';

const template: Story = ({ weight, size, align }) => {
  return html`<b2b-paragraph weight="${weight}" size="${size}" align="${align}">
    Far far away, behind the word mountains, far from the countries Vokalia and
    Consonantia, there live the blind texts. Separated they live in
    Bookmarksgrove right at the coast of the Semantics, a large language ocean.
    A small river named Duden flows by their place and supplies it with the
    necessary regelialia. It is a paradisematic country, in which roasted parts
    of sentences fly into your mouth. Even the all-powerful Pointing has no
    control about the blind texts it is an almost unorthographic life One day
    however a small line of blind text by the name of Lorem Ipsum decided to
    leave for the far World of Grammar. The Big Oxmox advised her not to do so,
    because there were thousands of bad Commas, wild Question Marks and devious
    Semikoli, but the Little Blind Text didn’t listen.
  </b2b-paragraph>`;
};

const defaultArgs = {
  weight: 'normal',
  size: '100',
  align: 'left',
};

export const story010Default = template.bind({});
story010Default.args = defaultArgs;
story010Default.storyName = 'Default';

export const story020Bold = template.bind({});
story020Bold.args = { ...defaultArgs, weight: 'bold' };
story020Bold.storyName = 'Bold text';

export const story030Small = template.bind({});
story030Small.args = { ...defaultArgs, size: '50' };
story030Small.storyName = 'Small text';

export const story040Center = template.bind({});
story040Center.args = { ...defaultArgs, align: 'center' };
story040Center.storyName = 'Center aligned text';

export const story050Right = template.bind({});
story050Right.args = { ...defaultArgs, align: 'right' };
story050Right.storyName = 'Right aligned text';

export const story900Playground = template.bind({});
story900Playground.args = { ...defaultArgs };
story900Playground.storyName = 'Playground';

const argTypes = getArgTypes('b2b-paragraph');

export default {
  title: 'Components/Content/Paragraph',
  argTypes: argTypes,
  viewMode: 'docs',
  parameters: {
    docs: {
      page: docs,
    },
  },
} as Meta;
