import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const meta: Meta = {
  title: 'Components/Utilities/Background Box',
  component: 'b2b-background-box',
  args: { fixedWidth: false, noPadding: false },
  argTypes: getArgTypes('b2b-background-box'),
  render: ({ ...args }) => html` <b2b-background-box
    fixed-width="${args.fixedWidth}"
    no-padding="${args.noPadding}">
    <b2b-paragraph>
      The BackgroundBox component adjusts its width and padding based on two
      properties: fixedWidth and noPadding. When fixedWidth is true, the box has
      a fixed width of 1212px; otherwise, it fills the available width. The
      noPadding property controls internal spacing—if true, no padding is
      applied; if false, a default padding of 24px (1.5rem) is added. The height
      of the box depends on its internal content.
    </b2b-paragraph>
  </b2b-background-box>`,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: { ...meta.args },
};

export const FixedWidth: Story = {
  args: { ...meta.args, fixedWidth: true },
};

export const NoPadding: Story = {
  args: { ...meta.args, noPadding: true },
};
