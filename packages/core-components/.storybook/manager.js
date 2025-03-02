import { addons } from '@storybook/manager-api';
import customTheme from './b2b-theme';
import favicon from './public/favicon.svg';

const link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', favicon);
document.head.appendChild(link);

addons.setConfig({
  theme: customTheme,
  enableShortcuts: false,
});
