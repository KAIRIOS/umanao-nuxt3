// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  routeRules: {
    '/api/**': { proxy: `${process.env.BASE_URL}/api/**` },
    '/apiDistant/**': { proxy: `${process.env.API_URL}/api/**` },
  },

  components: [
    {
      path: '~/components',
      extensions: ['.vue', '.ts'],
    }
  ],

  css: [
    "~/node_modules/bootstrap/dist/css/bootstrap.css",
    "~/assets/css/main.scss"
  ],

  modules: ["@pinia/nuxt"],
})