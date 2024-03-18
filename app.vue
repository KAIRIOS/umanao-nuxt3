<template>
  <div>
    <the-header />
    <NuxtPage />
  </div>
</template>

<script lang="ts">
import TheHeader from '~/components/TheHeader.vue'

export default {
  components: { TheHeader }
}
</script>
