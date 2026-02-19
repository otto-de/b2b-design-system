# Technical Context Specification

## System Overview

The B2B Design System is a monorepo-based component library built with Stencil, a compiler that generates standards-compliant Web Components. The system is architected for maximum framework compatibility, using the Shadow DOM for style encapsulation and providing specialized output targets for React and Vue. The technical architecture emphasizes build-time optimization, type safety, automated testing, and semantic versioning for reliable distribution via npm.

## Technology Stack

### Languages & Frameworks

#### Primary Languages
- **TypeScript 4.9.4**: Primary development language for type safety
- **JavaScript (ES2015+)**: Compilation target for broad browser support
- **SCSS/Sass**: Styling with component-scoped styles
- **JSX/TSX**: Component templating via Stencil decorators
- **CSS**: Generated output and global styles

#### Core Frameworks
- **Stencil 4.13.0**: Web Component compiler and build tool
- **React 18.3.1**: Peer dependency for React wrapper components
- **Style Dictionary 4.3.3**: Design token transformation engine

#### Build Tools
- **npm 10.x**: Package management and workspace orchestration
- **Node.js 22.11.0**: Runtime environment
- **PostCSS**: CSS processing pipeline
- **PurgeCSS**: Unused CSS removal optimization
- **Sass-Embedded 1.85.1**: Fast Sass compilation

### Dependencies

#### Production Dependencies (Core Components)
```json
{
  "@otto-de/b2b-tokens": "1.37.3",
  "@stencil/core": "4.13.0"
}
```

#### Key Development Dependencies
- **Testing**: Jest 29.x, Puppeteer 24.x, jest-image-snapshot 6.x
- **Storybook**: 8.6.15 (documentation and component playground)
- **Linting**: ESLint 9.x, Stylelint 16.x, Prettier 3.x
- **Stencil Plugins**: @stencil/sass, @stencil/react-output-target, @stencil-community/postcss
- **Release**: semantic-release 25.x, commitlint 19.x

#### React Components Dependencies
```json
{
  "@otto-de/b2b-core-components": "1.37.3"
}
```

#### Tokens Dependencies
- **lodash 4.17.21**: Utility functions for token processing
- **style-dictionary 4.3.3**: Token compilation
- **tinycolor2 1.6.0**: Color manipulation
- **change-case 5.4.4**: String case transformation

### Build & Deployment

#### Monorepo Structure
- **Workspace Manager**: npm workspaces
- **Packages**:
  - `@otto-de/b2b-tokens` - Design token source
  - `@otto-de/b2b-core-components` - Stencil web components
  - `@otto-de/b2b-react-components` - React wrappers

#### Build Pipeline
1. **Tokens**: `npm run build-tokens` → Style Dictionary → CSS/SCSS outputs
2. **Core Components**: `npm run build-core-components` → Stencil → Multiple distribution formats
3. **React Components**: `npm run build-react-components` → TypeScript → React library

#### Build Commands
```bash
npm run build              # Build all packages in sequence
npm run build-tokens       # Build design tokens only
npm run build-core-components  # Build web components
npm run build-react-components # Build React wrappers
```

#### Deployment Process
- **Registry**: npm public registry
- **Release**: Automated via semantic-release
- **Versioning**: Conventional commits → semantic versioning
- **Documentation**: Storybook built and deployed to https://b2b-design-system.otto.market/
- **Docker**: Documentation containerized for serving (Node Alpine + http-serve)

## Architecture

### Architectural Pattern

**Component-Based Architecture with Multi-Framework Output**

The system implements a **Compiler-Based Web Components Architecture**:
1. **Source Layer**: TypeScript + JSX components with Stencil decorators
2. **Compilation Layer**: Stencil compiler transforms to standards-compliant Web Components
3. **Distribution Layer**: Multiple output targets for different consumption patterns
4. **Integration Layer**: Framework-specific wrappers (React) and direct usage (Vue)

### Component Structure

