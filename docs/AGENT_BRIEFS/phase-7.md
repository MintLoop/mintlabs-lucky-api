# Phase 7 — Monetization Layer (Ethical, Multi-Stream)

**Goal:** Revenue without harm, exploitation, or false claims.

**Owner:** TBD  
**Branch:** `phase-7-monetization`  
**Status:** Blocked (wait for Phase 6)  
**Dependencies:** Phase 6 (Performance QA)

---

## ⚠️ Ethical Framework

Users searching for "lucky numbers" are often:

- Lower-income
- Under-educated on probability
- Stressed about finances
- Curious about spiritual/comfort-driven beliefs

**Our approach must remain:**

- ✅ Educational
- ✅ Supportive
- ✅ Non-exploitative
- ✅ Transparent about odds
- ❌ Never promise wins
- ❌ Never encourage overspending
- ❌ Never hide the math

---

## 7.1 AdSense Integration

### Deliverables

Implement Google AdSense for initial revenue stream.

### Prerequisites

- ~300–500 daily pageviews (minimum for approval)
- Privacy policy page ✅ (already exists)
- Terms of service ✅ (already exists)
- Quality content ✅

### Implementation

- [ ] Apply for AdSense account
- [ ] Add `ads.txt` to public folder
- [ ] Implement ad slots in designated areas
- [ ] Respect user experience (no intrusive ads)

### Ad Placement Guidelines

| Location | Ad Type | Priority |
|----------|---------|----------|
| Below generator results | Display | P0 |
| Article sidebar | Display | P1 |
| Between content sections | In-article | P2 |
| ❌ Above the fold | - | Never |
| ❌ Pop-ups/interstitials | - | Never |

### Acceptance Criteria

- [ ] AdSense approved
- [ ] Ads don't affect Lighthouse score significantly (< 5 point drop)
- [ ] Ads are clearly labeled
- [ ] No ads on tool pages (keeps them clean)
- [ ] Mobile ads don't obstruct content

### Files to Create/Modify

**Frontend:**
- `public/ads.txt` — AdSense verification
- `src/components/AdSlot.astro` — reusable ad component (may already exist)
- Modify layouts to include ad slots

---

## 7.2 Affiliate Pathways

### Deliverables

Implement ethical affiliate partnerships.

### High-Ethics Funnels (Recommended)

| Category | Examples | Why Ethical |
|----------|----------|-------------|
| Budgeting apps | YNAB, Mint, Copilot | Helps financial health |
| Credit improvement | Credit Karma, Experian | Free tools, education |
| Tax prep | TurboTax, H&R Block | Necessary service |
| Online learning | Coursera, Udemy, Skillshare | Skill building |
| Finance basics | MintScale tools | Our own ecosystem |

### Alternative/Spiritual Categories (Soft)

| Category | Examples | Positioning |
|----------|----------|-------------|
| Numerology books | Amazon affiliate | "For entertainment" |
| Journals | Manifestation notebooks | "Reflection tools" |
| Crystals | Etsy affiliate | "For fun only" |
| Astrology content | Partner sites | Clear disclaimers |

### Implementation

- [ ] Sign up for Amazon Associates
- [ ] Identify 3-5 financial tool partnerships
- [ ] Create `AffiliateCard` component (may exist)
- [ ] Add affiliate links with proper disclosures
- [ ] Track conversions with UTM parameters

### Acceptance Criteria

- [ ] All affiliate links have proper FTC disclosure
- [ ] Disclosure visible before any affiliate content
- [ ] No deceptive "recommended" language
- [ ] Links open in new tab with `rel="noopener sponsored"`
- [ ] Tracking implemented for ROI analysis

### Files to Create/Modify

**Frontend:**
- `src/components/AffiliateCard.astro` (verify/enhance)
- `src/components/AffiliateDisclosure.astro` — FTC disclosure
- `src/data/affiliates.json` — affiliate link database
- Strategy pages — integrate affiliate cards

---

## 7.3 Premium Features (Optional Subscription)

### Deliverables

Low-cost premium features with high perceived value.

### Tier 1: Free (Current)

- All generator modes
- Basic saved numbers (10)
- Shareable links
- All educational content

### Tier 2: Lucky+ ($2.99/month or $19.99/year)

| Feature | Description |
|---------|-------------|
| Lucky Calendar PDF | Auto-generated monthly calendar with "lucky" dates |
| Unlimited saved picks | No 10-pick limit |
| Advanced balanced sets | Additional RNG algorithms |
| Ad-free experience | Remove all ads |
| Export history | CSV download of all generations |

### Tier 3: Lucky Pro ($4.99/month or $39.99/year)

| Feature | Description |
|---------|-------------|
| Everything in Lucky+ | All previous features |
| Personalized numerology | Dashboard with birth date analysis |
| Historical analysis | Access to frequency data (Phase 8) |
| Priority support | Email support |
| Early access | New features first |

### Implementation Approach

- [ ] Use Stripe for payments
- [ ] Implement feature flags
- [ ] Create account system (optional: use Supabase Auth)
- [ ] Build upgrade flow

### Acceptance Criteria

- [ ] Clear value proposition on pricing page
- [ ] Easy upgrade/downgrade
- [ ] Refund policy documented
- [ ] No dark patterns in upgrade flow
- [ ] Free tier remains fully functional

### Files to Create

**Frontend:**
- `src/pages/pricing.astro` — pricing page
- `src/components/PricingCard.astro`
- `src/scripts/subscription.ts` — Stripe integration

**Backend:**
- `app/routes/subscription.py` — webhook handling
- `app/models.py` — user subscription model

---

## Revenue Projections (Conservative)

| Source | Monthly (1K DAU) | Monthly (10K DAU) |
|--------|------------------|-------------------|
| AdSense | $50-100 | $500-1,000 |
| Affiliates | $20-50 | $200-500 |
| Subscriptions | $100-300 | $1,000-3,000 |
| **Total** | **$170-450** | **$1,700-4,500** |

---

## Agent Assignment

| Task | Agent | Scope |
|------|-------|-------|
| 7.1 AdSense | Frontend Agent | integration, placement |
| 7.2 Affiliates | Frontend + Docs Agent | components, content |
| 7.3 Premium | Full Stack | Stripe, auth, features |

---

## Definition of Done

- [ ] AdSense approved and serving
- [ ] At least 3 affiliate partnerships active
- [ ] FTC disclosures on all affiliate content
- [ ] Premium tier implemented (if proceeding)
- [ ] Revenue tracking in place
- [ ] `npm run test:e2e` passes
- [ ] PR reviewed and merged to `main`
- [ ] `docs/AGENT_TRACKER.md` updated
