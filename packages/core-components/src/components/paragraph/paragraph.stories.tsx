import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

type Story = StoryObj;

const paragraphArgs = getArgTypes('b2b-paragraph');

const meta: Meta = {
  title: 'Components/Content/Paragraph',
  component: 'b2b-paragraph',
  args: {
    weight: 'normal',
    size: '100',
    align: 'left',
    margin: true,
    variant: 'black',
    display: 'block',
  },
  argTypes: {
    ...paragraphArgs,
  },
  render: ({ ...args }) =>
    html`<b2b-paragraph
      weight=${args.weight}
      size=${args.size}
      align=${args.align}
      margin=${args.margin}
      variant=${args.variant}
      display=${args.display}>
      Far far away, behind the word mountains, far from the countries Vokalia
      and Consonantia, there live the blind texts. Separated they live in
      Bookmarksgrove right at the coast of the Semantics, a large language
      ocean. A small river named Duden flows by their place and supplies it with
      the necessary regelialia. It is a paradisematic country, in which roasted
      parts of sentences fly into your mouth. Even the all-powerful Pointing has
      no control about the blind texts it is an almost unorthographic life One
      day however a small line of blind text by the name of Lorem Ipsum decided
      to leave for the far World of Grammar. The Big Oxmox advised her not to do
      so, because there were thousands of bad Commas, wild Question Marks and
      devious Semikoli, but the Little Blind Text didn’t listen.
    </b2b-paragraph>`,
};
export default meta;

export const Default: Story = {
  args: {
    ...meta.args,
  },
};

export const Bold: Story = {
  args: {
    ...meta.args,
    weight: 'bold',
  },
};

export const Small: Story = {
  args: {
    ...meta.args,
    size: '50',
  },
};

export const CenterAligned: Story = {
  args: {
    ...meta.args,
    align: 'center',
  },
};

export const RightAligned: Story = {
  args: {
    ...meta.args,
    align: 'right',
  },
};

export const NoBottomMargin: Story = {
  args: {
    ...meta.args,
    margin: false,
  },
};

export const GreyVariant: Story = {
  args: {
    ...meta.args,
    variant: 'grey-400',
  },
};

export const DisplayInline: Story = {
  args: {
    ...meta.args,
    display: 'inline',
  },
  render: ({ ...args }) =>
    html`<b2b-paragraph
        weight=${args.weight}
        size=${args.size}
        align=${args.align}
        margin=${args.margin}
        variant=${args.variant}
        display=${args.display}>
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
        Text didn’t listen. </b2b-paragraph
      ><b2b-paragraph
        >Far far away, behind the word mountains, far from the countries Vokalia
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
      </b2b-paragraph>`,
};

export const DisplayInlineBlock: Story = {
  args: {
    ...meta.args,
    display: 'inline-block',
  },
  render: ({ ...args }) =>
    html`<b2b-paragraph
        weight=${args.weight}
        size=${args.size}
        align=${args.align}
        margin=${args.margin}
        variant=${args.variant}
        display=${args.display}>
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
        Text didn’t listen. </b2b-paragraph
      ><b2b-paragraph
        >Far far away, behind the word mountains, far from the countries Vokalia
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
      </b2b-paragraph>`,
};
