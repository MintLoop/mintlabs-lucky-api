// DEMO ONLY — Phase 4.5 utility layout prototype
// Single source of truth for all tool metadata
// Used by: ToolGrid, /tools index, contextual recommendations

export type ToolTier = 'S' | 'A' | 'B' | 'C';

export type ToolCategory = 
  | 'rng'
  | 'analysis'
  | 'strategy'
  | 'visualization'
  | 'education'
  | 'budget'
  | 'personal'
  | 'fun';

export interface Tool {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDesc: string;
  icon: string;
  href: string;
  tier: ToolTier;
  category: ToolCategory;
  tags: string[];
  relatedTools: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

// ============================================================================
// TIER S — Core RNG + Fundamental Math (Always prominent)
// ============================================================================

const tierSTools: Tool[] = [
  {
    id: 'quick-draw-simulator',
    title: 'Quick Draw Simulator',
    shortTitle: 'Draw Sim',
    description: 'Simulate lottery draws for Powerball, Mega Millions, and more. See your odds in action with multi-game support.',
    shortDesc: 'Simulate multi-game lottery draws',
    icon: '🎲',
    href: '/tools/quick-draw-simulator',
    tier: 'S',
    category: 'rng',
    tags: ['simulator', 'powerball', 'mega millions', 'draw', 'rng'],
    relatedTools: ['probability-visualizer', 'winning-chance-simulator', 'lottery-budget'],
  },
  {
    id: 'probability-visualizer',
    title: 'Probability Visualizer',
    shortTitle: 'Prob Viz',
    description: 'Interactive visualization showing your true odds of winning. Click tickets to see how rare jackpots really are.',
    shortDesc: 'Visualize lottery odds interactively',
    icon: '📊',
    href: '/tools/probability-visualizer',
    tier: 'S',
    category: 'visualization',
    tags: ['probability', 'odds', 'visual', 'interactive'],
    relatedTools: ['expected-value-calculator', 'how-rare-is-this', 'why-odds-dont-change'],
  },
  {
    id: 'expected-value-calculator',
    title: 'Expected Value Calculator',
    shortTitle: 'EV Calc',
    description: 'Calculate the mathematical expected value of any lottery ticket. Understand why the house always wins.',
    shortDesc: 'Calculate lottery ticket EV',
    icon: '🧮',
    href: '/tools/expected-value-calculator',
    tier: 'S',
    category: 'strategy',
    tags: ['expected value', 'ev', 'math', 'calculation'],
    relatedTools: ['expected-loss-over-years', 'probability-visualizer', 'lottery-budget'],
  },
  {
    id: 'combination-calculator',
    title: 'Combination Calculator',
    shortTitle: 'Combos',
    description: 'Calculate nCr combinations to understand total possible lottery outcomes. The foundation of odds math.',
    shortDesc: 'Calculate nCr combinations',
    icon: '⚡',
    href: '/tools/combination-calculator',
    tier: 'S',
    category: 'strategy',
    tags: ['combinations', 'ncr', 'math', 'permutations'],
    relatedTools: ['probability-visualizer', 'how-rare-is-this', 'lottery-math-quiz'],
  },
  {
    id: 'pick-generator',
    title: 'Pick-3 & Pick-4 Generator',
    shortTitle: 'Pick Gen',
    description: 'Generate random numbers for daily Pick-3 and Pick-4 games. Better odds than big jackpot games.',
    shortDesc: 'Generate Pick-3/4 numbers',
    icon: '🔢',
    href: '/tools/pick-generator',
    tier: 'S',
    category: 'rng',
    tags: ['pick 3', 'pick 4', 'daily', 'generator'],
    relatedTools: ['quick-draw-simulator', 'odds-comparison', 'lottery-budget'],
  },
];

// ============================================================================
// TIER A — High-Value Analysis & Strategy
// ============================================================================

const tierATools: Tool[] = [
  {
    id: 'most-drawn-numbers',
    title: 'Most Drawn Numbers',
    shortTitle: 'Hot',
    description: 'See which numbers appear most frequently in historical draws. Remember: past frequency doesn\'t predict future results.',
    shortDesc: 'View hot number frequencies',
    icon: '🔥',
    href: '/tools/most-drawn-numbers',
    tier: 'A',
    category: 'analysis',
    tags: ['hot', 'frequency', 'statistics', 'history'],
    relatedTools: ['least-drawn-numbers', 'heatmap', 'number-trend-graph'],
  },
  {
    id: 'least-drawn-numbers',
    title: 'Least Drawn Numbers',
    shortTitle: 'Cold',
    description: 'Discover which numbers appear least often. Spoiler: cold numbers aren\'t "due" to hit.',
    shortDesc: 'View cold number frequencies',
    icon: '❄️',
    href: '/tools/least-drawn-numbers',
    tier: 'A',
    category: 'analysis',
    tags: ['cold', 'frequency', 'statistics', 'history'],
    relatedTools: ['most-drawn-numbers', 'heatmap', 'why-odds-dont-change'],
  },
  {
    id: 'jackpot-split-calculator',
    title: 'Jackpot Split Calculator',
    shortTitle: 'Split',
    description: 'Estimate how many winners might share your jackpot based on ticket sales and popular number patterns.',
    shortDesc: 'Estimate jackpot splits',
    icon: '💰',
    href: '/tools/jackpot-split-calculator',
    tier: 'A',
    category: 'strategy',
    tags: ['jackpot', 'split', 'winners', 'payout'],
    relatedTools: ['birthday-risk-checker', 'payout-calculator', 'common-combo-checker'],
  },
  {
    id: 'number-trend-graph',
    title: 'Number Trend Graph',
    shortTitle: 'Trends',
    description: 'Visualize number frequency trends over time. Educational tool for understanding randomness.',
    shortDesc: 'View number trends over time',
    icon: '📈',
    href: '/tools/number-trend-graph',
    tier: 'A',
    category: 'visualization',
    tags: ['trends', 'graph', 'history', 'visualization'],
    relatedTools: ['most-drawn-numbers', 'heatmap', 'number-popularity-scorecard'],
  },
  {
    id: 'lottery-budget',
    title: 'Lottery Budget Planner',
    shortTitle: 'Budget',
    description: 'Plan responsible lottery spending with our budget calculator. Set limits you can stick to.',
    shortDesc: 'Plan lottery spending',
    icon: '💵',
    href: '/tools/lottery-budget',
    tier: 'A',
    category: 'budget',
    tags: ['budget', 'spending', 'responsible', 'planning'],
    relatedTools: ['expected-value-calculator', 'expected-loss-over-years', 'break-even'],
    isFeatured: true,
  },
  {
    id: 'ticket-beautifier',
    title: 'Ticket Beautifier',
    shortTitle: 'Beautify',
    description: 'Create beautiful ticket images for gifts, raffles, or keepsakes. Export as PNG with multiple themes.',
    shortDesc: 'Create ticket images',
    icon: '✨',
    href: '/tools/ticket-beautifier',
    tier: 'A',
    category: 'fun',
    tags: ['ticket', 'image', 'export', 'gift'],
    relatedTools: ['raffle-picker', 'pick-generator', 'quick-draw-simulator'],
  },
  {
    id: 'common-combo-checker',
    title: 'Common Combo Checker',
    shortTitle: 'Combos',
    description: 'Check if your numbers match commonly played combinations. Avoid popular picks to reduce split risk.',
    shortDesc: 'Check popular combinations',
    icon: '🔍',
    href: '/tools/common-combo-checker',
    tier: 'A',
    category: 'analysis',
    tags: ['combinations', 'popular', 'common', 'analysis'],
    relatedTools: ['jackpot-split-calculator', 'birthday-risk-checker', 'repeat-checker'],
  },
  {
    id: 'break-even',
    title: 'Break-Even Calculator',
    shortTitle: 'Break-Even',
    description: 'Calculate how many tickets you\'d need to buy to statistically break even. Spoiler: it\'s a lot.',
    shortDesc: 'Calculate break-even point',
    icon: '⚖️',
    href: '/tools/break-even',
    tier: 'A',
    category: 'strategy',
    tags: ['break even', 'math', 'calculation', 'strategy'],
    relatedTools: ['expected-value-calculator', 'expected-loss-over-years', 'lottery-budget'],
  },
  {
    id: 'odds-comparison',
    title: 'Odds Comparison',
    shortTitle: 'Compare',
    description: 'Compare odds across different lottery games. See which games give you the best (still terrible) chances.',
    shortDesc: 'Compare game odds',
    icon: '📋',
    href: '/tools/odds-comparison',
    tier: 'A',
    category: 'education',
    tags: ['odds', 'comparison', 'games', 'probability'],
    relatedTools: ['probability-visualizer', 'expected-value-calculator', 'pick-generator'],
  },
  {
    id: 'birthday-risk-checker',
    title: 'Birthday Risk Checker',
    shortTitle: 'Birthday',
    description: 'See how playing birthday numbers (1-31) increases your split risk due to popularity.',
    shortDesc: 'Check birthday number risks',
    icon: '🎂',
    href: '/tools/birthday-risk-checker',
    tier: 'A',
    category: 'strategy',
    tags: ['birthday', 'split', 'risk', 'popular'],
    relatedTools: ['jackpot-split-calculator', 'common-combo-checker', 'is-my-ticket-balanced'],
  },
  {
    id: 'payout-calculator',
    title: 'Payout Calculator',
    shortTitle: 'Payout',
    description: 'Calculate after-tax payouts for lump sum vs annuity options. See what you\'d actually take home.',
    shortDesc: 'Calculate after-tax payouts',
    icon: '💸',
    href: '/tools/payout-calculator',
    tier: 'A',
    category: 'strategy',
    tags: ['payout', 'tax', 'lump sum', 'annuity'],
    relatedTools: ['annuity-breakdown', 'jackpot-split-calculator', 'lottery-budget'],
  },
  {
    id: 'annuity-breakdown',
    title: 'Annuity Breakdown',
    shortTitle: 'Annuity',
    description: 'Visualize year-by-year annuity payments. Understand the long-term value of annuity vs lump sum.',
    shortDesc: 'Visualize annuity payments',
    icon: '📆',
    href: '/tools/annuity-breakdown',
    tier: 'A',
    category: 'strategy',
    tags: ['annuity', 'payments', 'visualization', 'long-term'],
    relatedTools: ['payout-calculator', 'lottery-budget', 'expected-value-calculator'],
  },
];

// ============================================================================
// TIER B — Specialized & Niche Tools
// ============================================================================

const tierBTools: Tool[] = [
  {
    id: 'heatmap',
    title: 'Number Heatmap',
    shortTitle: 'Heatmap',
    description: 'Visual heatmap of number frequencies across historical draws.',
    shortDesc: 'Number frequency heatmap',
    icon: '🗺️',
    href: '/tools/heatmap',
    tier: 'B',
    category: 'visualization',
    tags: ['heatmap', 'frequency', 'visual', 'analysis'],
    relatedTools: ['most-drawn-numbers', 'least-drawn-numbers', 'number-trend-graph'],
  },
  {
    id: 'pattern-analyzer',
    title: 'Pattern Analyzer',
    shortTitle: 'Patterns',
    description: 'Analyze number patterns in your selections. Educational tool about pattern recognition.',
    shortDesc: 'Analyze number patterns',
    icon: '🔬',
    href: '/tools/pattern-analyzer',
    tier: 'B',
    category: 'analysis',
    tags: ['pattern', 'analysis', 'detection'],
    relatedTools: ['consecutive-number-checker', 'is-my-ticket-balanced', 'repeat-checker'],
  },
  {
    id: 'consecutive-number-checker',
    title: 'Consecutive Number Checker',
    shortTitle: 'Consec',
    description: 'Check for consecutive number sequences in your picks.',
    shortDesc: 'Find consecutive numbers',
    icon: '🔗',
    href: '/tools/consecutive-number-checker',
    tier: 'B',
    category: 'analysis',
    tags: ['consecutive', 'sequence', 'analysis'],
    relatedTools: ['pattern-analyzer', 'is-my-ticket-balanced', 'number-spread-visualizer'],
  },
  {
    id: 'even-odd-ratio-visualizer',
    title: 'Even/Odd Ratio Visualizer',
    shortTitle: 'Even/Odd',
    description: 'Visualize the balance of even and odd numbers in your picks.',
    shortDesc: 'Visualize even/odd balance',
    icon: '⚖️',
    href: '/tools/even-odd-ratio-visualizer',
    tier: 'B',
    category: 'visualization',
    tags: ['even', 'odd', 'ratio', 'balance'],
    relatedTools: ['high-low-ratio-analyzer', 'is-my-ticket-balanced', 'number-spread-visualizer'],
  },
  {
    id: 'high-low-ratio-analyzer',
    title: 'High/Low Ratio Analyzer',
    shortTitle: 'Hi/Lo',
    description: 'Analyze the distribution of high and low numbers in your picks.',
    shortDesc: 'Analyze high/low distribution',
    icon: '📊',
    href: '/tools/high-low-ratio-analyzer',
    tier: 'B',
    category: 'analysis',
    tags: ['high', 'low', 'ratio', 'distribution'],
    relatedTools: ['even-odd-ratio-visualizer', 'is-my-ticket-balanced', 'number-spread-visualizer'],
  },
  {
    id: 'number-spread-visualizer',
    title: 'Number Spread Visualizer',
    shortTitle: 'Spread',
    description: 'Interactive number line showing gaps between your selected numbers.',
    shortDesc: 'Visualize number spread',
    icon: '📏',
    href: '/tools/number-spread-visualizer',
    tier: 'B',
    category: 'visualization',
    tags: ['spread', 'gaps', 'visualization', 'number line'],
    relatedTools: ['consecutive-number-checker', 'is-my-ticket-balanced', 'even-odd-ratio-visualizer'],
  },
  {
    id: 'number-popularity-scorecard',
    title: 'Number Popularity Scorecard',
    shortTitle: 'Scorecard',
    description: 'Composite scoring of numbers based on frequency, recency, and overdue status.',
    shortDesc: 'Number popularity scores',
    icon: '📝',
    href: '/tools/number-popularity-scorecard',
    tier: 'B',
    category: 'analysis',
    tags: ['popularity', 'score', 'composite', 'analysis'],
    relatedTools: ['most-drawn-numbers', 'least-drawn-numbers', 'number-trend-graph'],
  },
  {
    id: 'ticket-variance',
    title: 'Ticket Variance',
    shortTitle: 'Variance',
    description: 'Analyze the statistical variance in your number selections.',
    shortDesc: 'Analyze ticket variance',
    icon: '📉',
    href: '/tools/ticket-variance',
    tier: 'B',
    category: 'analysis',
    tags: ['variance', 'statistics', 'analysis'],
    relatedTools: ['is-my-ticket-balanced', 'number-spread-visualizer', 'pattern-analyzer'],
  },
  {
    id: 'repeat-checker',
    title: 'Repeat Checker',
    shortTitle: 'Repeats',
    description: 'Check if your numbers have appeared together in past draws.',
    shortDesc: 'Check for repeat combinations',
    icon: '🔄',
    href: '/tools/repeat-checker',
    tier: 'B',
    category: 'analysis',
    tags: ['repeat', 'history', 'analysis'],
    relatedTools: ['common-combo-checker', 'pattern-analyzer', 'heatmap'],
  },
  {
    id: 'wheel-spinner',
    title: 'Wheel Spinner',
    shortTitle: 'Wheel',
    description: 'Customizable spinning wheel for random decisions. True crypto-grade randomness.',
    shortDesc: 'Spin the random wheel',
    icon: '🎡',
    href: '/tools/wheel-spinner',
    tier: 'B',
    category: 'rng',
    tags: ['wheel', 'spinner', 'random', 'decision'],
    relatedTools: ['raffle-picker', 'dice-roller', 'coin-flip'],
  },
  {
    id: 'raffle-picker',
    title: 'Raffle Picker',
    shortTitle: 'Raffle',
    description: 'Generate random raffle numbers or pick winners from a list.',
    shortDesc: 'Pick random raffle winners',
    icon: '🎫',
    href: '/tools/raffle-picker',
    tier: 'B',
    category: 'rng',
    tags: ['raffle', 'picker', 'random', 'winner'],
    relatedTools: ['wheel-spinner', 'ticket-beautifier', 'quick-draw-simulator'],
  },
  {
    id: 'dice-roller',
    title: 'Dice Roller',
    shortTitle: 'Dice',
    description: 'Roll virtual dice with true randomness. Multiple dice types supported.',
    shortDesc: 'Roll random dice',
    icon: '🎲',
    href: '/tools/dice-roller',
    tier: 'B',
    category: 'rng',
    tags: ['dice', 'roll', 'random', 'd6', 'd20'],
    relatedTools: ['coin-flip', 'wheel-spinner', 'probability-playground'],
  },
  {
    id: 'coin-flip',
    title: 'Coin Flip',
    shortTitle: 'Coin',
    description: 'Fair coin flip simulator. Demonstrates true 50/50 probability.',
    shortDesc: 'Flip a fair coin',
    icon: '🪙',
    href: '/tools/coin-flip',
    tier: 'B',
    category: 'rng',
    tags: ['coin', 'flip', 'random', '50/50'],
    relatedTools: ['dice-roller', 'probability-playground', 'why-odds-dont-change'],
  },
  {
    id: 'number-wheel',
    title: 'Number Wheel',
    shortTitle: 'Num Wheel',
    description: 'Wheel-based number generator for lottery picks.',
    shortDesc: 'Wheel number generator',
    icon: '🎯',
    href: '/tools/number-wheel',
    tier: 'B',
    category: 'rng',
    tags: ['wheel', 'generator', 'number'],
    relatedTools: ['wheel-spinner', 'quick-draw-simulator', 'pick-generator'],
  },
  {
    id: 'card-picker',
    title: 'Card Picker',
    shortTitle: 'Cards',
    description: 'Random card selection from a standard deck. Great for games and decisions.',
    shortDesc: 'Pick random cards',
    icon: '🃏',
    href: '/tools/card-picker',
    tier: 'B',
    category: 'rng',
    tags: ['card', 'deck', 'random', 'picker'],
    relatedTools: ['wheel-spinner', 'dice-roller', 'raffle-picker'],
  },
];

// ============================================================================
// TIER C — Educational & Reference Tools
// ============================================================================

const tierCTools: Tool[] = [
  {
    id: 'beginners-lottery-guide',
    title: 'Beginner\'s Lottery Guide',
    shortTitle: 'Guide',
    description: 'Interactive slideshow covering lottery basics, myths, and money management.',
    shortDesc: 'Learn lottery basics',
    icon: '📚',
    href: '/tools/beginners-lottery-guide',
    tier: 'C',
    category: 'education',
    tags: ['beginner', 'guide', 'education', 'basics'],
    relatedTools: ['why-odds-dont-change', 'lottery-math-quiz', 'probability-visualizer'],
  },
  {
    id: 'how-rare-is-this',
    title: 'How Rare Is This?',
    shortTitle: 'Rare',
    description: 'Convert probabilities into relatable analogies. Understand just how unlikely jackpots are.',
    shortDesc: 'Probability analogies',
    icon: '🌟',
    href: '/tools/how-rare-is-this',
    tier: 'C',
    category: 'education',
    tags: ['probability', 'analogy', 'rare', 'education'],
    relatedTools: ['probability-visualizer', 'why-odds-dont-change', 'combination-calculator'],
  },
  {
    id: 'why-odds-dont-change',
    title: 'Why Odds Don\'t Change',
    shortTitle: 'Odds Facts',
    description: 'Educational tool explaining why each draw is independent. Combat the gambler\'s fallacy.',
    shortDesc: 'Learn about independent events',
    icon: '🎓',
    href: '/tools/why-odds-dont-change',
    tier: 'C',
    category: 'education',
    tags: ['education', 'odds', 'independent', 'fallacy'],
    relatedTools: ['beginners-lottery-guide', 'probability-visualizer', 'most-drawn-numbers'],
  },
  {
    id: 'lottery-math-quiz',
    title: 'Lottery Math Quiz',
    shortTitle: 'Quiz',
    description: 'Test your understanding of lottery probability and expected value concepts.',
    shortDesc: 'Test your lottery math',
    icon: '🧠',
    href: '/tools/lottery-math-quiz',
    tier: 'C',
    category: 'education',
    tags: ['quiz', 'math', 'education', 'test'],
    relatedTools: ['beginners-lottery-guide', 'combination-calculator', 'expected-value-calculator'],
  },
  {
    id: 'expected-loss-over-years',
    title: 'Expected Loss Over Years',
    shortTitle: 'Loss Calc',
    description: 'Calculate your expected lottery losses over months or years of play.',
    shortDesc: 'Calculate long-term losses',
    icon: '📉',
    href: '/tools/expected-loss-over-years',
    tier: 'C',
    category: 'education',
    tags: ['loss', 'long-term', 'expected value', 'calculation'],
    relatedTools: ['expected-value-calculator', 'lottery-budget', 'break-even'],
  },
  {
    id: 'probability-playground',
    title: 'Probability Playground',
    shortTitle: 'Playground',
    description: 'Interactive simulator for exploring probability concepts with tickets, draws, and years.',
    shortDesc: 'Explore probability interactively',
    icon: '🎪',
    href: '/tools/probability-playground',
    tier: 'C',
    category: 'education',
    tags: ['probability', 'simulation', 'interactive', 'playground'],
    relatedTools: ['probability-visualizer', 'quick-draw-simulator', 'why-odds-dont-change'],
  },
  {
    id: 'is-my-ticket-balanced',
    title: 'Is My Ticket Balanced?',
    shortTitle: 'Balance',
    description: 'Multi-metric analysis of your ticket\'s balance across various heuristics.',
    shortDesc: 'Check ticket balance',
    icon: '⚖️',
    href: '/tools/is-my-ticket-balanced',
    tier: 'C',
    category: 'education',
    tags: ['balance', 'heuristic', 'analysis', 'education'],
    relatedTools: ['even-odd-ratio-visualizer', 'high-low-ratio-analyzer', 'number-spread-visualizer'],
  },
  {
    id: 'birthdate-mapper',
    title: 'Birthdate Mapper',
    shortTitle: 'Birthdate',
    description: 'Map your birthdate to lottery numbers using numerology principles. For fun only!',
    shortDesc: 'Map birthdate to numbers',
    icon: '🎂',
    href: '/tools/birthdate-mapper',
    tier: 'C',
    category: 'personal',
    tags: ['birthdate', 'numerology', 'personal', 'fun'],
    relatedTools: ['lucky-colors-birth-month', 'birthday-risk-checker', 'is-my-ticket-balanced'],
  },
  {
    id: 'lucky-colors-birth-month',
    title: 'Lucky Colors by Birth Month',
    shortTitle: 'Colors',
    description: 'Discover your lucky colors based on birth month and color psychology.',
    shortDesc: 'Find your lucky colors',
    icon: '🌈',
    href: '/tools/lucky-colors-birth-month',
    tier: 'C',
    category: 'personal',
    tags: ['colors', 'lucky', 'birth month', 'personal'],
    relatedTools: ['birthdate-mapper', 'random-color-generator', 'lucky-profile'],
  },
  {
    id: 'winning-chance-simulator',
    title: 'Winning Chance Simulator',
    shortTitle: 'Win Sim',
    description: 'Simulate your chances of winning over many draws.',
    shortDesc: 'Simulate winning chances',
    icon: '🎰',
    href: '/tools/winning-chance-simulator',
    tier: 'C',
    category: 'education',
    tags: ['simulation', 'winning', 'chance', 'probability'],
    relatedTools: ['quick-draw-simulator', 'probability-playground', 'probability-visualizer'],
  },
  {
    id: 'random-color-generator',
    title: 'Random Color Generator',
    shortTitle: 'Rnd Color',
    description: 'Generate random colors with true randomness. Fun utility tool.',
    shortDesc: 'Generate random colors',
    icon: '🎨',
    href: '/tools/random-color-generator',
    tier: 'C',
    category: 'fun',
    tags: ['color', 'random', 'generator', 'fun'],
    relatedTools: ['lucky-colors-birth-month', 'wheel-spinner', 'dice-roller'],
  },
];

// ============================================================================
// Combined Tool List
// ============================================================================

export const tools: Tool[] = [
  ...tierSTools,
  ...tierATools,
  ...tierBTools,
  ...tierCTools,
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getToolById(id: string): Tool | undefined {
  return tools.find(t => t.id === id);
}

export function getToolsByTier(tier: ToolTier): Tool[] {
  return tools.filter(t => t.tier === tier);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter(t => t.category === category);
}

export function getFeaturedTools(): Tool[] {
  return getToolsByTier('S');
}

export function getRelatedTools(id: string): Tool[] {
  const tool = getToolById(id);
  if (!tool) return [];
  return tool.relatedTools
    .map(relatedId => getToolById(relatedId))
    .filter((t): t is Tool => t !== undefined);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return tools;
  
  return tools.filter(tool => 
    tool.title.toLowerCase().includes(q) ||
    tool.shortTitle.toLowerCase().includes(q) ||
    tool.description.toLowerCase().includes(q) ||
    tool.tags.some(tag => tag.toLowerCase().includes(q))
  ).sort((a, b) => {
    // Exact title match first
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    if (aTitle.startsWith(q) && !bTitle.startsWith(q)) return -1;
    if (bTitle.startsWith(q) && !aTitle.startsWith(q)) return 1;
    // Then by tier
    const tierOrder = { S: 0, A: 1, B: 2, C: 3 };
    return tierOrder[a.tier] - tierOrder[b.tier];
  });
}

// Category labels for display
export const categoryLabels: Record<ToolCategory, string> = {
  rng: 'RNG & Random',
  analysis: 'Analysis',
  strategy: 'Strategy',
  visualization: 'Visualization',
  education: 'Education',
  budget: 'Budget',
  personal: 'Personal',
  fun: 'Fun & Utility',
};
