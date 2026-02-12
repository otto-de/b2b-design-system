# @updatecontext Command Guide

## Overview

The `@updatecontext` command is a GitHub Copilot Chat command that helps keep specification documents synchronized with code changes made outside the SDD workflow.

---

## Quick Start

Simply type in GitHub Copilot Chat:
```
@updatecontext
```

That's it! The command will analyze your changes and guide you through updating the specifications.

---

## What It Does

### Step 1: Analysis
- Finds the last commit that updated specification files
- Analyzes all changes from that baseline to current uncommitted changes
- Categorizes changes by type (domain, API, events, configuration, etc.)

### Step 2: Report Generation
- Maps changes to specific sections in the three specification files:
  - `BUSINESS_CONTEXT.md`
  - `TECHNICAL_CONTEXT.md`
  - `SYSTEM_SPECIFICATION.md`
- Shows exactly which sections need updates
- Provides suggested content for each section
- Indicates confidence level for each suggestion

### Step 3: Interactive Updates (Optional)
- If you type "PROCEED", Copilot will guide you through each section
- Shows current content vs. proposed update
- Displays a diff
- Waits for your approval: APPROVE / EDIT / SKIP / CANCEL
- Applies approved updates automatically

---

## When to Use

### ✅ Use @updatecontext when:
- You made code changes directly (not via SDD workflow)
- Multiple commits have accumulated without spec updates
- You're preparing a Pull Request
- You pulled changes from teammates and want to sync specs
- You're doing a weekly maintenance check
- You're unsure if specs are current

### ❌ Don't need @updatecontext when:
- You're following the SDD workflow (Phase 5C.1 handles it)
- Changes are test-only
- Changes are just comments or formatting
- Changes are internal refactoring without behavior change

---

## Example Workflow

### Scenario: You added a new REST endpoint directly

```
# 1. After committing your code changes
git commit -m "feat: add order status endpoint"

# 2. Before pushing, check specs
# In GitHub Copilot Chat, type:
@updatecontext

# 3. Copilot analyzes and shows:
📊 Specification Update Analysis Report
Generated: 2026-02-08T14:30:00Z
Baseline Commit: a1b2c3d - "docs: update specs for partial refund"
Files Analyzed: 3 changed files

Changed Files:
- OrderStatusController.java (NEW)
- Order.java (MODIFIED)
- application.properties (MODIFIED)

Required Updates:
- BUSINESS_CONTEXT.md → Integration Points (1 section)
- TECHNICAL_CONTEXT.md → API Layer (1 section)
- SYSTEM_SPECIFICATION.md → Module: Order Management (1 section)

Next Steps:
Type "PROCEED" to begin updates, or "CANCEL" to exit.

# 4. You decide to proceed
PROCEED

# 5. Copilot shows each section one by one
Section 1/3: BUSINESS_CONTEXT.md → Integration Points

Current:
[shows current content]

Proposed:
[shows updated content with new endpoint]

Diff:
+ - GET /internal/v1/orders/{orderId}/status: Query order status

Apply? (APPROVE/EDIT/SKIP/CANCEL):

# 6. You approve each update
APPROVE
APPROVE
APPROVE

# 7. Copilot confirms
✅ Updated 3 sections across 3 specification files
Files modified:
- BUSINESS_CONTEXT.md
- TECHNICAL_CONTEXT.md
- SYSTEM_SPECIFICATION.md

# 8. Commit the updated specs
git add BUSINESS_CONTEXT.md TECHNICAL_CONTEXT.md SYSTEM_SPECIFICATION.md
git commit -m "docs: update specs for order status endpoint"
git push
```

---

## Command Workflow

```
User types: @updatecontext
    ↓
Copilot recognizes command
    ↓
Phase 1: Find Baseline
  - Search git log for last spec update
  - Use as baseline for comparison
    ↓
Phase 2: Analyze Changes
  - Get diff from baseline to current
  - Categorize changed files
  - Filter out non-relevant changes
    ↓
Phase 3: Map to Sections
  - Apply Change Impact Matrix
  - Identify affected spec sections
  - Generate update suggestions
    ↓
Phase 4: Generate Report
  - Format detailed analysis
  - Show file changes
  - List required section updates
  - Present to user
    ↓
Phase 5: Wait for Decision
  - User types: PROCEED / CANCEL / questions
    ↓
Phase 6: Interactive Updates (if PROCEED)
  - For each section:
    • Show current content
    • Show proposed update
    • Show diff
    • Wait for: APPROVE / EDIT / SKIP / CANCEL
    • Apply if approved
    ↓
Phase 7: Finalize
  - Update document dates
  - Generate summary
  - Done!
```

