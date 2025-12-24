/**
 * Single-source registry for homepage accordions and hub pages.
 * Any href/title change happens here, not scattered across pages.
 */

export interface HubItem {
  key: string;
  title: string;
  href: string;
  description: string;
  badge?: string;
  kind: 'tool' | 'game';
  icon?: string;
}

export interface HubGroup {
  name: string;
  items: HubItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// CASINO-LITE FEATURED (homepage accordion + hub featured section)
// ─────────────────────────────────────────────────────────────────────────────

export const HOME_CASINO_FEATURED: HubItem[] = [
  {
    key: 'war',
    title: 'War',
    href: '/casino-lite/war',
    description: 'Classic high-card battle against the dealer.',
    kind: 'game',
    icon: '⚔️',
  },
  {
    key: 'blackjack',
    title: 'Blackjack',
    href: '/casino-lite/blackjack',
    description: 'Hit, stand, or double down to beat the house.',
    kind: 'game',
    icon: '🃏',
  },
  {
    key: 'coin-flip',
    title: 'Coin Flip',
    href: '/tools/coin-flip',
    description: 'Fair 50/50 flip with streak tracking.',
    kind: 'game',
    icon: '🪙',
  },
  {
    key: 'keno',
    title: 'Keno',
    href: '/casino-lite/keno',
    description: 'Pick numbers on an 80-ball keno board and watch draws.',
    kind: 'game',
    icon: '🎯',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TOOLS FEATURED (homepage accordion + hub featured section)
// ─────────────────────────────────────────────────────────────────────────────

export const HOME_TOOLS_FEATURED: HubItem[] = [
  {
    key: 'ticket-beautifier',
    title: 'Ticket Beautifier',
    href: '/tools/ticket-beautifier',
    description: 'Create shareable ticket graphics with themes.',
    kind: 'tool',
    icon: '✨',
  },
  {
    key: 'quick-draw-simulator',
    title: 'Quick Draw Simulator',
    href: '/tools/quick-draw-simulator',
    description: 'Run quick random draw simulations.',
    kind: 'tool',
    icon: '🎲',
  },
  {
    key: 'probability-visualizer',
    title: 'Probability Visualizer',
    href: '/tools/probability-visualizer',
    description: 'Compare lottery odds to real-world events.',
    kind: 'tool',
    icon: '📉',
  },
  {
    key: 'number-wheel',
    title: 'Number Wheel',
    href: '/tools/number-wheel',
    description: 'Spin to generate random number picks.',
    kind: 'tool',
    icon: '🎡',
  },
  {
    key: 'lottery-budget',
    title: 'Lottery Budget',
    href: '/tools/lottery-budget',
    description: 'Plan and track your lottery spending.',
    kind: 'tool',
    icon: '📅',
  },
  {
    key: 'combination-calculator',
    title: 'Combination Calculator',
    href: '/tools/combination-calculator',
    description: 'Compute C(n,k) combinations for any game.',
    kind: 'tool',
    icon: '🔢',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TOOLS GROUPS (hub page taxonomy)
// ─────────────────────────────────────────────────────────────────────────────

export const TOOLS_GROUPS: HubGroup[] = [
  {
    name: 'Simulators',
    items: [
      { key: 'quick-draw-simulator', title: 'Quick Draw Simulator', href: '/tools/quick-draw-simulator', description: 'Run quick random draw simulations for practice.', kind: 'tool', icon: '🎲' },
      { key: 'probability-playground', title: 'Probability Playground', href: '/tools/probability-playground', description: 'Interactive probability trials and simulations.', kind: 'tool', icon: '🎮' },
      { key: 'winning-chance', title: 'Win Simulator', href: '/tools/winning-chance-simulator', description: 'Simulate annual win chance playing weekly.', kind: 'tool', icon: '🎰' },
    ],
  },
  {
    name: 'Visualizers',
    items: [
      { key: 'probability-visualizer', title: 'Probability Visualizer', href: '/tools/probability-visualizer', description: 'Compare lottery odds to real-world events.', kind: 'tool', icon: '📉' },
      { key: 'number-wheel', title: 'Number Wheel', href: '/tools/number-wheel', description: 'Spin to generate random number picks.', kind: 'tool', icon: '🎡' },
      { key: 'heatmap', title: 'Number Heatmap', href: '/tools/heatmap', description: 'Heatmap showing frequency distribution.', kind: 'tool', icon: '🗺️' },
      { key: 'number-trend-graph', title: 'Number Trend Graph', href: '/tools/number-trend-graph', description: 'Track frequency trends over time.', kind: 'tool', icon: '📈' },
    ],
  },
  {
    name: 'Planning & Budget',
    items: [
      { key: 'lottery-budget', title: 'Budget Planner', href: '/tools/lottery-budget', description: 'Estimate long-term cost of lottery spending.', kind: 'tool', icon: '📅' },
      { key: 'payout-calculator', title: 'Payout Calculator', href: '/tools/payout-calculator', description: 'Estimate take-home payout after taxes.', kind: 'tool', icon: '💰' },
      { key: 'annuity-breakdown', title: 'Annuity Visualizer', href: '/tools/annuity-breakdown', description: 'Visualize annuity payouts over time.', kind: 'tool', icon: '📆' },
    ],
  },
  {
    name: 'Utilities',
    items: [
      { key: 'ticket-beautifier', title: 'Ticket Beautifier', href: '/tools/ticket-beautifier', description: 'Create and export shareable ticket graphics.', kind: 'tool', icon: '✨' },
      { key: 'birthdate-mapper', title: 'Birthdate Mapper', href: '/tools/birthdate-mapper', description: 'Map birthdays into lottery numbers.', kind: 'tool', icon: '🎂' },
      { key: 'pick-generator', title: 'Pick-3/Pick-4', href: '/tools/pick-generator', description: 'Generate quick picks for daily games.', kind: 'tool', icon: '3️⃣' },
    ],
  },
  {
    name: 'Math & Calculators',
    items: [
      { key: 'combination-calculator', title: 'Combination Calculator', href: '/tools/combination-calculator', description: 'Compute C(n,k) combinations quickly.', kind: 'tool', icon: '🔢' },
      { key: 'expected-value-calculator', title: 'Expected Value Calculator', href: '/tools/expected-value-calculator', description: 'Compute expected value per ticket.', kind: 'tool', icon: '🧮' },
      { key: 'jackpot-split-calculator', title: 'Jackpot Split Calculator', href: '/tools/jackpot-split-calculator', description: 'Estimate how splits affect payouts.', kind: 'tool', icon: '💰' },
      { key: 'break-even', title: 'Break-Even Calculator', href: '/tools/break-even', description: 'Find break-even expected value point.', kind: 'tool', icon: '🧮' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CASINO-LITE GROUPS (hub page taxonomy)
// ─────────────────────────────────────────────────────────────────────────────

export const CASINO_GROUPS: HubGroup[] = [
  {
    name: 'Card Games',
    items: [
      { key: 'war', title: 'War', href: '/casino-lite/war', description: 'Classic high-card battle against the dealer.', kind: 'game', icon: '⚔️' },
      { key: 'blackjack', title: 'Blackjack', href: '/casino-lite/blackjack', description: 'Hit, stand, or double down to beat 21.', kind: 'game', icon: '🃏' },
      { key: 'high-card', title: 'High Card', href: '/casino-lite/high-card', description: 'Simple high-card draw game.', kind: 'game', icon: '🎴' },
    ],
  },
  {
    name: 'Chance & RNG',
    items: [
      { key: 'coin-flip', title: 'Coin Flip', href: '/tools/coin-flip', description: 'Fair 50/50 flip with streak tracking.', kind: 'game', icon: '🪙' },
      { key: 'keno', title: 'Keno', href: '/casino-lite/keno', description: 'Pick numbers on an 80-ball keno board and watch draws.', kind: 'game', icon: '🎯' },
      { key: 'dice-roller', title: 'Dice Roller', href: '/casino-lite/dice-roller', description: 'Simulate rolls of up to six standard 6-sided dice (d6) and analyze totals.', kind: 'game', icon: '🎲' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LEARN MORE (education accordion content)
// ─────────────────────────────────────────────────────────────────────────────

export const LEARN_MORE_ITEMS = [
  {
    key: 'independence',
    title: 'Independence',
    href: '/lottery-odds#independence',
    description: 'Each draw is independent — past results don\'t alter odds.',
  },
  {
    key: 'gamblers-fallacy',
    title: 'Gambler\'s Fallacy',
    href: '/lottery-odds#gamblers-fallacy',
    description: 'No "due" numbers — clusters can appear in truly random data.',
  },
  {
    key: 'the-math',
    title: 'The Math',
    href: '/lottery-math',
    description: 'Combinations, expected value, and probability formulas explained.',
  },
];
