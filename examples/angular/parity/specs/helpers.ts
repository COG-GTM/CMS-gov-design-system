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
  await page.screenshot({ path: file, fullPage: true, animations: 'disabled', caret: 'hide' });
}