```
b2b-design-system/
├── packages/
│   ├── tokens/                          # Design Tokens Package
│   │   ├── src/
│   │   │   ├── colors/                  # Color token definitions
│   │   │   │   ├── base.json           # Base color palette
│   │   │   │   ├── semantic.default.json # Default theme semantic colors
│   │   │   │   └── semantic.dark.json   # Dark theme semantic colors
│   │   │   ├── size/                    # Size/spacing tokens
│   │   │   │   ├── base.json
│   │   │   │   └── semantic.default.json
│   │   │   └── font/                    # Typography tokens
│   │   │       └── base.json
│   │   ├── build.mjs                    # Style Dictionary build script
│   │   └── build/                       # Generated outputs (CSS, SCSS, JSON)
│   │
│   ├── core-components/                 # Web Components Package
│   │   ├── src/
│   │   │   ├── components/              # Component implementations
│   │   │   │   ├── button/
│   │   │   │   │   ├── button.tsx       # Component logic
│   │   │   │   │   ├── button.scss      # Component styles
│   │   │   │   │   ├── button.spec.tsx  # Unit tests
│   │   │   │   │   ├── button.e2e.tsx   # E2E tests
│   │   │   │   │   └── button.stories.tsx # Storybook stories
│   │   │   │   └── [50+ components...]
│   │   │   ├── global/                  # Global styles
│   │   │   │   ├── b2b-styles.scss
│   │   │   │   └── typography.scss
│   │   │   ├── utils/                   # Shared utilities
│   │   │   │   ├── utils.ts
│   │   │   │   ├── focus-trap.ts
│   │   │   │   ├── theme.ts
│   │   │   │   └── types/
│   │   │   ├── docs/                    # Storybook documentation
│   │   │   └── index.ts                 # Package entry point
│   │   ├── stencil.config.ts            # Stencil configuration
│   │   ├── plugins/                     # Custom Stencil plugins
│   │   ├── scripts/                     # Build scripts
│   │   └── dist/                        # Build outputs
│   │
│   └── react-components/                # React Wrapper Package
│       ├── src/
│       │   └── components/
│       │       └── stencil-generated/   # Auto-generated React wrappers
│       └── dist/                        # Compiled React library
│
├── ADRs/                                # Architecture Decision Records
├── scripts/                             # Monorepo scripts
└── [config files]
```

### Layering

#### 1. **Token Layer** (Foundation)
- Base design decisions (colors, sizes, fonts)
- Theme variants (default, dark)
- Semantic tokens (error, warning, success, info)
- Platform outputs (CSS, SCSS, JSON)

#### 2. **Component Layer** (Core)
- Stencil web components
- Shadow DOM encapsulation
- TypeScript interfaces and types
- Component-scoped SCSS styles
- Event emission and handling
- Public methods and properties

#### 3. **Framework Adapter Layer** (Integration)
- React output target (auto-generated wrappers)
- Vue compatibility (native custom elements)
- TypeScript type definitions
- Framework-specific event handling

#### 4. **Documentation Layer** (Developer Experience)
- Storybook interactive documentation
- Component API documentation
- Usage examples and code snippets
- Visual regression baseline snapshots

## Technical Implementation Details

### Entry Points

#### Core Components Package
```typescript
// packages/core-components/src/index.ts
export { Components, JSX } from './components';
export * from './utils/types/...';
```

