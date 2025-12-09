/**
 * Color Wheel data with 18 colors
 * Primary → Secondary → Tertiary progression
 * Pure static data - no API calls needed
 */

export type ColorType = "primary" | "secondary" | "tertiary";

export interface ColorData {
  name: string;
  displayName: string;
  type: ColorType;
  hex: string;
  traits: string[];
  numerology: number;
  complementary: string;
  chakra?: string;
  element?: string;
}

export const COLOR_WHEEL: ColorData[] = [
  // Primary Colors
  {
    name: "red",
    displayName: "Red",
    type: "primary",
    hex: "#FF0000",
    traits: ["passion", "energy", "courage", "action"],
    numerology: 1,
    complementary: "cyan",
    chakra: "Root",
    element: "fire",
  },
  {
    name: "blue",
    displayName: "Blue",
    type: "primary",
    hex: "#0000FF",
    traits: ["trust", "wisdom", "calm", "depth"],
    numerology: 7,
    complementary: "orange",
    chakra: "Throat",
    element: "water",
  },
  {
    name: "yellow",
    displayName: "Yellow",
    type: "primary",
    hex: "#FFFF00",
    traits: ["optimism", "clarity", "intellect", "joy"],
    numerology: 3,
    complementary: "purple",
    chakra: "Solar Plexus",
    element: "air",
  },
  
  // Secondary Colors
  {
    name: "orange",
    displayName: "Orange",
    type: "secondary",
    hex: "#FF7F00",
    traits: ["creativity", "enthusiasm", "warmth", "vitality"],
    numerology: 5,
    complementary: "blue",
    chakra: "Sacral",
    element: "fire",
  },
  {
    name: "green",
    displayName: "Green",
    type: "secondary",
    hex: "#00FF00",
    traits: ["growth", "harmony", "balance", "renewal"],
    numerology: 4,
    complementary: "magenta",
    chakra: "Heart",
    element: "earth",
  },
  {
    name: "purple",
    displayName: "Purple",
    type: "secondary",
    hex: "#8B00FF",
    traits: ["spirituality", "wisdom", "transformation", "royalty"],
    numerology: 9,
    complementary: "yellow",
    chakra: "Crown",
    element: "spirit",
  },
  
  // Tertiary Colors
  {
    name: "red-orange",
    displayName: "Red-Orange",
    type: "tertiary",
    hex: "#FF3F00",
    traits: ["motivation", "confidence", "adventure", "strength"],
    numerology: 1,
    complementary: "blue-green",
  },
  {
    name: "yellow-orange",
    displayName: "Yellow-Orange",
    type: "tertiary",
    hex: "#FFBF00",
    traits: ["friendliness", "success", "happiness", "prosperity"],
    numerology: 3,
    complementary: "blue-purple",
  },
  {
    name: "yellow-green",
    displayName: "Yellow-Green",
    type: "tertiary",
    hex: "#9ACD32",
    traits: ["freshness", "youthfulness", "renewal", "growth"],
    numerology: 5,
    complementary: "red-purple",
  },
  {
    name: "blue-green",
    displayName: "Blue-Green (Cyan)",
    type: "tertiary",
    hex: "#00FFFF",
    traits: ["tranquility", "healing", "clarity", "communication"],
    numerology: 7,
    complementary: "red-orange",
    chakra: "Throat",
  },
  {
    name: "blue-purple",
    displayName: "Blue-Purple",
    type: "tertiary",
    hex: "#4B0082",
    traits: ["intuition", "insight", "mystery", "imagination"],
    numerology: 9,
    complementary: "yellow-orange",
    chakra: "Third Eye",
  },
  {
    name: "red-purple",
    displayName: "Red-Purple (Magenta)",
    type: "tertiary",
    hex: "#FF00FF",
    traits: ["individuality", "passion", "transformation", "spirituality"],
    numerology: 6,
    complementary: "yellow-green",
  },
  
  // Neutral and Special Colors
  {
    name: "white",
    displayName: "White",
    type: "primary",
    hex: "#FFFFFF",
    traits: ["purity", "clarity", "wholeness", "new beginnings"],
    numerology: 1,
    complementary: "black",
  },
  {
    name: "black",
    displayName: "Black",
    type: "primary",
    hex: "#000000",
    traits: ["mystery", "power", "elegance", "protection"],
    numerology: 8,
    complementary: "white",
  },
  {
    name: "gold",
    displayName: "Gold",
    type: "tertiary",
    hex: "#FFD700",
    traits: ["abundance", "wisdom", "success", "divine energy"],
    numerology: 3,
    complementary: "silver",
  },
  {
    name: "silver",
    displayName: "Silver",
    type: "tertiary",
    hex: "#C0C0C0",
    traits: ["intuition", "reflection", "grace", "moon energy"],
    numerology: 2,
    complementary: "gold",
  },
  {
    name: "brown",
    displayName: "Brown",
    type: "tertiary",
    hex: "#8B4513",
    traits: ["stability", "grounding", "reliability", "earthiness"],
    numerology: 4,
    complementary: "light-blue",
    element: "earth",
  },
  {
    name: "pink",
    displayName: "Pink",
    type: "tertiary",
    hex: "#FFC0CB",
    traits: ["love", "compassion", "nurturing", "gentleness"],
    numerology: 6,
    complementary: "green",
    chakra: "Heart",
  },
];

export function getColorByName(name: string): ColorData | undefined {
  return COLOR_WHEEL.find(c => c.name.toLowerCase() === name.toLowerCase());
}

export function getColorsByType(type: ColorType): ColorData[] {
  return COLOR_WHEEL.filter(c => c.type === type);
}

export function getAllColors(): ColorData[] {
  return COLOR_WHEEL;
}
