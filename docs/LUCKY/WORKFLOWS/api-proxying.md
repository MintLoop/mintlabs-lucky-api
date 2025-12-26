# API Proxying Architecture

This document explains how the Lucky Numbers frontend handles API calls in different contexts (browser, SSR, build-time).

## Overview

All browser API calls use same-origin `/api/*` paths:
- **Local dev**: Vite proxies `/api/*` → `http://localhost:8000` (FastAPI backend)
- **Production**: Vercel Functions at `/api/games.ts` and `/api/generate.ts`

Server-side (SSR/build-time) fetches use the `BACKEND_ORIGIN` environment variable to make absolute URL requests.

## Architecture (Production - Vercel Functions)

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  fetch('/api/generate')  →  same-origin request              │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge                               │
│  /api/*  →  Serverless Functions                            │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Vercel Functions                           │
│  /api/games.ts   - Returns cached game list                 │
│  /api/generate.ts - Generates numbers, writes to Supabase   │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Supabase (PostgreSQL)                      │
│  games table - Game configurations                          │
│  generations table - Generation history                     │
└─────────────────────────────────────────────────────────────┘
```

## Architecture (Local Dev - FastAPI)

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  fetch('/api/generate')  →  same-origin request              │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vite Dev Proxy                            │
│  /api/*  →  strips /api prefix  →  localhost:8000           │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   FastAPI Backend                            │
│  Receives: POST /generate (no /api prefix)                  │
└─────────────────────────────────────────────────────────────┘
```

## Key Files

| File | Purpose |
|------|---------|
| `/api/games.ts` | Vercel Function - Returns game list |
| `/api/generate.ts` | Vercel Function - Generates numbers |
| `mintlabs-lucky-frontend/src/lib/api/base.ts` | Unified API base resolver |
| `mintlabs-lucky-frontend/src/scripts/api-base.ts` | Re-exports for backwards compatibility |
| `mintlabs-lucky-frontend/astro.config.mjs` | Vite dev proxy configuration |
| `/vercel.json` | Root - Functions routing + build config |
| `/package.json` | Root - Supabase + Vercel dependencies |
| `/tsconfig.json` | Root - TypeScript config for API functions |

## The API Base Resolver

Located at `src/lib/api/base.ts`, this module exports:

### `apiUrl(path: string): string`

Returns the full URL for an API endpoint:
- **Browser**: `/api/{path}` (relative, same-origin)
- **Server**: `{BACKEND_ORIGIN}/{path}` (absolute URL)

```typescript
import { apiUrl } from '../lib/api/base';

// Browser: '/api/games'
// Server: 'https://backend-host/games'
const url = apiUrl('/games');
```

### `apiBase: string`

The base URL:
- **Browser**: `'/api'`
- **Server**: Value of `BACKEND_ORIGIN` or `'http://localhost:8000'`

### `API_BASE: string`

Always `'/api'` (for client-side scripts).

### `BUILD_API_BASE: string`

Alias for `apiBase` (backwards compatibility).

## Why SSR/Build Needs Absolute URLs

During Astro's build phase (SSG) or SSR, `fetch()` runs in Node.js, not a browser. Relative URLs like `/api/games` have no host to resolve against and will fail.

The solution: use `BACKEND_ORIGIN` to construct absolute URLs during server-side execution.

## Environment Variables

### Frontend (Astro SSG/SSR)

| Variable | Context | Description |
|----------|---------|-------------|
| `BACKEND_ORIGIN` | Server-only | Absolute URL for build-time API calls |

### Vercel Functions (Production API)

| Variable | Context | Description |
|----------|---------|-------------|
| `SUPABASE_URL` | Server-only | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only | Supabase service role key (NOT anon key!) |
| `HMAC_SECRET` | Server-only | Secret for commitment hashes |

### Local Development

```bash
# mintlabs-lucky-frontend/.env
BACKEND_ORIGIN=http://localhost:8000
```

Or run backend on :8000 and rely on the default fallback.

### Vercel Deployment

Set these in Vercel Project Settings → Environment Variables:

1. **For Frontend Build:**
   - `BACKEND_ORIGIN` = `https://your-deployment-url.vercel.app/api`

2. **For API Functions:**
   - `SUPABASE_URL` = `https://your-project.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = (from Supabase dashboard → Settings → API)
   - `HMAC_SECRET` = (generate a secure random string)

## Page Fetch Patterns

### Pages with Build-time Fetch

These pages fetch game data at build time:
- `src/pages/index.astro`
- `src/pages/lucky-v2-home-demo.astro`
- `src/pages/demo/ux-polish.astro`
- `src/pages/archive/index.astro`

Pattern:
```typescript
import { apiUrl } from '../lib/api/base';

// Server-side: absolute URL via BACKEND_ORIGIN
// Graceful fallback if backend unreachable
const games = await fetch(apiUrl('/games'))
  .then(r => r.json())
  .catch(() => []);
```

### Client-side Fetches

Scripts like `src/scripts/lucky.ts` use `API_BASE` which resolves to `/api`:

```typescript
import { API_BASE } from './api-base';

const GAMES_ENDPOINT = `${API_BASE}/games`;      // '/api/games'
const GENERATE_ENDPOINT = `${API_BASE}/generate`; // '/api/generate'
```

## Proxy Configuration

### Vite (Local Dev)

In `astro.config.mjs`:

```javascript
vite: {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
```

### Vercel (Production)

In root `vercel.json`:

```json
{
  "functions": {
    "api/*.ts": {
      "runtime": "@vercel/node@3"
    }
  },
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

## Vercel Functions

The production API is implemented as Vercel Serverless Functions at the monorepo root:

### `/api/games.ts`

- **Method**: GET
- **Response**: Array of game configurations
- **Caching**: `Cache-Control: public, max-age=300, stale-while-revalidate=60`
- **Source**: Supabase `games` table

### `/api/generate.ts`

- **Method**: POST
- **Request Body**:
  ```json
  {
    "game_code": "powerball",
    "mode": "random",
    "sets": 1
  }
  ```
- **Response**: Generated numbers with odds/probability
- **Side Effect**: Writes to Supabase `generations` table

### Supported Modes

- `random` - Uniform random selection
- `spaced` - Evenly distributed numbers
- `sum_target` - Target a specific sum
- `birthday` - Based on birth date
- `lucky` - Include specific lucky numbers
- `balanced` - Mix of strategies
- `odd_even_mix` - Balance odd/even
- `pattern_avoid` - Avoid common patterns
- `hot` / `cold` - Based on historical frequency
- Themed: `zodiac`, `gemstone`, `star_sign`, `jyotish`, `chinese_zodiac`, `favorite_color`

## Testing

Playwright tests use route interception with `**/games` and `**/generate` patterns, which match both `/api/games` and direct backend paths.

```typescript
await page.route('**/games', async route => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(mockGames),
  });
});
```

## Troubleshooting

### Build fails with fetch error

1. Check `BACKEND_ORIGIN` is set correctly
2. Verify backend is reachable from build environment
3. Ensure `.catch(() => [])` fallback is in place for graceful degradation

### Browser requests fail (CORS errors)

1. Verify Vercel rewrite is deployed (check `vercel.json`)
2. Check network tab - requests should go to same origin `/api/*`
3. Backend should receive requests without `/api` prefix

### SSR/Build-time fetch returns empty

1. Check `BACKEND_ORIGIN` value in environment
2. Verify backend is running/accessible
3. Check server logs for fetch errors
