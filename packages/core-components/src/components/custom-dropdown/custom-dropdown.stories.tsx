import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const meta: Meta = {
  title: 'Components/Form/Custom Dropdown',
  component: 'b2b-custom-dropdown',
  argTypes: getArgTypes('b2b-custom-dropdown'),
  args: {
    placeholder: 'Test Placeholder',
    separator: true,
    disabled: false,
  },
  render: ({ ...args }) =>
    html`<div style="margin-left: 16px;width: 500px">
      <b2b-custom-dropdown placeholder="${args.placeholder}">
        <b2b-paragraph slot="trigger">
          This is a custom dropdown
          <b2b-icon-100
            icon="b2b_icon-arrow-down"
            focusable
            clickable></b2b-icon-100>
        </b2b-paragraph>
        <b2b-custom-dropdown-option
          option="Name of the agency"
          separator="${args.separator}"
          disabled="${args.disabled}"
          slot="option">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          option="Partner1"
          slot="option"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          option="Partner2"
          slot="option"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          option="Partner3"
          slot="option"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          option="Partner4"
          slot="option"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          option="Partner5"
          slot="option"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          option="Partner6"
          slot="option"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
      </b2b-custom-dropdown>
    </div>`,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: { ...meta.args },
};

export const Disabled: Story = {
  args: { ...meta.args, disabled: true },
};

export const SearchAndScrollDisabled: Story = {
  args: { ...meta.args },
  render: ({ ...args }) =>
    html`<div style="margin-left: 16px;width: 300px">
      <b2b-custom-dropdown placeholder="${args.placeholder}">
        <b2b-paragraph slot="trigger">
          This is a custom dropdown
          <b2b-icon-100
            icon="b2b_icon-arrow-down"
            focusable
            clickable></b2b-icon-100>
        </b2b-paragraph>
        <b2b-custom-dropdown-option
          option="Name of the agency"
          separator="${args.separator}"
          slot="option">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option option="Partner1" slot="option">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option option="Partner2" slot="option">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option option="Partner3" slot="option">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option option="Partner4" slot="option">
        </b2b-custom-dropdown-option>
      </b2b-custom-dropdown>
    </div>`,
};

export const CustomDropdownDisabled: Story = {
  args: { ...meta.args, disabled: true },
  render: ({ ...args }) =>
    html`<div style="margin-left: 16px;width: 300px">
      <b2b-custom-dropdown
        placeholder="${args.placeholder}"
        disabled="${args.disabled}">
        <b2b-paragraph slot="trigger">
          This is a custom dropdown
          <b2b-icon-100
            icon="b2b_icon-arrow-down"
            focusable
            clickable></b2b-icon-100>
        </b2b-paragraph>
        <b2b-custom-dropdown-option
          option="Name of the agency"
          separator="${args.separator}"
          slot="option">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option option="Partner1" slot="option">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option option="Partner2" slot="option">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option option="Partner3" slot="option">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option option="Partner4" slot="option">
        </b2b-custom-dropdown-option>
      </b2b-custom-dropdown>
    </div>`,
};
