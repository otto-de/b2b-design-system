# Module: build_and_release_pipeline

## Module Ownership
- **Primary Responsibility:** Own all build orchestration, compilation, CSS post-processing, documentation generation, test execution, version management, and npm publishing workflows for the entire `@otto-de/b2b-design-system` monorepo. This module owns no runtime component logic — it controls how all other modules are compiled, tested, and released.
- **Explicit Non-Responsibilities:** Does not own component business logic, SCSS styles, or design tokens; does not own the generated `react-components/src/components/stencil-generated/index.ts` file (that file is an output artifact produced by this pipeline and owned at runtime by `react_components`).
- **Integration Boundaries:**
  - `produces → react_components` (build-time): Stencil `reactOutputTarget` writes the auto-generated proxy index to `packages/react-components/src/components/stencil-generated/index.ts`.
  - `produces → tokens` (build-time dependency): `npm-run-all` sequencing ensures `build-tokens` runs before `build-core-components` so CSS custom properties are available at compile time.
  - `consumes ← all modules` (build-time): Stencil compiler processes all component `*.tsx` files, `purgeCSSExtensionPlugin` reads them to purge dead CSS, and `generateStorybookArgs`/`generateVueWebTypes` read the compiled `JsonDocs` data to write doc artefacts.
  - `produces → semantic-release` (CI): `release.config.js` drives automated versioning, changelog, and npm publish on the `main`/`next`/`beta`/`alpha` branches.

---

## Entry Points

| File | Role |
|------|------|
| `package.json` (root) | Monorepo orchestration scripts: `build`, `test`, `lint`, `release`, `deploy`, `prepare` |
| `packages/core-components/stencil.config.ts` | Production Stencil build — all output targets, plugins, and testing config |
| `packages/core-components/stencil-dev.config.ts` | Local dev server (`www` target, no React output, no PostCSS) |
| `packages/core-components/plugins/purgeCssExtensionPlugin.ts` | PostCSS plugin — per-component PurgeCSS to strip unused token CSS vars |
| `packages/core-components/scripts/stencil/generate-storybook-args.ts` | `docs-custom` generator — writes `src/docs/config/components-args.json` (Storybook ArgTypes) |
| `packages/core-components/scripts/stencil/generate-vue-web-types.ts` | `docs-custom` generator — writes `dist/web-types.json` (JetBrains IDE completions) |
| `packages/core-components/scripts/generate-icon-types.mjs` | Pre-build script — generates `src/components/icon/types.ts` icon name union from CDN manifest |
| `packages/core-components/.storybook/main.ts` | Storybook 8 configuration — framework (`@storybook/web-components-webpack5`), story globs, addons (essentials, controls, interactions, Chromatic), `buildStoriesJson: true` |
| `packages/core-components/.storybook/preview.ts` | Storybook preview — loads `defineCustomElements()`, `storybook.scss`, configures story sort order, controls matchers, backgrounds |
| `packages/core-components/__snapshots__/` | 264 visual PNG snapshots named by Storybook story ID (`{story-path}--{story-name}.png`); updated via `npm run update-snapshots` |
| `packages/core-components/jest.config.js` | Jest config (jsdom + ts-jest) for direct `jest` invocation outside Stencil |
| `test-runner.js` | CI test orchestrator — runs Stencil test suite, parses stdout/stderr for failures, exits with code 1 on failure |
| `release.config.js` | semantic-release configuration — branches, plugins, changelog, version bump, publish |
| `commitlint.config.js` | Conventional Commits enforcement (`@commitlint/config-conventional`) |
| `scripts/update-packages-version.mjs` | semantic-release `prepareCmd` hook — bumps `version` and all `@otto-de/b2b-*` inter-dependencies across all workspaces atomically |
| `scripts/publish.sh` | semantic-release `publishCmd` hook — `npm publish --workspace packages/ --tag=$tag` (tag = `latest` on `main`, branch name otherwise) |
| `scripts/prepare.mjs` | `postinstall` hook — locally runs `husky install && npm run build`; skipped in CI (`$CI=true`) |

---

## FLOW 1: Full Monorepo Production Build

