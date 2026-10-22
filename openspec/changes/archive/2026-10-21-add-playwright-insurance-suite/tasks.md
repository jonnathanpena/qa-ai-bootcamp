# Tasks: Add Playwright Insurance Suite

1. **Setup** — initialize `package.json`, install `@playwright/test`, `typescript`, enable
   `strict: true`.
2. **Config** — write `playwright.config.ts` (baseURL, trace/screenshot settings, chromium-only
   project, HTML + list reporters).
3. **Page Objects** — implement `DashboardPage`, `QuotePage`, `PolicyDetailsPage`, `ClaimPage`
   under `tests/pages/`, using only role/text/label/placeholder locators.
4. **Fixtures** — implement `tests/fixtures/pages.ts` wiring each page object into the Playwright
   `test` fixture, so specs can destructure them directly.
5. **Beginner specs** — `tests/specs/beginner.spec.ts`: health quote happy path, policy details
   data integrity (both tagged `@smoke` where applicable).
6. **Intermediate specs** — `tests/specs/intermediate.spec.ts`: plan comparison (soft assertions),
   claim submission with document upload (claim number regex assertion).
7. **Utilities** — `tests/utils/wait-helpers.ts`: table-load wait helper using web-first
   assertions, no `waitForTimeout`.
8. **Sample fixture data** — generate `tests/fixtures/sample-claim.pdf` for the upload test.
9. **CI** — add `playwright-smoke` job to `.github/workflows/qa.yml` running
   `npx playwright test --grep @smoke` on push/PR.
10. **Docs** — update root `README.md` with run instructions and the "what this demonstrates"
    table.
