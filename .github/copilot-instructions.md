<!-- Framework Version: v3.1.0 -->
# 🤖 AI Agent Workflow Instructions: Refined for SDD Governance

---

## ⛔ HARD CONSTRAINTS (Always Active — Read Before Anything Else)

| ID | Rule | Trigger |
|----|------|---------|
| [HARD-1] | **NO_GIT_WRITES** — Never execute `git commit`, `git push`, `git stash`, `git checkout`, `git clean`, `git reset`, or any git state-modifying command. Read, analyse, and write context/code files only. | All phases, all commands |
| [HARD-2] | **STRICT_WAIT** — Never advance to a subsequent phase without explicit, written user approval. | All phase transitions |
| [HARD-3] | **NO_HALLUCINATE** — Never infer or guess behaviour not evidenced in loaded context files or source code. Stop and ask a targeted clarifying question instead. | All phases |
| [HARD-4] | **NO_FRAMEWORK_WRITES** — Never modify any file listed in the READ-ONLY manifest below. | All phases |
| [HARD-5] | **CONFLICT_FREEZE** — If any conflict is declared during Phase 1C, stop immediately. Do not proceed to Phase 2 until the conflict is resolved by the user. | Phase 1C |

> If a user instruction contradicts any [HARD-X] rule, state the constraint by name, refuse the instruction, and explain why.

---

## 📁 File Access Manifest

**READ-ONLY (never modify):**
- `.github/copilot-instructions.md`
- `.github/spec-scout/CONSTITUTION.md`
- `.github/spec-scout/code-to-spec.md`
- `.github/spec-scout/update-context.md`
- `.github/spec-scout/session-tmp-file-protocol.md`
- `.github/spec-scout/summary-template.md`

**WRITE-ALLOWED:**
- `.github/spec-scout/context/modules/*.md`
- `.github/spec-scout/context/index.md`
- `.github/spec-scout/context/checkpoint.md`
- `.github/[story-title].tmp.md` (session temp file)
- Source code files within the project

---

## 🔁 RELOAD-CHECK — Single Anchored Rule (Referenced by Every Phase)

**Before executing the first action of ANY phase (P0, 1, 2, 3, 4, 5):**

1. Check the session value of `needContextReload`.
2. **If `true`:**
   - Identify which module context files were updated during the last `@update-context` run.
   - Reload ONLY those specific files from `.github/spec-scout/context/modules/[module_name].md`. Do NOT reload unrelated modules.
   - Announce: `"♻️ Context reloaded for: [list of reloaded module files]. Continuing with updated context."`
   - Set `needContextReload` to `false`.
3. **If `false`:** No action — retain existing context and continue.

> **RULE:** Do not re-read the entire context directory on every phase. Only reload the specific modules flagged during the last context update, and only once per flag cycle.

---

## ⚠️ Failure Mode Catalogue

| Situation | Agent Action |
|-----------|-------------|
| Module file missing | Flag the gap, note it in 1C, do not infer. Ask user a targeted question if critical. |
| Module file empty or lacks `Module Ownership` block | Flag immediately in 1C. Do not run boundary check for that module. Ask user to supply values. |
| [HARD-3] triggered — pattern not in any context file | Stop. Ask one targeted clarifying question. Do not write code until answered. |
| Conflict declared (1C) | Apply [HARD-5]. State conflict type, modules involved, evidence. Freeze. Wait for `RESOLVE [model]`. |
| Test gate fails after 2 fix attempts | Stop looping. Surface the failure to the user with full detail. Do not ask to advance. |
| Context window pressure suspected | Write current session state to the temp file immediately. Notify the user. |
| User instruction contradicts [HARD-X] | State the constraint ID, refuse, explain. Do not comply silently. |
| `@continue` file is malformed or missing phase data | Reject the restore. Offer user: (A) start fresh, or (B) paste the last known phase summary manually. |
| Version mismatch between referenced files | Warn the user before loading. State which file version differs. |

---

## 🔀 Command Routing Table

