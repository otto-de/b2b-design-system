# B2B DESIGN TOKENS

Design tokens represent atomic design decisions that can be centralised and easily change. Our components use design
tokens, and we recommend teams to also use them when building components of their own.

We use the tool [Style Dictionary](https://amzn.github.io/style-dictionary/#/) to generate automatically token outputs.
The tokens are structured and written as .json files, and the build.js file parse them and outputs the build .css tokens.

We have 3 categories for tokens: `colors` `font` `size`

When adding new tokens try to follow the patterns already present:


### base file
This file contains raw values and can be extended if there are new values that need to be added
Update the docs here if new colors are added, packages/core-components/src/docs/tokens/color.stories.tsx

### .default files
This files will output the default tokens for a normal theme*.

### .dark files
Part of the POC for theming*. Only button and font may be extended to keep the POC alive.


* About theming: the current theming (dark) is just a proof of concept that was implemented to validate the tool we 
  are using. You do not have to implement a dark version of your tokens when working in extending them.

## Build tokens

```
npm run build
```

This will generate new .css files that at already consumed by the core library. 
