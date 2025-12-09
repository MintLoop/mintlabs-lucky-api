# Card Drawing Probability

*Educational resource for the Card Picker tool*

## Overview

A standard playing card deck contains 52 cards across 4 suits, each with 13 ranks. Understanding card probability is fundamental to poker, blackjack, and probability theory.

## Deck Composition

**Standard 52-Card Deck:**
- **4 Suits:** ♠ Spades, ♥ Hearts, ♦ Diamonds, ♣ Clubs
- **13 Ranks per suit:** A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K
- **Total:** 4 × 13 = 52 unique cards

### Color Distribution
- **Red cards:** 26 (all Hearts and Diamonds)
- **Black cards:** 26 (all Spades and Clubs)

### Face Cards
- **Face cards:** 12 total (J, Q, K in each suit)
- **Number cards:** 36 (2-10 in each suit)
- **Aces:** 4 (one per suit)

## Basic Probabilities

### Single Card Draw
From a full 52-card deck:

| Event | Probability | Percentage |
|-------|-------------|------------|
| Specific card (e.g., Ace of Spades) | 1/52 | 1.92% |
| Any Ace | 4/52 | 7.69% |
| Any card of one suit (e.g., any Spade) | 13/52 | 25% |
| Any face card (J, Q, K) | 12/52 | 23.08% |
| Any red card | 26/52 | 50% |

## Drawing Modes

### Without Replacement (Default)
**How it works:** Once a card is drawn, it cannot be drawn again until the deck is reset.

**Example:** Drawing 2 cards without replacement
- P(first card is Ace) = 4/52
- P(second card is Ace | first was Ace) = 3/51
- P(both Aces) = (4/52) × (3/51) ≈ 0.45%

**Real-world analogy:** This simulates actual card games where each card is unique.

### With Replacement
**How it works:** After drawing a card, it's "returned" to the deck before the next draw.

**Example:** Drawing 2 cards with replacement
- P(first card is Ace) = 4/52
- P(second card is Ace) = 4/52 (unchanged)
- P(both Aces) = (4/52) × (4/52) ≈ 0.59%

**Real-world analogy:** This represents independent random selection where outcomes don't affect future probabilities.

## Conditional Probability

**Conditional probability** changes when cards are removed from the deck.

### Example: Drawing Two Cards Without Replacement

**Q:** What's the probability of drawing 2 Aces in a row?

**A:** 
- P(first Ace) = 4/52 = 7.69%
- P(second Ace | first was Ace) = 3/51 = 5.88%
- P(two Aces) = (4/52) × (3/51) = 12/2,652 ≈ 0.45%

**Q:** What's the probability of drawing any pair (same rank)?

**A:**
- P(first card) = 52/52 = 100% (any card)
- P(second card matches first) = 3/51 = 5.88%
- P(pair) ≈ 5.88%

## Poker Hand Probabilities

From a 5-card deal (without replacement):

| Hand | Probability | Odds |
|------|-------------|------|
| Royal Flush | 0.00015% | 1 in 649,740 |
| Straight Flush | 0.00139% | 1 in 72,193 |
| Four of a Kind | 0.024% | 1 in 4,165 |
| Full House | 0.144% | 1 in 694 |
| Flush | 0.197% | 1 in 509 |
| Straight | 0.392% | 1 in 255 |
| Three of a Kind | 2.11% | 1 in 47 |
| Two Pair | 4.75% | 1 in 21 |
| One Pair | 42.26% | 1 in 2.4 |
| High Card | 50.12% | 1 in 2 |

## Combinatorics

### Total Possible 5-Card Hands
Using combinations (order doesn't matter):

**C(52, 5) = 52! / (5! × 47!) = 2,598,960 possible hands**

### Specific Hand Calculations

**Example: Probability of Four of a Kind**
1. Choose the rank (13 options)
2. Get all 4 cards of that rank (1 way)
3. Choose 1 card from remaining 48 (48 options)
4. Total: 13 × 1 × 48 = 624 ways
5. P(Four of a Kind) = 624 / 2,598,960 ≈ 0.024%

## Expected Draws Until Event

**Q:** How many cards must I draw (on average) to get an Ace?

**A:** Expected value = 52/4 = 13 cards

This is calculated as: E = (Total cards) / (Target cards)

**Q:** How many draws to see all 4 Aces?

**A:** This is the **coupon collector problem**. Expected: ~37 draws (with replacement)

## Blackjack Basics

### Card Values
- **2-10:** Face value
- **J, Q, K:** 10 points each
- **Ace:** 1 or 11 points (player chooses)

### Blackjack Probability
P(Blackjack on first 2 cards) = P(Ace) × P(10-value card) × 2

- P(Ace first) = 4/52
- P(10-value then) = 16/51 (four 10s + three face cards per suit)
- P(Blackjack) = 2 × (4/52) × (16/51) ≈ 4.83%

(Multiply by 2 because Ace can be first or second)

## Common Misconceptions

### "The Deck Is Hot/Cold"
**FALSE:** Cards don't have memory. Each draw (with replacement) is independent.

### "I'm Due for an Ace"
**FALSE:** If you've drawn 20 cards without an Ace, the remaining Aces don't become "more likely." The probability is now 4/(52-20) = 12.5%, but this is conditional on what's left, not because of "luck."

### "Shuffling Resets Randomness"
**TRUE:** A proper shuffle randomizes the deck, making all permutations equally likely (in theory).

## Further Reading

- [Probability Basics](probability-basics.md)
- [Conditional Probability](rng-explained.md)
- [Combinatorics in Gambling](dice-probability.md)

---

*This document is part of the Phase 4 EDU system. For tool implementation details, see `/tools/card-picker`.*
