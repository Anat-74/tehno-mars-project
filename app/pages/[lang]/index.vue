<script setup lang="ts">
import type { ProductsResponse, LocaleCode } from "../../types/types"

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
    description: 'Main page of the site'
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
      const response = await find('categories', {
      filters: { locale: currentLocale.value },
      populate: {
        image: true
      //   products: {
      //     populate: ['image']
      //   }
      }
      })
      return response as ProductsResponse
   }
)

onMounted(() => {
   console.log('catergories (client):', categories.value)
})
</script>

<template>
   <div>
      <LangSwitcher/>
      <!-- <Loader v-if="status === 'pending'" /> -->
      <h2>Categories</h2>
      <ul v-if="categories?.data?.length"
      class="category-list"
      >
         <li
         v-for="category in categories.data"
         :key="category.id"
         >
         <NuxtLink
         :to="`/${currentLocale}/category/${category.slug}`"
         >
         <NuxtImg
         :src="`${config.public.strapi.url}${category.image[0]?.url}`"
         :alt="category.name"
          format="webp"
          width="240"
         ></NuxtImg>
         </NuxtLink>
         <h3>{{ category.name }}</h3>
      </li>
      </ul>
      <div v-else-if="error">Error: {{ error.message }}</div>
   </div>
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