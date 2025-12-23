#!/usr/bin/env python3
"""
Test script for RNG models in rng.py
Run with: python test_rng.py
"""

import os
import sys

sys.path.append(os.path.dirname(__file__))

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
    spaced_draw,
)


def test_basic_rng():
    """Test basic SecureRng functionality"""
    rng = SecureRng()

    # Test randint
    for _ in range(100):
        n = rng.randint(1, 10)
        assert 1 <= n <= 10, f"randint out of range: {n}"

    # Test sample_unique
    nums = rng.sample_unique(1, 49, 6)
    assert len(nums) == 6, f"Wrong length: {len(nums)}"
    assert len(set(nums)) == 6, f"Duplicates: {nums}"
    assert all(1 <= n <= 49 for n in nums), f"Out of range: {nums}"
    print("✓ Basic RNG tests passed")


def test_spaced_draw():
    """Test spaced distribution"""
    rng = SecureRng()
    nums = spaced_draw(1, 49, 6, rng)
    assert len(nums) == 6, f"Wrong length: {len(nums)}"
    assert len(set(nums)) == 6, f"Duplicates: {nums}"
    print("✓ Spaced draw test passed")


def test_sum_target():
    """Test sum target generation - this was reported as not working well"""
    rng = SecureRng()

    # Test with Powerball-like numbers (5 numbers from 1-69, sum around 175-200)
    target_sum = 175
    successes = 0
    total_tests = 100

    for _ in range(total_tests):
        nums = draw_sum_target(1, 69, 5, rng, target_sum)
        actual_sum = sum(nums)
        # Allow tolerance of count (5) as per function
        if abs(actual_sum - target_sum) <= 5:
            successes += 1

    success_rate = successes / total_tests
    print(f"✓ Sum target test: {successes}/{total_tests} successes ({success_rate:.1%})")

    # Should have reasonable success rate
    assert success_rate > 0.5, f"Sum target success rate too low: {success_rate:.1%}"

    # Test without target (should use default)
    nums = draw_sum_target(1, 69, 5, rng)
    assert len(nums) == 5, f"Wrong length: {len(nums)}"
    print("✓ Sum target default test passed")


def test_balanced():
    """Test balanced distribution"""
    rng = SecureRng()
    nums = draw_balanced(1, 49, 6, rng)
    assert len(nums) == 6, f"Wrong length: {len(nums)}"
    assert len(set(nums)) == 6, f"Duplicates: {nums}"
    print("✓ Balanced test passed")


def test_odd_even_mix():
    """Test odd-even mix"""
    rng = SecureRng()
    nums = draw_odd_even_mix(1, 49, 6, rng)
    assert len(nums) == 6, f"Wrong length: {len(nums)}"
    odds = sum(1 for n in nums if n % 2 == 1)

    # Should have roughly equal odds/evens (target_odds = count//2 = 3)
    assert 2 <= odds <= 4, f"Odd count out of balance: {odds}"
    print("✓ Odd-even mix test passed")


def test_pattern_avoid():
    """Test pattern avoidance"""
    rng = SecureRng()
    nums = draw_pattern_avoid(1, 49, 6, rng)
    assert len(nums) == 6, f"Wrong length: {len(nums)}"

    sorted_nums = sorted(nums)
    # Check no consecutives
    has_consec = any(sorted_nums[i + 1] - sorted_nums[i] == 1 for i in range(5))
    assert not has_consec, f"Has consecutive numbers: {sorted_nums}"

    print("✓ Pattern avoid test passed")


def test_hot_cold():
    """Test hot/cold numbers"""
    rng = SecureRng()

    # Test hot (should favor higher numbers on average)
    hot_nums = draw_hot_cold(1, 49, 6, rng, "hot")
    hot_avg = sum(hot_nums) / len(hot_nums)

    # Test cold (should favor lower numbers on average)
    cold_nums = draw_hot_cold(1, 49, 6, rng, "cold")
    cold_avg = sum(cold_nums) / len(cold_nums)

    # Hot should have higher average than cold
    assert hot_avg > cold_avg, f"Hot avg {hot_avg:.1f} should be > cold avg {cold_avg:.1f}"

    print("✓ Hot/cold test passed")


def test_birthday():
    """Test birthday-based generation"""
    rng = SecureRng()

    # Test with valid date
    nums = draw_birthday(1, 49, 6, rng, "1990-05-15")
    assert len(nums) == 6, f"Wrong length: {len(nums)}"
    # Should include 5, 15, 19, 90 components where possible
    print("✓ Birthday test passed")


def test_lucky():
    """Test lucky numbers"""
    rng = SecureRng()

    # Test with lucky numbers
    lucky_nums = [7, 13, 42]
    nums = draw_lucky(1, 49, 6, rng, lucky_nums)
    assert len(nums) == 6, f"Wrong length: {len(nums)}"
    # Should include lucky numbers
    assert 7 in nums or 13 in nums or 42 in nums, f"Lucky numbers not included: {nums}"
    print("✓ Lucky test passed")


def test_wheel():
    """Test wheel systems"""
    rng = SecureRng()

    # Test key wheel
    nums = draw_wheel(1, 49, 6, rng, "key")
    assert len(nums) == 6, f"Wrong length: {len(nums)}"
    print("✓ Wheel test passed")


def test_filters():
    """Test filters"""
    rng = SecureRng()

    # Test consecutive filter
    nums = apply_filters(rng, 1, 49, 6, allow_repeats=True, allow_consecutive=False)
    sorted_nums = sorted(nums)
    has_consec = any(sorted_nums[i + 1] - sorted_nums[i] == 1 for i in range(5))
    assert not has_consec, f"Has consecutive despite filter: {sorted_nums}"

    print("✓ Filters test passed")


if __name__ == "__main__":
    print("Running RNG model tests...\n")

    test_basic_rng()
    test_spaced_draw()
    test_sum_target()
    test_balanced()
    test_odd_even_mix()
    test_pattern_avoid()
    test_hot_cold()
    test_birthday()
    test_lucky()
    test_wheel()
    test_filters()

    print("\n🎉 All RNG tests passed!")
