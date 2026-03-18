# Module: layout_and_content_components

## Module Ownership
- **Primary Responsibility:** Provide all layout primitives, typographic display components, and general-purpose UI building blocks: `b2b-grid`, `b2b-card`, `b2b-background-box`, `b2b-scrollable-container`, `b2b-separator`, `b2b-headline`, `b2b-paragraph`, `b2b-label`, `b2b-chip-component`, `b2b-rounded-icon`, and `b2b-button`. Also owns the global SCSS layer (`src/global/`) that bootstraps token CSS variables and OttoSans font-face declarations for all components.
- **Explicit Non-Responsibilities:** Does not own design token source files (owned by `tokens`); does not own SVG icon rendering (owned by `icon_system`); does not own form/input controls (owned by `form_components`); does not own feedback/overlay UI (owned by `feedback_and_overlay_components`); does not own navigation-specific state logic (owned by `navigation_components`).
- **Integration Boundaries:**
  - `consumes ← tokens` (build-time): `src/global/b2b-styles.scss` directly `@import`s `@otto-de/b2b-tokens/build/css/default.css` and `dark.css` — making token CSS custom properties globally available to all components via Shadow DOM inheritance. All component SCSS files `@use '../../global/b2b-styles'` to inherit this layer.
  - `consumes ← shared_utilities/form.interface` (compile-time): `b2b-chip-component` imports `ChipComponentEventDetail` from `utils/interfaces/form.interface.d.ts`.
  - `produces → navigation_components` (runtime, consumed as child): `b2b-button` rendered by `b2b-pagination`; `b2b-separator` rendered by `b2b-tab-group`; `b2b-rounded-icon` rendered by `b2b-wizard-icon`.
  - `produces → feedback_and_overlay_components` (runtime, consumed as child): `b2b-headline` rendered by `b2b-modal` header.
  - `produces → react_components` (indirect): All components included in the Stencil React output-target proxy generation.

---

## Entry Points

| Tag | Component | Primary Role |
|-----|-----------|-------------|
| `<b2b-grid>` | `B2bGridComponent` | Padded grid container wrapper; configurable inner padding via `margin` prop |
| `<b2b-card>` | `CardComponent` | Clickable/focusable card surface; optional `href` for anchor-style navigation; emits `b2b-selected` on click or Enter |
| `<b2b-background-box>` | `BackgroundBoxComponent` | White surface container with configurable per-side borders and optional max-width (1212px) / no-padding modes |
| `<b2b-scrollable-container>` | `ScrollableContainerComponent` | Overflow-scroll wrapper with fixed height; slots all content |
| `<b2b-separator>` | `B2bSeparatorComponent` | Horizontal or vertical visual divider line |
| `<b2b-headline>` | `HeadlineComponent` | Semantic heading (`h1`/`h2`/`h3`) mapped from size `400`/`200`/`100`; configurable alignment and margin |
| `<b2b-paragraph>` | `ParagraphComponent` | Styled `<p>` element; configurable weight, size, alignment, margin, colour variant, and display mode |
| `<b2b-label>` | `LabelComponent` | Inline status badge (`neutral`/`info`/`success`/`warning`/`error`) rendered as a styled `<span>` |
| `<b2b-chip-component>` | `B2bChipComponent` | Dismissible chip with optional close button; emits `b2b-close` with `ChipComponentEventDetail { value }` |
| `<b2b-rounded-icon>` | `RoundedIconComponent` | Circular container accepting an `icon` slot and a `text` slot; background, border, and content colours fully configurable via props |
| `<b2b-button>` | `ButtonComponent` | Primary action button; supports `primary`/`secondary` variants, two sizes, loading state (inline spinner), active state, and optional `href` anchor mode |
| **Global styles** | `src/global/b2b-styles.scss` + `src/global/_typography.scss` | Imports token CSS variables (default + dark) and declares OttoSans `@font-face` rules as the shared visual foundation |

---

## FLOW 1: Global Style Bootstrap

- **Trigger:** Stencil build processes `stencil.config.ts` which declares `globalStyle: 'src/global/b2b-styles.scss'`.
- **Steps:**
  1. `b2b-styles.scss` uses `@use 'typography'` to inject all `@font-face` declarations for OttoSans (normal, bold, thin weights) and ObcIcons.
  2. `b2b-styles.scss` `@import`s `@otto-de/b2b-tokens/build/css/default.css` (makes token CSS custom properties available on `:root, :host`) and `dark.css` (makes dark-theme overrides available on `:root [data-theme="dark"]`).
  3. The resulting global stylesheet is injected once into the document `<head>` by the Stencil runtime, making all CSS custom properties and font-faces available to every component's Shadow DOM via inheritance.
