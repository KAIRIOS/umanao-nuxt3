<script setup lang="ts">
definePageMeta({
  name: 'home',
  middleware: 'auth'
})
import { useUserStore } from '~/stores/user'
import { repository } from '~/tools/repository'
import Loading from '~/components/Ui/Loading.vue'

const { $notify } = useNuxtApp()
const exercices = ref([])
const isLoading = reactive({
  loading: false
})

const { user } = storeToRefs(useUserStore())
const { $api } = useNuxtApp()

const init = async () => {
  try {
    isLoading.loading = true
    exercices.value = await $api('exercice')
  } catch (e) {
    if (e?.response?.status === 403) {
      $notify('error', "Vous n'avez pas les droits pour accéder à cette page")
      navigateTo('/')
    } else {
      $notify('error', 'Erreur lors de la récupération des exercices')
    }
  } finally {
    isLoading.loading = false
  }
}

onMounted(() => {
  init()
})

</script>

<template>
  <div class="container-fluid">
    <Loading v-if="isLoading.loading" />
    <div v-else>
      <div class="hstack gap-2">
        <div v-if="exercices">
          <NuxtLink v-for="exercice in exercices" :key="exercice.id" :to="exercice.link" class="btn btn btn-primary">
            {{ exercice.libelle }}
          </NuxtLink>
        </div>
      </div>
    </div>

  </div>
</template>
