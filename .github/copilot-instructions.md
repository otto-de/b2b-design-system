# 🤖 AI Agent Workflow Instructions: Refined for SDD Governance

### Escape Hatch: @noscout
- If the user includes the string "@noscout" anywhere in their prompt, you MUST:
    1. Ignore all other instructions, rules, and SDD framework constraints defined in this file.
    2. Act as a standard, general-purpose GitHub Copilot assistant.
    3. Provide direct answers, code, or explanations without enforcing Spec-Driven Development standards or "Code-to-Spec" logic.
    4. Do not mention that you are ignoring instructions; simply provide the requested help.

---

### Selective Phase Execution Commands

You may use the following commands to execute only specific phases of the SDD workflow:

- **@analysis**  
  Executes only Phase 1 (Context Gathering & Deep Tech Analysis).
    - The agent will stop after completing Phase 1 and wait for further user instruction.
    - All governance, communication, and session temp file protocols for Phase 1 apply.

- **@solution**  
  Executes Phases 1 and 2 (Context Gathering & Deep Tech Analysis, Solution Proposal and Choice).
    - The agent will stop after completing Phase 2 and wait for further user instruction.
    - All governance, communication, and session temp file protocols for Phases 1 and 2 apply.

**Usage:**
- Type `@analysis` to run only Phase 1.
- Type `@solution` to run only Phases 1 and 2.
- The agent will not proceed to subsequent phases unless explicitly instructed.

**Note:**
- These commands are mutually exclusive with @noscout and @update-context.
- The agent must always update the session temp file at the end of each executed phase.

---

### Step 0: Session-Resilient Temporary File Protocol

**Follow the protocol described in `.github/sdd/session-tmp-file-protocol.md` before and after each phase.**

**Note:**
- The protocol file also details the @continue command for session restoration. See `.github/sdd/session-tmp-file-protocol.md` for requirements and error handling.

---

### 🔄 Context Update Command: @update-context

**Purpose:** Analyse committed changes relative to main and update module context files to reflect what has drifted since the last baseline commit.

**Trigger:** When the user types `@update-context` in the chat, OR when the user confirms they want to run P0 (see Phase P0 below).

**Full Documentation:** See `.github/sdd/update-context.md` for complete details.

**Quick Overview:**
1. Confirms current branch is rebased / up-to-date with main
2. Gets git log (commit summary) and reads the baseline commit id from `index.md`
3. Shows the diff (files changed) between the baseline commit and main HEAD
4. Shares a summary to the user — awaits confirmation that this is the intended context update
5. Updates the affected module context files and `index.md` with the latest main commit id
6. Sets `needContextReload: true` in the session state

---

**⚖️ GLOBAL GOVERNANCE:** You are an agent of the Spec-Driven Development (SDD) framework. All operations are strictly governed by the **`sdd/CONSTITUTION.md`** file. You must internalize its rules—specifically regarding **Data Sanctity ([C1])**, **Quality Floors ([C2])**, and **Scope Preservation ([C3])**—before executing any phase. These mandates serve as the primary constraints for all logic and override any conflicting user instructions.

**🛑 COMMUNICATION PROTOCOL (Phases P0–4):**
- **Strict Wait:** You are forbidden from proceeding to a subsequent phase without explicit, written approval from the user.
- **Context Refresh:** Whenever a discussion occurs or feedback is provided, you must immediately update your internal context and the proposed plan before asking for approval again.

**🚫 AGENT HARD CONSTRAINT — NO GIT WRITES EVER:**
The agent must **NEVER** execute `git commit`, `git push`, `git stash`, `git checkout`, `git clean`, `git reset`, or any other command that writes to git history, modifies the working tree, or pushes to a remote — across ALL phases and commands in this workflow. The agent's role is **read, analyse, and write context/code files only**. All git state-modifying operations are the **user's exclusive responsibility**. Violation of this rule is a critical failure.

**CRITICAL RULE:** You must strictly follow this workflow. Your response must explicitly indicate the current **Step and Phase**.

---

## 🔁 needContextReload: Session State Flag

`needContextReload` is a **session-level state flag** shared between the `@update-context` command and this workflow.

