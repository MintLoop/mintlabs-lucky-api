# RUNBOOK – Lucky Number Monorepo

This runbook is the single source of truth for running, testing, deploying, and safely modifying the Lucky Number project.

---

## 0. Repo Overview

Monorepo layout (current):

```text
lucky-number/
  mintlabs-lucky-api/        ← FastAPI backend + RNG engine + API tests
  mintlabs-lucky-frontend/   ← Astro frontend + Lucky UI + Playwright tests
  .github/                   ← CI workflows (lint, test, deploy)
  package.json, Makefile     ← root tooling / scripts
  RUNBOOK.md                 ← this file
  docs/                      ← (optional) project docs
```

Primary remote:

```bash
origin  git@github.com:MintLoop/mintlabs-lucky-api.git
```

The old standalone `mintlabs-lucky-frontend` GitHub repo is legacy; this monorepo is the source of truth.

---

## 1. First-Time Setup

### 1.1 Clone repo

```bash
git clone git@github.com:MintLoop/mintlabs-lucky-api.git lucky-number
cd lucky-number
git checkout main
git pull
```

### 1.2 Create a feature branch

Always branch off `main`:

```bash
git checkout -b feature/<short-name>
```

Examples:

- `feature/add-ca-superlotto`
- `feature/tweak-generator-ui`
- `chore/update-deps`

---

## 2. Backend (FastAPI API)

### 2.1 Install dependencies

From repo root:

```bash
cd mintlabs-lucky-api

python3 -m venv .venv
source .venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt
```

### 2.2 Configure environment

```bash
cp .env.example .env
```

Set values in `mintlabs-lucky-api/.env`:

- `DATABASE_URL=...` (Supabase/Postgres connection string)
- `API_ALLOWED_ORIGINS=http://localhost:4321,http://localhost:3000`
- `DAY_SECRET=some-strong-random-string`

Keep `.env` out of Git.

### 2.3 Run backend locally

```bash
cd mintlabs-lucky-api
source .venv/bin/activate

uvicorn app.main:app --reload --port 8000
```

Verify:

- `GET http://localhost:8000/health` → `{ "ok": true }`
- `GET http://localhost:8000/games` → JSON list of games
- `POST http://localhost:8000/generate` → JSON payload with numbers

---

## 3. Frontend (Astro UI)

### 3.1 Install dependencies

```bash
cd mintlabs-lucky-frontend
npm install
```

### 3.2 Configure environment

```bash
cp .env.example .env
```

Set in `mintlabs-lucky-frontend/.env`:

```env
PUBLIC_API_BASE=http://localhost:8000
```

### 3.3 Run dev server

```bash
cd mintlabs-lucky-frontend
npm run dev
```

Visit:

```text
http://localhost:4321
```

Manual smoke test:

- Page loads without JS errors
- Game dropdown is populated
- Clicking **Generate Numbers** shows result cards
- API logs show `/generate` 200s

---

## 4. Test & Lint Commands

### 4.1 Backend – lint & tests

From `mintlabs-lucky-api` with venv active:

```bash
cd mintlabs-lucky-api
source .venv/bin/activate

# Lint
ruff check .

# Tests
pytest

# Coverage (optional)
pytest --cov=app
```

All should pass before merging or deploying.

### 4.2 Frontend – Playwright E2E

From `mintlabs-lucky-frontend`:

```bash
cd mintlabs-lucky-frontend
npm run test:e2e
```

Expected:

- All tests pass
- Logs include `[test] intercepted /generate` confirming mocked calls work

---

## 5. Normal Development Workflow

### 5.1 Start new work

```bash
git checkout main
git pull

git checkout -b feature/<short-name>
```

### 5.2 Implement changes

Edit code under:

- Backend: `mintlabs-lucky-api/app/`, `mintlabs-lucky-api/tests/`
- Frontend: `mintlabs-lucky-frontend/src/`, `mintlabs-lucky-frontend/tests/`

### 5.3 Validate locally

Backend:

```bash
cd mintlabs-lucky-api
source .venv/bin/activate
ruff check .
pytest
```

Frontend:

```bash
cd mintlabs-lucky-frontend
npm run dev          # manual check
npm run test:e2e     # automated E2E
```

### 5.4 Commit and push

From repo root (`lucky-number`):

```bash
git status
git add .
git commit -m "<type>: <short description>"
git push origin feature/<short-name>
```

Examples:

- `feat: add CA Daily 4 support`
- `fix: correct odd-even RNG distribution`
- `chore: update RNG tests for lint`

### 5.5 Open PR

On GitHub (mintlabs-lucky-api repo):

- base: `main`
- compare: `feature/<short-name>`

PR template (minimal):

```markdown
## Summary
- <what changed, in bullets>

## Testing
- ruff check .
- pytest
- npm run test:e2e
- manual UI smoke test (localhost:4321)
```

After merge:

```bash
git checkout main
git pull
git branch -d feature/<short-name>          # optional
git push origin --delete feature/<short-name>  # optional
```

---

## 6. Recovery / Reset

If your environment gets weird.

### 6.1 Reset local Git state

