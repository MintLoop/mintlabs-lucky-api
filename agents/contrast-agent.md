# Contrast Agent — Phase 4 (UX / Readability + Microtool Expansion)

Summary
-------
This agent is responsible for managing theme tokens, contrast, and readable UI surfaces during Phase 4 (UX polish only). The agent's remit is intentionally narrow: improve global variables and component-level appearance without adding new features or altering game logic.

**Phase 4 Continuation (Claude Sonnet 4.5 Handoff):**
This agent now ensures **ALL new microtools and casino-lite tools** adhere to global theme tokens and maintain readability. Every new tool must follow token-based styling and contrast requirements before approval.

Context
-------
Phase 4 includes a microtools expansion and early "casino-lite" experiments. Those experiments will remain out-of-scope for the Contrast Agent unless they are explicitly part of an audit-approved Phase 4 microtool that only needs visual refinements.

Phase 4 Continuation Context
----------------------------
**Global Token Rules (Sonnet MUST follow):**
- **Surface tokens:** Use `--surface`, `--surface-elevated`, `--surface-hover` for ALL new card/panel backgrounds
- **Border tokens:** Use `--border-primary`, `--border-primary-darker` for ALL borders (no hardcoded border colors)
- **Shadow tokens:** Use `--card-shadow` for card depth (no custom box-shadow values)
- **Contrast function:** Use `getContrastColor()` for ANY dynamically colored element (RNG outputs, birthstone colors, etc.)

**"Do Not Break" Rules for Sonnet:**
1. **No inline hardcoded colors** in new microtools (must use CSS custom properties)
2. **No new gradients** unless tested against BOTH dark/light themes with audit approval
3. **No unique component styles** without tokens — create proposal for new token if needed
4. **All new tools must use `<ToolCard>` wrapper** or equivalent token-based container

Purpose
-------
- Manage the lifecycle of global theme tokens relevant for elevation/contrast (and only tokens used for visual hierarchy).
- Produce change proposals that are safe to apply across Phase 4 pages and microtools.
- Produce automated and manual checks (see Outputs) to validate no regressions.
- **NEW:** Review and approve token compliance for ALL new microtools before merge.

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
- **In-scope:** theme tokens, elevation, readability, accessible CTA contrast, and card hierarchy across existing Phase 4 pages and microtools.
- **In-scope (Phase 4 continuation):** Review ALL new microtools for token compliance before merge approval.
- **Out-of-scope:** introducing new microtools (agent only reviews them), changing tool mechanics, or new casino-lite behavior. Any new feature must land in a new feature branch.

Outputs
-------
- PR comments and proposed diffs to src/styles/global.css when changes are needed.
- A short surface/border validation report for each change (target pages + screenshot pairs).
- A "safe-to-apply" list for specific microtools once the audit-agent verifies no regression.
- **NEW (Phase 4 continuation):** Token compliance checklist for each new microtool (pass/fail with remediation notes).

Reporting
---------
Add a short note to /agents/AGENT_TRACKER.md whenever the Contrast Agent proposes or applies a token change. Include a pointer to visual diffs.

Phase 4 Continuation Checklist (for Sonnet-generated microtools)
----------------------------------------------------------------
For EACH new microtool, the Contrast Agent must verify:
- [ ] No hardcoded colors (inline styles or component-scoped CSS)
- [ ] Uses `--surface`, `--surface-elevated`, or `--surface-hover` for backgrounds
- [ ] Uses `--border-primary` or `--border-primary-darker` for borders
- [ ] Uses `--card-shadow` for depth effects
- [ ] Dynamic colors use `getContrastColor()` utility
- [ ] Tested in BOTH light and dark themes
- [ ] No custom gradients without audit approval
- [ ] **EduCard component** uses proper token contrast and is readable in all themes
