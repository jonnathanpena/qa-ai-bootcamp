# Proposal: Add K6 Load Tests

## Why

The insurance demo portal (PolicyDekho) is a shared, free, public sandbox — it has no documented
rate-limit/load-testing policy, so deliberately generating load against it would be both poor
etiquette and an unreliable basis for a repeatable demo (results would depend on how many other
testers are using the same sandbox at that moment). `httpbin.org` is a purpose-built public HTTP
echo service designed to absorb exactly this kind of traffic, giving us a stable, reproducible
target to demonstrate load-testing **methodology** — scenario design, checks, thresholds, staged
ramp-up, and a documented stop condition — independent of any particular application's API.

## What It Proves

- Ability to design a smoke → load → stress progression rather than jumping straight to maximum
  load.
- Threshold-based pass/fail criteria (`http_req_duration`, `http_req_failed`) instead of
  eyeballing a report.
- A concrete, evidence-based **stop condition** for stress testing: escalate and pause once error
  rate crosses a defined threshold, rather than continuing to increase load past the point of
  useful signal.
