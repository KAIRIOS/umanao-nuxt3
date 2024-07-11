<script setup lang="ts">
import { useRouter } from '#app'
import Button from '~/components/Ui/Button.vue'

const { token } = storeToRefs(useUserStore())
const { isGranted, setUser, setToken } = useUserStore()

// async function testApi() {
//   try {
//     const { data } = await useFetch('/api/health/ping')
//     console.log('Result ping :', data?.value)
//   } catch(e) {
//     console.log('Result ping error : ', e)
//   }
// }
//
// async function testApiDistant() {
//   try {
//     const { data } = await useFetch('apiDistant/health/ping')
//     console.log('Result ping distant :', data?.value)
//   } catch(e) {
//     console.log('Result ping distant error : ', e)
//   }
// }

async function logout() {
  setUser()
  setToken()
  await navigateTo('/auth/login')
}

function goHome() {
  const router = useRouter()
  router.push("/");
}
</script>

<template>
  <div class="container-fluid hstack align-items-center my-3">
    <div class="hstack gap-2 position-absolute">
      <Button class="btn-umanao" label="Accueil" @click="goHome" />
<!--      <button class="btn btn-umanao" @click="testApi">Test API Local</button>-->
<!--      <button class="btn btn-umanao" @click="testApiDistant">Test API Distant</button>-->
    </div>
    <div class="hstack gap-2 position-absolute pe-3" style="right: 0">
<!--      <Button-->
<!--        class="btn-warning"-->
<!--        label="Bac à sable"-->
<!--        link="/bac"-->
<!--        icon="fas fa-flask"-->
<!--      />-->
      <Button
        v-if="!token"
        class="btn-umanao"
        label="Se connecter"
        link="/auth/login"
        icon="fas fa-sign-in-alt"
      />
      <Button
        v-if="token && isGranted('ROLE_ADMIN')"
        class="btn-umanao"
        label="Administration"
        link="/administration"
        icon="fas fa-cog"
      />
      <Button
        v-if="token"
        class="btn-umanao"
        label="Profil" link="/profil"
        icon="fas fa-user"
      />
      <Button
        v-if="token"
        class="btn-danger"
        label="Se déconnecter"
        link="/bac"
        icon="fas fa-sign-out-alt"
        @click="logout"
      />
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