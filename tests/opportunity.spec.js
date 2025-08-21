
import { test } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('test', async ({ page }, testInfo) => {
  console.log("My logs:")
  console.log(process.env.SF_BASE_URL);
  await page.goto('/'); // or your app's home page

  //await page.screenshot({ path: 'debug.png', fullPage: true });
  await page.getByRole('link', { name: 'Opportunities' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('textbox', { name: 'Amount' }).fill('');
  await page.getByRole('textbox', { name: '*Opportunity Name' }).click();
  await page.getByRole('textbox', { name: '*Opportunity Name' }).fill('test');
  await page.getByRole('combobox', { name: 'Account Name' }).click();
  await page.getByRole('textbox', { name: '*Close Date' }).click();
  await page.getByRole('button', { name: '12' }).click();
  await page.getByRole('combobox', { name: 'Stage' }).click();
  const screenshot = await page.screenshot({ quality: 50, type: 'jpeg' })
  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/jpeg',
  })
 // await page.getByText('Prospecting').dblclick();
  //await page.getByRole('textbox', { name: 'Probability (%)' }).fill('10');
  //await page.getByRole('combobox', { name: 'Lead Source' }).click();
  //await page.getByRole('option', { name: 'Phone Inquiry' }).click();
  //await page.getByRole('combobox', { name: 'Type' }).click();
  //await page.getByText('Existing Customer - Upgrade').click();
  //await page.getByRole('button', { name: 'Save', exact: true }).click();
});