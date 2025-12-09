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

Current Tasks In Progress (Phase 4 — Microtool Expansion)
---------------------------------------------------------
**Sprint 1 Complete (Lightweight RNG):**
- [x] Dice Roller (d4-d20 with history tracking)
- [x] Coin Flip (3D animation with streak tracking)
- [x] Card Picker (52-card deck with replacement modes)

**Sprint 2 In Progress (Color & Personalization):**
- [x] Lucky Colors by Birth Month (birthstone meanings + traits)
- [ ] Lucky Colors by Zodiac (rashi data integration)
- [ ] Personality Trait Mapper (numerology calculations)

**Claude Sonnet 4.5 continuation tasks:**
- [x] Ensure ALL new tools use global tokens (no hardcoded colors) — verified all tools
- [x] Register new microtools in EduGrid (not homepage carousel per user preference)
- [ ] Integrate casino-lite experimental tools under `/casino-lite` route
- [ ] Build visualization microtools (odds charts, distribution graphs)

**Previous Phase 4 UX tasks (baseline):**
- [x] Contrast token refinement: --surface-elevated / --border-primary-darker / --card-shadow (contrast-agent)
- [x] Homepage elevation polish: apply token updates to tool-cards and Lucky Profile (homepage-agent)
- [x] EduCard component created (boilerplate for other projects)
- [ ] Visual smoke tests for homepage + lucky-profile (audit-agent) — ongoing per microtool

Tasks Pending Review
--------------------
- [ ] Homepage placement + grouping for new microtools (homepage-agent must approve before merge)
- [ ] Audit checks per new microtool: readability, spacing, theme integrity (audit-agent must approve before merge)
- [ ] Full microtools visual rollout — requires audit sign-off (contrast-agent → audit-agent)
- [ ] CTA accessibility sweep across all top-level pages — requires audit sign-off

Completed Tasks for This Branch
-------------------------------
- [x] Initial Phase 4 visual audit notes (docs/visual-audit-phase-4.md)
- [x] Export parity and DPR-aware fixes for ticket-beautifier (previous work)
- [x] Recovered Phase 4 visualizer work from stash
- [x] Updated agent briefs for Phase 4 continuation (contrast, homepage, audit agents)
- [x] Established token compliance rules for Sonnet microtool expansion
- [x] Created tools audit document (docs/TOOLS_AUDIT_PHASE4.md)
- [x] Sprint 1: Delivered 3 lightweight RNG microtools
- [x] EduCard component (boilerplate, not used on homepage per user preference)
- [x] Added microtools to EduGrid instead of homepage carousel
- [x] Created 9 education documentation stubs

Cross-Agent Dependencies
------------------------
- homepage-agent depends on contrast-agent for token recipes.
- audit-agent must receive approved token diffs and screenshots from contrast-agent before approving rollout to microtools.

Phase 4 Context & Guardrails
---------------------------
- Phase 4 covers microtool expansion & early casino-lite experiments. This branch is strictly for UX/readability and documentation work only—no new tools, no new game logic.
- Any new tool or casino-lite mechanic must be created in a separate feature branch and accompanied by a Phase-appropriate brief.

Backfill Needed (due to Claude Sonnet 4.5 workflow)
--------------------------------------------------
- [ ] Validate previous Sonnet-generated microtool commits (if any exist before this handoff)
- [ ] Ensure tool scaffolds use correct theme classes (`.card-elevated`, token-based borders)
- [ ] Add missing docs for each microtool:
      • Data sources (hardcoded vs API)
      • Input/output mapping
      • Edge cases and validation rules
- [ ] Reconcile prior Claude Sonnet 4.5 work with current token decisions (docs + tokens + layout) — cross-check required

Future Tasks Backlog (Phase 4 only)
-----------------------------------
**Microtool categories for Sonnet expansion:**
- [ ] Lightweight RNG tools (dice roller, coin flip, card picker)
- [ ] Color/trait generators (lucky colors, personality traits)
- [ ] Casino-lite experimental widgets (slot simulation, probability demos)
- [ ] Visualization microtools (odds charts, distribution graphs)
- [ ] Automatic Lucky Profile "mini analyzer" (trait summary widget)

**Phase 4 UX-safe infrastructure tasks:**
- [ ] Finish pixel-level regression scaffolding for core pages (ticket-beautifier, index, lucky-profile)
- [ ] Add Playwright DPR parity tests into CI (audit-agent)
- [ ] Create microtool template scaffold with token compliance baked in

**Explicitly out-of-scope for this branch (Phase 5+):**
- [ ] Server-side RNG microtools with DB persistence
- [ ] Casino-lite gameplay mechanics with telemetry/analytics
- [ ] Major UI redesigns or feature additions beyond Phase 4 brief

Notes for Automation
--------------------
- Checkboxes above are intended to be machine-readable and automatable in CI flows. Agents should update the tracker when tasks move from "In Progress" to "Done".