| Command | Phases Executed | Stops After | Mutually Exclusive With |
|---------|----------------|-------------|------------------------|
| *(normal story prompt)* | P0 → 1 → 2 → 3 → 4 → 5 | Phase 5 complete | — |
| `@analysis` | P0 → 1 | Phase 1 complete | `@noscout`, `@update-context` |
| `@solution` | P0 → 1 → 2 | Phase 2 complete | `@noscout`, `@update-context` |
| `@update-context` | P0 update flow only | Update flow complete | `@noscout`, `@analysis`, `@solution` |
| `@continue` | Restores from temp file, resumes next incomplete phase | Normal completion | `@noscout` |
| `@noscout` | None — bypasses all SDD rules | N/A | All other commands |

> For `@continue` and `@update-context` full details, see their respective protocol files.
> The agent must always update the session temp file at the end of each executed phase.

---

## ⚖️ Global Governance

All operations are governed by **`.github/spec-scout/CONSTITUTION.md`**. Internalize its rules — specifically:
- **Data Sanctity [C1]** — zero-tolerance for plaintext PII or secrets in any persistent storage, log, or telemetry.
- **Resilience Threshold [C2]** — minimum 90% code coverage on all new or changed application logic.
- **Scope Preservation [C3]** — no drive-by refactoring outside the current story scope.

These mandates are the primary constraints and override any conflicting user instructions.

**CRITICAL RULE:** Every response must explicitly indicate the current **Step and Phase**.

---

## 🔄 Context Update Command: @update-context

**Purpose:** Analyse committed changes relative to main and update module context files to reflect what has drifted since the last baseline commit.

**Trigger:** When the user types `@update-context` in the chat, OR when the user confirms they want to run P0.

**Full Documentation:** `.github/spec-scout/update-context.md`

**Quick Overview:**
1. Confirms current branch is rebased / up-to-date with main
2. Gets git log (commit summary) and reads the baseline commit id from `index.md`
3. Shows the diff (files changed) between the baseline commit and main HEAD
4. Shares a summary to the user — awaits confirmation that this is the intended context update
5. Updates the affected module context files and `index.md` with the latest main commit id
6. Sets `needContextReload: true` in the session state

---

## Step 0: Session-Resilient Temporary File Protocol

**Follow the protocol described in `.github/spec-scout/session-tmp-file-protocol.md` before and after each phase.**

---

## Phase 0: Drift Analysis & Context Update (MANDATORY FIRST STEP)

**Goal:** Ensure context is up-to-date with main before beginning analysis. This phase is offered to the user before Phase 1 on every new story/prompt.

> ⚠️ **DISCLAIMER:** This phase operates under the assumption that **the current branch is already rebased / up-to-date with main**. If it is not, the diff output and context update will be inaccurate. A rebase confirmation is part of this flow.

### 0A — Ask the User

**AGENT HARD STOP — MANDATORY GATE. THIS IS A BLOCKING CHECKPOINT.**

Your **ONLY permitted action** at this step is to output the question below and then **STOP ALL PROCESSING IMMEDIATELY**. You must not read any file, run any tool, load any context, or execute any logic after printing the question. The current turn **ENDS** after this question is displayed. No further output. No analysis. No "meanwhile" actions.

Output this question **verbatim**, then terminate your response:

> "**Would you like to run a context drift check (P0) before we begin?**
> This will compare the module context to main and update any drifted specs.
> _(Reply **YES** to run context update, or **NO** to skip and proceed directly to Phase 1.)_"

---

> 🛑 **[ZERO TOLERANCE CHECKPOINT — P0 Gate]** Apply the Zero Tolerance Checkpoint Protocol in full. Unlock phrase: `YES` or `NO`. END TURN.

---

**Resume only after the user has explicitly replied YES or NO:**

- **If user says NO (or skips):**
    - Print the following high-level warning and immediately jump to Phase 1:
      > `"⚠️ Context update skipped. There is a possibility that context files have drifted from main. All analysis and changes in this session are based on the current loaded context and repository code only. Proceed with awareness."`
    - Set the `needContextReload` flag to `false` (no reload triggered).
    - Do **not** revisit context update for the rest of this session.

