<script setup lang="ts">
const api = useApi()
const search = ref('')
const page = ref(0)
const pageSize = 12

const { data, status, refresh } = await useAsyncData(
  () => `characters-${page.value}-${search.value}`,
  () => api.fetchCharacters({ page: page.value, size: pageSize, name: search.value || undefined }),
  { watch: [page] }
)

// Debounce sur la recherche
let searchTimeout: ReturnType<typeof setTimeout>
watch(search, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 0
    refresh()
  }, 300)
})

useSeoMeta({
  title: 'Characters',
  description: 'Browse all characters from The Lord of the Rings — heroes, villains and creatures of Middle-earth.',
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <PageHeader
      emoji="🧝"
      title="Characters"
      description="Heroes, villains and every creature that walked through Middle-earth."
      :count="data?.count"
    />

    <UiSearchBar v-model="search" placeholder="Search by name (e.g. Frodo, Gandalf...)" class="mb-6 max-w-md" />

    <!-- Loading -->
    <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiSkeletonCard v-for="i in 6" :key="i" />
    </div>

    <!-- Empty -->
    <div v-else-if="!data?.results.length" class="text-center py-16 text-ancient-400">
      No characters found{{ search ? ` for "${search}"` : '' }}.
    </div>

    <!-- Results -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiResourceCard
        v-for="character in data.results"
        :key="character.id"
        :to="`/characters/${character.id}`"
        :title="character.name"
        :subtitle="character.race?.name"
        emoji="🧝"
        :stats="[
          { label: 'Gender', value: character.gender },
          { label: 'Birth', value: character.birthYear },
        ]"
        :badges="character.films.slice(0, 2).map(f => f.title)"
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
