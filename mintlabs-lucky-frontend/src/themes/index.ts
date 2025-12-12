// Lucky v2 Theme Registry
// Phase 4.5+ - Seasonal, Kawaii, and Premium themes

export type ThemeType = 'card' | 'app' | 'universal';

export interface ThemeColors {
  accent: string;
  accentSecondary: string;
  background: string;
  surface1: string;
  surface2: string;
  surfaceElevated: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderPrimary: string;
}

export interface ThemeGradients {
  hero: string;
  cardGlow: string;
  accent: string;
}

export interface ThemeAnimation {
  name: string;
  cssClass: string;
  description: string;
}

export interface Theme {
  id: string;
  name: string;
  displayName: string;
  type: ThemeType;
  category: 'seasonal' | 'kawaii' | 'premium' | 'classic' | 'card-deck';
  colors: ThemeColors;
  gradients: ThemeGradients;
  shadows: {
    soft: string;
    glow: string;
  };
  radius: string;
  hasAnimation: boolean;
  animations?: ThemeAnimation[];
  previewWebp?: string;
  previewJpeg?: string;
  cardFront?: string;
  cardBack?: string;
  description: string;
  seasonal?: {
    startMonth: number;  // 1-12
    endMonth: number;
  };
}

// ────────────────────────────────────────────────────────
// SEASONAL THEMES
// ────────────────────────────────────────────────────────

export const WINTER_MINT: Theme = {
  id: 'winter-mint',
  name: 'winter-mint',
  displayName: 'Winter Mint',
  type: 'universal',
  category: 'seasonal',
  colors: {
    accent: '#06b6d4',           // icy teal
    accentSecondary: '#67e8f9',  // mint frost
    background: '#f0fdfa',        // soft white haze
    surface1: '#ccfbf1',
    surface2: '#99f6e4',
    surfaceElevated: '#ffffff',
    textPrimary: '#134e4a',
    textSecondary: '#0f766e',
    textMuted: '#5eead4',
    borderPrimary: '#5eead4',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)',
    cardGlow: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(8, 145, 178, 0.05) 100%)',
    accent: 'linear-gradient(90deg, #06b6d4 0%, #67e8f9 100%)',
  },
  shadows: {
    soft: '0 4px 12px rgba(6, 182, 212, 0.15)',
    glow: '0 0 24px rgba(6, 182, 212, 0.4)',
  },
  radius: 'var(--radius-2xl)',
  hasAnimation: true,
  animations: [
    {
      name: 'snowfall',
      cssClass: 'winter-snowfall',
      description: 'Gentle falling snow particles',
    },
  ],
  description: 'Icy teal with soft mint accents and optional snowfall animation',
  seasonal: { startMonth: 12, endMonth: 2 },
};

export const LUNAR_GOLD: Theme = {
  id: 'lunar-gold',
  name: 'lunar-gold',
  displayName: 'Lunar Gold',
  type: 'universal',
  category: 'seasonal',
  colors: {
    accent: '#eab308',           // gold foil
    accentSecondary: '#dc2626',  // lantern red
    background: '#0c1e3d',        // deep navy
    surface1: '#1e3a5f',
    surface2: '#2d4a6f',
    surfaceElevated: '#3d5a7f',
    textPrimary: '#fef3c7',
    textSecondary: '#fde68a',
    textMuted: '#fcd34d',
    borderPrimary: '#eab308',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #0c1e3d 0%, #1e3a8a 50%, #3730a3 100%)',
    cardGlow: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)',
    accent: 'linear-gradient(90deg, #eab308 0%, #dc2626 100%)',
  },
  shadows: {
    soft: '0 4px 12px rgba(234, 179, 8, 0.2)',
    glow: '0 0 24px rgba(234, 179, 8, 0.5)',
  },
  radius: 'var(--radius-2xl)',
  hasAnimation: true,
  animations: [
    {
      name: 'lanterns',
      cssClass: 'lunar-lanterns',
      description: 'Floating lantern particles (2-3, very subtle)',
    },
  ],
  description: 'Deep navy with gold foil and lantern red accents',
  seasonal: { startMonth: 1, endMonth: 2 },
};

