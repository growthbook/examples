"""GrowthBook Python SDK — asyncio/FastAPI example.

Demonstrates the async-native integration pattern:

- one process-wide GrowthBookClient, started and stopped by FastAPI's
  lifespan hook (never create a client per request)
- an async, Redis-backed sticky bucket service (non-blocking network I/O
  on the event loop) with a batched get_all_assignments
- per-request UserContext — the client itself holds no user state

Requires growthbook >= 2.4.0 (AbstractAsyncStickyBucketService).
Set REDIS_URL to enable Redis sticky bucketing; without it the example
falls back to an in-process async store so you can run it immediately.
"""
import os
from contextlib import asynccontextmanager
from typing import Dict, Optional

from fastapi import FastAPI
from growthbook import AbstractAsyncStickyBucketService
from growthbook.common_types import Options, UserContext
from growthbook.growthbook_client import GrowthBookClient

GB_API_HOST = os.environ.get("GB_API_HOST", "https://cdn.growthbook.io")
GB_CLIENT_KEY = os.environ.get("GB_CLIENT_KEY", "sdk-abc123")
REDIS_URL = os.environ.get("REDIS_URL")  # e.g. redis://localhost:6379/0


class RedisStickyBucketService(AbstractAsyncStickyBucketService):
    """Sticky bucket assignments in Redis, fully non-blocking.

    get_all_assignments is overridden with a single MGET so one experiment
    evaluation costs one Redis round-trip regardless of how many identifier
    attributes are configured.
    """

    def __init__(self, redis_client):
        self.redis = redis_client

    async def get_assignments(self, attributeName: str, attributeValue: str) -> Optional[Dict]:
        import json
        raw = await self.redis.get(self.get_key(attributeName, attributeValue))
        return json.loads(raw) if raw else None

    async def get_all_assignments(self, attributes: Dict[str, str]) -> Dict[str, Dict]:
        import json
        keys = [self.get_key(n, v) for n, v in attributes.items()]
        docs = {}
        for key, raw in zip(keys, await self.redis.mget(keys)):
            if raw:
                docs[key] = json.loads(raw)
        return docs

    async def save_assignments(self, doc: Dict) -> None:
        import json
        key = self.get_key(doc["attributeName"], doc["attributeValue"])
        await self.redis.set(key, json.dumps(doc))


class InProcessStickyBucketService(AbstractAsyncStickyBucketService):
    """Fallback so the example runs without Redis. Do not use in production:
    assignments vanish on restart and are not shared between workers."""

    def __init__(self):
        self.docs: Dict[str, Dict] = {}

    async def get_assignments(self, attributeName: str, attributeValue: str) -> Optional[Dict]:
        return self.docs.get(self.get_key(attributeName, attributeValue))

    async def save_assignments(self, doc: Dict) -> None:
        self.docs[self.get_key(doc["attributeName"], doc["attributeValue"])] = doc


@asynccontextmanager
async def lifespan(app: FastAPI):
    if REDIS_URL:
        import redis.asyncio as aioredis
        redis_client = aioredis.from_url(REDIS_URL)
        sticky = RedisStickyBucketService(redis_client)
    else:
        redis_client = None
        sticky = InProcessStickyBucketService()

    client = GrowthBookClient(Options(
        api_host=GB_API_HOST,
        client_key=GB_CLIENT_KEY,
        sticky_bucket_service=sticky,
    ))
    await client.initialize()
    app.state.growthbook = client

    yield

    # Drains in-flight sticky bucket writes, stops feature refresh.
    await client.close()
    if redis_client is not None:
        await redis_client.aclose()


app = FastAPI(lifespan=lifespan)


@app.get("/checkout")
async def checkout(user_id: str, country: str = "US"):
    """Evaluate an experiment feature for this user.

    The sticky bucket read is prefetched without blocking the event loop;
    a new assignment is persisted to Redis fire-and-forget.
    """
    gb: GrowthBookClient = app.state.growthbook
    user = UserContext(attributes={"id": user_id, "country": country})

    variant = await gb.get_feature_value("checkout-experiment", "control", user)
    new_flow = await gb.is_on("new-checkout-flow", user)

    return {"user_id": user_id, "variant": variant, "new_checkout_flow": new_flow}


@app.get("/healthz")
async def healthz():
    """Liveness probe — stays responsive even while sticky bucket I/O is in
    flight, because nothing in the SDK blocks the event loop."""
    return {"ok": True}
