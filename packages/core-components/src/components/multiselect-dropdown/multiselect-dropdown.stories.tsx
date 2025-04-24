import { Meta, StoryObj } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';
import fruits from './stories.data.json';

type Story = StoryObj;

const multiselectArgs = getArgTypes('b2b-multiselect-dropdown');

const meta: Meta = {
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
        required=${args.required}>
      </b2b-multiselect-dropdown>
    </div>`,
};
export default meta;

export const Default: Story = {
  args: {
    ...meta.args,
  },
};

export const InitialSelectedValues: Story = {
  args: {
    ...meta.args,
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
        required=${args.required}>
      </b2b-multiselect-dropdown>
    </div>`,
};

export const Required: Story = {
  args: {
    ...meta.args,
    required: true,
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
        required=${args.required}>
      </b2b-multiselect-dropdown>
    </div>`,
};
