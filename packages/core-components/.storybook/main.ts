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
    '@storybook/preset-scss',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/web-components-vite',
};
export default config;
