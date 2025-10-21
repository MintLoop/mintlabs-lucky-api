#!/usr/bin/env python3
"""Simple test harness for rng.py"""

from app.rng import SecureRng, spaced_draw

def test_secure_rng():
    rng = SecureRng()
    
    # Test randint
    result = rng.randint(1, 10)
    assert 1 <= result <= 10, f"randint failed: {result}"
    
    # Test sample_unique
    samples = rng.sample_unique(1, 10, 3)
    assert len(samples) == 3, f"sample_unique length failed: {len(samples)}"
    assert len(set(samples)) == 3, f"sample_unique uniqueness failed: {samples}"
    assert all(1 <= x <= 10 for x in samples), f"sample_unique range failed: {samples}"
    
    print("SecureRng tests passed!")

def test_spaced_draw():
    rng = SecureRng()
    
    # Test spaced_draw
    picks = spaced_draw(1, 100, 5, rng)
    assert len(picks) == 5, f"spaced_draw length failed: {len(picks)}"
    assert len(set(picks)) == 5, f"spaced_draw uniqueness failed: {picks}"
    assert all(1 <= x <= 100 for x in picks), f"spaced_draw range failed: {picks}"
    
    print("spaced_draw tests passed!")

if __name__ == "__main__":
    test_secure_rng()
    test_spaced_draw()
    print("All tests passed!")
