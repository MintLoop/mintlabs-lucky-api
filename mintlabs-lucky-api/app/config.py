from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # For local development it's convenient to provide safe defaults so the app
    # can start without setting environment variables. **Do not** use these
    # defaults in production — set real secrets via environment or .env.
    DATABASE_URL: str = "sqlite:///./dev.db"
    HMAC_SECRET: str = "dev-secret"

    ALLOWED_ORIGINS: list[str] = Field(
        default_factory=lambda: ["http://localhost:4321", "http://localhost:4322"],
    )
    # ALLOWED_ORIGINS: List[str] = Field(default_factory=lambda: ["https://lucky.mintloop.dev"])

    ALLOWED_HOSTS: list[str] = Field(default_factory=lambda: ["localhost", "127.0.0.1"])
    RATE_LIMIT_PER_MINUTE: int = 60
    ENFORCE_HTTPS: bool = False
    TRUST_PROXY: bool = False

    # Performance tuning knobs
    DB_MIN_CONNECTIONS: int = 1
    DB_MAX_CONNECTIONS: int = 5
    DB_POOL_TIMEOUT: float = 30.0
    GAMES_CACHE_SECONDS: int = 60


settings = Settings()
