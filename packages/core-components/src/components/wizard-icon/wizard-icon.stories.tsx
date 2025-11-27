import { Meta, StoryFn } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';

const TemplateIcon: StoryFn = ({ state, step, checkIcon }) => {
  return html`<div>
    <b2b-wizard-icon state="${state}" step="${step}" check-icon="${checkIcon}">
    </b2b-wizard-icon>
  </div>`;
};

export const story005Default = TemplateIcon.bind({});
story005Default.args = { state: 'default', step: '1' };
story005Default.storyName = 'Default';

export const story010Completed = TemplateIcon.bind({});
story010Completed.args = { state: 'completed', step: '1', checkIcon: true };
story010Completed.storyName = 'Completed';

export const story015CompletedWithNumber = TemplateIcon.bind({});
story015CompletedWithNumber.args = {
  state: 'completed',
  step: '1',
  checkIcon: false,
};
story015CompletedWithNumber.storyName = 'Completed with number';

export const story020Pending = TemplateIcon.bind({});
story020Pending.args = { state: 'pending', step: '1' };
story020Pending.storyName = 'Pending';

export const story030Disabled = TemplateIcon.bind({});
story030Disabled.args = { state: 'disabled', step: '1' };
story030Disabled.storyName = 'Disabled';

const controls = {
  step: 'select',
};
const wizardIconArgs = getArgTypes('b2b-wizard-icon', controls);

export default {
  title: 'Components/Status & Feedback/Wizard Icon',
  argTypes: {
    ...wizardIconArgs,
    state: {
      options: ['completed', 'default', 'disabled', 'pending'],
      control: 'radio',
      table: { defaultValue: { summary: 'pending' } },
    },
  },
  viewmode: 'docs',
  parameters: {
    controls: { expanded: true },
  },
} as Meta;
