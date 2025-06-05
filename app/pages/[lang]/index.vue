<script setup lang="ts">
import type { Category, LocaleCode } from "../../types/types"
import { visuallyHiddenTranslations } from '~/locales/visuallyHidden'

const { find } = useStrapi()
const { currentLocale } = useLocale()
const config = useRuntimeConfig()

const pageMeta = {
  ru: {
    title: 'Главная',
    description: 'Главная страница сайта'
  },
  en: {
    title: 'Home',
    description: 'Home page of the site'
  },
  be: {
    title: 'Галоўная',
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
</script>

<template>
   <Loader v-if="status === 'pending'" />
   <section class="category"
   aria-labelledby="category-page">
      <h1 
      id="category-page"
      class="visually-hidden">{{ visuallyHiddenTranslations[currentLocale].sectionLangTitle }}</h1>
      <LangSwitcher/>
      <ul class="category__list"
      v-if="categories"
      >
         <li class="category__item"
         v-for="category in categories"
         :key="category.id"
         >
         <NuxtLink
         class="category__link"
         :to="`/${currentLocale}/${category.slug}`"
         >
         <NuxtImg
         class="category__image"
         :src="`${config.public.strapi.url}${category.image[0]?.url}`"
         :alt="category.name"
         loading="lazy"
         decoding="async"
         format="webp"
         width="180"
        />
         </NuxtLink>
         <h2 class="category__title">{{ category.name }}</h2>
      </li>
      </ul>
   </section>

   <div v-if="error" class="error">
      {{ error.message }}
    </div>
</template>

<style lang="scss" scoped>
.category {

&__list {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(toRem(262), 1fr));
   justify-items: center;
   row-gap: toEm(12);
   @include adaptiveValue("column-gap", 64, 7);
}

&__item {
   width: 100%;
   display: grid;
   justify-items: center;
   padding-inline: toEm(16);
   padding-block-end: toEm(7);
   box-shadow: 0px 1px 2px 0px var(--shadow);
   border-radius: toEm(4);
}

&__link {
   margin-block-end: toEm(12);
}

&__image {
   transition: border-radius var(--transition-duration);

   @include hover {
         border-radius: toRem(22);
         outline: toEm(3) solid var(--secondary-color);
         outline-offset: toRem(6);
   }
}
}

</style>