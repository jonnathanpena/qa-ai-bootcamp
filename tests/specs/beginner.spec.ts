import { test, expect } from '../fixtures/pages';
import { waitForAnyRows } from '../utils/wait-helpers';

test.describe('Beginner exercises', () => {
  test('health insurance quote — happy path @smoke', async ({ page, dashboardPage, quotePage }) => {
    await dashboardPage.goto();
    await dashboardPage.goToQuoteFlow().click();

    // This exercises chained dropdown handling — each selection triggers a dynamic load.
    await quotePage.selectCategory('Health Insurance');
    await quotePage.selectPlan('standard');
    await quotePage.enterDateOfBirth('1990-01-01');
    await quotePage.selectSumInsured('500000');
    await quotePage.selectTerm('1');
    await quotePage.calculatePremium();

    await expect(quotePage.getPremiumAmount()).toBeVisible();
    await expect(quotePage.getPremiumAmount()).toHaveText(/₹\d+/);
  });

  test('policy details page — data integrity', async ({ page, dashboardPage, policyDetailsPage }) => {
    await dashboardPage.goto();
    await waitForAnyRows(dashboardPage.policyRows);

    const policyNo = await dashboardPage.openFirstPolicyRow();

    await expect(policyDetailsPage.getPolicyNumber()).toHaveText(new RegExp(policyNo));
    await expect(policyDetailsPage.getStatusBadge()).toHaveText(/Active|Inactive|Pending/i);
    await expect(policyDetailsPage.getPremiumAmount()).not.toHaveText('');
    await expect(policyDetailsPage.getCoverageAmount()).not.toHaveText('');
  });
});
