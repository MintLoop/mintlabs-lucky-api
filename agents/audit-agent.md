# Audit Agent — Phase 4 Visual Audit (No scope creep + Microtool QA)

Summary
-------
The Audit Agent is responsible for running targeted manual and automated visual audits for Phase 4 changes. The audit role is strictly limited to detection and reporting — it does not propose new features.

**Phase 4 Continuation (Claude Sonnet 4.5 Handoff):**
This agent now runs visual audits on **EACH new microtool** added by Sonnet to ensure theme-token compliance and mobile responsiveness.

Context
-------
Phase 4 includes a flurry of visual and theme-token changes across many pages. Clear audit boundaries help ensure that UX polish does not introduce regressions or unintended side-effects.

Phase 4 Continuation Scope
--------------------------
**Visual Audit Requirements for EACH New Microtool:**
1. **Theme-token compliance:** Confirm tool uses global tokens (not hardcoded colors)
2. **Surface/border/shadow rendering:** Verify `--surface-elevated`, `--border-primary-darker`, `--card-shadow` render correctly
3. **Light/dark theme parity:** Test tool in BOTH themes (no contrast failures)
4. **Mobile responsiveness:** Verify tool works on mobile viewports (320px-768px)
5. **Append to visual-audit-phase-4.md:** Add new section for each microtool/tool category

Purpose
-------
- Run visual audits before and after token changes across a defined set of pages (homepage, ticket-beautifier, lucky-profile, probability-visualizer, and a small sample of microtools).
- Produce explicit "Phase 4-safe" failure reports and remediation recommendations.
- **NEW:** Audit EVERY new microtool before merge approval.

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

Audit Process (Updated for Microtool Expansion)
----------------------------------------------
1. **Baseline capture:** Record screenshots for canonical pages across light/dark + mobile/desktop
2. **Post-change capture:** Re-run same captures after token changes
3. **Compare and flag failures** with context (theme, DPI, viewport) and reproducible steps
4. **NEW — Per-microtool audit:** For each new tool, run dedicated audit with checklist below

Scope Guardrails (Phase 4)
--------------------------
- **In-scope:** reporting visual regressions and recommending exact token-level or style-level fixes.
- **In-scope (Phase 4 continuation):** Audit EACH new microtool for token compliance, theme parity, and responsiveness.
- **Out-of-scope:** designing new interactions, adding microtools, or changing game logic. Those are Phase 5+ activities.

Outputs
-------
- A short audit checklist (per page) with pass/fail and screenshots stored in a predictable location.
- Clear "Phase 4-safe" remediation steps that the Contrast Agent or Homepage Agent can implement.
- **NEW (Phase 4 continuation):** Per-microtool audit section appended to `docs/visual-audit-phase-4.md`.

Phase 4 Continuation Checklist (for EACH new microtool)
-------------------------------------------------------
For EVERY new microtool, run this audit before merge approval:
- [ ] **Theme-token compliance:** No hardcoded colors detected
- [ ] **Surface tokens:** `--surface`, `--surface-elevated`, `--surface-hover` render correctly
- [ ] **Border tokens:** `--border-primary`, `--border-primary-darker` render correctly
- [ ] **Shadow tokens:** `--card-shadow` provides appropriate depth
- [ ] **Light theme:** Tool readable and visually consistent
- [ ] **Dark theme:** Tool readable and visually consistent (no contrast failures)
- [ ] **Mobile (320px):** Tool usable on smallest viewport
- [ ] **Tablet (768px):** Tool adapts correctly to medium viewport
- [ ] **Desktop (1024px+):** Tool uses available space appropriately
- [ ] **Appended to docs/visual-audit-phase-4.md:** New section added with screenshots and pass/fail notes

Notes
-----
Audit runs should be succinct and reproducible. When a change fails the audit, the Audit Agent must return a concise remediation for the Contrast Agent and blockade merging until it's resolved or a rollback is approved by the Phase 4 owner.

**Phase 4 continuation:** Maintain `docs/visual-audit-phase-4.md` as the canonical audit log and append new microtool sections as they are added.
