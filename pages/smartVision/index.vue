<script setup lang="ts">
definePageMeta({
  name: 'smartVision',
  middleware: 'auth'
})

import nuxtStorage from 'nuxt-storage/nuxt-storage'

const { $api, $notify } = useNuxtApp();
const { isGranted } = useUserStore()

const results = ref([])

const init = async () => {
  try {
    // TODO: peut être à améliorer car id en dur
    results.value = await $api('exercice/result/1')
  } catch(e) {
    if (e.response?._data?.error_description) {
      $notify('error', e.response._data.error_description)
      if (e?.response?.status === 403) navigateTo('/')
    } else {
      $notify('error', 'Erreur lors de la sauvegarde du résultat')
    }
  }
}

const participantName = ref("");
const startSession = function () {
  nuxtStorage.localStorage.setData("player", participantName.value);
  navigateTo("/smartVision/card");
}

const resetSession = function () {
  nuxtStorage.localStorage.clear();
  alert("La session est re-initialisé");
}

onMounted(() => {
  if (!isGranted('ROLE_ADMIN')) {
    init()
  }
})
</script>

<template>
  <div class="container-fluid">
    <div v-if="results.length > 0" class="vstack gap-5">
      <div class="vstack gap-3">
        <h3>UMANAO SMART VISION®</h3>
        <div class="vstack gap-3">
          <span>Merci d'avoir participé a cet exercice.</span>
        </div>
      </div>
    </div>
    <div v-else class="vstack gap-5">
      <div class="vstack gap-3">
        <h3>UMANAO SMART VISION®</h3>
        <div class="vstack gap-3">
          <span>Bienvenue dans l'interface de tri et de classement des cartes  !</span>
          <div class="vstack gap-1">
            <span>🎯 Votre mission : trier et classer des cartes en fonction de vos idées.</span>
            <span>⏰ Le temps requis : variable selon les personnes, entre 15' et 45' en moyenne.</span>
            <span>⚠ Le pré-requis : être dans un endroit calme où vous ne serez pas dérangé ou sollicité pendant la durée de du tri et du classement.</span>
            <span>🔏 Confidentialité : totale. Aucune donnée individuelle n'est communiquée à quiconque.</span>
            <span>🔎 Les consignes sont données avant chacune des 3 étapes.</span>
          </div>
          <span>🚀 A vous de jouer !</span>
        </div>
      </div>
      <div class="hstack gap-3">
        <div class="form-group ">
          <input v-model="participantName" class="form-control" id="participant" placeholder="Participant" />
        </div>
        <button class="btn btn-umanao" @click="startSession">Prêt à commencer</button>
        <button class="btn btn-danger" @click="resetSession">Reset la session</button>
      </div>
    </div>
  </div>
</template>