**Distribution Entry Points**:
- **dist/index.cjs.js**: CommonJS bundle
- **dist/index.js**: ES Module bundle
- **dist/esm/index.mjs**: ES2015+ module
- **dist/types/index.d.ts**: TypeScript definitions
- **dist/collection/**: Component collection for framework integrations
- **dist/b2b-core-components/**: Hydration scripts

#### React Components Package
```typescript
// packages/react-components/src/components/stencil-generated/index.ts
export { B2bButton, B2bInput, ... } from './components';
```

#### Tokens Package
- **build/css/default.css**: Default theme CSS variables
- **build/css/dark.css**: Dark theme CSS variables
- **build/scss/**: SCSS variable exports
- **build/docs.json**: Token documentation data

### Configuration Management

#### Stencil Configuration (stencil.config.ts)
```typescript
{
  namespace: 'b2b-core-components',
  globalStyle: 'src/global/b2b-styles.scss',
  outputTargets: [
    reactOutputTarget({ /* React wrapper generation */ }),
    { type: 'dist' },                    // Standard distribution
    { type: 'dist-custom-elements' },    // Custom elements bundle
    { type: 'dist-hydrate-script' },     // SSR hydration
    { type: 'docs-custom' },             // Storybook args generation
    { type: 'docs-vscode' },             // VSCode custom-elements.json
  ],
  plugins: [
    sass(),                               // SCSS compilation
    postcss({                             // CSS processing
      plugins: [postImport, purgeCSSExtensionPlugin]
    })
  ],
  env: { env: 'dev' | 'prod' }           // Environment variables
}
```

#### Environment Configuration
- **Development**: `stencil-dev.config.ts` with watch and serve
- **Production**: `stencil.config.ts` with optimizations
- **Node Version**: Enforced via engines in package.json (^22.11.0)
- **npm Version**: Enforced via engines (^10.0.0)

#### TypeScript Configuration (tsconfig.json)
- Target: ES2017
- Module: ES2015
- Strict mode enabled
- JSX: react (for Stencil JSX)
- Decorators: experimentalDecorators enabled

### Dependency Injection / Service Management

**Stencil's Built-in Dependency System**:

Stencil doesn't use traditional DI. Instead, it uses:

1. **Component Decorators**:
```typescript
@Component({ tag: 'b2b-button', styleUrl: 'button.scss', shadow: true })
export class ButtonComponent {
  @Element() hostElement: HTMLB2bButtonElement;  // Host element reference
  @Prop() variant: 'primary' | 'secondary';      // Props
  @State() private focused: boolean;              // Internal state
  @Event() b2bClick: EventEmitter<void>;         // Events
  @Method() async setFocus() { }                  // Public methods
  @Watch('variant') variantChanged() { }          // Property watchers
  @Listen('click') handleClick() { }              // Event listeners
}
```

2. **Shared Utilities**:
- Imported as standard ES modules
- Examples: `utils.ts`, `focus-trap.ts`, `theme.ts`
- No singleton services or injection needed

3. **Global Configuration**:
- Design tokens imported as CSS/SCSS
- Theme switching via data attributes
- No runtime configuration service

## Data Layer

### Data Storage

**No Persistent Storage** - The design system is a UI component library with no backend:

- **Component State**: Managed in-memory via Stencil `@State` decorator
- **Design Tokens**: Stored as JSON files, compiled to CSS/SCSS at build time
- **Documentation**: Static files generated at build time
- **Visual Regression Baselines**: PNG files stored in repository

### Data Access Patterns

#### Component Property Binding
```typescript
// Declarative props
@Prop() disabled: boolean = false;
@Prop() value: string;

// Mutable props (two-way binding)
@Prop({ mutable: true, reflect: true }) opened: boolean;
```

#### State Management
```typescript
// Internal state (reactive)
@State() private isOpen: boolean = false;
@State() private selectedValue: string = '';

// Watchers for state changes
@Watch('opened')
openedChanged(newValue: boolean) {
  if (newValue) this.open();
  else this.close();
}
```

#### Event Emission
```typescript
@Event({ eventName: 'b2b-change' })
b2bChange: EventEmitter<string>;

// Emit events
this.b2bChange.emit(this.selectedValue);
```

#### DOM Queries
```typescript
// Query light DOM
const form = this.hostElement.closest('form');
const options = this.hostElement.querySelectorAll('option');

// Query shadow DOM
const button = this.hostElement.shadowRoot.querySelector('button');
```

#### Mutation Observation
```typescript
// Observe light DOM changes
private mutationObserver = new MutationObserver(() => {
  this.parseOptions();
});

componentDidLoad() {
  this.mutationObserver.observe(this.hostElement, {
    childList: true,
    subtree: true
  });
}
```

### Connection Management

**Not Applicable** - No database or external service connections.

Components may make HTTP requests via `fetch()` for:
- Loading icon assets
- Integration with parent applications
- But this is application-specific, not part of the design system

### Migrations & Schema Management

**Design Token Schema Evolution**:
- Token structure defined in JSON schema (Style Dictionary)
- Breaking changes require major version bump
- Token additions are backward compatible
- Token removals require deprecation period

## API Layer

### REST Endpoints

**Not Applicable** - The design system is a client-side library and does not expose REST endpoints.

### Component API (Custom Elements)

#### Component Tag Registration
All components registered as custom elements with tag prefix `b2b-`:
```html
<b2b-button variant="primary" size="100">Click Me</b2b-button>
<b2b-input label="Email" type="email" required></b2b-input>
<b2b-dropdown label="Select" placeholder="Choose option..."></b2b-dropdown>
```

#### Properties (HTML Attributes / JavaScript Properties)
```typescript
// HTML attributes (kebab-case)
<b2b-button disabled loading></b2b-button>

