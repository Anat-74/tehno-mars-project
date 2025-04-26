<script setup lang="ts">
const { find } = useStrapi()
const route = useRoute()
const { categorySlug, subcategorySlug } = route.params
const { currentLocale } = useLocale()
const config = useRuntimeConfig()

// Получаем данные категории
const { data: subcategory, status, error } = useAsyncData(
  `subcategory-${subcategorySlug}-${currentLocale.value}`,
  async () => {
    const response = await find('subcategories', {
       filters: {
          slug: { $eq: subcategorySlug },
          category: { slug: { $eq: categorySlug } },
          locale: currentLocale.value
       },
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
        statusMessage: 'Products subCategory Not Found'
      })
    }
    
     return response.data[0] // Берем первую категорию из массива
   }
)

// SEO метаданные
// useSeoMeta({
//   title: subcategory.value?.name,
//   description: subcategory.value?.description
// })

watch(subcategory, (newCategory) => {
  if (newCategory) {
    useSeoMeta({
      title: newCategory.name,
      description: newCategory.description
    })
  }
})

onMounted(() => {
   console.log('subCategorySlug data:', subcategory.value)
})

watch(subcategory, (newCategory) => {
  console.log('subcategory data:', newCategory);
});
</script>

<template>
   <Loader v-if="status === 'pending'" />
      <div  v-if="subcategory">
         <ul v-if="subcategory.products?.length" 
         class="products-grid">
         <li
          v-for="product in subcategory.products"
          :key="product.name"
          class="product-card"
        >
        <NuxtLink
            :to="`/${currentLocale}/${categorySlug}/${subcategorySlug}/${product.slug}`"
            class="product-link"
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
         </NuxtLink>
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

<style lang="scss" scoped></style>