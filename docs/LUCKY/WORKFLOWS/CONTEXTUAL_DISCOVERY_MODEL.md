# Contextual Discovery Model — Phase 4.5

> **Version:** 1.0  
> **Phase:** 4.5 — Mobile-First Utility Pattern  
> **Branch:** `opus-architecture-reset`  
> **Last Updated:** 2025-12-11

---

## 1. Overview

This document defines how tools are ranked, categorized, and surfaced throughout Lucky Numbers. The model ensures users discover high-value tools quickly while maintaining cognitive load minimization.

### 1.1 Core Principle

**Progressive disclosure based on user intent:**
- First-time visitors see Tier S tools only
- Engaged users see Tier A tools
- Power users can browse full catalog

---

## 2. Tool Tiering System

### 2.1 Tier Definitions

| Tier | Definition | Count | Visibility |
|------|------------|-------|------------|
| **S** | Core RNG + fundamental math tools | 5 | Always visible above fold |
| **A** | High-value analysis + strategy tools | 12 | Visible on scroll / Tools tab |
| **B** | Specialized + niche tools | 15 | Tools tab only |
| **C** | Educational + reference tools | 12 | Tools tab + contextual links |

### 2.2 Tier S Tools (Always Prominent)

These tools deliver immediate value and represent Lucky Numbers' core offering.

| Tool | ID | Icon | Why Tier S |
|------|----|------|------------|
| Quick Draw Simulator | `quick-draw-simulator` | 🎲 | Core RNG experience |
| Probability Visualizer | `probability-visualizer` | 📊 | Visual odds understanding |
| Expected Value Calculator | `expected-value-calculator` | 🧮 | Fundamental math concept |
| Combination Calculator | `combination-calculator` | ⚡ | nCr is baseline math |
| Pick Generator | `pick-generator` | 🔢 | Daily games = high traffic |

### 2.3 Tier A Tools (High Value)

Analysis and strategy tools that extend the core experience.

| Tool | ID | Icon | Category |
|------|----|------|----------|
| Hot Numbers | `most-drawn-numbers` | 🔥 | Analysis |
| Cold Numbers | `least-drawn-numbers` | ❄️ | Analysis |
| Jackpot Split Calculator | `jackpot-split-calculator` | 💰 | Strategy |
| Number Trend Graph | `number-trend-graph` | 📈 | Analysis |
| Lottery Budget Planner | `lottery-budget` | 💵 | Budget |
| Ticket Beautifier | `ticket-beautifier` | ✨ | Utility |
| Common Combo Checker | `common-combo-checker` | 🔍 | Analysis |
| Break-Even Calculator | `break-even` | ⚖️ | Strategy |
| Odds Comparison | `odds-comparison` | 📋 | Education |
| Birthday Risk Checker | `birthday-risk-checker` | 🎂 | Strategy |
| Payout Calculator | `payout-calculator` | 💸 | Utility |
| Annuity Breakdown | `annuity-breakdown` | 📆 | Strategy |

### 2.4 Tier B Tools (Specialized)

Niche tools for specific use cases.

| Tool | ID | Category |
|------|-----|----------|
| Number Heatmap | `heatmap` | Visualization |
| Pattern Analyzer | `pattern-analyzer` | Analysis |
| Consecutive Checker | `consecutive-number-checker` | Analysis |
| Even/Odd Visualizer | `even-odd-ratio-visualizer` | Visualization |
| High/Low Analyzer | `high-low-ratio-analyzer` | Analysis |
| Number Spread | `number-spread-visualizer` | Visualization |
| Popularity Scorecard | `number-popularity-scorecard` | Analysis |
| Ticket Variance | `ticket-variance` | Analysis |
| Repeat Checker | `repeat-checker` | Analysis |
| Wheel Spinner | `wheel-spinner` | RNG |
| Raffle Picker | `raffle-picker` | RNG |
| Dice Roller | `dice-roller` | RNG |
| Coin Flip | `coin-flip` | RNG |
| Number Wheel | `number-wheel` | RNG |
| Card Picker | `card-picker` | RNG |

### 2.5 Tier C Tools (Educational)

Reference and learning tools.

| Tool | ID | Category |
|------|-----|----------|
| Beginners Guide | `beginners-lottery-guide` | Education |
| How Rare Is This | `how-rare-is-this` | Education |
| Why Odds Don't Change | `why-odds-dont-change` | Education |
| Lottery Math Quiz | `lottery-math-quiz` | Education |
| Expected Loss Calculator | `expected-loss-over-years` | Education |
| Probability Playground | `probability-playground` | Education |
| Is My Ticket Balanced | `is-my-ticket-balanced` | Education |
| Birthdate Mapper | `birthdate-mapper` | Personal |
| Lucky Colors | `lucky-colors-birth-month` | Personal |
| Winning Chance Simulator | `winning-chance-simulator` | Education |
| Random Color Generator | `random-color-generator` | Fun |

---

## 3. Discovery Surfaces

### 3.1 Homepage Tool Grid (Mobile)

**Location:** Below fold on mobile home
**Shows:** Tier S (always) + Tier A (first 4)

```
┌─────────────────────────────────────────────┐
│  TIER S (Top Row)                           │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ 🎲  │ │ 📊  │ │ 🧮  │ │ ⚡  │ │ 🔢  │   │
│  │Draw │ │Odds │ │ EV  │ │Combo│ │Pick │   │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘   │
│                                             │
│  TIER A (Second Row)                        │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │
│  │ 🔥  │ │ ❄️  │ │ 💰  │ │ 📈  │           │
│  │ Hot │ │Cold │ │Split│ │Trend│           │
│  └─────┘ └─────┘ └─────┘ └─────┘           │
│                                             │
│  [ View All Tools → ]                       │
└─────────────────────────────────────────────┘
```

