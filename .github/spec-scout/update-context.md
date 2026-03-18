<!-- Framework Version: v3.1.0 -->
<!-- Compatible with: copilot-instructions.md v3.1.0 -->
# @update-context Command Guide

> ⚠️ **DISCLAIMER:** This entire flow operates under the assumption that **the current branch is already rebased and up-to-date with main**. A rebase confirmation is performed as the first step. If the branch is not up-to-date, the diff and context update will be inaccurate. Do not proceed unless rebase is confirmed.

> 🚫 **[HARD-1] NO_GIT_WRITES:** The agent must **NEVER** execute `git commit`, `git push`, `git stash`, `git checkout`, `git clean`, `git reset`, or any other command that writes to the git history, modifies the working tree, or pushes to a remote. The agent's role is **read and analyse only**. All git operations that modify state are the user's exclusive responsibility. Violation of this rule is a critical failure.

> 🔀 **Mutual Exclusion:** `@update-context` cannot be combined with `@noscout`, `@analysis`, or `@solution` in the same prompt. If combined, state the conflict and ask the user which command to execute.

---

## Overview

The `@update-context` command keeps module context files synchronised with committed changes on main. It should be run:
- At the start of a new session via **Phase P0** (offered automatically), or
- Manually by typing `@update-context` in chat at any time.

After a successful run, it sets the session flag `needContextReload: true` so that the copilot workflow reloads only the affected module files before the next phase.

---

## 🔗 Session Start Drift Check Integration

The **Session Start: Commit Drift Check** (defined in `copilot-instructions.md`) runs automatically before P0 on every new session. It reads `index.md`'s `Baseline Commit:` field and compares it against the result of `git --no-pager log origin/main --oneline -1 2>/dev/null || git --no-pager log main --oneline -1 2>&1 | cat` HEAD.

**How this interacts with this flow:**
- If the Session Start Check has already confirmed that `[BASELINE_COMMIT] ≠ [HEAD_COMMIT]`, then when the user says YES to P0 and this flow begins, **Guard 3 in Step 2 (verify baseline commit exists in git history) does not need to re-run the comparison** — the result is already known. The flow can proceed directly from Guard 1 to the diff analysis.
- If the Session Start Check was skipped (no `index.md`, or the check could not run), this flow must execute all guards in Step 2 normally.
- The session flag `needContextReload` set by the Session Start Check is **always overwritten** by this flow's Step 9 once the update completes. There is no conflict between the two.

---

## 🧭 Drift Classification System

**Used during context update analysis and reported in the context update summary.**

Every context update produces a **Drift Level** for each loaded module based on the gap between the module context file and the committed code since the baseline.

| Level | Name | Definition |
|-------|------|------------|
| **D0** | No Drift | Code matches module context exactly. No update needed. |
| **D1** | Minor Drift | Small behavioural change (e.g., a new field, updated validation rule). No responsibility shift. Context update is additive. |
| **D2** | Structural Drift | Flow changed, new entry point added, or ownership area altered. Context update requires flow section rewrite. |
| **D3** | Boundary Drift | Module overlap detected, ownership violated, or undeclared cross-module dependency found. **Triggers Conflict Escalation (see `.github/spec-scout/code-to-spec.md`).** |

**Rules:**
- A **D3** finding in any module **freezes the update** until the conflict is resolved.
- The final Drift Level for each module is written into `index.md` under `## Drift State` after the update is applied.

---

## Execution Workflow

### Step 1: Rebase Confirmation (MANDATORY FIRST STEP)

Before any git operations, ask the user:

> "**Are all the latest changes from main rebased into your current branch?**
> The context update compares your branch to main. If your branch is not up-to-date, the context diff will be inaccurate.
> _(Reply **YES** to confirm and continue, or **NO** to abort.)_"

- **If YES:** Proceed to Step 2.
- **If NO:** **Stop immediately** and output:
  > ❌ **Context update aborted.** Please rebase or merge main into your current branch before running `@update-context`. This ensures the diff accurately reflects what has drifted.

