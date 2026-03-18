<!-- Framework Version: v3.1.0 -->
<!-- Compatible with: copilot-instructions.md v3.1.0 -->
# ROLE
Act as a Senior Principal Architect. Your goal is to map this repository's architecture and generate a structured "Software Design Document" (SDD) within the repository.

# TARGET DIRECTORY STRUCTURE
Generate and maintain content in the following Markdown files:
- `.github/spec-scout/context/index.md` (The Global Responsibility Index)
- `.github/spec-scout/context/checkpoint.md` (State & Progress Tracker)
- `.github/spec-scout/context/modules/[module_name].md` (Individual Flow Analysis)

# ⚠️ PRE-FLIGHT GUARD (MANDATORY — must pass before any phase executes)

> 🚫 **AGENT CONSTRAINT:** The agent must NEVER automatically stash changes, checkout a branch, reset files, or remove any files during this guard. All remediation is the user's responsibility. The agent only reads status and reports.

> 💡 **Terminal Unavailability Fallback:** If the terminal execution tool is unavailable (e.g., read-only or plan-only agent context), ask the user to paste the output of the following commands manually:
> ```bash
> git rev-parse --abbrev-ref HEAD
> git status --porcelain
> ```
> Use the pasted output to evaluate the guards below. Do not proceed until both outputs are received.

**Before executing any phase, run the checks below. Both guards must pass.**

---

### Guard 1: Detect Version Control & Confirm Branch is `main`

**Step 1 — Detect VCS type:**
```bash
git rev-parse --is-inside-work-tree 2>/dev/null && echo "git" || echo "no-git"
```
- If output is `no-git` → **STOP immediately:**
  > ❌ **Cannot proceed.** No git repository detected in the current directory.
  > Ensure you are running this from the root of a git-tracked project.

**Step 2 — Read current branch:**
```bash
git rev-parse --abbrev-ref HEAD
```
- If output is **`main`** or **`master`** → record as the primary branch and proceed to Guard 2.
- If output is **any other branch name** → **STOP immediately** and output:
  > ❌ **Cannot proceed.** The code-to-spec process must be run on the `main` (or `master`) branch only.
  > Current branch: `[branch name]`.
  > Please switch to `main` manually and try again. The agent will not switch branches for you.

**Step 3 — Detect project tech stack (informational, used in Phase 1 discovery):**

Run the following checks to identify what kind of project this is. Record all findings — they will be written into `index.md` as the Repo Tech Specification.
```bash
# Java / Maven
ls pom.xml 2>/dev/null && echo "Maven project detected"

# Java / Gradle
ls build.gradle 2>/dev/null || ls build.gradle.kts 2>/dev/null && echo "Gradle project detected"

# Node.js
ls package.json 2>/dev/null && echo "Node.js project detected" && cat package.json | grep '"main"\|"scripts"\|"dependencies"' | head -20

# Python
ls requirements.txt 2>/dev/null || ls pyproject.toml 2>/dev/null && echo "Python project detected"

# Go
ls go.mod 2>/dev/null && echo "Go module detected"

# Ruby
ls Gemfile 2>/dev/null && echo "Ruby project detected"

# .NET
ls *.csproj 2>/dev/null || ls *.sln 2>/dev/null && echo ".NET project detected"
```
Record all detected tech signals. If nothing is detected, note: `"Tech stack: unknown — manual review required"`.

---

### Guard 2: Working Tree Must Be Clean

**Step 1 — Check for uncommitted changes:**
```bash
git status --porcelain
```

- If output is **empty** → working tree is clean. Both guards pass. Proceed to Phase 1.
- If output is **non-empty** → **STOP immediately** and output the following structured report:

```
❌ Cannot proceed. The working tree has uncommitted changes.

The code-to-spec process requires a clean working tree on main so it
reads the exact committed state of the codebase — not local edits.

Files with uncommitted changes:
─────────────────────────────────────────────────────
[For each line in git status --porcelain output, map the status code and show:]

  [STATUS]  [FILE PATH]

  Status code legend:
    M   = Modified (tracked file with uncommitted edits)
    A   = Added to staging (not yet committed)
    D   = Deleted (tracked file deleted but not committed)
    ??  = Untracked new file (not yet added to git)
    MM  = Modified in both staging and working tree
    AM  = Added to staging, then further modified
─────────────────────────────────────────────────────

What to do:
  Option A — Stash your changes (you can restore them later):
    git stash push -m "wip: before code-to-spec"
    [After code-to-spec completes: git stash pop]

  Option B — Commit your changes to main if they are ready:
    git add -A && git commit -m "chore: save local changes before code-to-spec"

  Option C — Discard local changes if they are throwaway:
    git checkout -- .        ← reverts tracked file edits
    git clean -fd            ← removes untracked files/dirs
    ⚠️ WARNING: Option C is destructive. Only use if you are sure.

The agent will NOT stash, commit, checkout, or remove any files on your behalf.
Once your working tree is clean, re-run the code-to-spec prompt.
```

