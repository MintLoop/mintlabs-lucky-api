import random
import time
from threading import Lock
from typing import Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.responses import JSONResponse, Response

from .config import settings
from .db import get_conn

# existing imports (models, db, rng, utils, etc.)
from .models import GenerateReq, GenerateResp
from .rng import (
    SecureRng,
    calculate_probabilities,
    draw_birthday,
    draw_hot_cold,
    draw_lucky,
    draw_odd_even_mix,
    draw_pattern_avoid,
    draw_sum_target,
    draw_wheel,
    get_last_number_probability,
    spaced_draw,
)
from .security import SimpleRateLimitMiddleware
from .utils import hmac_commitment, new_request_id, sha256_hex

app = FastAPI(title="MintLabs Lucky API")


# HTTPS redirect + security headers
if settings.ENFORCE_HTTPS:
    app.add_middleware(HTTPSRedirectMiddleware)

    @app.middleware("http")
    async def sec_headers(request: Request, call_next):
        proto = (
            request.headers.get("x-forwarded-proto") if settings.TRUST_PROXY else request.url.scheme
        )
        resp: Response = await call_next(request)
        if proto == "https":
            resp.headers["Strict-Transport-Security"] = "max-age=15552000; includeSubDomains"
        resp.headers["X-Content-Type-Options"] = "nosniff"
        resp.headers["X-Frame-Options"] = "DENY"
        resp.headers["Referrer-Policy"] = "no-referrer"
        resp.headers["Cache-Control"] = "no-store"
        return resp


# Trusted hosts
app.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.ALLOWED_HOSTS)

# Rate limit (token bucket with burst support)
app.add_middleware(
    SimpleRateLimitMiddleware,
    max_per_minute=settings.RATE_LIMIT_PER_MINUTE,
    burst=settings.RATE_LIMIT_BURST,
    trust_proxy=settings.TRUST_PROXY,
    exempt_paths=settings.RATE_LIMIT_EXEMPT_PATHS,
)

# CORS (avoid "*" when credentials are allowed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)


# ---------------------------------------------------------------------------
# Request tracing & logging middleware
# ---------------------------------------------------------------------------
@app.middleware("http")
async def add_request_tracing(request: Request, call_next):
    """Add request ID to all requests for tracing and log timing."""
    request_id = request.headers.get("X-Request-ID") or new_request_id()
    request.state.request_id = request_id
    start = time.time()

    response = await call_next(request)

    duration_ms = int((time.time() - start) * 1000)
    response.headers["X-Request-ID"] = request_id

    # Structured log line for observability
    print(f"[{request_id}] {request.method} {request.url.path} →"
          f"{response.status_code} ({duration_ms}ms)")

    return response