---

### Step 2: Pre-Flight Validation & Baseline Resolution

**This step MUST be completed before any analysis begins. Abort if any guard fails.**

#### Guard 1: Read baseline commit from `index.md`
**Action:** Read `.github/spec-scout/context/index.md` and extract the value of `Baseline Commit:` from the `## Context Baseline` block.

```
Expected field in index.md:
  ## Context Baseline
  - **Baseline Commit:** <hash>
```

- If `index.md` is missing or does not contain a `Baseline Commit:` value → **STOP immediately** and output:
  > ❌ **Cannot proceed.** No baseline commit found in `.github/spec-scout/context/index.md`.
  > The context documents must be generated first using the code-to-spec process on `main`.

- Record the extracted value as `[BASELINE_COMMIT]`.

#### Guard 2: Get current main HEAD commit
**Action:** Run the following single command (always use this exact form — it is pager-safe and handles remote-unavailable gracefully):
```bash
git --no-pager log origin/main --oneline -1 2>/dev/null || git --no-pager log main --oneline -1 2>&1 | cat
```
> **Why this form:** `git log` without `--no-pager` opens an interactive pager (`less`) that blocks indefinitely waiting for a keypress. The `2>/dev/null` on the first clause silently suppresses errors if `origin/main` is not available, and the `|| ... | cat` fallback then runs non-interactively. **Always use `--no-pager` and pipe through `cat` for every git log command in this workflow.**

- Record this value as `[CURRENT_MAIN_HEAD]`.
- **Only capture commits up to and including the latest main/master branch commit — do NOT include commits only on the current feature branch.**

#### Guard 3: Compare baseline to main HEAD
- If `[BASELINE_COMMIT]` == `[CURRENT_MAIN_HEAD]` → **STOP and output:**
  > ✅ **Context is already up-to-date.** The context was last generated at `[CURRENT_MAIN_HEAD]`. No drift to analyse.
- If `[BASELINE_COMMIT]` != `[CURRENT_MAIN_HEAD]` → proceed to Step 3.

**Commit distance check:**
```bash
git --no-pager rev-list --count [BASELINE_COMMIT]..origin/main 2>&1 | cat
```
- Record this as `[COMMIT_DISTANCE]`.
- If `[COMMIT_DISTANCE]` > 5:
  > ⚠️ **High Drift Warning:** There are `[COMMIT_DISTANCE]` commits between the context baseline and current main HEAD. This is a significant drift. After updating context, **you are strongly required to commit and push the updated context files to main immediately** — do not defer this.

---

### Step 3: Get Commit Summary

**Action:** Retrieve the commit log between `[BASELINE_COMMIT]` and `[CURRENT_MAIN_HEAD]` (main only, not current branch commits):
```bash
git --no-pager log [BASELINE_COMMIT]..origin/main --oneline 2>&1 | cat
```

Display these commits to the user as part of the summary in Step 5.

---

### Step 4: Analyse File-Level Changes (Diff)

**Action:** Get the list of files changed between the baseline and main HEAD:
```bash
git --no-pager diff --name-status [BASELINE_COMMIT]..origin/main 2>&1 | cat
```

Also check for staged/unstaged local changes:
```bash
git --no-pager diff --cached --name-status 2>&1 | cat
git --no-pager diff --name-status 2>&1 | cat
git ls-files --others --exclude-standard 2>&1 | cat
```

**Focus on:** Source files only (exclude test files, build artifacts, etc.)

**Categorise changed files** by type.

**First: read the `## 🛠️ Repo Tech Specification` block in `index.md`** to identify the project's tech stack, then apply the matching pattern set below. If multiple stacks are present, apply all relevant sets.

