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

    // Submit the form by pressing button
    await page.click('button[type="submit"]');

    // Success message appear after submission
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

    // Error message for mismatched password
    // eslint-disable-next-line testing-library/prefer-screen-queries
    await expect(page.getByText('Passwords do not match.')).toBeVisible();
  });

  test('Invalid Signup form submission - Missing fields', async ({ page }) => {
    await page.goto('/signup');

    // Required fields are missing
    await page.fill('input[name="firstname"]', '');   // first name is missing
    await page.fill('input[name="lastname"]', 'Doe');
    await page.fill('input[name="email"]', '');   // email is missing
    await page.fill('input[name="phone"]', '');   // phone is missing
    await page.fill('input[name="password"]', 'Test@1234'); 
    await page.fill('input[name="rePassword"]', 'Test@1234');
    await page.fill('input[name="dob"]', '');   // dob is missing
    await page.fill('input[name="city"]', 'New York');  
    await page.fill('input[name="state"]', '');   // state is missing

    // Submit the form
    await page.click('button[type="submit"]');

    // Error message show in ui (any of this error show in ui then test is passed)
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
