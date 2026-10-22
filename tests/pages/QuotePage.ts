import { Page, Locator } from '@playwright/test';

/**
 * Premium Calculator / Quote flow — "Explore Plans" cascading dropdowns
 * (Intermediate exercise: Category → Subcategory → Plan, each loads the next dynamically).
 */
export class QuotePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/insurance/calculator');
  }

  private categoryDropdown(): Locator {
    return this.page.getByRole('combobox', { name: /insurance category/i });
  }

  private subcategoryDropdown(): Locator {
    return this.page.getByRole('combobox', { name: /subcategory/i });
  }

  private planDropdown(): Locator {
    return this.page.getByRole('combobox', { name: /plan/i });
  }

  async selectCategory(name: string): Promise<void> {
    await this.categoryDropdown().click();
    await this.page.getByRole('option', { name }).click();
  }

  async selectSubcategory(name: string): Promise<void> {
    // Waiting for the option itself (web-first assertion via locator visibility) proves the
    // dynamic load from the previous selection has completed — no arbitrary timeout needed.
    await this.subcategoryDropdown().click();
    await this.page.getByRole('option', { name }).waitFor({ state: 'visible' });
    await this.page.getByRole('option', { name }).click();
  }

  async selectPlan(name: string): Promise<void> {
    await this.planDropdown().click();
    await this.page.getByRole('option', { name }).waitFor({ state: 'visible' });
    await this.page.getByRole('option', { name }).click();
  }

  async viewPlanDetails(): Promise<void> {
    await this.page.getByRole('button', { name: /view plan details/i }).click();
  }

  getPremiumAmount(): Locator {
    return this.page.getByText(/₹\d+/);
  }

  getPlanNameLocator(name: string): Locator {
    return this.page.getByText(name, { exact: false });
  }

  async selectPlanForComparison(name: string): Promise<void> {
    // Comparison entry point: checkbox/button next to each plan, resolved by accessible name.
    await this.page.getByRole('checkbox', { name }).check();
  }

  async openComparison(): Promise<void> {
    await this.page.getByRole('button', { name: /compare/i }).click();
  }
}
