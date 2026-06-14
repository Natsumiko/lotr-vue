<script setup lang="ts">
const route = useRoute()
const api = useApi()
const id = Number(route.params.id)

const { data: race, status } = await useAsyncData(
  `race-${id}`,
  () => api.fetchRace(id)
)

if (!race.value && status.value !== 'pending') {
  throw createError({ statusCode: 404, statusMessage: 'Race not found' })
}

// Charge les personnages de cette race
const { data: characters } = await useAsyncData(
  `race-${id}-characters`,
  () => api.fetchCharacters({ raceId: id, size: 6 })
)

useSeoMeta({
  title: () => race.value?.name ?? 'Race',
  description: () => race.value?.description?.slice(0, 160) ?? '',
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">

    <NuxtLink to="/races" class="text-parchment-500 hover:text-gold text-sm mb-6 inline-block">
      ← Back to Races
    </NuxtLink>

    <div v-if="status === 'pending'" class="space-y-4">
      <div class="skeleton h-10 w-1/2" />
      <div class="skeleton h-32 w-full" />
    </div>

    <div v-else-if="race" class="animate-fade-in">

      <div class="flex items-start gap-4 mb-6">
        <span class="text-5xl">🛡️</span>
        <div>
          <h1 class="font-display text-3xl md:text-4xl text-gold mb-1">{{ race.name }}</h1>
          <p v-if="race.origin" class="text-ancient-400">{{ race.origin }}</p>
        </div>
      </div>

      <section v-if="race.description" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Description</span></h2>
        <p class="text-parchment-200 leading-relaxed">{{ race.description }}</p>
      </section>

      <section class="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <div class="stat-row"><span class="stat-label">Average lifespan</span><span class="stat-value">{{ race.averageLifespan ?? '—' }}</span></div>
      </section>

      <section v-if="race.notableTraits" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Notable Traits</span></h2>
        <p class="text-parchment-200 leading-relaxed">{{ race.notableTraits }}</p>
      </section>

      <section v-if="characters?.results.length" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Notable Members</span></h2>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="char in characters.results"
            :key="char.id"
            :to="`/characters/${char.id}`"
            class="type-badge--gold hover:bg-parchment-800"
          >
            🧝 {{ char.name }}
          </NuxtLink>
        </div>
      </section>

    </div>
  </div>
</template>
