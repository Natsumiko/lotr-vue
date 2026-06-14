// types/index.ts — Types TypeScript partagés entre toute l'app

export interface PageResponse<T> {
  results: T[]
  count: number
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface RaceSummary {
  id: number
  name: string
}

export interface LocationSummary {
  id: number
  name: string
  type: string
}

export interface FilmSummary {
  id: number
  title: string
  type: string
  releaseYear: number
}

export interface ArtifactSummary {
  id: number
  name: string
  type: string
}

export interface AllySummary {
  id: number
  name: string
  imageUrl: string | null
}

export interface Character {
  id: number
  name: string
  aliases: string | null
  biography: string | null
  gender: string | null
  birthYear: string | null
  deathYear: string | null
  hairColor: string | null
  eyeColor: string | null
  height: string | null
  notableQuote: string | null
  imageUrl: string | null
  race: RaceSummary | null
  birthLocation: LocationSummary | null
  films: FilmSummary[]
  artifacts: ArtifactSummary[]
  allies: AllySummary[]
  createdAt: string
  updatedAt: string
}

export interface Race {
  id: number
  name: string
  description: string | null
  origin: string | null
  averageLifespan: string | null
  notableTraits: string | null
  imageUrl: string | null
  createdAt: string
}

export interface Location {
  id: number
  name: string
  description: string | null
  type: string
  region: string | null
  climate: string | null
  imageUrl: string | null
  parentLocation: LocationSummary | null
  subLocations: LocationSummary[]
  createdAt: string
}

export interface Film {
  id: number
  title: string
  type: 'FILM' | 'BOOK'
  releaseYear: number | null
  director: string | null
  synopsis: string | null
  runtimeMinutes: number | null
  imageUrl: string | null
  sortOrder: number | null
  locations: LocationSummary[]
  createdAt: string
}

export interface Artifact {
  id: number
  name: string
  description: string | null
  type: string | null
  creator: string | null
  powers: string | null
  imageUrl: string | null
  createdAt: string
}

// Paramètres de recherche communs
export interface SearchParams {
  page?: number
  size?: number
  name?: string
}

export interface CharacterSearchParams extends SearchParams {
  raceId?: number
}

export interface LocationSearchParams extends SearchParams {
  type?: string
}

export interface FilmSearchParams extends SearchParams {
  type?: 'FILM' | 'BOOK'
}

export interface ArtifactSearchParams extends SearchParams {
  type?: string
}
