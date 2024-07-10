<script lang="ts" setup>
const maintenance = ref(process.env.MAINTENANCE)
const token = useCookie('token');
const { user } = storeToRefs(useUserStore())
const { setUser } = useUserStore()

if (token.value && !user.value?.id) {
  const { $api } = useNuxtApp()
  const { userConnected } = await $api('/user/connected', {
    onResponseError: async ({ response }) => {
      // Si 401 alors on reset le token et on redirige vers la page de login
      if (response.status === 401) {
        token.value = null
        navigateTo('/auth/login')
      }
    }
  })
  setUser(userConnected)
}

</script>


<template>
  <div v-if="maintenance" class="hstack justify-content-center" style="height: 100dvh">
    <h1>Site en maintenance</h1>
  </div>
  <div v-else>
    <the-header />
    <NuxtPage />
  </div>
</template>