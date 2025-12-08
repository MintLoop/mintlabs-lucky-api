import { test, expect } from '@playwright/test';

test.describe('Ticket Variance Calculator', () => {
  test('loads and computes basic demo scenario', async ({ page }) => {
    await page.goto('/tools/ticket-variance');
    await expect(page.getByRole('heading', { name: 'Ticket Variance Calculator' })).toBeVisible();

    // pick demo odds and run
    await page.selectOption('#preset', 'demo');
    // ensure fields populated
    await expect(page.locator('#odds')).toHaveValue('1000');

    await page.fill('#ticketsPerDraw', '3');
    await page.fill('#draws', '10');
    await page.fill('#trials', '500');
    await page.click('#compute');

    // results: theoretical mean and simulated mean should appear
    await expect(page.locator('#mean')).not.toHaveText('—');
    await expect(page.locator('#simMean')).not.toHaveText('—');

    // ensure histogram rendered (at least one bar)
    const bars = await page.locator('#histogram .bar').count();
    expect(bars).toBeGreaterThan(0);
  });
});
