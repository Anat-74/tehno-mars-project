<script setup lang="ts">
import type { Category, LocaleCode } from "../../types/types"
import { visuallyHiddenTranslations } from '~/locales/visuallyHidden'

const { find } = useStrapi()
const { currentLocale } = useLocale()
const config = useRuntimeConfig()

const pageMeta = {
  ru: {
    title: 'ТехноМарс',
    description: 'Главная страница сайта'
  },
  en: {
    title: 'TehnoMars',
    description: 'Main page of the site'
  },
  be: {
    title: 'ТехнаМарс',
    description: 'Галоўная старонка сайта'
  }
}

useSeoMeta({
  title: pageMeta[currentLocale.value as LocaleCode].title,
  ogTitle: pageMeta[currentLocale.value as LocaleCode].title,
  description: pageMeta[currentLocale.value as LocaleCode].description,
  ogDescription: pageMeta[currentLocale.value as LocaleCode].description
})

const { data: categories, status, error } = useAsyncData(
   `category-${currentLocale.value}`,
   async () => {
      const response = await find<Category>('categories', {
      filters: { locale: currentLocale.value },
      populate: {
         image: {
               fields: ["alternativeText", "url"]
         },
         }
      })
      if (!response.data || response.data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Category - Not Found'
      })
     }
      return response.data
   }
)

watch(categories, (newCategory) => {
  console.debug('category data:', newCategory)
})
</script>

<template>
   <Loader v-if="status === 'pending'" />
   <section aria-labelledby="category">
      <h1 
      id="category"
      class="visually-hidden">{{ visuallyHiddenTranslations[currentLocale].sectionLangTitle }}</h1>
      <LangSwitcher/>
      <ul v-if="categories"
      class="category-list"
      >
         <li
         v-for="category in categories"
         :key="category.id"
         >
         <NuxtLink
         :to="`/${currentLocale}/${category.slug}`"
         >
         <NuxtImg
         :src="`${config.public.strapi.url}${category.image[0]?.url}`"
         :alt="category.name"
          loading="lazy"
          format="webp"
          width="240"
         ></NuxtImg>
         </NuxtLink>
         <h2>{{ category.name }}</h2>
      </li>
      </ul>
      <div v-else-if="error">Error: {{ error.message }}</div>
   </section>
</template>

<style lang="scss" scoped>
ul {
   display: grid;
      grid-template-columns: repeat(auto-fill, minmax(toRem(290), 1fr));
      row-gap: toRem(12);
      column-gap: toRem(8);
      li {
         justify-self: center;
         h3 {
            text-align: center;
         }
         img {
            justify-self: center;
            height: toRem(188);
         }
         .category-product {
            font-size: toRem(12);
            font-style: italic;
         }
      }
}
</style>