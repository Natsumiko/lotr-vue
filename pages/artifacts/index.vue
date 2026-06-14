<script setup lang="ts">
const api = useApi()
const search = ref('')
const page = ref(0)
const pageSize = 12

const { data, status, refresh } = await useAsyncData(
  () => `artifacts-${page.value}-${search.value}`,
  () => api.fetchArtifacts({ page: page.value, size: pageSize, name: search.value || undefined }),
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
  title: 'Artifacts',
  description: 'Rings of power, ancient blades and relics from Middle-earth.',
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <PageHeader
      emoji="💍"
      title="Artifacts"
      description="Rings of power, legendary blades and relics of ancient craft."
      :count="data?.count"
    />

    <UiSearchBar v-model="search" placeholder="Search by name..." class="mb-6 max-w-md" />

    <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiSkeletonCard v-for="i in 6" :key="i" />
    </div>

    <div v-else-if="!data?.results.length" class="text-center py-16 text-ancient-400">
      No artifacts found{{ search ? ` for "${search}"` : '' }}.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiResourceCard
        v-for="artifact in data.results"
        :key="artifact.id"
        :to="`/artifacts/${artifact.id}`"
        :title="artifact.name"
        :subtitle="artifact.type"
        emoji="💍"
        :stats="[
          { label: 'Creator', value: artifact.creator },
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
