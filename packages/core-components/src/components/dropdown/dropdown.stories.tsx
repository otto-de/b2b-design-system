import { userEvent } from '@storybook/test';
import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: StoryFn = ({
  label = 'Favorite Fruit',
  required,
  name,
  disabled,
  invalid,
  hint,
  error,
  selected = false,
}) => {
  return html`<b2b-dropdown
    label="${label}"
    name="${name}"
    error="${error}"
    hint="${hint}"
    disabled="${disabled}"
    invalid="${invalid}"
    required="${required}">
    <option value="strawberry">Strawberry</option>
    <option value="orange">Orange</option>
    <option value="banana">Banana</option>
    ${selected
      ? html`<option value="pineapple" selected="true">Pineapple</option>`
      : html`<option value="pineapple">Pineapple</option>`}
    <option value="grapes">Grapes</option>
    <option value="watermelon">Watermelon</option>
    <option value="papaya">Papaya</option>
    <option value="blueberry">Blueberry</option>
    <option value="kiwi">Kiwi</option>
    <option value="pomegranate">Pomegranate</option>
    <option value="apple" disabled>Apple</option>
  </b2b-dropdown>`;
};

const defaultArgs = {
  label: 'Favorite Fruit',
  required: false,
  name: 'fruit',
  disabled: false,
  invalid: false,
  hint: 'Pick one',
  error: 'Not that one!',
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs };
story010Default.storyName = 'Default';

export const story020Disabled = Template.bind({});
story020Disabled.args = { ...defaultArgs, disabled: true };
story020Disabled.storyName = 'Disabled';

export const story030Error = Template.bind({});
story030Error.args = { ...defaultArgs, invalid: true };
story030Error.storyName = 'Error';

export const story040Required = Template.bind({});
story040Required.args = { ...defaultArgs, required: true };
story040Required.storyName = 'Required';

export const story050Selected = Template.bind({});
story050Selected.args = { ...defaultArgs, selected: true };
story050Selected.storyName = 'Selected';
story050Selected.play = async ({ canvasElement }) => {
  setTimeout(async () => {
    const dropdown = canvasElement.querySelector('b2b-dropdown');
    const wrapper = dropdown.shadowRoot?.querySelector('.b2b-dropdown__select');
    await userEvent.click(wrapper);
  }, 500);
};

const dropdownArgs = getArgTypes('b2b-dropdown');

export default {
  title: 'Components/Form/Dropdown',
  argTypes: dropdownArgs,
  viewMode: 'docs',
} as Meta;
