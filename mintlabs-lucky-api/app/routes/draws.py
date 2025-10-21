# app/routes/draws.py
from datetime import date, timedelta

from fastapi import APIRouter, Query

from .db import get_conn  # your psycopg connection helper

router = APIRouter(prefix="/draws", tags=["draws"])


@router.get("")
def list_draws(game_code: str, days: int = Query(30, ge=1, le=365)):
    since = date.today() - timedelta(days=days)
    with get_conn() as conn:
        rows = conn.execute(
            """
            select game_code, draw_date, numbers, bonus
            from draws
            where game_code=%s and draw_date >= %s
            order by draw_date desc
            limit 365
        """,
            (game_code, since),
        ).fetchall()
    return [dict(r) for r in rows]


@router.get("/stats")
def draw_stats(game_code: str, days: int = Query(30, ge=1, le=365)):
    since = date.today() - timedelta(days=days)
    with get_conn() as conn:
        freq = conn.execute(
            """
            with recent as (
              select numbers, bonus
              from draws
              where game_code=%s and draw_date >= %s
            )
            select 'white' as kind, unnest(numbers) as n, count(*) as c
              from recent group by n
            union all
            select 'bonus', bonus, count(*)
              from recent where bonus is not null group by bonus
            order by kind, c desc, n asc
        """,
            (game_code, since),
        ).fetchall()
    return [dict(r) for r in freq]
