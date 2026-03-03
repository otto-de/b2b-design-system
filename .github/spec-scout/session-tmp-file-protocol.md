# Session-Resilient Temporary File Protocol

**Purpose:**  
To ensure session continuity and prevent data loss, a temporary file will be maintained throughout the SDD workflow. This file will contain a concise, phase-by-phase summary of the current session’s progress, decisions, and user feedback.

**File Location & Naming:**  
- The file will be created under `.github/`
- The filename will be the title of the user story/problem statement (spaces replaced with underscores, special characters removed, `.tmp.md` extension).

**When to Create/Update:**  
- The temporary file should be created at the end of Phase 1 (after user approval), and updated at the end of each subsequent phase.

**Update Protocol:**  
- At the end of each phase (after user approval and before proceeding), append a crisp summary of that phase’s key outcomes, decisions, and any user-provided clarifications or answers to open questions.
- Each summary should be brief, focused, and suitable for session recovery or handoff.
- The file should always contain a recap of all previous phases, in order, to allow for full context restoration if needed.

**Phase-Specific Guidance:**
- **After Phase 1 (Context & Tech Report):**  
  Append a summary of the issue context, key spec findings, current technical state, discrepancies, governance audit, baseline status, and any user answers to pitfalls/questions.
- **After Phase 2 (Solution Proposal & Choice):**  
  Append the selected solution, including any user-suggested modifications or clarifications, and a recap of the rationale.
- **After Phase 3 (Task Breakdown & Action Plan):**  
  Append the finalized action plan, including any user reordering or scope changes, and the explicit success metrics.
- **After Each Task in Phase 4:**  
  Append a summary of the task just completed, including user feedback/approval and any adaptations to the plan.
- **After Phase 5 (Quality Gate & Handoff):**  
  Append a final summary, including test results, governance compliance, and confirmation of documentation/spec updates.

**Finalization:**  
- Once the workflow is complete and all impacted context files (business, technical, system spec) are updated, the temporary file may be archived, renamed, or deleted as appropriate.

---

**Example File Name:**  
`.github/Update_Contact_Validation_Rules.tmp.md`

---

**Implementation Note:**  
- The agent must ensure this file is updated at every phase transition, and that it always reflects the latest approved state of the workflow.
- If the session is lost or interrupted, the agent should use this file to restore context and resume the workflow seamlessly.

---

## Session Continuity and the @continue Command

**Command:** `@continue`

- If a user references a session temp file in chat from a new session and uses the `@continue` command:
  - The agent MUST read the referenced temp file.
  - The agent MUST validate that the file contains valid phase-by-phase data (each phase summary present and clearly marked).
  - If valid, the agent MUST restore context from the file and resume the workflow from the next uncompleted step/phase.
  - If invalid (missing or malformed phase summaries), the agent MUST reject the request and inform the user that the file is invalid for session continuation.
  - The agent MUST NOT treat the session as new if a valid temp file is referenced with `@continue`.
- This protocol applies only to temp md files created for session context (as per naming and location rules).

**Valid File Requirements:**
- The file must contain clear, sequential summaries for each completed phase (e.g., Phase 1, Phase 2, etc.), with content for each.
- The file must follow the update protocol and naming/location rules above.

**Error Handling:**
- If the file is missing, malformed, or lacks phase-by-phase data, the agent must reject the @continue request and provide a clear error message.

---
