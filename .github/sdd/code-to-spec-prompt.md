# Universal Code-to-Spec Generator Prompt

## Overview
This prompt is designed to work across any technology stack to generate comprehensive specification documents from existing codebases. It creates a specification that reflects the current state of the code, extracting business logic, technical architecture, and implementation details.

---

## The Prompt

I need you to analyze this entire codebase and generate comprehensive specification documents that capture the current state of the system. Please follow these steps:

### Phase 1: Repository Discovery & Analysis

1. **Identify the Technology Stack:**
  - Scan the repository to identify the programming languages, frameworks, and tools used
  - Identify the project structure and build system (e.g., Maven, Gradle, npm, pip, cargo, etc.)
  - List all major dependencies and their versions
  - Identify the architectural pattern (e.g., MVC, microservices, event-driven, etc.)

2. **Map the Codebase Structure:**
  - Identify all source code directories
  - Map out the main modules, packages, or namespaces
  - Identify configuration files and their purposes
  - Document the build and deployment structure

3. **Analyze Business Domain:**
  - Identify domain entities and their relationships
  - Extract business rules and logic from the code
  - Identify workflows and processes
  - Map data flows and transformations
  - Identify external integrations and APIs

4. **Analyze Technical Architecture:**
  - Document the application entry points
  - Map the dependency injection or service initialization patterns
  - Identify data persistence mechanisms (databases, caches, file storage)
  - Document API endpoints, event handlers, or other interfaces
  - Identify security mechanisms (authentication, authorization)
  - Document error handling and logging patterns
  - Identify asynchronous processing patterns (queues, workers, schedulers)

### Phase 2: Document Generation

Generate the following documents:

#### Document 1: BUSINESS_CONTEXT.md
Create a business-focused specification document that includes:

**Structure:**
```markdown
# Business Context Specification

## Executive Summary
[High-level overview of what the system does from a business perspective]

## Business Domain
### Domain Entities
[List all business entities with descriptions]

### Business Rules
[Extract and document business rules found in the code]

### Business Workflows
[Document the key business processes and workflows]

### Use Cases
[Describe the main use cases the system supports]

## Features & Capabilities
[List all features organized by functional area]

## Data Model
### Core Entities
[Document core business entities and their attributes]

### Relationships
[Document relationships between entities]

### Data Validation Rules
[Document validation rules extracted from code]

## Integration Points
### External Systems
[List external systems and how the application integrates with them]

### APIs Consumed
[Document external APIs the system consumes]

### APIs Provided
[Document APIs this system exposes]

## Business Constraints & Rules
[Document business constraints found in the code]

## Event Model (if applicable)
### Events Published
[List events the system publishes]

### Events Consumed
[List events the system consumes]

### Event Flows
[Document event-driven workflows]
```

#### Document 2: TECHNICAL_CONTEXT.md
Create a technical specification document that includes:

**Structure:**
```markdown
# Technical Context Specification

## System Overview
[Technical overview of the system architecture]

## Technology Stack
### Languages & Frameworks
[List all languages and frameworks with versions]

### Dependencies
[List major dependencies and their purposes]

### Build & Deployment
[Document build system and deployment approach]

## Architecture
### Architectural Pattern
[Describe the architectural pattern used]

### Component Structure
[Document the major components and modules]

### Layering
[Document the layers (e.g., presentation, business logic, data access)]

## Technical Implementation Details
### Entry Points
[Document application entry points]

### Configuration Management
[Document how configuration is managed]

### Dependency Injection / Service Management
[Document DI patterns and service initialization]

## Data Layer
### Data Storage
[Document databases, caches, and storage mechanisms]

### Data Access Patterns
[Document how data is accessed (repositories, DAOs, ORM, etc.)]

### Connection Management
[Document connection pooling and management]

### Migrations & Schema Management
[Document database migration approach if present]

## API Layer
### REST Endpoints (if applicable)
[Document all REST endpoints with methods, paths, and purposes]

### GraphQL Schema (if applicable)
[Document GraphQL types and operations]

### RPC Methods (if applicable)
[Document RPC methods]

### Request/Response Models
[Document API contracts]

## Authentication & Authorization
### Authentication Mechanism
[Document how authentication is implemented]

### Authorization Rules
[Document authorization patterns and rules]

### Security Features
[Document security features (encryption, CORS, rate limiting, etc.)]

## Error Handling
### Error Handling Strategy
[Document error handling patterns]

### Exception Hierarchy
[Document custom exceptions and their purposes]

### Error Response Format
[Document error response structure]

## Logging & Monitoring
### Logging Framework
[Document logging implementation]

### Log Levels & Usage
[Document logging levels and patterns]

### Monitoring & Metrics
[Document metrics collection if present]

## Asynchronous Processing
### Background Jobs
[Document background job patterns]

### Message Queues
[Document queue systems used]

### Scheduled Tasks
[Document scheduled tasks/cron jobs]

## Testing Strategy
### Test Structure
[Document test organization]

### Test Coverage
[Document what types of tests exist (unit, integration, e2e)]

### Test Frameworks
[Document testing frameworks used]

## Performance Considerations
### Caching Strategy
[Document caching mechanisms]

### Optimization Patterns
[Document performance optimizations]

## Deployment & Operations
### Containerization
[Document Docker/container setup if present]

### Infrastructure as Code
[Document IaC files if present]

### Environment Configuration
[Document environment-specific configurations]

## Technical Debt & Known Issues
[Document technical debt observed in the code, outdated patterns, or known limitations]

## Code Organization Conventions
### Naming Conventions
[Document naming patterns observed]

### Code Style
[Document code style patterns]

### Package/Module Organization
[Document how code is organized]
```

