# Phase 4 Continuation — Claude Sonnet 4.5 Handoff Summary

**Branch:** `feature/ui-contrast-phase-4`  
**Commit:** `696ad6a`  
**Date:** December 9, 2025  
**Status:** ✅ Ready for microtool expansion

---

## 1. Baseline Confirmation

✅ **Branch verified:** `feature/ui-contrast-phase-4`  
✅ **Build status:** 38 pages successfully generated (no regressions)  
✅ **Recovery complete:** All Phase 4 visualizer work restored from stash  
✅ **Token baseline:** Global theme tokens established (`--surface-elevated`, `--border-primary-darker`, `--card-shadow`)

### Key Pages Functional
- Homepage with elevated cards
- Lucky Profile form
- All microtools (Odds Comparison, Combination Calculator, Repeat Checker, etc.)
- Ticket Beautifier
- Probability Visualizer

---

## 2. Agent Documentation Updates

All agent briefs updated for Phase 4 microtool expansion:

### `/agents/contrast-agent.md`
**Added:**
- Phase 4 continuation context for Claude Sonnet 4.5
- Global token rules (MUST use: `--surface`, `--surface-elevated`, `--surface-hover`, `--border-primary*`, `--card-shadow`)
- "Do Not Break" rules: No hardcoded colors, no untested gradients, no unique styles without tokens
- Token compliance checklist for each new microtool
- Requirement: Use `getContrastColor()` for dynamic colors

### `/agents/homepage-agent.md`
**Added:**
- Phase 4 requirement: Homepage must accommodate continuous microtool additions
- Carousel-eligible registration system for new tools
- Lucky Profile anchor preservation (stays near bottom)
- Hero area stability (no redesigns)
- Placement strategy: core tools → microtools → casino-lite (experimental)
- Session-stable randomization rules

### `/agents/audit-agent.md`
**Added:**
- Visual audit requirements for EACH new microtool
- Per-microtool checklist: theme tokens, light/dark parity, mobile responsiveness
- Requirement to append audit results to `docs/visual-audit-phase-4.md`
- Audit checklist covering 320px-1024px+ viewports
- Token compliance verification (no hardcoded colors)

### `/agents/AGENT_TRACKER.md`
**Added:**
- Phase 4 continuation task list (microtool expansion placeholders)
- Responsibilities matrix (contrast/homepage/audit agents)
- Backfill section for Sonnet workflow validation
- Future tasks backlog with microtool categories:
  - Lightweight RNG tools
  - Color/trait generators
  - Casino-lite experimental widgets
  - Visualization microtools
  - Lucky Profile mini analyzer

---

## 3. Token Compliance Rules (Sonnet MUST Follow)

### ✅ Required Tokens
```css
/* Surface/Background */
--surface                 /* base card background */
--surface-elevated        /* elevated cards */
--surface-hover           /* hover states */

/* Borders */
--border-primary          /* standard borders */
--border-primary-darker   /* card edges, emphasis */

/* Shadows */
--card-shadow             /* card depth */

/* Contrast */
getContrastColor()        /* dynamic text colors */
```

### ❌ Forbidden Practices
- ❌ Inline hardcoded colors (`color: #fff`, `background: #333`)
- ❌ Component-scoped custom CSS without tokens
- ❌ New gradients without dark/light theme testing
- ❌ Unique box-shadow values (use `--card-shadow`)
- ❌ Skipping `<ToolCard>` or equivalent token-based wrappers

---

## 4. Microtool Development Workflow (for Sonnet)

### Step 1: Create New Microtool
```bash
# Create under /src/pages/tools/<tool-name>.astro
# Use <ToolCard> wrapper
# Apply ONLY global tokens (no custom CSS)
```

### Step 2: Register Tool
- Add to tools index
- Mark as carousel-eligible (if applicable)
- Add to homepage agent registry

### Step 3: Contrast Agent Review
- [ ] No hardcoded colors
- [ ] Uses `--surface*`, `--border*`, `--card-shadow`
- [ ] Dynamic colors use `getContrastColor()`
- [ ] Tested in light + dark themes

### Step 4: Audit Agent Review
- [ ] Visual audit across 320px-1024px+ viewports
- [ ] Theme parity (light/dark)
- [ ] Mobile responsiveness
- [ ] Append results to `docs/visual-audit-phase-4.md`

