<template>
  <div class="container-fluid hstack align-items-center my-4">
    <button class="btn btn-primary position-absolute" @click="goHome">Accueil</button>
    <h1 class="flex-grow-1 text-center me-5">Projet UMANAO</h1>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>