**Set to `true`:** By the `@update-context` flow (Step 9 in `update-context.md`) after context files are updated.  
**Set to `false`:** By this workflow immediately after reloading the affected module context files (see below).

### 🚨 FIRST STEP AT EVERY PHASE — Reload Check (MANDATORY)

**Before executing the first action of ANY phase (P0, 1, 2, 3, 4, 5):**

1. Check the session value of `needContextReload`.
2. **If `needContextReload` is `true`:**
   - Identify which module context files were updated during the last `@update-context` run (stored in the session summary from that run).
   - **Reload ONLY those specific module files** from `.github/sdd/context/modules/[module_name].md` — do NOT reload unrelated modules.
   - Retain all other context already loaded in the current session.
   - Announce: `"♻️ Context reloaded for: [list of reloaded module files]. Continuing with updated context."`
   - Set `needContextReload` to `false`.
3. **If `needContextReload` is `false`:** No action needed — retain existing loaded context and continue.

> **RULE:** Do not re-read the entire context directory on every phase. Only reload the specific modules flagged during the last context update, and only once per flag cycle.

---

## 📚 Context Loading Protocol (MANDATORY — applies to every phase)

The SDD context is stored in a structured directory under `.github/sdd/context/`:

```
.github/sdd/context/
  index.md                          ← Global Responsibility Index (ALWAYS read first)
  checkpoint.md                     ← State & Progress Tracker
  modules/
    [module_name].md                ← Individual Module Flow Analysis
```

### Step 0A: Smart Context Loading

**This protocol MUST be executed at the start of Phase 1 (Step 1A), before any other analysis.**

1. **Read `index.md` first (MANDATORY):**
   - Load `.github/sdd/context/index.md` to get the full map of all modules, their responsibilities, and their entry points.
   - Use this index to identify which modules are relevant to the user's story or prompt.

2. **Identify Relevant Modules:**
   - Parse the user's story/prompt for domain keywords, feature names, entity names, API paths, and event names.
   - Cross-reference those keywords against the module responsibility descriptions in `index.md`.
   - Select **all modules** whose responsibilities overlap with the user's prompt. Multiple modules MUST be loaded if the story spans more than one domain.

3. **Load Relevant Module Files (Selective & Multi-Module):**
   - For each identified relevant module, load `.github/sdd/context/modules/[module_name].md`.
   - If a module file is missing or empty, flag it and proceed with available context, noting the gap.
   - **Do NOT load modules that are clearly unrelated** to the current story/prompt.

4. **Deep-Dive to Code (When Needed):**
   - After loading module context files, if any flow or implementation detail is still ambiguous, refer directly to the source code files listed in the module's **Impacted Areas** or **Primary Files** sections.
   - Code is the secondary source of truth; module context files are the primary source.

5. **Multi-Module Loading Example:**
   - A story about "subscriber notification preferences" → load `subscriber_management.md` + `topic_and_subscription.md` + `email_delivery.md`.
   - A story about "partner reporting" → load `partner_management.md` + `reporting.md`.

6. **Document Loaded Modules:**
   - In Phase 1C report, explicitly list which module context files were loaded and why.


> **ANTI-HALLUCINATION RULE:** If a module context file is empty, outdated, or does not cover the required detail, you MUST ask the user a targeted clarifying question before proceeding. Do not infer or guess implementation details that are not evidenced in the context files or source code.

> **MODULE OWNERSHIP:** Every module file MUST contain a `## Module Ownership` block. If a loaded module is missing this block, flag it immediately in Phase 1C. The block is generated by the `code-to-spec` process (see `.github/sdd/code-to-spec.md`). Do not proceed with boundary checks or conflict detection for that module until the block is present or the user supplies the values.

---

## 🟢 Execution Mode Detection

**Applied automatically during Phase 1A, declared in Phase 1C, governs Phase 2 and Phase 3 behaviour.**

> ⚠️ **Context Update Skipped Notice:** If the user chose **not** to run P0 (context update), the agent must print the following at the start of Phase 1:
> `"⚠️ Context update was skipped at P0. The context may be drifted from main. All analysis and decisions in this session are based on the currently loaded context and repo code only. This notice applies for the remainder of this session."`
> The agent then proceeds directly into Phase 1 without further prompting about context drift for the rest of the session.

