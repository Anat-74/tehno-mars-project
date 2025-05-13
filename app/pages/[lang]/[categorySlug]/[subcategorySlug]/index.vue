<script setup lang="ts">
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
      <section  
      v-if="subcategory"
      aria-labelledby="sub-category-product"
      >
         <h2 
      id="sub-category-product"
      class="visually-hidden">Товары подкатегории</h2>
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
        <article>
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
            </article>
        </li>
        </ul>
      </section>

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