### Step 5: Commit & Build
```bash
git add src/pages/tools/<tool-name>.astro
git commit -m "Add new microtool: <name> (Phase 4)"
npm run build  # Verify no regressions
```

---

## 5. Microtool Categories (Backlog)

**Lightweight RNG Tools:**
- Dice roller
- Coin flip simulator
- Card picker
- Random color generator

**Color/Trait Generators:**
- Lucky colors by birthdate
- Personality trait mapper
- Zodiac compatibility checker

**Casino-lite Experiments:**
- Slot machine simulator
- Probability demo widgets
- Dice distribution visualizer

**Visualization Microtools:**
- Odds comparison charts
- Distribution graphs
- Heatmap generators

**Lucky Profile Extensions:**
- Mini analyzer widget
- Trait summary cards
- Quick profile generator

---

## 6. Homepage Integration Rules

### Placement Priority
1. **Core tools:** Fixed positions at top (maintained for analytics)
2. **Phase 4 microtools:** Carousel rotation or secondary slots
3. **Casino-lite:** De-emphasized with "experimental" labels

### Carousel System
- New tools register as `carousel-eligible: true/false`
- Homepage agent manages randomization (session-stable)
- Lucky Profile anchor preserved (near bottom)
- No hero area redesigns

---

## 7. Quality Gates (Before Merge)

Every new microtool must pass:

### Contrast Agent
- ✅ Token compliance verified
- ✅ No hardcoded colors detected
- ✅ Light/dark theme tested

### Audit Agent
- ✅ Visual audit complete (`docs/visual-audit-phase-4.md` updated)
- ✅ Mobile responsive (320px-768px)
- ✅ Desktop optimized (1024px+)

### Build Verification
- ✅ `npm run build` succeeds
- ✅ No new errors or warnings
- ✅ Page count matches expected (38 + new tools)

---

## 8. Branch Commands Reference

```bash
# Verify you're on the right branch
git branch --show-current
# Should output: feature/ui-contrast-phase-4

# Pull latest changes
git pull origin feature/ui-contrast-phase-4

# Create new microtool
# (in /src/pages/tools/<name>.astro)

# Build and verify
cd mintlabs-lucky-frontend
npm run build

# Commit incremental changes
git add src/pages/tools/<name>.astro
git commit -m "Add microtool: <name> (Phase 4)"

# Push for review
git push origin feature/ui-contrast-phase-4
```

---

## 9. Scope Boundaries (Phase 4 ONLY)

### ✅ In Scope
- New microtools with token-based styling
- Casino-lite experimental widgets (clearly labeled)
- Visual polish and theme compliance
- Homepage placement for new tools
- Documentation updates per tool

### ❌ Out of Scope
- Major UI redesigns
- New feature logic beyond microtools
- Server-side RNG with DB persistence
- Analytics/telemetry changes
- Changes to core tool mechanics
- Breaking API contracts

---

## 10. Next Steps for Sonnet

1. **Review this document** and all updated agent briefs
2. **Choose first microtool** from backlog categories
3. **Create tool scaffold** using `<ToolCard>` and global tokens
4. **Run contrast checklist** (no hardcoded colors)
5. **Build and verify** (`npm run build`)
6. **Commit with clear message** (`git commit -m "Add microtool: <name> (Phase 4)"`)
7. **Run audit checklist** (light/dark + mobile/desktop)
8. **Update visual-audit-phase-4.md** with results
9. **Repeat** for next microtool

---

## 11. Emergency Contacts

- **Phase 4 Owner:** (to be assigned)
- **Wrangler/Owner:** (repository owner)
- **Audit Agent:** Verify `docs/visual-audit-phase-4.md` for current status
- **Branch Status:** Check `agents/AGENT_TRACKER.md` for task progress

---

**This branch (`feature/ui-contrast-phase-4`) is now the official Phase 4 microtool expansion line.**

All foundational work is complete. Claude Sonnet 4.5 may begin adding microtools following the rules and workflows documented above.

---

*Document updated: December 9, 2025*  
*Commit: 696ad6a*  
*Status: Ready for microtool expansion*
