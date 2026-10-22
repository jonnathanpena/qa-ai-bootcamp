import { Page, Locator } from '@playwright/test';

/**
 * Dashboard ("MY ACTIVE POLICIES" table) — the Beginner "Policy Management & Dashboard" exercise.
 * Only role-based locators are used so the suite survives CSS/markup refactors.
 */
export class DashboardPage {
  readonly page: Page;
  readonly policyRows: Locator;

  constructor(page: Page) {
    this.page = page;
    // Every policy occupies a table <tr>; the header row also matches `row` but is excluded
    // by requiring a cell match further down, keeping this locator resilient to column changes.
    this.policyRows = page.getByRole('row');
  }

  async goto(): Promise<void> {
    await this.page.goto('/insurance');
  }

  /** Data rows only (excludes the header row, which has no policy-number-shaped cell). */
  private dataRows(): Locator {
    return this.policyRows.filter({ hasText: /^SL-/ });
  }

  async openFirstPolicyRow(): Promise<string> {
    const firstRow = this.dataRows().first();
    const text = await firstRow.innerText();
    const match = text.match(/SL-[A-Z0-9-]+/);
    const policyNo = match ? match[0] : '';
    await firstRow.click();

    console.log(`Opened policy row for policy number: ${policyNo}`);

    return policyNo;
  }

  goToQuoteFlow(): Locator {
    // Entry point for the health quote / premium calculator flow from the dashboard quick links.
    return this.page.getByTestId('link-calculator');
  }
}
