# 004. Documentation

Last update: 5.04.2022

## Background

An important artifact on any Design System is the documentation we provide to our users. This documentation should
include all details necessary to help them integrate and use the tools provided, including the component library
(Web Components) and design library (Figma)

## 4.1 Tooling

To allow us to start small but at the same time bring value to our users, we spike a couple of alternative tools that
will allow us create this documentation artifact.

### Options

#### Assets EC Design System

The Assets team developed their
own [tool to documet guidelines and showcase components](https://www.otto.de/design-system/) for their Design System.
While this is a tool with great potential, it wasn't build to be used by other teams therefore, many dependencies are
tightly coupled making the use of it needing some work at the start. We decided that there are more streamline solutions
currently available that will allow us to start our documenting process early, and explore how our documentation
artifact can evolve in the future.

#### Docsify

[Docsify](https://docsify.js.org/#/) is the most straight forward tool of all. It will format and serve .md files out of
the box. It also supports plugins that make the library extensible. Is a great solution to consider whenever we have the
capacity to write our own plugins to display components the way we want. A good example of usage of this too is
[Sholace](https://shoelace.style/), in which case they build many of their own plugins. For now, Storybook gives more of
this features out of the box.

#### Storybook (chosen tool)

[Storybook](https://storybook.js.org/docs/web-components/get-started/introduction) is a widely known tool for this
specific use case of building component libraries. It already provides functionallity that allows developers to
understand how components work and enough customization to let us compose our own documentation structure. The only
downside is that many things are not customizable and up to some extent, not very user friendly. We concluded that it is
a great tool to start and we can evolve in the future to lickely write plugins for a tool like Docsify. 
