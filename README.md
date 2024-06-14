# OTTO B2B DESIGN SYSTEM

## About

The B2B Design System is the library of components used to build the Otto Marketplace.
The goal of the B2B Design System is to provide frontend components that encapsulate styles and behaviour
for teams to use out of the box.

We wish to support different frontend frameworks and for this goal we are building this solution using [Web 
Components](https://www.webcomponents.org/) with [Stencil](https://stenciljs.com/docs/introduction).

You can find our documentation in [this link](https://b2b-design-system.otto.market/?path=/docs/overview--docs).

### Why open source?

The design system currently supports only the Otto Marketplace branding. But this can be easily configured by 
changing our design tokens. The main purpose for publishing our system is to become a source of inspiration for 
other teams creating similar products using Web Components. 

The system is actively maintained and our main contributors are our Otto Marketplace teams.

## Overview

This project is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that makes use
of [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces#using-workspaces) containing the source code of the 3 packages we distribute:

### @otto-de/b2b-core-components
[b2b-core-components](https://www.npmjs.com/package/@otto-de/b2b-core-components) - Core web components, can be used with Vue.

### @otto-de/b2b-react-components
[b2b-react-components](https://www.npmjs.com/package/@otto-de/b2b-react-components) - React wrapper library, exposes first class React components. Wrapper is created by Stencil.

### @otto-de/b2b-tokens
[b2b-tokens](https://www.npmjs.com/package/@otto-de/b2b-tokens) - These are atomic design decisions that can be used to 
centrally change the styles of our components. For more information about Design Tokens read  [here](https://specifyapp.com/blog/introduction-to-design-tokens).

## Development and Contributions

To start developing please follow the [dev-guidelines](https://github.com/otto-de/b2b-design-system/blob/main/DEV-GUIDELINES.md) to learn more about the tools we use and how to commit. 

If you want to contribute by developing a component or fixing a bug, our dev-guidelines provide you with insights on how to develop and test a new component, add tokens, write documentation and create visual regression tests. You can refer to [this checklist](https://github.com/otto-de/b2b-design-system/blob/main/DEV-GUIDELINES.md#contribution-checklist) to make sure you've got everything covered. Once you're happy with your work, you can submit a Pull Request. 

You can always open a discussion or [issue](https://github.com/otto-de/b2b-design-system/issues) if 
you have any improvement or suggestions.
