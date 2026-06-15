import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PageHeader from '~/components/ui/PageHeader.vue'

describe('PageHeader', () => {

  it('devrait afficher le titre', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 'Characters' }
    })

    expect(wrapper.find('h1').text()).toContain('Characters')
  })

  it('devrait afficher l emoji si fourni', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 'Characters', emoji: '🧝' }
    })

    expect(wrapper.find('h1').text()).toContain('🧝')
  })

  it('devrait afficher la description si fournie', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 'Characters', description: 'Heroes of Middle-earth' }
    })

    expect(wrapper.text()).toContain('Heroes of Middle-earth')
  })

  it('ne devrait pas afficher de description si non fournie', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 'Characters' }
    })

    const paragraphs = wrapper.findAll('p')
    expect(paragraphs.length).toBe(0)
  })

  it('devrait afficher le compteur au singulier pour 1', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 'Characters', count: 1 }
    })

    expect(wrapper.text()).toContain('1 entry')
  })

  it('devrait afficher le compteur au pluriel pour plusieurs', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 'Characters', count: 42 }
    })

    expect(wrapper.text()).toContain('42 entries')
  })

  it('devrait afficher le compteur pour 0', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 'Characters', count: 0 }
    })

    expect(wrapper.text()).toContain('0 entries')
  })

  it('ne devrait pas afficher de compteur si count est undefined', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 'Characters' }
    })

    expect(wrapper.text()).not.toContain('entries')
    expect(wrapper.text()).not.toContain('entry')
  })
})
