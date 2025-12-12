# Phase 4.5 Repository Inventory

> **Generated:** 2025-12-11  
> **Branch:** `opus-architecture-reset`  
> **Purpose:** Complete inventory of routes, components, and tokens before Phase 4.5 mobile-first refactor

---

## A. Route Inventory

### A.1 Top-Level Pages (`/src/pages/`)

| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/` | `index.astro` | Production home (carousel-based) | Production |
| `/lucky-v2-demo` | `lucky-v2-demo.astro` | V2 design system showcase | Demo |
| `/lucky-v2-home-demo` | `lucky-v2-home-demo.astro` | V2 home reimplementation | Demo |
| `/lucky-profile` | `lucky-profile.astro` | Birthstone/Rashi/Color profile | Production |
| `/casino-lite` | `casino-lite.astro` | Casino hub page | Production |
| `/faq` | `faq.astro` | FAQ page | Production |
| `/lottery-math` | `lottery-math.astro` | Math education | Production |
| `/lottery-odds` | `lottery-odds.astro` | Odds education | Production |
| `/privacy` | `privacy.astro` | Privacy policy | Production |
| `/terms` | `terms.astro` | Terms of service | Production |

### A.2 Demo Pages (`/src/pages/demo/`)

| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/demo/home-v2-polish` | `home-v2-polish.astro` | Latest demo home with v2 tokens | Demo - Active |

### A.3 Tools Pages (`/src/pages/tools/`) — 44 Tools Total

**Tier S (Core RNG + Math):**
- `combination-calculator.astro` — nCr calculator
- `expected-value-calculator.astro` — EV computation
- `probability-visualizer.astro` — Visual odds simulation
- `quick-draw-simulator.astro` — Multi-game draw sim
- `pick-generator.astro` — Pick-3/4 generator

**Tier A (Analysis + Strategy):**
- `annuity-breakdown.astro` — Payout visualizer
- `birthdate-mapper.astro` — Birthday number mapping
- `birthday-risk-checker.astro` — Split probability
- `break-even.astro` — Break-even calculator
- `coin-flip.astro` — Fair coin simulator
- `common-combo-checker.astro` — Popular combo analysis
- `consecutive-number-checker.astro` — Sequence detection
- `dice-roller.astro` — Dice simulator
- `even-odd-ratio-visualizer.astro` — E/O balance
- `expected-loss-over-years.astro` — Long-term loss calc
- `heatmap.astro` — Number frequency heatmap
- `high-low-ratio-analyzer.astro` — Range distribution
- `hot-cold-numbers.astro` — Frequency analysis
- `how-rare-is-this.astro` — Probability analogies
- `is-my-ticket-balanced.astro` — Multi-metric balance
- `jackpot-split-calculator.astro` — Winner split calc
- `least-drawn-numbers.astro` — Cold numbers
- `lottery-budget.astro` — Budget planner
- `lottery-math-quiz.astro` — Education quiz
- `lucky-colors-birth-month.astro` — Color mapping
- `most-drawn-numbers.astro` — Hot numbers
- `number-popularity-scorecard.astro` — Composite scoring
- `number-spread-visualizer.astro` — Gap analysis
- `number-trend-graph.astro` — Trend visualization
- `number-wheel.astro` — Wheel generator
- `odds-comparison.astro` — Game odds comparison
- `pattern-analyzer.astro` — Pattern detection
- `payout-calculator.astro` — Payout computation
- `probability-playground.astro` — Interactive sim
- `raffle-picker.astro` — Raffle generator
- `random-color-generator.astro` — Color RNG
- `repeat-checker.astro` — Repeat analysis
- `ticket-beautifier.astro` — Ticket export
- `ticket-variance.astro` — Variance analysis
- `wheel-spinner.astro` — Wheel UI
- `why-odds-dont-change.astro` — Education
- `winning-chance-simulator.astro` — Win probability
- `card-picker.astro` — Card selection
- `beginners-lottery-guide.astro` — Education

### A.4 Casino-Lite Pages (`/src/pages/casino-lite/`)

| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/casino-lite/blackjack` | `blackjack.astro` | Blackjack simulator | Production |
| `/casino-lite/dice-roller` | `dice-roller.astro` | Casino dice | Production |
| `/casino-lite/high-card` | `high-card.astro` | High card game | Stub |
| `/casino-lite/war` | `war.astro` | War card game | Stub |

### A.5 Archive Pages (`/src/pages/archive/`)
- Historical results (structure TBD)

---

## B. Component Inventory

### B.1 Core UI Components (`/src/components/ui/`)

| Component | Purpose | Token-Driven | Demo-Ready |
|-----------|---------|--------------|------------|
| `GameCard.astro` | Game selection card | ✅ | ✅ |
| `InfoBlurb.astro` | Educational callouts | ✅ | ✅ |
| `PageHero.astro` | Hero sections | ✅ | ✅ |
| `SectionHeader.astro` | Section titles | ✅ | ✅ |
| `SoftCard.astro` | Soft shadow cards | ✅ | ✅ |
| `ThemePicker.astro` | Theme selector | ✅ | ✅ |
| `ToolCard.astro` | Tool card display | ✅ | ✅ |

### B.2 Demo Components (`/src/components/demo/`)

| Component | Purpose | Notes |
|-----------|---------|-------|
| `DemoCarousel.astro` | Tools carousel | Uses carousel CSS |
| `DemoEduGrid.astro` | Education grid | Filterable |
| `DemoFeatureCard.astro` | Feature promotion | Accent/elevated variants |
| `DemoGeneratorContainer.astro` | Generator wrapper | Token surfaces |
| `DemoHeader.astro` | Demo header | Minimal |
| `DemoThemeToolbar.astro` | Theme controls | Compact |

### B.3 Discovery Components (`/src/components/discovery/`)

| Component | Purpose | Notes |
|-----------|---------|-------|
| `SearchBar.astro` | Debounced search | Emits `searchChange` |
| `FilterChips.astro` | Category filters | Emits `filterChange` |

### B.4 Casino Components (`/src/components/casino/`)

| Component | Purpose | Notes |
|-----------|---------|-------|
| `CardView.astro` | Card rendering | WebP + JPEG fallback |
| `DeckSelector.astro` | Deck theme picker | 7 themes |
| `DiceView.astro` | Dice rendering | SVG-based |

### B.5 Legacy/Production Components (`/src/components/`)

| Component | Purpose | Migration Status |
|-----------|---------|------------------|
| `GeneratorForm.astro` | RNG form | Needs mobile refactor |
| `SiteHeader.astro` | Site header | Needs mobile nav |
| `ThemeToolBar.astro` | Theme selector | Legacy; replaced by ThemePicker |
| `EduGrid.astro` | Education links | Legacy; replaced by DemoEduGrid |
| `GameFacts.astro` | Game info display | Keep |
| `TrackLink.astro` | Analytics-tracked links | Keep |
| `NewsletterModal.astro` | Newsletter signup | Keep |
| `TermsModal.astro` | Terms modal | Keep |
| `PrivacyModal.astro` | Privacy modal | Keep |
| `InfoLayout.astro` | Tool page wrapper | Keep |

---

## C. Token/Surface Inventory

### C.1 Core Tokens (`/src/styles/tokens.css`)

**Color System:**
- Neutrals: `--color-gray-50` through `--color-gray-900`
- Brand: `--color-emerald-400` through `--color-emerald-700`
- Semantic: `--color-success`, `--color-warning`, `--color-error`, `--color-info`

**Theme Tokens (runtime overridable):**
- Backgrounds: `--bg-base`, `--bg-surface-1`, `--bg-surface-2`, `--bg-surface-elevated`, `--bg-blur`
- Text: `--text-primary`, `--text-secondary`, `--text-muted`, `--text-on-accent`
- Borders: `--border-primary`, `--border-secondary`, `--border-accent`
- Accents: `--accent-primary`, `--accent-secondary`, `--accent-warning`, `--accent-success`, `--accent-error`

**Gradients:**
- `--gradient-hero`, `--gradient-card-glow`, `--gradient-theme-accent`, `--gradient-soft-shadow`

**Shadows:**
- `--shadow-soft-xs` through `--shadow-soft-xl`
- `--shadow-glow`

**Spacing:**
- `--space-xs` (8px) through `--space-3xl` (64px)
- `--cluster-gap-4/6/8/12`

**Typography:**
- Font families: `--font-sans`, `--font-mono`
- Sizes: `--text-xs` through `--text-5xl`
- Weights: `--font-weight-normal/medium/semibold/bold`

**Animation:**
- Durations: `--duration-fast/normal/slow`
- Easings: `--ease-in/out/in-out`

### C.2 Demo-Scoped Tokens

Applied via `[data-demo]` attribute:

- `--surface-generator-outer` / `--surface-generator-inner`
- `--surface-card` / `--surface-card-soft`
- `--surface-results` / `--text-results-primary`
- `--surface-page`
- `--text-strong` / `--text-body` / `--text-link`
- `--border-subtle` / `--border-generator` / `--border-results`

### C.3 Onion-Effect Sources (Problem Areas)

Current nested surface patterns causing visual onion-effect:

1. **SoftCard inside SoftCard** — Feature cards sometimes wrap SoftCard in another surface
2. **DemoGeneratorContainer** — Triple-layer: page → outer surface → inner surface → form
3. **InfoLayout** — Legacy wrapper with its own background + child cards
4. **Demo shells** — `.demo-shell` + `.demo-container` + `.demo-column` nesting

**Resolution Strategy:**
- Flatten to single surface per semantic block
- Use direct token references instead of nested wrappers
- Mobile-first layout removes intermediate containers

---

## D. Theme Registry (`/src/themes/index.ts`)

### D.1 Available Themes (11 total)

**Seasonal (5):**
- `winter-mint` — Cool greens + icy blues
- `lunar-gold` — Warm gold + deep navy
- `spring-blossom` — Soft pink + fresh green
- `summer-citrus` — Bright orange + sunny yellow
- `autumn-ember` — Warm orange + deep red

**Kawaii (3):**
- `kawaii-mochi` — Pastel pink + mint
- `lucky-cat-charm` — Gold + red + cream
- `minty-bear` — Soft mint + brown accents

**Premium (3):**
- `neon-vaporwave` — Magenta + cyan + purple
- `midnight-velvet` — Deep purple + gold
- `linen-ivory` — Cream + warm browns

### D.2 Legacy Themes (in `global.css`)

Production `index.astro` uses legacy theme system:
- `green-dark` (default)
- `green-light`
- ~14 other color variants

**Migration Required:** Unify theme systems in Phase 4.5

---

## E. Script/Entry Points

### E.1 Entry Scripts
- `/public/scripts/entry.js` — Main bundle entry
- `/src/scripts/lucky.ts` — Core RNG logic
- `/src/scripts/tracking.ts` — Analytics wrapper

### E.2 Page-Specific Scripts
- GeneratorForm inline script (mode conditionals)
- Carousel auto-scroll logic
- Theme switching logic

---

## F. Test Coverage

### F.1 Playwright Tests (`/tests/`)

**Demo Tests:**
- `demo/demo-home-v2.spec.ts` — V2 home demo
- `demo/demo-visual.spec.ts` — Visual regression

**Tool Tests (representative):**
- `combination-calculator.spec.ts`
- `probability-visualizer.spec.ts`
- `ticket-beautifier.spec.ts`
- `quick-draw-simulator.spec.ts` (via `generator.spec.ts`)

**Feature Tests:**
- `lucky-profile.spec.ts`
- `analytics-and-newsletter.spec.ts`

---

## G. Key Observations for Phase 4.5

### G.1 What Works
- Token system is comprehensive and well-structured
- Demo components are properly isolated
- Theme registry supports runtime switching
- UI primitives (SoftCard, etc.) are solid

### G.2 What Needs Work
- **No mobile navigation** — No bottom nav exists
- **No single tool index** — Tools are listed inline in multiple places
- **Homepage is desktop-first** — Hero copy, carousel, no mobile optimization
- **Onion-effect** — Too many nested surfaces
- **Two theme systems** — Legacy (global.css) vs new (themes/index.ts)

### G.3 Phase 4.5 Targets
1. Create `BottomNav.astro` component
2. Create `toolIndex.ts` single source of truth
3. Create `NumberRow.astro` for consistent number display
4. Add mobile tokens to `tokens.css`
5. Implement mobile-first index (demo-safe)
6. Stub pages for Budget, Profile tabs
