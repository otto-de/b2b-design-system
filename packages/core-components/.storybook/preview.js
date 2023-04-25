import { defineCustomElements } from '../loader';
defineCustomElements();

import './storybook.scss';

export const parameters = {
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
};
