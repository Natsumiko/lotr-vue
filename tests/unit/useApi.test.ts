import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useApi } from '~/composables/useApi'

// Mock de useRuntimeConfig (fourni par Nuxt normalement)
vi.stubGlobal('useRuntimeConfig', () => ({
  public: { apiBase: 'https://lotr-api.info' }
}))

const MOCK_PAGE_RESPONSE = {
  results: [{ id: 1, name: 'Frodo Baggins' }],
  count: 1,
  page: 0,
  pageSize: 20,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
}

describe('useApi', () => {

  beforeEach(() => {
    vi.stubGlobal('$fetch', vi.fn().mockResolvedValue(MOCK_PAGE_RESPONSE))
  })

  it('fetchCharacters devrait appeler le bon endpoint sans params', async () => {
    const api = useApi()
    await api.fetchCharacters()

    expect($fetch).toHaveBeenCalledWith('https://lotr-api.info/api/characters')
  })

  it('fetchCharacters devrait construire la query avec les params', async () => {
    const api = useApi()
    await api.fetchCharacters({ page: 1, size: 10, name: 'Frodo' })

    expect($fetch).toHaveBeenCalledWith(
      'https://lotr-api.info/api/characters?page=1&size=10&name=Frodo'
    )
  })

  it('fetchCharacters devrait ignorer les params undefined', async () => {
    const api = useApi()
    await api.fetchCharacters({ page: 0, raceId: undefined })

    expect($fetch).toHaveBeenCalledWith(
      'https://lotr-api.info/api/characters?page=0'
    )
  })

  it('fetchCharacter devrait appeler l endpoint avec l id', async () => {
    const api = useApi()
    await api.fetchCharacter(42)

    expect($fetch).toHaveBeenCalledWith('https://lotr-api.info/api/characters/42')
  })

  it('fetchRaces devrait appeler le bon endpoint', async () => {
    const api = useApi()
    await api.fetchRaces()

    expect($fetch).toHaveBeenCalledWith('https://lotr-api.info/api/races')
  })

  it('fetchLocations devrait construire la query avec type', async () => {
    const api = useApi()
    await api.fetchLocations({ type: 'Région' })

    expect($fetch).toHaveBeenCalledWith(
      'https://lotr-api.info/api/locations?type=R%C3%A9gion'
    )
  })

  it('fetchFilms devrait appeler le bon endpoint avec filtre type', async () => {
    const api = useApi()
    await api.fetchFilms({ type: 'FILM' })

    expect($fetch).toHaveBeenCalledWith('https://lotr-api.info/api/films?type=FILM')
  })

  it('fetchArtifacts devrait appeler le bon endpoint', async () => {
    const api = useApi()
    await api.fetchArtifacts({ name: 'Anneau' })

    expect($fetch).toHaveBeenCalledWith('https://lotr-api.info/api/artifacts?name=Anneau')
  })

  it('fetchArtifact devrait appeler l endpoint avec l id', async () => {
    const api = useApi()
    await api.fetchArtifact(5)

    expect($fetch).toHaveBeenCalledWith('https://lotr-api.info/api/artifacts/5')
  })

  it('devrait retourner les donnees recues', async () => {
    const api = useApi()
    const result = await api.fetchCharacters()

    expect(result).toEqual(MOCK_PAGE_RESPONSE)
  })
})
