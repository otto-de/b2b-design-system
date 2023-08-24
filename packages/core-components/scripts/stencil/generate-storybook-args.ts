/*
This script is used by Stencil to output the component docs in the format
used in Storybook (ArgTypes). Storybook wasn't inferring correctly all the information
from the component, so we automate this with this script.
*/

// @ts-ignore
import fs from 'fs';
import { JsonDocs } from '@stencil/core/internal';
import {
  JsonDocsComponent,
  JsonDocsProp,
} from '@stencil/core/internal/stencil-public-docs';
import type { ArgTypes, InputType } from '@storybook/csf/dist';

const hasOptions = prop => prop.values.length > 1;
const isBoolean = prop => prop.type === 'boolean';

const setDefaultValue = (propData, prop) => {
  propData.table = {
    ...propData.table,
    defaultValue: { summary: prop.default },
  };
};

const setOptions = (propData, prop) => {
  if (hasOptions(prop) && !isBoolean(prop)) {
    propData.options = prop.values.map(option => option.value);
  }
};

const setType = (propData, prop) => {
  const type = prop.values[0].type;
  propData.table = {
    ...propData.table,
    type: { summary: type },
  };
};

const setDefaultControls = (propData, prop) => {
  if (hasOptions(prop)) {
    propData.control = { type: 'radio' };
  } else if (isBoolean(prop)) {
    propData.control = { type: 'boolean' };
  }
};

const generateStorybookArgs = (docsData: JsonDocs) => {
  const componentsArgTypes: ArgTypes = {};

  docsData.components.map((component: JsonDocsComponent) => {
    const componentData = {};

    component.props.map((prop: JsonDocsProp) => {
      const propData: InputType = {};

      setOptions(propData, prop);
      setDefaultControls(propData, prop);
      setType(propData, prop);
      setDefaultValue(propData, prop);
      propData.description = prop.docs;

      componentData[prop.name] = propData;
    });

    componentsArgTypes[component.tag] = componentData;
  });

  fs.writeFileSync(
    './src/docs/config/components-args.json',
    JSON.stringify(componentsArgTypes, null, 2),
  );
};

export default generateStorybookArgs;