// JavaScript properties (camelCase)
const button = document.querySelector('b2b-button');
button.disabled = true;
button.loading = false;
```

#### Methods
```typescript
// Public methods via @Method decorator
const dropdown = document.querySelector('b2b-dropdown');
await dropdown.clearSelection();  // Clear dropdown

const button = document.querySelector('b2b-button');
await button.setFocus();  // Focus button
```

#### Events
```typescript
// Custom events (prefixed with 'b2b-')
button.addEventListener('b2b-click', (event) => {
  console.log('Button clicked');
});

dropdown.addEventListener('b2b-change', (event) => {
  console.log('Selected value:', event.detail);
});

modal.addEventListener('b2b-before-close', (event) => {
  if (hasUnsavedChanges) {
    event.preventDefault();  // Cancel close
  }
});
```

#### Slots
```html
<!-- Default slot -->
<b2b-button>Button Text</b2b-button>

<!-- Named slots -->
<b2b-card>
  <div slot="header">Card Title</div>
  <div>Card content</div>
  <div slot="footer">Card actions</div>
</b2b-card>
```

#### CSS Custom Properties
```css
/* Theme customization via CSS variables */
b2b-button {
  --b2b-color-primary: #custom-color;
  --b2b-spacing-100: 16px;
}
```

### React API

#### Component Imports
```typescript
import { B2bButton, B2bInput, B2bDropdown } from '@otto-de/b2b-react-components';
```

#### React Props (TypeScript)
```typescript
<B2bButton
  variant="primary"
  size="100"
  disabled={false}
  loading={isLoading}
  onClick={(e) => handleClick(e)}
>
  Click Me
</B2bButton>
```

#### Event Handling (React Style)
```typescript
<B2bInput
  label="Email"
  value={email}
  onB2bChange={(e) => setEmail(e.detail)}
  onB2bFocus={(e) => console.log('focused')}
  onB2bBlur={(e) => console.log('blurred')}
/>
```

#### Refs
```typescript
const buttonRef = useRef<HTMLB2bButtonElement>(null);

useEffect(() => {
  buttonRef.current?.setFocus();
}, []);

<B2bButton ref={buttonRef}>Click</B2bButton>
```

### Request/Response Models

**Not Applicable** - No network API. Component APIs are purely synchronous property/method/event based.

## Authentication & Authorization

**Not Applicable** - The design system is a UI component library with no authentication or authorization logic.

Security considerations:
- Components sanitize text content to prevent XSS
- Shadow DOM provides style isolation
- No external data loading or user authentication

## Error Handling

### Error Handling Strategy

#### Build-Time Type Safety
```typescript
// TypeScript enforces type safety
@Prop() variant: 'primary' | 'secondary' = 'secondary';  // Only allowed values
@Prop() size: '100' | '50' = '100';
```

#### Runtime Prop Validation
```typescript
// Stencil validates props at runtime in dev mode
// Invalid props trigger console warnings
```

#### Defensive Programming
```typescript
// Example: Modal component
private emitBeforeClose = (trigger: CloseEventTrigger) => {
  const customEvent = this.b2bBeforeClose.emit({ trigger });
  const prevented = customEvent.defaultPrevented;
  
  if (!prevented) {
    this.opened = false;  // Only close if not prevented
  }
};
```

#### Graceful Degradation
```typescript
// Example: Checking for parent form
const form = this.hostElement.closest('form');
if (form != null && this.type === 'submit') {
  // Trigger submit
}
// No error if form doesn't exist
```

### Exception Hierarchy

**No Custom Exception Classes** - Uses standard JavaScript errors:
- `TypeError`: Type mismatches
- `ReferenceError`: Undefined references
- `Error`: General errors

### Error Response Format

#### Console Warnings (Development)
```
[Stencil] Component 'b2b-button': Invalid prop 'variant' value 'invalid'. Expected 'primary' | 'secondary'.
```

#### Visual Error States
```html
<!-- Components show error states via props -->
<b2b-input
  label="Email"
  invalid={true}
  error="Please enter a valid email address"
