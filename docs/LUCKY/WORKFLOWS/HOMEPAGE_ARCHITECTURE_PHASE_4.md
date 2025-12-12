# Homepage Architecture Specification — Phase 4.5

> **Version:** 1.0  
> **Phase:** 4.5 — Mobile-First Utility Pattern  
> **Branch:** `opus-architecture-reset`  
> **Last Updated:** 2025-12-11

---

## 1. Overview

This document specifies the canonical homepage architecture for Lucky Numbers following the Phase 4.5 mobile-first refactor. The homepage is defined as a **FLOW**, not a static layout.

### 1.1 Design Philosophy

The homepage is an **Outcome Engine** — it exists to deliver generated numbers as quickly as possible, with all other features progressively disclosed.

**Core Principle:** Time-to-value should be under 3 seconds on mobile.

---

## 2. Homepage Flow (Mobile-First)

```
┌─────────────────────────────────────────────────────────────┐
│                    VIEWPORT (375×667)                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              GENERATED NUMBERS                       │   │
│  │         [ 07 ]  [ 14 ]  [ 23 ]  [ 38 ]  [ 42 ]      │   │
│  │                    [ ⭐ 15 ]                         │   │
│  │              Last generated • Powerball              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   GAME SELECTOR                      │   │
│  │   [ Powerball ▼ ]        [ Mode: Uniform ▼ ]        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            ████████████████████████████              │   │
│  │            █   GENERATE NUMBERS    █                 │   │
│  │            ████████████████████████████              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ FOLD LINE  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
│                                                             │
│  TIER S TOOLS (Icon Grid)                                   │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                           │
│  │ 🎲  │ │ 📊  │ │ 🧮  │ │ ⚡  │                           │
│  │Draw │ │Odds │ │ EV  │ │Combo│                           │
│  └─────┘ └─────┘ └─────┘ └─────┘                           │
│                                                             │
│  TIER A TOOLS (Secondary Grid, scrollable)                  │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                           │
│  │ 🔥  │ │ ❄️  │ │ 💰  │ │ 📈  │                           │
│  │ Hot │ │Cold │ │Split│ │Trend│                           │
│  └─────┘ └─────┘ └─────┘ └─────┘                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    BOTTOM NAVIGATION                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔢      │  🧰      │  💵      │  🎰      │  👤     │   │
│  │ Numbers  │  Tools   │  Budget  │  Casino  │ Profile │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy

### 3.1 Above-Fold Components (Critical Path)

| Order | Component | Purpose | Height Budget |
|-------|-----------|---------|---------------|
| 1 | `NumberRow` | Display generated numbers | ~100px |
| 2 | `GameSelector` | Game + mode dropdowns | ~80px |
| 3 | `GenerateButton` | Primary CTA | ~60px |
| **Total** | | | ~240px |

**Remaining viewport:** ~420px for tools grid + bottom nav (88px)

### 3.2 Below-Fold Components (Progressive Disclosure)

| Order | Component | Purpose |
|-------|-----------|---------|
| 4 | `ToolGrid` (Tier S) | 4 prominent tools |
| 5 | `ToolGrid` (Tier A) | 8 secondary tools |
| 6 | `FeatureCards` | Lucky Profile, Casino-Lite promos |
| 7 | `EduSection` | Educational links (collapsed by default) |

### 3.3 Fixed Components

| Component | Position | Height |
|-----------|----------|--------|
| `BottomNav` | Fixed bottom | 88px (including safe area) |

---

## 4. State Management

### 4.1 Number State

```typescript
interface NumberState {
  numbers: number[];           // Main numbers
  bonusBall?: number;          // Powerball/Megaball
  game: GameCode;              // 'powerball' | 'megamillions' | etc.
  mode: RNGMode;               // 'uniform' | 'spaced' | etc.
  timestamp: number;           // Generation time
  isExample: boolean;          // True if showing placeholder
}
```

### 4.2 Initial State (No Generation Yet)

On first load, display example numbers with visual indicator:

```
[ 07 ]  [ 14 ]  [ 23 ]  [ 38 ]  [ 42 ]  [ ⭐ 15 ]
             Example numbers • Tap Generate
```

### 4.3 Post-Generation State

After user generates:

```
[ 03 ]  [ 17 ]  [ 29 ]  [ 44 ]  [ 58 ]  [ ⭐ 22 ]
         Generated • Dec 11, 2025 • Powerball
