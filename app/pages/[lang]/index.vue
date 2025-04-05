<script setup lang="ts">
useSeoMeta({
   title: 'Главная',
   ogTitle: 'Главная',
   description: 'Главная страница сайта',
   ogDescription: 'Главная страница сайта'
})

import type { ProductsResponse } from "../../types/types";
const { find } = useStrapi()
const config = useRuntimeConfig()
const { currentLocale } = useLocale()

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
    <Loader v-if="status === 'pending'" />
    <ul v-else-if="products?.data?.length">
      <Test v-for="product in products.data" 
      :key="product.id"
      :id="product.id"
      :name="product.name"
      :price="product.price"
      :description="product.description"
      :category="product.category.name"
      :slug="product.slug"
      :image="`${config.public.strapi.url}${product.image[0]?.url}`"
      >
      </Test>
    </ul>
    <div v-else-if="error">Error: {{ error.message }}</div>
  </div>
</template>