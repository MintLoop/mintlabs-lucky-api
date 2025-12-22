"""
Lucky Profile Generator Route
Birthstone × Rashi × Color Wheel synthesis API
"""
import json
from pathlib import Path
from typing import Any, Optional

from fastapi import APIRouter, HTTPException

from app.lucky_profile_models import (
    BirthstoneProfile,
    ColorProfile,
    LuckyFocus,
    LuckyProfileRequest,
    LuckyProfileResponse,
    RashiProfile,
)

router = APIRouter(prefix="/v1/lucky", tags=["lucky-profiles"])

# Load data files
# Data files are at repo root (parent of mintlabs-lucky-api)
# Use absolute path resolution to handle different working directories
DATA_DIR = Path(__file__).resolve().parent.parent.parent.parent / "data"


def load_json_data(filename: str) -> dict[str, Any]:
    """Load JSON data file."""
    filepath = DATA_DIR / filename
    if not filepath.exists():
        # Provide helpful error with full path
        raise FileNotFoundError(
            f"Data file not found: {filename}\n"
            f"Expected at: {filepath}\n"
            f"DATA_DIR: {DATA_DIR}\n"
            f"DATA_DIR exists: {DATA_DIR.exists()}"
        )
    with open(filepath, encoding="utf-8") as f:
        return json.load(f)


# Cache data on module load
BIRTHSTONES_DATA = load_json_data("birthstones.json")
RASHIS_DATA = load_json_data("rashis.json")
COLOR_WHEEL_DATA = load_json_data("color_wheel.json")


def find_birthstone(month: str) -> Optional[dict]:
    """Find birthstone data by month name."""
    for stone in BIRTHSTONES_DATA.get("months", []):
        if stone.get("month", "").lower() == month.lower():
            return stone
    return None


def find_rashi(rashi_name: str) -> Optional[dict]:
    """Find rashi data by rashi or English name."""
    for sign in RASHIS_DATA.get("signs", []):
        if (
            sign.get("rashi", "").lower() == rashi_name.lower()
            or sign.get("english", "").lower() == rashi_name.lower()
        ):
            return sign
    return None


def find_color(color_name: str) -> Optional[dict]:
    """Find color data by name."""
    for color in COLOR_WHEEL_DATA.get("colors", []):
        if color.get("name", "").lower() == color_name.lower():
            return color
    return None


def synthesize_lucky_focus(
    birthstone: dict, rashi: dict, color: dict, filters: dict
) -> LuckyFocus:
    """
    Synthesize a unified lucky focus from birthstone, rashi, and color profiles.
    Combines traits, generates recommendations, and creates actionable insights.
    """
    # Combine traits from all three sources
    combined_traits = []
    combined_traits.extend(birthstone.get("traits", []))
    combined_traits.extend(rashi.get("qualities", []))
    combined_traits.extend(color.get("associated_traits", []))
    
    # Deduplicate and take top traits
    unique_traits = list(dict.fromkeys(combined_traits))[:5]
    
    # Generate recommended actions
    actions = []
    
    # Birthstone action
    stone_name = birthstone.get("name_primary", "")
    favorable_days = rashi.get("favorable_days", [])
    if favorable_days:
        day = favorable_days[0]
        actions.append(f"Wear {stone_name.lower()} or related stones on {day}s")
    
    # Color action
    color_name = color.get("name", "")
    actions.append(f"Use {color_name.lower()} accents in your workspace or attire")
    
    # Complementary color
    complement = color.get("complement", "")
    if complement:
        actions.append(f"Balance with {complement.lower()} for momentum and harmony")
    
    # Numerology action
    num = birthstone.get("numerology_number", 1)
    num_meaning = {
        1: "independence → lead",
        2: "pairs → collaborate",
        3: "expansion → create",
        4: "foundation → build",
        5: "change → adapt",
        6: "harmony → nurture",
        7: "wisdom → reflect",
        8: "power → achieve",
        9: "completion → release",
    }
    actions.append(f"Numerology cycle: {num} → {num_meaning.get(num, 'transform')}")
    
    # Spiritual practice if filters enabled
    if filters.get("hindu"):
        mantra = rashi.get("mantra", "")
        if mantra:
            actions.append(f"Chant: {mantra}")
    
    # Lucky numbers (derived from numerology)
    base_num = birthstone.get("numerology_number", 1)
    rashi_num = rashi.get("numerology_alignment", 1)
    color_num = color.get("numerology_color_map", 1)
    
    lucky_nums = sorted(list(set([
        base_num,
        rashi_num,
        color_num,
        (base_num + rashi_num) % 9 or 9,
        (base_num * color_num) % 9 or 9,
        (rashi_num + color_num) % 9 or 9,
    ])))[:6]
    
    return LuckyFocus(
        focus_traits=unique_traits,
        primary_color=color_name,
        primary_color_hex=color.get("hex", "#FFFFFF"),
        birthstone=stone_name,
        rashi_energy=f"{rashi.get('rashi', '')} ({rashi.get('planet', '')})",
        recommended_actions=actions,
        numerology_cycle=f"{num} → {num_meaning.get(num, 'transform')}",
        complementary_color=complement,
        lucky_numbers=lucky_nums,
        lucky_days=favorable_days,
    )


