import { Meta, StoryFn } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';

const Template: StoryFn = ({ name, disabled, singleDisabled }) => {
  return html`
    <b2b-toggle-group name="${name}" disabled="${disabled}">
      <b2b-toggle-button
        name="${name}"
        value="abcd"
        label="ABCD"></b2b-toggle-button>
      <b2b-toggle-button
        name="${name}"
        value="efgh"
        label="EFGH"></b2b-toggle-button>
      <b2b-toggle-button
        name="${name}"
        value="ijkl"
        label="IJKL"></b2b-toggle-button>
      <b2b-toggle-button
        name="${name}"
        value="mnop"
        disabled="${singleDisabled}"
        label="MNOP"></b2b-toggle-button>
    </b2b-toggle-group>
  `;
};

const defaultArgs = {
  name: 'toggle-group-1',
  disabled: false,
  singleDisabled: false,
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs };
story010Default.storyName = 'Toggle Button Group';

export const story020Disabled = Template.bind({});
story020Disabled.args = { ...defaultArgs, disabled: true };
story020Disabled.storyName = 'Disabled';

export const story030SingleDisabled = Template.bind({});
story030SingleDisabled.args = { ...defaultArgs, singleDisabled: true };
story030SingleDisabled.storyName = 'Individual Disabled';

const toggleGroupArgs = getArgTypes('b2b-toggle-group');

export default {
  title: 'Components/Interaction/Toggle Button Group',
  argTypes: toggleGroupArgs,
  viewMode: 'docs',
} as Meta;
