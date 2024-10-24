<script setup>
import { reactive } from "vue"
import Button from '~/components/Ui/Button.vue'

const { isGranted } = useUserStore()
const emit = defineEmits(['openModalSociety', 'openModalUser'])

// On veut récupérer la navigation active
let tabs = reactive({
  societe: isGranted('ROLE_ADMIN'),
  users: isGranted('ROLE_MODERATOR'),
  exercices: isGranted('ROLE_MODERATOR'),
})

const changeActiveTab = (tab) => {
  tabs.societe = tab === 'societies'
  tabs.users = tab === 'users'
  tabs.exercices = tab === 'exercices'
}

</script>

<template>
  <div class="hstack gap-2 justify-content-between">
    <ul class="nav nav nav-pills nav-fill" id="myTab" role="tablist">
      <li v-if="isGranted('ROLE_ADMIN')" class="nav-item" role="presentation">
        <button
          class="nav-link societies"
          :class="{ active: isGranted('ROLE_ADMIN')}"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#societies-tab-pane"
          type="button"
          role="tab"
          aria-controls="societies-tab-pane"
          aria-selected="true"
          @click="changeActiveTab('societies')"
        >
          Sociétés
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link users"
          :class="{ active: isGranted('ROLE_MODERATOR')}"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#users-tab-pane"
          type="button"
          role="tab"
          aria-controls="users-tab-pane"
          aria-selected="false"
          @click="changeActiveTab('users')"
        >
          Utilisateurs
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link exercices"
          id="exercices-tab"
          data-bs-toggle="tab"
          data-bs-target="#exercices-tab-pane"
          type="button"
          role="tab"
          aria-controls="exercices-tab-pane"
          aria-selected="false"
          @click="changeActiveTab('exercices')"
        >
          Exercices
        </button>
      </li>
    </ul>
    <div class="hstack gap-2">
      <Button v-if="tabs.societe && isGranted('ROLE_ADMIN')" class="btn-umanao" label="Ajouter une société" icon="fas fa-add" @click="emit('openModalSociety')" />
      <Button v-if="tabs.users" class="btn-umanao" label="Ajouter un utilisateur" icon="fas fa-add" @click="emit('openModalUser')" />
    </div>
  </div>

</template>