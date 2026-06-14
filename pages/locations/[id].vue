<script setup lang="ts">
const route = useRoute()
const api = useApi()
const id = Number(route.params.id)

const { data: location, status } = await useAsyncData(
  `location-${id}`,
  () => api.fetchLocation(id)
)

if (!location.value && status.value !== 'pending') {
  throw createError({ statusCode: 404, statusMessage: 'Location not found' })
}

useSeoMeta({
  title: () => location.value?.name ?? 'Location',
  description: () => location.value?.description?.slice(0, 160) ?? '',
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">

    <NuxtLink to="/locations" class="text-parchment-500 hover:text-gold text-sm mb-6 inline-block">
      ← Back to Locations
    </NuxtLink>

    <div v-if="status === 'pending'" class="space-y-4">
      <div class="skeleton h-10 w-1/2" />
      <div class="skeleton h-32 w-full" />
    </div>

    <div v-else-if="location" class="animate-fade-in">

      <div class="flex items-start gap-4 mb-6">
        <span class="text-5xl">🗺️</span>
        <div>
          <h1 class="font-display text-3xl md:text-4xl text-gold mb-1">{{ location.name }}</h1>
          <div class="flex gap-2 mt-2">
            <span class="type-badge--forest">{{ location.type }}</span>
            <NuxtLink
              v-if="location.parentLocation"
              :to="`/locations/${location.parentLocation.id}`"
              class="type-badge--gold hover:bg-parchment-800"
            >
              📍 {{ location.parentLocation.name }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <section v-if="location.description" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Description</span></h2>
        <p class="text-parchment-200 leading-relaxed">{{ location.description }}</p>
      </section>

      <section class="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <div class="stat-row"><span class="stat-label">Region</span><span class="stat-value">{{ location.region ?? '—' }}</span></div>
        <div class="stat-row"><span class="stat-label">Climate</span><span class="stat-value">{{ location.climate ?? '—' }}</span></div>
      </section>

      <section v-if="location.subLocations.length" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Sub-locations</span></h2>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="sub in location.subLocations"
            :key="sub.id"
            :to="`/locations/${sub.id}`"
            class="type-badge--forest hover:bg-forest-900"
          >
            🗺️ {{ sub.name }}
          </NuxtLink>
        </div>
      </section>

    </div>
  </div>
</template>
