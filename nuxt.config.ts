// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      title: 'Waste Bank System',
      meta: [
        { name: 'description', content: 'ระบบธนาคารขยะ - จัดการรับซื้อขยะรีไซเคิลจากสมาชิก' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  }
})
