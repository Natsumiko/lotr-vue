<script setup lang="ts">
const navItems = [
  {
    to: '/characters',
    emoji: '🧝',
    title: 'Characters',
    description: 'Heroes, villains and creatures of Middle-earth',
  },
  {
    to: '/races',
    emoji: '🛡️',
    title: 'Races',
    description: 'Hobbits, Elves, Dwarves, Men and more',
  },
  {
    to: '/locations',
    emoji: '🗺️',
    title: 'Locations',
    description: 'From the Shire to the gates of Mordor',
  },
  {
    to: '/films',
    emoji: '🎬',
    title: 'Films & Books',
    description: 'The original trilogy and the source material',
  },
  {
    to: '/artifacts',
    emoji: '💍',
    title: 'Artifacts',
    description: 'Rings of power, blades and ancient relics',
  },
]

useSeoMeta({
  title: 'Home',
  description: 'Explore the world of Middle-earth through a free, open-source REST API.',
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-12">

    <!-- Hero -->
    <section class="text-center mb-16 animate-fade-in">
      <p class="divider-ornament justify-center text-parchment-600 mb-4 text-sm">
        <span class="px-3">The Lord of the Rings API</span>
      </p>
      <h1 class="font-display text-display-lg md:text-display-xl text-gold mb-4">
        Middle-earth,<br class="md:hidden"> at your fingertips
      </h1>
      <p class="text-ancient-300 max-w-xl mx-auto mb-8 text-lg">
        A free, open-source REST API exposing characters, races, locations,
        films and artifacts from J.R.R. Tolkien's legendarium — with all their relationships.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <NuxtLink to="/characters" class="btn-gold">
          Explore Characters
        </NuxtLink>
        <a
          href="https://lotr-api.info/swagger-ui.html"
          target="_blank"
          rel="noopener"
          class="btn-outline"
        >
          API Documentation
        </a>
      </div>
    </section>

    <!-- Resource grid -->
    <section>
      <h2 class="section-title mb-6">
        <span class="pr-3">Resources</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="lotr-card group"
        >
          <div class="text-4xl mb-3">{{ item.emoji }}</div>
          <h3 class="font-display text-xl text-parchment-300 group-hover:text-gold transition-colors mb-2">
            {{ item.title }}
          </h3>
          <p class="text-sm text-ancient-400">{{ item.description }}</p>
        </NuxtLink>
      </div>
    </section>

    <!-- Quote -->
    <section class="mt-16 text-center">
      <p class="lotr-quote inline-block">
        "Even the smallest person can change the course of the future."
      </p>
    </section>

  </div>
</template>
