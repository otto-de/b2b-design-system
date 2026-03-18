<!-- Framework Version: v3.1.0 -->
<!-- Compatible with: copilot-instructions.md v3.1.0 -->
# Story Summary: [Story Title]

**Date:** [ISO 8601 date]
**Branch:** [feature branch name]
**Author:** [author / team]
**Session Temp File:** `.github/[Story_Title].tmp.md`

---

## 📋 What Was Done

> One or two sentences describing the change in plain language — what feature was added, what bug was fixed, or what behaviour changed.

---

## 🔍 Modules Touched

| Module | Change Type | Brief Description |
|--------|-------------|-------------------|
| `modules/[name].md` | New Flow / Modified Flow / Entry Point Added / Ownership Updated | [One line: what specifically changed] |

> _Add one row per module that was meaningfully changed. If a module was read but not changed, omit it._

---

## ⚡ Key Highlights for Context Update

> This section is the most important — it tells `@update-context` exactly what to look for the next time it runs.

### New or Changed Entry Points
_List any new or modified REST endpoints, event listeners, scheduled jobs, or CLI commands:_
- `[METHOD] /path/to/endpoint` — [what it does]

### New or Changed Domain Behaviour
_List any new business rules, validation changes, or workflow logic:_
- [Brief description of the behaviour change]

### Schema / Data Model Changes
_List any new tables, columns, entity fields, or relationship changes:_
- [Entity or table name] — [what changed]

### Event Changes
_List any new, modified, or removed event publishing or consumption:_
- Published: `[EventName]` via `[topic/queue]` — [trigger]
- Consumed: `[EventName]` from `[topic/queue]` — [handler]

### Integration Boundary Changes
_List any new or changed calls between modules, or to external services:_
- `[Module A]` → `[Module B]` — [new or changed contract]
- External: `[Service Name]` — [what changed]

### Files Modified
_Key source files changed (not test files — just the implementation):_
- `[file path]` — [one-line reason]

---

## ✅ Quality Gate Results

| Check | Result |
|-------|--------|
| Story-impacted tests | PASS ✅ / FAIL ❌ |
| Full test suite | PASS ✅ / FAIL ❌ (pre-existing failures noted below if any) |
| Code coverage (new/changed code) | [N]% — meets ≥ 90% mandate ✅ / below threshold ⚠️ |
| PII / secrets check [C1] | COMPLIANT ✅ / FLAG ⚠️ |
| Scope preservation [C3] | No out-of-scope changes ✅ / Suggested refactorings flagged ℹ️ |

_Pre-existing failures (if any):_
> [Note any test failures that existed before this story and were not introduced by it.]

---

## ⚠️ Risk & Rollback

**Rollback steps if this change needs to be reverted:**
- [Step 1 — e.g., revert the commit, run migration rollback, etc.]
- [Step 2 — e.g., redeploy previous version]

**Blast radius if something goes wrong:**
- [What systems, modules, or users are affected if this change fails in production]
- [Any cascading effects to watch for]

---

## 💬 Notes & Decisions

**Alternatives considered:**
- [Alternative approach that was evaluated but not chosen]

**Why this approach was chosen:**
- [One-sentence rationale]

**Known limitations:**
- [Any edge cases not covered, or known gaps in the implementation]

---

## 🔁 Context Update Status

| Action | Status |
|--------|--------|
| `@update-context` run after this story | YES ✅ / DEFERRED — will be offered at next P0 ⏳ |
| `index.md` baseline updated | YES ✅ / NO ❌ |
| Affected module files updated | YES ✅ / NO ❌ |

---

*Framework Version: v3.1.0 · Last Updated: March 7, 2026*
