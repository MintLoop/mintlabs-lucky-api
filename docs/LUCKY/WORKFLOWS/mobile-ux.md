# Mobile UX Specification — Phase 4.5

> **Version:** 1.0  
> **Phase:** 4.5 — Mobile-First Utility Pattern  
> **Branch:** `opus-architecture-reset`  
> **Last Updated:** 2025-12-11

---

## 1. Utility-App Pattern Rationale

### 1.1 Why Utility-App?

Lucky Numbers should feel like **Calculator**, **Weather**, or **Shazam** on mobile — not a marketing landing page.

**Utility-app characteristics:**
- Instant value delivery (results first)
- Single primary action
- Persistent navigation
- Minimal chrome
- Fast, responsive interactions

**Anti-patterns to avoid:**
- Hero images with marketing copy
- Multi-step onboarding
- Feature carousels as primary discovery
- Dense navigation menus
- Scroll-to-reveal CTAs

### 1.2 Mobile vs Desktop Philosophy

| Aspect | Mobile | Desktop |
|--------|--------|---------|
| Primary action | Above fold, prominent | Sidebar/panel |
| Navigation | Bottom tabs (fixed) | Header/sidebar |
| Discovery | Icon grid, vertical | Cards, horizontal |
| Content density | Low (one thing at a time) | Medium (parallel panels) |
| Gestures | Tap, swipe | Click, hover |

---

## 2. Navigation Model

### 2.1 Bottom Navigation

**Fixed at viewport bottom.** Always visible except in fullscreen modals.

```
┌─────────────────────────────────────────────────────────┐
│  🔢      │  🧰      │  💵      │  🎰      │  👤        │
│ Numbers  │  Tools   │  Budget  │  Casino  │  Profile   │
└─────────────────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value | Notes |
|----------|-------|-------|
| Height | 56px (content) + safe area | iOS safe area: env(safe-area-inset-bottom) |
| Background | `var(--bg-surface-elevated)` | With blur backdrop |
| Border | 1px top `var(--border-primary)` | Subtle separation |
| Shadow | `var(--shadow-soft-sm)` | Depth indication |
| Position | `fixed` | Stays on scroll |
| z-index | 100 | Above content, below modals |

### 2.2 Tab Anatomy

```
┌─────────────────┐
│       🔢        │  ← Icon: 24px
│    Numbers      │  ← Label: 10px, semibold
│       ●         │  ← Active indicator (optional)
└─────────────────┘
     ↑
   72px min tap target
```

**Active state:**
- Icon: Scale 1.1, accent color
- Label: Accent color, bold
- Optional dot indicator below label

**Inactive state:**
- Icon: Default size, muted color
- Label: Muted color, medium weight

### 2.3 Desktop Navigation Behavior

On viewports ≥ 768px:
- Bottom nav **hidden** (`display: none`)
- Navigation moves to header or left sidebar
- Same tabs, horizontal layout

```css
@media (min-width: 768px) {
  .bottom-nav {
    display: none;
  }
}
```

---

## 3. Tap Target Heuristics

### 3.1 Minimum Sizes

| Element | Minimum Size | Recommended |
|---------|--------------|-------------|
| Primary CTA | 48×48px | 56×48px |
| Secondary buttons | 44×44px | 48×44px |
| Nav tabs | 72×56px | Equal flex distribution |
| Icon buttons | 44×44px | 48×48px |
| Form inputs | 44px height | 48px height |
| Links (inline) | 44×44px hit area | Padding or pseudo-element |

### 3.2 Spacing Between Targets

- Minimum gap: **8px**
- Recommended gap: **12px**
- Dense layouts: **4px** (not recommended)

### 3.3 Thumb Zone Optimization

```
┌─────────────────────────────────────────┐
│                                         │
│        STRETCH ZONE (hard to reach)     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│        NATURAL ZONE (easy reach)        │
│                                         │
├─────────────────────────────────────────┤
│  ████████████████████████████████████  │
│  ██     PRIMARY ACTION ZONE        ██  │
│  ████████████████████████████████████  │
│                                         │
│  [Bottom Navigation]                    │
└─────────────────────────────────────────┘
```

**Primary CTAs should be in the bottom 40% of the viewport** for comfortable one-handed use.

---

## 4. Mobile Information Hierarchy

### 4.1 Above-Fold Priority (Numbers Hub)

| Priority | Element | Max Height |
|----------|---------|------------|
| 1 | Generated numbers | 100px |
| 2 | Game selector | 48px |
| 3 | Mode selector | 48px |
| 4 | Generate button | 56px |
| **Total** | | ~252px |

**Remaining viewport:** ~415px (on 667px iPhone SE) for scroll content + nav (88px)

### 4.2 Below-Fold Content Order

1. Tier S tool grid (4 tools)
2. Tier A tool grid (4 tools)
3. "View All Tools" link
4. Feature cards (Profile, Casino)
5. Education section (collapsed)
6. Footer

### 4.3 Visual Weight

| Element | Visual Weight | Implementation |
|---------|---------------|----------------|
| Numbers | **Highest** | Large pills, bold numbers |
| Generate CTA | **High** | Accent background, prominent |
| Tool grid | Medium | Icon + short label |
| Feature cards | Medium | Card with icon |
| Education | Low | Text links, collapsed |

---

## 5. Number Display Rules

### 5.1 Number Pill Specifications

```css
.number-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  background: var(--bg-surface-elevated);
  color: var(--text-primary);
  border: 2px solid var(--border-primary);
  box-shadow: var(--shadow-soft-sm);
}
```

### 5.2 Bonus Ball Distinction

The bonus ball (Powerball/Megaball) MUST be visually distinct:

```css
.number-pill.bonus {
  background: var(--accent-primary);
  color: var(--text-on-accent);
  border-color: var(--accent-secondary);
  box-shadow: 
    var(--shadow-soft-sm),
    0 0 12px rgba(var(--accent-primary-rgb), 0.4);
}
```

**Visual cues:**
- Different background color (accent)
- Glow effect
- Optional star icon prefix
- Larger gap from main numbers

### 5.3 Responsive Sizing

| Viewport | Pill Size | Font Size | Gap |
|----------|-----------|-----------|-----|
| < 375px | 40px | 16px | 6px |
| 375-428px | 48px | 18px | 8px |
| 429-768px | 56px | 20px | 10px |
| > 768px | 64px | 24px | 12px |

### 5.4 Number Row Container

```css
.number-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-md);
}

