# Lucky Profile Generator — Birthstone × Rashi × Color Wheel

## Overview

The **Lucky Profile Generator** combines three ancient wisdom systems into a personalized synthesis:

1. **Birthstones** — Mineral vibrations and gemological properties
2. **Rashis (Indian Zodiac)** — Vedic astrology and planetary influences  
3. **Color Wheel** — Chromotherapy and color psychology

Users select their birth month, rashi, and preferred color energy to receive:
- Unified lucky profile with combined traits
- Actionable recommendations (stones, colors, mantras)
- Lucky numbers derived from numerology
- Optional spiritual filters (Hindu, Kabbalah, Buddhist, Christian)

---

## Architecture

### Data Model

All core data lives in `/data/` as JSON:

- **`birthstones.json`** — 12 months, each with:
  - Primary/alternative names
  - Color hex (mapped to color wheel)
  - Symbolism, element, numerology number
  - Traits, chakra, planetary correspondence, lore

- **`rashis.json`** — 12 Indian zodiac signs, each with:
  - Planet, deity, qualities
  - Energy color (hex)
  - Recommended stones (Jyotish tradition)
  - Mantra, direction, body parts
  - Favorable days

- **`color_wheel.json`** — 18 colors (primary/secondary/tertiary/neutrals):
  - Hex value, associated traits
  - Numerology mapping (1–9)
  - Complement & split-complement colors
  - Religious correspondences: Kabbalah Sefirot, Chakras, Biblical, Buddhist elements
  - Psychological effects

### Backend API

**Endpoint:** `POST /v1/lucky/birthstone-rashi`

**Request:**
```json
{
  "birth_month": "March",
  "rashi": "Mesha",
  "color": "Blue",
  "filters": {
    "numerology": true,
    "hindu": true,
    "kabbalah": false
  }
}
```

**Response:** 
```json
{
  "birthstone_profile": { ... },
  "rashi_profile": { ... },
  "color_profile": { ... },
  "lucky_focus": {
    "focus_traits": ["courage", "communication", "clarity"],
    "primary_color": "Blue",
    "primary_color_hex": "#0000FF",
    "birthstone": "Aquamarine",
    "rashi_energy": "Mesha (Mars)",
    "recommended_actions": [
      "Wear aquamarine or related stones on Tuesdays",
      "Use blue accents in your workspace or attire",
      "Balance with orange for momentum and harmony",
      "Numerology cycle: 3 → expansion → create"
    ],
    "lucky_numbers": [1, 3, 5, 7],
    "lucky_days": ["Tuesday"]
  },
  "filters_applied": { ... }
}
```

**Metadata Endpoint:** `GET /v1/lucky/birthstone-rashi/metadata`  
Returns available options for dropdowns (months, rashis, colors).

### Profile Synthesis Logic

The `synthesize_lucky_focus()` function in `/app/routes/lucky_profiles.py`:

1. **Combines traits** from birthstone + rashi + color (deduplicates, takes top 5)
2. **Generates recommendations:**
   - Stone wearing guidance (based on favorable days)
   - Color accents for workspace/attire
   - Complementary color suggestions
   - Numerology cycle interpretation
   - Optional mantras (if Hindu filter enabled)
3. **Calculates lucky numbers:**
   - Base numerology from birthstone
   - Rashi numerology alignment (Jupiter=3, Venus=6, Saturn=8, etc.)
   - Color numerology mapping
   - Combines and derives 6 unique lucky numbers
4. **Returns unified profile** with actionable insights

---

## Frontend

**Page:** `/lucky-profile.astro`

### UI Components

1. **Birth Month Selector** — Dropdown populated from metadata API
2. **Rashi Selector** — Dropdown with both Sanskrit and English names
3. **Color Grid** — Visual color picker with 18 options
4. **Spiritual Filters** — Checkboxes for optional wisdom traditions:
   - Numerology (default: on)
   - Hindu/Vedic (default: on)
   - Kabbalah
   - Buddhist Elements
   - Christian Symbolism

### Profile Display

After generation, displays:

- **Lucky Focus Card** — Top traits, primary color swatch, birthstone, rashi energy
- **Three Profile Sections:**
  - Birthstone (symbolism, lore, chakra, element)
  - Rashi (deity, planet, symbol, direction)
  - Color (psychology, Kabbalah, chakra)
- **Recommended Actions** — Bulleted list of specific guidance
- **Lucky Numbers** — Visual number badges
- **Favorable Days** — Best days for action

---

## SEO & Content Strategy

### Planned Pages (42+ pages)

1. **Birthstone Pages** (12):
   - `/birthstones/january-garnet`
   - `/birthstones/february-amethyst`
   - ... (one per month)

