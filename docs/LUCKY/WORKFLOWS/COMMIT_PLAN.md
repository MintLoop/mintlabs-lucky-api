# Phase 4.5 Commit Plan

## Branch: `opus-architecture-reset`

This document outlines the recommended commit sequence for the Phase 4.5 architecture work.

---

## Commit 1: Documentation Architecture
**Message:** `docs: add Phase 4.5 architecture decisions and workflow specs`

**Files:**
```
docs/LUCKY/WORKFLOWS/PHASE_4_5_REPO_INVENTORY.md
docs/LUCKY/WORKFLOWS/HOMEPAGE_ARCHITECTURE_DECISION.md
docs/LUCKY/WORKFLOWS/HOMEPAGE_ARCHITECTURE_PHASE_4.md
docs/LUCKY/WORKFLOWS/CONTEXTUAL_DISCOVERY_MODEL.md
docs/LUCKY/WORKFLOWS/HUB_ARCHITECTURE.md
docs/LUCKY/WORKFLOWS/mobile-ux.md
docs/LUCKY/WORKFLOWS/DOCUMENTATION_AUDIT_PRUNE.md
docs/LUCKY/WORKFLOWS/PHASE_STRUCTURE.md
docs/AGENT_TRACKER.md (updated)
```

**Summary:**
- Repository inventory with 44 tools, components, and routes
- Architecture decision: Homepage = Outcome Engine, continue /demo strategy
- Mobile UX specification with Apple HIG compliance
- Contextual discovery model with tool tiers (S/A/B ranking)
- Documentation audit identifying 15 files to archive
- Phase structure breakdown (4.5.0 → 4.5.3)

---

## Commit 2: Tool Index Single Source of Truth
**Message:** `feat(frontend): add toolIndex.ts as single source of truth for tools`

**Files:**
```
mintlabs-lucky-frontend/src/config/toolIndex.ts
```

**Summary:**
- TypeScript-first tool metadata registry
- 44 tools with id, title, href, tier, icon, shortDesc, category
- Helper functions: getToolsByTier(), getToolsByCategory(), getRelatedTools()
- Tier system: S-tier (9), A-tier (22), B-tier (13)
- Categories: generators, analyzers, games, education, personality, utilities, planning, simulators

---

## Commit 3: Mobile Components
**Message:** `feat(frontend): add mobile navigation and number display components`

**Files:**
```
mintlabs-lucky-frontend/src/components/mobile/BottomNav.astro
mintlabs-lucky-frontend/src/components/ui/NumberRow.astro
```

**Summary:**
- BottomNav: 5-tab navigation (Numbers, Tools, Budget, Casino, Profile)
- Compliant with Apple HIG (≥44px tap targets)
- Semantic HTML with proper ARIA attributes
- Auto-hides on desktop (md: breakpoint)
- NumberRow: Reusable lottery number display
- Bonus ball distinction (gold/amber styling)
- Three sizes (sm/md/lg) with animation option

---

## Commit 4: Design Tokens Update
**Message:** `feat(frontend): add mobile utility tokens to design system`

**Files:**
```
mintlabs-lucky-frontend/src/styles/tokens.css
```

**Summary:**
- Bottom nav tokens (height, colors, shadow)
- Z-index layer system
- Number ball sizing system
- Safe area handling for notched devices
- Mobile-first media query overrides
- Dark mode support for new components

---

## Commit 5: Demo Pages
**Message:** `feat(frontend): add mobile demo prototype and budget stub page`

**Files:**
```
mintlabs-lucky-frontend/src/pages/demo/mobile-prototype.astro
mintlabs-lucky-frontend/src/pages/budget.astro
```

**Summary:**
- Mobile prototype demonstrating utility-app pattern
- Compact header, quick selector, prominent Generate CTA
- NumberRow integration with contextual discovery
- Budget stub page with coming soon content
- Responsible gaming notice with NCPG link

---

## Commit 6: Tests
**Message:** `test(frontend): add Playwright tests for mobile UX`

**Files:**
```
mintlabs-lucky-frontend/tests/mobile-ux.spec.ts
```

**Summary:**
- Bottom navigation visibility and functionality
- Tab switching navigation
- Touch target size validation (≥44px)
- Desktop hiding behavior
- ARIA accessibility checks
- Budget page content validation

---

## Combined Squash (Optional)
If squashing for a cleaner history:

**Message:** `feat: Phase 4.5 mobile-first architecture reset`

**Description:**
```
Phase 4.5 UX refactor implementing mobile-first utility-app pattern.

Architecture Decisions:
- Homepage = Outcome Engine (generator is primary content)
- Continue /demo strategy (not fork)
- Single source of truth for tools (toolIndex.ts)

Components:
- BottomNav: 5-tab mobile navigation
- NumberRow: Reusable lottery number display

Documentation:
- 8 new workflow specs in docs/LUCKY/WORKFLOWS/
- Tool tier ranking (S/A/B)
- Contextual discovery model

Testing:
- Playwright tests for mobile UX compliance

Branch: opus-architecture-reset
```

---

## Post-Commit Actions

1. **Run tests locally:**
   ```bash
   cd mintlabs-lucky-frontend
   npm run build
   npm run test:e2e -- tests/mobile-ux.spec.ts
   ```

2. **Verify demo pages:**
   - Navigate to `/demo/mobile-prototype`
   - Navigate to `/budget`
   - Test on mobile viewport (DevTools)

3. **Open PR:**
   - Target: `main`
   - Title: `Phase 4.5: Mobile-First Architecture Reset`
   - Include architecture decision summary
   - Link to `docs/LUCKY/WORKFLOWS/HOMEPAGE_ARCHITECTURE_DECISION.md`

---

## Files Changed Summary

| Category | Count | Files |
|----------|-------|-------|
| Documentation | 9 | `docs/LUCKY/WORKFLOWS/*`, `docs/AGENT_TRACKER.md` |
| Config | 1 | `src/config/toolIndex.ts` |
| Components | 2 | `BottomNav.astro`, `NumberRow.astro` |
| Styles | 1 | `tokens.css` |
| Pages | 2 | `mobile-prototype.astro`, `budget.astro` |
| Tests | 1 | `mobile-ux.spec.ts` |
| **Total** | **16** | |

---

## Next Phase Work (4.5.1)

After this branch merges, next priorities:
1. Integrate BottomNav into main Layout.astro
2. Update homepage to mobile-first pattern
3. Implement Tools hub page (`/tools`)
4. Add keyboard navigation to BottomNav
5. Lighthouse audit for mobile performance
