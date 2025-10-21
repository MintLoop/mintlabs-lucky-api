# Repository Guidelines

## Project Structure & Module Organization
The repo hosts two deployable apps that must stay in sync:
- `mintlabs-lucky-api/` FastAPI service powering lottery draws; key modules live in `app/`, with configuration in `config.py` and database access in `db.py`.
- `mintlabs-lucky-frontend/` Astro site under `src/` with components, pages, and Tailwind styles; `public/` holds shared assets.
- Root utilities include `setup_games.sql`, `test_api.py`, `deploy.sh`, and `.env.local` for local API routing. Update both apps when lottery rules or asset names change.

## Build, Test, and Development Commands
- First-time backend setup: `cd mintlabs-lucky-api && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`.
- Backend dev server: `uvicorn app.main:app --reload --port 8000` (expects `.env` with `DATABASE_URL`, `HMAC_SECRET`, etc.).
- Frontend dev server: `cd mintlabs-lucky-frontend && npm install && npm run dev -- --port 4321`; align `PUBLIC_API_BASE` in `.env.local` with your API endpoint.
- Deployment helpers live in `deploy.sh` and `DEPLOYMENT.md`; keep instructions current before shipping.

## Coding Style & Naming Conventions
Python modules follow 4-space indentation, `snake_case` functions, and `PascalCase` Pydantic models (e.g., `GenerateReq`). Place FastAPI routes under `app/routes/` and keep shared helpers in `app/utils.py`. Astro/TypeScript files use 2-space indentation, `PascalCase` components (`SiteHeader.astro`), and colocate styles in `src/styles`. Prefer explicit imports and keep environment reads behind `import.meta.env`.

## Testing Guidelines
Backend checks currently rely on executable scripts; run `python mintlabs-lucky-api/test_rng.py` or `test_rng_models.py` after RNG edits, and `python test_api.py` against a local server to validate responses and odds math. Add `pytest`-style tests under `mintlabs-lucky-api/tests/` when you introduce new modules, and document expected coverage deltas in the PR. Manual frontend smoke tests should confirm the generator flow, theme switcher, and Ads blocks.

## Commit & Pull Request Guidelines
History uses descriptive, sentence-case messages (`Initial commit: Lucky Number Generator project setup`). Continue that format: summarize scope in one line, preferring "Verb phrase: detail". PRs must link tracking issues, outline data or UI changes, list executed commands/tests, and attach screenshots or curl output when touching the generator UI.

## Environment & Security Notes
Never commit secrets. Backend reads `.env` via `pydantic-settings`; rotate keys if shared. Frontend `.env.local` ships only non-sensitive `PUBLIC_*` values. Update Supabase schemas via `setup_games.sql` and document migrations in your PR.
