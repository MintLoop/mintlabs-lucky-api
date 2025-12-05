# Phase 5 — SEO Farming & Content Expansion

**Goal:** Dominate long-tail lottery searches with high-quality, truth-based content.

**Owner:** TBD  
**Branch:** `phase-5-seo`  
**Status:** Blocked (wait for Phase 4)  
**Dependencies:** Phase 4 (Feature Wave 1)

---

## 5.1 Programmatic SEO Pages

### Deliverables

Autogenerate high-quality, structured pages for search traffic.

### A. Lucky-by-Date

```
/lucky-numbers/today
/lucky-numbers/<month>/<day>
```

- Generate "lucky numbers" for any date
- Use deterministic seed (date hash) for consistency
- Include numerology-style explanation text
- Clear disclaimer: "For entertainment only"

### B. Lucky-by-Birthday

```
/lucky-numbers/birthday/<yyyy-mm-dd>
```

- Personalized numbers based on birth date
- Numerology explanations (life path, etc.)
- Share functionality built-in
- Disclaimer: "For fun, not prediction"

### C. Zodiac Cluster

```
/zodiac/aries-lucky-numbers
/zodiac/cancer-lucky-days
/zodiac/[sign]-[content-type]
```

- All 12 signs
- Lucky numbers, lucky days, lucky colors
- Soft spiritual content with disclaimers

### D. Hot/Cold Number Cluster

```
/powerball/hot-numbers
/megamillions/cold-numbers
/[game]/[hot|cold]-numbers
```

- Based on historical frequency (requires Phase 8 data)
- Charts showing frequency over time
- Clear math explanation

### Acceptance Criteria

- [ ] Each generated page has > 600 words of unique content
- [ ] Uses schema.org markup (`FAQPage`, `WebPage`, `BreadcrumbList`)
- [ ] Internal linking to main generator and tools
- [ ] NO claims of prediction or guaranteed outcomes
- [ ] Canonical URLs set correctly
- [ ] Sitemap includes all generated pages
- [ ] OG images auto-generated per page type

### Files to Create

**Frontend:**
- `src/pages/lucky-numbers/today.astro`
- `src/pages/lucky-numbers/[month]/[day].astro`
- `src/pages/lucky-numbers/birthday/[date].astro`
- `src/pages/zodiac/[sign]-lucky-numbers.astro`
- `src/pages/[game]/hot-numbers.astro`
- `src/pages/[game]/cold-numbers.astro`
- `src/data/zodiac.json` — sign metadata
- `src/scripts/numerology.ts` — calculation logic
- `src/components/ZodiacCard.astro`
- `src/components/FrequencyChart.astro`

---

## 5.2 Structured Data (Schema.org)

### Deliverables

Add JSON-LD schema markup to all pages.

| Page Type | Schema Types |
|-----------|--------------|
| Home | `WebSite`, `Organization` |
| Game pages | `WebPage`, `FAQPage`, `BreadcrumbList` |
| Strategy pages | `Article`, `FAQPage` |
| Tool pages | `WebApplication`, `SoftwareApplication` |
| Zodiac pages | `WebPage`, `FAQPage` |

### Acceptance Criteria

- [ ] All pages pass Google Rich Results Test
- [ ] Breadcrumbs appear in search results
- [ ] FAQ sections eligible for rich snippets
- [ ] No schema validation errors

### Files to Create/Modify

**Frontend:**
- `src/components/SchemaOrg.astro` — reusable schema component
- `src/scripts/schema.ts` — schema generation helpers
- Modify all page templates to include schema

---

## 5.3 Content Hubs (Evergreen Guides)

### Deliverables

Create 3 comprehensive, linkable guides:

1. **Powerball Odds Explained (Simple Math)**
   - Visual breakdown of odds
   - Comparison to everyday probabilities
   - Calculator integration

2. **Mega Millions Strategy: What is Actually True?**
   - Myth-busting format
   - Data-driven conclusions
   - Links to tools

3. **Why Quick Picks Win More Often (Statistically)**
   - Market share explanation
   - Selection bias discussion
   - Fair representation of the math

### Acceptance Criteria

- [ ] Each guide > 2,000 words
- [ ] Multiple internal links to tools and game pages
- [ ] Shareable pull quotes / stats
- [ ] Infographics or charts
- [ ] Positioned as backlink magnets
- [ ] Author attribution for E-E-A-T

### Files to Create

**Frontend:**
- `src/pages/guides/powerball-odds-explained.astro`
- `src/pages/guides/mega-millions-strategy.astro`
- `src/pages/guides/quick-picks-statistics.astro`
- `src/components/GuideLayout.astro`
- `src/components/Infographic.astro`

---

## 5.4 Funnel Into MintLoop Ecosystem

### Deliverables

Add soft CTAs at article footers linking to MintLoop properties.

### CTA Examples

> Want to improve your finances beyond the lottery?  
> Check out MintScale's free ROI calculators & budgeting tools.

> Save your numbers, explore numerology tools, or see our full suite at MintLoop.dev.

### Acceptance Criteria

- [ ] CTAs are non-intrusive (footer placement)
- [ ] No hard sell language
- [ ] Links open in new tab
- [ ] Tracking params for attribution (`?ref=lucky`)
- [ ] A/B testable via component props

### Files to Create/Modify

**Frontend:**
- `src/components/EcosystemCTA.astro` — reusable CTA block
- Modify `InfoLayout.astro` to include optional CTA slot

---

## Agent Assignment

| Task | Agent | Scope |
|------|-------|-------|
| 5.1 Programmatic Pages | Frontend Agent | dynamic routes, content generation |
| 5.2 Schema Markup | Frontend Agent | JSON-LD components |
| 5.3 Content Hubs | Docs Agent + Frontend | writing, components |
| 5.4 Ecosystem CTAs | Frontend Agent | components, tracking |

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Sitemap updated with all new pages
- [ ] Google Search Console submitted
- [ ] Rich Results Test passes for sample pages
- [ ] `npm run test:e2e` passes
- [ ] PR reviewed and merged to `main`
- [ ] `docs/AGENT_TRACKER.md` updated
