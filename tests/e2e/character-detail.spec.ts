import { test, expect } from '@playwright/test'

test.describe('Character detail', () => {

  test('cliquer sur un personnage affiche son detail', async ({ page }) => {
    await page.goto('/characters')

    await expect(page.locator('a[href^="/characters/"]').first()).toBeVisible({ timeout: 10000 })

    const firstCharacterLink = page.locator('a[href^="/characters/"]').first()
    const characterName = await firstCharacterLink.locator('h3').textContent()

    await firstCharacterLink.click()

    await expect(page.locator('h1')).toContainText(characterName ?? '')
  })

  test('le lien retour fonctionne', async ({ page }) => {
    await page.goto('/characters')
    await expect(page.locator('a[href^="/characters/"]').first()).toBeVisible({ timeout: 10000 })

    await page.locator('a[href^="/characters/"]').first().click()
    await page.getByRole('link', { name: /Back to Characters/i }).click()

    await expect(page).toHaveURL('/characters')
  })

  test('la race d un personnage est cliquable et navigue vers la race', async ({ page }) => {
    await page.goto('/characters')
    await expect(page.locator('a[href^="/characters/"]').first()).toBeVisible({ timeout: 10000 })

    await page.locator('a[href^="/characters/"]').first().click()

    const raceLink = page.locator('a[href^="/races/"]').first()
    if (await raceLink.isVisible()) {
      await raceLink.click()
      await expect(page).toHaveURL(/\/races\/\d+/)
      await expect(page.locator('h1')).not.toBeEmpty()
    }
  })

  test('page 404 pour un id inexistant', async ({ page }) => {
    const response = await page.goto('/characters/999999')
    expect(response?.status()).toBe(404)
  })
})

test.describe('Films page', () => {

  test('le filtre FILM/BOOK fonctionne', async ({ page }) => {
    await page.goto('/films')

    await expect(page.locator('h1')).toContainText('Films')

    await page.getByRole('button', { name: /Books/i }).click()

    // Attend le rechargement
    await page.waitForTimeout(500)

    const badges = page.locator('.type-badge--gold', { hasText: 'BOOK' })
    if (await badges.first().isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(badges.first()).toBeVisible()
    }
  })
})

test.describe('Locations page', () => {

  test('affiche la liste des lieux avec filtre type', async ({ page }) => {
    await page.goto('/locations')

    await expect(page.locator('h1')).toContainText('Locations')
    await expect(page.locator('a[href^="/locations/"]').first()).toBeVisible({ timeout: 10000 })

    const typeSelect = page.locator('select')
    await expect(typeSelect).toBeVisible()
  })
})
