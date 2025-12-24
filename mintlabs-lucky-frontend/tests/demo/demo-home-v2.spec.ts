import { test, expect } from '@playwright/test';

// Skipped: demo page `/demo/home-v2-polish` removed/ignored for CI runs.
// The demo contains components that were partially promoted to production; skipping tests prevents CI failures while preserving components.
// Branch: `chore/skip-demo-tests-ci`
test.describe.skip('Lucky v2 demo homepage (skipped: demo removed/ignored)', () => {
  test('sets data-demo on root and demo tokens are present', async ({ page }) => {
    await page.goto('/demo/home-v2-polish');

    // data-demo should be set on the root html element
    const dataDemo = await page.evaluate(() => document.documentElement.getAttribute('data-demo'));
    expect(dataDemo).toBe('true');

    // Ensure demo tokens exist or page is using v2 primitives: at least validate the demo card background exists
    const colorCheck = await page.locator('.demo-card').first().evaluate((el) => getComputedStyle(el).background);
    expect(colorCheck).toBeTruthy();

    // The demo card class should exist and have computed background - ensure v2 primitives load
    const cardBg = await page.locator('.demo-card').first().evaluate((el) => getComputedStyle(el).background);
    expect(cardBg).toBeTruthy();

    // Theme picker is rendered once on the page and should exist
    // The demo uses a compact `ThemeToolBar` containing #themeSelect
    const themeSelect = page.locator('#themeSelect');
    await expect(themeSelect).not.toHaveCount(0);
  });

  test('header includes SearchBar and filters EduGrid', async ({ page }) => {
    await page.goto('/demo/home-v2-polish');

    // Search input in the controls row
    const headerSearch = page.locator('.demo-controls .search-input');
    await expect(headerSearch).toHaveCount(1);

    // Type a query that should filter the edu grid down to analysis-focused guides
    await headerSearch.fill('analysis');
    // Dispatching searchChange directly (ensures the Debounce handler and listener interaction is covered)
    await page.evaluate(() => window.dispatchEvent(new CustomEvent('searchChange', { detail: { query: 'analysis' } })));
    await page.waitForTimeout(200);

    // Filtered cards should still render a matching guide
    const visibleCards = await page.locator('.demo-edu-grid .demo-card:visible').count();
    expect(visibleCards).toBeGreaterThan(0);
    // Ensure an analysis-focused guide remains visible
    await expect(page.locator('.demo-edu-grid h4:has-text("Lottery Odds 101")')).toBeVisible();
  });
});
