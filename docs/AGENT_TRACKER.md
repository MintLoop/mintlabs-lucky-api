# Agent Tracker

| Phase | Owner | Branch | Status | Notes |
| ----- | ----- | ------ | ------ | ----- |
| 11 – Deployment / CI fixes | **GitHub Copilot** | `fix/ruff-lint` | 🔁 Ready for PR | Fixed frontend ESLint & .astro parse errors, restored raffle/wheel tool styles to `src/styles/hub.css`, updated docs for Vercel secret `api_base_url`. Local lint clean; needs remote CI run after PR push. |
| Tooling – Lockfile | **GitHub Copilot** | `chore/update-frontend-lockfile` | 🔁 In Progress | Update `package-lock.json` to match `package.json` and fix CI `npm ci` build. |
| 1 – Automation Gatekeeper | Claude 4.5 | main | ✅ Done | Fixed 500s (psycopg3 prepare=False), token bucket rate limiter, request tracing, frontend 429 UX, analytics. |
| 2 – Reliability Ops | Claude 4.5 | phase-2-reliability | ✅ Done | Game config validation (400s), /health + /readyz split, /stats gated with ADMIN_TOKEN, DB tests, log format frozen. |
| 3 – Security Hardening | Claude 4.5 | phase-2-reliability | ✅ Done | Security headers, error shape freeze, admin endpoint hardening, rate limit tiers, RUNBOOK security docs. |
| 4 – Feature Wave 1 | GitHub Copilot / Grok Code Fast 1 (Raptor mini (Preview)), Codex (gpt-5.1-codex-max) | phase-4-usability-ux | 🔄 In Progress | Phase 4.1 (14 tools) ✅ Complete. Phase 4.2: Building 53 microtools for SEO expansion. Tier S Wave 1 (5/5) ✅ Complete: Combination Calculator, Common Combo Checker, Expected Value Calculator, Jackpot Split Calculator, Quick Draw Simulator. 26 pages built successfully. UX Standardization: ✅ Added theme selector to InfoLayout, ✅ Updated Quick Draw Simulator to use InfoLayout and theme-aware styling, ✅ Fixed Expected Value Calculator and Combination Calculator visibility issues by replacing hardcoded colors with theme-aware CSS variables. All calculator boxes now have proper dark backgrounds with light text for good contrast across all 16 themes. ✅ **Repeat Checker Restructured** (Grok Code Fast 1): Converted from separate cards to single unified report card format matching Quick Draw Simulator, with distinct bordered number balls, mini report layout, status indicators, and improved visual hierarchy. ✅ Follow-up (Codex: gpt-5.1-codex-max): Rectangular styling for balls/chips, spacing cleanup, label shortening, added standardized “Generate Random” button to Common Combo Checker, added /tools/winning-chance alias wrapper, intensified Ticket Beautifier themes (canvas + preview) with AI pros/cons guidance, per-theme filenames, and hidden canvas markers for QA. Build verified: 26 pages compile successfully. Continuing UX polish on remaining tools. |
| 4.5 – Demo-first UX refactor | Codex (gpt-5.1-codex-max) | opus-architecture-reset | 🔄 In Progress | Base aa10598a517b5394096812115abf400e0d894b99. Demo-first Lucky Numbers refactor: new ball-rendering experiment page under /demo using forked lucky script. |
| 4d – Themed RNG Modes | GitHub Copilot (Raptor mini (Preview)) | feature/phase-4-themes | ✅ Done | Replaced free-text seed inputs with bounded themed selectors (zodiac, chinese_zodiac, favorite_color, gemstone, jyotish, star_sign). Added `src/data/modeConfig.ts` + `app/mode_config.py`. API now accepts `mode_key` for themed selections; `GenerateResp` includes `mode_key`. Frontend updates: `GeneratorForm` shows a themed secondary dropdown and displays a small badge on results. Playwright tests updated. |
| 4b – Measurement & Growth | GitHub Copilot (Raptor mini (Preview)) | feature/phase-4-merged | 🔃 PR open | Combined full tools set + analytics/newsletter: merged `feature/ticket-beautifier-export-parity` (15 tools) with `feature/phase-4-analytics-newsletter` (client tracking, newsletter modal, tests, docs). Branch pushed: https://github.com/MintLoop/mintlabs-lucky-api/pull/new/feature/phase-4-merged |
| 4c – Visualizer polish | GitHub Copilot (Raptor mini (Preview)) | feature/phase-4-visualizer-fixes | ✅ Done | Visual and UX polish for `probability-visualizer`: added densities (20,100), larger/bolder icons, fuzzy hit-area and proximity clicks, persistent spotlight modal, per-game ticket-price display, winner click counts as an attempt, improved modal copy and tests updated (Playwright: tests pass locally). Branch pushed: https://github.com/MintLoop/mintlabs-lucky-api/compare/feature/phase-4-visualizer-fixes |
| 4e – UI Contrast & Handoff | contrast-agent / homepage-agent / audit-agent | feature/ui-contrast-phase-4 | 🔁 Ready for review | Global token refinement and homepage elevation polish. Focused on UX/readability only (no new features). Includes recovered Phase‑4 visualizer artifacts, light/dark elevation rules, .card-elevated utility, CTA foreground rules, responsive tweaks, and Playwright DPR parity tests + visual regression scaffolding (pixelmatch staged). QA checklist in phase brief. |
| 5 – SEO Farming | _TBD_ | phase-5-seo | Blocked | Lucky-by-date, birthday, zodiac, hot/cold clusters, content hubs, schema markup. |
| 6 – Performance QA | _TBD_ | phase-6-performance | Blocked | Lighthouse ≥95, backend caching, load testing, cross-browser QA. |
| 7 – Monetization | _TBD_ | phase-7-monetization | Blocked | Ads, affiliates, ethical financial tools, premium modes. |
| 8 – Historical Data | _TBD_ | phase-8-historical | Blocked | Draw history, streak analysis, repeated numbers, simulations. |
| 9 – Ecosystem Integration | _TBD_ | phase-9-ecosystem | Blocked | Cross-promote MintScale, MintLabs, MintWorks, MintDrop. |
| 10 – PWA / Mobile | _TBD_ | phase-10-pwa | Blocked | Installable app, notifications, offline use. |
| Lucky Profile Generator | GitHub Copilot (Claude Sonnet 4.5) | feature/phase-4-visualizer-fixes | ✅ Done | **Pure client-side implementation** (no backend required). Birthstone × Rashi × Color Wheel synthesis. Created static data files: `src/data/birthstones.ts` (12 months), `src/data/rashis.ts` (12 zodiac signs), `src/data/colorWheel.ts` (18 colors). Pure function in `src/lib/luckyProfile.ts` synthesizes all three → lucky focus, actions, numbers. Page `/lucky-profile` uses 3-part selector (birth month, rashi, color grid) with optional spiritual filters. Zero API calls, zero database. All computation in browser. Build verified: 33 pages successful. Docs: `IMPLEMENTATION_LUCKY_PROFILE.md`. |

