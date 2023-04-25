import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import tooltipDocs from './tooltip.docs.mdx';
import { getArgTypes, hideAllControls } from '../../docs/config/utils';
import { useArgs } from '@storybook/client-api';
import dedent from 'ts-dedent';

const tooltipArgs = getArgTypes('b2b-tooltip');

const Template: Story = ({
  position,
  trigger,
  content,
  triggerMarkup,
  buttons,
  opened,
}) => {
  const markup = triggerMarkup ? triggerMarkup : 'trigger.';
  const filler =
    position === 'top' ? html`<div style="height: 125px;"></div>` : null;

  const [_, updateArgs] = useArgs();
  const showToolTip = async () => {
    updateArgs({ opened: true });
  };

  const hideToolTip = async () => {
    updateArgs({ opened: false });
  };

  const buttonMarkup = buttons
    ? html`<b2b-button @click=${showToolTip} variant="primary"
          >Show Tooltip</b2b-button
        ><b2b-button @click=${hideToolTip}>Hide Tooltip</b2b-button>`
    : null;

  return html`${filler}<b2b-paragraph>
      I am some text with a tooltip
      <b2b-tooltip
        position="${position}"
        trigger="${trigger}"
        content="${content}"
        opened="${opened}"
        data-testid="trigger"
        >${markup}</b2b-tooltip
      >
    </b2b-paragraph>
    ${buttonMarkup}`;
};

const defaultArgs = {
  content: 'I am a tooltip',
  trigger: 'hover',
  position: 'top',
  opened: false,
};

export const story010Hover = Template.bind({});
story010Hover.args = { ...defaultArgs };
story010Hover.storyName = 'Default Hover Tooltip';

export const story020Focus = Template.bind({});
const focusTriggerMarkup = html`<b2b-button>button to focus</b2b-button>`;
story020Focus.args = {
  ...defaultArgs,
  trigger: 'focus',
  triggerMarkup: focusTriggerMarkup,
};
story020Focus.storyName = 'Focus Tooltip';

export const story030Custom = Template.bind({});
const buttons = true;
story030Custom.args = {
  ...defaultArgs,
  buttons: buttons,
  trigger: 'custom',
  position: 'right',
};
story030Custom.storyName = 'Custom Trigger Tooltip';

// for testing purposes
export const story040Top = Template.bind({});
story040Top.args = { ...defaultArgs, opened: true };
story040Top.storyName = 'Top Tooltip';

export const story050Bottom = Template.bind({});
story050Bottom.args = { ...defaultArgs, position: 'bottom', opened: true };
story050Bottom.storyName = 'Bottom Tooltip';

export const story060Left = Template.bind({});
story060Left.args = { ...defaultArgs, position: 'left', opened: true };
story060Left.storyName = 'Left Tooltip';

export const story070Right = Template.bind({});
story070Right.args = { ...defaultArgs, position: 'right', opened: true };
story070Right.storyName = 'Right Tooltip';

export const story080Right = Template.bind({});
story080Right.args = {
  ...defaultArgs,
  position: 'top',
  opened: true,
  content:
    'Topping halvah cake sugar plum marzipan jelly marshmallow lemon drops. Bonbon brownie powder sesame snaps fruitcake caramels toffee. Brownie pie cotton candy sesame snaps wafer sugar plum candy marzipan oat cake.',
};
story080Right.storyName = 'Tooltip with long text';

const BlockTooltipTemplate: Story = ({}) => {
  return html`<b2b-tooltip
    content="I am a tooltip"
    position="right"
    opened
    style="display: inline-block"
    ><b2b-input style="width: 300px"></b2b-input>
  </b2b-tooltip> `;
};
export const story090BlockElement = BlockTooltipTemplate.bind({});
story090BlockElement.storyName = 'Block Element';
story090BlockElement.parameters = {
  controls: { hideNoControlsWarning: true },
  docs: {
    source: {
      code: dedent`
      <b2b-tooltip style="display: inline-block" content="I am a tooltip" position="right">
        <b2b-input style="width: 300px"></b2b-input>
      </b2b-tooltip>`,
    },
  },
};
story090BlockElement.argTypes = { ...hideAllControls(tooltipArgs) };

export default {
  title: 'Components/Interaction/Tooltip',
  argTypes: {
    ...tooltipArgs,
    triggerMarkup: { table: { disable: true } },
    buttons: { table: { disable: true } },
  },
  viewMode: 'docs',
  parameters: {
    docs: {
      page: tooltipDocs,
    },
  },
} as Meta;
