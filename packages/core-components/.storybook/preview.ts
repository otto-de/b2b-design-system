import { defineCustomElements } from '../dist/loader';
import { Preview } from '@storybook/web-components';
defineCustomElements();

import './storybook.scss';

const preview: Preview = {
  parameters: {
    docs: {
      toc: { ignoreSelector: 'h3', headingSelector: 'h2' },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Overview',
          'Getting Started',
          'Guidelines',
          'Components',
          ['Content', 'Interaction', 'Form', 'Status & Feedback'],
        ],
      },
      showPanel: true,
    },
    backgrounds: {
      values: [{ name: 'inverse-bg', value: '#333333' }],
    },
  },
};
export default preview;
