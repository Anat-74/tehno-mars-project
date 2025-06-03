<script lang="ts" setup>
import type { LocaleCode } from "../../types/types"
import { visuallyHiddenTranslations } from '~/locales/visuallyHidden'
const { currentLocale } = useLocale()

const pageMeta = {
  ru: {
    title: 'Наши услуги',
    description: 'Страница с нашими услугами'
  },
  en: {
    title: 'Our services',
    description: 'Our Services Page'
  },
  be: {
    title: 'Нашы паслугі',
    description: 'Старонка з нашымі паслугамі'
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

<style lang="scss" scoped>
</style>
<template>
      <section aria-labelledby="our-services">
         <h1
         class="visually-hidden"
         id="our-services"
         >{{ visuallyHiddenTranslations[currentLocale].sectionOurServicesTitle }}</h1>
         <h2>Servicess</h2>
         <!-- <NuxtPicture 
         class="services__image"
         src="/image/removebg-preview.png"
         alt="image"
         loading="lazy"
         sizes="xs:100vw sm:100vw md:100vw lg:100vw"
         /> -->
      </section>
</template>

<style lang="scss" scoped>
.services {
display: flex;

}

</style>