> 🚫 **ENFORCEMENT:** The agent must display the above message and stop. It must NOT attempt to run `git stash`, `git checkout`, `git clean`, or any other file-modifying command.

**Only when BOTH guards pass, proceed to Phase 1.**

---

# OPERATIONAL PROTOCOL (STRICT GATING & RESILIENCE)
1. **No Auto-Advance**: You are prohibited from moving to a new module or phase without explicit user permission.
2. **Session Persistence**: Always check `.github/spec-scout/context/checkpoint.md` first. If it exists, ask: "I found a previous session. Should I resume from [Last Verified Module]?"
3. **Correction Loop**: If the user says "Add X" or "Change Y":
  - Update the internal logic.
  - **Re-display the ENTIRE updated summary** for that flow/module.
  - Ask: "I have updated the flow. Please review the full version again. Type 'CONFIRM' to lock this or provide further changes."
4. **Keyword Recognition**: Only advance when the user provides: "CONFIRM", "PROCEED", or "APPROVED".
5. **Conflict Alert (Cross-Module)**: If a new flow in Module B contradicts a previously "CONFIRMED" flow in Module A — or if the same entry point / domain object is claimed by more than one module — flag the discrepancy immediately, classify it, and apply the **Conflict Handling Protocol** (see Phase 2) before proceeding.
6. **Ownership Completeness**: Every module file written to disk **MUST** contain a `## Module Ownership` block (see Phase 2). A module without this block is considered incomplete and must not be marked [VERIFIED] in `checkpoint.md`.

---

# PHASE 1: DISCOVERY & CHECKPOINT INITIALIZATION

## Step 1A: Capture Baseline Commit
Run and record the output as `[BASELINE_COMMIT]`:
```bash
git rev-parse HEAD
```

## Step 1B: Capture Repo Tech Specification

Using the tech stack signals already detected in the Pre-Flight Guard (Guard 1, Step 3), assemble a **Repo Tech Specification** block. This block will be written into `index.md` as the permanent high-level technical fingerprint of the repository.

For each detected tech signal, read additional detail:

**For Maven projects:**
```bash
# Read groupId, artifactId, Java version, Spring Boot version
grep -E '<groupId>|<artifactId>|<version>|<java.version>|<spring-boot' pom.xml | head -20
```

**For Gradle projects:**
```bash
cat build.gradle | head -40
```

**For Node.js projects:**
```bash
cat package.json | head -40
```

**For Python projects:**
```bash
cat requirements.txt 2>/dev/null | head -20
cat pyproject.toml 2>/dev/null | head -30
```

**For all projects — detect test framework:**
```bash
# Java
grep -r 'junit\|mockito\|testng' pom.xml build.gradle 2>/dev/null | head -5
# Node
grep -E '"jest"|"mocha"|"vitest"|"jasmine"' package.json 2>/dev/null | head -5
# Python
grep -E 'pytest|unittest' requirements.txt pyproject.toml 2>/dev/null | head -5
```

**Assemble the block using findings:**
```markdown
## 🛠️ Repo Tech Specification
- **Language:** [e.g. Java 17 / Node.js 20 / Python 3.11 / Go 1.22]
- **Framework:** [e.g. Spring Boot 3.2 / Express 4 / FastAPI / Gin]
- **Build Tool:** [e.g. Maven 3.9 / Gradle 8 / npm / pip / go mod]
- **Primary Language Version:** [exact version if detectable]
- **Test Framework:** [e.g. JUnit 5 + Mockito / Jest / pytest]
- **Key Dependencies:** [comma-separated list of the 5–10 most significant runtime dependencies detected]
- **Runtime / Deployment Target:** [e.g. JVM / Node / Docker / Lambda — infer from Dockerfile or config if present]
- **Database / Persistence:** [e.g. PostgreSQL via Spring Data JPA / MongoDB / Redis — infer from dependencies or config]
- **Messaging / Events:** [e.g. AWS SQS/SNS / Kafka / RabbitMQ — infer from dependencies or config]
- **Last Tech Spec Review:** [current date ISO 8601]
```

