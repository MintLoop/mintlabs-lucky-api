import random
import secrets


class SecureRng:
    def randint(self, a: int, b: int) -> int:
        if a > b:
            raise ValueError("Lower bound 'a' must not be greater than upper bound 'b'.")
        return a + secrets.randbelow(b - a + 1)

    def sample_unique(self, low: int, high: int, k: int) -> list[int]:
        if k > (high - low + 1):
            raise ValueError("Cannot sample more unique numbers than the range allows.")
        picks = set()
        while len(picks) < k:
            picks.add(self.randint(low, high))
        return sorted(picks)


def spaced_draw(low: int, high: int, k: int, rng: SecureRng) -> list[int]:
    if k <= 0:
        raise ValueError("Number of samples 'k' must be greater than 0.")
    if low > high:
        raise ValueError("Lower bound 'low' must not be greater than upper bound 'high'.")

    width = (high - low + 1) / k
    picks = []
    for i in range(k):
        start = int(low + i * width)
        end = int(low + (i + 1) * width - 1)
        end = max(end, start)
        picks.append(rng.randint(start, end))

    # rare collision fallback
    if len(set(picks)) < k:
        return rng.sample_unique(low, high, k)
    return sorted(picks)


def draw_balanced(minv, maxv, count, rng):
    bins = count
    step = (maxv - minv + 1) / bins
    picks = []
    for i in range(bins):
        a = int(minv + i * step)
        b = int(min(maxv, minv + (i + 1) * step - 1))
        picks.append(rng.randint(a, b))
    return sorted(set(picks)) if len(set(picks)) == count else rng.sample_unique(minv, maxv, count)


def draw_sum_target(
    minv: int, maxv: int, count: int, rng: SecureRng, target_sum: int = None
) -> list[int]:
    """Generate numbers that sum to approximately the target sum."""
    if target_sum is None:
        # Default to middle of possible sum range
        min_sum = sum(range(minv, minv + count))
        max_sum = sum(range(maxv - count + 1, maxv + 1))
        target_sum = (min_sum + max_sum) // 2

    # Try multiple times to get close to target sum
    for _ in range(100):  # limit attempts
        picks = rng.sample_unique(minv, maxv, count)
        if abs(sum(picks) - target_sum) <= count:  # allow some tolerance
            return sorted(picks)

    # Fallback to regular random if we can't hit target
    return rng.sample_unique(minv, maxv, count)


def draw_pattern_avoid(minv: int, maxv: int, count: int, rng: SecureRng) -> list[int]:
    """Avoid common patterns like consecutive numbers, multiples, etc."""
    max_attempts = 100
    for _ in range(max_attempts):
        picks = rng.sample_unique(minv, maxv, count)
        sorted_picks = sorted(picks)

        # Check for consecutive numbers
        has_consecutive = any(
            sorted_picks[i + 1] - sorted_picks[i] == 1 for i in range(len(sorted_picks) - 1)
        )

        # Check for too many multiples of same number
        digit_counts = {}
        for num in sorted_picks:
            last_digit = num % 10
            digit_counts[last_digit] = digit_counts.get(last_digit, 0) + 1

        has_repeating_digits = any(
            count > len(sorted_picks) // 2 for count in digit_counts.values()
        )

        if not has_consecutive and not has_repeating_digits:
            return sorted_picks

    # Fallback if we can't avoid patterns
    return rng.sample_unique(minv, maxv, count)


def draw_odd_even_mix(minv: int, maxv: int, count: int, rng: SecureRng) -> list[int]:
    """Generate numbers with a balanced mix of odd and even numbers."""
    odds = [n for n in range(minv, maxv + 1) if n % 2 == 1]
    evens = [n for n in range(minv, maxv + 1) if n % 2 == 0]

    target_odd = count // 2
    target_even = count - target_odd

    selected_odds = rng.sample(odds, min(target_odd, len(odds)))
    selected_evens = rng.sample(evens, min(target_even, len(evens)))

    result = selected_odds + selected_evens
    # Fill if not enough
    remaining = count - len(result)
    if remaining > 0:
        all_nums = list(range(minv, maxv + 1))
        available = [n for n in all_nums if n not in result]
        extra = rng.sample(available, remaining)
        result.extend(extra)

    random.shuffle(result)
    return result


