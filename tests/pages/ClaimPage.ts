import { Page, Locator } from '@playwright/test';

export interface ClaimFormData {
  policyNo: string;
  amount: string;
  description: string;
}

/** Claims Filing & Tracking — Intermediate exercise (document upload + status lifecycle). */
export class ClaimPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/insurance/claims');
  }

  async fillClaimForm({ policyNo, amount, description }: ClaimFormData): Promise<void> {
    await this.page.getByLabel(/policy number/i).fill(policyNo);
    await this.page.getByLabel(/amount/i).fill(amount);
    await this.page.getByLabel(/description/i).fill(description);
  }

  async uploadDocument(filePath: string): Promise<void> {
    await this.page.getByLabel(/upload/i).setInputFiles(filePath);
  }

  async submitClaim(): Promise<void> {
    await this.page.getByRole('button', { name: /submit claim/i }).click();
  }

  getClaimNumberLocator(): Locator {
    // Observed format on the dashboard activity feed: CLM-YYYY-NNN.
    return this.page.getByText(/CLM-\d{4}-\d+/);
  }

  async getClaimNumber(): Promise<string> {
    const text = await this.getClaimNumberLocator().first().innerText();
    const match = text.match(/CLM-\d{4}-\d+/);
    return match ? match[0] : '';
  }

  getClaimStatus(): Locator {
    return this.page.getByText(/filed|pending documents|approved|rejected/i);
  }
}
