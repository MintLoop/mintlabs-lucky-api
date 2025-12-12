# Phase 4.x UX Polish — DEMO-FIRST Implementation TODO

## DEMO-FIRST STAGING REQUIREMENT (NON-NEGOTIABLE)

All UX, UI, layout, navigation, and interaction changes MUST be implemented and validated in DEMO pages and DEMO components FIRST.

**Rules:**
- Production pages must NOT be modified directly
- All changes must land in `/demo/` (or `/pages/demo/`)
- Production equivalents may only be referenced, not edited
- Demo output must be fully functional and navigable
- Demo code is allowed to be exploratory but must be clean and intentional

**Workflow for each batch:**
1. Create demo equivalent of production file (if not exists)
2. Implement changes in demo file
3. Document the change
4. Add to "Production Migration Proposal" section (do NOT perform)

---

## Batch 1: Generator Dominance & Container Cleanup (Do First)

**Demo files created:**
- [x] `components/demo/GeneratorFormPolished.astro` — copy from `GeneratorForm.astro` with changes
- [x] `pages/demo/ux-polish.astro` — demo page showcasing ALL batches

**Changes implemented (in demo files):**
- [x] `GeneratorFormPolished.astro`: Removed `theme-bg-card p-4 rounded-2xl` wrapper
- [x] `GeneratorFormPolished.astro`: Added `shadow-xl rounded-2xl p-6 bg-[var(--bg-secondary)]` to `<form>`
- [x] `GeneratorFormPolished.astro`: Added `border-l-4 border-[var(--accent-primary)]` to form
- [x] `demo/ux-polish.astro`: Increased form margin `my-8`
- [x] `demo/ux-polish.astro`: Inline styles for `--bg-card` solid hex equivalents

**Production reference (DO NOT EDIT):**
- `GeneratorForm.astro`, `index.astro`, `global.css`

---

## Batch 2: Width & Alignment Normalization

**Demo implementation:** All changes in `pages/demo/ux-polish.astro`

**Changes implemented (in demo files):**
- [x] Added `:root { --content-max-width: 36rem; }` to inline styles
- [x] Changed `max-w-xl sm:max-w-2xl` to `max-w-[var(--content-max-width)]` on `<main>`
- [x] Header content inline (respects same max-width via parent)
- [x] ThemeToolBar: Removed `sm:justify-end`, using `justify-center`
- [x] Standardized `<main>` to `px-4 sm:px-6`

**Production reference (DO NOT EDIT):**
- `index.astro`, `InfoLayout.astro`, `SiteHeader.astro`, `ThemeToolBar.astro`, `global.css`

---

## Batch 3: Mobile Optimization

**Demo implementation:** All changes in `pages/demo/ux-polish.astro`

**Changes implemented (in demo files):**
- [x] SiteHeader: Added `hidden sm:block` to tagline `<p>`
- [x] ThemeToolBar: Wrapped in `hidden sm:flex`, moved to footer on mobile
- [x] EduGrid: Changed to `grid-cols-1 sm:grid-cols-2` (removed 3-col)
- [x] Wrapped EduGrid in `<details>`/`<summary>` (collapsed by default)
- [x] Moved `GameFacts` render to after `#results` section
- [ ] **TODO:** Verify generator button visible without scroll at 375px viewport height

**Production reference (DO NOT EDIT):**
- `SiteHeader.astro`, `ThemeToolBar.astro`, `EduGrid.astro`, `index.astro`

---

## Batch 4: Education Section Demotion

**Demo implementation:** All changes in `pages/demo/ux-polish.astro` (inline EduGrid)

