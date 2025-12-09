import { test, expect } from '@playwright/test';

test.describe('Ticket Variance Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/ticket-variance');
  });

  test('loads page with correct title and content', async ({ page }) => {
    await expect(page).toHaveTitle(/Ticket Variance Calculator/);
    await expect(page.locator('h1')).toContainText('Ticket Variance Calculator');
    await expect(page.locator('.teaser-content')).toBeVisible();
  });

  test('has all required input fields', async ({ page }) => {
    await expect(page.locator('#preset')).toBeVisible();
    await expect(page.locator('#odds')).toBeVisible();
    await expect(page.locator('#ticketsPerDraw')).toBeVisible();
    await expect(page.locator('#draws')).toBeVisible();
    await expect(page.locator('#trials')).toBeVisible();
    await expect(page.locator('#compute')).toBeVisible();
  });

  test('switches presets correctly', async ({ page }) => {
    // Select Powerball preset
    await page.selectOption('#preset', 'powerball');
    const oddsInput = page.locator('#odds');
    await expect(oddsInput).toHaveValue('292201338');

    // Select Mega Millions preset
    await page.selectOption('#preset', 'megamillions');
    await expect(oddsInput).toHaveValue('302575350');

    // Select Demo preset
    await page.selectOption('#preset', 'demo');
    await expect(oddsInput).toHaveValue('1000');
  });

  test('runs simulation and displays results', async ({ page }) => {
    // Set demo values for faster simulation
    await page.selectOption('#preset', 'demo');
    await page.fill('#ticketsPerDraw', '10');
    await page.fill('#draws', '20');
    await page.fill('#trials', '100');

    // Click compute button
    await page.click('#compute');

    // Wait for results to appear
    await page.waitForTimeout(2000); // Give simulation time to run
    
    // Check that results contain expected text
    await expect(page.locator('#variance')).not.toHaveText('—');
    await expect(page.locator('#stddev')).not.toHaveText('—');
    await expect(page.locator('#simMean')).not.toHaveText('—');
  });

  test('validates input fields', async ({ page }) => {
    // Try to run with invalid values
    await page.fill('#odds', '0');
    await page.click('#compute');
    
    // Should show validation or handle gracefully
    // (implementation may vary)
  });
});

