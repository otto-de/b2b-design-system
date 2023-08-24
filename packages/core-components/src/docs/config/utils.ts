import componentsArgs from './components-args.json';
import { replacePropControls } from './replace-prop-controls';

/* Default controls can be changed by passing a controls object like so:
  { 'attribute-name': 'control-type' }
  example: { 'steps': 'select' }
  For all the control types see https://storybook.js.org/docs/react/essentials/controls#annotation
 */
export const getArgTypes = (componentTag: string, controls?: any) => {
  const componentDocs = componentsArgs[componentTag];
  return replacePropControls(componentDocs, controls);
};

/* Function to hide all arguments from a single story.
 I wasn't able to find a way to do this in Storybook.
 * This can be used like so:
 * storyName.argTypes = hideAllControls(storyArgTypes);
 * If you find a better way, remove this function and use Storybook solution
 * */
export const hideAllControls = (argTypes: any) => {
  const argsWithHiddenControls = {};
  Object.keys(argTypes).map(key => {
    argsWithHiddenControls[key] = { table: { disable: true } };
  });
  return argsWithHiddenControls;
};