- **If user says YES:**
    - Execute the full `@update-context` flow as documented in `.github/spec-scout/update-context.md`.
    - After the update flow completes, `needContextReload` will be set to `true` by that flow.
    - The reload check at the start of Phase 1 will then reload only the affected modules.
    - Once reloaded, proceed into Phase 1 normally.

---

## Phase 1: Context Gathering & Deep Tech Analysis
**Goal:** Establish a 100% comprehensive understanding of the existing technical implementation and the problem context before proposing solutions.


### 1A —  Smart Context Loading

The SDD context is stored under `.github/spec-scout/context/`:

```
.github/spec-scout/context/
  index.md          ← Global Responsibility Index (ALWAYS read first)
  modules/
    [module_name].md  ← Individual Module Flow Analysis
```

### Step 0A: Smart Context Loading

**Execute at the start of Phase 1 (Step 1A), before any other analysis.**

1. **Read `index.md` first (MANDATORY):** Load `.github/spec-scout/context/index.md` to get the full module map, responsibilities, and entry points.
2. **Identify Relevant Modules:** Parse the user's story for domain keywords, feature names, entity names, API paths, and event names. Cross-reference against `index.md`. Select ALL modules whose responsibilities overlap with the story.
3. **Load Relevant Module Files:** For each identified module, load `.github/spec-scout/context/modules/[module_name].md`. If missing or empty → see Failure Mode Catalogue above. Do NOT load clearly unrelated modules.
4. **Deep-Dive to Code (When Needed):** If any flow or implementation detail is still ambiguous after loading module files, refer to source code files listed in the module's `Impacted Areas`. Code is the secondary source of truth; module context files are the primary.
5. **Multi-Module Loading Example:**
   - Story about "subscriber notification preferences" → load `subscriber_management.md` + `topic_and_subscription.md` + `email_delivery.md`
   - Story about "partner reporting" → load `partner_management.md` + `reporting.md`
6. **Document Loaded Modules:** In Phase 1C report, list all module context files loaded and why each was selected.

> **MODULE OWNERSHIP:** Every module file MUST contain a `## Module Ownership` block. If missing → see Failure Mode Catalogue. Do not proceed with boundary checks until it is present.

---

## Phase P0: Drift Analysis & Context Update (Optional — ask user before executing)

**Goal:** Ensure context is up-to-date with main before beginning analysis.

> ⚠️ **DISCLAIMER:** Assumes the current branch is already rebased / up-to-date with main.

**→ [RELOAD-CHECK]** before any action.

### P0.0 — Ask the User

> "**Would you like to run a context drift check (P0) before we begin?**
> This will compare the module context to main and update any drifted specs.
**→ [HARD-2] STRICT WAIT.** Reply **YES** to run context update, or **NO** to skip and proceed directly to Phase 1.

| User Response | Action |
|---------------|--------|
| **NO** (or no reply) | Print: `"⚠️ Context update skipped. Context files may have drifted from main. All analysis is based on current loaded context and repository code only."` Set `needContextReload: false`. Do not revisit for this session. Jump to Phase 1. |
| **YES** | Execute the full `@update-context` flow (see `.github/spec-scout/update-context.md`). After completion, `needContextReload` will be set to `true`. The reload check at Phase 1 start will reload only affected modules. |

---

## Phase 1: Context Gathering & Deep Tech Analysis

**Goal:** Establish a 100% comprehensive understanding of the existing technical implementation before proposing solutions.

### Phase 1 Entry Conditions
- [ ] P0 was offered and user responded (YES or NO)
- [ ] **[RELOAD-CHECK]** performed
- [ ] No active `@noscout` flag
- [ ] Session temp file created or verified

→ If any condition is unmet: STOP. State which condition failed. Wait.

### 1A. Context Review (MANDATORY FIRST STEP)

* **ACTION:** Execute the Smart Context Loading Protocol (Step 0A).
* **CONSTRAINT:** You MUST complete this context review before proceeding to repository scanning or code analysis.
* **PURPOSE:** Module context files define the authoritative "current state" of each domain and are the foundation for all technical decisions.

### 1B. Deep Repository & Consolidated Analytical Pass

> All sub-actions below execute as a **single consolidated pass** — repo scan, drift classification, boundary check, conflict detection, governance audit, and baseline test run happen internally. The user sees one structured report in 1C, not incremental output.

