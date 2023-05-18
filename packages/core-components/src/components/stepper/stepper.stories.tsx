import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import stepperDocs from './stepper.docs.mdx';

const Template: Story = () => {
  return html`<b2b-stepper></b2b-stepper>`;
};

export const story010Stepper = Template.bind({});
story010Stepper.storyName = 'Default';

export default {
  title: 'Components/Interaction/Stepper',
  viewmode: 'docs',
  parameters: {
    controls: { expanded: true },
    docs: {
      page: stepperDocs,
    },
  },
} as Meta;