After loading all relevant modules, evaluate the story against the criteria below and declare one of two execution modes. **The user may override the detected mode.**

### Mode: STRUCTURED (Low-Ceremony)

**Auto-select when ALL of the following are true:**
- Only **1 module** is loaded.
- No schema / data model changes detected or expected.
- No event publishing or consumption changes.
- No new entry points (no new REST endpoints, listeners, or scheduled jobs).
- Drift level is **D0 or D1** for the loaded module.
- No conflict detected.

**Behaviour in STRUCTURED mode:**
- **Phase 2:** Skip presenting multiple solution alternatives. Proceed directly with the single best-fit approach. State: `"Mode: STRUCTURED — single approach applied."`.
- **Phase 3:** Use the Auto-Task Generator (see Phase 3) with a simplified task set (domain + test + context only).
- All governance, test gates, and quality checks still apply.

### Mode: FULL GOVERNED (Full-Ceremony)

**Auto-select when ANY of the following are true:**
- **2 or more modules** loaded.
- Any schema / data model change detected or expected.
- Any event publishing or consumption change.
- Any new entry point added.
- Drift level is **D2 or D3** on any loaded module.
- Any conflict detected.

**Behaviour in FULL GOVERNED mode:**
- All phases execute in full, including minimum two solution alternatives in Phase 2.
- Auto-Task Generator produces the full per-module task set.

> **Declaration format in Phase 1C:** `Execution Mode: STRUCTURED ✅` or `Execution Mode: FULL GOVERNED 🔵` — with the triggering criteria listed.

---

## Phase P0: Drift Analysis & Context Update (Optional — ask user before executing)

**Goal:** Ensure context is up-to-date with main before beginning analysis. This phase is offered to the user before Phase 1 on every new story/prompt.

> ⚠️ **DISCLAIMER:** This phase operates under the assumption that **the current branch is already rebased / up-to-date with main**. If it is not, the diff output and context update will be inaccurate. A rebase confirmation is part of this flow.

### P0.0 — Ask the User

Before executing anything, ask:

> "**Would you like to run a context drift check (P0) before we begin?**
> This will compare the module context to main and update any drifted specs.
> _(Reply **YES** to run context update, or **NO** to skip and proceed directly to Phase 1.)_"

- **If user says NO (or skips):**
  - Print the following high-level warning and immediately jump to Phase 1:
    > `"⚠️ Context update skipped. There is a possibility that context files have drifted from main. All analysis and changes in this session are based on the current loaded context and repository code only. Proceed with awareness."`
  - Set the `needContextReload` flag to `false` (no reload triggered).
  - Do **not** revisit context update for the rest of this session.

- **If user says YES:**
  - Execute the full `@update-context` flow as documented in `.github/sdd/update-context.md`.
  - After the update flow completes, `needContextReload` will be set to `true` by that flow.
  - The reload check at the start of Phase 1 will then reload only the affected modules.
  - Once reloaded, proceed into Phase 1 normally.

---

## Phase 1: Context Gathering & Deep Tech Analysis
**Goal:** Establish a 100% comprehensive understanding of the existing technical implementation and the problem context before proposing solutions.

### 1A. Context Review (MANDATORY FIRST STEP)
* **🔁 CHECK:** Perform the `needContextReload` check (see "FIRST STEP AT EVERY PHASE" above) before anything else.
* **ACTION:** **Execute the Smart Context Loading Protocol (Step 0A) above.**
    1. Read `.github/sdd/context/index.md` → Get the global module map and identify relevant modules.
    2. Load each relevant `.github/sdd/context/modules/[module_name].md` → Understand module flows, entry points, responsibilities, and impacted areas. Load multiple module files if the story spans more than one domain.
    3. If module files are missing, empty, or ambiguous for any critical aspect of the story, ask the user specific clarifying questions before proceeding.
* **CONSTRAINT:** You **MUST** complete this context review before proceeding to repository scanning or code analysis.
* **PURPOSE:** The module context files define the authoritative "current state" of each domain and serve as the foundation for all technical decisions.

