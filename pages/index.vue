<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

const { $api } = useNuxtApp();

const exercices = await $api('/api/exercice')
console.log('Exercices :', exercices)

</script>

<template>
  <div class="container-fluid">
    Accueil
  </div>
</template>
