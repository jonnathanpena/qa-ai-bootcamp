# Project Context

QA automation demo for the **insurance domain**.

- **Playwright E2E** tests run against [TesterRank PolicyDekho](https://www.testerrank.com/insurance) —
  a public, free-to-use demo insurance portal — covering the Beginner (Policy Dashboard) and
  Intermediate (Claims Filing, Premium Calculator/Quotes) practice exercises.
- **K6 load tests** run against [httpbin.org](https://httpbin.org), a public HTTP echo service,
  used purely as a stand-in load target so non-functional testing methodology can be demonstrated
  without depending on (or hammering) the demo insurance app itself.
- **Purpose**: demonstrate risk-based test design, resilient (role/label/text-based) locators,
  the Page Object Model, and an AI-assisted, spec-driven development workflow (via OpenSpec) in a
  technical interview setting.

No local mock servers or backend setup of any kind are used — every test hits a real, public
target over the network.
