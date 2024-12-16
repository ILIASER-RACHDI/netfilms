import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/Auth');

  await page.getByPlaceholder('Nom d’utilisateur').fill('test@gmail.com');
  await page.getByPlaceholder('Mot de passe').fill('test@');

  await page.getByRole('button', { name: 'Connexion', exact: true }).click();

  await page.getByRole('button', { name: 'Type a command or search...' }).click();
  await page.getByPlaceholder('Type a command or search...').fill('the');
  await page.getByPlaceholder('Type a command or search...').press('Enter');

  const headingLocator = page.getByRole('heading', { name: 'Venom: The Last Dance' });
  const actualText = await headingLocator.textContent();

  const expectedText = 'Venom: The Last Dance';
  expect(actualText?.trim()).toBe(expectedText);
});
