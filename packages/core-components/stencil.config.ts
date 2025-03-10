import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import generateStorybookArgs from './scripts/stencil/generate-storybook-args';
import { postcss } from '@stencil-community/postcss';
// @ts-ignore
import postImport from 'postcss-import';
import * as Path from 'path';
import purgeCSSExtensionPlugin from './plugins/purgeCssExtensionPlugin';
import generateVueWebTypes from './scripts/stencil/generate-vue-web-types';

const dev: boolean = process.argv && process.argv.indexOf('--dev') > -1;
const apiEnv: string = dev ? 'dev' : 'prod';

export const config: Config = {
  namespace: 'b2b-core-components',
  sourceMap: false,
  globalStyle: 'src/global/b2b-styles.scss',
  transformAliasedImportPaths: false,
  env: {
    env: apiEnv,
  },
  outputTargets: [
    // Typings for output targets were changed in Stencil 3, this doesn't affect builds or functionality of the react lib
    // @ts-ignore
    reactOutputTarget({
      componentCorePackage: '@otto-de/b2b-core-components',
      proxiesFile:
        '../react-components/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      isPrimaryPackageOutputTarget: true,
    },
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'dist-hydrate-script',
    },
    {
      type: 'docs-custom',
      generator: generateStorybookArgs,
    },
    {
      type: 'docs-custom',
      generator: generateVueWebTypes,
    },
    {
      type: 'docs-vscode',
      file: 'dist/custom-elements.json',
    },
  ],
  validatePrimaryPackageOutputTarget: true,
  extras: {
    enableImportInjection: true,
  },
  watchIgnoredRegex: /.*.\.docs.*|.*.\.stories.*/,
  plugins: [
    sass(),
    postcss({
      plugins: [
        postImport({
          path: [Path.resolve(__dirname, 'node_modules')],
          resolve: id => {
            if (id.startsWith('~')) {
              return id.substring(1);
            }
            return id;
          },
        }),
        purgeCSSExtensionPlugin({}),
      ],
    }),
  ],
  testing: {
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    browserHeadless: 'shell',
  },
};
