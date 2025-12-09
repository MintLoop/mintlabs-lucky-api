import { test, expect } from '@playwright/test';

test.describe('Generator form UI', () => {
  test('shows conditional fields for modes including new personalized modes', async ({ page }) => {
    await page.goto('/');

    // Check if the client-side form script initialized; capture any error if present
    // wait for client-side init to attach helpers
    await page.waitForFunction(() => typeof (window as any)._genFormUpdate === 'function', { timeout: 3000 });
    await page.waitForSelector('#modeSelect', { state: 'attached' });
    // choose zodiac (new personalized mode) and verify seed field appears
    await page.selectOption('#modeSelect', 'zodiac');
    // ensure select value changed
    const v = await page.evaluate(() => (document.getElementById('modeSelect') as HTMLSelectElement).value);
    const count = await page.evaluate(() => document.querySelectorAll('#modeSelect').length);
    console.log('DEBUG modeSelect count ->', count);
    console.log('DEBUG mode value after select ->', v);
    // If update isn't firing we can call the global test hook and inspect the element
    const dbg = await page.evaluate(() => {
      const result = (window as any)._genFormUpdate ? (window as any)._genFormUpdate() : null;
      const el = document.getElementById('modeKeySelect');
      return { updateResult: result, el: el ? { cls: el.className, disp: window.getComputedStyle(el).display, opts: Array.from(el.querySelectorAll('option')).map(o=>o.textContent) } : null };
    });
    console.log('DEBUG modeKeySelect after update ->', dbg);
    await expect(page.locator('#modeKeySelect')).toBeVisible();

    // choose gemstone
    await page.selectOption('#modeSelect', 'gemstone');
    await expect(page.locator('#modeKeySelect')).toBeVisible();

    // check sum target field appears
    await page.selectOption('#modeSelect', 'sum_target');
    await expect(page.locator('#sumTargetField')).toBeVisible();

    // check lucky numbers field appears
    await page.selectOption('#modeSelect', 'lucky');
    await expect(page.locator('#luckyField')).toBeVisible();
  });
});
