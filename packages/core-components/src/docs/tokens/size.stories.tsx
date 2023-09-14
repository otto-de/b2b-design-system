import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import allTokens from '@otto-de/b2b-tokens/build/js/default.json';

const tokenRow = token => {
  const valueInPixels = parseFloat(token.value) * 16 + 'px';
  return html`
    <tr>
      <td>${token.name}</td>
      <td>${token.value}</td>
      <td>${valueInPixels}</td>
    </tr>
  `;
};

const tokenTable = (tokenGroup, groupName?) => {
  return html`
    ${groupName && html`<b2b-headline size="200">${groupName}</b2b-headline>`}
    <br />
    <table style="width: 600px;">
      <thead>
        <tr>
          <th>Token Name</th>
          <th>Value in rem</th>
          <th>Value in px</th>
        </tr>
      </thead>
      ${html`
        ${tokenGroup.map(type => {
          const tokens = allTokens.size[type];
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

const SizeTokens: Story = ({}) => {
  return html`
    <b2b-headline>Size</b2b-headline>
    <br />
    ${tokenTable(['icon', 'space', 'padding', 'border'], 'Semantic Tokens')}
    <br /><br />
    <b2b-headline size="200">Basic Tokens</b2b-headline>
    <b2b-paragraph>
      Remember to only use basic size tokens when there is no semantic version
      available. <br />We recommend using the <em>-size-space-</em> tokens
      whenever possible.
    </b2b-paragraph>
    ${tokenTable(['base'])}
  `;
};

export const story010SizeTokens = SizeTokens.bind({});
story010SizeTokens.storyName = 'Size';

export default {
  title: 'Design Tokens/Size',
  viewMode: 'docs',
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