**Java / Spring Boot:**
| Pattern | Category | Impact |
|---------|----------|--------|
| `**/domain/**/*.java` | **Domain** | Business entities, logic |
| `**/controller/**/*.java` | **API/Controllers** | REST endpoints |
| `**/listener/**/*.java` | **Event Listeners** | Event consumption |
| `**/publisher/**/*.java` | **Event Publishers** | Event publishing |
| `**/repository/**/*.java` | **Repositories** | Data persistence |
| `**/config/**/*.java` | **Configuration** | System config |
| `**/resources/**/*.properties`, `**/resources/**/*.yml` | **Config Files** | Application properties |

**Node.js / TypeScript:**
| Pattern | Category | Impact |
|---------|----------|--------|
| `**/models/**`, `**/entities/**`, `**/domain/**` | **Domain** | Business entities |
| `**/routes/**`, `**/controllers/**`, `**/handlers/**` | **API/Controllers** | REST endpoints |
| `**/listeners/**`, `**/consumers/**`, `**/subscribers/**` | **Event Listeners** | Event consumption |
| `**/publishers/**`, `**/producers/**` | **Event Publishers** | Event publishing |
| `**/repositories/**`, `**/dal/**`, `**/db/**` | **Repositories** | Data persistence |
| `**/config/**`, `**/*.config.ts`, `**/*.config.js` | **Configuration** | System config |

**Python:**
| Pattern | Category | Impact |
|---------|----------|--------|
| `**/models/**`, `**/domain/**`, `**/entities/**` | **Domain** | Business entities |
| `**/views/**`, `**/routers/**`, `**/api/**` | **API/Controllers** | REST endpoints |
| `**/listeners/**`, `**/consumers/**` | **Event Listeners** | Event consumption |
| `**/publishers/**`, `**/producers/**` | **Event Publishers** | Event publishing |
| `**/repositories/**`, `**/db/**`, `**/persistence/**` | **Repositories** | Data persistence |
| `**/config/**`, `**/settings/**` | **Configuration** | System config |

**Go:**
| Pattern | Category | Impact |
|---------|----------|--------|
| `**/domain/**`, `**/model/**`, `**/entity/**` | **Domain** | Business entities |
| `**/handler/**`, `**/controller/**`, `**/api/**` | **API/Controllers** | REST endpoints |
| `**/listener/**`, `**/consumer/**` | **Event Listeners** | Event consumption |
| `**/publisher/**`, `**/producer/**` | **Event Publishers** | Event publishing |
| `**/repository/**`, `**/store/**`, `**/db/**` | **Repositories** | Data persistence |
| `**/config/**` | **Configuration** | System config |

**Language-Agnostic Fallback (apply if no stack-specific pattern matches):**

If a changed file does not match any pattern above, categorise by file extension and directory name heuristics:
- File in a directory named `domain`, `model`, `entity`, `core` → **Domain**
- File in a directory named `api`, `controller`, `route`, `handler`, `view` → **API/Controllers**
- File in a directory named `listener`, `consumer`, `subscriber` → **Event Listeners**
- File in a directory named `publisher`, `producer`, `event` → **Event Publishers**
- File in a directory named `repo`, `repository`, `db`, `store`, `persistence`, `dal` → **Repositories**
- File in a directory named `config`, `settings`, `configuration` → **Configuration**
- If no heuristic matches → categorise as **Uncategorised — manual review required** and note it in the report

**All stacks — Build / Infra files:**
| File | Category | Impact |
|------|----------|--------|
| `pom.xml`, `build.gradle`, `package.json`, `requirements.txt`, `go.mod`, `Gemfile`, `*.csproj` | **Build / Dependency** | ⚠️ May require Repo Tech Spec update in `index.md` |
| `Dockerfile`, `docker-compose.yml`, `*.tf`, `*.yaml` (infra) | **Infra / Runtime** | ⚠️ May require Repo Tech Spec update in `index.md` |

> **Tech Spec Drift Rule:** If any Build/Dependency or Infra/Runtime file is in the changed set, flag it in the report as a potential **Repo Tech Spec update** required in `index.md` (`## 🛠️ Repo Tech Specification`). This will be handled in Step 7.

---

### Step 5: Generate & Display Summary Report

