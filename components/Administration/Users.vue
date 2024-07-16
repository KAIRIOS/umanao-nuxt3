<script setup lang="ts">
import Button from '~/components/Ui/Button.vue'
import { USER_ROLES } from '~/constants/userRole.js'
import Loading from '~/components/Ui/Loading.vue'

const { $api } = useNuxtApp();
const emit = defineEmits(['edit', 'delete'])
let users = ref([])

const isLoading = reactive({
  loading: false
})

const init = async () => {
  try {
    isLoading.loading = true
    users.value = await $api('user')
  } catch (e) {
    if (e.response?._data?.error_description) {
      $notify('error', e.response._data.error_description)
      if (e?.response?.status === 403) navigateTo('/')
    } else {
      $notify('error', 'Erreur lors de la récupération des utilisateurs')
    }
  } finally {
    isLoading.loading = false
  }
}

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
        <th>Prénom</th>
        <th>Actif</th>
        <th>Société</th>
        <th>Roles</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="users.length === 0">
        <td  colspan="6" class="text-center">
          <span>Aucun résultat</span>
        </td>
      </tr>
      <tr v-for="user in users">
        <td>{{ user?.name }}</td>
        <td>{{ user?.firstname }}</td>
        <td>{{ user?.active ? 'Actif' : 'Non Actif' }}</td>
        <td>{{ user?.societyName }}</td>
        <td>{{ user?.roles ? USER_ROLES[user?.roles] : ''}}</td>
        <td style="width: 100px">
          <div class="hstack gap-2">
            <Button class="btn-umanao" small icon="fas fa-edit" @click="emit('edit', user.id)" />
            <Button class="btn-danger" small icon="fas fa-trash" @click="emit('delete', user.id)" />
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>