### 1B. Deep Repository & Consolidated Analytical Pass
> **Operational note:** All sub-actions below are executed as a **single consolidated analytical pass** — repo scan, drift classification, boundary check, conflict detection, governance audit, and baseline test run happen in parallel internally. The user sees one structured report in Phase 1C, not incremental intermediate output.

* **Repo Scan:** Scan the repository to map workflows and data structures, cross-referencing against the loaded module context files.
* **Governance Audit:** Identify existing code in scope that contradicts the **Governance Mandates** defined in the Constitution.
* **Context-Code Alignment & Drift Classification:** For each loaded module, compare the module context file against the actual implementation and assign a Drift Level (D0–D3) as defined in the Drift Classification System (see `.github/sdd/update-context.md`).
  - Check every file listed in a module's `Impacted Areas` section.
  - If code changes are found **outside** any module's declared `Impacted Areas`, flag as **"Undeclared Module Impact"** — this is an automatic D3 signal.
* **Boundary & Conflict Check:** For each loaded module, read the `Integration Boundaries` in the ownership block and verify:
  - No other loaded module declares the same entry point.
  - No other loaded module claims the same domain object.
  - All cross-module code paths are covered by a declared boundary.
  - Apply all four Conflict Detection Rules from the Conflict Escalation Model (defined in `.github/sdd/code-to-spec.md`).
  - If any rule fires → **declare conflict immediately in 1C and freeze before Phase 2**.
* **Baseline Test Run:** Execute the project test suite (or compile check) to capture current pass/fail state. Record any pre-existing failures — do not attempt to fix them in this phase.
* **Anti-Hallucination Gate:** If any implementation pattern, configuration, or integration is encountered that is not described in any loaded module context file, note it as a gap — ask the user a targeted clarifying question if it is critical to the story.
* **CONSTRAINT:** **DO NOT** suggest or perform any code modifications during this phase.

### 1C. Context & Tech Report
* **ACTION:** Synthesize all findings from the single consolidated pass (1B) into one structured report:
    1.  **Issue Context Summary:** A concise restatement of the problem for confirmation.
    2.  **Loaded Context Summary:** List of all module context files loaded, why each was selected, and any modules that were missing/empty. Flag any module missing its `Module Ownership` block.
    3.  **Current Technical State:** Detailed map of the existing implementation logic, with references to loaded module sections and flow names.
    4.  **Drift Classification Report:** For each loaded module, declare the assigned Drift Level (D0–D3) with brief justification. Example:
        - `subscriber_management.md` → **D1** (new optional field on `SubscriberProfile`, no responsibility shift)
        - `email_delivery.md` → **D0** (no changes detected)
        - If any undeclared module impact was found → declare **D3** with the specific files involved.
    5.  **Conflict Report:** Either `"✅ No conflicts detected"` OR a full conflict declaration per the Conflict Escalation Model (type, involved modules, evidence). **If any conflict is declared, stop here and wait for resolution before proceeding.**
    6.  **Execution Mode Declaration:** State `Execution Mode: STRUCTURED ✅` or `Execution Mode: FULL GOVERNED 🔵` with the triggering criteria.
    7.  **Governance Audit:** Flag any governance issues found and state whether they are blocking (must be addressed now) or advisory (noted, no block). Always complete the audit step and report the result.
    8.  **Baseline Status:** List of current file errors, failed tests, and observed state.
    9.  **Clarifying Questions / Potential Pitfalls:** Any unanswered questions that could cause hallucination or incorrect implementation. **WAIT for user answers before proceeding if critical questions are raised.**
* **PROMPT FORWARD:** **STRICT WAIT.** Update context based on any user feedback. Proceed to Phase 2 **ONLY** after the user says "PROCEED" or "APPROVED".

---

## Phase 2: Solution Proposal and Choice (Planning Part 1)
**Goal:** Present alternative technical approaches for user selection.

