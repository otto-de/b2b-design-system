# System Specification

## Document Information

- **Generated Date**: February 11, 2026
- **Repository**: otto-de/b2b-design-system
- **Repository URL**: https://github.com/otto-de/b2b-design-system
- **Version/Commit**: d3766ca (HEAD -> main)
- **Current Package Version**: 1.37.3
- **License**: Apache 2.0
- **Maintainer**: Otto GmbH

## System Summary

The **B2B Design System** is an open-source, production-ready component library for building consistent, accessible user interfaces in the Otto Marketplace B2B platform. Built on Stencil (a Web Components compiler), the system provides 50+ reusable UI components that work seamlessly across modern frontend frameworks including React and Vue. The architecture emphasizes framework independence through standards-compliant Web Components, design consistency through a comprehensive design token system, and developer experience through TypeScript support, automated testing, and interactive documentation.

### Core Value Propositions

1. **Framework Agnostic**: Single codebase serves React, Vue, and vanilla JavaScript applications
2. **Design Consistency**: Centralized design tokens ensure visual coherence across teams
3. **Production Ready**: Comprehensive testing (unit, e2e, visual regression) ensures reliability
4. **Developer Experience**: Full TypeScript support, interactive docs, automated releases
5. **Accessibility First**: WCAG 2.1 AA compliant components with proper ARIA support
6. **Open Source**: Apache 2.0 licensed for community contribution and transparency

## Quick Reference

### Key Technologies

| Category | Technologies |
|----------|-------------|
| **Core Framework** | Stencil 4.13.0 (Web Components compiler) |
| **Languages** | TypeScript 4.9.4, JavaScript (ES2015+), SCSS |
| **Runtime** | Node.js 22.11.0, npm 10.x |
| **Framework Support** | React 18.3.1, Vue 3.x |
| **Design Tokens** | Style Dictionary 4.3.3 |
| **Testing** | Jest 29.x, Puppeteer 24.x, Storybook 8.6.15 |
| **Release** | Semantic Release 25.x, Conventional Commits |
| **Documentation** | Storybook 8.6.15, Markdown |
| **Build Tools** | PostCSS, PurgeCSS, Sass-Embedded 1.85.1 |

### Key Features

#### Component Categories
- **50+ UI Components** organized in 8 categories:
  - Content: Headline, Paragraph, Label, Separator
  - Forms: Button, Input, Dropdown, Checkbox, Radio, Toggle, Date Picker
  - Navigation: Breadcrumb, Tab Group, Pagination, Anchor
  - Layout: Grid, Card, Modal, Scrollable Container
  - Feedback: Alert, Snackbar, Tooltip, Progress Bar, Spinner
  - Data Display: Table, Chip, Icon
  - Specialized: Wizard, Search, Flyout Menu

#### Design System Features
- **Design Tokens**: 100+ tokens for colors, spacing, typography
- **Theme Support**: Light and dark themes with CSS custom properties
- **Responsive Design**: Mobile-first, adaptive components
- **Accessibility**: WCAG 2.1 AA compliant
- **Type Safety**: Full TypeScript definitions
- **Tree Shaking**: Optimized bundle sizes

#### Developer Tools
- **Interactive Documentation**: Storybook component explorer
- **Visual Regression Testing**: Automated screenshot comparison
- **Automated Releases**: Semantic versioning via CI/CD
- **Development Server**: Hot-reloading dev environment
- **Linting & Formatting**: ESLint, Stylelint, Prettier

### Key Components

| Component | Package | Namespace | Entry Point |
|-----------|---------|-----------|-------------|
| **Design Tokens** | @otto-de/b2b-tokens | N/A | build/css/default.css |
| **Core Components** | @otto-de/b2b-core-components | b2b-core-components | dist/index.js |
| **React Components** | @otto-de/b2b-react-components | N/A | dist/index.js |

## Detailed Specifications

### Module: Design Tokens (@otto-de/b2b-tokens)

#### Purpose
Provides atomic design decisions (colors, sizes, typography) as platform-agnostic tokens that can be consumed as CSS variables, SCSS variables, or JSON data. Enables consistent theming and brand customization across all components.

#### Business Logic

