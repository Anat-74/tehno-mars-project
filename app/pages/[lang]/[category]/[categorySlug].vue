<script setup lang="ts">
const { find } = useStrapi()
const route = useRoute()
const { currentLocale } = useLocale()
const config = useRuntimeConfig()

// Получаем данные категории
const { data: category, status, error } = useAsyncData(
  `category-${route.params.categorySlug}-${currentLocale.value}`,
  async () => {
    const response = await find('categories', {
      filters: { slug: route.params.categorySlug },
      locale: currentLocale.value,
      populate: {
        image: true,
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

// SEO метаданные
useSeoMeta({
  title: category.value?.name,
  description: category.value?.description || `Products in ${category.value?.name} category`
})

onMounted(() => {
  console.log('CategorySlug data:', category.value)
})
</script>

<template>
  <div class="category-page">

    <div v-if="category">
      <div v-if="category.products?.length" class="products-grid">
        <div
          v-for="product in category.products"
          :key="product.id"
          class="product-card"
        >
          <NuxtLink
            :to="`/${currentLocale}/${product.slug}`"
            class="product-link"
          >
            <NuxtImg
              v-if="product.image?.length"
              :src="`${config.public.strapi.url}${product.image[0]?.url}`"
              :alt="product.name"
              format="webp"
              width="300"
              class="product-image"
            />
         </NuxtLink>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p>{{ product.price }} ₽</p>
              <p>{{ product.description }}</p>
            </div>
        </div>
      </div>
    </div>


    <Loader v-if="status === 'pending'" />
    

    <div v-if="error" class="error">
      {{ error.message }}
    </div>


    <div v-else-if="category && !category.products?.length" class="empty">
      No products found
    </div>
  </div>
</template>