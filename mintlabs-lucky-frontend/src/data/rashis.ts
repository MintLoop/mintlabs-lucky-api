/**
 * Indian Zodiac (Rashi) data
 * Pure static data - no API calls needed
 */

export type RashiKey =
  | "mesha" | "vrishabha" | "mithuna" | "karka"
  | "simha" | "kanya" | "tula" | "vrishchika"
  | "dhanu" | "makara" | "kumbha" | "meena";

export interface Rashi {
  rashi: string;
  english: string;
  planet: string;
  traits: string[];
  deity?: string;
  energyColor: string;
  numerology: number;
  recommendedStones: string[];
  favorableDays: string[];
}

export const RASHIS: Record<RashiKey, Rashi> = {
  mesha: {
    rashi: "Mesha",
    english: "Aries",
    planet: "Mars (Mangal)",
    traits: ["courage", "leadership", "initiative", "energy"],
    deity: "Agni",
    energyColor: "#E74C3C",
    numerology: 9,
    recommendedStones: ["Red Coral", "Carnelian", "Bloodstone"],
    favorableDays: ["Tuesday", "Sunday"],
  },
  vrishabha: {
    rashi: "Vrishabha",
    english: "Taurus",
    planet: "Venus (Shukra)",
    traits: ["stability", "sensuality", "patience", "devotion"],
    deity: "Lakshmi",
    energyColor: "#F39C12",
    numerology: 6,
    recommendedStones: ["Diamond", "White Sapphire", "Opal"],
    favorableDays: ["Friday", "Monday"],
  },
  mithuna: {
    rashi: "Mithuna",
    english: "Gemini",
    planet: "Mercury (Budha)",
    traits: ["communication", "adaptability", "curiosity", "intellect"],
    deity: "Saraswati",
    energyColor: "#F1C40F",
    numerology: 5,
    recommendedStones: ["Emerald", "Peridot", "Green Tourmaline"],
    favorableDays: ["Wednesday", "Friday"],
  },
  karka: {
    rashi: "Karka",
    english: "Cancer",
    planet: "Moon (Chandra)",
    traits: ["nurturing", "intuition", "emotion", "protection"],
    deity: "Parvati",
    energyColor: "#ECF0F1",
    numerology: 2,
    recommendedStones: ["Pearl", "Moonstone", "Selenite"],
    favorableDays: ["Monday", "Thursday"],
  },
  simha: {
    rashi: "Simha",
    english: "Leo",
    planet: "Sun (Surya)",
    traits: ["confidence", "generosity", "creativity", "authority"],
    deity: "Surya",
    energyColor: "#E67E22",
    numerology: 1,
    recommendedStones: ["Ruby", "Red Garnet", "Sunstone"],
    favorableDays: ["Sunday", "Tuesday"],
  },
  kanya: {
    rashi: "Kanya",
    english: "Virgo",
    planet: "Mercury (Budha)",
    traits: ["precision", "service", "analysis", "healing"],
    deity: "Vishnu",
    energyColor: "#27AE60",
    numerology: 5,
    recommendedStones: ["Emerald", "Green Jade", "Amazonite"],
    favorableDays: ["Wednesday", "Friday"],
  },
  tula: {
    rashi: "Tula",
    english: "Libra",
    planet: "Venus (Shukra)",
    traits: ["harmony", "balance", "justice", "beauty"],
    deity: "Indra",
    energyColor: "#3498DB",
    numerology: 6,
    recommendedStones: ["Diamond", "Opal", "Blue Sapphire"],
    favorableDays: ["Friday", "Saturday"],
  },
  vrishchika: {
    rashi: "Vrishchika",
    english: "Scorpio",
    planet: "Mars (Mangal)",
    traits: ["transformation", "depth", "intensity", "mystery"],
    deity: "Yama",
    energyColor: "#8E44AD",
    numerology: 9,
    recommendedStones: ["Red Coral", "Bloodstone", "Garnet"],
    favorableDays: ["Tuesday", "Thursday"],
  },
  dhanu: {
    rashi: "Dhanu",
    english: "Sagittarius",
    planet: "Jupiter (Guru)",
    traits: ["wisdom", "expansion", "optimism", "philosophy"],
    deity: "Brahma",
    energyColor: "#9B59B6",
    numerology: 3,
    recommendedStones: ["Yellow Sapphire", "Citrine", "Topaz"],
    favorableDays: ["Thursday", "Friday"],
  },
  makara: {
    rashi: "Makara",
    english: "Capricorn",
    planet: "Saturn (Shani)",
    traits: ["discipline", "ambition", "responsibility", "structure"],
    deity: "Shiva",
    energyColor: "#34495E",
    numerology: 8,
    recommendedStones: ["Blue Sapphire", "Amethyst", "Black Tourmaline"],
    favorableDays: ["Saturday", "Wednesday"],
  },
  kumbha: {
    rashi: "Kumbha",
    english: "Aquarius",
    planet: "Saturn (Shani)",
    traits: ["innovation", "independence", "humanitarianism", "vision"],
    deity: "Varuna",
    energyColor: "#1ABC9C",
    numerology: 8,
    recommendedStones: ["Blue Sapphire", "Aquamarine", "Turquoise"],
    favorableDays: ["Saturday", "Sunday"],
  },
  meena: {
    rashi: "Meena",
    english: "Pisces",
    planet: "Jupiter (Guru)",
    traits: ["compassion", "intuition", "spirituality", "imagination"],
    deity: "Vishnu",
    energyColor: "#16A085",
    numerology: 3,
    recommendedStones: ["Yellow Sapphire", "Amethyst", "Aquamarine"],
    favorableDays: ["Thursday", "Monday"],
  },
};

export function getRashi(key: RashiKey): Rashi {
  return RASHIS[key];
}

export function getAllRashis(): Rashi[] {
  return Object.values(RASHIS);
}
