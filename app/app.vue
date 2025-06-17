<script setup lang="ts">
import { seoTranslations } from './locales/appSeo'
import { useLocale } from '~/composables/useLocale'

const { currentLocale } = useLocale()
const route = useRoute()
const config = useRuntimeConfig()

// Вычисляем полный URL страницы
const fullUrl = computed(() => {
const baseUrl = config.public.siteUrl || 'http://localhost:3000'
return `${baseUrl}${route.path}`
})

// Получаем локализованные SEO-данные
const seoData = computed(() => {
  return seoTranslations[currentLocale.value] || seoTranslations.ru
})

// Функция для обновления head
const updateHead = () => {
  useHead({
    title: seoData.value.title,
    htmlAttrs: { lang: currentLocale.value },
    
    link: [
      {
        rel: 'canonical',
        href: fullUrl.value
      }
    ],
    meta: [
      { name: 'description', content: seoData.value.description },
      { property: 'og:title', content: seoData.value.ogTitle },
      { property: 'og:description', content: seoData.value.ogDescription },
      { property: 'og:url', content: fullUrl.value },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'TechnoMars' },
      { property: 'og:image', content: `${config.public.siteUrl}/logo.png` },
       { property: 'og:locale', content: currentLocale.value },

      // Twitter
       { name: 'twitter:card', content: 'summary_large_image' },
       { name: 'twitter:title', content: seoData.value.ogTitle },
       { name: 'twitter:description', content: seoData.value.ogDescription },
       { name: 'twitter:image', content: `${config.public.siteUrl}/logo.png` },

      // VK (ВКонтакте)
      { property: 'vk:image', content: `${config.public.siteUrl}/logo.png` },
      { property: 'vk:title', content: seoData.value.ogTitle },
      
      // Telegram
      { property: 'telegram:image', content: `${config.public.siteUrl}/logo.png` },
      
      // Instagram
      { property: 'al:ios:app_name', content: 'TechnoMars' },
      { property: 'al:android:app_name', content: 'TechnoMars' }
    ]
  })
}

// Инициализация при загрузке
updateHead()

// Отслеживаем изменения языка и маршрута
watch([currentLocale, () => route.path], () => {
  updateHead()
})
</script>

<template>
   <NuxtLayout>
   <NuxtPage />
</NuxtLayout>
</template>

<style lang="scss">
#__nuxt {
   min-height: 100dvh;
   display: flex;
   flex-direction: column;

   main {
      flex: 1 1 auto;
   }
}
</style>
