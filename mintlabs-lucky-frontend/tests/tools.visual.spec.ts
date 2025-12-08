import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/tools/how-rare-is-this', name: 'how-rare-is-this' },
  { path: '/tools/expected-loss-over-years', name: 'expected-loss-over-years' },
  { path: '/tools/annuity-breakdown', name: 'annuity-breakdown' },
  { path: '/tools/probability-playground', name: 'probability-playground' },
  { path: '/tools/ticket-variance', name: 'ticket-variance' },
];

// A small cross-theme visual test for the set of "singular" tools. These
// pages live on their own route (not as cards in the grid) so we add a simple
// visual snapshot for each page for both the light and dark site themes.
const THEMES = ['light', 'dark'];

test.describe('A-tier tool pages — cross-theme visual snapshots', () => {
  for (const pageSpec of PAGES) {
    for (const theme of THEMES) {
      test(`${pageSpec.name} — theme=${theme}`, async ({ page }) => {
        await page.goto(pageSpec.path);
        // set the site-level theme (data-theme) so styles update like a user
        await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);

        // wait for a meaningful piece of content to render
        await page.getByRole('heading').first().waitFor({ state: 'visible' });

        // capture the primary content area (main) as a screenshot for visual regression
        const main = page.locator('main');
        // keep snapshots small and focused to reduce false positives
        const ss = await main.screenshot({ animations: 'disabled' });
        expect(ss).toMatchSnapshot(`${pageSpec.name}-${theme}.png`);
      });
    }
  }
});
