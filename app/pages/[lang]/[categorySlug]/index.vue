<script setup lang="ts">
import type { Category, SubcategoriesResponse } from "../../../types/types"

const { find } = useStrapi()
const route = useRoute()
const { categorySlug } = route.params
const { currentLocale } = useLocale()
const { goBack, goForward } = useGoToForwardOrBack()
const config = useRuntimeConfig()

const page = ref(route.query.page ? +route.query.page : 1); // Текущая страница из URL
const pageSize = 8; // Элементов на странице

const { data: category, status, error } = useAsyncData(
  `category-${categorySlug}-${currentLocale.value}-page-${page.value}`,
  async () => {
     const response = await find('categories', {
       filters: {
          slug: { $eq: categorySlug },
          locale: currentLocale.value
       },
      populate: {
        subcategories: {
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
        statusMessage: 'Category - Not Found'
      })
     }
    return response.data[0] as Category & { subcategories: SubcategoriesResponse }
   }
)

useServerSeoMeta({
  title: category.value?.name || 'TechnoMars',
  description: category.value?.description || 'Лучший магазин электроники'
})

watch(category, (newCategory) => {
  if (newCategory) {
    useSeoMeta({
      title: newCategory.name,
      description: newCategory.description
    })
  }
})

useSeoMeta({
  title: category.value?.name || '...',
  description: category.value?.description || '...'
})

const pageCount = computed(() => {
  const total = category.value?.subcategories.meta?.pagination.total || 0
  return Math.ceil(total / pageSize)
})

watch(category, (newCategory) => {
  console.log('Category data:', newCategory)
})
</script>

<template>
   <Loader v-if="status === 'pending'" />
      <section aria-labelledby="sub-category">
         <h2
      id="sub-category"
      class="visually-hidden">Подкатегории товаров</h2>
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
        <ul v-if="category?.subcategories?.length" class="products-grid">
         <li
          v-for="subcategory in category.subcategories"
          :key="subcategory.id"
          class="product-card"
        >
          <NuxtLink
            :to="`/${currentLocale}/${categorySlug}/${subcategory.slug}`"
            class="product-link"
          >
            <NuxtImg
              v-if="subcategory.image?.length"
              :src="`${config.public.strapi.url}${subcategory.image[0]?.url}`"
              :alt="subcategory.name"
              format="webp"
              loading="lazy"
              decoding="async"
              width="260"
              class="product-image"
            />
         </NuxtLink>
            <h3>{{ subcategory.name }}</h3>
            <span>{{ subcategory.price }}</span>
        </li>
        </ul>
        <Pagination 
        :page="page"
        :pageCount="pageCount"
        :routeName="$route.name?.toString() || ''"
      />
      </section>

    <div v-if="error" class="error">
      {{ error.message }}
    </div>
</template>