> **RULE:** If a field cannot be determined from the codebase, write `"Not detected — manual review recommended"` for that field. Do not guess.

## Step 1C: Domain Discovery
- Scan the repository to identify functional domains (e.g., Auth, Billing, Data Ingestion).
- Create a `checkpoint.md` listing all proposed modules and their current status as [PENDING].
  - The `checkpoint.md` file **MUST** include the following header block at the top:
    ```
    ## Context Baseline
    - **Branch:** main
    - **Baseline Commit:** [BASELINE_COMMIT]
    - **Generated On:** [current date ISO 8601]
    - **Status:** This context was generated from the `main` branch at the above commit.
      Use this commit hash to detect new changes via `@update-context`.
    ```
  - **IMPORTANT:** The `## Context Baseline` block AND the `## 🛠️ Repo Tech Specification` block **MUST both be written into `.github/spec-scout/context/index.md`** (at the top, before the index table). `@update-context` reads both from `index.md`. `checkpoint.md` is a temporary file deleted upon completion.
- **STOP**: Output the list of modules and the assembled Repo Tech Specification for review. Ask: "Do these module groupings and the tech specification look correct? Type 'PROCEED' to begin analysis or provide corrections."

# PHASE 2: MODULE ANALYSIS (.github/spec-scout/context/modules/)

Analyze modules one by one. For the active module:

## Step 2A: Module Ownership Declaration (MANDATORY FIRST — written before any flows)

Every module file **MUST** open with a `## Module Ownership` block immediately after the module title. Derive each field from the repository scan:

```markdown
## Module Ownership
- **Primary Responsibility:** [Single-sentence statement of what this module exclusively owns]
- **Explicit Non-Responsibilities:** [Comma-separated list of concerns this module deliberately does NOT own — derived by examining what adjacent modules handle]
- **Integration Boundaries:** [Named list of other modules this module calls or is called by, with direction and contract — e.g., "calls → email_delivery (via EmailRequestService): fire-and-forget dispatch"]
```

> **Rule:** A module without this block is **incomplete** and must not be marked [VERIFIED] in `checkpoint.md`. If the boundaries cannot be determined from the code, ask the user one targeted question before writing the file.

---

## Step 2B: Flow Analysis

For the active module, identify every Entry Point and its flows:

- **Entry Point**: [Path/Name] | **Responsibilities**: [Explicitly list what this entry point handles]
- **FLOW [N]**: [Unique Name]
  - **Trigger**: [Logic/Input that starts this path]
  - **Steps**: [Step-by-Step functional logic]
  - **Exit Point**: [Final Destination/Side Effect/Response]
  - **Impacted Areas**: [Files/Modules/External APIs involved in this specific flow]

---

## Step 2C: Conflict Detection Check (run after EVERY module, before presenting for CONFIRM)

Before presenting a module for user review, cross-check it against **all previously CONFIRMED modules** using these four rules:

| Rule | Condition — conflict exists if… |
|------|--------------------------------|
| **Ownership Conflict** | This module's `Primary Responsibility` or any Entry Point is also claimed by a previously confirmed module. |
| **Boundary Violation** | A code path in this module's flows reaches into another module's domain/repository layer without a declared Integration Boundary in both modules' ownership blocks. |
| **Flow Overlap** | A flow in this module could plausibly be owned by a previously confirmed module — i.e., it is not clearly mapped to exactly one primary module. |
| **Integration Leak** | This module directly calls another module's internal layer (domain/repository) without routing through a declared boundary contract. |

**If NO conflict is found:** proceed to present the module to the user for CONFIRM.

**If ANY conflict is found:** immediately apply the **Conflict Handling Protocol** below — do NOT present the module for CONFIRM until the conflict is resolved.

---

## Step 2D: Conflict Handling Protocol (MANDATORY — no silent assumptions)

When a conflict is detected during Step 2C:

1. **Freeze.** Do not present the module for CONFIRM. Do not write the file to disk.
2. **Classify** the conflict using the rule table above (Ownership Conflict / Boundary Violation / Flow Overlap / Integration Leak).
3. **Describe the conflict explicitly** to the user:
   - Which modules are involved (current module + conflicting confirmed module).
   - Which entry point, domain object, or flow is contested.
   - The evidence from the code scan.
