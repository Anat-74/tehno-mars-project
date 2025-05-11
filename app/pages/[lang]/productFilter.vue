<script setup lang="ts">
 import type { Product } from "../../types/types"

 interface FilterParams {
  name: string
  sort: string
}

 const { find } = useStrapi()
 const config = useRuntimeConfig()
 const route = useRoute()
 const lang = route.params.lang
 const { currentLocale } = useLocale()
 const { categorySlug, subcategorySlug, productSlug } = route.params

 const currentPage = ref(1)
const totalPages = ref(1)
 
 const filters = reactive({
   name: '',
   sort: ''
 })
 
 // Отключаем автоматический запрос
 const { data: products, status, execute } = useAsyncData(
  `products-filter-${lang}-${productSlug}-${currentPage.value}`,
 async () => {
   if (!filters.name.trim() && !filters.sort) {
      return { data: [], meta: { pagination: { pageCount: 1 } } }
    }
    const result = await find<Product>('products', {
      populate: '*',
      filters: {
         slug: { $eq: productSlug },
         locale: currentLocale.value,
        name: { $containsi: filters.name }
      },
      sort: [filters.sort],
      pagination: {
        page: currentPage.value,
        pageSize: 10
      }
    })
    return result
  },
  {
    immediate: false,
    default: () => ({ data: [], meta: { pagination: { pageCount: 1 } } })
  }
)

watch(products, (newProducts: any) => {
  totalPages.value = newProducts?.meta?.pagination?.pageCount || 1
})

// Добавляем флаг выполнения поиска
const hasSearched = ref(false)

const updateFilters = (newFilters: FilterParams) => {
   hasSearched.value = true
  filters.name = newFilters.name
  filters.sort = newFilters.sort
  currentPage.value = 1

    // Выполняем запрос только при наличии поискового запроса
    if (filters.name.trim()) {
    currentPage.value = 1
    execute()
  } else {
    // Сбрасываем данные, но сохраняем сортировку
    products.value = { data: [], meta: { pagination: { pageCount: 1 } } }
  }
}

const changePage = (page: number) => {
  currentPage.value = page
}

watch([currentPage, filters], () => {
  if (filters.name.trim()) {
    execute()
  }
})

watch(products, (newCategory) => {
  console.debug('category data:', newCategory)
})
 </script>
 
 <template>
   <div>
     <ProductFilters @filters-changed="updateFilters" />
 
     <!-- Состояние до первого поиска -->
     <div v-if="!hasSearched && status!=='pending'" 
     class="initial-state">
       Введите параметры поиска
     </div>
 
     <!-- Загрузка -->
     <div v-if="status === 'pending'">Идёт поиск...</div>
 
     <!-- Результаты -->
     <div v-else-if="products?.data?.length">
       <div 
         v-for="product in products.data" 
         :key="product.id"
         class="product"
       >
         <h3>{{ product.name }}</h3>
         <p>Цена: {{ product.price }}</p>
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
       </div>

       <div class="pagination">
        <button 
          v-for="page in totalPages" 
          :key="page"
          @click="changePage(page)"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
     </div>
 
     <!-- Нет результатов -->
     <div  v-else-if="hasSearched" 
     class="no-results">
       Товары не найдены
     </div>
   </div>
 </template>