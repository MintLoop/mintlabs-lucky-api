# Phase 8 — Historical Data & Analytics Engine

**Goal:** Offer tools no other lucky-number site has.

**Owner:** TBD  
**Branch:** `phase-8-historical`  
**Status:** Blocked (wait for Phase 7)  
**Dependencies:** Phase 7 (Monetization Layer)

---

## 8.1 Historical Draw Data Import

### Deliverables

Build a system to fetch and store real lottery draw history.

### Data Sources

| Game | Source | Update Frequency |
|------|--------|------------------|
| Powerball | powerball.com / API | After each draw (Wed, Sat) |
| Mega Millions | megamillions.com | After each draw (Tue, Fri) |
| State games | State lottery sites | Varies |

### Database Schema

```sql
CREATE TABLE draw_history (
    id SERIAL PRIMARY KEY,
    game_code VARCHAR(50) NOT NULL,
    draw_date DATE NOT NULL,
    numbers INTEGER[] NOT NULL,
    bonus_number INTEGER,
    jackpot_amount BIGINT,
    winners_jackpot INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(game_code, draw_date)
);

CREATE INDEX idx_draw_history_game_date ON draw_history(game_code, draw_date);
CREATE INDEX idx_draw_history_numbers ON draw_history USING GIN(numbers);
```

### Import Pipeline

- [ ] Create scraper/API client for each data source
- [ ] Schedule periodic updates (cron/Vercel Functions)
- [ ] Handle backfill of historical data (10+ years)
- [ ] Validate data integrity (checksums, duplicates)

### Acceptance Criteria

- [ ] At least 5 years of Powerball data imported
- [ ] At least 5 years of Mega Millions data imported
- [ ] Automated daily updates working
- [ ] Data validation passes (no duplicates, correct formats)
- [ ] Import errors logged and alerted

### Files to Create

**Backend:**
- `app/routes/draws.py` — API endpoints for historical data (may exist)
- `app/services/import_draws.py` — import logic
- `app/services/scrapers/powerball.py`
- `app/services/scrapers/megamillions.py`
- `tools/import_draws.py` — CLI import tool (may exist)
- `tools/backfill_history.py` — one-time backfill script

---

## 8.2 Frequency Analysis API

### Deliverables

API endpoints for number frequency analysis.

### Endpoints

```
GET /api/analysis/frequency/{game_code}
  ?period=all|year|6months|3months
  
GET /api/analysis/hot/{game_code}
  ?count=10
  
GET /api/analysis/cold/{game_code}
  ?count=10

GET /api/analysis/pairs/{game_code}
  ?count=10

GET /api/analysis/streaks/{game_code}
```

### Response Example

```json
{
  "game": "powerball",
  "period": "year",
  "analysis_date": "2025-12-05",
  "frequencies": [
    {"number": 23, "count": 15, "percentage": 12.5},
    {"number": 45, "count": 14, "percentage": 11.7}
  ],
  "draws_analyzed": 104
}
```

### Acceptance Criteria

- [ ] All endpoints return correct calculations
- [ ] Response time < 200ms (with caching)
- [ ] Results cached for 1 hour
- [ ] Clear documentation in OpenAPI spec

### Files to Create

**Backend:**
- `app/routes/analysis.py` — analysis endpoints
- `app/services/frequency.py` — calculation logic
- `tests/test_analysis.py` — unit tests

---

## 8.3 Frontend Visualization Tools

### Deliverables

Interactive charts and tools using historical data.

### Features

| Feature | Description |
|---------|-------------|
| **Hot Number Chart** | Bar chart of most frequent numbers |
| **Cold Streak Tracker** | Numbers overdue for selection |
| **Pair Frequency** | Common number pairs |
| **Trend Line** | Number frequency over time |
| **Simulation Tool** | "What if I played these numbers for 10 years?" |

### Acceptance Criteria

- [ ] Charts render on mobile
- [ ] Interactive (hover/tap for details)
- [ ] Data refreshes automatically
- [ ] Clear disclaimer: "Past results don't predict future"
- [ ] Accessible (screen reader friendly)

### Files to Create

**Frontend:**
- `src/pages/analysis/[game].astro` — game analysis page
- `src/components/FrequencyChart.astro` — bar chart
- `src/components/TrendChart.astro` — line chart
- `src/components/SimulationTool.astro` — what-if calculator
- `src/scripts/charts.ts` — Chart.js or similar integration

---

## 8.4 Repeat Number Analyzer

### Deliverables

Tool to check how often user-provided numbers have appeared.

### Features

- Input: User's favorite numbers
- Output:
  - Times each number appeared
  - Last appearance date
  - Average gap between appearances
  - "Would you have won?" analysis

### Acceptance Criteria

- [ ] Works for any game
- [ ] Handles partial matches
- [ ] Shows historical context
- [ ] Clear about actual odds

### Files to Create

**Frontend:**
- `src/pages/tools/number-checker.astro`
- `src/components/NumberHistory.astro`

**Backend:**
- `app/routes/analysis.py` — add `/check-numbers` endpoint

---

## 8.5 Simulation Engine

### Deliverables

"What if?" simulation tool.

### Simulation Parameters

- Numbers to play
- Years to simulate
- Plays per week
- Ticket cost

### Output

- Total spent
- Prizes won (all tiers)
- Net result
- Comparison to actual jackpot odds

### Acceptance Criteria

- [ ] Uses real historical data
- [ ] Accurate prize tier calculations
- [ ] Clear visualization of results
- [ ] Disclaimer about randomness

### Files to Create

**Frontend:**
- `src/pages/tools/simulation.astro`
- `src/components/SimulationResults.astro`

**Backend:**
- `app/services/simulation.py` — simulation logic
- `app/routes/simulation.py` — API endpoint

---

## Agent Assignment

| Task | Agent | Scope |
|------|-------|-------|
| 8.1 Data Import | Backend Agent | scrapers, DB, scheduling |
| 8.2 Analysis API | Backend Agent | endpoints, caching |
| 8.3 Visualizations | Frontend Agent | charts, components |
| 8.4 Number Checker | Full Stack | UI + API |
| 8.5 Simulation | Full Stack | complex logic + UI |

---

## Definition of Done

- [ ] Historical data for 2+ games imported
- [ ] Automated updates running
- [ ] All analysis endpoints working
- [ ] Charts rendering correctly
- [ ] Simulation tool functional
- [ ] All disclaimers in place
- [ ] `ruff check .` && `pytest` pass
- [ ] `npm run test:e2e` passes
- [ ] PR reviewed and merged to `main`
- [ ] `docs/AGENT_TRACKER.md` updated
