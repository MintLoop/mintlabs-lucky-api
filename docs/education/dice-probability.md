# Dice Probability

*Educational resource for the Dice Roller tool*

## Overview

Dice are one of the simplest and most common examples of uniform random distributions in probability theory. Each face of a fair die has an equal probability of appearing on any given roll.

## Key Concepts

### Uniform Distribution

A fair die exhibits a **uniform distribution**—every outcome has the same probability:

- For a d6 (6-sided die): P(any face) = 1/6 ≈ 16.67%
- For a d20 (20-sided die): P(any face) = 1/20 = 5%

### Independence

Each die roll is **independent**:
- Previous results do NOT affect future rolls
- A die has no "memory" of past outcomes
- Rolling five 6s in a row doesn't make a 6 less likely on the next roll

### Multiple Dice Probability

When rolling multiple dice, outcomes follow a **bell curve distribution**:

**Example: Rolling 2d6 (two 6-sided dice)**
- Minimum: 2 (1+1)
- Maximum: 12 (6+6)
- Most likely: 7 (can be made 6 ways: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1)

The sum of multiple dice tends toward the average, with extreme values being rare.

## Expected Value

The **expected value** is the average result over many rolls:

- d6: (1+2+3+4+5+6) / 6 = 3.5
- d20: (1+2+...+20) / 20 = 10.5

Over hundreds of rolls, the average approaches this expected value (Law of Large Numbers).

## Common Misconceptions

### The Gambler's Fallacy
**FALSE:** "I've rolled low numbers 5 times in a row, so a high number is 'due'."  
**TRUE:** Each roll is independent. Previous rolls don't influence future probabilities.

### Hot Dice
**FALSE:** "This die keeps rolling 6s—it's lucky!"  
**TRUE:** Random sequences naturally include streaks. Over time, all faces appear equally.

## Practical Applications

- **Tabletop Games:** D&D, board games, probability-based mechanics
- **Statistics:** Understanding sampling and random distributions
- **Decision Making:** Using randomness to eliminate bias
- **Education:** Teaching probability concepts with tangible examples

## Further Reading

- [Probability Theory Basics](probability-basics.md)
- [Understanding Independence](rng-explained.md)
- [Expected Value in Games](../TOOLS_AUDIT_PHASE4.md)

---

*This document is part of the Phase 4 EDU system. For tool implementation details, see `/tools/dice-roller`.*
