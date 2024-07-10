<script setup lang="ts">
import { USER_ROLES } from '~/constants/userRole.js'
import { useUserStore } from '#imports'
import Loading from '~/components/Ui/Loading.vue'
import Button from '~/components/Ui/Button.vue'
import ModalUpdatePassword from '~/components/Profil/ModalUpdatePassword.vue'

const { user } = storeToRefs(useUserStore())
const { setUser } = useUserStore()
const { $api, $notify } = useNuxtApp()
const loading = ref(false)
const loadingUpdate = ref(false)
const showUpdate = ref(false)

const form = ref({
  id: null,
  name: null,
  firstname: null,
  email: null,
  society: null,
  active: false,
  roles: null,
})
const init = async () => {
  try {
    loading.value = true
    form.value = await $api(`user/${user.value.id}`)
  } catch (e) {
    $notify('error', "Erreur lors de la récupération de l'utilisateur")
  } finally {
    loading.value = false
  }
}

const updateUser = async () => {
  try {
    loadingUpdate.value = true
    const userUpdated = await $api(`user/${user.value.id}`, {
      method: 'PUT',
      body: form.value,
    })
    setUser(userUpdated)
    $notify('success', 'Utilisateur modifié avec succès')
  } catch (e) {
    $notify('error', "Erreur lors de la modification de l'utilisateur")
  } finally {
    loadingUpdate.value = false
  }
}

const openModalUpdatePassword = () => {
  console.log('open modal update password')
  showUpdate.value = true
}

onMounted(() => {
  init()
})

</script>

<template>
  <div class="container-fluid">
    <Loading v-if="loading" />
    <div v-else>
      <h5 class="text-center mb-3">Mon profil</h5>

      <div class="m-auto" style="width: 550px">
        <div class="border p-4" style="border-radius: 4px">
          <div class="vstack gap-2">
            <div class="row g-3">
              <div class="col-6 title">
                <span class="name">Nom</span>
              </div>
              <div class="col-6">
                <input v-model="form.name" class="form-control" type="text" />
              </div>

              <div class="col-6 title">
                <span class="name">Prénom</span>
              </div>
              <div class="col-6">
                <input v-model="form.firstname" class="form-control" type="text" />
              </div>

              <div class="col-6 title">
                <span class="name">Email</span>
              </div>
              <div class="col-6">
                <input v-model="form.email" class="form-control" type="email" />
              </div>

              <div class="col-6 title">
                <span class="name">Société</span>
              </div>
              <div class="col-6">
                <input v-model="form.societyName" class="form-control" type="text" disabled />
              </div>

              <div class="col-6 title">
                <span class="name">Role</span>
              </div>
              <div class="col-6">
                <input v-model="USER_ROLES[form?.roles]" class="form-control" type="text" disabled />
              </div>
            </div>
            <div class="hstack justify-content-between gap-2 mt-3">
              <Button class="btn-umanao" label="Modifier mot de passe" @click="openModalUpdatePassword" />
              <div>
                <Button class="btn-umanao" label="Modifier" @click="updateUser" :disabled="loadingUpdate" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalUpdatePassword :id-user="user.id" :show="showUpdate" @close="showUpdate = false" />
    </div>
  </div>
</template>

<style lang="scss">
.title {
  position: relative;

  & .name {
    position: absolute;
    top: 20%;
  }
}
</style>