## Hand-off Log

- 2025-12-11 – **Phase 4.5 UX Refactor + Mobile-First IN PROGRESS** (Opus 4.5 — opus-architecture-reset): Major architecture reset for mobile-first utility pattern. **Decisions:** Demo strategy = Fork `/demo-v3/` (deprecate old demo after QA). Homepage role = Outcome Engine (numbers first, tools discoverable). **Documentation complete (8/8):** PHASE_4_5_REPO_INVENTORY.md (comprehensive repo audit), HOMEPAGE_ARCHITECTURE_DECISION.md (executive decisions), HOMEPAGE_ARCHITECTURE_PHASE_4.md (homepage spec as flow), CONTEXTUAL_DISCOVERY_MODEL.md (tool tiering S/A/B/C), HUB_ARCHITECTURE.md (bottom nav routing contract), mobile-ux.md (utility-app pattern spec + QA checklist), DOCUMENTATION_AUDIT_PRUNE.md (doc cleanup plan), PHASE_STRUCTURE.md (phase overview). **Code in progress:** toolIndex.ts, BottomNav.astro, NumberRow.astro, tokens.css mobile updates, demo-v3/index.astro. See `/docs/LUCKY/WORKFLOWS/` for all specs.
- 2025-12-11 – **Demo home generator/edu polish IN PROGRESS** (Codex — feature/card-themes-phase-4-3): Flattened the demo generator into a single-card surface with lighter inner form fill across themes, refreshed JS color lift for dark/light parity, reverted the edu section to a vertical guide grid with distinct topics + "View all guides" link, and updated demo tests for the new guide titles.
- 2024-09-09 – Phase 1 automation updates staged on `phase-1-automation`: CI workflow, docs, Vercel secrets guidance ready for review.
- 2025-10-21 – Phase 1 PR opened from `phase-1-automation` (link TBD); awaiting reviewer sign-off.
- 2025-12-04 – **Phase 1 COMPLETE**: Fixed psycopg3 prepared statement bugs (prepare=False on all queries), replaced fixed-window rate limiter with token bucket (120/min, burst 20), added request tracing middleware (X-Request-ID), global exception handlers, frontend 429 toast + button cooldown, /stats analytics endpoint. All tests pass.
- 2025-12-04 – **Phase 2 COMPLETE**: 
  - `/stats` gated with `ADMIN_TOKEN` env var (empty = open in dev)
  - `_validate_game_config()` returns 400 for impossible configs (bad ranges, infeasible sum targets, out-of-range lucky numbers)
  - Split `/health` (liveness, no DB) and `/readyz` (readiness, DB ping)
  - Log format frozen: `[REQ]`, `[GEN]`, `[ERR]` prefixes documented in RUNBOOK.md
  - Added `tests/test_db.py` and validation tests in `test_api_integration.py`
- 2025-12-05 – **Phase 3 COMPLETE**:
  - Security headers middleware (CSP, X-Frame-Options, X-Content-Type-Options, HSTS, Permissions-Policy, Referrer-Policy)
  - Error response shape frozen: `{"error": "<type>:<code>", "request_id": "...", "status": <int>}`
  - Admin endpoint hardening: `/stats` returns 404 (not 401) on auth failure
  - Rate limit tiers: admin paths (10/min, burst 3) vs normal (120/min, burst 20)
  - RUNBOOK.md expanded: Sections 6.5-6.10 documenting error shape, security headers, rate limiting, admin security, DB guardrails, Supabase key safety
  - Tests updated for new error response shape
  - 36 tests pass, 83% coverage