**Action:** Present the following report to the user and **await confirmation before making any changes.**

The report must render every proposed context change as a **Before → After** block using the exact markdown structure of the module context file. This lets the user review each change like a PR review and know exactly what will be written to disk.

---

**Report template:**

```
# 📊 Context Update Analysis Report
Generated: [Current timestamp]
Baseline Commit: [BASELINE_COMMIT] — "[commit message]"
Current Main HEAD: [CURRENT_MAIN_HEAD] — "[commit message]"
Commits Analysed: [COMMIT_DISTANCE] commits since baseline

⚠️ DISCLAIMER: This update assumes the current branch is latest with main.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🔍 Commits Since Baseline

  [SHORT_HASH] [commit message]
  [SHORT_HASH] [commit message]
  ... (one per line, newest first)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🔍 Changed Files by Category

### [Category Name] ([count] files)
| File | Status | What Changed |
|------|--------|--------------|
| `[file path]` | NEW / MODIFIED / DELETED | [one-line description] |

[Repeat table for each category that has changes]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🧭 Drift Classification

| Module Context File       | Drift Level | Reason                          |
|---------------------------|-------------|---------------------------------|
| `modules/[module_name].md` | D1          | [brief justification]          |

⚠️ Any D3 finding freezes the update until resolved.
   See .github/spec-scout/code-to-spec.md for the Conflict Escalation Model.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📚 Proposed Module Context Updates

Each change is shown in BEFORE → AFTER format using the exact structure of the
module context file. Review each block — the AFTER content is what will be
written directly into the file if you APPROVE.

──────────────────────────────────────────────────
📄 modules/[module_name].md  |  Drift: D1  |  [N] change(s)
──────────────────────────────────────────────────

  Change 1 of [N]
  Section: [e.g. ## FLOW 3: Cancel Order / ## Entry Points / ## Module Ownership]
  Reason:  [Why: linked to which committed file/behaviour changed]
  Confidence: HIGH / MEDIUM / LOW

  ← BEFORE (current content in file)
  ┌─────────────────────────────────────────────────
  │ ## FLOW 3: Cancel Order
  │ - **Trigger:** POST /orders/{id}/cancel received
  │ - **Steps:**
  │   1. Load Order by id
  │   2. Validate status is PENDING
  │   3. Mark status as CANCELLED
  │ - **Exit Point:** Order saved, OrderCancelled event published
  │ - **Impacted Areas:** OrderService, OrderRepository, OrderEventPublisher
  └─────────────────────────────────────────────────

  → AFTER (proposed new content — ready to write into file)
  ┌─────────────────────────────────────────────────
  │ ## FLOW 3: Cancel Order
  │ - **Trigger:** POST /orders/{id}/cancel received
  │ - **Steps:**
  │   1. Load Order by id
  │   2. Validate status is PENDING or CONFIRMED
  │   3. Mark status as CANCELLED
  │   4. Send cancellation notification via NotificationService
  │ - **Exit Point:** Order saved, OrderCancelled event published, notification dispatched
  │ - **Impacted Areas:** OrderService, OrderRepository, OrderEventPublisher, NotificationService
  └─────────────────────────────────────────────────

  🔍 Diff
  ─────────────────────────────────────────────────
  - 2. Validate status is PENDING
  + 2. Validate status is PENDING or CONFIRMED
  + 4. Send cancellation notification via NotificationService
  - **Exit Point:** Order saved, OrderCancelled event published
  + **Exit Point:** Order saved, OrderCancelled event published, notification dispatched
  - **Impacted Areas:** OrderService, OrderRepository, OrderEventPublisher
  + **Impacted Areas:** OrderService, OrderRepository, OrderEventPublisher, NotificationService
  ─────────────────────────────────────────────────

  [Repeat Change block for each additional section in this module]

──────────────────────────────────────────────────
📄 modules/[next_module_name].md  |  Drift: D0  |  No changes needed
──────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📋 Update Summary

| Module Context File       | Changes | Drift Level | Confidence |
|---------------------------|---------|-------------|------------|
| `modules/[name].md`       | [N]     | D1          | HIGH       |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ This is the proposed context update with main.

Review the BEFORE → AFTER blocks above for each change.
Type "PROCEED" to step through each change interactively with APPROVE / EDIT / SKIP options.
Type "CANCEL" to exit without making any changes.
```

