import { expect, test } from '@playwright/test';

test('renders desktop and mobile invitation screenshots', async ({ page }, testInfo) => {
  await page.goto('/?guest=0JTQsNC90LjQuyDQuCDQkNC70LjQvdCw');
  await expect(page.getByRole('heading', { level: 1, name: /Данил и Алина/u })).toBeVisible();
  await page.getByRole('button', { name: 'Открыть навигацию' }).click();
  await expect(page.getByRole('link', { name: 'Дресс-код' })).toBeVisible();

  const screenshot = await page.screenshot({ fullPage: true, animations: 'disabled' });

  await testInfo.attach('invitation-full-page', {
    body: screenshot,
    contentType: 'image/png'
  });
  expect(screenshot.byteLength).toBeGreaterThan(40_000);
});
