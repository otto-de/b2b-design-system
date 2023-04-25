# b2b-tooltip



<!-- Auto Generated Below -->


## Overview

The tooltip can display additional information, and will be visible based on
a specific trigger.

## Properties

| Property   | Attribute  | Description                                                                                                                                 | Type                                     | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `content`  | `content`  | The content of the tooltip. Should be a string. If you need custom content like a b2b-link, use the named slot content.                     | `string`                                 | `undefined` |
| `opened`   | `opened`   | Whether the tooltip is currently opened or not. When the trigger is set to custom, changing this prop will change the tooltip's visibility. | `boolean`                                | `false`     |
| `position` | `position` | Position of the tooltip.                                                                                                                    | `"bottom" \| "left" \| "right" \| "top"` | `'right'`   |
| `trigger`  | `trigger`  | The trigger for the tooltip. Can be on hover, on focus or custom, i.e. for an onboarding sequence. Per default it is hover.                 | `"custom" \| "focus" \| "hover"`         | `'hover'`   |


## Slots

| Slot          | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| `"(default)"` | The wrapped element main content.                                  |
| `"content"`   | Use to pass custom content to the tooltip, like an icon or a link. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
