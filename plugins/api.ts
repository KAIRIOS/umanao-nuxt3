export default defineNuxtPlugin({
  name: 'requestApi',
  setup(){
    const token = useCookie('token')

    const api = $fetch.create({
      baseURL: '/api/',
      method: 'GET',
      onRequest ({ _request, options }) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        }
      },
      onResponseError: async ({ response }) => {
        if (response.status === 401) {
          token.value = null
          const router = useRouter()
          await router.push('/auth/login')
        }
      }
    })

    return {
      provide: {
        api,
      },
    }
  },
})