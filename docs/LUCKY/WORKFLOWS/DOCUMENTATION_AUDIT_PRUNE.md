# Documentation Audit & Prune Report — Phase 4.5

> **Version:** 1.0  
> **Phase:** 4.5 — UX Refactor + IA Reset + Mobile-First Conversion  
> **Branch:** `opus-architecture-reset`  
> **Last Updated:** 2025-12-11

---

## 1. Overview

This document audits existing documentation in `/docs/` and establishes what is canonical, what should be archived, and what is superseded by Phase 4.5 artifacts.

---

## 2. Documentation Inventory

### 2.1 Root `/docs/` Files

| File | Status | Action |
|------|--------|--------|
| `AGENT_TRACKER.md` | **Active** | Update for Phase 4.5 |
| `DECISION_WORKFLOW.md` | **Active** | Keep — process doc |
| `BLACKJACK_SPLITTING.md` | **Active** | Keep — casino feature spec |
| `CARD_SYSTEM_IMPLEMENTATION.md` | **Active** | Keep — casino implementation |
| `FEATURE_lucky_profile.md` | **Superseded** | Archive → replaced by `/LUCKY/WORKFLOWS/` |
| `IMPLEMENTATION_LUCKY_PROFILE.md` | **Superseded** | Archive |
| `IMPLEMENTATION_SUMMARY.md` | **Superseded** | Archive |
| `LUCKY_V2_HOME_DEMO_QA.md` | **Superseded** | Archive — replaced by Phase 4.5 QA |
| `LUCKY_V2_IMPLEMENTATION.md` | **Superseded** | Archive |
| `PHASE4_BLACKJACK_FIXES.md` | **Active** | Keep — implementation notes |
| `PHASE4_CARD_THEMES_TEST.md` | **Active** | Keep — QA checklist |
| `PHASE4_IMPLEMENTATION_CARD_THEMES.md` | **Active** | Keep |
| `PHASE4_SONNET_HANDOFF.md` | **Historical** | Archive |
| `PHASE4_SPRINT_SUMMARY.md` | **Historical** | Archive |
| `PHASE4_SPRINT1_COMPLETE.md` | **Historical** | Archive |
| `PHASE4_VISUAL_POLISH.md` | **Active** | Keep — visual spec |
| `PHASE4.5_IMPLEMENTATION_SUMMARY.md` | **Historical** | Archive — replaced by Phase 4.5 docs |
| `PR_UI_CONTRAST_PHASE4.md` | **Historical** | Archive |
| `TOOLS_AUDIT_PHASE4.md` | **Historical** | Archive |
| `visual-audit-phase-4.md` | **Historical** | Archive |

### 2.2 `/docs/AGENT_BRIEFS/` Files

| File | Status | Action |
|------|--------|--------|
| `phase-1.md` | **Historical** | Keep for reference |
| `phase-2.md` | **Historical** | Keep for reference |
| `phase-3.md` | **Historical** | Keep for reference |
| `phase-4.md` | **Active** | Update to reference Phase 4.5 |
| `phase-5.md` | **Active** | Keep — SEO planning |
| `phase-6.md` | **Active** | Keep — Performance |
| `phase-7.md` | **Active** | Keep — Monetization |
| `phase-8.md` | **Active** | Keep — Historical data |
| `phase-9.md` | **Active** | Keep — Ecosystem |
| `phase-10.md` | **Active** | Keep — PWA |

### 2.3 `/docs/education/` Files

| File | Status | Action |
|------|--------|--------|
| `basic-numerology-map.md` | **Active** | Keep |
| `birthstone-color-theory.md` | **Active** | Keep |
| `card-drawing-probability.md` | **Active** | Keep |
| `casino-lite-rng-fairness.md` | **Active** | Keep |
| `coin-flip-explained.md` | **Active** | Keep |
| `dice-probability.md` | **Active** | Keep |
| `probability-basics.md` | **Active** | Keep |
| `rashi-color-explanations.md` | **Active** | Keep |
| `rng-explained.md` | **Active** | Keep |

### 2.4 New `/docs/LUCKY/WORKFLOWS/` Files (Phase 4.5)

| File | Purpose |
|------|---------|
| `PHASE_4_5_REPO_INVENTORY.md` | Complete repo inventory |
| `HOMEPAGE_ARCHITECTURE_DECISION.md` | Executive decisions |
| `HOMEPAGE_ARCHITECTURE_PHASE_4.md` | Homepage spec |
| `CONTEXTUAL_DISCOVERY_MODEL.md` | Tool tiering |
| `HUB_ARCHITECTURE.md` | Tab routing |
| `mobile-ux.md` | Mobile UX spec |
| `DOCUMENTATION_AUDIT_PRUNE.md` | This document |
| `PHASE_STRUCTURE.md` | Phase overview |

---

## 3. Archive Plan

### 3.1 Files to Archive

Move to `/docs/archive/phase-4-legacy/`:

```
FEATURE_lucky_profile.md
IMPLEMENTATION_LUCKY_PROFILE.md
IMPLEMENTATION_SUMMARY.md
LUCKY_V2_HOME_DEMO_QA.md
LUCKY_V2_IMPLEMENTATION.md
PHASE4_SONNET_HANDOFF.md
PHASE4_SPRINT_SUMMARY.md
PHASE4_SPRINT1_COMPLETE.md
PHASE4.5_IMPLEMENTATION_SUMMARY.md
PR_UI_CONTRAST_PHASE4.md
TOOLS_AUDIT_PHASE4.md
visual-audit-phase-4.md
```

### 3.2 Archive Command

```bash
mkdir -p docs/archive/phase-4-legacy
mv docs/FEATURE_lucky_profile.md docs/archive/phase-4-legacy/
mv docs/IMPLEMENTATION_LUCKY_PROFILE.md docs/archive/phase-4-legacy/
mv docs/IMPLEMENTATION_SUMMARY.md docs/archive/phase-4-legacy/
mv docs/LUCKY_V2_HOME_DEMO_QA.md docs/archive/phase-4-legacy/
mv docs/LUCKY_V2_IMPLEMENTATION.md docs/archive/phase-4-legacy/
mv docs/PHASE4_SONNET_HANDOFF.md docs/archive/phase-4-legacy/
mv docs/PHASE4_SPRINT_SUMMARY.md docs/archive/phase-4-legacy/
mv docs/PHASE4_SPRINT1_COMPLETE.md docs/archive/phase-4-legacy/
mv docs/PHASE4.5_IMPLEMENTATION_SUMMARY.md docs/archive/phase-4-legacy/
mv docs/PR_UI_CONTRAST_PHASE4.md docs/archive/phase-4-legacy/
mv docs/TOOLS_AUDIT_PHASE4.md docs/archive/phase-4-legacy/
mv docs/visual-audit-phase-4.md docs/archive/phase-4-legacy/
```

---

## 4. Canonical Documentation Structure (Post-Phase 4.5)

```
docs/
├── AGENT_TRACKER.md              # Active — agent work tracking
├── DECISION_WORKFLOW.md          # Active — decision process
├── AGENT_BRIEFS/                 # Active — phase briefs
│   ├── phase-1.md through phase-10.md
├── education/                    # Active — educational content
│   ├── (all existing files)
├── LUCKY/                        # New — Lucky-specific architecture
│   └── WORKFLOWS/
│       ├── PHASE_4_5_REPO_INVENTORY.md
│       ├── HOMEPAGE_ARCHITECTURE_DECISION.md
│       ├── HOMEPAGE_ARCHITECTURE_PHASE_4.md
│       ├── CONTEXTUAL_DISCOVERY_MODEL.md
│       ├── HUB_ARCHITECTURE.md
│       ├── mobile-ux.md
│       ├── DOCUMENTATION_AUDIT_PRUNE.md
│       └── PHASE_STRUCTURE.md
├── BLACKJACK_SPLITTING.md        # Active — casino feature
├── CARD_SYSTEM_IMPLEMENTATION.md # Active — casino implementation
├── PHASE4_BLACKJACK_FIXES.md     # Active — implementation notes
├── PHASE4_CARD_THEMES_TEST.md    # Active — QA checklist
├── PHASE4_IMPLEMENTATION_CARD_THEMES.md # Active
├── PHASE4_VISUAL_POLISH.md       # Active — visual spec
└── archive/                      # Historical
    └── phase-4-legacy/
        └── (archived files)
```

---

## 5. Documentation Ownership

| Area | Owner | Primary Docs |
|------|-------|--------------|
| Architecture | Opus 4.5 | `/LUCKY/WORKFLOWS/` |
| Phase briefs | Owner/Wrangler | `/AGENT_BRIEFS/` |
| Agent tracking | All agents | `AGENT_TRACKER.md` |
| Casino features | Casino-Lite Agent | `BLACKJACK_*.md`, `CARD_SYSTEM_*.md` |
| Education | Docs Agent | `/education/` |
| Process | Owner/Wrangler | `DECISION_WORKFLOW.md` |

---

## 6. Documentation Standards

### 6.1 Required Sections

Every architecture document must have:
1. **Overview** — What and why
2. **Specifications** — Technical details
3. **Implementation** — How to build
4. **Related Documents** — Links to other docs

### 6.2 Naming Conventions

- All caps with underscores: `FEATURE_NAME.md`
- Phase-prefixed for temporal docs: `PHASE4_TOPIC.md`
- Lowercase with dashes for specs: `mobile-ux.md`

### 6.3 Version Control

- Include version number and date at top
- Link to branch if applicable
- Note superseded documents

---

## 7. Migration Checklist

- [ ] Create `/docs/archive/phase-4-legacy/` directory
- [ ] Move 12 archived files
- [ ] Update `AGENT_TRACKER.md` for Phase 4.5
- [ ] Verify all `/LUCKY/WORKFLOWS/` files are present
- [ ] Update phase-4.md brief to reference Phase 4.5
- [ ] Remove broken links from any remaining docs

---

*This audit is canonical for Phase 4.5 documentation cleanup.*
