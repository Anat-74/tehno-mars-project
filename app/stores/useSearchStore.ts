import type { Product } from '~/types/types'

export const useSearchStore = defineStore('search', () => {
  const { find } = useStrapi()
  const route = useRoute()
  
  const filters = reactive({
    name: '',
    sort: ''
  })
  
  const products = ref<Product[]>([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const status = ref<'idle' | 'pending' | 'success'>('idle')
  const hasSearched = ref(false)

   const executeSearch = async () => {
   if (!filters.name.trim()) {
      products.value = []
      hasSearched.value = false // Сбрасываем флаг поиска
      return
    }
    
    status.value = 'pending'
    try {
      const result = await find<Product>('products', getQueryParams())
      products.value = result.data
      totalPages.value = (result.meta.pagination as { pageCount: number }).pageCount
      hasSearched.value = true
    } finally {
      status.value = 'success'
    }
  }

   const updateFilters = (newFilters: { name: string; sort: string }) => {
      const wasSearching = !!filters.name.trim()

    filters.name = newFilters.name
    filters.sort = newFilters.sort
    currentPage.value = 1
    
    if (filters.name.trim() || wasSearching) {
      executeSearch()
    }
  }

  const changePage = (page: number) => {
    currentPage.value = page
    executeSearch()
  }

const getQueryParams = () => {
   // Убираем фильтр по productSlug если он есть в URL
   const baseFilters: any = {
     locale: route.params.lang,
     name: { $containsi: filters.name }
   }
 
   // Добавляем фильтр по slug только если мы НЕ на странице товара
   if (!route.params.productSlug) {
     baseFilters.slug = { $eq: route.params.productSlug }
   }
 
   return {
      populate: {
         subcategory: {
            populate: ['category'] // Добавляем категорию через подкатегорию
          },
       },
     filters: baseFilters,
     sort: [filters.sort],
     pagination: {
       page: currentPage.value,
       pageSize: 32
     }
   }
 }
   
   const resetFilters = () => {
      filters.name = ''
      filters.sort = ''
      products.value = []
      hasSearched.value = false
      currentPage.value = 1
    }

  return {
    filters,
    products,
    currentPage,
    totalPages,
    status,
    hasSearched,
    executeSearch,
    updateFilters,
     changePage,
     resetFilters
  }
})