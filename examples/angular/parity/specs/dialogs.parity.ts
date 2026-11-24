import { expect, test } from '@playwright/test';
import { openApp, screenshot } from './helpers';

test('modal dialog opens and closes via Confirm and the close button', async ({
  page,
}, testInfo) => {
  await openApp(page);
  const heading = page.getByRole('heading', { name: 'This is the modal heading.' });
  await expect(heading).toBeHidden();
  await page.getByRole('button', { name: 'Open Dialog' }).click();
  await expect(heading).toBeVisible();
  await expect(
    page.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan')
  ).toBeVisible();
  await screenshot(page, testInfo, 'modal-open');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(heading).toBeHidden();

  await page.getByRole('button', { name: 'Open Dialog' }).click();
  await expect(heading).toBeVisible();
  await page.locator('app-dialog').getByRole('button', { name: 'Close modal dialog' }).click();
  await expect(heading).toBeHidden();
});

test('drawer opens with heading, footer and nested accordion, then closes', async ({
  page,
}, testInfo) => {
  await openApp(page);
  const heading = page.getByRole('heading', { name: 'Drawer Heading' });
  await expect(heading).toBeHidden();
  await page.getByRole('button', { name: 'Click to toggle drawer' }).click();
  await expect(heading).toBeVisible();
  const drawer = page.locator('app-drawer');
  await expect(drawer.getByText('Footer Title')).toBeVisible();
  await expect(drawer.getByText('Footer content')).toBeVisible();
  await expect(drawer.getByRole('button', { name: 'First Item' })).toBeVisible();
  await screenshot(page, testInfo, 'drawer-open');
  await drawer.getByRole('button', { name: /close/i }).first().click();
  await expect(heading).toBeHidden();
});

test('third party external link shows the leaving-site dialog', async ({ page }) => {
  await openApp(page);
  const heading = page.getByRole('heading', { name: 'You are leaving CMS Design System.' });
  await expect(heading).toBeHidden();
  await page
    .getByRole('button', { name: /Link to external site/ })
    .or(page.getByRole('link', { name: /Link to external site/ }))
    .first()
    .click();
  await expect(heading).toBeVisible();
  await expect(page.getByRole('link', { name: 'Continue' })).toHaveAttribute(
    'href',
    'https://www.google.com/'
  );
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(heading).toBeHidden();
});
