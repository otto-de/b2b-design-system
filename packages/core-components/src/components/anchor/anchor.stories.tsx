import { Meta, Story, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({
  href,
  download,
  size,
  target,
  hoverColor,
  underlineText,
}) => {
  return html` <b2b-anchor
    href="${href}"
    download="${download}"
    size="${size}"
    hover-color="${hoverColor}"
    target="${target}"
    underline-text="${underlineText}">
    Click me!
  </b2b-anchor>`;
};

const defaultArgs = {
  href: 'https://www.otto.de',
  download: null,
  target: 'blank',
  size: 'inherit',
  hoverColor: 'default',
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

export const story040BlueHoverColor: StoryObj = {
  args: {
    ...defaultArgs,
    hoverColor: 'inherit',
  },
  render: ({}) =>
    html`<div style="color:blue; ">
      <b2b-anchor
        href="https://www.otto.de"
        target="blank"
        hover-color="inherit"
        >Anchor Hover Color Change</b2b-anchor
      >
    </div>`,
};
story040BlueHoverColor.storyName = 'Hover Color Inherit';

export const story050NoUnderline = Template.bind({});
story050NoUnderline.args = { ...defaultArgs, underlineText: false };
story050NoUnderline.storyName = 'No underline';

const controls = {
  href: 'string',
  download: 'string',
  size: 'radio',
  target: 'radio',
  hoverColor: 'radio',
  underlineText: 'radio',
};

const anchorArgs = getArgTypes('b2b-anchor', controls);

export default {
  title: 'Components/Interaction/Anchor',
  argTypes: anchorArgs,
  viewMode: 'docs',
} as Meta;
