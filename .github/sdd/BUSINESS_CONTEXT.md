# Business Context Specification

## Executive Summary

The B2B Design System is a comprehensive library of reusable UI components developed for the Otto Marketplace. The system provides frontend components that encapsulate styles and behavior for teams to build consistent, accessible, and performant user interfaces across the Otto Marketplace B2B platform. Built using Web Components with Stencil, the design system supports multiple frontend frameworks (React, Vue) and enables independent teams to maintain consistency while working autonomously. The system is actively maintained by Otto Marketplace teams and published as open-source to inspire other teams building similar products.

## Business Domain

### Domain Entities

#### 1. **Web Components**
- Reusable, framework-agnostic UI components built with Stencil
- Encapsulate both visual design and interactive behavior
- Self-contained units that can be used across different frontend frameworks

#### 2. **Design Tokens**
- Atomic design decisions representing colors, sizes, typography, and spacing
- Central source of truth for design consistency
- Enable theming and brand customization

#### 3. **Component Packages**
- Core Components (Web Components)
- React Components (React wrappers)
- Design Tokens (Style variables)

#### 4. **Documentation**
- Component API documentation
- Usage guidelines
- Integration examples
- Visual regression tests

### Business Rules

1. **Framework Independence**: Components must work across multiple frontend frameworks (Vue, React) without modification
2. **Accessibility First**: All components must be accessible and follow WAI-ARIA standards
3. **Shadow DOM Encapsulation**: Components use Shadow DOM to prevent style conflicts
4. **Design Consistency**: All visual attributes must be controlled through design tokens
5. **Backward Compatibility**: Changes must maintain backward compatibility following semantic versioning
6. **Quality Gates**: All components require unit tests, e2e tests, and visual regression tests
7. **Documentation Requirement**: All components must have Storybook documentation with examples
8. **Theming Support**: Components must support light and dark themes through design tokens

### Business Workflows

#### Component Development Workflow
1. **Design & Planning**: Design team creates component specifications
2. **Token Definition**: Define required design tokens (colors, sizes, spacing)
3. **Component Implementation**: Build Stencil web component with TypeScript
4. **Testing**: Create unit tests, e2e tests, and visual regression tests
5. **Documentation**: Create Storybook stories with usage examples
6. **Code Review**: Maintainers review PR for quality and standards
7. **Release**: Automated semantic release publishes to npm

#### Integration Workflow
1. **Package Installation**: Teams install packages via npm
2. **Component Import**: Import components into framework-specific applications
3. **Configuration**: Apply design tokens for brand customization
4. **Usage**: Use components in application templates
5. **Updates**: Receive automated updates through semantic versioning

#### Release Workflow
1. **Development**: Contributors create features/fixes on branches
2. **Commit Standards**: Conventional commits determine release type
3. **CI/CD Validation**: Automated tests run on pull requests
4. **Merge**: Changes merged to main branch
5. **Semantic Release**: Automated versioning and changelog generation
6. **Publishing**: Packages published to npm registry
7. **Documentation Deployment**: Storybook documentation deployed to hosting

### Use Cases

#### UC1: Building Consistent UI Across Teams
**Actor**: Frontend Developer
**Goal**: Use pre-built components to maintain design consistency
**Flow**:
1. Install design system packages
2. Import required components
3. Configure with props and design tokens
4. Integrate into application
5. Benefit from automatic updates and bug fixes

#### UC2: Creating Custom Themes
**Actor**: Product Owner / Designer
**Goal**: Customize design system for different brands
**Flow**:
1. Modify design token values (colors, fonts, spacing)
2. Build custom token set using Style Dictionary
3. Apply custom tokens to components
4. Components automatically adapt to new theme

#### UC3: Maintaining Component Quality
**Actor**: Maintainer
**Goal**: Ensure components meet quality standards
**Flow**:
1. Review pull requests against contribution checklist
2. Verify tests (unit, e2e, visual regression)
3. Check documentation completeness
4. Validate accessibility compliance
5. Approve or request changes

#### UC4: Consuming Components in React
**Actor**: React Developer
**Goal**: Use design system in React application
**Flow**:
1. Install `@otto-de/b2b-react-components` package
2. Import React component wrappers
3. Use as first-class React components with TypeScript support
4. Benefit from React-specific features (ref forwarding, event handling)

#### UC5: Consuming Components in Vue
**Actor**: Vue Developer
**Goal**: Use design system in Vue application
**Flow**:
1. Install `@otto-de/b2b-core-components` package
2. Import web components
3. Configure Vue to recognize custom elements
4. Use components in Vue templates with full typing support

## Features & Capabilities

### Content Components
- **Headline**: Text heading components with size variants
- **Paragraph**: Body text components
- **Label**: Text labels for form elements
- **Separator**: Visual dividers

### Form Components
- **Button**: Primary, secondary variants with loading states
- **Input**: Text input with validation and hints
- **Textarea**: Multi-line text input
- **Checkbox**: Single and grouped checkboxes
- **Radio**: Radio buttons with groups
- **Toggle Switch**: On/off toggle controls
- **Toggle Chip**: Chip-style toggle buttons
- **Dropdown**: Single-select dropdown with search
- **Multiselect Dropdown**: Multi-select dropdown
- **Date Picker**: Calendar-based date selection
- **Date Range Picker**: Date range selection
- **Time Picker**: Time selection component
- **Input Group**: Grouping for related inputs
- **Input List**: Dynamic list of inputs

