<script setup lang="ts">
const api = useApi()
const typeFilter = ref<'FILM' | 'BOOK' | ''>('')
const page = ref(0)
const pageSize = 12

const { data, status, refresh } = await useAsyncData(
  () => `films-${page.value}-${typeFilter.value}`,
  () => api.fetchFilms({ page: page.value, size: pageSize, type: typeFilter.value || undefined }),
  { watch: [page] }
)

watch(typeFilter, () => {
  page.value = 0
  refresh()
})

useSeoMeta({
  title: 'Films & Books',
  description: 'The Lord of the Rings films and the original books by J.R.R. Tolkien.',
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <PageHeader
      emoji="🎬"
      title="Films & Books"
      description="The trilogy and the source material that started it all."
      :count="data?.count"
    />

    <div class="flex gap-2 mb-6">
      <button
        :class="typeFilter === '' ? 'btn-gold' : 'btn-outline'"
        @click="typeFilter = ''"
      >
        All
      </button>
      <button
        :class="typeFilter === 'FILM' ? 'btn-gold' : 'btn-outline'"
        @click="typeFilter = 'FILM'"
      >
        🎬 Films
      </button>
      <button
        :class="typeFilter === 'BOOK' ? 'btn-gold' : 'btn-outline'"
        @click="typeFilter = 'BOOK'"
      >
        📖 Books
      </button>
    </div>

    <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiSkeletonCard v-for="i in 6" :key="i" />
    </div>

    <div v-else-if="!data?.results.length" class="text-center py-16 text-ancient-400">
      No entries found.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiResourceCard
        v-for="film in data.results"
        :key="film.id"
        :to="`/films/${film.id}`"
        :title="film.title"
        :subtitle="film.director"
        :emoji="film.type === 'FILM' ? '🎬' : '📖'"
        :stats="[
          { label: 'Year', value: film.releaseYear },
          { label: 'Runtime', value: film.runtimeMinutes ? `${film.runtimeMinutes} min` : null },
        ]"
        :badges="[film.type]"
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
