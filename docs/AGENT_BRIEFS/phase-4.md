# Phase 4 — Feature Additions (Wave 1)

**Goal:** Turn Lucky into a useful, trusted lottery companion with real math and great UX.

**Owner:** TBD  
**Branch:** `phase-4-features`  
**Status:** Ready  
**Dependencies:** Phase 3 (Security Hardening) ✅

---

## 4.1 Game-Specific Pages

### Deliverables

Create dedicated pages for each supported game:

- `/games/powerball`
- `/games/megamillions`
- `/games/ca-daily-3`

*(Architecture should support easy addition of all North American games later)*

### Each Page Includes

- Game summary (cost, draw schedule, rules)
- Odds table (leverage existing `lottery-odds.astro` patterns)
- Mini-generator (pre-filled game config, single-click generate)
- "Balanced Pick" vs "Random Pick" explanation
- FAQ block (SEO booster)
- Internal links to math pages + strategy cluster

### Acceptance Criteria

- [ ] Lighthouse SEO score > 90
- [ ] Fully mobile responsive (test 320px–1440px)
- [ ] Supports shareable links with query params (`?mode=balanced`)
- [ ] No inline JS violations under CSP
- [ ] Uses common `InfoLayout.astro` component
- [ ] Game data fetched from `/games` API endpoint
- [ ] Unit tests for any new components

### Files to Create/Modify

**Frontend (`mintlabs-lucky-frontend/`):**
- `src/pages/games/[game].astro` — dynamic game page
- `src/components/GameSummary.astro` — game info card
- `src/components/MiniGenerator.astro` — embedded single-game generator
- `src/components/OddsTable.astro` — reusable odds display
- `src/components/GameFAQ.astro` — FAQ accordion

---

## 4.2 Lottery Lab v1 (Mini-Tools Cluster)

### Deliverables

Build interactive calculator tools:

| Tool | Input | Output |
|------|-------|--------|
| **Odds Calculator** | game, picks, pool size | exact probability |
| **Jackpot EV Calculator** | jackpot size, state | expected value after taxes |
| **Bankroll Planner** | weekly spend | annual burn, expected loss |
| **Repeat Number Analyzer** | number set | frequency (Phase 5 when history added) |

### Acceptance Criteria

- [ ] Output is mathematically correct (verify against known formulas)
- [ ] Tools share uniform UI style (consistent card layout)
- [ ] Built with Astro islands or pure TypeScript
- [ ] Can be embedded in blog posts and `/games` pages
- [ ] Mobile-friendly inputs (number pads, sliders)
- [ ] Results include "How we calculated this" expandable section

### Files to Create

**Frontend:**
- `src/pages/tools/odds-calculator.astro`
- `src/pages/tools/jackpot-ev.astro`
- `src/pages/tools/bankroll-planner.astro`
- `src/scripts/calculators.ts` — shared calculation logic
- `src/components/CalculatorCard.astro` — reusable tool wrapper

### Monetization Opportunity

Place financial literacy affiliate widgets below tools:
- Budgeting app trials
- Links to MintScale calculators (ROI, tax, conversion)

**Ethical angle:** Teaching people *why the odds are low*, not misleading them.

---

## 4.3 Saved Numbers (LocalStorage)

### Deliverables

- Save favorite picks to browser storage
- Tag by game
- Show last 10 generations
- Export to clipboard as shareable text

### Acceptance Criteria

- [ ] No backend needed (pure localStorage)
- [ ] LocalStorage API tested (mock in Playwright)
- [ ] UI notification ("Saved!" toast)
- [ ] Clear data option in UI
- [ ] Graceful degradation if localStorage unavailable
- [ ] Max 50 saved picks (prevent storage bloat)

### Files to Create/Modify

**Frontend:**
- `src/scripts/storage.ts` — localStorage wrapper
- `src/components/SavedPicks.astro` — saved picks display
- `src/components/SaveButton.astro` — save action button
- Modify `GeneratorForm.astro` to integrate save functionality

---

## 4.4 Shareable URLs

### Deliverables

Generate shareable links for any pick:

```
/picks/powerball?nums=4-19-33-45-56&bonus=10
```

### Acceptance Criteria

- [ ] Clicking shared link reconstructs UI state
- [ ] Auto-generated after each pick (copy button)
- [ ] Works for all games
- [ ] No PII ever included
- [ ] URL-safe encoding for all parameters
- [ ] Validates numbers against game rules on load

### Files to Create/Modify

**Frontend:**
- `src/pages/picks/[game].astro` — shareable pick page
- `src/scripts/sharing.ts` — URL encode/decode logic
- Modify `GeneratorForm.astro` to show share button

---

## 4.5 Strategy Pages Expansion

### Deliverables

Expand existing content cluster:

**Existing pages to enhance:**
- `/lottery-math`
- `/lottery-odds`

**New pages to create:**
- `/strategy/balanced-vs-random`
- `/strategy/hot-cold-numbers`
- `/strategy/most-common-powerball-numbers`
- `/strategy/is-quick-pick-better`

### Acceptance Criteria

- [ ] Long-form content > 1,000 words per page
- [ ] Charts or tables generated dynamically (Astro components)
- [ ] Clear disclaimers (ethical safeguard) at top and bottom
- [ ] Internal links to tools + game pages
- [ ] Lighthouse SEO score > 90
- [ ] Schema.org `Article` markup

### Files to Create

**Frontend:**
- `src/pages/strategy/balanced-vs-random.astro`
- `src/pages/strategy/hot-cold-numbers.astro`
- `src/pages/strategy/most-common-powerball-numbers.astro`
- `src/pages/strategy/is-quick-pick-better.astro`
- `src/components/StrategyDisclaimer.astro` — reusable disclaimer block
- `src/components/DataChart.astro` — simple chart component

---

## Agent Assignment

| Task | Agent | Scope |
|------|-------|-------|
| 4.1 Game Pages | Frontend Agent | `mintlabs-lucky-frontend/src/pages/games/`, components |
| 4.2 Lottery Lab | Frontend Agent | `mintlabs-lucky-frontend/src/pages/tools/`, calculators |
| 4.3 Saved Numbers | Frontend Agent | localStorage, components |
| 4.4 Shareable URLs | Frontend Agent | routing, URL handling |
| 4.5 Strategy Pages | Docs/Frontend Agent | content, components |

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] `npm run test:e2e` passes
- [ ] Lighthouse scores > 90 (Performance, SEO, Accessibility)
- [ ] No console errors in browser
- [ ] Mobile viewport tested
- [ ] PR reviewed and merged to `main`
- [ ] `docs/AGENT_TRACKER.md` updated
