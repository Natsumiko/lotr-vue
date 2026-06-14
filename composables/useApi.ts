// composables/useApi.ts
// Composable central pour tous les appels à l'API LOTR.
// Utilise $fetch de Nuxt (optimisé SSR + client).

import type {
  PageResponse,
  Character,
  Race,
  Location,
  Film,
  Artifact,
  CharacterSearchParams,
  LocationSearchParams,
  FilmSearchParams,
  ArtifactSearchParams,
  SearchParams,
} from '~/types'

export function useApi() {
  const config = useRuntimeConfig()
  const base = config.public.apiBase

  /**
   * Fonction utilitaire — construit les query params depuis un objet.
   * Ignore les valeurs undefined/null.
   */
  function buildQuery(params: Record<string, unknown>): string {
    const q = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')
    return q ? `?${q}` : ''
  }

  // ── Characters ─────────────────────────────────────────────────────────────

  function fetchCharacters(params: CharacterSearchParams = {}) {
    return $fetch<PageResponse<Character>>(
      `${base}/api/characters${buildQuery(params)}`
    )
  }

  function fetchCharacter(id: number) {
    return $fetch<Character>(`${base}/api/characters/${id}`)
  }

  // ── Races ──────────────────────────────────────────────────────────────────

  function fetchRaces(params: SearchParams = {}) {
    return $fetch<PageResponse<Race>>(
      `${base}/api/races${buildQuery(params)}`
    )
  }

  function fetchRace(id: number) {
    return $fetch<Race>(`${base}/api/races/${id}`)
  }

  // ── Locations ──────────────────────────────────────────────────────────────

  function fetchLocations(params: LocationSearchParams = {}) {
    return $fetch<PageResponse<Location>>(
      `${base}/api/locations${buildQuery(params)}`
    )
  }

  function fetchLocation(id: number) {
    return $fetch<Location>(`${base}/api/locations/${id}`)
  }

  // ── Films ──────────────────────────────────────────────────────────────────

  function fetchFilms(params: FilmSearchParams = {}) {
    return $fetch<PageResponse<Film>>(
      `${base}/api/films${buildQuery(params)}`
    )
  }

  function fetchFilm(id: number) {
    return $fetch<Film>(`${base}/api/films/${id}`)
  }

  // ── Artifacts ──────────────────────────────────────────────────────────────

  function fetchArtifacts(params: ArtifactSearchParams = {}) {
    return $fetch<PageResponse<Artifact>>(
      `${base}/api/artifacts${buildQuery(params)}`
    )
  }

  function fetchArtifact(id: number) {
    return $fetch<Artifact>(`${base}/api/artifacts/${id}`)
  }

  return {
    fetchCharacters,
    fetchCharacter,
    fetchRaces,
    fetchRace,
    fetchLocations,
    fetchLocation,
    fetchFilms,
    fetchFilm,
    fetchArtifacts,
    fetchArtifact,
  }
}
