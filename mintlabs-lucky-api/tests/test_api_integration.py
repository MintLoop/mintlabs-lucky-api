from typing import Dict

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="session")
def client():
    return TestClient(app, base_url="http://localhost")


def test_health_endpoint(client):
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"ok": True}


def test_games_endpoint_uses_cache(client):
    resp = client.get("/games")
    assert resp.status_code == 200
    payload = resp.json()
    assert isinstance(payload, list)
    assert payload[0]["code"] == "powerball"


@pytest.mark.parametrize(
    "mode",
    [
        "random",
        "spaced",
        "sum_target",
        "birthday",
        "lucky",
        "wheel",
    ],
)
def test_generate_valid_modes(client, mode):
    request: Dict[str, object] = {
        "game_code": "powerball",
        "mode": mode,
        "sets": 1,
    }
    if mode == "sum_target":
        request["target_sum"] = 175
    elif mode == "birthday":
        request["birth_date"] = "1987-09-21"
    elif mode == "lucky":
        request["lucky_numbers"] = [7, 13, 21]
    elif mode == "wheel":
        request["wheel_type"] = "key"

    resp = client.post("/generate", json=request)
    assert resp.status_code == 200
    data = resp.json()
    assert data["game"] == "powerball"
    assert isinstance(data["numbers"], list)
    assert len(data["numbers"]) == 5


def test_generate_rejects_unknown_game(client):
    resp = client.post(
        "/generate",
        json={"game_code": "unknown", "mode": "random"},
    )
    assert resp.status_code == 404


def test_generate_handles_bad_mode(client):
    resp = client.post(
        "/generate",
        json={"game_code": "powerball", "mode": "invalid"},
    )
    assert resp.status_code == 422
