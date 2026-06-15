import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLotrStore } from '~/stores/lotrStore'
import type { PageResponse, Character, Race } from '~/types'

const MOCK_CHARACTERS: PageResponse<Character> = {
  results: [],
  count: 10,
  page: 0,
  pageSize: 20,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
}

const MOCK_RACES: PageResponse<Race> = {
  results: [],
  count: 6,
  page: 0,
  pageSize: 20,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
}

describe('useLotrStore', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('devrait avoir un etat initial vide', () => {
    const store = useLotrStore()

    expect(store.characters).toBeNull()
    expect(store.races).toBeNull()
    expect(store.locations).toBeNull()
    expect(store.films).toBeNull()
    expect(store.artifacts).toBeNull()
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('setCharacters devrait mettre a jour characters', () => {
    const store = useLotrStore()

    store.setCharacters(MOCK_CHARACTERS)

    expect(store.characters).toEqual(MOCK_CHARACTERS)
  })

  it('setLoading devrait mettre a jour loading', () => {
    const store = useLotrStore()

    store.setLoading(true)
    expect(store.loading).toBe(true)

    store.setLoading(false)
    expect(store.loading).toBe(false)
  })

  it('setError devrait mettre a jour error', () => {
    const store = useLotrStore()

    store.setError('Network error')
    expect(store.error).toBe('Network error')

    store.setError(null)
    expect(store.error).toBeNull()
  })

  it('totalResources devrait etre 0 si rien n est charge', () => {
    const store = useLotrStore()

    expect(store.totalResources).toBe(0)
  })

  it('totalResources devrait sommer les counts de toutes les ressources', () => {
    const store = useLotrStore()

    store.setCharacters(MOCK_CHARACTERS)
    store.setRaces(MOCK_RACES)

    expect(store.totalResources).toBe(16) // 10 + 6
  })

  it('totalResources devrait se mettre a jour reactivement', () => {
    const store = useLotrStore()

    store.setCharacters(MOCK_CHARACTERS)
    expect(store.totalResources).toBe(10)

    store.setRaces(MOCK_RACES)
    expect(store.totalResources).toBe(16)
  })
})
