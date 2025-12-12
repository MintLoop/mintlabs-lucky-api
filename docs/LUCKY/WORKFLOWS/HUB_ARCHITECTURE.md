# Hub Architecture — Phase 4.5

> **Version:** 1.0  
> **Phase:** 4.5 — Mobile-First Utility Pattern  
> **Branch:** `opus-architecture-reset`  
> **Last Updated:** 2025-12-11

---

## 1. Overview

This document defines the hub architecture for Lucky Numbers, mapping bottom navigation tabs to their corresponding routes and content structure.

### 1.1 Design Philosophy

Hubs are **content aggregators**, not tool dumps. Each hub:
- Has a clear purpose statement
- Organizes tools/content by user intent
- Provides contextual navigation within the hub
- Links to related hubs for cross-discovery

---

## 2. Bottom Navigation Routing Contract

### 2.1 Tab → Route Mapping

| Tab | Icon | Route | Purpose |
|-----|------|-------|---------|
| **Numbers** | 🔢 | `/` (demo: `/demo-v3/`) | Primary generator + results |
| **Tools** | 🧰 | `/tools` | Utility index (all tools) |
| **Budget** | 💵 | `/tools/lottery-budget` | Budget planning hub |
| **Casino** | 🎰 | `/casino-lite` | Entertainment hub |
| **Profile** | 👤 | `/lucky-profile` | Personalized numbers |

### 2.2 Active State Rules

The active tab is determined by route prefix matching:

```typescript
function getActiveTab(pathname: string): string {
  // Exact matches first
  if (pathname === '/' || pathname === '/demo-v3/') return 'numbers';
  if (pathname === '/lucky-profile') return 'profile';
  
  // Prefix matches
  if (pathname.startsWith('/casino-lite')) return 'casino';
  if (pathname.startsWith('/tools/lottery-budget')) return 'budget';
  if (pathname.startsWith('/tools')) return 'tools';
  
  // Default
  return 'numbers';
}
```

### 2.3 Desktop Behavior

On viewports ≥ 768px:
- Bottom nav is **hidden**
- Navigation moves to **header** or **sidebar**
- Same routing contract applies

---

## 3. Hub Specifications

### 3.1 Numbers Hub (Homepage)

**Route:** `/` (demo: `/demo-v3/`)

**Purpose:** Generate lottery numbers instantly.

**Content Structure:**
```
┌─────────────────────────────────────────────┐
│  Generated Numbers (NumberRow)              │
│  Game Selector                              │
│  Mode Selector                              │
│  [Generate Numbers] CTA                     │
├─────────────────────────────────────────────┤
│  Featured Tools (Tier S grid)               │
│  More Tools (Tier A grid)                   │
│  [View All Tools →]                         │
├─────────────────────────────────────────────┤
│  Feature Cards (Profile, Casino)            │
│  Education Section                          │
└─────────────────────────────────────────────┘
```

**Cross-Hub Links:**
- "Plan Your Budget" → Budget Hub
- "Try Casino Games" → Casino Hub
- "Get Personal Numbers" → Profile Hub

---

### 3.2 Tools Hub

**Route:** `/tools`

**Purpose:** Discover and access all calculation, analysis, and simulation tools.

**Content Structure:**
```
┌─────────────────────────────────────────────┐
│  Hub Header                                 │
│  "44 Tools for Smart Lottery Players"       │
│  🔍 Search tools...                         │
├─────────────────────────────────────────────┤
│  FEATURED (Tier S)                          │
│  [5 prominent tool cards]                   │
├─────────────────────────────────────────────┤
│  Category Sections:                         │
│  • Analysis (12 tools)                      │
│  • Strategy (8 tools)                       │
│  • Visualization (6 tools)                  │
│  • Education (10 tools)                     │
│  • RNG & Random (8 tools)                   │
├─────────────────────────────────────────────┤
│  Cross-Hub Promos:                          │
│  • "Manage your budget" → Budget            │
│  • "Learn with casino games" → Casino       │
└─────────────────────────────────────────────┘
```

**Category Definitions:**

| Category | Tools Included |
|----------|----------------|
| Analysis | hot-cold, heatmap, trend, pattern, repeat, consecutive, spread, popularity |
| Strategy | break-even, jackpot-split, birthday-risk, payout, ticket-variance |
| Visualization | probability-visualizer, even-odd, high-low, number-wheel |
| Education | beginners-guide, why-odds, math-quiz, how-rare, expected-loss, playground |
| RNG | quick-draw, pick-generator, dice, coin, raffle, wheel-spinner, card-picker |

