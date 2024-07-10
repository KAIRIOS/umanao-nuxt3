<script lang="ts" setup>
const { setUser, setToken } = useUserStore()

setToken()
setUser()

navigateTo('/auth/login')
</script>

<template></template>
