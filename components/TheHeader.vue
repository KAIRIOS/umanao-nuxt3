<script setup lang="ts">
import { useFetch } from 'nuxt/app'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const { logUserOut } = useAuthStore()
const token = useCookie('token');
const router = useRouter()

async function testApi() {
  try {
    const { data } = await useFetch('/api/health/ping')
    console.log('Result ping :', data?.value)
  } catch(e) {
    console.log('Result ping error : ', e)
  }
}

async function testApiDistant() {
  try {
    const { data } = await useFetch('apiDistant/health/ping')
    console.log('Result ping distant :', data?.value)
  } catch(e) {
    console.log('Result ping distant error : ', e)
  }
}

async function logout() {
  logUserOut()
  await navigateTo("/login")
}

function goHome() {
  router.push("/");
}
</script>

<template>
  <div class="container-fluid hstack align-items-center my-4">
    <div class="hstack gap-2 position-absolute">
      <button class="btn btn-umanao" @click="goHome">Accueil</button>
      <button class="btn btn-umanao" @click="testApi">Test API Local</button>
      <button class="btn btn-umanao" @click="testApiDistant">Test API Distant</button>
    </div>
    <div class="hstack gap-2 position-absolute pe-3" style="right: 0">
      <NuxtLink v-if="!token" to="/login" class="btn btn-umanao">Se connecter</NuxtLink>
      <button v-if="token" class="btn btn-danger" @click="logout">Se déconnecter</button>
    </div>
    <NuxtLink to="/" class="imageCenter">
      <img src="~/assets/images/logo-umanao.png" alt="logo Umanao" width="180px" >
    </NuxtLink>

  </div>
</template>

<style lang="scss">
.imageCenter {
  display: flex;
  margin: 0 auto;
}
</style>