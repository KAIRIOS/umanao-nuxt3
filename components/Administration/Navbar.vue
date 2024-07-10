<script setup>
import { reactive } from "vue"

const emit = defineEmits(['openModalSociety', 'openModalUser'])

// On veut récupérer la navigation active
let tabs = reactive({
  societe: true,
  users: false,
})

const changeActiveTab = (tab) => {
  tabs.societe = tab === 'societies'
  tabs.users = tab === 'users'
}

</script>

<template>
  <div class="hstack gap-2 justify-content-between">
    <ul class="nav nav nav-pills nav-fill" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active societies" id="home-tab" data-bs-toggle="tab" data-bs-target="#societies-tab-pane" type="button" role="tab" aria-controls="societies-tab-pane" aria-selected="true" @click="changeActiveTab('societies')">Sociétés</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link users" id="profile-tab" data-bs-toggle="tab" data-bs-target="#users-tab-pane" type="button" role="tab" aria-controls="users-tab-pane" aria-selected="false" @click="changeActiveTab('users')">Utilisateurs</button>
      </li>
    </ul>
    <div class="hstack gap-2">
      <button v-if="tabs.societe" class="btn btn-umanao" @click="emit('openModalSociety')">Ajouter une société</button>
      <button v-if="tabs.users" class="btn btn-umanao" @click="emit('openModalUser')">Ajouter un utilisateur</button>
    </div>
  </div>

</template>