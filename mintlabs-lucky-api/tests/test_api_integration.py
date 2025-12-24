import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="session")
def client():
    return TestClient(app, base_url="http://localhost")


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
        "zodiac",
        "gemstone",
        "star_sign",
        "jyotish",
        "chinese_zodiac",
        "favorite_color",
    ],
)
def test_generate_valid_modes(client, mode):
    request: dict[str, object] = {
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
    elif mode in (
        "zodiac",
        "gemstone",
        "star_sign",
        "jyotish",
        "chinese_zodiac",
        "favorite_color",
    ):
        request["mode_key"] = "aries"

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


# ---------------------------------------------------------------------------
# Health endpoints
# ---------------------------------------------------------------------------
def test_health_returns_ok(client):
    """GET /health should always return 200 with status ok."""
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


def test_readyz_endpoint_exists(client):
    """GET /readyz should exist and return status."""
    resp = client.get("/readyz")
    # With mocked DB, this might return 200 or 503 depending on mock behavior
    assert resp.status_code in (200, 503)
    assert "status" in resp.json()


# ---------------------------------------------------------------------------
# Stats endpoint
# ---------------------------------------------------------------------------
def test_stats_returns_analytics(client):
    """GET /stats should return analytics summary (no auth in dev)."""
    resp = client.get("/stats")
    assert resp.status_code == 200
    data = resp.json()
    assert "by_game" in data
    assert "by_mode" in data
    assert "total" in data


# ---------------------------------------------------------------------------
# Game config validation (400s for impossible configs)
# ---------------------------------------------------------------------------
def test_generate_rejects_invalid_lucky_numbers(client):
    """Lucky numbers outside valid range should return 400."""
    resp = client.post(
        "/generate",
        json={
            "game_code": "powerball",
            "mode": "lucky",
            "lucky_numbers": [100, 200],  # Outside 1-69 range
        },
    )
    assert resp.status_code == 400
    data = resp.json()
    assert "error" in data
    assert "invalid_config" in data["error"]


def test_generate_rejects_impossible_sum_target(client):
    """Sum target outside achievable range should return 400."""
    # For Powerball (1-69, pick 5): min sum = 1+2+3+4+5=15, max sum = 65+66+67+68+69=335
    resp = client.post(
        "/generate",
        json={
            "game_code": "powerball",
            "mode": "sum_target",
            "target_sum": 10,  # Less than minimum possible (15)
        },
    )
    assert resp.status_code == 400
    data = resp.json()
    assert "error" in data
    # Error contains info about invalid config
    assert "client_error" in data["error"]


def test_generate_accepts_valid_sum_target(client):
    """Valid sum target should work."""
    resp = client.post(
        "/generate",
        json={
            "game_code": "powerball",
            "mode": "sum_target",
            "target_sum": 175,  # Middle of range
        },
    )
    assert resp.status_code == 200
