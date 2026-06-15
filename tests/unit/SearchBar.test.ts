import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '~/components/ui/SearchBar.vue'

describe('SearchBar', () => {

  it('devrait afficher la valeur initiale via modelValue', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: 'Frodo' }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('Frodo')
  })

  it('devrait emettre update:modelValue quand on tape', async () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' }
    })

    const input = wrapper.find('input')
    await input.setValue('Gandalf')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Gandalf'])
  })

  it('devrait afficher le placeholder par defaut si non fourni', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Search...')
  })

  it('devrait afficher le placeholder personnalise', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '', placeholder: 'Search characters...' }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Search characters...')
  })

  it('ne devrait pas afficher le bouton clear si modelValue est vide', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' }
    })

    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('devrait afficher le bouton clear si modelValue n est pas vide', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: 'Frodo' }
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('devrait emettre une chaine vide au clic sur clear', async () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: 'Frodo' }
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })
})
