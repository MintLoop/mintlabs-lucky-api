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
    
    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('Lucky Profile Generator');
    
    // Check form sections exist
    await expect(page.locator('select#birthMonth')).toBeVisible();
    await expect(page.locator('select#rashi')).toBeVisible();
    await expect(page.locator('#colorGrid')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('form dropdowns are populated with options', async ({ page }) => {
    // Wait for metadata to load and populate dropdowns
    await page.waitForTimeout(1000);
    
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
    await page.waitForTimeout(1000);
    
    await page.selectOption('select#birthMonth', 'March');
    const selectedValue = await page.locator('select#birthMonth').inputValue();
    expect(selectedValue).toBe('March');
  });

  test('can select rashi', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    const rashiOptions = await page.locator('select#rashi option').allTextContents();
    const meshaOption = rashiOptions.find(opt => opt.includes('Mesha'));
    
    if (meshaOption) {
      await page.selectOption('select#rashi', { label: meshaOption });
      const selectedValue = await page.locator('select#rashi').inputValue();
      expect(selectedValue).toBeTruthy();
    }
  });

  test('can select color from grid', async ({ page }) => {
    await page.waitForTimeout(1000);
    
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
    await page.waitForTimeout(1000);
    
    // Fill out form
    await page.selectOption('select#birthMonth', 'March');
    
    // Select rashi - find Mesha option
    const rashiOptions = await page.locator('select#rashi option').all();
    for (const option of rashiOptions) {
      const text = await option.textContent();
      if (text && text.includes('Mesha')) {
        const value = await option.getAttribute('value');
        if (value) {
          await page.selectOption('select#rashi', value);
          break;
        }
      }
    }
    
    // Select color
    const blueColor = page.locator('.color-option').filter({ hasText: 'Blue' }).first();
    await blueColor.click();
    
    // Submit form
    await page.locator('button[type="submit"]').click();
    
    // Wait for loading spinner to appear and disappear
    await expect(page.locator('#loadingSpinner')).toBeVisible();
    await expect(page.locator('#loadingSpinner')).not.toBeVisible({ timeout: 10000 });
    
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
    await page.waitForTimeout(1000);
    
    await page.selectOption('select#birthMonth', 'March');
    
    // Select any rashi
    const rashiSelect = page.locator('select#rashi');
    const rashiOptions = await rashiSelect.locator('option').all();
    if (rashiOptions.length > 1) {
      const value = await rashiOptions[1].getAttribute('value');
      if (value) await page.selectOption('select#rashi', value);
    }
    
    // Select any color
    await page.locator('.color-option').first().click();
    
    // Submit
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#loadingSpinner')).not.toBeVisible({ timeout: 10000 });
    
    // Check that result mentions Aquamarine (March birthstone)
    const profileResult = page.locator('#profileResult');
    await expect(profileResult).toContainText('Aquamarine');
  });

  test('info cards provide educational context', async ({ page }) => {
    const infoCards = page.locator('.info-card');
    const cardCount = await infoCards.count();
    
    expect(cardCount).toBeGreaterThanOrEqual(4);
    
    // Check for key educational sections
    await expect(page.locator('text=What is a Lucky Profile')).toBeVisible();
    await expect(page.locator('text=Birthstones & Gemology')).toBeVisible();
    await expect(page.locator('text=Jyotish')).toBeVisible();
    await expect(page.locator('text=Color Psychology')).toBeVisible();
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
    
    // Main elements should still be visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('select#birthMonth')).toBeVisible();
    await expect(page.locator('select#rashi')).toBeVisible();
    await expect(page.locator('#colorGrid')).toBeVisible();
  });
});
