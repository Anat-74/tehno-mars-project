
 <template>
   <div>
     <h1>Продукты</h1>
     <ul v-if="products && products.data">
       <li v-for="product in products.data" :key="product.id">
         <h2>{{ product.Name }}</h2>
         <p>Цена: {{ product.Price }} руб.</p>

           <NuxtImg
             :src="`http://localhost:1337${product.Image[0]?.url}`"
             :alt="product.Name"
            format="webp"
            width="244"
           />
           <p>{{ product.Description }}</p>
           <div v-if="product.category">
           <h3>Категория: {{ product.category.Name }}</h3>
           <p>{{ product.category.Description[0]?.children[0]?.text }}</p>
         </div>
       </li>
     </ul>
     <p v-else>Загрузка данных...</p>
   </div>
 </template>
 
 <script setup lang="ts">
  import type { ProductsResponse } from '../types/types'
 const { data: products, error } = await useAsyncData('products', async () => {
   try {
     return await $fetch<ProductsResponse>('http://localhost:1337/api/products?populate=*')
   } catch (e) {
     console.error('Ошибка при загрузке продуктов:', e)
     return null
    }
 })
 if (error.value) {
   console.error('Ошибка:', error.value)
}
console.log(products)

 </script>
