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
      '@nuxtjs/i18n',
      '@nuxtjs/color-mode',
      '@nuxtjs/html-validator'
   ],
   app: {
      head: {
         title: 'TechnoMars',
         htmlAttrs: {
            lang: 'ru'
          }
      }
   },
   i18n: {
      lazy: true,
      strategy: 'prefix_except_default',
      locales: [
         {
            code: 'ru',
            name: 'RU',
            file: 'ru-RU.json'
         },
         {
            code: 'be',
            name: 'BY',
            file: 'be-BY.json'
          }
      ],
      defaultLocale: 'ru'
   },
   image: {
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
      densities: [1, 2],
      format: ['avif', 'webp'],
   },
   icon: {
      customCollections: [
        {
          prefix: 'my-icon',
            dir: './public/my-icons',
            normalizeIconName: false,
        },
      ],
   },
   colorMode: {
      preference: 'system', // default value of $colorMode.preference
      fallback: 'light', // fallback value if not system preference found
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
   },
})