```

---

## 5. Mobile Adaptations

### 5.1 Viewport Breakpoints

| Breakpoint | Width | Adaptations |
|------------|-------|-------------|
| **xs** | < 375px | Stack selectors, smaller pills |
| **sm** | 375-428px | Default mobile layout |
| **md** | 429-768px | Wider tool grid (6 columns) |
| **lg** | > 768px | Desktop layout, hide bottom nav |

### 5.2 Number Pill Sizing

| Viewport | Pill Size | Font Size | Gap |
|----------|-----------|-----------|-----|
| xs | 40px | 16px | 6px |
| sm | 48px | 18px | 8px |
| md | 56px | 20px | 10px |
| lg | 64px | 24px | 12px |

### 5.3 Bonus Ball Distinction

The bonus ball (Powerball/Megaball) must be visually distinct:

- **Background:** Accent color (`--accent-primary`)
- **Border:** 2px solid with glow
- **Icon:** Star prefix (⭐) or special background
- **Position:** Separated by larger gap

```css
.number-pill.bonus {
  background: var(--accent-primary);
  color: var(--text-on-accent);
  box-shadow: 0 0 12px rgba(var(--accent-primary-rgb), 0.4);
}
```

---

## 6. Desktop Adaptation

On viewports ≥ 768px, the layout shifts:

```
┌────────────────────────────────────────────────────────────────────┐
│  HEADER (Logo + Theme Picker + Search)                             │
├────────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────┐  ┌──────────────────────────────────┐ │
│  │                        │  │                                  │ │
│  │   GENERATOR PANEL      │  │    TOOL DISCOVERY PANEL          │ │
│  │                        │  │                                  │ │
│  │   Numbers Display      │  │    Tier S Grid                   │ │
│  │   Game Selector        │  │    Tier A Grid                   │ │
│  │   Mode Selector        │  │    Feature Cards                 │ │
│  │   Generate Button      │  │    Education Links               │ │
│  │                        │  │                                  │ │
│  └────────────────────────┘  └──────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────┤
│  FOOTER (Legal + Links)                                            │
└────────────────────────────────────────────────────────────────────┘
```

**Key differences:**
- No bottom navigation (use header/sidebar)
- Two-column layout
- Generator panel is sticky on scroll
- Tool grid expands to fill width

---

## 7. Animation Specifications

### 7.1 Number Generation Animation

```css
@keyframes numberReveal {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

.number-pill.generating {
  animation: numberReveal 0.3s ease-out;
  animation-fill-mode: both;
}
```

**Stagger:** Each pill delays by 80ms.

### 7.2 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .number-pill.generating {
    animation: none;
    opacity: 1;
  }
}
```

---

## 8. Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP | < 1.5s | Largest Contentful Paint (number display) |
| FID | < 100ms | First Input Delay (Generate button) |
| CLS | < 0.1 | Cumulative Layout Shift |
| TTI | < 2.5s | Time to Interactive |

### 8.1 Critical CSS

Inline critical CSS for:
- Number pills
- Generate button
- Bottom nav
- Base layout

### 8.2 JavaScript Budget

| Component | Max Size |
|-----------|----------|
| Entry bundle | 30KB gzipped |
| Generator logic | 10KB gzipped |
| Theme switching | 5KB gzipped |

---

## 9. Accessibility Requirements

### 9.1 ARIA Labels

```html
<section aria-label="Generated lottery numbers" role="region">
  <div class="number-row" role="list">
    <span class="number-pill" role="listitem" aria-label="Number 7">07</span>
    <!-- ... -->
    <span class="number-pill bonus" role="listitem" aria-label="Bonus ball 15">⭐ 15</span>
  </div>
</section>
```

### 9.2 Focus Management

After generation:
1. Focus moves to first number pill
2. Screen reader announces: "Generated numbers: 7, 14, 23, 38, 42, bonus ball 15"

### 9.3 Keyboard Navigation

| Key | Action |
|-----|--------|
| Enter | Trigger Generate |
| Tab | Navigate between controls |
| Escape | Close any open modals |

---

## 10. Implementation Checklist

### 10.1 Components to Create

- [ ] `src/components/mobile/BottomNav.astro`
- [ ] `src/components/NumberRow.astro`
- [ ] `src/components/ToolGrid.astro`

### 10.2 Components to Modify

- [ ] `src/components/GeneratorForm.astro` → Extract `NumberRow`
- [ ] `src/styles/tokens.css` → Add mobile tokens

### 10.3 Pages to Create

- [ ] `src/pages/demo-v3/index.astro` (mobile-first home)
- [ ] `src/pages/demo-v3/budget.astro` (stub)
- [ ] `src/pages/demo-v3/profile.astro` (stub)

---

## 11. Related Documents

- [HOMEPAGE_ARCHITECTURE_DECISION.md](./HOMEPAGE_ARCHITECTURE_DECISION.md) — Decision memo
- [CONTEXTUAL_DISCOVERY_MODEL.md](./CONTEXTUAL_DISCOVERY_MODEL.md) — Tool tiering
- [HUB_ARCHITECTURE.md](./HUB_ARCHITECTURE.md) — Tab routing
- [mobile-ux.md](./mobile-ux.md) — Mobile UX specification

---

*This specification is canonical for Phase 4.5 homepage implementation.*