2. **Rashi Pages** (12):
   - `/rashis/mesha-aries`
   - `/rashis/vrishabha-taurus`
   - ... (one per sign)

3. **Color Psychology Pages** (18):
   - `/colors/red-meaning`
   - `/colors/blue-green-psychology`
   - ... (one per color)

4. **Combination Guides:**
   - `/guides/best-crystal-for-zodiac`
   - `/guides/best-color-for-rashi`
   - `/guides/numerology-color-guide`
   - `/guides/birthstone-color-cheat-sheet`
   - `/guides/2026-lucky-colors-forecast`

All auto-generated from JSON data sources using Astro's static generation.

---

## Affiliate Integration Ideas

### Product Categories

1. **Gemstone Retailers** — Link to birthstone jewelry and raw crystals
2. **Astrology Services** — Jyotish chart readings, consultations
3. **Numerology Courses** — Life path, destiny number, color numerology
4. **Color Therapy Tools** — LED chromotherapy lights, art supplies
5. **Spiritual Books** — Kabbalah, Vedic wisdom, color symbolism
6. **Meditation Courses** — Mantra practice, chakra balancing

### Placement

- Affiliate cards at bottom of lucky profile result
- Contextual links in birthstone/rashi/color pages
- "Recommended Products" sidebar on guide pages

---

## Testing

### Backend Tests

**File:** `/tests/test_lucky_profiles.py`

- ✅ Successful profile generation
- ✅ Spiritual filters (Hindu, Kabbalah, etc.)
- ✅ English rashi name support
- ✅ Error handling (invalid month, rashi, color)
- ✅ Metadata endpoint
- ✅ Deterministic lucky numbers
- ✅ Complementary color logic
- ✅ Recommended actions include stone/color/numerology

**Run:**
```bash
cd mintlabs-lucky-api
pytest tests/test_lucky_profiles.py -v
```

### Frontend Tests

**File:** `/tests/lucky-profile.spec.ts` (Playwright)

- [ ] Form loads with all dropdowns populated
- [ ] Color grid displays and selection works
- [ ] Form validation (require all fields)
- [ ] Successful profile generation and display
- [ ] Loading spinner behavior
- [ ] Analytics event tracking

**Run:**
```bash
cd mintlabs-lucky-frontend
npm run test:e2e -- tests/lucky-profile.spec.ts
```

---

## Integration with Lucky Numbers Generator

Future enhancement: Use the lucky profile to seed number generation.

**Flow:**
1. User generates lucky profile
2. Profile stored in session/local storage
3. When generating lottery numbers, apply:
   - Lucky numbers as "preferred picks"
   - Favorable days as "best generation dates"
   - Color energy as visual theming
   - Numerology cycle as draw mode hint

---

## Deployment Checklist

- [ ] Data files (`/data/*.json`) deployed and accessible
- [ ] Backend API route registered in `main.py`
- [ ] Frontend page built and deployed (`/lucky-profile`)
- [ ] TypeScript types available for type safety
- [ ] Tests passing (backend + frontend)
- [ ] Analytics events configured
- [ ] SEO metadata set (title, description, OG tags)
- [ ] Affiliate links added (when partnerships ready)
- [ ] Performance: API response < 200ms
- [ ] Mobile responsive tested

---

## Future Enhancements

### Phase 2: Visual Outputs

Generate shareable images:
- Color wheel triad diagram (native, complement, split-complement)
- Birthstone color swatch with hex overlay
- Rashi planet icon with Sanskrit symbol
- Star of David geometric pattern (as in color wheel image)

### Phase 3: Advanced Filters

- **Planetary Hours** — Best times to wear stones or perform rituals
- **Lunar Phases** — Align actions with moon cycles
- **Dasha Periods** — Vedic planetary cycles (requires birth time/place)
- **Chinese Elements** — Add Five Elements (Wood, Fire, Earth, Metal, Water)

### Phase 4: Personalization

- Save profiles to user accounts
- Compare profiles (partners, family)
- Subscription: Daily lucky focus emails
- AI-generated affirmations based on traits

---

## Guardrails & Ethics

**Important:**
- All content is for **entertainment and educational purposes**
- No medical or financial advice
- Clearly label affiliate links
- Respect cultural traditions (accurate Jyotish/Kabbalah representations)
- Privacy: Do not store personally identifiable birth data without consent

---

## Support & Resources

- **Jyotish Reference:** `https://www.astrosage.com/rashifal/`
- **Gemstone Info:** GIA.edu, Mindat.org
- **Color Theory:** `https://www.colormatters.com/`
- **Numerology:** `https://www.numerology.com/`
- **Kabbalah:** Sefer Yetzirah, Tree of Life diagrams

---

**Status:** ✅ Core feature complete  
**Next Steps:** Run tests, deploy, add SEO pages, integrate affiliates
