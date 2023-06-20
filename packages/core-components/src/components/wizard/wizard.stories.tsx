import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import wizardDocs from './wizard.docs.mdx';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({ activeStep, checkIcon }) => {
  return html`<b2b-wizard active-step="${activeStep}" check-icon="${checkIcon}">
    <b2b-wizard-step>Step 1</b2b-wizard-step>
    <b2b-wizard-step>Step 2</b2b-wizard-step>
    <b2b-wizard-step>Step 3</b2b-wizard-step>
    <b2b-wizard-step>Step 4</b2b-wizard-step>
  </b2b-wizard>`;
};

export const story010Wizard = Template.bind({});
story010Wizard.args = { activeStep: '2', checkIcon: true };
story010Wizard.storyName = 'Default';

const StatesTemplate: Story = ({ step }) => {
  return html`
    <b2b-wizard-step step="${step}" state="default">Default</b2b-wizard-step>
    <b2b-wizard-step step="${step}" state="completed"
      >Completed with icon</b2b-wizard-step
    >
    <b2b-wizard-step step="${step}" state="completed" check-icon="false"
      >Completed with number</b2b-wizard-step
    >
    <b2b-wizard-step step="${step}" state="pending">Pending</b2b-wizard-step>
    <b2b-wizard-step step="${step}" state="disabled">Disabled</b2b-wizard-step>
  `;
};

export const story020WizardStates = StatesTemplate.bind({});
story020WizardStates.args = { step: '1' };
story020WizardStates.argTypes = null;
story020WizardStates.storyName = 'Wizard states';

const controls = { activeStep: 'select' };
const WizardArgs = getArgTypes('b2b-wizard', controls);
export default {
  title: 'Components/Status & Feedback/Wizard',
  argTypes: WizardArgs,
  viewmode: 'docs',
  parameters: {
    controls: { expanded: true },
    docs: {
      page: wizardDocs,
    },
  },
} as Meta;
