import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import buttonDocs from './button.docs.mdx';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({
  variant,
  size,
  disabled,
  loading,
  content,
  type,
  href,
  download,
  target,
}) => {
  const label = content ? content : 'Details';
  return html`<b2b-button
    variant="${variant}"
    size="${size}"
    disabled="${disabled}"
    loading="${loading}"
    type="${type}"
    .href="${href}"
    download="${download}"
    target="${target}">
    ${label}
  </b2b-button>`;
};

const defaultArgs = {
  variant: 'secondary',
  size: '100',
  disabled: false,
  loading: false,
  type: 'button',
  href: undefined,
  target: 'blank',
  download: null,
};

export const story010Secondary = Template.bind({});
story010Secondary.args = { ...defaultArgs };
story010Secondary.storyName = 'Secondary';

export const story020Primary = Template.bind({});
story020Primary.args = {
  ...defaultArgs,
  variant: 'primary',
  content: 'Primary',
};
story020Primary.storyName = 'Primary';

export const story030Loading = Template.bind({});
story030Loading.args = {
  ...defaultArgs,
  variant: 'primary',
  loading: true,
  content: 'Primary',
};
story030Loading.storyName = 'Loading';

export const story040IconStart = Template.bind({});
const iconStartContent = html`<b2b-icon
    slot="start"
    icon="b2b_icon-check"
    size="100"
    color="inherit"></b2b-icon>
  Text`;
story040IconStart.args = {
  ...defaultArgs,
  variant: 'primary',
  content: iconStartContent,
};
story040IconStart.storyName = 'Button With Icon Start';

export const story050IconEnd = Template.bind({});
const iconEndContent = html`Text
  <b2b-icon
    slot="end"
    icon="b2b_icon-check"
    size="100"
    color="inherit"></b2b-icon>`;
story050IconEnd.args = {
  ...defaultArgs,
  variant: 'primary',
  content: iconEndContent,
};
story050IconEnd.storyName = 'Button With Icon End';

export const story055IconStartPali = Template.bind({});
const iconStartPaliContent = html`<i class="obc_icon-check obc_mr-1"></i> Icon
  Button`;
story055IconStartPali.args = {
  ...defaultArgs,
  variant: 'primary',
  content: iconStartPaliContent,
};
story055IconStartPali.storyName = 'Button With Pali Icon';

export const story060IconSearch = Template.bind({});
const iconSearchContent = html`<b2b-icon
  icon="b2b_icon-check"
  size="100"
  color="primary"></b2b-icon>`;
story060IconSearch.args = {
  ...defaultArgs,
  variant: 'secondary',
  content: iconSearchContent,
};
story060IconSearch.storyName = 'Icon Only Button';

export const story070Disabled = Template.bind({});
story070Disabled.args = {
  ...defaultArgs,
  variant: 'primary',
  disabled: true,
  content: 'Primary has grey color when disabled',
};
story070Disabled.storyName = 'Disabled';

export const story080Anchor = Template.bind({});
story080Anchor.args = {
  ...defaultArgs,
  href: 'https://www.otto.de',
  content: 'Anchor Button',
};
story080Anchor.storyName = 'Anchor Button';

export const story090DisabledAnchor = Template.bind({});
story090DisabledAnchor.args = {
  ...defaultArgs,
  href: 'https://www.otto.de',
  disabled: true,
  content: 'Disabled Anchor Button',
};
story090DisabledAnchor.storyName = 'Disabled Anchor Button';

const controls = {
  variant: 'radio',
};
const buttonArgs = getArgTypes('b2b-button', controls);

export default {
  title: 'Components/Interaction/Button',
  argTypes: {
    ...buttonArgs,
    content: {
      control: false,
    },
  },
  viewMode: 'docs',
  parameters: {
    docs: {
      page: buttonDocs,
    },
  },
} as Meta;
