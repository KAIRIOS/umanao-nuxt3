const token = useCookie('token')
const headers = {
  Authorization: `Bearer ${token.value}`,

}

export default defineNuxtPlugin({
  name: 'api',
  setup() {
    // const token = useCookie('token')

    const api = $fetch.create({
      baseURL: '/api/',
      headers: headers
    })

    return {
      provide: {
        api,
      },
    }
  },
})