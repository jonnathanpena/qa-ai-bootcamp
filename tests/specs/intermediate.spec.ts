import path from 'node:path';
import { test, expect } from '../fixtures/pages';

const SAMPLE_PDF = path.join(__dirname, '..', 'fixtures', 'sample-claim.pdf');

test.describe('Intermediate exercises', () => {
  test('compare two insurance plans', async ({ dashboardPage, quotePage }) => {
    await dashboardPage.goto();
    await dashboardPage.goToQuoteFlow().click();

    await quotePage.selectCategory('Health');
    await quotePage.selectSubcategory('Individual');

    await quotePage.selectPlanForComparison('Standard');
    await quotePage.selectPlanForComparison('Premium');
    await quotePage.openComparison();

    // expect.soft collects every assertion failure in one run instead of stopping at the first,
    // which matters here because a single missing plan shouldn't hide a missing premium too.
    await expect.soft(quotePage.getPlanNameLocator('Standard')).toBeVisible();
    await expect.soft(quotePage.getPlanNameLocator('Premium')).toBeVisible();
    await expect.soft(quotePage.getPremiumAmount().first()).toBeVisible();
    await expect.soft(quotePage.getPremiumAmount().last()).toBeVisible();
  });

  test('claim submission with document upload @smoke', async ({ claimPage }) => {
    await claimPage.goto();

    await claimPage.fillClaimForm({
      policyNo: 'SL-HLT-2024-0291',
      amount: '15000',
      description: 'Hospitalization claim for routine surgery.',
    });
    await claimPage.uploadDocument(SAMPLE_PDF);
    await claimPage.submitClaim();

    // Claim number format observed on dashboard: CLM-YYYY-NNNN.
    await expect(claimPage.getClaimNumberLocator()).toHaveText(/CLM-\d{4}-\d+/);
    await expect(claimPage.getClaimStatus()).toBeVisible();
  });
});
