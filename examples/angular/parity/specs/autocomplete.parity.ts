import { expect, test } from '@playwright/test';
import { openApp, screenshot } from './helpers';

test('autocomplete filters grouped items and selects one', async ({ page }, testInfo) => {
  await openApp(page);
  const input = page.getByRole('combobox', { name: 'Select a state.' });
  await expect(page.getByText('Type a letter to see results')).toBeVisible();
  await input.fill('al');
  const listbox = page.getByRole('listbox');
  await expect(listbox).toBeVisible();
  await expect(page.getByRole('option', { name: 'Alabama' })).toBeVisible();
  await expect(page.getByRole('option', { name: 'Alaska' })).toBeVisible();
  await screenshot(page, testInfo, 'autocomplete-open');
  await page.getByRole('option', { name: 'Alaska' }).click();
  await expect(input).toHaveValue('Alaska');
  await expect(page.getByRole('option', { name: 'Alabama' })).toBeHidden();
});