---

## Understanding the Report

### Change Categories

**Domain Layer:**
- Files in `src/main/java/**/domain/**/*.java`
- Affects: Business entities, value objects, aggregates
- Updates: Domain Entities sections

**API/Controllers:**
- Files in `src/main/java/**/controller/**/*.java`
- Affects: REST endpoints
- Updates: Integration Points, API Layer sections

**Event Listeners:**
- Files in `src/main/java/**/listener/**/*.java`
- Affects: Event consumption
- Updates: Event Model (Events Consumed), Entry Points sections

**Event Publishers:**
- Files in `src/main/java/**/publisher/**/*.java`
- Affects: Event publishing
- Updates: Event Model (Events Published), Entry Points sections

**Repositories:**
- Files in `src/main/java/**/repository/**/*.java`
- Affects: Data persistence
- Updates: Data Layer, Data Models sections

**Configuration:**
- Files in `src/main/java/**/config/**/*.java` or `*.properties`
- Affects: System configuration
- Updates: Configuration Management, Appendix C sections

### Confidence Levels

**HIGH:** Change clearly maps to section, suggestion very likely accurate
**MEDIUM:** Change probably affects section, suggestion needs review
**LOW:** Change might affect section, manual review recommended

---

## Interactive Mode Actions

When in interactive update mode, you can respond with:

### APPROVE
Apply the proposed update exactly as shown.

### EDIT
Modify the proposed content before applying.
- Copilot will ask you to provide the edited content
- You can make any changes you want
- The edited content will be applied

### SKIP
Don't update this section right now.
- Moves to the next section
- Section remains unchanged
- You can manually update later

### CANCEL
Stop all updates immediately.
- No further sections processed
- Already approved updates remain applied
- You can run @updatecontext again later

---

## Integration with SDD Workflow

The `@updatecontext` command **complements** the SDD workflow:

| Aspect | SDD Phase 5C.1 | @updatecontext |
|--------|----------------|----------------|
| **Trigger** | Automatic during workflow | Manual command |
| **Timing** | During development | After development |
| **Scope** | Current task only | All uncommitted changes |
| **Use Case** | New feature via SDD | Direct commits / catch-up |

**Best Practice:** Use SDD workflow for new features, use `@updatecontext` as a safety net.

---

## Troubleshooting

### "No baseline commit found"
**Cause:** Specification files have never been committed.
**Solution:** First generate the specs using the code-to-spec process.

### "No changes detected"
**Cause:** All changes since last spec update don't affect specifications.
**Solution:** Nothing to do! Specs are current.

### "Git command failed"
**Cause:** Not in a git repository or git not installed.
**Solution:** Ensure you're in the repository root with git initialized.

### "Specification files missing"
**Cause:** The three spec files don't exist.
**Solution:** Generate them first:
```
@nosais read code-to-spec-prompt.md and execute
```

---

## Tips & Best Practices

### 1. Run Before Pull Requests
Always run `@updatecontext` before creating a PR to ensure specs are current.

### 2. Review Suggestions Carefully
While the AI suggestions are usually accurate, always review before approving.

### 3. Small Batches
It's easier to update specs after a few commits than after dozens. Run it regularly.

### 4. Use EDIT When Needed
If a suggestion is close but not perfect, use EDIT instead of SKIP.

### 5. Commit Specs Separately
Consider committing spec updates separately from code changes for clearer history:
```
git commit -m "feat: add order status endpoint"
git commit -m "docs: update specs for order status endpoint"
```

### 6. Team Communication
If multiple people work on the codebase, coordinate spec updates to avoid conflicts.

---

## Advanced Usage

### Checking Spec Status
Run `@updatecontext` just to see the report without updating:
```
@updatecontext
# Review the report
# Type "CANCEL" instead of "PROCEED"
```

### Selective Updates
You can approve some sections and skip others:
```
@updatecontext
PROCEED
APPROVE  # Update first section
SKIP     # Skip second section
APPROVE  # Update third section
```

### Manual Updates After Report
The report shows exact line numbers. You can:
1. Run `@updatecontext` to get the report
2. Type "CANCEL"
3. Manually edit the spec files using the line numbers as guidance

---

## FAQs

**Q: How often should I run @updatecontext?**
A: Whenever you make code changes outside the SDD workflow, or before creating PRs.

