<script setup lang="ts">
defineProps<{
  title: string
  emoji?: string
  description?: string
  count?: number
}>()
</script>

<template>
  <div class="mb-8 animate-fade-in">
    <h1 class="font-display text-3xl md:text-4xl text-parchment-300 mb-2 flex items-center gap-3">
      <span v-if="emoji">{{ emoji }}</span>
      {{ title }}
    </h1>
    <p v-if="description" class="text-ancient-400 max-w-2xl">{{ description }}</p>
    <p v-if="count !== undefined" class="text-sm text-ancient-500 mt-2">
      {{ count }} {{ count === 1 ? 'entry' : 'entries' }}
    </p>
  </div>
</template>
