# Phase 9 — Full MintLoop Ecosystem Integration

**Goal:** Make Lucky one of MintLoop's flagship traffic feeders.

**Owner:** TBD  
**Branch:** `phase-9-ecosystem`  
**Status:** Blocked (wait for Phase 8)  
**Dependencies:** Phase 8 (Historical Data)

---

## 9.1 MintScale Integration

### Deliverables

Embed MintScale calculators in Lucky's strategy pages.

### Integration Points

| Lucky Page | MintScale Tool |
|------------|----------------|
| `/tools/jackpot-ev` | ROI Calculator |
| `/tools/bankroll-planner` | Budget Calculator |
| Strategy pages | Tax Calculator |
| Guides | Compound Interest |

### Implementation

- [ ] Create embed component for MintScale tools
- [ ] Use iframe or web components for isolation
- [ ] Maintain consistent styling
- [ ] Track cross-site engagement

### Acceptance Criteria

- [ ] Embedded tools load quickly (< 1s)
- [ ] Responsive on all viewports
- [ ] No style conflicts
- [ ] Analytics track referrals
- [ ] Fallback if MintScale unavailable

### Files to Create

**Frontend:**
- `src/components/MintScaleEmbed.astro`
- Modify relevant tool/strategy pages

---

## 9.2 MintLabs Cross-Promotion

### Deliverables

Highlight MintLabs fun tools on Lucky.

### Cross-Promotion Ideas

| Lucky Context | MintLabs Feature |
|---------------|------------------|
| Zodiac pages | Coloring books |
| Birthday pages | AI art concepts |
| Fun mode results | Creative tools |

### Implementation

- [ ] Create promotional cards
- [ ] A/B test placement
- [ ] Track click-through rates

### Acceptance Criteria

- [ ] Non-intrusive promotion
- [ ] Clear MintLabs branding
- [ ] Opens in new tab
- [ ] Tracking in place

### Files to Create

**Frontend:**
- `src/components/MintLabsPromo.astro`
- `src/data/mintlabs-promos.json`

---

## 9.3 MintDrop Content Integration

### Deliverables

Integrate MintDrop video/content where relevant.

### Content Types

| Format | Placement |
|--------|-----------|
| Explainer videos | Guide pages |
| Paranormal/fortune content | Zodiac cluster (if exploring niche) |
| Tutorial clips | Tool pages |

### Implementation

- [ ] Video embed component
- [ ] Lazy load for performance
- [ ] Transcript for SEO/accessibility

### Acceptance Criteria

- [ ] Videos don't autoplay
- [ ] Mobile-friendly player
- [ ] Captions available
- [ ] Page speed not impacted

### Files to Create

**Frontend:**
- `src/components/MintDropVideo.astro`
- `src/components/VideoPlayer.astro`

---

## 9.4 Unified Navigation

### Deliverables

Create consistent navigation across MintLoop properties.

### Navigation Elements

- [ ] MintLoop logo/link in header
- [ ] Footer with all MintLoop properties
- [ ] "Part of MintLoop" badge
- [ ] Cross-property search (future)

### Acceptance Criteria

- [ ] Consistent branding
- [ ] Easy navigation between properties
- [ ] Mobile hamburger menu includes ecosystem
- [ ] SEO-friendly internal linking

### Files to Modify

**Frontend:**
- `src/components/SiteHeader.astro` — add ecosystem nav
- `src/components/SiteFooter.astro` — ecosystem links
- `src/components/EcosystemNav.astro` — new component

---

## 9.5 Shared Analytics

### Deliverables

Unified analytics across MintLoop properties.

### Implementation

- [ ] Shared Google Analytics property
- [ ] Cross-domain tracking
- [ ] Unified dashboard
- [ ] User journey tracking across properties

### Acceptance Criteria

- [ ] Single analytics view for all properties
- [ ] Cross-domain user identification
- [ ] Conversion tracking for ecosystem
- [ ] Privacy-compliant implementation

### Files to Modify

**Frontend:**
- `src/layouts/Layout.astro` — analytics integration
- `src/scripts/analytics.ts` — cross-domain setup

---

## Traffic Engine Strategy

Lucky serves as a **traffic engine** for MintLoop:

```
┌─────────────────────────────────────────────────┐
│                   LUCKY                         │
│  High-traffic lottery/numerology content        │
│                     │                           │
│          ┌─────────┴─────────┐                 │
│          ▼                   ▼                 │
│    ┌─────────────┐    ┌─────────────┐         │
│    │  MintScale  │    │  MintLabs   │         │
│    │  (Finance)  │    │   (Fun)     │         │
│    └─────────────┘    └─────────────┘         │
│          │                   │                 │
│          └─────────┬─────────┘                 │
│                    ▼                           │
│            ┌─────────────┐                     │
│            │  MintDrop   │                     │
│            │  (Content)  │                     │
│            └─────────────┘                     │
└─────────────────────────────────────────────────┘
```

---

## Agent Assignment

| Task | Agent | Scope |
|------|-------|-------|
| 9.1 MintScale | Frontend Agent | embeds, integration |
| 9.2 MintLabs | Frontend Agent | promo components |
| 9.3 MintDrop | Frontend Agent | video integration |
| 9.4 Navigation | Frontend Agent | header/footer |
| 9.5 Analytics | Infra Agent | cross-domain setup |

---

## Definition of Done

- [ ] All MintLoop properties linked
- [ ] Cross-promotion components live
- [ ] Unified navigation implemented
- [ ] Analytics tracking cross-domain
- [ ] No performance regression
- [ ] `npm run test:e2e` passes
- [ ] PR reviewed and merged to `main`
- [ ] `docs/AGENT_TRACKER.md` updated
