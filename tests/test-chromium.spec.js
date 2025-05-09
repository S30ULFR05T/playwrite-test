const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Signup using valid data
  await page.goto('http://localhost:3000/signup');

  await page.fill('input[name="firstname"]', 'Saurabh');
  await page.fill('input[name="lastname"]', 'Doe');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.fill('input[name="phone"]', '1234567890');
  await page.fill('input[name="password"]', 'Test@1234');
  await page.fill('input[name="rePassword"]', 'Test@1234');
  await page.fill('input[name="dob"]', '2000-01-01');
  await page.fill('input[name="city"]', 'New York');
  await page.fill('input[name="state"]', 'NY');

  await page.click('button[type="submit"]');

  try {
    await page.waitForSelector('.success-message', { timeout: 3000 });
    console.log('Valid Signup Test Passed');
  } catch {
    console.error('Valid Signup Test Failed');
  }

  // Password mismatch
  await page.goto('http://localhost:3000/signup');

  await page.fill('input[name="firstname"]', 'John');
  await page.fill('input[name="lastname"]', 'Doe');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.fill('input[name="phone"]', '1234567890');
  await page.fill('input[name="password"]', 'Test@1234');
  await page.fill('input[name="rePassword"]', 'Test@5678'); // password is different
  await page.fill('input[name="dob"]', '2000-01-01');
  await page.fill('input[name="city"]', 'New York');
  await page.fill('input[name="state"]', 'NY');

  await page.click('button[type="submit"]');

  try {
    await page.waitForSelector('text=Passwords do not match.', { timeout: 3000 });
    console.log('Password Mismatch Test Passed');
  } catch {
    console.error('Password Mismatch Test Failed');
  }

  // Required fields missing
  await page.goto('http://localhost:3000/signup');

  await page.fill('input[name="firstname"]', '');   // firstname is missing
  await page.fill('input[name="lastname"]', 'Doe');
  await page.fill('input[name="email"]', '');   // email is missing
  await page.fill('input[name="phone"]', '');   //phone is missing
  await page.fill('input[name="password"]', 'Test@1234');
  await page.fill('input[name="rePassword"]', 'Test@1234');
  await page.fill('input[name="dob"]', ''); // dob is missing
  await page.fill('input[name="city"]', 'New York');
  await page.fill('input[name="state"]', '');   //state name is missing

  await page.click('button[type="submit"]');

  const expectedErrors = [
    'First name is required.',
    'Email is required.',
    'Phone number is required.',
    'Date of birth is required.',
    'State is required.',
    'Please fill out all required fields.'
  ];

  let errorsFound = 0;
  for (const error of expectedErrors) {
    try {
      await page.waitForSelector(`text=${error}`, { timeout: 1000 });
      errorsFound++;
    } catch {
      console.error(`Error not found: ${error}`);
    }
  }

  if (errorsFound === expectedErrors.length) {
    console.log('Missing Fields Test Passed');
  } else {
    console.error('Missing Fields Test Failed');
  }

  await browser.close();
})();