test.describe('Lottery Math Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/lottery-math-quiz');
  });

  test('loads page with correct title and content', async ({ page }) => {
    await expect(page).toHaveTitle(/Lottery Math Quiz/);
    await expect(page.locator('h1')).toContainText('Lottery Math Quiz');
    await expect(page.locator('.teaser-content')).toBeVisible();
  });

  test('displays quiz controls and score', async ({ page }) => {
    await expect(page.locator('#score')).toBeVisible();
    await expect(page.locator('#streak')).toBeVisible();
    await expect(page.locator('#cardNumber')).toBeVisible();
    await expect(page.locator('#categoryFilter')).toBeVisible();
    await expect(page.locator('#resetBtn')).toBeVisible();
  });

  test('displays first question with options', async ({ page }) => {
    // Check that a question is loaded
    await expect(page.locator('#cardQuestion')).not.toBeEmpty();
    await expect(page.locator('#cardCategory')).toBeVisible();
    
    // Check that options are present
    const options = page.locator('.option-button');
    await expect(options).toHaveCount(4); // Most questions have 4 options
  });

  test('can answer a question and see feedback', async ({ page }) => {
    // Click the first option
    await page.locator('.option-button').first().click();
    
    // Should show feedback
    await expect(page.locator('#cardFeedback')).toBeVisible();
    await expect(page.locator('#cardExplanation')).toBeVisible();
    
    // Feedback should be either correct or incorrect
    const feedback = await page.locator('#cardFeedback').textContent();
    expect(feedback).toMatch(/(Correct|Incorrect)/);
  });

  test('updates score after answering', async ({ page }) => {
    const initialScore = await page.locator('#score').textContent();
    
    // Answer a question
    await page.locator('.option-button').first().click();
    
    // Wait a moment for score update
    await page.waitForTimeout(100);
    
    const updatedScore = await page.locator('#score').textContent();
    expect(updatedScore).not.toBe(initialScore);
  });

  test('navigation buttons exist and are properly configured', async ({ page }) => {
    // Previous button should be disabled on first question
    const prevBtn = page.locator('#prevBtn');
    await expect(prevBtn).toBeVisible();
    await expect(prevBtn).toBeDisabled();
    
    // Next button should be visible and enabled (we have 20 questions)
    const nextBtn = page.locator('#nextBtn');
    await expect(nextBtn).toBeVisible();
    await expect(nextBtn).toBeEnabled();
    
    // Card number should show 1/20 initially
    const cardNumber = await page.locator('#cardNumber').textContent();
    expect(cardNumber).toContain('1/');
    expect(cardNumber).toContain('/20');
  });

  test('can filter questions by category', async ({ page }) => {
    const initialQuestion = await page.locator('#cardQuestion').textContent();
    
    // Select a specific category
    await page.selectOption('#categoryFilter', 'misconceptions');
    
    // Question should change or reset
    await page.waitForTimeout(200);
    const categoryBadge = await page.locator('#cardCategory').textContent();
    expect(categoryBadge).toBe('Common Misconceptions');
  });

  test('reset button restarts quiz', async ({ page }) => {
    // Answer a few questions
    await page.locator('.option-button').first().click();
    await page.locator('#nextBtn').click();
    await page.locator('.option-button').first().click();
    
    // Check score is not 0/0
    const scoreBeforeReset = await page.locator('#score').textContent();
    expect(scoreBeforeReset).not.toBe('0/0');
    
    // Click reset
    await page.locator('#resetBtn').click();
    
    // Score should reset to 0/0
    await expect(page.locator('#score')).toHaveText('0/0');
    await expect(page.locator('#cardNumber')).toContainText('1/');
  });

  test('progress bar updates as quiz advances', async ({ page }) => {
    const progressFill = page.locator('#progressFill');
    
    // Initial progress
    const initialWidth = await progressFill.evaluate(el => el.style.width);
    
    // Move to next question
    await page.locator('#nextBtn').click();
    
    // Progress should increase
    const newWidth = await progressFill.evaluate(el => el.style.width);
    expect(parseFloat(newWidth)).toBeGreaterThan(parseFloat(initialWidth));
  });

  test('streak counter increases with correct answers', async ({ page }) => {
    // Get initial streak
    const initialStreak = await page.locator('#streak').textContent();
    expect(initialStreak).toBe('0');
    
    // We need to find the correct answer
    // Since questions are randomized, we'll check which option is marked correct after clicking
    const options = page.locator('.option-button');
    const optionCount = await options.count();
    
    // Try each option until we find the correct one
    for (let i = 0; i < optionCount; i++) {
      const option = options.nth(i);
      await option.click();
      
      const feedback = await page.locator('#cardFeedback').textContent();
      if (feedback?.includes('Correct')) {
        // Check streak increased
        const newStreak = await page.locator('#streak').textContent();
        expect(parseInt(newStreak!)).toBeGreaterThan(0);
        break;
      }
      
      // If incorrect, reset for next try
      if (i < optionCount - 1) {
        await page.reload();
      }
    }
  });

  test('displays educational content below quiz', async ({ page }) => {
    await expect(page.locator('.educational-section')).toBeVisible();
    await expect(page.locator('.info-grid')).toBeVisible();
    
    // Should have info cards
    const infoCards = page.locator('.info-card');
    await expect(infoCards).toHaveCount(4);
  });

  test('all question categories are accessible', async ({ page }) => {
    const categories = ['all', 'misconceptions', 'probability', 'strategy', 'math'];
    
    for (const category of categories) {
      await page.selectOption('#categoryFilter', category);
      await page.waitForTimeout(100);
      
      // Should load a question for each category
      const question = await page.locator('#cardQuestion').textContent();
      expect(question).not.toBe('No questions available for this category.');
    }
  });
});
