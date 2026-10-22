# K6 Load Tests

All scripts target `https://httpbin.org` — a public HTTP echo service — so load methodology can
be demonstrated without depending on or overloading the insurance demo sandbox.

## Running

```bash
k6 run k6/scripts/smoke.js    # 1 VU, 10s — sanity check the scenario itself
k6 run k6/scripts/load.js     # ramped to 10 VUs, sustained — expected concurrent traffic
k6 run k6/scripts/stress.js   # ramped to 40 VUs — find the breaking point
```

## Reading the Output

At the end of each run, k6 prints a `thresholds` section per metric:

- **Green `✓`** — the threshold passed (e.g. `http_req_duration..... p(95)<500`).
- **Red `✗`** — the threshold failed, and k6 exits with a non-zero status code (useful for CI
  gating).

`smoke.js` and `load.js` have explicit thresholds (`http_req_duration`, `http_req_failed`) and
will fail the run if either is breached. `stress.js` deliberately has **no** threshold — its
custom `error_rate` Trend metric in the summary is meant to be read by a human, not gated in CI.

## When to Stop a Stress Test

Treat **error rate > 5%** as the signal to pause and investigate, not a target to push past.
`stress.js` logs this discipline explicitly in `setup()`/`teardown()`.

## Interview Talking Point

In Amdocs (Kruger), I found 13/14 TMF endpoints collapsed from ~100% to 0% success at 9–29
concurrent threads. I paused stress tests and escalated with evidence. The same discipline
applies here: stress tests find limits, they don't blindly overload.
