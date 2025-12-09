# Phase 4 — Agents Tracker (UX / Readability)

This tracker provides a concise Phase 4 view for agents working on UX/readability (microtools + casino-lite experiments are visible but remain out-of-scope for feature changes).

Active Agents
-------------
- contrast-agent — theme tokens & contrast
- homepage-agent — landing page layout & card hierarchy
- audit-agent — visual audits & pass/fail reports

Responsibilities Matrix
-----------------------
| Agent | Primary responsibilities |
|---|---|
| contrast-agent | Manage theme tokens, propose safe mix-ratio changes, own PR comments for visual diffs |
| homepage-agent | Maintain homepage ordering, card presentation, carousel behavior (no new tools) |
| audit-agent | Provide visual baseline + regression checks, block regressions until resolved |

Current Tasks In Progress (Phase 4 - UX-only)
---------------------------------------------
- [ ] Contrast token refinement: --surface-elevated / --border-primary-darker / --card-shadow (contrast-agent)
- [ ] Homepage elevation polish: apply token updates to tool-cards and Lucky Profile (homepage-agent)
- [ ] Visual smoke tests for homepage + lucky-profile (audit-agent)

Tasks Pending Review
--------------------
- [ ] Full microtools visual rollout — requires audit sign-off (contrast-agent → audit-agent)
- [ ] CTA accessibility sweep across all top-level pages — requires audit sign-off

Completed Tasks for This Branch
-------------------------------
- [x] Initial Phase 4 visual audit notes (docs/visual-audit-phase-4.md)
- [x] Export parity and DPR-aware fixes for ticket-beautifier (previous work)

Cross-Agent Dependencies
------------------------
- homepage-agent depends on contrast-agent for token recipes.
- audit-agent must receive approved token diffs and screenshots from contrast-agent before approving rollout to microtools.

Phase 4 Context & Guardrails
---------------------------
- Phase 4 covers microtool expansion & early casino-lite experiments. This branch is strictly for UX/readability and documentation work only—no new tools, no new game logic.
- Any new tool or casino-lite mechanic must be created in a separate feature branch and accompanied by a Phase-appropriate brief.

Backfill / Reconciliation
-------------------------
- [ ] Reconcile prior Claude Sonnet 4.5 work with current token decisions (docs + tokens + layout) — cross-check required.

Future Tasks Backlog
--------------------
- Phase 4 UX-safe tasks:
  - [ ] Finish pixel-level regression scaffolding for core pages (ticket-beautifier, index, lucky-profile)
  - [ ] Add Playwright DPR parity tests into CI (audit-agent)
- Potential Phase 5+ feature tasks (explicitly out-of-scope for this branch):
  - [ ] New microtools (server or frontend logic)
  - [ ] Casino-lite gameplay mechanics and telemetry

Notes for Automation
--------------------
- Checkboxes above are intended to be machine-readable and automatable in CI flows. Agents should update the tracker when tasks move from "In Progress" to "Done".
