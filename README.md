# MintLabs Lucky Number Generator

Monorepo for the MintLabs Lucky Number Generator platform. It contains:

- `mintlabs-lucky-api/`: FastAPI service that exposes lottery configuration and draw generation endpoints.
- `mintlabs-lucky-frontend/`: Astro frontend that calls the API, renders results, and serves marketing content.
- `docs/`: project briefs, process guides, and the agent tracker for coordinating work across phases.
- Root utilities such as `Makefile`, `deploy.sh`, `test_api.py`, and `setup_games.sql` for local workflows.

Both applications must stay aligned when lottery rules, assets, or environment variables change.

## Local Development

Clone the repository, then set up each app in its own terminal session:

```bash
# Backend
cd mintlabs-lucky-api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --port 8000

# Frontend
cd mintlabs-lucky-frontend
npm install
npm run dev -- --port 4321
```

Create a `.env` (backend) and `.env.local` (frontend) based on the provided examples. The frontend expects `PUBLIC_API_BASE` to point at the running API.

### Makefile shortcuts

From the repo root you can use the bundled Makefile:

- `make lint` → Ruff/Black for the API and ESLint for the frontend
- `make test` → Pytest for the API plus Playwright E2E tests for the frontend
- `make coverage` → Pytest coverage report for the API (uploaded in CI)

## Continuous Integration & Deployment

GitHub Actions runs the `CI` workflow on pushes to `main` and `phase-*` branches, and on pull requests targeting `main`.

### Quality gate

The `quality` job installs Python 3.11 and Node.js 20, restores cached dependencies, then executes `make lint`, `make test`, and `make coverage`. The `.coverage` file from `mintlabs-lucky-api` is saved as an artifact for review.

Playwright browsers are installed automatically so E2E tests can run headlessly during CI.

### Deployments

Two follow-up jobs run only for pushes to `main`:

1. **`deploy_staging`** – builds each Vercel project with `vercel pull/build` and publishes a preview using `vercel deploy --prebuilt`. The FastAPI backend deploys when `VERCEL_API_PROJECT_ID` is provided; the frontend always deploys using `VERCEL_FRONTEND_PROJECT_ID` (falling back to `VERCEL_PROJECT_ID` for single-project installs). The job targets the `staging` GitHub environment.
2. **`deploy_production`** – repeats the deploy steps with `--prod` flags after a manual approval gate. Protect the `production` environment in repository settings to enforce reviewers before live deploys.

Because each deploy step runs inside the corresponding app directory, backend and frontend releases stay in sync.

### Required GitHub secrets

Configure the following repository secrets (or environment-scoped secrets if you prefer finer control):

- `VERCEL_TOKEN` – Vercel CLI token with access to both projects.
- `VERCEL_ORG_ID` – Organisation ID from the Vercel dashboard.
- `VERCEL_PROJECT_ID` – Default project ID; used by the frontend deploy when a dedicated `VERCEL_FRONTEND_PROJECT_ID` is not present.
- `VERCEL_FRONTEND_PROJECT_ID` *(optional but recommended)* – Explicit frontend project ID.
- `VERCEL_API_PROJECT_ID` *(optional)* – Backend project ID. When omitted, backend deploy steps are skipped.

If you keep production deploys behind approval, add reviewers to the `production` environment under **Settings → Environments**.

## Additional Documentation

- `docs/AGENT_BRIEFS/` – phase-specific task briefs and hand-off expectations.
- `docs/AGENT_TRACKER.md` – ownership log; update when starting or handing off work.
- `docs/DECISION_WORKFLOW.md` – required framework for evaluating competing implementation options.
- `DEPLOYMENT.md` – detailed Supabase and Vercel deployment guidance.

Refer to `deploy.sh` for a manual fallback deploy script if the CI pipeline is unavailable.
