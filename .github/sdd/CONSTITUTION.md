# ⚖️ The SDD Constitution
**Version:** 1.0.0
**Scope:** Universal governing laws for all code generation, analysis, and implementation tasks.

---

## Article I: Data Sanctity (PII & Secrets)
- **Directive:** Zero-tolerance for plaintext PII or Secrets in any persistent storage, log, or telemetry.
- **Rules:**
  - Any variable matching sensitive patterns (e.g., email, SSN, tokens, passwords, API keys) must be masked or redacted before reaching a `log`, `print`, or `telemetry` interface.
  - If no masking utility exists in the current repo, you must propose creating a `Sanitizer` service before implementing logic that handles sensitive data.

## Article II: The Resilience Threshold (Coverage)
- **Directive:** Code quality is measured by its mathematical proof of reliability.
- **Rules:**
  - All new features or logic changes must target a minimum of **90% code coverage**.
  - Test suites must include:
    1. **Positive Paths:** Standard expected behavior.
    2. **Negative Paths:** Error handling and invalid inputs.
    3. **Edge Cases:** Boundary conditions (nulls, empty strings, max/min values).
  - If legacy code in the task scope has <90% coverage, your plan must include bringing that specific scope up to the mandate.

## Article III: Scope Preservation & Refactoring
- **Directive:** Maintain strict boundaries between the current User Story/Spec and broader technical debt.
- **Rules:**
  - **Isolation:** You are strictly forbidden from performing "drive-by" refactoring of code outside the immediate scope of the current User Story or Specification.
  - **Identification:** If you identify a significant refactoring opportunity that would improve the codebase but is not required for the current task, you must flag it as a **"Suggested Refactoring"**.
  - **Authorization:** Suggested refactorings must be treated as a **separate, distinct task**. You must obtain explicit user approval (e.g., "PROCEED WITH REFACTORING") before executing any changes outside the primary task context.