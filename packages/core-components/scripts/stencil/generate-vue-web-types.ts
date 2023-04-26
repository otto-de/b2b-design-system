/*
This script is used by Stencil to output from component docs to the WebTypes
format used by IntelliJ IDEs, to help with code completion and syntax.
For more information you can see https://github.com/JetBrains/web-types
*/

import fs from 'fs';
import { JsonDocs, JsonDocsEvent, JsonDocsSlot } from '@stencil/core/internal';
import {
  JsonDocsComponent,
  JsonDocsProp,
} from '@stencil/core/internal/stencil-public-docs';

const formatValues = propValues =>
  propValues
    .split('|')
    .map(s => s.trim())
    .join(', ');

const generateVueWebTypes = (docsData: JsonDocs) => {
  const components = [];

  docsData.components.map((component: JsonDocsComponent) => {
    const componentName = component.tag;
    const attributes = [];
    const slots = [];
    const events = [];
    const docUrl =
      'https://internal.otto.market/design-system/?path=/story/overview--page';

    component.props.map((prop: JsonDocsProp) => {
      const name = prop.attr || prop.name;
      const valuesString = `\r\nValues: ${formatValues(prop.type)}`;
      attributes.push({
        name: name,
        description: prop.docs + `${valuesString}`,
        required: prop.required,
        default: prop.default,
        value: {
          kind: 'expression',
          type: prop.type,
        },
      });
    });

    component.events.map((event: JsonDocsEvent) => {
      let eventName = event.event;
      if (eventName.toLowerCase().startsWith(componentName.toLowerCase())) {
        eventName = 'on' + eventName.substring(componentName.length);
      }
      events.push({
        name: eventName,
        description: event.docs,
        arguments: [
          {
            name: 'detail',
            type: event.detail,
          },
        ],
      });
    });

    component.slots.map((slot: JsonDocsSlot) => {
      slots.push({
        name: slot.name === '' ? 'default' : slot.name,
        description: slot.docs,
      });
    });

    components.push({
      'name': componentName,
      'doc-url': docUrl,
      'description': component.docs,
      'source': {
        module:
          '@otto-de/b2b-core-components' +
          component.filePath
            .replace('./src/', '/dist/types/')
            .replace('.tsx', '.d.ts'),
        symbol: componentName.substring(3),
      },
      attributes,
      slots,
      events,
    });
  });

  /* tags is deprecated in favour of elements. Unfortunately whe using
  elements Jetbrains does ot suggest value for props */
  const webTypes = {
    '$schema': 'http://json.schemastore.org/web-types',
    'framework': 'vue',
    'name': '@otto-de/b2b-core-components',
    'version': require('../../package.json').version,
    'js-types-syntax': 'typescript',
    'description-markup': 'markdown',
    'contributions': {
      html: {
        tags: components,
      },
    },
  };

  fs.writeFileSync('./dist/web-types.json', JSON.stringify(webTypes, null, 2));
};

export default generateVueWebTypes;