def draw_hot_cold(
    minv: int, maxv: int, count: int, rng: SecureRng, mode: str = "balanced"
) -> list[int]:
    """Favor hot (recently drawn) or cold (rarely drawn) numbers.
    For demo purposes, we'll simulate with weighted random."""
    numbers = list(range(minv, maxv + 1))

    if mode == "hot":
        # Favor higher numbers (simulate "hot")
        weights = [i * 2 for i in range(len(numbers))]
    elif mode == "cold":
        # Favor lower numbers (simulate "cold")
        weights = [len(numbers) - i for i in range(len(numbers))]
    else:  # balanced
        weights = [1] * len(numbers)

    # Normalize weights
    total_weight = sum(weights)
    weights = [w / total_weight for w in weights]

    picks = set()
    while len(picks) < count:
        # Weighted random selection
        r = secrets.randbelow(10000) / 10000
        cumulative = 0
        for i, weight in enumerate(weights):
            cumulative += weight
            if r <= cumulative:
                picks.add(numbers[i])
                break

    return sorted(picks)


def draw_birthday(
    minv: int, maxv: int, count: int, rng: SecureRng, birth_date: str = None
) -> list[int]:
    """Generate numbers based on birthday or significant dates."""
    if birth_date:
        # Parse date like "1990-05-15" or "05-15" or "10/03/2025"
        try:
            if "/" in birth_date:
                # Assume MM/DD/YYYY
                parts = birth_date.split("/")
                if len(parts) == 3:
                    month = int(parts[0])
                    day = int(parts[1])
                    year = int(parts[2])
                else:
                    raise ValueError("Invalid date format")
            else:
                # Assume YYYY-MM-DD or MM-DD
                parts = birth_date.split("-")
                if len(parts) >= 2:
                    if len(parts) == 3:
                        year = int(parts[0])
                        month = int(parts[1])
                        day = int(parts[2])
                    else:
                        month = int(parts[0])
                        day = int(parts[1])
                        year = rng.randint(1900, 2020)

            # Generate numbers from date components
            date_nums = [month, day]
            if year >= 1900:
                date_nums.extend([year // 100, year % 100])

            # Fill remaining with random
            remaining = count - len(date_nums)
            if remaining > 0:
                extra = rng.sample_unique(minv, maxv, remaining)
                all_nums = date_nums + extra
            else:
                all_nums = date_nums[:count]

            # Ensure within bounds
            valid_nums = [n for n in all_nums if minv <= n <= maxv]
            if len(valid_nums) < count:
                extra = rng.sample_unique(minv, maxv, count - len(valid_nums))
                valid_nums.extend(extra)

            return sorted(valid_nums[:count])
        except (ValueError, IndexError):
            pass

    # Fallback to random
    return rng.sample_unique(minv, maxv, count)


def draw_lucky(
    minv: int, maxv: int, count: int, rng: "SecureRng", lucky_nums: list[int] = None
) -> list[int]:
    """Incorporate user-defined lucky numbers, ensure we always return `count` values."""
    picks: list[int]
    if lucky_nums:
        valid_lucky = [n for n in lucky_nums if minv <= n <= maxv]
        unique_lucky = list(dict.fromkeys(valid_lucky))  # preserve order, drop duplicates
        picks = unique_lucky[:count]
        while len(picks) < count:
            candidate = rng.sample_unique(minv, maxv, 1)[0]
            if candidate not in picks:
                picks.append(candidate)
    else:
        picks = rng.sample_unique(minv, maxv, count)

    random.shuffle(picks)
    return picks


def draw_personalized(
    minv: int,
    maxv: int,
    count: int,
    rng: SecureRng,
    seed_value: str = None,
) -> list[int]:
    """Generate deterministic-looking numbers derived from a user-provided seed string.

    This is useful for modes like `zodiac`, `gemstone`, `favorite_color` where the
    input is a short tag (e.g., 'aries', 'ruby', 'blue'). The generation is
    deterministic for the same seed and game definition, but still returns valid
    numbers in the requested range. Uses SHA256 -> int to seed a local RNG.
    """
    if not seed_value:
        # fallback to a normal random sample
        return rng.sample_unique(minv, maxv, count)

    import hashlib

    # Hash the seed_value to obtain a predictable integer
    seed_hash = hashlib.sha256(seed_value.encode("utf-8")).hexdigest()
    seed_int = int(seed_hash[:16], 16)

    # Use a local deterministic RNG so we don't interfere with SecureRng state.
    # SECURITY NOTE: This RNG is deterministic (seed derived from a hash of the provided
    # seed_value) and is used for reproducible, non-cryptographic behavior only — not for
    # secrets or any cryptographic purpose. The use of `random.Random` here is deliberate
    # to keep the SecureRng entropy separate.
    local = random.Random(seed_int)  # noqa: S311
    pool = list(range(minv, maxv + 1))
    if count >= len(pool):
        return sorted(pool)

    picks = set()
    attempts = 0
    while len(picks) < count and attempts < 200:
        picks.add(local.choice(pool))
        attempts += 1

    # fill missing picks from SecureRng to avoid infinite loops
    if len(picks) < count:
        extras = rng.sample_unique(minv, maxv, count - len(picks))
        picks.update(extras)

    return sorted(list(picks))


def draw_wheel(
    minv: int, maxv: int, count: int, rng: SecureRng, wheel_type: str = "full"
) -> list[int]:
    """Systematic wheel - cover multiple combinations."""
    numbers = list(range(minv, maxv + 1))

    if wheel_type == "key":
        # Key number system: pick one key number, fill rest randomly
        key = rng.randint(minv, maxv)
        remaining = [n for n in numbers if n != key]
        picks = [key] + rng.sample(remaining, count - 1)
        return sorted(picks)
    elif wheel_type == "abbreviated":
        # Abbreviated wheel: pick from specific groups
        group_size = (maxv - minv + 1) // 3
        groups = [
            numbers[:group_size],
            numbers[group_size : 2 * group_size],
            numbers[2 * group_size :],
        ]
        picks = []
        for group in groups:
            if group and len(picks) < count:
                picks.extend(rng.sample(group, min(2, len(group), count - len(picks))))
        return sorted(picks[:count])
    else:  # full wheel or default
        return rng.sample_unique(minv, maxv, count)


# Add sample method to SecureRng for weighted sampling
def sample(self, population: list[int], k: int) -> list[int]:
    """Sample k items from population without replacement."""
    if k > len(population):
        k = len(population)
    indices = list(range(len(population)))
    selected = []
    for _ in range(k):
        if not indices:
            break
        idx = secrets.randbelow(len(indices))
        selected.append(population[indices.pop(idx)])
    return selected


SecureRng.sample = sample


def has_consecutive_numbers(numbers: list[int]) -> bool:
    """Check if the sorted list contains consecutive numbers (e.g., 14, 15, 16)."""
    sorted_nums = sorted(numbers)
    for i in range(len(sorted_nums) - 1):
        if sorted_nums[i + 1] - sorted_nums[i] == 1:
            return True
    return False


def filter_recent_draws(
    rng: SecureRng,
    minv: int,
    maxv: int,
    count: int,
    recent_numbers: list[int],
    allow_repeats: bool = False,
) -> list[int]:
    """Generate numbers avoiding recent draws if allow_repeats is False."""
    if allow_repeats:
        return rng.sample_unique(minv, maxv, count)

    # Remove recent numbers from available pool
    available_numbers = [n for n in range(minv, maxv + 1) if n not in recent_numbers]

    if len(available_numbers) < count:
        # Not enough numbers available, allow some repeats
        return rng.sample_unique(minv, maxv, count)

    # Sample from available numbers
    picks = rng.sample(available_numbers, count)
    return sorted(picks)


def filter_consecutive(
    rng: SecureRng, minv: int, maxv: int, count: int, allow_consecutive: bool = False
) -> list[int]:
    """Generate numbers avoiding consecutive sequences if allow_consecutive is False."""
    if allow_consecutive:
        return rng.sample_unique(minv, maxv, count)

    max_attempts = 50  # Limit attempts to avoid infinite loops
    for _ in range(max_attempts):
        picks = rng.sample_unique(minv, maxv, count)
        if not has_consecutive_numbers(picks):
            return picks

    # Fallback if we can't avoid consecutives after max attempts
    return rng.sample_unique(minv, maxv, count)


def apply_filters(
    rng: SecureRng,
    minv: int,
    maxv: int,
    count: int,
    allow_repeats: bool = False,
    allow_consecutive: bool = False,
    recent_numbers: list[int] = None,
) -> list[int]:
    """Apply both repeat and consecutive filters to number generation."""
    if recent_numbers is None:
        recent_numbers = []

    # First apply repeat filter
    numbers = filter_recent_draws(rng, minv, maxv, count, recent_numbers, allow_repeats)

    # Then apply consecutive filter if needed
    if not allow_consecutive and has_consecutive_numbers(numbers):
        # Try to regenerate avoiding consecutives
        numbers = filter_consecutive(rng, minv, maxv, count, allow_consecutive)

    return numbers


def calculate_probabilities(
    white_min: int,
    white_max: int,
    white_count: int,
    bonus_min: int = None,
    bonus_max: int = None,
    sets: int = 1,
) -> dict:
    """Calculate lottery odds and probabilities."""
    import math

    # Calculate main numbers probability (combinations)
    total_main_numbers = white_max - white_min + 1
    main_odds = math.comb(total_main_numbers, white_count)
    main_probability = 1 / main_odds

    result = {
        "main_odds": main_odds,
        "main_probability": main_probability,
        "main_probability_percent": main_probability * 100,
    }

    # Calculate bonus/powerball probability if applicable
    if bonus_min is not None and bonus_max is not None:
        total_bonus_numbers = bonus_max - bonus_min + 1
        bonus_odds = total_bonus_numbers
        bonus_probability = 1 / bonus_odds

        # Combined odds (main numbers AND bonus)
        combined_odds = main_odds * bonus_odds
        combined_probability = 1 / combined_odds

        result.update(
            {
                "bonus_odds": bonus_odds,
                "bonus_probability": bonus_probability,
                "bonus_probability_percent": bonus_probability * 100,
                "combined_odds": combined_odds,
                "combined_probability": combined_probability,
                "combined_probability_percent": combined_probability * 100,
            }
        )

    # Calculate combined odds for multiple sets (independent draws)
    if sets > 1:
        single_win_prob = result.get("combined_probability", result["main_probability"])

        # Probability of losing all sets
        prob_lose_all = (1 - single_win_prob) ** sets

        # Probability of winning at least once
        prob_win_at_least_once = 1 - prob_lose_all

        # Odds of winning at least once
        combined_sets_odds = (
            1 / prob_win_at_least_once if prob_win_at_least_once > 0 else float("inf")
        )

        result.update(
            {
                "sets_count": sets,
                "combined_sets_probability": prob_win_at_least_once,
                "combined_sets_probability_percent": prob_win_at_least_once * 100,
                "combined_sets_odds": combined_sets_odds,
            }
        )

    return result


def format_probability_display(prob_data: dict) -> str:
    """Format probability data for display."""
    if "combined_probability" in prob_data:
        # Has bonus numbers
        return ".2e"
    else:
        # Main numbers only
        return ".2e"


def get_last_number_probability(
    numbers: list[int], bonus: int = None, white_max: int = None, bonus_max: int = None
) -> str:
    """Get probability information for the last number (bonus or highest main number)."""
    if bonus is not None and bonus_max is not None:
        # Show bonus number probability
        bonus_prob = 1 / bonus_max
        return f"Bonus #{bonus}: 1 in {bonus_max} ({bonus_prob*100:.2f}%)"
    elif numbers and white_max is not None:
        # Show highest main number probability
        highest = max(numbers)
        highest_prob = 1 / white_max
        return f"Highest #{highest}: 1 in {white_max} ({highest_prob*100:.11f}%)"
    else:
        return ""
