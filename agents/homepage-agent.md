# Homepage Agent — Phase 4 (Landing & Hierarchy + Microtool Expansion)

Summary
-------
The Homepage Agent ensures the site landing area (homepage) maintains an accurate hierarchy that prioritizes core tools and Phase 4 microtools while preserving readability and not expanding feature scope.

**Phase 4 Continuation (Claude Sonnet 4.5 Handoff):**
Homepage must accommodate **continuous microtool additions without overcrowding**. This agent manages placement, randomization, and grouping for all new tools.

Context
-------
Phase 4 will highlight microtools and begin early casino-lite experiments. Homepage placement should make these visible without implying full production status or enabling changes to tool behavior.

Phase 4 Continuation Requirements (for Sonnet)
----------------------------------------------
**New Microtool Integration Rules:**
1. **Carousel-eligible registration:** New microtools should register themselves as "carousel-eligible" if appropriate
2. **Homepage agent manages placement:** This agent decides randomization, grouping, and prominence order
3. **Lucky Profile anchor preserved:** Lucky Profile stays near bottom of homepage (do not move)
4. **Hero area stability:** No redesigns to hero/CTA area — keep existing structure

**Microtool Placement Strategy:**
- **Core tools:** Remain in fixed, prominent positions (top of page)
- **Phase 4 microtools:** Rotate through carousel or secondary slots
- **Casino-lite experiments:** De-emphasized placement with clear "experimental" labels
- **Session-stable randomization:** Shuffle order per session, not per page load

Purpose
-------
- Maintain homepage layout, card hierarchy, carousel behavior, and landing page accessibility.
- Coordinate with the Contrast Agent to adopt token updates and with the Audit Agent for pre/post checks when updates are applied.
- **NEW:** Manage integration and prominence for ALL new microtools added during Phase 4 expansion.

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
- **In-scope:** layout, card styles (e.g., .card-elevated), carousel slot logic, prominence order, and copy/labels where it clarifies experimental status.
- **In-scope (Phase 4 continuation):** Placement and grouping strategy for ALL new microtools (without implementing tool logic).
- **Out-of-scope:** enabling or wiring new tools, changing telemetry or data flows, or shipping new feature logic.

Outputs
-------
- Homepage layout plans and suggested card hierarchy rules for PRs.
- A short deployable checklist tying contrast token names to specific homepage elements (tool-cards, Lucky Profile, hero CTAs).
- A list of pages that need re-audit after changes (hand-off to audit-agent).
- **NEW (Phase 4 continuation):** Microtool placement registry showing carousel-eligible status and homepage position for each new tool.

Phase 4 Continuation Checklist (for Sonnet-generated microtools)
----------------------------------------------------------------
For EACH new microtool added to homepage:
- [ ] Tool registered in homepage agent's microtool registry
- [ ] Carousel-eligible flag set (true/false)
- [ ] Placement priority assigned (core/secondary/experimental)
- [ ] Labels include "experimental" tag if applicable
- [ ] Does not disrupt Lucky Profile anchor position
- [ ] Does not modify hero area layout
- [ ] Session randomization works correctly (if carousel-eligible)
- [ ] **EduCard present** under microtool section with meaningful educational link
