// Blackjack Splitting Tests (Phase 4.5 Stub / Phase 4.6 Full Implementation)
// Tests for pair splitting functionality

import { test, expect } from '@playwright/test';

test.describe('Blackjack Splitting (Phase 4.5)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/casino-lite/blackjack');
    await page.waitForLoadState('networkidle');
  });

  test('split button appears when pair is dealt', async ({ page }) => {
    // TODO Phase 4.6: Implement proper test
    // For now, just verify page loads and basic elements exist
    
    const dealBtn = page.locator('#deal-btn');
    await expect(dealBtn).toBeVisible();
    
    // Split button exists in DOM
    const splitBtn = page.locator('#split-btn');
    await expect(splitBtn).toHaveCount(1);
    
    // Note: Split button visibility depends on random card deal
    // Full implementation will use mocked deck to ensure pairs
  });

  test.skip('can split matching pairs', async ({ page }) => {
    // TODO Phase 4.6: Full implementation
    // 
    // Test plan:
    // 1. Mock deck to deal a pair (e.g., 8-8)
    // 2. Verify split button is visible and enabled
    // 3. Click split button
    // 4. Verify balance decreased by bet amount
    // 5. Verify two hands are displayed
    // 6. Play each hand sequentially
    // 7. Verify settlement for both hands
  });

  test.skip('cannot split non-pairs', async ({ page }) => {
    // TODO Phase 4.6: Full implementation
    //
    // Test plan:
    // 1. Mock deck to deal non-pair (e.g., 7-10)
    // 2. Verify split button is not visible
  });

  test.skip('split aces receive one card only', async ({ page }) => {
    // TODO Phase 4.6: Full implementation
    //
    // Test plan:
    // 1. Mock deck to deal A-A
    // 2. Click split
    // 3. Verify each hand receives exactly one card
    // 4. Verify no hit/stand options (auto-complete)
    // 5. Verify settlement
  });

  test.skip('insufficient balance disables split', async ({ page }) => {
    // TODO Phase 4.6: Full implementation
    //
    // Test plan:
    // 1. Reduce CatnipCoin balance to < 10 CC
    // 2. Mock deck to deal pair
    // 3. Verify split button is disabled
  });
});
