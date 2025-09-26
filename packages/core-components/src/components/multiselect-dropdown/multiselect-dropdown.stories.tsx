import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import fruits from './stories.data.json';
import fruitOptions from './stories.data2.json';

const multiselectArgs = getArgTypes('b2b-multiselect-dropdown');

export default {
  title: 'Components/Form/Multiselect Dropdown',
  component: 'b2b-multiselect-dropdown',
  args: {
    optionsList: [...fruits],
    label: 'Fruits',
    placeholder: 'Please select...',
    searchPlaceholder: 'Search fruits',
    selectAllLabel: 'Select All',
    maxOptionsVisible: 8,
    selectedValues: ['Watermelon', 'Banana'],
    required: false,
    hint: '',
    disabled: false,
    invalid: false,
    errorMessage: '',
  },
  argTypes: {
    ...multiselectArgs,
    optionsList: { table: { disable: true } },
    selectedValues: { table: { disable: true } },
  },
  render: ({ ...args }) =>
    html`<div style="width: 400px">
      <b2b-multiselect-dropdown
        label=${args.label}
        max-options-visible=${args.maxOptionsVisible}
        select-all-label=${args.selectAllLabel}
        placeholder=${args.placeholder}
        search-placeholder=${args.searchPlaceholder}
        .optionsList=${args.optionsList}
        required=${args.required}
        hint=${args.hint}
        disabled=${args.disabled}
        invalid=${args.invalid}
        error-message=${args.errorMessage}>
      </b2b-multiselect-dropdown>
    </div>`,
} satisfies Meta;

export const Default: Story = {};

export const InitialSelectedValues: Story = {
  render: ({ ...args }) =>
    html`<div style="width: 400px">
      <b2b-multiselect-dropdown
        label=${args.label}
        max-options-visible=${args.maxOptionsVisible}
        select-all-label=${args.selectAllLabel}
        placeholder=${args.placeholder}
        search-placeholder=${args.searchPlaceholder}
        .optionsList=${args.optionsList}
        .selectedValues=${args.selectedValues}
        required=${args.required}
        hint=${args.hint}
        disabled=${args.disabled}
        invalid=${args.invalid}
        error-message=${args.errorMessage}>
      </b2b-multiselect-dropdown>
    </div>`,
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Hint: Story = {
  args: {
    hint: 'please select a value',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

export const InvalidWithErrorMessage: Story = {
  args: {
    invalid: true,
    errorMessage: 'error has occurred',
  },
};

export const WithOptionsArray: Story = {
  args: {
    optionsList: [...fruitOptions],
    selectedValues: ['1', '5'],
  },
  render: ({ ...args }) =>
    html`<div style="width: 400px">
      <b2b-multiselect-dropdown
        label=${args.label}
        max-options-visible=${args.maxOptionsVisible}
        select-all-label=${args.selectAllLabel}
        placeholder=${args.placeholder}
        search-placeholder=${args.searchPlaceholder}
        .optionsList=${args.optionsList}
        .selectedValues=${args.selectedValues}
        required=${args.required}
        hint=${args.hint}
        disabled=${args.disabled}
        invalid=${args.invalid}
        error-message=${args.errorMessage}>
      </b2b-multiselect-dropdown>
    </div>`,
};
