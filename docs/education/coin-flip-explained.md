# Coin Flip Probability Explained

*Educational resource for the Coin Flip tool*

## Overview

A coin flip is the simplest example of a binary random event with exactly two equally likely outcomes. It's a fundamental concept in probability theory and statistics.

## Basic Probability

For a fair coin:
- **P(Heads) = 1/2 = 0.5 = 50%**
- **P(Tails) = 1/2 = 0.5 = 50%**

Every flip is independent—previous results don't affect future outcomes.

## The Gambler's Fallacy

### What It Is
The **gambler's fallacy** is the mistaken belief that past events influence future independent events.

### Example
"I've flipped heads 10 times in a row, so tails is 'due' to appear next."

### Why It's Wrong
- Each flip is **independent**
- The coin has no "memory" of previous flips
- The probability remains 50/50 regardless of streak length
- P(heads after 10 heads) = P(heads) = 50%

### The Reality
While a streak of 10 heads is rare (0.098% probability), once it's happened, the next flip still has a 50% chance of being heads.

## Streaks and Patterns

### Expected Streaks
In a sequence of coin flips, streaks are **normal and expected**:

- In 100 flips, expect a streak of 5-7 heads or tails
- In 1,000 flips, expect a streak of 8-10
- Longer sequences naturally produce longer streaks

### Streak Probability
Probability of getting the same result N times in a row:

| Streak Length | Probability | Percentage |
|---------------|-------------|------------|
| 2 in a row    | 1/4         | 25%        |
| 3 in a row    | 1/8         | 12.5%      |
| 5 in a row    | 1/32        | 3.125%     |
| 10 in a row   | 1/1,024     | 0.098%     |
| 20 in a row   | 1/1,048,576 | 0.000095%  |

## Law of Large Numbers

Over many flips, the **ratio** of heads to tails approaches 50/50, but the **difference** can grow:

### Example: 1,000 Flips
- Expected: 500 heads, 500 tails (50/50 ratio)
- Typical: 485 heads, 515 tails (48.5/51.5 ratio)
- Difference: 30 flips apart

### Example: 10,000 Flips
- Expected: 5,000 heads, 5,000 tails
- Typical: 4,970 heads, 5,030 tails (49.7/50.3 ratio)
- Difference: 60 flips apart (larger absolute difference, but smaller ratio)

**Key Insight:** The **percentage** approaches 50/50, but the **count difference** can increase.

## Multiple Flips

Probability of specific sequences:

- P(HH) = 1/4 = 25%
- P(HT or TH) = 2/4 = 50%
- P(at least 1 heads in 2 flips) = 3/4 = 75%
- P(all heads in N flips) = (1/2)^N

## Real-World Applications

### Sports
- Coin toss to determine first possession
- Fair method to break ties
- Eliminates human bias in selection

### Decision Making
- Quick, unbiased binary choice
- No skill or strategy involved
- Perfectly fair if coin is fair

### Statistics & Research
- Random assignment in experiments
- Simulating random events
- Teaching probability concepts

## Common Questions

### Q: Can I predict the next flip based on patterns?
**A:** No. Each flip is independent. Patterns in past flips don't predict future results.

### Q: If I flip 100 times, will I get exactly 50 heads?
**A:** Probably not exactly 50, but likely close (45-55 range). Over millions of flips, it approaches 50%.

### Q: What if I see 20 heads in a row?
**A:** Very rare (0.000095% chance), but if it happens, the next flip still has a 50% chance of being heads. The coin doesn't "know" it's on a streak.

### Q: Are digital coin flips truly random?
**A:** They use pseudo-random number generators (PRNGs) that are statistically random enough for practical purposes, though not perfectly random like physical coins.

## Further Reading

- [Probability Basics](probability-basics.md)
- [How RNG Tools Work](rng-explained.md)
- [Understanding Independence](dice-probability.md)

---

*This document is part of the Phase 4 EDU system. For tool implementation details, see `/tools/coin-flip`.*
