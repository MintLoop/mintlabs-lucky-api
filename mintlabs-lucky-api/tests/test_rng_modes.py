import statistics

import pytest

from app.rng import (
    SecureRng,
    apply_filters,
    draw_balanced,
    draw_birthday,
    draw_hot_cold,
    draw_lucky,
    draw_odd_even_mix,
    draw_pattern_avoid,
    draw_sum_target,
    draw_wheel,
    draw_personalized,
)


@pytest.fixture(scope="module")
def rng():
    return SecureRng()


def test_sum_target_hits_range(rng):
    target = 175
    successes = 0
    trials = 200
    for _ in range(trials):
        picks = draw_sum_target(1, 69, 5, rng, target)
        if abs(sum(picks) - target) <= 5:
            successes += 1
    assert successes / trials > 0.5


def test_sum_target_default_sum(rng):
    picks = draw_sum_target(1, 69, 5, rng)
    assert len(picks) == 5


def test_balanced_distribution(rng):
    picks = draw_balanced(1, 49, 6, rng)
    assert len(set(picks)) == 6


def test_odd_even_mix_balance(rng):
    picks = draw_odd_even_mix(1, 49, 6, rng)
    odds = sum(1 for n in picks if n % 2 == 1)
    assert 2 <= odds <= 4


def test_pattern_avoid_no_consecutive(rng):
    picks = sorted(draw_pattern_avoid(1, 49, 6, rng))
    gaps = [b - a for a, b in zip(picks, picks[1:])]
    assert all(gap > 1 for gap in gaps)


def test_hot_cold_averages(rng):
    hot = draw_hot_cold(1, 49, 6, rng, "hot")
    cold = draw_hot_cold(1, 49, 6, rng, "cold")
    assert statistics.mean(hot) > statistics.mean(cold)


def test_birthday_parses_iso_dates(rng):
    picks = draw_birthday(1, 49, 6, rng, "1987-09-21")
    assert len(picks) == 6


def test_lucky_numbers_filter(rng):
    picks = draw_lucky(1, 49, 6, rng, [7, 13, 21])
    assert len(picks) == 6


def test_personalized_seed_modes(rng):
    # Ensure personalized-style seeds return the right count and valid ranges
    seeds = ["aries", "leo", "ruby", "sapphire", "blue", "jyotish-asc", "rat"]
    for s in seeds:
        picks = draw_personalized(1, 49, 6, rng, s)
        assert len(picks) == 6
        assert all(1 <= n <= 49 for n in picks)


def test_wheel_modes(rng):
    for wheel_type in ("key", "abbreviated", "full"):
        picks = draw_wheel(1, 49, 6, rng, wheel_type)
        assert len(picks) == 6


def test_apply_filters_allows_repeat_flags(rng):
    numbers = [1, 5, 9, 13]
    result = apply_filters(
    rng,
    1,
    20,
    len(numbers),
    allow_repeats=True,
    allow_consecutive=True,
    recent_numbers=numbers,
)
    assert len(result) == len(numbers)
    assert all(1 <= value <= 20 for value in result)


def test_odd_even_mix_stability(rng):
    # Run several trials to ensure odd/even mix is reasonably balanced
    trials = 50
    for _ in range(trials):
        picks = draw_odd_even_mix(1, 49, 6, rng)
        odds = sum(1 for n in picks if n % 2 == 1)
        assert 1 <= odds <= 5  # allow some flexibility across trials