**Changes implemented (in demo files):**
- [x] Removed `theme-bg-card`, `rounded-xl`, `border` from articles (using minimal `p-3` styling)
- [x] Reduced to 3 items max (Independence, Gambler's Fallacy, The Math)
- [x] Using `text-sm theme-text-muted` for descriptions
- [x] Added `<hr class="border-[var(--border-primary)] my-4">` above section
- [x] Added heading: "Learn More" with `text-xs uppercase tracking-wide` (in summary element)

**Production reference (DO NOT EDIT):**
- `EduGrid.astro`

---

## Batch 5: Contextual Tool Discovery (After Generation)

**Demo implementation:** Inline script in `pages/demo/ux-polish.astro`

**Changes implemented (in demo files):**
- [x] After successful generation, shows contextual link below results (MutationObserver)
- [x] Link format: `<a href="/lottery-odds">Why these odds? &rarr;</a>` styled as `text-sm underline theme-text-muted`
- [x] EduGrid collapsed on initial load via `<details>` element
- [x] EduGrid auto-opens after first generation

**Production reference (DO NOT EDIT):**
- `scripts/lucky.ts`

---

## Verification Checklist (Test in Demo)

**Test at:** `/demo/ux-polish`

- [ ] No nested card-on-card surfaces
- [ ] Generator has highest visual weight on page (shadow-xl, border-l-4 accent)
- [ ] All content sections align to single column (max-w-[36rem])
- [ ] Header visually centered
- [ ] Mobile: generator visible without scroll (375px viewport)
- [ ] Mobile: minimal non-essential content above fold (tagline hidden, theme in footer)
- [ ] Education feels secondary, not competitive (collapsed details, muted text)
- [ ] Tools appear as "next steps" not "alternatives" (contextual discovery after generation)

---

## Production Migration Proposal (Document Only)

After demo validation, apply these changes to production files:

| Demo Source | Production Target | Change Summary |
|-------------|------------------|----------------|
| `GeneratorFormPolished.astro` | `GeneratorForm.astro` | Replace `theme-bg-card p-4` with `shadow-xl p-6 bg-[var(--bg-secondary)] border-l-4 border-[var(--accent-primary)]` |
| `demo/ux-polish.astro` | `index.astro` | Add `my-8` wrapper around GeneratorForm |
| `demo/ux-polish.astro` | `global.css` | Add `:root { --content-max-width: 36rem; }` |
| `demo/ux-polish.astro` | `global.css` | Convert `--bg-card` rgba values to solid hex |
| `demo/ux-polish.astro` | `index.astro` | Change `max-w-xl sm:max-w-2xl` to `max-w-[var(--content-max-width)]` |
| `demo/ux-polish.astro` | `SiteHeader.astro` | Add `hidden sm:block` to tagline `<p>` |
| `demo/ux-polish.astro` | `ThemeToolBar.astro` | Add `hidden sm:flex`, remove `sm:justify-end`, add footer mobile version |
| `demo/ux-polish.astro` | `EduGrid.astro` | Reduce to 3 items, remove card styling, use `grid-cols-1 sm:grid-cols-2` |
| `demo/ux-polish.astro` | `index.astro` | Wrap EduGrid in `<details>` with "Learn More" summary |
| `demo/ux-polish.astro` | `lucky.ts` | Add contextual discovery link injection after generation |

### Detailed Migration Steps

**Step 1: global.css**
```css
:root {
  --content-max-width: 36rem;
  --bg-card: #1e293b; /* was rgba(30, 41, 59, 0.6) */
}
[data-theme="green-dark"] { --bg-card: #065f46; }
[data-theme="purple-dark"] { --bg-card: #3b2d7a; }
/* ... etc for all themes */
```

**Step 2: GeneratorForm.astro line 5**
```diff
- <form id="genForm" class="space-y-4 theme-bg-card p-4 rounded-2xl">
+ <form id="genForm" class="space-y-4 shadow-xl rounded-2xl p-6 bg-[var(--bg-secondary)] border-l-4 border-[var(--accent-primary)]">
```

**Step 3: index.astro**
- Wrap GeneratorForm in `<div class="my-8">`
- Change main `max-w-xl sm:max-w-2xl` to `max-w-[var(--content-max-width)]`
- Change `p-6` to `px-4 sm:px-6`

**Step 4: SiteHeader.astro line 20-22**
```diff
- <p class="mt-1 text-center theme-text-secondary text-sm">
+ <p class="hidden sm:block mt-1 text-center theme-text-secondary text-sm">
```

**Step 5: ThemeToolBar.astro**
- Add `hidden sm:flex` to wrapper
- Remove `sm:justify-end`, use `justify-center`
- Add mobile version in footer of index.astro

**Step 6: EduGrid.astro**
- Reduce articles to 3 items
- Remove `theme-bg-card p-4 rounded-xl` from articles
- Change grid to `grid-cols-1 sm:grid-cols-2`
- Wrap in `<details><summary>Learn More</summary>...</details>`

---

## Do NOT Touch (Production Files)

- Backend files (`mintlabs-lucky-api/*`)
- Route URLs
- Form field `name` attributes
- Theme token names
- `terms.astro`, `privacy.astro` content
- **Any production page or component directly**
