# Phase 4 Brief – Performance QA

**Prerequisites**
- Phase 3 security fixes merged; review `SECURITY.md` for residual risks.
- Latest commit: _fill in after Phase 3_.
- Working branch: `phase-4-performance`.

**Decision Reminder**
- Always apply the workflow in `docs/DECISION_WORKFLOW.md` before choosing between approaches.

**Tasks**
1. Re-run backend load testing (e.g., `hey`/`locust`) against `/generate`; capture latency/p95/throughput tables in `docs/PERF.md`.
2. Execute Lighthouse/PWA audit on staging; record scores & key metrics in `docs/PERF.md`.
3. Inspect logs/metrics to confirm DB pool/cache performing as expected; note any tuning recommendations (pool size, cache TTL, uvicorn workers).
4. Update `docs/AGENT_TRACKER.md` with owner/status/PR link and flag any follow-up actions.

**Notes**
- Coordinate with Ops if new monitoring thresholds are needed.