@router.post("/birthstone-rashi", response_model=LuckyProfileResponse)
async def generate_lucky_profile(req: LuckyProfileRequest) -> LuckyProfileResponse:
    """
    Generate a personalized lucky profile combining:
    - Birthstone energy
    - Indian zodiac (Rashi) influence
    - Color wheel psychology
    
    Returns unified profile with actionable recommendations.
    """
    # Find birthstone
    birthstone_data = find_birthstone(req.birth_month)
    if not birthstone_data:
        detail = (
            f"Invalid birth month: {req.birth_month}. Must be full month name "
            "(e.g., 'January')"
        )
        raise HTTPException(status_code=400, detail=detail)
    
    # Find rashi
    rashi_data = find_rashi(req.rashi)
    if not rashi_data:
        detail = (
            f"Invalid rashi: {req.rashi}. Must be rashi name (e.g., 'Mesha') "
            "or English name (e.g., 'Aries')"
        )
        raise HTTPException(status_code=400, detail=detail)
    
    # Find color
    color_data = find_color(req.color)
    if not color_data:
        detail = (
            f"Invalid color: {req.color}. Must match color wheel names "
            "(e.g., 'Blue', 'Red-Orange')"
        )
        raise HTTPException(status_code=400, detail=detail)
    
    # Parse filters
    filters = req.filters or {}
    filters_applied = {
        "numerology": filters.get("numerology", True),
        "kabbalah": filters.get("kabbalah", False),
        "hindu": filters.get("hindu", True),
        "buddhist": filters.get("buddhist", False),
        "christian": filters.get("christian", False),
    }
    
    # Build response models
    birthstone_profile = BirthstoneProfile(**birthstone_data)
    rashi_profile = RashiProfile(**rashi_data)
    color_profile = ColorProfile(**color_data)
    
    # Synthesize lucky focus
    lucky_focus = synthesize_lucky_focus(
        birthstone_data, rashi_data, color_data, filters_applied
    )
    
    return LuckyProfileResponse(
        birthstone_profile=birthstone_profile,
        rashi_profile=rashi_profile,
        color_profile=color_profile,
        lucky_focus=lucky_focus,
        filters_applied=filters_applied,
    )


@router.get("/birthstone-rashi/metadata")
async def get_metadata():
    """
    Get available options for birthstones, rashis, and colors.
    Useful for populating UI dropdowns.
    """
    months = [stone.get("month") for stone in BIRTHSTONES_DATA.get("months", [])]
    rashis = [
        {"rashi": sign.get("rashi"), "english": sign.get("english")}
        for sign in RASHIS_DATA.get("signs", [])
    ]
    colors = [color.get("name") for color in COLOR_WHEEL_DATA.get("colors", [])]
    
    return {
        "months": months,
        "rashis": rashis,
        "colors": colors,
    }
