import { Meta, StoryFn } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';

const Template: StoryFn = ({ testWidth, testHeight, testWhiteSpace }) => {
  return html`
    <b2b-scrollable-container
      style=${`width: ${testWidth}; height: ${testHeight}`}>
      <b2b-paragraph style="white-space: ${testWhiteSpace}">
        Far far away, behind the word mountains, far from the countries Vokalia
        and Consonantia, there live the blind texts. Separated they live in
        Bookmarksgrove right at the coast of the Semantics, a large language
        ocean. A small river named Duden flows by their place and supplies it
        with the necessary regelialia. It is a paradisematic country, in which
        roasted parts of sentences fly into your mouth. Even the all-powerful
        Pointing has no control about the blind texts it is an almost
        unorthographic life One day however a small line of blind text by the
        name of Lorem Ipsum decided to leave for the far World of Grammar. The
        Big Oxmox advised her not to do so, because there were thousands of bad
        Commas, wild Question Marks and devious Semikoli, but the Little Blind
        Text didn’t listen.
      </b2b-paragraph>
    </b2b-scrollable-container>
  `;
};

const defaultArgs = {
  testWidth: '400px',
  testHeight: '50px',
  testWhiteSpace: 'inherit',
};

export const story010HorizontalScroll = Template.bind({});
story010HorizontalScroll.args = { ...defaultArgs };
story010HorizontalScroll.storyName = 'Horizontal Scroll';

export const story020VerticalScroll = Template.bind({});
story020VerticalScroll.args = {
  ...defaultArgs,
  testHeight: '100px',
  testWhiteSpace: 'normal',
};
story020VerticalScroll.storyName = 'Vertical Scroll';

const argsData = getArgTypes('b2b-scrollable-container');

argsData.testWhiteSpace = {
  options: ['normal', 'inherit'],
  control: {
    type: 'radio',
  },
  description:
    'This is not a component prop. It is here to show the use of the white-space css property in the element',
};

argsData.testWidth = {
  description:
    'This is not a component prop. It is the width of the scrollable container.',
};

argsData.testHeight = {
  description:
    'This is not a component prop. It is the height of the scrollable container.',
};

export default {
  title: 'Components/Content/Scrollable Container',
  argTypes: argsData,
  viewmode: 'docs',
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'docsBackground',
      values: [{ name: 'docsBackground', value: '#fff' }],
    },
  },
} as Meta;
