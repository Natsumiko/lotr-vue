import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import ResourceCard from '~/components/ui/ResourceCard.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div/>' } },
    { path: '/characters/:id', component: { template: '<div/>' } },
  ]
})

describe('ResourceCard', () => {

  function mountCard(props: Record<string, unknown>) {
    return mount(ResourceCard, {
      props,
      global: { plugins: [router] }
    })
  }

  it('devrait afficher le titre et l emoji', () => {
    const wrapper = mountCard({
      to: '/characters/1',
      title: 'Frodo Baggins',
      emoji: '🧝'
    })

    expect(wrapper.text()).toContain('Frodo Baggins')
    expect(wrapper.text()).toContain('🧝')
  })

  it('devrait afficher le subtitle si fourni', () => {
    const wrapper = mountCard({
      to: '/characters/1',
      title: 'Frodo Baggins',
      subtitle: 'Hobbit'
    })

    expect(wrapper.text()).toContain('Hobbit')
  })

  it('ne devrait pas afficher de subtitle si non fourni', () => {
    const wrapper = mountCard({
      to: '/characters/1',
      title: 'Frodo Baggins'
    })

    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('devrait afficher les stats avec fallback pour valeurs nulles', () => {
    const wrapper = mountCard({
      to: '/characters/1',
      title: 'Frodo Baggins',
      stats: [
        { label: 'Gender', value: 'Male' },
        { label: 'Death', value: null }
      ]
    })

    expect(wrapper.text()).toContain('Gender')
    expect(wrapper.text()).toContain('Male')
    expect(wrapper.text()).toContain('Death')
    expect(wrapper.text()).toContain('—')
  })

  it('devrait afficher les badges si fournis', () => {
    const wrapper = mountCard({
      to: '/characters/1',
      title: 'Frodo Baggins',
      badges: ['The Fellowship of the Ring', 'The Two Towers']
    })

    expect(wrapper.text()).toContain('The Fellowship of the Ring')
    expect(wrapper.text()).toContain('The Two Towers')
  })

  it('devrait pointer vers le lien fourni', () => {
    const wrapper = mountCard({
      to: '/characters/1',
      title: 'Frodo Baggins'
    })

    const link = wrapper.findComponent({ name: 'RouterLink' })
    expect(link.props('to')).toBe('/characters/1')
  })
})