Return to a clean `main`:

```bash
git checkout main
git pull

git reset --hard HEAD
git clean -fd
```

This discards uncommitted changes in your working tree.

### 6.2 Rebuild backend environment

```bash
cd mintlabs-lucky-api
rm -rf .venv

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 6.3 Rebuild frontend environment

```bash
cd mintlabs-lucky-frontend
rm -rf node_modules
npm install
```

Then re-run:

```bash
# Backend
cd mintlabs-lucky-api
source .venv/bin/activate
ruff check .
pytest

# Frontend
cd mintlabs-lucky-frontend
npm run dev
npm run test:e2e
```

---

## 7. Deployment (Overview)

Deployment is handled via GitHub Actions and Vercel (plus Supabase/Postgres for data).

### 7.1 CI Workflow (high-level)

When pushing to GitHub:

- **On PRs / pushes to main/feature branches:**
  - Run `ruff check .`
  - Run `pytest`
  - Run `npm run test:e2e` (or equivalent E2E)
  - Build frontend (Astro)

- **On pushes to main (or tagged releases):**
  - Deploy frontend to Vercel (staging or production)
  - Optionally trigger backend deploy (if configured)

### 7.2 Required GitHub secrets (typical)

In the repo’s GitHub settings → Secrets & variables → Actions, expect values like:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID` (for Lucky frontend)
- Optional: backend deploy token / URL

Do not commit any of these to the repo.

### 7.3 Deployment flow

1. Ensure `main` is green locally (`ruff`, `pytest`, `npm run test:e2e`).
2. Merge PR into `main`.
3. CI will:
   - Run tests
   - Build project
   - Deploy to staging/production Vercel project

If CI fails, fix locally, re-run tests, push a new commit, and re-run the pipeline.

---

## 8. Agent Roles (for tool/agent orchestration)

Use these roles when you or an automation system assigns work.

### 8.1 Backend Agent (FastAPI / RNG)

- Scope:
  - `mintlabs-lucky-api/app/*`
  - `mintlabs-lucky-api/tests/*`
- Responsibilities:
  - Add/modify API endpoints (`app/main.py`)
  - Extend RNG behavior (`app/rng*.py`)
  - Maintain and add tests
- Required checks:
  - `ruff check .`
  - `pytest`

### 8.2 Frontend Agent (Astro / UI)

- Scope:
  - `mintlabs-lucky-frontend/src/*`
  - `mintlabs-lucky-frontend/tests/*`
- Responsibilities:
  - Modify pages/layouts/components
  - Adjust `lucky.ts` / browser scripts
  - Maintain Playwright tests
- Required checks:
  - `npm run dev` (manual smoke)
  - `npm run test:e2e`

### 8.3 Infra / CI Agent

- Scope:
  - `.github/workflows/*`
  - `DEPLOYMENT.md`, `RUNBOOK.md`
- Responsibilities:
  - Maintain CI workflows
  - Describe deployment flow
  - Keep this RUNBOOK accurate
- Required checks:
  - Validate changes on a feature branch
  - Confirm jobs run as expected on PRs

### 8.4 Wrangler / Owner (Human)

- Scope:
  - All of the above
- Responsibilities:
  - Approve/review changes
  - Enforce guardrails
  - Decide when main is stable and safe

---

## 9. Agent Guardrails (Critical)

These rules are for both human contributors and automated agents.

### 9.1 Files that must NOT be casually edited

- `.env`, `.env.example`
- `.github/workflows/*`
- `mintlabs-lucky-api/app/config.py` (if present)
- `mintlabs-lucky-api/app/db.py` (if present)
- Production-specific secrets or keys

Only edit these when:

- You are explicitly doing infra/CI/ops work, **and**
- You update `RUNBOOK.md` and/or `DEPLOYMENT.md` to match.

### 9.2 Safe places to add functionality

- New API endpoints:
  - `mintlabs-lucky-api/app/main.py`
- New RNG logic or modes:
  - `mintlabs-lucky-api/app/rng*.py`
  - Matching tests in `mintlabs-lucky-api/tests/`
- New UI pages/components:
  - `mintlabs-lucky-frontend/src/pages/`
  - `mintlabs-lucky-frontend/src/components/`
  - Tests in `mintlabs-lucky-frontend/tests/`

### 9.3 Required pre-push checks

Before pushing any branch that touches code:

- Backend:
  - `ruff check .`
  - `pytest`
- Frontend:
  - `npm run test:e2e`

If these fail, do not push until fixed (or clearly documented in the PR).

### 9.4 No mass refactors without tests

Agents **must not**:

- Perform mass search/replace across the whole repo without:
  - A clear brief
  - Updated tests
  - Human review
- “Upgrade everything” (framework versions, dependencies) in one sweep without:
  - Explicit approval
  - Full regression test plan

### 9.5 Keep docs in sync

If you change:

- CI behavior
- Deploy flow
- Environment requirements

You must update:

- `RUNBOOK.md`
- `DEPLOYMENT.md` (if present)
- Any relevant `docs/*` files

This runbook should always reflect reality.

---

End of RUNBOOK.
