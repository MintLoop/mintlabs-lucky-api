#!/usr/bin/env python3
"""
Demonstration of combined odds calculation for multiple lottery draws.

For independent events, the odds of winning at least once across multiple draws
is calculated as: 1 / (1 - (1 - P_single)^draws)

Where P_single is the probability of winning a single draw.
"""

def demonstrate_combined_odds():
    # Powerball odds: 1 in 292,201,338
    single_odds = 292_201_338
    single_prob = 1 / single_odds

    print("Powerball Combined Odds Demonstration")
    print("=" * 50)
    print(f"Single draw odds: 1 in {single_odds:,}")
    print(f"Single draw probability: {single_prob:.2e}")
    print()

    for sets in [1, 5, 10, 50, 100]:
        # Probability of losing all draws
        prob_lose_all = (1 - single_prob) ** sets

        # Probability of winning at least once
        prob_win_at_least_once = 1 - prob_lose_all

        # Odds of winning at least once
        combined_odds = 1 / prob_win_at_least_once

        print(f"{sets:3d} sets: 1 in {combined_odds:,.0f}  ({prob_win_at_least_once:.2e} chance)")
        print(f"         Improvement factor: {single_odds / combined_odds:.1f}x better odds")

if __name__ == "__main__":
    demonstrate_combined_odds()
