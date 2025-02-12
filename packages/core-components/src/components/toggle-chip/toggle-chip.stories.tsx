import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({ label, name, active, disabled }) => {
  return html` <b2b-toggle-chip
    label="${label}"
    name="${name}"
    active="${active}""
    disabled="${disabled}">
  </b2b-toggle-chip>`;
};

const defaultArgs = {
  label: 'B2B Design System',
  name: 'Toggle Chip',
  active: false,
  disabled: false,
};

export const story010Default = Template.bind({});
story010Default.args = defaultArgs;
story010Default.storyName = 'Default Toggle Chip';

export const story020Disabled = Template.bind({});
story020Disabled.args = { ...defaultArgs, disabled: true };
story020Disabled.storyName = 'Toggle Chip Disabled';

export const story030Active = Template.bind({});
story030Active.args = { ...defaultArgs, active: true };
story030Active.storyName = 'Toggle Chip Active';

export const story040ActiveDisabled = Template.bind({});
story040ActiveDisabled.args = { ...defaultArgs, active: true, disabled: true };
story040ActiveDisabled.storyName = 'Toggle Chip Active Disabled';

const toggleChipArgs = getArgTypes('b2b-toggle-chip');

export default {
  title: 'Components/Interaction/Toggle Chip',
  argTypes: toggleChipArgs,
  viewMode: 'docs',
} as Meta;
