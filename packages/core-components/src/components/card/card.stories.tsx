import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: StoryFn = ({ disabled, href, target }) => {
  return html`<b2b-card disabled=${disabled} href=${href} target=${target}>
    <b2b-headline size="100">An Interactive Card</b2b-headline>
    <b2b-paragraph
      >You can hover over me or press tab on your keyboard to see me pop out. I
      fill up to 100% of my parent element, so you can use me in a
      grid.</b2b-paragraph
    >
  </b2b-card>`;
};

const defaultArgs = {
  disabled: false,
  href: '',
  target: 'blank',
};

export const story010Card = Template.bind({});
story010Card.args = { ...defaultArgs };
story010Card.storyName = 'Default Card';

export const story020DisabledCard = Template.bind({});
story020DisabledCard.args = {
  ...defaultArgs,
  disabled: true,
};
story020DisabledCard.storyName = 'Disabled';

export const story030LinkCard = Template.bind({});
story030LinkCard.args = { ...defaultArgs, href: 'https://www.otto.de' };
story030LinkCard.storyName = 'Card with Link';

const controls = {
  href: 'string',
};

const cardArgs = getArgTypes('b2b-card', controls);
export default {
  title: 'Components/Interaction/Card',
  argTypes: {
    ...cardArgs,
  },
  viewMode: 'docs',
} as Meta;