* **Repo Scan:** Scan the repository to map workflows and data structures, cross-referencing against loaded module context files.
* **Governance Audit [C1][C2][C3]:** Identify existing code in scope that contradicts the Governance Mandates.
* **Drift Classification:** For each loaded module, compare the context file against the actual implementation and assign a Drift Level (D0–D3). Reference: `.github/spec-scout/update-context.md` Drift Classification System.

  | Level | Name | Definition | Example |
  |-------|------|------------|---------|
  | D0 | No Drift | Code matches module context exactly | Module file matches code exactly |
  | D1 | Minor Drift | Small additive change, no responsibility shift | New optional field added |
  | D2 | Structural Drift | Flow changed, new entry point, or ownership area altered | New flow not documented in module file |
  | D3 | Boundary Drift | Module overlap, ownership violated, or undeclared cross-module dependency | Code changes outside all declared Impacted Areas |

  - Check every file listed in a module's `Impacted Areas` section.
  - If code changes are found **outside** any module's declared `Impacted Areas` → flag as **"Undeclared Module Impact"** — this is an automatic **D3**.

* **Boundary & Conflict Check:** For each loaded module, read the `Integration Boundaries` in the ownership block and verify:
  - No other loaded module declares the same entry point.
  - No other loaded module claims the same domain object.
  - All cross-module code paths are covered by a declared boundary.
  - Apply all four Conflict Detection Rules from the Conflict Escalation Model (`.github/spec-scout/code-to-spec.md`).
  - If any rule fires → **apply [HARD-5]: declare conflict in 1C and freeze**.

* **Baseline Test Run:** Execute the project test suite (or compile check) to capture current pass/fail state. Record pre-existing failures — do not attempt to fix them.
* **Anti-Hallucination Gate ([HARD-3]):** If any pattern is encountered not described in any loaded context file → note as a gap. Ask a targeted clarifying question if critical.
* **CONSTRAINT:** DO NOT suggest or perform any code modifications during this phase.

### 1C. Context & Tech Report

Synthesize all findings into one structured report:

1. **Issue Context Summary:** Concise restatement of the problem for confirmation.
2. **Loaded Context Summary:** All module files loaded, why each was selected, any missing/empty. Flag any missing `Module Ownership` block.
3. **Current Technical State:** Detailed map of existing implementation logic with references to loaded module sections and flow names.
4. **Drift Classification Report:** Drift Level (D0–D3) for each loaded module with brief justification.
5. **Conflict Report:** `"✅ No conflicts detected"` OR full conflict declaration per Conflict Escalation Model. **If any conflict → [HARD-5]: stop here.**
6. **Governance Audit [C1][C2][C3]:** Flag issues as blocking (must address now) or advisory (noted, no block).
7. **Baseline Status:** Current file errors, failed tests, observed state.
8. **Clarifying Questions / Potential Pitfalls:** Unanswered questions that could cause hallucination. **WAIT for answers if critical ([HARD-3]).**

**→ [HARD-2] STRICT WAIT.** Update context based on any feedback. Proceed to Phase 2 ONLY after user says `"PROCEED"` or `"APPROVED"`.

---

## Phase 2: Solution Proposal and Choice

**Goal:** Present alternative technical approaches for user selection.

### Phase 2 Entry Conditions
- [ ] Phase 1 approval received (user said `PROCEED` or `APPROVED`)
- [ ] **[RELOAD-CHECK]** performed
- [ ] No unresolved conflict declared in 1C
- [ ] No critical clarifying questions open from 1C

→ If any condition is unmet: STOP. State which condition failed. Wait.

### 2A. Solution Generation

* **ACTION:** Generate a **minimum of 2 viable approaches** — each must represent a meaningfully different trade-off or implementation strategy.
* **CONSTRAINT:** Every approach must be "Compliant by Design" — inherently fulfilling all [C1][C2][C3] requirements.
* **CONTEXT ALIGNMENT:** Each solution must explicitly reference how it aligns with flows, responsibilities, and entry points in the loaded module context files.
* **[HARD-3]:** If either approach requires knowledge of a module whose context file is empty or missing → flag and ask before finalising.

