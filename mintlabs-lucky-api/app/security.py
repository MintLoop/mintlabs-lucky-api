import time

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse


def _client_ip(scope, trust_proxy: bool) -> str:
    if trust_proxy:
        hdrs = {k.decode().lower(): v.decode() for k, v in scope.get("headers", [])}
        xff = hdrs.get("x-forwarded-for")
        if xff:
            return xff.split(",")[0].strip()
    client = scope.get("client")
    return client[0] if client else "unknown"


class SimpleRateLimitMiddleware(BaseHTTPMiddleware):
    """A tiny in-memory rate limiter for API endpoints.

    Not suitable for multi-process deployments. Keeps a map of client -> (window_start, count).
    """

    def __init__(self, app, max_per_minute: int = 60, trust_proxy: bool = True):
        super().__init__(app)
        self.max_per_minute = max_per_minute
        self.trust_proxy = trust_proxy
        self._store: dict[str, dict[str, float]] = {}

    async def dispatch(self, request: Request, call_next):
        # identify client by X-Forwarded-For or remote addr
        if self.trust_proxy:
            client = request.headers.get(
                "x-forwarded-for", request.client.host if request.client else "anon"
            )
        else:
            client = request.client.host if request.client else "anon"

        now = int(time.time())
        window = now // 60
        entry = self._store.get(client)
        if not entry or entry.get("window") != window:
            # reset window
            self._store[client] = {"window": window, "count": 1}
        else:
            entry["count"] += 1

        if self._store[client]["count"] > self.max_per_minute:
            return JSONResponse({"detail": "rate limit exceeded"}, status_code=429)

        return await call_next(request)
