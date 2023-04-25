import Path from 'path';
import purgecss from '@fullhuman/postcss-purgecss';

const purgeCSSExtensionPlugin = function (opts: any) {
  if (typeof opts === 'undefined') throw new Error('PurgeCSS plugin does not have the correct options');
  return {
    postcssPlugin: 'extended-purgecss',
    OnceExit(root: any, helpers: any) {
      const dirname = Path.dirname(root.source?.input?.file);
      return purgecss({
        content: [dirname + '/*.tsx'],
        variables: true,
        rejected: true,
        // deactivated until we move to global styles
        fontFace: false,
        //Obtained from https://github.com/Poimen/stencil-tailwind-plugin#purge-setup
        safelist: {
          standard: [':root', ':host', ':shadow', '/deep/', '::part', '::theme', /^data-theme/],
          greedy: [new RegExp('b2b-' + Path.basename(dirname))],
        },
        // @ts-ignore
      }).OnceExit(root, helpers);
    },
  };
};
purgeCSSExtensionPlugin.postcss = true;

export default purgeCSSExtensionPlugin;
