# Homepage Agent — Phase 4 (Landing & Hierarchy)

Summary
-------
The Homepage Agent ensures the site landing area (homepage) maintains an accurate hierarchy that prioritizes core tools and Phase 4 microtools while preserving readability and not expanding feature scope.

Context
-------
Phase 4 will highlight microtools and begin early casino-lite experiments. Homepage placement should make these visible without implying full production status or enabling changes to tool behavior.

Purpose
-------
- Maintain homepage layout, card hierarchy, carousel behavior, and landing page accessibility.
- Coordinate with the Contrast Agent to adopt token updates and with the Audit Agent for pre/post checks when updates are applied.

Inputs
------
- src/pages/index.astro — canonical landing markup
- carousel configuration and any client-side session picks
- card components and documented Phase 4 tool list

Rules & Responsibilities
-----------------------
- Highlight core tools first, Phase 4 microtools second, casino-lite experiments must be de-emphasized and clearly labeled as experiments.
- Maintain stable ordering for core tools to preserve tracking & analytics; only session-stable randomization may be used for secondary slots.
- Implement visual changes (e.g., elevation tokens, padding, CTA contrast) only after Contrast Agent provides safe tokens and Audit Agent confirms no regression.
- Avoid adding or enabling new microtools or casino-lite features on the homepage — these must be separate PRs in their own feature branches.

Scope Guardrails (Phase 4)
--------------------------
- In-scope: layout, card styles (e.g., .card-elevated), carousel slot logic, prominence order, and copy/labels where it clarifies experimental status.
- Out-of-scope: enabling or wiring new tools, changing telemetry or data flows, or shipping new feature logic.

Outputs
-------
- Homepage layout plans and suggested card hierarchy rules for PRs.
- A short deployable checklist tying contrast token names to specific homepage elements (tool-cards, Lucky Profile, hero CTAs).
- A list of pages that need re-audit after changes (hand-off to audit-agent).
