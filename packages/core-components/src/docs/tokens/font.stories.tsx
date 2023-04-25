import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import allTokens from '@otto-ec/b2b-tokens/build/js/default.json';
import './styles.css';
import fontDocs from './font.docs.mdx';

const tokenRow = token => {
  return html`
    <tr>
      <td>${token.name}</td>
      <td>${token.value}</td>
    </tr>
  `;
};

const tokenTable = (tokensByType, tokenGroup, groupName?) => {
  return html`
    ${groupName && html`<b2b-headline size="200">${groupName}</b2b-headline>`}
    <br />
    <table style="width: 600px;">
      ${html`
        ${tokenGroup.map(type => {
          const tokens = tokensByType[type];
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
};

const FontTokens: Story = ({}) => {
  return html`
    <b2b-headline>Font</b2b-headline>
    <br />
    ${tokenTable(allTokens.font, ['family', 'weight'], 'Semantic tokens')}
    <br /><br />
    <b2b-headline size="100">Font sizes and line-height</b2b-headline>
    <b2b-paragraph
      >Please match the font size with the line-height of the same
      level.</b2b-paragraph
    >
    ${tokenTable(allTokens.size, ['copy', 'headline'])}
  `;
};

export const story010FontTokens = FontTokens.bind({});
story010FontTokens.storyName = 'Font';

export default {
  title: 'DesignTokens/Font',
  viewMode: 'docs',
  parameters: {
    docs: {
      page: fontDocs,
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
