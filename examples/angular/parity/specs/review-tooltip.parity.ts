import { expect, test } from '@playwright/test';
import { openApp } from './helpers';

test('review list renders one entry per item with edit links', async ({ page }) => {
  await openApp(page);
  const reviews = page.locator('app-review');
  await expect(reviews).toHaveCount(3);
  for (const [heading, edit, body] of [
    ['Review item one', 'Edit if you dare!', 'This is the first review.'],
    ['Review item two', 'Edit if you dare, again!', 'This is the second review.'],
    ['Review item three', 'Triple-dog-dare you to edit me!', 'This is the third review.'],
  ]) {
    const review = reviews.filter({ hasText: heading });
    await expect(review.getByRole('heading', { level: 2, name: heading })).toBeVisible();
    await expect(review.getByRole('link', { name: edit })).toHaveAttribute('href', '#');
    await expect(review).toContainText(body);
  }
});

test('tooltip shows its content when the trigger is clicked', async ({ page }) => {
  await openApp(page);
  const content = page.getByText('Tooltip trigger uses <ds-tooltip-icon> for the trigger content');
  await expect(content).toBeHidden();
  await page.getByRole('button', { name: 'This is the aria label.' }).click();
  await expect(content).toBeVisible();
});

test('icons render with their accessible titles', async ({ page }) => {
  await openApp(page);
  await expect(page.getByRole('img', { name: 'Testing a custom title' })).toBeVisible();
  await expect(page.locator('ds-svg-icon svg[viewBox="0 0 496 512"]')).toBeVisible();
  await expect(page.locator('main svg.ds-c-icon')).not.toHaveCount(0);
});
