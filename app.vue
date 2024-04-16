<template>
  <div v-if="maintenance" class="hstack justify-content-center" style="height: 100dvh">
    <h1>Site en maintenance</h1>
  </div>
  <div v-else>
    <the-header />
    <NuxtPage />
  </div>
</template>

<script lang="ts">
import TheHeader from '~/components/TheHeader.vue'

export default {
  components: { TheHeader },
  data() {
    return {
      maintenance: false
    }
  },
}
</script>
