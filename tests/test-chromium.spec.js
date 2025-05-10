const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Signup using valid data
  await page.goto('http://localhost:3000/signup');

  await page.fill('input[name="firstname"]', 'Saurabh');
  await page.fill('input[name="lastname"]', 'Kumar');
  await page.fill('input[name="email"]', 'sk000@gmail.com');
  await page.fill('input[name="phone"]', '1234567890');
  await page.fill('input[name="password"]', 'Saurabh@1234');
  await page.fill('input[name="rePassword"]', 'Saurabh@1234');
  await page.fill('input[name="dob"]', '2000-01-06');
  await page.fill('input[name="city"]', 'Mumbai');
  await page.fill('input[name="state"]', 'Maharastra');

  await page.click('button[type="submit"]');

  try {
    await page.waitForSelector('.success-message', { timeout: 3000 });
    console.log('Valid Signup Test Passed');
  } catch {
    console.error('Valid Signup Test Failed');
  }

  // Password mismatch
  await page.goto('http://localhost:3000/signup');

  await page.fill('input[name="firstname"]', 'Suraj');
  await page.fill('input[name="lastname"]', 'Kumar');
  await page.fill('input[name="email"]', 'kumarsuraj@yahoo.com');
  await page.fill('input[name="phone"]', '1234567890');
  await page.fill('input[name="password"]', 'Suraj@1234');
  await page.fill('input[name="rePassword"]', 'Suraj@5678'); // password is different
  await page.fill('input[name="dob"]', '2000-01-01');
  await page.fill('input[name="city"]', 'New Mumabi');
  await page.fill('input[name="state"]', 'Delhi');

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
  await page.fill('input[name="lastname"]', 'Singh');
  await page.fill('input[name="email"]', '');   // email is missing
  await page.fill('input[name="phone"]', '');   //phone is missing
  await page.fill('input[name="password"]', 'singh@1234');
  await page.fill('input[name="rePassword"]', 'singh@1234');
  await page.fill('input[name="dob"]', ''); // dob is missing
  await page.fill('input[name="city"]', 'New Gujrat');
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
