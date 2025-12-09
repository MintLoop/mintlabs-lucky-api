// Card Template System Types
// Phase 4 - Casino-Lite Visual System

export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';

export type Rank =
  | 'A'
  | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
  | 'J' | 'Q' | 'K';

export interface Card {
  rank: Rank;
  suit: Suit;
}

export interface SuitSet {
  id: string;                 // 'emoji', 'classic', 'kawaii', 'mintloop'
  label: string;              // 'Emoji Default', 'Classic Deck', etc.
  icons: Record<Suit, string>; // emoji or URL to PNG/SVG
}

export interface DeckTheme {
  id: string;                // 'emoji-default', 'classic-green'
  label: string;
  suitSetId: string;         // ties into SuitSet
  background?: string;       // CSS gradient or URL to image
  rankFontClass?: string;    // Tailwind font utility
  cardFrameClass?: string;   // Tailwind border/rounded/shadow utilities
  backPattern?: string;      // Card back design (for face-down cards)
}

// Helper type for card values in game logic
export const CARD_VALUES: Record<Rank, number> = {
  'A': 11,  // Ace (can be 1 or 11 in blackjack)
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 10,
  'Q': 10,
  'K': 10,
};

// Suit display names
export const SUIT_NAMES: Record<Suit, string> = {
  spades: 'Spades',
  hearts: 'Hearts',
  diamonds: 'Diamonds',
  clubs: 'Clubs',
};

// Rank display names
export const RANK_NAMES: Record<Rank, string> = {
  'A': 'Ace',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine',
  '10': 'Ten',
  'J': 'Jack',
  'Q': 'Queen',
  'K': 'King',
};