### 3.2 Tools Tab (`/tools`)

**Location:** Accessible via bottom nav "Tools" tab
**Shows:** All tools, organized by category

```
┌─────────────────────────────────────────────┐
│  🔍 Search tools...                         │
├─────────────────────────────────────────────┤
│  FEATURED (Tier S)                          │
│  [Grid of 5 Tier S tools with descriptions] │
├─────────────────────────────────────────────┤
│  ANALYSIS                                   │
│  [Grid of analysis tools]                   │
├─────────────────────────────────────────────┤
│  STRATEGY                                   │
│  [Grid of strategy tools]                   │
├─────────────────────────────────────────────┤
│  VISUALIZATION                              │
│  [Grid of viz tools]                        │
├─────────────────────────────────────────────┤
│  EDUCATION                                  │
│  [Grid of edu tools]                        │
├─────────────────────────────────────────────┤
│  RNG & RANDOM                               │
│  [Grid of random tools]                     │
└─────────────────────────────────────────────┘
```

### 3.3 Contextual Recommendations

Each tool page shows 4 related tools based on:
1. Same category (primary)
2. Complementary function (secondary)
3. Natural workflow next-step (tertiary)

**Example:** On `expected-value-calculator`:
- Same category: `probability-visualizer` (Math)
- Complementary: `lottery-budget` (Budget planning uses EV)
- Next step: `odds-comparison` (Compare games by EV)
- Related: `expected-loss-over-years` (Long-term EV)

---

## 4. Ranking Algorithm

### 4.1 Default Sort Order

Tools are sorted by a composite score:

```
Score = (Tier × 100) + (Usage × 10) + (Freshness × 5)

Where:
- Tier: S=4, A=3, B=2, C=1
- Usage: Relative click frequency (0-10)
- Freshness: Days since last update (inverted, 0-10)
```

### 4.2 Category Grouping

Within each category, tools are sorted by:
1. Tier (S first)
2. Alphabetically (for same tier)

### 4.3 Search Ranking

When searching, results are ranked by:
1. Exact title match
2. Title contains query
3. Description contains query
4. Category match

---

## 5. Tool Metadata Schema

### 5.1 TypeScript Interface

```typescript
interface Tool {
  id: string;                    // URL slug
  title: string;                 // Display name
  shortTitle: string;            // For icon grid (≤10 chars)
  description: string;           // Full description
  shortDesc: string;             // For cards (≤50 chars)
  icon: string;                  // Emoji icon
  href: string;                  // Full path
  tier: 'S' | 'A' | 'B' | 'C';
  category: ToolCategory;
  tags: string[];                // Search keywords
  relatedTools: string[];        // IDs of related tools
  isNew?: boolean;               // Show "New" badge
  isFeatured?: boolean;          // Override for homepage
}

type ToolCategory = 
  | 'rng'
  | 'analysis'
  | 'strategy'
  | 'visualization'
  | 'education'
  | 'budget'
  | 'personal'
  | 'fun';
```

### 5.2 Data Location

Single source of truth: `src/config/toolIndex.ts`

This file exports:
- `tools: Tool[]` — Full tool list
- `getToolById(id: string): Tool`
- `getToolsByTier(tier: string): Tool[]`
- `getToolsByCategory(category: ToolCategory): Tool[]`
- `getFeaturedTools(): Tool[]` — Returns Tier S
- `getRelatedTools(id: string): Tool[]`

---

## 6. Visual Differentiation

### 6.1 Tier S Styling

```css
.tool-card.tier-s {
  background: var(--gradient-hero);
  border: 2px solid var(--accent-primary);
  box-shadow: var(--shadow-glow);
}

.tool-card.tier-s .tool-icon {
  font-size: 2.5rem;
}
```

### 6.2 Tier A Styling

```css
.tool-card.tier-a {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-primary);
}
```

### 6.3 Badge Indicators

- **NEW:** Green badge for tools added in last 30 days
- **FEATURED:** Star badge for manually promoted tools
- **POPULAR:** Fire badge for high-usage tools (future)

---

## 7. Implementation Requirements

### 7.1 Components Needed

| Component | Purpose |
|-----------|---------|
| `ToolGrid.astro` | Renders tool grid with tier styling |
| `ToolCard.astro` | Individual tool card (exists, needs tier support) |
| `RelatedTools.astro` | Contextual recommendations section |

### 7.2 Data Requirements

| File | Content |
|------|---------|
| `src/config/toolIndex.ts` | All tool metadata |
| `src/utils/toolHelpers.ts` | Query functions |

### 7.3 Migration

Existing tool lists (in `index.astro`, `lucky-v2-home-demo.astro`, etc.) should import from `toolIndex.ts` instead of inline arrays.

---

## 8. Related Documents

- [HOMEPAGE_ARCHITECTURE_PHASE_4.md](./HOMEPAGE_ARCHITECTURE_PHASE_4.md) — Homepage spec
- [HUB_ARCHITECTURE.md](./HUB_ARCHITECTURE.md) — Hub structure
- [mobile-ux.md](./mobile-ux.md) — Mobile UX requirements

---

*This model is canonical for Phase 4.5 tool discovery implementation.*