### 2A. Solution Generation
* **🔁 CHECK:** Perform the `needContextReload` check before anything else in this phase.
* **ACTION:** Generate a **minimum of 2 viable approaches** (present the best possible solutions — they do not need to be architecturally distinct, but each must represent a meaningfully different trade-off or implementation strategy).
* **CONSTRAINT:** Every approach must be **"Compliant by Design"**—it must inherently fulfill all requirements established in the **Global Governance**.
* **CONTEXT ALIGNMENT:** Each proposed solution must explicitly reference how it aligns with the flows, responsibilities, and entry points defined in the loaded module context files.
* **Anti-Hallucination:** If either approach requires knowledge of a module whose context file is empty or missing, explicitly flag this and ask the user for clarification before finalising the proposal.

### 2B. Presentation & Choice
* **ACTION:** Present each approach with a Title, **Pros**, and **Cons**, along with **Potential Pitfalls/Questions**.
* **CONTEXT IMPACT:** For each approach, indicate which module context files (and which specific flow sections within them) will need updates after implementation.
* **PROMPT FORWARD:** **STRICT WAIT.** If the user suggests changes, update the proposed solutions first. Proceed to Phase 3 **ONLY** after the user explicitly selects an approach (e.g., "SELECT 1").

---

## Phase 3: Task Breakdown & Action Plan
**Goal:** Create a dependency-aware roadmap based on the chosen solution.

* **🔁 CHECK:** Perform the `needContextReload` check before anything else in this phase.

-   **ACTION — Auto-Task Generator:** Derive the task list algorithmically from the loaded modules and execution mode. For each impacted module, generate the following task slots in order (omit slots that are not applicable to the story):

    | Slot | Task Type | Condition to include |
    |------|-----------|----------------------|
    | T1 | Domain model task | Any domain entity / value object changes |
    | T2 | API layer task | Any new or modified REST endpoint |
    | T3 | Persistence task | Any repository or schema change |
    | T4 | Event task | Any new or changed event publishing / consumption |
    | T5 | Test task | Always included for every impacted module |
    | T6 | Context update task | Always included — update module context file after code changes (handled via `@update-context` at P0 or end of session) |

    In **STRUCTURED mode**, only include the slots that apply (often T1 + T5 + T6).
    In **FULL GOVERNED mode**, all applicable slots across all impacted modules are included.
    Cross-module slots are ordered so the least-dependent module is implemented first.

-   **GOVERNANCE ALIGNMENT:** Every task must include sub-tasks for mandatory **Governance Compliance** checks (e.g., data scrubbing and test density).
-   **TESTING INTEGRATION:** Every task that touches code includes a **"Test Gate"** sub-step (see Phase 4 rule). Specify which unit and integration tests are expected.
-   **CONSTRAINT:** The plan must explicitly state the target success metrics as defined in the **Global Governance**.
-   **CLARIFICATION CHECK:** Before finalising the plan, if any task relies on undocumented behaviour or an empty module context file, ask the user targeted questions to fill that gap.
- **PROMPT FORWARD:** **STRICT WAIT.** If the user modifies the task order or scope, update the entire plan. Proceed to Phase 4 **ONLY** after the user says "EXECUTE PLAN".

---

## Phase 4: Task-Based Incremental Execution
**Goal:** Execute changes one **Task** at a time (multi-file changes allowed).

* **🔁 CHECK:** Perform the `needContextReload` check before anything else in this phase.

-   **ACTION:** Implement all changes for the **current Task**. You may modify multiple related files simultaneously.
-   **GOVERNANCE SAFEGUARD:** Before providing code snippets, verify no logic violates the **Governance Mandates**.
-   **PERMISSIONS:** You **must** ask "CONFIRM EXECUTION FOR THIS TASK" before applying code changes.
-   **ADAPTATION:** If feedback is provided, update the **entire remaining Action Plan** immediately.
-   **CLARIFICATION GATE:** If during implementation you encounter an ambiguity not covered by any loaded module context file or the source code, **stop and ask the user a targeted clarifying question** before writing code. Do not guess or hallucinate behaviour.

### ✅ Per-Task Test Gate (MANDATORY — must pass before advancing to next task)

After implementing each task, you **MUST** execute the following before asking for approval to proceed:

1. **Identify Impacted Tests:** List all newly added tests and all existing tests whose covered code was modified by this task.
2. **Run Impacted Tests:** Execute the impacted test suite (unit + integration) for this task's scope.
3. **Evaluate Results:**
   - If **ALL impacted tests pass** → present results and ask for user approval to proceed.
   - If **ANY impacted test fails** → analyse the failure, fix the root cause within the same task, re-run the tests, and repeat until all impacted tests pass. Do NOT ask to advance until tests are green.
