# Trade QA Automation Demo — Insurance Domain

## Elevator Pitch

This project demonstrates risk-based QA automation design for an insurance domain application:
a Playwright E2E suite with resilient locators and the Page Object Model against a real public
insurance demo portal, plus K6 load/stress tests showing non-functional testing discipline — all
runnable with zero backend setup.

## How to Run

No local mock servers, no Express, no in-memory APIs — every test hits a real, public target.

```bash
npm install
npx playwright test                 # full Playwright suite against testerrank.com/insurance
npx playwright test --grep @smoke   # just the smoke subset
npx playwright show-report          # view the HTML report

k6 run k6/scripts/smoke.js          # k6 smoke test against httpbin.org
k6 run k6/scripts/load.js           # k6 load test
k6 run k6/scripts/stress.js         # k6 stress test (breaking-point discipline)
```

## Project Structure

```
openspec/                 # spec-driven development artifacts (project.md, specs/, changes/)
tests/
  fixtures/                # custom Playwright fixtures + sample upload file
  pages/                   # Page Object Model classes
  specs/                   # beginner.spec.ts, intermediate.spec.ts
  utils/                   # wait-helpers.ts (no hardcoded waits)
k6/
  scripts/                 # smoke.js, load.js, stress.js
  README.md
.github/workflows/qa.yml   # CI: Playwright smoke + k6 smoke
playwright.config.ts
```

## What This Demonstrates in an Interview

| Artifact | Skill demonstrated |
|---|---|
| POM with resilient locators | Maintainability, avoiding flaky tests |
| Beginner + Intermediate specs | Risk-based coverage of insurance domain |
| Claim upload test | File handling, validation, dynamic status |
| K6 smoke/load/stress | Non-functional testing discipline, threshold design |
| Stress stop condition | Criterion for when to pause and escalate |
| OpenSpec changes | Spec-driven development, AI-assisted workflow |

## How I'd Explain This in 2 Minutes

"This is a QA automation demo built around a public insurance sandbox — PolicyDekho on
TesterRank — so it's fully runnable without any backend setup. I used OpenSpec to drive the work
spec-first: I wrote a living spec of the insurance portal's capabilities, then proposed two
changes — a Playwright suite and a K6 load-test suite — each with its own proposal, design
rationale, and task list, so the reasoning behind the code is captured, not just the code itself.

On the Playwright side, I built a Page Object Model with fixtures so tests read like user
stories, and every locator is role- or text-based rather than CSS classes, so the suite survives
routine UI changes. I covered the Beginner dashboard exercise and the Intermediate claims and
premium-calculator exercises, including a cascading-dropdown quote flow and a document-upload
claim submission — and I used soft assertions where multiple things need validating in one test,
so one failure doesn't hide another.

On the load-testing side, I used httpbin.org rather than the insurance sandbox itself, because
load-testing a shared public demo app isn't good etiquette — httpbin is built to take that kind
of traffic. I wrote a smoke → load → stress progression with real thresholds, and the stress test
has an explicit stop condition: once error rate crosses 5%, the test logs that it's time to pause
and investigate rather than keep escalating. That mirrors a real incident I handled at Amdocs,
where 13 of 14 TMF endpoints collapsed under load — I paused, gathered evidence, and escalated
instead of continuing to push the system past its limits. That same discipline is built into this
demo."
