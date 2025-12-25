# Lucky Number Generator - Deployment Guide

## Overview
Deploy your FastAPI backend and Astro frontend to production with Supabase database integration.

## CI/CD Pipeline

Automated checks and deployments run through the `CI` GitHub Actions workflow:

- **quality** – Installs Python 3.11 and Node.js 20, runs `make lint`, `make test`, and `make coverage`, and uploads the backend `.coverage` artifact.
- **deploy_staging** – On pushes to `main`, builds both apps with `vercel build` and publishes preview deployments using `vercel deploy --prebuilt`. Targets the protected `staging` environment.
- **deploy_production** – Requires a manual approval (configure in **Settings → Environments → production**). Rebuilds with `--prod` and executes `vercel deploy --prebuilt --prod` for both apps.

### Required secrets

Add the following repository or environment secrets before enabling the workflow:

- `VERCEL_TOKEN` – Vercel CLI token with access to the projects.
- `VERCEL_ORG_ID` – Organisation ID from Vercel.
- `VERCEL_PROJECT_ID` – Default Vercel project ID; used for the frontend when a dedicated ID is not supplied.
- `VERCEL_FRONTEND_PROJECT_ID` *(optional)* – Explicit frontend project ID if different from `VERCEL_PROJECT_ID`.
- `VERCEL_API_PROJECT_ID` *(optional)* – Backend project ID. When omitted, backend deploy steps are skipped.

The workflow runs `vercel pull --yes` in each app directory prior to `vercel build`/`vercel deploy`, ensuring environment variables are populated from the configured Vercel projects.

## Prerequisites
- Vercel account (free tier available)
- Supabase project
- GoDaddy domain management access
- AdSense account (optional)

## Step 1: Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to Settings > API to get your credentials:
   - Project URL
   - Anon/Public Key
3. Create the required tables in Supabase SQL Editor:

```sql
-- Games table
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    wmin INTEGER NOT NULL,
    wmax INTEGER NOT NULL,
    wcount INTEGER NOT NULL,
    bmin INTEGER,
    bmax INTEGER,
    bcount INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Generations table
CREATE TABLE generations (
    id SERIAL PRIMARY KEY,
    game_code VARCHAR(50) NOT NULL,
    mode VARCHAR(50) NOT NULL,
    numbers INTEGER[] NOT NULL,
    bonus INTEGER,
    commitment VARCHAR(64),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample game data
INSERT INTO games (code, name, description, wmin, wmax, wcount, bmin, bmax, bcount) VALUES
('powerball', 'Powerball', 'America''s favorite lottery game', 1, 69, 5, 1, 26, 1),
('megamillions', 'Mega Millions', 'Large jackpot lottery game', 1, 70, 5, 1, 25, 1),
('ca_superlotto', 'SuperLotto Plus', 'California''s largest lottery game', 1, 47, 5, 1, 27, 1),
('ca_daily3', 'Daily 3', 'California Daily 3 - Pick 3 numbers', 0, 9, 3, NULL, NULL, NULL),
('ca_daily4', 'Daily 4', 'California Daily 4 - Pick 4 numbers', 0, 9, 4, NULL, NULL, NULL),
('ca_fantasy5', 'Fantasy 5', 'California Fantasy 5 - Pick 5 numbers', 1, 39, 5, NULL, NULL, NULL),
('lotto_texas', 'Lotto Texas', 'Texas state lottery - Pick 6 numbers', 1, 54, 6, NULL, NULL, NULL),
('ny_take5', 'Take 5', 'New York Take 5 - Pick 5 numbers', 1, 39, 5, NULL, NULL, NULL),
('lotto649', 'Lotto 6/49', 'Canadian national lottery', 1, 49, 6, NULL, NULL, NULL);
```

## Step 2: Deploy Backend (FastAPI) to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy the API:
```bash
cd mintlabs-lucky-api
vercel --prod
```

3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your Supabase connection string
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anon key
   - `API_ALLOWED_ORIGINS`: Comma-separated list of allowed origins for the API (e.g., `https://lucky.mintloop.dev, https://mintlabs-lucky-frontend.vercel.app, http://localhost:4321`)

   After adding your frontend custom domain (for example `lucky.mintloop.dev`) in Vercel, also add it to `API_ALLOWED_ORIGINS` so the backend allows requests from that origin.

4. Note the deployment URL (e.g., `https://mintlabs-lucky-api.vercel.app`)

## Step 3: Deploy Frontend (Astro) to Vercel

1. Deploy the frontend:
```bash
cd mintlabs-lucky-frontend
vercel --prod
```

2. Set environment variables:
   - `PUBLIC_API_BASE`: Your API deployment URL (e.g., `https://mintlabs-lucky-api.vercel.app`)
   - `PUBLIC_ADSENSE_CLIENT`: Your AdSense client ID (optional)

Note about environment variables and secrets:
- Vercel has deprecated team-level `@secret` references for project build validation in favor of configuring environment variables directly on each **Project** per environment (Production/Preview/Development). In practice: set `PUBLIC_API_BASE` and `PUBLIC_ADSENSE_CLIENT` directly in the **frontend project** settings (Project → Settings → Environment Variables) and mark values as **Sensitive**/hidden if appropriate.

- If your deployment fails with a missing variable error, add the required env var directly in the Vercel Project settings rather than relying on a team secret reference. Using the Dashboard is the most reliable approach for monorepos and avoids CLI quirks.

3. Note the frontend deployment URL

## Step 4: DNS Configuration (GoDaddy)

1. Log into your GoDaddy account
2. Go to your domain settings for mintloop.dev
3. Add a CNAME record:
   - Type: CNAME
   - Name: lucky
   - Value: Your Vercel frontend URL (without https://)
   - TTL: 600 seconds

Example:
```
Type: CNAME
Name: lucky
Value: mintlabs-lucky-frontend.vercel.app
TTL: 600
```

## Step 5: Test Deployment

1. Visit `https://lucky.mintloop.dev`
2. Test the number generation functionality
3. Verify database connectivity
4. Check AdSense ads (if configured)

## Alternative Deployment Options

### Backend Alternatives:
- **Railway**: `railway up` (simpler than Vercel for Python)
- **Render**: Web service with persistent free tier
- **Fly.io**: Good for FastAPI with global deployment

### Frontend Alternatives:
- **Netlify**: `netlify deploy --prod`
- **Cloudflare Pages**: `wrangler pages deploy dist`

## Environment Variables Summary

### Backend (.env):
```
DATABASE_URL=postgresql://user:pass@host:5432/db
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### Frontend (.env):
```
PUBLIC_API_BASE=https://your-api-url.vercel.app
PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

## Troubleshooting

1. **Database Connection Issues**: Verify Supabase credentials and connection string
2. **CORS Errors**: Check Vercel function logs for CORS configuration
3. **DNS Propagation**: May take 24-48 hours for DNS changes to propagate
4. **AdSense Not Showing**: Ensure PUBLIC_ADSENSE_CLIENT is set and site is approved

## Cost Estimation (Free Tiers)
- **Vercel**: 100GB bandwidth/month, generous function limits
- **Supabase**: 500MB database, 50MB file storage
- **GoDaddy**: Domain registration (~$15/year for .dev)

Your app should run within free tiers for moderate usage!
