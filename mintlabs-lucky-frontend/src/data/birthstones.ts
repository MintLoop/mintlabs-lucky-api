/**
 * Birthstone data mapped by month
 * Pure static data - no API calls needed
 */

export type BirthstoneKey =
  | "january" | "february" | "march" | "april"
  | "may" | "june" | "july" | "august"
  | "september" | "october" | "november" | "december";

export interface Birthstone {
  month: string;
  primary: string;
  alternatives: string[];
  hex: string;
  symbolism: string[];
  element?: string;
  numerology: number;
}

export const BIRTHSTONES: Record<BirthstoneKey, Birthstone> = {
  january: {
    month: "January",
    primary: "Garnet",
    alternatives: ["Rose Quartz"],
    hex: "#9B2D30",
    symbolism: ["protection", "grounding", "commitment", "vitality"],
    element: "earth",
    numerology: 1,
  },
  february: {
    month: "February",
    primary: "Amethyst",
    alternatives: ["Onyx", "Jasper"],
    hex: "#9966CC",
    symbolism: ["clarity", "intuition", "peace", "spiritual awareness"],
    element: "air",
    numerology: 2,
  },
  march: {
    month: "March",
    primary: "Aquamarine",
    alternatives: ["Bloodstone"],
    hex: "#7FFFD4",
    symbolism: ["courage", "communication", "calm", "clarity"],
    element: "water",
    numerology: 3,
  },
  april: {
    month: "April",
    primary: "Diamond",
    alternatives: ["Clear Quartz", "White Sapphire"],
    hex: "#B9F2FF",
    symbolism: ["strength", "clarity", "purity", "eternal love"],
    element: "fire",
    numerology: 4,
  },
  may: {
    month: "May",
    primary: "Emerald",
    alternatives: ["Chrysoprase"],
    hex: "#50C878",
    symbolism: ["growth", "renewal", "wisdom", "abundance"],
    element: "earth",
    numerology: 5,
  },
  june: {
    month: "June",
    primary: "Pearl",
    alternatives: ["Moonstone", "Alexandrite"],
    hex: "#F0EAD6",
    symbolism: ["purity", "innocence", "lunar energy", "wisdom"],
    element: "water",
    numerology: 6,
  },
  july: {
    month: "July",
    primary: "Ruby",
    alternatives: ["Carnelian"],
    hex: "#E0115F",
    symbolism: ["passion", "vitality", "courage", "success"],
    element: "fire",
    numerology: 7,
  },
  august: {
    month: "August",
    primary: "Peridot",
    alternatives: ["Sardonyx", "Spinel"],
    hex: "#E5E4B1",
    symbolism: ["prosperity", "growth", "dignity", "fame"],
    element: "earth",
    numerology: 8,
  },
  september: {
    month: "September",
    primary: "Sapphire",
    alternatives: ["Lapis Lazuli"],
    hex: "#0F52BA",
    symbolism: ["wisdom", "royalty", "divine favor", "inner peace"],
    element: "air",
    numerology: 9,
  },
  october: {
    month: "October",
    primary: "Opal",
    alternatives: ["Tourmaline"],
    hex: "#A8C3BC",
    symbolism: ["hope", "creativity", "inspiration", "innocence"],
    element: "water",
    numerology: 1,
  },
  november: {
    month: "November",
    primary: "Topaz",
    alternatives: ["Citrine"],
    hex: "#FFC87C",
    symbolism: ["strength", "wisdom", "courage", "serenity"],
    element: "fire",
    numerology: 2,
  },
  december: {
    month: "December",
    primary: "Turquoise",
    alternatives: ["Tanzanite", "Blue Topaz"],
    hex: "#40E0D0",
    symbolism: ["protection", "healing", "good fortune", "success"],
    element: "earth",
    numerology: 3,
  },
};

export function getBirthstone(month: BirthstoneKey): Birthstone {
  return BIRTHSTONES[month];
}

export function getAllBirthstones(): Birthstone[] {
  return Object.values(BIRTHSTONES);
}
