<template>
  <div class="container-fluid hstack align-items-center my-4">
    <button class="btn btn-umanao position-absolute" @click="goHome">Accueil</button>
    <NuxtLink to="/" class="imageCenter">
      <img src="~/assets/images/logo-umanao.png" alt="logo Umanao" width="180px" >
    </NuxtLink>

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

<style lang="scss">
.imageCenter {
  display: flex;
  margin: 0 auto;
}
</style>