import { Meta, StoryObj } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import { userEvent } from '@storybook/testing-library';

const meta: Meta = {
  title: 'Components/Form/Input List',
  component: 'b2b-input-list',
  args: {
    label: '',
    required: false,
    placeholder: 'Search here',
    optionsList: ['option1', 'option2', 'option3'],
    disabled: false,
  },
  argTypes: getArgTypes('b2b-input-list'),
  render: ({ ...args }) => html`<div style="height: 130px; width: 300px">
    <b2b-input-list
      data-testid="element"
      label="${args.label}"
      required="${args.required}"
      placeholder="${args.placeholder}"
      disabled="${args.disabled}"
      .optionsList=${args.optionsList}></b2b-input-list>
  </div>`,
};
export default meta;

type Story = StoryObj;

export const InputList: Story = {
  args: {
    ...meta.args,
  },
};

export const Focused: Story = {
  args: {
    ...meta.args,
  },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const inputList = await canvasElement.querySelector('b2b-input-list');
      const b2bInput = inputList.shadowRoot?.querySelector('b2b-input');
      const input = b2bInput?.shadowRoot?.querySelector('input');
      userEvent.type(input, 'op');
    }, 500);
  },
};

export const CustomList: Story = {
  args: {
    ...meta.args,
  },
  render: ({ ...args }) => html`<div style="height: 130px; width: 300px">
    <b2b-input-list
      data-testid="element"
      label="${args.label}"
      required="${args.required}"
      placeholder="${args.placeholder}"
      disabled="${args.disabled}"
      .optionsList=${args.optionsList}
      ><ul>
        <li>Option 1</li>
        <li>
          Option 2
          <ul>
            <li>Option 2.1</li>
            <li>Option 2.2</li>
          </ul>
        </li>
        <li>Option 3</li>
      </ul></b2b-input-list
    >
  </div>`,
};

export const DisabledWithoutSelectedOption: Story = {
  args: {
    ...meta.args,
    disabled: true,
  },
};

export const disabledWithSelectedOption: Story = {
  args: {
    ...meta.args,
    disabled: true,
  },
  render: ({ ...args }) => html`<div style="height: 130px; width: 300px">
    <b2b-input-list
      data-testid="element"
      label="${args.label}"
      value="${args.optionsList[0]}"
      required="${args.required}"
      placeholder="${args.placeholder}"
      disabled="${args.disabled}"
      .optionsList=${args.optionsList}
      ><ul>
        <li>Option 1</li>
        <li>
          Option 2
          <ul>
            <li>Option 2.1</li>
            <li>Option 2.2</li>
          </ul>
        </li>
        <li>Option 3</li>
      </ul></b2b-input-list
    >
  </div>`,
};