export const SPRING_BLOSSOM: Theme = {
  id: 'spring-blossom',
  name: 'spring-blossom',
  displayName: 'Spring Blossom',
  type: 'universal',
  category: 'seasonal',
  colors: {
    accent: '#ec4899',           // pastel pink
    accentSecondary: '#86efac',  // soft green
    background: '#fdf2f8',        // sakura white
    surface1: '#fce7f3',
    surface2: '#fbcfe8',
    surfaceElevated: '#ffffff',
    textPrimary: '#831843',
    textSecondary: '#9f1239',
    textMuted: '#f472b6',
    borderPrimary: '#f9a8d4',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #86efac 100%)',
    cardGlow: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(134, 239, 172, 0.05) 100%)',
    accent: 'linear-gradient(90deg, #ec4899 0%, #86efac 100%)',
  },
  shadows: {
    soft: '0 4px 12px rgba(236, 72, 153, 0.15)',
    glow: '0 0 24px rgba(236, 72, 153, 0.3)',
  },
  radius: 'var(--radius-2xl)',
  hasAnimation: true,
  animations: [
    {
      name: 'sakura',
      cssClass: 'spring-sakura',
      description: 'Drifting sakura petals',
    },
  ],
  description: 'Pastel pink with soft green and drifting sakura petals',
  seasonal: { startMonth: 3, endMonth: 5 },
};

export const SUMMER_CITRUS: Theme = {
  id: 'summer-citrus',
  name: 'summer-citrus',
  displayName: 'Summer Citrus',
  type: 'universal',
  category: 'seasonal',
  colors: {
    accent: '#fb923c',           // tangerine
    accentSecondary: '#84cc16',  // lime
    background: '#fef9c3',        // lemonade yellow
    surface1: '#fef3c7',
    surface2: '#fde68a',
    surfaceElevated: '#ffffff',
    textPrimary: '#7c2d12',
    textSecondary: '#9a3412',
    textMuted: '#fdba74',
    borderPrimary: '#fed7aa',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #84cc16 100%)',
    cardGlow: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(132, 204, 22, 0.05) 100%)',
    accent: 'linear-gradient(90deg, #fb923c 0%, #84cc16 100%)',
  },
  shadows: {
    soft: '0 4px 12px rgba(251, 146, 60, 0.15)',
    glow: '0 0 24px rgba(251, 146, 60, 0.4)',
  },
  radius: 'var(--radius-2xl)',
  hasAnimation: true,
  animations: [
    {
      name: 'sunbeam',
      cssClass: 'summer-sunbeam',
      description: 'Shimmering sunbeam glow on cards',
    },
  ],
  description: 'Tangerine, lime, and lemonade yellow with sunbeam shimmer',
  seasonal: { startMonth: 6, endMonth: 8 },
};

export const AUTUMN_EMBER: Theme = {
  id: 'autumn-ember',
  name: 'autumn-ember',
  displayName: 'Autumn Ember',
  type: 'universal',
  category: 'seasonal',
  colors: {
    accent: '#ea580c',           // burnt orange
    accentSecondary: '#dc2626',  // maple red
    background: '#7c2d12',        // warm brown
    surface1: '#9a3412',
    surface2: '#c2410c',
    surfaceElevated: '#ea580c',
    textPrimary: '#fef3c7',
    textSecondary: '#fed7aa',
    textMuted: '#fdba74',
    borderPrimary: '#fb923c',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #f59e0b 100%)',
    cardGlow: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(234, 88, 12, 0.1) 100%)',
    accent: 'linear-gradient(90deg, #dc2626 0%, #f59e0b 100%)',
  },
  shadows: {
    soft: '0 4px 12px rgba(234, 88, 12, 0.2)',
    glow: '0 0 24px rgba(234, 88, 12, 0.5)',
  },
  radius: 'var(--radius-2xl)',
  hasAnimation: true,
  animations: [
    {
      name: 'leaves',
      cssClass: 'autumn-leaves',
      description: 'Gentle falling leaves',
    },
  ],
  description: 'Burnt orange, maple red, and warm brown with falling leaves',
  seasonal: { startMonth: 9, endMonth: 11 },
};

// ────────────────────────────────────────────────────────
// KAWAII / CUTE THEMES
// ────────────────────────────────────────────────────────

export const KAWAII_MOCHI: Theme = {
  id: 'kawaii-mochi',
  name: 'kawaii-mochi',
  displayName: 'Kawaii Mochi',
  type: 'universal',
  category: 'kawaii',
  colors: {
    accent: '#fda4af',           // baby pink
    accentSecondary: '#93c5fd',  // sky blue
    background: '#fffbeb',        // cotton white
    surface1: '#fef3c7',
    surface2: '#fce7f3',
    surfaceElevated: '#ffffff',
    textPrimary: '#831843',
    textSecondary: '#9f1239',
    textMuted: '#fda4af',
    borderPrimary: '#fbcfe8',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #fda4af 0%, #fb7185 50%, #93c5fd 100%)',
    cardGlow: 'linear-gradient(135deg, rgba(253, 164, 175, 0.2) 0%, rgba(147, 197, 253, 0.1) 100%)',
    accent: 'linear-gradient(90deg, #fda4af 0%, #93c5fd 100%)',
  },
  shadows: {
    soft: '0 4px 16px rgba(253, 164, 175, 0.2)',
    glow: '0 0 20px rgba(253, 164, 175, 0.4)',
  },
  radius: 'var(--radius-3xl)',
  hasAnimation: true,
  animations: [
    {
      name: 'bounce',
      cssClass: 'kawaii-bounce',
      description: 'Idle bounce animation for featured icons',
    },
  ],
  description: 'Baby pink, cotton white, and sky blue with bouncy animations',
};

