// Deck Theme Configuration
// Phase 4 - Casino-Lite Visual System

import type { SuitSet, DeckTheme } from '../types/cards';

export const SUIT_SETS: SuitSet[] = [
  {
    id: 'emoji',
    label: 'Emoji Default',
    icons: {
      spades: '♠️',
      hearts: '♥️',
      diamonds: '♦️',
      clubs: '♣️',
    },
  },
  {
    id: 'classic',
    label: 'Classic Suits',
    icons: {
      spades: '♠',
      hearts: '♥',
      diamonds: '♦',
      clubs: '♣',
    },
  },
  // Future: kawaii, mintloop, pixel, seasonal themes
];

export const DECK_THEMES: DeckTheme[] = [
  {
    id: 'emoji-default',
    label: 'Emoji Deck',
    suitSetId: 'emoji',
    background: 'bg-white',
    rankFontClass: 'font-bold text-slate-900',
    cardFrameClass: 'rounded-lg border-2 border-slate-300 shadow-md',
    backPattern: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
  },
  {
    id: 'classic-green',
    label: 'Classic Green Table',
    suitSetId: 'classic',
    background: 'bg-white',
    rankFontClass: 'font-bold text-slate-900',
    cardFrameClass: 'rounded-lg border-2 border-emerald-600 shadow-lg',
    backPattern: 'bg-gradient-to-br from-emerald-700 to-emerald-900',
  },
  {
    id: 'dark-mode',
    label: 'Dark Mode',
    suitSetId: 'emoji',
    background: 'bg-slate-800',
    rankFontClass: 'font-bold text-white',
    cardFrameClass: 'rounded-lg border-2 border-slate-600 shadow-xl',
    backPattern: 'bg-gradient-to-br from-slate-700 to-slate-900',
  },
  {
    id: 'royal-purple',
    label: 'Royal Purple',
    suitSetId: 'classic',
    background: 'bg-purple-50',
    rankFontClass: 'font-bold text-purple-900',
    cardFrameClass: 'rounded-lg border-2 border-purple-400 shadow-lg',
    backPattern: 'bg-gradient-to-br from-purple-600 to-purple-800',
  },
];

// Helper to get suit set by ID with fallback
export function getSuitSet(id: string): SuitSet {
  return SUIT_SETS.find(set => set.id === id) || SUIT_SETS[0];
}

// Helper to get deck theme by ID with fallback
export function getDeckTheme(id: string): DeckTheme {
  return DECK_THEMES.find(theme => theme.id === id) || DECK_THEMES[0];
}
