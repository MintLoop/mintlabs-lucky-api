# Lucky v2 Home Demo - QA Checklist

**File:** `src/pages/lucky-v2-home-demo.astro`  
**URL:** `/lucky-v2-home-demo`  
**Status:** ✅ Build Passing (59 pages)  
**Date:** December 10, 2024

---

## Overview

The Lucky v2 Home Demo is a complete reimplementation of the main page (`index.astro`) using the Lucky v2 Design System while preserving **100% of existing functionality**. This page demonstrates production-ready integration of all v2 components.

---

## Component Mapping

### Original → Lucky v2

| Original Component | Lucky v2 Replacement | Notes |
|-------------------|---------------------|-------|
| Inline hero text | `PageHero` | Dynamic gradient with animated shift |
| `ThemeToolbar` | `ThemePicker` (compact) | Integrated into hero section |
| Card with form | `SoftCard` (elevated + hero gradient) | Wraps `GeneratorForm` |
| Facts card | `SoftCard` + `SectionHeader` | Wraps `GameFacts` |
| Tools carousel wrapper | `SoftCard` + `SectionHeader` | Carousel styles preserved |
| Lucky Profile card | `SoftCard` (glow + accent) | Token-based CTA buttons |
| Casino-Lite card | `SoftCard` (elevated + subtle) | Badge chips use white/border tokens |
| Education section | `SoftCard` + `SectionHeader` | Wraps `EduGrid` |
| N/A | `InfoBlurb` × 2 | New educational callouts |
| Footer | Footer (token-based) | Colors use CSS custom properties |

---

## Functional Requirements

### ✅ Critical Paths (Must Pass)

#### 1. RNG Form Submission
- [ ] Form renders with all games from API (`/games` endpoint)
- [ ] Game selection dropdown works
- [ ] "Generate Numbers" button triggers API call
- [ ] Results appear in `#results` section
- [ ] `GameFacts` component updates with selected game
- [ ] Error states display correctly (API down, validation failures)

**Test:** Select Powerball → Click Generate → Verify 5 main + 1 powerball appear

#### 2. Tools Carousel
- [ ] Carousel auto-scrolls (20s loop)
- [ ] Carousel pauses on hover
- [ ] Session-stable randomization fills slots 1-2
- [ ] All links navigate correctly
- [ ] Tracking events fire (`carousel_click`)
- [ ] Smooth infinite loop (duplicated items work)

**Test:** Hover over carousel → Verify pause → Check sessionStorage for `carousel_secondary`

#### 3. Theme Switching
- [ ] ThemePicker renders with 11 themes
- [ ] Clicking a theme updates all CSS custom properties
- [ ] Theme persists to localStorage (`lucky-v2-theme`)
- [ ] Hero gradient updates instantly
- [ ] SoftCard backgrounds/gradients update
- [ ] CTA button colors update
- [ ] Footer colors update
- [ ] No page reload required

**Test:** Switch to Neon Vaporwave → Verify purple/cyan gradients → Reload → Verify persistence

#### 4. Feature Cards
- [ ] Lucky Profile CTA navigates to `/lucky-profile`
- [ ] Casino-Lite CTA navigates to `/casino-lite`
- [ ] Badge chips render with proper spacing
- [ ] Icons display correctly (✨, 🎰)
- [ ] Hover effects work (lift + glow)

**Test:** Click "Create Your Lucky Profile" → Verify navigation

#### 5. AdSense Integration (Production Only)
- [ ] AdSense slots render when `IS_PROD=true`
- [ ] Client ID interpolated correctly
- [ ] Script loads async without blocking
- [ ] Error handling prevents page crash

**Test:** Set `PROD=true` → Build → Verify `<ins class="adsbygoogle">` present

#### 6. Scripts & Modals
- [ ] `initial-games` JSON injected correctly
- [ ] `entry.js` loads and initializes generator
- [ ] `__LUCKY_API_BASE` set via `define:vars`
- [ ] TermsModal, PrivacyModal render
- [ ] Footer links work

