<script lang="ts" setup>
import type { LocaleCode } from "../../types/types"
import { visuallyHiddenTranslations } from '~/locales/visuallyHidden'
const { currentLocale } = useLocale()

const pageMeta = {
  ru: {
    title: 'О нас',
    description: 'Страница - о нас'
  },
  en: {
    title: 'About Us',
    description: 'Page - about us'
  },
  be: {
    title: 'Пра нас',
    description: 'Старонка - пра нас'
  }
}

useSeoMeta({
  title: pageMeta[currentLocale.value as LocaleCode].title,
  ogTitle: pageMeta[currentLocale.value as LocaleCode].title,
  description: pageMeta[currentLocale.value as LocaleCode].description,
  ogDescription: pageMeta[currentLocale.value as LocaleCode].description
})

// definePageMeta({
//    layout: 'back-to-main'
//    })
</script>

<template>
      <section aria-labelledby="about-us">
         <h1
         class="visually-hidden"
         id="about-us"
         >{{ visuallyHiddenTranslations[currentLocale].sectionAboutUsTitle }}</h1>
         <h2>aboutUs</h2>
      </section>
</template>

<style lang="scss" scoped>

</style>