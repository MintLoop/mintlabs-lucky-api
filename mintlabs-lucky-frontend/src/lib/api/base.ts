/**
 * Unified API base resolver for both browser and server (SSR/build) contexts.
 *
 * Browser: Uses "/api" (same-origin) - proxied by Vite (dev) or Vercel rewrites (prod)
 * Server: Uses BACKEND_ORIGIN env var (absolute URL) for SSR/build-time fetches
 */

declare const process: { env: Record<string, string | undefined> };

/**
 * Detect if we're running on the server (SSR or build).
 * import.meta.env.SSR is true during Astro SSR and build phases.
 */
const isServer = import.meta.env.SSR;

/**
 * Server-side backend origin (NOT exposed to browser).
 * Falls back to localhost:8000 for local dev.
 */
const serverBase = isServer
  ? (process.env.BACKEND_ORIGIN ?? 'http://localhost:8000')
  : '';

/**
 * API base URL:
 * - Browser: "/api" (same-origin, proxied)
 * - Server: Absolute URL from BACKEND_ORIGIN
 */
export const apiBase = isServer ? serverBase : '/api';

/**
 * Build a full URL for an API endpoint.
 *
 * @param path - The API path (e.g., "/games" or "games")
 * @returns URL string (absolute on server, relative on browser)
 *
 * @example
 * // Browser: "/api/games"
 * // Server: "https://backend-host/games"
 * apiUrl("/games")
 */
export function apiUrl(path: string): string {
  // Normalize: remove leading slash from path
  const normalizedPath = path.replace(/^\//, '');

  if (isServer) {
    // On server, construct absolute URL
    const base = serverBase.endsWith('/') ? serverBase : `${serverBase}/`;
    return new URL(normalizedPath, base).toString();
  }

  // On browser, return relative /api path
  return `/api/${normalizedPath}`;
}

// Re-exports for backwards compatibility
export const API_BASE = '/api';
export const BUILD_API_BASE = isServer ? serverBase : '/api';

/** @deprecated Use apiUrl() or apiBase instead */
export function getApiBase(): string {
  return apiBase;
}
