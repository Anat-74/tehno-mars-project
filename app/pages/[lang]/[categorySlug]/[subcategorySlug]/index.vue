<script setup lang="ts">
const { find } = useStrapi()
const route = useRoute()
const { categorySlug, subcategorySlug } = route.params
const { currentLocale } = useLocale()
const config = useRuntimeConfig()

const page = ref(Number(route.query.page) || 1); // Текущая страница из URL
const pageSize = 8; // Товаров на странице

// Получаем данные категории
const { data: subcategory, status, error } = useAsyncData(
  `subcategory-${subcategorySlug}-${currentLocale.value}-page-${page.value}`,
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
         //     pagination: {
         //       page: page.value,
         //       pageSize: pageSize
         //  }
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

const pageCount = computed(() => {
  const total = subcategory.value?.products.meta?.pagination.total || 0
  return Math.ceil(total / pageSize)
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
              loading="lazy"
              decoding="async"
              width="260"
              class="product-image"
            />
         </NuxtLink>
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <span>{{ product.inStock }}</span>
              <span>{{ product.price }}</span>

              <button type="button"
              @click="useAddToCart(product)"
              >addToCart</button>
        </li>
        </ul>
        <Pagination 
        :page="page"
        :pageCount="pageCount"
        :routeName="$route.name?.toString() || ''"
      />
      </div>

    <div v-if="error" class="error">
      {{ error.message }}
    </div>
</template>

<style lang="scss" scoped></style>