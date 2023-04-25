# 001. Web Components

Date: 25.01.2022

### Status

accepted

### Context

As an organisation that values highly independent teams, we must consider supporting multiple JS framework usage in the frontend with our solution. Web Components are a set of native features that provide a component model that allows for encapsulation and interoperability of individual HTML elements (*). It is not ideal to write vanilla js to build them, but advisable to use a solution that will make writing components more efficient.

### Options

#### 1: Stencil (Chosen)

Stencil is a compiler that generates Web Components, it provides decorators that facilitate writing js classes and also uses JSX.The solution brings many useful tools out of the box for compiling outputs to different targets, including React. This outputs are typed and Stencil is easy to set up. They also have the ionic component library as a good starting point if we need examples to look at. The tool is consider a "black box", presenting issues including delayed support for issues and incomplete documentation, that need to be tackled with workarounds.

#### 2: Lit

A more lightweight and flexible option, Lit does not offer that much out of the box, which means a more complex and costly initial setup. In the other hand also means more control over our tooling and output results. Seems to be the preferred option for developers that have used both libraries, but also they have the experience to know what they want to customise and how to build things from scratch.


## Decision

Why Stencil?
Lit would give us more flexibility, but currently we don't know what kind of flexibility we need. On the current team set up we don't have the capacity to discover how to build this tooling from scratch and to evaluate if is a proper solution. With Stencil we will be able to start building components right away and solve other problems first, including integration with other teams, adoption and escalation of the library. After this has been solved, maybe is a good time to explore other options as we will have more clarity on what requirements we really have around bundling and typing, at which point, we might be able to decide to migrate to a more flexible technology.


## Links

[Stencil](https://stenciljs.com/docs/introduction)
[lit](https://lit.dev/)
[web components](https://www.webcomponents.org/)
[support for web components](https://custom-elements-everywhere.com/)