.number-row .bonus-separator {
  width: 2px;
  height: 32px;
  background: var(--border-primary);
  margin: 0 var(--space-xs);
}
```

---

## 6. Tool Discovery Rules

### 6.1 Grid Layout

**Mobile (< 768px):**
- 4 columns for icon grid
- 2 columns for card grid

**Desktop (≥ 768px):**
- 6 columns for icon grid
- 3 columns for card grid

### 6.2 Icon Grid Specifications

```css
.tool-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-sm);
  padding: var(--space-md);
}

.tool-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm);
  border-radius: var(--radius-lg);
  background: var(--bg-surface-1);
  min-height: 72px;
}

.tool-grid-item .icon {
  font-size: 24px;
}

.tool-grid-item .label {
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  color: var(--text-secondary);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### 6.3 Tier S Prominence

Tier S tools get visual elevation:

```css
.tool-grid-item.tier-s {
  background: linear-gradient(
    135deg,
    var(--accent-primary) 0%,
    var(--accent-secondary) 100%
  );
  color: var(--text-on-accent);
}

.tool-grid-item.tier-s .icon {
  font-size: 28px;
}

.tool-grid-item.tier-s .label {
  color: var(--text-on-accent);
  font-weight: 700;
}
```

### 6.4 No Carousel for Primary Discovery

Carousels are **forbidden** as primary tool discovery on mobile because:
- Hidden content creates cognitive load
- Swipe gestures conflict with native scroll
- Auto-scroll is distracting and inaccessible
- Content is not scannable

**Allowed carousel use:**
- Secondary "featured" section (not primary discovery)
- Explicit user-controlled galleries
- Desktop-only horizontal scroll

---

## 7. Performance + A11y Gates

### 7.1 Tap Target Checklist

- [ ] All buttons ≥ 44px height
- [ ] All nav tabs ≥ 72px width
- [ ] Form inputs ≥ 44px height
- [ ] Inline links have ≥ 44px hit area (via padding/pseudo)
- [ ] Gap between targets ≥ 8px

### 7.2 Accessibility Checklist

- [ ] Bottom nav uses semantic `<nav>` with `aria-label="Main navigation"`
- [ ] Active tab has `aria-current="page"`
- [ ] All icons have `aria-hidden="true"` with visible labels
- [ ] Focus states visible on all interactive elements
- [ ] Focus order matches visual order
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Color contrast ≥ 3:1 for large text and UI components

### 7.3 Performance Checklist

- [ ] No CLS from number generation (reserve space)
- [ ] Bottom nav does not cause layout shift on load
- [ ] Tool grid images lazy-loaded
- [ ] Critical CSS inlined for above-fold
- [ ] JS bundle < 30KB gzipped

### 7.4 Contrast Checks for Number Pills

| State | Background | Text | Contrast |
|-------|------------|------|----------|
| Default | `--bg-surface-elevated` | `--text-primary` | ≥ 7:1 |
| Bonus | `--accent-primary` | `--text-on-accent` | ≥ 4.5:1 |
| Generating | Animated | N/A | N/A |
| Example | Muted surface | `--text-secondary` | ≥ 4.5:1 |

---

## 8. QA Checklist — iPhone-Width Viewports

### 8.1 Test Viewports

| Device | Width | Height | Notes |
|--------|-------|--------|-------|
| iPhone SE | 375px | 667px | Minimum target |
| iPhone 12/13 | 390px | 844px | Common |
| iPhone 14 Pro Max | 430px | 932px | Large |

### 8.2 Visual Tests

**Numbers Hub:**
- [ ] Generate button visible without scroll
- [ ] Numbers display without horizontal overflow
- [ ] Bonus ball is visually distinct
- [ ] Game/mode selectors fit in viewport width

**Bottom Nav:**
- [ ] All 5 tabs visible and readable
- [ ] Active state clearly indicated
- [ ] Tap targets do not overlap
- [ ] Safe area respected on notched devices

**Tool Grid:**
- [ ] 4 columns render without overflow
- [ ] Tier S tools visually prominent
- [ ] Labels readable (not truncated)
- [ ] Tap targets meet 44px minimum

**Scroll Behavior:**
- [ ] Content scrolls smoothly
- [ ] Bottom nav stays fixed
- [ ] No horizontal scroll on any section
- [ ] Pull-to-refresh does not interfere (if applicable)

### 8.3 Functional Tests

- [ ] Tapping Generate produces numbers
- [ ] Numbers update without page reload
- [ ] Tab navigation works (each tab loads correct page)
- [ ] Active tab reflects current page
- [ ] Tool grid items link to correct pages

### 8.4 Accessibility Tests

- [ ] VoiceOver announces page correctly
- [ ] Bottom nav announced as navigation
- [ ] Focus visible on all interactive elements
- [ ] Reduced motion preference respected

---

## 9. Test Plan (Playwright)

### 9.1 Smoke Tests

```typescript
test.describe('Mobile UX - Phase 4.5', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('bottom nav renders on mobile', async ({ page }) => {
    await page.goto('/demo-v3/');
    const nav = page.locator('nav.bottom-nav');
    await expect(nav).toBeVisible();
    await expect(nav.locator('a')).toHaveCount(5);
  });

  test('switching tabs works', async ({ page }) => {
    await page.goto('/demo-v3/');
    
    // Click Tools tab
    await page.click('nav.bottom-nav a[href="/tools"]');
    await expect(page).toHaveURL('/tools');
    
    // Click Casino tab
    await page.click('nav.bottom-nav a[href="/casino-lite"]');
    await expect(page).toHaveURL('/casino-lite');
  });

  test('Generate CTA visible above fold', async ({ page }) => {
    await page.goto('/demo-v3/');
    const cta = page.locator('button:has-text("Generate")');
    await expect(cta).toBeVisible();
    
    // Verify it's above fold (within viewport)
    const box = await cta.boundingBox();
    expect(box.y + box.height).toBeLessThan(667);
  });

  test('numbers render without overflow', async ({ page }) => {
    await page.goto('/demo-v3/');
    
    // Generate numbers
    await page.click('button:has-text("Generate")');
    await page.waitForSelector('.number-pill');
    
    // Check no horizontal overflow
    const row = page.locator('.number-row');
    const box = await row.boundingBox();
    expect(box.width).toBeLessThanOrEqual(375);
  });
});
```

### 9.2 Test File Location

`tests/demo-v3/mobile-ux.spec.ts`

---

## 10. Acceptance Criteria Summary

| Criterion | Pass Condition |
|-----------|----------------|
| Mobile home: CTA + numbers visible immediately | Generate button and number display above fold on 375×667 |
| Bottom nav: usable, clear, stable | 5 tabs visible, active state works, no layout shift |
| Tools: grid discovery with Tier S prominence | 4-column grid, Tier S visually elevated |
| Numbers: bonus ball distinction + consistent sizing | Bonus has accent color + glow, responsive sizing works |
| Docs: mobile-ux.md present and actionable | This document exists and is complete |

---

## 11. Related Documents

- [HOMEPAGE_ARCHITECTURE_DECISION.md](./HOMEPAGE_ARCHITECTURE_DECISION.md) — Decision memo
- [HOMEPAGE_ARCHITECTURE_PHASE_4.md](./HOMEPAGE_ARCHITECTURE_PHASE_4.md) — Homepage spec
- [CONTEXTUAL_DISCOVERY_MODEL.md](./CONTEXTUAL_DISCOVERY_MODEL.md) — Tool tiering
- [HUB_ARCHITECTURE.md](./HUB_ARCHITECTURE.md) — Tab routing

---

*This specification is canonical for Phase 4.5 mobile UX implementation.*
