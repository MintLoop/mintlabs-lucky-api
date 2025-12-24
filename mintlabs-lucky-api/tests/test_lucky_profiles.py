"""
Tests for Lucky Profile API (Birthstone × Rashi × Color Wheel)
"""

from fastapi.testclient import TestClient


def test_generate_lucky_profile_success(client: TestClient):
    """Test successful lucky profile generation."""
    payload = {
        "birth_month": "March",
        "rashi": "Mesha",
        "color": "Blue",
    }

    resp = client.post("/v1/lucky/birthstone-rashi", json=payload)
    assert resp.status_code == 200

    data = resp.json()

    # Check top-level structure
    assert "birthstone_profile" in data
    assert "rashi_profile" in data
    assert "color_profile" in data
    assert "lucky_focus" in data
    assert "filters_applied" in data

    # Check birthstone profile
    birthstone = data["birthstone_profile"]
    assert birthstone["month"] == "March"
    assert birthstone["name_primary"] == "Aquamarine"
    assert "traits" in birthstone
    assert isinstance(birthstone["traits"], list)

    # Check rashi profile
    rashi = data["rashi_profile"]
    assert rashi["rashi"] == "Mesha"
    assert rashi["english"] == "Aries"
    assert rashi["planet"] == "Mars"
    assert "qualities" in rashi

    # Check color profile
    color = data["color_profile"]
    assert color["name"] == "Blue"
    assert color["hex"] == "#0000FF"
    assert "associated_traits" in color

    # Check lucky focus
    focus = data["lucky_focus"]
    assert "focus_traits" in focus
    assert isinstance(focus["focus_traits"], list)
    assert len(focus["focus_traits"]) > 0
    assert "primary_color" in focus
    assert "birthstone" in focus
    assert "rashi_energy" in focus
    assert "recommended_actions" in focus
    assert isinstance(focus["recommended_actions"], list)
    assert "lucky_numbers" in focus
    assert isinstance(focus["lucky_numbers"], list)


def test_generate_lucky_profile_with_filters(client: TestClient):
    """Test lucky profile generation with spiritual filters."""
    payload = {
        "birth_month": "July",
        "rashi": "Karka",
        "color": "Red",
        "filters": {
            "numerology": True,
            "hindu": True,
            "kabbalah": True,
        },
    }

    resp = client.post("/v1/lucky/birthstone-rashi", json=payload)
    assert resp.status_code == 200

    data = resp.json()
    filters = data["filters_applied"]
    assert filters["numerology"] is True
    assert filters["hindu"] is True
    assert filters["kabbalah"] is True

    # When hindu filter is on, should include mantra
    actions = data["lucky_focus"]["recommended_actions"]
    mantra_found = any("Chant:" in action for action in actions)
    assert mantra_found


def test_generate_lucky_profile_english_rashi(client: TestClient):
    """Test lucky profile with English rashi name."""
    payload = {
        "birth_month": "December",
        "rashi": "Sagittarius",  # English name
        "color": "Gold",
    }

    resp = client.post("/v1/lucky/birthstone-rashi", json=payload)
    assert resp.status_code == 200

    data = resp.json()
    rashi = data["rashi_profile"]
    assert rashi["english"] == "Sagittarius"
    assert rashi["rashi"] == "Dhanu"


def test_generate_lucky_profile_invalid_month(client: TestClient):
    """Test error handling for invalid birth month."""
    payload = {
        "birth_month": "InvalidMonth",
        "rashi": "Mesha",
        "color": "Blue",
    }

    resp = client.post("/v1/lucky/birthstone-rashi", json=payload)
    assert resp.status_code == 400
    assert "Invalid birth month" in resp.json()["detail"]


def test_generate_lucky_profile_invalid_rashi(client: TestClient):
    """Test error handling for invalid rashi."""
    payload = {
        "birth_month": "January",
        "rashi": "InvalidRashi",
        "color": "Blue",
    }

    resp = client.post("/v1/lucky/birthstone-rashi", json=payload)
    assert resp.status_code == 400
    assert "Invalid rashi" in resp.json()["detail"]


def test_generate_lucky_profile_invalid_color(client: TestClient):
    """Test error handling for invalid color."""
    payload = {
        "birth_month": "January",
        "rashi": "Mesha",
        "color": "InvalidColor",
    }

    resp = client.post("/v1/lucky/birthstone-rashi", json=payload)
    assert resp.status_code == 400
    assert "Invalid color" in resp.json()["detail"]


def test_get_metadata(client: TestClient):
    """Test metadata endpoint returns available options."""
    resp = client.get("/v1/lucky/birthstone-rashi/metadata")
    assert resp.status_code == 200

    data = resp.json()
    assert "months" in data
    assert "rashis" in data
    assert "colors" in data

    # Check structure
    assert isinstance(data["months"], list)
    assert len(data["months"]) == 12
    assert "January" in data["months"]

    assert isinstance(data["rashis"], list)
    assert len(data["rashis"]) == 12
    rashi_names = [r["rashi"] for r in data["rashis"]]
    assert "Mesha" in rashi_names

    assert isinstance(data["colors"], list)
    assert len(data["colors"]) >= 12
    assert "Red" in data["colors"]


def test_lucky_numbers_deterministic(client: TestClient):
    """Test that lucky numbers are deterministic for same input."""
    payload = {
        "birth_month": "May",
        "rashi": "Vrishabha",
        "color": "Green",
    }

    # Call twice
    resp1 = client.post("/v1/lucky/birthstone-rashi", json=payload)
    resp2 = client.post("/v1/lucky/birthstone-rashi", json=payload)

    assert resp1.status_code == 200
    assert resp2.status_code == 200

    nums1 = resp1.json()["lucky_focus"]["lucky_numbers"]
    nums2 = resp2.json()["lucky_focus"]["lucky_numbers"]

    # Same input should produce same lucky numbers
    assert nums1 == nums2


def test_complementary_color_logic(client: TestClient):
    """Test that complementary colors are correctly identified."""
    payload = {
        "birth_month": "August",
        "rashi": "Simha",
        "color": "Red",
    }

    resp = client.post("/v1/lucky/birthstone-rashi", json=payload)
    assert resp.status_code == 200

    data = resp.json()
    complement = data["lucky_focus"]["complementary_color"]

    # Red's complement should be Green
    assert complement == "Green"


def test_recommended_actions_include_stone_and_color(client: TestClient):
    """Test that recommendations include stone and color guidance."""
    payload = {
        "birth_month": "February",
        "rashi": "Kumbha",
        "color": "Violet",
    }

    resp = client.post("/v1/lucky/birthstone-rashi", json=payload)
    assert resp.status_code == 200

    actions = resp.json()["lucky_focus"]["recommended_actions"]

    # Should have stone recommendation
    stone_action = any("amethyst" in action.lower() for action in actions)
    assert stone_action

    # Should have color recommendation
    color_action = any("violet" in action.lower() for action in actions)
    assert color_action

    # Should have numerology cycle
    numerology_action = any("numerology cycle" in action.lower() for action in actions)
    assert numerology_action