**Token Categories**:
1. **Colors**
   - Base palette: Black, white, grey scales, primary colors
   - Semantic colors: Error (red), warning (yellow), success (green), info (blue)
   - Interactive states: Hover, focus, active
   - Theme variants: Default (light) and dark

2. **Sizes**
   - Base scale: Spacing and sizing increments
   - Semantic sizes: Component-specific dimensions
   - Responsive breakpoints

3. **Typography**
   - Font families
   - Font sizes and line heights
   - Font weights

**Token Structure** (JSON):
```json
{
  "color": {
    "primary": { "value": "#D4021D" },
    "black": {
      "50": { "value": "#333333" },
      "100": { "value": "#222222" }
    },
    "error": {
      "50": { "value": "{color.red.50}" },
      "100": { "value": "#E6344B" }
    }
  }
}
```

**Theme System**:
- Base tokens + Default semantic → Default theme (light)
- Base tokens + Dark semantic → Dark theme
- Tokens compiled per theme independently
- Themes applied via `data-theme` attribute or `:root` selector

#### Technical Implementation

**Build Process**:
1. **Source**: JSON token files in `src/colors/`, `src/size/`, `src/font/`
2. **Compiler**: Style Dictionary 4.3.3
3. **Custom Formatters**:
   - `css/variables-themed`: Outputs CSS custom properties with theme selectors
   - `javascript/docs`: Outputs JSON for documentation
4. **Output Formats**:
   - `build/css/default.css`: CSS variables for default theme
   - `build/css/dark.css`: CSS variables for dark theme
   - `build/scss/`: SCSS variables
   - `build/docs.json`: Token metadata for Storybook

**Build Script** (`build.mjs`):
```javascript
- Registers custom formatters
- Generates config per theme
- Compiles tokens for each theme
- Groups tokens by category for docs
```

**Token Naming Convention**:
- CSS: `--b2b-{category}-{name}-{variant}`
- Example: `--b2b-color-primary`, `--b2b-spacing-100`, `--b2b-font-size-200`

#### Dependencies

**Production**: None (pure CSS/SCSS output)

**Development**:
- `style-dictionary`: Token compilation
- `lodash`: Utility functions
- `tinycolor2`: Color manipulation
- `change-case`: String transformation

#### API/Interface

**CSS Consumption**:

```css
@import '../../node_modules/@otto-de/b2b-tokens/build/css/default.css';

.my-component {
  color: var(--b2b-color-primary);
  padding: var(--b2b-spacing-100);
}
```

**SCSS Consumption**:
```scss
@import '@otto-de/b2b-tokens/build/scss/variables';

.my-component {
  color: $b2b-color-primary;
  padding: $b2b-spacing-100;
}
```

**JavaScript Consumption**:
```javascript
import tokens from '@otto-de/b2b-tokens/build/docs.json';
console.log(tokens.color.primary);
```

#### Data Models

**Token Definition**:
```typescript
interface Token {
  value: string | number;        // Token value
  attributes?: {
    category: string;             // color, size, font
    type: string;                 // primary, black, spacing, etc.
  };
}
```

**Compiled Token**:
```typescript
interface CompiledToken {
  name: string;                   // Variable name
  value: string | number;         // Computed value
  original: {
    value: string | number;       // Original value
  };
  attributes: {
    category: string;
    type: string;
  };
  path: string[];                 // Token path in source
}
```

---

### Module: Core Components (@otto-de/b2b-core-components)

#### Purpose
Provides 50+ production-ready Web Components for building user interfaces. Components encapsulate both visual design and interactive behavior, are framework-agnostic, and work in React, Vue, Angular, or vanilla JavaScript.

#### Business Logic

**Component Lifecycle**:
1. **Definition**: Component class with Stencil decorators
2. **Compilation**: Stencil compiles to standards-compliant custom elements
3. **Registration**: Custom elements auto-register on page load
4. **Usage**: Components used via HTML tags or framework wrappers
5. **Interaction**: User events emit custom events with `b2b-` prefix
6. **State Management**: Internal state reactive, props immutable (unless mutable)

**Core Patterns**:

1. **Property Management**:
   - `@Prop()`: Public properties, immutable by default
   - `@Prop({ reflect: true })`: Attribute reflection (HTML sync)
   - `@Prop({ mutable: true })`: Two-way binding support
   - Type validation via TypeScript

