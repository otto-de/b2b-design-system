import { Meta, Story } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import inputListDocs from './input-list.docs.mdx';
import { userEvent } from '@storybook/testing-library';

const Template: Story = ({
  label,
  required,
  placeholder,
  optionsList,
  customMarkup,
  disabled,
}) => {
  return html`<div style="height: 130px; width: 300px">
    <b2b-input-list
      data-testid="element"
      label="${label}"
      required="${required}"
      placeholder="${placeholder}"
      disabled="${disabled}"
      .optionsList=${optionsList}
      >${customMarkup}</b2b-input-list
    >
  </div>`;
};

const defaultArgs = {
  label: '',
  required: false,
  placeholder: 'Search here',
  optionsList: ['option1', 'option2', 'option3'],
  disabled: false,
};

export const story010InputList = Template.bind({});
story010InputList.args = { ...defaultArgs };
story010InputList.storyName = 'Input List';

export const story020InputListFocused = Template.bind({});
story020InputListFocused.args = { ...defaultArgs };
story020InputListFocused.storyName = 'Focused';

export const story025InputListDisabled = Template.bind({});
story025InputListDisabled.args = { ...defaultArgs, disabled: true };
story025InputListDisabled.storyName = 'Disabled';

export const story030CustomList = Template.bind({});
const list = html`<ul>
  <li>Option 1</li>
  <li>
    Option 2
    <ul>
      <li>Option 2.1</li>
      <li>Option 2.2</li>
    </ul>
  </li>
  <li>Option 3</li>
</ul>`;
story030CustomList.args = {
  ...defaultArgs,
  optionsList: [],
  customMarkup: list,
};
story030CustomList.storyName = 'Custom List Content';

story020InputListFocused.play = async ({ canvasElement }) => {
  setTimeout(async () => {
    const inputList = await canvasElement.querySelector('b2b-input-list');
    const b2bInput = inputList.shadowRoot?.querySelector('b2b-input');
    const input = b2bInput?.shadowRoot?.querySelector('input');
    userEvent.type(input, 'op');
  }, 500);
};

const controls = {};
const searchArgs = getArgTypes('b2b-input-list', controls);

export default {
  title: 'Components/Form/Input List',
  argTypes: { ...searchArgs },
  viewmode: 'docs',
  parameters: {
    controls: { expanded: true },
    docs: {
      page: inputListDocs,
    },
  },
} as Meta;
