<script setup lang="ts">
const route = useRoute()
const api = useApi()
const id = Number(route.params.id)

const { data: character, status } = await useAsyncData(
  `character-${id}`,
  () => api.fetchCharacter(id)
)

if (!character.value && status.value !== 'pending') {
  throw createError({ statusCode: 404, statusMessage: 'Character not found' })
}

useSeoMeta({
  title: () => character.value?.name ?? 'Character',
  description: () => character.value?.biography?.slice(0, 160) ?? '',
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">

    <NuxtLink to="/characters" class="text-parchment-500 hover:text-gold text-sm mb-6 inline-block">
      ← Back to Characters
    </NuxtLink>

    <div v-if="status === 'pending'" class="space-y-4">
      <div class="skeleton h-10 w-1/2" />
      <div class="skeleton h-32 w-full" />
    </div>

    <div v-else-if="character" class="animate-fade-in">

      <!-- Header -->
      <div class="flex items-start gap-4 mb-6">
        <span class="text-5xl">🧝</span>
        <div>
          <h1 class="font-display text-3xl md:text-4xl text-gold mb-1">{{ character.name }}</h1>
          <p v-if="character.aliases" class="text-ancient-400 italic">{{ character.aliases }}</p>
          <div class="flex gap-2 mt-2">
            <NuxtLink
              v-if="character.race"
              :to="`/races/${character.race.id}`"
              class="type-badge--gold hover:bg-parchment-800"
            >
              {{ character.race.name }}
            </NuxtLink>
            <NuxtLink
              v-if="character.birthLocation"
              :to="`/locations/${character.birthLocation.id}`"
              class="type-badge--forest hover:bg-forest-900"
            >
              📍 {{ character.birthLocation.name }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Quote -->
      <p v-if="character.notableQuote" class="lotr-quote mb-6">
        "{{ character.notableQuote }}"
      </p>

      <!-- Biography -->
      <section v-if="character.biography" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Biography</span></h2>
        <p class="text-parchment-200 leading-relaxed">{{ character.biography }}</p>
      </section>

      <!-- Stats -->
      <section class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Details</span></h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <div class="stat-row"><span class="stat-label">Gender</span><span class="stat-value">{{ character.gender ?? '—' }}</span></div>
          <div class="stat-row"><span class="stat-label">Birth</span><span class="stat-value">{{ character.birthYear ?? '—' }}</span></div>
          <div class="stat-row"><span class="stat-label">Death</span><span class="stat-value">{{ character.deathYear ?? '—' }}</span></div>
          <div class="stat-row"><span class="stat-label">Height</span><span class="stat-value">{{ character.height ?? '—' }}</span></div>
          <div class="stat-row"><span class="stat-label">Hair</span><span class="stat-value">{{ character.hairColor ?? '—' }}</span></div>
          <div class="stat-row"><span class="stat-label">Eyes</span><span class="stat-value">{{ character.eyeColor ?? '—' }}</span></div>
        </div>
      </section>

      <!-- Films -->
      <section v-if="character.films.length" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Appearances</span></h2>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="film in character.films"
            :key="film.id"
            :to="`/films/${film.id}`"
            class="type-badge--gold hover:bg-parchment-800"
          >
            🎬 {{ film.title }}
          </NuxtLink>
        </div>
      </section>

      <!-- Artifacts -->
      <section v-if="character.artifacts.length" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Artifacts</span></h2>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="artifact in character.artifacts"
            :key="artifact.id"
            :to="`/artifacts/${artifact.id}`"
            class="type-badge--forest hover:bg-forest-900"
          >
            💍 {{ artifact.name }}
          </NuxtLink>
        </div>
      </section>

      <!-- Allies -->
      <section v-if="character.allies.length" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Allies</span></h2>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="ally in character.allies"
            :key="ally.id"
            :to="`/characters/${ally.id}`"
            class="type-badge--gold hover:bg-parchment-800"
          >
            🧝 {{ ally.name }}
          </NuxtLink>
        </div>
      </section>

    </div>
  </div>
</template>