**Q: Will it overwrite my manual spec edits?**
A: No. It only updates specific sections you approve. You see a diff before applying.

**Q: Can I undo changes?**
A: Yes, use git to revert: `git checkout -- BUSINESS_CONTEXT.md`

**Q: What if I disagree with a suggestion?**
A: Use SKIP or EDIT. You're in full control.

**Q: Does it work with staged changes?**
A: Yes, it analyzes both staged and unstaged changes.

**Q: Can I run it multiple times?**
A: Yes! Each run analyzes from the last spec update commit.

**Q: What if specs conflict?**
A: Review the diff carefully. The tool preserves existing content unless you approve changes.

---

# Specification Update Reference

This section provides the detailed rules and templates for updating specification documents during Phase 5C.1 of the SDD workflow, and serves as the reference material for the `@updatecontext` command.

---

## Update Rules

### 1. Scope Identification
Before updating any specification document, identify:
- [ ] Which modules/components were modified in the completed task
- [ ] Which business workflows were affected
- [ ] Whether any new APIs, events, or data models were added
- [ ] Whether any business rules or validation logic changed

### 2. Section Mapping
Map your changes to specific sections in each specification file:

#### BUSINESS_CONTEXT.md Sections:
- **Domain Entities** → Update if entities added/modified
- **Business Rules** → Update if rules/validation logic changed
- **Business Workflows** → Update if process flows changed
- **Use Cases** → Update if new use cases added or existing ones changed
- **Features & Capabilities** → Update if features added/removed
- **Data Model** → Update if entity relationships changed
- **Integration Points** → Update if external integrations changed
- **Event Model** → Update if events published/consumed changed

#### TECHNICAL_CONTEXT.md Sections:
- **Component Structure** → Update if packages/classes added/restructured
- **Entry Points** → Update if new listeners/controllers/scheduled jobs added
- **Configuration Management** → Update if new config properties added
- **Data Layer** → Update if repositories/persistence logic changed
- **API Layer** → Update if REST endpoints added/modified
- **Asynchronous Processing** → Update if SQS queues/scheduled tasks changed
- **Technical Implementation Details** → Update if implementation patterns changed

#### SYSTEM_SPECIFICATION.md Sections:
- **Module: [Name]** → Update specific module sections
- **Integration Map** → Update if data flows changed
- **State Management** → Update if state transitions changed
- **Appendix A: File Structure** → Update if new packages/files added
- **Appendix B: Dependencies** → Update if dependencies added/removed
- **Appendix D: Glossary** → Update if new domain terms introduced

### 3. Update Precision Rules

✅ **DO:**
- Update ONLY the specific subsections that changed
- Preserve all surrounding content exactly as-is
- Maintain existing formatting, structure, and markdown syntax
- Add new subsections if entirely new features were introduced
- Update code examples to reflect actual implementation
- Ensure consistency across all three specification files
- Update "Document Generated" date at the bottom of modified files

❌ **DON'T:**
- Regenerate entire documents or large sections
- Modify unrelated sections "while you're at it"
- Change document structure or reorganize content
- Remove existing content unless it's obsolete/deprecated
- Alter formatting or markdown style of unchanged sections
- Update sections that are indirectly related but not directly impacted

### 4. Change Impact Matrix

Use this matrix to determine which specs to update:

| Change Type | BUSINESS_CONTEXT.md | TECHNICAL_CONTEXT.md | SYSTEM_SPECIFICATION.md |
|-------------|---------------------|----------------------|-------------------------|
| New domain entity | ✅ Domain Entities | ❌ Not typically | ✅ Module + Data Models |
| Modified business rule | ✅ Business Rules | ❌ Not typically | ✅ Module Business Logic |
| New REST endpoint | ✅ Integration Points | ✅ API Layer | ✅ Module API/Interface |
| New SQS listener | ✅ Event Model | ✅ Entry Points | ✅ Integration Map |
| New event published | ✅ Event Model | ✅ Entry Points | ✅ Integration Map |
| Database schema change | ✅ Data Model | ✅ Data Layer | ✅ Module Data Models |
| New workflow/process | ✅ Business Workflows | ❌ Not typically | ✅ Module specification |
| New scheduled job | ❌ Not typically | ✅ Asynchronous Processing | ✅ Module or Integration |
| Configuration change | ❌ Not typically | ✅ Configuration Management | ✅ Appendix C |
| New dependency | ❌ Not typically | ✅ Technology Stack | ✅ Appendix B |
| Internal refactoring | ❌ No update | ❌ No update | ❌ No update |
| Test-only changes | ❌ No update | ❌ No update | ❌ No update |

