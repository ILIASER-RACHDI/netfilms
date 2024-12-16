import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/Auth');
  await page.getByRole('button', { name: 'Pas encore inscrit ? Créez un' }).click();
  await page.getByPlaceholder('Nom d’utilisateur').click();
  await page.getByPlaceholder('Nom d’utilisateur').fill('test');
  await page.getByPlaceholder('Nom d’utilisateur').press('CapsLock');
  await page.getByPlaceholder('Nom d’utilisateur').fill('test12@gmail.com');
  await page.getByPlaceholder('Nom d’utilisateur').press('Tab');
  await page.getByPlaceholder('Mot de passe').fill('TEST12');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'S\'inscrire' }).click();
  await page.getByRole('button', { name: 'Vous avez déjà un compte ?' }).click();
  await page.getByPlaceholder('Nom d’utilisateur').click();
  await page.getByPlaceholder('Nom d’utilisateur').press('CapsLock');
  await page.getByPlaceholder('Nom d’utilisateur').fill('test');
  await page.getByPlaceholder('Nom d’utilisateur').press('CapsLock');
  await page.getByPlaceholder('Nom d’utilisateur').fill('test12');
  await page.getByPlaceholder('Nom d’utilisateur').press('CapsLock');
  await page.getByPlaceholder('Nom d’utilisateur').fill('test12@');
  await page.getByPlaceholder('Nom d’utilisateur').press('CapsLock');
  await page.getByPlaceholder('Nom d’utilisateur').fill('test12@gmail.com');
  await page.getByPlaceholder('Nom d’utilisateur').press('Tab');
  await page.getByPlaceholder('Mot de passe').press('CapsLock');
  await page.getByPlaceholder('Mot de passe').press('CapsLock');
  await page.getByPlaceholder('Mot de passe').fill('TEST12');
  await page.getByRole('button', { name: 'Connexion', exact: true }).click();
});