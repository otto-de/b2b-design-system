import { Meta, Story } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';
import { html } from 'lit-html';

const Template: Story = ({ size, color }) => {
  return html` <b2b-spinner size="${size}" color="${color}"></b2b-spinner>`;
};

const defaultArgs = {
  size: '100',
  color: 'primary',
};

export const story010Default = Template.bind({});
story010Default.args = { ...defaultArgs };
story010Default.storyName = 'Default';

export const story020Secondary = Template.bind({});
story020Secondary.args = { ...defaultArgs, color: 'secondary' };
story020Secondary.storyName = 'Secondary';

export const story025Inverse = Template.bind({});
story025Inverse.args = { ...defaultArgs, color: 'inverse' };
story025Inverse.storyName = 'Inverse';
story025Inverse.parameters = {
  backgrounds: {
    default: 'inverse-bg',
  },
};

export const story030Small = Template.bind({});
story030Small.args = { ...defaultArgs, size: '50' };
story030Small.storyName = 'Small';

export const story040Large = Template.bind({});
story040Large.args = { ...defaultArgs, size: '200' };
story040Large.storyName = 'Large';

const controls = {};
const spinnerArgs = getArgTypes('b2b-spinner', controls);

export default {
  title: 'Components/Status & Feedback/Spinner',
  argTypes: spinnerArgs,
  viewmode: 'docs',
} as Meta;
