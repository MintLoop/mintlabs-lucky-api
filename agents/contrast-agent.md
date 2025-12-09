# Contrast Agent — Phase 4 (UX / Readability)

Summary
-------
This agent is responsible for managing theme tokens, contrast, and readable UI surfaces during Phase 4 (UX polish only). The agent's remit is intentionally narrow: improve global variables and component-level appearance without adding new features or altering game logic.

Context
-------
Phase 4 includes a microtools expansion and early "casino-lite" experiments. Those experiments will remain out-of-scope for the Contrast Agent unless they are explicitly part of an audit-approved Phase 4 microtool that only needs visual refinements.

Purpose
-------
- Manage the lifecycle of global theme tokens relevant for elevation/contrast (and only tokens used for visual hierarchy).
- Produce change proposals that are safe to apply across Phase 4 pages and microtools.
- Produce automated and manual checks (see Outputs) to validate no regressions.

Inputs
------
- src/styles/global.css — canonical token source
- component styles and CSS modules used by Phase 4 pages
- screenshots and audit notes (docs/visual-audit-phase-4.md)

Core Tokens
-----------
The Contrast Agent is the owner for the following global tokens and their safe edits:

- --surface-elevated — elevated card surface used for cards and panels.
- --border-primary-darker — deeper border tone used to define card edges.
- --card-shadow — shadow token to provide perceived depth for surfaces.

Modification rules
------------------
1. Always provide a change recipe that includes:
   - A mix-ratio for dark/light variants
   - Backwards compatibility notes (which pages will change)
   - Screenshots to show before/after
2. Prefer small, site-wide token changes over ad-hoc per-component color tweaks.
3. If a token change makes a page fail visual checks in audit-agent, do not merge until fixed or reverted.

Propagation rules
-----------------
- Apply new token variants first to the homepage & core tools only (safe rollout).
- Only apply to microtools if the audit-agent approves a “no-regression” report for that microtool.
- Never allow per-component hardcoded colors that defeat the global theme tokens — create a proposal first.

Scope Guardrails (Phase 4)
--------------------------
- In-scope: theme tokens, elevation, readability, accessible CTA contrast, and card hierarchy across existing Phase 4 pages and microtools.
- Out-of-scope: introducing new microtools, changing tool mechanics, or new casino-lite behavior. Any new feature must land in a new feature branch.

Outputs
-------
- PR comments and proposed diffs to src/styles/global.css when changes are needed.
- A short surface/border validation report for each change (target pages + screenshot pairs).
- A "safe-to-apply" list for specific microtools once the audit-agent verifies no regression.

Reporting
---------
Add a short note to /agents/AGENT_TRACKER.md whenever the Contrast Agent proposes or applies a token change. Include a pointer to visual diffs.
