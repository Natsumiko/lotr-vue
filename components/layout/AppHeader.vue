<script setup lang="ts">
const isMenuOpen = ref(false)

const navItems = [
  { to: '/characters', label: 'Characters', icon: '🧝' },
  { to: '/races',      label: 'Races',      icon: '🛡️' },
  { to: '/locations',  label: 'Locations',  icon: '🗺️' },
  { to: '/films',      label: 'Films',      icon: '🎬' },
  { to: '/artifacts',  label: 'Artifacts',  icon: '💍' },
]
</script>

<template>
  <header class="sticky top-0 z-50 bg-ancient-950/95 backdrop-blur-sm border-b border-ancient-700">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <span class="text-2xl">💍</span>
        <span class="font-display text-xl text-parchment-400 group-hover:text-gold transition-colors">
          LOTR API
        </span>
      </NuxtLink>

      <!-- Nav desktop -->
      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="font-display text-sm text-parchment-400 hover:text-gold transition-colors"
          active-class="text-parchment-300"
        >
          {{ item.icon }} {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Burger mobile -->
      <button
        class="md:hidden text-parchment-400 text-2xl"
        :aria-label="isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        @click="isMenuOpen = !isMenuOpen"
      >
        {{ isMenuOpen ? '✕' : '☰' }}
      </button>
    </div>

    <!-- Nav mobile -->
    <nav
      v-if="isMenuOpen"
      class="md:hidden border-t border-ancient-700 px-4 py-3 flex flex-col gap-3 animate-slide-up"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="font-display text-parchment-400 hover:text-gold transition-colors"
        @click="isMenuOpen = false"
      >
        {{ item.icon }} {{ item.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
