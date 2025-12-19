/**
 * RNG & Shuffle Utilities for Casino-Lite Games
 * Uses Web Crypto API for cryptographically secure randomness
 */

// Card type for deck-based games
export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: string;
  value: number;
}

// Deck modes for user selection
export type DeckMode = 'shoe' | 'fresh' | 'infinite';

export interface DeckSettings {
  mode: DeckMode;
  deckCount: number;       // 1, 2, 4, 6, or 8 decks (for shoe/fresh modes)
  reshuffleAt: number;     // 0.5 or 0.75 (only for shoe mode)
}

export const DEFAULT_DECK_SETTINGS: DeckSettings = {
  mode: 'shoe',
  deckCount: 6,
  reshuffleAt: 0.75
};

/**
 * Generate a cryptographically secure random integer in range [0, maxExclusive)
 */
export function cryptoRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) return 0;

  // Use rejection sampling to avoid modulo bias
  const randomBuffer = new Uint32Array(1);
  const maxUint32 = 0xFFFFFFFF;
  const threshold = maxUint32 - (maxUint32 % maxExclusive);

  let randomValue: number;
  do {
    crypto.getRandomValues(randomBuffer);
    randomValue = randomBuffer[0];
  } while (randomValue >= threshold);

  return randomValue % maxExclusive;
}

/**
 * Fisher-Yates shuffle in place using crypto RNG
 */
export function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = cryptoRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Create a shuffled copy of an array
 */
export function shuffleCopy<T>(arr: T[]): T[] {
  const copy = [...arr];
  return shuffleInPlace(copy);
}

/**
 * Generate a standard 52-card deck
 */
export function generateDeck(): Card[] {
  const suits: Card['suit'][] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (let i = 0; i < ranks.length; i++) {
      const rank = ranks[i];
      // Value: A=11, 2-10=face, J/Q/K=10
      let value: number;
      if (rank === 'A') value = 11;
      else if (['J', 'Q', 'K'].includes(rank)) value = 10;
      else value = parseInt(rank, 10);

      deck.push({ suit, rank, value });
    }
  }

  return deck;
}

/**
 * Build a multi-deck shoe (for Blackjack, etc.)
 */
export function buildShoe(deckCount: number = 6): Card[] {
  const shoe: Card[] = [];
  for (let i = 0; i < deckCount; i++) {
    shoe.push(...generateDeck());
  }
  return shuffleInPlace(shoe);
}

/**
 * Draw a card based on deck mode
 * - shoe: draws from shoe, no replacement until reshuffle
 * - fresh: always from a newly shuffled deck (stateless)
 * - infinite: random card with replacement (can repeat)
 */
export function drawCard(
  shoe: Card[],
  mode: DeckMode,
  deckCount: number = 6
): { card: Card; newShoe: Card[] } {
  if (mode === 'infinite') {
    // Draw random card with replacement
    const deck = generateDeck();
    const card = deck[cryptoRandomInt(deck.length)];
    return { card, newShoe: shoe };
  }

  if (mode === 'fresh') {
    // Draw from fresh shuffled deck each time
    const freshDeck = shuffleCopy(generateDeck());
    const card = freshDeck[0];
    return { card, newShoe: freshDeck.slice(1) };
  }

  // Shoe mode: draw from persistent shoe
  if (shoe.length === 0) {
    shoe = buildShoe(deckCount);
  }

  const card = shoe.pop()!;
  return { card, newShoe: shoe };
}

/**
 * Check if shoe needs reshuffling based on threshold
 */
export function needsReshuffle(
  shoe: Card[],
  deckCount: number,
  threshold: number
): boolean {
  const totalCards = deckCount * 52;
  const cardsRemaining = shoe.length;
  const percentRemaining = cardsRemaining / totalCards;
  return percentRemaining < (1 - threshold);
}

/**
 * Get human-readable mode description
 */
export function getModeDescription(mode: DeckMode): string {
  switch (mode) {
    case 'shoe':
      return 'Cards dealt from a multi-deck shoe without replacement. Reshuffles when running low.';
    case 'fresh':
      return 'A completely shuffled deck for each round. No card memory between hands.';
    case 'infinite':
      return 'Each card drawn independently with replacement. Any card can appear multiple times.';
  }
}

/**
 * Get short mode label for UI
 */
export function getModeLabel(mode: DeckMode): string {
  switch (mode) {
    case 'shoe':
      return 'Persistent Shoe';
    case 'fresh':
      return 'Fresh Shuffle';
    case 'infinite':
      return 'Infinite Deck';
  }
}