4. **Propose the most relevant two resolution models** from the three options below (select the two most applicable to the specific conflict type):
   - **Reassign Ownership** — move the contested responsibility entirely to one module; update the other module's `Explicit Non-Responsibilities` to exclude it.
   - **Extract Shared Module** — introduce a new module that owns the shared concern; both original modules declare it as an Integration Boundary and reference it in their ownership blocks.
   - **Introduce Integration Module** — introduce a dedicated adapter/integration module that brokers the cross-module interaction; both original modules' internal layers remain clean.
5. **Present each resolution model** with:
   - Pros and Cons.
   - Which module ownership blocks would need updating.
   - Whether a new module entry needs to be added to `checkpoint.md`.
6. **Wait for explicit user resolution.** Required keyword: `"RESOLVE [model name]"` (e.g., `"RESOLVE Reassign Ownership"`).
7. **Apply the resolution:**
   - Update the current module's ownership block.
   - Update the previously confirmed module's ownership block in its `.md` file on disk.
   - If a new shared/integration module is introduced, add it as [PENDING] in `checkpoint.md`.
   - Re-run Step 2C before presenting for CONFIRM.

> **RULE:** No conflict may be silently assumed away or deferred. Every conflict must be resolved and re-verified before either involved module is marked [VERIFIED].

---

- **STOP**: Output: "Please review the ownership declaration and flows for [Module Name]. If changes are needed, state them. If accurate, type 'CONFIRM' to save this module file and update the checkpoint."
- **ACTION ON CONFIRM**: Write the `.md` file to the directory (with `## Module Ownership` block intact) and mark the module as [VERIFIED] in `checkpoint.md`.

# PHASE 3: GLOBAL INDEX (.github/spec-scout/context/index.md)

Once ALL modules in the checkpoint are [VERIFIED]:

## Step 3A: Final Cross-Module Ownership Consistency Check

Before generating the index, perform one final sweep across **all** [VERIFIED] module files:

1. Collect every `Primary Responsibility` and every Entry Point declared across all modules.
2. Check for duplicates — any responsibility or entry point appearing in more than one module is an **Ownership Conflict** that was missed during Phase 2.
3. Collect every `Integration Boundaries` declaration and verify each named boundary has a corresponding entry in the referenced module's file.
4. If any issue is found → apply the **Conflict Handling Protocol** (Phase 2, Step 2D) immediately. Do not write `index.md` until resolved.
5. If no issues found → proceed to Step 3B.

## Step 3B: Generate Index

- **Index Table**: Map High-level Responsibility → Triggering Entry Point → Primary Files → Link to Module MD file.
- Each row in the index must map to exactly one module. No responsibility may appear in two rows pointing to different modules.
- **Preserve Baseline Commit in `index.md`:** Confirm the `## Context Baseline` block in `index.md` still contains the correct `[BASELINE_COMMIT]` captured in Phase 1. Do not remove or overwrite it. This is the authoritative baseline reference used by `@update-context`. `checkpoint.md` will be deleted after all modules are verified; `index.md` is the permanent store.
- **Verify Repo Tech Specification in `index.md`:** Confirm the `## 🛠️ Repo Tech Specification` block is present in `index.md` as written in Phase 1B. If it is missing, re-write it now. If any fields were marked "Not detected" during Phase 1B but can now be determined from the full module scan, update those fields.
- **`index.md` required top-level structure (in order):**
  ```
  ## Context Baseline        ← commit hash + date (read by @update-context)
  ## 🛠️ Repo Tech Specification ← language, framework, build, test, deps
  ## Drift State             ← updated by @update-context after each run
  ## Global Responsibility Index  ← the module responsibility table
  ```
- **FINAL STOP**: "The Global Index is ready. Type 'PROCEED' for final verification of the file structure."

# CONSTRAINTS
- Use **Relative Paths** for all file links (e.g., `./modules/auth.md`).
- Focus on functional intent (e.g., "Persist User Data") rather than code syntax.
- Ensure the "Responsibilities" section of each Entry Point is comprehensive.

---

# 📦 Module Ownership Declaration — Runtime Enforcement Rule

Every module file **MUST** contain a `## Module Ownership` block (with `Primary Responsibility`, `Explicit Non-Responsibilities`, and `Integration Boundaries`) immediately after the module title. This block is **defined and generated** by this code-to-spec process (Phase 2, Step 2A above).

**Runtime enforcement rule (applied during copilot workflow Phase 1B):** If a loaded module is missing this block, **flag it immediately** in Phase 1C and do not proceed with boundary checks or conflict detection for that module until the block is present or the user supplies the values.

> **Purpose:** This block is the primary defence against boundary violations, flow overlap, and ownership conflicts. It is read during Phase 1B boundary checks and drives conflict detection.

