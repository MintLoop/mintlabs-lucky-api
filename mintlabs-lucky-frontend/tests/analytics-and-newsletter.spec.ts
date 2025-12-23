import { test, expect } from '@playwright/test';

test.describe('Analytics and Newsletter (client-side)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // ensure events buffer is reset
    await page.evaluate(() => ((window as any).__LUCKY_EVENTS = []));
  });

  // Skipped: Homepage redesigned to use HomeAccordions instead of tools-carousel
  test.skip('carousel click pushes carousel_click event', async ({ page }) => {
    // prevent navigation from link clicks while we measure events
    await page.evaluate(() => {
      function preventNav(e: Event) {
        const t = e.target as HTMLElement|null;
        const el = t && t.closest && t.closest('.tools-carousel .tool-card');
        if (el) { e.preventDefault(); }
      }
      document.addEventListener('click', preventNav, { capture: true });
    });

    await page.click('.tools-carousel .tool-card', { force: true });

    const events = await page.evaluate(() => (window as any).__LUCKY_EVENTS || []);
    expect(events.length).toBeGreaterThan(0);
    const last = events[events.length - 1];
    expect(last.event).toBe('carousel_click');
    expect(last.props).toHaveProperty('tool');
  });

  test('clicking EduGrid tool card emits tool_card_click', async ({ page }) => {
    // find a tool card in the EduGrid and click its TrackLink
    await page.waitForSelector('#edu');
    await page.evaluate(() => { (window as any).__LUCKY_EVENTS = []; });

    // prevent navigation
    await page.evaluate(() => {
      function preventNav(e: Event) {
        const t = e.target as HTMLElement|null;
        const el = t && t.closest && t.closest('#edu a');
        if (el) { e.preventDefault(); }
      }
      document.addEventListener('click', preventNav, { capture: true });
    });

    const card = await page.locator('#edu a[href="/tools/combination-calculator"]').first();
    await card.click({ force: true });

    const events = await page.evaluate(() => (window as any).__LUCKY_EVENTS || []);
    expect(events.length).toBeGreaterThan(0);
    const last = events[events.length - 1];
    expect(last.event).toBe('tool_card_click');
    expect(last.props).toHaveProperty('tool');
  });

  test('newsletter modal queues email and tracks events', async ({ page }) => {
    await page.evaluate(() => ((window as any).__LUCKY_EVENTS = []));

    await page.click('#openNewsletter', { force: true });
    // wait for modal and events
    await page.waitForSelector('#newsletterModal', { state: 'visible' });

    let events = await page.evaluate(() => (window as any).__LUCKY_EVENTS || []);
    expect(events.some((e:any) => e.event === 'newsletter_open')).toBeTruthy();

    await page.fill('#newsletterEmail', 'test@example.com');
    await page.check('#newsletterConsent');
    await page.click('#newsletterSubmit');

    // wait for queued message and closure
    await page.waitForTimeout(500);

    // confirm queued in localStorage
    const queue = await page.evaluate(() => localStorage.getItem('newsletter_queue_v1'));
    expect(queue).not.toBeNull();
    expect(queue).toContain('test@example.com');

    events = await page.evaluate(() => (window as any).__LUCKY_EVENTS || []);
    expect(events.some((e:any) => e.event === 'newsletter_queued' || e.event === 'newsletter_submitted')).toBeTruthy();
  });
});
