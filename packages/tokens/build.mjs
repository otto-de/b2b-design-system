import StyleDictionaryPackage from 'style-dictionary';
import { fileHeader, formattedVariables } from 'style-dictionary/utils';
import groupBy from 'lodash/groupBy.js';

const themes = ['default', 'dark'];
const platform = 'web';

/*
 * Register a new formatter that will output tokens grouped in a theme class.
 * This could also be changed to a [data-theme] or other type of selector.
 */
StyleDictionaryPackage.registerFormat({
  name: 'css/variables-themed',
  format: function ({ dictionary, file, options }) {
    const { outputReferences, theme } = options;
    let selector = `:root [data-theme="${theme}"]`;

    if (theme === 'default' || theme === 'deprecated') {
      selector = `:root, :host`;
    }

    return Promise.resolve(fileHeader({ file })).then(header => {
      return `${header}\n${selector} {\n${formattedVariables({
        format: 'css',
        dictionary,
        outputReferences,
      })}\n}\n`;
    });
  },
});

/*
 * Register a new formatter that will output tokens data to use in documentation.
 * Outputs a json object grouped by category (color, size, font) and type (token main name)
 */
StyleDictionaryPackage.registerFormat({
  name: 'javascript/docs',
  format: function ({ dictionary, file, options }) {
    const groupedByCategory = groupBy(dictionary.allTokens, token => token.attributes.category);
    const groupedByColor = groupBy(groupedByCategory.color, token => token.attributes.type);
    const groupedByFont = groupBy(groupedByCategory.font, token => token.attributes.type);
    const groupedBySize = groupBy(groupedByCategory.size, token => {
          // Testing if is a base value, current used for sizes as the base types could be grouped together
          const isANumber = string => /\d/.test(string);
          if (isANumber(token.attributes.type)) {
            return 'base';
          }
          return token.attributes.type;
        });

    const tokensData = { color: groupedByColor, size: groupedBySize, font: groupedByFont };
    return JSON.stringify(tokensData, null, 2);
  },
});

const getThemeConfig = themeName => {
  return {
    source: ['src/**/*base.json', `src/**/*${themeName}.json`],
    platforms: {
      [platform]: {
        prefix: 'b2b',
        buildPath: `build/`,
        transforms: ['attribute/cti', 'name/kebab', 'color/css', 'size/rem'],
        files: [
          {
            destination: `css/${themeName}.css`,
            format: `css/variables-themed`,
            options: {
              outputReferences: true,
              theme: `${themeName}`,
            },
          },
          {
            destination: `js/${themeName}.json`,
            format: `javascript/docs`,
            options: {
              outputReferences: true,
              theme: `${themeName}`,
            },
          },
        ],
      },
    },
  };
};

console.log('\n==============================================');
console.log(`\nBuilding Design Tokens`);
themes.map(function (theme) {
  console.log(`\n${theme} theme`);

  const StyleDictionary = new StyleDictionaryPackage(getThemeConfig(theme));
  StyleDictionary.buildPlatform(platform);
});
console.log('\n==============================================');
