import { test, expect } from '@playwright/test';

test('Expected Loss Over X Years - basic calculation', async ({ page }) => {
  await page.goto('/tools/expected-loss-over-years');

  // Set fields for a small scenario: $2, 1 ticket/draw, 2 draws/week, 1 year, odds 1 in 100
  await page.fill('#ticketPrice', '2');
  await page.fill('#ticketsPerDraw', '1');
  await page.fill('#drawsPerWeek', '2');
  await page.fill('#years', '1');
  await page.fill('#odds', '100');
  await page.fill('#jackpotPayout', '100');

  await page.click('#calculate');

  await expect(page.locator('#ticketsBought')).toContainText('104'); // 52 weeks * 2 draws
  await expect(page.locator('#totalCost')).toContainText('$208');
  await expect(page.locator('#expectedWins')).toContainText('1.040000');
  await expect(page.locator('#expectedReturn')).toContainText('$104.00');
  await expect(page.locator('#expectedLoss')).toContainText('$104.00');
});
