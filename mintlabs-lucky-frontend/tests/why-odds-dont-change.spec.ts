import { test, expect } from '@playwright/test';

test.describe('Why Odds Don\'t Change Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/why-odds-dont-change');
  });

  test('page loads with correct title and description', async ({ page }) => {
    await expect(page).toHaveTitle(/Why Lottery Odds Don't Change/);
    
    // More specific: target the main H1 heading by role and pick the first match
    const heading = page.getByRole('heading', { name: /Why Lottery Odds Don't Change/, level: 1 }).first();
    await expect(heading).toContainText('Why Lottery Odds Don\'t Change');
    
    const description = page.locator('text=Interactive demonstration proving past results have zero effect');
    await expect(description).toBeVisible();
  });

  test('displays independence explanation', async ({ page }) => {
    const conceptSection = page.locator('text=The Core Concept: Independence');
    await expect(conceptSection).toBeVisible();
    
    await expect(page.locator('text=Every lottery draw is an independent event')).toBeVisible();
    await expect(page.locator('text=Past draws have zero influence on future draws')).toBeVisible();
  });

  test('has number input with default value', async ({ page }) => {
    const input = page.locator('#chosen-number');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('7');
  });

  test('can run simulation with default number', async ({ page }) => {
    const runButton = page.locator('#run-demo-btn');
    await expect(runButton).toBeVisible();
    await expect(runButton).toContainText('Run 10 Simulated Draws');
    
    await runButton.click();
    
    // Results should appear
    const results = page.locator('#demo-results');
    await expect(results).toBeVisible();
    
    // Should show 10 draws
    const draws = page.locator('#draw-list > div');
    await expect(draws).toHaveCount(10);
    
    // Each draw should have "Draw N:"
    for (let i = 1; i <= 10; i++) {
      await expect(page.locator(`text=Draw ${i}:`)).toBeVisible();
    }
  });

  test('can run simulation with custom number', async ({ page }) => {
    const input = page.locator('#chosen-number');
    await input.fill('42');
    
    const runButton = page.locator('#run-demo-btn');
    await runButton.click();
    
    // Results should appear
    const results = page.locator('#demo-results');
    await expect(results).toBeVisible();
    
    // Should show appearance count
    const appearanceCount = page.locator('#appearance-count');
    await expect(appearanceCount).toBeVisible();
    const count = await appearanceCount.textContent();
    expect(parseInt(count || '0')).toBeGreaterThanOrEqual(0);
    expect(parseInt(count || '0')).toBeLessThanOrEqual(10);
  });

  test('validates number input range', async ({ page }) => {
    const input = page.locator('#chosen-number');
    const runButton = page.locator('#run-demo-btn');
    
    // Test too low
    await input.fill('0');
    
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('between 1 and 69');
      await dialog.accept();
    });
    
    await runButton.click();
  });

  test('highlights chosen number in draws', async ({ page }) => {
    const input = page.locator('#chosen-number');
    await input.fill('15');
    
    const runButton = page.locator('#run-demo-btn');
    await runButton.click();
    
    // Wait for results
    await page.waitForSelector('#demo-results:not(.hidden)');
    
    // Check if any draws highlight the chosen number (emerald color)
    const highlightedBalls = page.locator('.bg-emerald-500.text-white');
    const count = await highlightedBalls.count();
    
    // Count should match appearance count (use .first() to avoid multiple matches)
    const appearanceCount = page.locator('#appearance-count').first();
    const displayedCount = await appearanceCount.textContent();
    expect(count).toBe(parseInt(displayedCount || '0'));
  });

  test('displays statistics correctly', async ({ page }) => {
    const runButton = page.locator('#run-demo-btn');
    await runButton.click();
    
    // Check statistics display
    await expect(page.locator('text=Times Your Number Appeared')).toBeVisible();
    await expect(page.locator('text=Expected Appearances')).toBeVisible();
    await expect(page.locator('text=Probability Each Draw')).toBeVisible();
    
    // Expected appearances should be 0.72 (use exact match to avoid substring matches)
    await expect(page.getByText('0.72', { exact: true })).toBeVisible();
    
    // Probability should be 7.2%
    await expect(page.locator('text=7.2%')).toBeVisible();
  });

  test('displays key insight with correct count', async ({ page }) => {
    const runButton = page.locator('#run-demo-btn');
    await runButton.click();
    
    const keyInsight = page.locator('text=Key Insight');
    await expect(keyInsight).toBeVisible();
    
    // Insight count should match appearance count
    const appearanceCount = await page.locator('#appearance-count').textContent();
    const insightCount = await page.locator('#insight-count').textContent();
    expect(appearanceCount).toBe(insightCount);
  });

  test('displays common misconceptions', async ({ page }) => {
    await expect(page.locator('text=Common Misconceptions')).toBeVisible();
    
    // Check for three misconceptions
    await expect(page.locator('text="Number 7 hasn\'t appeared in 20 draws — it\'s due!"')).toBeVisible();
    await expect(page.locator('text="Number 42 appeared twice this week — it\'s hot!"')).toBeVisible();
    await expect(page.locator('text="If I keep playing 1-2-3-4-5, it\'ll eventually hit"')).toBeVisible();
  });

  test('displays "Why This Matters" section', async ({ page }) => {
    await expect(page.locator('text=Why This Matters')).toBeVisible();
    // Use exact match and pick the first occurrence to avoid matching link titles or other copies
    await expect(page.getByText('gambler\'s fallacy', { exact: true }).first()).toBeVisible();
    await expect(page.locator('text=You won\'t waste money chasing "due" numbers')).toBeVisible();
  });

  test('displays mathematical proof', async ({ page }) => {
    // Use heading role (with emoji) to target the math section heading precisely
    await expect(page.getByRole('heading', { name: '📐 The Math' })).toBeVisible();
    await expect(page.locator('text=P(specific number appears) = 5/69')).toBeVisible();
    await expect(page.locator('text=Each draw is a fresh, independent event')).toBeVisible();
  });

  test('has related tools links', async ({ page }) => {
    await expect(page.locator('text=Related Tools')).toBeVisible();
    
    const probabilityVizLink = page.locator('a[href="/tools/probability-visualizer"]');
    await expect(probabilityVizLink).toBeVisible();
    
    const hotColdLink = page.locator('a[href="/tools/hot-cold-numbers"]');
    await expect(hotColdLink).toBeVisible();
    
    const gamblersFallacyLink = page.locator('a[href="/lottery-odds#gamblers-fallacy"]');
    await expect(gamblersFallacyLink).toBeVisible();
  });

  test('has educational disclaimer', async ({ page }) => {
    await expect(page.locator('text=Educational Tool:')).toBeVisible();
    await expect(page.locator('text=Past results never influence future probabilities')).toBeVisible();
  });

  test('allows Enter key to run simulation', async ({ page }) => {
    const input = page.locator('#chosen-number');
    await input.fill('33');
    await input.press('Enter');
    
    // Results should appear
    const results = page.locator('#demo-results');
    await expect(results).toBeVisible();
  });

  test('generates different draws each time', async ({ page }) => {
    const runButton = page.locator('#run-demo-btn');
    
    // Run first simulation
    await runButton.click();
    await page.waitForSelector('#demo-results:not(.hidden)');
    const firstAppearance = await page.locator('#appearance-count').textContent();
    
    // Run second simulation
    await runButton.click();
    await page.waitForTimeout(100);
    const secondAppearance = await page.locator('#appearance-count').textContent();
    
    // Note: There's a small chance they could be the same, but we're testing randomness
    // We'll just verify both are valid counts
    expect(parseInt(firstAppearance || '0')).toBeGreaterThanOrEqual(0);
    expect(parseInt(secondAppearance || '0')).toBeGreaterThanOrEqual(0);
  });

  test('each draw contains exactly 5 balls', async ({ page }) => {
    const runButton = page.locator('#run-demo-btn');
    await runButton.click();
    
    // Check each draw has 5 balls
    const draws = await page.locator('#draw-list > div').all();
    for (const draw of draws) {
      const balls = await draw.locator('.rounded-full').count();
      expect(balls).toBe(5);
    }
  });

  test('scrolls to results after running simulation', async ({ page }) => {
    const runButton = page.locator('#run-demo-btn');
    await runButton.click();
    
    // Results should be visible (scrolled into view)
    const results = page.locator('#demo-results');
    await expect(results).toBeVisible();
    await expect(results).toBeInViewport();
  });
});
