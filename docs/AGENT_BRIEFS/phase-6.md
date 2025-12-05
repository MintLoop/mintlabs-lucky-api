# Phase 6 — Performance, QA & Hardened Production Pass

**Goal:** Polish for speed, correctness, and reliability.

**Owner:** TBD  
**Branch:** `phase-6-performance`  
**Status:** Blocked (wait for Phase 5)  
**Dependencies:** Phase 5 (SEO Farming)

---

## 6.1 Lighthouse Optimization (Target ≥ 95)

### Deliverables

Achieve Lighthouse scores ≥ 95 across all categories.

| Category | Target | Current |
|----------|--------|---------|
| Performance | ≥ 95 | TBD |
| Accessibility | ≥ 95 | TBD |
| Best Practices | ≥ 95 | TBD |
| SEO | ≥ 95 | TBD |

### Optimization Tasks

- [ ] Eliminate unused JavaScript (tree shaking audit)
- [ ] Add Astro's `<Image>` component for all images
- [ ] Implement image lazy loading
- [ ] Prefetch critical routes (`<link rel="prefetch">`)
- [ ] Minimize CSS (purge unused styles)
- [ ] Add resource hints (`preconnect`, `dns-prefetch`)
- [ ] Optimize web fonts (subset, `font-display: swap`)
- [ ] Enable Brotli compression (Vercel config)

### Acceptance Criteria

- [ ] All pages score ≥ 95 on mobile Lighthouse
- [ ] Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] No render-blocking resources
- [ ] Total bundle size < 100KB (excluding images)

### Files to Modify

**Frontend:**
- `astro.config.mjs` — optimization settings
- `src/layouts/Layout.astro` — resource hints
- All image references → `<Image>` component
- `src/styles/global.css` — CSS audit

---

## 6.2 Backend Optimization

### Deliverables

Optimize API for production traffic patterns.

### Tasks

- [ ] **Cache `/games` response** — Already cached 60s, verify effectiveness
- [ ] **Add `/stats` caching** — 5-minute cache for analytics
- [ ] **Optimize DB connection pooling** — Tune `DB_MIN_CONNECTIONS`, `DB_MAX_CONNECTIONS`
- [ ] **Benchmark RNG performance** — Ensure < 50ms p99 latency
- [ ] **Add optional worker queue** — For heavy operations (future historical analysis)

### Acceptance Criteria

- [ ] `/games` cache hit rate > 95%
- [ ] `/generate` p99 latency < 100ms
- [ ] Connection pool never exhausted under normal load
- [ ] Memory usage stable over 24h test

### Files to Modify

**Backend (`mintlabs-lucky-api/`):**
- `app/main.py` — caching logic review
- `app/config.py` — tunable pool settings
- `app/db.py` — pool monitoring hooks
- New: `app/cache.py` — centralized cache utilities (optional)

---

## 6.3 Load Testing

### Deliverables

Validate system under realistic and peak load.

### Test Scenarios

| Scenario | Target RPS | Duration | Expected |
|----------|------------|----------|----------|
| Baseline | 50 | 5 min | 0% errors |
| Normal | 100 | 10 min | 0% errors |
| Peak | 250 | 5 min | < 1% errors |
| Spike | 500 | 1 min | Graceful degradation |

### Tools

- **k6** (preferred) or **Locust**
- Run from external location (not localhost)

### Acceptance Criteria

- [ ] 0% error rate at 100 RPS sustained
- [ ] < 1% error rate at 250 RPS
- [ ] p99 latency < 500ms at 100 RPS
- [ ] Rate limiter engages correctly under spike
- [ ] No memory leaks observed

### Files to Create

**Root:**
- `loadtest/k6-baseline.js` — k6 script for baseline
- `loadtest/k6-peak.js` — k6 script for peak load
- `loadtest/README.md` — instructions

---

## 6.4 Cross-Browser QA

### Deliverables

Verify functionality across browsers and devices.

### Browser Matrix

| Browser | Versions | Priority |
|---------|----------|----------|
| Chrome | Latest, Latest-1 | P0 |
| Safari | Latest (macOS, iOS) | P0 |
| Firefox | Latest | P1 |
| Edge | Latest | P2 |

### Device Matrix

| Device | Viewport | Priority |
|--------|----------|----------|
| iPhone SE | 375px | P0 |
| iPhone 14 | 390px | P0 |
| iPad | 768px | P1 |
| Desktop | 1280px | P0 |
| Wide Desktop | 1920px | P1 |

### Test Checklist

- [ ] Generator form works on all browsers
- [ ] Number display renders correctly
- [ ] Touch interactions work on mobile
- [ ] No horizontal scroll on any viewport
- [ ] Modals/toasts work correctly
- [ ] CSP doesn't break any functionality
- [ ] LocalStorage works (saved numbers)

### Acceptance Criteria

- [ ] All P0 browser/device combinations pass
- [ ] No critical bugs in P1 combinations
- [ ] Documented known issues for P2

### Files to Create/Modify

**Frontend:**
- `tests/cross-browser.spec.ts` — Playwright cross-browser tests
- `playwright.config.ts` — multi-browser config

---

## Agent Assignment

| Task | Agent | Scope |
|------|-------|-------|
| 6.1 Lighthouse | Frontend Agent | optimization, assets |
| 6.2 Backend Opt | Backend Agent | caching, pooling |
| 6.3 Load Testing | Infra Agent | scripts, execution |
| 6.4 Cross-Browser | Frontend Agent | Playwright, manual QA |

---

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Lighthouse CI added to GitHub Actions
- [ ] Load test results documented
- [ ] Cross-browser test report generated
- [ ] `ruff check .` && `pytest` pass
- [ ] `npm run test:e2e` passes
- [ ] PR reviewed and merged to `main`
- [ ] `docs/AGENT_TRACKER.md` updated
