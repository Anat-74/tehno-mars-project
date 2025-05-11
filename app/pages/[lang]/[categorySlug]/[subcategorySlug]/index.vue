<script setup lang="ts">
const searchStore = useSearchStore()
const { products, hasSearched, totalPages, currentPage } = storeToRefs(searchStore)
const { find } = useStrapi()
const route = useRoute()
const { categorySlug, subcategorySlug } = route.params
const { currentLocale } = useLocale()
const { goBack, goForward } = useGoToForwardOrBack()
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
             populate: ['image'],
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

useServerSeoMeta({
  title: subcategory.value?.name || 'TechnoMars',
  description: subcategory.value?.description || 'Лучший магазин электроники'
})

watch(subcategory, (newCategory) => {
  if (newCategory) {
    useSeoMeta({
      title: newCategory.name,
      description: newCategory.description
    })
  }
})

useSeoMeta({
  title: subcategory.value?.name,
  description: subcategory.value?.description
})

watch(subcategory, (newCategory) => {
  console.log('subcategory data:', newCategory);
});

</script>

<template>
   <Loader v-if="status === 'pending'" />
      <div  v-if="subcategory">
         <UButton
      @click="goBack"
      icon="material-symbols:arrow-back"
      aria-label="go back"
      name-class="go-forward-back"
     />
     <UButton
      @click="goForward"
      icon="material-symbols:arrow-forward"
      aria-label="go forward"
      name-class="go-forward-back"
     />
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
              loading="lazy"
              decoding="async"
              width="260"
              class="product-image"
            />
         </NuxtLink>
              <h3>{{ product.name }}</h3>
              <span>{{ product.inStock }}</span>
              <span>{{ product.price }}</span>

              <button type="button"
              @click="useAddToCart(product)"
              >addToCart</button>
        </li>
        </ul>
      </div>

    <div v-if="error" class="error">
      {{ error.message }}
    </div>
</template>

<style lang="scss" scoped>
ul {
   display: grid;
      grid-template-columns: repeat(auto-fill, minmax(toRem(290), 1fr));
      row-gap: toRem(12);
      column-gap: toRem(8);
}
</style>