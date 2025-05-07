const { test, expect } = require('@playwright/test');

test.describe('Signup Form Tests', () => {

  test('Valid Signup form submission', async ({ page }) => {
    await page.goto('/signup');

    // Fill the signup form with valid data
    await page.fill('input[name="firstname"]', 'Saurabh');
    await page.fill('input[name="lastname"]', 'Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="phone"]', '1234567890');
    await page.fill('input[name="password"]', 'Test@1234');
    await page.fill('input[name="rePassword"]', 'Test@1234');
    await page.fill('input[name="dob"]', '2000-01-01');
    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="state"]', 'NY');

    // Submit the form
    await page.click('button[type="submit"]');

    // Expect success message to appear
    await expect(page.locator('.success-message')).toBeVisible();
  });

  test('Invalid Signup form submission - Password mismatch', async ({ page }) => {
    await page.goto('/signup');

    // Fill the signup form with mismatched passwords
    await page.fill('input[name="firstname"]', 'John');
    await page.fill('input[name="lastname"]', 'Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="phone"]', '1234567890');
    await page.fill('input[name="password"]', 'Test@1234');
    await page.fill('input[name="rePassword"]', 'Test@5678'); // Mismatched password
    await page.fill('input[name="dob"]', '2000-01-01');
    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="state"]', 'NY');

    // Submit the form
    await page.click('button[type="submit"]');

    // Expect error message for mismatched passwords
    // eslint-disable-next-line testing-library/prefer-screen-queries
    await expect(page.getByText('Passwords do not match.')).toBeVisible();
  });

  test('Invalid Signup form submission - Missing fields', async ({ page }) => {
    await page.goto('/signup');

    // Leave some required fields blank
    await page.fill('input[name="firstname"]', '');
    await page.fill('input[name="lastname"]', 'Doe');
    await page.fill('input[name="email"]', '');
    await page.fill('input[name="phone"]', '');
    await page.fill('input[name="password"]', 'Test@1234');
    await page.fill('input[name="rePassword"]', 'Test@1234');
    await page.fill('input[name="dob"]', '');
    await page.fill('input[name="city"]', 'New York');
    await page.fill('input[name="state"]', '');

    // Submit the form
    await page.click('button[type="submit"]');

    // Expect error messages to be visible
    await expect(page.locator('.error-message')).toContainText([
      'First name is required.',
      'Email is required.',
      'Phone number is required.',
      'Date of birth is required.',
      'State is required.',
      'Please fill out all required fields.'
    ]);
  });

});
