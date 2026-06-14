<script setup lang="ts">
const api = useApi()
const search = ref('')
const typeFilter = ref('')
const page = ref(0)
const pageSize = 12

const { data, status, refresh } = await useAsyncData(
  () => `locations-${page.value}-${search.value}-${typeFilter.value}`,
  () => api.fetchLocations({
    page: page.value,
    size: pageSize,
    name: search.value || undefined,
    type: typeFilter.value || undefined,
  }),
  { watch: [page] }
)

let searchTimeout: ReturnType<typeof setTimeout>
watch([search, typeFilter], () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 0
    refresh()
  }, 300)
})

const typeOptions = ['Région', 'Cité', 'Forteresse', 'Montagne', 'Forêt / Royaume elfique', 'Cité souterraine', 'Cité fortifiée']

useSeoMeta({
  title: 'Locations',
  description: 'Explore the locations of Middle-earth — from the Shire to the gates of Mordor.',
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <PageHeader
      emoji="🗺️"
      title="Locations"
      description="From the peaceful Shire to the dark lands of Mordor."
      :count="data?.count"
    />

    <div class="flex flex-wrap gap-4 mb-6">
      <UiSearchBar v-model="search" placeholder="Search by name..." class="max-w-md flex-1" />
      <select v-model="typeFilter" class="search-input max-w-xs">
        <option value="">All types</option>
        <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>

    <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiSkeletonCard v-for="i in 6" :key="i" />
    </div>

    <div v-else-if="!data?.results.length" class="text-center py-16 text-ancient-400">
      No locations found{{ search ? ` for "${search}"` : '' }}.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiResourceCard
        v-for="location in data.results"
        :key="location.id"
        :to="`/locations/${location.id}`"
        :title="location.name"
        :subtitle="location.type"
        emoji="🗺️"
        :stats="[
          { label: 'Region', value: location.region },
          { label: 'Climate', value: location.climate },
        ]"
      />
    </div>

    <UiPagination
      v-if="data"
      :page="data.page"
      :total-pages="data.totalPages"
      @update:page="page = $event"
    />
  </div>
</template>
