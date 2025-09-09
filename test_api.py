#!/usr/bin/env python3
import urllib.request
import json

# Test the API endpoint with different sets
test_cases = [
    {"game_code": "powerball", "mode": "uniform", "sets": 1},
    {"game_code": "powerball", "mode": "uniform", "sets": 5},
    {"game_code": "powerball", "mode": "uniform", "sets": 10},
]

for i, data in enumerate(test_cases):
    print(f"\n=== Test Case {i+1}: {data['sets']} sets ===")

    try:
        req = urllib.request.Request("http://localhost:8000/generate",
                                   json.dumps(data).encode('utf-8'),
                                   headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print("Numbers:", result['numbers'])
            print("Bonus:", result.get('bonus', 'N/A'))
            print("Single draw odds:", result['odds'])
            print("Single draw probability:", f"{result['probability_percent']:.6f}%")

            if 'combined_sets_odds' in result and result['combined_sets_odds']:
                print("Combined sets odds:", result['combined_sets_odds'])
                print("Combined sets probability:", f"{result['combined_sets_probability_percent']:.4f}%")

            print("Last number info:", result.get('last_number_info', 'N/A'))

    except Exception as e:
        print(f"Error: {e}")