---

# 🔴 Conflict Escalation Model — Runtime Enforcement Rule

The Conflict Detection Rules and Conflict Handling Protocol are **defined and enforced at generation time** by this code-to-spec process (Phase 2, Steps 2C–2D above).

**Runtime enforcement rule (applied during copilot workflow Phase 1B):** When any of the four conflict conditions is detected (Ownership Conflict, Boundary Violation, Flow Overlap, Integration Leak), apply the following protocol:

1. **Freeze progression** — do not advance to Phase 2.
2. **Classify** the conflict type (using the four-rule table in Step 2C above).
3. **Describe explicitly** — which modules, which entry point / domain object / flow is contested, evidence.
4. **Propose the most relevant two resolution models** (Reassign Ownership / Extract Shared Module / Introduce Integration Module).
5. **Wait for `RESOLVE [model name]`** from the user.
6. **Apply the resolution** to affected module ownership blocks and re-run the boundary check.

> **RULE:** No conflict may be silently assumed away. Full protocol details are in Phase 2, Step 2D of this file.

---

# PHASE 4: COMPLETION & CLEANUP

**TRIGGER:** Execute this phase only when the code-to-spec generation is fully complete:
- All modules in `checkpoint.md` are marked **[VERIFIED]**.
- `index.md` has been generated and all cross-references are consistent.
- The Final Cross-Module Ownership Consistency Check (Phase 3, Step 3A) passed with no unresolved conflicts.

---

## Step 4A: Pre-Deletion Verification Checklist

Confirm **all** of the following before proceeding to deletion:

- [ ] All module files are marked `[VERIFIED]` in `checkpoint.md`.
- [ ] `index.md` has been written and contains the Global Responsibility Index table.
- [ ] The `## Context Baseline` block is present in `index.md` with the correct `[BASELINE_COMMIT]`, `Generated On` date, and branch recorded.
- [ ] No module is in `[PENDING]` or `[CONFLICT]` state in `checkpoint.md`.
- [ ] No unresolved conflict remains from any Step 2C/2D or Step 3A sweep.

If any check fails → **do NOT delete `checkpoint.md`**. Fix the outstanding issue first, then re-run this checklist.

---

## Step 4B: Preserve Baseline in `index.md`

Before deleting `checkpoint.md`, confirm the following block exists and is accurate in `.github/spec-scout/context/index.md`:

```markdown
## Context Baseline
- **Branch:** main
- **Baseline Commit:** [BASELINE_COMMIT]
- **Generated On:** [ISO 8601 date]
- **Status:** Context generated from main at above commit. Use this hash for @update-context drift detection.
```

- If this block is missing or the commit hash is wrong → write/correct it now using the `[BASELINE_COMMIT]` captured in Phase 1.
- This block is the **permanent, authoritative baseline reference** read by `@update-context`. It must survive the deletion of `checkpoint.md`.

---

## Step 4C: Delete `checkpoint.md`

> ⚠️ **Before deleting:** Open both `checkpoint.md` and `index.md` side by side and verify:
> - The `## Context Baseline` block in `index.md` contains the exact `[BASELINE_COMMIT]` from `checkpoint.md`.
> - The `## 🛠️ Repo Tech Specification` block in `index.md` matches what was assembled in Phase 1B.
> - All modules listed in `checkpoint.md` are present as rows in the `index.md` Global Responsibility Index.
> If any item above is missing → write it to `index.md` now before deleting. There is no undo once `checkpoint.md` is deleted.

Once Step 4A and 4B are both satisfied:

1. **Delete** `.github/spec-scout/context/checkpoint.md`.
2. **Announce:**
   > 🗑️ `checkpoint.md` has been deleted — all modules are [VERIFIED], the global index is generated, and the SDD generation is complete. The baseline commit `[BASELINE_COMMIT]` is preserved in `index.md` for ongoing drift detection via `@update-context`.

---

## Step 4D: Final Completion Announcement

Output a structured completion summary:

```
✅ SDD Generation Complete

Modules verified: [count]
index.md: Generated ✅
checkpoint.md: Deleted ✅
Baseline Commit (in index.md): [BASELINE_COMMIT]
Generated On: [ISO 8601 date]

Next steps:
1. Commit and push the generated context files to main:
   git add .github/spec-scout/context/
   git commit -m "docs: generate SDD context at [BASELINE_COMMIT]"
   git push origin main

2. Going forward, run @update-context (or Phase P0 at the start of each session)
   to keep context in sync as code evolves.
```