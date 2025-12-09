// Card Deck Utilities
// Phase 4 - Casino-Lite Visual System

import type { Card, Rank, Suit } from '../types/cards';

const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];

/**
 * Generate a standard 52-card deck
 */
export function generateStandardDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  return deck;
}

/**
 * Shuffle a deck using Fisher-Yates algorithm with crypto.getRandomValues
 * @param deck - Array of cards to shuffle (modifies in place)
 * @returns The shuffled deck
 */
export function shuffleDeck<T>(deck: T[]): T[] {
  const array = [...deck]; // Create copy to avoid mutating original
  const randomValues = new Uint32Array(array.length);
  crypto.getRandomValues(randomValues);
  
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomValues[i] % (i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  return array;
}

/**
 * Deal cards from a deck
 * @param deck - The deck to deal from
 * @param count - Number of cards to deal
 * @returns Object with dealt cards and remaining deck
 */
export function dealCards(deck: Card[], count: number): { dealt: Card[], remaining: Card[] } {
  const dealt = deck.slice(0, count);
  const remaining = deck.slice(count);
  return { dealt, remaining };
}

/**
 * Format card as readable string (e.g., "Ace of Spades")
 */
export function formatCard(card: Card): string {
  const rankNames: Record<Rank, string> = {
    'A': 'Ace', '2': 'Two', '3': 'Three', '4': 'Four', '5': 'Five',
    '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine', '10': 'Ten',
    'J': 'Jack', 'Q': 'Queen', 'K': 'King',
  };
  const suitNames: Record<Suit, string> = {
    spades: 'Spades', hearts: 'Hearts', diamonds: 'Diamonds', clubs: 'Clubs',
  };
  return `${rankNames[card.rank]} of ${suitNames[card.suit]}`;
}

/**
 * Get card color based on suit
 */
export function getCardColor(suit: Suit): 'red' | 'black' {
  return suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black';
}
