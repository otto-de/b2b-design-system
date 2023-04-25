#!/usr/bin/env node

/* In order to have proper IntelliSense when entering icon names, the icons need to be union types. To
achieve this, this script generates an array from all currently available icons and exports them as a union
type to be used in the icon component. Whenever a new icon is added and the package gets rebuilt, the name will be added. */

import * as fs from 'node:fs';
import * as path from 'node:path';

const iconTypeDir = './src/components/icon/types.ts';
const iconSVGDir = './src/components/icon/icons';

function generateIconTypes() {
  console.log('Generating icon types');
  let iconNames = [];
  fs.readdir(iconSVGDir, (err, files) => {
    files.forEach(file => {
      let fileName = path.parse(file).name;
      iconNames.push(fileName);
    });
    const data = `/* eslint-disable prettier/prettier */
export const iconTypes = ${JSON.stringify(iconNames, null, ' ')} as const
export type IconName = typeof iconTypes[number];`;
    fs.writeFileSync(iconTypeDir, data, err => {});
    console.log('Icon types updated ✅ \n');
  });
}

generateIconTypes();
