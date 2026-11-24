import { expect, test } from '@playwright/test';
import { openApp } from './helpers';

test('accordion items toggle and the nested choice list drives the alert', async ({ page }) => {
  await openApp(page);
  const accordion = page.locator('main > app-accordion');
  const first = accordion.getByRole('button', { name: 'The First Amendment' });
  const third = accordion.getByRole('button', { name: 'The Third Amendment' });
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await expect(third).toHaveAttribute('aria-expanded', 'false');
  await expect(accordion.getByText('The Third Amendment prevents government')).toBeHidden();
  await third.click();
  await expect(third).toHaveAttribute('aria-expanded', 'true');
  await expect(accordion.getByText('The Third Amendment prevents government')).toBeVisible();

  const messages: string[] = [];
  page.on('dialog', (d) => {
    messages.push(d.message());
    void d.accept();
  });
  const tell = accordion.getByRole('button', {
    name: 'Tell us what you though about this content.',
  });
  await tell.click();
  await expect.poll(() => messages.at(-1)).toBe('Glad you liked this!');
  await accordion.getByRole('radio', { name: 'No' }).check();
  await tell.click();
  await expect.poll(() => messages.at(-1)).toBe('Sorry you did not like this content.');
  await first.click();
  await expect(first).toHaveAttribute('aria-expanded', 'false');
});
