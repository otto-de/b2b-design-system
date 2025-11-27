import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: StoryFn = ({ type }) => {
  return html`<b2b-label type="${type}">Label</b2b-label>`;
};

const defaultArgs = {
  type: 'neutral',
};

export const story010Neutral = Template.bind({});
story010Neutral.args = defaultArgs;
story010Neutral.storyName = 'Neutral';

export const story020Info = Template.bind({});
story020Info.args = { type: 'info' };
story020Info.storyName = 'Info';

export const story030Success = Template.bind({});
story030Success.args = { type: 'success' };
story030Success.storyName = 'Success';

export const story040Warning = Template.bind({});
story040Warning.args = { type: 'warning' };
story040Warning.storyName = 'Warning';

export const story050Error = Template.bind({});
story050Error.args = { type: 'error' };
story050Error.storyName = 'Error';

const argTypes = getArgTypes('b2b-label');

export default {
  title: 'Components/Status & Feedback/Label',
  argTypes: argTypes,
  viewMode: 'docs',
} as Meta;
