<script setup lang="ts">
import type { ProductsResponse, LocaleCode } from "../../types/types"
const { currentLocale } = useLocale()
const { find } = useStrapi()
const config = useRuntimeConfig()
const pageMeta = {
  ru: {
    title: 'Продукты',
    description: 'Страница продуктов'
  },
  en: {
    title: 'Products',
    description: 'Product page of the site'
  },
  be: {
    title: 'Прадукты',
    description: 'Старонка прадуктаў сайта'
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