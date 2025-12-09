# PR: Phase 4 — UI Contrast & Readability (feature/ui-contrast-phase-4)

Short summary
-------------
This PR contains Phase 4 UX/readability-only updates: global theme token refinements, elevation/card utilities, CTA foreground rules, small responsive tweaks, and recovered Phase‑4 visualizer changes that were previously stashed. There are no new microtools or gameplay changes in this branch — scope is strictly UX polish.

Files changed (high-level)
- src/styles/global.css — new tokens and light/dark overrides, .card-elevated utility
- src/pages/index.astro — homepage: card elevation applied to Lucky Profile feature and tool-card styles (opt-in)
- Playwright tests updated & visual regression scaffolding staged in `tests/` (pixelmatch not yet wired to CI)
- docs/ and agents/ — agent briefs updated and AGENT_TRACKER updated with handoff summary

Handoff checklist for reviewers
-----------------------------
- [ ] Pull branch locally: git fetch && git checkout feature/ui-contrast-phase-4
- [ ] Build site: cd mintlabs-lucky-frontend && npm ci && npm run build
- [ ] Run Playwright DPR parity tests (ticket-beautifier): npx playwright test tests/ticket-beautifier.spec.ts --project=chromium (run headful for DPR checks)
- [ ] Manual visual sweep (light/dark, desktop/mobile): /, /tools/ticket-beautifier, /lucky-profile
- [ ] Run unit/backend tests: pytest (backend); npx playwright test (frontend) if CI is available
- [ ] Confirm no features have been added — branch scope enforcement: UX/readability only

If everything looks good, mark the PR ready and assign Phase 4 owner(s) for merge.

Notes
-----
- Pixel-diff automation is staged in package.json but CI wiring is intentionally deferred to a follow-up (Phase 4 UX: visual CI task) because it requires large golden images and baseline tuning.
- If regressions are found during QA, file small Phase 4 UX tickets (label: phase-4-ux) and assign to `contrast-agent` or `homepage-agent` as appropriate.
