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

  private categoryDropdown(): Locator {
    return this.page.getByTestId('calc-policy-type');
  }

  private planDropdown(): Locator {
    return this.page.getByTestId('calc-plan');
  }

  private dateOfBirthField(): Locator {
    return this.page.getByTestId('calc-dob');
  }

  private sumInsuredDropdown(): Locator {
    return this.page.getByTestId('sum-insured');
  }

  private termDropdown(): Locator {
    return this.page.getByTestId('coverage-term');
  }

  private calculateButton(): Locator {
    return this.page.getByRole('button', { name: /Calculate Premium/i });
  }

  async selectTerm(value: string): Promise<void> {
    await this.termDropdown().selectOption({ value });
  }

  async enterDateOfBirth(dob: string): Promise<void> {
    await this.dateOfBirthField().fill(dob);
  }

  async selectCategory(name: string): Promise<void> {
    await this.categoryDropdown().selectOption({ label: name });
  }

  async selectSumInsured(value: string): Promise<void> {
    await this.sumInsuredDropdown().selectOption({ value });
  }

  async selectPlan(value: string): Promise<void> {
    await this.planDropdown().selectOption({ value });
  }

  async calculatePremium(): Promise<void> {
    await this.calculateButton().click();
  }

  getPremiumAmount(): Locator {
    return this.page.getByTestId('result-monthly');
  }
}