- **Wait for user confirmation** before proceeding.
- If user types **"CANCEL"** → exit without changes.
- If user types **"PROCEED"** → proceed to Step 6 (Interactive Updates).

---

### Step 6: Interactive Update Mode

For each change, present the card below one at a time and wait for a response before moving to the next. **Do not batch-apply changes.**

```
▶️ Change [X] of [Total]  |  modules/[module_name].md  |  Section: [Section Path]

Reason:     [Why this section is being updated — which committed code change drove it]
Confidence: HIGH / MEDIUM / LOW

← BEFORE (current content in file)
┌─────────────────────────────────────────────────────────────
│ [Exact current content of the section as it appears in the .md file.
│  Preserve all headings (##, ###), bullets, code blocks, and indentation.
│  This is a verbatim copy-paste from the file.]
└─────────────────────────────────────────────────────────────

→ AFTER (proposed new content — ready to copy directly into the file)
┌─────────────────────────────────────────────────────────────
│ [Exact proposed replacement — same structure and heading levels as BEFORE.
│  Only the changed lines differ. This block can be pasted directly into
│  the module file without any reformatting.]
└─────────────────────────────────────────────────────────────

🔍 Diff
─────────────────────────────────────────────────────────────
  [unchanged context line]
- [removed line]
+ [added line]
  [unchanged context line]
─────────────────────────────────────────────────────────────

📥 Actions:
  APPROVE  — write the AFTER block exactly as shown into the file
  EDIT     — you will be asked to type your modified version before it is applied
  SKIP     — leave this section unchanged, move to the next change
  CANCEL   — stop all remaining changes (already-applied changes are kept)

✉️ Your choice:
```

**Handle user response:**
- **APPROVE:** Apply the AFTER block verbatim using the available file edit tool. Use 3–5 lines of surrounding context for uniqueness.
- **EDIT:** Show the AFTER block as a starting point, ask the user to supply their version, then apply the user-provided content.
- **SKIP:** Move to next change without modifying the file.
- **CANCEL:** Stop all remaining changes. Any already-approved changes remain saved.

**After each file modification:** Update the "Last Updated" date in the file metadata.

> **FORMAT RULE:** The BEFORE and AFTER blocks must use the **exact same markdown structure** as the corresponding section in the actual module context file (same heading levels, bullet style, code block language, indentation). This allows the AFTER block to be directly written into the file without reformatting.



---

### Step 7: Update `index.md`

After all module updates are applied:

1. If any new module was introduced, add it to the Global Responsibility Index table in `index.md`.
2. If any entry point or high-level responsibility mapping changed, update the relevant rows.
3. Write or update the `## Drift State` block in `index.md`:

```markdown
## Drift State
- **Last Updated:** [current date ISO 8601]
- **Updated Up To Commit:** [CURRENT_MAIN_HEAD]
- [module_name]: D0 (resolved from D1 — context updated)
- [module_name]: D0 (no drift)
```

4. Update `## Context Baseline` in `index.md` to reflect the new baseline:

```markdown
## Context Baseline
- **Branch:** main
- **Baseline Commit:** [CURRENT_MAIN_HEAD]
- **Generated On:** [current date ISO 8601]
- **Status:** Context updated to main at above commit. Use this hash for @update-context drift detection.
```

