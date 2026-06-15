import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {

  test('la page d accueil affiche le titre et les liens de navigation', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('h1')).toContainText('Middle-earth')

    // Vérifie les liens vers les 5 ressources
    await expect(page.getByRole('link', { name: /Characters/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Races/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Locations/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Films/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Artifacts/i }).first()).toBeVisible()
  })

  test('cliquer sur Characters navigue vers la liste', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /Explore Characters/i }).click()

    await expect(page).toHaveURL('/characters')
    await expect(page.locator('h1')).toContainText('Characters')
  })

  test('le header reste visible et permet la navigation entre sections', async ({ page }) => {
    await page.goto('/characters')

    await page.locator('header').getByRole('link', { name: /Races/i }).click()
    await expect(page).toHaveURL('/races')

    await page.locator('header').getByRole('link', { name: /Locations/i }).click()
    await expect(page).toHaveURL('/locations')
  })

  test('le menu mobile s ouvre et se ferme', async ({ page, isMobile }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto('/')

    const burger = page.getByRole('button', { name: /open the menu/i })
    await burger.click()

    await expect(page.getByRole('link', { name: /Films/i }).last()).toBeVisible()

    await page.getByRole('button', { name: /close the menu/i }).click()
  })
})