2. **State Management**:
   - `@State()`: Internal reactive state
   - `@Watch(propName)`: Property change observers
   - Automatic re-rendering on state/prop changes

3. **Event Handling**:
   - `@Event()`: Custom event emitters
   - `@Listen(eventName)`: Event listeners
   - Events prefixed with `b2b-` (e.g., `b2b-change`, `b2b-click`)
   - Event details in `.detail` property

4. **DOM Access**:
   - `@Element()`: Reference to host element
   - Shadow DOM: Isolated styles and DOM
   - Light DOM: Slotted content from users
   - Mutation observers for dynamic children

5. **Public Methods**:
   - `@Method()`: Async public methods
   - Examples: `setFocus()`, `clearSelection()`

**Example Component** (Button):
```typescript
@Component({
  tag: 'b2b-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class ButtonComponent {
  @Element() hostElement: HTMLB2bButtonElement;
  @Prop() variant: 'primary' | 'secondary' = 'secondary';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() href?: string;
  @Event() b2bClick: EventEmitter<void>;
  @Method() async setFocus() { }
  
  @Listen('click', { capture: true })
  handleClick(event: Event) {
    if (this.disabled || this.loading) {
      event.stopImmediatePropagation();
    }
  }
  
  render() {
    const TagType = this.href ? 'a' : 'button';
    return (
      <Host>
        <TagType class={`variant-${this.variant}`}>
          {this.loading ? <b2b-spinner /> : <slot />}
        </TagType>
      </Host>
    );
  }
}
```

#### Technical Implementation

**Stencil Configuration**:
- **Namespace**: `b2b-core-components`
- **Global Styles**: `src/global/b2b-styles.scss` (imports design tokens)
- **Shadow DOM**: Enabled for all components
- **Output Targets**:
  1. `dist`: Standard distribution (CJS + ESM)
  2. `dist-custom-elements`: Individual component bundles
  3. `dist-hydrate-script`: Server-side rendering support
  4. `react-output-target`: Auto-generates React wrappers
  5. `docs-custom`: Storybook args generation
  6. `docs-vscode`: VSCode IntelliSense support

**Build Pipeline**:
```bash
1. Generate icon types (scripts/generate-icon-types.mjs)
2. Stencil compilation:
   - TypeScript → JavaScript
   - SCSS → CSS (component-scoped)
   - JSX → Virtual DOM functions
   - Generate TypeScript definitions
   - Generate React wrappers
   - Generate documentation metadata
3. Output multiple distribution formats
```

**Component Structure** (Example: Dropdown):
- **Main Logic** (`dropdown.tsx`): 438 lines
  - Property definitions (label, search, clear, disabled, etc.)
  - State management (isOpen, selectedValue, filteredOptions)
  - Event emitters (b2b-change, b2b-focus, b2b-blur)
  - Public methods (clearSelection)
  - MutationObserver for dynamic `<option>` elements
  - Keyboard navigation (Arrow keys, Enter, Escape)
  - Search filtering logic
  - Focus management

- **Styles** (`dropdown.scss`):
  - Uses design tokens via CSS custom properties
  - Shadow DOM scoped styles
  - Variant styles (default, invalid, disabled)
  - Responsive styles

- **Tests**:
  - Unit tests: Component logic, props, state
  - E2E tests: User interactions, events, accessibility
  - Visual regression: Screenshot comparison

- **Documentation** (`dropdown.stories.tsx`):
  - Multiple story variants
  - Interactive controls
  - Code examples
  - Usage guidelines

**Key Components Deep Dive**:

1. **Form Components** (Button, Input, Dropdown, etc.):
   - Disabled state handling
   - Validation states (invalid, required)
   - Error message display
   - Hint text support
   - Focus management
   - Form submission integration

2. **Modal Component**:
   - Focus trap implementation
   - Backdrop dismiss support
   - Escape key dismiss
   - `b2b-before-close` event (cancelable)
   - Body scroll lock
   - Accessibility (aria-modal, role="dialog")

3. **Table Component**:
   - Sortable columns
   - Fixed headers in scrollable containers
   - Size variants (expand, equal, colspan)
   - Column/row composition
   - Sort direction management
   - Responsive behavior

