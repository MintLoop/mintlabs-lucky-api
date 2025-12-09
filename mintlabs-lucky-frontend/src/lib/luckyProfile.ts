/**
 * Lucky Profile Generator
 * Pure client-side synthesis of Birthstone × Rashi × Color Wheel
 * No API calls, no database - all computation happens in the browser
 */

import type { Birthstone, BirthstoneKey } from "../data/birthstones";
import type { Rashi, RashiKey } from "../data/rashis";
import type { ColorData } from "../data/colorWheel";
import { BIRTHSTONES } from "../data/birthstones";
import { RASHIS } from "../data/rashis";
import { getColorByName } from "../data/colorWheel";

export interface LuckyProfileFilters {
  numerology?: boolean;
  hindu?: boolean;
  kabbalah?: boolean;
  buddhist?: boolean;
  christian?: boolean;
}

export interface LuckyProfileInput {
  birthMonth: BirthstoneKey;
  rashi: RashiKey;
  colorName: string;
  filters?: LuckyProfileFilters;
}

export interface LuckyProfileOutput {
  birthstone: Birthstone;
  rashi: Rashi;
  color: ColorData;
  combinedSummary: string;
  luckyFocus: string[];
  suggestedActions: string[];
  luckyNumbers: number[];
  complementaryColor?: ColorData;
  religiousContext?: {
    hindu?: string;
    kabbalah?: string;
    buddhist?: string;
    christian?: string;
  };
}

/**
 * Build a complete lucky profile from three inputs
 */
export function buildLuckyProfile(input: LuckyProfileInput): LuckyProfileOutput {
  const birthstone = BIRTHSTONES[input.birthMonth];
  const rashi = RASHIS[input.rashi];
  const color = getColorByName(input.colorName);

  if (!color) {
    throw new Error(`Color not found: ${input.colorName}`);
  }

  // Synthesize combined traits
  const allTraits = [
    ...birthstone.symbolism,
    ...rashi.traits,
    ...color.traits,
  ];

  // Deduplicate and select top traits
  const uniqueTraits = Array.from(new Set(allTraits));
  const luckyFocus = uniqueTraits.slice(0, 5);

  // Generate combined summary
  const combinedSummary = [
    `Your ${birthstone.month} birthstone (${birthstone.primary}) combines with`,
    `${rashi.english} (${rashi.rashi}) energy and the ${color.displayName} color spectrum`,
    `to create a profile focused on: ${luckyFocus.slice(0, 3).join(", ")}.`,
  ].join(" ");

  // Generate suggested actions
  const suggestedActions = generateActions(birthstone, rashi, color);

  // Calculate lucky numbers (numerology synthesis)
  const luckyNumbers = calculateLuckyNumbers(birthstone, rashi, color, input.filters);

  // Find complementary color
  const complementaryColor = getColorByName(color.complementary);

  // Optional religious context
  const religiousContext = input.filters 
    ? generateReligiousContext(birthstone, rashi, color, input.filters)
    : undefined;

  return {
    birthstone,
    rashi,
    color,
    combinedSummary,
    luckyFocus,
    suggestedActions,
    luckyNumbers,
    complementaryColor,
    religiousContext,
  };
}

/**
 * Generate personalized action recommendations
 */
function generateActions(
  birthstone: Birthstone,
  rashi: Rashi,
  color: ColorData
): string[] {
  const actions: string[] = [];

  // Birthstone action
  const favorableDays = rashi.favorableDays;
  if (favorableDays.length > 0) {
    actions.push(
      `Wear ${birthstone.primary.toLowerCase()} or ${birthstone.alternatives[0]?.toLowerCase() || "related stones"} on ${favorableDays[0]}s`
    );
  }

  // Rashi planet action
  actions.push(
    `Lean into ${rashi.planet} energy: embody ${rashi.traits.slice(0, 2).join(" and ")}`
  );

  // Color action
  actions.push(
    `Use ${color.displayName.toLowerCase()} accents in your workspace or clothing for ${color.traits[0]}`
  );

  // Complementary color suggestion
  actions.push(
    `Balance with ${color.complementary} (complementary color) when you need ${getComplementaryTrait(color.complementary)}`
  );

  // Element-based action
  if (color.element) {
    actions.push(
      `Connect with ${color.element} element through meditation or nature`
    );
  }

  return actions;
}

