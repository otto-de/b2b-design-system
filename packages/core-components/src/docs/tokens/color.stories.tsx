import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import allTokens from '@otto-ec/b2b-tokens/build/js/default.json';
import './styles.css';
import colorDocs from './color.docs.mdx';

const tokenRow = token => {
  return html`
    <tr>
      <td>
        <div style="background-color:${token.value};" class="color-box"></div>
      </td>
      <td>${token.name}</td>
      <td>${token.value}</td>
    </tr>
  `;
};

const tokenTable = (tokenGroup, groupName?) => {
  return html`
    ${groupName && html`<b2b-headline size="200">${groupName}</b2b-headline>`}
    <table style="width: 600px;">
      <tbody>
        ${tokenGroup.map(type => {
          const tokens = allTokens.color[type];
          return html`
            <tr>
              <td colspan="3" class="token-type">${type}</td>
            </tr>
            ${tokens.map(token => tokenRow(token))}
          `;
        })}
      </tbody>
    </table>
  `;
};

const semanticTopTokensList = [
  'background',
  'border',
  'copy',
  'headline',
  'icon',
  'table',
];
const semanticBottomTokensList = ['error', 'warning', 'success', 'info'];
const basicTokensList = ['black', 'white', 'grey', 'red'];

const ColorTokens: Story = ({}) => {
  return html`
    <b2b-headline>Color</b2b-headline>
    <br />
    ${tokenTable(semanticTopTokensList, 'Semantic Tokens')}
    ${tokenTable(semanticBottomTokensList)}
    <br /><br />
    <b2b-headline size="200">Basic Tokens</b2b-headline>
    <b2b-paragraph>
      Remember to only use basic color tokens when there is no semantic version
      available.</b2b-paragraph
    >
    ${tokenTable(basicTokensList)}
  `;
};

export const story010ColorTokens = ColorTokens.bind({});
story010ColorTokens.storyName = 'Color';
story010ColorTokens.parameters = {
  controls: { hideNoControlsWarning: true },
};

export default {
  title: 'DesignTokens/Color',
  viewMode: 'docs',
  parameters: {
    docs: {
      page: colorDocs,
    },
    options: {
      showPanel: false, // hides addons panel
    },
    backgrounds: {
      default: 'docsBackground',
      values: [{ name: 'docsBackground', value: '#fff' }],
    },
  },
} as Meta;