4. **Date Picker Component**:
   - Calendar view with month/year navigation
   - Date validation
   - Min/max date constraints
   - Keyboard navigation
   - Localization support
   - Date formatting

#### Dependencies

**Production**:
- `@otto-de/b2b-tokens`: Design token CSS
- `@stencil/core`: Component framework

**Development**: 50+ packages including:
- Testing: Jest, Puppeteer, jest-image-snapshot
- Storybook: 20+ Storybook packages
- Linting: ESLint, Stylelint, Prettier
- Build: Sass, PostCSS, Babel

#### API/Interface

**HTML Usage**:
```html
<b2b-button variant="primary" disabled>Click Me</b2b-button>
<b2b-input label="Email" type="email" required></b2b-input>
<b2b-dropdown label="Select" search clear>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</b2b-dropdown>
```

**JavaScript Usage**:
```javascript
// Import loader (lazy loads components)
import { defineCustomElements } from '@otto-de/b2b-core-components/loader';
defineCustomElements();

// Access component
const button = document.querySelector('b2b-button');
button.disabled = true;
button.addEventListener('b2b-click', () => { });
await button.setFocus();
```

**TypeScript Definitions**:
```typescript
import { Components } from '@otto-de/b2b-core-components';

const button: Components.B2bButton = {
  variant: 'primary',
  disabled: false,
  loading: false
};
```

#### Data Models

**Common Props Pattern**:
```typescript
interface BaseComponent {
  disabled?: boolean;           // Disabled state
  required?: boolean;           // Required indicator
  invalid?: boolean;            // Validation state
  size?: '50' | '100';         // Size variant
  groupDisabled?: boolean;      // Parent group disabled
}

interface FormComponent extends BaseComponent {
  label?: string;               // Field label
  hint?: string;                // Help text
  error?: string;               // Error message
  name?: string;                // Form field name
}
```

**Event Models**:
```typescript
interface ChangeEvent<T = string> {
  detail: T;                    // Changed value
}

interface BeforeCloseEvent {
  detail: {
    trigger: 'BACKDROP' | 'CLOSE_BUTTON' | 'ESCAPE_KEY';
  };
}

interface SortChangeEvent {
  detail: {
    sortedColumn: string;
    sortDirection: 'ASC' | 'DESC' | 'NOT';
  };
}
```

---

### Module: React Components (@otto-de/b2b-react-components)

#### Purpose
Provides first-class React component wrappers around the core Web Components, enabling React-specific features like proper event handling, ref forwarding, and TypeScript integration without manual custom element registration.

#### Business Logic

**Wrapper Generation**:
- Auto-generated by Stencil's React output target
- Converts web component props to React props
- Transforms custom events to React event handlers
- Forwards refs to underlying custom elements
- Includes TypeScript definitions

**React-Specific Enhancements**:
1. **Event Handling**: `b2b-change` → `onB2bChange`
2. **Prop Mapping**: Converts attribute names to camelCase props
3. **Ref Support**: `useRef<HTMLB2bButtonElement>()`
4. **JSX Integration**: Use as `<B2bButton>` instead of `<b2b-button>`
5. **Type Safety**: Full TypeScript prop types

#### Technical Implementation

**Generation Process**:
1. Stencil analyzes component metadata
2. React output target generates wrappers
3. Output: `src/components/stencil-generated/index.ts`
4. TypeScript compilation: `tsc -p .`
5. Distribution: `dist/index.js` (ESM)

**Generated Wrapper Pattern**:
```typescript
import { defineCustomElements } from '@otto-de/b2b-core-components/loader';
import { createReactComponent } from './react-component-lib';

// Auto-register web components
defineCustomElements();

// Create React wrapper
export const B2bButton = createReactComponent<
  HTMLB2bButtonElement,
  Components.B2bButton
>('b2b-button', [
  'variant',
  'disabled',
  'loading',
  // ... all props
], [
  'b2bClick',
  // ... all events
]);
```

**React Component Library Utilities**:
- `attachProps.ts`: Syncs React props to web component properties
- `case.ts`: Converts camelCase to kebab-case
- `dev.ts`: Development warnings and checks

#### Dependencies

**Production**:
- `@otto-de/b2b-core-components`: Underlying web components

**Peer Dependencies**:
- `react`: 18.3.1
- `react-dom`: 18.3.1

