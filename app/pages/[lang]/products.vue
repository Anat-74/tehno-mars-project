<!-- <script setup lang="ts">
import type { ProductsResponse, LocaleCode } from "../../types/types"

const { find } = useStrapi()
const { currentLocale } = useLocale()
const config = useRuntimeConfig()

const pageMeta = {
  ru: {
    title: 'Каталог',
    description: 'Страница каталога сайта'
  },
  en: {
    title: 'Catalog',
    description: 'Catalog page of the site'
  },
  be: {
    title: 'Каталог бел',
    description: 'Старонка каталога сайта'
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
      locale: currentLocale.value,
      populate: '*'
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
      <h2>Categories</h2>
      <ul v-if="categories?.data?.length"
      class="category-list"
      >
         <li
         v-for="category in categories.data"
         :key="category.id"
         >
         <NuxtImg
         :src="`${config.public.strapi.url}${category.image[0]?.url}`"
         :alt="category.name"
          format="webp"
          width="240"
         ></NuxtImg>
         <h3>{{ category.name }}</h3>
      <div 
      class="category-product"
      v-for="prod in category.products"
      :key="prod.id"
      >{{prod.name}}
   </div>
      </li>
          <li>
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
</style> -->

<script setup lang="ts">
import type { ProductsResponse, LocaleCode } from "../../types/types"
const { currentLocale } = useLocale()
const { find } = useStrapi()
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

const { data: products, status, error } = useAsyncData(
  `products-${currentLocale.value}`,
  async () => {
     const response = await find('products', {
      locale: currentLocale.value,
      populate: '*'
     })
    return response as ProductsResponse
  }
)

onMounted(() => {
  console.log('Products data:', products.value)
//   console.log('First product:', products.value?.data?.[0])
})
</script>

<template>
  <div>
   <LangSwitcher/>
    <Loader v-if="status === 'pending'" />
    <ul v-if="products?.data?.length">
      <Product v-for="product in products.data" 
      :key="product.id"
      :id="product.id"
      :name="product.name"
      :price="product.price"
      :description="product.description"
      :category="product.category.name"
      :slug="product.slug"
      :image="`${config.public.strapi.url}${product.image[0]?.url}`"
      >
      </Product>
    </ul>
    <div v-else-if="error">Error: {{ error.message }}</div>
  </div>
</template>