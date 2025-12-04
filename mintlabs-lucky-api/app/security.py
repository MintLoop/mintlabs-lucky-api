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

    Not suitable for multi-process deployments without shared storage.
    """

    def __init__(
        self,
        app,
        max_per_minute: int = 120,
        burst: int = 20,
        trust_proxy: bool = True,
        exempt_paths: Optional[list[str]] = None,
    ):
        super().__init__(app)
        self.rate = max_per_minute / 60.0  # tokens per second
        self.burst = burst
        self.trust_proxy = trust_proxy
        self.exempt_paths = set(exempt_paths or [])
        self._buckets: dict[str, dict[str, float]] = {}

    async def dispatch(self, request: Request, call_next):
        # Skip rate limiting for exempt paths (health checks, static info)
        if request.url.path in self.exempt_paths:
            return await call_next(request)

        client = _get_client_ip(request, self.trust_proxy)
        now = time.time()

        # Get or create bucket for this client
        bucket = self._buckets.get(client)
        if bucket is None:
            bucket = {"tokens": float(self.burst), "last": now}
            self._buckets[client] = bucket

        # Refill tokens based on elapsed time
        elapsed = now - bucket["last"]
        bucket["tokens"] = min(self.burst, bucket["tokens"] + elapsed * self.rate)
        bucket["last"] = now

        # Check if request can proceed
        if bucket["tokens"] >= 1.0:
            bucket["tokens"] -= 1.0
            return await call_next(request)

        # Rate limited - calculate retry delay
        retry_after = int((1.0 - bucket["tokens"]) / self.rate) + 1
        return JSONResponse(
            {
                "detail": "rate limit exceeded",
                "retry_after": retry_after,
            },
            status_code=429,
            headers={"Retry-After": str(retry_after)},
        )
