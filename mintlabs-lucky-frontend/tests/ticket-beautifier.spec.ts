import { test, expect } from '@playwright/test';

test.describe('Ticket Beautifier parity', () => {
  test('generated canvas matches preview bounding box * DPR for minimal theme', async ({ page }) => {
    await page.goto('/tools/ticket-beautifier');

    // pick a known game and theme and enter deterministic numbers
    await page.selectOption('#gameSelect', 'powerball');
    await page.selectOption('#ticketThemeSelect', 'minimal');

    // fill numbers
    const numInputs = await page.$$('#numberFields input');
    if (numInputs.length >= 6) {
      await numInputs[0].fill('1');
      await numInputs[1].fill('2');
      await numInputs[2].fill('3');
      await numInputs[3].fill('4');
      await numInputs[4].fill('5');
      await numInputs[5].fill('6');
    }

    await page.click('#generateBtn');

    // wait for preview to appear
    await page.waitForSelector('.ticket-instance');

    // Wait for canvas creation (canvas is created but intentionally hidden)
    await page.waitForSelector('#canvasHolder canvas', { state: 'attached', timeout: 5000 });

    const result = await page.evaluate(() => {
      const preview = document.querySelector('.ticket-instance .ticket-canvas') as HTMLElement | null;
      const canvas = document.querySelector('#canvasHolder canvas:last-child') as HTMLCanvasElement | null;
      if (!preview || !canvas) return null;
      const rect = preview.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      return {
        rect: { w: Math.round(rect.width), h: Math.round(rect.height) },
        canvas: { w: canvas.width, h: canvas.height, styleW: canvas.style.width, styleH: canvas.style.height },
        dpr
      };
    });

    expect(result).not.toBeNull();
    const { rect, canvas, dpr } = result as any;
    expect(canvas.w).toBe(Math.round(rect.w * dpr));
    expect(canvas.h).toBe(Math.round(rect.h * dpr));
  });

  test('generated canvas matches preview bounding box * DPR for neon theme', async ({ page }) => {
    await page.goto('/tools/ticket-beautifier');
    await page.selectOption('#gameSelect', 'powerball');
    await page.selectOption('#ticketThemeSelect', 'neon');

    const numInputs = await page.$$('#numberFields input');
    if (numInputs.length >= 6) {
      await numInputs[0].fill('7');
      await numInputs[1].fill('8');
      await numInputs[2].fill('9');
      await numInputs[3].fill('10');
      await numInputs[4].fill('11');
      await numInputs[5].fill('12');
    }

    await page.click('#generateBtn');
    await page.waitForSelector('.ticket-instance');
    await page.waitForSelector('#canvasHolder canvas', { state: 'attached', timeout: 5000 });

    const result = await page.evaluate(() => {
      const preview = document.querySelector('.ticket-instance .ticket-canvas') as HTMLElement | null;
      const canvas = document.querySelector('#canvasHolder canvas:last-child') as HTMLCanvasElement | null;
      if (!preview || !canvas) return null;
      const rect = preview.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      return {
        rect: { w: Math.round(rect.width), h: Math.round(rect.height) },
        canvas: { w: canvas.width, h: canvas.height },
        dpr
      };
    });

    expect(result).not.toBeNull();
    const { rect, canvas, dpr } = result as any;
    expect(canvas.w).toBe(Math.round(rect.w * dpr));
    expect(canvas.h).toBe(Math.round(rect.h * dpr));
  });
});
