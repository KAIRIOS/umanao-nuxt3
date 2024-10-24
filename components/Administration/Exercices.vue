<script setup lang="ts">
import Loading from '~/components/Ui/Loading.vue'
import Button from '~/components/Ui/Button.vue'

const { $api, $notify } = useNuxtApp();
const exercices = ref([])
const modalExercice = ref(false)
const idExercice = ref(null)
const libelleExercice = ref(null)
const isLoading = reactive({
  loading: false
})

const init = async () => {
  try {
    exercices.value = await $api('exercice')
  } catch (e) {
    if (e?.response?.status === 403) {
      $notify('error', "Vous n'avez pas les droits pour accéder à cette page")
      navigateTo('/')
    } else {
      $notify('error', 'Erreur lors de la récupération des exercices')
    }
  }
}

onMounted(() => {
  init()
})

const OpenModal = (exercice) => {
  modalExercice.value = true
  idExercice.value = exercice.id
  libelleExercice.value = exercice.libelle
}

</script>

<template>
  <Loading v-if="isLoading.loading" />
  <div v-else>
    <div class="hstack gap-2 mt-2">
      <div v-if="exercices" class="hstack gap-2">
        <Button 
          v-for="exercice in exercices" 
          :key="exercice.id" 
          class="btn-primary" 
          :label="exercice.libelle" 
          type="button"
          data-bs-dismiss="modal" 
          @click="OpenModal(exercice)"
        />
      </div>
    </div>

    <AdministrationModalExercice
      :show="modalExercice"
      :id-exercice="idExercice"
      :libelle-exercice="libelleExercice"
      @close="modalExercice = false"
    />
  </div>
</template>