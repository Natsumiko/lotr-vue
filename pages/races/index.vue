<script setup lang="ts">
const api = useApi()
const search = ref('')
const page = ref(0)
const pageSize = 12

const { data, status, refresh } = await useAsyncData(
  () => `races-${page.value}-${search.value}`,
  () => api.fetchRaces({ page: page.value, size: pageSize, name: search.value || undefined }),
  { watch: [page] }
)

let searchTimeout: ReturnType<typeof setTimeout>
watch(search, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 0
    refresh()
  }, 300)
})

useSeoMeta({
  title: 'Races',
  description: 'Discover the races of Middle-earth — Hobbits, Elves, Dwarves, Men, Maiar and Ents.',
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <PageHeader
      emoji="🛡️"
      title="Races"
      description="The peoples that shaped the history of Middle-earth."
      :count="data?.count"
    />

    <UiSearchBar v-model="search" placeholder="Search by name..." class="mb-6 max-w-md" />

    <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiSkeletonCard v-for="i in 6" :key="i" />
    </div>

    <div v-else-if="!data?.results.length" class="text-center py-16 text-ancient-400">
      No races found{{ search ? ` for "${search}"` : '' }}.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiResourceCard
        v-for="race in data.results"
        :key="race.id"
        :to="`/races/${race.id}`"
        :title="race.name"
        :subtitle="race.origin"
        emoji="🛡️"
        :stats="[
          { label: 'Lifespan', value: race.averageLifespan },
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
