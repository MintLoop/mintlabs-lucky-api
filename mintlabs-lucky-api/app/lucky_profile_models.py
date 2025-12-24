"""
Lucky Profile API Models
Defines request/response schemas for the Birthstone × Rashi × Color Wheel generator.
"""

from typing import Optional

from pydantic import BaseModel, Field


class LuckyProfileRequest(BaseModel):
    """Request for generating a personalized lucky profile."""

    birth_month: str = Field(..., description="Birth month (e.g., 'January', 'March')")
    rashi: str = Field(..., description="Indian zodiac sign (e.g., 'Mesha', 'Karka')")
    color: str = Field(..., description="Preferred color energy (e.g., 'Blue', 'Red-Orange')")
    filters: Optional[dict] = Field(
        default_factory=dict,
        description="Optional filters for numerology and spiritual traditions",
    )


class BirthstoneProfile(BaseModel):
    """Birthstone profile data."""

    month: str
    name_primary: str
    name_alternatives: list[str]
    color_hex: str
    symbolism: str
    element: str
    numerology_number: int
    traits: list[str]
    chakra: str
    planetary: str
    lore: str


class RashiProfile(BaseModel):
    """Rashi (Indian zodiac) profile data."""

    rashi: str
    english: str
    symbol: str
    planet: str
    element: str
    qualities: list[str]
    deity: str
    energy_color: str
    numerology_alignment: int
    recommended_stones: list[str]
    traits: str
    chakra: str
    direction: str
    body_parts: list[str]
    favorable_days: list[str]
    mantra: str


class ColorProfile(BaseModel):
    """Color wheel profile data."""

    name: str
    type: str
    hex: str
    associated_traits: list[str]
    numerology_color_map: int
    complement: str
    split_complement: list[str]
    kabbalah_sefirot: Optional[str] = None
    chakra: str
    biblical: Optional[str] = None
    buddhist_element: str
    psychological: str


class LuckyFocus(BaseModel):
    """Combined lucky focus and recommendations."""

    focus_traits: list[str]
    primary_color: str
    primary_color_hex: str
    birthstone: str
    rashi_energy: str
    recommended_actions: list[str]
    numerology_cycle: Optional[str] = None
    complementary_color: Optional[str] = None
    lucky_numbers: Optional[list[int]] = None
    lucky_days: Optional[list[str]] = None


class LuckyProfileResponse(BaseModel):
    """Complete lucky profile response."""

    birthstone_profile: BirthstoneProfile
    rashi_profile: RashiProfile
    color_profile: ColorProfile
    lucky_focus: LuckyFocus
    filters_applied: dict
