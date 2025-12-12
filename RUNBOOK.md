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

Visual snapshot notes:
- Visual (screenshot) tests are stored alongside Playwright tests and use `expect(...).toMatchSnapshot(...)` to compare.
- To run only visual tests or a specific suite:
  - `npx playwright test tests/demo` (to run demo tests)
  - `npx playwright test tests/demo/demo-visual.spec.ts` (specific tests)
- To update snapshots when a visual change is intentional:
  - `npx playwright test --update-snapshots` or `npm run test:e2e -- --update-snapshots`


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

## 6. Log Format (Frozen)

The backend uses structured log lines with consistent prefixes for observability.

### 6.1 Request logs

All HTTP requests are logged:

```
[REQ] {request_id} {method} {path} {status} {latency}ms
```

Example:
```
[REQ] abc123 GET /games 200 12ms
[REQ] def456 POST /generate 200 45ms
```

### 6.2 Generation logs

Successful number generations include game/mode detail:

```
[GEN] {request_id} game={game_code} mode={mode} latency={latency}ms
```

Example:
```
[GEN] def456 game=powerball mode=random latency=42ms
```

### 6.3 Error logs

Client errors (4xx) and server errors (5xx):

```
[ERR] {request_id} {status} {error_type}: {message}
```

Examples:
```
[ERR] ghi789 404 HTTPException: unknown game_code
[ERR] jkl012 400 HTTPException: invalid_config: target_sum 10 not achievable
[ERR] mno345 500 ValueError: unexpected error during generation
```

### 6.4 Searching logs

On Vercel or local:
```bash
# Find all errors
grep "\\[ERR\\]" logs.txt

# Find slow requests (>100ms)
grep -E "\\[REQ\\].*[0-9]{3,}ms" logs.txt

# Trace a specific request
grep "abc123" logs.txt
```

---

## 6.5 Error Response Shape (Frozen)

All API error responses use a consistent JSON shape:

```json
{
  "error": "<type>:<code>",
  "request_id": "<trace_id>",
  "status": <http_status>
}
```

### Error types and codes

| Type | Example Code | Meaning |
|------|-------------|---------|
| `client_error` | `rate_limited` | Rate limit exceeded (429) |
| `client_error` | `invalid_config` | Bad request params (400) |
| `client_error` | `not_found` | Resource not found (404) |
| `server_error` | `internal` | Unhandled exception (500) |

### Examples

```json
// 429 Rate limit
{"error": "client_error:rate_limited", "status": 429, "retry_after": 5}

// 400 Bad request
{"error": "client_error:400", "request_id": "abc123", "status": 400}

// 404 Not found
{"error": "client_error:404", "request_id": "def456", "status": 404}

// 500 Internal error
{"error": "server_error:internal", "request_id": "ghi789", "status": 500}
```

### Frontend handling

The frontend should:
1. Check `error` field for the type prefix (`client_error:` vs `server_error:`)
2. Use `retry_after` on 429s to implement backoff
3. Display user-friendly messages, never raw error text

---

## 6.6 Security Headers

The API adds security headers to all responses:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer info |
| `Permissions-Policy` | `camera=(), microphone=()...` | Disable unused browser features |
| `Content-Security-Policy` | `default-src 'none'...` | Defense in depth |
| `Strict-Transport-Security` | `max-age=31536000...` | HTTPS only (production) |

These are automatically applied via middleware; no configuration needed.

---

## 6.7 Rate Limiting

Token bucket rate limiting protects the API:

| Path Type | Requests/min | Burst |
|-----------|-------------|-------|
| Normal endpoints | 120 | 20 |
| Admin endpoints (`/stats`) | 10 | 3 |
| Exempt (`/health`, `/readyz`, `/`) | Unlimited | - |

Rate limit responses include `Retry-After` header.

---

## 6.8 Admin Endpoint Security

Admin endpoints (like `/stats`) follow these rules:

1. **Return 404, not 401** - Prevents endpoint discovery
2. **Stricter rate limits** - 10 req/min vs 120 for normal endpoints
3. **Token authentication** - Requires `ADMIN_TOKEN` env var

To use admin endpoints locally:
```bash
export ADMIN_TOKEN=your-secret-token
curl -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost:8000/stats
```

---

## 6.9 Database Usage Guardrails

When modifying `app/db.py` or database queries:

1. **Always use `prepare=False`** - psycopg3 prepared statements conflict across pooled connections
2. **Use context managers** - Always `with get_conn() as conn:` to ensure cleanup
3. **Keep queries simple** - This is a read-mostly API; avoid complex transactions
4. **Test with mocked DB** - `tests/conftest.py` provides `_DummyConn` fixture

Example safe query pattern:
```python
with get_conn() as conn:
    result = conn.execute(
        "SELECT * FROM games WHERE code = %s",
        (game_code,),
        prepare=False,  # Critical!
    ).fetchone()
```

---

## 6.10 Supabase Key Safety

| Key Type | Safe for Browser? | Use Case |
|----------|-------------------|----------|
| `anon` key | ✅ Yes | Public API calls with RLS |
| `service_role` key | ❌ Never | Server-side only, bypasses RLS |

**Never expose `service_role` key in frontend code or environment variables prefixed with `PUBLIC_`.**

---

## 7. Recovery / Reset

If your environment gets weird.

### 7.1 Reset local Git state

Return to a clean `main`:

```bash
git checkout main
git pull

git reset --hard HEAD
git clean -fd
```

This discards uncommitted changes in your working tree.

### 7.2 Rebuild backend environment

```bash
cd mintlabs-lucky-api
rm -rf .venv

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 7.3 Rebuild frontend environment

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

## 8. Deployment (Overview)

Deployment is handled via GitHub Actions and Vercel (plus Supabase/Postgres for data).

### 8.1 CI Workflow (high-level)

When pushing to GitHub:

- **On PRs / pushes to main/feature branches:**
  - Run `ruff check .`
  - Run `pytest`
  - Run `npm run test:e2e` (or equivalent E2E)
  - Build frontend (Astro)

- **On pushes to main (or tagged releases):**
  - Deploy frontend to Vercel (staging or production)
  - Optionally trigger backend deploy (if configured)

### 8.2 Required GitHub secrets (typical)

In the repo’s GitHub settings → Secrets & variables → Actions, expect values like:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID` (for Lucky frontend)
- Optional: backend deploy token / URL

Do not commit any of these to the repo.

### 8.3 Deployment flow

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
