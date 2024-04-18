<template>
  <div class="container-fluid">
    <div class="vstack gap-5">
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
        <NuxtLink to="/cards" @click="startSession" class="btn btn-umanao">Prêt à commencer</NuxtLink>
        <button class="btn btn-danger" @click="resetSession">Reset la session</button>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import nuxtStorage from 'nuxt-storage/nuxt-storage'

const participantName = ref("");
const startSession = function () {
  nuxtStorage.localStorage.setData("player", participantName.value);
  this.$router.push("/cards");
}

const resetSession = function () {
  nuxtStorage.localStorage.clear();
  alert("La session est re-initialisé");
}

</script>