<script setup lang="ts">
import type { ProductsResponse } from "../types/types";
const { find } = useStrapi()
const route = useRoute()
const config = useRuntimeConfig()

const { data: product, error } = await useAsyncData('product', async () => {
  try {
    const response = await find('products', {
      filters: { uid: route.params.uid },
      populate: '*'
    })

     if (!response.data || response.data.length === 0)
     throw new Error('Продукт не найден')
      return response.data[0]  // Возвращаем первый элемент массива
  } catch (e) {
    console.error('Ошибка:', e)
    throw createError({ statusCode: 404, message: 'Продукт не найден' })
  }
})

let currentImage = ref('')

onMounted(() => {
  console.log('Продукт:', product.value) // Правильный путь к данным
})
</script> 

<template>
   <div v-if="product">
     <h1>Name: {{ product.name }}</h1>
     <p>UID: {{ product.uid }}</p>
     
     <div v-if="product.image?.length">
       <div v-for="(img, index) in product.image" :key="img.id">
         <NuxtImg 
          :src="`${config.public.strapi.url}${img.url}`"
           :alt="`${product.name} - Image ${index + 1}`"
           format="webp"
           width="180"
         />
       </div>
     </div>
   </div>
   <div v-else>
     Продукт не найден.
   </div>
 </template>

