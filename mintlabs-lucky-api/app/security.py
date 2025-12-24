"""Rate limiting middleware with token bucket algorithm."""

import time
from typing import Optional

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse


def _get_client_ip(request: Request, trust_proxy: bool) -> str:
    """Extract client IP, respecting X-Forwarded-For if trust_proxy is enabled."""
    if trust_proxy:
        xff = request.headers.get("x-forwarded-for")
        if xff:
            return xff.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


class SimpleRateLimitMiddleware(BaseHTTPMiddleware):
    """Token bucket rate limiter with burst support.

    Allows a configurable burst of requests, then smoothly refills tokens
    over time. More user-friendly than fixed-window counting.

    Supports separate rate limits for admin paths (stricter).

    Not suitable for multi-process deployments without shared storage.
    """

    def __init__(
        self,
        app,
        max_per_minute: int = 120,
        burst: int = 20,
        trust_proxy: bool = True,
        exempt_paths: Optional[list[str]] = None,
        admin_paths: Optional[list[str]] = None,
        admin_max_per_minute: int = 10,
        admin_burst: int = 3,
    ):
        super().__init__(app)
        self.rate = max_per_minute / 60.0  # tokens per second
        self.burst = burst
        self.trust_proxy = trust_proxy
        self.exempt_paths = set(exempt_paths or [])
        self.admin_paths = set(admin_paths or [])
        self.admin_rate = admin_max_per_minute / 60.0
        self.admin_burst = admin_burst
        self._buckets: dict[str, dict[str, float]] = {}
        self._admin_buckets: dict[str, dict[str, float]] = {}

    async def dispatch(self, request: Request, call_next):
        # Skip rate limiting for exempt paths (health checks, static info)
        # Allow prefix matches so '/v1/lucky' exempts '/v1/lucky/*'
        for p in self.exempt_paths:
            if request.url.path == p or request.url.path.startswith(p.rstrip("/") + "/"):
                return await call_next(request)

        client = _get_client_ip(request, self.trust_proxy)
        now = time.time()

        # Use stricter limits for admin paths
        if request.url.path in self.admin_paths:
            return await self._check_rate(
                client,
                now,
                self._admin_buckets,
                self.admin_rate,
                self.admin_burst,
                call_next,
                request,
            )

        # Normal rate limiting
        return await self._check_rate(
            client,
            now,
            self._buckets,
            self.rate,
            self.burst,
            call_next,
            request,
        )

    async def _check_rate(
        self,
        client: str,
        now: float,
        buckets: dict,
        rate: float,
        burst: int,
        call_next,
        request: Request,
    ):
        """Check rate limit for a client using specified bucket and limits."""
        bucket = buckets.get(client)
        if bucket is None:
            bucket = {"tokens": float(burst), "last": now}
            buckets[client] = bucket

        # Refill tokens based on elapsed time
        elapsed = now - bucket["last"]
        bucket["tokens"] = min(burst, bucket["tokens"] + elapsed * rate)
        bucket["last"] = now

        # Check if request can proceed
        if bucket["tokens"] >= 1.0:
            bucket["tokens"] -= 1.0
            return await call_next(request)

        # Rate limited - calculate retry delay
        retry_after = int((1.0 - bucket["tokens"]) / rate) + 1
        return JSONResponse(
            {
                "error": "client_error:rate_limited",
                "status": 429,
                "retry_after": retry_after,
            },
            status_code=429,
            headers={"Retry-After": str(retry_after)},
        )
