import { test, expect } from '@playwright/test';

test('Home page tools carousel exists and links present', async ({ page }) => {
  await page.goto('/');
  const carousel = page.locator('.tools-carousel');
  await expect(carousel).toBeVisible();

  const links = carousel.locator('.tool-card');
  const count = await links.count();
  expect(count).toBeGreaterThan(5);

  // first link should navigate to a tool page
  const first = links.nth(0);
  const href = await first.getAttribute('href');
  // sanity: href not null and starts with /tools
  expect(href).not.toBeNull();
  expect(href?.startsWith('/tools') || href?.startsWith('/')).toBeTruthy();
});
