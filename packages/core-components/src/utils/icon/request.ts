import { Env, getAssetPath } from '@stencil/core';
import { ICON_PATH } from '../resources';

export const iconContent = new Map<string, string>();
const requests = new Map<string, Promise<any>>();

export const fetchIcon = (icon: string) => {
  // see if we already have a request for this url
  let req = requests.get(icon);

  if (req === undefined || null) {
    if (typeof fetch !== 'undefined' && typeof document !== 'undefined') {
      // we don't already have a request
      req = fetch(icon).then(rsp => {
        if (rsp.ok) {
          return rsp.text().then(svgContent => {
            iconContent.set(icon, svgContent || '');
          });
        }
        iconContent.set(icon, '');
      });

      // cache for the same requests
      requests.set(icon, req);
    } else {
      // set to empty for ssr scenarios and resolve promise
      iconContent.set(icon, '');
      return Promise.resolve();
    }
  }

  return req;
};

export const buildPath = (icon: string, folderName: string) => {
  // fetch icons from local dir for development
  if (Env.env === 'dev') {
    return getAssetPath(`./${folderName}/${icon}.svg`);
  } else if (folderName === 'icons') {
    return `${ICON_PATH}/icons/${icon}.svg`;
  } else {
    return `${ICON_PATH}/${folderName}/${icon}.svg`;
  }
};
