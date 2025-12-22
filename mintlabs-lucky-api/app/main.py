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
    draw_personalized,
    draw_sum_target,
    draw_wheel,
    get_last_number_probability,
    spaced_draw,
)
from .security import SimpleRateLimitMiddleware
from .utils import hmac_commitment, new_request_id, sha256_hex

app = FastAPI(title="MintLabs Lucky API")


# ---------------------------------------------------------------------------
# Security Headers Middleware (always active)
# ---------------------------------------------------------------------------
@app.middleware("http")
async def security_headers(request: Request, call_next):
    """Add security headers to all responses."""
    response: Response = await call_next(request)

    # Always set these headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = (
        "camera=(), microphone=(), geolocation=(), payment=()"
    )

    # HSTS only in production with HTTPS
    if settings.ENFORCE_HTTPS:
        proto = (
            request.headers.get("x-forwarded-proto")
            if settings.TRUST_PROXY
            else request.url.scheme
        )
        if proto == "https":
            response.headers["Strict-Transport-Security"] = (
                "max-age=31536000; includeSubDomains"
            )

    # Basic CSP - restrictive default, allow API connections
    # Note: This is an API, not serving HTML, so CSP is mostly for defense-in-depth
    csp_parts = [
        "default-src 'none'",
        "frame-ancestors 'none'",
    ]
    response.headers["Content-Security-Policy"] = "; ".join(csp_parts)

    return response


# HTTPS redirect (prod only)
if settings.ENFORCE_HTTPS:
    app.add_middleware(HTTPSRedirectMiddleware)


# Trusted hosts
app.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.ALLOWED_HOSTS)

# Rate limit (token bucket with burst support)
app.add_middleware(
    SimpleRateLimitMiddleware,
    max_per_minute=settings.RATE_LIMIT_PER_MINUTE,
    burst=settings.RATE_LIMIT_BURST,
    trust_proxy=settings.TRUST_PROXY,
    exempt_paths=settings.RATE_LIMIT_EXEMPT_PATHS,
    admin_paths=settings.RATE_LIMIT_ADMIN_PATHS,
    admin_max_per_minute=settings.RATE_LIMIT_ADMIN_PER_MINUTE,
    admin_burst=settings.RATE_LIMIT_ADMIN_BURST,
)

# CORS (avoid "*" when credentials are allowed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)

# Register API routers
from .routes import lucky_profiles
app.include_router(lucky_profiles.router)


# ---------------------------------------------------------------------------
# Request tracing & logging middleware
# ---------------------------------------------------------------------------
# LOG FORMAT (frozen):
#   [REQ] {request_id} {method} {path} {status} {latency}ms
#   [GEN] {request_id} game={game} mode={mode} latency={latency}ms
#   [ERR] {request_id} {status} {error_type}: {message}
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

    # Structured log line: [REQ] {request_id} {method} {path} {status} {latency}ms
    print(
        f"[REQ] {request_id} {request.method} {request.url.path} "
        f"{response.status_code} {duration_ms}ms"
    )

    return response


# ---------------------------------------------------------------------------
# Global exception handlers
# ---------------------------------------------------------------------------
# ERROR RESPONSE SHAPE (frozen):
#   4xx: {"error": "client_error:<code>", "request_id": "...", "status": <int>}
#   5xx: {"error": "internal_error:<code>", "request_id": "...", "status": <int>}
# Never leak stack traces, SQL, or raw user input in responses.
# ---------------------------------------------------------------------------