/**
 * Calculate lucky numbers based on numerology synthesis
 */
function calculateLuckyNumbers(
  birthstone: Birthstone,
  rashi: Rashi,
  color: ColorData,
  filters?: LuckyProfileFilters
): number[] {
  const numbers: number[] = [];

  // Primary numbers from each source
  numbers.push(birthstone.numerology);
  numbers.push(rashi.numerology);
  numbers.push(color.numerology);

  if (filters?.numerology) {
    // Add derived numbers
    const sum = birthstone.numerology + rashi.numerology + color.numerology;
    const reduced = reduceToSingleDigit(sum);
    numbers.push(reduced);

    // Add master numbers if present
    if (sum === 11 || sum === 22 || sum === 33) {
      numbers.push(sum);
    }
  }

  // Remove duplicates and sort
  return Array.from(new Set(numbers)).sort((a, b) => a - b);
}

/**
 * Reduce a number to a single digit (numerology)
 */
function reduceToSingleDigit(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
}

/**
 * Get a trait associated with a complementary color
 */
function getComplementaryTrait(colorName: string): string {
  const traitMap: Record<string, string> = {
    red: "energy and action",
    blue: "calm and trust",
    yellow: "optimism and clarity",
    orange: "enthusiasm and creativity",
    green: "balance and renewal",
    purple: "spirituality and wisdom",
    cyan: "tranquility and healing",
    magenta: "transformation and passion",
    black: "grounding and protection",
    white: "clarity and new beginnings",
  };

  return traitMap[colorName.toLowerCase()] || "balance";
}

/**
 * Generate religious/spiritual context based on filters
 */
function generateReligiousContext(
  birthstone: Birthstone,
  rashi: Rashi,
  color: ColorData,
  filters: LuckyProfileFilters
): {
  hindu?: string;
  kabbalah?: string;
  buddhist?: string;
  christian?: string;
} {
  const context: any = {};

  if (filters.hindu && rashi.deity) {
    context.hindu = `${rashi.deity} (deity of ${rashi.english}) blesses this combination with ${rashi.traits[0]}. ${rashi.planet} governs your path.`;
  }

  if (filters.kabbalah && color.chakra) {
    context.kabbalah = `${color.displayName} resonates with the ${color.chakra} chakra and the Sefirot of divine light. Consider meditation on this energy center.`;
  }

  if (filters.buddhist && color.element) {
    context.buddhist = `The ${color.element} element connects to Buddhist principles of ${getElementWisdom(color.element)}. Practice mindfulness through this lens.`;
  }

  if (filters.christian) {
    context.christian = `${birthstone.primary} appears in biblical texts symbolizing ${birthstone.symbolism[0]} and divine ${birthstone.symbolism[1] || "grace"}.`;
  }

  return context;
}

/**
 * Get Buddhist wisdom for elements
 */
function getElementWisdom(element: string): string {
  const wisdomMap: Record<string, string> = {
    earth: "stability and grounding",
    water: "flow and adaptability",
    fire: "transformation and purification",
    air: "freedom and spaciousness",
    spirit: "transcendence and awakening",
  };

  return wisdomMap[element.toLowerCase()] || "harmony and balance";
}

/**
 * Generate lucky dates based on numerology
 */
export function generateLuckyDates(profile: LuckyProfileOutput, year: number, month: number): number[] {
  const dates: number[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const reduced = reduceToSingleDigit(day);
    if (profile.luckyNumbers.includes(reduced)) {
      dates.push(day);
    }
  }

  return dates;
}

/**
 * Suggest lucky hours for a given day (0-23)
 */
export function generateLuckyHours(profile: LuckyProfileOutput): number[] {
  // Use numerology to derive 3-5 lucky hours
  return profile.luckyNumbers.flatMap(n => [n, (n + 12) % 24]).slice(0, 5);
}
