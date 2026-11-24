import { defineConfig, devices } from '@playwright/test';

/**
 * Angular upgrade parity suite. The same specs run against the baseline build (port 4000)
 * and the upgraded app (port 4200). See ./report/README.md.
 */
export default defineConfig({
  testDir: './specs',
  outputDir: './test-results',
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: './report/results.json' }]],
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1280, height: 900 },
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'baseline', use: { baseURL: process.env.BASELINE_URL ?? 'http://localhost:4000' } },
    { name: 'upgraded', use: { baseURL: process.env.UPGRADED_URL ?? 'http://localhost:4200' } },
  ],
});