### Navigation Components
- **Breadcrumb**: Hierarchical navigation trail
- **Tab Group**: Tabbed navigation interface
- **Pagination**: Page navigation controls
- **Anchor**: Link component

### Layout Components
- **Grid**: Flexible grid layout system
- **Card**: Container component for grouped content
- **Background Box**: Colored background containers
- **Scrollable Container**: Scrollable content areas
- **Modal**: Dialog overlays
- **Flyout Menu**: Slide-out navigation menus

### Feedback Components
- **Alert**: Informational messages
- **Snackbar**: Temporary notifications
- **Tooltip**: Contextual help tooltips
- **Progress Bar**: Progress indicators
- **Spinner**: Loading spinners
- **Shimmer**: Skeleton loading states

### Data Display Components
- **Table**: Data tables with sorting and responsive layouts
- **Chip**: Tag/badge components
- **Icon**: Icon components (50px and 100px sizes)
- **Rounded Icon**: Circular icon containers
- **Wizard**: Multi-step workflow indicator
- **Search**: Search input component

### Design Token Features
- **Color Tokens**: Primary, secondary, semantic colors (error, warning, success, info)
- **Size Tokens**: Spacing scale, component dimensions
- **Font Tokens**: Typography scale, font families, weights
- **Theme Support**: Light and dark color schemes

### Developer Experience Features
- **TypeScript Support**: Full type definitions for all components
- **Storybook Documentation**: Interactive component playground
- **Visual Regression Testing**: Automated visual diff testing
- **Automated Releases**: Semantic versioning and changelogs
- **React Wrappers**: First-class React component support
- **Vue Support**: Vue 3 custom element integration

## Data Model

### Core Entities

#### Component
- **tag**: String - Custom element tag name (e.g., "b2b-button")
- **variant**: Enum - Visual variant (primary, secondary, etc.)
- **size**: Enum - Size variant (50, 100)
- **disabled**: Boolean - Disabled state
- **required**: Boolean - Required validation state
- **invalid**: Boolean - Validation error state
- **theme**: Enum - Theme variant (default, dark)

#### Design Token
- **name**: String - Token identifier
- **value**: String | Number - Token value
- **type**: Enum - Token type (color, size, font)
- **category**: String - Token category
- **attributes**: Object - Metadata attributes

#### Event
- **eventName**: String - Custom event name (prefixed with "b2b-")
- **detail**: Any - Event payload data
- **bubbles**: Boolean - Event bubbling behavior
- **cancelable**: Boolean - Whether event can be prevented

### Relationships

- **Component** HAS MANY **Props** (configuration properties)
- **Component** EMITS MANY **Events** (user interactions)
- **Component** USES MANY **Design Tokens** (styling)
- **Component** CAN CONTAIN MANY **Components** (composition)
- **Design Token** BELONGS TO **Category** (color, size, font)
- **Design Token** HAS MANY **Theme Variants** (default, dark)

### Data Validation Rules

1. **Required Props**: Components enforce required props at compile time
2. **Type Safety**: All props are strongly typed via TypeScript
3. **Enum Validation**: Variant props restricted to specific string literals
4. **Boolean Props**: Disabled, required, invalid are boolean only
5. **String Validation**: Text props validated for max length where applicable
6. **Format Validation**: Email, URL, date inputs enforce format rules
7. **Custom Validation**: Components support custom validation functions
8. **Error States**: Invalid state triggers error message display

## Integration Points

### External Systems

#### 1. **NPM Registry**
- **Purpose**: Package distribution
- **Integration**: Packages published via semantic-release
- **Packages**: @otto-de/b2b-core-components, @otto-de/b2b-react-components, @otto-de/b2b-tokens

#### 2. **Storybook Hosting**
- **Purpose**: Documentation hosting
- **URL**: https://b2b-design-system.otto.market/
- **Integration**: Static site deployment via CI/CD

#### 3. **GitHub**
- **Purpose**: Source control, issue tracking, CI/CD
- **Repository**: https://github.com/otto-de/b2b-design-system
- **Integration**: Pull requests, automated releases, semantic versioning

#### 4. **Docker Hub** (Implied)
- **Purpose**: Container image distribution for documentation
- **Integration**: Docker images for serving Storybook

### APIs Consumed

#### NPM Dependencies
- **Stencil Core**: Component compilation framework
- **Style Dictionary**: Design token transformation
- **Semantic Release**: Automated versioning and publishing
- **Puppeteer**: Visual regression testing
- **Jest**: Unit testing framework
- **Storybook**: Documentation and component explorer

### APIs Provided

#### Component API (Web Components)
- **Custom Elements**: All components registered as custom HTML elements
- **Properties**: Component configuration via HTML attributes or JavaScript properties
- **Methods**: Public methods exposed via component instances
- **Events**: Custom events for component interactions (prefixed with "b2b-")
- **Slots**: Content projection via named and default slots
- **CSS Custom Properties**: Styling customization via CSS variables

