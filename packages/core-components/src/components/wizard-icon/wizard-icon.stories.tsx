import { Meta, Story } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import WizardIconDocs from './wizard-icon.docs.mdx';

const TemplateIcon: Story = ({ state, step }) => {
  return html`<div>
    <b2b-wizard-icon state="${state}" step="${step}"> </b2b-wizard-icon>
  </div>`;
};

export const story010Completed = TemplateIcon.bind({});
story010Completed.args = { state: 'completed', step: '1' };
story010Completed.storyName = 'Completed';

export const story020Pending = TemplateIcon.bind({});
story020Pending.args = { state: 'pending', step: '1' };
story020Pending.storyName = 'Pending';

export const story030Disabled = TemplateIcon.bind({});
story030Disabled.args = { state: 'disabled', step: '1' };
story030Disabled.storyName = 'Disabled';

const controls = { step: 'select' };
const searchArgs = getArgTypes('b2b-wizard-icon', controls);

export default {
  title: 'Components/Status & Feedback/Wizard Icon',
  argTypes: { ...searchArgs },
  viewmode: 'docs',
  parameters: {
    controls: { expanded: true },
    docs: {
      page: WizardIconDocs,
    },
  },
} as Meta;
