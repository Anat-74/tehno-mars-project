<script setup lang="ts">
import type { ProductsResponse } from "../../types/types"

const { find } = useStrapi()
const { currentLocale } = useLocale()
const config = useRuntimeConfig()

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
      <Loader v-if="status === 'pending'" />
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
</style>