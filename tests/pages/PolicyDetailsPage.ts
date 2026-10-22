import { Page, Locator } from '@playwright/test';

/** Policy Details — reached by clicking a row on the dashboard. */
export class PolicyDetailsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getPolicyNumber(): Locator {
    return this.page.getByRole('cell', { name: 'SL-HLT-2024-' });
  }

  getCoverageAmount(): Locator {
    return this.page.getByText(/Coverage/i).locator('..').getByText(/₹|L\b/);
  }

  getPremiumAmount(): Locator {
    return this.page.getByTestId('policy-row-0').getByText(/₹\d+/);
  }

  getStatusBadge(): Locator {
    return this.page.getByTestId('policy-row-0').locator('span').getByText(/Active|Inactive|Pending/i);
  }
}