- 2025-12-05 – **Phase 4.2 UX Standardization COMPLETE**: Fixed calculator box visibility issues in Expected Value Calculator and Combination Calculator by replacing all hardcoded colors (background: white, color: #374151, etc.) with theme-aware CSS variables (--bg-card, --text-primary, --border-primary, etc.). All calculator boxes now have proper dark backgrounds with light text for good contrast across all 16 supported themes. Build verified: 26 pages compile successfully.
- 2025-12-05 – **Phase 4.2 UX Fixes COMPLETE**: 
  - Expected Value Calculator: Made negative result reds darker (#ef4444 → #dc2626) for better contrast on light backgrounds, and improved result card background with darker red gradient (rgba(220, 38, 38, 0.15) to rgba(185, 28, 28, 0.25)) plus red-tinted box shadow for enhanced visibility
  - Lottery Number Heatmap: Fixed right-justification issue by removing auto-centering margin and using left-aligned layout
  - Quick Draw Simulator: Updated jackpot values to current amounts (Powerball: $1.25B, Mega Millions: $1.45B), fixed game selection functionality by adding visual selection indicators and attaching functions to window object for onclick handlers, fixed draw button functionality by ensuring simulateDraw() properly generates and displays random numbers with theme-aware styling, improved ball contrast by using white backgrounds with dark slate text (text-slate-900) and enhanced borders for maximum readability while maintaining traditional lottery ball appearance, enhanced results display contrast by replacing light gradient background with solid white background and dark text colors for excellent readability, improved selected game card text contrast by making game names black (text-slate-800), numbers darker gray (text-slate-700), and jackpot text darker green (text-green-800) when highlighted for better readability against the light blue background, standardized Common Combinations Checker styling by replacing all hardcoded colors with theme variables (--bg-card, --border-primary, --text-primary, --text-secondary, --text-muted, --accent-primary, --accent-success, --input-bg) for consistent theming across all 16 supported themes
  - Hot Cold Numbers: Added tooltips to frequency heatmap showing 2-digit percentages (e.g., "42: 67.3% frequency (83 draws)")
  - Jackpot Split Calculator: Updated all hardcoded colors to use theme-aware CSS variables for consistent theming
  - Ticket Beautifier: Added HTML5 Canvas image generation with automatic PNG download functionality. Users can now create and download actual image files of their lottery tickets in all 6 themes (Classic, Neon, Gold, Minimal, Retro, Lucky). Build verified: 26 pages compile successfully.
  
- 2025-12-05 – **Ticket Beautifier Image / UX Fixes COMPLETE** (Grok Code Fast 1 — model: Raptor mini (Preview)): Fixed disappearing "Download Image" button (now visible and disabled until a ticket is created), removed visible theme label from generated canvas (keeps a small color marker for automated QA), added `canvasThemes` for consistent canvas rendering, and changed the automatic file name to include the chosen ticket theme plus a short hex marker for traceability (e.g., lottery-ticket-lucky-16a34a-1700000000000.png). Build verified: 27 pages compile successfully, tests pass.
 - 2025-12-05 – **Ticket Beautifier Enhancements COMPLETE** (Grok Code Fast 1 — model: Raptor mini (Preview)): Added subtle, internal filename shortcodes (wallet-style) for ticket themes, live style selector preview updates, multi-ticket generation (Copies), optional Passcode/PIN and Notes fields baked into the ticket and canvas, Download All support for batch downloads, and optional QR code rendering (configurable). These changes improve usability for raffles, gifts, and record-keeping while keeping theme metadata subtle for QA. Build + e2e verified.
 - 2025-12-05 – **Ticket Beautifier: In-browser QR + Theme polish COMPLETE** (Grok Code Fast 1 — model: Raptor mini (Preview)): Replaced remote QR generation with an in-browser QR generator for offline, deterministic QR rendering (uses `qrcode` bundle). Improved ticket theme visuals and applied ticket-specific styles to previews and exported canvases — Classic (beige, ornate orange trim), Neon Glow (cyberpunk magenta/teal/purples), Lucky Charm (green with rainbow/gold trim), Golden Luxury (gold + silver trim), Retro (80s/90s neon), Minimalist (clean monochrome). Previews now update live and canvas exports match the preview; QR images are included in all downloads when enabled. Build & e2e verified.
 - 2025-12-08 – **Visualizer polish COMPLETE** (GitHub Copilot — feature/phase-4-visualizer-fixes): Updated `/tools/probability-visualizer` UX and tests. Changes include: added new densities (20, 100), larger and bolder marker icons, a fuzzy-but-safe click radius (proximity clicks register without causing accidental gap clicks), winner modal stays open until dismissed, modal now includes the visualization chance, actual lottery odds, and money spent; winner click counts as a paid attempt so the spent total is accurate. Playwright visualizer tests updated and pass locally. Branch pushed: feature/phase-4-visualizer-fixes (PR ready).
 - 2025-12-05 – **Ticket Beautifier: DOM raster exports & copies behaviour COMPLETE** (GitHub Copilot / Grok Code Fast 1 — model: Raptor mini (Preview)): Switched download pipeline from programmatic canvas-only drawing to DOM rasterization using `html2canvas` so exported PNGs exactly match the on-page preview (backgrounds, borders, shadows, and QR images). Implemented multi-copy randomization behavior: when generating multiple copies the tool now randomizes most copies but guarantees exactly one duplicated pair (for raffle/winner workflows). Added UI-aware QR injection so QR images appear in exports and kept filenames private/deterministic via short theme codes + tiny color marker for QA. Build & e2e verified.
 - 2025-12-08 – **Ticket Beautifier: Export parity & theme readability COMPLETE** (GitHub Copilot — feature/phase-4-visualizer-fixes): Restored and hardened export parity by making `dom-to-image-more` the primary export engine (with an `html2canvas` fallback), cloning + inlining same-origin styles, sanitizing rendering-unsafe CSS (text-shadow / backdrop-filter / heavy glow), and applying devicePixelRatio scaling so exported PNGs match the preview at pixel density. Replaced remaining hard-coded colors with theme tokens, added automatic contrast for balls/player/footer, and increased canvas player text legibility. Playwright parity tests (DPR-based) added and passing locally. Pixel-level visual regression scaffolding (pixelmatch + pngjs devDeps) added to package.json pending CI installation.
  - API Configuration Fix: Resolved 404 error on regeneration by fixing API base URL interpolation in index.astro. Frontend now properly connects to backend API at http://localhost:8000.
  - All changes maintain 26-page successful build
- 2025-12-05 – **Repeat Checker UX Restructuring COMPLETE** (Grok Code Fast 1): Completely restructured Repeat Checker from separate individual cards to single unified report card format matching Quick Draw Simulator design. Key improvements: (1) Single report card with header/summary/numbers sections, (2) Distinct bordered number balls (.report-ball) with clear visual separation, (3) Mini report layout with status indicators (🔥 hot, ❄️ cold, ⚪ normal), (4) Responsive grid layout for number analysis, (5) Enhanced visual hierarchy with hover effects and animations, (6) Disclaimer footer with important warning about historical data. All styling uses theme-aware CSS variables for consistent theming across 16 supported themes. Build verified: 26 pages compile successfully, tests pass.
 - 2025-12-05 – **A-tier tools (how-rare, expected-loss, annuity) COMPLETE** (Grok Code Fast 1 — model: Raptor mini (Preview)): Added three A-tier microtools to expand educational coverage and UX: `/tools/how-rare-is-this` (probability converter + analogies), `/tools/expected-loss-over-years` (long-term expected loss calculator), and `/tools/annuity-breakdown` (year-by-year annuity visualizer). Each tool includes interactive inputs, explanatory prose, and Playwright e2e tests. Build & tests verified locally.
 - 2025-12-05 – **A-tier: Probability Playground COMPLETE** (Grok Code Fast 1 — model: Raptor mini (Preview)): Added an interactive Probability Playground (`/tools/probability-playground`) where users can simulate trials (tickets × draws × years) to see probability-of-at-least-one-win and expected wins. Includes Playwright tests and was added to the home page carousel + tools grid for discoverability. Build & tests verified.
 - 2025-12-05 – **Home page tools carousel added** (Grok Code Fast 1 — model: Raptor mini (Preview)): Added an auto-scrolling tools carousel to the home page so visitors can quickly find high-value tools (S‑tier + recent A‑tier). Carousel is keyboard accessible, pauses on hover, and duplicates items for smooth looping. Follow-up: add analytics events to measure CTR on each card and AB test ordering.
 - 2025-12-05 – **Measurement & Newsletter plan approved for Phase 4**: Lightweight, privacy-first client instrumentation and opt-in newsletter UI will be implemented during Phase 4. Client instrumentation focuses on carousel/tool-card CTR and CTA tracking (no PII). Server-side telemetry ingestion and full newsletter subscription backend will move to Phase 5 (SEO Farming) / Phase 7 (Monetization) for secure storage, double-opt-in, and dashboarding.
 - 2025-12-05 – **Phase 4 measurement & newsletter implementation COMPLETE**: Client-side tracking wrapper (`src/scripts/tracking.ts`) added and exposed to tests via `window.__LUCKY_EVENTS`. Global delegation added to `src/scripts/lucky.ts` and `entry.js` exposes `window.track` for inline use. `TrackLink` components (Carousel + EduGrid) no longer use broken inline handlers — instrumentation is delegated globally. Newsletter UI (`src/components/NewsletterModal.astro`) is front-end-only, queues emails to `localStorage` (`newsletter_queue_v1`) until backend ingestion is added in Phase 5. Playwright tests added: `tests/analytics-and-newsletter.spec.ts` — local e2e suite passes. Branch: `phase-4-measurement` (work staged locally — create PR when ready).
 - 2025-12-08 – **Lucky Profile Generator COMPLETE**: Implemented Birthstone × Rashi × Color Wheel synthesis feature. Created comprehensive data models: `/data/birthstones.json` (12 months with gemological properties, chakras, numerology), `/data/rashis.json` (12 Indian zodiac signs with planetary influences, mantras, deities), `/data/color_wheel.json` (18 colors with psychology, Kabbalah, chakras, Buddhist elements). Backend: Added `/v1/lucky/birthstone-rashi` POST endpoint and `/v1/lucky/birthstone-rashi/metadata` GET endpoint in `app/routes/lucky_profiles.py`, profile synthesis logic generates lucky numbers from combined numerology, actionable recommendations (stone wearing, color accents, mantras), complementary color suggestions. Frontend: Created `/lucky-profile.astro` page with 3-part selector (birth month dropdown, rashi dropdown, color grid picker), spiritual filters (numerology, Hindu, Kabbalah, Buddhist, Christian), dynamic profile display with focus traits, recommended actions, lucky numbers. Tests: `tests/test_lucky_profiles.py` with 13 backend integration tests. Documentation: `docs/FEATURE_lucky_profile.md` with architecture, SEO strategy (42+ planned pages), affiliate integration ideas. Files created: `app/lucky_profile_models.py`, `app/routes/lucky_profiles.py`, `src/pages/lucky-profile.astro`, `src/types/lucky-profile.ts`, 3 JSON data files, tests, docs. Router registered in `app/main.py`. Ready for deployment and SEO expansion. Branch: `feature/lucky-profile` (ready for PR).
 - 2025-12-08 – **Lucky Profile Generator: Pure Client-Side Pivot COMPLETE**: Rebuilt Lucky Profile Generator as **pure client-side** (no backend, no database, no API calls) per user direction. Removed all backend routes and models. Created static TypeScript data files: `mintlabs-lucky-frontend/src/data/birthstones.ts` (12 birthstones with hex, symbolism, numerology), `src/data/rashis.ts` (12 Indian zodiac signs with planets, deities, traits), `src/data/colorWheel.ts` (18 colors with hex, traits, chakras, complements). Core logic in `src/lib/luckyProfile.ts` — pure function `buildLuckyProfile()` synthesizes birthstone + rashi + color → lucky focus, suggested actions, lucky numbers (numerology), complementary colors, optional religious context (Hindu, Kabbalah, Buddhist, Christian). Updated `/lucky-profile` page to populate selectors from static data and call pure function on submit (zero network latency). Benefits: instant results, offline-capable, privacy-friendly, no backend costs. Build verified: 33 pages successful. Backend router removed from `app/main.py` to avoid missing dependencies. Documentation: `docs/IMPLEMENTATION_LUCKY_PROFILE.md`. Branch: `feature/phase-4-visualizer-fixes`. Ready for merge.
 - 2025-12-08 – **Phase 4 Brief Comprehensive Restructuring COMPLETE**: Restructured `docs/AGENT_BRIEFS/phase-4.md` from 4 phases to **7 phases** to integrate Lucky Profile, Casino-Lite, MintyCatnipCoin, themed RNG modes, and mandatory discoverability system. New structure: Phase 4.1 (Core Tools ✅), 4.2 (50+ Microtools), 4.3 (Lucky Profile ✅ + Themed RNG Modes pending), 4.4 (Casino-Lite Suite + MintyCatnipCoin fictional currency), 4.5 (Discoverability System - **MANDATORY** with crosslinking components, mega menu, category hubs, SEO preview images, internal linking audit), 4.6 (UX Polish - layout consistency, mobile optimization, accessibility), 4.7 (Performance Hardening - bundle size, Lighthouse, Core Web Vitals, load testing). Elevated discoverability from optional to **CRITICAL** mission requirement per user emphasis. Added ~1000+ lines of detailed specifications: Phase 4.3 (Lucky Profile synthesis, themed RNG modes with UI specs), Phase 4.4 (1-3 casino tools, MintyCatnipCoin price simulation with volatility events, daily quests, leaderboard), Phase 4.5 (crosslinking rules per page type, mega menu with 5 categories, hub pages, SEO audit, internal linking script). Updated strategy overview table, agent assignments, acceptance criteria, timeline estimates (13-20 sessions total). Phase execution order: 4.2 (content) → 4.3 (themes) → 4.4 (casino) → 4.5 (discoverability - **mandatory**) → 4.6 (UX) → 4.7 (performance). Document verified for coherence: all 7 phase headers correctly numbered, subsections consistent, agent assignment table updated, Definition of Done checklists updated. Ready for implementation.

### Phase 4 UI Contrast — Handoff status

- Branch: `feature/ui-contrast-phase-4` (pushed to origin)
- Owners: contrast-agent, homepage-agent, audit-agent

- 2025-12-09 – **Phase 4.2 Sprint 3 COMPLETE** (GitHub Copilot — Claude Sonnet 4.5): Built 5 Number Metrics & Visualizers tools (#21-25). Tools: number-popularity-scorecard.astro (composite hot/cold/overdue index with weighted scoring and view filters), consecutive-number-checker.astro (sequence detection with rarity explanations), even-odd-ratio-visualizer.astro (animated bar chart with balance assessment), high-low-ratio-analyzer.astro (distribution across range midpoint), number-spread-visualizer.astro (interactive number line with gap analysis). All tools 100% token compliant, mobile responsive, include educational content and 4 related tool cross-links. Build verified: 47 pages generated successfully (1.84s build time). Branch pushed to feature/ui-contrast-phase-4.

- 2025-12-09 – **Phase 4.2 Sprint 4 COMPLETE** (GitHub Copilot — Claude Sonnet 4.5): Built 3 Educational & Analysis tools (#26-28), completing Tier A foundation. Tools: beginners-lottery-guide.astro (interactive slideshow with 5 topic categories and 20+ myth/fact pairs covering common misconceptions, odds reality, money management, strategies, and key takeaways), is-my-ticket-balanced.astro (multi-metric balance analyzer checking even/odd ratio, high/low distribution, sum range, number spread, and consecutive sequences with composite scoring system and 5 heuristic checks), birthday-risk-checker.astro (split probability calculator analyzing popularity of birthday numbers 1-31 with risk level assessment and expected split multiplier calculations). All tools maintain 100% token compliance, include comprehensive educational content with disclaimers, and feature 4 related tool cross-links. Build verified: 50 pages generated successfully (1.91s build time). Tier A Status: 21/18 tools complete (117%) — exceeded target by 3 tools. Ready to transition to Phase 4.3 (Lucky Profile + Themed RNG modes).
- 2025-12-09 – **Phase 4.3.y+z Card Theme Migration COMPLETE** (GitHub Copilot — Claude Sonnet 4.5): Fixed critical broken SVG asset paths, migrated all card themes to JPEG format. Replaced all `.svg` references in `src/config/decks.ts` with `.jpeg` paths for emerald-velvet, linen-ivory themes. Added new mist-blue theme with proper JPEG assets (`front.jpeg`, `back.jpeg`). Implemented JPEG/WebP fallback resolver in `CardView.astro` component with `resolveAsset()` function that normalizes `.svg`/`.webp`/`.jpg` → `.jpeg` for consistent asset loading. Added UX polish: hover effects (`hover:-translate-y-0.5 hover:shadow-lg`), smooth transitions (`transition-transform duration-200`), maintained ARIA accessibility. Verified all theme assets present in `public/cards/themes/` directories. Dev server running successfully on port 4322. All card themes now render correctly with front/back images. Documentation: Created `docs/PHASE4_CARD_THEMES_TEST.md` with comprehensive QA checklist and acceptance criteria. Branch: `feature/card-themes-phase-4-3`. Ready for visual QA and transition to Phase 4.4 (Casino-Lite tools migration).
- 2025-12-09 – **Phase 4.4 Priority 0-2 COMPLETE** (GitHub Copilot — Claude Sonnet 4.5): Fixed critical Blackjack rendering and game logic issues. **PRIORITY 0 (JPEG Rendering):** Rewrote `renderCard()` function in Blackjack to support image-backed themes, added `resolveAsset()` matching CardView, all 7 themes now render correctly including Emerald Velvet, Linen Ivory, and Mist Blue with JPEG backgrounds. **PRIORITY 1 (Core Mechanics):** Fixed natural blackjack detection (only on initial 2 cards, renamed `hasBlackjack()` → `hasNaturalBlackjack()`), stabilized double-down logic (proper bet deduction, 1 card only, auto-finish), rewrote settlement system with clear payout rules (natural BJ 3:2, normal win 1:1, double win 2x scaled, push returns bet). **PRIORITY 2 (UX):** Fixed CatnipCoin accounting (bet deducted at deal time, additional bet on double, payouts at settlement), proper button states, clear status messages. Manual QA passed all scenarios: natural BJ, dealer BJ, bust, double win/loss, push. Deferred to Phase 4.5: Splitting (requires multi-hand state machine), Insurance (dealer peek/side bet), new games. Documentation: Updated `docs/CARD_SYSTEM_IMPLEMENTATION.md` with image theme details, created `docs/PHASE4_BLACKJACK_FIXES.md` with comprehensive implementation notes. Files: `src/pages/casino-lite/blackjack.astro` (~150 lines modified). Branch: `feature/card-themes-phase-4-3`. Ready for visual QA.
- 2025-12-09 – **Phase 4.4 Visual Polish COMPLETE** (GitHub Copilot — Claude Sonnet 4.5): Comprehensive visual polish for CardView component and Blackjack rendering. **NO game logic changes** (per requirements). **Border & Frame Fixes:** Added inner mask with `rounded-xl overflow-hidden` to clip images cleanly, added 2% padding for visible borders, standardized `cardFrameClass` across all image themes (`rounded-xl border-[2px] shadow-[0_4px_10px_rgba(0,0,0,0.4)] bg-transparent`), updated border colors (emerald-700, amber-700, blue-700). **Alignment Fixes:** Updated rank/suit positioning from 8%/10% → 6%/7% for tighter placement, centered rank+suit pairs with `items-center justify-center`, added drop shadows (`drop-shadow-[0_0_3px_rgba(0,0,0,0.5)]`) for readability on image backgrounds, made center suit 80% opacity. **Size Standardization:** Simplified size class logic (sm: 60-70px, md: 80-90px, lg: 100-110px), enforced true 3:4 aspect ratio, removed explicit height classes. **Consistency:** Unified face-up/face-down rendering with single `cardImageSrc` variable, same frame/border/shadow for both states. **Debug Mode:** Added temporary debug flag with color-coded anchor guides (red: boundary, blue: top-left, green: bottom-right, yellow: center). Updated Blackjack `renderCard()` to match CardView structure exactly. Files: `src/components/casino/CardView.astro` (~100 lines), `src/config/decks.ts` (3 themes), `src/pages/casino-lite/blackjack.astro` (~60 lines). Build: 55 pages (2.05s). Documentation: Created `docs/PHASE4_VISUAL_POLISH.md` with detailed before/after comparisons, QA checklist, and technical diagrams. Branch: `feature/card-themes-phase-4-3`. Ready for visual QA.
- Status: Ready for review / visual QA
- Handoff checklist:
  - [ ] Build + smoke tests pass
  - [ ] Playwright DPR parity checks passing locally
  - [ ] Manual light/dark + mobile/desktop visual sweep completed
  - [ ] Conflicts / regressions triaged or filed as Phase 4 UX tickets
  - [ ] PR approved by Phase 4 owner

- 2025-12-10 – **Lucky v2 Design System Foundation COMPLETE** (GitHub Copilot — Claude Sonnet 4.5): Implemented comprehensive theming system with 11 themes, modern UI components, and hybrid discovery UX. **Design Tokens:** Created `src/styles/tokens.css` with 160+ CSS custom properties (colors, gradients, shadows, spacing, typography, animations, blur levels). **Theme Registry:** Created `src/themes/index.ts` with 11 themes: 5 seasonal (Winter Mint, Lunar Gold, Spring Blossom, Summer Citrus, Autumn Ember), 3 kawaii (Kawaii Mochi, Lucky Cat Charm, Minty Bear), 3 premium (Neon Vaporwave, Midnight Velvet, Linen Ivory). Each theme includes full color palettes, gradients, shadows, animation flags, and helper functions (`getThemeById()`, `getThemeCSSVars()`, `listFeaturedThemes()`). **UI Components:** Created 7 core primitives in `src/components/ui/`: SoftCard (soft shadows, blur backgrounds, gradient overlays, hover animations), PageHero (dynamic gradients with animated shift), ThemePicker (runtime theme switching with SSR-safe localStorage), ToolCard (icon + description with hover effects), GameCard (difficulty badges, featured styling), SectionHeader (optional action buttons), InfoBlurb (educational callouts with 4 variants). **Discovery Components:** Created SearchBar (debounced input with clear button, emits `searchChange` events) and FilterChips (pill-style filters, emits `filterChange` events) in `src/components/discovery/`. **Demo Page:** Created `/lucky-v2-demo` showcasing all components, themes, and animations. **Architecture:** Runtime theme switching via CSS custom properties (no page reload), SSR-safe using `src/utils/ssr.ts`, reduced-motion compliance on all animations, event-driven discovery system. **Performance:** 2,010 new lines across 12 files, build time 2.15s (58 pages), ~24KB total overhead (8KB gzipped), zero TypeScript/lint errors. **Documentation:** Created comprehensive `docs/LUCKY_V2_IMPLEMENTATION.md` with component API reference, theme system overview, architecture details, success criteria. **Next Steps:** Refactor main page + hubs (Todos 5-7), implement theme-specific animations (Todo 8), Playwright tests (Todo 9). Branch: `feature/card-themes-phase-4-3`. Ready for main page refactor.

- 2025-12-10 – **Lucky v2 Home Page Demo COMPLETE** (GitHub Copilot — Claude Sonnet 4.5): Created production-ready reimplementation of main page (`index.astro`) using Lucky v2 Design System while preserving 100% functionality. **File:** `src/pages/lucky-v2-home-demo.astro` (390 lines). **Component Mapping:** Hero → PageHero (gradient + ThemePicker), Generator → SoftCard (elevated + hero gradient) wrapping GeneratorForm, Results + Facts → SoftCard + SectionHeader, Tools Carousel → SoftCard + preserved carousel logic with session randomization, Lucky Profile → SoftCard (glow + accent), Casino-Lite → SoftCard (elevated + subtle) with badge chips, Education → SoftCard wrapping EduGrid, Footer → token-based colors, 2× InfoBlurb components added. **Preserved Functionality:** ✅ RNG form API integration (identical endpoints), ✅ Tools carousel auto-scroll + session-stable randomization, ✅ AdSense integration (production only), ✅ Scripts (initial-games JSON, entry.js, API base), ✅ Modals (Terms, Privacy), ✅ Footer navigation, ✅ Analytics tracking. **New Features:** Runtime theme switching (11 themes), SSR-safe localStorage, reduced-motion compliance, token-based styling (zero hardcoded colors), improved mobile responsiveness, WCAG AA accessibility. **Performance:** Build time 2.23s (59 pages), zero errors. **QA Documentation:** Created comprehensive `docs/LUCKY_V2_HOME_DEMO_QA.md` with functional tests, visual requirements (desktop/tablet/mobile), accessibility checklist, performance metrics, browser compatibility, theme-specific tests, migration checklist. **Migration Path:** Backup `index.astro` → swap `lucky-v2-home-demo.astro` → rebuild (58 pages). **Status:** Ready for QA and production deployment. Branch: `feature/card-themes-phase-4-3`.

## Process Notes- All phases must follow the workflow in `docs/DECISION_WORKFLOW.md` for significant decisions.
- 2025-12-18 – **Phase 4.6 Demo UX Polish COMPLETE** (Claude Opus 4.5 — opus-architecture-reset): Fixed theme token responsiveness on `/demo/ux-polish-balls`. **Root Cause:** Circular CSS variable references (`--text-muted: var(--text-muted)`) in `tokens.css` with higher specificity than `global.css` theme definitions, causing variable invalidation. **Fixes:** (1) Removed nested `<body>` tag from `ux-polish-balls.astro` that broke Layout CSS inheritance, (2) Removed circular `--text-muted` assignments from `tokens.css` lines 193 and 296, (3) Removed `.result-card.ln-resultCard .odds-number { color: inherit }` override from `global.css` that blocked accent colors, (4) Changed `.odds-number` to use `var(--accent-primary)` for theme-responsive accent colors on odds numbers in all themes (dark and light), (5) Reduced odds/meta text size to 75% (`font-size: 0.56rem`) for compact card layout, (6) Tightened line spacing (`line-height: 1.3`, removed inter-line margins) while adding top cushion (`margin-top: 0.5rem`) for visual balance with CTA button. **Files Modified:** `src/pages/demo/ux-polish-balls.astro`, `src/styles/tokens.css`, `src/styles/global.css`, `src/scripts/lucky.demo-balls.ts`, `src/scripts/entry.demo-balls.js`. **Result:** Demo result cards now have theme-responsive text colors matching production, with accent-colored odds numbers and compact metadata display. Branch: `opus-architecture-reset`.

- 2025-12-10 – **Phase 4.5 COMPLETE** (GitHub Copilot — Claude Sonnet 4.5): Implemented WebP migration, loading states, and blackjack splitting hooks. **WebP Migration:** Generated WebP variants for all 3 image-backed themes (67-113KB per file, 81-88% reduction from JPEGs), created conversion scripts (`scripts/convert-to-webp.js`, `scripts/optimize-webp.js`), updated `DeckTheme` type with `frontImageWebP`/`backImageWebP` fields, updated `src/config/decks.ts` with WebP paths. **CardView Enhancements:** Replaced `<img>` with `<picture>` element for WebP/JPEG fallback, added loading skeleton with pulse animation, added error fallback UI with "Image failed" message, added `loading="lazy"` and `onload`/`onerror` handlers. **SSR-Safe Storage:** Created `src/utils/ssr.ts` with `safeGetItem()`/`safeSetItem()`/`safeGetJSON()`/`safeSetJSON()`/`safeRemoveItem()` helpers, updated `src/utils/catnipCoin.ts` to use SSR-safe helpers (no crashes during build, no hydration warnings). **Blackjack Splitting Hooks:** Added split button UI (appears when eligible pairs dealt), implemented `canSplit()` eligibility check (same rank or both 10-value), implemented `canAffordSplit()` balance check, added split button visibility logic to `updateButtons()`, created stub `split()` function with "coming soon" alert and commented Phase 4.6 implementation plan. **Future Game Stubs:** Created `/casino-lite/high-card.astro` and `/casino-lite/war.astro` placeholder pages with Phase 4.6 roadmap. **Testing:** Created `tests/playwright/cards/cardview-webp.spec.ts` (WebP rendering tests), `tests/playwright/casino/blackjack-splitting.spec.ts` (splitting tests, stub). **Documentation:** Updated `docs/PHASE4_IMPLEMENTATION_CARD_THEMES.md` with Phase 4.5 section, updated `docs/PHASE4_BLACKJACK_FIXES.md` with splitting section, created `docs/BLACKJACK_SPLITTING.md` with full implementation spec. **Performance Impact:** Expected 500-1000ms LCP improvement on mobile networks. **Files Modified:** 4 modified (`src/types/cards.ts`, `src/config/decks.ts`, `src/components/casino/CardView.astro`, `src/utils/catnipCoin.ts`), 6 new (`src/utils/ssr.ts`, conversion scripts, test stubs, doc), 6 WebP images. Build: 55 pages (2.06s), zero TypeScript errors. Branch: `feature/card-themes-phase-4-3`. Ready for Phase 4.6 (full splitting implementation, insurance, high-card, war).

- 2025-12-19 – **Phase 4.6 Session 4: Keno + Deck Modes + Fairness COMPLETE** (Claude Opus 4.5 — phase-4-home/hub-ia-rollout):

  **Keno Game (New):**
  - Created `src/scripts/rng/shuffle.ts` - Shared RNG utility with Web Crypto API
    - `cryptoRandomInt()` for cryptographically secure random integers
    - `shuffleInPlace()` Fisher-Yates shuffle
    - `generateDeck()`, `buildShoe()`, `drawCard()` for card games
    - `getModeDescription()`, `getModeLabel()` for deck mode UI
  - Created `src/scripts/casino/keno.ts` - Keno game logic
    - 80-number grid, 10 picks, 20 draws
    - Hit classification: cold (0-2), warm (3-4), hot (5-6), jackpot (7+)
    - `calculateHitProbability()` with binomial coefficient formula
    - `getProbabilityTable()` for odds display
  - Created `src/pages/casino-lite/keno.astro` - Full Keno game
    - 8×10 number grid with CSS variables for theming
    - Draw animation with 200ms delays
    - Learn section with probability table and formula explanation
    - Fairness & RNG disclosure accordion

  **Deck Mode Settings (All Card Games):**
  - Added 3 deck modes: Persistent Shoe, Fresh Shuffle, Infinite Deck (RNG)
  - Deck count selector (1/2/4/6/8 decks)
  - Reshuffle threshold (50%/75%) for shoe mode
  - Updated all card drawing calls to use `drawGameCard()`:
    - Blackjack: `deal()`, `hit()`, `stand()`, `doubleDown()`, `split()`, `dealerPlay()`
    - War: `battle()`, `goToWar()`
    - High Card: `play()`
  - Gameplay Settings accordion in each game

  **Fairness & RNG Disclosures:**
  - Added Fairness & RNG accordion to all casino games
  - Explains Web Crypto API (`crypto.getRandomValues()`)
  - Shows current deck mode and description
  - Entertainment-only disclaimer

  **War Bug Fix:**
  - Fixed "Play again" auto-dealing bug
  - Now resets to idle state with card backs (not auto-deal)
  - Changed event listener from `resetBattle(); battle();` to just `resetBattle()`

  **Files Created:**
  - `src/scripts/rng/shuffle.ts` (~120 lines)
  - `src/scripts/casino/keno.ts` (~210 lines)
  - `src/pages/casino-lite/keno.astro` (~450 lines)

  **Files Modified:**
  - `src/pages/casino-lite/blackjack.astro` - Deck modes + drawGameCard()
  - `src/pages/casino-lite/war.astro` - Deck modes + play-again fix
  - `src/pages/casino-lite/high-card.astro` - Deck modes

  Build: Casino-lite pages verified. Branch: `phase-4-home/hub-ia-rollout`.

- 2025-12-19 – **Phase 4.6 Session 3: Theme Consistency + Bug Fixes COMPLETE** (Claude Opus 4.5 — phase-4-home/hub-ia-rollout):

  **Blackjack Bug Fix:**
  - Fixed split hands not disappearing on new deal
  - Added DOM cleanup loop in `deal()` to hide/reset hand containers 1-3
  - Clears hand content, result badges, and active indicators
  - Resets primary hand label to "You"

  **InfoLayout Theme Consistency:**
  - Updated footer to use CSS variables instead of hardcoded colors
  - Replaced `text-slate-400` → `color: var(--text-muted)`
  - Replaced `hover:text-emerald-400` → `hover:text-[var(--accent-primary)]`
  - Updated header gradient to use `var(--gradient-hero)` with fallback
  - Added responsible gaming notice with hotline to footer
  - All 44 tool pages now inherit theme-consistent footer styling

  **Files Modified:**
  - `src/pages/casino-lite/blackjack.astro` - Split hand cleanup in deal()
  - `src/components/InfoLayout.astro` - Theme-consistent colors + footer update

  Build: 65 pages (2.42s), zero errors. Branch: `phase-4-home/hub-ia-rollout`.

- 2025-12-19 – **Phase 4.6 Session 2: UX Consistency + Legal Footers COMPLETE** (Claude Opus 4.5 — phase-4-home/hub-ia-rollout):

  **Card Back Display (War & High Card):**
  - Added `renderCardBack()` function to both War and High Card games
  - Initial state now shows themed card backs instead of emoji placeholder
  - Card backs respect selected deck theme (Emerald Velvet, Linen Ivory, etc.)
  - Reset functions updated to show card backs after game ends

  **Blackjack Bet Selector:**
  - Added dropdown bet selector matching War and High Card (5/10/25/50 CC)
  - Bet selector disabled during active game, re-enabled on game end
  - baseBet now reads from dropdown on each deal

  **Hub Pages Legal Footer:**
  - Added full legal footer to Casino-Lite hub (`/casino-lite/index.astro`)
  - Added RNG Transparency notice explaining crypto.getRandomValues()
  - Added 3-column footer (Education, Tools, Legal) with Terms/Privacy links
  - Added MintLabs logo + branding
  - Added responsible gaming disclaimer with hotline number
  - Added matching footer to Tools hub (`/tools/index.astro`)

  **Files Modified:**
  - `src/pages/casino-lite/war.astro` - Added renderCardBack(), initial card backs
  - `src/pages/casino-lite/high-card.astro` - Added renderCardBack(), initial card backs
  - `src/pages/casino-lite/blackjack.astro` - Added bet selector dropdown
  - `src/pages/casino-lite/index.astro` - Added full legal footer
  - `src/pages/tools/index.astro` - Added legal footer

  Build verified. Branch: `phase-4-home/hub-ia-rollout`.

- 2025-12-19 – **Phase 4.6 Casino-Lite Major Expansion COMPLETE** (Claude Opus 4.5 — phase-4-home/hub-ia-rollout):

  **Blackjack Re-Splitting (Full Casino Rules):**
  - Implemented re-splitting up to 4 hands (MAX_HANDS = 4)
  - Added `handFromAces[]` tracking to prevent re-splitting aces
  - Split aces receive 1 card each and auto-stand (standard casino rule)
  - Updated `canSplit()` to check active hand, max hands limit, and ace restriction
  - Rewrote `split()` with proper array splicing for mid-game re-splits
  - Updated `moveToNextHand()` to skip ace-split hands and check re-split eligibility
  - Added HTML containers for hands 3-4 in DOM
  - Updated strategy guide with re-split and ace rules

  **CasinoLayout Component (New):**
  - Created `src/components/CasinoLayout.astro` for casino-lite games
  - Clean breadcrumb nav (Home / Casino-Lite / Page)
  - Header balance display with live CatnipCoin sync (`catnipBalanceChange` event)
  - RNG Transparency notice explaining `crypto.getRandomValues()` CSPRNG
  - 3-column footer (Education, Tools, Legal) with MintLabs logo
  - Entertainment/education disclaimers + responsible gaming hotline (1-800-522-4700)
  - Links to Terms & Privacy pages

  **Dice Roller Overhaul:**
  - Rewrote with CasinoLayout (removed lottery elements)
  - Fixed dice animation by adding `is:global` to styles (Astro scoping issue)
  - 3D-styled dice with realistic pips and shadows
  - Rolling animation with pip flash effect
  - Compact history with highlighted most recent roll
  - Quick D6 probability reference cards

  **High Card Game (New):**
  - Full implementation with deck theme support via DeckSelector
  - Ace-high card values (A=14, K=13, Q=12, J=11, 10-2=face)
  - Suit tiebreaker (♠ > ♥ > ♦ > ♣) - no draws possible
  - Variable bet selector (5/10/25/50 CC)
  - Session stats tracking (games, wins, losses, streak)
  - Full CatnipCoin integration with balance checks
  - How to Play educational section

  **Files Created/Modified:**
  - `src/components/CasinoLayout.astro` (NEW) - 130 lines
  - `src/pages/casino-lite/blackjack.astro` - Re-splitting logic, CasinoLayout
  - `src/pages/casino-lite/dice-roller.astro` - Complete rewrite
  - `src/pages/casino-lite/high-card.astro` - Complete rewrite (was stub)

  Build: 65 pages (2.48s), zero errors. Branch: `phase-4-home/hub-ia-rollout`.

- 2025-12-18 – **Phase 4.6 Hub Architecture + MintyCatnipCoin Enhancements IN PROGRESS** (Claude Opus 4.5 — opus-architecture-reset):

  **Hub Pages Standardization:**
  - Created shared `src/styles/hub.css` for consistent hub page styling
  - Unified `/tools` and `/casino-lite` hub pages with identical structure
  - Both hubs now use: breadcrumb + theme selector → hero → search → featured section → grouped sections → cross-links → disclaimer
  - Created reusable components: `HubSearch.astro` (page filtering + site-wide search with ⌘K shortcut), `ThemeSelector.astro` (compact dropdown)
  - Search filters page cards in real-time AND shows site-wide dropdown results from all tools + games

  **MintyCatnipCoin Improvements:**
  - Increased starting balance from 100 → 1,000 MCC
  - Added "Reset to 1,000" button on casino-lite hub
  - Added "Set Custom Amount" button with modal dialog (1 - 999,999 range)
  - Balance persists in localStorage across games
  - Real-time balance display with event-driven updates (`catnipBalanceChange` event)

  **Files Created/Modified:**
  - `src/styles/hub.css` (NEW) - 100 lines of shared hub styles
  - `src/components/HubSearch.astro` (NEW) - Search with page + site-wide filtering
  - `src/components/ThemeSelector.astro` (NEW) - Compact theme dropdown
  - `src/pages/tools/index.astro` - Uses shared styles, added search + theme
  - `src/pages/casino-lite/index.astro` - Restructured to match tools hub, added MCC controls
  - `src/utils/catnipCoin.ts` - Updated CATNIP_INITIAL_BALANCE to 1000

  Build: 66 pages (2.45s), zero errors. Branch: `opus-architecture-reset`.

---

## Phase 4.6+ Roadmap

### Phase 4.6 — Casino-Lite Expansion (CURRENT)

**Priority 1 - MintyCatnipCoin System** ✅ DONE
- [x] Increase starting balance to 1,000 MCC
- [x] Add reset button to hub page
- [x] Add custom balance input with modal
- [x] Event-driven balance updates across games

**Priority 2 - Blackjack Splitting** ✅ DONE
- [x] Multi-hand state machine (`hands[]`, `bets[]`, `activeHandIndex`)
- [x] Sequential hand play with active hand indicator
- [x] Independent settlement per hand
- [x] Split aces special case (one card only, auto-stand, no re-split)
- [x] Re-splitting pairs (up to 4 hands MAX_HANDS)
- [x] Full CatnipCoin accounting for split bets
- [x] Updated strategy guide with re-split and ace rules

**Priority 3 - CasinoLayout & UX Standardization** ✅ DONE
- [x] Created `CasinoLayout.astro` - minimal layout for casino games (no lottery elements)
- [x] Clean breadcrumb nav (Home / Casino-Lite / Page)
- [x] Header balance display with live CatnipCoin sync
- [x] RNG Transparency notice (crypto.getRandomValues() explanation)
- [x] 3-column footer (Education, Tools, Legal) matching site standard
- [x] MintLabs logo + powered by branding
- [x] Entertainment/education disclaimers with responsible gaming hotline
- [x] Updated Blackjack, Dice Roller, High Card to use CasinoLayout
- [x] Fixed Dice Roller styles (is:global for dynamic content)

**Priority 4 - High Card Game** ✅ DONE
- [x] Single-card draw gameplay with deck theme support
- [x] Card value comparison (A=14, K=13, Q=12, J=11)
- [x] Suit tiebreaker (♠ > ♥ > ♦ > ♣)
- [x] Bet selector (5, 10, 25, 50 CC)
- [x] Session stats tracking (games, wins, losses, streak)
- [x] Full CatnipCoin integration
- [x] How to Play educational section

**Priority 5 - Blackjack Insurance** ✅ DONE
- [x] Dealer Ace detection prompt (shown after deal if dealer shows A)
- [x] Insurance modal (half-bet side wager)
- [x] 2:1 payout if dealer has blackjack
- [x] Proper accounting with main hand settlement
- [x] Insurance state reset on new deal
- [x] Can't afford insurance handling
- [x] Updated How to Play section

**Priority 6 - War Game** ✅ DONE
- [x] Classic War gameplay (highest card wins)
- [x] "War" on ties: burn 3 cards, flip 4th
- [x] Surrender option (lose half bet, return rest)
- [x] War escalation (double stakes on war)
- [x] Deck depletion handling (reshuffle at 10 cards)
- [x] War zone UI with burned card counter
- [x] Session stats (battles, wins, losses, wars, surrenders)
- [x] Full CatnipCoin integration
- [x] How to Play section with probability info

**Priority 7 - Keno Game** ✅ DONE
- [x] 80-number grid, pick 10, draw 20
- [x] Hit classification (cold/warm/hot/jackpot)
- [x] Draw animation with 200ms delays
- [x] Probability table with exact odds
- [x] Binomial coefficient formula explanation
- [x] Fairness & RNG disclosure

**Priority 8 - Deck Mode Settings** ✅ DONE
- [x] 3 modes: Persistent Shoe, Fresh Shuffle, Infinite Deck (RNG)
- [x] Deck count selector (1/2/4/6/8 decks)
- [x] Reshuffle threshold for shoe mode (50%/75%)
- [x] Shared RNG utility (`src/scripts/rng/shuffle.ts`)
- [x] Updated Blackjack, War, High Card to use `drawGameCard()`
- [x] Gameplay Settings accordion in each game

**Priority 9 - Fairness & RNG Disclosures** ✅ DONE
- [x] Fairness accordion in all casino games
- [x] Web Crypto API explanation
- [x] Current mode description
- [x] Entertainment-only disclaimer

**Bug Fixes:**
- [x] War "Play again" now resets to idle (not auto-deal)
- [x] Split hands properly clear on new Blackjack deal

### Phase 4.7 — Performance & Polish

**Theme Consistency (Partial):**
- [x] InfoLayout footer updated to use CSS variables (affects 44 tool pages)
- [x] InfoLayout header gradient now uses `--gradient-hero` with fallback
- [ ] Update individual tool page content sections (forms, results) to use theme variables
- [ ] Full theme consistency audit across all 65 pages

**Performance:**
- [ ] Bundle size optimization (target < 200KB initial JS)
- [ ] Lighthouse score ≥ 95 on all pages
- [ ] Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Mobile optimization pass
- [ ] Accessibility audit (WCAG AA compliance)

### Phase 5 — SEO Farming

- [ ] Lucky-by-date pages (365 daily pages)
- [ ] Zodiac/birthday number pages
- [ ] Hot/cold number clusters
- [ ] Content hubs with schema markup
- [ ] Internal linking audit script
