/**
 * E2E tests for Lucky Profile Generator (Birthstone × Rashi × Color Wheel)
 */
import { test, expect } from '@playwright/test';

test.describe('Lucky Profile Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/lucky-profile');
  });

  test('page loads with correct title and elements', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Lucky Profile Generator/i);
    
    // Check main heading (explicit role + level to avoid duplicates)
    const heading = page.getByRole('heading', { level: 1, name: /Lucky Profile Generator/i });
    await expect(heading).toBeVisible();
    
    // Check form sections exist
    await expect(page.locator('select#birthMonth')).toBeVisible();
    await expect(page.locator('select#rashi')).toBeVisible();
    await expect(page.locator('#colorGrid')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('form dropdowns are populated with options', async ({ page }) => {
    // Wait for metadata to load and populate dropdowns (wait until at least 2 options are present)
    await page.waitForFunction(() => document.querySelectorAll('select#birthMonth option').length > 1);
    await page.waitForFunction(() => document.querySelectorAll('select#rashi option').length > 1);
    await page.waitForSelector('.color-option');
    
    // Check birth month dropdown has options
    const monthOptions = page.locator('select#birthMonth option');
    const monthCount = await monthOptions.count();
    expect(monthCount).toBeGreaterThan(1); // Should have placeholder + 12 months
    
    // Check rashi dropdown has options
    const rashiOptions = page.locator('select#rashi option');
    const rashiCount = await rashiOptions.count();
    expect(rashiCount).toBeGreaterThan(1); // Should have placeholder + 12 rashis
    
    // Check color grid has color options
    const colorOptions = page.locator('.color-option');
    const colorCount = await colorOptions.count();
    expect(colorCount).toBeGreaterThan(0); // Should have multiple colors
  });

  test('can select birth month', async ({ page }) => {
    await page.waitForFunction(() => document.querySelectorAll('select#birthMonth option').length > 1);
    
    await page.selectOption('select#birthMonth', { label: 'March' });
    const selectedValue = await page.locator('select#birthMonth').inputValue();
    expect(selectedValue).toBe('March');
  });

  test('can select rashi', async ({ page }) => {
    await page.waitForFunction(() => document.querySelectorAll('select#rashi option').length > 1);
    
    const rashiOptions = await page.locator('select#rashi option').allTextContents();
    const meshaOption = rashiOptions.find(opt => /Mesha/i.test(opt));
    
    if (meshaOption) {
      await page.selectOption('select#rashi', { label: meshaOption });
      const selectedValue = await page.locator('select#rashi').inputValue();
      expect(selectedValue).toBeTruthy();
    } else {
      test.skip();
    }
  });

  test('can select color from grid', async ({ page }) => {
    // Wait for color options to render
    await page.waitForSelector('.color-option');
    
    // Click first color option
    const firstColor = page.locator('.color-option').first();
    await firstColor.click();
    
    // Check that color is marked as selected
    await expect(firstColor).toHaveClass(/selected/);
    
    // Check that hidden input has value
    const hiddenInput = page.locator('input#selectedColor');
    const value = await hiddenInput.inputValue();
    expect(value).toBeTruthy();
  });

  test('spiritual filters can be toggled', async ({ page }) => {
    const numerologyCheckbox = page.locator('input[name="numerology"]');
    const hinduCheckbox = page.locator('input[name="hindu"]');
    const kabbalaCheckbox = page.locator('input[name="kabbalah"]');
    
    // Numerology and Hindu should be checked by default
    await expect(numerologyCheckbox).toBeChecked();
    await expect(hinduCheckbox).toBeChecked();
    await expect(kabbalaCheckbox).not.toBeChecked();
    
    // Toggle Kabbalah on
    await kabbalaCheckbox.check();
    await expect(kabbalaCheckbox).toBeChecked();
    
    // Toggle numerology off
    await numerologyCheckbox.uncheck();
    await expect(numerologyCheckbox).not.toBeChecked();
  });

  test('form validation requires all fields', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    // Try to submit without filling fields
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Form should not submit (browser validation)
    // Profile result should not be visible
    const profileResult = page.locator('#profileResult');
    await expect(profileResult).not.toBeVisible();
  });

  test('successful profile generation displays result', async ({ page }) => {
    // Wait for selects and colors to be ready
    await page.waitForFunction(() => document.querySelectorAll('select#birthMonth option').length > 1);
    await page.waitForFunction(() => document.querySelectorAll('select#rashi option').length > 1);
    await page.waitForSelector('.color-option');
    
    // Fill out form
    await page.selectOption('select#birthMonth', { label: 'March' });
    
    // Select rashi - prefer selecting by label 'Mesha' if present
    const rashiOptions = await page.locator('select#rashi option').allTextContents();
    const meshaLabel = rashiOptions.find(t => /Mesha/i.test(t));
    if (meshaLabel) {
      await page.selectOption('select#rashi', { label: meshaLabel });
    } else {
      // fallback to first non-placeholder option
      const firstVal = await page.locator('select#rashi option').nth(1).getAttribute('value');
      if (firstVal) await page.selectOption('select#rashi', firstVal);
    }
    
    // Select color (first available)
    await page.locator('.color-option').first().click();
    
    // Submit form
    await page.locator('button[type="submit"]').click();
    
    // Wait for loading spinner to appear (if used) and then disappear (graceful timeout)
    const spinner = page.locator('#loadingSpinner');
    if (await spinner.count() > 0) {
      await expect(spinner).toBeVisible();
      await expect(spinner).not.toBeVisible({ timeout: 10000 });
    }
    
    // Profile result should be visible
    const profileResult = page.locator('#profileResult');
    await expect(profileResult).toBeVisible();
    
    // Check that result contains expected sections
    await expect(profileResult).toContainText('Lucky Focus');
    await expect(profileResult).toContainText('Birthstone Profile');
    await expect(profileResult).toContainText('Rashi Profile');
    await expect(profileResult).toContainText('Color Profile');
    await expect(profileResult).toContainText('Recommended Actions');
    await expect(profileResult).toContainText('Lucky Numbers');
  });

  test('result displays correct birthstone for March', async ({ page }) => {
    await page.waitForFunction(() => document.querySelectorAll('select#birthMonth option').length > 1);
    await page.waitForSelector('.color-option');
    
    await page.selectOption('select#birthMonth', { label: 'March' });
    
    // Select any rashi (fallback to first non-placeholder)
    const rashiOptions = await page.locator('select#rashi option').all();
    if (rashiOptions.length > 1) {
      const value = await rashiOptions[1].getAttribute('value');
      if (value) await page.selectOption('select#rashi', value);
    }
    
    // Select any color
    await page.locator('.color-option').first().click();
    
    // Submit
    await page.locator('button[type="submit"]').click();
    const spinner = page.locator('#loadingSpinner');
    if (await spinner.count() > 0) {
      await expect(spinner).not.toBeVisible({ timeout: 10000 });
    }
    
    // Check that result mentions Aquamarine (March birthstone)
    const profileResult = page.locator('#profileResult');
    await expect(profileResult).toContainText('Aquamarine');
  });

  test('info cards provide educational context', async ({ page }) => {
    const infoCards = page.locator('.info-card');
    const cardCount = await infoCards.count();
    
    expect(cardCount).toBeGreaterThanOrEqual(4);
    
    // Check for key educational headings (use role-based headings to avoid duplicate text matches)
    await expect(page.getByRole('heading', { name: /What is a Lucky Profile/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Birthstones & Gemology/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Jyotish/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Color Psychology/i })).toBeVisible();
  });

  test('affiliate section is present', async ({ page }) => {
    await expect(page.locator('.affiliate-section')).toBeVisible();
    await expect(page.locator('text=Explore Deeper')).toBeVisible();
    
    // Should have affiliate cards
    const affiliateCards = page.locator('.affiliate-card');
    const cardCount = await affiliateCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('responsive design works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Main elements should still be visible (explicit heading role)
    await expect(page.getByRole('heading', { level: 1, name: /Lucky Profile Generator/i })).toBeVisible();
    await expect(page.locator('select#birthMonth')).toBeVisible();
    await expect(page.locator('select#rashi')).toBeVisible();
    await expect(page.locator('#colorGrid')).toBeVisible();
  });
});
