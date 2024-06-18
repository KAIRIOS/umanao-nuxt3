export default defineNuxtRouteMiddleware(async (to, from) => {

  if (to?.path !== '/auth/login') {
    const token = useCookie('token');
    console.log(token)
    console.log(token.value)

    if (!token?.value) {
      const router = useRouter();
      await router.push("/auth/login");
    }

    useRequestHeaders(['Authorization', `Bearer ${token.value}`])
  }
})