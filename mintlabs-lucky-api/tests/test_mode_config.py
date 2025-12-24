from app.mode_config import MODE_CONFIG


def test_mode_config_has_expected_categories():
    # ensure expected themed categories are present and contain items
    expected = [
        "zodiac",
        "chinese_zodiac",
        "favorite_color",
        "gemstone",
        "jyotish",
    ]
    for k in expected:
        assert k in MODE_CONFIG
        assert isinstance(MODE_CONFIG[k].get("items", []), list)
        assert len(MODE_CONFIG[k]["items"]) >= 6


def test_each_item_has_seed_and_key():
    for k, v in MODE_CONFIG.items():
        for it in v.get("items", []):
            assert "key" in it and isinstance(it["key"], str) and it["key"]
            assert "seed" in it and isinstance(it["seed"], str) and it["seed"]
