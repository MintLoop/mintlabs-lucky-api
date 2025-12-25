import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { randomBytes, createHmac, createHash } from 'crypto';

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// HMAC secret for commitments
const HMAC_SECRET = process.env.HMAC_SECRET || 'dev-secret-change-in-prod';

// Allowed modes
const ALLOWED_MODES = new Set([
  'random', 'spaced', 'sum_target', 'birthday', 'lucky', 'wheel',
  'balanced', 'odd_even_mix', 'pattern_avoid', 'hot', 'cold',
  'zodiac', 'gemstone', 'star_sign', 'jyotish', 'chinese_zodiac', 'favorite_color'
]);

interface GenerateRequest {
  game_code: string;
  mode?: string;
  sets?: number;
  target_sum?: number;
  birth_date?: string;
  lucky_numbers?: number[];
  mode_key?: string;
  wheel_type?: string;
}

interface GameData {
  code: string;
  name: string;
  white_min: number;
  white_max: number;
  white_count: number;
  bonus_min: number | null;
  bonus_max: number | null;
  bonus_count: number | null;
}

// In-memory games cache
let gamesCache: { data: Map<string, GameData>; expires: number } = {
  data: new Map(),
  expires: 0
};

async function getGameConfig(gameCode: string): Promise<GameData | null> {
  const now = Date.now();

  if (gamesCache.data.size === 0 || now >= gamesCache.expires) {
    const { data, error } = await supabase
      .from('games')
      .select('code, name, white_min, white_max, white_count, bonus_min, bonus_max, bonus_count');

    if (error) {
      console.error('[generate] Games fetch error:', error.message);
      return null;
    }

    const newCache = new Map<string, GameData>();
    for (const game of data as GameData[]) {
      newCache.set(game.code, game);
    }
    gamesCache = { data: newCache, expires: now + 5 * 60 * 1000 };
  }

  return gamesCache.data.get(gameCode) || null;
}

// Generate cryptographically secure random numbers
function secureRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8) || 1;
  const maxValid = Math.floor(256 ** bytesNeeded / range) * range - 1;

  let value: number;
  do {
    const bytes = randomBytes(bytesNeeded);
    value = bytes.reduce((acc, byte, i) => acc + byte * (256 ** i), 0);
  } while (value > maxValid);

  return min + (value % range);
}

// Sample unique numbers
function sampleUnique(min: number, max: number, count: number): number[] {
  const pool = new Set<number>();
  while (pool.size < count) {
    pool.add(secureRandomInt(min, max));
  }
  return Array.from(pool).sort((a, b) => a - b);
}

// Shuffle array
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = secureRandomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Generate request ID
function newRequestId(): string {
  return randomBytes(8).toString('hex');
}

// HMAC commitment
function hmacCommitment(requestId: string): string {
  return createHmac('sha256', HMAC_SECRET)
    .update(requestId)
    .digest('hex')
    .slice(0, 16);
}

// SHA256 hash
function sha256Hex(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

// Calculate odds
function calculateOdds(
  whiteMin: number, whiteMax: number, whiteCount: number,
  bonusMin: number | null, bonusMax: number | null
): { odds: string; probability: number } {
  const whitePool = whiteMax - whiteMin + 1;

  // C(n, k) = n! / (k! * (n-k)!)
  function combinations(n: number, k: number): number {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 0; i < k; i++) {
      result = result * (n - i) / (i + 1);
    }
    return Math.round(result);
  }

  let totalOdds = combinations(whitePool, whiteCount);

  if (bonusMin !== null && bonusMax !== null) {
    const bonusPool = bonusMax - bonusMin + 1;
    totalOdds *= bonusPool;
  }

  const probability = 100 / totalOdds;
  const oddsDisplay = `1 in ${totalOdds.toLocaleString()}`;

  return { odds: oddsDisplay, probability };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const startTime = Date.now();

  try {
    const body: GenerateRequest = req.body;

    // Validate required fields
    if (!body.game_code) {
      return res.status(400).json({
        error: 'client_error:missing_game_code',
        detail: 'game_code is required'
      });
    }

    const mode = body.mode || 'random';
    if (!ALLOWED_MODES.has(mode)) {
      return res.status(400).json({
        error: 'client_error:invalid_mode',
        detail: `Invalid mode: ${mode}`
      });
    }

    // Get game config
    const game = await getGameConfig(body.game_code);
    if (!game) {
      return res.status(404).json({
        error: 'client_error:not_found',
        detail: 'Unknown game_code'
      });
    }

    const { white_min, white_max, white_count, bonus_min, bonus_max, bonus_count } = game;

    // Generate numbers (simplified - just random mode for now)
    // Extended modes can be added incrementally
    let whites = sampleUnique(white_min, white_max, white_count);
    whites = shuffle(whites);

    let bonus: number | null = null;
    if (bonus_count && bonus_max !== null && bonus_min !== null) {
      bonus = secureRandomInt(bonus_min, bonus_max);
    }

    // Generate identifiers
    const requestId = newRequestId();
    const commitment = hmacCommitment(requestId);
    const latencyMs = Date.now() - startTime;

    // Hash for privacy
    const numbersHash = sha256Hex(
      whites.join('-') + (bonus !== null ? `-${bonus}` : '')
    );

    // Get session (from cookie or anonymous)
    const sessionId = (req.cookies?.ml_session as string) || 'anon';

    // Store in Supabase
    const { error: insertError } = await supabase
      .from('generations')
      .insert({
        session_id: sessionId,
        game_code: body.game_code,
        mode: mode,
        numbers: whites,
        bonus: bonus,
        numbers_hash: numbersHash,
        seed_commitment: commitment,
        request_ms: latencyMs
      });

    if (insertError) {
      console.error('[generate] Insert error:', insertError.message);
      // Continue anyway - don't fail generation if logging fails
    }

    // Calculate odds
    const { odds, probability } = calculateOdds(
      white_min, white_max, white_count,
      bonus_min, bonus_max
    );

    // Build response
    const response = {
      game: body.game_code,
      mode: mode,
      mode_key: body.mode_key || null,
      numbers: whites,
      bonus: bonus,
      commitment: commitment,
      request_id: requestId,
      latency_ms: latencyMs,
      odds: odds,
      probability_percent: probability,
      total_sets: body.sets || 1,
      results: [{
        numbers: whites,
        bonus: bonus,
        commitment: commitment,
        request_id: requestId,
        latency_ms: latencyMs,
        odds: odds,
        probability_percent: probability
      }]
    };

    console.log(`[GEN] ${requestId} game=${body.game_code} mode=${mode} latency=${latencyMs}ms`);

    return res.status(200).json(response);

  } catch (error) {
    console.error('[generate] Error:', error);
    return res.status(500).json({
      error: 'internal_error',
      message: 'Generation failed'
    });
  }
}