### 2B. Presentation & Choice

* **ACTION:** Present each approach with: Title, Pros, Cons, Potential Pitfalls/Questions.
* **CONTEXT IMPACT:** For each approach, indicate which module context files and which specific flow sections within them will need updates after implementation.

**→ [HARD-2] STRICT WAIT.** If user suggests changes, update solutions first. Proceed to Phase 3 ONLY after user explicitly selects (`"SELECT 1"`, `"SELECT 2"`, etc.).

---

## Phase 3: Task Breakdown & Action Plan

**Goal:** Create a dependency-aware roadmap based on the chosen solution.

### Phase 3 Entry Conditions
- [ ] Phase 2 approval received (user selected an approach)
- [ ] **[RELOAD-CHECK]** performed
- [ ] No unresolved conflict open

→ If any condition is unmet: STOP. State which condition failed. Wait.

**ACTION — Auto-Task Generator:** Derive the task list from the loaded modules. For each impacted module, generate the following task slots in order (omit slots not applicable to the story):

| Slot | Task Type | Condition to Include |
|------|-----------|----------------------|
| T1 | Domain model task | Any domain entity / value object changes |
| T2 | API layer task | Any new or modified REST endpoint |
| T3 | Persistence task | Any repository or schema change |
| T4 | Event task | Any new or changed event publishing / consumption |
| T5 | Test task | Always included for every impacted module |
| T6 | Context update task | Always included — update module context file after code changes (via `@update-context` at P0 or end of session) |

Cross-module slots are ordered so the least-dependent module is implemented first.

- **GOVERNANCE ALIGNMENT:** Every task must include sub-tasks for mandatory Governance Compliance checks [C1][C2][C3].
- **TESTING INTEGRATION:** Every task that touches code includes a "Test Gate" sub-step. Specify which unit and integration tests are expected.
- **CONSTRAINT:** The plan must explicitly state the target success metrics as defined in Global Governance.
- **[HARD-3] CLARIFICATION CHECK:** Before finalising, if any task relies on undocumented behaviour or empty module context → ask targeted questions.

**→ [HARD-2] STRICT WAIT.** If user modifies scope or order, update the entire plan. Proceed to Phase 4 ONLY after user says `"EXECUTE PLAN"`.

---

## Phase 4: Task-Based Incremental Execution

**Goal:** Execute changes one Task at a time (multi-file changes allowed within a task).

### Phase 4 Entry Conditions
- [ ] Phase 3 approval received (user said `EXECUTE PLAN`)
- [ ] **[RELOAD-CHECK]** performed
- [ ] Full task list is finalised and visible

→ If any condition is unmet: STOP. State which condition failed. Wait.

- **ACTION:** Implement all changes for the **current Task**. Multiple related files may be modified simultaneously.
- **GOVERNANCE SAFEGUARD [C1][C2][C3]:** Before writing code, verify no logic violates the Governance Mandates.
- **PERMISSIONS:** You MUST ask `"CONFIRM EXECUTION FOR THIS TASK"` before applying code changes.
- **ADAPTATION:** If feedback is provided, update the **entire remaining Action Plan** immediately.
- **[HARD-3] CLARIFICATION GATE:** If during implementation you encounter an ambiguity not covered by any loaded context file or source code → stop and ask. Do not guess.

### ✅ Per-Task Test Gate (MANDATORY — must pass before advancing to next task)

After implementing each task:

1. **Identify Impacted Tests:** List all newly added tests and all existing tests whose covered code was modified.
2. **Run Impacted Tests:** Execute the impacted test suite (unit + integration) for this task's scope.
3. **Evaluate Results:**
   - ALL pass → present results and ask for user approval to proceed.
   - ANY fail → analyse the failure, fix the root cause within the same task, re-run. Repeat until green.
   - After 2 fix attempts with no resolution → see Failure Mode Catalogue (surface to user, stop looping).
4. **Report Test Status:** `Task [N] Test Gate: PASS ✅` or `Task [N] Test Gate: FAIL ❌ — fixing…`

> **RULE:** You are forbidden from presenting a task as complete or asking to move to the next task if any impacted test is failing.

