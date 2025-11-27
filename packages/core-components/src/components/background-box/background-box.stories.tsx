import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const meta: Meta = {
  title: 'Components/Utilities/Background Box',
  component: 'b2b-background-box',
  args: {
    maxWidth: false,
    noPadding: false,
    borderTop: 'default',
    borderRight: 'default',
    borderBottom: 'default',
    borderLeft: 'default',
  },
  argTypes: getArgTypes('b2b-background-box'),
  render: ({ ...args }) =>
    html` <b2b-background-box
      max-width=${args.maxWidth}
      no-padding=${args.noPadding}
      border-top=${args.borderTop}
      border-right=${args.borderRight}
      border-bottom=${args.borderBottom}
      border-left=${args.borderLeft}>
      <b2b-paragraph>
        The BackgroundBox component adjusts its width and padding based on two
        properties: maxWidth and noPadding. When maxWidth is true, it fills the
        available width until 1440px. The noPadding property controls internal
        spacing—if true, no padding is applied; if false, a default padding of
        24px (1.5rem) is added. The height of the box depends on its internal
        content.
      </b2b-paragraph>
    </b2b-background-box>`,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: { ...meta.args },
};

export const BorderControl: Story = {
  args: { ...meta.args, borderTop: 'none' },
};

export const MaxWidth: Story = {
  args: { ...meta.args, maxWidth: true },
};

export const NoPadding: Story = {
  args: { ...meta.args, noPadding: true },
};
