# AGENTS – Lucky Number Monorepo

This file defines how **agents** (AI coding assistants, automation, and human contributors following the same rules) must work in this repository.

It connects:

- `RUNBOOK.md`                    – how to run, test, and recover
- `docs/DECISION_WORKFLOW.md`     – how to decide between options
- `docs/AGENT_TRACKER.md`         – who is doing what, on which branch
- `docs/AGENT_BRIEFS/phase-*.md`  – scoped work packages

There is **one canonical AGENTS file**: this one in the repo root.

---

## 0. Repo Map (for Agents)

```text
lucky-number/
 ├── mintlabs-lucky-api/          # FastAPI backend + RNG engine + API tests
 │    ├── app/
 │    ├── tests/
 │    └── ...
 ├── mintlabs-lucky-frontend/     # Astro frontend + Lucky UI + Playwright tests
 │    ├── src/
 │    ├── public/
 │    ├── tests/
 │    └── ...
 ├── .github/                     # CI workflows (lint, test, deploy)
 ├── docs/
 │    ├── AGENT_BRIEFS/           # phase-1.md ... phase-4.md
 │    ├── AGENT_TRACKER.md        # ownership, branches, status
 │    └── DECISION_WORKFLOW.md    # option selection process
 ├── RUNBOOK.md                   # run/test/deploy instructions
 └── AGENTS.md                    # roles + guardrails (this file)
```

Remote: `git@github.com:MintLoop/mintlabs-lucky-api.git`  
This monorepo is the **source of truth** for both backend and frontend.

---

## 1. Global Rules (All Agents)

These apply to **every** agent and human using this repo.

1. **Never work directly on `main`.**

   - Always create a branch:
     - `phase-<n>-<role>`
     - `feature/<short-name>`
   - Do not push commits to `main` without a PR or explicit owner action.

2. **Always register work in `docs/AGENT_TRACKER.md`.**

   Before you start:

   - Add or update the row for your phase/feature:
     - Agent name/role
     - Branch name
     - Status (`In progress`, `PR open`, `Done`, `Blocked`)
     - Base commit hash (`git rev-parse HEAD`)

   When you hand off or finish:

   - Update status
   - Add a short note to the log (what’s done, what’s left, PR link).

3. **Use the decision workflow.**

   When there is more than one reasonable approach:

   - Open `docs/DECISION_WORKFLOW.md`.
   - List options + tradeoffs (briefly) in:
     - the PR description, or
     - a “Notes” section in the phase brief.
   - Record which option was chosen and why.

4. **Run tests. Always.**

   Before pushing or opening a PR:

   - Backend:
     - `ruff check .`
     - `pytest`
   - Frontend:
     - `npm run test:e2e`

   If tests cannot pass and you still must push:

   - Clearly document:
     - Which tests fail
     - Why they fail
     - Whether this is acceptable for now
   - Note it in the PR and `docs/AGENT_TRACKER.md`.

5. **Do not commit secrets or environment files.**

   - Never commit:
     - `.env`
     - raw secrets, tokens, database URLs
   - `.env` and secret values live only in local dev and CI secrets.

6. **No mass refactors or dependency upgrades without a brief.**

   - Do not:
     - upgrade major framework versions,
     - rename/move large directories,
     - run sweeping codemods across the repo
   - unless a phase brief explicitly tells you to and you follow `DECISION_WORKFLOW.md`.

---

## 2. Parallel Execution Rules (No Cross-Talk)

To avoid agents interfering with each other, agents must:

1. **Stay in their lane.**

   - Backend Agent:
     - Stays inside `mintlabs-lucky-api/*` (plus tests/docs when scoped).
   - Frontend Agent:
     - Stays inside `mintlabs-lucky-frontend/*` (plus tests/docs when scoped).
   - Infra Agent:
     - Stays inside `.github/` and infra docs.
   - Docs Agent:
     - Stays inside `RUNBOOK.md`, `AGENTS.md`, `docs/*`.

