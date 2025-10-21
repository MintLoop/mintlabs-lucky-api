import hashlib
import hmac
import secrets
import time
from typing import Optional

from .config import settings


def _hmac_key_bytes() -> bytes:
    secret = settings.HMAC_SECRET
    if secret.startswith("0x"):
        return bytes.fromhex(secret[2:])
    return secret.encode()


def hmac_commitment(request_id: str, iso_date: Optional[str] = None) -> str:
    if iso_date is None:
        iso_date = time.strftime("%Y-%m-%d")
    message = f"{request_id}:{iso_date}".encode()
    digest = hmac.new(_hmac_key_bytes(), message, hashlib.sha256)
    return digest.hexdigest()


def new_request_id() -> str:
    return secrets.token_hex(8)


def sha256_hex(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()
