import { test, expect } from '@playwright/test';

test('Probability Playground basic scenario', async ({ page }) => {
  await page.goto('/tools/probability-playground');

  // small odds for easy verification
  await page.fill('#odds', '100');
  await page.fill('#tickets', '1');
  await page.fill('#draws', '1');
  await page.fill('#years', '1');

  await page.click('#run');

  // trials = 1*1*52 = 52
  await expect(page.locator('#trials')).toContainText('52');
  await expect(page.locator('#prob')).toContainText('%');
  await expect(page.locator('#exp')).toContainText('0.520000');
});
