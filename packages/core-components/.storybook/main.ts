import { dirname, join } from 'path';
const debugStories = ['checkbox'].map(
  storyName => `../src/**/${storyName}.stories.tsx`,
);

const stories = ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'];

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

  // test-runner work around, uncomment this line to run only tests in specific components:
  // stories: [...debugStories],
  features: { buildStoriesJson: true },

  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-actions'),
    getAbsolutePath('@storybook/preset-scss'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-controls'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
  ],

  framework: getAbsolutePath('@storybook/web-components-webpack5'),

  docs: {},
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