></b2b-input>
```

## Logging & Monitoring

### Logging Framework

**Console-Based Logging**:
- Development: Stencil logs warnings for invalid props, missing attributes
- Production: Warnings suppressed in production builds
- No structured logging framework (not needed for UI library)

### Log Levels & Usage

#### Development Warnings
```typescript
// Stencil automatically warns about:
// - Missing required props
// - Invalid prop values
// - Deprecated APIs
// - Performance issues
```

#### Custom Logging (Application Layer)
```typescript
// Applications can log component events
dropdown.addEventListener('b2b-change', (e) => {
  console.log('Dropdown changed:', e.detail);
  analytics.track('dropdown_selection', { value: e.detail });
});
```

### Monitoring & Metrics

**Not Built-In** - Applications consuming the design system implement their own:
- Performance monitoring (Core Web Vitals)
- Error tracking (Sentry, etc.)
- Analytics (Google Analytics, etc.)

The design system focuses on performance through:
- Lazy loading of components
- Tree-shaking support
- Minimal bundle sizes
- Virtual DOM optimization

## Asynchronous Processing

### Background Jobs

**Not Applicable** - No background job processing in a UI component library.

### Message Queues

**Not Applicable** - No message queue integration.

### Scheduled Tasks

**Not Applicable** - No scheduled tasks.

**Note**: Components may use browser APIs for asynchronous behavior:
- `setTimeout` / `setInterval` for animations, auto-close
- `requestAnimationFrame` for smooth animations
- `IntersectionObserver` for lazy rendering
- `MutationObserver` for DOM change detection

Example:
```typescript
// Auto-close snackbar after timeout
private autoCloseTimeout: NodeJS.Timeout;

componentDidLoad() {
  if (this.autoClose) {
    this.autoCloseTimeout = setTimeout(() => {
      this.close();
    }, this.duration);
  }
}

disconnectedCallback() {
  clearTimeout(this.autoCloseTimeout);  // Cleanup
}
```

## Testing Strategy

### Test Structure

```
component/
├── component.tsx          # Implementation
├── component.spec.tsx     # Unit tests
├── component.e2e.tsx      # E2E tests
└── component.stories.tsx  # Storybook + Visual regression
```

### Test Coverage

#### 1. **Unit Tests** (`.spec.tsx`)
- **Framework**: Jest + Stencil's testing utilities
- **Coverage**: Component logic, methods, prop validation
- **Execution**: `npm test` or `stencil test --spec`

Example:
```typescript
import { newSpecPage } from '@stencil/core/testing';
import { ButtonComponent } from './button';

