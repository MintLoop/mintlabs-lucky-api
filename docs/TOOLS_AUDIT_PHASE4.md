# Phase 4 Tools Audit — Current Inventory & Expansion Opportunities

**Date:** December 9, 2025  
**Branch:** `feature/ui-contrast-phase-4`  
**Purpose:** Audit existing tools and identify next microtools to build

---

## Current Tool Inventory (30 Tools)

### 🎯 Core Tools (Production-Ready)
1. **pick-generator.astro** — Main RNG generator (homepage)
2. **ticket-beautifier.astro** — Export/beautify tickets
3. **probability-visualizer.astro** — Visual probability demos
4. **combination-calculator.astro** — nCr calculator
5. **odds-comparison.astro** — Multi-lottery odds table
6. **repeat-checker.astro** — Check if numbers repeated

### 📊 Analysis & Statistics Tools
7. **most-drawn-numbers.astro** — Top 10 most drawn
8. **least-drawn-numbers.astro** — Top 10 least drawn
9. **hot-cold-numbers.astro** — Hot/cold analysis
10. **pattern-analyzer.astro** — Pattern detection
11. **number-trend-graph.astro** — Trend visualization
12. **heatmap.astro** — Draw frequency heatmap
13. **ticket-variance.astro** — Variance analysis

### 🎲 Probability & Math Tools
14. **expected-value-calculator.astro** — EV calculator
15. **expected-loss-over-years.astro** — Long-term loss projection
16. **winning-chance.astro** — Win probability calculator
17. **winning-chance-simulator.astro** — Monte Carlo simulator
18. **why-odds-dont-change.astro** — Educational explainer
19. **how-rare-is-this.astro** — Rarity calculator
20. **probability-playground.astro** — Interactive probability demos

### 💰 Financial Tools
21. **annuity-breakdown.astro** — Annuity vs lump sum
22. **payout-calculator.astro** — Prize tier calculator
23. **jackpot-split-calculator.astro** — Split calculator
24. **lottery-budget.astro** — Budget planner
25. **break-even.astro** — Break-even analysis

### 🎮 Interactive & Educational
26. **quick-draw-simulator.astro** — Quick draw game
27. **lottery-math-quiz.astro** — Math quiz
28. **number-wheel.astro** — Visual number picker
29. **common-combo-checker.astro** — Common combo checker

### 🎨 Personalization Tools
30. **birthdate-mapper.astro** — Birthday → lottery numbers

---

## Tool Architecture Patterns

### Standard Layout Pattern
Most tools use **InfoLayout** component:
```astro
import InfoLayout from "../../components/InfoLayout.astro";

<InfoLayout
  title="Tool Name"
  subtitle="Description"
  pageTitle={seoTitle}
  description={seoDescription}
>
  <div slot="teaser"><!-- Tool intro --></div>
  <section class="tool-section"><!-- Tool UI --></section>
</InfoLayout>
```

### Styling Patterns
- **No ToolCard component exists** — tools use `.tool-section` and `.card` classes
- Uses global tokens: `--surface`, `--border-primary`, etc.
- Homepage carousel uses `.tool-card` class for links

---

## Gaps & Opportunities for Phase 4 Expansion

### 🎯 Lightweight RNG Tools (PRIORITY)
**Missing simple, fun generators:**
- [ ] **Dice Roller** — Multi-sided dice simulator (d4, d6, d8, d10, d12, d20)
- [ ] **Coin Flip** — Simple heads/tails with streak tracking
- [ ] **Card Picker** — Random playing card generator
- [ ] **Random Color Generator** — Hex/RGB color with lucky color meaning

**Rationale:** Quick, engaging tools for homepage carousel rotation

### 🌈 Color & Trait Generators
**Personalization microtools:**
- [ ] **Lucky Colors by Birth Month** — Birthstone colors + meanings
- [ ] **Lucky Colors by Zodiac** — Astrological color associations
- [ ] **Personality Trait Mapper** — Birthday → personality traits (numerology-lite)
- [ ] **Zodiac Compatibility** — Compare two zodiac signs

**Rationale:** Complements existing `birthdate-mapper.astro`, adds personality element

### 🎰 Casino-Lite Experimental
**Probability demos disguised as games:**
- [ ] **Slot Machine Simulator** — 3-reel slot with odds display
- [ ] **Roulette Probability** — Bet tracking + house edge demo
- [ ] **Blackjack Expected Value** — Hand odds calculator
- [ ] **Dice Distribution Graph** — Sum distribution for multiple dice

