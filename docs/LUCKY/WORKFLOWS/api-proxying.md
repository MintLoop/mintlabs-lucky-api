# API Proxying Architecture

This document explains how the Lucky Numbers frontend handles API calls in different contexts (browser, SSR, build-time).

## Overview

All browser API calls use same-origin `/api/*` paths, which are proxied to the backend:
- **Local dev**: Vite proxies `/api/*` → `http://localhost:8000`
- **Production**: Vercel rewrites `/api/*` → `https://mintlabs-lucky-api.vercel.app`

Server-side (SSR/build-time) fetches use the `BACKEND_ORIGIN` environment variable to make absolute URL requests.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  fetch('/api/generate')  →  same-origin request              │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vite/Vercel Proxy                         │
│  /api/*  →  strips /api prefix  →  backend                  │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend (FastAPI)                          │
│  Receives: POST /generate (no /api prefix)                  │
└─────────────────────────────────────────────────────────────┘
```

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/api/base.ts` | Unified API base resolver |
| `src/scripts/api-base.ts` | Re-exports for backwards compatibility |
| `astro.config.mjs` | Vite dev proxy configuration |
| `vercel.json` | Production rewrites + `BACKEND_ORIGIN` env |

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

| Variable | Context | Description |
|----------|---------|-------------|
| `BACKEND_ORIGIN` | Server-only | Absolute URL to backend (e.g., `https://mintlabs-lucky-api.vercel.app`) |

### Local Development

```bash
# .env
BACKEND_ORIGIN=http://localhost:8000
```

Or run backend on :8000 and rely on the default fallback.

### Vercel Deployment

Set `BACKEND_ORIGIN` in:
1. `vercel.json` → `env` section (for build-time)
2. Vercel Project Settings → Environment Variables (for runtime SSR if used)

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

In `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://mintlabs-lucky-api.vercel.app/:path*"
    }
  ]
}
```

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
