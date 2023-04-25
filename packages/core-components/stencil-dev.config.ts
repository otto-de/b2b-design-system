import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

const dev: boolean = process.argv && process.argv.indexOf('--dev') > -1;
const apiEnv: string = dev ? 'dev' : 'prod';

export const config: Config = {
  namespace: 'b2b-core-components',
  globalStyle: 'src/global/b2b-styles.scss',
  env: {
    env: apiEnv,
  },
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      indexHtml: './html/index.html',
      copy: [{ src: './html/*', dest: './', warn: true }],
    },
  ],
  plugins: [sass()],
};
