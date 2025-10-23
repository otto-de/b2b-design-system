import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const meta: Meta = {
  title: 'Components/Form/Custom Dropdown',
  component: 'b2b-custom-dropdown',
  argTypes: getArgTypes('b2b-custom-dropdown'),
  args: {
    placeholder: 'Test Placeholder',
    separator: false,
    disabled: false,
    dropshadow: true,
    border: false,
    hoverIcon: null,
    hoverIconColor: null,
    selectedIcon: null,
    selectedIconColor: null,
    opened: false,
    selected: false,
    alignment: 'left',
  },
  render: ({ ...args }) =>
    html`<div style="margin-left: 16px;width: 300px">
      <b2b-custom-dropdown
        placeholder="${args.placeholder}"
        dropshadow="${args.dropshadow}"
        border="${args.border}"
        alignment="${args.alignment}"
        opened="${args.opened}">
        <b2b-paragraph slot="trigger">
          This is a custom dropdown
          <b2b-icon-100
            icon="b2b_icon-arrow-down"
            focusable
            clickable></b2b-icon-100>
        </b2b-paragraph>
        <b2b-custom-dropdown-option
          slot="option"
          option="Option 1"
          separator="${args.separator}"
          hover-icon="${args.hoverIcon}"
          selected-icon="${args.selectedIcon}"
          hover-icon-color="${args.hoverIconColor}"
          selected-icon-color="${args.selectedIconColor}"
          selected="${args.selected}"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          slot="option"
          option="Option 2"
          separator="${args.separator}"
          hover-icon="${args.hoverIcon}"
          selected-icon="${args.selectedIcon}"
          hover-icon-color="${args.hoverIconColor}"
          selected-icon-color="${args.selectedIconColor}"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          slot="option"
          option="Option 3"
          separator="${args.separator}"
          hover-icon="${args.hoverIcon}"
          selected-icon="${args.selectedIcon}"
          hover-icon-color="${args.hoverIconColor}"
          selected-icon-color="${args.selectedIconColor}"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          slot="option"
          option="Option 4"
          separator="${args.separator}"
          hover-icon="${args.hoverIcon}"
          selected-icon="${args.selectedIcon}"
          hover-icon-color="${args.hoverIconColor}"
          selected-icon-color="${args.selectedIconColor}"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          slot="option"
          option="Option 5"
          separator="${args.separator}"
          hover-icon="${args.hoverIcon}"
          selected-icon="${args.selectedIcon}"
          hover-icon-color="${args.hoverIconColor}"
          selected-icon-color="${args.selectedIconColor}"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          slot="option"
          option="Option 6"
          separator="${args.separator}"
          hover-icon="${args.hoverIcon}"
          selected-icon="${args.selectedIcon}"
          hover-icon-color="${args.hoverIconColor}"
          selected-icon-color="${args.selectedIconColor}"
          disabled="${args.disabled}">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option
          slot="option"
          option="Option 7"
          hover-icon="${args.hoverIcon}"
          selected-icon="${args.selectedIcon}"
          hover-icon-color="${args.hoverIconColor}"
          selected-icon-color="${args.selectedIconColor}"
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

export const WithDropShadow: Story = {
  args: { ...meta.args, opened: true },
};

export const WithBorder: Story = {
  args: { ...meta.args, dropshadow: false, border: true, opened: true },
};

export const WithSeparator: Story = {
  args: { ...meta.args, separator: true, opened: true },
};

export const WithIcon: Story = {
  args: {
    ...meta.args,
    opened: true,
    selected: true,
    hoverIcon: 'b2b_icon-arrow-long-right',
    hoverIconColor: 'b2b-color-grey-400',
    selectedIcon: 'b2b_icon-success',
    selectedIconColor: 'b2b-color-success-100',
  },
};

export const CustomDropdownOptionsDisabled: Story = {
  args: { ...meta.args, disabled: true, opened: true },
};

export const SearchAndScrollDisabled: Story = {
  args: { ...meta.args, opened: true },
  render: ({ ...args }) =>
    html`<div style="margin-left: 16px;width: 300px">
      <b2b-custom-dropdown
        placeholder="${args.placeholder}"
        dropshadow="${args.dropshadow}"
        opened="${args.opened}">
        <b2b-paragraph slot="trigger">
          This is a custom dropdown
          <b2b-icon-100
            icon="b2b_icon-arrow-down"
            focusable
            clickable></b2b-icon-100>
        </b2b-paragraph>
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option slot="option" option="Option 1">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option slot="option" option="Option 2">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option slot="option" option="Option 3">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option slot="option" option="Option 4">
        </b2b-custom-dropdown-option>
      </b2b-custom-dropdown>
    </div>`,
};

export const CustomDropdownDisabled: Story = {
  args: { ...meta.args, disabled: true, opened: true },
  render: ({ ...args }) =>
    html`<div style="margin-left: 16px;width: 300px">
      <b2b-custom-dropdown
        placeholder="${args.placeholder}"
        disabled="${args.disabled}"
        opened="${args.opened}">
        <b2b-paragraph slot="trigger">
          This is a custom dropdown
          <b2b-icon-100
            icon="b2b_icon-arrow-down"
            focusable
            clickable></b2b-icon-100>
        </b2b-paragraph>
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option slot="option" option="Option 1" >
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option slot="option" option="Option 2">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option slot="option" option="Option 3">
        </b2b-custom-dropdown-option>
        <b2b-custom-dropdown-option slot="option" option="Option 4">
        </b2b-custom-dropdown-option>
      </b2b-custom-dropdown>
    </div>`,
};

export const AlignmentLeft: Story = {
  args: { ...meta.args, alignment: 'left', opened: true },
};

export const AlignmentCenter: Story = {
  args: { ...meta.args, alignment: 'center', opened: true },
};

export const AlignmentRight: Story = {
  args: { ...meta.args, alignment: 'right', opened: true },
};
