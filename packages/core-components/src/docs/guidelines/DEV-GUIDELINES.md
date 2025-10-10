# Development Guidelines

- [Contributions Overview](#contributions-overview)
- [Maintainers](#maintainers)
- [License](#license)
- [Project lifecycle state](#project-lifecycle-state)
- [Technical Overview](#technical-overview)
- [Installation](#installation)
  - [New dependencies](#new-dependencies)
- [Committing code](#committing-code)
    - [Examples](#examples)
    - [Types of changes](#types-of-changes)
- [Creating new components](#creating-new-components)
  - [Local development](#local-development)
  - [Local build script](#local-build-script)
  - [Documentation](#documentation)
  - [Testing](#testing)
    - [Visual Regression tests](#visual-regression-tests)
    - [Making changes to the docker image](#making-changes-to-the-docker-image)
- [Modifying or creating new tokens](#modifying-or-creating-new-tokens)
  - [Tokens documentation](#tokens-documentation)
- [ADRs](#adrs)
- [Contribution Checklist](#contribution-checklist)

## Contributions Overview

If you are part of an Otto team, feel free to make a PR from a fork of this repo and post the PR in BlaBlaFish teams channel.

If you are an external contributor, please first create an issue in GitHub to find a great task you can contribute to. If is a simple change, feel free to make a PR from a fork of this repo.

## Maintainers

This project is maintained by [MAINTAINERS](https://github.com/otto-de/b2b-design-system/blob/main/MAINTAINERS)

## License

This project is licensed under the [LICENSE](https://github.com/otto-de/b2b-design-system/blob/main/LICENSE)

## Project lifecycle state

This project lifestyle state here [OSSMETADATA](https://github.com/otto-de/b2b-design-system/blob/main/OSSMETADATA)

## Technical Overview

This project is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that makes use
of [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces#using-workspaces) containing the source code of the 3 packages we distribute:

- @otto-de/b2b-core-components
- @otto-de/b2b-react-components
- @otto-de/b2b-tokens

Currently, we use [Stencil](https://stenciljs.com/docs/introduction) to create our web components and output bundles.
We expose a native web components package for Vue consumers and a React wrapper for React consumers, mainly because 
React still does not support web components fully out of the box.

For our Design Tokens we use [Style Dictionary](https://amzn.github.io/style-dictionary/#/README) to create our outputs. This tool would allow easy configuration 
for theming and will support mobile outputs if that is needed in the future.

## Installation

In the root directory run:

```
npm i
```

This will install all packages dependencies and create npm links (symlink) between the packages that depend on each other.

After initial install you can run `npm i --ignore-scripts` to ignore the `prepare` script.

### New dependencies

To install new dependencies run

`npm install <package> [--save-dev] -w <name of workspace package>`

```
npm install eslint --save-dev -w @otto-de/b2b-core-components 
```

You can run any command in the workspace packages using the same pattern:

`npm <command> -w <name of workspace package>`

```
npm test -w @otto-de/b2b-core-components 
```

our workspaces are:
`@otto-de/b2b-core-components`
`@otto-de/b2b-react-components`
`@otto-de/b2b-tokens`

## Committing code

When you are ready to commit and push your code we have a couple of tools in place that will check your commit message and lint your changes.

If your changes do not need to run tests, you can push with this flag:

```shell
git push --no-verify
```

We use semantic-release to automate our release process. To be able to achieve this, our commit messages must follow
the [Angular Commit Message Conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format): `<type>(<scope>): <subject>`

The `(context) `
of the commit will display in the changelog, so we recommend using it specially referring to the component the commit
is changing `feat(Button): add click event emmiter`

We are also able to use a JIRA ticket id so that the commit is linked in the Jira ticket if one exist.

#### Examples

```sh
feat(core): [TICKET-ID] add button component
feat(tokens): [TICKET-ID] add size tokens
fix(button): [TICKET-ID] some bug fix
```

#### Types of changes

- feat: A new feature (trigger a release)
- fix: A bug fix (trigger a release)
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- ci: Changes related to infrastructure, gitHub actions
- chore: Changes to the build process or auxiliary tools and libraries such as documentation
  generation, or linting

When we trigger a release from gitHub actions merge to main or beta, our pipeline will trigger a release using
[semantic-release](https://github.com/semantic-release/semantic-release).
This tool determines the release version based on the largest semantic version within the
available commits:

- breaking change: major
- feat: minor
- fix: patch

## Creating new components

For creating new components we suggest getting familiar with the [Stencil documentation](https://stenciljs.com/docs/introduction) and be inspired by the components we have already provided. 

### Local development

For local development we use the Stencil server. In `src/html` you will
find simple `html` files where you can add your new component for testing. You can run the testing server with this 
command:

```shell
cd packages/core-components/
npm run start
```

### Local Build Script

For the ease of development and testing process, a new script has been added named `local_build_script.sh` in the root
directory. This script helps with automating the build and test process to speed up local testing post development.


From the project's root directory execute:
```shell
./local_build_script.sh
```

The script offers some options to customise the build process based on the developer's needs.
These are the options which are currently supported by the script:

```text
Options:
    --reset-local-changes        Reset local changes (git reset HEAD --hard)
    --run-storybook              Start Storybook development server after build
    --update-snapshots           Update existing test snapshots
    --skip-tests                 Skip running tests (faster build)
    --skip-snapshot-tests        Skip running snapshot tests
    --skip-docker                Skip Docker image build
    --verbose                    Enable verbose output
    --help                       Show this help message

Incompatible Option Combinations (script will exit early if detected):
    ❌ --update-snapshots + --skip-snapshot-tests
       → Cannot update snapshots if snapshot tests are skipped
    
    ❌ --update-snapshots + --skip-docker  
       → Cannot update snapshots without Docker (snapshot tests run in Docker)
    
    ℹ️  Auto-adjustments:
    • --skip-docker automatically enables --skip-snapshot-tests
      (since snapshot tests require Docker to run)

Examples:
    ./local_build_script.sh                              # Standard build
    ./local_build_script.sh --reset-local-changes --skip-tests
    ./local_build_script.sh --update-snapshots --verbose
    ./local_build_script.sh --skip-docker --skip-tests   # Fast local development
    ./local_build_script.sh --run-storybook --verbose    # Full build with Storybook
```

### Documentation

We currently use Storybook to publish documentation of the usage of the components. In the future we also would 
like to publish design guidelines.

We try to keep the docs as close as possible to the code, so follow this patterns:

- write JSDoc in your components. A general overview and slots info at the top and some information for each prop. 
  You can follow [this guide](https://stenciljs.com/docs/docs-json#docs-json-data) for more information. 
- each component has 2 Storybook files: 

`component.stories.tsx` - Here you create a template for stories. Stories are specific states of the component that 
  you would like to use for the documentation, or specific states you would like to test with visual regression.

We have a script that autogenerate the arguments for Storybook args table. In the following example you can see how 
we use these arguments, and how we link the documentation file:

```tsx
import { getArgTypes } from '../../docs/config/utils';
import myComponentDocs from './my-component.docs.mdx';

const myComponentArgs = getArgTypes('b2b-my-component');

export default {
  title: 'Components/My Component',
  argTypes: myComponentArgs,
  viewMode: 'docs',
  parameters: {
    docs: {
      page: myComponentDocs,
    },
  },
} as Meta;
```
You can change the [control type](https://storybook.js.org/docs/react/essentials/controls#configuration) for any 
specific argument by passing a controls object that maps the name of the prop with the type of control:

```tsx
const controls = {
  size: 'radio',
};
const buttonArgs = getArgTypes('b2b-button', controls);
```

`component.docs.mdx` - Here you can write the usage documentation. Follow other components mdx documentation for 
  examples on the things you can do.

### Testing

We support unit, e2e and visual regression tests. For unit tests we use snapshot testing, and e2e uses a Stencil 
wrapper of Puppeteer. Please see other components for examples on how to write tests.

#### Visual Regression tests

We are using [Storybook test-runner](https://github.com/storybookjs/test-runner) together with [jest-image-snapshot](https://jestjs.io/docs/snapshot-testing) to automate visual regression tests. 

The way this test work is that we will take a screenshot of every story in Storybook. Test are configured in the file `.storybook/test-runner.ts` and there you can exclude stories if they are not supposed to be tested.

To be able to capture accurate and consistent renders of our components we need to run the tests in the same OS environment. Therefore, we use docker locally to run the tests in an Ubuntu machine that is the same one we use in the CI with GitHub actions.

If you are able to use [Docker Desktop](https://docs.docker.com/desktop/) you can use this tool, otherwise for Mac users [Colima](https://github.com/abiosoft/colima) is a good alternative.

Once you have one of this two runtime envs, you can follow these steps:

1. Run `docker-compose up` or `docker-compose up --build --abort-on-container-exit` if you have created the services before. This creates a storybook service
   and a service that runs the tests against storybook. If any test failed, you will find a new folder inside `__snapshots__` called `__diff_output__`.
2. If the differences were expected (because you made visual changes to an existing component), run `docker-compose run run-tests npx test-storybook --verbose --url http://storybook.local:6006 -u`
3. Once the testing is completed, run `docker-compose down` to stop the container.


#### Making changes to the docker image

To test changes to the docker image that contains the Storybook docs and CDN locally, you'll need to create a production build of Storybook first.

First, create a build of all components in the root folder:
```shell
npm run build
```

In the core-components folder, run:
```shell
npm run build:storybook
```

Copy the distribution to the storybook build folder:
```shell
cp -r dist docs-build/design-system
```

Afterwards, navigate back to the project root folder in the terminal and you can rebuild the docker image with your changes by running:
```shell
docker build -f Dockerfile -t b2bds-docs .
```
Now, start a container with the image by using:
```shell
docker run -it -p 80:80 b2bds-docs
```

Now you can navigate to the following:

| Path name | Description |
|--------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| /design-system                                                     | The Storybook app containing the docs.|
| /health                                                            | A simple health check.|
| /design-system/dist/b2b-core-components/b2b-core-components.css    | The distribution of our tokens.|
| /design-system/dist/b2b-core-components/b2b-core-components.esm.js | The entry file for our components. Additional components will be lazy-loaded on demand by this file. |

## Modifying or creating new tokens

Find more information about tokens in the [readme](https://github.com/otto-de/b2b-design-system/blob/main/packages/tokens/README.md)

### Tokens documentation
The tokens build generates a `.json` file that we are reading in our Storybook token stories to try to automate 
rendering the tokens tables. You can find this stories in `core-components/src/docs/tokens`

## ADRs

If you wonder why some tools are in place, you can find our technical decision records in the `ADRs` directory.

## Contribution Checklist

If you are currently or looking to start developing components for the B2B Design System, here's a quick check list to go over when you have finished a story to make sure you're all set to submit a PR:

- [ ] *Component*:
  - all `@Prop()`, `@Event()` and `@State()`decorators are commented
  - all `*.tsx` files related to the component have an appropriate component tag that relates to the file name
- [ ] *Styles*:
  - all components have a `<component-name>.scss` file associated in the `@Component()` decorator 
- [ ] *Tests*:
  - the component has at least an e2e test that covers all relevant interaction as well as edge cases
  - the component ideally has a snapshot test that shows changes in component structure
- [ ] *Docs*:
  - the component has a `<component-name>.stories.tsx` file that contains stories of all relevant states (also for screenshot testing)
  - the component has a `<component-name>.docs.mdx` file that contains usage guidelines and code examples
- [ ] *Visual Regression Tests*:
  - the component has screenshot tests for all stories / states