- **Trigger:** `npm run build` at monorepo root.
- **Steps:**
  1. `npm-run-all build-tokens build-core-components build-react-components` — sequential pipeline.
  2. **`build-tokens`:** `npm run build --workspace=@otto-de/b2b-tokens` → Style Dictionary reads `src/{colors,font,size}/` JSON and writes `build/css/{default,dark}.css` and `build/js/{default,dark}.json`.
  3. **`build-core-components`:** `npm run build --workspace=@otto-de/b2b-core-components` → Stencil CLI compiles using `stencil.config.ts`:
     - **Sass plugin** compiles all `*.scss` → PostCSS pipeline.
     - **PostCSS plugin** runs `postcss-import` (resolves `~node_modules/` aliases) then `purgeCSSExtensionPlugin`.
     - **PurgeCSS plugin:** for each component SCSS file, reads all `*.tsx` in the same directory; removes any CSS selector not referenced in those files. Safelist: `:root`, `:host`, all `b2b-{componentName}` selectors, `data-theme` attribute selectors.
     - **Output targets produced in parallel:**
       - `dist` (primary): CJS/ESM bundles + Stencil lazy-load chunks + `types/` declarations
       - `dist-custom-elements`: standalone treeshakeable per-component modules
       - `dist-hydrate-script`: SSR hydration bundle
       - `docs-custom` → `generateStorybookArgs`: writes `src/docs/config/components-args.json` from `JsonDocs` (props, types, defaults, docs strings → Storybook `ArgTypes` format). Controls (`radio` for enum props, `boolean` toggle, fallback).
       - `docs-custom` → `generateVueWebTypes`: writes `dist/web-types.json` (JetBrains web-types schema). Maps component props, events, and slots. Event names are normalised: prefix matching the tag name is stripped and replaced with `on` (e.g. `b2b-alert-open` on `b2b-alert` → `on-open`).
       - `docs-vscode` → `dist/custom-elements.json`: VS Code custom data JSON.
     - **`reactOutputTarget`:** writes `../react-components/src/components/stencil-generated/index.ts` (all proxy exports + `defineCustomElements()` call), keyed by `componentCorePackage: '@otto-de/b2b-core-components'`.
  4. **`build-react-components`:** `npm run build --workspace=@otto-de/b2b-react-components` → plain `tsc -p .` compiles the proxy layer to `dist/`.
- **Exit Point:** All three packages have up-to-date `dist/` outputs ready for publishing.
- **Impacted Areas:** `package.json` (root), `stencil.config.ts`, `plugins/purgeCssExtensionPlugin.ts`, `scripts/stencil/generate-storybook-args.ts`, `scripts/stencil/generate-vue-web-types.ts`, `packages/tokens/build.mjs`, `packages/react-components/tsconfig.json`.

---

## FLOW 2: Local Dev Server

- **Trigger:** `npm run deploy --workspace=@otto-de/b2b-core-components` (which uses `stencil-dev.config.ts`) or `npx stencil build --dev --config stencil-dev.config.ts --watch`.
- **Steps:**
  1. Stencil uses `stencil-dev.config.ts` — minimal config: only `www` output target, only Sass plugin (no PostCSS/PurgeCSS, no React output target, no docs generators).
  2. `www` target serves from `./html/index.html`; copies all `html/*` files to the output root.
  3. Dev flag (`--dev`) sets `apiEnv = 'dev'` injected via `config.env.env` (consumed by components that read `@stencil/core getAssetPath` relative to `ICON_PATH`).
  4. Watch mode enabled — `watchIgnoredRegex` (from prod config) excludes `.docs.*` and `.stories.*` files to avoid triggering rebuilds on doc updates.
- **Exit Point:** Stencil live-reload server at localhost, serving `www/`.
- **Impacted Areas:** `stencil-dev.config.ts`, `src/html/`, `www/`.

---

## FLOW 3: Test Execution (CI)

- **Trigger:** `npm test` at monorepo root → `node test-runner.js`.
- **Steps:**
  1. `test-runner.js` spawns `npm run test --workspace=@otto-de/b2b-core-components` as a child process.
  2. The workspace `test` script runs `stencil test --spec --e2e --maxWorkers=1` (CI variant: `test-ci` adds `--ci` flag). This executes two test types in one pass:
     - **Spec tests** (`*.spec.ts`/`*.spec.tsx`): Jest unit/integration tests in `jsdom` environment.
     - **E2e tests** (`*.e2e.ts`): Puppeteer/Chromium browser tests for real DOM interactions.
  3. Jest config in `stencil.config.ts`: `browserArgs: ['--no-sandbox', '--disable-setuid-sandbox']`; `browserHeadless: 'new'`; ignores `docs-build/`, `dist/`, `www/`.
  4. `jest.config.js` (standalone): `jsdom` environment, `ts-jest` preset — used when running `jest` directly without Stencil CLI (e.g. unit-only runs).
  5. `test-runner.js` parses stdout/stderr for `/Tests:.*\bfailed\b|Test Suites:.*\bfailed\b/i`. Exits with code `1` on detected failures or child process error; exits `0` on clean pass.
- **Visual Snapshot Tests:** 264 PNG snapshots live in `packages/core-components/__snapshots__/`. They are named by Storybook story ID: `{story-category}--{story-name}.png` (e.g. `components-assets-icon--story-010-primary.png`). These act as visual regression baselines — any rendered change that alters pixel output will produce a snapshot mismatch. To intentionally update them after a confirmed visual change: `npm run update-snapshots` (→ `stencil test --spec --updateSnapshot`). **Snapshots must be committed alongside any PR that changes visual output**, otherwise CI will fail.
- **Exit Point:** Process exit code used by CI to gate the release.
- **Impacted Areas:** `test-runner.js`, `packages/core-components/jest.config.js`, `stencil.config.ts` (`testing` block), `packages/core-components/__snapshots__/`.

---

## FLOW 4: Automated Release (semantic-release)

