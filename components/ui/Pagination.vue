<script setup lang="ts">
const props = defineProps<{
  page: number          // 0-based
  totalPages: number
}>()

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const visiblePages = computed(() => {
  const current = props.page
  const total = props.totalPages
  const pages: number[] = []

  // Affiche au max 5 pages centrées autour de la page courante
  let start = Math.max(0, current - 2)
  let end = Math.min(total - 1, start + 4)
  start = Math.max(0, end - 4)

  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

function goTo(p: number) {
  if (p >= 0 && p < props.totalPages) emit('update:page', p)
}
</script>

<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
    <button
      class="page-btn"
      :disabled="page === 0"
      :class="{ 'opacity-30 cursor-not-allowed': page === 0 }"
      aria-label="Previous page"
      @click="goTo(page - 1)"
    >
      ‹
    </button>

    <button
      v-for="p in visiblePages"
      :key="p"
      :class="p === page ? 'page-btn--active' : 'page-btn'"
      :aria-current="p === page ? 'page' : undefined"
      @click="goTo(p)"
    >
      {{ p + 1 }}
    </button>

    <button
      class="page-btn"
      :disabled="page === totalPages - 1"
      :class="{ 'opacity-30 cursor-not-allowed': page === totalPages - 1 }"
      aria-label="Next page"
      @click="goTo(page + 1)"
    >
      ›
    </button>
  </nav>
</template>
