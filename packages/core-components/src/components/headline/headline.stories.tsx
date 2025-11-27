import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const template: StoryFn = ({ size, align, slot, noMargin }) => {
  return html`<b2b-headline size=${size} align=${align} no-margin=${noMargin}>
    ${slot}
  </b2b-headline>`;
};

const defaultArgs = {
  size: '400',
  align: 'left',
  slot: 'Headline',
  noMargin: false,
};

export const story010Default = template.bind({});
story010Default.args = defaultArgs;
story010Default.storyName = 'Default Headline 400';

export const story030Size200 = template.bind({});
story030Size200.args = { ...defaultArgs, size: 200, slot: 'Headline 200' };
story030Size200.storyName = 'Headline 200';

export const story040Size100 = template.bind({});
story040Size100.args = { ...defaultArgs, size: 100, slot: 'Headline 100' };
story040Size100.storyName = 'Headline 100';

export const story050Center = template.bind({});
story050Center.args = {
  ...defaultArgs,
  align: 'center',
  slot: 'Centered Headline',
};
story050Center.storyName = 'Center aligned';

export const story060Right = template.bind({});
story060Right.args = {
  ...defaultArgs,
  align: 'right',
  slot: 'Headline aligned to the Right',
};
story060Right.storyName = 'Right aligned';

export const story070NoMargin = template.bind({});
story070NoMargin.args = {
  ...defaultArgs,
  noMargin: true,
  slot: 'Headline 100 without margin',
};
story070NoMargin.storyName = 'Headline without Margin';

const argTypes = getArgTypes('b2b-headline');

export default {
  title: 'Components/Content/Headline',
  argTypes: argTypes,
  viewMode: 'docs',
} as Meta;
