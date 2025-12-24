/**
 * Re-exports from the unified API base resolver.
 * @see src/lib/api/base.ts for implementation details.
 *
 * Browser: Uses "/api" (same-origin, proxied)
 * Server: Uses BACKEND_ORIGIN env var (absolute URL)
 */
export {
  API_BASE,
  BUILD_API_BASE,
  apiBase,
  apiUrl,
  getApiBase,
} from '../lib/api/base';
