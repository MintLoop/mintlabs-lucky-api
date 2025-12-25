import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Supabase client (uses service role for server-side access)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// In-memory cache for games (refreshed every 5 minutes)
let gamesCache: { data: GameData[]; expires: number } = { data: [], expires: 0 };

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

async function getGames(): Promise<GameData[]> {
  const now = Date.now();

  // Return cached data if still valid
  if (gamesCache.data.length > 0 && now < gamesCache.expires) {
    return gamesCache.data;
  }

  // Fetch from Supabase
  const { data, error } = await supabase
    .from('games')
    .select('code, name, white_min, white_max, white_count, bonus_min, bonus_max, bonus_count')
    .order('name');

  if (error) {
    console.error('[games] Supabase error:', error.message);
    // Return stale cache if available
    if (gamesCache.data.length > 0) {
      return gamesCache.data;
    }
    throw error;
  }

  // Update cache (5 minute TTL)
  gamesCache = {
    data: data as GameData[],
    expires: now + 5 * 60 * 1000,
  };

  return gamesCache.data;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const games = await getGames();

    // Set caching headers for CDN and browser
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json(games);
  } catch (error) {
    console.error('[games] Error:', error);
    return res.status(500).json({
      error: 'internal_error',
      message: 'Failed to fetch games'
    });
  }
}
