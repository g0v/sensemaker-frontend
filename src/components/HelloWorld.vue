<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="text-center lg:text-left">
    <h1 class="text-4xl font-medium text-democratic-red relative -top-2.5 mb-4">{{ msg }}</h1>
    <h3 class="text-lg text-gray-700">
      You've successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener" class="text-democratic-red hover:underline">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener" class="text-democratic-red hover:underline">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
/* 保留一些自定義樣式，如果需要 */
</style>
