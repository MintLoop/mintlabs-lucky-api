/**
 * TypeScript types for Lucky Profile API
 * Birthstone × Rashi × Color Wheel Generator
 */

export interface LuckyProfileRequest {
  birth_month: string;
  rashi: string;
  color: string;
  filters?: {
    numerology?: boolean;
    hindu?: boolean;
    kabbalah?: boolean;
    buddhist?: boolean;
    christian?: boolean;
  };
}

export interface BirthstoneProfile {
  month: string;
  name_primary: string;
  name_alternatives: string[];
  color_hex: string;
  symbolism: string;
  element: string;
  numerology_number: number;
  traits: string[];
  chakra: string;
  planetary: string;
  lore: string;
}

export interface RashiProfile {
  rashi: string;
  english: string;
  symbol: string;
  planet: string;
  element: string;
  qualities: string[];
  deity: string;
  energy_color: string;
  numerology_alignment: number;
  recommended_stones: string[];
  traits: string;
  chakra: string;
  direction: string;
  body_parts: string[];
  favorable_days: string[];
  mantra: string;
}

export interface ColorProfile {
  name: string;
  type: string;
  hex: string;
  associated_traits: string[];
  numerology_color_map: number;
  complement: string;
  split_complement: string[];
  kabbalah_sefirot?: string;
  chakra: string;
  biblical?: string;
  buddhist_element: string;
  psychological: string;
}

export interface LuckyFocus {
  focus_traits: string[];
  primary_color: string;
  primary_color_hex: string;
  birthstone: string;
  rashi_energy: string;
  recommended_actions: string[];
  numerology_cycle?: string;
  complementary_color?: string;
  lucky_numbers?: number[];
  lucky_days?: string[];
}

export interface LuckyProfileResponse {
  birthstone_profile: BirthstoneProfile;
  rashi_profile: RashiProfile;
  color_profile: ColorProfile;
  lucky_focus: LuckyFocus;
  filters_applied: {
    numerology: boolean;
    hindu: boolean;
    kabbalah: boolean;
    buddhist: boolean;
    christian: boolean;
  };
}