describe('b2b-button', () => {
  it('renders with primary variant', async () => {
    const page = await newSpecPage({
      components: [ButtonComponent],
      html: `<b2b-button variant="primary">Click</b2b-button>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
```

#### 2. **E2E Tests** (`.e2e.tsx`)
- **Framework**: Jest + Puppeteer (headless Chrome)
- **Coverage**: DOM interaction, events, accessibility
- **Execution**: `stencil test --e2e`

Example:
```typescript
import { newE2EPage } from '@stencil/core/testing';

describe('b2b-button e2e', () => {
  it('emits click event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<b2b-button>Click</b2b-button>');
    
    const button = await page.find('b2b-button');
    const clickEvent = await page.spyOnEvent('b2b-click');
    
    await button.click();
    expect(clickEvent).toHaveReceivedEvent();
  });
});
```

#### 3. **Visual Regression Tests**
- **Framework**: Storybook + jest-image-snapshot + Puppeteer
- **Coverage**: Visual appearance across variants
- **Storage**: `packages/core-components/__snapshots__/*.png`
- **Execution**: `npm run test-runner` (Docker-based for consistency)

#### 4. **Integration Tests**
- **Framework**: Storybook stories serve as living integration tests
- **Coverage**: Component composition, framework integration
- **Execution**: Manual testing in Storybook

### Test Frameworks

- **Jest 29.x**: Test runner and assertion library
- **Stencil Testing Tools**: `newSpecPage`, `newE2EPage`
- **Puppeteer 24.x**: Headless browser automation
- **jest-image-snapshot 6.x**: Visual diff comparison
- **Storybook Test Runner**: Automated story testing

### Test Configuration

#### Jest Config (jest.config.js)
```javascript
{
  testEnvironment: "jsdom",
  preset: "ts-jest/presets/js-with-babel",
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
  bail: true
}
```

#### Stencil Test Config (stencil.config.ts)
```typescript
testing: {
  browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  browserHeadless: 'new',
  testPathIgnorePatterns: ['/node_modules/', '/docs-build/', '/dist/']
}
```

#### Visual Test Docker Setup
```dockerfile
FROM node:24.12.0-alpine3.23
# Ensures consistent visual snapshots across environments
```

## Performance Considerations

### Caching Strategy

#### Build-Time Optimizations
- **Tree Shaking**: Unused components removed from bundles
- **Code Splitting**: Components lazy-loaded on demand
- **CSS Purging**: Unused CSS removed via PurgeCSS
- **Token Compilation**: Design tokens pre-compiled to CSS

#### Browser Caching
- **Static Assets**: Versioned filenames for cache busting
- **Shadow DOM**: Component styles scoped and cached by browser
- **Module Loading**: ES modules cached by browser

### Optimization Patterns

#### Lazy Loading
```typescript
// Components loaded only when used
import { defineCustomElements } from '@otto-de/b2b-core-components/loader';
defineCustomElements();  // Lazy loader
```

#### Virtual DOM Optimization
```typescript
// Stencil's JSX compiles to optimized virtual DOM
render() {
  return (
    <Host>
      <button type={this.type} disabled={this.disabled}>
        <slot />
      </button>
    </Host>
  );
}
```

#### Event Delegation
```typescript
// Single event listener on host
@Listen('click', { capture: true })
handleHostClick(event: Event) {
  if (this.disabled) {
    event.stopImmediatePropagation();
  }
}
```

#### Efficient Re-rendering
```typescript
// Only re-render when @State or @Prop changes
@State() private count: number = 0;
@Prop() label: string;

// Manual optimization for expensive operations
@Watch('options')
optionsChanged() {
  // Debounce or throttle expensive calculations
}
```

#### Shadow DOM Performance
- **Style Encapsulation**: Styles scoped to component (no global style recalculation)
- **DOM Isolation**: Changes in shadow DOM don't trigger reflow in light DOM

## Deployment & Operations

### Containerization

#### Documentation Container (Dockerfile)

```dockerfile
FROM node:24.12.0-alpine3.23
COPY ../../packages/core-components/docs-build /tmp
RUN echo "Ok" > /tmp/design-system/health.html
CMD ["npx", "http-serve", "/tmp", "-p", "80", "-d", "false", "--cors"]
```

**Purpose**: Serve Storybook documentation as static site

#### Test Container (test.Dockerfile)
- **Purpose**: Run visual regression tests in consistent environment
- **Base Image**: Node with Puppeteer dependencies
- **Usage**: Ensures pixel-perfect snapshots across different machines

### Infrastructure as Code

**Not Present** - The design system is distributed as npm packages:
- No cloud infrastructure provisioning
- CI/CD managed by GitHub Actions (inferred from semantic-release setup)
- Deployment to npm registry handled by semantic-release

### Environment Configuration

#### Environment Detection
```typescript
// stencil.config.ts
const dev = process.argv.indexOf('--dev') > -1;
const apiEnv = dev ? 'dev' : 'prod';

config: {
  env: { env: apiEnv }
}
```

#### Development Environment
```bash
npm run start  # Dev server with watch mode
# → stencil build --dev --watch --serve
# → http://localhost:3333
```

#### Production Build
```bash
npm run build
# → Tokens compiled
# → Components compiled with optimizations
# → React wrappers generated
# → Documentation built
```

#### Storybook Environments
```bash
npm run storybook           # Development (port 6006)
npm run build:storybook     # Static build for deployment
```

## Technical Debt & Known Issues

### Known Limitations

1. **Stencil as "Black Box"**
   - **Issue**: Incomplete documentation, delayed bug fixes
   - **Workaround**: Community workarounds, custom plugins
   - **Reference**: ADR-001 Web Components

2. **React Web Components Support**
   - **Issue**: React doesn't fully support Web Components natively
   - **Mitigation**: Custom React output target generates proper wrappers
   - **Ongoing**: Waiting for React improvements

3. **Shadow DOM Limitations**
   - **Issue**: Global styles don't penetrate shadow DOM
   - **Mitigation**: CSS custom properties for theming
   - **Reference**: ADR-006 Shadow DOM

4. **Type Definitions Complexity**
   - **Issue**: Stencil type generation can be inconsistent
   - **Mitigation**: Manual type fixes when needed

5. **Build Performance**
   - **Issue**: Large monorepo can have slow build times
   - **Mitigation**: Incremental builds, watch mode, workspace isolation

### Deprecated Patterns

- **Force Resolutions**: Using `npm-force-resolutions` (should migrate to `overrides`)
- **Older Test Patterns**: Some components have mixed test styles

### Upgrade Paths

1. **Stencil**: Track for updates, test thoroughly due to black-box nature
2. **Node/npm**: Version pinning for consistency, upgrade carefully
3. **React**: Peer dependency, upgrade when consuming applications upgrade
4. **Style Dictionary**: Monitor for new features (e.g., better TypeScript support)

## Code Organization Conventions

### Naming Conventions

#### Component Tags
- **Pattern**: `b2b-{component-name}`
- **Examples**: `b2b-button`, `b2b-input`, `b2b-date-picker`
- **Case**: kebab-case

#### Component Classes
- **Pattern**: `{ComponentName}Component`
- **Examples**: `ButtonComponent`, `DropdownComponent`
- **Case**: PascalCase

#### Files
- **Component**: `{component-name}.tsx`
- **Styles**: `{component-name}.scss`
- **Tests**: `{component-name}.spec.tsx`, `{component-name}.e2e.tsx`
- **Stories**: `{component-name}.stories.tsx`

#### Events
- **Pattern**: `b2b-{event-name}`
- **Examples**: `b2b-change`, `b2b-focus`, `b2b-before-close`
- **Case**: kebab-case

#### Props/Methods
- **Case**: camelCase
- **Examples**: `variant`, `disabled`, `setFocus`, `clearSelection`

#### CSS Custom Properties
- **Pattern**: `--b2b-{category}-{name}-{variant}`
- **Examples**: `--b2b-color-primary`, `--b2b-spacing-100`

### Code Style

#### TypeScript
- **Formatter**: Prettier 3.5.3
- **Linter**: ESLint 9.x with @stencil-community/eslint-plugin
- **Style**: Prettier defaults, 2-space indentation
- **Strict Mode**: Enabled

#### SCSS
- **Linter**: Stylelint 16.x with stylelint-config-standard-scss
- **Pattern**: Component-scoped styles in shadow DOM
- **Variables**: Use design tokens via CSS custom properties

#### Commit Messages
- **Format**: Conventional Commits
- **Enforcer**: commitlint with @commitlint/config-conventional
- **Types**: feat, fix, docs, style, refactor, test, chore
- **Examples**:
  - `feat(button): add loading state`
  - `fix(dropdown): resolve search clear issue`
  - `docs: update contribution guidelines`

### Package/Module Organization

#### Workspace Structure
```
packages/
├── tokens/           # Design tokens (independent)
├── core-components/  # Depends on: tokens
└── react-components/ # Depends on: core-components
```

#### Component Organization
```
component/
├── {component}.tsx         # Main component
├── {component}.scss        # Styles
├── {component}.spec.tsx    # Unit tests
├── {component}.e2e.tsx     # E2E tests
├── {component}.stories.tsx # Storybook
├── utils.ts                # Component-specific utilities (optional)
└── types.ts                # Component-specific types (optional)
```

#### Shared Code
```
src/
├── components/        # All components
├── utils/            # Shared utilities (focus-trap, theme, etc.)
├── global/           # Global styles
└── docs/             # Documentation files
```

#### Import Patterns
```typescript
// Stencil decorators
import { Component, Prop, State, Event, Method, Watch, Listen } from '@stencil/core';

// Internal utilities
import { isClickOutside } from '../../utils/utils';
import { TableSizes } from '../../utils/types/table.types';

// Design tokens (via SCSS)
@import '~@otto-de/b2b-tokens/build/css/default.css';
```

---

**Document Generated**: February 11, 2026
