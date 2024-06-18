<script lang="ts" setup>
import { useFetch } from 'nuxt/app'

const token = useCookie('token')
if (!token.value) {
  navigateTo('/auth/login')
}

const exercices = await $fetch('/api/exercice', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token.value}`
  }
})
console.log('Exercices :', exercices)

</script>

<template>
  <div class="container-fluid">
    Accueil
  </div>
</template>
