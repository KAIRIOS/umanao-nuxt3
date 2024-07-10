<script setup lang="ts">
import Modal from '~/components/Ui/Modal.vue'
import Button from '~/components/Ui/Button.vue'
import { useUserStore } from '~/stores/user'

const props = defineProps<{
  show: Boolean
  idUser: Number
}>()
const emit = defineEmits(['close', 'update'])
const { show, idUser } = toRefs(props)
const { $api, $notify } = useNuxtApp()
const { user } = useUserStore()

const form = ref({
  oldPassword: null,
  newPassword: null,
  confirmPassword: null,
})

const updateOk = ref(false)
const message = ref(null)
const loading = ref(false)

const handleUpdatePassword = () => {
  console.log('here')
  if (!form.value.oldPassword) {
    message.value = 'Veuillez renseigner votre mot de passe actuel'
    return
  }
  if (!form.value.newPassword) {
    message.value = 'Veuillez renseigner votre nouveau mot de passe'
    return
  }
  if (!form.value.confirmPassword) {
    message.value = 'Veuillez confirmer votre nouveau mot de passe'
    return
  }
  if (form.value.oldPassword === form.value.newPassword) {
    message.value = 'Votre nouveau mot de passe doit être différent de votre mot de passe actuel'
    return
  }
  if (form.value.newPassword !== form.value.confirmPassword) {
    message.value = 'Votre nouveau mot de passe et votre confirmation de mot de passe ne correspondent pas'
    return
  }
  message.value = null
  updatePassword()
}

const updatePassword = async () => {
  try {
    loading.value = true
    const response = await $api(`user/password/${user.id}`, {
      method: 'PUT',
      body: form.value,
    })
    // On reset les champs
    form.value.oldPassword = null
    form.value.newPassword = null
    form.value.confirmPassword = null
    $notify('success', 'Le mot de passe a été modifié avec succès')
    emit('close')
  } catch (e) {
    $notify('error', 'Une erreur est survenue lors de la modification de votre mot de passe')
  } finally {
    loading.value = false
  }




}

</script>

<template>
  <Modal :show="show" @close="emit('close')">
    <template #header>
      <h5 class="modal-title">Modification du mot de passe</h5>
    </template>

    <div class="vstack gap-3">
      <div v-if="message" class="bg-danger-subtle p-3" style="border-radius: 4px;">
        {{ message }}
      </div>
      <div v-if="updateOk" class="bg-info-subtle p-3" style="border-radius: 4px;">
        Votre mot de passe a été modifié avec succès. Vous allez être déconnecté.
      </div>

      <div class="vstack gap-2">
        <span>Mot de passe actuel</span>
        <input v-model="form.oldPassword" class="form-control" type="password" />
      </div>
      <div class="vstack gap-2">
        <span>Nouveau mot de passe</span>
        <input v-model="form.newPassword" class="form-control" type="password" />
      </div>
      <div class="vstack gap-2">
        <span>Confirmer nouveau mot de passe</span>
        <input v-model="form.confirmPassword" class="form-control" type="password" />
      </div>
    </div>

    <template #footer>
      <Button
        class="btn-umanao"
        label="Modifier"
        :disabled="loading"
        @click="handleUpdatePassword"
      />
    </template>
  </Modal>
</template>
