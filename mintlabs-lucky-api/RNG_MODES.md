# Expanded RNG Modes for Lotto/Game Picks

The API now supports multiple RNG modes for generating lotto numbers with different strategies:

## Available Modes

### Basic Modes
- **`uniform`** (default): Pure random selection
- **`spaced`**: Evenly distributes numbers across the range
- **`balanced`**: Uses binning for balanced distribution

### Strategic Modes
- **`odd_even_mix`**: Balances odd and even numbers
- **`sum_target`**: Targets a specific sum (use `target_sum` parameter)
- **`pattern_avoid`**: Avoids consecutive numbers and repeating digit patterns

### Statistical Modes
- **`hot`**: Favors "hot" numbers (higher numbers, simulating recently drawn)
- **`cold`**: Favors "cold" numbers (lower numbers, simulating rarely drawn)

### Personal Modes
- **`birthday`**: Generates numbers based on birth date (use `birth_date` parameter)
  - Format: `"YYYY-MM-DD"` or `"MM-DD"`
- **`lucky`**: Incorporates user-defined lucky numbers (use `lucky_numbers` parameter)

### Systematic Modes
- **`wheel`**: Systematic wheel coverage (use `wheel_type` parameter)
  - `"key"`: One key number + random others
  - `"abbreviated"`: Picks from different number groups
  - `"full"`: Standard wheel coverage

## API Usage Examples

```bash
# Basic random
curl -X POST "/generate" -d '{"game_code": "powerball", "mode": "uniform"}'

# Target specific sum
curl -X POST "/generate" -d '{"game_code": "powerball", "mode": "sum_target", "target_sum": 150}'

# Birthday-based
curl -X POST "/generate" -d '{"game_code": "powerball", "mode": "birthday", "birth_date": "1990-05-15"}'

# Lucky numbers
curl -X POST "/generate" -d '{"game_code": "powerball", "mode": "lucky", "lucky_numbers": [7, 13, 21, 42]}'

# Wheel system
curl -X POST "/generate" -d '{"game_code": "powerball", "mode": "wheel", "wheel_type": "key"}'
```

## Mode Parameters

| Mode | Parameters | Description |
|------|------------|-------------|
| `sum_target` | `target_sum: int` | Target sum for the numbers |
| `birthday` | `birth_date: str` | Birth date in YYYY-MM-DD or MM-DD format |
| `lucky` | `lucky_numbers: List[int]` | List of lucky numbers to include |
| `wheel` | `wheel_type: str` | Type of wheel: "key", "abbreviated", or "full" |

All modes ensure numbers are within the game's valid range and generate the correct count of unique numbers.
