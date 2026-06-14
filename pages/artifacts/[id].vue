<script setup lang="ts">
const route = useRoute()
const api = useApi()
const id = Number(route.params.id)

const { data: artifact, status } = await useAsyncData(
  `artifact-${id}`,
  () => api.fetchArtifact(id)
)

if (!artifact.value && status.value !== 'pending') {
  throw createError({ statusCode: 404, statusMessage: 'Artifact not found' })
}

useSeoMeta({
  title: () => artifact.value?.name ?? 'Artifact',
  description: () => artifact.value?.description?.slice(0, 160) ?? '',
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">

    <NuxtLink to="/artifacts" class="text-parchment-500 hover:text-gold text-sm mb-6 inline-block">
      ← Back to Artifacts
    </NuxtLink>

    <div v-if="status === 'pending'" class="space-y-4">
      <div class="skeleton h-10 w-1/2" />
      <div class="skeleton h-32 w-full" />
    </div>

    <div v-else-if="artifact" class="animate-fade-in">

      <div class="flex items-start gap-4 mb-6">
        <span class="text-5xl">💍</span>
        <div>
          <h1 class="font-display text-3xl md:text-4xl text-gold mb-1">{{ artifact.name }}</h1>
          <p v-if="artifact.creator" class="text-ancient-400">Created by {{ artifact.creator }}</p>
          <span v-if="artifact.type" class="type-badge--gold mt-2 inline-block">{{ artifact.type }}</span>
        </div>
      </div>

      <section v-if="artifact.description" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Description</span></h2>
        <p class="text-parchment-200 leading-relaxed">{{ artifact.description }}</p>
      </section>

      <section v-if="artifact.powers" class="mb-8">
        <h2 class="section-title mb-3"><span class="pr-3">Powers</span></h2>
        <p class="text-parchment-200 leading-relaxed">{{ artifact.powers }}</p>
      </section>

    </div>
  </div>
</template>