**Development**:
- `typescript`: 4.9.5
- `@types/node`: 18.17.1

#### API/Interface

**Import**:
```typescript
import {
  B2bButton,
  B2bInput,
  B2bDropdown,
  B2bModal
} from '@otto-de/b2b-react-components';
```

**Usage**:
```tsx
function MyComponent() {
  const [email, setEmail] = useState('');
  const buttonRef = useRef<HTMLB2bButtonElement>(null);
  
  const handleSubmit = () => {
    buttonRef.current?.setFocus();
  };
  
  return (
    <>
      <B2bInput
        label="Email"
        type="email"
        value={email}
        required
        onB2bChange={(e) => setEmail(e.detail)}
        onB2bFocus={() => console.log('focused')}
      />
      
      <B2bButton
        ref={buttonRef}
        variant="primary"
        disabled={!email}
        onB2bClick={handleSubmit}
      >
        Submit
      </B2bButton>
    </>
  );
}
```

#### Data Models

**React Component Props**:
```typescript
interface B2bButtonProps {
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  size?: '100' | '50';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  target?: 'self' | 'blank';
  download?: string;
  
  // React-specific
  ref?: React.Ref<HTMLB2bButtonElement>;
  onB2bClick?: (event: CustomEvent<void>) => void;
  children?: React.ReactNode;
}
```

---

### Integration Map

```
┌─────────────────────────────────────────────────────────────────┐
│                      Consumer Applications                       │
│                  (React, Vue, Vanilla JavaScript)                │
└─────────────────────────────────────────────────────────────────┘
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
                 ▼               ▼               ▼
        ┌─────────────┐  ┌─────────────┐  ┌──────────────┐
        │   React     │  │    Vue      │  │   Vanilla    │
        │ Components  │  │ Integration │  │  JavaScript  │
        └─────────────┘  └─────────────┘  └──────────────┘
                 │               │               │
                 │        ┌──────┴──────┐       │
                 └────────►  Web Comp.  ◄───────┘
                          │   Loader    │
                          └──────┬──────┘
                                 │
                   ┌─────────────┼─────────────┐
                   ▼                           ▼
        ┌──────────────────────┐    ┌──────────────────┐
        │  Core Components     │    │  Design Tokens   │
        │  (@otto-de/b2b-core) │◄───┤  (@otto-de/b2b-  │
        │                      │    │   tokens)        │
        │  - 50+ Components    │    │                  │
        │  - Shadow DOM        │    │  - CSS Variables │
        │  - TypeScript        │    │  - SCSS Vars     │
        │  - Event System      │    │  - Themes        │
        └──────────────────────┘    └──────────────────┘
                   │                           ▲
                   │                           │
                   ▼                           │
        ┌──────────────────────┐              │
        │  Stencil Compiler    │              │
        │                      │              │
        │  - TSX → JS          │──────────────┘
        │  - SCSS → CSS        │   Imports
        │  - Type Generation   │   Tokens
        │  - React Wrappers    │
        └──────────────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Distribution        │
        │                      │
        │  - npm Registry      │
        │  - Storybook Docs    │
        │  - Type Definitions  │
        └──────────────────────┘
```

### Data Flow Diagrams

#### Component Rendering Flow

```
User Code
   │
   ▼
HTML Template / JSX
   │
   ▼
Custom Element Registration
   │
   ▼
Component Instance Created
   │
   ├─► Load Design Tokens (CSS Variables)
   │
   ├─► Initialize Shadow DOM
   │
   ├─► Apply Component Styles (Scoped)
   │
   ├─► Set Initial Props/State
   │
   ├─► componentWillLoad() lifecycle
   │
   ├─► render() → Virtual DOM
   │
   ├─► Patch Shadow DOM
   │
   ▼
Component Rendered
   │
   ▼
User Interaction (Click, Type, etc.)
   │
   ├─► Event Handler (@Listen)
   │
   ├─► Update State (@State)
   │
   ├─► Watch Props (@Watch)
   │
   ├─► Re-render (if needed)
   │
   ├─► Emit Custom Event (@Event)
   │
   ▼
Parent Listens to Event
   │
   ▼
Parent Updates Props
   │
   ▼
Component Re-renders
```

