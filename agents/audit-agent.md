# Audit Agent — Phase 4 Visual Audit (No scope creep)

Summary
-------
The Audit Agent is responsible for running targeted manual and automated visual audits for Phase 4 changes. The audit role is strictly limited to detection and reporting — it does not propose new features.

Context
-------
Phase 4 includes a flurry of visual and theme-token changes across many pages. Clear audit boundaries help ensure that UX polish does not introduce regressions or unintended side-effects.

Purpose
-------
- Run visual audits before and after token changes across a defined set of pages (homepage, ticket-beautifier, lucky-profile, probability-visualizer, and a small sample of microtools).
- Produce explicit “Phase 4-safe” failure reports and remediation recommendations.

Inputs
------
- Screenshots (before/after)
- visual-audit-phase-4.md and any attached audit artifact
- the list of pages/tools under Phase 4 per AGENT_TRACKER

Audit Process
-------------
1. Baseline capture: record screenshots for a small set of canonical pages across light/dark + mobile/desktop.
2. Post-change capture: re-run the same captures after token changes.
3. Compare and flag failures with context (theme, DPI, viewport) and reproducible steps.

Scope Guardrails (Phase 4)
--------------------------
- In-scope: reporting visual regressions and recommending exact token-level or style-level fixes.
- Out-of-scope: designing new interactions, adding microtools, or changing game logic. Those are Phase 5+ activities.

Outputs
-------
- A short audit checklist (per page) with pass/fail and screenshots stored in a predictable location.
- Clear “Phase 4-safe” remediation steps that the Contrast Agent or Homepage Agent can implement.

Notes
-----
Audit runs should be succinct and reproducible. When a change fails the audit, the Audit Agent must return a concise remediation for the Contrast Agent and blockade merging until it’s resolved or a rollback is approved by the Phase 4 owner.