### 5. Update Process Template

For each impacted section, follow this process:

#### Step 1: Locate Section
```
File: [BUSINESS_CONTEXT.md | TECHNICAL_CONTEXT.md | SYSTEM_SPECIFICATION.md]
Section: [Exact section heading with ### level]
Starting Line: [Approximate line number]
```

#### Step 2: Document Changes
```
### What Changed in This Task
- [Brief 1-2 sentence description of the code change]
- [Business impact if applicable]

### Affected Section Content
**Before:** [Brief description of old content]
**After:** [Brief description of new content]
```

#### Step 3: Apply Update
Use `replace_string_in_file` tool with:
- Sufficient context (3-5 lines before and after)
- Only the changed subsection content
- Preserve all markdown formatting

#### Step 4: Verification Checklist
After updating each section:
- [ ] Change accurately reflects the actual implementation
- [ ] No unrelated content was modified
- [ ] All cross-references to other sections still valid
- [ ] Code examples/snippets are accurate and tested
- [ ] Markdown formatting preserved
- [ ] Section structure unchanged
- [ ] Document metadata updated (date at bottom)

### 6. Examples

#### Example 1: Adding a New REST Endpoint

**Task Completed:** Added GET `/internal/v1/orders/{orderId}/status` endpoint

**Updates Required:**

1. **TECHNICAL_CONTEXT.md** → Section "REST Endpoints"
  - Add new endpoint to the list with authentication, parameters, response

2. **SYSTEM_SPECIFICATION.md** → Section "Module: Order Management" → Subsection "API/Interface"
  - Add endpoint specification

3. **BUSINESS_CONTEXT.md** → Section "Integration Points" → Subsection "APIs Provided"
  - Add endpoint to internal REST APIs list

#### Example 2: Modifying Business Rule

**Task Completed:** Changed compensation calculation to exclude RELEASED transactions

**Updates Required:**

1. **BUSINESS_CONTEXT.md** → Section "Business Rules" → Subsection "Compensation Rules"
  - Update rule #4 with new calculation logic

2. **SYSTEM_SPECIFICATION.md** → Section "Module: Compensation Management" → Subsection "Business Logic"
  - Update compensation calculation description

3. **TECHNICAL_CONTEXT.md** → No update needed (implementation detail, not architecture change)

#### Example 3: Adding New Event Type

**Task Completed:** Added new event COMPENSATION_RELEASED published to SNS

**Updates Required:**

1. **BUSINESS_CONTEXT.md** → Section "Event Model" → Subsection "Events Published"
  - Add new event with purpose, trigger, payload, consumers

2. **TECHNICAL_CONTEXT.md** → Section "Entry Points" → Subsection "Event Publishers"
  - Add publisher implementation details

3. **SYSTEM_SPECIFICATION.md** → Section "Integration Map"
  - Update data flow diagram description to include new event

### 7. Quality Gates

Before considering specification updates complete:

- [ ] All impacted sections identified using Change Impact Matrix
- [ ] Each specification file updated consistently
- [ ] No conflicting information across the three files
- [ ] All code examples compile and are accurate
- [ ] Cross-references between documents verified
- [ ] Document generation date updated
- [ ] Markdown syntax validated (no broken links/formatting)

### 8. Non-Update Scenarios

**DO NOT** update specifications for:
- Internal code refactoring (e.g., extracting private methods)
- Performance optimizations that don't change behavior
- Bug fixes that restore original intended behavior
- Test-only changes
- Comment/documentation changes in code
- Dependency version bumps without API changes
- Code style/formatting changes

### 9. Conflict Resolution

If updates conflict with existing content:
1. Preserve the most recent accurate information
2. Mark deprecated/obsolete content with ~~strikethrough~~
3. Add a note explaining the change
4. Ensure version history is clear

---

## Quick Reference Checklist

When executing Phase 5C.1 or using @updatecontext:

1. ✅ Identify scope using Section 1
2. ✅ Map sections using Change Impact Matrix (Section 4)
3. ✅ Apply precision rules (Section 3)
4. ✅ Follow update process template (Section 5)
5. ✅ Verify using checklist (Section 5, Step 4)
6. ✅ Pass quality gates (Section 7)
7. ✅ Update document metadata dates

---