#### Form Submission Flow

```
User fills form inputs
   │
   ├─► <b2b-input> emits b2b-change
   ├─► <b2b-dropdown> emits b2b-change
   └─► <b2b-checkbox> emits b2b-change
         │
         ▼
   Application state updated
         │
         ▼
   User clicks <b2b-button type="submit">
         │
         ▼
   Button handleClick()
         │
         ├─► Find parent <form> in light DOM
         │
         ├─► Create fake submit button
         │
         ├─► Trigger form submit event
         │
         └─► Remove fake button
               │
               ▼
         Form validates
               │
               ├─► Check all input invalid states
               │
               └─► If valid → submit
                   If invalid → show errors
```

#### Design Token Application Flow

```
Token Source (JSON)
   │
   ▼
Style Dictionary Build
   │
   ├─► Parse JSON
   │
   ├─► Resolve references
   │
   ├─► Apply transformations
   │
   ├─► Format for platform
   │
   └─► Generate outputs
         │
         ├─► CSS: :root { --b2b-color-primary: #D4021D; }
         ├─► SCSS: $b2b-color-primary: #D4021D;
         └─► JSON: { "color": { "primary": "#D4021D" } }
               │
               ▼
         Imported by components
               │
               ├─► Global styles import CSS
               │
               └─► Component SCSS uses tokens
                     │
                     ▼
               Compiled to component CSS
                     │
                     ▼
               Applied in Shadow DOM
                     │
                     ▼
               Theme switching via data-theme attribute
                     │
                     ├─► [data-theme="default"] → default.css
                     └─► [data-theme="dark"] → dark.css
```

### State Management

**Component-Level State**:
- Each component manages its own state via `@State()` decorator
- State changes trigger automatic re-renders
- No global state management (components are self-contained)
- Parent-child communication via props and events

**State Patterns**:

1. **Local UI State** (e.g., dropdown open/closed):
```typescript
@State() private isOpen: boolean = false;

toggleDropdown() {
  this.isOpen = !this.isOpen;  // Triggers re-render
}
```

2. **Controlled vs Uncontrolled**:
```typescript
// Uncontrolled (internal state)
@State() private value: string = '';

// Controlled (prop + event)
@Prop() value: string;
@Event() b2bChange: EventEmitter<string>;

// Component can support both patterns
```

3. **Derived State**:
```typescript
@State() private options: Option[] = [];
@State() private searchTerm: string = '';

get filteredOptions() {
  return this.options.filter(opt =>
    opt.label.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
```

4. **Synchronization with DOM**:
```typescript
@Watch('opened')
openedChanged(newValue: boolean) {
  if (newValue) {
    this.open();
    document.body.style.overflow = 'hidden';  // Lock scroll
  } else {
    this.close();
    document.body.style.overflow = '';
  }
}
```

**Application State**:
- Applications using the design system manage their own state (Redux, Context, Vuex, etc.)
- Components emit events, applications listen and update state
- Updated state flows back to components via props

## Appendices

### Appendix A: File Structure