2. **Communicate via tracker and PRs, not by editing each other’s domains.**

   - Instead of changing someone else’s domain directly:
     - Leave notes in `docs/AGENT_TRACKER.md`.
     - Add comments or TODOs in the PR.
   - Only cross domains when a brief **explicitly** says so.

3. **Use clear branch names to keep work parallel.**

   Examples:

   - Backend: `feature/backend-add-superlotto`
   - Frontend: `feature/frontend-improve-results-grid`
   - Infra: `infra/update-ci-node-version`
   - Docs: `docs/runbook-sync-phase2`
   - Phase: `phase-2-reliability`, `phase-3-content`

   Branch names should encode **which lane** the work belongs to.

---

## 3. Roles

### 3.1 Owner / Wrangler

**Scope**

- Entire repo + overall direction.

**Responsibilities**

- Decide which phase brief to activate.
- Approve branch naming and scope.
- Review and merge PRs.
- Ensure `RUNBOOK.md`, `AGENTS.md`, and `docs/*` match reality.
- Resolve conflicts between agent proposals.

**Required checks before merge**

- Backend tests + lint:
  - `ruff check .`
  - `pytest`
- Frontend tests:
  - `npm run test:e2e`
- CI status must be green (or intentionally waived in PR + tracker).

---

### 3.2 Backend Agent (API / RNG)

**Scope**

- `mintlabs-lucky-api/app/*`
- `mintlabs-lucky-api/tests/*`
- Backend-related docs where necessary.

**Allowed**

- Add/modify API endpoints (`app/main.py`).
- Extend RNG behavior (`app/rng*.py`).
- Add and maintain tests in `mintlabs-lucky-api/tests/`.
- Make non-secret config changes documented in `RUNBOOK.md`.

**Must NOT**

- Modify `.env` or `.env.example`.
- Change DB connection behavior in `app/db.py` unless:
  - Explicit infra/DB phase brief says so, and
  - Changes are documented in `RUNBOOK.md` / `DEPLOYMENT.md`.
- Break API contracts expected by the frontend without:
  - Adjusting frontend and tests, and
  - Documenting in the PR.

**Required commands before push**

```bash
cd mintlabs-lucky-api
source .venv/bin/activate

ruff check .
pytest
# optional but recommended:
pytest --cov=app
```

---

### 3.3 Frontend Agent (Astro / UI / Playwright)

**Scope**

- `mintlabs-lucky-frontend/src/*`
- `mintlabs-lucky-frontend/public/*`
- `mintlabs-lucky-frontend/tests/*`
- Frontend configs (Astro, Vite, Playwright) when needed.

**Allowed**

- Create/modify pages, components, layouts.
- Adjust browser scripts (`src/scripts/lucky.ts`) and related outputs.
- Add/maintain Playwright tests and configs.
- Improve UX and styling without breaking core flows.

**Must NOT**

- Hardcode secrets or production URLs in source.
- Change API paths or payload shapes without:
  - Coordinating with Backend Agent,
  - Updating tests,
  - Documenting in the PR.

**Required commands before push**

```bash
cd mintlabs-lucky-frontend

npm run dev          # at least once to confirm UI loads
npm run test:e2e
```

---

### 3.4 Infra / CI Agent

**Scope**

- `.github/workflows/*`
- `RUNBOOK.md` and `docs/DEPLOYMENT.md` (if present)
- Any CI/CD-specific notes under `docs/`.

**Allowed**

- Update CI workflows for lint/test/deploy.
- Configure or improve staging/production deployment flows.
- Add documentation on how the pipeline works.

**Must NOT**

- Change secrets or environment names without:
  - Updating `RUNBOOK.md` / `DEPLOYMENT.md`,
  - Coordinating with Owner/Wrangler.

**Required checks**

- Relevant CI workflow runs successfully on a branch, or:
  - Local equivalent commands:
    - `ruff check .`
    - `pytest`
    - `npm run test:e2e`

---

### 3.5 Docs Agent

**Scope**

- `RUNBOOK.md`
- `AGENTS.md`
- `docs/*`

**Allowed**

