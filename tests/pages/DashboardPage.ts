import { Page, Locator, expect } from '@playwright/test';

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

  async getPolicyCount(): Promise<number> {
    return this.dataRows().count();
  }

  private rowByPolicyNumber(policyNo: string): Locator {
    return this.policyRows.filter({ hasText: policyNo });
  }

  async getPolicyStatusByNumber(policyNo: string): Promise<string> {
    const row = this.rowByPolicyNumber(policyNo);
    // Status is rendered as a badge/cell with one of a known set of words.
    const statusCell = row.getByText(/Active|Inactive|Pending/i);
    return (await statusCell.first().innerText()).trim();
  }

  async getNextDueDate(policyNo: string): Promise<string> {
    const row = this.rowByPolicyNumber(policyNo);
    // Dates are rendered like "15 May 2026" — match that shape instead of relying on column index.
    const dateCell = row.getByText(/\d{1,2}\s\w+\s\d{4}/);
    return (await dateCell.first().innerText()).trim();
  }

  async expectPolicyStatus(policyNo: string, status: 'Active' | 'Inactive' | 'Pending'): Promise<void> {
    const row = this.rowByPolicyNumber(policyNo);
    await expect(row.getByText(status, { exact: true })).toBeVisible();
  }

  async openPolicy(policyNo: string): Promise<void> {
    await this.rowByPolicyNumber(policyNo).click();
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

  goToClaims(): Locator {
    return this.page.getByRole('link', { name: /File a Claim/i });
  }
}
