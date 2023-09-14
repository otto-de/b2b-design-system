const debugStories = ['checkbox'].map(
  storyName => `../src/**/${storyName}.stories.tsx`,
);

const stories = ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'];

const config = {
  stories: [...stories],
  // test-runner work around, uncomment this line to run only tests in specific components:
  // stories: [...debugStories],
  features: { buildStoriesJson: true },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
  ],
  framework: '@storybook/web-components-webpack5',
};
export default config;