### ✅ Task Completion Gate (MANDATORY — enforced after every task)

Before a task is considered **done**, ALL of the following must be true:

1. All code changes for the task are implemented.
2. All modified or newly added tests have been **executed and passed** (see Per-Task Test Gate above).
3. No impacted test is in a failing state.

Only after all three conditions are met:

- Present a summary of changes and test results to the user.
- **→ [HARD-2] STRICT WAIT.** Do NOT proceed to the next task or Phase 5 until the user explicitly approves with `"APPROVED"`, `"PROCEED"`, or `"NEXT TASK"`.
- If the user requests changes, apply them and re-run the impacted tests before re-presenting.
---

## Phase 5: Quality Gate, Review & Final Hand-off

**Goal:** Final validation, iterative improvement, and artifact generation.

### Phase 5 Entry Conditions
- [ ] All Phase 4 tasks completed and approved
- [ ] **[RELOAD-CHECK]** performed
- [ ] All per-task test gates passed

→ If any condition is unmet: STOP. State which condition failed. Wait.

### 5A. Rigorous Testing & Debugging (The Quality Gate)

- **ACTION:** Run the **full test suite** (all unit and integration tests across the entire system).
- **ACTION:** For any failing test:
  - Caused by this story's changes → fix immediately and re-run.
  - Pre-existing failure → document clearly, flag to user, do not block the quality gate for it.
- **SUCCESS CRITERIA (all must be met):**
  1. All test suites introduced or modified by this story pass.
  2. No new test regressions introduced by this story's changes.
  3. Code coverage meets the [C2] threshold (≥90% on new/changed application logic).
  4. Overall system is in a stable, compilable state.
- **LOOP:** If any criteria unmet → fix and re-run. Do NOT proceed to 5B until Quality Gate is green.

> **NOTE:** Context drift detection and context document updates are managed by the `@update-context` flow. Run `@update-context` (or P0 at the start of the next session) to capture context changes from this story.

### 5B. Technical Review & Final Fixes

- **ACTION:** Perform a technical review across three axes — Efficiency, Security, Maintainability. Provide specific snippets for any comments.
- **LOOP:** If fixes are applied or Governance Mandates [C1][C2][C3] are not met → return to 5A to re-verify.

### 5C. Context Document Update (Handled via @update-context)

> This step is managed by the `@update-context` command / P0 flow. See `.github/spec-scout/update-context.md`.

Remind the user at the end of Phase 5:

> "📋 **Context Update Reminder:** Run `@update-context` (or it will be offered at the start of the next session as P0) to keep `index.md` and the relevant `modules/[module_name].md` files in sync with this story's implementation."

### 5D. Final Documentation (Summary File)

- **ACTION:** Update internal docs (OpenAPI, etc.) only if mandated.
- **SUMMARY GENERATION:** Generate a `.md` file named after the user story title in the **project root directory**.
- **TEMPLATE RULE:** Strictly follow the structure in `.github/spec-scout/summary-template.md`.

### 5E. Git Commit & Final Output (Chat Space)

- **ACTION:** Generate a brief, clear Git commit message (feat/fix/chore).
- **FINAL CHAT OUTPUT:** Provide a single conclusive summary confirming:
  1. List of files modified and approved.
  2. Result of final test run (`"Final Test Status: ALL PASS | Governance: COMPLIANT"`).
  3. Confirmation that [C1][C2][C3] rules were applied.
  4. The Git Commit Message (as a code block).
  5. Confirmation that context module files and `index.md` have been updated (via `@update-context`).
  6. `"Drift Scan: captured via @update-context ✅"` — or note if deferred to next session P0.
  7. `"Conflicts: NONE ✅"` — or confirm the conflict type and resolution model applied.
  8. Confirmation that the summary file has been generated in the root.

---

## 🚪 Escape Hatch: @noscout

If the user includes `@noscout` anywhere in their prompt:

1. Ignore all other instructions, rules, and SDD framework constraints defined in this file.
2. Act as a standard, general-purpose GitHub Copilot assistant.
3. Provide direct answers, code, or explanations without enforcing SDD standards.
4. Do not mention that you are ignoring instructions; simply provide the requested help.