5. **Review `## 🛠️ Repo Tech Specification` in `index.md`** (if Build/Dependency or Infra/Runtime files changed):

   - If `pom.xml`, `build.gradle`, `package.json`, `requirements.txt`, `go.mod`, `Dockerfile`, or similar files appear in the diff:
     - Read the changed file and compare against the current `## 🛠️ Repo Tech Specification` block in `index.md`.
     - Present a Before → After update proposal for the affected fields in the same format as Step 6 change cards.
     - Apply only if user APPROVEs.
     - Update the `- **Last Tech Spec Review:** [date]` field to today.
   - If no build/infra files changed — skip this sub-step.

   > **Example fields that may change:** Language version bump, new major dependency added, change in messaging system, change in runtime/deployment target.

> 🚫 **REMINDER:** The agent must NOT run `git add`, `git commit`, `git push`, or any write git command as part of this step or any other step.

---

### Step 8: Context Document Update (5C — Surgical Incremental Update)

> This step handles the context update work previously described as Phase 5C in the copilot-instructions workflow. It is now consolidated here and invoked via `@update-context` or P0.

**TRIGGER:** Execute if the completed changes include ANY of the following:
- New or modified domain entities, value objects, or aggregates
- Changed business rules, validation logic, or workflows
- New or modified REST endpoints, request/response models
- New or changed event publishing or consumption (SQS/SNS/Kafka)
- Modified data models, database schemas, or repositories
- New features, capabilities, or integration points
- Changed state management or transaction handling

**SKIP** if the work only includes:
- Internal refactoring without behavior change
- Test-only changes
- Bug fixes restoring original behavior
- Code comments or formatting

**ACTION — Surgical Updates:**
1. **Identify Scope:** Determine which module context files are affected by the completed changes.
2. **Update `modules/[module_name].md`:** For each affected module, update only the specific Flow sections, Entry Points, Steps, Exit Points, or Impacted Areas that changed. Add new flow entries if new flows were introduced. If the module's `Module Ownership` block was affected, update it too.
3. **Update `index.md`:** If the story introduced new modules, new entry points, or changed the high-level responsibility mapping, update the relevant rows in the Global Responsibility Index table.
4. **Preserve Everything Else:** Do not modify, regenerate, or reformat unrelated modules, flows, or sections.
5. **Verify Consistency:** Ensure updates are consistent across all affected module files and the index.
6. **Update Metadata:** Update the "Last Updated" date or equivalent metadata in each modified file.

**VERIFICATION after updates:**
- [ ] Only impacted module sections were modified
- [ ] `Module Ownership` blocks updated where affected
- [ ] `index.md` cross-references are still valid
- [ ] Code examples in module files reflect the actual implementation
- [ ] No unrelated modules were touched
- [ ] `## Drift State` block written with final D0–D3 levels

---

### Step 9: Set needContextReload Flag & Final Summary

**Action:** Set `needContextReload = true` in the session state.

**Generate final summary:**

```
🎉 Context Update Complete!

Summary:
  ✅ Updated    [count] sections
  ⏭️ Skipped    [count] sections
  📝 Modified   [count] module context files
  🛠️ Tech Spec  [Updated / No change]

Files Modified:
  modules/[name].md  ([count] sections, Last Updated → [current date])
  index.md           (Baseline Commit, Drift State[, Tech Spec] updated)

Drift State After Update:
  Module                     Final Drift Level
  ───────────────────────────────────────────
  modules/[name].md          D0 (resolved)

Baseline Commit Updated To: [CURRENT_MAIN_HEAD]

needContextReload: true
  └─ The copilot workflow will reload only the updated modules at the start
     of the next phase, then set this flag back to false.

─────────────────────────────────────────────────────
📌 ACTION REQUIRED — Commit & Push Context to Main
─────────────────────────────────────────────────────

The updated context files must be committed and pushed to main so they
remain the source of truth for all team members. Please run the following
commands in your terminal (the agent will NOT do this for you):

  git add .github/spec-scout/context/
  git commit -m "docs: update module context to main HEAD [CURRENT_MAIN_HEAD]"
  git push origin main

[IF COMMIT_DISTANCE > 5]
⚠️ HIGH DRIFT ENFORCEMENT: The drift was [COMMIT_DISTANCE] commits.
You must commit and push the updated context to main BEFORE continuing
any further development. Skipping this creates compounding drift risk
for the entire team.
[END IF]
─────────────────────────────────────────────────────
Update complete!
```