def _error_code_from_detail(detail: str) -> str:
    """Extract error code from detail string for structured responses."""
    if not detail or not isinstance(detail, str):
        return "unknown"
    # Handle "invalid_config: ..." style details
    if ":" in detail:
        return detail.split(":")[0].strip()
    # Map common details to codes
    mapping = {
        "unknown game_code": "not_found",
        "unauthorized": "unauthorized",
        "rate limit exceeded": "rate_limited",
    }
    return mapping.get(detail, detail.replace(" ", "_")[:30])


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Return consistent JSON for HTTP exceptions with request ID."""
    request_id = getattr(request.state, "request_id", None)
    error_code = _error_code_from_detail(exc.detail)

    # Determine error category
    if exc.status_code >= 500:
        category = "internal_error"
    else:
        category = "client_error"

    full_error = f"{category}:{error_code}"

    # Log with error code: [ERR] {request_id} {status} {full_error}
    print(f"[ERR] {request_id} {exc.status_code} {full_error}")

    content = {
        "error": full_error,
        "request_id": request_id,
        "status": exc.status_code,
    }
    # Preserve original detail for client-side testing and helpful feedback
    if isinstance(exc.detail, (str, dict)):
        content["detail"] = exc.detail

    return JSONResponse(status_code=exc.status_code, content=content)


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    """Catch-all handler: log full error, return safe message to client."""
    import traceback

    request_id = getattr(request.state, "request_id", None)
    error_type = type(exc).__name__

    # Log server errors with type: [ERR] {request_id} 500 internal_error:{type}
    print(f"[ERR] {request_id} 500 internal_error:{error_type}")
    traceback.print_exc()  # Full trace to server logs only

    return JSONResponse(
        status_code=500,
        content={
            "error": "server_error:internal",
            "request_id": request_id,
            "status": 500,
        },
    )


# ---------------------------------------------------------------------------
# Game config validation
# ---------------------------------------------------------------------------
def _validate_game_config(
    game_meta: dict,
    mode: str,
    target_sum: Optional[int] = None,
    lucky_numbers: Optional[list[int]] = None,
) -> None:
    """Validate game configuration before generation. Raises HTTPException(400) on failure."""
    wmin = game_meta["white_min"]
    wmax = game_meta["white_max"]
    wcount = game_meta["white_count"]
    bmin = game_meta.get("bonus_min")
    bmax = game_meta.get("bonus_max")

    # Basic range validation
    if wmin >= wmax:
        raise HTTPException(400, detail="invalid_config: white_min must be less than white_max")
    
    pool_size = wmax - wmin + 1
    if wcount > pool_size:
        raise HTTPException(
            400,
            detail=f"invalid_config: cannot pick {wcount} unique from pool of {pool_size}",
        )
    
    if wcount <= 0:
        raise HTTPException(400, detail="invalid_config: white_count must be positive")

    # Bonus validation (if present)
    if bmin is not None and bmax is not None:
        if bmin >= bmax:
            raise HTTPException(400, detail="invalid_config: bonus_min must be less than bonus_max")

    # Mode-specific validation
    if mode == "sum_target" and target_sum is not None:
        # Calculate feasible sum range
        min_possible_sum = sum(range(wmin, wmin + wcount))
        max_possible_sum = sum(range(wmax - wcount + 1, wmax + 1))
        if target_sum < min_possible_sum or target_sum > max_possible_sum:
            raise HTTPException(
                400,
                detail=(
                    f"invalid_config: target_sum {target_sum} not achievable "
                    f"(range: {min_possible_sum}-{max_possible_sum})"
                ),
            )

    if mode == "lucky" and lucky_numbers:
        # Lucky numbers must be within valid range
        for n in lucky_numbers:
            if n < wmin or n > wmax:
                raise HTTPException(
                    400,
                    detail=f"invalid_config: lucky number {n} outside valid range ({wmin}-{wmax})"
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
        "lucky_profiles": "/v1/lucky/birthstone-rashi",
    }


@app.get("/health")
def health():
    """Liveness check - fast, no DB dependency."""
    return {"status": "ok"}


@app.get("/readyz")
def readyz():
    """Readiness check - includes DB connectivity test."""
    try:
        with get_conn() as conn:
            conn.execute("SELECT 1", prepare=False)
        return {"status": "ok", "db": "connected"}
    except Exception:
        return JSONResponse(
            status_code=503,
            content={
                "error": "internal_error:db_unavailable",
                "status": 503,
            },
        )


@app.get("/stats")
def stats(request: Request):
    """Return generation analytics (in-memory, resets on restart).
    
    In production, gate with ADMIN_TOKEN via Authorization header.
    Returns 404 on auth failure to avoid revealing admin endpoints exist.
    """
    # If ADMIN_TOKEN is set, require it (return 404 to hide endpoint existence)
    if settings.ADMIN_TOKEN:
        auth = request.headers.get("Authorization", "")
        expected = f"Bearer {settings.ADMIN_TOKEN}"
        if auth != expected:
            # Return 404 instead of 401/403 to avoid revealing this is an admin endpoint
            raise HTTPException(status_code=404, detail="not_found")
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

        # Validate config before proceeding
        _validate_game_config(game_meta, req.mode, req.target_sum, req.lucky_numbers)

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
        elif req.mode in (
            "zodiac",
            "gemstone",
            "star_sign",
            "jyotish",
            "chinese_zodiac",
            "favorite_color",
        ):
            # Themed / personality modes are selected via a `mode_key` which
            # maps to a stable seed profile. This prevents free-form inputs and
            # makes behavior deterministically reproducible while keeping
            # statistics uniform.
            try:
                from .mode_config import MODE_CONFIG
                mode_map = MODE_CONFIG.get(req.mode, {})
                items = mode_map.get('items', [])
                # find the configured seed for the provided mode_key
                seed = ''
                if req.mode_key:
                    for it in items:
                        if it.get('key') == req.mode_key:
                            seed = it.get('seed', '')
                            break
                # fallback empty seed -> behave like random
            except Exception:
                seed = ''
            whites = draw_personalized(wmin, wmax, wcount, rng, seed)
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
        try:
            msg = f"[GEN] {request_id} game={req.game_code} mode={req.mode}"
            if req.mode_key:
                msg += f" mode_key={req.mode_key}"
            msg += f" latency={latency}ms"
            print(msg)
        except Exception:
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
            mode_key=req.mode_key,
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
