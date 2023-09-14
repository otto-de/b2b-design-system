import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { getArgTypes } from '../../docs/config/utils';

const Template: Story = ({ alignment }) => {
  const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse massa urna, accumsan id viverra et, mollis sit amet sem.`;
  const styles =
    alignment === 'vertical'
      ? {
          display: `display: flex;`,
          margin: `margin: 0 10px;`,
          width: `width: 12rem;`,
        }
      : {
          display: null,
          margin: `margin: 10px 0;`,
          width: null,
        };
  return html`<div style="${styles.display}">
    <p style="${styles.margin} ${styles.width}">${content}</p>
    <b2b-separator alignment="${alignment}"></b2b-separator>
    <p style="${styles.margin} ${styles.width}">${content}</p>
  </div>`;
};

const defaultArgs = {
  alignment: 'horizontal',
};

export const story010Horizontal = Template.bind({});
story010Horizontal.args = { ...defaultArgs };
story010Horizontal.storyName = 'Horizontal';

export const story020Vertical = Template.bind({});
story020Vertical.args = { ...defaultArgs, alignment: 'vertical' };
story020Vertical.storyName = 'Vertical';

const argTypes = getArgTypes('b2b-separator');

export default {
  title: 'Components/Utilities/Separator',
  argTypes: argTypes,
  viewMode: 'docs',
} as Meta;