```
b2b-design-system/
├── .github/
│   ├── sdd/                              # Spec-driven development docs
│   │   ├── code-to-spec-prompt.md
│   │   └── updatecontext-guide.md
│   └── copilot-instructions.md
│
├── ADRs/                                  # Architecture Decision Records
│   ├── 001_Web_Components.md
│   ├── 002_Testing_strategy.md
│   ├── 003_Release_strategy.md
│   ├── 004_Documentation.md
│   ├── 005_Icons.md
│   ├── 006_Shadow_DOM.md
│   ├── 007_Table_component.md
│   ├── 008_Autocomplete.md
│   └── TEMPLATE.md
│
├── packages/
│   ├── tokens/
│   │   ├── src/
│   │   │   ├── colors/
│   │   │   │   ├── base.json
│   │   │   │   ├── semantic.default.json
│   │   │   │   └── semantic.dark.json
│   │   │   ├── size/
│   │   │   │   ├── base.json
│   │   │   │   └── semantic.default.json
│   │   │   └── font/
│   │   │       └── base.json
│   │   ├── build/                        # Generated outputs
│   │   │   ├── css/
│   │   │   │   ├── default.css
│   │   │   │   └── dark.css
│   │   │   ├── scss/
│   │   │   └── docs.json
│   │   ├── build.mjs
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── core-components/
│   │   ├── src/
│   │   │   ├── components/               # 50+ component folders
│   │   │   │   ├── button/
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── button.scss
│   │   │   │   │   ├── button.spec.tsx
│   │   │   │   │   ├── button.e2e.tsx
│   │   │   │   │   └── button.stories.tsx
│   │   │   │   ├── dropdown/
│   │   │   │   ├── input/
│   │   │   │   ├── table/
│   │   │   │   ├── modal/
│   │   │   │   └── ... (47 more)
│   │   │   ├── global/
│   │   │   │   ├── b2b-styles.scss
│   │   │   │   └── typography.scss
│   │   │   ├── utils/
│   │   │   │   ├── utils.ts
│   │   │   │   ├── utils.spec.ts
│   │   │   │   ├── focus-trap.ts
│   │   │   │   ├── theme.ts
│   │   │   │   ├── resources.ts
│   │   │   │   ├── json-property-binding-util.ts
│   │   │   │   └── types/
│   │   │   ├── docs/
│   │   │   │   ├── config/
│   │   │   │   ├── getting-started/
│   │   │   │   ├── guidelines/
│   │   │   │   └── tokens/
│   │   │   ├── static/                   # Static assets
│   │   │   ├── html/                     # Test HTML files
│   │   │   ├── components.d.ts
│   │   │   └── index.ts
│   │   ├── scripts/
│   │   │   ├── generate-icon-types.mjs
│   │   │   └── stencil/
│   │   ├── plugins/
│   │   │   └── purgeCssExtensionPlugin.ts
│   │   ├── dist/                         # Build outputs
│   │   │   ├── index.js
│   │   │   ├── index.cjs.js
│   │   │   ├── types/
│   │   │   ├── collection/
│   │   │   └── b2b-core-components/
│   │   ├── docs-build/                   # Storybook build
│   │   │   └── design-system/
│   │   ├── __snapshots__/                # Visual regression baselines
│   │   ├── stencil.config.ts
│   │   ├── stencil-dev.config.ts
│   │   ├── jest.config.js
│   │   ├── eslint.config.mjs
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── react-components/
│       ├── src/
│       │   └── components/
│       │       └── stencil-generated/    # Auto-generated React wrappers
│       │           ├── index.ts
│       │           └── react-component-lib/
│       ├── dist/                         # Compiled React library
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── scripts/
│   ├── prepare.mjs
│   ├── publish.sh
│   └── update-packages-version.mjs
│
├── package.json                          # Root package (workspace)
├── tsconfig.json
├── commitlint.config.js
├── release.config.js
├── test-runner.js
├── Dockerfile
├── docker-compose.yml
├── CHANGELOG.md
├── DEV-GUIDELINES.md
├── README.md
├── LICENSE
├── MAINTAINERS
└── OSSMETADATA
```

### Appendix B: Dependencies

#### Root Package Dependencies

```json
{
  "devDependencies": {
    "@commitlint/cli": "^19.8.0",
    "@commitlint/config-conventional": "^19.8.0",
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/commit-analyzer": "^13.0.1",
    "@semantic-release/exec": "^7.0.0",
    "@semantic-release/git": "^10.0.1",
    "@semantic-release/github": "^11.0.1",
    "@semantic-release/npm": "^13.1.2",
    "@semantic-release/release-notes-generator": "^14.0.3",
    "husky": "^9.1.7",
    "jest": "^29.1.1",
    "npm-run-all": "^4.1.5",
    "puppeteer": "^24.0.0",
    "sass-embedded": "^1.85.1",
    "semantic-release": "^25.0.2"
  }
}
```

#### Core Components Dependencies (Key)

```json
{
  "dependencies": {
    "@otto-de/b2b-tokens": "1.37.3",
    "@stencil/core": "4.13.0"
  },
  "devDependencies": {
    "@stencil/react-output-target": "^0.5.3",
    "@stencil/sass": "^3.1.7",
    "@storybook/web-components": "^8.6.15",
    "eslint": "^9.22.0",
    "jest": "^29.1.1",
    "jest-image-snapshot": "^6.1.0",
    "puppeteer": "^24.0.0",
    "stylelint": "^16.15.0",
    "typescript": "^4.9.4"
  }
}
```

