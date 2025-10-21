import { test, expect } from '@playwright/test';

const mockGames = [
  {
    code: 'powerball',
    name: 'Powerball',
    white_min: 1,
    white_max: 69,
    white_count: 5,
    bonus_min: 1,
    bonus_max: 26,
    bonus_count: 1,
  },
];

const mockGenerateResponse = {
  game: 'powerball',
  mode: 'random',
  numbers: [1, 12, 34, 45, 56],
  bonus: 7,
  commitment: 'mock',
  request_id: 'test',
  latency_ms: 10,
  odds: '1 in 292,201,338',
  probability_percent: 0.00000034,
  total_sets: 1,
  results: [],
};

test.describe('Lucky Number Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/games', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockGames),
      });
    });
    await page.route('**/generate', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockGenerateResponse),
      });
    });
  });

  test('loads home page shell', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'MintLabs Lucky Numbers' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Generate Numbers' })).toBeVisible();
  });

  test('submits form and shows result cards', async ({ page }) => {
    await page.goto('/');
    await Promise.all([
      page.waitForResponse('**/generate'),
      page.getByRole('button', { name: 'Generate Numbers' }).click(),
    ]);
    await expect(page.locator('#results .result-card').first()).toBeVisible();
    await expect(page.locator('#results .result-card').first()).toContainText('Bonus');
  });
});