- **Trigger:** `npm run release` (run by CI on push to `main`, `next`, `beta`, `alpha` branches).
- **Steps:**
  1. **`@semantic-release/commit-analyzer`:** reads conventional commits since last tag; determines next version (`patch` / `minor` / `major` / prerelease).
  2. **`@semantic-release/release-notes-generator`:** generates release notes from commits.
  3. **`@semantic-release/changelog`:** appends notes to `CHANGELOG.md`.
  4. **`@semantic-release/exec` (prepareCmd):** runs `node ./scripts/update-packages-version.mjs ${nextRelease.version}`:
     - Loads root `package.json` to get workspaces list.
     - For each workspace: updates `version` field; finds all `dependencies` entries containing `'b2b'` and bumps them to `nextRelease.version`.
     - Saves each workspace `package.json`.
  5. **`@semantic-release/exec` (publishCmd):** runs `./scripts/publish.sh ${branch.name}`:
     - On `main` (or empty): `tag = 'latest'`.
     - On other branches: `tag = branchName` (e.g. `beta`, `alpha`).
     - Runs `npm publish --workspace packages/ --tag=$tag` — publishes all three packages.
  6. **`@semantic-release/git`:** commits `CHANGELOG.md` and all `package.json` files back to the branch with the bumped versions.
  7. **`@semantic-release/github`:** creates the GitHub Release with notes and assets.
- **Supported branches:** `main`, `next`, `next-major`, `beta` (prerelease), `alpha` (prerelease), and `N.x` / `N.N.x` maintenance branches.
- **Exit Point:** New version published to npm under `@otto-de/` scope; GitHub Release created; version commit pushed.
- **Impacted Areas:** `release.config.js`, `scripts/update-packages-version.mjs`, `scripts/publish.sh`, `CHANGELOG.md`, all workspace `package.json` files.

---

## FLOW 5: Commit Quality Gate (commitlint + husky)

- **Trigger:** `git commit` locally (via `husky` pre-commit / commit-msg hook installed by `scripts/prepare.mjs`).
- **Steps:**
  1. `scripts/prepare.mjs` runs on `npm install` locally (skipped when `$CI=true`): executes `husky install && npm run build`.
  2. Husky commit-msg hook runs `commitlint --edit` against `commitlint.config.js`.
  3. `@commitlint/config-conventional` enforces: `type(scope): description` format; allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`, `build`, `ci`.
  4. If commit message does not conform → `commitlint` exits non-zero → commit rejected.
- **Exit Point:** Only conventionally-formatted commits reach the remote, ensuring `@semantic-release/commit-analyzer` can correctly classify them.
- **Impacted Areas:** `commitlint.config.js`, `scripts/prepare.mjs`, `.husky/` (husky hooks directory, installed at local setup).

---

## FLOW 6: Storybook — Component Showcase Build & Hosting

- **Public URL:** `https://b2b-design-system.otto.market` — the hosted Storybook instance used by all consuming teams to browse components, view all prop variants, read usage docs, and copy code snippets.
- **Dev (local):** `npm run storybook --workspace=@otto-de/b2b-core-components` → `npm run copy-md-files && storybook dev -p 6006`:
  1. Copies `CHANGELOG.md` → `src/docs/getting-started/` and `DEV-GUIDELINES.md` → `src/docs/guidelines/` so they appear as Storybook doc pages.
  2. Starts Storybook dev server at `localhost:6006` with HMR.
  3. `preview.ts` calls `defineCustomElements()` to register all Web Components, then applies `storybook.scss` global styles.
- **Production Build:** `npm run build:storybook --workspace=@otto-de/b2b-core-components` → `storybook build -o docs-build/design-system`:
  - Outputs a static site to `packages/core-components/docs-build/design-system/` (already present as committed build artefacts).
  - Deployed externally to `https://b2b-design-system.otto.market` as part of CI.
- **Story Structure:** Stories live at `src/**/*.stories.@(js|jsx|ts|tsx|mdx)`. The preview `storySort` defines the canonical order:
  `Overview → Getting Started → Guidelines → Components [Content, Interaction, Form, Status & Feedback]`.
- **Storybook ArgTypes Integration:** The `generateStorybookArgs` docs-custom Stencil generator (FLOW 1) pre-computes prop controls (`radio` for enum props, `boolean` toggle) from `JsonDocs` and writes `src/docs/config/components-args.json`. Stories import this JSON to get accurate controls and default value tables without manual maintenance.
- **Chromatic / Visual CI:** `@chromatic-com/storybook` addon is configured, enabling Chromatic visual regression CI workflow (cloud-based screenshot diffing across all stories on each PR).
- **`buildStoriesJson: true`:** Enables the Storybook test runner to discover and execute all stories as test cases (backing the visual snapshot system in FLOW 3).
- **Exit Point:** Static site deployed to public URL; all component variants, props, events, and slots browsable by consuming teams.
- **Impacted Areas:** `packages/core-components/.storybook/main.ts`, `packages/core-components/.storybook/preview.ts`, `packages/core-components/src/**/*.stories.tsx`, `packages/core-components/src/docs/`, `packages/core-components/docs-build/`, `packages/core-components/scripts/stencil/generate-storybook-args.ts`.
