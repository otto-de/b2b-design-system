# 🏗️ Spec-Driven Development (SDD) Framework

**A governed, AI-assisted development workflow for GitHub Copilot.**

SDD converts your codebase into a living specification, then uses that specification as the single source of truth for every feature, fix, and refactor. Before the AI writes a single line of code, it reads what you have — and it waits for your approval at every step.

---

## 📖 Table of Contents

1. [Why SDD?](#why-sdd)
2. [File Structure](#file-structure)
3. [Initial Setup](#initial-setup)
4. [Generating Your Context (First Time)](#generating-your-context-first-time)
5. [Starting a Session](#starting-a-session)
6. [The Workflow](#the-workflow)
7. [Commands & Keywords](#commands--keywords)
8. [Keeping Context Up to Date](#keeping-context-up-to-date)
9. [Session Resilience & @continue](#session-resilience--continue)
10. [Setup Checklist](#setup-checklist)

---

## Why SDD?

| Without SDD | With SDD |
|-------------|----------|
| AI guesses at intent each session | AI reads verified, structured context first |
| Scope creep — AI changes things it shouldn't | Strict scope boundary enforced automatically |
| Test coverage is undefined | Minimum coverage threshold enforced |
| Context lost between sessions | Session files let you resume exactly where you left off |
| No record of module responsibilities | Ownership, flows, and boundaries are committed to the repo |

---

## File Structure

After setup, your repository will have this layout:

```
your-repo/
├── .github/
│   ├── copilot-instructions.md         ← Main AI workflow instructions
│   ├── summary_template.md             ← Template for per-story summaries
│   └── sdd/
│       ├── CONSTITUTION.md             ← Governance rules
│       ├── code-to-spec.md             ← First-time context generator
│       ├── update-context.md           ← Context sync guide
│       ├── session_temp_file_protocol.md
│       └── context/
│           ├── index.md                ← Global module map (always read first)
│           └── modules/
│               ├── auth.md             ← One file per functional domain
│               ├── billing.md
│               └── …
│
└── [story-title].md                    ← Per-story summary (generated at end)
```

### What each file does

| File | Purpose |
|------|---------|
| `copilot-instructions.md` | Defines the phases, commands, and rules the AI follows every session |
| `CONSTITUTION.md` | The non-negotiable quality and safety rules (PII, coverage, scope) |
| `code-to-spec.md` | Paste into Copilot Chat once to generate all context from your codebase |
| `update-context.md` | Drives the `@update-context` command to keep context in sync |
| `context/index.md` | Module map, tech stack summary, and baseline commit — the AI always reads this first |
| `context/modules/[name].md` | Per-module flows, entry points, and ownership — generated once, maintained over time |

---

## Initial Setup

### 1. Copy the framework files

Copy the following files into your repository at these **exact paths** (don't rename or move them — the AI resolves references using these paths):

```
.github/copilot-instructions.md
.github/summary_template.md
.github/sdd/CONSTITUTION.md
.github/sdd/code-to-spec.md
.github/sdd/update-context.md
.github/sdd/session_temp_file_protocol.md
```

### 2. Make sure you're on `main` with a clean working tree

The context generation process must run on `main` with no uncommitted local changes:

```bash
git checkout main
git pull origin main
git status          # must show nothing — a clean tree
```

If `git status` shows files, commit, stash, or discard them first.
The AI will detect and explain any dirty-tree issues — but it will **never** stash or checkout for you.

### 3. Generate your context (see next section)

### 4. Commit the generated files yourself

After the AI finishes generating context, you run:

```bash
git add .github/sdd/context/
git commit -m "docs: generate SDD context"
git push origin main
```

> The AI will remind you to do this — but will never run git commands for you.

---

## Generating Your Context (First Time)

Open GitHub Copilot Chat and paste the contents of `.github/sdd/code-to-spec.md` as your message.

**What happens:**

1. The AI detects your tech stack (Java/Maven, Node, Python, Go, etc.)
2. It scans your codebase and proposes a list of functional modules
3. You confirm the module list with `PROCEED`
4. It analyses each module one by one — you review and confirm each with `CONFIRM`
5. It generates:
   - `context/index.md` — the global module map, your tech stack fingerprint, and a baseline commit
   - `context/modules/[name].md` — one file per domain, with flows, entry points, and ownership boundaries
6. On completion, the temporary progress file is deleted automatically

> ⏳ This is an interactive process. Expect to spend time reviewing each module. The AI waits at every step — it doesn't advance until you confirm.

**You only need to do this once per repository.** After that, `@update-context` keeps everything in sync as the code evolves.

---

## Starting a Session

Every time you start working on a story, open Copilot Chat and describe what you want to build or fix.

The AI will immediately ask:

> **"Would you like to run a context check before we begin?"**
> This compares the module context against the latest code on `main`.
> Reply **YES** to sync first, or **NO** to skip and proceed with the current context.

- **YES** → The AI analyses committed changes and shows you exactly what has drifted. You review and approve each update, then proceed to analysis.
- **NO** → The AI prints a one-time notice that context may be slightly behind, then goes straight into your story. This notice doesn't repeat for the rest of the session.

---

## The Workflow

Once you've confirmed the context check, the AI walks you through a structured sequence of phases. It **always waits for your approval** before advancing.

### Phase 1 — Understanding the Problem

The AI reads the relevant module context files and your codebase, then produces a **Tech Analysis Report** covering:
- What currently exists and how it works
- Which parts of the codebase are touched by your story
- Any risks, open questions, or conflicts it's spotted
- A governance check (PII exposure, coverage impact, scope)

💬 **You respond:** Address any questions, then type `PROCEED` when satisfied.

### Phase 2 — Solution Options

The AI proposes one or more approaches depending on the complexity of your story, with trade-offs clearly explained.

💬 **You respond:** Pick an option (`SELECT 1`, `SELECT 2`, etc.) or ask for refinements.

### Phase 3 — Task Plan

The AI breaks your chosen solution into an ordered list of tasks — what gets changed, in what order, with test steps included.

💬 **You respond:** Reorder or modify the plan if needed, then type `EXECUTE PLAN`.

### Phase 4 — Execution

The AI implements one task at a time:
- Asks for your confirmation before writing each change
- Runs the impacted tests after each task
- Will not advance to the next task if any test is failing

💬 **You respond:** `CONFIRM` each task; provide feedback at any point to adjust the remaining plan.

### Phase 5 — Quality Check & Wrap-Up

The AI runs the full test suite, performs a code quality review, generates a summary file at the repo root, and produces a git commit message for you to run yourself.

At the end, the AI reminds you to run `@update-context` to capture any module context changes introduced by the story.

---

## Commands & Keywords

### Chat Commands

| Command | What it does |
|---------|-------------|
| `@update-context` | Sync module context files with committed changes on `main`. The AI shows a Before → After review report; you approve each change. |
| `@analysis` | Run Phase 1 only — get a full analysis report without committing to a solution. Useful for impact assessment. |
| `@solution` | Run Phases 1 and 2 — get analysis plus solution options, then stop. |
| `@continue` | Resume a previous session from its temp file (see [Session Resilience](#session-resilience--continue)). |
| `@noscout` | Bypass SDD entirely for this message and act as standard Copilot. No phases, no governance. |

### Phase Gate Keywords

These are the words the AI listens for to advance between steps:

| Keyword | When you use it |
|---------|----------------|
| `PROCEED` | Approve Phase 1 report and move to Phase 2 |
| `SELECT 1` / `SELECT 2` | Choose a solution in Phase 2 |
| `EXECUTE PLAN` | Approve the task plan and start implementation |
| `CONFIRM` | Approve a module during code-to-spec, or confirm a task during Phase 4 |

---

## Keeping Context Up to Date

The context files in `context/modules/` describe your codebase at a specific commit. As your team merges code to `main`, context can drift. Running `@update-context` keeps them in sync.

### When to run it

- At the start of a session — the AI will offer it automatically as a YES/NO prompt
- After you or teammates merge changes to `main`
- After upgrading a major dependency or framework version
- After a story completes (the AI reminds you at the end of Phase 5)

### What it does

You type `@update-context`. The AI will:

1. Ask you to confirm your branch is up-to-date with `main`
2. Identify what has changed since the last context baseline
3. Show you a **Before → After** review for every proposed context change, in the exact format of the module files
4. Step through each change interactively — you `APPROVE`, `EDIT`, `SKIP`, or `CANCEL` each one
5. Update `index.md` with the new baseline commit
6. Tell you what git commands to run to commit the updated files *(it will not run them for you)*

---

## Session Resilience & @continue

### Session temp files

At the end of each phase, the AI automatically writes a `.tmp.md` file under `.github/`:

```
.github/Your_Story_Title.tmp.md
```

This file contains a phase-by-phase log of everything that happened — decisions made, solution selected, tasks completed, user feedback. If your session is interrupted, nothing is lost.

### Resuming with `@continue`

In a new Copilot Chat window:

1. Reference the temp file (paste its path or contents into chat)
2. Type `@continue`

The AI reads the file, validates it, restores the full session context, and picks up exactly where you left off.

> If the file is malformed or incomplete, the AI will tell you clearly rather than starting a new session.

---

## Setup Checklist

Use this when setting up SDD on a new repository:

**Framework files**
- [ ] `copilot-instructions.md` copied to `.github/`
- [ ] `summary_template.md` copied to `.github/`
- [ ] `CONSTITUTION.md` copied to `.github/sdd/`
- [ ] `code-to-spec.md` copied to `.github/sdd/`
- [ ] `update-context.md` copied to `.github/sdd/`
- [ ] `session_temp_file_protocol.md` copied to `.github/sdd/`

**Context generation**
- [ ] On `main` branch with a clean working tree before running code-to-spec
- [ ] Ran `code-to-spec` interactively — all modules confirmed, index generated
- [ ] `context/index.md` exists and contains a `## Context Baseline` commit hash
- [ ] `context/index.md` contains a `## 🛠️ Repo Tech Specification` block
- [ ] Temporary `checkpoint.md` was deleted by the AI on completion
- [ ] Generated context committed and pushed to `main`

**Team awareness**
- [ ] Everyone knows to start sessions with the YES/NO context check prompt
- [ ] Everyone knows `@update-context` should be run after merges to `main`
- [ ] Everyone knows the AI will never run `git commit` or `git push` — those are always manual

---

*Framework Version: 3.0 · Last Updated: March 2026*
