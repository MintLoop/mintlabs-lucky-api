import math
import pytest

from app.rng import SecureRng, spaced_draw


def test_secure_rng_randint_within_bounds():
    rng = SecureRng()
    for _ in range(20):
        n = rng.randint(1, 10)
        assert 1 <= n <= 10


def test_secure_rng_sample_unique_distinct():
    rng = SecureRng()
    sample = rng.sample_unique(1, 10, 5)
    assert len(sample) == 5
    assert len(set(sample)) == 5
    assert all(1 <= x <= 10 for x in sample)


def test_spaced_draw_distribution_size():
    rng = SecureRng()
    picks = spaced_draw(1, 100, 5, rng)
    assert len(picks) == 5
    assert len(set(picks)) == 5


@pytest.mark.parametrize(
    "lower, upper, count",
    [
        (1, 10, 3),
        (5, 50, 5),
        (10, 99, 7),
    ],
)
def test_spaced_draw_bounds(lower, upper, count):
    rng = SecureRng()
    picks = spaced_draw(lower, upper, count, rng)
    assert all(lower <= x <= upper for x in picks)
    assert len(picks) == count


def test_spaced_draw_spread():
    rng = SecureRng()
    picks = sorted(spaced_draw(1, 100, 5, rng))
    gaps = [j - i for i, j in zip(picks, picks[1:])]
    assert gaps
    # Ensure we have a reasonable spread: min gap not zero, average gap > 1
    assert min(gaps) > 0
    assert math.fsum(gaps) / len(gaps) > 1