### Appendix C: Configuration Reference

#### Package.json Scripts

**Root**:
- `build`: Build all packages sequentially
- `build-tokens`: Build design tokens only
- `build-core-components`: Build web components
- `build-react-components`: Build React wrappers
- `test`: Run all tests via test-runner.js
- `lint`: Lint core components
- `deploy`: Deploy Storybook documentation
- `release`: Execute semantic-release
- `prepare`: Run preparation scripts (husky, etc.)

**Core Components**:
- `build`: Build icons + compile Stencil with docs
- `start`: Dev server with watch + hot reload
- `test`: Run unit + e2e tests
- `test-ci`: Run tests in CI mode
- `generate`: Generate new component from template
- `lint`: Run ESLint + Stylelint
- `lint:fix`: Auto-fix linting issues
- `storybook`: Start Storybook dev server (port 6006)
- `build:storybook`: Build static Storybook site

**Tokens**:
- `build`: Execute build.mjs (Style Dictionary compilation)

**React Components**:
- `build`: Compile TypeScript
- `tsc`: TypeScript compilation

#### Environment Variables

**Stencil Build**:
- `env`: 'dev' | 'prod' (set via CLI args)

**Node/npm Version Requirements**:
- Node: ^22.11.0 (enforced)
- npm: ^10.0.0 (enforced)

#### Stencil Configuration Options

```typescript
{
  namespace: 'b2b-core-components',         // Component namespace
  sourceMap: false,                         // Disable source maps (prod)
  globalStyle: 'src/global/b2b-styles.scss', // Global styles
  transformAliasedImportPaths: false,       // Module path handling
  validatePrimaryPackageOutputTarget: true, // Validate dist output
  extras: {
    enableImportInjection: true             // Auto-import dependencies
  },
  watchIgnoredRegex: /.*.\.docs.*|.*.\.stories.*/, // Ignore docs in watch
  testing: {
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    browserHeadless: 'new',
    testPathIgnorePatterns: [...]
  }
}
```

#### Semantic Release Configuration

**Branches**:
- `main`: Production releases
- `next`: Next version pre-releases
- `next-major`: Major version pre-releases
- `beta`: Beta pre-releases
- `alpha`: Alpha pre-releases
- Version branches: `1.x`, `2.x`, etc.

**Plugins**:
1. commit-analyzer: Determine release type
2. release-notes-generator: Generate changelog
3. changelog: Update CHANGELOG.md
4. exec (prepare): Update package versions
5. exec (publish): Run publish script
6. git: Commit version changes
7. github: Create GitHub release

### Appendix D: Glossary

| Term | Definition |
|------|------------|
| **ADR** | Architecture Decision Record - Document explaining significant architectural choices |
| **Component** | Self-contained UI element with encapsulated logic and styling |
| **Custom Element** | Web standard for defining new HTML elements via JavaScript |
| **Design Token** | Named value representing a design decision (color, size, spacing, etc.) |
| **E2E Test** | End-to-end test simulating user interactions in a browser |
| **ESM** | ECMAScript Module - Standard JavaScript module format |
| **JSX/TSX** | JavaScript/TypeScript XML - Syntax extension for writing HTML-like code |
| **Monorepo** | Single repository containing multiple related packages |
| **npm Workspace** | npm feature for managing multiple packages in one repository |
| **Props** | Properties passed to components for configuration |
| **Semantic Release** | Automated versioning and publishing based on commit messages |
| **Shadow DOM** | Web standard for encapsulated DOM and CSS in components |
| **Slot** | Placeholder in component for user-provided content |
| **Stencil** | Compiler that generates Web Components from TypeScript/JSX |
| **Storybook** | Tool for developing and documenting UI components in isolation |
| **Style Dictionary** | Build system for transforming design tokens to platform-specific formats |
| **Tree Shaking** | Build optimization that removes unused code from bundles |
| **Unit Test** | Test for individual component methods and logic |
| **Virtual DOM** | In-memory representation of DOM for efficient rendering |
| **Visual Regression** | Testing technique comparing screenshots to detect visual changes |
| **Web Component** | Set of web standards for creating reusable custom elements |

---

**Document Generated**: February 11, 2026
