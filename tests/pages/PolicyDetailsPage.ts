import { Page, Locator } from '@playwright/test';

/** Policy Details — reached by clicking a row on the dashboard. */
export class PolicyDetailsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getPolicyNumber(): Locator {
    return this.page.getByText(/SL-[A-Z0-9-]+/);
  }

  getCoverageAmount(): Locator {
    return this.page.getByText(/Coverage/i).locator('..').getByText(/₹|L\b/);
  }

  getPremiumAmount(): Locator {
    return this.page.getByText(/₹\d+/);
  }

  getStatusBadge(): Locator {
    return this.page.getByText(/Active|Inactive|Pending/i);
  }
}
