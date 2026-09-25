#!/usr/bin/env node

/* In order to have proper IntelliSense when entering icon names, the icons need to be union types. To
achieve this, this script generates an array from all currently available icons and exports them as a union
type to be used in the icon component. Whenever a new icon is added and the package gets rebuilt, the name will be added. */

import * as fs from 'node:fs';
import * as path from 'node:path';

const sourceDirs = [
  'src/components/icon/icons',
  'src/components/icon-100/icons-100',
  'src/components/icon-50/icons-50',
];
const goalDirs = [
  'src/components/icon/types.ts',
  'src/components/icon-100/types.ts',
  'src/components/icon-50/types.ts',
];

function generateIconTypes() {
  console.log('Generating icon types');
  sourceDirs.forEach((sourceDir, index) => {
    let iconNames = [];
    fs.readdir(sourceDir, (err, files) => {
      if (err) {
        console.error(`Error reading directory ${sourceDir}: ${err}`);
        return;
      }
      files.forEach(file => {
        let fileName = path.parse(file).name;
        iconNames.push(fileName);
      });
      const iconTypesContent = JSON.stringify(iconNames, null, 2)
        .replaceAll('"', "'") // Use single-quotes
        .replace("'\n]", "',\n]"); // Add `,` after last element
      const data = `export const iconTypes = ${iconTypesContent} as const;
export type IconName = (typeof iconTypes)[number];
`;
      fs.writeFileSync(goalDirs[index], data, err => {
        if (err) {
          console.error(`Error writing to file ${goalDirs[index]}: ${err}`);
          return;
        }
        console.log(`Icon types updated for ${sourceDir} ✅`);
      });
    });
  });
}

generateIconTypes();