**Rationale:** Fun way to teach probability concepts; experimental label required

### 📊 Visualization Microtools
**Chart-focused mini-tools:**
- [ ] **Odds Bar Chart** — Visual comparison of lottery odds
- [ ] **Distribution Bell Curve** — Normal distribution visualizer
- [ ] **Win Rate Timeline** — Probability over multiple plays
- [ ] **Jackpot Growth Chart** — Historical jackpot trends (if data available)

**Rationale:** Complements existing probability tools with more visuals

### 🔮 Lucky Profile Extensions
**Enhancements to Lucky Profile system:**
- [ ] **Mini Profile Analyzer** — Quick trait summary widget
- [ ] **Profile Comparison** — Compare two profiles
- [ ] **Lucky Number Generator** — Profile-based number picker
- [ ] **Profile Share Card** — Social media export of profile

**Rationale:** Build on existing Lucky Profile feature (already implemented)

---

## Recommended Build Order (Phase 4)

### Sprint 1: Lightweight RNG (Quick Wins)
1. **Dice Roller** — Simplest to implement, high engagement
2. **Coin Flip** — Single boolean with animations
3. **Card Picker** — 52-card deck with suit icons

**Estimated effort:** 2-3 hours per tool  
**Value:** High (carousel-eligible, low complexity)

### Sprint 2: Color & Personalization
4. **Lucky Colors by Birth Month** — Use existing birthstone data
5. **Lucky Colors by Zodiac** — Extend with zodiac associations
6. **Personality Trait Mapper** — Numerology-lite calculations

**Estimated effort:** 3-4 hours per tool  
**Value:** Medium (complements birthdate-mapper)

### Sprint 3: Casino-Lite (Experimental)
7. **Slot Machine Simulator** — Visual animations + odds
8. **Dice Distribution Graph** — Chart.js or canvas-based
9. **Roulette Probability** — Bet tracking + education

**Estimated effort:** 4-6 hours per tool  
**Value:** High (education + engagement), requires "experimental" label

### Sprint 4: Visualization Extensions
10. **Odds Bar Chart** — Use existing odds-comparison data
11. **Distribution Bell Curve** — Statistical visualization
12. **Profile Share Card** — Export Lucky Profile as image

**Estimated effort:** 3-5 hours per tool  
**Value:** Medium (complements existing tools)

---

## Token Compliance Checklist (ALL New Tools)

For EACH new microtool, verify:
- [ ] Uses `--surface`, `--surface-elevated`, `--surface-hover` for backgrounds
- [ ] Uses `--border-primary`, `--border-primary-darker` for borders
- [ ] Uses `--card-shadow` for depth effects
- [ ] Uses `getContrastColor()` for dynamic text colors
- [ ] No hardcoded colors (inline styles or component CSS)
- [ ] Tested in BOTH light and dark themes
- [ ] Mobile responsive (320px-768px)
- [ ] Desktop optimized (1024px+)
- [ ] Follows InfoLayout pattern (or equivalent)
- [ ] Added to homepage carousel (if carousel-eligible)
- [ ] Documented in visual-audit-phase-4.md

---

## Next Steps

1. **Choose first tool:** Dice Roller (simplest, highest engagement)
2. **Create scaffold:** Use InfoLayout + global tokens only
3. **Implement logic:** Client-side RNG + animations
4. **Run checklists:** Contrast agent + audit agent
5. **Build & verify:** `npm run build` + visual QA
6. **Commit:** `git commit -m "Add microtool: Dice Roller (Phase 4)"`
7. **Repeat** for next tool in build order

---

## Data Dependencies

### Available Data Files
- `data/birthstones.json` — Birth month associations
- `data/color_wheel.json` — Color palettes and meanings
- `data/rashis.json` — Zodiac/rashi data

### May Need New Data
- Playing card suits/ranks (can generate programmatically)
- Zodiac compatibility matrix (if building compatibility tool)
- Casino game probabilities (house edge calculations)
- Personality trait mappings (numerology formulas)

---

**Status:** Ready to begin Sprint 1 (Lightweight RNG tools)  
**Recommended start:** Dice Roller → Coin Flip → Card Picker
