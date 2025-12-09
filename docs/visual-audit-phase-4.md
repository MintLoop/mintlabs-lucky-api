# Visual & Readability Audit — Phase 4 (initial pass)

This document records the manual snapshot checks I performed after implementing the theme-token / contrast / layout changes across Lucky pages. It lists pages checked, brief findings, and follow-up items for components that still need work.

Pages (checked):
- /index (main landing) — light/dark
- /lucky-profile — light/dark
- /tools/odds-comparison — light/dark
- /tools/combination-calculator — light/dark
- /tools/ticket-beautifier — light/dark
- /tools/quick-draw-simulator — light/dark
- /tools/repeat-checker — light/dark

Summary of findings (initial):

- Most major UI containers (cards, panels, banners, dropdowns) were updated to use tokens: `--surface`, `--surface-hover`, `--text-primary`, `--text-secondary`, and `--border-primary`.
- Lucky Profile: color chips now use auto-contrast (label text is computed). The result panel and trait chips use theme surface and border tokens.
- Odds Comparison & Combination Calculator: core panels switched to `theme-surface` and `theme-border-primary` — table headers updated to `--text-secondary` and row hover uses `--surface-hover`.
- Repeat Checker: dynamic number chips/status chips get text-color adjusted after rendering (auto-contrast).
- Global select/dropdown inputs default styling now respects `--input-bg`, `--border-primary`, and `--text-primary`.

Follow-ups (need additional passes):

- Several pages and ephemeral CTA buttons still use hard-coded color utility classes (bg-emerald-600, text-white) — primarily call-to-action buttons and small link pills. These still need tokenized variants so color + text contrast is consistent across themes.
- Many gradient-heavy banners still exist (various tool pages). I replaced a few major ones, but more pages should get a consistent overlay or swap to `theme-surface` when text overlaps the gradient.
- Needs visual regression pixel checks (CI) to capture any theme-edge cases after changes. I previously started scaffolding in `package.json` but installation of pixelmatch/pngjs was interrupted — next step is to complete that integration and produce golden images for the main pages and variants.

Next steps:
1. Sweep prominent CTA buttons and link pills and replace one-off bg/text classes with `theme-accent-primary` + computed readable color or design an `accent-cta` utility.
2. Convert remaining gradient banners to token surface + small accent layer, or add solid overlay boxes behind text in places where gradient reduces readability.
3. Finish the pixel-level visual regression integration (install pixelmatch/pngjs, add golden images for `index`, `lucky-profile`, `ticket-beautifier`, `probability-visualizer`) and turn on a CI job to run checks.
4. Continue the component-by-component theme token sweep until there are no remaining literal `bg-`, `text-` or `border-` utility usages in the core Lucky UI.

If you'd like, I can continue immediately and sweep additional pages in batches (e.g., cycle 10 pages per change) and open PRs with smaller scoped diffs so review is easier.
