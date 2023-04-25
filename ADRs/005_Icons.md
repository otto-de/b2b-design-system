# 005. Icons

Last update: 25.05.2022
## Status

proposed

## Context

We need to build an icon component to use both in our own, more complex components as well as for our users to replace the current OPC icon font.
The design team has made the decision to move away from the somewhat outdated icon font toward using SVGs. This simplifies their design process and
provides the end user of the component with more freedom to animate, color and resize or scale the icons.

The OPC icon font currently in use is sourced from a CDN that also provides global OPC styles a.k.a the OPC Design System. Therefore, developers need to
manually provide and update the font during local development, which can be tedious. 

Therefore, the option of using a CDN to provide the assets was not an option, instead we opted to directly distribute them with our components by including them
in the package via Stencil's `getAssetPath()`. The remaining question were how to store, request and cache the icons most effectively and efficiently.

## Options

1. Extract relevant path data from SVGs and store them as a json at build time (Paul C. Pederson approach)
    - Each build, a node script is run that extracts the SVG path data from the SVGs by use of the SVGson library
    - The resulting json is stored in the component and holds the relevant SVG path data as a string
    - The path to the individual json file is resolved at run time and the SVG path data gets loaded into the markup
    - Requests to retrieve the json file at run time are cached to improve performance
    - Pros: 
        - lightweight
        - conversion only happens at build time, so little overhead
        - only relevant data is transferred to the markup, no metadata cleanup necessary
    - Cons:
        - possibly strips away important information
        - hard to comply with design requirements regarding customizability
        - testing the approach showed issues with proper sizing using width, height and viewBox attrs
2. Ship SVGs directly and set icon content dynamically at runtime (Ionic and Shoelace approach)
    - Instead of running an extraction script, the SVG files are shipped with the Stencil build
    - The path to the icon is resolved at run time and the SVG element as a whole is fetched and loaded into the markup
    - Requests are cached and stored in a map to improve performance
    - Pros:
        - more freedom regarding customizability
        - easier to debug
        - less error-prone
    - Cons:
        - increases volume of data that needs to be fetched
        - might be cumbersome in a microfontend approach as icons will be fetched multiple times across different microfrontends

## Decision

We have decided to go with the second approach, simply to be able to ensure that the icons will look the same in all contexts, especially ones we cannot control directly.

## Consequences

As we're shipping more content from multiple applications, page bloat and fetching redundant data will be an issue with both approaches.
Ideally, further investigations into how this will affect page loading speed and bundling should be made, ideally before widespread adoption of the component.

## Links

[https://ionic.io/ionicons](Ion Icons Documentation)
[https://paulcpederson.com/articles/stencil-icons/](Blog Article describing Icons in Stencil by Paul C. Pederson)
