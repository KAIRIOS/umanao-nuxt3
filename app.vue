<script lang="ts" setup>
const maintenance = ref(process.env.MAINTENANCE)
definePageMeta({
  middleware: 'auth'
})
</script>


<template>
  <div v-if="maintenance" class="hstack justify-content-center" style="height: 100dvh">
    <h1>Site en maintenance</h1>
  </div>
  <div v-else>
    <the-header />
    <NuxtPage />
  </div>
</template>