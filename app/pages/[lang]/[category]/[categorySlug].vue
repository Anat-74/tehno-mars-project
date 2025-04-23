<script setup lang="ts">
const { find } = useStrapi()
const route = useRoute()
const { currentLocale } = useLocale()
const config = useRuntimeConfig()

const page = ref(route.query.page ? +route.query.page : 1); // Текущая страница из URL
const pageSize = 10; // Элементов на странице

// Получаем данные категории
const { data: category, status, error } = useAsyncData(
  `category-${route.params.categorySlug}-${currentLocale.value}-page-${page.value}`,
  async () => {
    const response = await find('categories', {
       filters: {
          slug: { $eq: route.params.categorySlug },
          locale: currentLocale.value
       },
      populate: {
        products: {
          populate: ['image']
        }
       },
       pagination: {
        page: page.value,
        pageSize: pageSize
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
  description: category.value?.description
})

const pageCount = computed(() => {
  const total = category.value?.products.meta?.pagination.total || 0;
  return Math.ceil(total / pageSize);
})

onMounted(() => {
  console.log('CategorySlug data:', category.value)
})
</script>

<template>
   <Loader v-if="status === 'pending'" />
      <div >
        <ul v-if="category?.products?.length" class="products-grid">
         <li
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
              loading="lazy"
              decoding="async"
              width="300"
              class="product-image"
            />
         </NuxtLink>
              <h3>{{ product.name }}</h3>
              <p>{{ product.price }} ₽</p>
              <p>{{ product.description }}</p>
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