#### React API
- **React Components**: First-class React components with JSX support
- **Props**: TypeScript-typed component props
- **Refs**: React ref forwarding to native elements
- **Event Handlers**: React-style event handling (e.g., onChange, onFocus)

#### Design Tokens API
- **CSS Variables**: Tokens exposed as CSS custom properties
- **JSON**: Token data in JSON format
- **SCSS**: Tokens available as SCSS variables

## Business Constraints & Rules

### Technical Constraints
1. **Browser Support**: Must support modern browsers (ES2015+)
2. **Framework Compatibility**: Must work with React 18.x and Vue 3.x
3. **Bundle Size**: Components should be tree-shakeable and minimal
4. **Performance**: Components must render efficiently (no blocking operations)
5. **Shadow DOM**: All components use Shadow DOM for encapsulation

### Quality Constraints
1. **Test Coverage**: All components require unit and e2e tests
2. **Visual Testing**: All components require visual regression tests
3. **Documentation**: All components require Storybook documentation
4. **Accessibility**: All components must meet WCAG 2.1 AA standards
5. **Type Safety**: All components must have TypeScript definitions

### Process Constraints
1. **Conventional Commits**: All commits must follow conventional commit format
2. **PR Reviews**: All changes require maintainer approval
3. **Semantic Versioning**: Version numbers follow semver specification
4. **Breaking Changes**: Breaking changes allowed only on major versions
5. **Open Source**: Code must comply with Apache 2.0 license

### Design Constraints
1. **Token-Based**: All styling must use design tokens
2. **Theme Support**: Components must support light and dark themes
3. **Responsive**: Components must adapt to different screen sizes
4. **Consistent**: Visual design must match Otto Marketplace branding
5. **Accessible**: Color contrast must meet accessibility standards

## Event Model

### Events Published

#### Form Events
- **b2b-change**: Emitted when form element value changes
  - Detail: New value
  - Components: Input, Dropdown, Checkbox, Radio, Toggle, etc.

- **b2b-focus**: Emitted when component receives focus
  - Detail: FocusEvent
  - Components: All form inputs

- **b2b-blur**: Emitted when component loses focus
  - Detail: FocusEvent
  - Components: All form inputs

- **b2b-input**: Emitted during text input
  - Detail: Input value
  - Components: Input, Textarea, Search

#### Interaction Events
- **b2b-click**: Emitted on button clicks
  - Detail: MouseEvent
  - Components: Button, Anchor

- **b2b-sort-change**: Emitted when table column sort changes
  - Detail: { sortedColumn, sortDirection }
  - Components: Table

- **b2b-page-change**: Emitted on pagination navigation
  - Detail: { page: number }
  - Components: Pagination

#### State Events
- **b2b-open**: Emitted when component opens
  - Detail: void
  - Components: Modal, Flyout Menu, Dropdown

- **b2b-close**: Emitted when component closes
  - Detail: void
  - Components: Modal, Flyout Menu, Dropdown, Snackbar

- **b2b-before-close**: Emitted before component closes (cancelable)
  - Detail: { trigger: CloseEventTrigger }
  - Components: Modal

#### Selection Events
- **b2b-selected**: Emitted when item is selected
  - Detail: Selected item data
  - Components: Dropdown, Multiselect, Tab Group

- **b2b-date-change**: Emitted when date selection changes
  - Detail: Date value
  - Components: Date Picker, Date Range Picker

### Events Consumed

Components consume standard DOM events:
- **click**: Mouse click events
- **keydown**: Keyboard input events
- **keyup**: Keyboard release events
- **focus**: Focus events from child elements
- **blur**: Blur events from child elements
- **submit**: Form submission events (bubbled from forms)
- **resize**: Window resize events (for responsive behavior)

### Event Flows

#### Form Submission Flow
1. User fills form inputs (each emits `b2b-change` on change)
2. User clicks submit button
3. Button component handles click, finds parent form
4. Button triggers form submit event
5. Form validates all inputs (checking `invalid` states)
6. Form submits if valid, or displays errors

#### Modal Interaction Flow
1. Application sets `opened` property to true
2. Modal emits `b2b-open` event
3. Modal captures focus and enables focus trap
4. User clicks close button or backdrop
5. Modal emits `b2b-before-close` (application can prevent)
6. If not prevented, modal closes and emits `b2b-close`
7. Focus returns to triggering element

#### Table Sorting Flow
1. User clicks table header with sorting enabled
2. Header emits internal `b2b-change` event with sort direction
3. Table component listens to header events
4. Table emits `b2b-sort-change` with column and direction
5. Application listens to `b2b-sort-change`
6. Application re-sorts data and updates table content

#### Dropdown Selection Flow
1. User clicks dropdown to open
2. Dropdown shows options list
3. User clicks an option or types to search
4. Option selected (visual state updates)
5. Dropdown emits `b2b-change` with selected value
6. Application listens to `b2b-change` and processes selection
7. Dropdown closes automatically

---

**Document Generated**: February 11, 2026
