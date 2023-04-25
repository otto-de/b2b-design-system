# 006. Shadow DOM

Last Update: 13.09.2022

## Status

accepted

## Context

While building components using Stencil without turning on the Shadow DOM, we faced several issues that pertain to browser's shadow DOM API and its mechanisms.

Firstly, slotted content couldn't be dynamically updated by the consuming application. Triggering a rerender of the slotted content inside the consuming application
would not appropriately rerender the Stencil component, causing all applied styles within the Stencil component to get lost. This greatly limits the usage of components
with slotted content. 

The second issue related to switch cases not being updated dynamically within a component template. Changing attributes of components dynamically in the consuming application
would not trigger a proper rerender within the Stencil component either, leading to the problem described above.

Lastly, component styles, despite our best efforts to use very specific selectors, would be affected by global styles set by the consuming application. This put the burden
of actively changing global styles in order to use our components on developers, which we wanted to avoid. 

## Options

1. Not use the Shadow DOM
    - Refactor all components that use slots or switch cases to use workarounds instead
    - Try to overwrite styles in a global stylesheet for the Stencil application
2. Use a third-party fix for slots and general template behavior in the light DOM
    - There is an npm package that would fix the rerender issues, currently being maintained by a third party not directly working for Ionic
    - The package needs Stencil as a dependency, thus making us depend on active maintenance of said third party
    - Style encapsulation troubles would remain
3. Use Shadow DOM in components that need it
    - Refactor all affected components, including styles and tests
    - Build new components with Shadow DOM support in microfontend
    - Only use light DOM when there's a good reason, e.g. styling or compatibility

## Decision

Our decision to use the Shadow DOM API wherever possible is based on several considerations. 

First, the Shadow DOM API is supported by every modern browser and has been maintained for a while. It is unlikely to be dropped anytime soon.

We will improve developer experience by encapsulating our styles completely, making our components safer and easier to use.
Being able to fully utilize slots gives us greater flexibility regarding component templates as well as precise styling with CSS-parts and other
pseudo-selectors that are used in combination with Shadow DOM. 
The components will behave more predictable and a known source for unintended behavior will be eliminated.

Additionally, there is little evidence that Stencil will provide a fix for using slots within the light DOM anytime soon, as the corresponding PR has been open for a while.

As we're building the Design System from the ground up with the current tool set, there are no existing style systems like BEM or Atomic that would normally affect global styles and would need heavy refactoring to be compatible with the Shadow DOM. This reduces our implementation effort of the proposed changes.

However, there are some drawbacks to using the Shadow DOM. As older versions of Safari don't completely support Shadow DOM, we will have to test extra carefully.
In addition, since all styles are completely encapsulated inside each component, style and variable duplication and resulting CSS bloat is something to look out for.
At least in a dev environment, no differences were spotted between both implementations though. Further tests might be needed here.

To summarize, switching to Shadow DOM makes our application safer for consumers and more predictable for us, while having only minor possible drawbacks to consider.

## Consequences

The decision to utilize Shadow DOM functionality where possible will impact several aspects of our project structure.

1. Testing Strategy
    - In our unit tests, we're currently doing a HTML comparison between the custom element and what markup is eventually rendered. We will either have to refactor components to include mocked shadow roots or we will have to drop HTML comparison entirely
    - In case of switching away from direct HTML comparison, we will have to adjust e2e testing to check better for attribute changes
2. Styles
    - Existing component styles need to be refactored to address Shadow DOM content instead. This includes
        - Exchanging `b2b-cmp-name` prefix to `:host` selector wherever the component is wrapped in a host element or css-classes are applied to a host element directly
        - Using the `::slotted()` pseudo-selector to target slot styles. This also allows us to only style elements that have certain classes, giving us a more precise way to target content. This is only necessary, however, if the slotted content is not part of our component markup.
        - Using CSS parts with the `::part()` pseudo-selector. This makes element styles with named parts, i.e. `part="heading"` available to the consuming application, where normally all Shadow DOM component styles would be completely encapsulated.
        - There are [inheritable properties](https://lamplightdev.com/blog/2019/03/26/why-is-my-web-component-inheriting-styles/) that will still trickle down to shadow dom elements when defined in 
          the body for example. Is good to keep this in mind.
3. Events
   - Only [composed](https://developer.mozilla.org/en-US/docs/Web/API/Event/composed) events propagate across the shadow DOM boundary into the light DOM. In regard to form elements,
     the `input` event is composed whereas the `change` event is not.

Additionally, some older versions of Safari only have limited Shadow DOM support. This might increase our testing efforts and may restrict Shadow DOM usage.

## Links

[https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM](MDN on Shadow DOM)

Source: [https://adr.github.io/](https://adr.github.io/)
Template Source: [https://github.com/joelparkerhenderson/architecture-decision-record/blob/main/templates/decision-record-template-by-michael-nygard/index.md](https://github.com/joelparkerhenderson/architecture-decision-record/blob/main/templates/decision-record-template-by-michael-nygard/index.md)
