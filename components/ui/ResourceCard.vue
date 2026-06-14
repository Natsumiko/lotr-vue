<script setup lang="ts">
interface Stat {
  label: string
  value: string | number | null | undefined
}

defineProps<{
  to: string
  title: string
  subtitle?: string | null
  emoji?: string
  stats?: Stat[]
  badges?: string[]
}>()
</script>

<template>
  <NuxtLink :to="to" class="lotr-card block group">
    <div class="flex items-start gap-3 mb-3">
      <span v-if="emoji" class="text-3xl flex-shrink-0">{{ emoji }}</span>
      <div class="flex-1 min-w-0">
        <h3 class="font-display text-lg text-parchment-300 group-hover:text-gold transition-colors truncate">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="text-sm text-ancient-400 truncate">{{ subtitle }}</p>
      </div>
    </div>

    <div v-if="stats?.length" class="space-y-0.5 mb-3">
      <div v-for="stat in stats" :key="stat.label" class="stat-row">
        <span class="stat-label">{{ stat.label }}</span>
        <span class="stat-value truncate ml-2">{{ stat.value ?? '—' }}</span>
      </div>
    </div>

    <div v-if="badges?.length" class="flex flex-wrap gap-2 mt-2">
      <span v-for="badge in badges" :key="badge" class="type-badge--gold">
        {{ badge }}
      </span>
    </div>
  </NuxtLink>
</template>