# ---------------------------------------------------------------------------
# Global exception handlers
# ---------------------------------------------------------------------------
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Return consistent JSON for HTTP exceptions with request ID."""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.detail,
            "request_id": getattr(request.state, "request_id", None),
        },
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    """Catch-all handler: log full error, return safe message to client."""
    import traceback

    traceback.print_exc()
    return JSONResponse(
        status_code=500,
        content={
            "detail": "internal_error",
            "request_id": getattr(request.state, "request_id", None),
        },
    )


# ---------------------------------------------------------------------------
# Simple analytics counters (in-memory, resets on restart)
# For production, replace with proper metrics (Prometheus, StatsD, etc.)
# ---------------------------------------------------------------------------
_analytics_lock = Lock()
_analytics: dict[str, dict[str, int]] = {
    "by_game": {},   # game_code -> count
    "by_mode": {},   # mode -> count
    "total": 0,
}


def _record_generation(game_code: str, mode: str) -> None:
    """Record a generation for analytics. Thread-safe."""
    with _analytics_lock:
        _analytics["by_game"][game_code] = _analytics["by_game"].get(game_code, 0) + 1
        _analytics["by_mode"][mode] = _analytics["by_mode"].get(mode, 0) + 1
        _analytics["total"] += 1


def _get_analytics_summary() -> dict:
    """Return current analytics snapshot."""
    with _analytics_lock:
        return {
            "by_game": dict(_analytics["by_game"]),
            "by_mode": dict(_analytics["by_mode"]),
            "total": _analytics["total"],
        }


# Simple in-process cache for infrequently changing game metadata
_games_cache_lock = Lock()
_games_cache: dict[str, object] = {
    "expires": 0.0,
    "data": [],
    "index": {},
}


def _load_games_from_db() -> list[dict[str, object]]:
    with get_conn() as conn:
        rows = conn.execute(
            """
            select
                code,
                name,
                white_min,
                white_max,
                white_count,
                bonus_min,
                bonus_max,
                bonus_count
            from games
            order by name
            """,
            prepare=False,
        ).fetchall()
    return [
        {
            "code": r[0],
            "name": r[1],
            "white_min": r[2],
            "white_max": r[3],
            "white_count": r[4],
            "bonus_min": r[5],
            "bonus_max": r[6],
            "bonus_count": r[7],
        }
        for r in rows
    ]


def _refresh_games_cache() -> None:
    data = _load_games_from_db()
    new_index = {g["code"]: g for g in data}
    expires = time.monotonic() + max(1, settings.GAMES_CACHE_SECONDS)
    with _games_cache_lock:
        _games_cache["data"] = data
        _games_cache["index"] = new_index
        _games_cache["expires"] = expires


def _get_games_cached(force_refresh: bool = False) -> list[dict[str, object]]:
    now = time.monotonic()
    with _games_cache_lock:
        cache_valid = (now < _games_cache["expires"]) and _games_cache["data"]
    if not cache_valid or force_refresh:
        _refresh_games_cache()
    with _games_cache_lock:
        return list(_games_cache["data"])


def _get_game_config(game_code: str) -> Optional[dict[str, object]]:
    _get_games_cached()
    with _games_cache_lock:
        cfg = _games_cache["index"].get(game_code)
    if cfg:
        return cfg
    # Cache might be stale; force refresh once.
    _refresh_games_cache()
    with _games_cache_lock:
        return _games_cache["index"].get(game_code)


@app.get("/")
def root():
    return {
        "service": "MintLabs Lucky API",
        "docs": "/docs",
        "health": "/health",
        "games": "/games",
        "generate": "/generate",
    }


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/stats")
def stats():
    """Return generation analytics (in-memory, resets on restart)."""
    return _get_analytics_summary()


@app.get("/games")
def games():
    return _get_games_cached()


@app.post("/generate", response_model=GenerateResp)
def generate(req: GenerateReq, request: Request):
    import traceback

    try:
        t0 = time.time()
        session_id = request.cookies.get("ml_session") or "anon"

        game_meta = _get_game_config(req.game_code)
        if not game_meta:
            raise HTTPException(status_code=404, detail="unknown game_code")

        wmin = game_meta["white_min"]
        wmax = game_meta["white_max"]
        wcount = game_meta["white_count"]
        bmin = game_meta.get("bonus_min")
        bmax = game_meta.get("bonus_max")
        bcount = game_meta.get("bonus_count")

        rng = SecureRng()
        # Handle different generation modes
        if req.mode == "spaced":
            whites = spaced_draw(wmin, wmax, wcount, rng)
        elif req.mode == "sum_target":
            whites = draw_sum_target(wmin, wmax, wcount, rng, req.target_sum)
        elif req.mode == "birthday":
            whites = draw_birthday(wmin, wmax, wcount, rng, req.birth_date)
        elif req.mode == "lucky":
            whites = draw_lucky(wmin, wmax, wcount, rng, req.lucky_numbers)
        elif req.mode == "wheel":
            whites = draw_wheel(wmin, wmax, wcount, rng, req.wheel_type)
        elif req.mode == "balanced":
            whites = draw_hot_cold(wmin, wmax, wcount, rng, "balanced")
        elif req.mode == "odd_even_mix":
            whites = draw_odd_even_mix(wmin, wmax, wcount, rng)
        elif req.mode == "pattern_avoid":
            whites = draw_pattern_avoid(wmin, wmax, wcount, rng)
        elif req.mode == "hot":
            whites = draw_hot_cold(wmin, wmax, wcount, rng, "hot")
        elif req.mode == "cold":
            whites = draw_hot_cold(wmin, wmax, wcount, rng, "cold")
        else:
            # Default to random for unknown modes
            whites = rng.sample_unique(wmin, wmax, wcount)

        # Shuffle to randomize order, simulating true lotto draw
        random.shuffle(whites)

        bonus = None
        if bcount and bmax:
            bonus = rng.randint(bmin, bmax)

        request_id = new_request_id()
        commit = hmac_commitment(request_id)
        latency = int((time.time() - t0) * 1000)

        # privacy-friendly hash of numbers
        nhash = sha256_hex("-".join(map(str, whites + ([bonus] if bonus else []))))

        with get_conn() as conn:
            conn.execute(
                """
                insert into generations (
                    session_id,
                    game_code,
                    mode,
                    numbers,
                    bonus,
                    numbers_hash,
                    seed_commitment,
                    request_ms
                )
                values (%s,%s,%s,%s,%s,%s,%s,%s)
                """,
                (session_id, req.game_code, req.mode, whites, bonus, nhash, commit, latency),
                prepare=False,
            )

        # Record analytics (in-memory counters)
        _record_generation(req.game_code, req.mode)
        print(f"[GEN] {request_id} game={req.game_code} mode={req.mode} latency={latency}ms")

        # Calculate probabilities for the generated set
        try:
            prob = calculate_probabilities(
                wmin,
                wmax,
                wcount,
                bmin if bcount else None,
                bmax if bcount else None,
                req.sets or 1,
            )
        except Exception:
            prob = {}

        # last number info
        try:
            last_info = get_last_number_probability(whites, bonus, wmax, bmax)
            # normalize to dict for pydantic model compatibility
            if isinstance(last_info, str):
                last_info = {"message": last_info}
        except Exception:
            last_info = None

        odds_display = None
        if "combined_odds" in prob:
            odds_display = f"1 in {int(prob['combined_odds']):,}"
        else:
            odds_display = (
                f"1 in {int(prob.get('main_odds', 0)):,}" if prob.get("main_odds") else None
            )

        # Build a single-draw result entry so the response aligns with the
        # current GenerateResp model which includes batch information.
        single_result = {
            "numbers": whites,
            "bonus": bonus,
            "commitment": commit,
            "request_id": request_id,
            "latency_ms": latency,
            "odds": odds_display,
            "probability_percent": prob.get("combined_probability_percent")
            or prob.get("main_probability_percent"),
        }

        # Ensure combined_sets_odds is a string (Pydantic expects Optional[str])
        combined_sets_odds_val = prob.get("combined_sets_odds")
        if combined_sets_odds_val is not None and not isinstance(combined_sets_odds_val, str):
            try:
                combined_sets_odds_val = str(combined_sets_odds_val)
            except Exception:
                combined_sets_odds_val = None

        return GenerateResp(
            game=req.game_code,
            mode=req.mode,
            numbers=whites,
            bonus=bonus,
            commitment=commit,
            request_id=request_id,
            latency_ms=latency,
            odds=odds_display,
            probability_percent=prob.get("combined_probability_percent")
            or prob.get("main_probability_percent"),
            combined_sets_odds=combined_sets_odds_val,
            combined_sets_probability_percent=prob.get("combined_sets_probability_percent"),
            last_number_info=last_info,
            total_sets=req.sets or 1,
            results=[single_result],
        )

    except HTTPException:
        raise
    except Exception as exc:  # pragma: no cover - defensive guard
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="generation_failed") from exc
