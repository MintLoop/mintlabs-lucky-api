from typing import Optional

from pydantic import BaseModel, ConfigDict, field_validator


class GenerateReq(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    game_code: str
    mode: str = "random"
    sets: Optional[int] = None
    target_sum: Optional[int] = None
    birth_date: Optional[str] = None
    lucky_numbers: Optional[list[int]] = None
    wheel_type: Optional[str] = None

    @field_validator("mode")
    @classmethod
    def mode_ok(cls, value: str) -> str:
        allowed_modes = {
            "random",
            "spaced",
            "sum_target",
            "birthday",
            "lucky",
            "wheel",
            "balanced",
            "odd_even_mix",
            "pattern_avoid",
            "hot",
            "cold",
        }
        if value not in allowed_modes:
            allowed = ", ".join(sorted(allowed_modes))
            raise ValueError(f"invalid mode: {value}. Allowed: {allowed}")
        return value


class Draw(BaseModel):
    numbers: list[int]
    bonus: Optional[int] = None
    commitment: str
    request_id: str
    latency_ms: int
    odds: Optional[str] = None
    probability_percent: Optional[float] = None


class GenerateResp(BaseModel):
    game: str
    mode: str
    numbers: list[int]
    bonus: Optional[int] = None
    commitment: str
    request_id: str
    latency_ms: int
    odds: Optional[str] = None
    probability_percent: Optional[float] = None
    combined_sets_odds: Optional[str] = None
    combined_sets_probability_percent: Optional[float] = None
    last_number_info: Optional[dict] = None
    total_sets: int
    results: list[Draw]
