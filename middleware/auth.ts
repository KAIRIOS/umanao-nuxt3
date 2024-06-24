export default defineNuxtRouteMiddleware(async (to, from) => {

  if (to?.path !== '/auth/login') {
    const token = useCookie('token');

    if (!token.value) {
      return navigateTo('/auth/login')
    }

    useRequestHeaders(['Authorization', `Bearer ${token.value}`])
  }
})