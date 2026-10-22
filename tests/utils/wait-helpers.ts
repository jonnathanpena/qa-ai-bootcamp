import { Page, Locator, expect } from '@playwright/test';

// Why no hardcoded waits: `page.waitForTimeout()` is a flat guess at how long an async load
// takes — too short and CI flakes intermittently, too long and the whole suite slows down for
// no benefit. Web-first assertions (`expect(locator)....`) instead poll the DOM until the
// real condition is true (or the timeout is hit with a clear failure), so they're both faster
// on average and non-flaky.

/**
 * Waits until a table's row count has stabilized at `expectedCount`, proving any async
 * fetch/render behind the table has finished before the test reads its contents.
 */
export async function waitForTableLoad(
  rows: Locator,
  expectedCount: number,
  timeout = 10_000
): Promise<void> {
  await expect(rows).toHaveCount(expectedCount, { timeout });
}

/** Waits for at least one row to be present, when the exact final count isn't known up front. */
export async function waitForAnyRows(rows: Locator, timeout = 10_000): Promise<void> {
  await expect(rows.first()).toBeVisible({ timeout });
}

export async function waitForUrlChange(page: Page, pattern: RegExp, timeout = 10_000): Promise<void> {
  await page.waitForURL(pattern, { timeout });
}
