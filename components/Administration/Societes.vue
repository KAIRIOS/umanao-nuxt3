<script setup lang="ts">
import Button from '~/components/Ui/Button.vue'
import Loading from '~/components/Ui/Loading.vue'

const emit = defineEmits(['edit', 'delete'])
const { $notify, $api } = useNuxtApp()
let societes = ref([])

const isLoading = reactive({
  loading: true
})

// Fonction
const init = async () => {
  try {
    isLoading.loading = true
    societes.value = await $api('society')
  } catch (e) {
    if (e?.response?.status === 403) {
      $notify('error', "Vous n'avez pas les droits pour accéder à cette page")
      navigateTo('/')
    } else {
      $notify('error', 'Erreur lors de la récupération des sociétés')
    }
  } finally {
    isLoading.loading = false
  }
}
// End Fonction

onMounted(() => {
  init()
})

defineExpose({
  init,
})

</script>

<template>
  <div>
    <Loading v-if="isLoading.loading" />
    <table v-else class="table vertical-middle">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Siret</th>
        <th>Adresse</th>
        <th>Code postal</th>
        <th>Ville</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="societes.length === 0">
        <td  colspan="5" class="text-center">
          <span>Aucun résultat</span>
        </td>
      </tr>
      <tr v-for="society in societes" :key="society.id">
        <td>{{ society?.name }}</td>
        <td>{{ society?.siret }}</td>
        <td>{{ society?.adresse }}</td>
        <td>{{ society?.zipCode }}</td>
        <td>{{ society?.city }}</td>
        <td style="width: 100px">
          <div class="hstack gap-2">
            <Button class="btn-umanao" small icon="fas fa-edit" @click="emit('edit', society.id)" />
            <Button class="btn-danger" small icon="fas fa-trash" @click="emit('delete', society.id)" />
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>