"""Database connection helpers."""

from collections.abc import Generator
from contextlib import contextmanager
from typing import Optional

import psycopg
from psycopg_pool import ConnectionPool

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
def get_conn() -> Generator[psycopg.Connection, None, None]:
    pool = get_pool()
    with pool.connection() as conn:
        yield conn
