# Module: icon_system

## Module Ownership
- **Primary Responsibility:** Provide all SVG icon rendering components (`b2b-icon`, `b2b-icon-100`, `b2b-icon-50`) and the icon-asset infrastructure: async SVG fetch/in-memory cache utility, CDN/local path resolution, and the build-time TypeScript type-generation script that derives `IconName` union types from SVG asset directories.
- **Explicit Non-Responsibilities:** Does not own design token definitions (owned by `tokens`); does not own the `b2b-rounded-icon` container component (a pure layout wrapper — owned by `layout_and_content_components`); does not own general-purpose CSS class utilities or focus management (owned by `shared_utilities`); does not own SCSS global styles (`layout_and_content_components`).
- **Integration Boundaries:**
  - `consumes ← tokens` (build-time): Consumes token CSS custom properties (e.g. `--b2b-size-40`, `--b2b-color-black-100`) via SCSS in component stylesheets.
  - `consumes ← shared_utilities/resources.ts` (runtime): Uses `ICON_PATH` constant from `utils/resources.ts` to construct remote CDN URLs for production icon fetching.
  - `produces → build_and_release_pipeline` (build-time): `scripts/generate-icon-types.mjs` is invoked as pre-step of `npm run build` in `core-components` (via `build:icons` script); it writes `types.ts` into all three icon component directories.
  - `produces → react_components` (indirect): Icon components are included in the Stencil React output-target proxy generation along with all other components.

---

## Entry Points

- **Entry Point:** `<b2b-icon icon="..." size="50|100|200" color="..." />` (Custom Element — deprecated)
  **Responsibilities:** Render a named SVG icon at one of three fixed size steps (50=16px, 100=24px, 200=32px); validate icon name against the supported list; fetch and cache SVG content from CDN or local asset path; apply colour fill via CSS class variant.

- **Entry Point:** `<b2b-icon-100 icon="..." size="{24–96}" color="..." />` (Custom Element — current generation)
  **Responsibilities:** Render a named 100-style SVG icon at any pixel size between 24 and 96px; validate icon name and size range; fetch and cache SVG content; apply colour fill.

- **Entry Point:** `<b2b-icon-50 icon="..." color="..." />` (Custom Element — current generation)
  **Responsibilities:** Render a named 50-style (small/compact) SVG icon at the fixed 50-scale size; validate icon name; fetch and cache SVG content; apply colour fill.

- **Entry Point:** `scripts/generate-icon-types.mjs` (Node.js build script)
  **Responsibilities:** Read SVG filenames from each icon asset directory; write `types.ts` files containing `iconTypes` const arrays and `IconName` union types into all three icon component directories.

---

## FLOW 1: Icon Render — Browser (all three components, nominal path)

- **Trigger:** A `b2b-icon`, `b2b-icon-100`, or `b2b-icon-50` element is mounted into the DOM via its `connectedCallback`, or its `icon` prop changes (watched via `@Watch('icon')`).
- **Steps:**
  1. `isIconSupported()` validates the `icon` prop against the static `iconTypes` array in the component's local `types.ts`. For `b2b-icon-100`, `isIconRightSize()` additionally validates that `size` is in the 24–96 range. If validation fails, a `console.warn` is emitted and rendering is skipped (returns `null`).
  2. `buildPath(icon, folderName)` constructs the SVG URL:
     - **dev mode** (`Env.env === 'dev'`): uses Stencil's `getAssetPath()` to resolve a local relative path (e.g. `./icons/b2b_icon-archive.svg`).
     - **prod mode** (`icons` folder): constructs a CDN URL: `${ICON_PATH}/icons/${icon}.svg` where `ICON_PATH = 'https://b2b-design-system.otto.market/dist/b2b-core-components'`.
     - **prod mode** (other folder, e.g. `logos`): `${ICON_PATH}/${folderName}/${icon}.svg`.
  3. Cache check: if `iconContent` Map already contains the constructed path, set `this.pathData` immediately and skip fetch.
  4. Cache miss: call `fetchIcon(icon)` which uses the browser `fetch` API to retrieve the SVG text. On success, stores raw SVG markup string in the module-level `iconContent` Map. Resolves, then sets `this.pathData`.
  5. `render()` sets `innerHTML={this.pathData}` on the inner `div`, injecting the raw SVG into shadow DOM. CSS custom properties control `fill` colour via class modifier (e.g. `b2b-icon--primary`, `b2b-icon--inverse`).
- **Exit Point:** SVG rendered inside Shadow DOM with appropriate size and colour applied via CSS classes backed by token custom properties.
- **Impacted Areas:** `src/components/icon/icon.tsx`, `src/components/icon-100/icon-100.tsx`, `src/components/icon-50/icon-50.tsx`, `src/utils/icon/request.ts`, `src/utils/resources.ts`, `src/components/icon/{icon.scss,icon-100.scss,icon-50.scss}`.

---

## FLOW 2: Icon Render — SSR / Non-Browser Environment

- **Trigger:** Component mounts in a server-side rendering context where `fetch` or `document` is undefined.
- **Steps:**
  1. `fetchIcon` checks `typeof fetch !== 'undefined' && typeof document !== 'undefined'`. In SSR, the condition is false.
  2. `iconContent.set(icon, '')` — registers an empty string so the component does not hang waiting.
  3. `Promise.resolve()` is returned immediately.
  4. `this.pathData` is set to `''`; the component renders an empty `div` (no SVG visible).
- **Exit Point:** Empty shadow DOM div; no network request; no error thrown.
- **Impacted Areas:** `src/utils/icon/request.ts`.

---

## FLOW 3: Icon Type Generation (Build-time)

- **Trigger:** `npm run build:icons` in `packages/core-components`, invoked automatically before every `npm run build`.
- **Steps:**
  1. `generate-icon-types.mjs` reads the three source SVG directories: `src/components/icon/icons/`, `src/components/icon-100/icons-100/`, `src/components/icon-50/icons-50/`.
  2. For each directory, collects all `.svg` filenames, strips extensions using `path.parse(file).name`.
  3. Serialises the array as a TypeScript `const` array literal with single-quote strings. Appends: `export type IconName = (typeof iconTypes)[number];`.
  4. Writes the generated content to `src/components/icon/types.ts`, `src/components/icon-100/types.ts`, and `src/components/icon-50/types.ts` respectively (overwriting previous content).
- **Exit Point:** Three `types.ts` files updated with the full current union-type enumeration of valid icon names, providing IntelliSense autocomplete in consuming code.
- **Impacted Areas:** `scripts/generate-icon-types.mjs`, `src/components/icon/types.ts`, `src/components/icon-100/types.ts`, `src/components/icon-50/types.ts`.

---

## Component Comparison

| Component | Tag | Asset Dir | Size Model | Status |
|-----------|-----|-----------|------------|--------|
| `b2b-icon` | `<b2b-icon>` | `icons/` | Fixed steps: 50=16px, 100=24px, 200=32px | ⚠️ Deprecated — prefer `b2b-icon-100` or `b2b-icon-50` |
| `b2b-icon-100` | `<b2b-icon-100>` | `icons-100/` | Flexible numeric px (24–96) | ✅ Current |
| `b2b-icon-50` | `<b2b-icon-50>` | `icons-50/` | Fixed small scale (no size prop) | ✅ Current |
