<script lang="ts" setup>
definePageMeta({
  name: 'home',
  middleware: 'auth'
})

import { repository } from '~/tools/repository'

const userRepo = repository()
const { data } = await useAsyncData(() => userRepo.getExercices())
const exercices = data.value
</script>

<template>
  <div class="container-fluid">
    <div class="hstack gap-2">
      <div v-if="exercices">
        <NuxtLink v-for="exercice in exercices" :key="exercice.id" :to="exercice.link" class="btn btn btn-primary">
          {{ exercice.libelle }}
        </NuxtLink>
      </div>
    </div>
  </div>
  <NuxtPage />
</template>
