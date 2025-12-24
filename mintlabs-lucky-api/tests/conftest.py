from contextlib import contextmanager
from dataclasses import dataclass
from typing import Any

import pytest
from fastapi.testclient import TestClient

from app import db as db_module
from app import main as main_module


@pytest.fixture(scope="session")
def client():
    """Shared TestClient fixture for API tests."""
    return TestClient(main_module.app, base_url="http://localhost")


@dataclass
class _DummyResult:
    def fetchall(self) -> list[Any]:
        return []

    def fetchone(self) -> Any:
        return None


class _DummyConn:
    def execute(self, *args: Any, **kwargs: Any) -> _DummyResult:
        return _DummyResult()


@contextmanager
def _dummy_get_conn():
    yield _DummyConn()


@pytest.fixture(autouse=True)
def _patch_db(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setattr(db_module, "get_conn", _dummy_get_conn)
    monkeypatch.setattr(main_module, "get_conn", _dummy_get_conn)
    yield


@pytest.fixture(autouse=True)
def _prime_game_cache():
    main_module._games_cache["data"] = [
        {
            "code": "powerball",
            "name": "Powerball",
            "white_min": 1,
            "white_max": 69,
            "white_count": 5,
            "bonus_min": 1,
            "bonus_max": 26,
            "bonus_count": 1,
        }
    ]
    main_module._games_cache["index"] = {
        "powerball": main_module._games_cache["data"][0]
    }
    main_module._games_cache["expires"] = 1e12
    yield

    # reset after test to avoid bleeding state between cases
    main_module._games_cache["data"] = []
    main_module._games_cache["index"] = {}
    main_module._games_cache["expires"] = 0.0
