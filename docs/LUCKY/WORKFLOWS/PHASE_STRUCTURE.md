# Phase Structure — Lucky Numbers Development

> **Version:** 1.0  
> **Last Updated:** 2025-12-11  
> **Branch:** `opus-architecture-reset`

---

## 1. Phase Overview

| Phase | Name | Status | Focus |
|-------|------|--------|-------|
| 1 | Automation Gatekeeper | ✅ Complete | Rate limiting, error handling |
| 2 | Reliability Ops | ✅ Complete | Health checks, validation |
| 3 | Security Hardening | ✅ Complete | Headers, admin security |
| 4 | Feature Wave 1 | ✅ Complete | 44 tools, themes, profiles |
| **4.5** | **UX Refactor + Mobile-First** | 🔄 **In Progress** | Mobile utility pattern |
| 5 | SEO Farming | ⏳ Blocked | Content hubs, schema |
| 6 | Performance QA | ⏳ Blocked | Lighthouse, caching |
| 7 | Monetization | ⏳ Blocked | Ads, affiliates |
| 8 | Historical Data | ⏳ Blocked | Draw history, analysis |
| 9 | Ecosystem Integration | ⏳ Blocked | MintLabs cross-promo |
| 10 | PWA / Mobile | ⏳ Blocked | Installable app |

---

## 2. Phase 4.5 Detail

### 2.1 Scope

Phase 4.5 is a **UX architecture reset** that:
- Converts the homepage to mobile-first utility pattern
- Introduces bottom navigation for mobile
- Creates single source of truth for tool metadata
- Consolidates demo strategy (`/demo-v3/`)
- Establishes canonical documentation structure

### 2.2 Deliverables

**Documentation:**
- [x] `PHASE_4_5_REPO_INVENTORY.md` — Repo inventory
- [x] `HOMEPAGE_ARCHITECTURE_DECISION.md` — Decisions
- [x] `HOMEPAGE_ARCHITECTURE_PHASE_4.md` — Homepage spec
- [x] `CONTEXTUAL_DISCOVERY_MODEL.md` — Tool tiering
- [x] `HUB_ARCHITECTURE.md` — Tab routing
- [x] `mobile-ux.md` — Mobile UX spec
- [x] `DOCUMENTATION_AUDIT_PRUNE.md` — Doc cleanup
- [x] `PHASE_STRUCTURE.md` — This document

**Code:**
- [ ] `src/config/toolIndex.ts` — Tool metadata
- [ ] `src/components/mobile/BottomNav.astro` — Navigation
- [ ] `src/components/NumberRow.astro` — Number display
- [ ] `src/styles/tokens.css` updates — Mobile tokens
- [ ] `src/pages/demo-v3/index.astro` — Mobile-first home
- [ ] `tests/demo-v3/mobile-ux.spec.ts` — Playwright tests

### 2.3 Acceptance Criteria

| Criterion | Status |
|-----------|--------|
| CTA + numbers visible above fold on 375×667 | ⏳ |
| Bottom nav renders with 5 tabs | ⏳ |
| Tab switching works | ⏳ |
| Tier S tools visually prominent | ⏳ |
| Bonus ball visually distinct | ⏳ |
| All tap targets ≥ 44px | ⏳ |
| Playwright tests pass | ⏳ |
| All 8 docs complete | ✅ |

---

## 3. Phase Dependencies

```
Phase 1-3 (Infrastructure) ──┐
                             ├──> Phase 4 (Features) ──> Phase 4.5 (UX)
                             │                              │
                             │                              v
                             │                          Phase 5 (SEO)
                             │                              │
                             │                              v
                             │                          Phase 6 (Performance)
                             │                              │
                             │                              v
                             │                          Phase 7 (Monetization)
                             │                              │
                             │                              v
                             │                          Phase 8 (Historical)
                             │                              │
                             │                              v
                             │                          Phase 9 (Ecosystem)
                             │                              │
                             │                              v
                             └─────────────────────────> Phase 10 (PWA)
```

**Critical path:** Phase 4.5 must complete before Phase 5 (SEO) because:
- Tool discovery model defines URL structure
- Mobile-first layout affects Core Web Vitals
- Hub architecture affects content organization

---

## 4. Phase Briefs Location

All phase briefs are in `/docs/AGENT_BRIEFS/`:

| Brief | Phase | Last Updated |
|-------|-------|--------------|
| `phase-1.md` | Automation | 2025-12-04 |
| `phase-2.md` | Reliability | 2025-12-04 |
| `phase-3.md` | Security | 2025-12-05 |
| `phase-4.md` | Features | 2025-12-10 |
| `phase-5.md` | SEO | TBD |
| `phase-6.md` | Performance | TBD |
| `phase-7.md` | Monetization | TBD |
| `phase-8.md` | Historical | TBD |
| `phase-9.md` | Ecosystem | TBD |
| `phase-10.md` | PWA | TBD |

**Note:** Phase 4.5 does not have its own brief file. It is documented in `/docs/LUCKY/WORKFLOWS/` as an architecture reset within Phase 4.

---

## 5. Phase 4.5 → Phase 5 Transition Criteria

Phase 4.5 is complete when:

1. **All documentation delivered** (8/8 files)
2. **Demo-v3 homepage functional**
   - Mobile-first layout renders
   - Bottom nav works
   - Numbers generate correctly
3. **Tests pass**
   - Playwright mobile-ux.spec.ts passes
   - No regressions in existing tests
4. **QA approved**
   - Manual testing on iPhone SE viewport
   - Visual review of bonus ball distinction
   - Tab navigation verified

Then Phase 5 (SEO Farming) can begin with:
- Stable URL structure
- Defined tool categories
- Mobile-optimized Core Web Vitals baseline

---

## 6. Branch Strategy

| Phase | Branch Pattern |
|-------|----------------|
| 4.5 | `opus-architecture-reset` |
| Features | `feature/<name>` |
| Phases | `phase-<n>-<name>` |
| Fixes | `fix/<issue>` |
| Docs | `docs/<topic>` |

**Merge target:** All Phase 4.5 work merges to `main` after QA approval.

---

## 7. Related Documents

- [AGENT_TRACKER.md](/docs/AGENT_TRACKER.md) — Active work tracking
- [DECISION_WORKFLOW.md](/docs/DECISION_WORKFLOW.md) — Decision process
- [AGENTS.md](/AGENTS.md) — Agent roles and rules

---

*This document is the canonical phase overview for Lucky Numbers development.*
