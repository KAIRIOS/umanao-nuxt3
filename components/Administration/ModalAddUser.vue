<script setup lang="ts">
import Modal from '~/components/Ui/Modal.vue'
import { USER_ROLES } from '~/constants/userRole.js'

const props = defineProps<{
  show: Boolean
  idUser?: Number
}>()

const MODEL_USER = {
  id: null,
  name: null,
  firstname: null,
  email: null,
  society: null,
  active: false,
  roles: null,
}

const form = ref({})
const societies = ref([])
const emit = defineEmits(['close', 'created', 'updated'])
const { $api, $notify } = useNuxtApp()

const AddOrEditSociety = async () => {
  try {
    if (!form.value.name) return
    if (!form.value.email) return
    if (!form.value.society) return
    if (!form.value.roles.length) return

    if (props.idUser) {
      await $api(`user/${props.idUser}`, {
        method: 'PUT',
        body: form.value,
      })
      emit('updated')
    } else {
      await $api('user', {
        method: 'POST',
        body: form.value,
      })
      emit('created')
    }
    emit('close')
  } catch (e) {
    if (props.idUser) $notify('error', "Erreur lors de la modification de l'utilisateur", e)
    else $notify('error', "Erreur lors de la création de l'utilisateur", e)
  }
}

const getUser = async (idUser) => {
  form.value = await $api(`user/${idUser}`)
}
const getSocieties = async () => {
  const societes = await $api('society')
  societies.value = societes.map((society) => ({
    value: society.id,
    label: society.name,
  }))
}

watch(() => props.show, (value) => {
  if (value) {
    getSocieties()
    if (props.idUser) {
      getUser(props.idUser)
    } else {
      form.value = { ...MODEL_USER }
    }
  }
})
</script>

<template>
  <Modal :show="show" @close="emit('close')">
    <template #header>
      {{ props.idUser ? 'Modifier' : 'Ajouter' }} un utilisateur
    </template>

    <div class="row">
      <div class="col-6 mb-1">
        <div class="vstack gap-1">
          <span>Nom</span>
          <input v-model="form.name" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-6 mb-1">
        <div class="vstack gap-1">
          <span>Prénom</span>
          <input v-model="form.firstname" class="form-control" type="text" />
        </div>
      </div>

      <div class="col-6 mb-1">
        <div class="vstack gap-1">
          <span>Email</span>
          <input v-model="form.email" class="form-control" type="email" />
        </div>
      </div>
      <div class="col-6 mb-1 align-self-center">
        <div class="vstack gap-1">
          <span>Actif</span>
          <div class="form-check form-switch">
            <div class="form-check form-switch ps-0">
              <input
                v-model="form.active"
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                :checked="form.active"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 mb-1">
        <div class="vstack gap-1">
          <span>Société</span>
          <select v-model="form.society" class="form-select">
            <option v-for="society in societies" :value="society.value">
              {{ society.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-6 mb-1">
        <div class="vstack gap-1">
          <span>Rôle</span>
          <select v-model="form.roles" class="form-select">
            <option v-for="(role, index) in USER_ROLES" :value="index">
              {{ role }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        class="btn btn-umanao"
        data-bs-dismiss="modal"
        @click="AddOrEditSociety"
        :disabled="!form.name || form.email || form.society || form.roles.length"
      >
        {{ props.idUser ? 'Modifier' : 'Ajouter' }}
      </button>
    </template>
  </Modal>
</template>