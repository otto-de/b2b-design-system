import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({
  invalid,
  disabled,
  error,
  hint,
  additionalSlot,
}) => {
  return additionalSlot
    ? html` <div style="width: 380px">
        <b2b-input-group
          invalid="${invalid}"
          disabled="${disabled}"
          error="${error}"
          hint="${hint}">
          <b2b-input slot="start" label="Search Term"></b2b-input>
          <b2b-dropdown style="width: 90px;">
            <option value="one">€</option>
            <option value="two">$</option>
          </b2b-dropdown>
          <b2b-button slot="end" variant="primary">
            <b2b-icon-100 icon="b2b_icon-search"></b2b-icon-100>
          </b2b-button>
        </b2b-input-group>
      </div>`
    : html`<div style="width: 280px">
        <b2b-input-group invalid="${invalid}" disabled="${disabled}" error="${error}" hint="${hint}">
          <b2b-input slot="start" label="Search Term"></b2b-input>
          <b2b-dropdown slot="end" style="width: fit-content;">
            <option value="one">€</option>
            <option value="two">$</option>
          </b2b-dropdown>
        </b2b-input-group>
      </div>
    </div>`;
};

const defaultArgs = {
  invalid: false,
  disabled: false,
  error: 'Search term invalid',
  hint: 'You can search datasets here',
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs };
story010Default.storyName = 'Default';

export const story020Disabled = Template.bind({});
story020Disabled.args = { ...defaultArgs, disabled: true };
story020Disabled.storyName = 'Disabled';

export const story030Error = Template.bind({});
story030Error.args = { ...defaultArgs, invalid: true };
story030Error.storyName = 'Invalid';

export const story040Complex = Template.bind({});
story040Complex.args = { ...defaultArgs, additionalSlot: true };
story040Complex.storyName = 'Complex';

const inputGroupArgs = getArgTypes('b2b-input-group');

export default {
  title: 'Components/Form/Input Group',
  argTypes: {
    ...inputGroupArgs,
    additionalSlot: {
      control: false,
    },
  },
  viewMode: 'docs',
} as Meta;
