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
- [x] Random Color Generator (HEX/RGB/HSL with psychology)
- [ ] Lucky Colors by Zodiac (DEFERRED — overlaps with Lucky Profile in Phase 4.3)

**Sprint 3 Planned (Number Metrics & Visualizers - Tier A #21-25):**
- [ ] Number Popularity Scorecard (hot/cold weighted index)
- [ ] Consecutive Number Checker (sequence detection)
- [ ] Even/Odd Ratio Visualizer (balance visualization)
- [ ] High/Low Ratio Analyzer (distribution analysis)
- [ ] Number Spread Visualizer (dispersion chart)

**Sprint 4 Planned (Educational & Analysis - Tier A #26-28):**
- [ ] Beginner's Lottery Guide (myths vs facts slideshow)
- [ ] "Is My Ticket Balanced?" Analyzer (heuristic checker)
- [ ] Birthday Risk Checker (split probability calculator)

**Phase 4.2 Revised Scope (Option 1 - Consolidation):**
- [x] Audit phase-4.md tools vs built tools (35 tools currently live)
- [x] Consolidate duplicate tools (removed winning-chance.astro wrapper)
- [x] Mark Tier B/C (25 tools) as Phase 5 backlog
- [x] Update phase-4.md with accurate completion status (Tier S: 10/10, Tier A: 14/18)
- [ ] Complete Sprint 3: Build remaining 5 Tier A tools (#21-25)
- [ ] Complete Sprint 4: Build final 3 Tier A tools (#26-28)
- [ ] After Tier A: Transition to Phase 4.3 (Lucky Profile + Themed RNG)

**Token Compliance:**
- [x] Ensure ALL new tools use global tokens (no hardcoded colors) — verified all tools
- [x] Register new microtools in EduGrid (not homepage carousel per user preference)

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
**Phase 4 Completion Roadmap (Updated Dec 2025):**
- [x] Phase 4.1: Core Tools & UX Foundation (14 primary tools) ✅
- [x] Phase 4.2 Wave 1-2: Tier S Complete (10/10) + Tier A Foundation (14/18) ✅
- [ ] Phase 4.2 Sprint 3-4: Complete Tier A (4 tools remaining) 🎯
- [ ] Phase 4.3: Lucky Profile Generator + Themed RNG Modes
- [ ] Phase 4.4: Casino-Lite Suite + MintyCatnipCoin
- [ ] Phase 4.5: Discoverability + Navigation System

**Tier B/C Tools (25 tools) → Deferred to Phase 5**

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
