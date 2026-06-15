import { test, expect } from '@playwright/test'

test.describe('Characters list', () => {

  test('affiche la liste des personnages', async ({ page }) => {
    await page.goto('/characters')

    await expect(page.locator('h1')).toContainText('Characters')

    // Au moins une carte de personnage visible (ou skeleton pendant le chargement)
    await expect(page.locator('a[href^="/characters/"]').first()).toBeVisible({ timeout: 10000 })
  })

  test('la recherche filtre les resultats', async ({ page }) => {
    await page.goto('/characters')

    // Attend le chargement initial
    await expect(page.locator('a[href^="/characters/"]').first()).toBeVisible({ timeout: 10000 })

    const searchInput = page.getByPlaceholder(/Search by name/i)
    await searchInput.fill('Frodo')

    // Attend le debounce (300ms) + le rechargement
    await page.waitForTimeout(500)

    const results = page.locator('a[href^="/characters/"]')
    await expect(results.first()).toContainText(/Frodo/i, { timeout: 10000 })
  })

  test('affiche un message si aucun resultat', async ({ page }) => {
    await page.goto('/characters')

    const searchInput = page.getByPlaceholder(/Search by name/i)
    await searchInput.fill('XYZNonExistentCharacter123')

    await page.waitForTimeout(500)

    await expect(page.getByText(/No characters found/i)).toBeVisible({ timeout: 10000 })
  })

  test('le bouton clear reinitialise la recherche', async ({ page }) => {
    await page.goto('/characters')

    const searchInput = page.getByPlaceholder(/Search by name/i)
    await searchInput.fill('Frodo')
    await page.waitForTimeout(400)

    await page.getByRole('button', { name: /clear search/i }).click()

    await expect(searchInput).toHaveValue('')
  })
})
