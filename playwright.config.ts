import { defineConfig, devices } from '@playwright/test';

// Single baseURL for the whole suite — every page object navigates with relative paths.
// Chromium-only project keeps the demo fast and avoids cross-browser flake noise in an interview setting.
export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'https://www.testerrank.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
