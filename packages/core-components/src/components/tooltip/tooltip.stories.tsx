import { Meta, StoryObj } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import { useArgs } from '@storybook/preview-api';
import { hideAllControls } from '../../docs/config/utils';
import dedent from 'ts-dedent';
const meta: Meta = {
  title: 'Components/Interaction/Tooltip',
  component: 'b2b-tooltip',
  args: {
    trigger: 'hover',
    position: 'right',
    content: 'I am a tooltip',
    triggerMarkup: undefined,
    buttons: undefined,
    opened: false,
  },
  argTypes: getArgTypes('b2b-tooltip'),
  render: ({ ...args }) => {
    const markup = args.triggerMarkup ? args.triggerMarkup : 'trigger.';
    const filler =
      args.position === 'top' ? html`<div style="height: 125px;"></div>` : null;

    const [_, updateArgs] = useArgs();
    const showToolTip = async () => {
      updateArgs({ opened: true });
    };

    const hideToolTip = async () => {
      updateArgs({ opened: false });
    };

    const buttonMarkup = args.buttons
      ? html`<b2b-button @click=${showToolTip} variant="primary"
            >Show Tooltip</b2b-button
          ><b2b-button @click=${hideToolTip}>Hide Tooltip</b2b-button>`
      : null;
    return html` ${filler}
      <b2b-paragraph>
        I am some text with a tooltip
        <b2b-tooltip
          position=${args.position}
          trigger=${args.trigger}
          content=${args.content}
          opened=${args.opened}
          data-testid="trigger"
          >${markup}
        </b2b-tooltip>
      </b2b-paragraph>
      ${buttonMarkup}`;
  },
};

type Story = StoryObj;

export const DefaultHoverTooltip: Story = {
  args: { ...meta.args },
};

export const FocusTooltip: Story = {
  ...meta,
  render: args => {
    const focusTriggerMarkup = html`<b2b-button>button to focus</b2b-button>`;
    return html`
      <b2b-paragraph>
        I am some text with a tooltip
        <b2b-tooltip
          position=${args.position}
          trigger=${args.trigger}
          content=${args.content}
          opened=${args.opened}
          data-testid="trigger">
          ${focusTriggerMarkup}
        </b2b-tooltip>
      </b2b-paragraph>
    `;
  },
};

export const CustomTooltip: Story = {
  ...meta,
};

export const TopTooltip: Story = {
  ...meta,
  args: { ...meta.args, opened: true, position: 'top' },
};

export const BottomTooltip: Story = {
  ...meta,
  args: { ...meta.args, opened: true, position: 'bottom' },
};

export const LeftTooltip: Story = {
  ...meta,
  args: { ...meta.args, opened: true, position: 'left' },
};

export const RightTooltip: Story = {
  ...meta,
  args: { ...meta.args, opened: true, position: 'right' },
};

export const LongRightTooltip: Story = {
  ...meta,
  args: {
    ...meta.args,
    opened: true,
    position: 'top',
    content:
      'Topping halvah cake sugar plum marzipan jelly marshmallow lemon drops. Bonbon brownie powder sesame snaps fruitcake caramels toffee. Brownie pie cotton candy sesame snaps wafer sugar plum candy marzipan oat cake.',
  },
};

const tooltipArgs = getArgTypes('b2b-tooltip');
export const BlockTooltip: Story = {
  ...meta, // Inherit metadata from meta if necessary
  args: {
    ...meta.args, // Use existing meta args
    content: 'I am a tooltip',
    position: 'right',
    opened: true, // Ensure the tooltip is visible
  },
  render: () => html`
    <b2b-tooltip
      content="I am a tooltip"
      position="right"
      opened
      style="display: inline-block">
      <b2b-input style="width: 300px"></b2b-input>
    </b2b-tooltip>
  `,
  parameters: {
    controls: { hideNoControlsWarning: true }, // Hide the "no controls" warning
    docs: {
      source: {
        code: dedent`
        <b2b-tooltip style="display: inline-block" content="I am a tooltip" position="right">
          <b2b-input style="width: 300px"></b2b-input>
        </b2b-tooltip>`,
      },
    },
  },
  argTypes: { ...hideAllControls(tooltipArgs) }, // Control hiding function
};
export default meta;
