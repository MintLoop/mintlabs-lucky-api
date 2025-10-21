# Phase 3 Brief – Security & Compliance

**Prerequisites**
- Phase 2 logging/runbook merged.
- Latest commit: _fill in post Phase 2_.
- Use branch name `phase-3-security`.

**Decision Reminder**
- Always apply the workflow in `docs/DECISION_WORKFLOW.md` before choosing between approaches.

**Tasks**
1. Run `npm audit fix` (non-breaking) and `pip-audit`; patch vulnerabilities or document remaining ones with justification in `SECURITY.md`.
2. Review `mintlabs-lucky-api/app/config.py` for production-safe defaults (`ALLOWED_ORIGINS`, `ALLOWED_HOSTS`, `TRUST_PROXY`, `ENFORCE_HTTPS`); adjust or document overrides in `DEPLOYMENT.md`.
3. Verify secret handling (no secrets checked in, `.env` ignored, docs list required env vars).
4. Expand `setup_games.sql`/`DEPLOYMENT.md` with Supabase role & migration instructions.
5. Update `docs/AGENT_TRACKER.md` with owner/status and final PR link.

**Notes**
- Coordinate with Performance QA for any security changes affecting load tests.
