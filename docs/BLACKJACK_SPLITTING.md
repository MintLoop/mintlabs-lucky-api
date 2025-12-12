# Blackjack Splitting Implementation (Phase 4.5)

## Overview

This document describes the pair splitting feature added to the Blackjack simulator in Phase 4.5.

## Game Rules

### When Splitting is Allowed

- Player's first two cards must be a pair (same rank):
  - Number pairs: 2-2, 3-3, ..., 10-10
  - Face pairs: J-J, Q-Q, K-K
  - Aces: A-A
  - Mixed face cards: 10-J, 10-Q, J-K, etc. (all value 10)

### Splitting Mechanics

1. **Initial Split:**
   - Player's pair is split into two separate hands
   - Second card from original hand becomes first card of Hand 2
   - One new card is dealt to each hand
   - Player places an additional bet equal to the original bet

2. **Playing Split Hands:**
   - Hands are played sequentially (left to right)
   - Each hand is played independently using standard Hit/Stand
   - Player cannot double down after splitting (v1 simplification)
   - Player cannot re-split (v1 simplification)

3. **Settlement:**
   - Each hand is settled independently against the dealer
   - Each hand uses its own bet amount
   - Wins, losses, and pushes are calculated separately

### Special Cases

- **Split Aces (v1):** Each ace receives only one additional card (no hitting)
- **Blackjack after split:** 21 on split hand counts as 21, not natural blackjack (pays 1:1, not 3:2)

## Implementation

### State Structure

```typescript
interface GameState {
  deck: Card[];
  hands: Card[][]; // Array of hands (initially just [playerHand])
  dealerHand: Card[];
  activeHandIndex: number; // Which hand is currently being played
  bets: number[]; // Bet for each hand
  gameOver: boolean;
  handResults: ('win' | 'lose' | 'push' | null)[]; // Result for each hand
  isSplitAces: boolean; // Special flag for split aces
}
```

### CatnipCoin Integration

1. **On Split:**
   - Deduct `baseBet` from balance (second bet)
   - Show notification: `-5 CC (Split)`

2. **On Settlement:**
   - Each hand settles independently
   - Win: `+baseBet * 2` (return bet + winnings)
   - Push: `+baseBet` (return bet only)
   - Lose: No payout

### UI Changes

1. **Split Button:**
   - Appears only when:
     - Player has exactly 2 cards
     - Both cards have same value (rank match for numbers, value match for faces)
     - Player has sufficient balance for second bet
     - Game is not over
   - Disabled after split is used

2. **Multi-Hand Display:**
   - Hands displayed side-by-side in player area
   - Active hand highlighted with border
   - Each hand shows its own total

3. **Settlement Display:**
   - Shows result for each hand
   - Total net change in CatnipCoin

## Files Modified

- `src/pages/casino-lite/blackjack.astro` - Game logic and UI
- `docs/PHASE4_BLACKJACK_FIXES.md` - Add splitting section
- `tests/playwright/casino/blackjack-splitting.spec.ts` - Tests (stub)

## Testing Scenarios

### Manual QA

1. **Basic Split Win:**
   - Deal pair (e.g., 8-8)
   - Click Split
   - Verify balance decreased by 5 CC
   - Play both hands to win
   - Verify +20 CC total (10 CC per hand)

2. **Split Mixed Result:**
   - Split pair
   - Win first hand, lose second
   - Verify +5 CC net (+10 from win, -5 from loss)

3. **Split Push:**
   - Split pair
   - Both hands tie dealer
   - Verify +10 CC (both bets returned)

4. **Insufficient Balance:**
   - Reduce balance to < 10 CC
   - Deal pair
   - Verify Split button is disabled

5. **Split Aces:**
   - Deal A-A
   - Click Split
   - Verify each hand gets only one card
   - Verify no Hit/Stand options (auto-complete)

## Limitations (v1)

- No re-splitting
- No doubling after split
- No insurance side bet
- Split aces receive one card only (standard rule)

## Future Enhancements (Phase 4.6+)

- Re-splitting up to 3 times (4 hands total)
- Double down after split
- Insurance side bet when dealer shows Ace
- Surrender option
