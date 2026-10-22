# Tasks: Add K6 Load Tests

1. **Smoke script** — `k6/scripts/smoke.js`: 1 VU/10s, GET `/get` + POST `/post`, 200-status and
   latency checks, thresholds.
2. **Load script** — `k6/scripts/load.js`: staged VU ramp (0→10→10→0), looped scenario,
   thresholds.
3. **Stress script** — `k6/scripts/stress.js`: staged ramp 1→40 VUs, custom `error_rate` Trend,
   `setup()`/`teardown()` logging of the stop-condition discipline.
4. **K6 docs** — `k6/README.md`: run instructions, how to read threshold pass/fail output, the
   interview talking point about the Amdocs/Kruger finding.
5. **CI** — add `k6-smoke` job to `.github/workflows/qa.yml` installing k6 and running
   `k6 run k6/scripts/smoke.js` on push/PR.
