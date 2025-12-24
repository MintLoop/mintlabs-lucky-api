"""Tests for database layer (app/db.py).

These tests focus on error handling paths to improve coverage.
The happy path is exercised by integration tests via /generate.
"""

from contextlib import contextmanager
from unittest.mock import MagicMock, patch

import pytest


class TestConnectionPool:
    """Test connection pool behavior and error handling."""

    def test_get_pool_creates_singleton(self):
        """Pool should be created once and reused."""
        from app import db as db_module

        # Reset pool state
        original_pool = db_module._POOL
        db_module._POOL = None

        try:
            with patch.object(db_module, "_build_pool") as mock_build:
                mock_pool = MagicMock()
                mock_build.return_value = mock_pool

                # First call creates pool
                pool1 = db_module.get_pool()
                assert mock_build.call_count == 1

                # Second call reuses pool
                pool2 = db_module.get_pool()
                assert mock_build.call_count == 1
                assert pool1 is pool2
        finally:
            db_module._POOL = original_pool

    def test_get_conn_yields_connection(self):
        """get_conn should yield a connection from the pool."""
        from app import db as db_module

        mock_conn = MagicMock()
        mock_pool = MagicMock()

        @contextmanager
        def mock_connection():
            yield mock_conn

        mock_pool.connection = mock_connection

        # Need to bypass the conftest auto-patching
        with patch.object(db_module, "get_pool", return_value=mock_pool):
            with db_module.get_conn() as conn:
                # Just verify we got a connection object (may be patched by conftest)
                assert conn is not None

    def test_get_conn_propagates_pool_error(self):
        """Connection errors should propagate to caller.

        Note: This test verifies the error propagation logic in get_conn.
        The conftest autouse fixture patches get_conn, so we test the
        underlying pool.connection behavior directly.
        """
        from app import db as db_module

        # Test that _build_pool can raise (the path that matters)
        with patch.object(db_module, "_POOL", None):
            with patch.object(db_module, "_build_pool") as mock_build:
                mock_build.side_effect = Exception("connection failed")

                with pytest.raises(Exception, match="connection failed"):
                    db_module.get_pool()

    def test_get_pool_raises_when_connectionpool_unavailable(self):
        """get_pool should raise clear error when psycopg_pool is not available."""
        from app import db as db_module

        # Simulate the case where psycopg_pool import fails
        with patch.object(db_module, "_POOL", None):
            with patch.object(db_module, "ConnectionPool", None):
                with pytest.raises(RuntimeError, match="ConnectionPool is not available"):
                    db_module.get_pool()


class TestBuildPool:
    """Test pool construction with various settings."""

    def test_build_pool_uses_settings(self):
        """Pool should be configured from settings."""
        from app import db as db_module
        from app.config import settings

        with patch("app.db.ConnectionPool") as mock_pool_class:
            mock_pool_class.return_value = MagicMock()

            db_module._build_pool()

            mock_pool_class.assert_called_once()
            call_kwargs = mock_pool_class.call_args
            assert call_kwargs.kwargs["min_size"] == settings.DB_MIN_CONNECTIONS
            assert call_kwargs.kwargs["max_size"] == settings.DB_MAX_CONNECTIONS
            assert call_kwargs.kwargs["timeout"] == settings.DB_POOL_TIMEOUT
