import { expect, test } from '@playwright/test';
import { openApp, screenshot } from './helpers';

test('wrapped alert updates when the wrapped button is clicked', async ({ page }, testInfo) => {
  await openApp(page);
  const alert = page.locator('app-alert');
  await expect(alert).toContainText('Wrapped Alert');
  await expect(alert).toContainText('This alert is wrapped!');
  const button = alert.getByRole('button', { name: "I'm only gonna tell you once." });
  await expect(button).toBeEnabled();
  await button.click();
  await expect(alert).toContainText('Whoa clicked');
  await expect(alert.getByRole('button', { name: "You've been warned." })).toBeVisible();
  await expect(alert.locator('.ds-c-alert')).toHaveClass(/ds-c-alert--warn/);
  await screenshot(page, testInfo, 'alert-after-click');
});