- Clarify or extend instructions.
- Keep phase briefs in `docs/AGENT_BRIEFS/` up to date.
- Maintain `docs/AGENT_TRACKER.md` and `docs/DECISION_WORKFLOW.md`.

**Must NOT**

- Modify code, CI, or env behavior, unless explicitly operating in a dual role with clear instructions.

**Required checks**

- Ensure documentation matches how commands and workflows actually work.
- Use consistent formatting and headings.

---

### 3.6 Research / Experiment Agent (Sandbox)

**Scope**

- Experimental branches only.

**Allowed**

- Prototype new ideas in **isolated** branches like:
  - `experiment/new-rng-mode`
  - `experiment/alt-lottery-ui`
- Build throwaway POCs that do not impact production.

**Must NOT**

- Touch CI, secrets, `.env`, or core directories in a way that affects `main`.
- Merge into `main` without going through standard review and tests.

---

## 4. Phase Workflow (Bridging BRIEFS + TRACKER)

Phases are defined in `docs/AGENT_BRIEFS/phase-*.md` and tracked in `docs/AGENT_TRACKER.md`.

### 4.1 Starting a phase

1. Read the relevant brief:
   - `docs/AGENT_BRIEFS/phase-X.md`
2. Create/confirm the branch for that phase:
   - Example: `phase-1-automation`, `phase-2-reliability`.
3. Update `docs/AGENT_TRACKER.md`:
   - Fill in your role, branch, status (`In progress`), base commit, and any notes.

### 4.2 Doing the work

- Stay within your role’s scope.
- Use `RUNBOOK.md` for how to run and test.
- If you hit ambiguity, follow `docs/DECISION_WORKFLOW.md`:
  - List options + tradeoffs.
  - Record the chosen option in:
    - the PR, and/or
    - brief notes.

### 4.3 Hand-off and completion

- When ready for review:
  - Push your branch.
  - Open a PR into `main`.
- Update `docs/AGENT_TRACKER.md`:
  - Status → `PR open`, `Blocked`, or `Done`.
  - Include PR link and short summary of results.

---

## 5. Good vs Forbidden Agent Behavior

Short reference.

### 5.1 Good

- Add a new RNG mode in `mintlabs-lucky-api/app/rng_modes.py` with tests.
- Add a Playwright test that proves the generator UI renders results.
- Update `RUNBOOK.md` when command usage changes.
- Tweak CSS in a component without changing layout contracts.
- Introduce small, well-tested improvements in focused feature branches.

### 5.2 Forbidden

- Editing `.env` or committing it to Git.
- Rewriting `.github/workflows/*` without a clear brief.
- Moving or renaming `mintlabs-lucky-api/` or `mintlabs-lucky-frontend/`.
- Mass search/replace across the repo without tests and documentation.
- Pushing directly to `main` with unreviewed changes.

---

## 6. Quick Checklists

### Backend Agent Checklist

- [ ] Working on a feature/phase branch (not `main`).
- [ ] Changes scoped to `mintlabs-lucky-api/*` unless brief says otherwise.
- [ ] `ruff check .` passes.
- [ ] `pytest` passes.
- [ ] API smoke-tested locally (`uvicorn`).
- [ ] `docs/AGENT_TRACKER.md` updated.

### Frontend Agent Checklist

- [ ] Working on a feature/phase branch.
- [ ] Changes scoped to `mintlabs-lucky-frontend/*` unless brief says otherwise.
- [ ] `npm run dev` works and UI loads.
- [ ] `npm run test:e2e` passes.
- [ ] `docs/AGENT_TRACKER.md` updated.

### Infra Agent Checklist

- [ ] Only `.github/workflows/*` and relevant docs adjusted.
- [ ] CI jobs run successfully on the branch.
- [ ] `RUNBOOK.md` / `DEPLOYMENT.md` updated if behavior changed.
- [ ] `docs/AGENT_TRACKER.md` updated.

### Docs Agent Checklist

- [ ] Documentation matches actual code behavior and commands.
- [ ] No code logic changed.
- [ ] Links to RUNBOOK, DECISION_WORKFLOW, TRACKER verified.

---

End of AGENTS.
