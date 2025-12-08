import { test, expect } from '@playwright/test';

test.describe('Combination Calculator (C(n,k))', () => {
  test('Powerball: C(69,5) × 26 -> 292,201,338', async ({ page }) => {
    await page.goto('/tools/combination-calculator');

    // set inputs: n=69, k=5, m=26
    await page.fill('#totalNumbers', '69');
    await page.fill('#numbersToPick', '5');
    await page.fill('#specialBallCount', '26');

    await page.click('#calculateBtn');

    await expect(page.locator('#combinations')).toHaveText('292,201,338');
    await expect(page.locator('#odds')).toHaveText('1 in 292,201,338');
    await expect(page.locator('#formula')).toContainText('× 26');
  });

  test('Powerball preset auto-fills special-ball and computes', async ({ page }) => {
    await page.goto('/tools/combination-calculator');

    await page.click('button:has-text("Powerball (5/69 + PB 26)")');

    // allow the calculation to run
    await expect(page.locator('#combinations')).toHaveText('292,201,338');
    await expect(page.locator('#formula')).toContainText('× 26');
  });
});
