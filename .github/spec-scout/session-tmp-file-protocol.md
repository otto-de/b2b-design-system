<!-- Framework Version: v3.1.0 -->
<!-- Compatible with: copilot-instructions.md v3.1.0 -->
# Session-Resilient Temporary File Protocol

**Purpose:**  
To ensure session continuity and prevent data loss, a temporary file will be maintained throughout the SDD workflow. This file records a phase-by-phase structured log of the current session's progress, decisions, and user feedback — enabling full session recovery if the context window is lost or the conversation is interrupted.

**File Location & Naming:**  
- The file will be created under `.github/`
- The filename will be the title of the user story/problem statement (spaces replaced with underscores, special characters removed, `.tmp.md` extension).
- Example: `.github/Update_Contact_Validation_Rules.tmp.md`

**When to Create/Update:**  
- The temporary file must be **created at the end of P0** (after the drift check decision), or at the end of Phase 1 if P0 was skipped — whichever comes first.
- It must be **updated at the end of every subsequent phase** (1, 2, 3, after each task in 4, and 5).

---

## 📋 Mandatory Temp File Schema

Every session temp file **MUST** contain all of the sections below. Sections for phases not yet reached should be present but marked `NOT REACHED`.

```markdown
# Session: [Story Title]
**Created:** [ISO 8601 datetime]
**Last Updated:** [ISO 8601 datetime]
**Current Phase:** [P0 / 1 / 2 / 3 / 4-TN / 5]
**needContextReload:** [true / false]

---

## Session Meta
- **Story / Prompt:** [One-sentence summary of the user's request]
- **Loaded Modules:** [Comma-separated list of module files loaded]
- **Execution Mode:** [Full workflow / @analysis only / @solution only]

---

## P0 Outcome
- **Drift Check Run:** [YES / NO / SKIPPED]
- **Modules Updated:** [List of updated module files, or NONE]
- **Warning Issued:** [YES — context may have drifted / NO]

---

## Phase 1 Summary
- **Drift Levels:** [Module → D-level for each loaded module]
- **Conflict Detected:** [YES — [type and modules] / NO]
- **Governance Flags:** [Blocking: [list] / Advisory: [list] / NONE]
- **Baseline Status:** [PASS / FAIL — [summary of failures]]
- **Open Questions:** [List of unanswered clarifying questions, or NONE]
- **User Approval:** [APPROVED / PENDING]

---

## Phase 2 Summary
- **Solutions Presented:** [Count and brief titles]
- **Selected Approach:** [Title of selected approach, or PENDING]
- **User Modifications:** [Any changes requested before selection, or NONE]

---

## Phase 3 Summary
- **Tasks Defined:** [T1–TN list with one-line descriptions]
- **User Modifications:** [Any reordering or scope changes, or NONE]
- **User Approval:** [EXECUTE PLAN received / PENDING]

---

## Phase 4 Progress
<!-- One entry per task -->
- **T1:** [COMPLETE / IN PROGRESS / PENDING] — [one-line summary] — Test Gate: [PASS ✅ / FAIL ❌ / PENDING]
- **T2:** [COMPLETE / IN PROGRESS / PENDING] — ...

---

## Phase 5 Summary
- **Full Test Suite:** [PASS / FAIL — pre-existing failures noted: [list]]
- **Coverage:** [N]% on changed logic — [MEETS / BELOW] [C2] threshold
- **PII Check [C1]:** [COMPLIANT / FLAG — details]
- **Scope Check [C3]:** [CLEAN / SUGGESTED REFACTORINGS — list]
- **Summary File Generated:** [filename.md / PENDING]
- **Commit Message Generated:** [YES / PENDING]

---

## Open Items
<!-- Any unresolved questions, deferred decisions, or follow-up actions -->
- [Item or NONE]
```

---

## Update Protocol

- At the end of each phase, **overwrite the relevant section** with that phase's outcomes — do not append duplicate sections.
- Each section must be brief, factual, and suitable for session recovery or handoff.
- The `Last Updated` and `Current Phase` fields in the header must be kept accurate at all times.

---

## Session Continuity and the @continue Command

**Command:** `@continue`

If a user references a session temp file in chat from a new session and uses the `@continue` command:

1. The agent MUST read the referenced temp file.
2. The agent MUST validate that the file:
   - Follows the mandatory schema above.
   - Contains a non-empty `## Session Meta` section.
   - Contains at least one completed phase summary (not `NOT REACHED`).
3. **If valid:** Restore context from the file — re-load all modules listed under `Loaded Modules`, restore `needContextReload` from the header, and resume the workflow from the next uncompleted phase or task.
4. **If invalid (missing, malformed, or lacks completed phase summaries):**
   - Reject the restore. Output clearly: `"❌ Session temp file is invalid or incomplete. Cannot restore session."`
   - Offer the user two recovery options:
     - **(A) Start fresh** — begin the full SDD workflow from P0.
     - **(B) Manual restore** — paste the content of the last completed phase summary directly into chat and the agent will attempt to reconstruct from that point.

**Valid File Requirements:**
- The file must contain the mandatory schema header (`## Session Meta`, `## P0 Outcome`, etc.).
- At least one phase section must have a real value (not `NOT REACHED`).
- `Current Phase` must indicate a real phase, not a placeholder.

---

*Framework Version: v3.1.0 · Last Updated: March 7, 2026*
