# tools/import_draws.py
import csv
import datetime
import os
import sys

import psycopg

DATABASE_URL = os.getenv("DATABASE_URL")


# Map your CSV headers -> (date, whites[], bonus)
def parse_row(row, game_code):
    # Expected flexible headers:
    # date or draw_date, n1..n5/6, bonus/powerball/mega
    d = row.get("date") or row.get("draw_date")
    draw_date = datetime.date.fromisoformat(d.strip())
    nums = []
    for k in ("n1", "n2", "n3", "n4", "n5", "n6"):
        if k in row and row[k]:
            nums.append(int(row[k]))
    bonus = None
    for bkey in ("bonus", "powerball", "mega", "megaball"):
        if bkey in row and row[bkey]:
            bonus = int(row[bkey])
            break
    return game_code, draw_date, nums, bonus


def upsert(conn, game_code, draw_date, numbers, bonus):
    conn.execute(
        """
      insert into draws(game_code, draw_date, numbers, bonus)
      values (%s,%s,%s,%s)
      on conflict (game_code, draw_date)
      do update set numbers=excluded.numbers, bonus=excluded.bonus
    """,
        (game_code, draw_date, numbers, bonus),
    )


def run(csv_path, game_code):
    with psycopg.connect(DATABASE_URL, autocommit=True) as conn:
        with open(csv_path, newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                gc, dd, nums, bonus = parse_row(row, game_code)
                if not nums:
                    continue
                upsert(conn, gc, dd, nums, bonus)
    print("done")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("usage: python tools/import_draws.py <csv_path> <game_code>")
        sys.exit(1)
    run(sys.argv[1], sys.argv[2])
