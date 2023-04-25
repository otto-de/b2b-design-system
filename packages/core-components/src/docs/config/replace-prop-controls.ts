export const replacePropControls = (componentArgs, controls?: any) => {
  componentArgs &&
    controls &&
    Object.keys(controls).map(prop => {
      if (componentArgs.hasOwnProperty(prop)) {
        componentArgs[prop].control = {
          type: controls[prop],
        };
      }
    });
  return componentArgs;
};
