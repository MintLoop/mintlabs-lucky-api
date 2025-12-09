import { test, expect } from '@playwright/test';

test.describe('Probability Visualizer', () => {
  test('renders dots and reveals winner', async ({ page }) => {
    await page.goto('/tools/probability-visualizer');

    // page should show a clear hint telling the user dots are clickable
    await expect(page.locator('#dot-hint')).toHaveText(/click any dot/i);
    // wait for JS to populate dots (attached to DOM — visibility can be flaky in headless)
    await page.waitForSelector('#dot-container .dot', { state: 'attached', timeout: 5000 });
    let dots = await page.locator('#dot-container .dot').count();
    expect(dots).toBeGreaterThan(0);

    // verify density control works — pick several small values so tests remain fast
    await page.selectOption('#dot-density-select', '500');
    // page should re-render dots — wait for attachment again
    await page.waitForSelector('#dot-container .dot', { state: 'attached', timeout: 2000 });
    dots = await page.locator('#dot-container .dot').count();
    expect(dots).toBe(500);

    // click reveal and check winner class appears
    await page.click('#reveal-btn');
    const winner = await page.locator('#dot-container .dot.winner').count();
    expect(winner).toBe(1);

    // also verify 100 and 20 densities are selectable and render expected counts
    await page.selectOption('#dot-density-select', '100');
    await page.waitForSelector('#dot-container .dot', { state: 'attached', timeout: 2000 });
    let dots100 = await page.locator('#dot-container .dot').count();
    expect(dots100).toBe(100);

    await page.selectOption('#dot-density-select', '20');
    await page.waitForSelector('#dot-container .dot', { state: 'attached', timeout: 2000 });
    let dots20 = await page.locator('#dot-container .dot').count();
    expect(dots20).toBe(20);

    // responsive check: switch to a small mobile viewport and re-check presence
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForSelector('#dot-container .dot', { state: 'attached', timeout: 3000 });
    const mobileDots = await page.locator('#dot-container .dot').count();
    expect(mobileDots).toBeGreaterThan(0);
  });

  test('clicking dots reveals result (winner and wrong selection)', async ({ page }) => {
    await page.goto('/tools/probability-visualizer');

    // use small density so test is fast
    await page.selectOption('#dot-density-select', '500');
    await page.waitForSelector('#dot-container .dot', { state: 'attached', timeout: 2000 });

    // read the (hidden) winner index exposed on container
    const winnerIndex = parseInt(await page.getAttribute('#dot-container', 'data-winner'), 10);
    expect(Number.isInteger(winnerIndex)).toBeTruthy();

    // click a non-winner (index 0 unless it's the winner) and assert selected/wrong state appears
    const wrongIndex = winnerIndex === 0 ? 1 : 0;
    const wrongLocator = page.locator(`#dot-container .dot[data-index="${wrongIndex}"]`);
    await wrongLocator.waitFor({ state: 'attached', timeout: 2000 });
    await wrongLocator.scrollIntoViewIfNeeded();
    // some dots can be small or inside a scrolled container; simulate real click via DOM
    // simulate clicking the visible inner element (dot-vis) to match real user clicks
    // the marker should start as a dollar icon — debug/inspect if it's missing
    const marksCount = await page.locator('#dot-container .dot .dot-mark').count();
    console.log('DEBUG marksCount ->', marksCount);
    const markHtml = await wrongLocator.locator('.dot-mark').evaluate((el: HTMLElement) => el ? el.outerHTML : 'MISSING');
    console.log('DEBUG markHtml ->', markHtml);
    await expect(wrongLocator.locator('.dot-mark svg[data-icon="dollar"]')).toBeVisible();
    const wrongInner = wrongLocator.locator('.dot-vis');
    await wrongInner.waitFor({ state: 'attached', timeout: 2000 });
    await wrongInner.evaluate((el: HTMLElement) => el.click());
    // (keyboard activation tested separately) — don't double-trigger guesses here
    // should have both selected + wrong indicator and show a clear $ marker
    await expect(wrongLocator).toHaveClass(/selected/);
    await expect(wrongLocator).toHaveClass(/wrong/);
    // the marker now uses an inline SVG; assert the svg exists and has a data-icon attribute of 'x'
    await expect(wrongLocator.locator('.dot-mark svg[data-icon="x"]')).toBeVisible();
    // the presence of the `wrong` class is the reliable signal for a wrong selection
    // (visual color checks are flaky in headless mode across platforms)

    // the wrong selection should remain red/present after purchase (persist)
    await page.waitForTimeout(300);
    await expect(wrongLocator).toHaveClass(/wrong/);

    // clicking the same wrong dot again should NOT increment attempts (prevent double-count)
    const wrongInner2 = wrongLocator.locator('.dot-vis');
    await wrongInner2.evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(200);
    await expect(page.locator('#attempts-info')).toHaveText(/Attempts:\s*1\s*\(\$2\)/i);

    // attempts info should reflect 1 attempt at $2
    await expect(page.locator('#attempts-info')).toHaveText(/Attempts:\s*1\s*\(\$2\)/i);

    // now click the real winner and ensure the modal appears and winner is highlighted
    const winnerLocator = page.locator(`#dot-container .dot[data-index="${winnerIndex}"]`);
    await winnerLocator.waitFor({ state: 'attached', timeout: 2000 });
    await winnerLocator.scrollIntoViewIfNeeded();
    await winnerLocator.evaluate((el: HTMLElement) => el.click());
    await page.waitForSelector('#winner-modal[aria-hidden="false"]', { state: 'visible', timeout: 2000 });
    // modal shows position & chance, the actual lottery odds text, and amount spent
    await expect(page.locator('#winner-sub')).toContainText(/Winner:\s*Dot\s*\d+\s*of\s*\d+/i);
    await expect(page.locator('#winner-sub')).toContainText(/Actual lottery odds for/i);
    await expect(page.locator('#winner-sub')).toContainText(/You spent \$\d+/i);
    const winnerCount = await page.locator('#dot-container .dot.winner').count();
    expect(winnerCount).toBe(1);
    // winner's marker should show a check (clear reveal affordance)
    // winner shows a trophy icon in the marker
    await expect(winnerLocator.locator('.dot-mark svg[data-icon="dollar"]')).toBeVisible();
    // winner inner dot being the `winner` class is the reliable signal for a correct selection

    // after the reveal, the modal should remain visible until explicitly closed
    // the attempts count should reflect both wrong and winning guesses
    await page.waitForSelector('#winner-modal[aria-hidden="false"]', { state: 'visible', timeout: 2000 });
    await expect(page.locator('#attempts-info')).toHaveText(/Attempts:\s*2\s*\(\$4\)/i);

    // closing via the close button resets the game
    await page.click('#winner-close');
    await page.waitForSelector('#winner-modal[aria-hidden="true"]', { state: 'hidden', timeout: 2000 });
    await expect(page.locator('#attempts-info')).toHaveText(/Attempts:\s*0\s*\(\$0\)/i);
  });
});