**Test:** Open DevTools → Check `window.__LUCKY_API_BASE` → Verify API base URL

---

## Visual Requirements

### ✅ Desktop (1280px+)

- [ ] Hero gradient animation smooth (15s loop)
- [ ] ThemePicker grid displays all 11 themes in 4 columns
- [ ] SoftCards have proper shadows (soft-md, soft-lg)
- [ ] Generator form fields align correctly
- [ ] Carousel displays 6-8 items visible
- [ ] Feature cards display icons + text side-by-side
- [ ] Footer 3-column grid layout
- [ ] No horizontal scroll

### ✅ Tablet (768px - 1279px)

- [ ] Hero title scales down (text-4xl → text-3xl)
- [ ] ThemePicker grid switches to 3 columns
- [ ] Generator form stacks on smaller viewports
- [ ] Carousel displays 4-5 items visible
- [ ] Feature cards maintain side-by-side layout
- [ ] Footer switches to 2-column grid
- [ ] SoftCard padding reduces (lg → md)

### ✅ Mobile (< 768px)

- [ ] Hero title scales to text-2xl
- [ ] ThemePicker switches to compact 2-column grid
- [ ] Generator form fully stacks
- [ ] Carousel displays 2-3 items visible
- [ ] Feature cards stack icon above text on very small screens
- [ ] Footer stacks to single column
- [ ] Touch targets ≥44px (WCAG)
- [ ] No pinch-zoom required for text

---

## Accessibility Requirements

### ✅ WCAG 2.1 AA Compliance

#### Keyboard Navigation
- [ ] All interactive elements focusable via Tab
- [ ] Focus order logical (top to bottom)
- [ ] Focus-visible outlines clearly visible
- [ ] ThemePicker navigable with arrow keys
- [ ] Carousel can be paused via keyboard
- [ ] Skip links work (if implemented)

**Test:** Tab through entire page → Verify all buttons/links reachable

#### Screen Reader
- [ ] Hero has proper heading hierarchy (h1 → h2 → h3)
- [ ] SectionHeaders use semantic headings
- [ ] Carousel has `aria-label="Featured tools carousel"`
- [ ] Tool cards have `role="listitem"`
- [ ] Random slots marked `aria-hidden="true"` until populated
- [ ] CTA buttons have descriptive text (no "Click here")
- [ ] Form labels properly associated

**Test:** Run VoiceOver/NVDA → Verify all content announced correctly

#### Color Contrast
- [ ] Hero text meets 4.5:1 ratio (gradient backgrounds)
- [ ] SoftCard text meets 4.5:1 ratio on all themes
- [ ] CTA buttons meet 4.5:1 ratio (white text on accent)
- [ ] Footer text meets 3:1 ratio (muted text)
- [ ] Focus outlines meet 3:1 ratio with backgrounds

**Test:** Use axe DevTools → Verify zero contrast errors

#### Reduced Motion
- [ ] Hero gradient animation stops (`prefers-reduced-motion`)
- [ ] Carousel auto-scroll stops
- [ ] SoftCard hover animations disabled
- [ ] Theme transition animations disabled

**Test:** Enable reduced motion in OS → Reload → Verify no animations

---

## Performance Requirements

### ✅ Lighthouse Metrics (Desktop)

- [ ] Performance: ≥95
- [ ] Accessibility: 100
- [ ] Best Practices: 100
- [ ] SEO: 100

### ✅ Core Web Vitals

- [ ] LCP (Largest Contentful Paint): <2.5s
- [ ] FID (First Input Delay): <100ms
- [ ] CLS (Cumulative Layout Shift): <0.1

### ✅ Bundle Size

- [ ] Total page weight: <500KB (excluding AdSense)
- [ ] JavaScript: <100KB (gzipped)
- [ ] CSS: <50KB (gzipped)
- [ ] No render-blocking resources