export const LUCKY_CAT_CHARM: Theme = {
  id: 'lucky-cat-charm',
  name: 'lucky-cat-charm',
  displayName: 'Lucky Cat Charm',
  type: 'universal',
  category: 'kawaii',
  colors: {
    accent: '#eab308',           // gold
    accentSecondary: '#dc2626',  // red ribbon
    background: '#fef3c7',        // soft cream
    surface1: '#fef9c3',
    surface2: '#fde68a',
    surfaceElevated: '#ffffff',
    textPrimary: '#78350f',
    textSecondary: '#92400e',
    textMuted: '#fcd34d',
    borderPrimary: '#fde68a',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #eab308 0%, #f59e0b 50%, #dc2626 100%)',
    cardGlow: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)',
    accent: 'linear-gradient(90deg, #eab308 0%, #dc2626 100%)',
  },
  shadows: {
    soft: '0 4px 16px rgba(234, 179, 8, 0.2)',
    glow: '0 0 24px rgba(234, 179, 8, 0.5)',
  },
  radius: 'var(--radius-2xl)',
  hasAnimation: true,
  animations: [
    {
      name: 'paw-wave',
      cssClass: 'lucky-cat-wave',
      description: 'Waving paw animation on theme preview',
    },
  ],
  description: 'Gold and cream with waving lucky cat charm',
};

export const MINTY_BEAR: Theme = {
  id: 'minty-bear',
  name: 'minty-bear',
  displayName: 'Minty Bear',
  type: 'universal',
  category: 'kawaii',
  colors: {
    accent: '#6ee7b7',           // mint green
    accentSecondary: '#78350f',  // chocolate brown
    background: '#ecfdf5',        // cream
    surface1: '#d1fae5',
    surface2: '#a7f3d0',
    surfaceElevated: '#ffffff',
    textPrimary: '#064e3b',
    textSecondary: '#065f46',
    textMuted: '#34d399',
    borderPrimary: '#a7f3d0',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 50%, #10b981 100%)',
    cardGlow: 'linear-gradient(135deg, rgba(110, 231, 183, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
    accent: 'linear-gradient(90deg, #6ee7b7 0%, #10b981 100%)',
  },
  shadows: {
    soft: '0 4px 16px rgba(110, 231, 183, 0.2)',
    glow: '0 0 20px rgba(110, 231, 183, 0.4)',
  },
  radius: 'var(--radius-3xl)',
  hasAnimation: true,
  animations: [
    {
      name: 'blink',
      cssClass: 'minty-bear-blink',
      description: 'Cute blink animation for mascot icon',
    },
  ],
  description: 'Mint green, chocolate brown, and cream with blinking mascot',
};

// ────────────────────────────────────────────────────────
// PREMIUM / AESTHETIC THEMES
// ────────────────────────────────────────────────────────

export const NEON_VAPORWAVE: Theme = {
  id: 'neon-vaporwave',
  name: 'neon-vaporwave',
  displayName: 'Neon Vaporwave',
  type: 'universal',
  category: 'premium',
  colors: {
    accent: '#a855f7',           // purple
    accentSecondary: '#06b6d4',  // neon cyan
    background: '#1e1b4b',        // deep indigo
    surface1: '#312e81',
    surface2: '#4c1d95',
    surfaceElevated: '#5b21b6',
    textPrimary: '#fdf4ff',
    textSecondary: '#e9d5ff',
    textMuted: '#d8b4fe',
    borderPrimary: '#c084fc',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #06b6d4 100%)',
    cardGlow: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(6, 182, 212, 0.2) 100%)',
    accent: 'linear-gradient(90deg, #a855f7 0%, #06b6d4 100%)',
  },
  shadows: {
    soft: '0 4px 16px rgba(168, 85, 247, 0.3)',
    glow: '0 0 32px rgba(168, 85, 247, 0.6)',
  },
  radius: 'var(--radius-xl)',
  hasAnimation: true,
  animations: [
    {
      name: 'scanline',
      cssClass: 'vaporwave-scanline',
      description: 'Faint 1px flicker scanline animation',
    },
  ],
  description: 'Purple, neon cyan, and magenta with cyberpunk scanlines',
};

