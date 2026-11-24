import { expect, type Page, type TestInfo } from '@playwright/test';
import path from 'node:path';

export async function openApp(page: Page) {
  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(
    page.getByRole('heading', { level: 1, name: 'Web-component examples' })
  ).toBeVisible();
}

export async function screenshot(page: Page, testInfo: TestInfo, name: string) {
  const file = path.join(
    __dirname,
    '..',
    'report',
    'screens',
    testInfo.project.name,
    `${name}.png`
  );
  const options = { fullPage: true, animations: 'disabled', caret: 'hide' } as const;
  // Wait until two consecutive captures match so CSS transitions (e.g. the drawer slide-in)
  // have settled and both apps are captured in the same state.
  let previous = await page.screenshot(options);
  for (let attempt = 0; attempt < 20; attempt++) {
    await page.waitForTimeout(250);
    const current = await page.screenshot(options);
    if (current.equals(previous)) break;
    previous = current;
  }
  await page.screenshot({ ...options, path: file });
}