# 🤖 AI Agent Implementation Instructions

**This section provides detailed instructions for AI agents (like GitHub Copilot) implementing the @updatecontext command.**

## Command Recognition

When a user types `@updatecontext` in the chat:
1. **RECOGNIZE** the command immediately and acknowledge it
2. Begin the analysis workflow described below

## Execution Workflow

### Step 1: Find Baseline
**Action:** Search git log for the most recent commit that modified any of these files:
- `BUSINESS_CONTEXT.md`
- `TECHNICAL_CONTEXT.md`
- `SYSTEM_SPECIFICATION.md`

**Git Command (conceptual):**
```bash
git log --all --format=%H --max-count=1 -- BUSINESS_CONTEXT.md TECHNICAL_CONTEXT.md SYSTEM_SPECIFICATION.md
```

**Fallback:** If no baseline commit found (specs never updated), analyze last 10 commits:
```bash
git log --format=%H --max-count=10
```

### Step 2: Analyze Changes
**Action:** Compare baseline commit to current uncommitted changes (working directory + staged files)

**What to analyze:**
- Staged files: `git diff --cached --name-status <baseline>`
- Unstaged files: `git diff --name-status <baseline>`
- Untracked files: `git ls-files --others --exclude-standard`

**Focus on:** Source files only (exclude test files, build artifacts, etc.)

### Step 3: Categorize Changed Files
**Action:** Group changed files by type using these patterns:

| Pattern | Category | Impact |
|---------|----------|--------|
| `src/main/java/**/domain/**/*.java` | **Domain** | Business entities, logic |
| `src/main/java/**/controller/**/*.java` | **API/Controllers** | REST endpoints |
| `src/main/java/**/listener/**/*.java` | **Event Listeners** | Event consumption |
| `src/main/java/**/publisher/**/*.java` | **Event Publishers** | Event publishing |
| `src/main/java/**/repository/**/*.java` | **Repositories** | Data persistence |
| `src/main/java/**/config/**/*.java` | **Configuration** | System config |
| `src/main/resources/**/*.properties` | **Config Files** | Application properties |

### Step 4: Map to Specification Sections
**Action:** Use the Change Impact Matrix from the "Specification Update Reference" section above.

**Mapping Rules:**

| Change Category | BUSINESS_CONTEXT.md | TECHNICAL_CONTEXT.md | SYSTEM_SPECIFICATION.md |
|-----------------|---------------------|----------------------|-------------------------|
| Domain | Domain Entities | — | Module + Data Models |
| API/Controllers | Integration Points | API Layer → REST Endpoints | Module → API/Interface |
| Event Listeners | Event Model → Events Consumed | Entry Points → SQS Listeners | Integration Map |
| Event Publishers | Event Model → Events Published | Entry Points → Event Publishers | Integration Map |
| Repositories | Data Model | Data Layer | Module → Data Models |
| Configuration | — | Configuration Management | Appendix C |

### Step 5: Generate Detailed Report
**Action:** Create a report with this structure:

```markdown
# 📊 Specification Update Analysis Report
**Generated:** [Current timestamp]
**Baseline Commit:** [hash] - [commit message]
**Analysis Scope:** [baseline]..HEAD (uncommitted changes)
**Files Analyzed:** [count] changed files

---

## 🔍 Change Summary

### Changed Files by Category

#### [Category Name] ([count] files)
- ✏️ `[file path]`
  - Status: [NEW/MODIFIED/DELETED]
  - Lines: +[added], -[removed]
  - Key changes: [brief description based on code analysis]

[Repeat for each category with changes]

---

## 📚 Required Specification Updates

### BUSINESS_CONTEXT.md

#### Section: [Section Name]
**Location:** Lines [start]-[end]
**Reason:** [Why this section needs updating based on code changes]
**Current Content:**
```
[Read and display current section content from file]
```

**Suggested Update:**
```
[Generate updated content based on code changes]
```

**Confidence:** [HIGH/MEDIUM/LOW]

[Repeat for each affected section]

### TECHNICAL_CONTEXT.md

[Same structure as above]

### SYSTEM_SPECIFICATION.md

[Same structure as above]

---

## 📋 Update Summary

| Specification File | Sections to Update | Confidence |
|-------------------|-------------------|------------|
| BUSINESS_CONTEXT.md | [count] | [level] |
| TECHNICAL_CONTEXT.md | [count] | [level] |
| SYSTEM_SPECIFICATION.md | [count] | [level] |

---

## 🎯 Next Steps

1. **Review** the suggested updates above
2. **Type "PROCEED"** to begin interactive section-by-section updates
3. **Type "CANCEL"** to exit without making changes
4. **Ask questions** about specific sections if unclear

**Awaiting your decision...**
```