**Test:** Run Lighthouse in incognito → Verify all metrics green

---

## Browser Compatibility

### ✅ Evergreen Browsers (Latest 2 Versions)

- [ ] Chrome 120+
- [ ] Firefox 121+
- [ ] Safari 17+
- [ ] Edge 120+

### ✅ Mobile Browsers

- [ ] iOS Safari 17+
- [ ] Chrome Android 120+

### ⚠️ Known Limitations

- **IE 11**: CSS custom properties not supported (needs polyfill)
- **Safari 9-14**: `backdrop-filter` requires `-webkit-` prefix (already included)

---

## Theme-Specific Tests

Run these tests for **each theme** (spot-check 3-4 themes):

### Winter Mint
- [ ] Icy teal accent (`#06b6d4`) displays correctly
- [ ] Soft white backgrounds readable
- [ ] Gradient hero uses teal → cyan
- [ ] CTA buttons use teal background

### Neon Vaporwave
- [ ] Purple/cyan gradient displays correctly
- [ ] Dark indigo backgrounds readable
- [ ] Glow shadows visible on SoftCards
- [ ] High contrast maintained (light text on dark)

### Linen Ivory
- [ ] Ivory backgrounds display correctly
- [ ] Gold accents (`#f59e0b`) visible
- [ ] High readability (dark text on light)
- [ ] Subtle shadows visible

---

## Regression Tests

### ✅ Ensure No Breaking Changes

- [ ] Original `index.astro` still builds successfully
- [ ] All existing scripts still work (entry.js, carousel logic)
- [ ] API integration unchanged (same endpoints, same payloads)
- [ ] AdSense integration preserved
- [ ] Modals still open/close correctly
- [ ] Footer links navigate correctly

---

## Migration Checklist

### When Ready to Deploy

1. **Backup Original**
   ```bash
   cd src/pages
   cp index.astro index.astro.bak
   ```

2. **Swap Files**
   ```bash
   cp lucky-v2-home-demo.astro index.astro
   ```

3. **Rebuild**
   ```bash
   npm run build
   # Verify: 59 pages → 58 pages (demo removed, new index counted)
   ```

4. **Run Tests**
   ```bash
   npm run test:e2e
   ```

5. **Deploy to Staging**
   - Smoke test on staging environment
   - Verify API connectivity
   - Check analytics events
   - Monitor error logs

6. **Feature Flag Option (Alternative)**
   - Keep both files
   - Add `LUCKY_V2_HOME=true` env var
   - Conditionally load in router/middleware
   - A/B test with 10% traffic

---

## Known Issues / Future Work

### Non-Blocking

1. **ThemePicker Animation Icons**: Snowfall, sakura petals not yet implemented (Todo 8)
2. **Search/Filter Discovery**: Not applicable to home page (tools/casino hubs)
3. **Visual Regression Tests**: Playwright screenshots pending (Todo 9)

### Deferred to Phase 4.6

1. **Split Testing**: A/B test v1 vs v2 home layouts
2. **Analytics Deep Dive**: Track which CTA cards convert better
3. **Scroll-Triggered Animations**: Fade-in SoftCards on scroll

---

## Success Criteria

### ✅ Must Pass Before Launch

- [x] Build passing (59 pages)
- [ ] All functional tests pass
- [ ] Zero accessibility violations (axe DevTools)
- [ ] Lighthouse Performance ≥95
- [ ] Manual visual QA on 3+ browsers
- [ ] Theme switching works on 5+ themes
- [ ] RNG form end-to-end test passes
- [ ] Carousel randomization works
- [ ] Footer links navigate correctly

### 🎯 Launch Readiness

Once all checkboxes above are ✅, the Lucky v2 Home Demo is ready to replace `index.astro` in production.

---

**QA Owner:** Frontend Agent  
**Reviewed By:** TBD  
**Sign-off Date:** TBD
