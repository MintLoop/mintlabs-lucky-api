# Homepage Architecture Decision Memo

> **Phase:** 4.5 — UX Refactor + IA Reset + Mobile-First Conversion  
> **Branch:** `opus-architecture-reset`  
> **Date:** 2025-12-11  
> **Author:** Opus 4.5 (Lead Product Architect)

---

## Executive Summary

This document records the two mandatory architecture decisions for Phase 4.5 and establishes the canonical direction for Lucky Numbers mobile-first utility pattern implementation.

---

## DECISION 1: Demo Strategy

### Choice: **B) Fork `/demo-v3` and deprecate the old demo**

### Justification

The existing `/demo` directory contains a single file (`home-v2-polish.astro`) that represents a valid but incomplete v2 design system implementation. However:

1. **Phase 4.5 introduces breaking changes** — Mobile-first layout, bottom navigation, and utility-app patterns are incompatible with the desktop-first structure of `home-v2-polish.astro`.

2. **Clean separation prevents regressions** — A new `/demo-v3` directory allows aggressive experimentation without risking the current demo or production.

3. **Migration path clarity** — Once `/demo-v3` is validated, it can cleanly replace production `index.astro` without intermediate states.

4. **Testing isolation** — Playwright tests for `/demo-v3` can be independent, avoiding false failures in existing demo tests.

### Rejected: Option A (Continue in existing /demo)

**Why rejected:**
- The current `/demo/home-v2-polish.astro` uses desktop-first patterns (nested shells, carousel-primary discovery).
- Retrofitting mobile-first into existing demo would create technical debt and make rollback difficult.
- Phase 4.5 changes are substantial enough to warrant a clean slate.

### Migration Rules

| Phase | Action |
|-------|--------|
| **Phase 4.5 (now)** | Create `/demo-v3/` with mobile-first pages. Production `index.astro` unchanged. |
| **QA Gate** | `/demo-v3/` passes all acceptance criteria (mobile UX, a11y, performance). |
| **Promotion** | Backup `index.astro` → Copy `/demo-v3/index.astro` → Rebuild. |
| **Deprecation** | Archive `/demo/home-v2-polish.astro` to `/pages/archive/demo-v2-polish.astro`. |
| **Cleanup** | Remove `/demo/` directory after 30 days of production stability. |

---

## DECISION 2: Homepage Primary Role

### Choice: **Outcome Engine**

### Definition

An **Outcome Engine** homepage prioritizes immediate value delivery:
- User arrives → sees numbers (or can generate instantly)
- CTA is action-oriented ("Generate Numbers"), not educational ("Learn About Odds")
- Results are the hero, not marketing copy

### Justification

1. **Product Truth #1:** Lucky Numbers is outcome-first. Users want numbers, not explanations.

2. **Mobile utility-app pattern:** Apps like Calculator, Weather, and Shazam deliver results instantly. Lucky Numbers should follow this pattern.

3. **Reduced cognitive load:** A single primary action ("Generate") is easier to process than a multi-option landing page.

4. **Retention optimization:** Users who get immediate value are more likely to return and explore tools.

### Rejected Alternatives

| Role | Why Rejected |
|------|--------------|
| **Workflow** | Implies multi-step process; adds friction to simple "get numbers" use case |
| **Launcher** | Too app-store-like; better for systems with many discrete apps |
| **Teaching Surface** | Education is secondary; should be discoverable, not primary |
| **Hub Index** | Catalog-style; violates outcome-first principle |

### Implementation Implications

1. **Above-fold mobile:** 
   - Primary CTA: "Generate Numbers" button
   - Last/example numbers visible immediately
   - No hero marketing copy

2. **Below-fold:**
   - Tool discovery via icon grid (not carousel)
   - Education surfaces progressively

3. **Desktop adaptation:**
   - Same hierarchy, more horizontal space
   - Bottom nav hidden, replaced by sidebar or top nav

---

## Mobile-First Strategy Summary

### Core Principles

1. **Numbers First** — Generated numbers are always visible or one tap away.
2. **Utility, Not Marketing** — Mobile home feels like a focused app, not a landing page.
3. **Progressive Disclosure** — Tools, education, and features are discoverable but not competing for attention.
4. **Haptic-Ready** — All tap targets ≥ 44px, thumb-zone optimized.

### Navigation Model

**Bottom Nav Tabs:**
| Tab | Route | Purpose |
|-----|-------|---------|
| Numbers | `/` (or `/demo-v3/`) | Primary generator + results |
| Tools | `/tools` | Tiered tool discovery grid |
| Budget | `/tools/lottery-budget` | Budget planning hub |
| Casino | `/casino-lite` | Entertainment hub |
| Profile | `/lucky-profile` | Personalized numbers |

### What Is Deprecated/Removed

| Element | Disposition |
|---------|-------------|
| Hero marketing copy (mobile) | Removed — outcome-first |
| Auto-scrolling carousel | Replaced by static icon grid |
| Nested surface shells | Flattened to single-surface pattern |
| Legacy theme system | Unified with v2 token system |
| `/demo/` directory | Archived after `/demo-v3/` promotion |

### What Is Canonical

| Element | Location |
|---------|----------|
| Mobile-first index | `/demo-v3/index.astro` → `/index.astro` |
| Bottom navigation | `/src/components/mobile/BottomNav.astro` |
| Tool metadata | `/src/config/toolIndex.ts` |
| Number display | `/src/components/NumberRow.astro` |
| Token system | `/src/styles/tokens.css` |
| Theme registry | `/src/themes/index.ts` |

---

## Boundaries (DO NOT TOUCH)

### Protected Production Elements

1. **Backend APIs** — No modifications to `/mintlabs-lucky-api/`
2. **Production routes** — `/index.astro` unchanged until QA gate passed
3. **Existing tools** — No modifications to `/src/pages/tools/*.astro` content
4. **Casino games** — No modifications to `/src/pages/casino-lite/*.astro` logic

### Demo-Safe Modifications

1. All Phase 4.5 changes go to `/demo-v3/` or new components
2. New components clearly labeled: `// DEMO ONLY — Phase 4.5 utility layout prototype`
3. Token additions are additive (no breaking changes to existing tokens)
4. Stubs for Budget/Profile may be created but must include "Coming soon" messaging

---

## Acceptance Criteria

### Phase 4.5 Complete When:

- [ ] `/demo-v3/index.astro` exists and renders mobile-first layout
- [ ] Bottom nav component exists and is functional
- [ ] CTA + numbers visible above fold on iPhone SE viewport (375×667)
- [ ] Tools grid replaces carousel for primary discovery
- [ ] All tap targets ≥ 44px
- [ ] Playwright smoke tests pass for mobile viewport
- [ ] Documentation complete (all 6 required docs)

---

## Commit Plan

```
feat(ux): phase-4.5 repo inventory + architecture decisions

docs(arch): create PHASE_4_5_REPO_INVENTORY.md
docs(arch): create HOMEPAGE_ARCHITECTURE_DECISION.md
- Decision 1: Fork /demo-v3 strategy
- Decision 2: Homepage as Outcome Engine
- Mobile-first principles documented
- Boundaries defined
```

---

*This document is authoritative for Phase 4.5 architecture decisions. Changes require explicit owner approval.*
