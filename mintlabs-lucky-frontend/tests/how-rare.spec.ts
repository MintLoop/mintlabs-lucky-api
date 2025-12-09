import { test, expect } from '@playwright/test';

test.describe('How Rare Is This? converter', () => {
  test('loads and converts a preset (powerball)', async ({ page }) => {
    await page.goto('/tools/how-rare-is-this');
    await expect(page.getByRole('heading', { name: 'How Rare Is This?' })).toBeVisible();

    // choose Powerball preset and click convert
    await page.selectOption('#presets', 'powerball');
    // small wait for auto-convert to run
    await page.waitForTimeout(100);

    // check outputs
    await expect(page.locator('#oddsOut')).toContainText('1 in 292,201,338');
    await expect(page.locator('#pctOut')).toContainText('%');
    await expect(page.locator('#comparisons')).toContainText('Powerball jackpot');
  });

  test('converts a custom odds string', async ({ page }) => {
    await page.goto('/tools/how-rare-is-this');
    const oddsIn = '1 in 1000000';
    await page.fill('#oddsInput', oddsIn);
    await page.click('#convertBtn');

    await expect(page.locator('#oddsOut')).toContainText('1 in 1,000,000');
    await expect(page.locator('#perMOut')).toContainText('1 per million');
  });
});
