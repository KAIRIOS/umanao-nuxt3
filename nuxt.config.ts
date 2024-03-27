// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  components: [
    {
      path: '~/components',
      extensions: ['.vue', '.ts'],
    }
  ],
  css: [
    "~/node_modules/bootstrap/dist/css/bootstrap.css",
    "~/assets/css/main.css"
  ],
})
