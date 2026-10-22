import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { QuotePage } from '../pages/QuotePage';
import { PolicyDetailsPage } from '../pages/PolicyDetailsPage';

interface PageFixtures {
  dashboardPage: DashboardPage;
  quotePage: QuotePage;
  policyDetailsPage: PolicyDetailsPage;
}

// Extending `test` with one fixture per Page Object removes `new XPage(page)` boilerplate
// from every spec and keeps construction logic in exactly one place.
export const test = base.extend<PageFixtures>({
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  quotePage: async ({ page }, use) => {
    await use(new QuotePage(page));
  },
  policyDetailsPage: async ({ page }, use) => {
    await use(new PolicyDetailsPage(page));
  },
});

export { expect } from '@playwright/test';
