export default defineNuxtConfig({
   compatibilityDate: '2024-11-01',
   devtools: { enabled: false },
   future: {
      compatibilityVersion: 4,
   },
   experimental: {
      sharedPrerenderData: false,
      compileTemplate: true,
      resetAsyncDataToUndefined: true,
      templateUtils: true,
      relativeWatchPaths: true,
      defaults: {
         useAsyncData: {
            deep: true
         }
      }
   },
   unhead: {
      renderSSRHeadOptions: {
         omitLineBreaks: false
      }
   },
   modules: [
      '@nuxt/image',
      '@nuxt/icon',
      '@pinia/nuxt',
      'pinia-plugin-persistedstate/nuxt',
      '@nuxtjs/color-mode',
      '@nuxtjs/html-validator',
      '@nuxtjs/strapi',
      '@nuxtjs/mdc'
   ],
   ssr: true,
   routeRules: {
      '/': { redirect: '/ru' }
   },
   nitro: {
      prerender: {
         routes: ['/en', '/ru', '/be']
      }
   },
   runtimeConfig: {
      strapi: {
         url: process.env.NUXT_STRAPI_URL,
         token: process.env.NUXT_STRAPI_TOKEN,
         prefix: '/api',
         admin: '/admin',
         version: 'v5',
         cookieName: 'strapi_jwt'
      },
      public: {
         siteUrl: process.env.SITE_URL || 'http://localhost:3000',
         strapi: {
            url: process.env.NUXT_PUBLIC_STRAPI_URL
         }
      }
   },
   image: {
      domains: ['127.0.0.1:1337'],
      provider: 'ipx',
      ipx: {
         modifiers: {
            quality: 85,
            format: 'webp',
            densities: [1, 2]
         }
      },
      // strapi: {
      //    baseURL: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'
      // },
      screens: {
         'xs': 320,
         'sm': 479.98,
         'md': 767.98,
         'lg': 1023.98,
         'xl': 1279.98,
         'xxl': 1536,
         '2xl': 1536
      },
      quality: 85,
      densities: [1, 2]
   },
   icon: {
      serverBundle: {
         collections: [
            'material-symbols',
            'eos-icons',
            'ph',
            'cil',
            'fa-brands',
            'emojione',
            'carbon',
            'et',
            'mingcute',
            'entypo',
            'mdi',
            'qlementine-icons',
            'pixelarticons'
         ]
      },
      // Автоматически добавлять иконки из компонентов в клиентский бандл
    clientBundle: {
      scan: true,
      sizeLimitKb: 200
      },
      customCollections: [
        {
          prefix: 'my-icon',
            dir: './public/my-icons',
            normalizeIconName: false,
        },
      ],
   },
   colorMode: {
      preference: 'system',
      fallback: 'light',
   },
   css: ['~/assets/scss/styles.scss'],
   vite: {
      css: {
         preprocessorOptions: {
           scss: {
               additionalData: `
             @use "@/assets/scss/base/_container.scss" as *;
             @use "@/assets/scss/base/_fonts.scss" as *;
             @use "@/assets/scss/base/_functions.scss" as *;
             @use "@/assets/scss/base/_globals.scss" as *;
             @use "@/assets/scss/base/_mixins.scss" as *;
             @use "@/assets/scss/base/_normalize.scss" as *;
             `,
            }
         },
         preprocessorMaxWorkers: true,
         devSourcemap: true,
       },
      build: {
         cssCodeSplit: true,
         cssMinify: true
       },
       optimizeDeps: {
         include: ['sass']
      },
      assetsInclude: ['**/*.avif']
   }
})