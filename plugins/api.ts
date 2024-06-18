export default defineNuxtPlugin({
  name: 'api',
  setup() {
    const token = useCookie('token')
    const { baseUrl } = useRuntimeConfig().public

    const api = $fetch.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    return {
      provide: {
        api,
      },
    }
  },
})