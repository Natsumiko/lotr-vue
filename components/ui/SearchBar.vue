<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function reset() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="relative">
    <input
      type="text"
      class="search-input pr-10"
      :placeholder="placeholder ?? 'Search...'"
      :value="modelValue"
      @input="onInput"
    />
    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-ancient-500">
      🔍
    </span>
    <button
      v-if="modelValue"
      class="absolute right-9 top-1/2 -translate-y-1/2 text-ancient-500 hover:text-parchment-400"
      aria-label="Clear search"
      @click="reset"
    >
      ✕
    </button>
  </div>
</template>
