<script lang="ts" setup>
import type { LocaleCode } from "../../types/types"
import { visuallyHiddenTranslations } from '~/locales/visuallyHidden'
const { currentLocale } = useLocale()

const pageMeta = {
  ru: {
    title: 'Контакты',
    description: 'Страница с контактами'
  },
  en: {
    title: 'Contacts',
    description: 'Contact page'
  },
  be: {
    title: 'Кантакты',
    description: 'Старонка з кантактамі'
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
      <section aria-labelledby="contacts-page">
         <h1
         class="visually-hidden"
         id="contacts-page"
         >{{ visuallyHiddenTranslations[currentLocale].sectionAboutUsTitle }}</h1>
         <h2>Contacts</h2>
      </section>
</template>