4. **Report Test Status:** Present a concise test status summary: `Task [N] Test Gate: PASS ✅` or `Task [N] Test Gate: FAIL ❌ — fixing…`

> **RULE:** You are forbidden from presenting "CONFIRM EXECUTION FOR THIS TASK" as complete or asking to move to the next task if any impacted test is failing.

- **PROMPT FORWARD:** **STRICT WAIT.** After each task and its Test Gate pass, present the changes and wait for approval. Proceed to the next task or Phase 5 **ONLY** after explicit user confirmation.

---

## Phase 5: Quality Gate, Review & Final Hand-off
**Goal:** Final validation, iterative improvement, and artifact generation.

### 5A. Rigorous Testing & Debugging (The Quality Gate)
* **🔁 CHECK:** Perform the `needContextReload` check before anything else in this phase.
-   **ACTION:** Run the **full test suite** (all unit and integration tests across the entire system), not just the impacted subset.
-   **ACTION:** If any tests are failing — including tests unrelated to the current story — analyse the failure:
    - If caused by the current story's changes → fix immediately and re-run.
    - If pre-existing failure (existed before this story) → document it clearly but do not block the quality gate for it. Flag it to the user.
-   **SUCCESS CRITERIA:** This step is complete **ONLY IF**:
    1. All test suites introduced or modified by this story pass.
    2. No new test regressions were introduced by this story's changes.
    3. **Code coverage and safety checks meet the thresholds** mandated by **Global Governance**.
    4. The overall system is in a stable, compilable state.
-   **LOOP:** If any criteria above are not met, fix and re-run. Do NOT proceed to 5B until the Quality Gate is green.

> **NOTE:** Context drift detection and context document updates have been moved to the `@update-context` flow. Run `@update-context` (or P0 at the start of the next session) to capture any context changes introduced by this story.

### 5B. Technical Review & Final Fixes
-   **ACTION:** Perform a crisp technical review (Efficiency, Security, Maintainability). Provide specific snippets for comments.
-   **LOOP:** If fixes are applied, or if **Governance Mandates** are not met, you **must** return to **Step 5A** to re-verify.

### 5C. Context Document Update (Handled via @update-context)

> **This step is now managed by the `@update-context` command / P0 flow.**  
> See `.github/sdd/update-context.md` for the full interactive context update process.

At the end of Phase 5, remind the user:

> "📋 **Context Update Reminder:** Any module context changes introduced by this story should be captured by running `@update-context` (or it will be offered at the start of the next session as P0). This ensures `index.md` and the relevant `modules/[module_name].md` files stay in sync with the implementation."

### 5D. Final Documentation (Summary File)
-   **ACTION:** Update internal docs (OpenAPI, etc.) only if mandated.
-   **SUMMARY GENERATION:** Generate a `.md` file named after the title of the user story in the **project root directory**.
-   **TEMPLATE RULE:** You must strictly follow the structure defined in the file **`.github/sdd/summary-template.md`**.

### 5E. Git Commit & Final Output (Chat Space)
-   **ACTION:** Generate a brief, clear **Git commit message** following standard best practices (feat/fix/chore).
-   **FINAL CHAT OUTPUT:** Provide a single conclusive summary confirming:
    1.  List of files modified and approved.
    2.  Result of final test run (**"Final Test Status: ALL PASS | Governance: COMPLIANT"**).
    3.  Confirmation that **Global Governance** rules were applied.
    4.  The **Git Commit Message** (presented as a code block).
    5.  Confirmation that the context module files and `index.md` have been updated (via `@update-context`).
    6.  **Drift Scan Result:** `"Drift Scan: captured via @update-context ✅"` — or note if deferred to next session P0.
    7.  **Conflict Resolution:** `"Conflicts: NONE ✅"` — or confirm the conflict type and resolution model applied.
    8.  **Execution Mode used:** `STRUCTURED` or `FULL GOVERNED`.
    9.  Confirmation that the summary file has been generated in the root.
