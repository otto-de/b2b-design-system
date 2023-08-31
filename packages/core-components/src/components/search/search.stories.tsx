import { Meta, Story } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import { useArgs } from '@storybook/preview-api';
import dedent from 'ts-dedent';
import fruits from './stories.data.json';

const Template: Story = ({ placeholder, optionsList, disabled }) => {
  const [_, updateArgs] = useArgs();
  const onInput = event => {
    // Read user input
    const userInput = event.detail.value?.toLowerCase();
    // update result list
    if (userInput) {
      // Filter results based on input
      const filteredList = fruits.filter(
        fruit => fruit.toLowerCase().indexOf(userInput) > -1,
      );
      updateArgs({ optionsList: filteredList });
    } else {
      updateArgs({ optionsList: [] });
    }
  };
  // contenteditable is needed so that storybook won't interpret the key inputs as shortcuts
  // it also works when the component has the word 'input' in its name
  return html`<div style="width: 300px; display: block">
    <b2b-search
      contenteditable
      data-testid="search-element"
      disabled=${disabled}
      placeholder="${placeholder}"
      .optionsList=${optionsList}
      @b2b-input=${onInput}></b2b-search>
  </div>`;
};

const defaultArgs = {
  placeholder: 'Search here',
  optionsList: [],
  disabled: false,
};

export const story010Search = Template.bind({});
story010Search.args = { ...defaultArgs };
story010Search.storyName = 'Search';
story010Search.parameters = {
  docs: {
    source: {
      code: dedent`
      <b2b-search 
        placeholder="Search here"
        optionsList={[]} 
        onB2b-input={onInput}
        onB2b-search={onSearch}
        onB2b-option-selected={onOptionSelected}>
      </b2b-search>`,
    },
  },
};

export const story020SearchDisabled = Template.bind({});
story020SearchDisabled.storyName = 'Disabled';
story020SearchDisabled.args = {
  placeholder: 'Input List Component',
  disabled: true,
};

const CustomSearchTemplate: Story = ({ placeholder, optionsList }) => {
  return html`<div style="width: 500px; height: 130px;">
    <b2b-input-group>
      <b2b-input-list
        slot="start"
        placeholder="${placeholder}"
        .optionsList=${optionsList}></b2b-input-list>
      <b2b-dropdown style="width: 50%" invalid error="an error">
        <option value="one">Option 1</option>
        <option value="one">Option 2</option>
      </b2b-dropdown>
      <b2b-button slot="end" variant="primary">
        <b2b-icon icon="b2b_icon-search"></b2b-icon>
      </b2b-button>
    </b2b-input-group>
  </div>`;
};
export const story030CustomSearch = CustomSearchTemplate.bind({});
story030CustomSearch.storyName = 'Custom Search';
story030CustomSearch.args = {
  placeholder: 'Input List Component',
  optionsList: ['result A', 'result B'],
};

const controls = {};
const searchArgs = getArgTypes('b2b-search', controls);

// this removes the long list but still show the description for the prop
searchArgs.optionsList = {
  ...searchArgs.optionsList,
  control: false,
};

export default {
  title: 'Components/Form/Search',
  argTypes: {
    ...searchArgs,
    optionsList: { table: { disable: true } },
    value: { table: { disable: true } },
  },
  viewmode: 'docs',
} as Meta;
