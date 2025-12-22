"""Database connection helpers."""

from collections.abc import Generator
from contextlib import contextmanager
from typing import Any, Optional

try:
    from psycopg_pool import ConnectionPool
except Exception:  # pragma: no cover - optional dependency for tests/local dev
    ConnectionPool = None

from .config import settings

_POOL: Optional[ConnectionPool] = None


def _build_pool() -> ConnectionPool:
    # Use conninfo string instead of kwargs so we can keep options parity with the
    # previous direct connect call.
    options = (
        "-c statement_timeout=3000 "
        "-c idle_in_transaction_session_timeout=30000 "
        "-c lock_timeout=2000"
    )
    conninfo = settings.DATABASE_URL
    return ConnectionPool(
        conninfo=conninfo,
        kwargs={
            "autocommit": True,
            "options": options,
            "sslmode": "require" if settings.ENFORCE_HTTPS else "prefer",
            "application_name": "mintlabs-lucky-api",
        },
        min_size=settings.DB_MIN_CONNECTIONS,
        max_size=settings.DB_MAX_CONNECTIONS,
        timeout=settings.DB_POOL_TIMEOUT,
    )


def get_pool() -> ConnectionPool:
    global _POOL
    if _POOL is None:
        _POOL = _build_pool()
    return _POOL


@contextmanager
def get_conn() -> Generator[Any, None, None]:
    pool = get_pool()
    if pool is None:
        # Connection pool unavailable (e.g., optional dependency not installed)
        # Tests monkeypatch this function, so returning yields a dummy connection.
        raise RuntimeError("ConnectionPool is not available")
    with pool.connection() as conn:
        yield conn
