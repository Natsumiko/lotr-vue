<script setup lang="ts">
const route = useRoute()
const api = useApi()
const id = Number(route.params.id)

const { data: film, status } = await useAsyncData(
  `film-${id}`,
  () => api.fetchFilm(id)
)

if (!film.value && status.value !== 'pending') {
  throw createError({ statusCode: 404, statusMessage: 'Film not found' })
}

useSeoMeta({
  title: () => film.value?.title ?? 'Film',
  description: () => film.value?.synopsis?.slice(0, 160) ?? '',
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">

    <NuxtLink to="/films" class="text-parchment-500 hover:text-gold text-sm mb-6 inline-block">
      ← Back to Films & Books
    </NuxtLink>

    <div v-if="status === 'pending'" class="space-y-4">
      <div class="skeleton h-10 w-1/2" />
      <div class="skeleton h-32 w-full" />
    </div>

    <div v-else-if="film" class="animate-fade-in">

      <div class="flex items-start gap-4 mb-6">
        <span class="text-5xl">{{ film.type === 'FILM' ? '🎬' : '📖' }}</span>
        <div>
          <h1 class="font-display text-3xl md:text-4xl text-gold mb-1">{{ film.title }}</h1>
          <p v-if="film.director" class="text-ancient-400">{{ film.director }}</p>
          <span class="type-badge--gold mt-2 inline-block">{{ film.type }} · {{ film.releaseYear }}</span>
        </div>
      </div>

      <section v-if="film.synopsis" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Synopsis</span></h2>
        <p class="text-parchment-200 leading-relaxed">{{ film.synopsis }}</p>
      </section>

      <section class="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <div class="stat-row"><span class="stat-label">Release year</span><span class="stat-value">{{ film.releaseYear ?? '—' }}</span></div>
        <div class="stat-row"><span class="stat-label">Runtime</span><span class="stat-value">{{ film.runtimeMinutes ? `${film.runtimeMinutes} min` : '—' }}</span></div>
      </section>

      <section v-if="film.locations.length" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Locations</span></h2>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="loc in film.locations"
            :key="loc.id"
            :to="`/locations/${loc.id}`"
            class="type-badge--forest hover:bg-forest-900"
          >
            🗺️ {{ loc.name }}
          </NuxtLink>
        </div>
      </section>

    </div>
  </div>
</template>
