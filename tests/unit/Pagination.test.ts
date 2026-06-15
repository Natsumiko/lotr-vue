import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '~/components/ui/Pagination.vue'

describe('Pagination', () => {

  it('ne devrait rien afficher si totalPages <= 1', () => {
    const wrapper = mount(Pagination, {
      props: { page: 0, totalPages: 1 }
    })

    expect(wrapper.find('nav').exists()).toBe(false)
  })

  it('devrait afficher les boutons de pages si totalPages > 1', () => {
    const wrapper = mount(Pagination, {
      props: { page: 0, totalPages: 5 }
    })

    expect(wrapper.find('nav').exists()).toBe(true)
    // 5 pages + boutons prev/next
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(5)
  })

  it('devrait desactiver le bouton precedent sur la premiere page', () => {
    const wrapper = mount(Pagination, {
      props: { page: 0, totalPages: 5 }
    })

    const prevButton = wrapper.find('[aria-label="Previous page"]')
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('devrait desactiver le bouton suivant sur la derniere page', () => {
    const wrapper = mount(Pagination, {
      props: { page: 4, totalPages: 5 }
    })

    const nextButton = wrapper.find('[aria-label="Next page"]')
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('devrait emettre update:page au clic sur une page', async () => {
    const wrapper = mount(Pagination, {
      props: { page: 0, totalPages: 5 }
    })

    // Trouve le bouton de la page 2 (index 1)
    const pageButtons = wrapper.findAll('button').filter(b => b.text() === '2')
    await pageButtons[0].trigger('click')

    expect(wrapper.emitted('update:page')?.[0]).toEqual([1])
  })

  it('devrait emettre update:page au clic sur next', async () => {
    const wrapper = mount(Pagination, {
      props: { page: 0, totalPages: 5 }
    })

    await wrapper.find('[aria-label="Next page"]').trigger('click')

    expect(wrapper.emitted('update:page')?.[0]).toEqual([1])
  })

  it('devrait marquer la page courante avec aria-current', () => {
    const wrapper = mount(Pagination, {
      props: { page: 2, totalPages: 5 }
    })

    const currentPage = wrapper.find('[aria-current="page"]')
    expect(currentPage.exists()).toBe(true)
    expect(currentPage.text()).toBe('3') // page 2 (0-based) = affichage "3"
  })

  it('ne devrait pas afficher plus de 5 boutons de page', () => {
    const wrapper = mount(Pagination, {
      props: { page: 5, totalPages: 20 }
    })

    // Boutons numériques uniquement (pas prev/next)
    const pageButtons = wrapper.findAll('button').filter(b => /^\d+$/.test(b.text()))
    expect(pageButtons.length).toBeLessThanOrEqual(5)
  })
})
