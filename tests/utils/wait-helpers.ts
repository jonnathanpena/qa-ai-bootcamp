import { Locator, expect } from '@playwright/test';

// Why no hardcoded waits: `page.waitForTimeout()` is a flat guess at how long an async load
// takes — too short and CI flakes intermittently, too long and the whole suite slows down for
// no benefit. Web-first assertions (`expect(locator)....`) instead poll the DOM until the
// real condition is true (or the timeout is hit with a clear failure), so they're both faster
// on average and non-flaky.

/** Waits for at least one row to be present, when the exact final count isn't known up front. */
export async function waitForAnyRows(rows: Locator, timeout = 10_000): Promise<void> {
  await expect(rows.first()).toBeVisible({ timeout });
}