#### Document 3: SYSTEM_SPECIFICATION.md
Create a unified specification document that includes:

**Structure:**
```markdown
# System Specification

## Document Information
- **Generated Date:** [Current Date]
- **Repository:** [Repository Name]
- **Version/Commit:** [If available]

## System Summary
[Comprehensive summary combining business and technical context]

## Quick Reference
### Key Technologies
[List key technologies]

### Key Features
[List key features]

### Key Components
[List key components]

## Detailed Specifications

### Module: [Module Name]
For each major module/component:

#### Purpose
[What this module does]

#### Business Logic
[Business logic implemented in this module]

#### Technical Implementation
[Technical details of implementation]

#### Dependencies
[Internal and external dependencies]

#### API/Interface
[Public interface of this module]

#### Data Models
[Data structures used]

### Integration Map
[Visual or textual representation of how components interact]

### Data Flow Diagrams
[Describe major data flows through the system]

### State Management
[Document how state is managed in the application]

## Appendices
### Appendix A: File Structure
[Complete file tree of the repository]

### Appendix B: Dependencies
[Complete dependency list with versions]

### Appendix C: Configuration Reference
[All configuration options and their meanings]

### Appendix D: Glossary
[Terms and definitions used in the system]
```

### Phase 3: Analysis Guidelines

When analyzing the code:

1. **Be Thorough:** Examine all source files, not just main code
2. **Extract Intent:** Look beyond syntax to understand the purpose and business logic
3. **Identify Patterns:** Recognize design patterns, architectural decisions, and conventions
4. **Document as-is:** Describe what the code actually does, not what it should do
5. **Be Objective:** Don't judge code quality, just document what exists
6. **Cross-reference:** Link related components and concepts across documents
7. **Include Examples:** Where helpful, include code snippets that illustrate key concepts
8. **Handle Uncertainty:** If something is unclear, note it as "Implementation suggests..." or "Appears to..."

### Phase 4: Quality Checks

Before finalizing, ensure:

- [ ] All major components are documented
- [ ] All public APIs are documented
- [ ] Business logic is clearly explained
- [ ] Technical architecture is comprehensively covered
- [ ] Integration points are identified
- [ ] Data models are documented
- [ ] Cross-references between documents are consistent
- [ ] Technical terms are used consistently
- [ ] The documents are organized logically
- [ ] The documents are readable by both technical and non-technical stakeholders

### Output Format

Please create three separate markdown files:
1. `BUSINESS_CONTEXT.md` - Business-focused specification
2. `TECHNICAL_CONTEXT.md` - Technical implementation details
3. `SYSTEM_SPECIFICATION.md` - Unified comprehensive specification

Start by analyzing the repository structure and then proceed to generate each document.
```

---

## Usage Instructions

1. **Copy the entire prompt** from the section above
2. **Paste it into your AI assistant** (GitHub Copilot, ChatGPT, Claude, etc.)
3. **The AI will analyze your repository** and generate the three specification documents
4. **Review and refine** the generated documents as needed

## Customization

You can customize this prompt by:

- Adding specific sections relevant to your domain (e.g., GDPR compliance, financial regulations)
- Removing sections that aren't relevant to your tech stack
- Adding company-specific documentation standards
- Including specific frameworks or patterns you want documented
- Adding compliance or regulatory requirements to document

## Benefits

- **Technology Agnostic:** Works with any programming language or framework
- **Comprehensive:** Covers both business and technical aspects
- **Structured:** Provides clear document templates
- **Scalable:** Works for small to large codebases
- **Maintainable:** Generated docs can be updated as code changes

## Best Practices

1. **Run periodically:** Generate specs after major changes or quarterly
2. **Version control:** Keep specs in version control alongside code
3. **Review and validate:** Have domain experts review business context, architects review technical context
4. **Update as needed:** Don't treat as one-time; update when significant changes occur
5. **Use as onboarding:** Excellent resource for new team members

## Notes

- The AI may need to make multiple passes through the codebase for large repositories
- For very large repositories (>1000 files), consider breaking the analysis into modules
- The generated documents are starting points; human review and refinement improve quality
- Some business context may not be evident from code alone and may need manual addition