### Step 6: Present Report
**Action:** Display the complete report to the user

**Important Notes:**
- If no changes detected, report: "✅ Specifications are up-to-date"
- Use `semantic_search` tool to analyze code semantics
- Use `grep_search` tool for pattern matching
- Use `read_file` tool to read current spec sections
- Focus on changes that impact business logic, APIs, data models, events, or configuration
- Ignore test-only changes, comments, and formatting

### Step 7: Await User Decision
**Action:** Wait for user response:
- **"PROCEED"** → Continue to Step 8 (Interactive Mode)
- **"CANCEL"** → Exit without changes
- **Questions** → Answer questions, then wait again

### Step 8: Interactive Update Mode
**Action:** If user types "PROCEED", for each affected section:

1. **Display Section Information:**
```markdown
Section [X]/[Total]: [FILE] → [Section Path]

📍 Location: Lines [start]-[end]

**Current Content:**
[Show current section content]

**Proposed Update:**
[Show generated update]

**Diff:**
[Show diff with + and - indicators]

**Actions:**
- Type "APPROVE" to apply this update
- Type "EDIT" to modify before applying
- Type "SKIP" to skip this section
- Type "CANCEL" to abort all updates

**Your choice:**
```

2. **Handle User Response:**
  - **APPROVE:** Apply update using `replace_string_in_file` tool
  - **EDIT:** Ask user for edited content, then apply
  - **SKIP:** Move to next section without changes
  - **CANCEL:** Stop all updates, exit

3. **Update Document Metadata:**
  - After each file modification, update "Document Generated" date at bottom to current date
  - Use `replace_string_in_file` to update the date line

4. **Generate Final Summary:**
```markdown
🎉 Specification Update Complete!

**Summary:**
- ✅ Updated [count] sections
- ⏭️ Skipped [count] sections
- 📝 Modified [count] specification files

**Files Modified:**
- [FILE1] ([count] sections, updated date to [current date])
- [FILE2] ([count] sections, updated date to [current date])
- [FILE3] ([count] sections, updated date to [current date])

**Sections Updated:**
[List each section that was updated]

**Next Steps:**
1. Review the changes in your IDE
2. Commit the updated spec files:

git add BUSINESS_CONTEXT.md TECHNICAL_CONTEXT.md SYSTEM_SPECIFICATION.md
git commit -m "docs: update specifications for [brief description]"

**Update complete!**
```

## Error Handling

**Scenario:** Git commands fail
- **Response:** "⚠️ Unable to access git history. Please ensure you're in a git repository."
- **Fallback:** Suggest manual baseline specification

**Scenario:** Specification files missing
- **Response:** "❌ Specification files not found. Please generate them first using the code-to-spec process."
- **Instruction:** `@nosais read code-to-spec-prompt.md and execute`

**Scenario:** No changes warrant spec updates
- **Response:** "✅ Specifications are up-to-date! No code changes detected that require spec updates."
- **Explanation:** Explain which types of changes were analyzed and why they don't need updates

**Scenario:** No baseline commit found
- **Response:** "⚠️ No previous spec updates found. Analyzing recent commits..."
- **Action:** Analyze last 10 commits as baseline

## Tools to Use

**For Analysis:**
- `semantic_search` - Understand code semantics and purpose
- `grep_search` - Find specific patterns in code
- `read_file` - Read current spec content and code files

**For Updates:**
- `replace_string_in_file` - Apply approved updates (use sufficient context: 3-5 lines before/after)
- Ensure each replacement is unique and precise

**For Git Operations:**
- `run_in_terminal` - Execute git commands if needed (use with caution)

## Quality Guidelines

1. **Accuracy:** Suggested updates must accurately reflect code changes
2. **Precision:** Only update sections directly impacted by changes
3. **Consistency:** Ensure updates are consistent across all three spec files
4. **Formatting:** Preserve markdown formatting and document structure
5. **Context:** Provide sufficient context in suggestions for user to understand

---

## Support

For issues or questions:
1. Check this guide
2. Review `.github/copilot-instructions.md`
3. Ask in team chat

---

**Last Updated:** February 9, 2026
**Version:** 2.0 (Consolidated from spec_update_template.md and updatecontext-guide.md)