# Phase 2 Brief – Reliability & Polish

**Prerequisites**
- Phase 1 complete (2025-12-04): prepared statement fix, token bucket rate limiter, request tracing, analytics.
- Base commit: `main` as of Phase 1 completion.
- Branch: `phase-2-reliability`

**Decision Reminder**
- Always apply the workflow in `docs/DECISION_WORKFLOW.md` before choosing between approaches.

---

## Tasks

### 1. Game Config Validation
Add early validation so impossible configs fail with 400s, not hidden exceptions:
- `white_min < white_max`
- `white_count <= (white_max - white_min + 1)`
- `bonus_min < bonus_max` (when present)
- Sum target within achievable range
- Unit tests per game type (powerball, megamillions, ca_superlotto, etc.)

**Files**: `app/main.py` (validation in `/generate`), `tests/test_api_integration.py`

### 2. DB Layer Coverage
Add tests to cover missing lines in `app/db.py`:
- Connection failure path (mock pool.connection() to raise)
- Basic insert/select roundtrip (with test DB or deeper mock)
- Pool exhaustion handling

**Files**: `tests/test_db.py` (new), `app/db.py` (if changes needed)

### 3. /games + /health Hardening
- `/games` should never error, even if DB has issues (return cached or empty list with 200)
- Split health checks:
  - `/health` → fast, no DB (liveness)
  - `/readyz` → includes DB ping (readiness)

**Files**: `app/main.py`

### 4. Logging Format Freeze
Decide on stable structured log format for:
- **Success**: `[{request_id}] {method} {path} → {status} ({latency}ms)`
- **Client error (4xx)**: Include `detail` field
- **Server error (5xx)**: Include `error_type`, truncated message

Document format in `RUNBOOK.md` under "Log Format".

**Files**: `app/main.py`, `RUNBOOK.md`

---

## Acceptance Criteria
- [ ] `make lint && make test` passes
- [ ] Invalid game configs return 400 with clear message
- [ ] `/games` returns 200 even with DB down (cached or empty)
- [ ] `/health` responds <50ms with no DB call
- [ ] `/readyz` returns DB status
- [ ] Log format documented in RUNBOOK
- [ ] `docs/AGENT_TRACKER.md` updated with Phase 2 status

---

## Notes
- Phase 1 added `/stats` endpoint for in-memory analytics by game/mode
- Request tracing via `X-Request-ID` header already in place
- Token bucket rate limiter configured: 120/min, burst 20, exempt: `/`, `/health`, `/games`
