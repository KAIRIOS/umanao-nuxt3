<template>
  <div class="container-fluid">
    <div class="vstack gap-5">
      <div class="vstack gap-3">
        <h3>Présentation</h3>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed pharetra orci. Nunc quis purus est. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Nulla enim orci, feugiat vel ligula eu, porttitor mollis
          velit. Vivamus pellentesque sit amet ex at porttitor. Cras a tempus nulla. Pellentesque convallis elit ut lorem
          fermentum, non suscipit odio suscipit. Integer nec ligula imperdiet, egestas nunc non, porta est. Sed tempus in
          elit et fermentum.
        </span>
      </div>
      <div class="hstack gap-3">
        <div class="form-group ">
          <input v-model="participantName" class="form-control" id="participant" placeholder="Participant" />
        </div>
        <NuxtLink to="/cards" @click="startSession" class="btn btn-primary">Prêt à commencer</NuxtLink>
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
  resetSession();
  nuxtStorage.localStorage.setData("player", participantName.value);
  this.$router.push("/cards");
}

const resetSession = function () {
  nuxtStorage.localStorage.clear();
  alert("La session est re-initialisé");
}

</script>