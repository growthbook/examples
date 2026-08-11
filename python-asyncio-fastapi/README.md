# GrowthBook Python SDK — asyncio / FastAPI example

A minimal FastAPI service showing the async-native GrowthBook integration
pattern for high-concurrency Python services:

- **One process-wide `GrowthBookClient`**, created and closed by FastAPI's
  lifespan hook. Never create a client per request.
- **Async Redis sticky bucket service** (`AbstractAsyncStickyBucketService`,
  growthbook >= 2.4.0) — sticky bucket reads and writes never block the
  event loop. `get_all_assignments` is overridden with one batched `MGET`.
- **Per-request `UserContext`** — the client holds no user state, so one
  instance serves every request concurrently.

## Run it

```bash
pip install -r requirements.txt

# Optional but recommended: real Redis for sticky bucketing
docker compose up -d redis
export REDIS_URL=redis://localhost:6379/0

# Point at your GrowthBook instance
export GB_API_HOST=https://cdn.growthbook.io
export GB_CLIENT_KEY=sdk-your-key

uvicorn main:app --reload
```

Without `REDIS_URL` the example falls back to an in-process store so it runs
out of the box (not for production — assignments are lost on restart and not
shared across workers).

```bash
curl 'localhost:8000/checkout?user_id=user-123'
curl localhost:8000/healthz
```

Create a feature named `checkout-experiment` (an experiment rule with sticky
bucketing enabled) and a flag `new-checkout-flow` in GrowthBook to see real
variations; unknown features fall back to their defaults.

## Why the async service matters

With a sync sticky bucket service, every network round-trip to your
assignment store runs on (or is offloaded from) the event loop. The async
interface lets the SDK await your store natively: reads are prefetched per
evaluation, writes are fire-and-forget and drained on `close()`. See the SDK
benchmark (`tests/scripts/benchmark_async_client.py` in growthbook-python)
for the difference under load.
