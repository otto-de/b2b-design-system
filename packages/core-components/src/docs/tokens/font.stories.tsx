import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import allTokens from '@otto-de/b2b-tokens/build/js/default.json';
import './styles.css';

const tokenRow = (token, size?) => {
  return html`
    <tr>
      <td>${token.name}</td>
      <td>${token.value}</td>
      ${size && html`<td>${size}</td>`}
    </tr>
  `;
};

const semanticTokens = html`
  <b2b-headline size="200">Semantic tokens</b2b-headline>
  <br />
  <table style="width: 600px;">
    ${html`
      ${['family', 'weight'].map(type => {
        const tokens = allTokens.font[type];
        return html`
          <tr>
            <td colspan="3" class="token-type">${type}</td>
          </tr>
          ${tokens.map(token => tokenRow(token))}
        `;
      })}
    `}
  </table>
`;

const sizeTokens = html`
  <table style="width: 600px;">
    <thead>
      <tr>
        <th>Token Name</th>
        <th>Value in rem</th>
        <th>Value in px</th>
      </tr>
    </thead>
    ${html`
      ${['copy', 'headline'].map(type => {
        const tokens = allTokens.size[type];
        return html`
          <tr>
            <td colspan="3" class="token-type">${type}</td>
          </tr>
          ${tokens.map(token => {
            const valueInPixels = parseFloat(token.value) * 16 + 'px';
            return tokenRow(token, valueInPixels);
          })}
        `;
      })}
    `}
  </table>
`;

const FontTokens: StoryFn = ({}) => {
  return html`
    <b2b-headline>Font</b2b-headline>
    <br />
    ${semanticTokens}
    <br /><br />
    <b2b-headline size="100">Font sizes and line-height</b2b-headline>
    <b2b-paragraph
      >Please match the font size with the line-height of the same
      level.</b2b-paragraph
    >
    ${sizeTokens}
  `;
};

export const story010FontTokens = FontTokens.bind({});
story010FontTokens.storyName = 'Font';

export default {
  title: 'Design Tokens/Font',
  parameters: {
    options: {
      showPanel: false, // hides addons panel
    },
    backgrounds: {
      default: 'docsBackground',
      values: [{ name: 'docsBackground', value: '#fff' }],
    },
  },
} as Meta;