---

### 3.3 Budget Hub

**Route:** `/tools/lottery-budget`

**Purpose:** Plan and track lottery spending responsibly.

**Content Structure:**
```
┌─────────────────────────────────────────────┐
│  Hub Header                                 │
│  "Smart Budget Planning"                    │
│  [Monthly budget calculator]                │
├─────────────────────────────────────────────┤
│  Quick Actions:                             │
│  • Set monthly limit                        │
│  • Calculate ticket cost                    │
│  • View expected loss                       │
├─────────────────────────────────────────────┤
│  Related Tools:                             │
│  • Expected Value Calculator                │
│  • Expected Loss Over Years                 │
│  • Break-Even Calculator                    │
│  • Payout Calculator                        │
├─────────────────────────────────────────────┤
│  Educational Content:                       │
│  • "The math of lottery spending"           │
│  • "Why budgets matter"                     │
│  • Responsible gambling resources           │
├─────────────────────────────────────────────┤
│  Problem Gambling Resources                 │
│  NCPG: 1-800-522-4700                       │
└─────────────────────────────────────────────┘
```

**Current Status:** The existing `/tools/lottery-budget` page serves this role. Phase 4.5 elevates it to a tab destination.

---

### 3.4 Casino Hub

**Route:** `/casino-lite`

**Purpose:** Learn probability through entertainment-only games.

**Content Structure:**
```
┌─────────────────────────────────────────────┐
│  Hub Header                                 │
│  "Casino-Lite Simulators"                   │
│  ⚠️ Entertainment Only Disclaimer           │
├─────────────────────────────────────────────┤
│  Available Games:                           │
│  • 🃏 Blackjack Simulator                   │
│  • 🎡 Wheel Spinner                         │
│  • 🎲 Dice Roller                           │
│  • 🃏 High Card (coming soon)               │
│  • ⚔️ War (coming soon)                     │
├─────────────────────────────────────────────┤
│  Learning Topics:                           │
│  • House edge explained                     │
│  • Expected value in games                  │
│  • Why the house always wins                │
├─────────────────────────────────────────────┤
│  Cross-Hub Links:                           │
│  • "Calculate EV" → Tools                   │
│  • "Random dice" → Tools (Dice Roller)      │
├─────────────────────────────────────────────┤
│  Responsible Gaming Footer                  │
│  NCPG: 1-800-522-4700                       │
└─────────────────────────────────────────────┘
```

**Current Status:** `/casino-lite` exists and is well-structured. Phase 4.5 makes it a bottom nav destination.

---

### 3.5 Profile Hub

**Route:** `/lucky-profile`

**Purpose:** Generate personalized lucky numbers based on birthstone, rashi, and color psychology.

**Content Structure:**
```
┌─────────────────────────────────────────────┐
│  Hub Header                                 │
│  "Your Lucky Profile"                       │
├─────────────────────────────────────────────┤
│  Profile Builder:                           │
│  • Birth month selector                     │
│  • Rashi (Indian zodiac) selector           │
│  • Color wheel picker                       │
│  • Optional spiritual filters               │
├─────────────────────────────────────────────┤
│  Generated Profile:                         │
│  • Lucky focus statement                    │
│  • Recommended actions                      │
│  • Lucky numbers (numerology)               │
│  • Complementary colors                     │
├─────────────────────────────────────────────┤
│  Related Tools:                             │
│  • Birthday Mapper                          │
│  • Lucky Colors by Birth Month              │
│  • Birthdate Risk Checker                   │
├─────────────────────────────────────────────┤
│  Educational Footer:                        │
│  "These are for fun only—RNG is random"     │
└─────────────────────────────────────────────┘
```

**Current Status:** `/lucky-profile` exists with full client-side synthesis. Phase 4.5 makes it a bottom nav destination.

---

## 4. Stub Page Requirements

For Phase 4.5, all bottom nav destinations must exist. If a hub is incomplete, create a stub page with:

### 4.1 Stub Template

