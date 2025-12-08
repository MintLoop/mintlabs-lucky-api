import { test, expect } from '@playwright/test';

test('Annuity breakdown basic scenario', async ({ page }) => {
  await page.goto('/tools/annuity-breakdown');

  await page.fill('#jackpot', '1000000');
  await page.fill('#years', '10');
  await page.fill('#upfrontPct', '50');
  await page.fill('#taxRate', '20');
  await page.fill('#discountRate', '5');

  await page.click('#compute');

  // quick checks
  await expect(page.locator('#summary')).toContainText('Upfront cash');
  await expect(page.locator('#schedule')).toContainText('1');
  await expect(page.locator('#schedule')).toContainText('10');
});
