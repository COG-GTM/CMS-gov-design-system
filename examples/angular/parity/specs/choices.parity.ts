import { expect, test } from '@playwright/test';
import { openApp } from './helpers';

test('checkbox and radio reveal their checked children', async ({ page }) => {
  await openApp(page);
  const agree = page.getByRole('checkbox', { name: 'I agree to the terms and conditions' });
  await expect(page.getByText("Cool, we hoped you'd check this box.")).toBeHidden();
  await agree.check();
  await expect(page.getByText("Cool, we hoped you'd check this box.")).toBeVisible();
  await agree.uncheck();
  await expect(page.getByText("Cool, we hoped you'd check this box.")).toBeHidden();

  await expect(page.getByText("Tag! You're it!")).toBeHidden();
  const list = page.locator('ds-choice-list[label="Choice list example"]');
  await expect(list.getByRole('radio')).toHaveCount(3);
  await list.getByRole('radio', { name: 'Checked children', exact: true }).check();
  await expect(page.getByText("Tag! You're it!")).toBeVisible();
});

test('month picker select all / clear all respects disabled months', async ({ page }) => {
  await openApp(page);
  const picker = page.locator('ds-month-picker');
  await expect(picker.getByText('Select any months you want!')).toBeVisible();
  const boxes = picker.getByRole('checkbox');
  await expect(boxes).toHaveCount(12);
  await picker.getByRole('button', { name: 'Clear all' }).click();
  await expect(picker.getByRole('checkbox', { checked: true })).toHaveCount(1);
  await picker.getByRole('button', { name: 'Select all' }).click();
  await expect(picker.getByRole('checkbox', { checked: true })).toHaveCount(11);
});
