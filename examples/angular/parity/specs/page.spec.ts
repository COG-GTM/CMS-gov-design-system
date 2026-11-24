import { expect, test } from '@playwright/test';
import { openApp, screenshot } from './helpers';

test('page renders every example section', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await openApp(page);
  await expect(page).toHaveTitle('CMS Web Components');
  for (const name of [
    'Alert',
    'Accordion',
    'Autocomplete',
    'Month Picker',
    'Spinner',
    'Checkbox',
    'Modal Dialog',
    'Review',
    'Drawer',
    'Icons',
    'Third Party External Link',
    'Tooltip',
  ]) {
    await expect(page.getByRole('heading', { level: 2, name, exact: true })).toBeVisible();
  }
  await expect(page.getByRole('link', { name: /skip to main content/i })).toHaveCount(1);
  await expect(page.getByText('An official website of the United States government')).toBeVisible();
  await expect(
    page.getByRole('status').filter({ hasText: 'aria sets spinner label!' })
  ).toHaveCount(1);
  // Pre-existing on main: the drawer's nested <ds-alert variation="warning"> is not a valid variation.
  const known = ["Translation key 'alert.warning' does not resolve to a string."];
  expect(errors.filter((e) => !known.includes(e))).toEqual([]);
  await screenshot(page, testInfo, 'full-page');
});

test('usa banner expands', async ({ page }) => {
  await openApp(page);
  await page.getByRole('button', { name: "Here's how you know" }).click();
  await expect(page.getByText('Official websites use .gov')).toBeVisible();
});
