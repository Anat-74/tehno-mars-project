<script setup lang="ts">
const { find } = useStrapi()
const config = useRuntimeConfig()


// Получаем данные категории
const { data: subcategory, status, error } = useAsyncData(
  `test`,
  async () => {
    const response = await find('subcategories', {
       populate: {
        products: {
          populate: ['image']
        }
      }
    })

    // Проверяем наличие данных
    if (!response.data || response.data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Category Not Found'
      })
    }
    
    return response.data[0] // Берем первую категорию из массива
  }
)

onMounted(() => {
  console.log('TestSlug data:', subcategory.value)
})
</script>

<template>
   <Loader v-if="status === 'pending'" />
      <div >
        <ul  class="products-grid">
         <li
          v-for="product in subcategory.products"
          :key="product.name"
          class="product-card"
        >

            <NuxtImg
              v-if="product.image?.length"
              :src="`${config.public.strapi.url}${product.image[0]?.url}`"
              :alt="product.name"
              format="webp"
              loading="lazy"
              decoding="async"
              width="260"
              class="product-image"
            />

              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <span>{{ product.price }}</span>
        </li>
        </ul>
      </div>

    <div v-if="error" class="error">
      {{ error.message }}
    </div>
</template>