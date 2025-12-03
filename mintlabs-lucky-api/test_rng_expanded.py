#!/usr/bin/env python3
"""Test script for the expanded RNG modes"""

import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.rng import (
    SecureRng,
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


def test_mode(name, func, *args):
    """Test a specific RNG mode"""
    print(f"\n=== Testing {name} ===")
    try:
        result = func(*args)
        print(f"Result: {result}")
        print(f"Count: {len(result)}")
        if len(result) > 1:
            print(f"Sum: {sum(result)}")
            print(f"Min: {min(result)}, Max: {max(result)}")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

def main():
    rng = SecureRng()

    # Test parameters for Powerball-like game
    minv, maxv, count = 1, 69, 5

    print("Testing RNG Modes for Lotto/Game Picks")
    print(f"Parameters: min={minv}, max={maxv}, count={count}")

    # Test all modes
    tests = [
        ("Uniform Random", lambda: rng.sample_unique(minv, maxv, count)),
        ("Spaced", lambda: spaced_draw(minv, maxv, count, rng)),
        ("Balanced", lambda: draw_balanced(minv, maxv, count, rng)),
        ("Odd-Even Mix", lambda: draw_odd_even_mix(minv, maxv, count, rng)),
        ("Sum Target", lambda: draw_sum_target(minv, maxv, count, rng, 150)),
        ("Pattern Avoid", lambda: draw_pattern_avoid(minv, maxv, count, rng)),
        ("Hot Numbers", lambda: draw_hot_cold(minv, maxv, count, rng, "hot")),
        ("Cold Numbers", lambda: draw_hot_cold(minv, maxv, count, rng, "cold")),
        ("Birthday", lambda: draw_birthday(minv, maxv, count, rng, "1990-05-15")),
        ("Lucky Numbers", lambda: draw_lucky(minv, maxv, count, rng, [7, 13, 21, 42])),
        ("Wheel - Key", lambda: draw_wheel(minv, maxv, count, rng, "key")),
        ("Wheel - Abbreviated", lambda: draw_wheel(minv, maxv, count, rng, "abbreviated")),
    ]

    passed = 0
    for name, test_func in tests:
        if test_mode(name, test_func):
            passed += 1

    print("\n=== Summary ===")
    print(f"Passed: {passed}/{len(tests)} tests")

    if passed == len(tests):
        print("✅ All RNG modes working correctly!")
    else:
        print("❌ Some tests failed")

if __name__ == "__main__":
    main()
