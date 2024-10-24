<script setup lang="ts">
definePageMeta({
  name: 'administration',
  middleware: 'auth'
})

import { reactive } from "vue"
import Modal from '~/components/Ui/Modal.vue'
import Button from '~/components/Ui/Button.vue'

const idSociety = ref(null)
const idUser = ref(null)
const adminSociety = ref(null)
const adminUser = ref(null)
const isDelete = ref(false)
const isReset = ref(false)
const message = ref(null)
const { $notify, $api } = useNuxtApp()
const { isGranted } = useUserStore()

const showModal = reactive({
  society: false,
  user: false,
  reset: false,
  delete: false,
})

// Fonctions
const initSociety = () => {
  adminSociety.value.init()
  idSociety.value = null
}

const initUser = () => {
  adminUser.value.init()
  idUser.value = null
}

const handleOpenModalSociety = () => {
  idSociety.value = null
  showModal.society = true
}

const handleOpenModalUser = () => {
  idUser.value = null
  showModal.user = true
}

const handleCloseModalReset = (forReset = false) => {
  isReset.value = forReset
  showModal.reset = false
} 

const handleCloseModalDelete = (forDelete = false) => {
  isDelete.value = forDelete
  showModal.delete = false
}

const editSociety = (id) => {
  if (id) {
    idSociety.value = id
    showModal.society = true
  }
}

const editUser = (id) => {
  if (id) {
    idUser.value = id
    showModal.user = true
  }
}

const resetPassword = async (idUser) => {
  try {
    await $api(`user/reset-password/${idUser}` )
    $notify('success', "L'email a été envoyé à l'utilisateur")
    initUser()
  } catch (e) {
    if (e.response?._data?.error_description) {
      $notify('error', e.response._data.error_description[0])
    } else {
      $notify('error', "Erreur lors du reset du password de l'utilisateur")
    }
  }
}

const handleDeleteSociety = (id) => {
  idSociety.value = id
  showModal.delete = true
  message.value = 'Vous êtes sûr de vouloir supprimer cette société ?'
}

const handleResetPassword = (id) => {
  idUser.value = id
  showModal.reset = true
}

const handleDeleteUser = (id) => {
  idUser.value = id
  showModal.delete = true
  message.value = 'Vous êtes sûr de vouloir supprimer cet utilisateur ?'
}

const deleteSociety = async (idSociety) => {
  try {
    await $api(`society`, {
      method: 'DELETE',
      body: JSON.stringify({ id: idSociety }),
    })
    initSociety()
    initUser()
  } catch (e) {
    if (e.response?._data?.error_description) {
      $notify('error', e.response._data.error_description[0])
    } else {
      $notify('error', 'Erreur lors de la suppression de la société')
    }
  } finally {
    initValue()
  }
}

const deleteUser = async (idUser) => {
  try {
    await $api(`user`, {
      method: 'DELETE',
      body: JSON.stringify({ id: idUser })
    })
    initUser()
  } catch (e) {
    if (e.response?._data?.error_description) {
      $notify('error', e.response._data.error_description[0])
    } else {
      $notify('error', "Erreur lors de la suppression de l'utilisateur")
    }
  } finally {
    initValue()
  }
}

const initValue = () => {
  idSociety.value = null
  idUser.value = null
  isDelete.value = false
  isReset.value = false
}
// End Fonctions

watch(() => isDelete.value, async (value) => {
  if (!value) {
    return
  }

  if (value && idSociety.value) await deleteSociety(idSociety.value)
  if (value && idUser.value) await deleteUser(idUser.value)
})

watch(() => isReset.value, async (value) => {
  if (!value) return 

  if (idUser.value) await resetPassword(idUser.value)
})
</script>

<template>
  <div class="container-fluid">
    <h5 class="text-center">Administration</h5>

    <AdministrationNavbar
      @open-modal-society="handleOpenModalSociety"
      @open-modal-user="handleOpenModalUser"
    />

    <div class="tab-content" id="myTabContent">
      <div v-if="isGranted('ROLE_ADMIN')" id="societies-tab-pane" class="tab-pane fade" :class="{ active: isGranted('ROLE_ADMIN'), show: isGranted('ROLE_ADMIN') }" role="tabpanel" aria-labelledby="societies-tab" tabindex="0">
        <AdministrationSocietes
          ref="adminSociety"
          @edit="editSociety($event)"
          @delete="handleDeleteSociety($event)"
        />
      </div>
      <div id="users-tab-pane" class="tab-pane fade" :class="{ active: isGranted('ROLE_MODERATOR'), show: isGranted('ROLE_MODERATOR') }" role="tabpanel" aria-labelledby="users-tab" tabindex="0">
        <AdministrationUsers
          ref="adminUser"
          @edit="editUser($event)"
          @reset-password="handleResetPassword($event)"
          @delete="handleDeleteUser($event)"
        />
      </div>
      <div id="exercices-tab-pane" class="tab-pane fade" :class="{ show: isGranted('ROLE_MODERATOR') }" role="tabpanel" aria-labelledby="exercices-tab" tabindex="0">
        <AdministrationExercices />
      </div>
    </div>

    <AdministrationModalAddSociety
      :show="showModal.society"
      :id-society="idSociety"
      @close="showModal.society = false"
      @created="initSociety"
      @updated="initSociety"
    />

    <AdministrationModalAddUser
      :show="showModal.user"
      :id-user="idUser"
      @close="showModal.user = false"
      @created="initUser"
      @updated="initUser"
    />

    <Modal :show="showModal.delete" :show-close="true" @close="handleCloseModalDelete">
      <template #header>
        <h5 class="modal-title">Confirmation de suppression</h5>
      </template>
      <div>
        <p>{{ message }}</p>
      </div>
      <template #footer>
        <Button class="btn-umanao" label="Valider" type="button" data-bs-dismiss="modal" @click="handleCloseModalDelete(true)" />
      </template>
    </Modal>

    <Modal :show="showModal.reset" :show-close="true" @close="handleCloseModalReset">
      <template #header>
        <h5 class="modal-title">Confirmation de reset de mot de passe</h5>
      </template>
      <div>
        <p>Un mail va être envoyé pour la réinitialisation du mot de passe</p>
      </div>
      <template #footer>
        <Button class="btn-umanao" label="Valider" type="button" data-bs-dismiss="modal" @click="handleCloseModalReset(true)" />
      </template>
    </Modal>
  </div>
</template>