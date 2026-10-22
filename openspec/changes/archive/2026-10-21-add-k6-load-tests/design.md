# Design: K6 Load Tests

## Progression

1. **Smoke (`smoke.js`)** — 1 VU, 10s. Confirms the scenario itself is correct (right endpoints,
   right assertions) before spending any real load budget. If smoke fails, every later stage is
   assumed invalid without further investigation.
2. **Load (`load.js`)** — ramps 0→10 VUs over 10s, holds 10 VUs for 20s, ramps down over 10s, with
   each VU looping the scenario 3 times. Confirms the system behaves under an expected, sustained
   level of concurrent traffic. Looser thresholds than smoke to account for realistic network
   variance under load.
3. **Stress (`stress.js`)** — staged ramps from 1 up to 40 VUs in 10s increments. The goal is to
   locate the point where error rate starts climbing, not to sustain peak load. A custom `Trend`
   metric (`error_rate`) is recorded per stage so the breaking point can be read directly from the
   summary rather than inferred from raw counts.

## Thresholds

- `http_req_duration`: `p(95)<500` for smoke, `p(95)<800` for load — load's looser bound reflects
  expected (not pathological) queueing under concurrency.
- `http_req_failed`: `rate<0.01` for smoke, `rate<0.02` for load. Stress intentionally has **no**
  pass/fail threshold on error rate — a stress test's purpose is to characterize failure, not to
  assert it stays below a bar.

## Stop Condition (Stress Test)

The stress script treats **error rate > 5%** as the signal to stop escalating and start
investigating, mirroring real-world incident practice: when a prior engagement found 13 of 14
TMF endpoints collapsing from ~100% to 0% success between 9 and 29 concurrent threads, the right
action was to pause and escalate with evidence, not to keep pushing load. `teardown()` prints the
peak VU count and the error rate observed at peak so a test operator has that evidence
immediately, without parsing raw k6 output.
