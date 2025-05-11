<script setup lang="ts">
const searchStore = useSearchStore()
const route = useRoute()

// const searchName = ref('')
// const sortBy = ref('')

const searchName = computed({
  get: () => searchStore.filters.name,
  set: (value) => searchStore.filters.name = value
})

const sortBy = computed({
  get: () => searchStore.filters.sort,
  set: (value) => searchStore.filters.sort = value
})

//Следим за сбросом фильтров
watch(() => route.params.productSlug, (newSlug) => {
  if (newSlug) {
    // Явно обновляем локальные значения
    searchName.value = ''
     sortBy.value = ''
     searchStore.resetFilters()
  }
})

const applyFilters = () => {
  // Отправляем только актуальные фильтры
  searchStore.updateFilters({
    name: searchName.value,
    sort: sortBy.value
  })
}

//Сбрасываем фильтры при входе на страницу товара

// watch(() => route.params.productSlug, (newSlug) => {
//   if (newSlug) {
//     searchStore.resetFilters()
//   }
// })

</script>

<template>
  <div>
    <input 
      v-model="searchName" 
      placeholder="Название товара"
      @input="applyFilters"
    >
    
    <select 
      v-model="sortBy" 
      @change="applyFilters"
      :class="{ 'sort-active': sortBy }"
    >
      <option value="">Без сортировки</option>
      <option value="name:asc">От А до Я</option>
      <option value="name:desc">От Я до А</option>
      <option value="price:asc">Сначала дешёвые</option>
      <option value="price:desc">Сначала дорогие</option>
    </select>
  </div>
</template>