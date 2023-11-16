import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({ label, disabled, value, hasCloseButton }) => {
  return html`<b2b-chip-component
    label="${label}"
    disabled="${disabled}"
    value="${value}"
    has-close-button="${hasCloseButton}"></b2b-chip-component>`;
};

const TruncTemplate: Story = ({ label, disabled, value, hasCloseButton }) => {
  return html`<div
    style="width: 170px; border: 1px solid grey; border-radius: 3px; padding: 6px;">
    <b2b-chip-component
      label="${label}"
      disabled="${disabled}"
      value="${value}"
      has-close-button="${hasCloseButton}"></b2b-chip-component>
  </div>`;
};

const defaultArgs = {
  label: 'Chip Label',
  disabled: false,
  value: '',
  hasCloseButton: true,
  truncate: false,
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs, label: 'Default Chip' };
story010Default.storyName = 'Default';

export const story020Disabled = Template.bind({});
story020Disabled.args = {
  ...defaultArgs,
  label: 'Disabled Chip',
  disabled: true,
};
story020Disabled.storyName = 'Disabled';
export const story030WithoutButton = Template.bind({});
story030WithoutButton.args = {
  ...defaultArgs,
  label: ' Chip without button',
  hasCloseButton: false,
};
story030WithoutButton.storyName = 'Without Button';
export const story040WithTruncatedText = TruncTemplate.bind({});
story040WithTruncatedText.args = {
  ...defaultArgs,
  label: ' Chip with truncated text',
};
story040WithTruncatedText.storyName = 'Truncated Text';

const chipComponentArgs = getArgTypes('b2b-chip-component');

export default {
  title: 'Components/Interaction/Chip',
  argTypes: chipComponentArgs,
  viewMode: 'docs',
} as Meta;
