// stores/lotrStore.ts
import { defineStore } from 'pinia'
import type { Character, Race, Location, Film, Artifact, PageResponse } from '~/types'

export const useLotrStore = defineStore('lotr', () => {
  // ── State ──────────────────────────────────────────────────────────────────
  const characters  = ref<PageResponse<Character> | null>(null)
  const races       = ref<PageResponse<Race> | null>(null)
  const locations   = ref<PageResponse<Location> | null>(null)
  const films       = ref<PageResponse<Film> | null>(null)
  const artifacts   = ref<PageResponse<Artifact> | null>(null)

  const globalSearch = ref('')
  const loading      = ref(false)
  const error        = ref<string | null>(null)

  // ── Getters ────────────────────────────────────────────────────────────────
  const totalResources = computed(() => {
    return (
      (characters.value?.count  ?? 0) +
      (races.value?.count       ?? 0) +
      (locations.value?.count   ?? 0) +
      (films.value?.count       ?? 0) +
      (artifacts.value?.count   ?? 0)
    )
  })

  // ── Actions ────────────────────────────────────────────────────────────────
  function setCharacters(data: PageResponse<Character>) { characters.value = data }
  function setRaces(data: PageResponse<Race>)           { races.value = data }
  function setLocations(data: PageResponse<Location>)   { locations.value = data }
  function setFilms(data: PageResponse<Film>)           { films.value = data }
  function setArtifacts(data: PageResponse<Artifact>)   { artifacts.value = data }

  function setLoading(val: boolean) { loading.value = val }
  function setError(val: string | null) { error.value = val }

  return {
    characters, races, locations, films, artifacts,
    globalSearch, loading, error,
    totalResources,
    setCharacters, setRaces, setLocations, setFilms, setArtifacts,
    setLoading, setError,
  }
})
