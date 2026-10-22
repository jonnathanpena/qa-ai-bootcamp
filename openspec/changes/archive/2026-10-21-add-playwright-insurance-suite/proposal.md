# Proposal: Add Playwright Insurance Suite

## Why

We need a runnable, interview-ready demonstration of E2E automation skill against a realistic
insurance domain application. TesterRank's PolicyDekho sandbox is public, stable, and free,
removing any need for mocks or backend setup — the suite can be cloned and run by anyone.

## What It Proves

- **Beginner + Intermediate coverage**: the suite automates both the Policy Dashboard exercise
  (Beginner) and the Claims Filing + Premium Calculator exercises (Intermediate), showing
  risk-based prioritization (start with the highest-traffic, lowest-complexity flows).
- **Resilient locators**: every locator is `getByRole`/`getByText`/`getByLabel`/`getByPlaceholder`
  based, not brittle CSS class selectors, so the suite survives routine UI/style changes.
- **Page Object Model (POM)**: test logic is separated from page structure, so a selector change
  only requires editing one page object, not every spec that uses it.
- **CI-ready**: a GitHub Actions workflow runs the `@smoke`-tagged subset on every push/PR,
  demonstrating the suite is wired into a real pipeline, not just run locally.

## Non-Goals

- Full regression coverage of every PolicyDekho exercise (Advanced/Security exercises are
  explicitly out of scope — see `openspec/specs/insurance-portal.md`).
- Cross-browser matrix testing (Chromium-only, to keep the demo fast and deterministic).
