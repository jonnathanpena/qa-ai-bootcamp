# Design: Playwright Insurance Suite

## Architecture Decisions

### 1. Page Object Model (POM)
Each major screen (`DashboardPage`, `QuotePage`, `PolicyDetailsPage`, `ClaimPage`) is a class
that owns its own locators and exposes intention-revealing methods (`getPolicyCount()`,
`selectCategory()`, `submitClaim()`...). Specs read like user stories; they never contain a raw
locator string. This isolates the blast radius of a UI change to a single file.

### 2. Custom fixture for Page Objects
`tests/fixtures/pages.ts` extends the base Playwright `test` with one fixture per page object,
all pre-wired to the shared `page`. Specs destructure exactly the page objects they need
(`async ({ dashboardPage, quotePage }) => { ... }`), avoiding manual `new DashboardPage(page)`
boilerplate in every test and keeping construction logic in one place.

### 3. `getByRole`/`getByText`/`getByLabel`/`getByPlaceholder` over CSS selectors
Role/accessible-name based locators mirror how an insurance customer (or a screen reader) would
actually find the element, and they're resilient to class-name/styling refactors that would break
a `.css-class` selector. CSS selectors are used **only** when there is no accessible role/text
alternative, and every such case carries an inline comment explaining why.

### 4. No hardcoded waits
`page.waitForTimeout()` is banned. Instead:
- Playwright's auto-waiting web-first assertions (`expect(locator).toBeVisible()`,
  `.toHaveText()`, `.toHaveCount()`) are used everywhere a condition needs to be awaited.
- `tests/utils/wait-helpers.ts` centralizes any reusable "wait for X to settle" logic (e.g.
  waiting for a table to finish loading rows) so it's testable and documented once, not
  copy-pasted as magic `waitForTimeout(2000)` calls across specs — the #1 source of CI flakiness.

### 5. Soft assertions where multiple validations matter
For checks like the plan-comparison test, where failing on the very first mismatch would hide
other real defects, `expect.soft(...)` is used so the test reports **every** failing assertion
in one run instead of stopping at the first one.

### 6. Tagging strategy
Tests use `@smoke` as a Playwright tag (test title suffix) to mark the minimal, fast subset that
runs on every CI push (`--grep @smoke`). The full suite (smoke + the rest) is intended to run on
a schedule or before merge-to-main, not on every push, to keep CI fast.
