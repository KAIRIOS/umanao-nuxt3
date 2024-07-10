const token = useCookie('token')

const headers = {
  Authorization: `Bearer ${token.value}`,
  'Content-Type': 'application/json',
}

export default defineNuxtPlugin({
  name: 'requestApi',
  setup(){
    const api = $fetch.create({
      baseURL: '/api/',
      method: 'GET',
      headers: headers,
      onResponseError: async ({ response }) => {
        if (response.status === 401) {
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