---

## Change Impact Matrix

Use this matrix to determine which context files to update:

| Change Type | `modules/[module_name].md` | `index.md` |
|-------------|---------------------------|------------|
| New domain entity | ✅ Flows, Impacted Areas | ✅ if new module or entry point |
| Modified business rule | ✅ Business Logic section | ❌ usually not |
| New REST endpoint | ✅ Entry Points, Flows | ✅ if entry point is new |
| New SQS listener | ✅ Entry Points, Flows | ✅ Integration Map |
| New event published | ✅ Entry Points, Flows | ✅ Integration Map |
| Database schema change | ✅ Impacted Areas, Flows | ❌ usually not |
| New workflow/process | ✅ Flows | ✅ if cross-module |
| New scheduled job | ✅ Entry Points | ✅ Integration row |
| Configuration change | ✅ Impacted Areas | ❌ usually not |
| New dependency | ✅ if it changes flow | ❌ usually not |
| Internal refactoring | ❌ No update | ❌ No update |
| Test-only changes | ❌ No update | ❌ No update |
| Cross-module change (2+ modules) | ✅ Both modules | ✅ Declare Ownership Conflict |

---

## When to Use

### ✅ Use @update-context when:
- You made code changes directly (not via SDD workflow)
- Multiple commits have accumulated on main without context updates
- You're starting a new session (offered automatically as P0)
- You pulled changes from teammates and want to sync context
- You're doing a weekly maintenance check
- You're unsure if context files are current

### ❌ Don't need @update-context when:
- Changes are test-only
- Changes are just comments or formatting
- Changes are internal refactoring without behavior change
- Context is already confirmed up-to-date via Guard 3 above

---

## Error Handling

**Scenario:** Git commands fail
- **Response:** "⚠️ Unable to access git history. Please ensure you're in a git repository."
- **Fallback:** Suggest manual baseline specification

**Scenario:** Context files missing
- **Response:** "❌ Context files not found. Please generate them first using the code-to-spec process."

**Scenario:** No changes warrant context updates
- **Response:** "✅ Context is up-to-date! No code changes detected that require context updates."

**Scenario:** No baseline commit found in `index.md`
- **Response:** "❌ No baseline commit found in `.github/spec-scout/context/index.md`. The context documents must be generated first using the code-to-spec process on `main`."
- **Action:** Do not attempt to fall back to git log. Direct the user to run the code-to-spec process on `main`.

**Scenario:** D3 conflict detected
- **Response:** Freeze the update, classify the conflict, describe it explicitly, and wait for user resolution before applying any changes. See `.github/spec-scout/code-to-spec.md` for the Conflict Escalation Model.

---

## Tools to Use

**For Analysis:**
- Use the available **code semantic search tool** to understand code purpose and semantics.
- Use the available **pattern search tool** (e.g., grep) to find specific strings or patterns in code.
- Use the available **file read tool** to read current context content and source code files.

**For Updates:**
- Use the available **file edit tool** to apply approved updates. Always use 3–5 lines of surrounding context to ensure uniqueness of the replacement target.

**For Git Operations:**
- Use the available **terminal execution tool** to run git read commands (e.g., `git log`, `git diff`). Never run git write commands — see [HARD-1].

---

## Quality Guidelines

1. **Accuracy:** Suggested updates must accurately reflect code changes
2. **Precision:** Only update sections directly impacted by changes
3. **Consistency:** Ensure updates are consistent across all module files and index
4. **Formatting:** Preserve markdown formatting and document structure
5. **Context:** Provide sufficient context in suggestions for the user to understand the change

---

**Last Updated:** March 7, 2026
**Version:** 3.1.0 (v3.0.0 improvements: tech-stack-conditional file patterns, tool-name-agnostic instructions, mutual exclusion note, [HARD-1] label alignment)
