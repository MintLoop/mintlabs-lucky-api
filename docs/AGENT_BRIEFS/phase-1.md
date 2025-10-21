# Phase 1 Brief – Automation Gatekeeper

**Baseline**
- Start from latest `main` (commit TBD).
- Ensure secrets available: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
- No outstanding branches expected; create `phase-1-automation` for this work.

**Decision Reminder**
- Always apply the workflow in `docs/DECISION_WORKFLOW.md` before choosing between approaches.

**Tasks**
1. Create `.github/workflows/ci.yml` running `make lint`, `make test`, and `make coverage` (capture coverage artifact).
2. Append staging deploy job (`vercel deploy --prebuilt`) and production job with manual approval.
3. Update `README.md` & `DEPLOYMENT.md` documenting the CI workflow steps and required secrets.
4. After verification, summarize outcomes & PR link in `docs/AGENT_TRACKER.md` before handing off.

**Deliverables**
- Workflow file committed.
- Documentation updated with CI instructions and deployment flow.
- Tracker row updated (owner/branch/status/notes).
