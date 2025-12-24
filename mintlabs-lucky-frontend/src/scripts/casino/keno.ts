/**
 * Keno Game Logic for Casino-Lite
 * A fun, educational number-matching game with no money semantics
 */

import { cryptoRandomInt } from '../rng/shuffle';

// Game constants
export const KENO_MAX = 80;        // Numbers 1-80
export const KENO_PICKS = 10;      // Player selects 10 numbers (MVP)
export const KENO_DRAW_COUNT = 20; // House draws 20 numbers

// Hit classification thresholds for k=10 picks
export type HitClassification = 'cold' | 'warm' | 'hot' | 'jackpot';

export interface KenoResult {
  picks: number[];
  draw: number[];
  hits: number[];
  hitCount: number;
  classification: HitClassification;
  message: string;
}

/**
 * Draw unique numbers from 1 to max using crypto RNG
 * Uses Fisher-Yates partial shuffle for efficiency
 */
export function drawUnique(max: number, count: number, seed?: number): number[] {
  // Build array 1 to max
  const pool = Array.from({ length: max }, (_, i) => i + 1);

  // If seed provided (debug only), use seeded PRNG
  // Otherwise use crypto RNG
  const getRandom = seed !== undefined
    ? createSeededRandom(seed)
    : () => cryptoRandomInt(pool.length);

  // Partial Fisher-Yates: only shuffle as many as we need
  for (let i = 0; i < count && i < pool.length; i++) {
    const remaining = pool.length - i;
    const j = i + (getRandom() % remaining);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Return first 'count' numbers, sorted for display
  return pool.slice(0, count).sort((a, b) => a - b);
}

/**
 * Simple seeded PRNG for debug/testing (LCG)
 * NOT cryptographically secure - only for ?seed= debug mode
 */
function createSeededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state;
  };
}

/**
 * Count how many picks match the draw
 */
export function countHits(picks: number[], draw: number[]): number[] {
  const drawSet = new Set(draw);
  return picks.filter(n => drawSet.has(n));
}

/**
 * Classify hit count for k=10 picks
 * Based on approximate probabilities:
 * - 0-2 hits: Cold (most common, ~78%)
 * - 3-4 hits: Warm (~20%)
 * - 5-6 hits: Hot (~2%)
 * - 7+ hits: Jackpot (very rare, <0.1%)
 */
export function classifyHits(hitCount: number): { classification: HitClassification; message: string } {
  if (hitCount <= 2) {
    return {
      classification: 'cold',
      message: hitCount === 0 ? 'No matches - better luck next time!' : `${hitCount} match${hitCount > 1 ? 'es' : ''} - keep trying!`
    };
  }

  if (hitCount <= 4) {
    return {
      classification: 'warm',
      message: `${hitCount} matches - getting warmer!`
    };
  }

  if (hitCount <= 6) {
    return {
      classification: 'hot',
      message: `${hitCount} matches - that's hot!`
    };
  }

  // 7+ hits
  const messages: Record<number, string> = {
    7: '7 matches - incredible luck!',
    8: '8 matches - astronomically rare!',
    9: '9 matches - one in a million!',
    10: 'PERFECT 10 - You hit the jackpot!'
  };

  return {
    classification: 'jackpot',
    message: messages[hitCount] || `${hitCount} matches - amazing!`
  };
}

/**
 * Play a round of Keno
 */
export function playKeno(picks: number[], seed?: number): KenoResult {
  // Validate picks
  if (picks.length !== KENO_PICKS) {
    throw new Error(`Must select exactly ${KENO_PICKS} numbers`);
  }

  if (picks.some(n => n < 1 || n > KENO_MAX)) {
    throw new Error(`Numbers must be between 1 and ${KENO_MAX}`);
  }

  // Draw 20 unique numbers
  const draw = drawUnique(KENO_MAX, KENO_DRAW_COUNT, seed);

  // Find matches
  const hits = countHits(picks, draw);
  const hitCount = hits.length;

  // Classify result
  const { classification, message } = classifyHits(hitCount);

  return {
    picks: [...picks].sort((a, b) => a - b),
    draw,
    hits,
    hitCount,
    classification,
    message
  };
}

/**
 * Calculate exact probability of getting exactly h hits
 * Formula: C(20,h) × C(60,k-h) / C(80,k)
 * where k = picks (10), h = hits
 */
export function calculateHitProbability(k: number, h: number): number {
  // Binomial coefficient C(n, r)
  function binomial(n: number, r: number): number {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;

    // Use smaller r for efficiency
    if (r > n - r) r = n - r;

    let result = 1;
    for (let i = 0; i < r; i++) {
      result = result * (n - i) / (i + 1);
    }
    return Math.round(result);
  }

  const numerator = binomial(20, h) * binomial(60, k - h);
  const denominator = binomial(80, k);

  return numerator / denominator;
}

/**
 * Get probability table for k=10 picks
 */
export function getProbabilityTable(): Array<{ hits: number; probability: number; odds: string }> {
  const results = [];

  for (let h = 0; h <= KENO_PICKS; h++) {
    const prob = calculateHitProbability(KENO_PICKS, h);
    const odds = prob > 0 ? `1 in ${Math.round(1 / prob).toLocaleString()}` : 'N/A';

    results.push({
      hits: h,
      probability: prob,
      odds
    });
  }

  return results;
}

/**
 * Get classification color for theming
 */
export function getClassificationColor(classification: HitClassification): string {
  switch (classification) {
    case 'cold':
      return 'var(--text-muted)';
    case 'warm':
      return 'var(--accent-warning, #f59e0b)';
    case 'hot':
      return 'var(--accent-danger, #ef4444)';
    case 'jackpot':
      return 'var(--accent-success, #22c55e)';
  }
}
