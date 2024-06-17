export default defineNuxtRouteMiddleware(async (to, from) => {

  if (to?.path !== '/login') {
    const token = useCookie('token');

    if (!token.value) {
      return navigateTo('/login');
    }

    useRequestHeaders(['Authorization', `Bearer ${token.value}`])
  }
})