export const MIDNIGHT_VELVET: Theme = {
  id: 'midnight-velvet',
  name: 'midnight-velvet',
  displayName: 'Midnight Velvet',
  type: 'universal',
  category: 'premium',
  colors: {
    accent: '#10b981',           // emerald
    accentSecondary: '#8b5cf6',  // soft violet
    background: '#0f172a',        // obsidian
    surface1: '#1e293b',
    surface2: '#334155',
    surfaceElevated: '#475569',
    textPrimary: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    borderPrimary: '#475569',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #000000 0%, #10b981 50%, #8b5cf6 100%)',
    cardGlow: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
    accent: 'linear-gradient(90deg, #10b981 0%, #8b5cf6 100%)',
  },
  shadows: {
    soft: '0 4px 16px rgba(16, 185, 129, 0.2)',
    glow: '0 0 24px rgba(16, 185, 129, 0.4)',
  },
  radius: 'var(--radius-2xl)',
  hasAnimation: false,
  description: 'Deep emerald, obsidian, and soft violet for luxe contrast',
};

export const LINEN_IVORY: Theme = {
  id: 'linen-ivory',
  name: 'linen-ivory',
  displayName: 'Linen Ivory',
  type: 'universal',
  category: 'premium',
  colors: {
    accent: '#f59e0b',           // gold
    accentSecondary: '#92400e',  // soft brown
    background: '#fffbeb',        // ivory
    surface1: '#fef3c7',
    surface2: '#fde68a',
    surfaceElevated: '#ffffff',
    textPrimary: '#78350f',
    textSecondary: '#92400e',
    textMuted: '#d97706',
    borderPrimary: '#fde68a',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    cardGlow: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)',
    accent: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
  },
  shadows: {
    soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
    glow: '0 0 16px rgba(245, 158, 11, 0.3)',
  },
  radius: 'var(--radius-xl)',
  hasAnimation: false,
  description: 'Ivory, gold, and soft brown for high readability',
};

// ────────────────────────────────────────────────────────
// THEME REGISTRY
// ────────────────────────────────────────────────────────

export const THEMES: Theme[] = [
  // Seasonal
  WINTER_MINT,
  LUNAR_GOLD,
  SPRING_BLOSSOM,
  SUMMER_CITRUS,
  AUTUMN_EMBER,
  
  // Kawaii
  KAWAII_MOCHI,
  LUCKY_CAT_CHARM,
  MINTY_BEAR,
  
  // Premium
  NEON_VAPORWAVE,
  MIDNIGHT_VELVET,
  LINEN_IVORY,
];

// ────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ────────────────────────────────────────────────────────

export function getThemeById(id: string): Theme | undefined {
  return THEMES.find(theme => theme.id === id);
}

export function getThemeAssets(themeId: string): {
  previewWebp?: string;
  previewJpeg?: string;
  cardFront?: string;
  cardBack?: string;
} {
  const theme = getThemeById(themeId);
  if (!theme) return {};
  
  return {
    previewWebp: theme.previewWebp,
    previewJpeg: theme.previewJpeg,
    cardFront: theme.cardFront,
    cardBack: theme.cardBack,
  };
}

export function getThemeCSSVars(theme: Theme): Record<string, string> {
  return {
    '--accent-primary': theme.colors.accent,
    '--accent-secondary': theme.colors.accentSecondary,
    '--bg-base': theme.colors.background,
    '--bg-surface-1': theme.colors.surface1,
    '--bg-surface-2': theme.colors.surface2,
    '--bg-surface-elevated': theme.colors.surfaceElevated,
    '--text-primary': theme.colors.textPrimary,
    '--text-secondary': theme.colors.textSecondary,
    '--text-muted': theme.colors.textMuted,
    '--border-primary': theme.colors.borderPrimary,
    '--gradient-hero': theme.gradients.hero,
    '--gradient-card-glow': theme.gradients.cardGlow,
    '--gradient-theme-accent': theme.gradients.accent,
    '--shadow-soft-md': theme.shadows.soft,
    '--shadow-glow': theme.shadows.glow,
  };
}

export function listFeaturedThemes(): Theme[] {
  // Return current seasonal theme + top 3 others
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  
  const seasonalThemes = THEMES.filter(theme => {
    if (!theme.seasonal) return false;
    const { startMonth, endMonth } = theme.seasonal;
    
    if (startMonth <= endMonth) {
      return currentMonth >= startMonth && currentMonth <= endMonth;
    } else {
      // Wraps year (e.g., Dec-Feb)
      return currentMonth >= startMonth || currentMonth <= endMonth;
    }
  });
  
  const featured = [
    ...seasonalThemes,
    KAWAII_MOCHI,
    NEON_VAPORWAVE,
  ].slice(0, 4);
  
  return featured;
}

export function listSeasonalThemes(): Theme[] {
  return THEMES.filter(theme => theme.category === 'seasonal');
}

export function listKawaiiThemes(): Theme[] {
  return THEMES.filter(theme => theme.category === 'kawaii');
}

export function listPremiumThemes(): Theme[] {
  return THEMES.filter(theme => theme.category === 'premium');
}
