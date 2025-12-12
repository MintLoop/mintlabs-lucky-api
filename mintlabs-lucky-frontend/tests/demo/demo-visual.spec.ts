import { test, expect } from '@playwright/test';

const THEMES = [
  'green-dark', 'blue-dark', 'purple-dark', 'amber-dark', 'red-dark', 'teal-dark', 'bw-dark',
  'green-light', 'blue-light', 'purple-light', 'amber-light', 'red-light', 'teal-light', 'bw-light'
];

const SIZES = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 }
];

test.describe('Demo — visual snapshots across themes & sizes', () => {
  for (const theme of THEMES) {
    for (const size of SIZES) {
      test(`demo-home-v2 — theme=${theme} size=${size.name}`, async ({ page }) => {
        await page.setViewportSize({ width: size.width, height: size.height });
        await page.goto('/demo/home-v2-polish');
        await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);

        // wait for main to be visible (page content) and generator wrapper to render
        await page.locator('main').waitFor({ state: 'visible' });
        await page.locator('#demoGenWrap').waitFor({ state: 'visible' });

        // allow the theme change and JS to apply tokenized colors
        await page.waitForTimeout(150);

        const main = page.locator('main');
        const ss = await main.screenshot({ animations: 'disabled' });
        expect(ss).toMatchSnapshot(`demo-home-v2-${theme}-${size.name}.png`);
      });
    }
  }
});