- **Exit Point:** All `--b2b-*` CSS custom properties and OttoSans font-family available globally; dark theme activatable by adding `data-theme="dark"` to any ancestor element.
- **Impacted Areas:** `src/global/b2b-styles.scss`, `src/global/_typography.scss`, `packages/tokens/build/css/default.css`, `packages/tokens/build/css/dark.css`.

---

## FLOW 2: Button — Render & Interaction

- **Trigger:** Consumer declares `<b2b-button>` with desired `variant`, `size`, `width`, and optional `href`.
- **Steps:**
  1. Without `href`: renders a native `<button>` element. `type` prop maps to `button`/`submit`/`reset`. Click is handled natively by the browser.
  2. With `href`: renders an `<a>` element inside the button host for anchor-style navigation (supports `target` and `download`).
  3. `loading=true`: hides the slot text and renders an inline `<b2b-spinner>` instead.
  4. `active=true` reflects to host attribute and applies the active CSS state (used by `b2b-pagination` for the current page button).
  5. `disabled=true` reflects to host attribute; propagates `disabled` to the native `<button>` and adds disabled ARIA attribute.
  6. `@Method async setFocus()`: programmatically focuses the inner native button/anchor element.
  7. `@Listen('click')`: swallows click events when `disabled=true` to prevent form submission.
- **Exit Point:** Native browser click/submit handled; no custom event emitted.
- **Impacted Areas:** `src/components/button/button.tsx`, `src/components/button/button.scss`.

---

## FLOW 3: Card — Selection & Navigation

- **Trigger:** User clicks or presses Enter on a `<b2b-card>`.
- **Steps:**
  1. Without `href`: card rendered as a focusable `div` (tabIndex=0). `@Listen('click')` and `@Listen('keydown')` (Enter key) emit `b2b-selected` (`void`).
  2. With `href`: card renders an inner `<a>` element; the `<a>` has native focus so `tabIndex` is set to empty string to avoid double-focus. The `<a>` handles navigation natively.
  3. `disabled=true`: tabIndex set to -1; aria-disabled set to true; `b2b-selected` is not emitted.
- **Exit Point:** `b2b-selected` event (void) emitted, or native anchor navigation occurs.
- **Impacted Areas:** `src/components/card/card.tsx`.

---

## FLOW 4: Chip — Dismissal

- **Trigger:** User clicks the close button or presses Enter on a `<b2b-chip-component>`.
- **Steps:**
  1. Close button click or Enter keydown: `onClick` / `onKeyDown` check `disabled`; if allowed, emit `b2b-close` with `ChipComponentEventDetail { value }`.
  2. Consumer receives the event and removes the chip from its list (the chip does not self-remove from the DOM).
  3. `hasCloseButton=false` hides the close button entirely; chip becomes non-dismissible.
- **Exit Point:** `b2b-close` event dispatched with the chip's `value` prop.
- **Impacted Areas:** `src/components/chip/chip.tsx`, `src/utils/interfaces/form.interface.d.ts`.

---

## FLOW 5: Headline & Paragraph — Typographic Rendering

- **Trigger:** Consumer declares `<b2b-headline size="...">` or `<b2b-paragraph weight="...">`.
- **Steps:**
  1. `b2b-headline`: `size` prop selects the rendered semantic element (`400`→`<h1>`, `200`→`<h2>`, `100`→`<h3>`). Alignment and margin CSS classes applied. Slot receives text content.
  2. `b2b-paragraph`: renders a `<p>` with inline `display` style and compound CSS classes for weight, size, alignment, margin, and colour variant. `display` prop supports `inline`/`inline-block`/`block` layouts.
- **Exit Point:** Semantic HTML heading or paragraph element rendered with token-driven typography styles.
- **Impacted Areas:** `src/components/headline/headline.tsx`, `src/components/paragraph/paragraph.tsx`.

---

## FLOW 6: Rounded Icon — Slotted Icon/Text Container

- **Trigger:** Consumer declares `<b2b-rounded-icon>` with `icon` and/or `text` named slots.
- **Steps:**
  1. Background circle rendered as a `div` with inline `background-color` and `border` styles driven by `color` and `borderColor` props (any valid CSS value accepted).
  2. `slot="icon"` content (typically a `b2b-icon-100`) displayed inside the circle with `contentColor` applied as the CSS `color` property (drives SVG fill via `currentColor`).
  3. `slot="text"` content (a `<span>` with a step number) displayed alongside the icon slot.
- **Exit Point:** Circular badge rendered; no events emitted.
- **Impacted Areas:** `src/components/rounded-icon/rounded-icon.tsx`.