```astro
---
// DEMO ONLY — Phase 4.5 utility layout prototype
import Layout from '../../layouts/Layout.astro';
import BottomNav from '../../components/mobile/BottomNav.astro';

const title = "Coming Soon";
const description = "This feature is under development.";
---

<Layout title={title} description={description}>
  <main class="stub-page">
    <div class="stub-content">
      <div class="stub-icon">🚧</div>
      <h1>Coming Soon</h1>
      <p>We're working on this feature. Check back soon!</p>
      <a href="/" class="stub-cta">
        ← Back to Numbers
      </a>
    </div>
  </main>
  <BottomNav activeTab="..." />
</Layout>

<style>
  .stub-page {
    min-height: calc(100vh - 88px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-lg);
  }
  .stub-content {
    text-align: center;
    max-width: 320px;
  }
  .stub-icon {
    font-size: 4rem;
    margin-bottom: var(--space-md);
  }
  .stub-cta {
    display: inline-block;
    margin-top: var(--space-lg);
    padding: var(--space-sm) var(--space-lg);
    background: var(--accent-primary);
    color: var(--text-on-accent);
    border-radius: var(--radius-lg);
    text-decoration: none;
  }
</style>
```

### 4.2 Stub Requirements

| Page | Needs Stub? | Notes |
|------|-------------|-------|
| `/demo-v3/` | No | New implementation |
| `/tools` | No | Exists (may need mobile refactor) |
| `/tools/lottery-budget` | No | Exists |
| `/casino-lite` | No | Exists |
| `/lucky-profile` | No | Exists |

All required pages exist. No stubs needed for Phase 4.5.

---

## 5. Navigation Component Specification

### 5.1 BottomNav Props

```typescript
interface BottomNavProps {
  activeTab: 'numbers' | 'tools' | 'budget' | 'casino' | 'profile';
}
```

### 5.2 Tab Configuration

```typescript
const tabs = [
  { id: 'numbers', icon: '🔢', label: 'Numbers', href: '/' },
  { id: 'tools', icon: '🧰', label: 'Tools', href: '/tools' },
  { id: 'budget', icon: '💵', label: 'Budget', href: '/tools/lottery-budget' },
  { id: 'casino', icon: '🎰', label: 'Casino', href: '/casino-lite' },
  { id: 'profile', icon: '👤', label: 'Profile', href: '/lucky-profile' },
];
```

### 5.3 Accessibility Requirements

```html
<nav class="bottom-nav" aria-label="Main navigation">
  <a 
    href="/"
    class="nav-tab"
    aria-current={activeTab === 'numbers' ? 'page' : undefined}
  >
    <span class="nav-icon" aria-hidden="true">🔢</span>
    <span class="nav-label">Numbers</span>
  </a>
  <!-- ... other tabs -->
</nav>
```

---

## 6. Cross-Hub Linking Rules

### 6.1 Every Hub Must Link To:

| From Hub | Required Links |
|----------|----------------|
| Numbers | Tools, Budget, Casino, Profile |
| Tools | Numbers (via CTA), Budget, Casino |
| Budget | Numbers, Tools (EV, Loss calculators) |
| Casino | Numbers, Tools (RNG tools) |
| Profile | Numbers, Tools (Birthday tools) |

### 6.2 Contextual Link Examples

**On Numbers Hub:**
```html
<a href="/tools/lottery-budget">
  💵 Plan your budget before you play
</a>
```

**On Casino Hub:**
```html
<a href="/tools/expected-value-calculator">
  🧮 Calculate expected value for any game
</a>
```

---

## 7. Implementation Checklist

### 7.1 Components

- [ ] `BottomNav.astro` — Bottom navigation
- [ ] `HubHeader.astro` — Consistent hub headers
- [ ] `CrossHubLinks.astro` — Related hub promos

### 7.2 Pages

- [ ] `/demo-v3/index.astro` — Numbers hub (new)
- [ ] `/tools/index.astro` — Tools hub (exists, verify structure)
- [ ] `/tools/lottery-budget.astro` — Budget hub (exists)
- [ ] `/casino-lite.astro` — Casino hub (exists)
- [ ] `/lucky-profile.astro` — Profile hub (exists)

### 7.3 Integration

- [ ] Add `BottomNav` to all hub pages
- [ ] Implement active state detection
- [ ] Add cross-hub links to each hub
- [ ] Test navigation flow on mobile

---

## 8. Related Documents

- [HOMEPAGE_ARCHITECTURE_PHASE_4.md](./HOMEPAGE_ARCHITECTURE_PHASE_4.md) — Homepage spec
- [CONTEXTUAL_DISCOVERY_MODEL.md](./CONTEXTUAL_DISCOVERY_MODEL.md) — Tool tiering
- [mobile-ux.md](./mobile-ux.md) — Mobile UX requirements

---

*This architecture is canonical for Phase 4.5 hub implementation.*
